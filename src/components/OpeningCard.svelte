<script lang="ts">
  import type { LibraryOpening } from '../lib/library/types.ts';
  import { href } from '../lib/router.svelte.ts';
  import MiniBoard from './MiniBoard.svelte';
  import { playLine } from '../lib/chess/moves.ts';

  let { o }: { o: LibraryOpening } = $props();
  const plies = $derived(playLine(o.base));
  const fen = $derived(plies[plies.length - 1]?.fen);
</script>

<a class="card ocard" href={href(`opening/${o.id}`)}>
  <div class="thumb"><MiniBoard {fen} orientation={o.side} lastMove={plies[plies.length - 1]?.uci} /></div>
  <div class="body">
    <div class="row top">
      <span class="chip side-{o.side}">{o.side === 'white' ? '♔ White' : '♚ Black'}</span>
      <span class="muted small">{o.eco}</span>
      <span class="spacer"></span>
      <span class="diff" title="Difficulty">{'●'.repeat(o.difficulty)}<span class="off">{'●'.repeat(3 - o.difficulty)}</span></span>
    </div>
    <h3>{o.name}</h3>
    <p class="muted small sum">{o.summary}</p>
    <div class="muted small">{o.lines.length} lines · {o.traps.length} traps</div>
  </div>
</a>

<style>
  .ocard { display: flex; flex-direction: column; overflow: hidden; color: var(--text); text-decoration: none !important; transition: transform 0.12s, box-shadow 0.12s; }
  .ocard:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); }
  .thumb { padding: 12px 12px 0; }
  .body { padding: 10px 14px 14px; display: flex; flex-direction: column; gap: 4px; }
  h3 { margin: 2px 0 0; font-size: 1.1rem; }
  .sum { display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin: 0; }
  .diff { color: var(--accent); font-size: 0.6rem; letter-spacing: 2px; }
  .diff .off { color: var(--surface-3); }
  .side-white { background: var(--bar-white); color: #333; }
  .side-black { background: var(--bar-black); color: #eee; border-color: transparent; }
</style>
