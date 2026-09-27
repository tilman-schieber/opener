import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'grunfeld-defense',
  name: 'Grünfeld Defense',
  eco: 'D70–D99',
  side: 'black',
  group: 'black-d4',
  difficulty: 3,
  base: '1. d4 Nf6 2. c4 g6 3. Nc3 d5',
  summary:
    'A dynamic hypermodern defense: Black offers White a big pawn centre and then attacks it with pieces and pawns — the g7-bishop, ...c5 and ...Nc6. Theory is sharp and concrete, but the plans are consistent: pressure d4 until the centre cracks or becomes a target.',
  ideas: [
    'Everything hits d4: ...Bg7, ...c5, ...Nc6, ...Bg4 (pinning the f3/e2 knight) and ...Qa5 or ...Qb6 all pile up on White\'s centre.',
    'In the Exchange Variation, trade on c3 with ...Nxc3 to double White\'s pawns, then undermine with ...c5 and ...cxd4 at the right moment.',
    'Use the queenside majority: after the centre is traded off, Black\'s a- and b-pawns often become a winning passed pawn in the endgame.',
    'Against the Modern Exchange with Rb1, the a2 pawn is fair game: ...cxd4, ...Qa5+ and ...Qxa2 is main-line theory once the a1-rook has left.',
    'In the Russian System (Qb3), meet the queen with ...dxc4 and hit it again with ...Bg4, ...Nfd7–b6 or ...a6/...b5, gaining tempi.',
    'If White pushes d4–d5, redirect a knight via ...Na5 or ...Ne5 and use the long diagonal: ...e6 or ...c6 break the chain.',
    'Castle early — the g7-bishop and the rook on f8 support ...f5 ideas in some lines, and your king must be safe before the centre opens.',
  ],
  opponentIdeas: [
    'Build the ideal centre with e4 and d4 (Exchange Variation) and use it for a kingside attack or a d5 push.',
    'Protect d4 with Be3, Ne2 or Nf3 and Rc1/Rb1, and try to keep the pawn duo intact.',
    'Play d4–d5 to gain space and cut the g7-bishop off from the queenside.',
    'Quieter tries: 4.Bf4 or 5.Qb3 aim for a small, safe edge with pressure on d5 and c7.',
  ],
  structure:
    'In the Exchange Variation White gets pawns on c3/d4/e4 against Black\'s c- and e-pawns; Black\'s c5 and the g7-bishop target d4. When the c-pawns are traded, Black usually has a 2-vs-1 queenside majority, which matters a lot in endgames. If White pushes d5 the position resembles a Benoni with Black\'s bishop on the long diagonal.',
  lines: [
    {
      name: 'Exchange, Classical 7.Bc4',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 c5 8. Ne2 Nc6 9. Be3 O-O 10. O-O Bg4 11. f3 Na5 12. Bd3 cxd4 13. cxd4 Be6 14. d5 Bxa1 15. Qxa1 f6',
      note: 'The famous exchange sacrifice line: White gets attacking chances on the dark squares, Black has an extra exchange and solid defence.',
    },
    {
      name: 'Modern Exchange 7.Nf3 + 8.Rb1',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Rb1 O-O 9. Be2 cxd4 10. cxd4 Qa5+ 11. Bd2 Qxa2 12. O-O Bg4 13. Bg5 h6 14. Be3',
      note: 'White sacrifices the a2 pawn for development and central pressure; Black must defend accurately but is a pawn up.',
    },
    {
      name: 'Exchange with 8.Be3',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Be3 Qa5 9. Qd2 Bg4 10. Rb1 a6 11. Rxb7 Bxf3 12. gxf3 Nc6',
      note: 'Pressure on d4 and c3 forces White into concessions; after the queen trade Black gets active piece play for a pawn.',
    },
    {
      name: 'Russian System 5.Qb3, Smyslov 7...Bg4',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Bg4 8. Be3 Nfd7 9. Qb3 Nb6 10. Rd1 Nc6 11. d5 Ne5 12. Be2 Nxf3+ 13. gxf3 Bh5',
      note: 'Black gives up the centre and attacks it with pieces; White\'s weakened kingside pawns compensate for the space.',
    },
    {
      name: '4.Bf4 with ...c5',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 c5 6. dxc5 Qa5 7. Rc1 dxc4 8. Bxc4 O-O 9. Nf3 Qxc5 10. Bb3 Nc6 11. O-O Qa5 12. h3 Bf5',
      note: 'Black counterattacks immediately with ...c5 and ...Qa5, regaining the pawn with active pieces.',
    },
    {
      name: '4.Nf3 Bg7 5.Bg5',
      moves:
        '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Bg5 Ne4 6. cxd5 Nxg5 7. Nxg5 e6 8. Nf3 exd5 9. e3 O-O 10. Be2 c6 11. O-O Be6',
      note: 'Black grabs the bishop pair with ...Ne4xg5 and regains the pawn: a solid, easy-to-play answer.',
    },
  ],
  traps: [
    {
      name: '4.Bf4 and 6.Qb3: the c3 pin',
      moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 O-O 6. Qb3 c5 7. dxc5 Qa5 8. cxd5 Nxd5 9. Qxd5 Bxc3+ 10. bxc3 Qxc3+ 11. Ke2 Qxa1',
      victim: 'white',
      explanation:
        'After 8.cxd5? Nxd5! the c3-knight is pinned by the g7-bishop and the queen on a5. Taking the knight with 9.Qxd5?? runs into 9...Bxc3+ and ...Qxc3+, winning the a1-rook.',
    },
    {
      name: 'Grabbing a2 too early',
      moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Be2 cxd4 9. cxd4 Qa5+ 10. Bd2 Qxa2 11. Rxa2',
      victim: 'black',
      explanation:
        '...Qa5+ and ...Qxa2 is only a good idea after White has played Rb1. With the rook still on a1, the a2 pawn is simply defended and Black loses the queen.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5', note: 'The Grünfeld: Black challenges the centre at once and invites cxd5 + e4. Plan ...Bg7, ...c5 and pressure on d4.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7', note: 'The Exchange Variation tabiya. Next comes ...c5 and ...Nc6 (or ...Qa5/...Bg4) to attack d4. White must decide between Bc4+Ne2 and Nf3.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3 c5 8. Rb1', note: 'The rook leaves a1, so ...cxd4, ...Qa5+ and ...Qxa2 becomes a real option. 8...O-O first is the main line.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3', note: 'The Russian System: take on c4 and castle. After e4, choose a plan: ...Bg4 (Smyslov), ...a6 (Hungarian) or ...Na6 (Prins).' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4', note: 'White eyes c7. Develop with ...Bg7 and hit back with ...c5 — the queen check on a5 pins the c3-knight.' },
    { moves: '1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 c5 8. Ne2 Nc6 9. Be3 O-O 10. O-O', note: 'Classical Exchange: ...Bg4 (to provoke f3) and ...Na5 (hitting c4) is Black\'s main plan. The long diagonal and the d4 pawn remain the key targets.' },
  ],
  modelGames: [
    {
      white: 'Donald Byrne',
      black: 'Robert Fischer',
      year: 1956,
      event: 'Rosenwald Memorial, New York',
      lesson: 'The "Game of the Century": 13-year-old Fischer uses Grünfeld piece activity and a famous queen sacrifice to overwhelm White.',
    },
  ],
};

export default opening;
