export type ExplorerSource = 'masters' | 'lichess' | 'offline' | 'mine';

export interface ExplorerMove {
  uci: string;
  san: string;
  white: number;
  draws: number;
  black: number;
  averageRating?: number;
}

export interface ExplorerGame {
  id: string;
  white: { name: string; rating: number };
  black: { name: string; rating: number };
  winner: 'white' | 'black' | null;
  year?: number;
  month?: string;
  uci?: string;
}

export interface ExplorerData {
  source: ExplorerSource;
  white: number;
  draws: number;
  black: number;
  moves: ExplorerMove[];
  opening?: { eco: string; name: string };
  topGames?: ExplorerGame[];
  /** Human readable note, e.g. "Offline tree ends at ply 12" */
  note?: string;
}

export const total = (m: { white: number; draws: number; black: number }) => m.white + m.draws + m.black;

export const SPEEDS = ['bullet', 'blitz', 'rapid', 'classical', 'correspondence'] as const;
export type Speed = (typeof SPEEDS)[number];
export const RATINGS = [0, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500] as const;
