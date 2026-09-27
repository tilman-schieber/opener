import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'scandinavian',
  name: 'Scandinavian Defense',
  eco: 'B01',
  side: 'black',
  group: 'black-e4',
  difficulty: 1,
  base: '1. e4 d5 2. exd5',
  summary:
    'Black challenges e4 on move one and forces the play into Black\'s territory. After 2...Qxd5 the queen comes out early, but Black gets a clear, solid setup (...Nf6, ...c6, ...Bf5, ...e6) that is easy to learn. 2...Nf6 (the Modern) regains the pawn more slowly for more dynamic play.',
  ideas: [
    'After 3.Nc3, put the queen on a5 (active, pins c3 after Bd2 moves) or d6 (safer, eyes h2 and b4) — never leave it in the centre to be kicked with tempo.',
    'Standard setup with ...Qa5: ...Nf6, ...c6 (a retreat square on c7 and control of d5/b5), ...Bf5 or ...Bg4, ...e6, then ...Nbd7 and short castling.',
    'Develop the light-squared bishop before ...e6 — the same idea as the Caro-Kann.',
    'Watch for White\'s Nd5 or Bd2 + Nd5 discovered attacks on the a5 queen: keep a retreat square ready.',
    'In the 2...Nf6 Modern, recapture on d5 with the knight; if White plays c4, drop back to b6 and pressure d4 with ...g6, ...Bg7, ...Nc6.',
    'Long castling is often a good option with ...Qd6: ...Nc6, ...Bg4 and ...O-O-O put quick pressure on d4.',
  ],
  opponentIdeas: [
    'Gain time by hitting Black\'s queen: Nc3, Bd2, Nd5, Ne5 or Bf4.',
    'Build a big centre (d4, c4) and use the lead in development.',
    'Hunt the light-squared bishop with h3, g4 and Ne5 when it goes to g4/f5.',
  ],
  structure:
    'After 2...Qxd5 there is no Black pawn on d5: White keeps a d4 pawn against Black\'s c6/e6 "Caro-Kann-like" structure. Black is solid but a bit passive; White has a small space edge. In the Modern with c4, White gets a broad centre that Black attacks with pieces.',
  lines: [
    {
      name: '3.Nc3 Qa5 main line',
      moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 c6 6. Bc4 Bf5 7. Bd2 e6 8. Qe2 Bb4 9. O-O-O Nbd7 10. a3 Bxc3 11. Bxc3 Qc7 12. Ne5 Nxe5 13. dxe5 Nd5',
      note: 'The classical Scandinavian: solid setup, with the knight jumping into d5 at the end.',
    },
    {
      name: '3.Nc3 Qa5, 8.Nd5 discovered attack',
      moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bf5 6. Bc4 e6 7. Bd2 c6 8. Nd5 Qd8 9. Nxf6+ gxf6 10. Bb3 Nd7 11. Qe2 Qc7',
      note: 'White uses the Bd2 discovery to trade on f6. Black gets doubled pawns but the open g-file and a solid centre.',
    },
    {
      name: '3.Nc3 Qd6',
      moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd6 4. d4 Nf6 5. Nf3 a6 6. g3 Bg4 7. Bg2 Nc6 8. O-O O-O-O 9. Be3 e6 10. h3 Bh5',
      note: 'The modern queen retreat: ...a6 stops Nb5, and Black castles long for quick pressure on d4.',
    },
    {
      name: 'Modern 2...Nf6, 3.d4 Nxd5 4.Nf3',
      moves: '1. e4 d5 2. exd5 Nf6 3. d4 Nxd5 4. Nf3 Bg4 5. Be2 e6 6. O-O Nc6 7. c4 Nb6 8. Nc3 Be7 9. Be3 O-O 10. b3',
      note: 'Black recaptures with the knight and puts pressure on d4 with ...Bg4 and ...Nc6.',
    },
    {
      name: 'Modern 2...Nf6, 3.d4 Nxd5 4.c4 Nb6',
      moves: '1. e4 d5 2. exd5 Nf6 3. d4 Nxd5 4. c4 Nb6 5. Nf3 g6 6. Nc3 Bg7 7. h3 O-O 8. Be3 Nc6 9. Qd2 e5 10. d5 Ne7',
      note: 'White builds a big centre; Black counterattacks it with the fianchetto and ...e5.',
    },
  ],
  traps: [
    {
      name: 'The bishop hunt',
      moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bg4 6. h3 Bh5 7. g4 Bg6 8. Ne5 e6 9. h4',
      victim: 'black',
      explanation: 'If your bishop wanders to g4 and retreats along the h5–e8 diagonal, White gains tempi with h3, g4, Ne5 and h4–h5: the bishop runs out of squares, has to be given up for the knight, and White has grabbed a lot of kingside space for free. Prefer the ...c6/...Bf5 setup or trade on f3 at once.',
    },
  ],
  positions: [
    { moves: '1. e4 d5 2. exd5', note: 'Recapture with 2...Qxd5 (classical) or play 2...Nf6 (Modern) and take on d5 with the knight next.' },
    { moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3', note: 'The queen must move. 3...Qa5 is active and main; 3...Qd6 is solid and modern; 3...Qd8 is very passive.' },
    { moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3', note: 'Play ...c6 and ...Bf5 (or ...Bf5 first). The c6 pawn gives the queen a retreat to c7 and controls d5 and b5.' },
    { moves: '1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd6', note: 'The queen covers b4, e5 and h2. Play ...a6 to stop Nb5 and consider ...Nc6 with long castling.' },
    { moves: '1. e4 d5 2. exd5 Nf6', note: 'Modern: you regain the pawn with the knight. Watch 3.c4 (then 3...c6 is a gambit) and 3.Bb5+.' },
    { moves: '1. e4 d5 2. exd5 Nf6 3. d4 Nxd5 4. c4 Nb6', note: 'White has a big centre; attack it with ...g6, ...Bg7, ...Nc6 and ...e5.' },
  ],
  modelGames: [],
};

export default opening;
