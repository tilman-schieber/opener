<script lang="ts">
  import Board from '../components/Board.svelte';
  import MoveList from '../components/MoveList.svelte';
  import ExplorerPanel from '../components/ExplorerPanel.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import { BoardState } from '../lib/boardstate.svelte.ts';
  import { repertoires, saveRepertoire } from '../lib/repertoire/store.svelte.ts';
  import { addLine, removeAt, nodeAt, linesOf, positionIndex, type Repertoire, type RepNode } from '../lib/repertoire/model.ts';
  import { INITIAL_FEN, keyOfFen, formatLine, playUci, type Ply } from '../lib/chess/moves.ts';
  import { href } from '../lib/router.svelte.ts';
  import { moveSound } from '../lib/sound.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  let { id }: { id: string } = $props();

  const rep = $derived(repertoires.list.find((r) => r.id === id));
  const board = new BoardState();
  let record = $state(true);
  let hover = $state<string | null>(null);
  let renaming = $state(false);
  let newName = $state('');

  const node = $derived(rep ? nodeAt(rep.root, board.ucis) : undefined);
  const index = $derived(rep ? positionIndex(rep.root) : new Map<string, RepNode[]>());
  const here = $derived(index.get(keyOfFen(board.fen)) ?? []);
  const lines = $derived(rep ? linesOf(rep) : []);
  const inRep = $derived(!!node);

  async function mutate(fn: (r: Repertoire) => void) {
    if (!rep) return;
    const copy = $state.snapshot(rep) as Repertoire;
    fn(copy);
    await saveRepertoire(copy);
  }

  async function play(uci: string) {
    const p = board.play(uci);
    if (!p) return;
    moveSound(p.san.includes('x'));
    if (record && rep) await mutate((r) => addLine(r.root, board.sans));
  }

  function openLine(ucis: string[]) {
    let fen = INITIAL_FEN;
    const plies: Ply[] = [];
    for (const u of ucis) {
      const p = playUci(fen, u);
      if (!p) break;
      plies.push(p);
      fen = p.fen;
    }
    board.loadPlies(plies);
  }

  async function deleteHere() {
    if (!board.cursor) return;
    const san = board.lastMove?.san;
    if (!confirm(`Delete ${san} and everything after it from this repertoire?`)) return;
    const path = board.ucis;
    await mutate((r) => removeAt(r.root, path));
    board.back();
  }

  async function saveNote(text: string) {
    const k = keyOfFen(board.fen);
    await mutate((r) => {
      if (text.trim()) r.notes[k] = text.trim();
      else delete r.notes[k];
    });
  }

  function exportPgn() {
    if (!rep) return;
    const render = (n: RepNode, ply: number, forceNum: boolean): string => {
      if (!n.children.length) return '';
      const [main, ...alts] = n.children;
      const num = (p: number, force: boolean) => (p % 2 === 0 ? `${p / 2 + 1}. ` : force ? `${Math.floor(p / 2) + 1}... ` : '');
      let s = num(ply, forceNum) + main.san + (main.comment ? ` { ${main.comment} }` : '') + ' ';
      for (const a of alts) s += `( ${num(ply, true)}${a.san}${a.comment ? ` { ${a.comment} }` : ''} ${render(a, ply + 1, false)}) `;
      return s + render(main, ply + 1, alts.length > 0 || !!main.comment);
    };
    const pgn = `[Event "${rep.name}"]\n[Site "Opener"]\n[Result "*"]\n\n${render(rep.root, 0, false)}*\n`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([pgn], { type: 'application/x-chess-pgn' }));
    a.download = `${rep.name.replace(/[^\w-]+/g, '_')}.pgn`;
    a.click();
  }

  const shapes = $derived.by(() => {
    const s: DrawShape[] = here.map((n) => ({ orig: n.uci.slice(0, 2) as Key, dest: n.uci.slice(2, 4) as Key, brush: 'blue' }));
    if (hover) s.push({ orig: hover.slice(0, 2) as Key, dest: hover.slice(2, 4) as Key, brush: 'paleBlue' });
    return s;
  });

  const myTurn = $derived(rep ? board.turn === rep.color : false);
</script>

{#if !rep}
  <p>{repertoires.loaded ? 'Repertoire not found.' : 'Loading…'} <a href={href('repertoires')}>Back</a></p>
{:else}
  <div class="head row">
    <a class="muted small" href={href('repertoires')}>← Repertoires</a>
    {#if renaming}
      <input type="text" bind:value={newName} />
      <button class="btn small primary" onclick={async () => { await mutate((r) => (r.name = newName.trim() || r.name)); renaming = false; }}>Save</button>
    {:else}
      <h1 ondblclick={() => { newName = rep.name; renaming = true; }}>{rep.name}</h1>
      <button class="btn small ghost" onclick={() => { newName = rep.name; renaming = true; }}>✎</button>
    {/if}
    <span class="chip">{rep.color === 'white' ? '♔ White' : '♚ Black'}</span>
    <span class="muted small">{lines.length} lines</span>
    <span class="spacer"></span>
    <a class="btn small" href={href('play', { rep: rep.id })}>⚔️ Play</a>
    <a class="btn small" href={href('drill', { rep: rep.id })}>🎯 Drill</a>
    <button class="btn small" onclick={exportPgn}>⬇ PGN</button>
  </div>

  <div class="workspace">
    <div class="left">
      <Board fen={board.fen} orientation={rep.color} lastMove={board.lastMove?.uci} onmove={play} {shapes} />
      <div class="row">
        <label class="check"><input type="checkbox" bind:checked={record} /> Record moves into repertoire</label>
        <span class="spacer"></span>
        <button class="btn small ghost danger" disabled={!board.cursor || !inRep} onclick={deleteHere}>🗑 Delete from here</button>
        <button class="btn small ghost" onclick={() => board.reset()}>↺ Start</button>
      </div>
      <div class="hint small {inRep ? '' : 'warn'}">
        {#if !inRep}
          This position is not in the repertoire{record ? '' : ' (recording is off)'}.
        {:else if myTurn && !here.length}
          Your move: what do you play here? Make it on the board or pick one in the explorer.
        {:else if myTurn}
          Your repertoire move{here.length > 1 ? 's' : ''}: {#each here as n}<span class="san">{node?.children.find((c) => c.uci === n.uci)?.san ?? ''} </span>{/each}
          {#if here.length > 1}<span class="chip warn">more than one choice</span>{/if}
        {:else}
          Opponent to move: add the replies you want to prepare for.
        {/if}
      </div>
    </div>
    <div class="right">
      <ExplorerPanel fen={board.fen} fens={[INITIAL_FEN, ...board.fens]} onmove={play} onhover={(u) => (hover = u)} bookMoves={here.map((n) => n.uci)} myColor={rep.color} />
      <div class="card panel">
        <MoveList plies={board.plies} cursor={board.cursor} onselect={(i) => board.goto(i)} />
      </div>
      <IdeasPanel fens={board.fens} preferred={rep.libraryId} comment={node?.comment} note={rep.notes[keyOfFen(board.fen)]} onnote={saveNote} />
      <div class="card panel">
        <div class="panel-title"><h3>All lines</h3></div>
        <div class="lines">
          {#each lines as l}
            <button class="lrow" onclick={() => openLine(l.ucis)}>
              {#if l.name}<strong class="small">{l.name}</strong>{/if}
              <span class="mono small">{formatLine(l.sans)}</span>
            </button>
          {:else}
            <p class="muted small">No lines yet — play some moves on the board.</p>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .head { max-width: 1320px; margin: 0 auto 14px; gap: 10px; }
  .head h1 { margin: 0; font-size: 1.5rem; cursor: text; }
  .check { font-weight: 500; display: flex; gap: 6px; align-items: center; }
  .hint { padding: 8px 12px; border-radius: var(--radius-sm); background: var(--accent-soft); }
  .hint.warn { background: var(--warn-soft); }
  .lines { max-height: 320px; overflow-y: auto; display: flex; flex-direction: column; }
  .lrow { text-align: left; background: none; border: 0; border-bottom: 1px solid var(--border); padding: 6px 4px; font: inherit; color: var(--text); cursor: pointer; display: flex; flex-direction: column; }
  .lrow:hover { background: var(--surface-2); }
</style>
