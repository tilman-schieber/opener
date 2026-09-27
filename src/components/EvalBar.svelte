<script lang="ts">
  import { winPercent, formatScore, type EngineLine } from '../lib/engine/engine.ts';
  interface Props {
    line?: Pick<EngineLine, 'cp' | 'mate'>;
    orientation?: 'white' | 'black';
  }
  let { line, orientation = 'white' }: Props = $props();
  const white = $derived(winPercent(line));
</script>

<div class="evalbar" class:flip={orientation === 'black'} title="Evaluation {formatScore(line)}">
  <div class="fill" style:height="{white}%"></div>
  <span class="score" class:top={white < 50}>{formatScore(line)}</span>
</div>

<style>
  .evalbar {
    width: 22px;
    background: var(--bar-black);
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column-reverse;
    flex-shrink: 0;
    border: 1px solid var(--rule);
  }
  .evalbar.flip { flex-direction: column; }
  .fill { background: var(--bar-white); transition: height 0.4s ease; }
  .score {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    text-align: center;
    font-size: 9px;
    font-weight: 800;
    color: #333;
  }
  .score.top { bottom: auto; top: 4px; color: #eee; }
  .flip .score { top: 4px; bottom: auto; }
  .flip .score.top { top: auto; bottom: 4px; }
</style>
