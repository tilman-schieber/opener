<script lang="ts">
  import { OPENINGS } from '../lib/library/index.ts';
  import OpeningCard from '../components/OpeningCard.svelte';
  import { repertoires } from '../lib/repertoire/store.svelte.ts';
  import { href } from '../lib/router.svelte.ts';
  import { countLines } from '../lib/repertoire/model.ts';

  let q = $state('');
  let side = $state<'all' | 'white' | 'black'>('all');

  const GROUPS = [
    { id: 'white-e4', title: 'White, 1.e4' },
    { id: 'white-d4', title: 'White, 1.d4' },
    { id: 'white-flank', title: 'White, flank openings' },
    { id: 'black-e4', title: 'Black against 1.e4' },
    { id: 'black-d4', title: 'Black against 1.d4 and 1.c4' },
  ] as const;

  const filtered = $derived(
    OPENINGS.filter(
      (o) =>
        (side === 'all' || o.side === side) &&
        (!q || (o.name + ' ' + o.eco + ' ' + o.summary + ' ' + o.lines.map((l) => l.name).join(' ')).toLowerCase().includes(q.toLowerCase())),
    ),
  );
</script>

<div class="page">
  <header class="intro">
    <div class="page-head">
      <h1>Opening library</h1>
      <p class="muted">
        Choose an opening to study its plans, then play it. Your opponent follows the line you picked, answers the way players at your rating do once the line
        ends, and hands over to Stockfish when the database runs out.
      </p>
    </div>
    <a class="btn primary lg" href={href('play')}>Play a game</a>
  </header>

  {#if repertoires.list.length}
    <section class="stack">
      <div class="row"><h2>Your repertoires</h2><span class="spacer"></span><a href={href('repertoires')}>Manage</a></div>
      <div class="reps">
        {#each repertoires.list.slice(0, 6) as r}
          <div class="rep sheet">
            <a class="rname" href={href(`repertoire/${r.id}`)}>{r.name}</a>
            <span class="faint small">{r.color === 'white' ? 'White' : 'Black'} · {countLines(r.root)} lines</span>
            <span class="row">
              <a class="btn small" href={href('play', { rep: r.id })}>Play</a>
              <a class="btn small" href={href('drill', { rep: r.id })}>Drill</a>
            </span>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <section class="stack">
    <div class="row filters">
      <div class="seg" role="group" aria-label="Side">
        <button class:on={side === 'all'} onclick={() => (side = 'all')}>All</button>
        <button class:on={side === 'white'} onclick={() => (side = 'white')}>White</button>
        <button class:on={side === 'black'} onclick={() => (side = 'black')}>Black</button>
      </div>
      <input id="lib-search" type="search" placeholder="Search by name, line or ECO code" bind:value={q} aria-label="Search openings" />
      <span class="spacer"></span>
      <span class="faint small">{filtered.length} openings</span>
    </div>

    {#each GROUPS as g}
      {@const items = filtered.filter((o) => o.group === g.id)}
      {#if items.length}
        <div class="group">
          <h2>{g.title}</h2>
          <div class="grid">
            {#each items as o (o.id)}
              <OpeningCard {o} />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
    {#if !filtered.length}<p class="muted">No opening matches “{q}”.</p>{/if}
  </section>
</div>

<style>
  .intro { display: flex; align-items: flex-end; gap: 24px; justify-content: space-between; flex-wrap: wrap; padding-bottom: 4px; }
  .group { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
  .group h2 { font-size: 1.25rem; border-bottom: 1px solid var(--rule); padding-bottom: 6px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 12px; }
  .reps { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 12px; }
  .rep { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
  .rname { font-family: var(--font-display); font-size: 1.1rem; color: var(--ink); }
  .filters input { min-width: min(280px, 100%); }
  @media (max-width: 480px) { .grid { grid-template-columns: minmax(0, 1fr); } }
</style>
