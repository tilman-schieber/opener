import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'vienna-game',
  name: 'Vienna Game',
  eco: 'C25–C29',
  side: 'white',
  group: 'white-e4',
  difficulty: 1,
  base: '1. e4 e5 2. Nc3',
  summary:
    'White develops the queen\'s knight first, keeping the f-pawn free. That allows an aggressive f2–f4 (the Vienna Gambit) or a quieter Bc4 + d3 set-up, and it sidesteps the Petroff and a lot of mainstream 2.Nf3 theory.',
  ideas: [
    'Keep the f-pawn free: f2–f4 opens the f-file for your rook and hits e5, just like a King\'s Gambit but with Nc3 already developed.',
    'Against 2...Nf6 3.f4 d5, push 4.fxe5 and chase the e4 knight later with d3 or Nxe4; the e5 pawn cramps Black\'s kingside.',
    'In the Bc4 lines, play d3, Nge2 (not Nf3, which blocks the f-pawn) and later f4 to open the f-file toward f7.',
    'Use the c3 knight to jump into d5 when it hits c7, f6 or a bishop on b4 or e7.',
    'After Bg5xf6 trades, your knight is often better than Black\'s bishop — keep the centre closed with d3 and play on the kingside.',
    'Castle short, then Kh1 and f4–f5 is a typical attacking plan once the centre is stable.',
  ],
  opponentIdeas: [
    'Strike back in the centre with ...d5, especially against 3.f4.',
    'Grab e4 with 3...Nxe4 against 3.Bc4 (the Frankenstein–Dracula lines).',
    'Pin the c3 knight with ...Bb4 and double White\'s pawns.',
  ],
  structure:
    'Often e4 vs e5 with White\'s d3; after f4 and fxe5 White gets a half-open f-file and an advanced e5 pawn. In the Bc4 lines the structure resembles a reversed Giuoco Piano with the f-pawn ready to advance.',
  lines: [
    {
      name: 'Vienna Gambit, 3...d5',
      moves: '1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Nf3 Be7 6. d4 O-O 7. Bd3 f5 8. exf6 Bxf6 9. O-O Nc6 10. Nxe4 dxe4 11. Bxe4 Nxd4 12. c3 Nxf3+ 13. Bxf3',
      note: 'The critical reply: White builds a big centre with d4 and Bd3, and the game opens up quickly.',
    },
    {
      name: 'Vienna Gambit accepted, 3...exf4',
      moves: '1. e4 e5 2. Nc3 Nf6 3. f4 exf4 4. e5 Ng8 5. Nf3 d6 6. d4 dxe5 7. Qe2 Bb4 8. Qxe5+ Qe7 9. Qxe7+ Nxe7 10. Bxf4',
      note: 'Taking on f4 lets White gain time with e5; White regains the pawn with a comfortable position.',
    },
    {
      name: 'Frankenstein–Dracula (3.Bc4 Nxe4)',
      moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Nc6 6. Nb5 g6 7. Qf3 f5 8. Qd5 Qe7 9. Nxc7+ Kd8 10. Nxa8 b6 11. d3 Bb7 12. h4',
      note: 'A wild line: White wins the a8 rook but the knight is trapped and Black gets a big centre. Know it or avoid 3.Bc4.',
    },
    {
      name: '3.Bc4 Nc6 4.d3 (quiet)',
      moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nc6 4. d3 Bb4 5. Bg5 h6 6. Bxf6 Bxc3+ 7. bxc3 Qxf6 8. Ne2 d6 9. O-O Be6 10. Bb3 O-O 11. f4',
      note: 'A calm Italian-style game; White plays Ne2 so the f-pawn can still advance to f4.',
    },
    {
      name: '2...Nc6 3.Bc4 Nf6 4.d3 Na5',
      moves: '1. e4 e5 2. Nc3 Nc6 3. Bc4 Nf6 4. d3 Na5 5. Nge2 Nxc4 6. dxc4 Bc5 7. O-O d6 8. Qd3 O-O 9. Bg5 h6 10. Bxf6 Qxf6 11. Nd5',
      note: 'Black takes the bishop pair; White answers with a strong knight on d5 and control of the light squares.',
    },
  ],
  traps: [
    {
      name: 'Scholar\'s mate pattern (4...Nf6??)',
      moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nf6 5. Qxf7#',
      victim: 'black',
      explanation: 'After 3...Nxe4 4.Qh5 White threatens Qxf7#. Retreating 4...Nf6 attacks the queen but does not cover f7 — the only good move is 4...Nd6.',
    },
    {
      name: 'Nb5 and Nxd6+ with mate on f7',
      moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Nc6 6. Nb5 Be7 7. Nxd6+ cxd6 8. Qxf7#',
      victim: 'black',
      explanation: 'The knight on d6 is the only piece guarding f7. After 6.Nb5 Black must play 6...g6; if the knight is exchanged (7.Nxd6+ cxd6) Qxf7 is mate.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nc3', note: 'The Vienna: develop the knight and keep the f-pawn free. Against 2...Nf6 play 3.f4 or 3.Bc4; against 2...Nc6, 3.Bc4 is flexible.' },
    { moves: '1. e4 e5 2. Nc3 Nf6 3. f4', note: 'The Vienna Gambit. 3...d5! is best — then 4.fxe5 Nxe4 5.Nf3 with d4 and Bd3 to follow.' },
    { moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5', note: 'Threatening Qxf7#. Black must play 4...Nd6; after 5.Bb3 Nc6 6.Nb5 g6 7.Qf3 f5 8.Qd5 the Frankenstein–Dracula begins.' },
    { moves: '1. e4 e5 2. Nc3 Nf6 3. Bc4 Nc6', note: 'Play 4.d3: keep e4 protected and follow with Nge2/f4 or Bg5 to pin the f6 knight.' },
    { moves: '1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4', note: 'Develop with 5.Nf3; next d4 and Bd3 challenge the e4 knight. Don\'t hurry to take it — the e5 pawn gives you space.' },
  ],
  modelGames: [],
};

export default opening;
