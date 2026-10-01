// ============================================================
// Incoming call
// Sounds: built into strudel.cc
// ============================================================

setcpm(60)   // 1 cycle = 1 second

// Ring
const ring = freq("1244 933 1244 933 ~ ~ ~ ~")
  .s("square")
  .attack(.001).decay(.05).sustain(0).release(.01)
  .lpf(4800)
  .gain(.5)
  .room(.3).roomsize(1.4)
  .pan(.5)

// Speaker bite
const shimmer = freq("2488 1866 2488 1866 ~ ~ ~ ~")
  .s("square")
  .attack(.001).decay(.03).sustain(0)
  .gain(.12)
  .hpf(1500)

// Sub thump on the downbeat of each burst
const sub = freq("140 ~ ~ ~ ~ ~ ~ ~")
  .s("sine")
  .attack(.002).decay(.15).sustain(0)
  .gain(.35)

// Radio hiss
const hiss = s("white").struct("x")
  .attack(.05).decay(0).sustain(1).release(.05)
  .clip(1)
  .hpf(2200).lpf(7000)
  .gain(.05)

// One second of ringing over the hiss
const call = stack(ring, shimmer, sub, hiss)

// Stitch the phases together (numbers = cycles each phase lasts)
arrange(
  [1, call]
)
//.mask(time.lt(1)) //example for stop