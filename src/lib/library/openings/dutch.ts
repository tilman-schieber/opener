import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'dutch-defense',
  name: 'Dutch Defense',
  eco: 'A80–A99',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 f5',
  summary:
    'Black grabs control of e4 with the f-pawn right away, creating an unbalanced position with kingside attacking chances. You can choose the dynamic Leningrad (...g6), the rock-solid Stonewall (...e6/...d5/...c6) or the flexible Classical (...e6/...d6).',
  ideas: [
    'Control e4: the f5 pawn, the f6-knight and often a knight or bishop on e4 stop White from getting the ideal e2–e4 break.',
    'Leningrad: ...g6, ...Bg7, ...O-O, ...d6 then ...Qe8 and ...e5 (or ...c6 + ...e5). The g7-bishop and the e5 break make it a King\'s Indian with an extra pawn on f5.',
    'Stonewall: ...e6, ...d5, ...c6, ...Bd6 builds a fortress. Plant a knight on e4, and bring the queen to e8–h5 or play ...g5 for a kingside attack.',
    'Solve the Stonewall bishop problem with ...b6 + ...Bb7 (or ...Bd7–e8–h5) — the c8-bishop is the weak piece in that structure.',
    'Classical: ...Be7, ...O-O, ...d6, ...Qe8–g6 or ...Qh5 swings the queen to the kingside; ...e5 frees the game.',
    'Against the Staunton Gambit (2.e4) take the pawn with ...fxe4 and develop fast; giving it back with ...d5 or ...e5 at the right moment is often best.',
  ],
  opponentIdeas: [
    'Break in the centre with e2–e4 to exploit the weakened e6/g6 squares and your loosened king.',
    'Fianchetto with g3/Bg2 so the bishop hits d5 and b7, and pressure the long diagonal.',
    'Against the Stonewall: trade the dark-squared bishops (Bf4 or Ba3) and plant a knight on e5, leaving Black with a bad c8-bishop.',
    'Sharp tries like the Staunton Gambit (2.e4) or 2.Bg5 aim to punish the weakened h5–e8 diagonal early.',
  ],
  structure:
    'The f5 pawn gives Black a grip on e4 but weakens the e6 square and the e8–h5 diagonal. In the Stonewall (f5/e6/d5/c6) Black owns e4 and White owns e5; the minor-piece battle over those squares decides the game. In the Leningrad, the pawns on d6/f5/g6 support the ...e5 break.',
  lines: [
    {
      name: 'Leningrad, 7...Qe8',
      moves:
        '1. d4 f5 2. g3 Nf6 3. Bg2 g6 4. Nf3 Bg7 5. O-O O-O 6. c4 d6 7. Nc3 Qe8 8. d5 a5 9. Nd4 Na6 10. e4 fxe4 11. Nxe4 Nxe4 12. Bxe4 Nc5 13. Bg2',
      note: 'The main Leningrad: ...Qe8 prepares ...e5, and the knight comes to c5 via a6 once White plays d5.',
    },
    {
      name: 'Leningrad, 7...c6',
      moves:
        '1. d4 f5 2. g3 Nf6 3. Bg2 g6 4. Nf3 Bg7 5. O-O O-O 6. c4 d6 7. Nc3 c6 8. d5 e5 9. dxe6 Bxe6 10. Qd3 Na6 11. Nd4 Nc5 12. Qc2 Bf7',
      note: 'A flexible system: ...c6 fights for d5 and prepares ...e5 or ...Qa5.',
    },
    {
      name: 'Stonewall, Modern with ...b6/...Bb7',
      moves:
        '1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 d5 5. O-O Bd6 6. c4 c6 7. b3 Qe7 8. Bb2 b6 9. Ne5 O-O 10. Nd2 Bb7 11. Rc1',
      note: 'Black completes the Stonewall and solves the c8-bishop problem via b7.',
    },
    {
      name: 'Stonewall vs 7.Bf4',
      moves:
        '1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 d5 5. O-O Bd6 6. c4 c6 7. Bf4 Bxf4 8. gxf4 O-O 9. e3 Nbd7 10. Nbd2 Ne4 11. Qc2 Qe7',
      note: 'White trades the dark-squared bishops; Black answers with a strong knight on e4.',
    },
    {
      name: 'Classical Dutch (Ilyin-Zhenevsky)',
      moves:
        '1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 Be7 5. O-O O-O 6. c4 d6 7. Nc3 Qe8 8. Re1 Qg6 9. e4 fxe4 10. Nxe4 Nxe4 11. Rxe4 Nc6',
      note: 'The queen swings to g6, and after White\'s e4 break Black fights for e5 with pieces.',
    },
    {
      name: 'Staunton Gambit 2.e4',
      moves:
        '1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5 Nc6 5. d5 Ne5 6. Qd4 Nf7 7. Bxf6 exf6 8. Nxe4 f5 9. Nc3 Bd6',
      note: 'Black accepts the gambit and returns the extra pawn later for smooth development and the bishop pair.',
    },
  ],
  traps: [
    {
      name: 'Rook lift mate (2.Bg5 h6 3.Bh4 g5)',
      moves: '1. d4 f5 2. Bg5 h6 3. Bh4 g5 4. Bg3 f4 5. e3 h5 6. Bd3 Rh6 7. Qxh5+ Rxh5 8. Bg6#',
      victim: 'black',
      explanation:
        'Chasing the bishop with ...g5, ...f4 and ...h5 opens the e8–h5 diagonal. 6...Rh6?? allows a queen sacrifice and Bg6 mate. Against 2.Bg5, calm moves like 2...Nf6 or 2...g6 are safer.',
    },
  ],
  positions: [
    { moves: '1. d4 f5', note: 'The Dutch: Black controls e4 immediately. Choose your setup: ...g6 (Leningrad), ...e6 + ...d5 (Stonewall) or ...e6 + ...d6 (Classical).' },
    { moves: '1. d4 f5 2. g3 Nf6 3. Bg2 g6', note: 'Leningrad: fianchetto, castle, ...d6, then prepare ...e5 with ...Qe8, ...c6 or ...Nc6.' },
    { moves: '1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nf3 d5', note: 'Stonewall: pawns on f5/e6/d5 (then ...c6). Put the bishop on d6, the knight on e4, and remember White wants to trade dark-squared bishops.' },
    { moves: '1. d4 f5 2. g3 Nf6 3. Bg2 g6 4. Nf3 Bg7 5. O-O O-O 6. c4 d6 7. Nc3', note: 'Key Leningrad moment: 7...Qe8 prepares ...e5; 7...c6 is a flexible alternative. After d5 the knight heads to c5 via a6.' },
    { moves: '1. d4 f5 2. e4', note: 'The Staunton Gambit. Take with ...fxe4 and develop with ...Nf6; do not rush to defend the extra pawn at all costs.' },
    { moves: '1. d4 f5 2. Bg5', note: 'An annoying anti-Dutch. Solid answers: 2...g6 (planning ...Bg7) or 2...Nf6. Avoid overextending with ...h6 and ...g5.' },
  ],
  modelGames: [],
};

export default opening;
