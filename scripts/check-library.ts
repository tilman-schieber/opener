/**
 * Engine QA for the curated library: evaluates every move of every line with Stockfish and
 * flags moves that lose a lot compared with the engine's best move (likely typos or dubious theory).
 *
 *   node scripts/check-library.ts [--depth 14] [--threshold 120] [--only italian-game]
 *
 * Gambits legitimately "lose" material, so treat the output as a review list, not as errors.
 */
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { playLine, INITIAL_FEN } from '../src/lib/chess/moves.ts';
import type { LibraryOpening } from '../src/lib/library/types.ts';

const require = createRequire(import.meta.url);
const initEngine = require('stockfish');

const args = process.argv.slice(2);
const opt = (n: string, d: string) => (args.includes('--' + n) ? args[args.indexOf('--' + n) + 1] : d);
const DEPTH = Number(opt('depth', '14'));
const THRESHOLD = Number(opt('threshold', '120'));
const ONLY = opt('only', '');

interface Eval {
  cp: number; // side to move POV, mate mapped to ±10000
  best: string;
}

const engine = await initEngine('lite-single');
let listener: ((l: string) => void) | null = null;
engine.listener = (l: string) => listener?.(l);
const send = (c: string) => engine.sendCommand(c);

function waitFor(pred: (l: string) => boolean, onLine?: (l: string) => void): Promise<string> {
  return new Promise((res) => {
    listener = (l) => {
      onLine?.(l);
      if (pred(l)) res(l);
    };
  });
}

send('uci');
await waitFor((l) => l === 'uciok');
send('setoption name Hash value 64');
send('isready');
await waitFor((l) => l === 'readyok');

const cache = new Map<string, Eval>();
async function evaluate(fen: string): Promise<Eval> {
  const hit = cache.get(fen);
  if (hit) return hit;
  let cp = 0;
  send(`position fen ${fen}`);
  send(`go depth ${DEPTH}`);
  const best = await waitFor(
    (l) => l.startsWith('bestmove'),
    (l) => {
      const m = l.match(/score (cp|mate) (-?\d+)/);
      if (m && l.includes(' pv ')) cp = m[1] === 'cp' ? Number(m[2]) : Math.sign(Number(m[2]) || -1) * 10000;
    },
  );
  const e = { cp, best: best.split(' ')[1] };
  cache.set(fen, e);
  return e;
}

const dir = new URL('../src/lib/library/openings/', import.meta.url);
const files = readdirSync(dir).filter((f) => f.endsWith('.ts'));
let flagged = 0;

for (const f of files) {
  const o = (await import(pathToFileURL(new URL(f, dir).pathname).href)).default as LibraryOpening;
  if (ONLY && o.id !== ONLY) continue;
  const seqs = [...o.lines.map((l) => ({ kind: 'line', name: l.name, moves: l.moves })), ...o.positions.map((p) => ({ kind: 'note', name: p.note.slice(0, 40), moves: p.moves }))];
  for (const s of seqs) {
    const plies = playLine(s.moves);
    let fen = INITIAL_FEN;
    for (let i = 0; i < plies.length; i++) {
      const before = await evaluate(fen);
      const after = await evaluate(plies[i].fen);
      const loss = before.cp - -after.cp; // mover's POV: before (to move) vs after (opponent to move, negate)
      if (loss >= THRESHOLD && before.best !== plies[i].uci) {
        flagged++;
        const mover = i % 2 === 0 ? 'W' : 'B';
        console.log(`${o.id} | ${s.kind} "${s.name}" | ply ${i + 1} ${mover} ${plies[i].san} loses ${loss}cp (best ${before.best}, eval before ${before.cp})`);
      }
      fen = plies[i].fen;
    }
  }
  console.error(`checked ${o.id}`);
}
console.error(`done: ${flagged} flagged moves at depth ${DEPTH}, threshold ${THRESHOLD}cp`);
process.exit(0);
