<script lang="ts">
  import { posFromFen, INITIAL_FEN } from '../lib/chess/moves.ts';
  import { settings } from '../lib/settings.svelte.ts';

  let { fen = INITIAL_FEN, orientation = 'white', lastMove }: { fen?: string; orientation?: 'white' | 'black'; lastMove?: string } = $props();

  const GLYPH: Record<string, string> = { pawn: 'p', knight: 'n', bishop: 'b', rook: 'r', queen: 'q', king: 'k' };

  const squares = $derived.by(() => {
    const pos = posFromFen(fen);
    const hl = lastMove ? [lastMove.slice(0, 2), lastMove.slice(2, 4)] : [];
    const out: { dark: boolean; piece?: string; hl: boolean }[] = [];
    for (let r = 7; r >= 0; r--)
      for (let f = 0; f < 8; f++) {
        const [rr, ff] = orientation === 'white' ? [r, f] : [7 - r, 7 - f];
        const sq = rr * 8 + ff;
        const p = pos.board.get(sq);
        const name = String.fromCharCode(97 + ff) + (rr + 1);
        out.push({ dark: (rr + ff) % 2 === 0, piece: p ? p.color[0] + GLYPH[p.role] : undefined, hl: hl.includes(name) });
      }
    return out;
  });
</script>

<div class="mini cg-wrap board-{settings.boardTheme}">
  {#each squares as s}
    <div class="sq" class:dark={s.dark} class:hl={s.hl}>
      {#if s.piece}<piece class="{s.piece[0] === 'w' ? 'white' : 'black'} {({ p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' } as Record<string, string>)[s.piece[1]]}"></piece>{/if}
    </div>
  {/each}
</div>

<style>
  .mini {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    aspect-ratio: 1;
    border-radius: calc(var(--board-radius) - 2px);
    overflow: hidden;
  }
  .sq { background: var(--sq-light); position: relative; }
  .sq.dark { background: var(--sq-dark); }
  .sq.hl::after { content: ''; position: absolute; inset: 0; background: rgb(155 199 0 / 0.41); }
  /* chessground piece sprites (cburnett) are keyed by `piece.white.pawn` etc. */
  .mini piece { position: absolute; inset: 0; width: 100%; height: 100%; background-size: cover; z-index: 1; transform: none; }
</style>
