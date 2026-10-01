// ============================================================
// News Opener
// Sounds: built into strudel.cc
// ============================================================

setcpm(132/4)

const chords = "<[d3,a3,d4,f4] [bb2,f3,bb3,d4] [c3,g3,c4,e4] [d3,a3,d4,g4]>"

// ---------- TICKER (softened) ----------
// Kept electronic on purpose (news tickers are), but triangle wave
// + lowpass removes the harsh square-wave buzz. Sits further back.
const ticker = note("[a6 ~ a6 a6 ~ a6 ~ ~ a6 ~ a6 ~ a6 a6 ~ e6]")
  .s("triangle").decay(.04).sustain(0)
  .lpf(3500).gain(.1).pan(.7).room(.3)

// ---------- INTRO: snare roll + tremolo strings ----------
// Real crescendo instead of a synthetic noise whoosh.
const snareRoll = s("sd*16")
  .gain(saw.range(.15, .8).slow(2))
  .velocity(rand.range(.7, 1))
  .room(.4)

const tremolo = note("[d3,a3,d4]")
  .s("gm_tremolo_strings")
  .gain(saw.range(.1, .7).slow(2))
  .room(.5).size(.7)

const timpRoll = note("d2*8")
  .s("gm_timpani")
  .gain(saw.range(.3, 1).slow(2))
  .velocity(rand.range(.75, 1))

// ---------- TIMPANI ----------
const timp = note("<[d2 ~ d2 d2] [bb1 ~ bb1 bb1] [c2 ~ c2 c2] [d2 d2 d2 d2]>")
  .s("gm_timpani")
  .velocity("[1 .7 .8 .9]")               // accent the downbeat
  .gain(1).room(.4)

// ---------- STRINGS ----------
// Short ostinato (clip shortens notes → spiccato feel) plus a
// sustained pad under it; the pad is what adds the warmth.
const ostinato = note("[50 62 57 62]*4")
  .add(note("<0 -4 -2 0>"))
  .s("gm_string_ensemble_1")
  .clip(.6)
  .velocity(rand.range(.75, .95))
  .gain(.7).room(.35)

const pad = note(chords)
  .s("gm_string_ensemble_2")
  .attack(.2).release(.6)
  .gain(.35).room(.6).size(.8)

// ---------- BRASS STABS ----------
// Brass section + trombones an octave down for body.
const stabRhythm = "x ~ ~ x ~ ~ x ~"
const brass = stack(
  note(chords).struct(stabRhythm).s("gm_brass_section").clip(.9),
  note(chords).struct(stabRhythm).sub(note(12))
    .s("gm_trombone").clip(.9).gain(.8)
).velocity(rand.range(.8, 1))
 .gain(.9).room(.5).size(.7)

// ---------- FANFARE ----------
// Real trumpet, doubled by French horn an octave below.
const line = "<[~ ~ ~ ~ ~ ~ a4 d5] [f5@3 e5@3 d5@2] [e5 ~ ~ c5 ~ ~ g4 ~] [a5@6 ~ ~]>"
const melody = stack(
  note(line).s("gm_trumpet"),
  note(line).sub(note(12)).s("gm_french_horn").gain(.7)
).velocity(rand.range(.85, 1))
 .gain(.85).room(.55).size(.7)

// ---------- CYMBALS ----------
const hats = s("hh*16")
  .gain("[.35 .15 .25 .15]*4")
  .velocity(rand.range(.7, 1))

// ---------- FINAL HIT: D major ----------
const hit = stack(
  note("[d2,d3,a3,d4,f#4,a4]").s("gm_brass_section").clip(2).gain(1),
  note("[d3,a3,d4,f#4,a4,d5]").s("gm_string_ensemble_1").release(2).gain(.6),
  note("[d2,d1]").s("gm_timpani").gain(1.1),
  s("cr").gain(.6).room(.6)
).room(.7).size(.9).slow(2)

// ---------- ARRANGEMENT ----------
arrange(
  [2, stack(ticker, snareRoll, tremolo, timpRoll.mask("<0 1>"))],
  [4, stack(ticker, ostinato, pad, brass, melody, timp, hats)],
  [2, stack(hit, ticker.mask("<0 1>").gain(.05))]
)
.mask(time.lt(8)) //example for stop