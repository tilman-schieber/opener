export type Judgement = 'inaccuracy' | 'mistake' | 'blunder';

export interface PlyReview {
  /** Eval after this ply (White POV) */
  cp?: number;
  mate?: number;
  /** Engine best move in the position before this ply (UCI) */
  best?: string;
  bestSan?: string;
  judgement?: Judgement;
  /** Winning-chance drop for the mover, in percentage points */
  loss: number;
}

export interface ReviewData {
  depth: number;
  /** Eval of the start position */
  start: { cp?: number; mate?: number };
  plies: PlyReview[];
}
