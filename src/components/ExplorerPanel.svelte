<script lang="ts">
  import { explore } from '../lib/explorer/index.ts';
  import { total, type ExplorerData, type ExplorerMove, type ExplorerSource } from '../lib/explorer/types.ts';
  import { settings } from '../lib/settings.svelte.ts';
  import { auth, login } from '../lib/auth/lichess.svelte.ts';
  import { offlineMeta, type OfflineMeta } from '../lib/explorer/offline.ts';
  import { nameForPath, loadNames } from '../lib/explorer/names.ts';
  import WDLBar from './WDLBar.svelte';

  interface Props {
    fen: string;
    /** Positions along the current path (for naming) */
    fens?: string[];
    /** Called when a move row is clicked; omit to make the table read-only */
    onmove?: (uci: string) => void;
    onhover?: (uci: string | null) => void;
    /** Moves to highlight as "your repertoire" */
    bookMoves?: string[];
    /** Color for the "My games" source */
    myColor?: 'white' | 'black';
    compact?: boolean;
  }

  let { fen, fens = [], onmove, onhover, bookMoves = [], myColor = 'white', compact = false }: Props = $props();

  const SOURCES: { id: ExplorerSource; label: string; needsLogin?: boolean }[] = [
    { id: 'offline', label: 'Offline' },
    { id: 'lichess', label: 'Lichess', needsLogin: true },
    { id: 'masters', label: 'Masters', needsLogin: true },
    { id: 'mine', label: 'My games' },
  ];

  let data = $state<ExplorerData | null>(null);
  let error = $state<string | null>(null);
  let loading = $state(false);
  let meta = $state<OfflineMeta | null>(null);
  let showFilters = $state(false);
  let namesReady = $state(false);

  offlineMeta().then((m) => (meta = m));
  loadNames().then(() => (namesReady = true));

  const source = $derived<ExplorerSource>(
    (settings.explorerSource === 'lichess' || settings.explorerSource === 'masters') && !auth.token ? 'offline' : settings.explorerSource,
  );

  $effect(() => {
    const q = { source, fen, ratings: [...settings.ratings], speeds: [...settings.speeds], color: myColor };
    let cancelled = false;
    loading = true;
    error = null;
    const t = setTimeout(() => {
      explore(q)
        .then((d) => {
          if (!cancelled) data = d;
        })
        .catch((e: Error) => {
          if (!cancelled) {
            error = e.message;
            data = null;
          }
        })
        .finally(() => {
          if (!cancelled) loading = false;
        });
    }, 60);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  });

  const sum = $derived(data ? total(data) || data.moves.reduce((s, m) => s + total(m), 0) : 0);
  const opening = $derived.by(() => {
    void namesReady;
    return data?.opening ?? nameForPath(fens);
  });

  function fmt(n: number) {
    return n >= 1e6 ? (n / 1e6).toFixed(1) + 'M' : n >= 1e4 ? Math.round(n / 1e3) + 'k' : n.toLocaleString();
  }

  function share(m: ExplorerMove) {
    return sum ? Math.round((total(m) / sum) * 100) : 0;
  }

  function score(m: ExplorerMove) {
    const t = total(m) || 1;
    const turnWhite = fen.split(' ')[1] === 'w';
    const s = ((turnWhite ? m.white : m.black) + m.draws / 2) / t;
    return Math.round(s * 100);
  }

  function toggle<T>(arr: T[], v: T) {
    const i = arr.indexOf(v);
    if (i >= 0) {
      if (arr.length > 1) arr.splice(i, 1);
    } else arr.push(v);
  }
</script>

<div class="card panel explorer" class:compact>
  <div class="panel-title">
    <h3>Explorer</h3>
    <div class="seg" role="tablist">
      {#each SOURCES as s}
        <button
          class:on={source === s.id}
          title={s.needsLogin && !auth.token ? 'Log in with Lichess to use the live database' : ''}
          onclick={() => {
            if (s.needsLogin && !auth.token) login();
            else settings.explorerSource = s.id;
          }}>{s.label}{#if s.needsLogin && !auth.token}<span class="lock">🔒</span>{/if}</button
        >
      {/each}
    </div>
  </div>

  {#if opening}
    <div class="opening"><span class="chip">{opening.eco}</span> <span class="name">{opening.name}</span></div>
  {/if}

  {#if source === 'lichess'}
    <div class="filters">
      <button class="btn ghost small" onclick={() => (showFilters = !showFilters)}>
        {settings.ratings.join(', ')} · {settings.speeds.join(', ')} ▾
      </button>
      {#if showFilters}
        <div class="filter-box">
          <div class="row">
            {#each [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500] as r}
              <button class="chip" class:accent={settings.ratings.includes(r)} onclick={() => toggle(settings.ratings, r)}>{r}</button>
            {/each}
          </div>
          <div class="row">
            {#each ['bullet', 'blitz', 'rapid', 'classical', 'correspondence'] as s}
              <button class="chip" class:accent={settings.speeds.includes(s as never)} onclick={() => toggle(settings.speeds, s as never)}>{s}</button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
  {:else if source === 'offline' && meta}
    <div class="muted small src-note">Bundled: {fmt(meta.games)} Lichess games rated {meta.ratings[0]}–{meta.ratings[1]}, first {meta.plies} plies.</div>
  {/if}

  {#if error}
    <div class="chip bad">{error}</div>
  {/if}

  {#if data}
    {#if data.moves.length}
      <table class:loading>
        <thead>
          <tr><th>Move</th><th class="num">Games</th><th class="num" title="Score for the side to move">Score</th><th class="bar-col">White / Draw / Black</th></tr>
        </thead>
        <tbody>
          {#each data.moves as m (m.uci)}
            <tr
              class:clickable={!!onmove}
              class:book={bookMoves.includes(m.uci)}
              onclick={() => onmove?.(m.uci)}
              onmouseenter={() => onhover?.(m.uci)}
              onmouseleave={() => onhover?.(null)}
            >
              <td class="san">{m.san}{#if bookMoves.includes(m.uci)}<span class="book-dot" title="In your repertoire">●</span>{/if}</td>
              <td class="num"><span class="muted">{share(m)}%</span> {fmt(total(m))}</td>
              <td class="num">{score(m)}%</td>
              <td class="bar-col"><WDLBar white={m.white} draws={m.draws} black={m.black} height={16} /></td>
            </tr>
          {/each}
          <tr class="total">
            <td>Σ</td>
            <td class="num">{fmt(sum)}</td>
            <td></td>
            <td class="bar-col"><WDLBar white={data.white || data.moves.reduce((s, m) => s + m.white, 0)} draws={data.draws || data.moves.reduce((s, m) => s + m.draws, 0)} black={data.black || data.moves.reduce((s, m) => s + m.black, 0)} height={16} /></td>
          </tr>
        </tbody>
      </table>
    {:else}
      <p class="muted small empty">{data.note ?? 'No games in this position.'}</p>
    {/if}

    {#if !compact && data.topGames?.length}
      <details class="games">
        <summary>{data.source === 'mine' ? 'Your recent games here' : 'Top games'}</summary>
        <ul>
          {#each data.topGames as g}
            <li>
              {#if data.source === 'mine'}
                {#if g.month}<a href={g.month} target="_blank" rel="noreferrer">{g.white.name} – {g.black.name}</a>{:else}{g.white.name} – {g.black.name}{/if}
              {:else}
                <a href="https://lichess.org/{g.id}" target="_blank" rel="noreferrer">{g.white.name} ({g.white.rating}) – {g.black.name} ({g.black.rating})</a>
              {/if}
              <span class="muted small">{g.winner === 'white' ? '1-0' : g.winner === 'black' ? '0-1' : '½-½'} {g.year ?? ''}</span>
            </li>
          {/each}
        </ul>
      </details>
    {/if}
  {:else if loading}
    <p class="muted small">Loading…</p>
  {/if}

  {#if !auth.token && !compact}
    <p class="login-hint small muted">
      <button class="linklike" onclick={login}>Log in with Lichess</button> to unlock the full Lichess & Masters databases (free account, stays in your browser).
    </p>
  {/if}
</div>

<style>
  .explorer { min-width: 0; }
  .opening { margin-bottom: 8px; font-weight: 600; display: flex; gap: 6px; align-items: center; }
  .opening .name { font-family: var(--font-display); }
  .lock { font-size: 0.7em; margin-left: 3px; opacity: 0.7; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; transition: opacity 0.15s; }
  table.loading { opacity: 0.55; }
  th { text-align: left; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); font-weight: 700; padding: 4px 6px; }
  td { padding: 5px 6px; border-top: 1px solid var(--border); white-space: nowrap; }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  .bar-col { width: 45%; min-width: 120px; }
  tr.clickable { cursor: pointer; }
  tr.clickable:hover td { background: var(--surface-2); }
  tr.book td:first-child { color: var(--accent); }
  .book-dot { color: var(--accent); font-size: 0.6rem; margin-left: 4px; vertical-align: middle; }
  tr.total td { font-weight: 700; color: var(--text-muted); }
  .filters { margin: -4px 0 6px; }
  .filter-box { display: flex; flex-direction: column; gap: 6px; padding: 8px; background: var(--surface-2); border-radius: var(--radius-sm); margin-top: 4px; }
  .filter-box .chip { cursor: pointer; }
  .src-note { margin: -4px 0 6px; }
  .empty { margin: 8px 0 0; }
  .games { margin-top: 10px; font-size: 0.88rem; }
  .games summary { cursor: pointer; font-weight: 600; color: var(--text-muted); }
  .games ul { list-style: none; padding: 0; margin: 6px 0 0; }
  .login-hint { margin: 10px 0 0; }
  .linklike { background: none; border: 0; padding: 0; font: inherit; color: var(--accent); cursor: pointer; font-weight: 600; }
  .compact td { padding: 3px 5px; }
  .compact .bar-col { width: 40%; }
</style>
