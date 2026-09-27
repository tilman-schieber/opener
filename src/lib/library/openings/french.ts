import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'french-defense',
  name: 'French Defense',
  eco: 'C00–C19',
  side: 'black',
  group: 'black-e4',
  difficulty: 2,
  base: '1. e4 e6',
  summary:
    'Black prepares ...d5 and challenges White\'s centre with a rock-solid pawn chain. The price is a cramped position and a light-squared bishop hemmed in by e6; the reward is clear plans: undermine White\'s centre with ...c5 and ...f6 and counterattack on the queenside.',
  ideas: [
    'Attack the base of White\'s pawn chain: after e4–e5, hit d4 immediately with ...c5, adding pressure with ...Nc6, ...Qb6 and ...Nge7–f5 (or ...Nh6–f5).',
    'The second lever is ...f6, striking at the head of the chain on e5 — often after castling, to open the f-file for your rook.',
    'Solve the "French bishop" problem: trade it via ...b6 and ...Ba6, reroute it ...Bd7–e8–h5 or ...Bd7–b5, or free it with ...f6 and ...e5.',
    'In the Winawer, ...Bxc3+ gives White the bishop pair but ruined queenside pawns: close the position, play ...Qa5/...Qc7, ...Nbc6 and target c3/a3.',
    'Against the Tarrasch 3.Nd2, the ...c5 break gives you an isolated d-pawn or free piece play — keep pieces active and use the d5 knight outpost.',
    'In the Exchange Variation the position is symmetrical: develop quickly, pin with ...Bg4 and consider castling queenside for a pawn race.',
  ],
  opponentIdeas: [
    'Advance with e4–e5 to gain space and cramp Black, then use the kingside space for an attack (Qg4, f4–f5, h4).',
    'Keep the d4 pawn defended (c3, Nf3, Be3) so that the e5 spearhead stays alive.',
    'Hunt the f7/h7 area with Bd3 and Qg4/Qh5 while Black\'s pieces are busy on the queenside.',
  ],
  structure:
    'The typical closed French has White pawns on d4 and e5 against Black\'s d5 and e6: White has kingside space, Black queenside space. Black always attacks the base (d4) with ...c5 and the head (e5) with ...f6. Open lines (Tarrasch with ...c5 or the Classical with ...dxe4) lead to isolated-pawn or free piece play.',
  lines: [
    {
      name: 'Advance Variation, 5...Qb6 6.Be2',
      moves: '1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. Be2 cxd4 7. cxd4 Nh6 8. Nc3 Nf5 9. Na4 Qa5+ 10. Bd2 Bb4 11. Bc3 b5 12. a3 Bxc3+ 13. Nxc3 b4',
      note: 'Black piles up on d4 with ...Qb6, ...Nc6 and ...Nh6–f5 and grabs queenside space.',
    },
    {
      name: 'Advance, Milner-Barry Gambit',
      moves: '1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. Bd3 cxd4 7. cxd4 Bd7 8. O-O Nxd4 9. Nxd4 Qxd4 10. Nc3 a6 11. Qe2 Ne7 12. Kh1 Nc6 13. f4',
      note: 'Black accepts the pawn with 7...Bd7! first (never 7...Nxd4?). White has development for the pawn.',
    },
    {
      name: 'Winawer, Poisoned Pawn',
      moves: '1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4 Qc7 8. Qxg7 Rg8 9. Qxh7 cxd4 10. Ne2 Nbc6 11. f4 Bd7 12. Qd3 dxc3',
      note: 'Black gives up the kingside pawns for a strong centre and a king that often goes to the queenside.',
    },
    {
      name: 'Classical, Steinitz 4.e5',
      moves: '1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3 Nc6 7. Be3 cxd4 8. Nxd4 Bc5 9. Qd2 O-O 10. O-O-O a6 11. h4',
      note: 'Opposite-side castling: Black attacks with ...b5–b4 and ...Qc7/...Qb6, White with h4–h5 and f5.',
    },
    {
      name: 'Tarrasch, 3...c5 4.exd5 Qxd5',
      moves: '1. e4 e6 2. d4 d5 3. Nd2 c5 4. exd5 Qxd5 5. Ngf3 cxd4 6. Bc4 Qd6 7. O-O Nf6 8. Nb3 Nc6 9. Nbxd4 Nxd4 10. Nxd4 a6 11. Re1 Qc7 12. Bb3 Bd6',
      note: 'An open position: White has a small lead in development, Black a healthy structure and the bishop pair.',
    },
    {
      name: 'Exchange Variation',
      moves: '1. e4 e6 2. d4 d5 3. exd5 exd5 4. Nf3 Bd6 5. Bd3 Ne7 6. O-O O-O 7. Re1 Bg4 8. Nbd2 Nbc6 9. c3 Qd7 10. Nf1 Rae8',
      note: 'Symmetrical but not dead: the ...Bg4 pin and the open e-file give Black easy play.',
    },
  ],
  traps: [
    {
      name: 'Advance: the Bb5+ discovery',
      moves: '1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. Bd3 cxd4 7. cxd4 Nxd4 8. Nxd4 Qxd4 9. Bb5+',
      victim: 'black',
      explanation: 'Grabbing the pawn immediately loses the queen: the bishop check uncovers the White queen on d1 against Black\'s queen on d4. Play 7...Bd7 first, then ...Nxd4.',
    },
  ],
  positions: [
    { moves: '1. e4 e6', note: 'The French. Black will play ...d5 next move. Your light-squared bishop is locked in — plan how to free it.' },
    { moves: '1. e4 e6 2. d4 d5 3. e5', note: 'Advance Variation: attack d4 at once with 3...c5, then ...Nc6 and ...Qb6. The e5 pawn cramps you, so undermine its support.' },
    { moves: '1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6', note: 'Maximum pressure on d4 and b2. White\'s bishop cannot leave c1 easily because b2 hangs.' },
    { moves: '1. e4 e6 2. d4 d5 3. Nc3 Bb4', note: 'Winawer: the pin threatens ...dxe4. After 4.e5 c5 5.a3 Bxc3+ 6.bxc3 White has the bishops, you have the better structure.' },
    { moves: '1. e4 e6 2. d4 d5 3. Nc3 Nf6', note: 'Classical: 4.e5 Nfd7 (Steinitz) or 4.Bg5 (pinning). Always follow with ...c5 to hit d4.' },
    { moves: '1. e4 e6 2. d4 d5 3. Nd2', note: 'Tarrasch: the knight avoids the Winawer pin but blocks the c1 bishop. 3...c5 challenges the centre straight away.' },
    { moves: '1. e4 e6 2. d4 d5 3. exd5 exd5', note: 'Exchange: your bishop on c8 is free now! Develop fast and use the ...Bg4 pin.' },
  ],
  modelGames: [],
};

export default opening;
