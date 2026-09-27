import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'nimzo-indian-defense',
  name: 'Nimzo-Indian Defense',
  eco: 'E20–E59',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4',
  summary:
    "Black pins the c3-knight to stop White's e4 and is often happy to give up the bishop pair to double White's c-pawns. One of the most respected defenses to 1.d4: flexible, strategically rich and played by nearly every world champion.",
  ideas: [
    'Fight for e4: the pin on c3 plus ...Ne4, ...b6/...Bb7 or ...d5 keep White from building the ideal e4 centre.',
    'Trade ...Bxc3 when it doubles White\'s pawns, then blockade them: ...c5, ...d6, ...e5 and knights on c6/e5 target the weak c4 pawn (...Na5, ...Ba6, ...Rc8).',
    'Close the centre when you have knights against bishops — locked pawns (e5/d6 vs d5/e4) make knights stronger than White\'s bishop pair.',
    'In the Rubinstein (4.e3), develop quickly with ...O-O, ...d5, ...c5, ...Nc6; after ...dxc4 Bxc4, the ...e5 break frees your game.',
    'Against 4.Qc2, take the bishop pair question head-on: ...O-O, ...Bxc3 when asked by a3, then ...b6/...Bb7 and ...d5 for quick development.',
    'Keep the c8-bishop active via ...b6 + ...Bb7 or ...Ba6 (hitting c4), especially after White plays a3 and bxc3.',
  ],
  opponentIdeas: [
    'Win the bishop pair (a3 or Qc2 to recapture without doubled pawns) and open the position for the two bishops.',
    'Build a big centre with f3 and e4 (Sämisch and 4.f3 lines), then attack on the kingside with f4–f5.',
    'In the Rubinstein, develop with Bd3, Nf3/Ne2 and O-O, then play for e4 or for pressure against an isolated pawn.',
    'Pin your f6-knight with Bg5 (4.Nf3 lines) to fight for e4 and d5.',
  ],
  structure:
    'Structures vary widely. The signature one follows ...Bxc3 bxc3: White has doubled c-pawns and the bishop pair, Black has the better structure and targets c4. Closed centres (d5/e4 vs d6/e5) favour Black\'s knights, open ones favour White\'s bishops.',
  lines: [
    {
      name: 'Rubinstein 4.e3, main line',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. Nf3 c5 7. O-O Nc6 8. a3 Bxc3 9. bxc3 dxc4 10. Bxc4 Qc7 11. Bd3 e5 12. Qc2 Re8 13. dxe5 Nxe5 14. Nxe5 Qxe5',
      note: 'The main line of the Rubinstein: Black gives up the bishop pair and frees his game with ...e5.',
    },
    {
      name: 'Hübner Variation (4.e3 c5)',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5 5. Bd3 Nc6 6. Nf3 Bxc3+ 7. bxc3 d6 8. e4 e5 9. d5 Ne7 10. Nh4 h6 11. f4 Ng6',
      note: 'Black doubles the c-pawns at once and closes the centre, where knights beat bishops.',
    },
    {
      name: 'Classical 4.Qc2',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 O-O 5. a3 Bxc3+ 6. Qxc3 b6 7. Bg5 Bb7 8. f3 h6 9. Bh4 d5 10. e3 Nbd7 11. cxd5 Nxd5 12. Bxd8 Nxc3 13. Bh4 Nd5 14. Bf2',
      note: 'White keeps a healthy structure and the bishop pair; Black trades queens via a neat tactic and has quick development.',
    },
    {
      name: 'Sämisch 4.a3',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. e3 Nc6 7. Bd3 O-O 8. Ne2 b6 9. e4 Ne8 10. O-O Ba6 11. f4 f5',
      note: 'Capablanca\'s ...Ne8 idea: sidestep e5 pins and meet f4 with ...f5, while ...Ba6 and ...Na5 hit c4.',
    },
    {
      name: '4.f3 with ...d5 and ...c5',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. f3 d5 5. a3 Bxc3+ 6. bxc3 c5 7. cxd5 exd5 8. e3 O-O 9. Bd3 c4 10. Bc2 Nc6 11. Ne2 Re8 12. O-O Na5',
      note: 'Black locks the queenside with ...c4 and eyes b3; White will aim for Ng3 and e4.',
    },
    {
      name: '4.Nf3 b6 5.Bg5',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Nf3 b6 5. Bg5 Bb7 6. e3 h6 7. Bh4 g5 8. Bg3 Ne4 9. Qc2 Bxc3+ 10. bxc3 d6 11. Bd3 f5 12. d5 Nc5',
      note: 'Black breaks the pin with ...h6/...g5 and plants a knight on e4 — a sharp, well-known line.',
    },
  ],
  traps: [
    {
      name: '4.Qc2 d5: the c3 pin strikes',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. cxd5 exd5 6. Bg5 h6 7. Bh4 c5 8. dxc5 g5 9. Bg3 Ne4 10. e3 Qa5 11. Nf3 Nxc3 12. bxc3 Bxc3+ 13. Qxc3 Qxc3+',
      victim: 'white',
      explanation:
        'In this sharp line the c3-knight is pinned twice (by the b4-bishop and the a5-queen). White must deal with it (11.Rc1 or 11.Nge2); the natural 11.Nf3? allows 11...Nxc3, and 12.bxc3 Bxc3+ wins the rook on a1 or the queen.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4', note: 'The pin stops e4 for now. Be ready to trade ...Bxc3 when it doubles White\'s pawns, but not for free.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3', note: 'The Rubinstein: White develops calmly. Choose between the classical 4...O-O + ...d5 + ...c5 and the Hübner 4...c5 + ...Bxc3 + ...d6.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2', note: 'White avoids doubled pawns. Castle and develop fast: ...O-O, ...d5 or ...b6/...Bb7; you get a lead in development for the bishop pair.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3', note: 'White has the bishops and doubled c-pawns. Target c4 (...c5, ...Nc6–a5, ...b6–Ba6) and keep the centre closed.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. f3', note: 'White prepares e4. Stop it at once with ...d5 (or strike with ...c5 and ...d5).' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5 5. Bd3 Nc6 6. Nf3 Bxc3+ 7. bxc3 d6', note: 'Hübner setup: ...e5 next, then close the centre. Your knights will outplay the bishops and the c4 pawn is a long-term target.' },
  ],
  modelGames: [
    {
      white: 'Boris Spassky',
      black: 'Robert Fischer',
      year: 1972,
      event: 'World Championship, Reykjavik (game 5)',
      lesson: 'The Hübner structure in action: Fischer closes the centre, his knights dominate and the doubled c-pawns become targets.',
    },
  ],
};

export default opening;
