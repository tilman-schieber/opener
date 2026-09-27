import { INITIAL_FEN, playUci, playSans, turnOf, type Ply } from './chess/moves.ts';

/** A linear move history with a cursor, shared by explore, repertoire editing and review. */
export class BoardState {
  startFen = $state(INITIAL_FEN);
  plies = $state<Ply[]>([]);
  /** Number of plies applied; 0 = start position */
  cursor = $state(0);

  fen = $derived(this.cursor === 0 ? this.startFen : this.plies[this.cursor - 1].fen);
  turn = $derived(turnOf(this.fen));
  lastMove = $derived(this.cursor ? this.plies[this.cursor - 1] : undefined);
  /** Positions after each applied move (excluding start) */
  fens = $derived(this.plies.slice(0, this.cursor).map((p) => p.fen));
  ucis = $derived(this.plies.slice(0, this.cursor).map((p) => p.uci));
  sans = $derived(this.plies.slice(0, this.cursor).map((p) => p.san));

  /** Plays a move at the cursor. Keeps the future if it is the same move, otherwise truncates it. */
  play(uci: string): Ply | undefined {
    const next = this.plies[this.cursor];
    if (next && next.uci === uci) {
      this.cursor++;
      return next;
    }
    const p = playUci(this.fen, uci);
    if (!p) return undefined;
    this.plies = [...this.plies.slice(0, this.cursor), p];
    this.cursor++;
    return p;
  }

  load(sans: string[], cursor = sans.length) {
    this.startFen = INITIAL_FEN;
    this.plies = playSans(sans);
    this.cursor = Math.min(cursor, this.plies.length);
  }

  loadPlies(plies: Ply[], cursor = plies.length) {
    this.startFen = INITIAL_FEN;
    this.plies = plies;
    this.cursor = Math.min(cursor, plies.length);
  }

  goto(i: number) {
    this.cursor = Math.max(0, Math.min(this.plies.length, i));
  }
  back() {
    this.goto(this.cursor - 1);
  }
  forward() {
    this.goto(this.cursor + 1);
  }
  reset() {
    this.plies = [];
    this.cursor = 0;
  }
}
