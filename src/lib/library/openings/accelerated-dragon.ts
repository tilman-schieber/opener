import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'accelerated-dragon',
  name: 'Accelerated Dragon',
  eco: 'B34–B39',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6',
  summary:
    "Black fianchettoes at once and leaves the d-pawn on d7 for as long as possible. That saves a tempo on the regular Dragon and makes the freeing break d7–d5 possible in one go, which takes most of the sting out of the Yugoslav Attack. The price is 5.c4, the Maróczy Bind: White clamps d5 with pawns and Black must play a patient, manoeuvring game.",
  ideas: [
    'Against the Yugoslav set-up (Be3, Bc4, f3) keep the pawn on d7 and hit back with ...d5 in one move. That is the whole point of the Accelerated move order.',
    'After 7.Bc4 O-O 8.Bb3 play 8...a5!, threatening ...a4 to trap or chase the bishop, and follow with ...d5 when White plays f3.',
    'Against the Maróczy Bind, trade a pair of knights with ...Nxd4. Fewer pieces means less space pressure, and the endgames are fine for Black.',
    'In the Bind, the standard regrouping is ...d6, ...Bd7, ...Nxd4 and ...Bc6 hitting e4, then ...a5 and ...Nf6–d7–c5 to plant a knight on c5.',
    'Your pawn breaks against the Bind are ...b5 and ...f5. Prepare them slowly with ...Rb8, ...a6 or ...Nd7 and do not force them.',
    "The trick 7...Ng4! in the Bind hits the Be3. After 8.Qxg4 Nxd4 9.Qd1 Ne6 you have traded pieces and the dark squares are yours.",
    'Never play ...Na5 while the Bb3 and the knight on d4 can combine against f7. The Bxf7+ and Ne6 trick is the classic way to lose in 11 moves.',
  ],
  opponentIdeas: [
    'The Maróczy Bind (5.c4) is the most testing try: pawns on c4 and e4 kill ...d5 and ...b5, and White slowly builds with Be2, O-O, f3 and Qd2.',
    'In the open lines White wants the Yugoslav plan with Be3, f3, Qd2 and O-O-O. Against the Accelerated move order this is less effective, because ...d5 comes in one move.',
    '5.Nxc6 bxc6 6.Qd4 tries to exploit the missing ...d6: Qxh8 and e4–e5 ideas force Black to be precise for a few moves.',
    'Quiet 6.Nb3 and 7.Be2 aim for a Classical Dragon structure where White attacks with f4–f5.',
  ],
  structure:
    "In the Maróczy Bind White has pawns on c4 and e4 against Black's d6 and the fianchetto. White has more space, but Black's position has no weaknesses and the g7 bishop x-rays the queenside. Black's play comes from the c-file, the c5 and e5 squares for the knights, and the ...b5 or ...f5 breaks. In the open Sicilian lines the pawn stays on d7, so ...d7–d5 is a real threat and the centre can open in Black's favour.",
  lines: [
    {
      name: 'Maróczy Bind, 9...Bd7 plan',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Be3 Nf6 7. Nc3 O-O 8. Be2 d6 9. O-O Bd7 10. Qd2 Nxd4 11. Bxd4 Bc6 12. f3 a5 13. b3 Nd7 14. Be3 Nc5',
      note: 'The main line against the Bind: trade on d4, point the bishop at e4 from c6 and bring the knight to c5.',
    },
    {
      name: 'Maróczy Bind, Breyer 7...Ng4',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Be3 Nf6 7. Nc3 Ng4 8. Qxg4 Nxd4 9. Qd1 Ne6 10. Rc1 Qa5 11. Qd2 d6 12. Be2 Bd7 13. O-O Bc6',
      note: 'The knight jump hits e3 and forces trades. Black gets a compact position with the Ne6 covering c5, d4 and g5.',
    },
    {
      name: 'Maróczy Bind, Gurgenidze 5...Nf6',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Nf6 6. Nc3 Nxd4 7. Qxd4 d6 8. Be2 Bg7 9. Be3 O-O 10. Qd2 Be6 11. Rc1 Qa5 12. f3 Rfc8 13. b3 a6 14. Na4 Qxd2+ 15. Kxd2 Nd7',
      note: 'Black trades knights early and aims for a queen trade. The resulting endgame is solid, and ...b5 or ...f5 can follow later.',
    },
    {
      name: '5.Nc3 Bg7 6.Be3 Nf6 7.Bc4 O-O 8.Bb3 a5',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4 O-O 8. Bb3 a5 9. f3 d5 10. exd5 Nb4 11. Nde2 a4 12. Nxa4 Nfxd5 13. Bf2 Bf5',
      note: 'Here the Accelerated Dragon beats the regular one: ...d5 comes in one move and Black gets open lines instead of a Yugoslav mating attack.',
    },
    {
      name: '5.Nxc6 bxc6 6.Qd4',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nxc6 bxc6 6. Qd4 Nf6 7. e5 Nd5 8. e6 f6 9. exd7+ Bxd7 10. Bc4 Bf5 11. Bb3 Qb6 12. Qc4',
      note: 'White tries to exploit the undeveloped kingside. Block the long diagonal with 6...Nf6 and 7...Nd5, and your pieces come out fast after 9...Bxd7.',
    },
    {
      name: '5.Nc3 Bg7 6.Nb3, Classical set-up',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Nb3 Nf6 7. Be2 O-O 8. O-O d6 9. Be3 Be6 10. f4 Na5 11. f5 Bc4 12. Nxa5 Bxe2 13. Qxe2 Qxa5 14. g4 Rac8',
      note: 'A Classical Dragon structure. Trade the light-squared bishops with ...Na5 and ...Bc4, then counterattack on the c-file against e4 and c3.',
    },
  ],
  traps: [
    {
      name: "Fischer's trap: 8...Na5? 9.e5 Ne8 10.Bxf7+!",
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4 O-O 8. Bb3 Na5 9. e5 Ne8 10. Bxf7+ Kxf7 11. Ne6 dxe6 12. Qxd8',
      victim: 'black',
      explanation: "8...Na5? attacks the b3 bishop but lets White push 9.e5, driving the knight to e8. Then 10.Bxf7+ Kxf7 11.Ne6! traps the queen: 11...dxe6 12.Qxd8 wins it, and 11...Kxe6 12.Qd5+ Kf5 13.g4+ leads to mate. Fischer won this way against Reshevsky in 1958. Play 8...a5 or 8...d6 instead.",
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6', note: 'The Accelerated Dragon. The d-pawn stays home so that ...d7–d5 can come in one move. The critical reply is 5.c4, the Maróczy Bind.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4', note: 'The Maróczy Bind: c4 and e4 stop ...d5 for good. Play 5...Bg7 with ...Nf6, ...O-O, ...d6 and trade a pair of knights with ...Nxd4. 5...Nf6 6.Nc3 Nxd4 is the Gurgenidze move order.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Be3 Nf6 7. Nc3', note: 'Now 7...Ng4! is a real option: 8.Qxg4 Nxd4 and the knight comes back to e6. The quiet 7...O-O 8.Be2 d6 is the main line.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4', note: 'White plays as if against the regular Dragon. Castle with 7...O-O. If White castles short, 8...Nxe4 9.Nxe4 d5 is the fork trick and frees your game.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4 O-O 8. Bb3', note: 'Play 8...a5!, threatening ...a4. After 9.f3 d5! the centre opens and Black is fine. 8...Na5? loses to 9.e5 and 10.Bxf7+.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nxc6 bxc6', note: 'The doubled c-pawns control d5 and the b-file opens for your rook. After 6.Qd4 answer 6...Nf6! so that Qxh8 is never possible.' },
  ],
  modelGames: [
    { white: 'Robert James Fischer', black: 'Samuel Reshevsky', year: 1958, event: 'US Championship, New York', lesson: 'The famous miniature with 8...Na5? 9.e5 Ne8 10.Bxf7+ and 11.Ne6. Know it so you never walk into it.' },
  ],
};

export default opening;
