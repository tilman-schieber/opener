# Opener: a chess opening trainer you play

Opener is a client-side web app for learning chess openings by **playing them**, not by flashcards.

- **Play:** a human-like opponent follows the line you chose exactly. When the line ends, it answers with the moves
  real players at your rating choose, weighted by the opening explorer. Once the game leaves the database, Stockfish
  takes over at a strength you pick. If you leave your repertoire, a marker shows the expected move with its stats,
  and the game goes on.
- **Explore:** a clickable opening explorer showing games, score and win/draw/loss bars. Sources are the bundled offline
  tree, the live Lichess and Masters databases (after "Log in with Lichess"), and your own games.
- **Key ideas:** curated plans, opponent plans, pawn structures, traps and position notes for 26 openings. They are
  matched by position, so they also appear after transpositions.
- **Drill:** play your side of a line from memory. Lines you miss come back more often. There is no strict
  spaced-repetition schedule.
- **Review:** after a game, Stockfish shows an eval graph, your mistakes and blunders, where you left the book, and
  one click adds your move to your repertoire.
- **Repertoires:** build lines by playing moves on the board, copy library openings, or import PGN or a Lichess
  study (variations and comments are kept). You can export back to PGN.
- **My games:** import your Lichess or Chess.com games, or a PGN file, and browse an openingtree-style tree of how you
  actually play and score.

Everything runs in the browser. Data lives in IndexedDB and localStorage, and there is no backend.

## Run

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm test           # library validation (every move sequence legal, lines start at the base)
```

## Data sources

| What | Source | Notes |
|---|---|---|
| Live explorer | `explorer.lichess.ovh` (`/lichess`, `/masters`) | **Requires a Lichess token since 2025.** The app uses OAuth PKCE ("Log in with Lichess"), which works without a backend or client secret. The token stays in localStorage and is sent only to lichess.org. Requests are serialized and back off 60 s after a 429. |
| Offline explorer | Lichess monthly DB dump → `public/tree/*.json` | Built by `npm run build-tree` (see below). Works without login. |
| Opening names | [lichess-org/chess-openings](https://github.com/lichess-org/chess-openings) (CC0) → `public/openings.json` | `node scripts/build-openings.ts` |
| Your games | `lichess.org/api/games/user`, `api.chess.com/pub/player/*/games` | Public APIs, no login |
| Studies | `lichess.org/api/study/<id>.pgn` | Private studies need login |
| Engine | [stockfish.js](https://github.com/nmrugg/stockfish.js) 19 lite (WASM, GPLv3) | Multi-threaded when the page is cross-origin isolated |

### Building the offline tree

```sh
npm run build-tree -- --games 5000000 --plies 12 --min 40 --lo 1600 --hi 2200 --month 2026-08
```

This streams the dump (`curl | zstd -dc`, so nothing is stored on disk) and keeps rated blitz, rapid and classical
games whose average rating falls within the range. It counts every (position, move) pair in the first `--plies`
half-moves across worker threads and writes 256 JSON shards keyed by a position hash, loaded lazily by the app. Five
million games take about 45 minutes, limited by download speed.

### Checking the curated library

```sh
npm test                                   # legality + structure
node scripts/check-library.ts --depth 14   # Stockfish flags moves in lines that lose ≥120cp (review list)
```

## Deploying

Opener is a static site: deploy `dist/`. For the multi-threaded engine, serve with

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

`public/_headers` does this on Netlify and Cloudflare Pages. On GitHub Pages the app falls back to the single-threaded
engine automatically.

## Design

"Scoresheet": ruled paper, ink and ballpoint blue, with Newsreader for opening names, IBM Plex for the UI and
notation, and no emoji. Every move mentioned in ideas and notes can be hovered to preview the position. See
[docs/design-briefs.md](docs/design-briefs.md).

## Code map

```
src/lib/chess/        move helpers (chessops), transposition-safe position keys, notation-in-prose parser
src/lib/explorer/     lichess + offline + my-games sources, cache, opening names
src/lib/auth/         Lichess OAuth PKCE
src/lib/engine/       Stockfish UCI wrapper, win% model
src/lib/play/         opponent: line → repertoire → human-like (explorer-weighted) → engine
src/lib/drill/        weakness-weighted line selection and stats
src/lib/review/       game analysis and move judgements (Lichess thresholds)
src/lib/repertoire/   repertoire tree model, IndexedDB store, PGN/study import
src/lib/library/      curated openings (one file each in openings/) + ideas index
src/lib/mygames/      game import + personal opening tree
src/pages/            Library, OpeningDetail, Explore, Play, Drill, Repertoires, RepertoireEdit, History, Review, MyGames, Settings
scripts/              build-tree, build-openings, check-library, copy-engine
```
