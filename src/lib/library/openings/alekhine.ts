import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'alekhine-defense',
  name: "Alekhine's Defence",
  eco: 'B02–B05',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 Nf6',
  summary:
    "Black attacks e4 with the knight on move one and invites White to chase it with pawns. White gains a big centre, and Black's whole game is about proving that the centre is overextended. It is provocative and hypermodern, and most club players on the white side have never studied it.",
  ideas: [
    'After 2.e5 Nd5 3.d4, always hit the e5 pawn with 3...d6. Leaving it alone lets White build c4, f4 and a crushing space advantage.',
    'In the Modern (4.Nf3), 4...Bg4 pins the knight that defends e5 and d4. Follow with ...e6, ...Be7, ...O-O and ...Nc6 or ...d5.',
    'After c2–c4 the knight retreats to b6, where it eyes c4 and d5. From there it can later jump to c4 or come back via Nb6–d7.',
    'The key break against a pawn on e5 is ...dxe5 or ...d5 followed by ...c5 or ...f6. Pick one target and hit it with pieces and pawns.',
    'In the Four Pawns Attack, develop fast with ...dxe5, ...Nc6, ...Bf5 and ...e6. Then hit the centre with ...Bb4 or ...Be7 and ...O-O, and ...f6 or ...c5.',
    'Against the Exchange (5.exd6), recapture 5...cxd6 and fianchetto with ...g6 and ...Bg7. The bishop on g7 hits d4 and b2.',
    'Never let the d5 knight get trapped. Check its retreat squares (b6, b4, e7, f6) before every pawn push by White.',
  ],
  opponentIdeas: [
    'The Modern Variation (4.Nf3) is the most popular and most solid: White keeps a small space edge without overextending.',
    'The Four Pawns Attack (4.c4 Nb6 5.f4) is the most ambitious. If Black is slow, d4–d5 and e5–e6 blow the position open.',
    'In the Exchange Variation White gives up the e5 pawn for a quiet space advantage with c4 and d4.',
    'Club players often avoid theory with 2.Nc3 or 2.d3. These lines are harmless, but you should know the ...d5 answer.',
  ],
  structure:
    "White usually has pawns on d4 and e5 (sometimes also c4 and f4) against Black's d6 and e6. The e5 pawn cramps Black but also blocks White's own pieces. Black's plan is to trade it with ...dxe5 or undermine it with ...f6, and then attack d4 with ...c5 or ...Nc6. If White's centre falls apart, Black gets the better pawns and free piece play.",
  lines: [
    {
      name: 'Modern, 4...Bg4 main line',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 7. c4 Nb6 8. h3 Bh5 9. Nc3 O-O 10. Be3 d5 11. c5 Bxf3 12. Bxf3 Nc4 13. b3 Nxe3 14. fxe3 b6',
      note: 'The main line. After c4–c5 the centre is locked; Black trades the Be3 with ...Nc4 and then breaks with ...b6 and ...c5 or ...f6.',
    },
    {
      name: 'Modern, Kengis 4...dxe5 5.Nxe5 c6',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 dxe5 5. Nxe5 c6 6. Be2 Bf5 7. O-O Nd7 8. Nf3 e6 9. c4 N5f6 10. Nc3 Be7 11. Bf4 O-O',
      note: 'A solid Caro-Kann-like set-up: ...c6 supports the d5 knight, ...Bf5 comes out before ...e6, and ...Nd7 challenges the e5 knight.',
    },
    {
      name: 'Modern, 4...dxe5 5.Nxe5 g6',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 dxe5 5. Nxe5 g6 6. Bc4 c6 7. O-O Bg7 8. Re1 O-O 9. Bb3 Be6 10. c4 Nc7',
      note: 'The fianchetto puts pressure on d4. ...c6 secures d5, and the knight on c7 keeps an eye on e6 and d5.',
    },
    {
      name: 'Four Pawns Attack, 7...Bf5',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3 Bf5 8. Nc3 e6 9. Nf3 Be7 10. d5 exd5 11. cxd5 Nb4 12. Nd4 Bd7 13. e6 fxe6 14. dxe6 Bc6',
      note: 'Very sharp. White sacrifices pawns to open lines, Black hits back with ...Nb4 and the bishop on c6. Learn this line by heart before you play the Alekhine.',
    },
    {
      name: 'Exchange Variation, 5...cxd6 with ...g6',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nc3 g6 7. Be3 Bg7 8. Rc1 O-O 9. b3 e5 10. dxe5 dxe5 11. Qxd8 Rxd8 12. c5 N6d7',
      note: 'Black trades queens and aims for active pieces. The knights head for c6 and d4, and the bishop on g7 works well in the open position.',
    },
    {
      name: '2.Nc3 d5 3.exd5 Nxd5',
      moves: '1. e4 Nf6 2. Nc3 d5 3. exd5 Nxd5 4. Bc4 Nb6 5. Bb3 c5 6. d3 Nc6 7. Nf3 e6 8. O-O Be7 9. Re1 O-O',
      note: 'An open position with no weaknesses for Black. Develop simply, then play ...c4 or ...Na5 to chase the b3 bishop.',
    },
    {
      name: 'Chase Variation, 3.c4 Nb6 4.c5 Nd5',
      moves: '1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. d4 d6 7. cxd6 cxd6 8. Nf3 Nc6 9. O-O Be7 10. Qe2 O-O',
      note: 'White chases the knight but loses time. The d5 knight is stable, and Black attacks the centre with ...d6 and later ...dxe5.',
    },
  ],
  traps: [
    {
      name: '2...Ne4? and the trapped knight',
      moves: '1. e4 Nf6 2. e5 Ne4 3. d3 Nc5 4. d4 Ne6 5. d5 Nc5 6. b4 Ne4 7. Qd4 f5 8. f3',
      victim: 'black',
      explanation: 'The knight must go to d5 on move two. On e4 it runs out of squares: White kicks it with d3, d4, d5 and b4, and after 7.Qd4 it has nowhere to go. 8.f3 wins it.',
    },
    {
      name: '5...Nd7? 6.Nxf7! king hunt',
      moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 dxe5 5. Nxe5 Nd7 6. Nxf7 Kxf7 7. Qh5+ Ke6 8. c4 N5f6 9. d5+ Kd6 10. Qf7',
      victim: 'black',
      explanation: "5...Nd7? challenges the e5 knight but takes the d7 square from the king. 6.Nxf7! Kxf7 7.Qh5+ drags the king to e6, and 8.c4 and 9.d5+ chase it to d6. White has only a knight for a pawn, but the attack is very strong. Engines rate it clearly better for White, and Black rarely survives over the board. Play 5...c6 or 5...g6 instead.",
    },
  ],
  positions: [
    { moves: '1. e4 Nf6', note: "Alekhine's Defence. 2.e5 Nd5 is the main line. 2.Nc3 can be met with 2...d5 or 2...e5 (a Vienna)." },
    { moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6', note: 'Always strike at e5 with ...d6. White chooses between the Modern 4.Nf3, the Four Pawns 4.c4 Nb6 5.f4 and the Exchange 4.c4 Nb6 5.exd6.' },
    { moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3', note: 'The Modern. 4...Bg4 pins the defender of e5. 4...dxe5 5.Nxe5 is the Kengis: follow up with 5...c6 or 5...g6, never 5...Nd7?.' },
    { moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 e6 6. O-O Be7 7. c4 Nb6 8. h3 Bh5 9. Nc3 O-O 10. Be3 d5 11. c5 Bxf3', note: 'If White recaptures 12.gxf3, play 12...Nc8 with ...Nc6 and ...f6. The doubled f-pawns cover e4 and g4, but the white king is weaker.' },
    { moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4', note: 'The Four Pawns Attack. Take with 5...dxe5 6.fxe5 and develop with ...Nc6 and ...Bf5. Your targets are d4 and e5.' },
    { moves: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6', note: 'The Exchange. 5...cxd6 keeps a central pawn and plays ...g6, ...Bg7 and ...O-O. 5...exd6 is a more symmetrical, drawish choice.' },
    { moves: '1. e4 Nf6 2. e5 Ne4', note: 'A mistake: the knight has no safe retreat. After 3.d3 Nc5 4.d4 Ne6 5.d5 Nc5 6.b4 it is trapped. Play 2...Nd5.' },
  ],
  modelGames: [
    { white: 'Nigel Short', black: 'Jan Timman', year: 1991, event: 'Tilburg', lesson: 'The famous king walk Kg1–h2–g3–f4–g5 in the 4...g6 line. It shows what happens when Black gets too passive against the space advantage.' },
  ],
};

export default opening;
