import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'modern-benoni',
  name: 'Modern Benoni',
  eco: 'A60–A79',
  side: 'black',
  group: 'black-d4',
  difficulty: 3,
  base: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6',
  summary:
    'An ambitious, unbalanced defense: Black gives White a central pawn majority in return for a queenside majority, the half-open e-file and a monster bishop on g7. Black plays for ...b5 on the queenside, pressure on e4, and tactics — but must know the sharp f4 lines.',
  ideas: [
    'Standard setup: ...g6, ...Bg7, ...O-O, ...Re8 (pressure on e4), ...Na6–c7 or ...Nbd7–e5.',
    'The main plan is queenside expansion: ...a6, ...Rb8 and ...b5, using your 3-vs-2 majority.',
    'Keep an eye on e4: ...Re8 plus ...Nbd7–e5 or ...Nh5 pressure and sometimes a ...Nxe4 tactic when the e-pawn is loose.',
    'The g7-bishop is your best piece — don\'t trade it lightly; it supports ...b5 and hits b2 and c3.',
    'Knights belong on e5 (a great outpost) and c7 (supporting ...b5); against f3 setups, ...Nh5 and ...f5 hit the centre.',
    'In the Fianchetto Variation, White has no e4 weakness; play ...a6, ...Rb8, ...b5 and use ...Ne5–c4 or ...Nh5–f5 ideas.',
    'Against the sharp f4 lines, know the move orders: after 8.Bb5+ only 8...Nfd7 is safe (8...Nbd7? runs into e5).',
  ],
  opponentIdeas: [
    'Use the central majority: prepare and play e4–e5, opening lines toward your king.',
    'Restrict ...b5 with a4, then put a knight on c4 to hit d6 and b6.',
    'The aggressive f4 systems (Four Pawns, Taimanov/Flick-Knife 8.Bb5+) aim for an early e5 breakthrough.',
    'Exploit the weak d6 pawn and the c4/e4 squares in slow positions.',
  ],
  structure:
    'White has pawns on d5 and e4 (a central majority); Black has c5 and d6 (a queenside majority). The e-file is half-open for Black; the c-file is half-open for White. Black wants ...b5; White wants e4–e5. The d6 pawn is a permanent target, and the e5 square is Black\'s best outpost.',
  lines: [
    {
      name: 'Classical 7.Nf3 + 9.O-O',
      moves:
        '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O Re8 10. Nd2 Na6 11. f3 Nc7 12. a4 b6 13. Nc4 Ba6',
      note: 'The main classical position: White supports e4 with f3 and Nd2–c4; Black trades light-squared bishops with ...Ba6.',
    },
    {
      name: 'Modern 8.h3 + 9.Bd3, 9...b5!',
      moves:
        '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. h3 O-O 9. Bd3 b5 10. Nxb5 Re8 11. O-O Nxe4 12. Re1 a6',
      note: 'h3 stops ...Bg4, so Black strikes with the ...b5 pawn sacrifice: the e4 pawn falls and the long diagonal opens. (10.Bxb5? Nxe4 11.Nxe4 Qa5+ regains the piece.)',
    },
    {
      name: 'Fianchetto Variation',
      moves:
        '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3 Bg7 8. Bg2 O-O 9. O-O a6 10. a4 Nbd7 11. Nd2 Re8 12. h3 Rb8 13. Nc4 Ne5 14. Na3 Nh5',
      note: 'White\'s king is safe, so Black maneuvers: ...Ne5 and ...Nh5 eye f4 and support ...f5 or ...b5.',
    },
    {
      name: 'Taimanov / Flick-Knife 8.Bb5+',
      moves:
        '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Bb5+ Nfd7 9. a4 O-O 10. Nf3 Na6 11. O-O Nc7 12. Bd3',
      note: 'The most dangerous line. 8...Nfd7 is essential; Black regroups with ...Na6–c7 and fights for e5.',
    },
    {
      name: 'Four Pawns Attack 8.Nf3',
      moves:
        '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Nf3 O-O 9. Be2 Re8 10. e5 dxe5 11. fxe5 Ng4 12. Bg5 Qb6 13. O-O Nxe5 14. Nxe5 Bxe5',
      note: 'White breaks with e5 immediately; Black wins the pawn back with ...Ng4 and ...Qb6 and gets active pieces.',
    },
  ],
  traps: [
    {
      name: 'Taimanov: the wrong knight',
      moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Bb5+ Nbd7 9. e5 dxe5 10. fxe5 Nh5 11. e6',
      victim: 'black',
      explanation:
        'After 8.Bb5+ the natural 8...Nbd7? is a mistake: 9.e5! hits the f6-knight, and after ...dxe5 fxe5 the pawn charges to e6, wrecking Black\'s position. Block with 8...Nfd7 instead.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6', note: 'The Benoni structure: your queenside majority (a/b/c) vs White\'s central majority (d/e). Next: ...g6, ...Bg7, ...O-O and ...Re8.' },
    { moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4', note: 'Danger: White threatens e5. Continue ...Bg7; after 8.Bb5+ block with the f6-knight (8...Nfd7).' },
    { moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O', note: 'Classical main line. ...Re8 hits e4; then ...Na6–c7 or ...Nbd7 with ...a6 and ...b5.' },
    { moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3', note: 'Fianchetto: calm and positional. Aim for ...a6, ...Nbd7, ...Re8, ...Rb8 and ...b5.' },
    { moves: '1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. h3', note: 'h3 prepares Bd3 without allowing ...Bg4. Castle, and after 9.Bd3 hit back with 9...b5!: taking the pawn lets Black win e4 with ...Nxe4.' },
  ],
  modelGames: [],
};

export default opening;
