<script lang="ts">
  import { OPENINGS } from '../lib/library/index.ts';
  import OpeningCard from '../components/OpeningCard.svelte';
  import { repertoires } from '../lib/repertoire/store.svelte.ts';
  import { href } from '../lib/router.svelte.ts';
  import { countLines } from '../lib/repertoire/model.ts';

  let q = $state('');
  let side = $state<'all' | 'white' | 'black'>('all');

  const GROUPS = [
    { id: 'white-e4', title: 'As White: 1.e4' },
    { id: 'white-d4', title: 'As White: 1.d4' },
    { id: 'white-flank', title: 'As White: flank openings' },
    { id: 'black-e4', title: 'As Black against 1.e4' },
    { id: 'black-d4', title: 'As Black against 1.d4 / 1.c4' },
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
  <section class="hero">
    <div>
      <h1>Learn openings by <em>playing</em> them.</h1>
      <p class="muted lead">
        Pick an opening, and a human-like opponent follows your line, then keeps going the way real players at your level do. The explorer and key ideas stay
        beside the board the whole game.
      </p>
      <div class="row">
        <a class="btn primary lg" href={href('play')}>⚔️ Start a game</a>
        <a class="btn lg" href={href('explore')}>🧭 Open the explorer</a>
      </div>
    </div>
  </section>

  {#if repertoires.list.length}
    <section>
      <div class="row head"><h2>Your repertoires</h2><span class="spacer"></span><a href={href('repertoires')}>Manage →</a></div>
      <div class="reps">
        {#each repertoires.list.slice(0, 6) as r}
          <div class="card rep">
            <a href={href(`repertoire/${r.id}`)}><strong>{r.name}</strong></a>
            <span class="muted small">{r.color === 'white' ? '♔ White' : '♚ Black'} · {countLines(r.root)} lines</span>
            <span class="row">
              <a class="btn small" href={href('play', { rep: r.id })}>Play</a>
              <a class="btn small" href={href('drill', { rep: r.id })}>Drill</a>
            </span>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <section>
    <div class="row head">
      <h2>Opening library</h2>
      <span class="spacer"></span>
      <div class="seg">
        <button class:on={side === 'all'} onclick={() => (side = 'all')}>All</button>
        <button class:on={side === 'white'} onclick={() => (side = 'white')}>White</button>
        <button class:on={side === 'black'} onclick={() => (side = 'black')}>Black</button>
      </div>
      <input type="search" placeholder="Search openings, lines, ECO…" bind:value={q} />
    </div>

    {#each GROUPS as g}
      {@const items = filtered.filter((o) => o.group === g.id)}
      {#if items.length}
        <h3 class="group">{g.title}</h3>
        <div class="grid-cards">
          {#each items as o (o.id)}
            <OpeningCard {o} />
          {/each}
        </div>
      {/if}
    {/each}
    {#if !filtered.length}<p class="muted">No opening matches “{q}”.</p>{/if}
  </section>
</div>

<style>
  .page { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 34px; }
  .hero { padding: 26px 0 4px; }
  .hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); max-width: 18em; }
  .hero em { color: var(--accent); font-style: normal; }
  :global([data-theme='club']) .hero em { font-style: italic; }
  .lead { font-size: 1.08rem; max-width: 42em; margin-bottom: 18px; }
  .head { margin-bottom: 12px; }
  .head h2 { margin: 0; }
  .group { margin: 22px 0 10px; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em; font-family: var(--font-body); }
  :global([data-theme='club']) .group { text-transform: none; letter-spacing: 0; font-family: var(--font-display); font-size: 1.15rem; color: var(--text); border-bottom: 1px solid var(--border); padding-bottom: 4px; }
  .reps { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .rep { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; color: var(--text); text-decoration: none !important; }
  input[type='search'] { min-width: 240px; }
</style>
