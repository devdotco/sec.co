---
slug: "ics-protocol-fuzzing-find-zero-days"
title: "ICS Protocol Fuzzing: Uncovering Zero-Days in Plain Sight"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/ics-protocol-fuzzing-find-zero-days"
---

Industrial control systems keep lights on, pumps moving, and ovens honest. Their protocols still speak with the polite efficiency of a bygone era, which makes them charming and a little fragile. That is why fuzzing works so well. With purposefully odd packets and a steady hand, you can coax devices into revealing logic gaps that nobody meant to leave behind.


In the context of $ [cybersecurity & cyberdefense](http://sec.co/) /$ , protocol fuzzing turns quiet networks into test ranges where assumptions are stress tested, measured, and fixed before trouble knocks on the door.


## What Makes ICS Protocols So Peculiar


Control traffic is deterministic by design. Messages are short, repetitive, and time bound, tuned for equipment that must answer in slices of a second. Many stacks carry habits from serial links, so they expect orderly masters and compliant slaves rather than adversaries who improvise. Authentication is uncommon, input validation can be forgiving, and error paths were written to keep production moving through shift changes and storm seasons.


Parsers accept anything that looks vaguely right, especially during maintenance functions that were never meant to see Internet weather. Those choices support uptime, yet they also create fragile corners where a single odd length, index, or type can push code into $ [undefined territory](https://sec.co/blog/ghost-dependencies-stale-code-security) /$ .


## The Idea Behind Protocol Fuzzing


Fuzzing is the practice of feeding target inputs that are valid enough to be processed and strange enough to expose faulty assumptions. Traditional fuzzers hook into compilers and collect code coverage. Industrial gear rarely offers that luxury, since firmware is closed and telemetry is scarce. Two approaches dominate the field.


Mutation reshapes real traffic captures while preserving flow and rhythm, which keeps stateful parsers engaged. Generation builds messages from a grammar of the protocol, which allows systematic exploration of fields that never appear in day to day captures. The best campaigns mix both, using mutation for realism and generation for reach.


What


Feed inputs that are “valid enough to parse” but “weird enough to break assumptions,” revealing parser and state-machine flaws.


Why ICS?


Deterministic, legacy-influenced protocols with forgiving validation and quiet error paths make faults easier to surface.


Key Constraint


Closed firmware and limited telemetry (no source/coverage hooks), so campaigns rely on black-box signals and realistic traffic.


Approach 1


**Mutation fuzzing -** reshape real captures (pcaps), preserving flow/timing to keep stateful parsers engaged.


Mutation: Strengths


High realism, good state coverage, quick to start from existing traffic; ideal for exercising “hot path” behavior.


Mutation: Gaps


Biased by seeds; may miss rare fields/branches absent in captures.


Approach 2


**Generation fuzzing -** build messages from a protocol grammar to systematically explore fields/states.


Generation: Strengths


Deep/rare field coverage, exercises maintenance/diag code and edge cases not seen in day-to-day traffic.


Generation: Gaps


Harder to keep realistic sequencing/timing; requires grammars/state models.


Best Practice


**Mix both:** use mutation for realism/state, generation for breadth. Start from clean seeds, then expand with grammars.


Focus Mutations On


Lengths, counts, indexes, type tags, boundary bits, inter-packet timing & valid in-window reordering.


Success Signals (Black-Box)


Crashes/resets, timeouts, latency spikes, malformed replies, state desync, CPU/power anomalies, log/console faults.


Outcome


Reproducible minimal test cases that expose parser/state flaws for triage, vendor reporting, and safe remediation.


## Why ICS Protocols React So Readily


These systems were built for calm seas rather than stormy ones. Diagnostic and maintenance functions are chunky, full of conversions between wire formats and internal structs, which is fertile ground for off by one mistake. Gateways that bridge serial and TCP juggle two mental models at once, inviting truncation errors and brittle boundary checks.


Broadcast queries can exercise code that nobody sees during a normal shift. When errors happen, many devices prefer to retry, back off, or silently reset instead of failing loudly. Those choices help operators, yet they also hide faults that a fuzzer can trigger again and again.


## Building a Safe Fuzzing Setup


A faithful lab $ [protects production](https://sec.co/blog/vector-database-leakage-risks) /$ and improves results. Blend virtual controllers with the real hardware where protocol quirks live, especially around vendor extensions and serial framing. Insert taps or mirror ports so every exchange is captured with precise timestamps and no packet loss.


Log power draws along with traffic, since a wedged CPU will often betray itself through a flatline long before the network goes silent. Keep an out of band path for management that your generator never touches, and record clock sources so that timing can be reproduced. The more your lab mirrors physics and timing, the less time you will spend chasing ghosts.


## Choosing Targets With Intent


Throwing packets blindly at everything feels bold and wastes time. Listen first. Capture an ordinary duty cycle and learn which function codes, object reads, and class polls make up the hot path. The hot path is usually hardened by years of routine use. The dusty corners are not.


Components that translate between protocols deserve special attention, since they copy user controlled fields from one world into another where meanings change. Historian forwarders, data concentrators, and gateways do heroic work and occasionally drop a stitch. Features that enable remote updates or diagnostics are also ripe for inspection because they ship with generous trust by default.


## Crafting Test Cases That Matter


Good fuzzing respects the dance. If the protocol expects an initiator to speak first and a responder to answer, your harness should honor that rhythm. Seeds drawn from clean captures supply believable structure and timing. From there, nudge fields that govern lengths, counts, and indexes.


Grow arrays by one element, then shrink them by one. Flip boundary bits that decide sign or endianness. Confuse types by treating a number as a string or a handle as raw bytes. Vary inter packet gaps and reorder messages within valid windows, because timing can be just as interesting as content. Little pushes in the right places reveal big truths.


## Instrumentation Without Source Code


Coverage is useful, yet black box tricks can get you close when the source is off limits. Hash responses into fingerprints that reflect status codes, payload sizes, and latency buckets. Track those fingerprints over time to estimate how much of the device you have awakened. Watch link counters, $ [CPU temperature](https://sec.co/blog/securing-package-managers-npm-pypi-cargo-supply-chain-security) /$ , and power draw to infer internal strain.


If a serial console or factory maintenance header exists, capture it passively during runs so that spontaneous logs enrich your view without interfering. When reboots occur, measure how long recovery takes and whether configuration survives the trip. Those observations substitute for coverage with surprising accuracy.


## Telling Signal From Noise


Every campaign produces curiosities that are not worth a patch. The discipline is triage. Reproduce the behavior with a minimal sequence and a fixed seed, then tighten timing until you know which packets truly matter. If the $ [symptom](https://sec.co/blog/model-inversion-attacks) /$ disappears when the clock shifts, you may be chasing scheduling luck.


If the condition survives soft resets or cold boots, you might be in a tickling persistent state. Judge impact in operational terms. Can an unauthenticated actor trigger the behavior remotely. Does it lead to a meaningful loss of view or control? Can it be chained with a simple misconfiguration. Answer those questions, and the priority will sort itself out.


## Handling Findings Responsibly


Discovery is thrilling, although the aftermath defines success. Vendors deserve concise reports with packet captures, reproduction steps, and a plain explanation of why the issue matters and how it can be observed safely. Operators deserve near term mitigations that they can deploy without slowing the plant.


$ [Network segmentation](https://sei.cmu.edu/blog/network-segmentation-concepts-and-practices/) /$ helps, as do lists for function codes and deep inspection that reject malformed frames before they reach fragile parsers. Patches should be rehearsed in the lab, including rollback plans, before a single field device sees them. Clear timelines and calm communication keep everyone aligned.


## Common Pitfalls To Avoid


Several habits waste weeks. Treating packet captures as gospel is one of them. The most revealing exchanges show up during boot, maintenance, and error storms that many teams never record. Ignoring protocol state is another. Initiators and responders maintain counters and timers that change how inputs are parsed, so blasting frames out of order only exercises the drop code.


A third habit is focusing on Ethernet while neglecting serial lines and fieldbuses where legacy behavior survives untouched. The last is poor record keeping. Without clean logs, random seeds, and clocks, success is impossible to reproduce and failure is impossible to diagnose.


## The Near Future Of ICS Fuzzing


Three trends are converging. Grammar inference is improving, which means generation engines will need fewer hints to craft valid yet provocative traffic. Digital twins are maturing, so teams can rehearse campaigns against high fidelity replicas without risking production.


Orchestration frameworks are learning to spread experiments across fleets, with consistent $ [telemetry](https://sec.co/blog/threat-detection-with-yara) /$ and automatic triage that scales beyond a single bench. Add lightweight symbolic execution and smarter input pruning, and you get a pipeline that explores deep branches while keeping test rigs safe and sustainable.


## Conclusion


Fuzzing industrial protocols is part science and part mischief, carried out with empathy for the machines that keep our world steady. When done with care, it reveals design assumptions before adversaries do, and it turns fragile corners into boring, well behaved code. Build a lab you trust, choose targets with intent, keep your notes tidy, and let the packets sing. The result is fewer surprises at three in the morning and a network that sleeps a little easier.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
