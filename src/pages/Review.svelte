<script lang="ts">
  import Board from '../components/Board.svelte';
  import MoveList from '../components/MoveList.svelte';
  import ExplorerPanel from '../components/ExplorerPanel.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import EvalBar from '../components/EvalBar.svelte';
  import EvalGraph from '../components/EvalGraph.svelte';
  import EngineLines from '../components/EngineLines.svelte';
  import AddToRepertoire from '../components/AddToRepertoire.svelte';
  import { db } from '../lib/store/db.ts';
  import { href } from '../lib/router.svelte.ts';
  import { analyseGame } from '../lib/review/analyse.ts';
  import { findRepertoire } from '../lib/repertoire/store.svelte.ts';
  import { positionIndex, type RepNode } from '../lib/repertoire/model.ts';
  import { INITIAL_FEN, keyOfFen, formatLine } from '../lib/chess/moves.ts';
  import { formatScore, type Analysis } from '../lib/engine/engine.ts';
  import type { PlayedGame } from '../lib/play/types.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  let { id }: { id: string } = $props();

  let game = $state<PlayedGame | null>(null);
  let missing = $state(false);
  let cursor = $state(0);
  let progress = $state<[number, number] | null>(null);
  let engineOn = $state(false);
  let analysis = $state<Analysis | null>(null);

  db()
    .then((d) => d.get('games', id))
    .then((g) => {
      if (!g) return (missing = true);
      game = g;
      cursor = g.leftBookPly !== undefined ? g.leftBookPly : g.moves.length;
      if (!g.review) runReview();
    });

  async function runReview() {
    if (!game) return;
    progress = [0, game.moves.length + 1];
    const review = await analyseGame(game.moves, 14, (d, t) => (progress = [d, t]));
    game.review = review;
    await (await db()).put('games', $state.snapshot(game) as PlayedGame);
    progress = null;
  }

  const fen = $derived(!game || cursor === 0 ? INITIAL_FEN : game.moves[cursor - 1].fen);
  const rep = $derived(game ? findRepertoire(game.repertoireId) : undefined);
  const book = $derived(rep ? positionIndex(rep.root) : new Map<string, RepNode[]>());
  const reviewAt = $derived(game?.review && cursor > 0 ? game.review.plies[cursor - 1] : undefined);
  /** the move to be played from the current position */
  const nextReview = $derived(game?.review?.plies[cursor]);

  const glyph = { inaccuracy: '?!', mistake: '?', blunder: '??' } as const;
  const marks = $derived(
    game
      ? game.moves.map((m, i) => {
          const j = game!.review?.plies[i]?.judgement;
          if (i === game!.leftBookPly) return 'left-book ' + (j ?? '');
          return (j ?? '') + (m.phase === 'book' || (m.phase === 'player' && (game!.leftBookPly === undefined || i < game!.leftBookPly)) ? ' book' : '');
        })
      : [],
  );
  const glyphs = $derived(game?.review ? game.review.plies.map((p) => (p.judgement ? glyph[p.judgement] : undefined)) : []);

  const shapes = $derived.by(() => {
    const s: DrawShape[] = [];
    if (!game) return s;
    const next = game.moves[cursor];
    // repertoire move(s) at the point where the player left the book
    if (cursor === game.leftBookPly) {
      for (const n of book.get(keyOfFen(fen)) ?? []) s.push({ orig: n.uci.slice(0, 2) as Key, dest: n.uci.slice(2, 4) as Key, brush: 'blue' });
    }
    if (next && nextReview?.judgement && nextReview.best) {
      s.push({ orig: next.uci.slice(0, 2) as Key, dest: next.uci.slice(2, 4) as Key, brush: 'red' });
      s.push({ orig: nextReview.best.slice(0, 2) as Key, dest: nextReview.best.slice(2, 4) as Key, brush: 'green' });
    }
    return s;
  });

  const moments = $derived(
    game?.review
      ? game.review.plies
          .map((p, i) => ({ ...p, i, san: game!.moves[i].san, mine: (i % 2 === 0) === (game!.color === 'white') }))
          .filter((p) => p.judgement && p.judgement !== 'inaccuracy')
      : [],
  );

  const accuracy = $derived.by(() => {
    if (!game?.review) return null;
    const mine = game.review.plies.filter((_, i) => (i % 2 === 0) === (game!.color === 'white'));
    const avgLoss = mine.reduce((s, p) => s + p.loss, 0) / (mine.length || 1);
    // Lichess-style accuracy from average winning-chance loss
    return Math.max(0, Math.min(100, Math.round(103.1668 * Math.exp(-0.04354 * avgLoss) - 3.1669)));
  });

  const bookSans = $derived(game ? game.moves.slice(0, game.leftBookPly ?? game.moves.length).map((m) => m.san) : []);
  const fixLine = $derived.by(() => {
    if (!game || game.leftBookPly === undefined) return [];
    return game.moves.slice(0, game.leftBookPly + 1).map((m) => m.san);
  });
</script>

{#if missing}
  <p>Game not found. <a href={href('history')}>Back to history</a></p>
{:else if game}
  <div class="workspace">
    <div class="left">
      <div class="board-row">
        <EvalBar line={engineOn && analysis?.fen === fen ? analysis.lines[0] : reviewAt ?? game.review?.start} orientation={game.color} />
        <div class="grow"><Board {fen} orientation={game.color} movable={null} lastMove={cursor ? game.moves[cursor - 1].uci : undefined} {shapes} /></div>
      </div>
      {#if game.review}
        <EvalGraph review={game.review} {cursor} onselect={(i) => (cursor = i)} leftBookPly={game.leftBookPly} />
      {:else if progress}
        <div class="card panel">
          <div class="small muted">Analysing with Stockfish… {progress[0]}/{progress[1]}</div>
          <div class="progress"><div style:width="{(progress[0] / progress[1]) * 100}%"></div></div>
        </div>
      {/if}
      <div class="row">
        <button class="btn small" class:primary={engineOn} onclick={() => (engineOn = !engineOn)}>⚙ Live engine {engineOn ? 'on' : 'off'}</button>
        <a class="btn small" href={href('explore', { moves: game.moves.slice(0, cursor).map((m) => m.uci).join(','), color: game.color })}>🧭 Open in explorer</a>
        <a class="btn small primary" href={href('play', { rep: game.repertoireId })}>⚔️ Play again</a>
      </div>
      {#if engineOn}<div class="card panel"><EngineLines {fen} enabled={engineOn} bind:analysis /></div>{/if}
    </div>

    <div class="right">
      <div class="card panel summary">
        <div class="panel-title">
          <h3>Review</h3>
          <span class="chip">{game.result}</span>
        </div>
        <p><strong>{game.repertoireName}</strong>{game.lineName ? ` · ${game.lineName}` : ''} · you played {game.color}</p>
        <div class="row">
          {#if accuracy !== null}<div class="stat"><strong>{accuracy}%</strong><span class="muted small">accuracy</span></div>{/if}
          <div class="stat"><strong>{Math.ceil(bookSans.length / 2)}</strong><span class="muted small">moves in book</span></div>
          <div class="stat"><strong>{moments.filter((m) => m.mine).length}</strong><span class="muted small">your mistakes</span></div>
        </div>
        {#if game.leftBookPly !== undefined}
          <div class="lb">
            <p>
              📖 You left your repertoire at <button class="linklike" onclick={() => (cursor = game!.leftBookPly!)}>move {Math.floor(game.leftBookPly / 2) + 1}</button>:
              played <span class="san">{game.moves[game.leftBookPly].san}</span>, repertoire has <span class="san">{game.expected?.join(' / ')}</span>.
            </p>
            {#if rep && rep.origin !== 'library'}
              <p class="small muted">If {game.moves[game.leftBookPly].san} is what you want to play, add it:</p>
              <AddToRepertoire sans={fixLine} color={game.color} />
            {/if}
          </div>
        {/if}
      </div>

      <div class="card panel">
        <MoveList plies={game.moves} {cursor} onselect={(i) => (cursor = i)} {marks} {glyphs} />
      </div>

      {#if moments.length}
        <div class="card panel">
          <div class="panel-title"><h3>Key moments</h3></div>
          {#each moments as m}
            <button class="moment" class:mine={m.mine} onclick={() => (cursor = m.i)}>
              <span class="chip {m.judgement === 'blunder' ? 'bad' : 'warn'}">{m.judgement}</span>
              <span>{m.mine ? 'You' : 'Opponent'}: <span class="san">{formatLine([m.san], m.i)}</span>{m.bestSan ? ` — better was ` : ''}{#if m.bestSan}<span class="san">{m.bestSan}</span>{/if}</span>
              <span class="spacer"></span>
              <span class="mono small muted">{formatScore(m)}</span>
            </button>
          {/each}
        </div>
      {/if}

      {#if nextReview?.judgement && game.moves[cursor]}
        <div class="card panel hint">
          <strong>{game.moves[cursor].san}</strong> was {nextReview.judgement === 'inaccuracy' ? 'an' : 'a'} {nextReview.judgement} (−{Math.round(nextReview.loss)}% winning chances).
          Best was <span class="san">{nextReview.bestSan}</span> (green arrow).
        </div>
      {/if}

      <ExplorerPanel {fen} fens={[INITIAL_FEN, ...game.moves.slice(0, cursor).map((m) => m.fen)]} myColor={game.color} compact />
      <IdeasPanel fens={game.moves.slice(0, cursor).map((m) => m.fen)} preferred={rep?.libraryId} />
    </div>
  </div>
{:else}
  <p class="muted">Loading…</p>
{/if}

<style>
  .board-row { display: flex; gap: 8px; }
  .grow { flex: 1; min-width: 0; }
  .progress { height: 8px; background: var(--surface-2); border-radius: 99px; overflow: hidden; margin-top: 6px; }
  .progress div { height: 100%; background: var(--accent); transition: width 0.2s; }
  .summary p { margin: 0 0 8px; }
  .stat { display: flex; flex-direction: column; padding: 6px 14px 6px 0; margin-right: 10px; }
  .stat strong { font-size: 1.4rem; font-family: var(--font-display); }
  .lb { border-top: 1px solid var(--border); padding-top: 10px; margin-top: 6px; }
  .linklike { background: none; border: 0; padding: 0; font: inherit; color: var(--accent); cursor: pointer; font-weight: 700; }
  .moment { display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: 0; border-bottom: 1px solid var(--border); padding: 6px 2px; font: inherit; color: var(--text-muted); cursor: pointer; text-align: left; }
  .moment.mine { color: var(--text); }
  .moment:hover { background: var(--surface-2); }
  .hint { border-left: 4px solid var(--warn); }
</style>
