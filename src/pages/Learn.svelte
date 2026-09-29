<script lang="ts">
  import Board from '../components/Board.svelte';
  import MoveSeq from '../components/MoveSeq.svelte';
  import Rich from '../components/Rich.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import Icon from '../components/Icon.svelte';
  import { getOpening } from '../lib/library/index.ts';
  import { openingContext, trapContext } from '../lib/library/context.ts';
  import { ideasFor } from '../lib/library/ideas.ts';
  import { route, href } from '../lib/router.svelte.ts';
  import { playLine, playUci, INITIAL_FEN, turnOf, type Ply } from '../lib/chess/moves.ts';
  import { explore } from '../lib/explorer/index.ts';
  import { total, type ExplorerData } from '../lib/explorer/types.ts';
  import { settings } from '../lib/settings.svelte.ts';
  import { auth } from '../lib/auth/lichess.svelte.ts';
  import { ratingBands } from '../lib/settings.svelte.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  let { id }: { id: string } = $props();

  const o = $derived(getOpening(id));
  let lineIdx = $state(Number(route.query.get('line') ?? 0));
  const line = $derived(o ? o.lines[Math.min(lineIdx, o.lines.length - 1)] : undefined);
  const allPlies = $derived<Ply[][]>(o ? o.lines.map((l) => playLine(l.moves)) : []);
  const plies = $derived<Ply[]>(allPlies[Math.min(lineIdx, allPlies.length - 1)] ?? []);
  const baseLen = $derived(o ? playLine(o.base).length : 0);

  /** Number of moves shown on the board */
  let step = $state(Number(route.query.get('step') ?? 0));
  let quiz = $state(false);
  let wrong = $state(0);
  let flash = $state(0);
  let feedback = $state<{ kind: 'good' | 'bad'; text: string } | null>(null);

  const fen = $derived(step === 0 ? INITIAL_FEN : plies[step - 1].fen);
  const last = $derived(step ? plies[step - 1] : undefined);
  const next = $derived(plies[step]);
  const done = $derived(step >= plies.length);
  const side = $derived(o?.side ?? 'white');
  const nextIsMine = $derived(!!next && turnOf(fen) === side);
  const waitingForMe = $derived(quiz && nextIsMine && !done);

  // Database context for the move just played: how often players choose it here
  let db = $state<ExplorerData | null>(null);
  $effect(() => {
    const before = step <= 1 ? INITIAL_FEN : plies[step - 2]?.fen;
    const f = step ? before : undefined;
    db = null;
    if (!f) return;
    let live = true;
    explore(
      auth.token
        ? { source: 'lichess', fen: f, ratings: ratingBands(settings.humanRating), speeds: ['blitz', 'rapid', 'classical'] }
        : { source: 'offline', fen: f, rating: settings.humanRating },
    )
      .then((d) => live && (db = d))
      .catch(() => {});
    return () => (live = false);
  });

  const games = $derived(db ? total(db) || db.moves.reduce((s, m) => s + total(m), 0) : 0);
  const share = $derived(db && last ? db.moves.find((m) => m.uci === last.uci) : undefined);

  const ideas = $derived(ideasFor(plies.slice(0, step).map((p) => p.fen), id));
  const ctx = $derived(o ? openingContext(o, { current: fen, line: plies }) : undefined);

  const PIECE: Record<string, string> = { N: 'knight', B: 'bishop', R: 'rook', Q: 'queen', K: 'king' };

  /** A plain description of what a move does, for moves without a curated note */
  function describe(p: Ply): string {
    const san = p.san.replace(/[+#]/g, '');
    const to = p.uci.slice(2, 4);
    const check = p.san.includes('#') ? ' It is checkmate.' : p.san.includes('+') ? ' It gives check.' : '';
    if (san.startsWith('O-O-O')) return 'Castles queenside: the king goes to safety and the rook comes to the centre.' + check;
    if (san.startsWith('O-O')) return 'Castles kingside: the king goes to safety and the rook joins the game.' + check;
    const piece = PIECE[san[0]];
    const capture = san.includes('x');
    if (piece) return `${capture ? 'The ' + piece + ' captures on ' + to : 'The ' + piece + ' goes to ' + to}.` + check;
    if (san.includes('=')) return `The pawn promotes on ${to}.` + check;
    return `${capture ? 'The pawn captures on ' + to : 'Pawn to ' + to}.` + check;
  }

  /** Number of plies two lines share from the start */
  function common(a: Ply[], b: Ply[]) {
    let i = 0;
    while (i < a.length && i < b.length && a[i].uci === b[i].uci) i++;
    return i;
  }

  /** Where other lines leave this one: the moves they play from the current position */
  const branches = $derived.by(() => {
    const out = new Map<string, { san: string; uci: string; lines: { idx: number; name: string }[] }>();
    allPlies.forEach((pl, j) => {
      if (j === lineIdx || pl.length <= step || common(pl, plies) < step) return;
      const m = pl[step];
      if (m.uci === next?.uci) return;
      const b = out.get(m.uci) ?? { san: m.san, uci: m.uci, lines: [] };
      b.lines.push({ idx: j, name: o!.lines[j].name });
      out.set(m.uci, b);
    });
    return [...out.values()];
  });

  /** Switch to another line, keeping the moves both lines share on the board */
  function switchLine(j: number) {
    const keep = Math.min(step, common(allPlies[j], plies));
    lineIdx = j;
    go(keep);
  }

  /** Where each line leaves the main line, e.g. "5.d4" */
  function divergence(j: number): string {
    const pl = allPlies[j];
    if (j === 0 || !pl) return '';
    const i = common(pl, allPlies[0]);
    return pl[i] ? `${moveLabel(i)} ${pl[i].san}` : '';
  }

  function go(n: number) {
    step = Math.max(0, Math.min(plies.length, n));
    wrong = 0;
    feedback = null;
  }

  function nextStep() {
    if (waitingForMe) return;
    go(step + 1);
  }

  function onmove(uci: string) {
    if (!waitingForMe || !next) return;
    const p = playUci(fen, uci);
    if (!p) return;
    if (p.uci === next.uci) {
      feedback = { kind: 'good', text: `${p.san} is right.` };
      step++;
      wrong = 0;
    } else if (branches.some((b) => b.uci === p.uci)) {
      // Another prepared line: follow it
      const b = branches.find((x) => x.uci === p.uci)!;
      lineIdx = b.lines[0].idx;
      step++;
      wrong = 0;
      feedback = { kind: 'good', text: `${p.san} is also prepared: switching to “${b.lines[0].name}”.` };
    } else {
      wrong++;
      flash++;
      feedback = { kind: 'bad', text: wrong === 1 ? `${p.san} is not the move of this line. The piece to move is circled.` : 'The arrow shows the move.' };
    }
  }

  function reveal() {
    wrong = Math.max(wrong, 2);
  }

  const shapes = $derived.by((): DrawShape[] => {
    if (!next) return [];
    if (waitingForMe) {
      if (wrong === 1) return [{ orig: next.uci.slice(0, 2) as Key, brush: 'yellow' }];
      if (wrong >= 2) return [{ orig: next.uci.slice(0, 2) as Key, dest: next.uci.slice(2, 4) as Key, brush: 'green' }];
      return [];
    }
    return [
      ...branches.map((b) => ({ orig: b.uci.slice(0, 2) as Key, dest: b.uci.slice(2, 4) as Key, brush: 'paleGrey' })),
      { orig: next.uci.slice(0, 2) as Key, dest: next.uci.slice(2, 4) as Key, brush: 'paleBlue' },
    ];
  });

  function onkey(e: KeyboardEvent) {
    const t = e.target as HTMLElement;
    if (t.tagName === 'INPUT' || t.tagName === 'SELECT' || t.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      nextStep();
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      go(step - 1);
      e.preventDefault();
    }
  }

  const moveLabel = (i: number) => `${Math.floor(i / 2) + 1}${i % 2 ? '…' : '.'}`;
</script>

<svelte:window onkeydown={onkey} />

{#if !o || !line || !ctx}
  <p>Unknown opening. <a href={href('')}>Back to the library</a></p>
{:else}
  <div class="learn">
    <header class="row">
      <a class="back small" href={href(`opening/${o.id}`)}>{o.name}</a>
      <span class="spacer"></span>
      <span class="faint small">{o.lines.length} lines · step {step} of {plies.length}</span>
    </header>

    <div class="workspace">
      <div class="left">
        <div class="status {feedback?.kind ?? (waitingForMe ? 'book' : '')}">
          <span class="dot"></span>
          {#if feedback}{feedback.text}
          {:else if done}Line complete.
          {:else if waitingForMe}Your move: which move does this line play here?
          {:else}Step {step} of {plies.length}. The arrow shows the next move.{/if}
        </div>
        <Board {fen} orientation={side} movable={waitingForMe ? side : null} lastMove={last?.uci} {shapes} {onmove} {flash} />
        <div class="row controls">
          <button class="btn icon" onclick={() => go(0)} aria-label="Back to the start"><Icon name="first" /></button>
          <button class="btn" onclick={() => go(step - 1)} disabled={step === 0}><Icon name="prev" /> Back</button>
          {#if waitingForMe}
            <button class="btn" onclick={reveal}>Show the move</button>
          {:else}
            <button class="btn primary lg" onclick={nextStep} disabled={done}>Next move <Icon name="next" /></button>
          {/if}
          <span class="spacer"></span>
          <label class="check"><input type="checkbox" bind:checked={quiz} /> Quiz me on my moves</label>
        </div>
        <div class="progress" aria-hidden="true"><div style:width="{(step / plies.length) * 100}%"></div></div>
      </div>

      <div class="right">
        <section class="sheet panel lines">
          <div class="panel-head"><h3>Lines</h3><span class="faint small">shared moves stay on the board when you switch</span></div>
          <ul>
            {#each o.lines as l, j}
              <li>
                <button class:on={j === lineIdx} onclick={() => switchLine(j)} aria-current={j === lineIdx ? 'true' : undefined}>
                  <span class="lname">{l.name}</span>
                  {#if j === 0}<span class="chip">main line</span>{:else}<span class="mono small faint">{divergence(j)}</span>{/if}
                </button>
              </li>
            {/each}
          </ul>
        </section>

        <section class="sheet panel move">
          {#if last}
            <div class="row">
              <span class="label">{turnOf(fen) === side ? 'Opponent played' : 'You play'}</span>
              <span class="spacer"></span>
              {#if step <= baseLen}<span class="chip">opening moves</span>{/if}
            </div>
            <p class="big"><span class="num">{moveLabel(step - 1)}</span> <span class="san">{last.san}</span></p>
            {#if ideas.notes.length}
              {#each ideas.notes as n}<p><Rich text={n} {ctx} orientation={side} /></p>{/each}
            {:else}
              <p class="muted">{describe(last)}</p>
            {/if}
            {#if games && share}
              <p class="small faint">Chosen by {Math.round((total(share) / games) * 100)}% of players around {settings.humanRating} here ({games.toLocaleString()} games).</p>
            {:else if games}
              <p class="small faint">A rare move at this level: it is not among the common choices here.</p>
            {/if}
            {#each ideas.traps as t}
              <div class="note amber">
                <div class="label">Trap ahead: {t.name}</div>
                <p class="small"><Rich text={t.explanation} ctx={trapContext(o, t.moves)} orientation={side} /></p>
              </div>
            {/each}
          {:else}
            <div class="label">Start</div>
            <p><Rich text={o.summary} {ctx} orientation={side} /></p>
            <p class="muted small">Step through the line with Next (or the arrow keys). Turn on “Quiz me” to play your own moves from memory.</p>
          {/if}
                  {#if branches.length && !done}
            <div class="note blue branches">
              <div class="label">Other lines branch here</div>
              <p class="small">This line continues with <span class="san">{next ? moveLabel(step) + ' ' + next.san : ''}</span>. Prepared alternatives:</p>
              <div class="row">
                {#each branches as b}
                  {#each b.lines as l}
                    <button class="btn small" onclick={() => switchLine(l.idx)}><span class="san">{moveLabel(step)} {b.san}</span> {l.name}</button>
                  {/each}
                {/each}
              </div>
            </div>
          {/if}
        </section>

        {#if done}
          <section class="sheet panel end">
            <h2>{line.name}</h2>
            {#if line.note}<p><Rich text={line.note} {ctx} orientation={side} /></p>{/if}
            <div class="row">
              <a class="btn primary" href={href('play', { rep: `lib:${o.id}`, line: String(lineIdx) })}>Play this line</a>
              <a class="btn" href={href('drill', { rep: `lib:${o.id}` })}>Drill</a>
              {#if lineIdx < o.lines.length - 1}
                <button class="btn" onclick={() => { lineIdx++; go(0); }}>Next line</button>
              {/if}
            </div>
          </section>
        {/if}

        <section class="sheet panel">
          <div class="panel-head"><h3>The line</h3><span class="faint small">{line.name}</span></div>
          <MoveSeq {plies} orientation={side} from={baseLen} highlight={step ? step - 1 : undefined} onselect={(n) => go(n)} />
        </section>

        <IdeasPanel fens={plies.slice(0, step).map((p) => p.fen)} preferred={o.id} orientation={side} hideHere />
      </div>
    </div>
  </div>
{/if}

<style>
  .learn { display: flex; flex-direction: column; gap: 16px; }
  header { max-width: 1280px; width: 100%; margin: 0 auto; }
  .back { color: var(--ink-2); font-family: var(--font-display); font-size: 1.15rem; }
  .back::before { content: '‹ '; }
  .controls { gap: 8px; }
  .check { font-weight: 400; display: flex; gap: 8px; align-items: center; }
  .progress { height: 4px; background: var(--rule); border-radius: 2px; overflow: hidden; }
  .progress div { height: 100%; background: var(--blue); transition: width 0.2s; }
  .move { display: flex; flex-direction: column; gap: 8px; }
  .big { font-family: var(--font-mono); font-size: 1.6rem; line-height: 1.2; }
  .big .num { color: var(--ink-3); font-size: 1.1rem; }
  .move p { line-height: 1.65; }
  .end { display: flex; flex-direction: column; gap: 10px; }
  .lines ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .lines li { margin: 0; }
  .lines button { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; background: none; border: 0; border-top: 1px solid var(--rule); padding: 7px 4px; font: inherit; color: var(--ink); cursor: pointer; text-align: left; }
  .lines li:first-child button { border-top: 0; }
  .lines button:hover { background: var(--sheet-2); }
  .lines button.on { color: var(--blue); }
  .lines button.on .lname { font-weight: 600; }
  .branches { display: flex; flex-direction: column; gap: 6px; }
</style>
