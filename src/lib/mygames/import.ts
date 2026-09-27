import { parsePgn } from 'chessops/pgn';
import { Chess } from 'chessops/chess';
import { parseSan } from 'chessops/san';
import { stdUci } from '../chess/moves.ts';
import { db } from '../store/db.ts';
import type { ImportedGame } from './types.ts';

const MAX_PLIES = 40;

function ucisFromSans(sans: string[]): string[] {
  const out: string[] = [];
  const pos = Chess.default();
  for (const san of sans.slice(0, MAX_PLIES)) {
    const m = parseSan(pos, san);
    if (!m) break;
    out.push(stdUci(pos, m));
    pos.play(m);
  }
  return out;
}

async function saveAll(games: ImportedGame[]): Promise<void> {
  const d = await db();
  const tx = d.transaction('mygames', 'readwrite');
  await Promise.all([...games.map((g) => tx.store.put(g)), tx.done]);
}

export type Progress = (n: number, note?: string) => void;

/** Streams a Lichess user's games (public API, NDJSON). */
export async function importLichess(username: string, max: number, onProgress: Progress, signal?: AbortSignal): Promise<number> {
  const params = new URLSearchParams({ max: String(max), rated: 'true', perfType: 'blitz,rapid,classical', moves: 'true', opening: 'false', clocks: 'false', evals: 'false' });
  const res = await fetch(`https://lichess.org/api/games/user/${encodeURIComponent(username)}?${params}`, {
    headers: { Accept: 'application/x-ndjson' },
    signal,
  });
  if (res.status === 404) throw new Error(`Lichess user "${username}" not found.`);
  if (!res.ok || !res.body) throw new Error(`Lichess error ${res.status}`);
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  const account = `lichess:${username.toLowerCase()}`;
  let buf = '';
  let batch: ImportedGame[] = [];
  let count = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (value) buf += value;
    const lines = buf.split('\n');
    buf = done ? '' : lines.pop()!;
    for (const line of lines) {
      if (!line.trim()) continue;
      const g = JSON.parse(line);
      if (g.variant !== 'standard' || !g.moves) continue;
      const whiteName: string = g.players.white.user?.name ?? '';
      const color = whiteName.toLowerCase() === username.toLowerCase() ? 'white' : 'black';
      const opp = g.players[color === 'white' ? 'black' : 'white'];
      batch.push({
        id: `lichess:${g.id}`,
        account,
        color,
        result: !g.winner ? 'draw' : g.winner === color ? 'win' : 'loss',
        moves: ucisFromSans(g.moves.split(' ')),
        date: g.createdAt,
        opponent: opp.user?.name ?? 'Anonymous',
        opponentRating: opp.rating,
        speed: g.speed,
        url: `https://lichess.org/${g.id}`,
      });
      count++;
    }
    if (batch.length >= 200 || done) {
      await saveAll(batch);
      batch = [];
      onProgress(count);
    }
    if (done) break;
  }
  return count;
}

/** Downloads a Chess.com user's monthly archives, newest first, until `max` games. */
export async function importChessCom(username: string, max: number, onProgress: Progress, signal?: AbortSignal): Promise<number> {
  const u = username.toLowerCase();
  const res = await fetch(`https://api.chess.com/pub/player/${encodeURIComponent(u)}/games/archives`, { signal });
  if (res.status === 404) throw new Error(`Chess.com user "${username}" not found.`);
  if (!res.ok) throw new Error(`Chess.com error ${res.status}`);
  const archives: string[] = (await res.json()).archives ?? [];
  let count = 0;
  for (const url of archives.reverse()) {
    if (count >= max) break;
    const month = await fetch(url, { signal }).then((r) => r.json());
    const games: ImportedGame[] = [];
    for (const g of [...(month.games ?? [])].reverse()) {
      if (count >= max) break;
      if (g.rules !== 'chess' || !g.pgn || !['blitz', 'rapid', 'daily'].includes(g.time_class)) continue;
      const color = g.white.username.toLowerCase() === u ? 'white' : 'black';
      const me = g[color];
      const opp = g[color === 'white' ? 'black' : 'white'];
      const pgn = parsePgn(g.pgn)[0];
      const sans: string[] = [];
      for (const n of pgn.moves.mainline()) sans.push(n.san);
      const res2 = me.result === 'win' ? 'win' : ['agreed', 'repetition', 'stalemate', 'insufficient', '50move', 'timevsinsufficient'].includes(me.result) ? 'draw' : 'loss';
      games.push({
        id: `chesscom:${g.uuid ?? g.url}`,
        account: `chesscom:${u}`,
        color,
        result: res2,
        moves: ucisFromSans(sans),
        date: (g.end_time ?? 0) * 1000,
        opponent: opp.username,
        opponentRating: opp.rating,
        speed: g.time_class,
        url: g.url,
      });
      count++;
    }
    await saveAll(games);
    onProgress(count, url.split('/').slice(-2).join('-'));
  }
  return count;
}

/** Imports games from PGN text as "my games"; `player` decides the color (falls back to White). */
export async function importPgnGames(text: string, label: string, player: string): Promise<number> {
  const games: ImportedGame[] = [];
  const p = player.trim().toLowerCase();
  parsePgn(text).forEach((g, i) => {
    const white = (g.headers.get('White') ?? '').toLowerCase();
    const black = (g.headers.get('Black') ?? '').toLowerCase();
    const color = p && black.includes(p) && !white.includes(p) ? 'black' : 'white';
    const r = g.headers.get('Result');
    const sans: string[] = [];
    for (const n of g.moves.mainline()) sans.push(n.san);
    games.push({
      id: `pgn:${label}:${i}`,
      account: `pgn:${label}`,
      color,
      result: r === '1/2-1/2' ? 'draw' : (r === '1-0') === (color === 'white') ? (r === '*' ? 'draw' : 'win') : 'loss',
      moves: ucisFromSans(sans),
      date: Date.parse((g.headers.get('Date') ?? '').replace(/\./g, '-')) || Date.now(),
      opponent: g.headers.get(color === 'white' ? 'Black' : 'White') ?? '?',
    });
  });
  await saveAll(games);
  return games.length;
}

export async function accounts(): Promise<{ account: string; count: number }[]> {
  const all = await (await db()).getAll('mygames');
  const m = new Map<string, number>();
  for (const g of all) m.set(g.account, (m.get(g.account) ?? 0) + 1);
  return [...m].map(([account, count]) => ({ account, count }));
}

export async function removeAccount(account: string): Promise<void> {
  const d = await db();
  const keys = await d.getAllKeysFromIndex('mygames', 'account', account);
  const tx = d.transaction('mygames', 'readwrite');
  await Promise.all([...keys.map((k) => tx.store.delete(k)), tx.done]);
}
