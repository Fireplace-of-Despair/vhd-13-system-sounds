<h1 align="center">VHD-13</h1>

<p align="center">
  <b>System sounds of the Void Harmonization Division.</b><br/>
  Short cues for sounds written in Strudel.
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-MPL--2.0-blue"/>
  <img alt="Engine" src="https://img.shields.io/badge/engine-Strudel-ff69b4"/>
  <img alt="Language" src="https://img.shields.io/badge/language-JavaScript-F7DF1E"/>
  <img alt="Samples" src="https://img.shields.io/badge/samples-built--in%20only-lightgrey"/>
</p>

---

## What this is

VHD-13 is a set of system sounds. Each sound is one Strudel pattern in one file. You paste the file
into [strudel.cc](https://strudel.cc), press play, and hear the cue. Nothing installs, and nothing builds.

The repository holds no audio files. The code is the source. To get a `.wav`, you record the output
of the Strudel editor.

| | |
|---|---|
| **One file, one sound** | Each file holds the complete pattern for one cue. No file imports another. |
| **Built-in sounds only** | Every file uses the synths and the General MIDI instruments that ship with strudel.cc. You load no sample pack. |
| **Phases you can read** | A file names each phase as a constant, then joins the phases with `arrange`. The number beside a phase is its length in cycles. |
| **Tempo in the first line** | `setcpm` sets the cycles per minute. Change it to stretch or compress the whole cue. |

## The sounds

| File | Sound | Tempo | Length |
|---|---|---|---|
| `vhd-13-0-soft-violin-ding.js` | A soft violin chord, A minor, in a large room. | 120 cpm | 1 cycle, then a 1.5 s release |
| `vhd-13-1-school-bell.js` | Tubular bells. Four notes, four answering notes, one cycle of silence. | 12 cpm | 3 cycles, about 15 s |
| `vhd-13-2-dial-up.js` | A modem call: dial tone, DTMF digits, ringback, the 2100 Hz answer tone, then carrier noise. | 30 cpm | 11 cycles, about 22 s |
| `vhd-13-3-news-opening.js` | An orchestral news opener in D minor. Snare roll, strings, brass stabs, a trumpet fanfare and a final D major hit. | 33 cpm | 8 cycles, about 14.5 s |
| `vhd-13-4-os-startup.js` | A startup chime in D flat. A noise swell, a sub-bass and a bell motif bloom into one chord. | 10 cpm | 1 cycle, about 6 s |
| `vhd-13-5-incoming-call.js` | A square-wave ring over radio hiss, with a sub thump on each burst. | 60 cpm | 1 cycle, 1 s |
| `vhd-13-6-incoming-call-pickup.js` | Three rising tones that say the call connected. | 60 cpm | a quarter cycle, 0.25 s |

The two call files share the same clock. Play `vhd-13-5` for as long as the call rings, then play
`vhd-13-6` when the user answers.

## How a sound is built

```js
setcpm(30)                                   // 1. the tempo: cycles per minute

const dialtone = freq("[350,440]").s("sine") // 2. one constant per phase
const answer   = freq("2100").s("sine")

arrange(                                     // 3. the phases in order
  [2, dialtone],                             //    2 cycles of dial tone
  [1, answer]                                //    then 1 cycle of answer tone
)
.mask(time.lt(3))                            // 4. optional: stop after 3 cycles
```

`arrange` loops. Without a `mask`, the cue starts again after its last phase. Three files carry a
`.mask(time.lt(n))` line and stop after `n` cycles. The other files repeat until you press stop.

## Repository layout

| Path | Contents |
|---|---|
| `sounds/` | One `.js` file per sound. The file name is `vhd-13-<number>-<name>.js`. |
| `LICENSE` | The Mozilla Public License 2.0. |

## Prerequisites

| Need | Item |
|---|---|
| Player | A browser that runs [strudel.cc](https://strudel.cc) |
| Recorder | Optional: [Audacity](https://www.audacityteam.org/) or any tool that records system audio |

## Quick start

1. Open [strudel.cc](https://strudel.cc).
2. Delete the example pattern in the editor.
3. Copy the full text of one file from `sounds/` into the editor.
4. Press **Ctrl+Enter** to play.
5. Press **Ctrl+.** to stop.

### Gotchas

- The first play can come in late or with gaps. The browser loads each General MIDI instrument on
  first use. Play the cue a second time to hear it clean.
- A cue without a `mask` loops. Stop it by hand, or add `.mask(time.lt(n))` after `arrange(...)`.
- Browsers block audio until you click the page. Click the editor before you press **Ctrl+Enter**.

## Contributing

This repository exists for the sounds of one division. A new sound lands only when an administrator
wants it. A fix or an issue is welcome all the same.

- Open an issue first, and wait for an answer before you write a pattern.
- Branch off `main`, and open a pull request into it.
- Use the sounds that ship with strudel.cc. A pattern that needs an external sample pack does not land.
- Keep the file header and the `arrange` block, so every file reads the same way.

## License

VHD-13 is open source under the [MPL-2.0](LICENSE). One license covers the whole repository.

The MPL works on each file. Play the sounds, record them, or put them into a closed product, and pay
nothing. When you change a file of this project, publish that file. Your own new files stay under your
own terms.

The license covers the code. The name **Fireplace of Despair** and the division names stay with the
copyright holder. Rename your fork before you publish it.

Copyright (c) 2026 Shevtsov Stanislav ("Fireplace of Despair").
