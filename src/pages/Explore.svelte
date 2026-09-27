<script lang="ts">
  import Board from '../components/Board.svelte';
  import MoveList from '../components/MoveList.svelte';
  import ExplorerPanel from '../components/ExplorerPanel.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import EvalBar from '../components/EvalBar.svelte';
  import EngineLines from '../components/EngineLines.svelte';
  import AddToRepertoire from '../components/AddToRepertoire.svelte';
  import { BoardState } from '../lib/boardstate.svelte.ts';
  import { route, href } from '../lib/router.svelte.ts';
  import { playUci, INITIAL_FEN, type Ply } from '../lib/chess/moves.ts';
  import { moveSound } from '../lib/sound.ts';
  import { getOpening } from '../lib/library/index.ts';
  import type { Analysis } from '../lib/engine/engine.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  const board = new BoardState();
  const initial = route.query.get('moves');
  if (initial) {
    let fen = INITIAL_FEN;
    const plies: Ply[] = [];
    for (const u of initial.split(',')) {
      const p = playUci(fen, u);
      if (!p) break;
      plies.push(p);
      fen = p.fen;
    }
    board.loadPlies(plies, Number(route.query.get('at') ?? plies.length));
  }
  const openingId = route.query.get('opening') ?? undefined;

  let orientation = $state<'white' | 'black'>((route.query.get('color') as 'white' | 'black') ?? (openingId ? getOpening(openingId)?.side : undefined) ?? 'white');
  let engineOn = $state(false);
  let analysis = $state<Analysis | null>(null);
  let hover = $state<string | null>(null);

  function play(uci: string) {
    const p = board.play(uci);
    if (p) moveSound(p.san.includes('x'));
  }

  const shapes = $derived.by(() => {
    const s: DrawShape[] = [];
    if (hover) s.push({ orig: hover.slice(0, 2) as Key, dest: hover.slice(2, 4) as Key, brush: 'paleBlue' });
    const best = analysis?.fen === board.fen ? analysis.lines[0]?.pv[0] : undefined;
    if (best) s.push({ orig: best.slice(0, 2) as Key, dest: best.slice(2, 4) as Key, brush: 'green' });
    return s;
  });

  const playHref = $derived(href('play', { moves: board.ucis.join(','), color: orientation }));
</script>

<div class="workspace">
  <div class="left">
    <div class="board-row">
      {#if engineOn}<EvalBar line={analysis?.fen === board.fen ? analysis.lines[0] : undefined} {orientation} />{/if}
      <div class="grow"><Board fen={board.fen} {orientation} lastMove={board.lastMove?.uci} onmove={play} {shapes} /></div>
    </div>
    <div class="row tools">
      <button class="btn small" onclick={() => (orientation = orientation === 'white' ? 'black' : 'white')}>⇅ Flip</button>
      <button class="btn small" class:primary={engineOn} onclick={() => (engineOn = !engineOn)}>⚙ Engine {engineOn ? 'on' : 'off'}</button>
      <button class="btn small ghost" onclick={() => board.reset()}>↺ Reset</button>
      <span class="spacer"></span>
      <AddToRepertoire sans={board.sans} color={orientation} />
      <a class="btn small primary" href={playHref}>⚔️ Play from here</a>
    </div>
    {#if engineOn}
      <div class="card panel"><EngineLines fen={board.fen} enabled={engineOn} bind:analysis /></div>
    {/if}
  </div>

  <div class="right">
    <ExplorerPanel fen={board.fen} fens={[INITIAL_FEN, ...board.fens]} onmove={play} onhover={(u) => (hover = u)} myColor={orientation} />
    <div class="card panel">
      <MoveList plies={board.plies} cursor={board.cursor} onselect={(i) => board.goto(i)} />
    </div>
    <IdeasPanel fens={board.fens} preferred={openingId} />
  </div>
</div>

<style>
  .board-row { display: flex; gap: 8px; align-items: stretch; }
  .grow { flex: 1; min-width: 0; }
  .tools { gap: 6px; }
</style>
