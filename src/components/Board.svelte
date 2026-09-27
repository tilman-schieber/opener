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
  /** A pawn move to the last rank waiting for the player to pick a piece */
  let promo = $state<{ orig: Key; dest: Key; color: 'white' | 'black' } | null>(null);

  const PROMO_ROLES = [
    { role: 'queen', letter: 'q' },
    { role: 'knight', letter: 'n' },
    { role: 'rook', letter: 'r' },
    { role: 'bishop', letter: 'b' },
  ] as const;

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
    if (piece?.role === 'pawn' && (dest[1] === '8' || dest[1] === '1')) {
      promo = { orig, dest, color: piece.color };
      return;
    }
    onmove?.(orig + dest);
  }

  function choosePromotion(letter: string) {
    if (!promo) return;
    const uci = promo.orig + promo.dest + letter;
    promo = null;
    onmove?.(uci);
    // If the parent rejects the move (e.g. a wrong drill move), put the pieces back
    cg?.set(config());
  }

  function cancelPromotion() {
    promo = null;
    cg?.set(config());
  }

  /** Column of the promotion square, and whether the picker grows down from the top edge */
  const promoPlacement = $derived.by(() => {
    if (!promo) return null;
    const file = promo.dest.charCodeAt(0) - 97;
    const col = orientation === 'white' ? file : 7 - file;
    const fromTop = (promo.dest[1] === '8') === (orientation === 'white');
    return { col, fromTop };
  });

  function parseSquare(k: string): number {
    return (k.charCodeAt(1) - 49) * 8 + (k.charCodeAt(0) - 97);
  }

  onMount(() => {
    cg = Chessground(el, {
      ...config(),
      coordinates: false,
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

<svelte:window onkeydown={(e) => promo && e.key === 'Escape' && cancelPromotion()} />

<div class="frame">
<div class="ranks" aria-hidden="true">
  {#each orientation === 'white' ? ['8', '7', '6', '5', '4', '3', '2', '1'] : ['1', '2', '3', '4', '5', '6', '7', '8'] as r}<span>{r}</span>{/each}
</div>
<div class="board board-{settings.boardTheme}" class:shaking>
  <div class="cg-wrap" bind:this={el}></div>
  {#if promo && promoPlacement}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div class="promo-backdrop" onclick={cancelPromotion}></div>
    <div
      class="promo cg-wrap"
      role="dialog"
      aria-label="Choose a piece to promote to"
      style:left="{promoPlacement.col * 12.5}%"
      style:top={promoPlacement.fromTop ? '0' : 'auto'}
      style:bottom={promoPlacement.fromTop ? 'auto' : '0'}
      style:flex-direction={promoPlacement.fromTop ? 'column' : 'column-reverse'}
    >
      {#each PROMO_ROLES as p}
        <button type="button" class="choice" onclick={() => choosePromotion(p.letter)} aria-label="Promote to {p.role}" title={p.role}>
          <piece class="{promo.color} {p.role}"></piece>
        </button>
      {/each}
    </div>
  {/if}
</div>
<span></span>
<div class="files" aria-hidden="true">
  {#each orientation === 'white' ? ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] : ['h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'] as f}<span>{f}</span>{/each}
</div>
</div>

<style>
  .frame {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    grid-template-rows: auto 18px;
    column-gap: 4px;
    width: 100%;
  }
  .ranks { display: grid; grid-template-rows: repeat(8, 1fr); }
  .files { display: grid; grid-template-columns: repeat(8, 1fr); }
  .ranks span, .files span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--ink-2);
    user-select: none;
  }
  .files span { align-items: flex-end; }
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
  .promo-backdrop { position: absolute; inset: 0; z-index: 10; background: rgb(10 14 22 / 0.45); }
  .promo {
    position: absolute;
    z-index: 11;
    width: 12.5%;
    height: 50%;
    display: flex;
  }
  .choice {
    position: relative;
    flex: 1;
    border: 0;
    padding: 0;
    cursor: pointer;
    background: var(--sheet);
    border-radius: 50%;
    margin: 2px;
    box-shadow: 0 2px 8px rgb(0 0 0 / 0.35);
    transition: background 0.1s, border-radius 0.1s;
  }
  .choice:hover, .choice:focus-visible { background: var(--blue-wash); border-radius: 12%; outline: none; }
  .promo piece { position: absolute; inset: 6%; width: 88%; height: 88%; background-size: cover; transform: none; pointer-events: none; }
  .shaking {
    animation: shake 0.38s ease;
    outline: 3px solid var(--red);
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
  }
</style>
