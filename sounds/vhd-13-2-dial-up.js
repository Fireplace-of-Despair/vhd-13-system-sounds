// ============================================================
// Dial-up
// Sounds: built into strudel.cc
// ============================================================

setcpm(30) 

// Phase 1: Dial tone (350 Hz + 440 Hz, continuous)
const dialtone = freq("[350,440]").s("sine").gain(0.25)

// Phase 2: dialing
const dialing = freq(
  "[852,1336] ~ [770,1477] ~ [852,1209] ~ [770,1336] ~ [697,1477] ~ [941,1336] ~ [852,1477] ~"
).s("sine").gain(0.3).attack(0.002).release(0.04)

// Phase 3: Ringback (440 Hz + 480 Hz)
const ringing = freq("[440,480] ~ ~ ~").s("sine").gain(0.28).release(0.1)

// Phase 4: Answer (2100 Hz)
const answer = freq("2100").s("sine").gain(0.25)

// Phase 5: carrier training
const screech = stack(
  // SHHHHHHHROJHROJENRBKOJL
  s("white*24").gain(rand.range(0.08,0.45))
    .lpf(sine.range(1500,4000).fast(3)).hpf(600).release(0.05),
  // carrier tones
  freq("<1800 2250 1200 2400 900 2100 1650 2700 1400 2550>*8")
    .s("sawtooth").gain(0.16).release(0.03).distort(0.3),
  // whistle
  freq("2400 2100 2400 1900").s("square").gain(0.07).release(0.05)
)

// Stitch the phases together (numbers = cycles each phase lasts)
arrange(
  [2, dialtone],
  [1, dialing],
  [3, ringing],
  [1, answer],
  [4, screech]
)