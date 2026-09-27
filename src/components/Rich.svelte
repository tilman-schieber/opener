<script lang="ts">
  import { parseNotation, type NotationContext } from '../lib/chess/notation.ts';
  import { showPreview, hidePreview } from '../lib/preview.svelte.ts';

  interface Props {
    text: string;
    ctx: NotationContext;
    orientation?: 'white' | 'black';
  }
  let { text, ctx, orientation = ctx.side }: Props = $props();

  const segs = $derived(parseNotation(text, ctx));
</script>

{#each segs as s}{#if s.kind === 'text'}{s.text}{:else if s.kind === 'square'}<span
      class="sqr"
      role="button"
      tabindex="0"
      onmouseenter={(e) => showPreview(e.currentTarget, { fen: s.fen, square: s.square, orientation })}
      onfocus={(e) => showPreview(e.currentTarget, { fen: s.fen, square: s.square, orientation })}
      onmouseleave={hidePreview}
      onblur={hidePreview}>{s.text}</span
    >{:else if s.fen}<span
      class="mv {s.side}"
      role="button"
      tabindex="0"
      onmouseenter={(e) => showPreview(e.currentTarget, { fen: s.fen!, arrows: s.arrows, orientation })}
      onfocus={(e) => showPreview(e.currentTarget, { fen: s.fen!, arrows: s.arrows, orientation })}
      onmouseleave={hidePreview}
      onblur={hidePreview}>{s.text}</span
    >{:else}<span class="mv off">{s.text}</span>{/if}{/each}

<style>
  .mv {
    font-family: var(--font-mono);
    font-size: 0.9em;
    font-weight: 600;
    white-space: nowrap;
    padding: 0.05em 0.35em;
    border-radius: 4px;
    background: var(--blue-wash);
    color: var(--blue);
    cursor: help;
    transition: background 0.1s, color 0.1s;
  }
  .mv:hover, .mv:focus-visible { background: var(--blue); color: var(--blue-ink); outline: none; }
  .mv.off { background: var(--sheet-2); color: var(--ink-2); cursor: default; }
  .sqr {
    font-family: var(--font-mono);
    font-size: 0.9em;
    font-weight: 500;
    border-bottom: 1px dotted var(--ink-3);
    cursor: help;
  }
  .sqr:hover, .sqr:focus-visible { color: var(--blue); border-bottom-color: var(--blue); outline: none; }
</style>
