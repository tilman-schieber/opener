import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'albin-countergambit',
  name: 'Albin Countergambit',
  eco: 'D08–D09',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 d5 2. c4 e5',
  summary:
    'Black meets the Queen\'s Gambit with a counter-gambit: after 3.dxe5 d4 the pawn on d4 cramps White and Black gets fast development, often with opposite-side castling and a kingside pawn storm. Objectively White keeps a small edge with accurate play, but the positions are unfamiliar to most 1.d4 players and full of tricks, including the famous Lasker Trap with an underpromotion.',
  ideas: [
    'The d4 pawn is the heart of the opening. It takes away c3 and e3 from White. Protect it with ...Nc6 and the queen, and never trade it off cheaply.',
    'Win back the e5 pawn when it is convenient, usually with ...Nge7–g6 or ...Nc6xe5. Development comes first.',
    'Castle long and attack: ...Be6, ...Qd7, ...O-O-O, then ...h5–h4 and ...Bh3 to trade White\'s fianchettoed bishop.',
    'Against an early e3, the check ...Bb4+ is strong. After Bd2 you take on e3, and 6.Bxb4?? runs into the Lasker Trap.',
    'The move ...d4–d3 can be a strong lever when White has played e3 or g3, cutting the white position in two.',
    'When White plays g3 and Bg2, exchange that bishop with ...Bh3. Without it the white king is much weaker.',
  ],
  opponentIdeas: [
    'The main line is 4.Nf3 Nc6 5.g3, followed by Bg2, O-O and Nbd2–b3 to attack d4. Then Qa4 and b2–b4 start a queenside attack against your long castle.',
    '5.a3 prepares b2–b4 and Bb2 to undermine d4 quickly. Be ready for a queenless middlegame where your active pieces matter more than the pawn.',
    'Many players avoid the gambit with 3.e3, 3.Nc3 or 3.cxd5. You get easy development, but no sharp play.',
  ],
  structure:
    'After 3.dxe5 d4 White has an extra e5 pawn and a c4 pawn, while Black\'s d4 wedge splits White\'s position and blocks the e- and c-pawns. The e5 pawn usually falls sooner or later. The key question is whether White can undermine d4 with e3, Nb3 or b4 before Black\'s kingside attack arrives. If d4 survives, Black has a comfortable space advantage in the centre.',
  lines: [
    {
      name: 'Main line, 5.g3 Be6 with long castling',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3 Be6 6. Nbd2 Qd7 7. Bg2 O-O-O 8. O-O Bh3 9. Qa4 Bxg2 10. Kxg2 h5 11. h4 Qg4 12. Nb3',
      note: 'Opposite-side castling. Black trades the g2 bishop and pushes the h-pawn, White attacks on the queenside with Qa4, Nb3 and b4.',
    },
    {
      name: '5.a3 with ...Nge7–g6',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. a3 Nge7 6. b4 Ng6 7. Bb2 a5 8. b5 Ncxe5 9. Qxd4 Nxf3+ 10. gxf3 Qxd4 11. Bxd4 Be6 12. e3 Nh4 13. Nd2 O-O-O',
      note: 'White wins the d4 pawn but has to trade queens and accept broken kingside pawns. Black is active and the f3 pawn is a target.',
    },
    {
      name: '4.e3?! Bb4+ 5.Bd2 dxe3 (Lasker Trap line)',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3 6. fxe3 Qh4+ 7. g3 Qe4 8. Nf3 Bxd2+ 9. Nbxd2 Qxe3+ 10. Qe2 Qxe2+ 11. Bxe2 Nc6 12. O-O-O Nge7 13. Nb3',
      note: '6.fxe3 is the only good move. Black regains the pawn with checks and reaches an equal endgame where White\'s e5 pawn is weak.',
    },
    {
      name: 'Spassky Variation, 4.e4',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. e4 Nc6 5. f4 f6 6. Nf3 fxe5 7. Bd3 Bg4 8. O-O Nf6 9. h3 Bxf3 10. Qxf3 Be7',
      note: 'White supports the centre with e4 and f4, but the d4 pawn becomes a protected passed pawn. Black strikes back with ...f6 and develops easily.',
    },
    {
      name: 'Declined, 3.e3',
      moves: '1. d4 d5 2. c4 e5 3. e3 exd4 4. exd4 Nf6 5. Nc3 Bb4 6. Bd3 O-O 7. cxd5 Nxd5 8. Nge2 Nc6 9. O-O Bg4 10. Qc2 h6',
      note: 'The gambit is avoided and White gets an isolated d-pawn. Black blockades d5 and develops freely. Chances are equal.',
    },
    {
      name: 'Declined, 3.Nc3',
      moves: '1. d4 d5 2. c4 e5 3. Nc3 exd4 4. Qxd4 Nc6 5. Qxd5 Be6 6. Qxd8+ Rxd8 7. Bf4 Bxc4 8. Rc1 Bd6 9. Bxd6 cxd6 10. g3 Nf6',
      note: 'White grabs d5, but ...Nc6 and ...Be6 win the tempo back and ...Bxc4 restores material. The endgame is level.',
    },
  ],
  traps: [
    {
      name: 'Lasker Trap: 6.Bxb4?? exf2+ 7.Ke2 fxg1=N+',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3 6. Bxb4 exf2+ 7. Ke2 fxg1=N+ 8. Rxg1 Bg4+',
      victim: 'white',
      explanation: '6.Bxb4?? grabs the bishop, but ...exf2+ forks king and knight. After 7.Ke2 the pawn promotes on g1 to a knight with check. A queen would simply be taken. After 8.Rxg1 Bg4+ wins the white queen, which is facing the black queen on the open d-file. After 8.Ke1 Qh4+ 9.Kd2 Nc6 Black is a piece up with a crushing attack.',
    },
    {
      name: 'The d4 pawn is poisoned: 5.Nxd4? Qxd4',
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. Nxd4 Qxd4',
      victim: 'white',
      explanation: 'The d4 pawn looks loose, but it is protected twice. After 5.Nxd4? Qxd4 the queens face each other and 6.Qxd4 Nxd4 leaves White a whole knight down for a pawn.',
    },
  ],
  positions: [
    {
      moves: '1. d4 d5 2. c4 e5',
      note: 'The Albin. 3.dxe5 is the only critical reply. 3.e3, 3.Nc3 and 3.cxd5 are playable but give Black an easy game.',
    },
    {
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4',
      note: 'The d4 pawn cramps White. 4.Nf3 is the main line, 4.e3? walks into ...Bb4+ and the Lasker Trap, and 4.e4 builds a big but static centre.',
    },
    {
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6',
      note: 'Black protects d4 and eyes e5. White chooses between 5.g3 (main line), 5.a3 with b4, and 5.Nbd2 with Nb3.',
    },
    {
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3',
      note: 'Critical moment. 6.fxe3 Qh4+ 7.g3 Qe4 is equal. 6.Bxb4?? loses to the Lasker Trap: ...exf2+ and ...fxg1=N+.',
    },
    {
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3 Be6 6. Nbd2 Qd7 7. Bg2 O-O-O',
      note: 'Opposite-side castling. Your plan is ...Bh3 to trade the g2 bishop, then ...h5–h4. White goes for Qa4, Nb3 and b4 against your king.',
    },
    {
      moves: '1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3 Be6 6. Nbd2 Qd7 7. Bg2 O-O-O 8. O-O Bh3 9. Qa4',
      note: 'Trade on g2 with ...Bxg2 and play ...h5 next. After 9...Bxg2 10.Kxg2 the natural ...Kb8? is a mistake: 11.Nb3 and White wins the d4 pawn after the queen trade on d7.',
    },
  ],
  modelGames: [],
};

export default opening;
