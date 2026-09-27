import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'caro-kann',
  name: 'Caro-Kann Defense',
  eco: 'B10–B19',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 c6',
  summary:
    'Black prepares ...d5 with the c-pawn, keeping the e6 square free so the light-squared bishop can come out to f5 or g4 before ...e6. The result is one of the soundest structures in chess: few weaknesses, a solid pawn chain and good endgames.',
  ideas: [
    'Get the light-squared bishop out before playing ...e6: ...Bf5 (or ...Bg4) is the whole point of the Caro-Kann.',
    'Against the Advance (3.e5), attack d4 with ...c5 — often in two moves (...c6–c5) — plus ...Nc6, ...Qb6 and ...Ne7–f5/c6.',
    'In the Classical (4...Bf5), answer h4–h5 with ...h6 and ...Bh7, then play ...Nd7, ...Ngf6, ...e6 and often castle queenside. The ...c5 break frees your game.',
    'After Nxe4 exchanges, you have a 4-vs-3 kingside pawn majority in some lines — keep it healthy for the endgame.',
    'Against the Panov (c4), White gets an isolated d-pawn: blockade it on d5 with a knight, trade pieces and target it in the endgame.',
    'In the Exchange Variation, fight for e4 with ...Bf5 or ...Bg4, and use the minority attack ...b5–b4 against White\'s c3 pawn.',
  ],
  opponentIdeas: [
    'Gain space with e4–e5 and chase the f5 bishop with g4, h4 or Nf3–h4.',
    'In the Classical, harass the bishop with Ng3 and h4–h5 to gain kingside space before castling long.',
    'Play the Panov (c4) for an active isolated-pawn middlegame with attacking chances.',
    'Develop quickly and exploit Black\'s slight lag in development with e6 or d5 sacrifices.',
  ],
  structure:
    'Black\'s pawns on c6 and d5 (or c6/e6 after ...dxe4) form a solid wall. After 3...dxe4 Black has a sound structure with no weaknesses but less central space. After 3.e5 it resembles a French in which the bishop is already outside the chain. The Panov leads to isolated-queen\'s-pawn positions.',
  lines: [
    {
      name: 'Advance, Short Variation',
      moves: '1. e4 c6 2. d4 d5 3. e5 Bf5 4. Nf3 e6 5. Be2 c5 6. Be3 Nd7 7. O-O Ne7 8. c4 dxc4 9. Na3 Nd5 10. Nxc4 Be7',
      note: 'The bishop is out, then ...e6 and ...c5 hit the centre. Black blockades on d5.',
    },
    {
      name: 'Classical, 4...Bf5',
      moves: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7 8. h5 Bh7 9. Bd3 Bxd3 10. Qxd3 e6 11. Bd2 Ngf6 12. O-O-O Be7 13. Kb1 O-O',
      note: 'The classic main line: Black trades the light bishops and aims for ...c5 or ...Qc7 with ...O-O or ...O-O-O.',
    },
    {
      name: 'Exchange Variation',
      moves: '1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Nf6 6. Bf4 Bg4 7. Qb3 Qd7 8. Nd2 e6 9. Ngf3 Bd6 10. Bxd6 Qxd6 11. O-O O-O',
      note: 'A Carlsbad structure with colours reversed: Black equalises easily and can play the minority attack ...b5–b4.',
    },
    {
      name: 'Panov-Botvinnik Attack',
      moves: '1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 e6 6. Nf3 Be7 7. cxd5 Nxd5 8. Bd3 Nc6 9. O-O O-O 10. Re1 Bf6 11. Be4 Nce7',
      note: 'White gets the isolated d-pawn; Black blockades on d5 and aims to trade pieces.',
    },
    {
      name: 'Two Knights, 2.Nc3 d5 3.Nf3',
      moves: '1. e4 c6 2. Nc3 d5 3. Nf3 Bg4 4. h3 Bxf3 5. Qxf3 e6 6. d3 Nf6 7. Be2 Nbd7 8. O-O Be7 9. Qg3 O-O 10. Bh6 Ne8',
      note: 'Black gives the bishop pair for a very solid position; the ...e5 or ...d4 break comes later.',
    },
  ],
  traps: [
    {
      name: 'Smothered mate on d6',
      moves: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Qe2 Ngf6 6. Nd6#',
      victim: 'black',
      explanation: 'In the 4...Nd7 line, 5.Qe2 sets a famous trap: 5...Ngf6?? walks into 6.Nd6 — smothered mate, because the e7 pawn is pinned by the queen. Play 5...Ndf6 or avoid this line.',
    },
  ],
  positions: [
    { moves: '1. e4 c6', note: 'The Caro-Kann. ...d5 comes next, supported by c6. Unlike the French, your c8 bishop stays free.' },
    { moves: '1. e4 c6 2. d4 d5 3. e5 Bf5', note: 'Advance: the bishop is outside the chain. Next ...e6 and ...c5. Watch out for g4 chasing the bishop.' },
    { moves: '1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5', note: 'Classical: after 5.Ng3 Bg6 6.h4, answer 6...h6 so the bishop can retreat to h7 when h5 comes.' },
    { moves: '1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3', note: 'Exchange: develop with ...Nc6, ...Nf6 and ...Bg4. Your queenside minority attack (...b5–b4) is the long-term plan.' },
    { moves: '1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4', note: 'Panov: White accepts an isolated d-pawn for activity. Play ...Nf6, ...e6 and blockade on d5.' },
    { moves: '1. e4 c6 2. Nc3 d5 3. Nf3', note: 'Two Knights: 3...Bg4 pins; after h3 take on f3 and play ...e6, ...Nf6 — a solid, easy position.' },
  ],
  modelGames: [],
};

export default opening;
