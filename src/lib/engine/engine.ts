import { turnOf } from '../chess/moves.ts';

export interface EngineLine {
  multipv: number;
  depth: number;
  /** Centipawns from White's point of view */
  cp?: number;
  /** Mate in N from White's point of view (negative = Black mates) */
  mate?: number;
  pv: string[];
}

export interface Analysis {
  fen: string;
  depth: number;
  lines: EngineLine[];
  bestmove?: string;
}

export interface Strength {
  /** 1320–3190 via UCI_Elo; below that Skill Level is used */
  elo?: number;
}

export interface GoOptions {
  depth?: number;
  movetime?: number;
  multipv?: number;
  strength?: Strength;
  onInfo?: (a: Analysis) => void;
}

const threaded = typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated && typeof SharedArrayBuffer !== 'undefined';

/** How long the worker may take to answer "uci" / "isready" before the engine counts as failed to load. */
const READY_TIMEOUT = 20_000;
/** A search that has not reported a best move by then is stopped; the partial result is used. */
const SEARCH_TIMEOUT = 90_000;

export class EngineError extends Error {}

/** Thin UCI wrapper around the Stockfish WASM worker. Jobs run one at a time; `stop()` ends the running one early. */
export class Engine {
  private worker: Worker;
  private handlers = new Set<(line: string) => void>();
  private queue: Promise<unknown> = Promise.resolve();
  private running = false;
  private ready: Promise<void>;
  /** Id of the newest analyse() request; older queued ones are skipped */
  private latest = 0;
  /** Set once the worker failed to load or died; every later call rejects and the next getter makes a fresh engine. */
  dead: EngineError | null = null;

  constructor() {
    const file = threaded ? 'stockfish-19-lite.js' : 'stockfish-19-lite-single.js';
    this.worker = new Worker(`${import.meta.env.BASE_URL}stockfish/${file}`);
    this.worker.onmessage = (e: MessageEvent) => {
      const line = typeof e.data === 'string' ? e.data : String(e.data);
      for (const h of this.handlers) h(line);
    };
    this.worker.onerror = (e) => this.fail(new EngineError(`Stockfish failed to load (${e.message || 'worker error'}).`));
    this.ready = (async () => {
      this.send('uci');
      await this.waitFor((l) => l === 'uciok', READY_TIMEOUT, 'Stockfish did not start. The engine files may be missing or blocked by the browser.');
      if (threaded) this.send(`setoption name Threads value ${Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1))}`);
      this.send('setoption name Hash value 32');
      this.send('isready');
      await this.waitFor((l) => l === 'readyok', READY_TIMEOUT, 'Stockfish did not become ready.');
    })();
    // The rejection is delivered to whoever awaits a search; nobody needs to await startup itself.
    this.ready.catch((e) => this.fail(e instanceof EngineError ? e : new EngineError(String(e))));
  }

  private fail(err: EngineError) {
    if (this.dead) return;
    this.dead = err;
    this.worker.terminate();
    // Wake up every pending wait so queued jobs reject instead of hanging.
    for (const h of [...this.handlers]) h('');
  }

  private send(cmd: string) {
    this.worker.postMessage(cmd);
  }

  /** Resolves with the first worker line matching `pred`; rejects when the engine dies or `timeout` ms pass. */
  private waitFor(pred: (line: string) => boolean, timeout = SEARCH_TIMEOUT, message = 'Stockfish stopped responding.'): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.dead) return reject(this.dead);
      const t = setTimeout(() => {
        this.handlers.delete(h);
        reject(new EngineError(message));
      }, timeout);
      const h = (l: string) => {
        if (this.dead) {
          clearTimeout(t);
          this.handlers.delete(h);
          reject(this.dead);
        } else if (pred(l)) {
          clearTimeout(t);
          this.handlers.delete(h);
          resolve(l);
        }
      };
      this.handlers.add(h);
    });
  }

  newGame() {
    this.queue = this.queue.then(() => {
      this.send('ucinewgame');
    });
  }

  /** Stops the currently running search (its promise resolves with what was found so far). */
  stop() {
    if (this.running) this.send('stop');
  }

  go(fen: string, opts: GoOptions = {}): Promise<Analysis> {
    const job = this.queue.then(() => this.run(fen, opts));
    this.queue = job.catch(() => {});
    return job;
  }

  /** Cancels whatever is running and starts this search next. */
  analyse(fen: string, opts: GoOptions = {}): Promise<Analysis> {
    const id = ++this.latest;
    this.stop();
    const job = this.queue.then(() => (id === this.latest ? this.run(fen, opts) : { fen, depth: 0, lines: [] }));
    this.queue = job.catch(() => {});
    return job;
  }

  private async run(fen: string, opts: GoOptions): Promise<Analysis> {
    await this.ready;
    if (this.dead) throw this.dead;
    const multipv = opts.multipv ?? 1;
    const elo = opts.strength?.elo;
    this.send(`setoption name MultiPV value ${multipv}`);
    if (elo !== undefined && elo < 3000) {
      this.send('setoption name UCI_LimitStrength value true');
      this.send(`setoption name UCI_Elo value ${Math.max(1320, Math.min(3190, Math.round(elo)))}`);
      // Below Stockfish's Elo floor, additionally weaken with Skill Level.
      this.send(`setoption name Skill Level value ${elo < 1320 ? Math.max(0, Math.round((elo - 800) / 60)) : 20}`);
    } else {
      this.send('setoption name UCI_LimitStrength value false');
      this.send('setoption name Skill Level value 20');
    }
    this.send('isready');
    await this.waitFor((l) => l === 'readyok', READY_TIMEOUT);

    const flip = turnOf(fen) === 'black' ? -1 : 1;
    const analysis: Analysis = { fen, depth: 0, lines: [] };
    const onLine = (l: string) => {
      if (!l.startsWith('info') || !l.includes(' pv ')) return;
      const t = l.split(' ');
      const at = (k: string) => t.indexOf(k);
      const depth = Number(t[at('depth') + 1]);
      const mpv = at('multipv') >= 0 ? Number(t[at('multipv') + 1]) : 1;
      const s = at('score');
      const kind = t[s + 1];
      const val = Number(t[s + 2]);
      const line: EngineLine = {
        multipv: mpv,
        depth,
        pv: t.slice(at('pv') + 1),
        ...(kind === 'cp' ? { cp: val * flip } : { mate: val * flip }),
      };
      analysis.lines[mpv - 1] = line;
      analysis.depth = Math.min(...analysis.lines.filter(Boolean).map((x) => x.depth));
      opts.onInfo?.({ ...analysis, lines: analysis.lines.filter(Boolean) });
    };
    this.handlers.add(onLine);
    this.running = true;
    this.send(`position fen ${fen}`);
    const limit = opts.depth ? `depth ${opts.depth}` : opts.movetime ? `movetime ${opts.movetime}` : 'depth 18';
    this.send(`go ${limit}`);
    let best: string;
    try {
      best = await this.waitFor((l) => l.startsWith('bestmove')).catch((e) => {
        if (this.dead) throw e;
        // Too slow for this device: stop the search and take what it found so far.
        this.send('stop');
        return this.waitFor((l) => l.startsWith('bestmove'), 5_000);
      });
    } finally {
      this.running = false;
      this.handlers.delete(onLine);
    }
    const bm = best.split(' ')[1];
    analysis.bestmove = bm && bm !== '(none)' ? bm : undefined;
    analysis.lines = analysis.lines.filter(Boolean);
    return analysis;
  }

  destroy() {
    this.worker.terminate();
  }
}

let analysisEngine: Engine | null = null;
let playEngine: Engine | null = null;

/** Full-strength engine for eval bars and game review. A dead engine is replaced on the next call. */
export function getAnalysisEngine(): Engine {
  if (analysisEngine?.dead) analysisEngine = null;
  return (analysisEngine ??= new Engine());
}

/** Strength-limited engine used as the opponent. A dead engine is replaced on the next call. */
export function getPlayEngine(): Engine {
  if (playEngine?.dead) playEngine = null;
  return (playEngine ??= new Engine());
}

/** Lichess' win-probability model: maps centipawns (White POV) to White's winning chances in [0, 100]. */
export function winPercent(line: Pick<EngineLine, 'cp' | 'mate'> | undefined): number {
  if (!line) return 50;
  if (line.mate !== undefined) return line.mate > 0 ? 100 : line.mate < 0 ? 0 : 50;
  const cp = Math.max(-1000, Math.min(1000, line.cp ?? 0));
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * cp)) - 1);
}

export function formatScore(line: Pick<EngineLine, 'cp' | 'mate'> | undefined): string {
  if (!line) return '…';
  if (line.mate !== undefined) return `#${line.mate}`;
  const v = (line.cp ?? 0) / 100;
  return (v > 0 ? '+' : '') + v.toFixed(1);
}
