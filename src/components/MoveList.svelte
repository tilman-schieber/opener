<script lang="ts">
  import type { Ply } from '../lib/chess/moves.ts';

  interface Props {
    plies: Pick<Ply, 'san'>[];
    cursor: number;
    onselect?: (cursor: number) => void;
    /** Per-ply CSS class, e.g. 'blunder', 'book', 'left-book' */
    marks?: (string | undefined)[];
    /** Per-ply glyph shown after the move, e.g. '?!' */
    glyphs?: (string | undefined)[];
    keys?: boolean;
    empty?: string;
  }

  let { plies, cursor, onselect, marks = [], glyphs = [], keys = true, empty = 'Make a move on the board or click one in the explorer.' }: Props = $props();

  let list: HTMLDivElement;

  const rows = $derived.by(() => {
    const r: { n: number; w?: number; b?: number }[] = [];
    for (let i = 0; i < plies.length; i += 2) r.push({ n: i / 2 + 1, w: i, b: i + 1 < plies.length ? i + 1 : undefined });
    return r;
  });

  $effect(() => {
    void cursor;
    list?.querySelector('.active')?.scrollIntoView({ block: 'nearest' });
  });

  function onkey(e: KeyboardEvent) {
    if (!keys || !onselect) return;
    const t = e.target as HTMLElement;
    if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT') return;
    if (e.key === 'ArrowLeft') onselect(Math.max(0, cursor - 1));
    else if (e.key === 'ArrowRight') onselect(Math.min(plies.length, cursor + 1));
    else if (e.key === 'ArrowUp' || e.key === 'Home') onselect(0);
    else if (e.key === 'ArrowDown' || e.key === 'End') onselect(plies.length);
    else return;
    e.preventDefault();
  }
</script>

<svelte:window onkeydown={onkey} />

<div class="moves" bind:this={list}>
  {#if !plies.length}
    <p class="muted small">{empty}</p>
  {:else}
    {#each rows as r}
      <div class="mrow">
        <span class="n">{r.n}.</span>
        {#if r.w !== undefined}
          <button class="m {marks[r.w] ?? ''}" class:active={cursor === r.w + 1} onclick={() => onselect?.(r.w! + 1)}
            >{plies[r.w].san}{#if glyphs[r.w]}<span class="g">{glyphs[r.w]}</span>{/if}</button
          >
        {/if}
        {#if r.b !== undefined}
          <button class="m {marks[r.b] ?? ''}" class:active={cursor === r.b + 1} onclick={() => onselect?.(r.b! + 1)}
            >{plies[r.b].san}{#if glyphs[r.b]}<span class="g">{glyphs[r.b]}</span>{/if}</button
          >
        {/if}
      </div>
    {/each}
  {/if}
</div>
{#if onselect}
  <div class="nav">
    <button class="btn ghost small" onclick={() => onselect(0)} title="Start (↑)">⏮</button>
    <button class="btn ghost small" onclick={() => onselect(Math.max(0, cursor - 1))} title="Back (←)">◀</button>
    <button class="btn ghost small" onclick={() => onselect(Math.min(plies.length, cursor + 1))} title="Forward (→)">▶</button>
    <button class="btn ghost small" onclick={() => onselect(plies.length)} title="End (↓)">⏭</button>
  </div>
{/if}

<style>
  .moves {
    max-height: 260px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1px;
    font-family: var(--font-mono);
    font-size: 0.92rem;
  }
  .moves > p { font-family: var(--font-body); margin: 0; }
  .mrow { display: grid; grid-template-columns: 2.6em minmax(0, 7em) minmax(0, 7em); align-items: center; gap: 4px; }
  .mrow:nth-child(even) { background: color-mix(in srgb, var(--surface-2) 50%, transparent); }
  .n { color: var(--text-muted); font-size: 0.85em; }
  .m {
    font: inherit;
    font-weight: 600;
    text-align: left;
    background: none;
    border: 0;
    border-radius: 4px;
    padding: 2px 6px;
    color: var(--text);
    cursor: pointer;
  }
  .m:hover { background: var(--surface-2); }
  .m.active { background: var(--accent); color: var(--accent-contrast); }
  .m.book { color: var(--accent); }
  .m.active.book { color: var(--accent-contrast); }
  .m.left-book { box-shadow: inset 0 -2px 0 var(--warn); }
  .m.human { color: var(--text); }
  .m.engine { font-style: italic; }
  .m.inaccuracy .g { color: var(--warn); }
  .m.mistake .g { color: #e07b22; }
  .m.blunder .g { color: var(--bad); }
  .g { margin-left: 2px; font-weight: 800; }
  .nav { display: flex; justify-content: center; gap: 4px; margin-top: 6px; border-top: 1px solid var(--border); padding-top: 6px; }
  @media (max-width: 900px) {
    .moves { flex-direction: row; flex-wrap: wrap; max-height: 120px; }
    .mrow { display: flex; }
    .mrow:nth-child(even) { background: none; }
  }
</style>
