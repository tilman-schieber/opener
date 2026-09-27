<script lang="ts">
  import { Chessground } from 'chessground';
  import type { Api } from 'chessground/api';
  import type { Key } from 'chessground/types';
  import type { DrawShape } from 'chessground/draw';
  import { onMount } from 'svelte';
  import { destsOf, isCheck, turnOf, posFromFen } from '../lib/chess/moves.ts';
  import { settings } from '../lib/settings.svelte.ts';

  interface Props {
    fen: string;
    orientation?: 'white' | 'black';
    /** Who may move pieces; null = view only */
    movable?: 'white' | 'black' | 'both' | null;
    lastMove?: string;
    shapes?: DrawShape[];
    onmove?: (uci: string) => void;
    /** Adds a short red flash (e.g. a wrong drill move) */
    flash?: number;
  }

  let { fen, orientation = 'white', movable = 'both', lastMove, shapes = [], onmove, flash = 0 }: Props = $props();

  let el: HTMLDivElement;
  let cg: Api | undefined;
  let shaking = $state(false);

  function config() {
    const turn = turnOf(fen);
    const canMove = movable === 'both' || movable === turn;
    return {
      fen: fen.split(' ')[0],
      orientation,
      turnColor: turn,
      check: isCheck(fen) ? turn : false,
      lastMove: lastMove ? ([lastMove.slice(0, 2), lastMove.slice(2, 4)] as Key[]) : undefined,
      movable: {
        free: false,
        color: canMove ? turn : undefined,
        dests: canMove ? (destsOf(fen) as Map<Key, Key[]>) : new Map(),
        showDests: true,
      },
    } as const;
  }

  function handleMove(orig: Key, dest: Key) {
    const pos = posFromFen(fen);
    const piece = pos.board.get(parseSquare(orig));
    const promo = piece?.role === 'pawn' && (dest[1] === '8' || dest[1] === '1') ? 'q' : '';
    onmove?.(orig + dest + promo);
  }

  function parseSquare(k: string): number {
    return (k.charCodeAt(1) - 49) * 8 + (k.charCodeAt(0) - 97);
  }

  onMount(() => {
    cg = Chessground(el, {
      ...config(),
      coordinates: true,
      animation: { enabled: true, duration: 180 },
      premovable: { enabled: false },
      highlight: { lastMove: true, check: true },
      drawable: { enabled: true, autoShapes: shapes },
      events: { move: (o, d) => handleMove(o as Key, d as Key) },
    });
    return () => cg?.destroy();
  });

  $effect(() => {
    // re-run whenever inputs change
    void fen, orientation, movable, lastMove, flash;
    cg?.set(config());
  });

  $effect(() => {
    cg?.setAutoShapes(shapes);
  });

  $effect(() => {
    if (!flash) return;
    shaking = true;
    const t = setTimeout(() => (shaking = false), 380);
    return () => clearTimeout(t);
  });
</script>

<div class="board board-{settings.boardTheme}" class:shaking>
  <div class="cg-wrap" bind:this={el}></div>
</div>

<style>
  .board {
    width: 100%;
    aspect-ratio: 1;
    position: relative;
    border-radius: var(--board-radius, 6px);
    overflow: hidden;
    box-shadow: var(--board-shadow);
  }
  .cg-wrap {
    width: 100%;
    height: 100%;
  }
  .shaking {
    animation: shake 0.38s ease;
    outline: 3px solid var(--bad);
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
</style>
