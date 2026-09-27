import type { Side } from '../library/types.ts';

/** How the opponent chose a move */
export type MovePhase = 'book' | 'human' | 'engine' | 'player';

export interface PlayedMove {
  san: string;
  uci: string;
  fen: string;
  phase: MovePhase;
  /** For human-like moves: how many games the database had in that position */
  games?: number;
}

export interface PlayedGame {
  id: string;
  date: number;
  repertoireId: string;
  repertoireName: string;
  lineName?: string;
  color: Side;
  moves: PlayedMove[];
  result: '1-0' | '0-1' | '1/2-1/2' | '*';
  reason?: string;
  /** Ply index (0-based) of the player's first move outside the repertoire, if any */
  leftBookPly?: number;
  /** Expected repertoire moves (SAN) at leftBookPly */
  expected?: string[];
  engineElo: number;
  humanRating: number;
  /** Cached engine review */
  review?: import('../review/types.ts').ReviewData;
}
