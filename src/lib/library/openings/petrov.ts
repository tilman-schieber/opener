import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'petrov-defense',
  name: 'Petrov Defense',
  eco: 'C42–C43',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nf6',
  summary:
    'Instead of defending e5, Black counterattacks e4. The Petrov (or Russian Game) leads to symmetrical, very solid positions and is a favourite drawing weapon at the top level — but it is also full of small tactical traps for both sides. Precise move order matters more than deep theory.',
  ideas: [
    'After 3.Nxe5, do NOT take on e4 immediately: kick the knight with 3...d6 first, then 4...Nxe4 is safe.',
    'In the main line (5.d4 d5 6.Bd3) put the knight on e4 as an outpost, develop with ...Nc6 (or ...Bd6), ...Be7 and ...O-O, and support the e4 knight with ...Bf5 or ...f5.',
    'When White plays c4 against your d5 pawn, answer with ...Nb4 to hit the d3 bishop, or trade on c3 and keep a solid centre.',
    'Use the half-open e-file: ...Re8 and ...Bf8 are typical regrouping moves once the pieces are traded.',
    'Against 5.Nc3 (White castles long), keep it simple: ...Nxc3, ...Be7, ...Nc6, ...Be6, ...Qd7 and castle — or castle long yourself to avoid a pawn storm.',
    'Against 3.d4, the most solid reply is 3...Nxe4 4.Bd3 d5, then ...Nd7 to exchange White\'s e5 knight.',
  ],
  opponentIdeas: [
    'Use the slight lead in development: pressure the e4 knight with Re1, c4 and Nc3.',
    'In the 5.Nc3 line, castle queenside and throw the kingside pawns forward (Be3, Qd2, O-O-O, h4).',
    'Punish Black\'s natural-looking mistakes (3...Nxe4?, or pinning the e4 knight with Qe2).',
    'Try the Cochrane Gambit (4.Nxf7) for a wild attack against the uncastled king.',
  ],
  structure:
    'Usually symmetrical: after 3.Nxe5 d6 4.Nf3 Nxe4 5.d4 d5 both sides have a d-pawn and open e-file. Black\'s e4 knight is the focal point. Imbalances only arise when White plays c4 or castles long.',
  lines: [
    {
      name: 'Classical main line, 5.d4 d5 6.Bd3',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Nc6 7. O-O Be7 8. c4 Nb4 9. Be2 O-O 10. Nc3 Bf5 11. a3 Nxc3 12. bxc3 Nc6 13. Re1 Re8 14. Bf4',
      note: 'The classical Petrov: ...Nb4 kicks the bishop, then Black trades on c3 and settles into a solid position.',
    },
    {
      name: '5.Nc3, opposite-side castling',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Nc3 Nxc3 6. dxc3 Be7 7. Be3 Nc6 8. Qd2 Be6 9. O-O-O Qd7 10. Kb1',
      note: 'White doubles the c-pawns to castle long quickly. Black must be careful about the kingside pawn storm.',
    },
    {
      name: '5.Qe2 queen trade',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Qe2 Qe7 6. d3 Nf6 7. Bg5 Qxe2+ 8. Bxe2 Be7 9. Nc3 c6 10. O-O-O Na6',
      note: 'A simple, drawish endgame. Answer the pin with 5...Qe7 at once.',
    },
    {
      name: 'Steinitz 3.d4',
      moves: '1. e4 e5 2. Nf3 Nf6 3. d4 Nxe4 4. Bd3 d5 5. Nxe5 Nd7 6. Nxd7 Bxd7 7. O-O Bd6 8. c4 c6 9. Nc3 Nxc3 10. bxc3 dxc4 11. Bxc4 O-O 12. Qh5',
      note: 'Black trades off the e5 knight and gets a solid, equal position.',
    },
    {
      name: 'Cochrane Gambit, 4.Nxf7',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nxf7 Kxf7 5. Nc3 c5 6. Bc4+ Be6 7. Bxe6+ Kxe6 8. d4 Kf7 9. dxc5 Nc6',
      note: 'White gives a knight for two pawns and a king hunt. Stay calm: ...c5 and ...Nc6 blunt the centre and your extra piece should tell.',
    },
    {
      name: '5.c4 space grab',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. c4 Nc6 6. Nc3 Nxc3 7. dxc3 Be7 8. Be3 O-O 9. Qd2 Bf5 10. Be2 Re8 11. O-O Bf6',
      note: 'White clamps d5 with c4 and often castles long. Trade on c3, develop naturally and put the rook on e8.',
    },
    {
      name: '3.Nc3 Four Knights (Symmetrical)',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nc3 Nc6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Bxc3 8. bxc3 Qe7 9. Re1 Nd8 10. d4 Ne6',
      note: 'With 3...Nc6 you transpose to the Four Knights. The Metger unpin ...Qe7, ...Nd8 and ...Ne6 breaks the annoying Bg5 pin.',
    },
    {
      name: '3.Bc4 Nxe4 4.Nc3 (Boden-Kieseritzky Gambit)',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Bc4 Nxe4 4. Nc3 Nxc3 5. dxc3 f6 6. O-O Qe7 7. Re1 d6 8. Nd4 c5 9. Ne2 Be6 10. Bxe6 Qxe6',
      note: 'White gives the e4 pawn for development. 5...f6 blunts both the knight and the bishop. Keep the pawn and trade the light-squared bishops.',
    },
  ],
  traps: [
    {
      name: '3...Nxe4? 4.Qe2 Nf6?? 5.Nc6+',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nxe4 4. Qe2 Nf6 5. Nc6+',
      victim: 'black',
      explanation: 'Copying White with 3...Nxe4? is a mistake: after 4.Qe2 the knight is attacked, and retreating 4...Nf6?? loses the queen to the discovered check 5.Nc6+. Even the best try 4...Qe7 5.Qxe4 d6 6.d4 leaves Black a pawn down. Always play 3...d6 first.',
    },
    {
      name: 'The e-file pin: 5.Qe2 d5?? 6.d3',
      moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Qe2 d5 6. d3',
      victim: 'black',
      explanation: 'The e4 knight is pinned against the king on e8, and 6.d3 attacks it — Black loses a piece. Answer 5.Qe2 with 5...Qe7 to break the pin.',
    },
  ],
  positions: [
    { moves: '1. e4 e5 2. Nf3 Nf6', note: 'The Petrov: Black counterattacks e4 instead of defending e5.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5', note: 'Don\'t take back on e4 yet! 3...d6 first kicks the knight; only then play ...Nxe4.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4', note: 'The knight on e4 is Black\'s pride. Watch for Qe2 pins on the e-file — meet them with ...Qe7.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3', note: 'Main line: 6...Nc6 (hitting d4) or 6...Bd6. Castle quickly and support e4.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Nc3', note: 'White offers to trade and castle long. 5...Nxc3 6.dxc3 and develop — mind the pawn storm.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. d4', note: 'Steinitz: 3...Nxe4 4.Bd3 d5 5.Nxe5 Nd7 is the safest way to equalise.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nc6', note: 'This is the Stafford Gambit, not the Petrov. It gives up the pawn on purpose and has its own entry in the library.' },
    { moves: '1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nxf7', note: 'Cochrane Gambit: take the knight with 4...Kxf7 and bring the king to safety — White gets only two pawns for the piece.' },
  ],
  modelGames: [],
};

export default opening;
