import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'anti-sicilians',
  name: 'Anti-Sicilians for Black',
  eco: 'B21–B31, B51',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 c5',
  summary:
    "A toolkit against everything except 2.Nf3 and 3.d4. At club level you meet the Alapin, the Grand Prix, the Rossolimo, the Moscow and the Closed Sicilian more often than the Open Sicilian, so these lines score points. Najdorf and Dragon players (2...d6) will meet 3.Bb5+, while 2...Nc6 players (Sveshnikov, Accelerated Dragon) will meet the Rossolimo. The Alapin, Grand Prix and Closed lines here work after either second move.",
  ideas: [
    'Against the Alapin (2.c3), 2...Nf6 hits e4 at once. After 3.e5 Nd5 the knight is safe, and ...d6 later breaks up the e5 pawn before White gets a big centre.',
    'The other Alapin answer is 2...d5: after 3.exd5 Qxd5 the queen is safe because c3 took the knight\'s best square. Pin with ...Bg4, develop with ...e6, ...Nc6 and ...Be7, and target the isolated d4 pawn if White ever plays cxd4.',
    'Against the Grand Prix (2.Nc3 and 3.f4) use the fianchetto: ...g6, ...Bg7, ...e6 and ...Nge7. The knight on d4 is your best piece, and ...d5 is the main break.',
    'Against the Rossolimo (3.Bb5), do not fear doubled pawns. After Bxc6 dxc6 you get the bishop pair and fast development with ...e5, ...Qe7 and ...Nf6.',
    'Against 3.Bb5+ in the Moscow, block with ...Bd7 and trade. After ...Qxd7 you have no bad pieces left, and ...Nc6, ...e6 and ...d5 or ...Nf6 and ...g6 give a solid game.',
    'Against the Closed Sicilian (2.Nc3 and 3.g3), copy the fianchetto and play on the queenside with ...Rb8, ...b5 and ...b4, while the Nd4 outpost blocks White\'s centre.',
    'Most of these systems give White a quiet edge at best. Play natural developing moves and aim for the key break (...d5 or ...b5), not for refuting White.',
  ],
  opponentIdeas: [
    'The Alapin is the most principled try: c3 prepares d4 for a full pawn centre. After 2...Nf6 3.e5 Nd5 4.d4 White gets space; Black must strike with ...d6 before the pawn on e5 cramps the kingside.',
    'Grand Prix players want f4–f5 and a kingside attack with Qe1–h4. The 6.f5!? pawn push is a real attacking weapon, not a bluff.',
    'The Rossolimo and the Moscow are positional: White gives the bishop, castles quickly and plays c3 and d4 to open the centre while Black is still developing.',
    'The Closed Sicilian is a slow build-up with f4, Nf3, O-O and a later f4–f5. If you drift, the attack comes all at once.',
  ],
  structure:
    "There is no single structure. The Alapin with 2...Nf6 often gives White an isolated d-pawn or a pawn on e5 that Black attacks with ...d6. The 2...d5 Alapin gives an IQP after ...cxd4. The Grand Prix and Closed lines are reversed King's Indian structures where Black plays ...b5 on the queenside while White attacks with f-pawn and pieces. In the Rossolimo and Moscow Black gets the bishop pair or easy development against White's faster central play.",
  lines: [
    {
      name: 'Alapin, 2...Nf6 main line',
      moves: '1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. d4 cxd4 5. Nf3 Nc6 6. cxd4 d6 7. Bc4 Nb6 8. Bb5 dxe5 9. Nxe5 Bd7 10. Nxd7 Qxd7 11. Nc3 e6 12. O-O Be7',
      note: 'The classical answer: Black breaks up the centre with ...d6 and trades White\'s strong Ne5. The IQP on d4 is a long-term target.',
    },
    {
      name: 'Alapin, 2...d5 with ...Bg4',
      moves: '1. e4 c5 2. c3 d5 3. exd5 Qxd5 4. d4 Nf6 5. Nf3 Bg4 6. Be2 e6 7. O-O Nc6 8. Be3 cxd4 9. cxd4 Be7 10. Nc3 Qd6 11. h3 Bh5',
      note: 'Simple and sound. The queen retreats to d6 after Nc3, and Black plays against the isolated d4 pawn with ...O-O, ...Rd8 and ...Nd5.',
    },
    {
      name: 'Grand Prix, 5.Bc4 e6 6.f5',
      moves: '1. e4 c5 2. Nc3 Nc6 3. f4 g6 4. Nf3 Bg7 5. Bc4 e6 6. f5 Nge7 7. fxe6 dxe6 8. d3 O-O 9. O-O Nd4 10. Nxd4 Bxd4+ 11. Kh1',
      note: 'White opens the f-file, but Black keeps a solid wall on e6 and a monster bishop. The knight on d4 is exchanged only at the cost of letting the g7 bishop in.',
    },
    {
      name: 'Rossolimo, 3...g6 4.O-O Bg7 5.Re1 e5',
      moves: '1. e4 c5 2. Nf3 Nc6 3. Bb5 g6 4. O-O Bg7 5. Re1 e5 6. Bxc6 dxc6 7. d3 Qe7 8. Nbd2 Nf6 9. Nc4 Nd7 10. a4 O-O',
      note: 'Black clamps d4 with c5 and e5. The knight goes to d7 to cover e5 and b6, and ...f6 or ...b6 keeps the position closed for the bishop pair.',
    },
    {
      name: 'Moscow, 3.Bb5+ Bd7',
      moves: '1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. O-O Nf6 6. Re1 Nc6 7. c3 e6 8. d4 cxd4 9. cxd4 d5 10. e5 Ne4 11. Nbd2 Nxd2 12. Bxd2 Be7',
      note: 'The light-squared bishops are gone, so the French-like structure after ...d5 has no bad bishop for Black. Play ...O-O and ...Rc8 on the open file.',
    },
    {
      name: 'Smith-Morra declined, 3...Nf6',
      moves: '1. e4 c5 2. d4 cxd4 3. c3 Nf6 4. e5 Nd5 5. Nf3 Nc6 6. Bc4 Nb6 7. Bb3 d5 8. exd6 Qxd6 9. O-O Be6 10. Bxe6 Qxe6 11. Nxd4 Nxd4 12. cxd4 g6 13. Nc3 Bg7',
      note: 'Declining the gambit with 3...Nf6 reaches an Alapin (2.c3 Nf6) position. White gets an IQP, Black gets the d5 square and easy play.',
    },
    {
      name: 'Closed Sicilian, 6.f4 e6',
      moves: '1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. f4 e6 7. Nf3 Nge7 8. O-O O-O 9. Be3 Nd4 10. Qd2 Rb8',
      note: 'The knight on e7 stops f4–f5 and the knight on d4 blocks the centre. Black plans ...b5–b4 to open lines on the queenside.',
    },
  ],
  traps: [
    {
      name: 'Alapin: greedy 11...dxc3? 12.Nb5!',
      moves: '1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. d4 cxd4 5. Nf3 Nc6 6. Bc4 Nb6 7. Bb3 d5 8. exd6 Qxd6 9. O-O Be6 10. Na3 Bxb3 11. Qxb3 dxc3 12. Nb5 Qd7 13. Rd1',
      victim: 'black',
      explanation: "10.Na3 offers the c3 pawn. After 10...Bxb3 11.Qxb3, grabbing with 11...dxc3? opens lines while Black's king is still in the centre. 12.Nb5! hits the queen and eyes c7 and d6. After 12...Qd7 13.Rd1 the queen is pinned and White wins it or mates. Play 10...dxc3 11.Qe2 or simply 11...e6 instead.",
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. c3', note: 'The Alapin: White wants d2–d4 with a full centre. Choose 2...Nf6 (hit e4, then ...d6) or 2...d5 (open the centre with the queen on d5).' },
    { moves: '1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. d4 cxd4', note: 'After 5.cxd4 d6 or 5.Nf3 Nc6 Black attacks the e5 pawn next. Do not let White keep both d4 and e5 unchallenged.' },
    { moves: '1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. d4 cxd4 5. Nf3 Nc6 6. Bc4 Nb6 7. Bb3 d5 8. exd6 Qxd6 9. O-O Be6 10. Na3', note: 'The pawn on c3 is offered. 10...dxc3 11.Qe2 is fine for Black, but after 10...Bxb3 11.Qxb3 the grab 11...dxc3? loses to 12.Nb5!.' },
    { moves: '1. e4 c5 2. Nc3 Nc6 3. f4 g6 4. Nf3 Bg7 5. Bb5', note: 'Against the Bb5 Grand Prix, jump 5...Nd4!. If White takes, ...cxd4 hits the c3 knight, and if the bishop stays, ...Nxb5 wins the bishop pair.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. Bb5', note: 'The Rossolimo. 3...g6 with ...Bg7 and ...e5 is solid and active. Recapture ...dxc6 after Bxc6 to open the d-file and free the c8 bishop.' },
    { moves: '1. e4 c5 2. Nf3 d6 3. Bb5+', note: 'The Moscow. 3...Bd7 trades the bishops and gives an easy game. 3...Nd7 is sharper but needs precise theory.' },
    { moves: '1. e4 c5 2. d4 cxd4 3. c3 Nf6', note: 'Declining the Smith-Morra. After 4.e5 Nd5 you are in an Alapin, and 4.cxd4 Nxe4 simply grabs the e4 pawn.' },
  ],
  modelGames: [],
};

export default opening;
