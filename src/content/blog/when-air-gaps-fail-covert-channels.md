---
slug: "when-air-gaps-fail-covert-channels"
title: "When Air Gaps Fail: Covert Channels in Isolated Networks"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/when-air-gaps-fail-covert-channels"
---

Air-gapped networks look like castles with moats, set apart from the web of $ [cybersecurity & cyberdefense](https://sec.co/) /$ . The catch is that physics never signed your policy document, so signals wander, flicker, and hum their way past isolation. This article explains how covert channels weaken the myth of perfect separation and how to counter them today.


## Why Air Gaps Are Not Absolute


Air gaps promise containment. No uplinks, no shared networks, no path for an attacker to send or receive. In practice, systems still have clocks, fans, power supplies, ports, and people. Each one becomes a tiny bridge. Remove a bridge and smaller ones appear behind it. The gap is not a moat full of sharks.


It is a field of tall grass where something can slither through if you do not watch carefully. Accept that isolation is a spectrum, then build controls that keep the spectrum tilted in your favor. Good engineering accepts $ [leaky edges](https://sec.co/blog/vector-database-leakage-risks) /$ , measures them with care, and stacks small barriers until the attacker's patience, equipment, and courage run dry completely.


## What a Covert Channel Is


A covert channel is any unintended path that carries information between two domains that are supposed to be isolated. The key word is unintended. This is not an approved interface. It is a side effect, a byproduct of how computers leak energy.


Imagine a room where everyone agrees to be silent, then someone taps a radiator pipe. The rules are quiet about pipes, so messages flow. Computers do the same through tiny changes in timing, sound, light, heat, electromagnetic fields, and power draw.


The practical ceiling is bandwidth and error rate. Attackers compress and encode, then repeat and vote to push past noise. You rarely get megabits per second across an air gap, yet a few bytes can be decisive. A short beacon, a one time code, or a key fragment can turn a hard problem into an easy one. Low and slow is not glamorous, but it is enough.


## Families of Covert Channels


Covert channels obey the laws of physics. None are magical. Each asks a simple question. What can I change inside the room that can be sensed outside the room, then decoded into bits? Once you think that way, the list writes itself. Panic is optional. Planning is not.


### Acoustic and Ultrasonic Whispers


Fans spin, coils sing, and speakers click even when muted. $ [Malware](https://sec.co/blog/interpreted-malware-python-powershell-and-beyond-in-memory) /$ can modulate fan speed, CPU load, or tiny buzzers to emit tones above human hearing. A nearby phone or laptop microphone becomes the ear. The rate is modest, yet keys and beacons fit comfortably into those gentle whistles. Thick walls help, and so does distance, but vents and doors carry sound farther than you expect.


### Light Leaks and Visual Morse


Monitors, status LEDs, and keyboard backlights can blink in patterns that look boring to a person and obvious to a camera. The camera need not stare directly. Reflections from glass or glossy paint can betray signals that seem invisible. Tiny flickers ride under normal behavior and pass casual inspection. Window shades, LED covers, and screen blanking reduce exposure without turning the room into a cave.


### Electromagnetic and Radio Bleed


Every wire is an antenna at some frequency. Power lines and data traces throw small fields that a nearby receiver can sniff. Processor and bus fingerprints shift with load, which makes them controllable beacons. Shielding helps, so do careful routing and grounding choices, but no build is perfect. The goal is not zero emission. It is an emission that is noisy, low power, and hard to shape deliberately.


### Thermal and Power Side Chatter


Heat spreads slowly but predictably. If systems are temperature coupled through air or chassis, they can encode bits by warming and cooling. Power draw is a quicker lever. Sudden load changes ripple into power rails where sensors can notice. Even without smart gear, nearby devices can watch voltage droop and recover. Ordinary component behavior becomes an accidental telegraph.


**Channel Family**


**How It Leaks**


**Typical Rate / Reach**


**Receivers & Sensors**


**Practical Mitigations**


**Acoustic & Ultrasonic “Whispers”**


- Modulate fan speed / CPU load to emit tones
- Use speakers/buzzers (even “muted”) for clicks/ultrasound
- Vents & doors carry sound farther than expected


Modulate fan speed / CPU load to emit tones


Use speakers/buzzers (even “muted”) for clicks/ultrasound


Vents & doors carry sound farther than expected


- Low bps to a few dozen bps
- Room-scale; improves in quiet periods


Low bps to a few dozen bps


Room-scale; improves in quiet periods


- Smartphone/laptop mics
- Audio recorders; ultrasonic-capable mics


Smartphone/laptop mics


Audio recorders; ultrasonic-capable mics


- Disable speakers in firmware; fix fan curves
- Acoustic damping; increase distance
- Audio monitoring/alerts for tonal patterns


Disable speakers in firmware; fix fan curves


Acoustic damping; increase distance


Audio monitoring/alerts for tonal patterns


**Light Leaks & Visual “Morse”**


- Blink status LEDs/KB backlights in patterns
- Modulate screen luminance; exploit reflections


Blink status LEDs/KB backlights in patterns


Modulate screen luminance; exploit reflections


- bps–kbps (camera fps limited)
- Line-of-sight; can work via window/glass glare


bps–kbps (camera fps limited)


Line-of-sight; can work via window/glass glare


- CCTV, phones, webcams
- Light sensors; long-lens cameras


CCTV, phones, webcams


Light sensors; long-lens cameras


- LED shrouds; screen blanking & privacy films
- Shade windows; orient displays away from LOS
- Light-level monitoring after hours


LED shrouds; screen blanking & privacy films


Shade windows; orient displays away from LOS


Light-level monitoring after hours


**Electromagnetic & Radio Bleed**


- Unintentional RF from buses, clocks, cables


Unintentional RF from buses, clocks, cables


- Load modulation shapes spectral “fingerprints”


Load modulation shapes spectral “fingerprints”


- bps–kbps (environment dependent)
- Near-field to adjacent room with sensitive gear


bps–kbps (environment dependent)


Near-field to adjacent room with sensitive gear


- SDR receivers, coil probes
- Nearby radios/IoT with broad RF front-ends


SDR receivers, coil probes


Nearby radios/IoT with broad RF front-ends


- Shielding/grounding; cable routing discipline
- Increase distance; place away from exterior walls
- Policy: no rogue radios; RF sweeps


Shielding/grounding; cable routing discipline


Increase distance; place away from exterior walls


Policy: no rogue radios; RF sweeps


**Thermal & Power Side Chatter**


- Heat pulses through air/chassis encode bits
- Load changes ripple on power rails (voltage droop)


Heat pulses through air/chassis encode bits


Load changes ripple on power rails (voltage droop)


- Very low bps (thermal); low–moderate (power)
- Adjacent racks/desks; same circuit/outlet


Very low bps (thermal); low–moderate (power)


Adjacent racks/desks; same circuit/outlet


- Temp sensors, IR cams
- Power quality meters; PSU telemetry


Temp sensors, IR cams


Power quality meters; PSU telemetry


- Separate critical loads; clean PSUs/UPS isolation
- Thermal baffling; airflow management
- Power/thermal anomaly alerts; rate-limit load swings


Separate critical loads; clean PSUs/UPS isolation


Thermal baffling; airflow management


Power/thermal anomaly alerts; rate-limit load swings


## How Attackers Work the Problem


Placement comes first. They need code inside and a sensor outside. Code arrives through removable media, vendor quirks, maintenance windows, or $ [social engineering](https://www.investopedia.com/terms/s/social-engineering.asp) /$ that persuades a person to ferry bits. The outside sensor can be a phone, a camera, a dongle near a wall, or a forgotten IoT widget.


Once placed, the inside code chooses a channel that fits the room, then waits for a quiet moment. Patience pays. Much of the work is waiting for stillness and the instant when nobody is watching the blinking light that has always blinked.


## Measuring Risk with Clear Eyes


Risk lives on two axes, feasibility and payoff. Feasibility depends on distance, materials, layout, workload, and the presence of receivers. Payoff depends on the value of the bytes that could escape and how fresh they must be. A plant diagram printed last year is not worth heroic effort. A one time code that changes every hour certainly is.


Think about rates. If a channel moves a few bits per second with a ten percent error rate at three meters, hide the crown jewels behind short lived keys and per machine secrets. Force the adversary to stream for minutes instead of seconds so exposure becomes risky.


## Defensive Principles that Actually Help


$ [Defending an air gap](https://sec.co/blog/defending-against-dll-hijacking-attacks) /$ is about physics, hygiene, and humility. You are not chasing perfection. You are making the room unfriendly to controllable side effects and unfriendly to unnoticed receivers. Do the obvious things, then do the quiet things, then keep doing both. People roll their eyes at this advice until it works, and then they claim it was obvious. That is fine. Quiet victories rarely get a parade.


### Distance, Shielding, and Layout


Place sensitive systems away from exterior walls and windows. Keep them off shared desks. Arrange power so that key equipment does not share outlets with untrusted gear. Position monitors and LEDs so that cameras have a bad angle. When a room feels like a box inside a box, you are getting close.


### Hardware Hardening and Device Hygiene


Disable speakers in firmware where possible. Set fan curves that are less controllable. Choose devices with fewer ornamental lights. Prefer power supplies with clean regulation. Inventory adapters and dongles, then buy less of them. Lock unused ports and require signed firmware updates.


### Monitoring for Side Effects


Add small sensors that watch temperature, power quality, light levels, and unexpected audio. Baseline them, then alert on deviations that look encodable. Pair that with asset tracking that notices strange radios and unfamiliar Bluetooth names. Log the boring details, such as when a screen that should be off suddenly glows at midnight.


### Procedural Friction and Failsafes


Rotate staff who touch the gap so that no single person becomes a universal courier. Scan $ [removable media](https://sec.co/blog/access-vectors-you-re-probably-ignoring-for-cybersecurity) /$ on a staging machine that never meets production. Bag phones before entry and provide lockers so the rule is not a hassle. Use data diodes for transfers that truly must be one way. Favor pull flows that expire over push flows that linger. Keep kill switches simple, like lights that cut to black when a door opens when tested in drills.


## Conclusion


Air gaps still matter. They buy time, reduce pathways, and make sloppy mistakes less disastrous. They also invite complacency if you treat isolation like a spell. Covert channels are not magic tricks. They are physics, patience, and a little creativity nudging signals through the cracks. The fix is not a silver device or a single policy. It is a stack of small choices that make the room inconvenient for signals and inconvenient for spies. Favor distance.


Simplify hardware. Watch for side effects. Add gentle friction so risky actions feel inconvenient, then practice responses until they are boring. If your story ends with nothing escaping and no one noticing anything unusual, congratulations. In this line of work, quiet is the headline you were hoping for.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
