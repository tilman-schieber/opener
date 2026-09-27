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
  import PreviewPopover from './components/PreviewPopover.svelte';
  import { preview } from './lib/preview.svelte.ts';
  import Icon from './components/Icon.svelte';

  completeLogin().then(loadAccount);
  loadRepertoires();
  loadNames();

  let systemDark = $state(matchMedia('(prefers-color-scheme: dark)').matches);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => (systemDark = e.matches));

  $effect(() => {
    document.documentElement.dataset.mode = settings.dark === 'auto' ? (systemDark ? 'dark' : 'light') : settings.dark;
  });

  const NAV = [
    { path: '', label: 'Library' },
    { path: 'explore', label: 'Explorer' },
    { path: 'play', label: 'Play' },
    { path: 'drill', label: 'Drill' },
    { path: 'repertoires', label: 'Repertoires' },
    { path: 'games', label: 'My games' },
    { path: 'history', label: 'History' },
  ];

  const page = $derived(route.path[0] ?? '');
  const activeNav = $derived(page === 'opening' ? '' : page === 'repertoire' ? 'repertoires' : page === 'review' ? 'history' : page);
  let menuOpen = $state(false);

  // A hovered notation chip can disappear (navigation) before its mouseleave fires
  $effect(() => {
    void route.path.join('/');
    preview.data = null;
  });
</script>

<svelte:window onscroll={() => (preview.data = null)} />

<div class="shell">
  <header class="topbar">
    <a class="brand" href={href('')} aria-label="Opener home">
      <svg class="logo" viewBox="0 0 24 24" aria-hidden="true">
        <defs><clipPath id="logo-clip"><rect width="24" height="24" rx="5" /></clipPath></defs>
        <g clip-path="url(#logo-clip)">
          <rect width="24" height="24" fill="var(--ink)" />
          <rect x="12" width="12" height="12" fill="var(--blue)" />
          <rect y="12" width="12" height="12" fill="var(--blue)" />
        </g>
      </svg>
      <span class="word">Opener</span>
    </a>
    <nav class:open={menuOpen}>
      {#each NAV as n}
        <a href={href(n.path)} class:active={activeNav === n.path} aria-current={activeNav === n.path ? 'page' : undefined} onclick={() => (menuOpen = false)}>{n.label}</a>
      {/each}
    </nav>
    <div class="right">
      {#if auth.token}
        <span class="user small" title="Logged in with Lichess"><span class="dot"></span>{auth.account?.username ?? 'Lichess'}</span>
        <button class="btn ghost small" onclick={logout}>Log out</button>
      {:else}
        <button class="btn small" onclick={login}>Log in with Lichess</button>
      {/if}
      <a class="btn ghost icon" href={href('settings')} title="Settings" aria-label="Settings"><Icon name="settings" size={18} /></a>
      <button class="btn ghost icon menu-btn" onclick={() => (menuOpen = !menuOpen)} aria-label="Menu" aria-expanded={menuOpen}><Icon name="menu" size={18} /></button>
    </div>
  </header>

  {#if auth.error}
    <div class="banner">{auth.error} <button class="btn ghost small" onclick={() => (auth.error = null)}>Dismiss</button></div>
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

  <PreviewPopover />

  <footer class="faint small">
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
    gap: 28px;
    padding: 0 24px;
    height: 56px;
    background: var(--sheet);
    border-bottom: 1px solid var(--rule);
    position: sticky;
    top: 0;
    z-index: 20;
  }
  .brand { display: flex; align-items: center; gap: 9px; color: var(--ink); text-decoration: none !important; }
  .logo { width: 22px; height: 22px; }
  .word { font-family: var(--font-display); font-weight: 600; font-size: 1.3rem; letter-spacing: -0.01em; }
  nav { display: flex; gap: 22px; flex: 1; align-self: stretch; }
  nav a {
    display: flex;
    align-items: center;
    color: var(--ink-2);
    font-weight: 500;
    font-size: 0.92rem;
    text-decoration: none !important;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  nav a:hover { color: var(--ink); }
  nav a.active { color: var(--ink); border-bottom-color: var(--blue); }
  .right { display: flex; align-items: center; gap: 6px; }
  .user { display: flex; align-items: center; gap: 6px; font-weight: 500; }
  .user .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); }
  .menu-btn { display: none; }
  main { flex: 1; padding: 28px 24px 48px; width: 100%; }
  footer { padding: 18px 24px; text-align: center; border-top: 1px solid var(--rule); }
  footer :global(a) { color: var(--ink-2); text-decoration: underline; text-decoration-color: var(--rule-strong); }
  .banner { background: var(--amber-wash); color: var(--amber); padding: 8px 24px; font-weight: 500; display: flex; align-items: center; gap: 10px; }
  @media (max-width: 960px) {
    .topbar { gap: 12px; padding: 0 16px; }
    .menu-btn { display: inline-flex; }
    .right { margin-left: auto; }
    nav { display: none; position: absolute; top: 56px; left: 0; right: 0; flex-direction: column; gap: 0; background: var(--sheet); border-bottom: 1px solid var(--rule); padding: 6px 16px 10px; }
    nav.open { display: flex; }
    nav a { padding: 10px 0; border-bottom: 1px solid var(--rule); margin: 0; }
    nav a.active { border-bottom-color: var(--rule); color: var(--blue); }
    main { padding: 18px 16px 36px; }
  }
</style>
