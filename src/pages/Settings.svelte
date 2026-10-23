<script lang="ts">
  import { settings } from '../lib/settings.svelte.ts';
  import { auth, login, logout } from '../lib/auth/lichess.svelte.ts';
  import MiniBoard from '../components/MiniBoard.svelte';
  import { offlineBands } from '../lib/explorer/offline.ts';
  import { exportAll, importAll, parseBackup, backupFilename, type Counts } from '../lib/store/backup.ts';
  import { loadRepertoires } from '../lib/repertoire/store.svelte.ts';
  import { invalidateMine } from '../lib/mygames/tree.ts';

  const bandsP = offlineBands();

  let backupMsg = $state<{ kind: 'good' | 'bad'; text: string } | null>(null);
  let busy = $state(false);

  async function download() {
    busy = true;
    try {
      const b = await exportAll();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([JSON.stringify(b)], { type: 'application/json' }));
      a.download = backupFilename();
      a.click();
      URL.revokeObjectURL(a.href);
      backupMsg = { kind: 'good', text: `Exported ${b.repertoires.length} repertoires, ${b.games.length} games, ${b.mygames.length} imported games.` };
    } catch (e) {
      backupMsg = { kind: 'bad', text: `Export failed: ${(e as Error).message}` };
    } finally {
      busy = false;
    }
  }

  async function restore(e: Event) {
    const input = e.target as HTMLInputElement;
    const f = input.files?.[0];
    input.value = '';
    if (!f) return;
    busy = true;
    try {
      const b = parseBackup(JSON.parse(await f.text()));
      const n: Counts = await importAll(b, { settings: false });
      if (b.settings) for (const k of Object.keys(settings) as (keyof typeof settings)[]) if (k in b.settings) (settings as unknown as Record<string, unknown>)[k] = b.settings[k];
      await loadRepertoires();
      invalidateMine();
      backupMsg = { kind: 'good', text: `Restored ${n.repertoires} repertoires, ${n.games} games, ${n.drill} drill records and ${n.mygames} imported games${b.exportedAt ? ` from ${new Date(b.exportedAt).toLocaleString()}` : ''}.` };
    } catch (e) {
      backupMsg = { kind: 'bad', text: `Restore failed: ${(e as Error).message}` };
    } finally {
      busy = false;
    }
  }
</script>

<div class="page">
  <h1>Settings</h1>

  <section>
    <h2>Appearance</h2>
    <div class="row">
      <span class="lbl">Mode</span>
      <div class="seg">
        {#each [['auto', 'System'], ['light', 'Light'], ['dark', 'Dark']] as [m, l]}
          <button class:on={settings.dark === m} onclick={() => (settings.dark = m as typeof settings.dark)}>{l}</button>
        {/each}
      </div>
    </div>
    <div class="row">
      <span class="lbl">Board</span>
      {#each ['theme', 'brown', 'green', 'blue', 'gray'] as b}
        <button class="boardpick" class:on={settings.boardTheme === b} onclick={() => (settings.boardTheme = b as typeof settings.boardTheme)}>
          <div style="width:64px"><MiniBoard boardTheme={b} /></div>
          <span class="small">{b === 'theme' ? 'slate' : b}</span>
        </button>
      {/each}
    </div>
  </section>

  <section>
    <h2>Opponent</h2>
    <div class="row"><span class="lbl">Human-like rating</span><input type="range" min="1000" max="2400" step="100" bind:value={settings.humanRating} /> {settings.humanRating}</div>
    <div class="row"><span class="lbl">Engine strength</span><input type="range" min="1000" max="2800" step="50" bind:value={settings.engineElo} /> ~{settings.engineElo}</div>
    <div class="row">
      <span class="lbl">Trust the database from</span><input type="number" min="5" max="500" bind:value={settings.humanMinGames} /> games per position. Below that, Stockfish takes over.
    </div>
  </section>

  <section>
    <h2>Data</h2>
    {#if auth.token}
      <p>Logged in to Lichess{auth.account ? ` as ${auth.account.username}` : ''}. The live Lichess & Masters explorer is enabled. <button class="btn small" onclick={logout}>Log out</button></p>
    {:else}
      <p>Not logged in. The explorer uses the bundled offline tree. <button class="btn small primary" onclick={login}>Log in with Lichess</button></p>
    {/if}
    <div class="backup">
      <p>Everything Opener knows lives in this browser. Keep a copy, or move it to another device:</p>
      <div class="row">
        <button class="btn" onclick={download} disabled={busy}>Export all data</button>
        <label class="btn" class:disabled={busy}>Restore from a backup<input type="file" accept="application/json,.json" onchange={restore} disabled={busy} hidden /></label>
        {#if backupMsg}<span class="chip {backupMsg.kind}">{backupMsg.text}</span>{/if}
      </div>
      <p class="muted small">The file holds your repertoires, played games and reviews, drill statistics, imported games and settings. Restoring merges: entries with the same id are replaced, everything else is kept. The Lichess login is never included.</p>
    </div>
    {#await bandsP then bands}
      {#if bands.length}
        {#each bands as m}
          <p class="muted small">Offline tree {m.ratings[0]}–{m.ratings[1]}: {m.games.toLocaleString()} games from {m.source}, first {m.plies} moves (half-moves){m.deepPlies ? `, ${m.deepPlies} along library lines` : ''}, {m.positions.toLocaleString()} positions.</p>
        {/each}
      {:else}
        <p class="muted small">Offline tree not built. Run <code>npm run build-tree</code>.</p>
      {/if}
    {/await}
  </section>
</div>

<style>
  .page { max-width: 820px; }
  section { display: flex; flex-direction: column; gap: 14px; padding-top: 18px; border-top: 1px solid var(--rule); }
  .lbl { min-width: 190px; font-weight: 500; font-size: 0.9rem; }
  .boardpick { display: flex; flex-direction: column; align-items: center; gap: 3px; color: var(--ink-2); background: none; border: 2px solid transparent; border-radius: 6px; padding: 3px; cursor: pointer; font: inherit; }
  .boardpick.on { border-color: var(--blue); color: var(--ink); }
  input[type='range'] { width: 200px; }
  input[type='number'] { width: 80px; }
  .backup { display: flex; flex-direction: column; gap: 8px; }
  .backup label.btn { cursor: pointer; }
  .backup label.btn.disabled { opacity: 0.45; cursor: default; }
  .chip.good { white-space: normal; }
  .chip.bad { white-space: normal; }
</style>
