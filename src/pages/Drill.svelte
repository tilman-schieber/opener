<script lang="ts">
  import Board from '../components/Board.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import MoveList from '../components/MoveList.svelte';
  import RepPicker from '../components/RepPicker.svelte';
  import { route, href } from '../lib/router.svelte.ts';
  import { findRepertoire, repertoires } from '../lib/repertoire/store.svelte.ts';
  import { linesOf, nodeAt, type RepLine } from '../lib/repertoire/model.ts';
  import { statsFor, recordRun, pickLine, lineStatus, type LineStat } from '../lib/drill/stats.ts';
  import { INITIAL_FEN, playUci, formatLine, type Ply } from '../lib/chess/moves.ts';
  import { moveSound, chime } from '../lib/sound.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  let repId = $state(route.query.get('rep') ?? 'lib:italian-game');
  const rep = $derived.by(() => {
    void repertoires.list;
    return findRepertoire(repId);
  });
  const lines = $derived(rep ? linesOf(rep) : []);
  let stats = $state(new Map<string, LineStat>());

  $effect(() => {
    const keys = lines.map((l) => l.key);
    statsFor(keys).then((s) => (stats = s));
  });

  // session
  let active = $state(false);
  let line = $state<RepLine | null>(null);
  let plies = $state<Ply[]>([]);
  let fen = $state(INITIAL_FEN);
  let wrongHere = $state(0);
  let mistakes = $state<number[]>([]);
  let flash = $state(0);
  let feedback = $state<{ kind: 'good' | 'bad' | 'info'; text: string } | null>(null);
  let done = $state(false);
  let session = $state({ lines: 0, perfect: 0 });
  let token = 0;

  const color = $derived(rep?.color ?? 'white');
  const ply = $derived(plies.length);
  const myTurn = $derived(active && !done && line !== null && ply < line.ucis.length && (ply % 2 === 0 ? 'white' : 'black') === color);

  function begin(specific?: RepLine) {
    if (!lines.length) return;
    active = true;
    line = specific ?? pickLine(lines, stats, line?.key);
    plies = [];
    fen = INITIAL_FEN;
    mistakes = [];
    wrongHere = 0;
    done = false;
    feedback = null;
    token++;
    autoplay();
  }

  function autoplay() {
    const t = token;
    if (!line || done) return;
    if (plies.length >= line.ucis.length) return complete();
    if ((plies.length % 2 === 0 ? 'white' : 'black') !== color) {
      setTimeout(() => {
        if (t !== token || !line) return;
        const p = playUci(fen, line.ucis[plies.length]);
        if (!p) return;
        advance(p);
        autoplay();
      }, plies.length === 0 ? 350 : 450);
    }
  }

  function advance(p: Ply) {
    plies = [...plies, p];
    fen = p.fen;
    moveSound(p.san.includes('x'));
  }

  function onmove(uci: string) {
    if (!myTurn || !line) return;
    const expected = line.ucis[ply];
    const p = playUci(fen, uci);
    if (!p) return;
    if (p.uci === expected) {
      if (wrongHere === 0) feedback = { kind: 'good', text: `${p.san} is correct.` };
      wrongHere = 0;
      advance(p);
      autoplay();
      return;
    }
    // another move the repertoire also contains at this point (a sibling branch) is not a mistake
    const node = nodeAt(rep!.root, line.ucis.slice(0, ply));
    if (node?.children.some((c) => c.uci === p.uci)) {
      feedback = { kind: 'info', text: `${p.san} is also in your repertoire, but this line continues differently. Try again.` };
      flash++;
      return;
    }
    wrongHere++;
    if (!mistakes.includes(ply)) mistakes = [...mistakes, ply];
    flash++;
    chime(false);
    feedback = wrongHere === 1 ? { kind: 'bad', text: `${p.san} is not the repertoire move. Hint: the piece to move is circled.` } : { kind: 'bad', text: `Still not it. The arrow shows the move.` };
  }

  async function complete() {
    if (!line || done) return;
    done = true;
    const s = await recordRun(line.key, mistakes);
    stats.set(line.key, s);
    stats = new Map(stats);
    session = { lines: session.lines + 1, perfect: session.perfect + (mistakes.length ? 0 : 1) };
    chime(!mistakes.length);
    feedback = mistakes.length
      ? { kind: 'bad', text: `Line done with ${mistakes.length} mistake${mistakes.length > 1 ? 's' : ''}. It will come back soon.` }
      : { kind: 'good', text: 'Perfect! Line completed without mistakes.' };
  }

  const shapes = $derived.by((): DrawShape[] => {
    if (!myTurn || !line || !wrongHere) return [];
    const exp = line.ucis[ply];
    if (wrongHere === 1) return [{ orig: exp.slice(0, 2) as Key, brush: 'yellow' }];
    return [{ orig: exp.slice(0, 2) as Key, dest: exp.slice(2, 4) as Key, brush: 'green' }];
  });

  const counts = $derived.by(() => {
    const c = { new: 0, weak: 0, learning: 0, solid: 0 };
    for (const l of lines) c[lineStatus(stats.get(l.key))]++;
    return c;
  });
</script>

{#if !active}
  <div class="setup card">
    <h1>Drill your lines</h1>
    <p class="muted">Play your side of each line from memory. Lines you miss come back more often; solid lines fade into the background. There is no fixed schedule.</p>
    <RepPicker bind:value={repId} />
    {#if rep}
      <div class="row">
        <span class="chip">{counts.new} new</span>
        <span class="chip bad">{counts.weak} weak</span>
        <span class="chip warn">{counts.learning} learning</span>
        <span class="chip good">{counts.solid} solid</span>
      </div>
      <button class="btn primary lg" onclick={() => begin()} disabled={!lines.length}>Start drilling</button>
      <div class="linelist">
        {#each lines as l}
          {@const s = stats.get(l.key)}
          {@const st = lineStatus(s)}
          <button class="lrow" onclick={() => begin(l)}>
            <span class="chip {st === 'weak' ? 'bad' : st === 'solid' ? 'good' : st === 'learning' ? 'warn' : ''}">{st}</span>
            <span class="lname">{l.name ?? ''}</span>
            <span class="mono small muted">{formatLine(l.sans.slice(0, 12))}{l.sans.length > 12 ? ' …' : ''}</span>
            <span class="spacer"></span>
            {#if s}<span class="small muted">{s.attempts - s.fails}/{s.attempts}</span>{/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>
{:else}
  <div class="workspace">
    <div class="left">
      <div class="status {feedback?.kind === 'info' ? 'book' : (feedback?.kind ?? '')}">
        <span class="dot"></span>
        {#if feedback}{feedback.text}{:else if myTurn}Your move. Play the repertoire move.{:else}…{/if}
      </div>
      <Board {fen} orientation={color} movable={myTurn ? color : null} lastMove={plies[plies.length - 1]?.uci} {onmove} {shapes} {flash} />
      <div class="row">
        {#if done}
          <button class="btn primary lg" onclick={() => begin()}>Next line</button>
          <button class="btn" onclick={() => line && begin(line)}>Repeat this line</button>
        {:else}
          <button class="btn small" onclick={() => { wrongHere = Math.max(wrongHere, 2); if (!mistakes.includes(ply)) mistakes = [...mistakes, ply]; }} disabled={!myTurn}>Show the move</button>
        {/if}
        <span class="spacer"></span>
        <button class="btn small ghost" onclick={() => (active = false)}>End session</button>
      </div>
    </div>
    <div class="right">
      <div class="sheet panel">
        <div class="panel-head"><h3>{rep?.name}</h3><span class="small muted">Session: {session.perfect}/{session.lines} perfect</span></div>
        {#if line}
          <p class="lname">{line.name ?? 'Repertoire line'}</p>
          <div class="progress"><div style:width="{(ply / line.ucis.length) * 100}%"></div></div>
          <p class="small muted">Move {Math.floor(ply / 2) + 1} of {Math.ceil(line.ucis.length / 2)}</p>
        {/if}
        <MoveList plies={plies} cursor={plies.length} keys={false} marks={plies.map((_, i) => (mistakes.includes(i) ? 'left-book' : undefined))} empty="The line starts…" />
      </div>
      {#if done}
        <IdeasPanel fens={plies.map((p) => p.fen)} preferred={rep?.libraryId} comment={rep && line ? nodeAt(rep.root, line.ucis)?.comment : undefined} />
        <a class="btn" href={href('play', { rep: repId })}>Play this opening against the opponent</a>
      {:else}
        <div class="sheet panel muted small">Key ideas stay hidden while you drill and appear when the line is done.</div>
      {/if}
    </div>
  </div>
{/if}

<style>
  .setup { max-width: 820px; margin: 0 auto; padding: 28px; display: flex; flex-direction: column; gap: 16px; }
  .linelist { display: flex; flex-direction: column; border-top: 1px solid var(--rule); }
  .lrow { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border: 0; border-bottom: 1px solid var(--rule); background: none; font: inherit; color: var(--ink); cursor: pointer; text-align: left; }
  .lrow:hover { background: var(--sheet-2); }
  .lname { font-weight: 600; }
  .progress { height: 8px; background: var(--sheet-2); border-radius: 99px; overflow: hidden; margin: 6px 0; }
  .progress div { height: 100%; background: var(--blue); transition: width 0.3s; }
</style>
