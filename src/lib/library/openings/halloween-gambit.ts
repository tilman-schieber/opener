import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'halloween-gambit',
  name: 'Halloween Gambit',
  eco: 'C47',
  side: 'white',
  group: 'white-e4',
  difficulty: 2,
  base: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5',
  summary:
    'White sacrifices a whole knight on move four to chase Black\'s knights back home with d4, e5 and sometimes f4. Objectively it is dubious: a well-prepared defender who returns material at the right moment keeps an edge. In practice it is dangerous, because the pawn centre and lead in space are real, and one natural-looking move can already lose.',
  ideas: [
    'After 4...Nxe5 5.d4 hit the knight at once. Your pawns do the work: d4, e5 and d5 kick Black\'s knights back to g8 and g6.',
    'Against 5...Ng6 play 6.e5 Ng8 and then 7.Bc4 or 7.h4. Bc4 aims at f7, h4–h5 harasses the g6 knight.',
    'Against 5...Nc6 push 6.d5 Ne5 7.f4 Ng6 8.e5 Ng8 9.d6. The d6 pawn splits Black\'s position and makes ...d7 and ...Bf8 hard to develop.',
    'Keep the queen active on e2 or f3. Qe2 pins along the e-file once Black\'s king is still on e8, and Qf3 hits f7.',
    'Castle quickly, usually short after Bc4, and bring a rook to e1. The e-file and f7 are your targets.',
    'Material does not matter while Black\'s pieces are on the back rank. If Black gives the piece back, take the simple, active position.',
  ],
  opponentIdeas: [
    'Return the piece at the right moment. After 5.d4 Nc6 6.d5 Bb4! 7.dxc6 Nxe4 Black is fine and White has nothing special.',
    'Keep the extra knight and play ...d5 or ...d6 to break the white centre, followed by ...Be6 and ...Qd7.',
    'Refuse the offer with 4...Nxe4 or 4...Bb4. Both lead to normal positions where White has regained material.',
  ],
  structure:
    'In the accepted lines White has no knight on the kingside but pawns on d4 and e5 (or d5, e5 and f4). Black\'s knights sit on g6 and g8 and the bishops are blocked in. White plays for space, the e-file and f7. If Black manages ...d6 or ...d5 and develops the light-squared bishop, the extra piece starts to count. If not, the white pawns roll forward.',
  lines: [
    {
      name: 'Main line, 5...Ng6 6.e5 Ng8 7.Bc4',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Ng6 6. e5 Ng8 7. Bc4 d5 8. Bxd5 N8e7 9. Bg5 c6 10. Bb3 h6 11. Be3 Nf5 12. O-O',
      note: 'White wins a second pawn back and keeps the bishop pointed at f7. Black is still better, but has to untangle the knights first.',
    },
    {
      name: '5...Nc6 6.d5 and the d6 wedge',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5 Ne5 7. f4 Ng6 8. e5 Ng8 9. d6 cxd6 10. exd6 Qf6 11. Qe2+ Qe6 12. Nb5 Qxe2+ 13. Bxe2 Kd8 14. f5',
      note: 'White gives the d-pawn to cripple Black\'s development. Even after the queen trade the d6 pawn and the Nb5–c7 threats give White full compensation.',
    },
    {
      name: '7.h4, harassing the g6 knight',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Ng6 6. e5 Ng8 7. h4 d5 8. h5 N6e7 9. g4 Be6 10. f4 f5 11. g5',
      note: 'The pawn storm version: White drives the knight back again and grabs space on the kingside. Very risky, very direct.',
    },
    {
      name: 'Black\'s best try, 5...Nc6 6.d5 Bb4',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5 Bb4 7. dxc6 Nxe4 8. Qd4 Qe7 9. Be3 O-O 10. Bd3 Nxc3 11. bxc3 Bd6',
      note: 'Black gives the piece back and counterattacks e4. Material is level and Black is slightly more comfortable. Know this line so you are not surprised.',
    },
    {
      name: 'Declined, 4...Nxe4',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe4 5. Nxe4 Nxe5 6. d4 Ng6 7. d5 f5 8. Ng5 h6 9. Qe2+ Qe7 10. Nf3 Qxe2+ 11. Bxe2',
      note: 'Black mirrors the capture. White gains space with d4–d5 and has the easier game after the queen trade.',
    },
    {
      name: 'Declined, 4...Bb4',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Bb4 5. Nxc6 dxc6 6. Bd3 O-O 7. h3 Re8 8. O-O',
      note: 'This line is Four Knights play with a pawn missing for Black. White is simply a pawn up for some development.',
    },
  ],
  traps: [
    {
      name: 'Pinned queen: 12...Bxd6? 13.Nxd6+',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5 Ne5 7. f4 Ng6 8. e5 Ng8 9. d6 cxd6 10. exd6 Qf6 11. Qe2+ Qe6 12. Nb5 Bxd6 13. Nxd6+',
      victim: 'black',
      explanation: 'Grabbing the d6 pawn looks natural, but after 13.Nxd6+ the queen on e6 cannot take back. It is pinned to the king by the white queen on e2. Black just loses the bishop, and 13...Kd8? 14.Qxe6 fxe6 15.Nf7+ even forks king and rook.',
    },
    {
      name: 'Endgame fork: 14...Bxd6? 15.Nxd6',
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5 Ne5 7. f4 Ng6 8. e5 Ng8 9. d6 cxd6 10. exd6 Qf6 11. Qe2+ Qe6 12. Nb5 Qxe2+ 13. Bxe2 Kd8 14. f5 Bxd6 15. Nxd6 Ne5 16. Bf4 f6 17. Bxe5 fxe5 18. Nf7+',
      victim: 'black',
      explanation: 'The queens are gone and the d6 pawn still looks free. But 15.Nxd6 attacks f7, the g6 knight is hit by f5, and after Bf4 and Bxe5 the knight forks king and rook with Nf7+. White wins the exchange and more.',
    },
  ],
  positions: [
    {
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5',
      note: 'The Halloween Gambit. White gives a knight for a pawn and the centre. 4...Nxe5 accepts, 4...Nxe4 and 4...Bb4 lead to calmer play.',
    },
    {
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4',
      note: 'The knight has to move. 5...Ng6 is the main line, 5...Nc6 invites 6.d5. Both retreats allow White to gain time with pawn moves.',
    },
    {
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Ng6 6. e5 Ng8',
      note: 'Both black knights are back on the kingside with no good squares. Choose between 7.Bc4 (pressure on f7) and 7.h4 (kick the g6 knight again).',
    },
    {
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5',
      note: 'The knight must move again. 6...Ne5 7.f4 gives White a huge pawn centre. 6...Bb4! is the best reply: Black gives back the piece and hits e4.',
    },
    {
      moves: '1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5 Nxe5 5. d4 Nc6 6. d5 Ne5 7. f4 Ng6 8. e5 Ng8 9. d6',
      note: 'The d6 wedge. Black\'s bishop on f8 and the d7 pawn are stuck. After ...cxd6 exd6 the pawn on d6 is poisoned in many lines because of Qe2+ pins and Nb5 forks.',
    },
  ],
  modelGames: [],
};

export default opening;
