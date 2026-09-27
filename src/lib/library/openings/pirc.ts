import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'pirc-defense',
  name: 'Pirc Defense',
  eco: 'B07–B09',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 d6 2. d4 Nf6 3. Nc3 g6',
  summary:
    'A hypermodern defence: Black lets White build a big pawn centre, then attacks it from the side with the g7 bishop and timely ...c5 or ...e5 breaks. It avoids huge amounts of mainline theory and leads to unbalanced positions where the better-prepared plan wins.',
  ideas: [
    'Development first: ...Bg7 and ...O-O, then choose your central break — ...e5 (after ...Nbd7 or ...Nc6) or ...c5.',
    'Against the Austrian Attack (f4), strike with ...c5 before White\'s e5 push becomes crushing; if White takes on c5, regain the pawn with ...Qa5xc5.',
    'Against the Classical (Nf3, Be2), play ...c6, ...Bg4 or ...Nc6 with ...e5 — trading the g4 bishop for the f3 knight weakens White\'s grip on d4 and e5.',
    'Against the 150 Attack (Be3, Qd2), avoid early castling: play ...c6, ...b5, ...Nbd7 and ...Bb7 to grab queenside space, then ...e5.',
    'After ...e5 and d4–d5, the structure resembles a King\'s Indian: play ...Ne7/...Nc5 and ...f5 on the kingside, or ...c6 to open the c-file.',
    'The g7 bishop is your trump — if White plays Bh6 to trade it, consider leaving it on g7 and recapturing with the king only when safe.',
  ],
  opponentIdeas: [
    'Austrian Attack: f4 and e5 to kick the f6 knight and gain overwhelming central space.',
    '150 Attack: Be3, Qd2, Bh6 and h4–h5 to trade the g7 bishop and mate on the h-file.',
    'Classical: calm development with Nf3, Be2, O-O and h3 to keep a space advantage.',
  ],
  structure:
    'White has the classical pawn duo e4/d4 against Black\'s d6 and the g6 fianchetto. Black waits for the right moment to attack the centre with ...c5 or ...e5. After ...e5 d5 the centre closes (King\'s Indian-like); after ...c5 dxc5 it opens and the g7 bishop bites.',
  lines: [
    {
      name: 'Austrian Attack, 5...O-O 6.Be2 c5',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. Be2 c5 7. dxc5 Qa5 8. O-O Qxc5+ 9. Kh1 Nc6 10. Nd2',
      note: 'Black hits the centre with ...c5 and regains the pawn. The knight on d2 heads for b3 to kick the queen.',
    },
    {
      name: 'Austrian Attack, 5...c5 6.Bb5+ (forced draw line)',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 c5 6. Bb5+ Bd7 7. e5 Ng4 8. e6 fxe6 9. Ng5 Bxb5 10. Nxe6 Bxd4 11. Nxd8 Bf2+ 12. Kd2 Be3+ 13. Ke1 Bf2+',
      note: 'A famous forcing line: White wins the queen but Black\'s bishop gives a perpetual check.',
    },
    {
      name: 'Classical, 4.Nf3',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be2 O-O 6. O-O Bg4 7. Be3 Nc6 8. Qd2 e5 9. d5 Ne7 10. Rad1 Bd7 11. Ne1',
      note: 'Black trades or pins with ...Bg4 and plays ...e5. After d5 the plan is ...Ne8/...f5, King\'s Indian style.',
    },
    {
      name: '150 Attack, 4.Be3',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 Bg7 5. Qd2 c6 6. f3 b5 7. Nge2 Nbd7 8. Bh6 Bxh6 9. Qxh6 Bb7 10. a3 e5 11. g3 Qe7 12. Bg2 O-O-O',
      note: 'Black ignores the Bh6 trade, grabs queenside space and even castles long — White\'s kingside attack hits thin air.',
    },
    {
      name: 'Fianchetto, 4.g3',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. g3 Bg7 5. Bg2 O-O 6. Nge2 e5 7. h3 c6 8. a4 Nbd7 9. O-O a5',
      note: 'A quiet system: Black challenges the centre with ...e5 and ...c6 and gets a solid position.',
    },
  ],
  traps: [
    {
      name: 'The Nf2+ fork',
      moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. e5 dxe5 7. dxe5 Qxd1+ 8. Kxd1 Ng4 9. h3 Nf2+',
      victim: 'white',
      explanation: 'After the queen trade White\'s king stands on d1, and with the f-pawn gone the f2 square is a perfect fork point against the king and the h1 rook. Chasing the knight with 9.h3?? allows 9...Nf2+, forking king and rook.',
    },
  ],
  positions: [
    { moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6', note: 'The Pirc. The bishop goes to g7 next. White\'s main tries are 4.f4 (Austrian), 4.Nf3 (Classical) and 4.Be3 (150 Attack).' },
    { moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4', note: 'Austrian Attack: White threatens e4–e5. Develop 4...Bg7 and prepare ...c5 to hit the centre from the side.' },
    { moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. Bd3', note: 'A key setup for White. 6...Na6 (heading for c5 or b4) and 6...Nc6 are the main answers.' },
    { moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be2 O-O 6. O-O', note: 'Classical: no direct attack. ...c6, ...Bg4 or ...Nc6 with ...e5 are all sound.' },
    { moves: '1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3', note: '150 Attack: Qd2 and Bh6 are coming. Consider 4...c6 and ...b5 before committing your king.' },
  ],
  modelGames: [],
};

export default opening;
