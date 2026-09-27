import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'sicilian-sveshnikov',
  name: 'Sicilian Sveshnikov',
  eco: 'B33',
  side: 'black',
  group: 'black-e4',
  difficulty: 3,
  base: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5',
  summary:
    'Black immediately kicks the d4 knight with ...e5, accepting a backward d6 pawn and a hole on d5 in return for tempo, space and very active pieces. In the main lines Black even accepts doubled f-pawns — the famous ...gxf6 structure — to gain the bishop pair and a dynamic ...f5 break. A favourite of Kramnik and Carlsen.',
  ideas: [
    'Your key break is ...f5: it challenges the e4 square, opens the f-file and activates the bishop pair. In the 9.Bxf6 gxf6 lines, play it immediately with 10...f5.',
    'Neutralise the d5 knight: trade it with ...Bxd5 or ...Ne7 at the right moment, or leave it and attack around it — a knight on d5 does not attack anything by itself.',
    'The dark-squared bishop belongs on g7 or g5 (via ...Be7–g5 after the f6 knight is traded) — trading it for White\'s knight on c3/e3 kills the d5 outpost.',
    'Use your queenside pawns: ...b5 fixes White\'s a3 knight offside, and ...b4 or ...a5–b4 can harass the c3 pawn later.',
    'In the 9.Nd5 lines, answer the knight on d5 with ...Be7 and ...Bxf6/...Bg5; typical plans are ...O-O, ...Bg5, ...a5 and ...Rb8 supporting ...b4.',
    'Against 7.Nd5, play ...Nxd5 and reroute the knight (...Nb8–d7 or ...Ne7–g6), then prepare ...f5 with ...Be7 and ...O-O.',
  ],
  opponentIdeas: [
    'Occupy d5 with a knight (often after Bg5xf6) and keep it there forever.',
    'Bring the a3 knight back into play via c2–e3 (or with c4 breaks), aiming for d5 again.',
    'Attack the weakened b5 pawn and Black\'s queenside with a4 and c4.',
    'In the 7.Nd5 line, use the space from d5 and c4 for a queenside pawn push.',
  ],
  structure:
    'After ...e5 and ...d6 Black has a backward d-pawn and a hole on d5, but controls d4 and f4 and has lots of space. In the 9.Bxf6 lines Black recaptures ...gxf6: the doubled f-pawns are actually useful, supporting ...f5 and controlling e5 and g5.',
  lines: [
    {
      name: '9.Bxf6 gxf6 10.Nd5 f5 11.c3',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5 f5 11. c3 Bg7 12. exf5 Bxf5 13. Nc2 O-O 14. Nce3 Be6 15. Bd3 f5',
      note: 'The critical main line: White rebuilds with Nc2–e3; Black gets the bishop pair and ...f5 kingside play.',
    },
    {
      name: '9.Bxf6 gxf6 10.Nd5 f5 11.Bd3',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5 f5 11. Bd3 Be6 12. O-O Bxd5 13. exd5 Ne7 14. c3 Bg7',
      note: 'Black trades the d5 knight and leaves White with a closed pawn on d5; the g7 bishop and ...e4 or ...f4 give counterplay.',
    },
    {
      name: '9.Nd5 Be7',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Nd5 Be7 10. Bxf6 Bxf6 11. c3 O-O 12. Nc2 Bg5 13. a4 bxa4 14. Rxa4 a5 15. Bc4 Rb8',
      note: 'The positional main line: the dark-squared bishop comes to g5 and Black presses on the b-file.',
    },
    {
      name: '7.Nd5 avoidance',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Nd5 Nxd5 8. exd5 Nb8 9. a4 Be7 10. Be2 O-O 11. O-O Nd7 12. Kh1 a6 13. Na3 f5 14. c4',
      note: 'White avoids the doubled f-pawn theory. Black reroutes the knight to d7 and plays ...f5 with kingside chances.',
    },
    {
      name: '6.Nb3 sideline',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Nb3 Bb4 7. Bd3 d5 8. exd5 Nxd5 9. Bd2 Nxc3 10. bxc3 Be7 11. O-O O-O',
      note: 'The retreat gives Black time for ...Bb4 and ...d5 — the dream freeing break comes at once.',
    },
  ],
  traps: [
    {
      name: '6...a6? 7.Nd6+',
      moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 a6 7. Nd6+ Bxd6 8. Qxd6',
      victim: 'black',
      explanation: 'Always play 6...d6 first! After 6...a6? the knight jumps into d6 with check, grabs the bishop pair and paralyses Black\'s dark squares; the queen on d6 is a monster.',
    },
  ],
  positions: [
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5', note: 'The Sveshnikov. The d4 knight must move; 6.Ndb5 (eyeing d6) is the main line, 6.Nb3/6.Nf5 are harmless.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6', note: '...d6 stops Nd6+. White now plays 7.Bg5 (fighting for d5) or 7.Nd5 (avoiding the main theory).' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5', note: '...b5 keeps the a3 knight offside and threatens ...b4. White chooses between 9.Bxf6 and 9.Nd5.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5', note: 'Strike with 10...f5! at once. The doubled pawns become a mobile mass and the bishops will be strong.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Nd5', note: 'Play 9...Be7 and trade on f6 with the bishop; later ...Bg5 exchanges your "bad" bishop for White\'s good one.' },
    { moves: '1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Nd5', note: 'Take with 7...Nxd5 8.exd5 and retreat ...Nb8 (or ...Ne7). The centre is closed; your plan is ...Be7, ...O-O and ...f5.' },
  ],
  modelGames: [],
};

export default opening;
