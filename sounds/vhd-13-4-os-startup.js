// ============================================================
// OS Startup
// Sounds: built into strudel.cc
// ============================================================

setcpm(10)

// 16-step grid, one step ~ 0.375s
//        step:  0   1   2     3        4   5    6   7      8
const motif = "~ ~ ab4 [db5,ab5] ~ f5 db5 ~ [db5,f5,ab5] ~ ~ ~ ~ ~ ~ ~"

// The whole cue is one bloom, so every voice sounds at once
const bloom = stack(
  // rising noise swell (the "whoosh" that opens the sound)
  s("pink")
    .attack(1.1).decay(.3).sustain(.6).release(1.2)
    .lpf(250).lpa(1.4).lpenv(4.5).lpq(6)
    .gain(.22)
    .room(.6).roomsize(6),
  // sub-bass swell sitting under everything
  note("db1").s("sine")
    .attack(1.2).decay(.5).sustain(.7).release(2.5)
    .clip(1.6).lpf(160).gain(.85),
  // main bell body
  note(motif).s("triangle")
    .attack(.004).decay(.55).sustain(.05).release(1.6)
    .clip(2).lpf(2600).gain(.55)
    .room(.85).roomsize(9).orbit(2),
  // octave-up halo, nudged late so it thickens like a chorus
  note(motif).add(note(12)).s("sine")
    .attack(.002).decay(.35).sustain(0).release(1.4)
    .late(.012)
    .gain(.30).pan(.35)
    .room(.9).roomsize(9).orbit(2),
  // glassy sparkle two octaves up, panned opposite
  note(motif).add(note(24)).s("triangle")
    .attack(.001).decay(.2).sustain(0).release(.9)
    .late(.03)
    .gain(.12).pan(.7)
    .delay(.3).delaytime(.13).delayfeedback(.3)
    .room(.9).roomsize(9).orbit(2),
  // warm pad that blooms under the final chord
  note("~ ~ ~ ~ ~ ~ ~ ~ [db3,f3,ab3,db4] ~ ~ ~ ~ ~ ~ ~").s("sawtooth")
    .attack(.35).decay(1).sustain(.5).release(2.5)
    .clip(3).lpf(900).lpa(1.2).lpenv(2)
    .gain(.28)
    .room(.7).roomsize(6)
)

// Stitch the phases together (numbers = cycles each phase lasts)
arrange(
  [1, bloom]
)
