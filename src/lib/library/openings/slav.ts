import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'slav-defense',
  name: 'Slav Defense',
  eco: 'D10–D19',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 d5 2. c4 c6',
  summary:
    "Black supports d5 with the c-pawn instead of the e-pawn, so the c8-bishop can still come out to f5 or g4 before ...e6. The result is a solid but active setup: Black gets the 'good' version of the Queen's Gambit Declined structure and often grabs the c4 pawn at the right moment.",
  ideas: [
    'Develop the light-squared bishop outside the pawn chain first (...Bf5 or ...Bg4), and only then play ...e6 — that is the whole point of the Slav.',
    'In the main line, take on c4 (...dxc4) after Nc3 and Nf3, then answer 5.a4 with ...Bf5: White spends time regaining the pawn while you develop.',
    'Classical setup after ...dxc4: ...Bf5, ...e6, ...Bb4, ...Nbd7, ...O-O. The pin on c3 slows White\'s e4 break.',
    'When White plays e4 in the main line, retreat the bishop to g6 (and later h5 to pin Nf3) rather than letting it be hit with gain of tempo.',
    'Free the position with ...c5 or ...e5 once developed; in the Exchange Slav, ...Nc6 and ...Bf5 mirror White and ...Rc8 contests the c-file.',
    'In the Chebanenko (4...a6), ...b5 gains queenside space and prepares ...Bg4 or ...Bf5 with a flexible, slightly more ambitious game.',
  ],
  opponentIdeas: [
    'Regain the c4 pawn with a4 and e3/Bxc4 (or Ne5xc4), preventing ...b5 from holding it.',
    'Build a big centre with e4, gaining space and hitting your f5-bishop.',
    'Quiet 4.e3 lines: shut in nothing, but chase the f5-bishop with Nh4 or hit b7 with Qb3.',
    'The Exchange Slav (cxd5 cxd5) aims for a symmetrical, drawish position where White keeps a small initiative on the c-file.',
  ],
  structure:
    'Pawns on c6 and d5 give a solid wall with the c8-bishop free to develop. After ...dxc4 and ...e6 you often get a QGD-like structure with White\'s pawns on d4/e3 or d4/e4. The Exchange Slav produces a symmetrical structure where the open c-file is the main battleground.',
  lines: [
    {
      name: 'Main line: 4...dxc4 5.a4 Bf5 6.e3',
      moves:
        '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O Nbd7 9. Qe2 Bg6 10. e4 O-O 11. Bd3 Bh5 12. e5 Nd5 13. Nxd5 cxd5 14. Qe3',
      note: 'The classical Slav main line: White gets space with e4–e5, Black gets a solid d5 outpost and the pin on f3.',
    },
    {
      name: 'Main line: 6.Ne5 e6 7.f3',
      moves:
        '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. Ne5 e6 7. f3 c5 8. e4 Bg6 9. Be3 cxd4 10. Qxd4 Qxd4 11. Bxd4 Nfd7 12. Nxd7 Nxd7 13. Bxc4',
      note: 'White builds a big centre with f3 and e4; Black hits back with ...c5 and heads for a balanced endgame.',
    },
    {
      name: '4.e3 Bf5 with Nh4',
      moves:
        '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. Nc3 e6 6. Nh4 Bg6 7. Nxg6 hxg6 8. Bd3 Nbd7 9. O-O Bd6 10. h3 dxc4 11. Bxc4 O-O',
      note: 'White wins the bishop pair, but the half-open h-file and a solid structure fully compensate Black.',
    },
    {
      name: 'Exchange Slav',
      moves:
        '1. d4 d5 2. c4 c6 3. cxd5 cxd5 4. Nc3 Nf6 5. Bf4 Nc6 6. e3 Bf5 7. Nf3 e6 8. Bb5 Nd7 9. O-O Be7 10. Rc1 O-O 11. Qe2 Rc8',
      note: 'Symmetrical and solid: develop everything, contest the c-file and the position is equal.',
    },
    {
      name: 'Chebanenko 4...a6',
      moves:
        '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 a6 5. e3 b5 6. b3 Bg4 7. Be2 Nbd7 8. O-O e6 9. h3 Bh5 10. Bb2 Bd6 11. Nd2 Bxe2 12. Qxe2 O-O',
      note: 'A flexible modern system: ...a6 and ...b5 gain queenside space before the bishop comes out.',
    },
  ],
  traps: [
    {
      name: 'Holding the gambit pawn with ...b5',
      moves: '1. d4 d5 2. c4 c6 3. e3 dxc4 4. a4 b5 5. axb5 cxb5 6. Qf3',
      victim: 'black',
      explanation:
        'Trying to keep the c4 pawn with ...b5 opens the long diagonal: Qf3 attacks the a8-rook and ...Nc6 is met by Qxc6+. Only take on c4 when White cannot win it back cheaply, and never cling to it with ...b5 after a4.',
    },
  ],
  positions: [
    { moves: '1. d4 d5 2. c4 c6', note: 'The Slav: d5 is protected without blocking the c8-bishop. Plan ...Nf6, ...Bf5 (or ...dxc4 first), then ...e6.' },
    { moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4', note: 'Now White must spend time to win back c4. 5.a4 stops ...b5; 5.e3 allows 5...b5 holding the pawn.' },
    { moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5', note: 'The bishop is out before ...e6. Next comes ...e6, ...Bb4 and ...Nbd7 — a harmonious setup.' },
    { moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5', note: 'Against the quiet 4.e3, get the bishop out immediately. Watch out for Qb3 hitting b7 and Nh4 chasing the bishop.' },
    { moves: '1. d4 d5 2. c4 c6 3. cxd5 cxd5', note: 'Exchange Slav: symmetrical. Develop with ...Nf6, ...Nc6, ...Bf5, ...e6 and be the first to use the c-file.' },
    { moves: '1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 a6', note: 'The Chebanenko: a useful waiting move preparing ...b5. If White plays c5, aim for ...Bf5 and ...e5 or ...b6.' },
  ],
  modelGames: [],
};

export default opening;
