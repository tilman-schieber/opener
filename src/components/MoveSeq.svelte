<script lang="ts">
  import { playLine, INITIAL_FEN, type Ply } from '../lib/chess/moves.ts';
  import { showPreview, hidePreview } from '../lib/preview.svelte.ts';

  interface Props {
    /** SAN move text from the initial position, or ready-made plies */
    moves?: string;
    plies?: Ply[];
    orientation?: 'white' | 'black';
    /** Plies before this index are dimmed (e.g. the shared opening moves) */
    from?: number;
    /** Click on a move: receives the number of plies up to and including it */
    onselect?: (cursor: number) => void;
    /** Highlight one ply (0-based) */
    highlight?: number;
  }
  let { moves = '', plies, orientation = 'white', from = 0, onselect, highlight }: Props = $props();

  const list = $derived(plies ?? playLine(moves));

  function enter(e: Event, i: number) {
    const p = list[i];
    showPreview(e.currentTarget as Element, {
      fen: p.fen,
      arrows: [[p.uci.slice(0, 2), p.uci.slice(2, 4)]],
      orientation,
      caption: `${Math.floor(i / 2) + 1}${i % 2 ? '…' : '.'} ${p.san}`,
    });
  }
  void INITIAL_FEN;
</script>

<span class="seq">
  {#each list as p, i}
    {#if i % 2 === 0}<span class="num" class:dim={i < from}>{i / 2 + 1}.</span>{:else if i === 0}<span class="num">1…</span>{/if}
    <button
      type="button"
      class="m"
      class:dim={i < from}
      class:hi={i === highlight}
      onmouseenter={(e) => enter(e, i)}
      onfocus={(e) => enter(e, i)}
      onmouseleave={hidePreview}
      onblur={hidePreview}
      onclick={() => onselect?.(i + 1)}>{p.san}</button
    >
  {/each}
</span>

<style>
  .seq { font-family: var(--font-mono); font-size: 0.88rem; line-height: 1.9; }
  .num { color: var(--ink-3); margin-left: 0.35em; font-variant-numeric: tabular-nums; }
  .num:first-child { margin-left: 0; }
  .m {
    font: inherit;
    font-weight: 600;
    color: var(--ink);
    background: none;
    border: 0;
    padding: 0.05em 0.25em;
    border-radius: 4px;
    cursor: pointer;
  }
  .m:hover, .m:focus-visible { background: var(--blue); color: var(--blue-ink); outline: none; }
  .dim { color: var(--ink-3); font-weight: 400; }
  .hi { background: var(--amber-wash); color: var(--amber); }
</style>
