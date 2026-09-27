<script lang="ts">
  import Board from '../components/Board.svelte';
  import ExplorerPanel from '../components/ExplorerPanel.svelte';
  import MoveList from '../components/MoveList.svelte';
  import { BoardState } from '../lib/boardstate.svelte.ts';
  import { importLichess, importChessCom, importPgnGames, accounts, removeAccount } from '../lib/mygames/import.ts';
  import { invalidateMine, mineFilter } from '../lib/mygames/tree.ts';
  import { settings } from '../lib/settings.svelte.ts';
  import { auth } from '../lib/auth/lichess.svelte.ts';
  import { INITIAL_FEN } from '../lib/chess/moves.ts';
  import { moveSound } from '../lib/sound.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  let site = $state<'lichess' | 'chesscom' | 'pgn'>('lichess');
  let username = $state(auth.account?.username ?? '');
  let max = $state(500);
  let pgn = $state('');
  let busy = $state(false);
  let progress = $state('');
  let error = $state('');
  let list = $state<{ account: string; count: number }[]>([]);
  let color = $state<'white' | 'black'>('white');
  let hover = $state<string | null>(null);
  let version = $state(0);
  let ctrl: AbortController | null = null;

  const board = new BoardState();

  async function refresh() {
    list = await accounts();
    invalidateMine();
    version++;
  }
  refresh();

  async function run() {
    error = '';
    busy = true;
    progress = 'Starting…';
    ctrl = new AbortController();
    try {
      let n = 0;
      if (site === 'lichess') n = await importLichess(username.trim(), max, (c) => (progress = `${c} games…`), ctrl.signal);
      else if (site === 'chesscom') n = await importChessCom(username.trim(), max, (c, m) => (progress = `${c} games… (${m})`), ctrl.signal);
      else n = await importPgnGames(pgn, username.trim() || 'upload', username.trim());
      progress = `Imported ${n} games.`;
      settings.explorerSource = 'mine';
    } catch (e) {
      if ((e as Error).name !== 'AbortError') error = (e as Error).message;
    } finally {
      busy = false;
      await refresh();
    }
  }

  async function onFile(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (f) pgn = await f.text();
  }

  function toggleAccount(a: string) {
    const i = mineFilter.accounts.indexOf(a);
    if (i >= 0) mineFilter.accounts.splice(i, 1);
    else mineFilter.accounts.push(a);
    invalidateMine();
    version++;
  }

  function play(uci: string) {
    const p = board.play(uci);
    if (p) moveSound(p.san.includes('x'));
  }

  const shapes = $derived<DrawShape[]>(hover ? [{ orig: hover.slice(0, 2) as Key, dest: hover.slice(2, 4) as Key, brush: 'paleBlue' }] : []);
  const label = (a: string) => a.replace('lichess:', 'Lichess · ').replace('chesscom:', 'Chess.com · ').replace('pgn:', 'PGN · ');
</script>

<div class="page">
  <div class="intro">
    <h1>My games tree</h1>
    <p class="muted">Import your own games and see how <em>you</em> actually play your openings, and how you score, move by move (inspired by openingtree.com). Everything stays in your browser.</p>
  </div>

  <div class="card panel importer">
    <div class="row">
      <div class="seg">
        <button class:on={site === 'lichess'} onclick={() => (site = 'lichess')}>Lichess</button>
        <button class:on={site === 'chesscom'} onclick={() => (site = 'chesscom')}>Chess.com</button>
        <button class:on={site === 'pgn'} onclick={() => (site = 'pgn')}>PGN file</button>
      </div>
      <input type="text" placeholder={site === 'pgn' ? 'Your name as in the PGN (to detect your color)' : 'Username'} bind:value={username} />
      {#if site !== 'pgn'}
        <label class="small">Max games <input type="number" min="50" max="5000" step="50" bind:value={max} /></label>
      {/if}
      {#if busy}
        <button class="btn" onclick={() => ctrl?.abort()}>Stop</button>
      {:else}
        <button class="btn primary" onclick={run} disabled={site === 'pgn' ? !pgn : !username.trim()}>Import</button>
      {/if}
      {#if progress}<span class="muted small">{progress}</span>{/if}
    </div>
    {#if site === 'pgn'}
      <div class="row">
        <input type="file" accept=".pgn,text/plain" onchange={onFile} />
        {#if pgn}<span class="muted small">{(pgn.length / 1024).toFixed(0)} KB loaded</span>{/if}
      </div>
    {/if}
    {#if error}<div class="chip bad">{error}</div>{/if}
    {#if list.length}
      <div class="row accounts">
        <span class="small muted">Sources:</span>
        {#each list as a}
          <span class="chip" class:accent={!mineFilter.accounts.length || mineFilter.accounts.includes(a.account)}>
            <button class="plain" onclick={() => toggleAccount(a.account)}>{label(a.account)} ({a.count})</button>
            <button class="plain x" title="Remove these games" onclick={async () => { await removeAccount(a.account); await refresh(); }}>✕</button>
          </span>
        {/each}
      </div>
    {/if}
  </div>

  <div class="workspace">
    <div class="left">
      <Board fen={board.fen} orientation={color} lastMove={board.lastMove?.uci} onmove={play} {shapes} />
      <div class="row">
        <div class="seg">
          <button class:on={color === 'white'} onclick={() => (color = 'white')}>My games as White</button>
          <button class:on={color === 'black'} onclick={() => (color = 'black')}>as Black</button>
        </div>
        <span class="spacer"></span>
        <button class="btn small ghost" onclick={() => board.reset()}>↺ Start</button>
      </div>
      <div class="card panel"><MoveList plies={board.plies} cursor={board.cursor} onselect={(i) => board.goto(i)} /></div>
    </div>
    <div class="right">
      {#key version}
        <ExplorerPanel fen={board.fen} fens={[INITIAL_FEN, ...board.fens]} onmove={play} onhover={(u) => (hover = u)} myColor={color} />
      {/key}
      <p class="muted small">Tip: switch the explorer between <strong>My games</strong> and <strong>Lichess</strong> to compare your choices with what everyone else plays.</p>
    </div>
  </div>
</div>

<style>
  .page { display: flex; flex-direction: column; gap: 16px; }
  .intro, .importer { max-width: 1320px; width: 100%; margin: 0 auto; }
  .importer { display: flex; flex-direction: column; gap: 10px; }
  .importer input[type='number'] { width: 90px; margin-left: 4px; }
  .accounts { gap: 6px; }
  .plain { background: none; border: 0; font: inherit; color: inherit; cursor: pointer; padding: 0; }
  .x { margin-left: 4px; opacity: 0.6; }
</style>
