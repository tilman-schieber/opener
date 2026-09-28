import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'jobava-london',
  name: 'Jobava London',
  eco: 'D00',
  side: 'white',
  group: 'white-d4',
  difficulty: 2,
  base: '1. d4 d5 2. Nc3 Nf6 3. Bf4',
  summary:
    'The aggressive cousin of the London System, named after Baadur Jobava. White puts the knight on c3 instead of the pawn, so the Nb5 jump against c7 and the central break e3–e4 (often after f3) are always in the air. Castling long and storming with g4 and h4 is a normal plan, which makes it a great weapon against solid players who expect a quiet London.',
  ideas: [
    'Nb5 hits c7 together with the f4 bishop. Only the queen defends c7, so Black must spend a tempo on ...Na6 or ...Bd6, or lose the pawn.',
    'After Black answers Nb5 with ...Na6, the knight on a6 is offside. Support the b5 knight with c3 and a4, or drop back with Nc3 once it has done its job.',
    'Against ...Bf5 play f3 and g4: the bishop has to retreat to g6, then h4–h5 chases it again and gains kingside space.',
    'Break in the centre with f3 and e3–e4 (or e2–e4 directly). The c3 knight supports e4, which is something the normal London cannot do.',
    'With queens on and Black castled short, consider Qd2 and O-O-O, then g4 and h4. With opposite-side castling the pawn storm is faster than Black\'s play.',
    'Against ...g6 setups, push h4–h5 at once to open the h-file, or play Qd2 and Bh6 to trade the dark-squared bishop.',
    'Ne5 is a strong outpost in many lines: after ...Nc6 you can trade on c6 and give Black doubled c-pawns.',
  ],
  opponentIdeas: [
    'Hit d4 with ...c5 and ...Nc6, and open the c-file against a king on c1.',
    'Stop Nb5 with ...a6 or ...c6, then develop calmly.',
    'Trade the f4 bishop with ...Bd6 or ...Nh5.',
    'Counterattack with ...Bb4 pinning the c3 knight, or ...Qb6 against b2.',
  ],
  structure:
    'White keeps the London pawns (d4, e3) but the knight on c3 blocks the c-pawn, so there is no c3/d4/e3 triangle. Instead White plays for e3–e4 or f3 plus e4, which opens the centre. When Black plays ...c5 and ...cxd4, exd4 gives White a half-open e-file and a strong e5 square for the knight. With f3 and g4, the kingside pawns become a battering ram against a king on g8.',
  lines: [
    {
      name: '3...c5 4.e3 e6 5.Nb5 (main line)',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 c5 4. e3 e6 5. Nb5 Na6 6. c3 Be7 7. Nf3 O-O 8. Bd3 Bd7 9. a4 Rc8 10. O-O',
      note: 'The typical Jobava position: the knight on b5 is supported by c3 and a4, and the black knight on a6 has to find a better square.',
    },
    {
      name: '3...c5 4.e3 cxd4 5.exd4 a6',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 c5 4. e3 cxd4 5. exd4 a6 6. Nf3 Nc6 7. Ne5 e6 8. Be2 Bd6 9. O-O O-O 10. Nxc6 bxc6 11. Bxd6 Qxd6 12. Na4',
      note: 'Black stops Nb5 with ...a6. White plants a knight on e5, trades on c6 and the other knight heads for c5.',
    },
    {
      name: '3...e6 4.Nb5',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 e6 4. Nb5 Na6 5. e3 Be7 6. Nf3 O-O 7. Bd3 c5 8. c3 Bd7 9. a4 Qb6 10. O-O',
      note: 'Against the solid ...e6, Nb5 at once forces ...Na6. White gets a comfortable London with an extra idea on the queenside.',
    },
    {
      name: '3...Bf5 4.f3 and g4',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 Bf5 4. f3 e6 5. g4 Bg6 6. h4 h5 7. g5 Nfd7 8. e4 dxe4 9. fxe4 Bb4 10. Bg2 e5 11. Bg3 O-O 12. Nge2',
      note: 'The aggressive answer to ...Bf5: f3 and g4 push the bishop back, g5 kicks the knight, and e4 gives White a big centre.',
    },
    {
      name: '3...c6 with ...Bf5: storm and long castling',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 c6 4. e3 Bf5 5. f3 e6 6. g4 Bg6 7. h4 h5 8. g5 Nfd7 9. e4 dxe4 10. fxe4 e5 11. dxe5 Bb4 12. Qd4 Qe7 13. O-O-O',
      note: 'Same storm against a Caro-Kann style setup. White centralises the queen on d4 and castles long, with the kingside pawns already advanced.',
    },
    {
      name: '3...g6 5.h4',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 g6 4. e3 Bg7 5. h4 O-O 6. h5 c5 7. hxg6 hxg6 8. dxc5 Nbd7 9. Nf3 Nxc5 10. Be2',
      note: 'Against the fianchetto, h4–h5 opens the h-file straight away. The rook on h1 is already in play without castling.',
    },
  ],
  traps: [
    {
      name: 'Nxc7+ fork after ...Bf5',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 Bf5 4. Nb5 e6 5. Nxc7+ Qxc7 6. Bxc7',
      victim: 'black',
      explanation: 'After 4.Nb5 the c7 pawn is attacked twice and defended only by the queen. The natural 4...e6?? drops it with check: 5.Nxc7+ Qxc7 6.Bxc7 wins the queen for a knight, and 5...Kd7 6.Nxa8 wins the rook. Black must play 4...Na6.',
    },
    {
      name: '...Nc7?? into the double attack',
      moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 e6 4. Nb5 Na6 5. e3 Be7 6. Nf3 O-O 7. Bd3 c5 8. c3 Nc7 9. Nxc7 Qxc7 10. Bxc7',
      victim: 'black',
      explanation: 'Black wants to trade off the b5 knight with ...Nc7, but the knight on c7 is attacked by Nb5 and Bf4 and defended only by the queen. 9.Nxc7 Qxc7 10.Bxc7 wins the queen. Black should first play ...Bd7 or ...Qb6.',
    },
  ],
  positions: [
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4', note: 'The Jobava London. Nb5 is already a threat in many lines, because c7 is covered only by the queen. Black usually chooses ...c5, ...e6, ...Bf5, ...c6/...a6 or ...g6.' },
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 c5', note: 'The sharpest reply. 4.e3 is the main move. After 4...cxd4 5.exd4 the e5 square becomes a great home for your knight.' },
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 Bf5', note: 'Black copies the bishop. 4.Nb5 forces 4...Na6, and 4.f3 prepares g4 to hunt the bishop.' },
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 Bf5 4. f3 e6 5. g4 Bg6 6. h4', note: 'Now h5 would trap the bishop, so Black must play ...h5 or ...h6. After ...h5, g5 kicks the knight and e4 follows.' },
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 e6 4. Nb5 Na6', note: 'The a6 knight wants to come back via c7 or b4, but ...Nc7 is only safe once c7 is defended twice. Support b5 with c3 and a4.' },
    { moves: '1. d4 d5 2. Nc3 Nf6 3. Bf4 g6', note: 'Against the Grünfeld-style fianchetto, 4.e3 and 5.h4 is direct. 4.Qd2 with Bh6 and O-O-O is the other attacking plan.' },
  ],
  modelGames: [],
};

export default opening;
