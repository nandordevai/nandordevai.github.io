---
layout: post
title:  "LaunchControl XL class for SuperCollider"
date: 2020-11-27 15:56:32 +0100
categories: SuperCollider MIDI
---

# LaunchControl XL class for SuperCollider

I'm in a love/hate relationship with SuperCollider. On one hand, sclang is the most confusing, least intuitive and frustrating language I've ever tried. On the other, SC is awesome as an environment for playing with musical ideas, so it's worth struggling with the idiosyncrasies of the language.

I haven't really got into the audio part yet, mostly playing with patterns, using them as MIDI output for Ableton Live. The random functions are especially interesting. However, changing all the different parameter values by hand while trying out different ideas gets tiring quickly. I came across a [class written by David Granström for Korg NanoKontrol](https://github.com/davidgranstrom/NanoKontrol2) which looked like it can be rewritten for my MIDI controller, the Novation LaunchControl XL. It turned out to be a bit more work than I expected but I'm quite satisfied with the results which you can find on [github.com/nandordevai/LCXLKontrol](https://github.com/nandordevai/LCXLKontrol).

You can install it by simply copying the LCXLKontrol.sc file to your SuperCollider extension dir. Documentation is included in the README.md file. A quick example of mapping a global variable to a fader with one simple line of code:

```sclang
~lc = LCXLKontrol();
~octave = 5;
~lc.fader1.mapTo("octave", 4, 7);
```

I have no plans to add any more features to the class but feel free to fork and improve it.
