<script lang="ts">
  import TreeBranch from './TreeBranch.svelte';
  import Icon from './Icon.svelte';
  import { segmentLabel, count, type TreeNode } from '../lib/library/tree.ts';
  import { nameForPath } from '../lib/explorer/names.ts';
  import { INITIAL_FEN } from '../lib/chess/moves.ts';
  import { showPreview, hidePreview } from '../lib/preview.svelte.ts';
  import type { LibraryOpening } from '../lib/library/types.ts';

  interface Props {
    node: TreeNode;
    depth: number;
    expanded: Set<string>;
    /** Open every branch (while searching) */
    openAll: boolean;
    selected: string;
    namesReady: boolean;
    ontoggle: (id: string) => void;
    onselect: (sel: { kind: 'node'; node: TreeNode } | { kind: 'opening'; opening: LibraryOpening; node: TreeNode }) => void;
  }

  let { node, depth, expanded, openAll, selected, namesReady, ontoggle, onselect }: Props = $props();

  const open = $derived(openAll || expanded.has(node.id));
  const hasKids = $derived(node.children.length > 0 || node.items.length > 0);
  const label = $derived(segmentLabel(node));
  const eco = $derived.by(() => {
    void namesReady;
    return nameForPath([INITIAL_FEN, ...node.path.map((p) => p.fen)]);
  });
  const total = $derived(count(node));
  const leaf = $derived(node.items.length === 1 && node.children.length === 0);
  const LEVEL = ['', 'Beginner', 'Club', 'Advanced'];
  const isGambit = (o: LibraryOpening) => /gambit/i.test(o.name);

  function preview(e: Event, fen: string, last?: string) {
    showPreview(e.currentTarget as Element, { fen, arrows: last ? [[last.slice(0, 2), last.slice(2, 4)]] : [], orientation: 'white' });
  }
</script>

<li class="branch">
  {#if leaf}
    {@const o = node.items[0]}
    <!-- A branch holding exactly one opening and nothing below it: one row -->
    <button
      class="item leaf"
      class:sel={selected === `opening:${o.id}`}
      style:padding-left="{depth * 20 + 26}px"
      onclick={() => onselect({ kind: 'opening', opening: o, node })}
      onmouseenter={(e) => preview(e, node.fen, node.path[node.path.length - 1]?.uci)}
      onmouseleave={hidePreview}
    >
      <span class="moves">{label}</span>
      <span class="sw {o.side}" title="You play {o.side}"></span>
      <span class="oname">{o.name}</span>
      {#if isGambit(o)}<span class="chip warn">gambit</span>{/if}
      <span class="spacer"></span>
      <span class="lvl">{LEVEL[o.difficulty]}</span>
    </button>
  {:else}
    <div class="row" class:sel={selected === `node:${node.id}`} style:padding-left="{depth * 20}px">
      <button class="chev" class:open onclick={() => ontoggle(node.id)} aria-label={open ? 'Collapse' : 'Expand'} aria-expanded={open} disabled={!hasKids}>
        <Icon name="chevron-down" size={14} />
      </button>
      <button
        class="node"
        onclick={() => {
          onselect({ kind: 'node', node });
          if (!open) ontoggle(node.id);
        }}
        onmouseenter={(e) => preview(e, node.fen, node.path[node.path.length - 1]?.uci)}
        onmouseleave={hidePreview}
      >
        <span class="moves">{label}</span>
        {#if eco}<span class="eco">{eco.name}</span>{/if}
      </button>
      <span class="n">{total}</span>
    </div>

    {#if open}
      <ul>
        {#each node.items as o (o.id)}
          <li>
            <button
              class="item"
              class:sel={selected === `opening:${o.id}`}
              style:padding-left="{(depth + 1) * 20 + 22}px"
              onclick={() => onselect({ kind: 'opening', opening: o, node })}
            >
              <span class="sw {o.side}" title="You play {o.side}"></span>
              <span class="oname">{o.name}</span>
              {#if isGambit(o)}<span class="chip warn">gambit</span>{/if}
              <span class="spacer"></span>
              <span class="lvl">{LEVEL[o.difficulty]}</span>
            </button>
          </li>
        {/each}
        {#each node.children as c (c.id)}
          <TreeBranch node={c} depth={depth + 1} {expanded} {openAll} {selected} {namesReady} {ontoggle} {onselect} />
        {/each}
      </ul>
    {/if}
  {/if}
</li>

<style>
  ul { list-style: none; margin: 0; padding: 0; }
  li { margin: 0; }
  .row { display: flex; align-items: center; gap: 4px; border-radius: var(--radius-sm); }
  .row:hover, .row.sel { background: var(--sheet-2); }
  .row.sel .moves { color: var(--blue); }
  .chev { display: inline-flex; background: none; border: 0; padding: 4px; color: var(--ink-3); cursor: pointer; transform: rotate(-90deg); transition: transform 0.12s; }
  .chev.open { transform: none; }
  .chev:disabled { visibility: hidden; }
  .node { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 10px; background: none; border: 0; padding: 6px 4px; cursor: pointer; text-align: left; font: inherit; color: var(--ink); }
  .moves { font-family: var(--font-mono); font-weight: 600; font-size: 0.9rem; white-space: nowrap; }
  .eco { font-family: var(--font-display); font-style: italic; color: var(--ink-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .n { font-family: var(--font-mono); font-size: 0.75rem; color: var(--ink-3); padding-right: 8px; }
  .item { display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: 0; padding: 6px 8px; border-radius: var(--radius-sm); cursor: pointer; text-align: left; font: inherit; color: var(--ink); }
  .item:hover { background: var(--sheet-2); }
  .item.sel { background: var(--blue-wash); }
  .item.sel .oname { color: var(--blue); }
  .leaf .moves { min-width: 0; margin-right: 4px; }
  .oname { font-family: var(--font-display); font-size: 1.08rem; font-weight: 500; }
  .sw { width: 10px; height: 10px; border-radius: 2px; border: 1px solid var(--ink-2); flex-shrink: 0; }
  .sw.white { background: #fff; }
  .sw.black { background: #111827; border-color: var(--ink-3); }
  .sw.white { border-color: var(--ink-2); }
  .lvl { font-size: 0.75rem; color: var(--ink-3); }
  .spacer { flex: 1; }
</style>
