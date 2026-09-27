import type { LibraryOpening } from '../types.ts';

const opening: LibraryOpening = {
  id: 'queens-indian-defense',
  name: "Queen's Indian Defense",
  eco: 'E12–E19',
  side: 'black',
  group: 'black-d4',
  difficulty: 2,
  base: '1. d4 Nf6 2. c4 e6 3. Nf3 b6',
  summary:
    'When White avoids the Nimzo-Indian with 3.Nf3, Black fianchettoes the queen\'s bishop to fight for e4 and the long diagonal. It is solid and harmonious: Black controls the light squares with pieces rather than pawns and chooses the right moment for ...c5 or ...d5.',
  ideas: [
    'Fight for e4 and the long diagonal: ...Bb7 (or ...Ba6 first), ...Ne4 and sometimes ...f5 make e4 Black\'s square.',
    'Against the fianchetto (4.g3), 4...Ba6 attacks c4 and provokes b3, which weakens the long diagonal; the bishop can return to b7 later.',
    'The check ...Bb4+ followed by ...Be7 lures White\'s bishop to d2 where it is less active (then ...c6 and ...d5 in the main line).',
    'Trade pieces with ...Ne4 to ease any pressure: after Nxe4/Qxc3 swaps, Black usually equalises comfortably.',
    'Central breaks: ...c5 (hitting d4) and ...d5 are the standard freeing moves once development is complete.',
    'Against 4.a3 (Petrosian), play ...Bb7 and ...d5; after cxd5 Nxd5 recapture with the knight and meet e4 with ...c5 pressure on d4.',
  ],
  opponentIdeas: [
    'Neutralise the b7-bishop with g3/Bg2 and fight for e4 with Nc3, Qc2 and eventually e4.',
    'The Petrosian 4.a3 prevents ...Bb4 so that Nc3 and e4 can follow, building a big centre.',
    'Quiet 4.e3 with Bd3 aims for a later e4 or a kingside attack after ...d5.',
    'Grab space with d5 in some lines to cut the b7-bishop off.',
  ],
  structure:
    'Black\'s pawns on b6 and e6 support a fianchettoed bishop on b7 that controls e4 and d5. The d- and c-pawns stay flexible for ...d5 or ...c5. If White achieves e4 without concessions, White gets more space; if Black controls e4, the position is at least equal.',
  lines: [
    {
      name: 'Fianchetto 4.g3 Ba6, main line',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6 5. b3 Bb4+ 6. Bd2 Be7 7. Bg2 c6 8. Bc3 d5 9. Ne5 Nfd7 10. Nxd7 Nxd7 11. Nd2 O-O 12. O-O',
      note: 'The modern main line: ...c6 and ...d5 give a solid centre, ...c5 or ...b5 follow.',
    },
    {
      name: 'Fianchetto 4.g3 Bb7, classical',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3 Ne4 8. Qc2 Nxc3 9. Qxc3 c5 10. Rd1 d6 11. b3 Bf6 12. Bb2 Qe7',
      note: 'Black trades on c3 and sets up a solid "hedgehog-lite" with ...c5 and ...d6.',
    },
    {
      name: 'Petrosian 4.a3',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. a3 Bb7 5. Nc3 d5 6. cxd5 Nxd5 7. Qc2 Nxc3 8. bxc3 Be7 9. e4 O-O 10. Bd3 c5 11. O-O cxd4 12. cxd4 Nc6 13. Bb2 Rc8',
      note: 'White gets a big centre; Black puts pressure on d4 and the c-file.',
    },
    {
      name: '4.e3 quiet system',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. e3 Bb7 5. Bd3 Be7 6. O-O O-O 7. b3 d5 8. Bb2 c5 9. Nbd2 cxd4 10. exd4 Nc6 11. a3 Rc8',
      note: 'A calm, symmetrical-ish setup; Black gets pressure on d4 and a comfortable game.',
    },
    {
      name: '4.Nc3 Bb4 (Nimzo-style)',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Nc3 Bb4 5. Bg5 Bb7 6. e3 h6 7. Bh4 g5 8. Bg3 Ne4 9. Qc2 Bxc3+ 10. bxc3 d6 11. Bd3 f5 12. d5 Nc5',
      note: 'Transposes to a Nimzo-Indian: Black breaks the pin and grabs e4.',
    },
  ],
  traps: [
    {
      name: '9.Ng5 and the h7 mate',
      moves:
        '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3 Ne4 8. Qc2 Nxc3 9. Ng5 Nxe2+ 10. Kh1 Bxg2+ 11. Kxg2 Nxd4 12. Qxh7#',
      victim: 'black',
      explanation:
        '9.Ng5?! threatens Qxh7# and Bxb7. Black is fine after 9...Nxe2+ 10.Kh1 Bxg2+ 11.Kxg2 Bxg5!, removing the attacker. Greedy 11...Nxd4?? hitting the queen allows 12.Qxh7 mate.',
    },
  ],
  positions: [
    { moves: '1. d4 Nf6 2. c4 e6 3. Nf3 b6', note: 'The Queen\'s Indian: the bishop goes to b7 (or a6) to control e4. White chooses between g3, a3, e3 and Nc3.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6', note: 'The bishop hits c4. After 5.b3 the long diagonal is weakened; 5...Bb4+ lures White\'s bishop to d2.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3', note: 'White prepares Qc2 and e4. Answer with 7...Ne4: trading on c3 keeps e4 under control.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. a3', note: 'The Petrosian: a3 stops ...Bb4. Play 4...Bb7 and 5...d5 to fight for e4 at once.' },
    { moves: '1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. a3 Bb7 5. Nc3 d5 6. cxd5 Nxd5 7. Qc2 Nxc3 8. bxc3', note: 'White has a mobile centre and will play e4. Complete development (...Be7, ...O-O) and attack d4 with ...c5 and ...Nc6.' },
  ],
  modelGames: [],
};

export default opening;
