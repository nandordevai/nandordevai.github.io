---
categories: [live coding, audio]
tags: [MIDI, Sonic Pi]
---

# Using Launchpad with Sonic Pi

Sonic Pi -> MIDI notes -> Launchpad (loop status)
Launchpad -> MIDI notes -> Sonic Pi (loop start/stop)

track_1_loop_1
    if midi_note = buttons[0][0]
        start
    else if midi_note in buttons[0]
        stop
track_1_loop_2
    …


use_bpm 120
midi_start

live_loop :clock do
  midi_clock_beat
  sleep 1
end

live_loop :kick do
  sample :bd_haus
  sleep 1
end
