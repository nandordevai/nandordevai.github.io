---
layout: post
title: "Connecting Sonic Pi, Ableton Live and hardware synths"
date: 2018-06-13 22:29:00 +0200
categories: [live coding, audio]
tags: [Ableton Live, Sonic Pi, live coding]
published: false
---

Recently I became interested in live coding, but I don’t want to change my entire workflow. I like using Ableton Live, software synths and my only hardware synth, the Bass Station II so I wanted to combine everything into ~~a giant mess~~ something manageable. [Sonic Pi](https://sonic-pi.net) looks like a good candidate to test the concept and its MIDI and audio output can easily be routed to either Live or the BSII’s USB MIDI input.

## The concept

At the end I want a loop playing programmed beats on a Live Drum Rack, another one sending MIDI note data and CC messages to a soft synth (in my case Hybrid 3) in Live, yet another one also sending notes and CCs to the Bass Station II – which in turn sends its output into my audio interface and it gets routed to an audio track in Live – and finally a loop sending output to a second audio track. Here’s a diagram to make it clear:

![](/assets/images/Sonic Pi – Ableton Live.001.png)

## MIDI loops to Drum Rack

First, set up your system to use virtual MIDI buses. You can find all the information you need on [Ableton’s site](https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses).

Then we need some meaningful variable names instead of the MIDI note numbers to make programming the Drum Rack easier:

```
kick = :c2
snare = :d2
hh_closed = :fs2
hh_open = :gs2
```

Now we can make some random drum loop:

```
live_loop :drum_rack do
  use_random_seed 808
  16.times do
    midi snare, port: "iac_driver_bus_1" if one_in(4)
    midi hh_closed, port: "iac_driver_bus_1" if one_in(2)
    midi hh_open, port: "iac_driver_bus_1" if one_in(3)
    midi kick, port: "iac_driver_bus_1" if one_in(4)
    sleep 0.25
  end
end
```

Set up a track in Live with the Drum Rack and set its input to the virtual MIDI device:

![](/assets/images/Sonic Pi – Ableton Live.002.png)

Run the code in Sonic Pi and you should hear the drum loop from Ableton Live.

## MIDI loops to soft synth

## Audio to Live

To route audio from Sonic Pi to Live you need some kind of virtual audio interface. On macOS you can use [Soundflower](https://rogueamoeba.com/freebies/soundflower/). For Windows, there is [Virtual Audio Cable](https://www.vb-audio.com/Cable/) and [Jack](http://jackaudio.org).

You have to set the virtual audio interface as the default output **before** starting Sonic Pi. Set Ableton Live inputs and outputs as needed then copy the following code into a buffer and run it:

```
live_loop :sliced_amen_to_live do
  with_fx :sound_out_stereo do
    with_fx :panslicer, phase: 0.125, wave: 3 do
      sample :loop_amen
      sleep sample_duration :loop_amen
    end
  end
end
```

## MIDI to BSII (to Live)

That one is easy. We just need to connect everything by cables (computer to MIDI input, synth audio output to audio interface) and set the input of the Live audio track to the proper channel. Then add a loop in Sonic Pi:

```
live_loop :bs2 do
  midi (octs :e2, 2).tick, sustain: 0.1, port: "bass_station_ii"
  midi_pc choose([5, 7]), port: "bass_station_ii"
  sleep 0.25
end
```

Change the port name to the one that your synth uses. You can find it under Preferences » IO » MIDI Ports.

Run the code, enjoy the sounds. If you want to tweak the knobs on the synth while the loop is playing, comment out the line beginning with `midi_pc`.

## Other combinations

You can route external audio to Sonic Pi and then send that to Live (after adding effects, probably). You should be able to do that easily after reading this post.
