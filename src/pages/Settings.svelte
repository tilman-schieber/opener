<script lang="ts">
  import { settings, type ThemeName } from '../lib/settings.svelte.ts';
  import { auth, login, logout } from '../lib/auth/lichess.svelte.ts';
  import MiniBoard from '../components/MiniBoard.svelte';
  import { offlineMeta } from '../lib/explorer/offline.ts';

  const THEMES: { id: ThemeName; name: string; blurb: string }[] = [
    { id: 'studio', name: 'Studio', blurb: 'Calm, precise, modern. Neutral surfaces, one indigo accent, tight sans-serif type — a focused tool that gets out of the way.' },
    { id: 'club', name: 'Club', blurb: 'Warm and classic. Paper and walnut tones, a serif display face, a framed wooden board — the feel of a chess club library.' },
    { id: 'arcade', name: 'Arcade', blurb: 'Bold and playful. Chunky rounded controls, vivid pink and violet, heavy type — training that feels like a game.' },
  ];
  const meta = offlineMeta();
</script>

<div class="page">
  <h1>Settings</h1>

  <section>
    <h2>Look & feel</h2>
    <p class="muted">Three design directions — pick the one you like (see <code>docs/design-briefs.md</code> for the full briefs).</p>
    <div class="themes">
      {#each THEMES as t}
        <button class="theme card" class:on={settings.theme === t.id} data-theme={t.id} onclick={() => (settings.theme = t.id)}>
          <div class="swatches">
            <span style:background="var(--bg)"></span><span style:background="var(--surface)"></span><span style:background="var(--accent)"></span><span style:background="var(--nav-bg)"></span>
          </div>
          <strong class="tname">{t.name}</strong>
          <span class="small tblurb">{t.blurb}</span>
        </button>
      {/each}
    </div>
    <div class="row">
      <span class="label">Mode</span>
      <div class="seg">
        {#each ['auto', 'light', 'dark'] as m}
          <button class:on={settings.dark === m} onclick={() => (settings.dark = m as typeof settings.dark)}>{m}</button>
        {/each}
      </div>
    </div>
    <div class="row">
      <span class="label">Board</span>
      {#each ['brown', 'green', 'blue', 'gray'] as b}
        <button class="boardpick" class:on={settings.boardTheme === b} onclick={() => (settings.boardTheme = b as typeof settings.boardTheme)}>
          <div class="board-{b}" style="width:64px"><MiniBoard /></div>
        </button>
      {/each}
    </div>
    <label class="check"><input type="checkbox" bind:checked={settings.sound} /> Move sounds</label>
  </section>

  <section>
    <h2>Opponent</h2>
    <div class="row"><span class="label">Human-like rating</span><input type="range" min="1000" max="2400" step="100" bind:value={settings.humanRating} /> {settings.humanRating}</div>
    <div class="row"><span class="label">Engine strength</span><input type="range" min="1000" max="2800" step="50" bind:value={settings.engineElo} /> ~{settings.engineElo}</div>
    <div class="row">
      <span class="label">Trust the database from</span><input type="number" min="5" max="500" bind:value={settings.humanMinGames} /> games per position (fewer → Stockfish takes over)
    </div>
  </section>

  <section>
    <h2>Data</h2>
    {#if auth.token}
      <p>Logged in to Lichess{auth.account ? ` as ${auth.account.username}` : ''}. The live Lichess & Masters explorer is enabled. <button class="btn small" onclick={logout}>Log out</button></p>
    {:else}
      <p>Not logged in. The explorer uses the bundled offline tree. <button class="btn small primary" onclick={login}>Log in with Lichess</button></p>
    {/if}
    {#await meta then m}
      {#if m}
        <p class="muted small">Offline tree: {m.games.toLocaleString()} games from {m.source}, ratings {m.ratings[0]}–{m.ratings[1]}, {m.speeds.join('/')}, first {m.plies} plies, {m.positions.toLocaleString()} positions.</p>
      {:else}
        <p class="muted small">Offline tree not built. Run <code>npm run build-tree</code>.</p>
      {/if}
    {/await}
  </section>
</div>

<style>
  .page { max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 26px; }
  section { display: flex; flex-direction: column; gap: 12px; }
  section h2 { margin: 0; }
  .themes { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  @media (max-width: 700px) { .themes { grid-template-columns: 1fr; } }
  .theme { text-align: left; font: inherit; padding: 14px; cursor: pointer; display: flex; flex-direction: column; gap: 6px; background: var(--surface); color: var(--text); border: 2px solid var(--border); }
  .theme.on { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
  .tname { font-family: var(--font-display); font-weight: var(--display-weight); font-size: 1.2rem; }
  .tblurb { color: var(--text-muted); }
  .swatches { display: flex; gap: 4px; }
  .swatches span { width: 26px; height: 26px; border-radius: 6px; border: 1px solid var(--border); }
  .label { min-width: 170px; font-weight: 600; }
  .boardpick { background: none; border: 2px solid transparent; border-radius: 8px; padding: 2px; cursor: pointer; }
  .boardpick.on { border-color: var(--accent); }
  .check { font-weight: 500; display: flex; gap: 6px; align-items: center; }
</style>
