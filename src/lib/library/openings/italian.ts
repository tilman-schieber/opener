import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'italian-game',
  name: 'Italian Game',
  eco: 'C50–C54',
  side: 'white',
  group: 'white-e4',
  difficulty: 1,
  base: '1. e4 e5 2. Nf3 Nc6 3. Bc4',
  summary:
    'White develops quickly and points the bishop at f7, the weakest square in Black\'s camp. Modern practice favours the slow c3 + d3 setup (Giuoco Pianissimo), a maneuvering battle where White gradually prepares d4 or a kingside attack.',
  ideas: [
    'Build the "slow Italian": c3, d3, O-O, Re1, then a4 to gain queenside space and give the bishop a retreat on a2.',
    'Reroute the queen\'s knight via Nbd2–f1–g3 (or e3) toward the kingside and the f5 square.',
    'Keep d4 in reserve: once your pieces are ready, break with d3–d4 to open the centre when Black is least prepared.',
    'Pressure f7: Ng5 ideas become strong whenever Black castles and the h7/f7 pair is under-defended.',
    'The bishop often retreats Bb3–c2 to stay on the long diagonal toward the enemy king.',
    'Play h3 before Nbd2–f1 to stop ...Bg4 and ...Ng4 annoying your kingside.',
  ],
  opponentIdeas: [
    'Mirror your setup with ...d6, ...a6, ...Ba7 and ...h6, keeping the bishop on the a7–g1 diagonal against f2.',
    'Break with ...d5 when White is slow; in the Two Knights, counterattack e4 with ...Nf6.',
    'Trade the light-squared bishops with ...Be6 to blunt White\'s pressure on f7.',
  ],
  structure:
    'Usually symmetrical e4/e5 pawns with White\'s c3/d3 versus Black\'s d6. The centre is closed-ish, so piece maneuvering matters more than concrete theory; the d4 break (for White) and ...d5 break (for Black) decide when the position opens.',
  lines: [
    {
      name: 'Giuoco Pianissimo (5.d3)',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 d6 6. O-O a6 7. a4 O-O 8. Re1 Ba7 9. h3 h6 10. Nbd2 Re8 11. Nf1 Be6 12. Bxe6 Rxe6 13. Ng3',
      note: 'The modern main line: slow build-up with a4, h3 and the Nd2–f1–g3 maneuver.',
    },
    {
      name: 'Giuoco Piano, 5.d4 centre',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Bxd2+ 8. Nbxd2 d5 9. exd5 Nxd5 10. Qb3 Nce7 11. O-O O-O 12. Rfe1 c6',
      note: 'The classical approach: grab the centre immediately. White gets an isolated d-pawn with active pieces.',
    },
    {
      name: 'Evans Gambit',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 d6 7. Qb3 Qd7 8. dxe5 Bb6 9. Nbd2 Na5 10. Qc2 Nxc4 11. Nxc4',
      note: 'A pawn sacrifice for rapid development and a big centre — a favourite of Kasparov.',
    },
    {
      name: 'Two Knights, quiet 4.d3',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3 Be7 5. O-O O-O 6. Re1 d6 7. c3 Na5 8. Bb5 a6 9. Ba4 b5 10. Bc2 c5 11. Nbd2 Re8',
      note: 'Against 3...Nf6 the calm 4.d3 transposes to Ruy-Lopez-like structures.',
    },
    {
      name: 'Two Knights, 4.Ng5 main line',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6 9. Nf3 e4 10. Ne5 Bd6 11. d4 exd3 12. Nxd3 Qc7',
      note: 'White wins a pawn; Black gets development and activity as compensation.',
    },
  ],
  traps: [
    {
      name: 'Fried Liver Attack',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3',
      victim: 'black',
      explanation: '5...Nxd5? lets White sacrifice on f7 and drag the king into the centre. Black must play 5...Na5 instead.',
    },
    {
      name: 'Blackburne Shilling Gambit',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nd4 4. Nxe5 Qg5 5. Nxf7 Qxg2 6. Rf1 Qxe4+ 7. Be2 Nf3#',
      victim: 'white',
      explanation: 'After 3...Nd4 do not grab e5! Simply 4.Nxd4 exd4 5.O-O or 4.c3 leaves White better.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4', note: 'The bishop targets f7 — defended only by the king. Black chooses between 3...Bc5 (Giuoco Piano) and 3...Nf6 (Two Knights).' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3', note: 'c3 prepares d4 and gives the bishop a retreat on c2 later. Watch out: the e4 pawn is now less protected, so ...Nf6 hits it.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3', note: 'The Pianissimo: no rush. Typical plan: O-O, Re1, a4, h3, Nbd2–f1–g3, then d4 when ready.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6', note: 'Two Knights Defense: Black counterattacks e4. 4.Ng5 wins a pawn but Black gets activity; 4.d3 is calm and modern.' },
    { moves: '1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d3 d6 6. O-O a6 7. a4', note: 'a4 gains space and prevents ...b5 hitting your bishop. Retreat the bishop to a2 if attacked.' },
  ],
  modelGames: [
    { white: 'Garry Kasparov', black: 'Viswanathan Anand', year: 1995, event: 'Riga (Tal Memorial)', lesson: 'Evans Gambit: rapid development and a crushing kingside attack against a top defender.' },
  ],
};

export default opening;
