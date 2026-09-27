<script lang="ts">
  import type { LibraryOpening } from '../lib/library/types.ts';
  import { href } from '../lib/router.svelte.ts';
  import MiniBoard from './MiniBoard.svelte';
  import { playLine, formatLine } from '../lib/chess/moves.ts';

  let { o }: { o: LibraryOpening } = $props();
  const plies = $derived(playLine(o.base));
  const last = $derived(plies[plies.length - 1]);
  const LEVEL = ['', 'Beginner', 'Club', 'Advanced'];
</script>

<article class="ocard">
  <div class="thumb"><MiniBoard fen={last?.fen} orientation={o.side} lastMove={last?.uci} /></div>
  <div class="body">
    <h3><a href={href(`opening/${o.id}`)}>{o.name}</a></h3>
    <p class="line mono">{formatLine(plies.map((p) => p.san))}</p>
    <p class="meta">
      <span class="side"><span class="sw {o.side}"></span>{o.side === 'white' ? 'White' : 'Black'}</span>
      <span class="eco mono">{o.eco}</span>
      <span>{LEVEL[o.difficulty]}</span>
      <span>{o.lines.length} lines</span>
    </p>
  </div>
</article>

<style>
  .ocard {
    position: relative;
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 14px;
    padding: 12px;
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    transition: border-color 0.12s;
  }
  .ocard:hover { border-color: var(--ink-3); }
  .ocard:focus-within { box-shadow: var(--focus); }
  .body { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  h3 { font-family: var(--font-display); font-weight: 500; font-size: 1.2rem; }
  h3 a { color: var(--ink); text-decoration: none !important; }
  h3 a::after { content: ''; position: absolute; inset: 0; }
  h3 a:focus-visible { box-shadow: none; }
  .line { font-size: 0.8rem; color: var(--ink-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 0.78rem; color: var(--ink-3); margin-top: auto; }
  .side { display: inline-flex; align-items: center; gap: 5px; color: var(--ink-2); font-weight: 500; }
  .sw { width: 10px; height: 10px; border-radius: 2px; border: 1px solid var(--ink-2); }
  .sw.white { background: #fff; }
  .sw.black { background: #1a2130; }
</style>
