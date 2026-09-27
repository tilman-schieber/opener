<script lang="ts">
  import { route, href } from './lib/router.svelte.ts';
  import { settings } from './lib/settings.svelte.ts';
  import { auth, completeLogin, loadAccount, login, logout } from './lib/auth/lichess.svelte.ts';
  import { loadRepertoires } from './lib/repertoire/store.svelte.ts';
  import { loadNames } from './lib/explorer/names.ts';
  import Library from './pages/Library.svelte';
  import OpeningDetail from './pages/OpeningDetail.svelte';
  import Explore from './pages/Explore.svelte';
  import Play from './pages/Play.svelte';
  import Drill from './pages/Drill.svelte';
  import Repertoires from './pages/Repertoires.svelte';
  import RepertoireEdit from './pages/RepertoireEdit.svelte';
  import History from './pages/History.svelte';
  import Review from './pages/Review.svelte';
  import MyGames from './pages/MyGames.svelte';
  import Settings from './pages/Settings.svelte';

  completeLogin().then(loadAccount);
  loadRepertoires();
  loadNames();

  let systemDark = $state(matchMedia('(prefers-color-scheme: dark)').matches);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => (systemDark = e.matches));

  $effect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.mode = settings.dark === 'auto' ? (systemDark ? 'dark' : 'light') : settings.dark;
  });

  const NAV = [
    { path: '', label: 'Library', icon: '📚' },
    { path: 'explore', label: 'Explore', icon: '🧭' },
    { path: 'play', label: 'Play', icon: '⚔️' },
    { path: 'drill', label: 'Drill', icon: '🎯' },
    { path: 'repertoires', label: 'Repertoires', icon: '🗂' },
    { path: 'games', label: 'My games', icon: '🌳' },
    { path: 'history', label: 'History', icon: '🕘' },
  ];

  const page = $derived(route.path[0] ?? '');
  const activeNav = $derived(
    page === 'opening' ? '' : page === 'repertoire' ? 'repertoires' : page === 'review' ? 'history' : page,
  );
  let menuOpen = $state(false);
</script>

<div class="shell">
  <header class="topbar">
    <a class="brand" href={href('')}>
      <svg class="logo" viewBox="0 0 45 45" aria-hidden="true"><path fill="currentColor" d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"/><path fill="currentColor" d="M24 18c.38 2.91-5.55 7.37-8 9-3 2-2.82 4.34-5 4-1.04-.94 1.41-3.04 0-3-1 0 .19 1.23-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.89-1.9 2-3.5c-.73-.99-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.78-1.99 2.5-3c1 0 1 3 1 3"/><circle cx="12" cy="20" r="1" fill="var(--nav-bg)"/></svg>
      <span class="word">Opener</span>
    </a>
    <button class="btn ghost menu-btn" onclick={() => (menuOpen = !menuOpen)} aria-label="Menu">☰</button>
    <nav class:open={menuOpen}>
      {#each NAV as n}
        <a href={href(n.path)} class:active={activeNav === n.path} onclick={() => (menuOpen = false)}>
          <span class="icon">{n.icon}</span>{n.label}
        </a>
      {/each}
    </nav>
    <div class="right">
      {#if auth.token}
        <span class="user" title="Logged in with Lichess">● {auth.account?.username ?? 'Lichess'}</span>
        <button class="btn ghost small" onclick={logout}>Log out</button>
      {:else}
        <button class="btn small" onclick={login}>Log in with Lichess</button>
      {/if}
      <a class="btn ghost small" href={href('settings')} title="Settings & themes">⚙</a>
    </div>
  </header>

  {#if auth.error}
    <div class="banner">{auth.error} <button class="btn ghost small" onclick={() => (auth.error = null)}>✕</button></div>
  {/if}

  <main>
    {#key route.path.join('/')}
      {#if page === ''}
        <Library />
      {:else if page === 'opening'}
        <OpeningDetail id={route.path[1]} />
      {:else if page === 'explore'}
        <Explore />
      {:else if page === 'play'}
        <Play />
      {:else if page === 'drill'}
        <Drill />
      {:else if page === 'repertoires'}
        <Repertoires />
      {:else if page === 'repertoire'}
        <RepertoireEdit id={route.path[1]} />
      {:else if page === 'history'}
        <History />
      {:else if page === 'review'}
        <Review id={route.path[1]} />
      {:else if page === 'games'}
        <MyGames />
      {:else if page === 'settings'}
        <Settings />
      {:else}
        <p>Page not found. <a href={href('')}>Back to the library</a></p>
      {/if}
    {/key}
  </main>

  <footer class="muted small">
    Opening data: <a href="https://lichess.org" target="_blank" rel="noreferrer">Lichess</a> open database & explorer ·
    names: <a href="https://github.com/lichess-org/chess-openings" target="_blank" rel="noreferrer">lichess-org/chess-openings</a> ·
    engine: <a href="https://github.com/nmrugg/stockfish.js" target="_blank" rel="noreferrer">Stockfish.js</a> (GPLv3) ·
    board: chessground. Everything runs in your browser.
  </footer>
</div>

<style>
  .shell { min-height: 100vh; display: flex; flex-direction: column; }
  .topbar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 10px 20px;
    background: var(--nav-bg);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  :global([data-theme='club']) .topbar, :global([data-theme='arcade']) .topbar { color: #f7efe2; border-bottom-color: transparent; }
  :global([data-theme='club']) .topbar nav a, :global([data-theme='arcade']) .topbar nav a { color: rgb(255 255 255 / 0.72); }
  :global([data-theme='club']) .topbar nav a.active, :global([data-theme='arcade']) .topbar nav a.active { color: #fff; background: rgb(255 255 255 / 0.12); }
  :global([data-theme='club']) .topbar .btn, :global([data-theme='arcade']) .topbar .btn { color: #fff; background: rgb(255 255 255 / 0.08); border-color: rgb(255 255 255 / 0.15); }
  :global([data-theme='club']) .brand, :global([data-theme='arcade']) .brand { color: #fff; }
  .brand { display: flex; align-items: center; gap: 8px; color: var(--text); text-decoration: none !important; }
  .logo { width: 28px; height: 28px; color: var(--accent); }
  :global([data-theme='club']) .logo, :global([data-theme='arcade']) .logo { color: #fff; }
  .word { font-family: var(--font-display); font-weight: var(--display-weight); font-size: 1.25rem; letter-spacing: var(--display-tracking); }
  nav { display: flex; gap: 2px; flex: 1; }
  nav a {
    padding: 6px 11px;
    border-radius: var(--radius-sm);
    color: var(--text-muted);
    font-weight: 600;
    font-size: 0.92rem;
    text-decoration: none !important;
    display: flex;
    gap: 6px;
    align-items: center;
  }
  nav a:hover { background: var(--surface-2); color: var(--text); }
  nav a.active { background: var(--accent-soft); color: var(--accent); }
  .icon { font-size: 0.95em; }
  .right { display: flex; align-items: center; gap: 8px; }
  .user { font-size: 0.85rem; font-weight: 600; color: var(--good); }
  .menu-btn { display: none; }
  main { flex: 1; padding: 22px 20px 40px; width: 100%; }
  footer { padding: 16px 20px; text-align: center; border-top: 1px solid var(--border); }
  .banner { background: var(--warn-soft); color: var(--warn); padding: 8px 20px; font-weight: 600; display: flex; align-items: center; gap: 10px; }
  @media (max-width: 1100px) {
    .icon { display: none; }
  }
  @media (max-width: 860px) {
    .menu-btn { display: inline-flex; order: 3; }
    .right { margin-left: auto; }
    nav { display: none; position: absolute; top: 100%; left: 0; right: 0; flex-direction: column; background: var(--nav-bg); padding: 8px; border-bottom: 1px solid var(--border); }
    nav.open { display: flex; }
    .icon { display: inline; }
    main { padding: 14px 12px 30px; }
  }
</style>
