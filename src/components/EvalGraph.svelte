<script lang="ts">
  import { winPercent } from '../lib/engine/engine.ts';
  import type { ReviewData } from '../lib/review/types.ts';

  interface Props {
    review: ReviewData;
    cursor: number;
    onselect: (cursor: number) => void;
    leftBookPly?: number;
  }
  let { review, cursor, onselect, leftBookPly }: Props = $props();

  const W = 600;
  const H = 120;
  const pts = $derived([winPercent(review.start), ...review.plies.map((p) => winPercent(p))]);
  const x = (i: number) => (pts.length > 1 ? (i / (pts.length - 1)) * W : 0);
  const y = (v: number) => H - (v / 100) * H;
  const area = $derived(`M0,${H} ` + pts.map((v, i) => `L${x(i)},${y(v)}`).join(' ') + ` L${W},${H} Z`);
  const line = $derived(pts.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' '));

  function click(e: MouseEvent) {
    const r = (e.currentTarget as SVGElement).getBoundingClientRect();
    const i = Math.round(((e.clientX - r.left) / r.width) * (pts.length - 1));
    onselect(Math.max(0, Math.min(pts.length - 1, i)));
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<svg viewBox="0 0 {W} {H}" preserveAspectRatio="none" onclick={click} role="img" aria-label="Evaluation graph">
  <rect width={W} height={H} class="bg" />
  <path d={area} class="area" />
  <line x1="0" x2={W} y1={H / 2} y2={H / 2} class="mid" />
  <path d={line} class="line" />
  {#if leftBookPly !== undefined}
    <line x1={x(leftBookPly + 1)} x2={x(leftBookPly + 1)} y1="0" y2={H} class="book" />
  {/if}
  {#each review.plies as p, i}
    {#if p.judgement}
      <circle cx={x(i + 1)} cy={y(pts[i + 1])} r="4" class={p.judgement} />
    {/if}
  {/each}
  <line x1={x(cursor)} x2={x(cursor)} y1="0" y2={H} class="cursor" />
</svg>

<style>
  svg { width: 100%; height: 120px; cursor: pointer; display: block; border-radius: var(--radius-sm); }
  .bg { fill: var(--bar-black); }
  .area { fill: var(--bar-white); }
  .mid { stroke: var(--bar-draw); stroke-dasharray: 4 4; stroke-width: 1; }
  .line { fill: none; stroke: var(--accent); stroke-width: 1.5; vector-effect: non-scaling-stroke; }
  .cursor { stroke: var(--accent); stroke-width: 2; vector-effect: non-scaling-stroke; }
  .book { stroke: var(--warn); stroke-width: 2; stroke-dasharray: 5 3; vector-effect: non-scaling-stroke; }
  .inaccuracy { fill: var(--warn); }
  .mistake { fill: #e07b22; }
  .blunder { fill: var(--bad); }
</style>
