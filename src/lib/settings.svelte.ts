import type { ExplorerSource, Speed } from './explorer/types.ts';

export interface Settings {
  dark: 'auto' | 'light' | 'dark';
  explorerSource: ExplorerSource;
  ratings: number[];
  speeds: Speed[];
  /** Opponent strength once out of book and database */
  engineElo: number;
  /** Rating band the human-like opponent imitates */
  humanRating: number;
  /** Minimum games in a position for the human-like opponent to trust the database */
  humanMinGames: number;
  showExplorerInPlay: boolean;
  showEvalInPlay: boolean;
  boardTheme: 'theme' | 'brown' | 'blue' | 'green' | 'gray';
  /** Offline explorer rating band id; null = follow humanRating */
  offlineBand: string | null;
  /** How the human-like opponent picks among database moves */
  opponentStyle: 'realistic' | 'surprise' | 'hardest';
  /** Show what players usually play here after you leave your prepared moves */
  coach: boolean;
  /** Library layout */
  libraryView: 'tree' | 'cards';
}

const DEFAULTS: Settings = {
  dark: 'auto',
  explorerSource: 'offline',
  ratings: [1600, 1800, 2000],
  speeds: ['blitz', 'rapid', 'classical'],
  engineElo: 1600,
  humanRating: 1600,
  humanMinGames: 25,
  showExplorerInPlay: true,
  showEvalInPlay: false,
  boardTheme: 'theme',
  offlineBand: null,
  opponentStyle: 'realistic',
  coach: true,
  libraryView: 'tree',
};

const KEY = 'opener:settings';

function load(): Settings {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return { ...DEFAULTS };
}

export const settings: Settings = $state(load());

$effect.root(() => {
  $effect(() => {
    const snapshot = JSON.stringify(settings);
    try {
      localStorage.setItem(KEY, snapshot);
    } catch {
      /* ignore */
    }
  });
});

/** Maps a single rating to the Lichess explorer rating buckets around it. */
export function ratingBands(rating: number): number[] {
  const buckets = [1000, 1200, 1400, 1600, 1800, 2000, 2200, 2500];
  const i = buckets.reduce((best, b, idx) => (Math.abs(b - rating) < Math.abs(buckets[best] - rating) ? idx : best), 0);
  return buckets.slice(Math.max(0, i - 1), i + 1);
}
