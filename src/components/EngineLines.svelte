<script lang="ts">
  import { getAnalysisEngine, formatScore, type Analysis } from '../lib/engine/engine.ts';
  import { playUci } from '../lib/chess/moves.ts';

  interface Props {
    fen: string;
    enabled: boolean;
    multipv?: number;
    depth?: number;
    analysis?: Analysis | null;
  }

  let { fen, enabled, multipv = 3, depth = 20, analysis = $bindable(null) }: Props = $props();

  $effect(() => {
    if (!enabled) {
      analysis = null;
      return;
    }
    const f = fen;
    let live = true;
    const engine = getAnalysisEngine();
    engine
      .analyse(f, {
        depth,
        multipv,
        onInfo: (a) => {
          if (live && a.fen === f && a.depth >= 6) analysis = a;
        },
      })
      .then((a) => {
        if (live && a.lines.length) analysis = a;
      });
    return () => {
      live = false;
      engine.stop();
    };
  });

  function pvSan(start: string, pv: string[], max = 8): string {
    let f = start;
    const out: string[] = [];
    const turnWhite = start.split(' ')[1] === 'w';
    const moveNo = Number(start.split(' ')[5] ?? 1);
    for (const [i, u] of pv.slice(0, max).entries()) {
      const p = playUci(f, u);
      if (!p) break;
      const ply = i + (turnWhite ? 0 : 1);
      const num = moveNo + Math.floor(ply / 2);
      if (ply % 2 === 0) out.push(`${num}.`);
      else if (i === 0) out.push(`${num}…`);
      out.push(p.san);
      f = p.fen;
    }
    return out.join(' ');
  }
</script>

{#if enabled}
  <div class="lines">
    {#if analysis && analysis.fen === fen}
      {#each analysis.lines as l}
        <div class="line">
          <span class="score" class:neg={(l.cp ?? 0) < 0 || (l.mate ?? 0) < 0}>{formatScore(l)}</span>
          <span class="pv">{pvSan(fen, l.pv)}</span>
        </div>
      {/each}
      <div class="muted small">depth {analysis.depth} · Stockfish 19 lite</div>
    {:else}
      <div class="muted small">Thinking…</div>
    {/if}
  </div>
{/if}

<style>
  .lines { display: flex; flex-direction: column; gap: 3px; }
  .line { display: flex; gap: 8px; font-size: 0.85rem; white-space: nowrap; overflow: hidden; }
  .score { font-family: var(--font-mono); font-weight: 800; min-width: 3.4em; text-align: right; }
  .score.neg { color: var(--text-muted); }
  .pv { font-family: var(--font-mono); overflow: hidden; text-overflow: ellipsis; color: var(--text-muted); }
</style>
