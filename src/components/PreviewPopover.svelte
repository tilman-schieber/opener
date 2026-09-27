<script lang="ts">
  import { preview } from '../lib/preview.svelte.ts';
  import MiniBoard from './MiniBoard.svelte';

  const SIZE = 220;
  const pos = $derived.by(() => {
    const r = preview.rect;
    if (!r) return { left: 0, top: 0 };
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(8, r.left + r.width / 2 - SIZE / 2), vw - SIZE - 8);
    const below = r.bottom + 8;
    const top = below + SIZE + 40 > vh ? Math.max(8, r.top - SIZE - 40) : below;
    return { left, top };
  });
</script>

{#if preview.data && preview.rect}
  <div class="pop" style:left="{pos.left}px" style:top="{pos.top}px" style:width="{SIZE}px" role="tooltip">
    <MiniBoard fen={preview.data.fen} orientation={preview.data.orientation ?? 'white'} arrows={preview.data.arrows} mark={preview.data.square} />
    {#if preview.data.caption}<div class="cap">{preview.data.caption}</div>{/if}
  </div>
{/if}

<style>
  .pop {
    position: fixed;
    z-index: 100;
    padding: 6px;
    background: var(--sheet);
    border: 1px solid var(--rule-strong);
    border-radius: var(--radius);
    box-shadow: 0 12px 32px -8px rgb(0 0 0 / 0.35);
    pointer-events: none;
  }
  .cap { font-family: var(--font-mono); font-size: 0.78rem; color: var(--ink-2); padding: 5px 2px 0; }
</style>
