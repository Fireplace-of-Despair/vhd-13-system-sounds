// ============================================================
// School bell
// Sounds: built into strudel.cc
// ============================================================

setcpm(12)

// Phase 1: First quarter (E G# F# B)
const quarter = note("e4 g#4 f#4 b3")
  .sound("gm_tubular_bells")
  .clip(2.5)
  .room(0.7).roomsize(6)
  .gain(0.8)

// Phase 2: The answering phrase
const answer = note("e4 f#4 g#4 e4")
  .sound("gm_tubular_bells")
  .clip(2.5)
  .room(0.7).roomsize(6)
  .gain(0.8)

// Phase 3: SIlence
const decay = silence

// Stitch the phases together (numbers = cycles each phase lasts)
arrange(
  [1, quarter],
  [1, answer],
  [1, decay]
)