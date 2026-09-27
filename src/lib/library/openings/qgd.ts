import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'queens-gambit-declined',
  name: "Queen's Gambit Declined",
  eco: 'D30–D69',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 d5 2. c4 e6',
  summary:
    "Black keeps a solid pawn on d5 and backs it up with ...e6, conceding a little space in return for a rock-solid, easy-to-understand position. It has been a world-championship mainstay for over a century: Black develops calmly, castles, and later frees the game with ...c5 or ...e5.",
  ideas: [
    'Standard development: ...Nf6, ...Be7, ...O-O, then ...Nbd7 or ...b6/...Bb7. Keep d5 firmly protected until you are fully developed.',
    'Free your position with a pawn break: ...c5 (hitting d4) or ...e5 (after ...dxc4 and ...Nd5 trades). Without a break your c8-bishop stays buried.',
    'The Tartakower (...h6 + ...b6 + ...Bb7) solves the problem bishop by developing it on the long diagonal before opening the centre.',
    'The Lasker (...h6 + ...Ne4) trades two pairs of minor pieces to relieve the cramp, then follows up with ...c6, ...dxc4 and ...e5 or ...c5.',
    'In the Exchange Variation, answer the minority attack (b4–b5) by keeping pieces active: ...Nf8–e6/g6, ...Ne4 trades and kingside play with ...f5 or ...Qd6.',
    'Capablanca\'s freeing maneuver: after ...dxc4 and Bxc4, play ...Nd5 to swap pieces, then ...e5 to open the diagonal for the c8-bishop.',
    'Hanging pawns on c5/d5 are a strength if you keep them mobile: support them with ...Rc8, ...Qb7 and look for ...d4 or ...c4 at the right moment.',
  ],
  opponentIdeas: [
    'Pin the f6-knight with Bg5 to increase pressure on d5 and keep Black passive.',
    'In the Exchange (Carlsbad) structure, launch a minority attack with Rb1, b4–b5 to leave Black with a weak c6 pawn, or play Nge2, f3 and e4 for a central break.',
    'Develop with Rc1 and wait for Black to take on c4 first, winning a tempo with the recapture Bxc4.',
    'After a ...c5 break, create hanging pawns and target them with pieces (Qa4/Qa3, Rc1, Bb5).',
  ],
  structure:
    'Black\'s pawns on d5 and e6 form a solid wall; the drawback is the c8-bishop behind them. In the Exchange Variation you get the Carlsbad structure (d5/c6 vs d4/e3) with a half-open e-file for Black and a half-open c-file for White. Freeing breaks with ...c5 or ...e5 often lead to an isolated pawn or hanging pawns.',
  lines: [
    {
      name: 'Tartakower Defense (7...b6)',
      moves:
        '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6 12. Qa4 c5 13. Qa3 Rc8 14. Bb5',
      note: 'The classical main line: Black gets hanging pawns on c5/d5 and must keep them active.',
    },
    {
      name: 'Lasker Defense (7...Ne4)',
      moves:
        '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4 8. Bxe7 Qxe7 9. Rc1 c6 10. Be2 Nxc3 11. Rxc3 dxc4 12. Bxc4 Nd7 13. O-O b6 14. Bd3 c5',
      note: 'Two minor-piece trades ease the cramp; ...b6, ...Bb7 and ...c5 finish development.',
    },
    {
      name: "Orthodox, Capablanca's freeing maneuver",
      moves:
        '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O Nxc3 12. Rxc3 e5 13. Qc2 exd4 14. exd4',
      note: 'After the trades on d5 and c3, ...e5 opens the long-buried c8-bishop.',
    },
    {
      name: 'Exchange Variation (Qc2 + Bd3)',
      moves:
        '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 c6 7. Qc2 Nbd7 8. Bd3 O-O 9. Nf3 Re8 10. O-O Nf8 11. Rab1 Ne4 12. Bxe7 Qxe7 13. b4 a6',
      note: 'White starts the minority attack; ...a6 slows b5 and ...Ne4 trades gives Black comfortable play.',
    },
    {
      name: '5.Bf4 with ...c5',
      moves:
        '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bf4 O-O 6. e3 c5 7. dxc5 Bxc5 8. a3 Nc6 9. Qc2 Qa5 10. Rd1 Re8 11. Nd2 e5 12. Bg5 d4',
      note: 'Against the Bf4 system Black strikes at once with ...c5 and uses the lead in development for ...e5–d4.',
    },
  ],
  traps: [
    {
      name: 'Elephant Trap',
      moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. cxd5 exd5 6. Nxd5 Nxd5 7. Bxd8 Bb4+ 8. Qd2 Bxd2+ 9. Kxd2 Kxd8',
      victim: 'white',
      explanation:
        'The "pinned" f6-knight is not really pinned: after 6.Nxd5? Nxd5! 7.Bxd8 Bb4+ Black regains the queen and ends up a piece ahead.',
    },
    {
      name: 'Cambridge Springs ...Ne4 trick',
      moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. Bd3 Ne4 8. Qc2 Nxg5 9. Nxg5 dxc4',
      victim: 'white',
      explanation:
        'In the Cambridge Springs (6...Qa5) the queen on a5 eyes g5 along the fifth rank. After 7.Bd3? Ne4 and ...Nxg5, ...dxc4 attacks the d3-bishop while the g5-knight hangs to the queen: White loses a piece.',
    },
  ],
  positions: [
    { moves: '1. d4 d5 2. c4 e6', note: 'The QGD: d5 is rock-solid. The price is the c8-bishop, which needs ...b6/...Bb7 or a later ...e5 or ...c5 to come alive.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5', note: 'The pin increases pressure on d5. Unpin with ...Be7, castle, and consider ...h6 to ask the bishop what it wants.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4', note: 'Key choice: 7...b6 (Tartakower, fianchetto the problem bishop) or 7...Ne4 (Lasker, trade pieces to free your game).' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5', note: 'The Carlsbad structure. Your c8-bishop is now free. Expect a minority attack (b4–b5) or a central plan with f3 and e4.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bf4', note: 'Against the London-style bishop, the most active answer is ...O-O and ...c5, fighting for the dark squares at once.' },
    { moves: '1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5', note: 'The c8-bishop is free and d5 is solid. Next: ...Be6 and ...c5, accepting hanging pawns in exchange for activity.' },
  ],
  modelGames: [
    {
      white: 'Robert Fischer',
      black: 'Boris Spassky',
      year: 1972,
      event: 'World Championship, Reykjavik (game 6)',
      lesson: 'A Tartakower with 14.Bb5: White shows how to attack hanging pawns. Study it to learn what Black must avoid — passive, immobile c5/d5 pawns.',
    },
  ],
};

export default opening;
