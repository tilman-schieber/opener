<script lang="ts">
  interface Props {
    white: number;
    draws: number;
    black: number;
    height?: number;
  }
  let { white, draws, black, height = 18 }: Props = $props();
  const sum = $derived(white + draws + black || 1);
  const pct = (n: number) => (n / sum) * 100;
  const label = (n: number) => (pct(n) >= 12 ? `${Math.round(pct(n))}%` : '');
</script>

<div class="wdl" style:height="{height}px" title="White {Math.round(pct(white))}% · Draw {Math.round(pct(draws))}% · Black {Math.round(pct(black))}%">
  <span class="w" style:width="{pct(white)}%">{label(white)}</span>
  <span class="d" style:width="{pct(draws)}%">{label(draws)}</span>
  <span class="b" style:width="{pct(black)}%">{label(black)}</span>
</div>

<style>
  .wdl {
    display: flex;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    font-size: 0.7rem;
    font-weight: 700;
    line-height: 1;
    border: 1px solid var(--rule);
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
  .w { background: var(--bar-white); color: #333; }
  .d { background: var(--bar-draw); color: #fff; }
  .b { background: var(--bar-black); color: #eee; }
</style>
