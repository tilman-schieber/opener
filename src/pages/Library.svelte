<script lang="ts">
  import { OPENINGS } from '../lib/library/index.ts';
  import OpeningCard from '../components/OpeningCard.svelte';
  import { repertoires } from '../lib/repertoire/store.svelte.ts';
  import { href } from '../lib/router.svelte.ts';
  import { countLines } from '../lib/repertoire/model.ts';
  import { settings } from '../lib/settings.svelte.ts';
  import { buildOpeningTree, filterTree, pathTo, type TreeNode } from '../lib/library/tree.ts';
  import { loadNames } from '../lib/explorer/names.ts';
  import TreeBranch from '../components/TreeBranch.svelte';
  import OpeningPreview from '../components/OpeningPreview.svelte';
  import type { LibraryOpening } from '../lib/library/types.ts';

  let q = $state('');
  let side = $state<'all' | 'white' | 'black'>('all');

  const GROUPS = [
    { id: 'white-e4', title: 'White, 1.e4' },
    { id: 'white-d4', title: 'White, 1.d4' },
    { id: 'white-flank', title: 'White, flank openings' },
    { id: 'black-e4', title: 'Black against 1.e4' },
    { id: 'black-d4', title: 'Black against 1.d4 and 1.c4' },
  ] as const;

  // ---------------------------------------------------------------- tree view
  const fullTree = buildOpeningTree(OPENINGS);
  let namesReady = $state(false);
  loadNames().then(() => (namesReady = true));

  const matches = (o: LibraryOpening) =>
    (side === 'all' || o.side === side) &&
    (!q || (o.name + ' ' + o.eco + ' ' + o.summary + ' ' + o.lines.map((l) => l.name).join(' ')).toLowerCase().includes(q.toLowerCase()));
  const tree = $derived(filterTree(fullTree, matches));

  // First move and the replies to it start open
  // First moves, the replies to them, and the branch of the initially selected opening start open
  const initialOpen = new Set<string>([...fullTree.children.map((c) => c.id), ...fullTree.children.flatMap((c) => c.children.map((g) => g.id))]);
  for (const n of pathTo(fullTree, 'italian-game')) initialOpen.add(n.id);
  let expanded = $state(initialOpen);
  function toggle(id: string) {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    expanded = next;
  }

  type Sel = { kind: 'node'; node: TreeNode } | { kind: 'opening'; opening: LibraryOpening; node: TreeNode };
  const first = OPENINGS.find((o) => o.id === 'italian-game') ?? OPENINGS[0];
  let sel = $state<Sel>({ kind: 'opening', opening: first, node: pathTo(fullTree, first.id).at(-1)! });
  const selectedId = $derived(sel.kind === 'opening' ? `opening:${sel.opening.id}` : `node:${sel.node.id}`);

  /** Select an opening and open the branches leading to it */
  function pick(o: LibraryOpening, n: TreeNode) {
    sel = { kind: 'opening', opening: o, node: n };
    const next = new Set(expanded);
    for (const p of pathTo(fullTree, o.id)) next.add(p.id);
    expanded = next;
  }

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
      <div class="seg" role="group" aria-label="View">
        <button class:on={settings.libraryView === 'tree'} onclick={() => (settings.libraryView = 'tree')}>Move tree</button>
        <button class:on={settings.libraryView === 'cards'} onclick={() => (settings.libraryView = 'cards')}>Cards</button>
      </div>
      <div class="seg" role="group" aria-label="Side">
        <button class:on={side === 'all'} onclick={() => (side = 'all')}>All</button>
        <button class:on={side === 'white'} onclick={() => (side = 'white')}>White</button>
        <button class:on={side === 'black'} onclick={() => (side = 'black')}>Black</button>
      </div>
      <input id="lib-search" type="search" placeholder="Search by name, line or ECO code" bind:value={q} aria-label="Search openings" />
      <span class="spacer"></span>
      <span class="faint small">{filtered.length} openings</span>
    </div>

    {#if settings.libraryView === 'tree'}
      <div class="treeview">
        <div class="sheet treebox">
          {#if tree}
            <ul class="roots">
              {#each tree.children as c (c.id)}
                <TreeBranch node={c} depth={0} {expanded} openAll={!!q} selected={selectedId} {namesReady} ontoggle={toggle} onselect={(x) => (sel = x)} />
              {/each}
            </ul>
          {/if}
          <p class="faint small legend"><span class="sw white"></span> you play White <span class="sw black"></span> you play Black · hover a move to see the position</p>
        </div>
        <OpeningPreview {sel} {namesReady} onpick={pick} />
      </div>
    {:else}
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
    {/if}
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
  .treeview { display: grid; grid-template-columns: minmax(0, 1fr) minmax(300px, 400px); gap: 20px; align-items: start; }
  .treebox { padding: 8px 6px; }
  .roots { list-style: none; margin: 0; padding: 0; }
  .legend { display: flex; align-items: center; gap: 6px; padding: 10px 10px 4px; border-top: 1px solid var(--rule); margin-top: 8px; }
  .sw { width: 10px; height: 10px; border-radius: 2px; border: 1px solid var(--ink-2); display: inline-block; }
  .sw.white { background: #fff; }
  .sw.black { background: #111827; border-color: var(--ink-3); margin-left: 8px; }
  @media (max-width: 900px) { .treeview { grid-template-columns: minmax(0, 1fr); } }
  @media (max-width: 480px) { .grid { grid-template-columns: minmax(0, 1fr); } }
</style>
