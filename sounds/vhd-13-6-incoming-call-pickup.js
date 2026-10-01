// ============================================================
// Incoming call: Pickup
// Sounds: built into strudel.cc
// ============================================================

setcpm(60)   // 1 cycle = 1 second, same clock as call-in.md

// The pickup: a rising three-tone blip.
const connect = freq("<933 1244 1568>")
  .s("square").slow(0.1)
  .attack(.001).decay(.09).sustain(0)
  .gain(.45).room(.4)

// Stitch the phases together (numbers = cycles each phase lasts)
arrange(
  [1, connect]
)
.mask(time.lt(1/4)) //example for s