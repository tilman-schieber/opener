<script lang="ts">
  import type { Ply } from '../lib/chess/moves.ts';
  import Icon from './Icon.svelte';

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

  let { plies, cursor, onselect, marks = [], glyphs = [], keys = true, empty = 'Make a move on the board or pick one in the explorer.' }: Props = $props();

  let list: HTMLDivElement;

  const rows = $derived.by(() => {
    const r: { n: number; w: number; b?: number }[] = [];
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

<div class="sheetgrid">
  <div class="head"><span></span><span>White</span><span>Black</span></div>
  <div class="rows" bind:this={list}>
    {#if !plies.length}
      <p class="muted small empty">{empty}</p>
    {:else}
      {#each rows as r}
        <div class="mrow">
          <span class="n">{r.n}</span>
          {#each [r.w, r.b] as i}
            {#if i !== undefined}
              <button class="m {marks[i] ?? ''}" class:active={cursor === i + 1} onclick={() => onselect?.(i + 1)}
                >{plies[i].san}{#if glyphs[i]}<span class="g">{glyphs[i]}</span>{/if}</button
              >
            {:else}<span></span>{/if}
          {/each}
        </div>
      {/each}
    {/if}
  </div>
</div>
{#if onselect}
  <div class="nav">
    <button class="btn ghost icon" onclick={() => onselect(0)} title="Start (↑)" aria-label="Go to start"><Icon name="first" /></button>
    <button class="btn ghost icon" onclick={() => onselect(Math.max(0, cursor - 1))} title="Back (←)" aria-label="Previous move"><Icon name="prev" /></button>
    <button class="btn ghost icon" onclick={() => onselect(Math.min(plies.length, cursor + 1))} title="Forward (→)" aria-label="Next move"><Icon name="next" /></button>
    <button class="btn ghost icon" onclick={() => onselect(plies.length)} title="End (↓)" aria-label="Go to end"><Icon name="last" /></button>
  </div>
{/if}

<style>
  .sheetgrid { font-family: var(--font-mono); font-size: 0.9rem; font-variant-numeric: tabular-nums; }
  .head, .mrow { display: grid; grid-template-columns: 2.4em 1fr 1fr; }
  .head { font-family: var(--font-body); font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-3); padding-bottom: 4px; border-bottom: 1px solid var(--rule-strong); }
  .head span { padding-left: 8px; }
  .rows { max-height: 250px; overflow-y: auto; }
  .mrow { border-bottom: 1px solid var(--rule); }
  .n { color: var(--ink-3); padding: 3px 0 3px 2px; border-right: 1px solid var(--rule); }
  .m {
    font: inherit;
    font-weight: 500;
    text-align: left;
    background: none;
    border: 0;
    padding: 3px 8px;
    color: var(--ink);
    cursor: pointer;
    border-right: 1px solid var(--rule);
  }
  .m:last-child { border-right: 0; }
  .m:hover { background: var(--sheet-2); }
  .m.active { background: var(--ink); color: var(--paper); }
  .m.book { color: var(--blue); }
  .m.active.book { color: var(--paper); background: var(--blue); }
  .m.left-book { box-shadow: inset 0 -2px 0 var(--amber); }
  .m.engine { color: var(--ink-2); }
  .m.active.engine { color: var(--paper); }
  .g { margin-left: 3px; font-weight: 700; }
  .inaccuracy .g { color: var(--amber); }
  .mistake .g { color: #d06a1a; }
  .blunder .g { color: var(--red); }
  .active .g { color: inherit; }
  .empty { font-family: var(--font-body); padding: 8px 2px; }
  .nav { display: flex; justify-content: center; gap: 2px; margin-top: 6px; }
  @media (max-width: 900px) { .rows { max-height: 150px; } }
</style>
