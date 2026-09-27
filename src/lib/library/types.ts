export type Side = 'white' | 'black';

export interface LibraryLine {
  /** e.g. "Giuoco Pianissimo, 5.d3" */
  name: string;
  /** SAN moves from the start position, move numbers optional: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5" */
  moves: string;
  /** Optional one-sentence note shown when this line is chosen */
  note?: string;
}

export interface LibraryTrap {
  name: string;
  /** Full SAN move sequence from the start position including the trap */
  moves: string;
  /** Which side falls for it */
  victim: Side;
  explanation: string;
}

export interface PositionNote {
  /** SAN moves from the start reaching the position the note is about */
  moves: string;
  note: string;
}

export interface ModelGame {
  white: string;
  black: string;
  year: number;
  event?: string;
  /** What to learn from it */
  lesson: string;
}

export interface LibraryOpening {
  /** kebab-case, unique */
  id: string;
  name: string;
  /** ECO range or main code, e.g. "C50-C54" */
  eco: string;
  /** The side the learner plays with this opening */
  side: Side;
  /** Grouping: 'e4' (1.e4 openings as White or replies to 1.e4), 'd4', 'flank' */
  group: 'white-e4' | 'white-d4' | 'white-flank' | 'black-e4' | 'black-d4';
  /** 1 = beginner-friendly, 2 = club, 3 = theory-heavy */
  difficulty: 1 | 2 | 3;
  /** The moves defining the opening (used as the main entry point) */
  base: string;
  /** 2-3 sentence overview */
  summary: string;
  /** Plans and ideas for the learner's side (4-7 bullets) */
  ideas: string[];
  /** What the opponent is aiming for (2-4 bullets) */
  opponentIdeas: string[];
  /** Typical pawn structure and what it implies */
  structure: string;
  /** 3-7 concrete lines; the first is the main line. Long enough to reach a real middlegame (typically 8-14 moves each side). */
  lines: LibraryLine[];
  traps: LibraryTrap[];
  /** Notes on specific positions (shown whenever that position appears on the board, also via transposition) */
  positions: PositionNote[];
  modelGames: ModelGame[];
}
