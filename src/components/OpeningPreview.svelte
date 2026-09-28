<script lang="ts">
  import MiniBoard from './MiniBoard.svelte';
  import MoveSeq from './MoveSeq.svelte';
  import Rich from './Rich.svelte';
  import { href } from '../lib/router.svelte.ts';
  import { openingContext } from '../lib/library/context.ts';
  import { segmentLabel, type TreeNode } from '../lib/library/tree.ts';
  import { nameForPath } from '../lib/explorer/names.ts';
  import { playLine, INITIAL_FEN } from '../lib/chess/moves.ts';
  import type { LibraryOpening } from '../lib/library/types.ts';

  type Sel = { kind: 'node'; node: TreeNode } | { kind: 'opening'; opening: LibraryOpening; node: TreeNode };
  let { sel, namesReady, onpick }: { sel: Sel; namesReady: boolean; onpick: (o: LibraryOpening, n: TreeNode) => void } = $props();

  const LEVEL = ['', 'Beginner-friendly', 'Club level', 'Theory-heavy'];
  const node = $derived(sel.node);
  const o = $derived(sel.kind === 'opening' ? sel.opening : undefined);
  const plies = $derived(o ? playLine(o.base) : node.path);
  const last = $derived(plies[plies.length - 1]);
  const eco = $derived.by(() => {
    void namesReady;
    return nameForPath([INITIAL_FEN, ...node.path.map((p) => p.fen)]);
  });
  /** Openings that branch off from here, with the node they sit on */
  const below = $derived.by(() => {
    const out: { o: LibraryOpening; n: TreeNode }[] = [];
    const walk = (n: TreeNode) => n.children.forEach((c) => (c.items.forEach((x) => out.push({ o: x, n: c })), walk(c)));
    if (o) walk(node);
    else {
      node.items.forEach((x) => out.push({ o: x, n: node }));
      walk(node);
    }
    return out;
  });
</script>

<aside class="sheet preview">
  <div class="board"><MiniBoard fen={last?.fen ?? INITIAL_FEN} orientation={o?.side ?? 'white'} lastMove={last?.uci} /></div>

  {#if o}
    <p class="meta"><span class="chip eco">{o.eco}</span><span>You play {o.side}</span><span>{LEVEL[o.difficulty]}</span></p>
    <h2>{o.name}</h2>
    <MoveSeq moves={o.base} orientation={o.side} />
    <p class="sum"><Rich text={o.summary} ctx={openingContext(o)} /></p>
    <div class="row actions">
      <a class="btn primary" href={href(`learn/${o.id}`)}>Learn</a>
      <a class="btn" href={href('play', { rep: `lib:${o.id}` })}>Play</a>
      <a class="btn" href={href('drill', { rep: `lib:${o.id}` })}>Drill</a>
      <a class="btn ghost" href={href(`opening/${o.id}`)}>All details</a>
    </div>
    <p class="faint small">{o.lines.length} lines · {o.traps.length} traps</p>
  {:else}
    <p class="meta">{#if eco}<span class="chip eco">{eco.eco}</span>{/if}<span>{segmentLabel(node)}</span></p>
    <h2>{eco?.name ?? 'Position'}</h2>
    <MoveSeq plies={node.path} />
    <div class="row actions">
      <a class="btn" href={href('explore', { moves: node.path.map((p) => p.uci).join(',') })}>Open in the explorer</a>
    </div>
  {/if}

  {#if below.length}
    <div class="below">
      <h3 class="label">{o ? 'Branches from here' : 'Openings in this branch'}</h3>
      <ul>
        {#each below as b}
          <li>
            <button onclick={() => onpick(b.o, b.n)}>
              <span class="sw {b.o.side}"></span>
              <span class="bname">{b.o.name}</span>
              <span class="mono faint small">{segmentLabel(b.n)}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</aside>

<style>
  .preview { padding: 16px; display: flex; flex-direction: column; gap: 10px; position: sticky; top: 76px; }
  .board { max-width: 280px; }
  .meta { display: flex; gap: 10px; align-items: center; font-size: 0.85rem; color: var(--ink-2); flex-wrap: wrap; }
  h2 { font-size: 1.5rem; }
  .sum { line-height: 1.65; }
  .actions { gap: 6px; }
  .below { border-top: 1px solid var(--rule); padding-top: 10px; display: flex; flex-direction: column; gap: 6px; }
  .below ul { list-style: none; padding: 0; margin: 0; }
  .below li { margin: 0; }
  .below button { display: flex; align-items: center; gap: 8px; width: 100%; background: none; border: 0; padding: 5px 4px; border-radius: var(--radius-sm); cursor: pointer; font: inherit; color: var(--ink); text-align: left; }
  .below button:hover { background: var(--sheet-2); }
  .bname { font-family: var(--font-display); font-size: 1.02rem; }
  .sw { width: 10px; height: 10px; border-radius: 2px; border: 1px solid var(--ink-2); flex-shrink: 0; }
  .sw.white { background: #fff; }
  .sw.black { background: #111827; border-color: var(--ink-3); }
  @media (max-width: 900px) { .preview { position: static; } }
</style>
