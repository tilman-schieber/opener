export interface ImportedGame {
  /** source:id */
  id: string;
  /** "lichess:name" | "chesscom:name" | "pgn:label" */
  account: string;
  color: 'white' | 'black';
  /** Result from the player's perspective */
  result: 'win' | 'draw' | 'loss';
  /** Standard UCI moves, first 40 plies at most */
  moves: string[];
  date: number;
  opponent: string;
  opponentRating?: number;
  speed?: string;
  url?: string;
}
