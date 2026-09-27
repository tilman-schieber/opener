<script lang="ts">
  import Icon from '../components/Icon.svelte';
  import Board from '../components/Board.svelte';
  import MoveList from '../components/MoveList.svelte';
  import ExplorerPanel from '../components/ExplorerPanel.svelte';
  import IdeasPanel from '../components/IdeasPanel.svelte';
  import EvalBar from '../components/EvalBar.svelte';
  import EngineLines from '../components/EngineLines.svelte';
  import RepPicker from '../components/RepPicker.svelte';
  import WDLBar from '../components/WDLBar.svelte';
  import MoveSeq from '../components/MoveSeq.svelte';
  import { route, go, href } from '../lib/router.svelte.ts';
  import { settings } from '../lib/settings.svelte.ts';
  import { auth } from '../lib/auth/lichess.svelte.ts';
  import { findRepertoire, repertoires } from '../lib/repertoire/store.svelte.ts';
  import { addLine, emptyRoot, linesOf, positionIndex, nodeAt, type Repertoire, type RepLine, type RepNode } from '../lib/repertoire/model.ts';
  import { INITIAL_FEN, keyOfFen, outcomeOf, playUci, playSans, turnOf, uciToSan, formatLine, type Outcome } from '../lib/chess/moves.ts';
  import { chooseMove, type OpponentConfig } from '../lib/play/opponent.ts';
  import { getPlayEngine, type Analysis } from '../lib/engine/engine.ts';
  import { explore } from '../lib/explorer/index.ts';
  import { total, type ExplorerMove } from '../lib/explorer/types.ts';
  import { db, uid } from '../lib/store/db.ts';
  import { moveSound, chime } from '../lib/sound.ts';
  import type { PlayedGame, PlayedMove } from '../lib/play/types.ts';
  import type { DrawShape } from 'chessground/draw';
  import type { Key } from 'chessground/types';

  // ---------------------------------------------------------------- setup
  let repId = $state(route.query.get('rep') ?? (route.query.get('moves') ? '' : 'lib:italian-game'));
  const customMoves = route.query.get('moves') ?? '';
  let customColor = $state<'white' | 'black'>((route.query.get('color') as 'white' | 'black') ?? 'white');
  let lineChoice = $state(route.query.get('line') ?? 'random');

  const rep = $derived.by((): Repertoire | undefined => {
    void repertoires.list;
    if (repId) return findRepertoire(repId);
    if (!customMoves) return undefined;
    // An ad-hoc repertoire made from the explorer line
    const root = emptyRoot();
    let fen = INITIAL_FEN;
    const sans: string[] = [];
    for (const u of customMoves.split(',')) {
      const p = playUci(fen, u);
      if (!p) break;
      sans.push(p.san);
      fen = p.fen;
    }
    addLine(root, sans, 'Explorer line');
    return { id: 'custom', name: formatLine(sans) || 'Free game', color: customColor, origin: 'custom', root, notes: {}, createdAt: 0, updatedAt: 0 };
  });
  const lines = $derived(rep ? linesOf(rep) : []);

  let recent = $state<PlayedGame[]>([]);
  db()
    .then((d) => d.getAllFromIndex('games', 'date'))
    .then((g) => (recent = g.reverse().slice(0, 4)));

  // ---------------------------------------------------------------- game state
  type Phase = 'setup' | 'playing' | 'over';
  let phase = $state<Phase>('setup');
  let color = $state<'white' | 'black'>('white');
  let target = $state<RepLine | null>(null);
  let moves = $state<PlayedMove[]>([]);
  let cursor = $state(0);
  let thinking = $state(false);
  let status = $state('');
  let statusKind = $state<'book' | 'human' | 'engine' | 'info'>('book');
  let leftBook = $state<{ ply: number; expected: string[]; stats: ExplorerMove[] } | null>(null);
  let endOfLineShown = $state(false);
  let outcome = $state<Outcome & { resigned?: boolean }>({ over: false });
  let savedId = $state<string | null>(null);
  let analysis = $state<Analysis | null>(null);
  let gameToken = 0;
  let config: OpponentConfig;
  const stage = { outOfDb: false };

  const liveFen = $derived(moves.length ? moves[moves.length - 1].fen : INITIAL_FEN);
  const viewFen = $derived(cursor === 0 ? INITIAL_FEN : moves[cursor - 1].fen);
  const atLive = $derived(cursor === moves.length);
  const myTurn = $derived(phase === 'playing' && atLive && !thinking && turnOf(liveFen) === color);
  const book = $derived(rep ? positionIndex(rep.root) : new Map<string, RepNode[]>());
  const bookHere = $derived((book.get(keyOfFen(viewFen)) ?? []).map((n) => n.uci));

  function start() {
    if (!rep || !lines.length) return;
    color = rep.color;
    target = lineChoice === 'random' ? lines[Math.floor(Math.random() * lines.length)] : (lines[Number(lineChoice)] ?? lines[0]);
    moves = [];
    cursor = 0;
    leftBook = null;
    endOfLineShown = false;
    outcome = { over: false };
    savedId = null;
    stage.outOfDb = false;
    gameToken++;
    config = {
      book,
      target: target.ucis,
      humanRating: settings.humanRating,
      humanMinGames: settings.humanMinGames,
      engineElo: settings.engineElo,
      source: auth.token ? 'lichess' : 'offline',
    };
    getPlayEngine().newGame();
    phase = 'playing';
    status = target.name ? `Line: ${target.name}` : 'Your repertoire';
    statusKind = 'book';
    if (color === 'black') opponentMove();
  }

  function push(m: PlayedMove) {
    moves = [...moves, m];
    cursor = moves.length;
    moveSound(m.san.includes('x'));
    checkEnd();
  }

  function checkEnd() {
    const o = outcomeOf(liveFen, [INITIAL_FEN, ...moves.map((m) => m.fen)]);
    if (o.over) finish(o);
  }

  async function onUserMove(uci: string) {
    if (!myTurn) return;
    const fen = liveFen;
    const p = playUci(fen, uci);
    if (!p) return;
    const ply = moves.length;
    const expected = book.get(keyOfFen(fen)) ?? [];
    if (!leftBook && expected.length && !expected.some((n) => n.uci === p.uci)) {
      const exp = expected.map((n) => uciToSan(fen, n.uci));
      leftBook = { ply, expected: exp, stats: [] };
      chime(false);
      explore(config.source === 'lichess' ? { source: 'lichess', fen, ratings: settings.ratings, speeds: settings.speeds } : { source: 'offline', fen })
        .then((d) => {
          if (leftBook?.ply === ply) leftBook.stats = d.moves.filter((m) => m.uci === p.uci || expected.some((n) => n.uci === m.uci));
        })
        .catch(() => {});
    }
    push({ ...p, phase: 'player' });
    if (!outcome.over) opponentMove();
  }

  async function opponentMove() {
    const token = gameToken;
    thinking = true;
    const fen = liveFen;
    const started = performance.now();
    try {
      const m = await chooseMove(config, fen, moves.map((x) => x.uci), stage);
      // Human-like pacing: never answer instantly
      const wait = 350 + Math.random() * 450 - (performance.now() - started);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      if (token !== gameToken || phase !== 'playing') return;
      const p = playUci(fen, m.uci);
      if (!p) throw new Error('engine returned an illegal move');
      status = m.reason;
      statusKind = m.phase;
      push({ ...p, phase: m.phase, games: m.games });
      // Out of prepared moves for the player?
      if (!outcome.over && !endOfLineShown && !leftBook && !(book.get(keyOfFen(p.fen))?.length) && moves.length >= 2) {
        endOfLineShown = true;
        status = 'Your prepared line ends here. From now on, it’s your own play.';
        statusKind = 'info';
        chime(true);
      }
    } catch (e) {
      status = `Opponent error: ${(e as Error).message}`;
      statusKind = 'info';
    } finally {
      if (token === gameToken) thinking = false;
    }
  }

  function takeBack() {
    if (phase !== 'playing' || thinking) return;
    gameToken++;
    let n = moves.length;
    // remove plies until it's the player's turn again, removing at least one player move
    do n--;
    while (n > 0 && (n % 2 === 0 ? 'white' : 'black') !== color);
    if (n < 0) return;
    moves = moves.slice(0, Math.max(0, n));
    cursor = moves.length;
    if (leftBook && leftBook.ply >= moves.length) leftBook = null;
    if (endOfLineShown) endOfLineShown = false;
    stage.outOfDb = false;
    thinking = false;
    if (turnOf(liveFen) !== color) opponentMove();
  }

  function resign() {
    finish({ over: true, winner: color === 'white' ? 'black' : 'white', resigned: true });
  }

  async function finish(o: Outcome & { resigned?: boolean }) {
    gameToken++;
    outcome = o;
    phase = 'over';
    thinking = false;
    const won = o.winner === color;
    chime(won || !o.winner);
    if (!rep || !moves.length) return;
    const g: PlayedGame = {
      id: uid(),
      date: Date.now(),
      repertoireId: rep.id,
      repertoireName: rep.name,
      lineName: target?.name,
      color,
      moves: $state.snapshot(moves) as PlayedMove[],
      result: o.winner === 'white' ? '1-0' : o.winner === 'black' ? '0-1' : o.over ? '1/2-1/2' : '*',
      reason: o.resigned ? 'resignation' : o.reason,
      leftBookPly: leftBook?.ply,
      expected: leftBook?.expected,
      engineElo: config.engineElo,
      humanRating: config.humanRating,
    };
    await (await db()).put('games', g);
    savedId = g.id;
  }

  // ---------------------------------------------------------------- view helpers
  const marks = $derived(
    moves.map((m, i) => (leftBook?.ply === i ? 'left-book' : m.phase === 'book' || (m.phase === 'player' && (!leftBook || i < leftBook.ply)) ? 'book' : m.phase)),
  );

  const shapes = $derived.by(() => {
    const s: DrawShape[] = [];
    if (phase === 'over' || !atLive) {
      if (leftBook && cursor === leftBook.ply) {
        const exp = book.get(keyOfFen(viewFen)) ?? [];
        for (const n of exp) s.push({ orig: n.uci.slice(0, 2) as Key, dest: n.uci.slice(2, 4) as Key, brush: 'green' });
      }
    }
    return s;
  });

  const resultText = $derived.by(() => {
    if (!outcome.over) return '';
    const who = outcome.winner ? (outcome.winner === color ? 'You won' : 'You lost') : 'Draw';
    const why = outcome.resigned ? 'by resignation' : outcome.reason === 'checkmate' ? 'by checkmate' : outcome.reason ? `(${outcome.reason})` : '';
    return `${who} ${why}`;
  });


  function nextLine() {
    lineChoice = 'random';
    start();
  }
</script>

{#if phase === 'setup'}
  <div class="setup card">
    <h1>Play an opening</h1>
    <p class="muted">
      The opponent plays your chosen line exactly. When the line ends, it answers with moves real players at your level choose (weighted by the explorer), and
      once the game leaves the database, Stockfish takes over at the strength you pick.
    </p>

    <div class="field">
      <label for="rep">Opening</label>
      <RepPicker bind:value={repId} allowCustom={!!customMoves} />
      {#if !repId && customMoves}
        <div class="row">
          <span class="muted small mono">{rep?.name}</span>
          <div class="seg">
            <button class:on={customColor === 'white'} onclick={() => (customColor = 'white')}>Play White</button>
            <button class:on={customColor === 'black'} onclick={() => (customColor = 'black')}>Play Black</button>
          </div>
        </div>
      {/if}
    </div>

    {#if rep}
      <div class="field">
        <label for="line">Line</label>
        <select id="line" bind:value={lineChoice}>
          <option value="random">Random line ({lines.length} in this repertoire)</option>
          {#each lines as l, i}
            <option value={String(i)}>{l.name ? `${l.name}: ` : ''}{formatLine(l.sans.slice(0, 10))}{l.sans.length > 10 ? ' …' : ''}</option>
          {/each}
        </select>
        {#if lineChoice !== 'random' && lines[Number(lineChoice)]}
          <div class="linepreview"><MoveSeq plies={playSans(lines[Number(lineChoice)].sans)} orientation={rep.color} /></div>
        {/if}
        <p class="muted small">You play <strong>{rep.color}</strong>. Hover a move to see the position.</p>
      </div>
    {/if}

    <div class="two">
      <div class="field">
        <label for="hr">Human-like opponent: <strong>{settings.humanRating}</strong></label>
        <input id="hr" type="range" min="1000" max="2400" step="100" bind:value={settings.humanRating} />
        <p class="muted small">
          {#if auth.token}Uses the Lichess database around this rating.{:else}Uses the bundled 1600–2200 tree. Log in with Lichess to match any rating.{/if}
        </p>
      </div>
      <div class="field">
        <label for="elo">Engine strength after the database: <strong>~{settings.engineElo}</strong></label>
        <input id="elo" type="range" min="1000" max="2800" step="50" bind:value={settings.engineElo} />
        <p class="muted small">Stockfish with limited strength.</p>
      </div>
    </div>

    <div class="row">
      <label class="check"><input type="checkbox" bind:checked={settings.showExplorerInPlay} /> Show explorer during the game</label>
      <label class="check"><input type="checkbox" bind:checked={settings.showEvalInPlay} /> Show evaluation</label>
    </div>

    <button class="btn primary lg" disabled={!rep || !lines.length} onclick={start}>Start game</button>
  </div>

  {#if recent.length}
    <section class="recent">
      <div class="row"><h2>Recent games</h2><span class="spacer"></span><a class="small" href={href('history')}>All games</a></div>
      <ul>
        {#each recent as g}
          {@const won = g.result !== '1/2-1/2' && g.result !== '*' && (g.result === '1-0') === (g.color === 'white')}
          <li>
            <a href={href(`review/${g.id}`)}>{g.repertoireName}</a>
            <span class="faint small">{g.lineName ?? ''}</span>
            <span class="spacer"></span>
            <span class="chip {g.result === '1/2-1/2' ? '' : won ? 'good' : 'bad'}">{g.result === '1/2-1/2' ? 'Draw' : won ? 'Won' : 'Lost'}</span>
            <span class="faint small">{g.leftBookPly !== undefined ? `left book at move ${Math.floor(g.leftBookPly / 2) + 1}` : 'stayed in book'}</span>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
{:else}
  <div class="workspace">
    <div class="left">
      <div class="status {statusKind}">
        <span class="dot"></span>
        <span class="txt">{thinking ? 'Opponent is thinking…' : status}</span>
      </div>
      <div class="board-row">
        {#if settings.showEvalInPlay}<EvalBar line={analysis?.fen === viewFen ? analysis.lines[0] : undefined} orientation={color} />{/if}
        <div class="grow">
          <Board
            fen={viewFen}
            orientation={color}
            movable={myTurn ? color : null}
            lastMove={cursor ? moves[cursor - 1].uci : undefined}
            onmove={onUserMove}
            {shapes}
          />
        </div>
      </div>

      {#if leftBook && phase === 'playing'}
        <div class="leftbook card">
          <div>
            <strong>You left your repertoire</strong> at move {Math.floor(leftBook.ply / 2) + 1}. Expected
            {#each leftBook.expected as e, i}<span class="san">{e}</span>{i < leftBook.expected.length - 1 ? ' or ' : ''}{/each}.
            The game continues from here.
          </div>
          {#if leftBook.stats.length}
            <div class="lb-stats">
              {#each leftBook.stats as s}
                <div class="row"><span class="san">{s.san}</span><span class="muted small">{total(s).toLocaleString()} games</span><div class="grow"><WDLBar white={s.white} draws={s.draws} black={s.black} height={12} /></div></div>
              {/each}
            </div>
          {/if}
          <button class="btn small" onclick={takeBack}><Icon name="undo" /> Take back</button>
        </div>
      {/if}

      {#if phase === 'over'}
        <div class="result card">
          <h2>{resultText}</h2>
          {#if leftBook}
            <p class="muted">You left the book at move {Math.floor(leftBook.ply / 2) + 1} (expected {leftBook.expected.join(' / ')}).</p>
          {:else}
            <p class="muted">You stayed in your repertoire the whole way.</p>
          {/if}
          <div class="row">
            {#if savedId}<a class="btn primary" href={href(`review/${savedId}`)}>Review game</a>{/if}
            <button class="btn" onclick={start}>Play another line</button>
            <button class="btn" onclick={() => (phase = 'setup')}>Change setup</button>
          </div>
        </div>
      {/if}

      <div class="row tools">
        {#if phase === 'playing'}
          <button class="btn small" onclick={takeBack} disabled={thinking || moves.length < 1}><Icon name="undo" /> Take back</button>
          <button class="btn small danger" onclick={resign}><Icon name="flag" /> Resign</button>
        {/if}
        <button class="btn small" class:primary={settings.showEvalInPlay} onclick={() => (settings.showEvalInPlay = !settings.showEvalInPlay)}>
          <Icon name={settings.showEvalInPlay ? 'eye-off' : 'eye'} /> {settings.showEvalInPlay ? 'Hide evaluation' : 'Show evaluation'}
        </button>
        <button class="btn small" onclick={() => (settings.showExplorerInPlay = !settings.showExplorerInPlay)}>
          {settings.showExplorerInPlay ? 'Hide explorer' : 'Show explorer'}
        </button>
        <span class="spacer"></span>
        <span class="muted small">{rep?.name}{target?.name ? ` · ${target.name}` : ''}</span>
      </div>
      {#if settings.showEvalInPlay}
        <div class="sheet panel"><EngineLines fen={viewFen} enabled={settings.showEvalInPlay} bind:analysis multipv={2} depth={18} /></div>
      {/if}
    </div>

    <div class="right">
      <div class="sheet panel">
        <div class="panel-head"><h3>Moves</h3><span class="legend small muted"><span class="lg book">book</span> <span class="lg human">human-like</span> <span class="lg engine">engine</span></span></div>
        <MoveList plies={moves} {cursor} onselect={(i) => (cursor = i)} {marks} empty="Waiting for the first move…" />
      </div>
      {#if settings.showExplorerInPlay}
        <ExplorerPanel fen={viewFen} fens={[INITIAL_FEN, ...moves.slice(0, cursor).map((m) => m.fen)]} bookMoves={bookHere} myColor={color} compact />
      {/if}
      <IdeasPanel fens={moves.slice(0, cursor).map((m) => m.fen)} preferred={rep?.libraryId} comment={rep ? nodeAt(rep.root, moves.slice(0, cursor).map((m) => m.uci))?.comment : undefined} />
    </div>
  </div>
{/if}

<style>
  .setup { max-width: 720px; margin: 0 auto; padding: 28px; display: flex; flex-direction: column; gap: 18px; }
  .field { display: flex; flex-direction: column; gap: 6px; }
  .field select { width: 100%; }
  .recent { max-width: 720px; margin: 28px auto 0; display: flex; flex-direction: column; gap: 8px; }
  .recent h2 { font-size: 1.15rem; }
  .recent ul { list-style: none; padding: 0; margin: 0; }
  .recent li { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid var(--rule); margin: 0; }
  .linepreview { padding: 8px 10px; background: var(--sheet-2); border-radius: var(--radius-sm); }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (max-width: 640px) { .two { grid-template-columns: 1fr; } }
  input[type='range'] { width: 100%; accent-color: var(--blue); }
  .check { font-weight: 500; display: flex; gap: 6px; align-items: center; }
  .board-row { display: flex; gap: 8px; }
  .grow { flex: 1; min-width: 0; }
  .leftbook { display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
  .lb-stats { width: 100%; display: flex; flex-direction: column; gap: 4px; }
  .lb-stats .san { min-width: 3.5em; }
  .result { padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; }
  .tools { gap: 6px; }
  .legend { display: flex; gap: 10px; }
  .lg.book { color: var(--blue); font-weight: 600; }
  .lg.engine { color: var(--ink-2); }
</style>
