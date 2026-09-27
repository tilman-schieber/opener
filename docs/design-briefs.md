# Opener: design

## Direction: "Scoresheet"

Opener's visual language comes from the objects of tournament chess: the ruled scoresheet you write your moves on, the
ballpoint ink, and the typeset opening manual. The board and the moves are the content, and everything else stays
quiet.

| Role | Choice |
|---|---|
| Ground | Ruled paper `#f7f7f4`, white sheets for panels, blue-grey rules `#dde2ea` |
| Ink | `#1a2130` for text, `#4a5263` / `#7a8191` for secondary text |
| Accent | Ballpoint blue `#2446a6`: your moves, repertoire moves, live notation, primary actions |
| Meaning only | Correction red (mistakes, blunders), amber (left book, traps ahead), green (results, "correct") |
| Display type | Newsreader, used sparingly for opening names and page titles, like the titles in an opening manual |
| UI type | IBM Plex Sans |
| Notation and numbers | IBM Plex Mono with tabular figures: every move, ECO code and count |
| Board | Slate-blue squares by default (brown/green/blue/grey selectable), thin ink edge, no drop shadow |
| Dark mode | Ink-on-slate. The same roles, not an inversion |

### Principles

- **No emoji or decorative icons.** Navigation and buttons use words. A small line-icon set (`Icon.svelte`) appears
  only on compact controls where the symbol is standard: move navigation, flip, take back, resign, download.
- **Notation is always live.** Any move written in prose (ideas, notes, traps, comments) is a chip you can hover to
  see the resulting position with an arrow. Routes like `Nbd2–f1–g3` draw every hop, and squares like "the e5 pawn"
  circle the square. Full lines are numbered move lists where every move previews its exact position.
- **State is encoded in form.** A coloured dot in the status line shows book, human-like or engine play. Tinted note
  blocks mark position-specific notes (blue) and traps ahead (amber). There are no accent rails on cards.
- **The move list is a scoresheet.** It has numbered rows, White and Black columns, and ruled lines.
- **Cards only where they separate objects**: side panels next to the board, forms and library entries. Everything
  else sits on the page with rules and spacing.

Tokens live at the top of `src/app.css`.
