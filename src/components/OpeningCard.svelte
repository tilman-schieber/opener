<script lang="ts">
  import type { LibraryOpening } from '../lib/library/types.ts';
  import { href } from '../lib/router.svelte.ts';
  import MiniBoard from './MiniBoard.svelte';
  import { playLine, formatLine } from '../lib/chess/moves.ts';

  interface Props {
    o: LibraryOpening;
    /** The opening this one branches off from (a gambit under its parent), if any */
    parent?: LibraryOpening;
  }
  let { o, parent }: Props = $props();
  const plies = $derived(playLine(o.base));
  const last = $derived(plies[plies.length - 1]);
  const LEVEL = ['', 'Beginner', 'Club', 'Advanced'];
  /** First sentence of the summary as a one-line hook */
  const hook = $derived(o.summary.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? o.summary);
  const gambit = $derived(/gambit/i.test(o.name));
</script>

<article class="ocard">
  <a class="thumb" href={href(`opening/${o.id}`)} aria-label="{o.name}: details" tabindex="-1"><MiniBoard fen={last?.fen} orientation={o.side} lastMove={last?.uci} /></a>
  <div class="body">
    <div class="head">
      <h3><a href={href(`opening/${o.id}`)}>{o.name}</a></h3>
      {#if gambit}<span class="chip warn">gambit</span>{/if}
    </div>
    <p class="line mono">{formatLine(plies.map((p) => p.san))}</p>
    <p class="hook">{hook}</p>
    <p class="meta">
      <span class="eco mono">{o.eco}</span>
      <span>{LEVEL[o.difficulty]}</span>
      <span>{o.lines.length} lines{o.traps.length ? ` · ${o.traps.length} trap${o.traps.length > 1 ? 's' : ''}` : ''}</span>
      {#if parent}<span class="faint">sideline of <a class="parent" href={href(`opening/${parent.id}`)}>{parent.name}</a></span>{/if}
    </p>
    <div class="actions">
      <a class="btn small primary" href={href(`learn/${o.id}`)}>Learn</a>
      <a class="btn small" href={href('play', { rep: `lib:${o.id}` })}>Play</a>
      <a class="btn small" href={href('drill', { rep: `lib:${o.id}` })}>Drill</a>
      <a class="more small" href={href(`opening/${o.id}`)}>Details</a>
    </div>
  </div>
</article>

<style>
  .ocard {
    display: grid;
    grid-template-columns: 116px minmax(0, 1fr);
    gap: 14px;
    padding: 14px;
    background: var(--sheet);
    border: 1px solid var(--rule);
    border-radius: var(--radius);
    transition: border-color 0.12s;
  }
  .ocard:hover { border-color: var(--ink-3); }
  .thumb { display: block; align-self: start; }
  .body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .head { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
  h3 { font-family: var(--font-display); font-weight: 500; font-size: 1.28rem; line-height: 1.2; }
  h3 a { color: var(--ink); text-decoration: none !important; }
  h3 a:hover { color: var(--blue); }
  .line { font-size: 0.8rem; color: var(--ink-2); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .hook { font-size: 0.9rem; line-height: 1.5; color: var(--ink-2); display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 0.78rem; color: var(--ink-3); }
  .parent { color: var(--ink-2); text-decoration: underline; text-decoration-color: var(--rule-strong); }
  .actions { display: flex; align-items: center; gap: 6px; margin-top: auto; padding-top: 6px; flex-wrap: wrap; }
  .more { margin-left: auto; color: var(--ink-2); }
  @media (max-width: 480px) {
    .ocard { grid-template-columns: 88px minmax(0, 1fr); gap: 10px; padding: 10px; }
    .hook { display: none; }
  }
</style>
