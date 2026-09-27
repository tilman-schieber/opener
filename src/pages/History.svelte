<script lang="ts">
  import Icon from '../components/Icon.svelte';
  import { db } from '../lib/store/db.ts';
  import { href } from '../lib/router.svelte.ts';
  import type { PlayedGame } from '../lib/play/types.ts';
  import { formatLine } from '../lib/chess/moves.ts';

  let games = $state<PlayedGame[] | null>(null);
  db()
    .then((d) => d.getAllFromIndex('games', 'date'))
    .then((g) => (games = g.reverse()));

  function res(g: PlayedGame) {
    if (g.result === '1/2-1/2') return { t: 'Draw', c: '' };
    if (g.result === '*') return { t: 'Unfinished', c: '' };
    const won = (g.result === '1-0') === (g.color === 'white');
    return won ? { t: 'Won', c: 'good' } : { t: 'Lost', c: 'bad' };
  }

  async function remove(id: string) {
    await (await db()).delete('games', id);
    games = games?.filter((g) => g.id !== id) ?? null;
  }

  const summary = $derived.by(() => {
    if (!games?.length) return null;
    const n = games.length;
    const won = games.filter((g) => res(g).t === 'Won').length;
    const stayed = games.filter((g) => g.leftBookPly === undefined).length;
    return { n, won, stayed };
  });
</script>

<div class="page">
  <h1>Game history</h1>
  {#if summary}
    <div class="row stats">
      <div class="sheet stat"><strong>{summary.n}</strong><span class="muted small">games</span></div>
      <div class="sheet stat"><strong>{Math.round((summary.won / summary.n) * 100)}%</strong><span class="muted small">won</span></div>
      <div class="sheet stat"><strong>{Math.round((summary.stayed / summary.n) * 100)}%</strong><span class="muted small">stayed in book</span></div>
    </div>
  {/if}
  {#if games === null}
    <p class="muted">Loading…</p>
  {:else if !games.length}
    <p class="muted">No games yet. <a href={href('play')}>Play your first opening game</a></p>
  {:else}
    <div class="list">
      {#each games as g (g.id)}
        {@const r = res(g)}
        <div class="sheet game">
          <span class="chip {r.c}">{r.t}</span>
          <div class="info">
            <a href={href(`review/${g.id}`)}><strong>{g.repertoireName}</strong>{g.lineName ? ` · ${g.lineName}` : ''}</a>
            <div class="small muted">
              {new Date(g.date).toLocaleString()} · as {g.color} · {Math.ceil(g.moves.length / 2)} moves ·
              {#if g.leftBookPly !== undefined}<span class="warn">left book at move {Math.floor(g.leftBookPly / 2) + 1}</span>{:else}stayed in book{/if}
              {#if g.review}· reviewed{/if}
            </div>
            <div class="mono small muted trunc">{formatLine(g.moves.slice(0, 16).map((m) => m.san))}</div>
          </div>
          <a class="btn small" href={href(`review/${g.id}`)}>Review</a>
          <button class="btn small ghost" onclick={() => remove(g.id)} title="Delete game" aria-label="Delete game"><Icon name="x" /></button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .page { max-width: 980px; margin: 0 auto; display: flex; flex-direction: column; gap: 14px; }
  .stats { gap: 12px; }
  .stat { padding: 12px 18px; display: flex; flex-direction: column; min-width: 120px; }
  .stat strong { font-size: 1.6rem; font-family: var(--font-display); }
  .list { display: flex; flex-direction: column; gap: 8px; }
  .game { display: flex; gap: 12px; align-items: center; padding: 10px 14px; }
  .info { flex: 1; min-width: 0; }
  .trunc { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .warn { color: var(--amber); font-weight: 600; }
</style>
