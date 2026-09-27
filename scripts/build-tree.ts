/**
 * Builds the bundled offline opening explorer tree from a Lichess monthly database dump.
 *
 *   npm run build-tree -- --games 5000000 --plies 12 --min 40
 *
 * Streams https://database.lichess.org (curl | zstd -dc), keeps rated blitz/rapid/classical games
 * whose average rating is inside [--lo, --hi], counts results for every (position, move) pair in the
 * first --plies half-moves, then writes 256 JSON shards to public/tree/.
 *
 * Counting uses lossy pruning (entries with tiny counts are dropped periodically) to keep memory
 * bounded; the error per entry is at most a few games, far below the --min output threshold.
 */
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline';
import { mkdirSync, writeFileSync, rmSync, createReadStream } from 'node:fs';
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads';
import { Chess } from 'chessops/chess';
import { parseSan } from 'chessops/san';
import { makeUci } from 'chessops/util';
import { fenKey, treeHash } from '../src/lib/chess/key.ts';

type Counts = Map<string, Int32Array>; // "fenKey#uci" -> [white, draws, black]

interface Opts {
  month: string;
  games: number;
  plies: number;
  min: number;
  moveMin: number;
  lo: number;
  hi: number;
  out: string;
  workers: number;
  file?: string;
}

function parseArgs(): Opts {
  const a = process.argv.slice(2);
  const get = (name: string, def: string) => {
    const i = a.indexOf('--' + name);
    return i >= 0 ? a[i + 1] : def;
  };
  return {
    month: get('month', '2026-08'),
    games: Number(get('games', '5000000')),
    plies: Number(get('plies', '12')),
    min: Number(get('min', '40')),
    moveMin: Number(get('move-min', '5')),
    lo: Number(get('lo', '1600')),
    hi: Number(get('hi', '2200')),
    out: get('out', 'public/tree'),
    workers: Number(get('workers', '8')),
    file: a.includes('--file') ? get('file', '') : undefined,
  };
}

// ---------------------------------------------------------------- worker: SAN parsing + counting

const PRUNE_EVERY = 400_000;

function workerMain() {
  const { plies } = workerData as { plies: number };
  const counts: Counts = new Map();
  let sinceprune = 0;
  let pruneFloor = 1;

  parentPort!.on('message', (msg: { batch?: string[]; finish?: boolean }) => {
    if (msg.batch) {
      for (const rec of msg.batch) {
        // rec = "<resultIdx> san san san ..."
        const parts = rec.split(' ');
        const res = parts[0].charCodeAt(0) - 48; // 0 white, 1 draw, 2 black
        const pos = Chess.default();
        const n = Math.min(parts.length - 1, plies);
        for (let i = 1; i <= n; i++) {
          const move = parseSan(pos, parts[i]);
          if (!move) break;
          const k = fenKey(pos) + '#' + makeUci(move);
          let c = counts.get(k);
          if (!c) counts.set(k, (c = new Int32Array(3)));
          c[res]++;
          pos.play(move);
        }
      }
      sinceprune += msg.batch.length;
      if (sinceprune >= PRUNE_EVERY) {
        sinceprune = 0;
        for (const [k, c] of counts) if (c[0] + c[1] + c[2] <= pruneFloor) counts.delete(k);
        if (counts.size > 6_000_000) pruneFloor++;
      }
      parentPort!.postMessage({ ack: true });
    } else if (msg.finish) {
      const entries: [string, number, number, number][] = [];
      for (const [k, c] of counts) if (c[0] + c[1] + c[2] >= 2) entries.push([k, c[0], c[1], c[2]]);
      parentPort!.postMessage({ entries });
    }
  });
}

// ---------------------------------------------------------------- main: stream + dispatch

async function main() {
  const o = parseArgs();
  console.error(`building tree: ${o.games} games, ${o.plies} plies, rating ${o.lo}-${o.hi}, min ${o.min}`);

  let input: NodeJS.ReadableStream;
  let curl: ReturnType<typeof spawn> | undefined;
  let zstd: ReturnType<typeof spawn> | undefined;
  if (o.file) {
    input = createReadStream(o.file);
  } else {
    const url = `https://database.lichess.org/standard/lichess_db_standard_rated_${o.month}.pgn.zst`;
    curl = spawn('curl', ['-sL', url], { stdio: ['ignore', 'pipe', 'inherit'] });
    zstd = spawn('zstd', ['-dc', '--long=31'], { stdio: ['pipe', 'pipe', 'inherit'] });
    curl.stdout!.pipe(zstd.stdin!);
    zstd.stdin!.on('error', () => {});
    input = zstd.stdout!;
  }

  const workers = Array.from({ length: o.workers }, () => new Worker(new URL(import.meta.url), { workerData: { plies: o.plies } }));
  let inflight = 0;
  const waiters: (() => void)[] = [];
  for (const w of workers)
    w.on('message', (m) => {
      if (m.ack) {
        inflight--;
        waiters.shift()?.();
      }
    });

  let rr = 0;
  let batch: string[] = [];
  const BATCH = 2000;
  const dispatch = async () => {
    if (inflight >= o.workers * 3) await new Promise<void>((r) => waiters.push(r));
    inflight++;
    workers[rr++ % workers.length].postMessage({ batch });
    batch = [];
  };

  let seen = 0;
  let kept = 0;
  let event = '';
  let welo = 0;
  let belo = 0;
  let result = '';
  const t0 = Date.now();
  const rl = createInterface({ input, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.length === 0) continue;
    if (line.charCodeAt(0) === 91 /* [ */) {
      if (line.startsWith('[Event ')) event = line;
      else if (line.startsWith('[WhiteElo ')) welo = parseInt(line.slice(11), 10);
      else if (line.startsWith('[BlackElo ')) belo = parseInt(line.slice(11), 10);
      else if (line.startsWith('[Result ')) result = line.slice(9, -2);
      continue;
    }
    // movetext line
    seen++;
    const avg = (welo + belo) / 2;
    const speedOk = event.includes('Blitz') || event.includes('Rapid') || event.includes('Classical');
    const resIdx = result === '1-0' ? '0' : result === '1/2-1/2' ? '1' : result === '0-1' ? '2' : '';
    if (speedOk && resIdx && avg >= o.lo && avg <= o.hi) {
      const sans: string[] = [];
      for (const tok of line.replace(/\{[^}]*\}/g, ' ').split(/\s+/)) {
        if (!tok || /^\d+\.+$/.test(tok) || tok === '1-0' || tok === '0-1' || tok === '1/2-1/2' || tok === '*') continue;
        sans.push(tok.replace(/^\d+\.+/, '').replace(/[?!]+$/, ''));
        if (sans.length >= o.plies) break;
      }
      if (sans.length >= 2) {
        batch.push(resIdx + ' ' + sans.join(' '));
        kept++;
        if (batch.length >= BATCH) await dispatch();
      }
    }
    event = '';
    welo = belo = 0;
    result = '';
    if (seen % 1_000_000 === 0) {
      const s = (Date.now() - t0) / 1000;
      console.error(`seen ${(seen / 1e6).toFixed(0)}M, kept ${(kept / 1e6).toFixed(2)}M, ${(seen / s / 1000).toFixed(0)}k games/s`);
    }
    if (kept >= o.games) break;
  }
  if (batch.length) await dispatch();
  rl.close();
  curl?.kill();
  zstd?.kill();

  while (inflight > 0) await new Promise<void>((r) => waiters.push(r));
  console.error(`parsed ${kept} games (of ${seen}), merging…`);

  const merged: Counts = new Map();
  await Promise.all(
    workers.map(
      (w) =>
        new Promise<void>((resolve) => {
          w.on('message', (m) => {
            if (!m.entries) return;
            for (const [k, a, b, c] of m.entries as [string, number, number, number][]) {
              const cur = merged.get(k);
              if (cur) {
                cur[0] += a;
                cur[1] += b;
                cur[2] += c;
              } else merged.set(k, Int32Array.of(a, b, c));
            }
            w.terminate();
            resolve();
          });
          w.postMessage({ finish: true });
        }),
    ),
  );

  // group by position
  const byPos = new Map<string, [string, number, number, number][]>();
  for (const [k, c] of merged) {
    const i = k.indexOf('#');
    const pos = k.slice(0, i);
    let arr = byPos.get(pos);
    if (!arr) byPos.set(pos, (arr = []));
    arr.push([k.slice(i + 1), c[0], c[1], c[2]]);
  }
  merged.clear();

  const shards: Record<string, Record<string, (string | number)[][]>> = {};
  let positions = 0;
  let moves = 0;
  for (const [pos, arr] of byPos) {
    const total = arr.reduce((s, m) => s + m[1] + m[2] + m[3], 0);
    if (total < o.min) continue;
    const keep = arr
      .filter((m) => m[1] + m[2] + m[3] >= Math.max(o.moveMin, total * 0.002))
      .sort((x, y) => y[1] + y[2] + y[3] - (x[1] + x[2] + x[3]));
    if (!keep.length) continue;
    const h = treeHash(pos);
    (shards[h.slice(0, 2)] ??= {})[h] = keep;
    positions++;
    moves += keep.length;
  }

  rmSync(o.out, { recursive: true, force: true });
  mkdirSync(o.out, { recursive: true });
  let bytes = 0;
  for (const [s, data] of Object.entries(shards)) {
    const json = JSON.stringify(data);
    bytes += json.length;
    writeFileSync(`${o.out}/${s}.json`, json);
  }
  const meta = {
    source: `lichess_db_standard_rated_${o.month}`,
    games: kept,
    plies: o.plies,
    ratings: [o.lo, o.hi],
    speeds: ['blitz', 'rapid', 'classical'],
    minGames: o.min,
    positions,
    moves,
    built: new Date().toISOString(),
  };
  writeFileSync(`${o.out}/meta.json`, JSON.stringify(meta, null, 2));
  console.error(`wrote ${positions} positions, ${moves} moves, ${(bytes / 1e6).toFixed(1)} MB in ${Object.keys(shards).length} shards`);
  console.error(`total ${((Date.now() - t0) / 60000).toFixed(1)} min`);
}

if (isMainThread) main().catch((e) => {
  console.error(e);
  process.exit(1);
});
else workerMain();
