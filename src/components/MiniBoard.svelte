<script lang="ts">
  import { posFromFen, INITIAL_FEN } from '../lib/chess/moves.ts';
  import { settings } from '../lib/settings.svelte.ts';

  interface Props {
    fen?: string;
    orientation?: 'white' | 'black';
    lastMove?: string;
    arrows?: [string, string][];
    /** A square to circle */
    mark?: string;
    boardTheme?: string;
  }
  let { fen = INITIAL_FEN, orientation = 'white', lastMove, arrows = [], mark, boardTheme }: Props = $props();

  const ROLE: Record<string, string> = { pawn: 'pawn', knight: 'knight', bishop: 'bishop', rook: 'rook', queen: 'queen', king: 'king' };

  const squares = $derived.by(() => {
    const pos = posFromFen(fen);
    const hl = lastMove ? [lastMove.slice(0, 2), lastMove.slice(2, 4)] : [];
    const out: { dark: boolean; piece?: string; hl: boolean }[] = [];
    for (let r = 7; r >= 0; r--)
      for (let f = 0; f < 8; f++) {
        const [rr, ff] = orientation === 'white' ? [r, f] : [7 - r, 7 - f];
        const p = pos.board.get(rr * 8 + ff);
        const name = String.fromCharCode(97 + ff) + (rr + 1);
        out.push({ dark: (rr + ff) % 2 === 0, piece: p ? `${p.color} ${ROLE[p.role]}` : undefined, hl: hl.includes(name) });
      }
    return out;
  });

  /** centre of a square in a 0..8 coordinate space */
  function xy(sq: string): [number, number] {
    const f = sq.charCodeAt(0) - 97;
    const r = sq.charCodeAt(1) - 49;
    return orientation === 'white' ? [f + 0.5, 7 - r + 0.5] : [7 - f + 0.5, r + 0.5];
  }

  function arrowPath([a, b]: [string, string]) {
    const [x1, y1] = xy(a);
    const [x2, y2] = xy(b);
    const len = Math.hypot(x2 - x1, y2 - y1);
    const shorten = 0.32;
    return { x1, y1, x2: x2 - ((x2 - x1) / len) * shorten, y2: y2 - ((y2 - y1) / len) * shorten };
  }
</script>

<div class="mini cg-wrap board-{boardTheme ?? settings.boardTheme}">
  {#each squares as s}
    <div class="sq" class:dark={s.dark} class:hl={s.hl}>
      {#if s.piece}<piece class={s.piece}></piece>{/if}
    </div>
  {/each}
  {#if arrows.length || mark}
    <svg viewBox="0 0 8 8" aria-hidden="true">
      <defs>
        <marker id="mb-head" viewBox="0 0 10 10" refX="3" refY="5" markerWidth="3.2" markerHeight="3.2" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="var(--arrow)" />
        </marker>
      </defs>
      {#if mark}
        {@const [cx, cy] = xy(mark)}
        <circle {cx} {cy} r="0.44" fill="none" stroke="var(--arrow)" stroke-width="0.09" />
      {/if}
      {#each arrows as a, i}
        {@const p = arrowPath(a)}
        <line x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="var(--arrow)" stroke-width="0.16" stroke-linecap="round" marker-end="url(#mb-head)" opacity={i === arrows.length - 1 ? 0.9 : 0.55} />
      {/each}
    </svg>
  {/if}
</div>

<style>
  .mini {
    --arrow: #1f7a4a;
    position: relative;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    aspect-ratio: 1;
    max-width: 100%;
    border-radius: 3px;
    overflow: hidden;
  }
  .sq { background: var(--sq-light); position: relative; }
  .sq.dark { background: var(--sq-dark); }
  .sq.hl::after { content: ''; position: absolute; inset: 0; background: rgb(36 70 166 / 0.28); }
  .mini piece { position: absolute; inset: 0; width: 100%; height: 100%; background-size: cover; z-index: 1; transform: none; }
  svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 2; pointer-events: none; }
</style>
