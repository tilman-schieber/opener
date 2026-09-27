import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'english-opening',
  name: 'English Opening',
  eco: 'A10–A39',
  side: 'white',
  group: 'white-flank',
  difficulty: 2,
  base: '1. c4',
  summary:
    'White controls d5 from the flank instead of occupying the centre. With Nc3, g3 and Bg2 White gets a Sicilian with an extra tempo against 1...e5, and flexible positional play against everything else.',
  ideas: [
    'Standard set-up: Nc3, g3, Bg2 — the bishop on the long diagonal and the knight on c3 both fight for d5.',
    'Against 1...e5 think "reversed Sicilian": play for the queenside with Rb1, a3 and b4–b5 to kick the c6 knight.',
    'Use the long diagonal: after ...d5 and cxd5 Nxd5, the Bg2 and Nc3 pressure the d5 knight and the b7 pawn.',
    'In the closed lines (…g6/…Bg7), develop the king\'s knight to e2 (not f3) so the f-pawn can go to f4, or keep d3/e3 and expand with b4.',
    'In the Symmetrical English, break with d2–d4 at the right moment to open the centre when you are better developed.',
    'Against Black\'s ...f5 plans, keep the long diagonal open and use e3/Nge2 to meet ...f4 pushes.',
  ],
  opponentIdeas: [
    'Seize the centre with ...e5 and ...d5 before White completes the fianchetto.',
    'Copy White\'s set-up (Symmetrical English) and fight for the d4 square.',
    'In reversed-Sicilian structures, attack on the kingside with ...f5–f4, like a reversed Closed Sicilian.',
    'Transpose into d4 openings (…Nf6, …e6, …d5) to steer into familiar territory.',
  ],
  structure:
    'Flexible: often c4 + g3 + d3 against a black e5 pawn (a reversed Sicilian), or symmetrical c4/c5 structures. White controls d5 and the light squares; the b4 push on the queenside is the main pawn lever, d4 the main central break.',
  lines: [
    {
      name: 'Reversed Dragon (1...e5 2.Nc3 Nf6 3.g3 d5)',
      moves: '1. c4 e5 2. Nc3 Nf6 3. g3 d5 4. cxd5 Nxd5 5. Bg2 Nb6 6. Nf3 Nc6 7. O-O Be7 8. a3 O-O 9. b4 Be6 10. Rb1 f6 11. d3 Qd7 12. Ne4',
      note: 'A Sicilian Dragon with colours reversed and an extra tempo: White attacks on the queenside with b4–b5.',
    },
    {
      name: 'Closed English (1...e5 2.Nc3 Nc6 3.g3 g6)',
      moves: '1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. Rb1 a5 7. a3 Nge7 8. b4 axb4 9. axb4 O-O 10. b5 Nd4 11. e3 Ne6 12. Nge2',
      note: 'Mirror-image of the Closed Sicilian: White expands on the queenside with b4–b5.',
    },
    {
      name: 'Four Knights English (4...Bb4)',
      moves: '1. c4 e5 2. Nc3 Nf6 3. Nf3 Nc6 4. g3 Bb4 5. Bg2 O-O 6. O-O e4 7. Ng5 Bxc3 8. bxc3 Re8 9. f3 e3 10. d3 d5 11. Qb3 Na5 12. Qa3 c6 13. cxd5 cxd5 14. f4',
      note: 'The main line: Black sacrifices a pawn on e3 to cramp White; White keeps the bishop pair and aims at the queenside.',
    },
    {
      name: 'Symmetrical English (1...c5)',
      moves: '1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O 7. d4 cxd4 8. Nxd4 Nxd4 9. Qxd4 d6 10. Qd3 a6 11. Bd2 Rb8 12. Rac1 b5 13. cxb5 axb5 14. b4',
      note: 'White opens the centre with d4 and uses the lead in development against Black\'s queenside.',
    },
    {
      name: 'Vs 1...Nf6: Botvinnik set-up against ...g6',
      moves: '1. c4 Nf6 2. Nc3 g6 3. g3 Bg7 4. Bg2 O-O 5. e4 d6 6. Nge2 e5 7. O-O c6 8. d3 a6 9. a4 Nbd7 10. h3',
      note: 'Against a King\'s Indian set-up, the c4/e4 "Botvinnik" bind controls d5 and keeps f2–f4 available.',
    },
  ],
  traps: [
    {
      name: 'Loose knight on d5',
      moves: '1. c4 e5 2. Nc3 Nf6 3. g3 d5 4. cxd5 Nxd5 5. Bg2 Nc6 6. Nxd5',
      victim: 'black',
      explanation: 'After 4...Nxd5 5.Bg2 the d5 knight is attacked twice (Nc3, Bg2) and guarded only by the queen. 5...Nc6? leaves it hanging: 6.Nxd5 and ...Qxd5 is met by Bxd5. Black must play 5...Nb6, 5...Nxc3 or 5...Be6.',
    },
  ],
  positions: [
    { moves: '1. c4', note: 'The English: control d5 from the side. Next Nc3, g3 and Bg2 against almost everything.' },
    { moves: '1. c4 e5', note: 'A reversed Sicilian. Play 2.Nc3 and 3.g3; your extra tempo matters in the Sicilian structures that arise.' },
    { moves: '1. c4 e5 2. Nc3 Nf6 3. g3 d5 4. cxd5 Nxd5 5. Bg2', note: 'The bishop and knight both hit d5. Black usually retreats ...Nb6; then Nf3, O-O, a3 and b4.' },
    { moves: '1. c4 c5', note: 'Symmetrical English. Develop Nc3, g3, Bg2, Nf3, O-O, then time the d4 break.' },
    { moves: '1. c4 Nf6', note: 'Flexible: 2.Nc3 keeps English options; after ...e6 and ...d5 you can transpose to a Queen\'s Gambit with d4, or keep it English with g3.' },
  ],
  modelGames: [],
};

export default opening;
