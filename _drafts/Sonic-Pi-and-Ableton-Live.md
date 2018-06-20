---
categories: [live coding, music, audio]
tags: [Ableton Live, Sonic Pi]
---

# Connecting Sonic Pi, Ableton Live and hardware synths

Recently I became interested in live coding, but I don’t want to change my entire workflow. I like using Ableton Live, software synths and my only hardware synth, the Bass Station II so I wanted to combine everything into ~~a giant mess~~ something manageable. [Sonic Pi](https://sonic-pi.net) looks like a good candidate to test the concept and its MIDI and audio output can easily be routed to either Live or the BSII’s USB MIDI input.

## The concept

At the end I want a loop playing programmed beats on a Live Drum Rack, another one sending MIDI note data and CC messages to a soft synth (in my case Hybrid 3) in Live, yet another one also sending notes and CCs to the Bass Station II – which in turn sends its output into my audio interface and it gets routed to an audio track in Live – and finally a loop sending output to a second audio track. Here’s a diagram to make it clear:

![](/images/Sonic Pi – Ableton Live.001.png)

## MIDI loops to Drum Rack

First, set up our system to use virtual MIDI buses. We can find all the information we need on [Ableton’s site](https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses).

Then we need some meaningful variable names instead of the MIDI note numbers to make programming the Drum Rack easier:

```ruby
kick = :c2
snare = :d2
hh_closed = :fs2
hh_open = :gs2
```

Now we can make some random drum loop:

```ruby
live_loop :drum_rack do
  iac_port = "iac_driver_bus_1"
  use_random_seed 808
  16.times do
    midi snare, port: iac_port if one_in(4)
    midi hh_closed, port: iac_port if one_in(2)
    midi hh_open, port: iac_port if one_in(3)
    midi kick, port: iac_port if one_in(4)
    sleep 0.25
  end
end
```

Set up a track in Live with the Drum Rack and set its input to the virtual MIDI device:

![](/images/Sonic Pi – Ableton Live.002.png)

Now if we run the code in Sonic Pi then we can hear the drum loop from Ableton Live.

## MIDI loops to soft synth

I use Air Hybrid 3 for this, but we could also use the free [Helm synth](http://tytel.org/helm/) or any VST/AU plugin which can handle MIDI input. Hybrid 3 has some MIDI CC parameters set up by default so we will use those values for controlling filter cutoff, reverb and delay mix.

The virtual MIDI bus has to be set up like in the previous case.

```ruby
live_loop :hybrid do
  midi scale(:e3, :minor_pentatonic).shuffle.tick, port: "iac_driver_bus_1"
  # set cutoff value
  midi_cc 36, (ring 15, 24, 73, 67, 40).look
  sleep 0.5
end

live_loop :hybrid_fx, sync: :hybrid do
  # set delay/reverb mix to 0
  midi_cc 13, 0
  midi_cc 14, 0
  sleep 2
  # set delay/reverb mix to max.
  midi_cc 13, 127
  midi_cc 14, 127
  sleep 2
end
```

## MIDI to BSII (to Live)

That one is easy. We just need to connect everything by cables (computer to MIDI input, synth audio output to audio interface) and set the input of the Live audio track to the proper channel. Then add a loop in Sonic Pi:

```ruby
live_loop :bs2 do
  bs2_port = "bass_station_ii"
  midi (octs :e2, 2).tick, sustain: 0.1, port: bs2_port
  midi_pc choose([5, 7]), port: bs2_port
  sleep 0.25
end
```

Change the port name to the one that your synth uses. It’s under Preferences » IO » MIDI Ports.

Run the code, enjoy the sounds. If we want to tweak the knobs on the synth while the loop is playing, we can comment out the line beginning with `midi_pc`.

## Audio to Live

To route audio from Sonic Pi to Live we need some kind of virtual audio interface. On macOS we can use [Soundflower](https://rogueamoeba.com/freebies/soundflower/). For Windows, there is [Virtual Audio Cable](https://www.vb-audio.com/Cable/) and [Jack](http://jackaudio.org).

We have to set the virtual audio interface as the default output **before** starting Sonic Pi. Set Ableton Live inputs and outputs as needed then copy the following code into a buffer and run it:

```ruby
live_loop :sliced_amen_to_live do
  with_fx :sound_out_stereo do
    with_fx :panslicer, phase: 0.125, wave: 3 do
      sample :loop_amen
      sleep sample_duration :loop_amen
    end
  end
end
```

## Other combinations

We can route external audio to Sonic Pi and then send that to Live (after adding effects, probably). You should be able to do that easily after reading this post.
