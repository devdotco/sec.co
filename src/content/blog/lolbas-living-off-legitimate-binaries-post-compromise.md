---
slug: "lolbas-living-off-legitimate-binaries-post-compromise"
title: "LOLBAS: Living Off Legitimate Binaries in Post-Compromise Operations"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/lolbas-living-off-legitimate-binaries-post-compromise"
---

In the crowded world of $ [cybersecurity & cyberdefense](https://sec.co/) /$ , few topics inspire equal parts fascination and dread like LOLBAS, the habit of turning an operating system’s own tools into a Swiss Army knife for mischief. Picture a burglar who refuses to bring a crowbar, then raids your kitchen drawer for utensils instead.


Post compromise operators lean on trusted binaries and scripts because they blend in, leave fewer obvious fingerprints, and often sidestep routine controls. Understanding the pattern is the first step to frustrating it. We can absolutely make it harder.


## What LOLBAS Actually Means


Living Off the Land Binaries and Scripts describes a strategy that uses what is already on the host. The binaries are signed, frequently updated, and included for good reasons. Administrators rely on them for automation, inventory, and troubleshooting. Adversaries adopt the same tools to move quietly, to collect information, and to execute payloads by proxy.


If a process is already trusted by the system and by endpoint defenses, riding along with it is less noisy than dragging in something brand new. Well known utilities have rich features, and those features can be chained into surprisingly capable workflows.


## Why Post-Compromise Operators Love It


Stealth is the headline benefit. Signed utilities inherit trust, which means fewer alerts and fewer quarantines. Ubiquity is another perk. If a $ [binary ships with the platform](https://sec.co/blog/binary-provenance-and-sbom-verification) /$ , the odds are high that it will be present on production servers and traveling laptops alike.


Flexibility comes next, since maintenance tools can retrieve content, read configuration data, schedule tasks, and launch code in ways that resemble routine administration. An operator who knows the defaults can string these abilities together like beads, which keeps the whole affair quiet.


## The Defender’s Problem, Framed


Classic prevention asks a simple question. Can we block the bad file? LOLBAS shifts the problem into a gray area where the file is the good file, but the behavior is off. That flips success metrics from signatures to intent. Your tools must observe sequences of actions across hosts and over time, then decide what is normal for this environment. The job now resembles wildlife tracking more than metal detector sweeps, which is a healthy shift.


## Visibility That Actually Helps


Defenders do not need perfect visibility, they need relevant visibility. The sweet spot starts with endpoint telemetry that explains process ancestry, command line usage, network calls, and file writes. Identity context joins the party, because who triggered the action often matters more than what ran. Network insight rounds it out for $ [lateral movement](https://sec.co/blog/weaponizing-oauth-for-lateral-movement) /$ and data staging.


Cloud signals add another angle for estates that mix endpoints with software as a service and containerized workloads. When these sources are fused, a simple timeline becomes a narrative with actors and motives. Telemetry that feeds a unified timeline reduces guesswork and speeds both detection and triage.


### Endpoint Signals to Collect


Look for parent child process chains that do not make sense for your shop. Scripts that kick off account tooling from unprivileged directories are worth a second look. So are utilities reading from odd temp paths, writing to new autostart locations, or spawning unexpected interpreters. None of this is a smoking gun by itself, but together it forms a sketch that can be matched against baseline behavior.


### Identity Signals to Correlate


An action performed by a jump host admin during a maintenance window is one story. The same action executed by a dormant user from a kiosk at midnight is another. High value groups, sensitive service accounts, and freshly created privileges deserve scrutiny. Successful and failed authentications around suspicious process trees provide timing clues that tie the scene together.


## Behavioral Clues Worth Watching


Think in verbs rather than nouns. Collection, staging, lateral movement, persistence, and cleanup all have rhythms. Collection can look like native tools reading large directory trees they seldom touch. Staging may involve compressing and renaming archives in places administrators rarely use. Lateral movement often appears as credential material harvested and then reused from a new host.


Persistence may hide in scheduled tasks or services tweaked to call a helper at logon. Cleanup tries to erase breadcrumbs without drawing attention. Map these verbs to the tools in your environment, then highlight combinations that are rare or high risk for your business. When you name the verbs, the noise settles, and the plot becomes easier to follow.


**Behavior “Verb”**


**What It Often Looks Like**


**Common “Tells”**


**Why It Matters**


**What to Watch / Correlate**


Collection


Native tools reading lots of files/dirs they rarely touch


Sudden spikes in file reads, broad directory walks, unusual targets


Early stage: gathering info to plan next moves


Process + command line, file access patterns, user context, time-of-day


Staging


Compressing, renaming, or piling data in “out of the way” spots


Archives created in temp/rare paths, odd filenames, repeated re-packaging


Preps data for transfer or later actions


Archive creation events, write locations, size growth, follow-on network activity


Lateral Movement


Credentials used from a new host to access more systems


Same account hopping machines, new remote sessions, unusual admin tooling


Expands access and reaches higher-value targets


Auth logs (success/fail), host-to-host connections, remote exec patterns, account privilege level


Persistence


Scheduled tasks/services adjusted to re-run a helper on login or timer


New/modified tasks, new services, autostart edits, “helpful” names


Keeps access after reboots and credential resets


Task/service creation, registry/autostart changes, new binaries/scripts in startup paths


Cleanup


Attempts to erase traces without causing obvious disruption


Log clearing, tool removal, temp file purges, short “burst then disappear” behavior


Reduces evidence and slows investigations


Log integrity signals, deletion events, gaps in telemetry, sequence timing after suspicious actions


## Hardening Without Breaking the House


Good hardening is conservative. The goal is to narrow the playground without tripping your colleagues. Start with inventory, because you cannot defend what you do not know exists. Map which platforms, versions, and utilities are deployed, and who owns them. Then prioritize $ [crown jewel systems](https://sec.co/blog/time-based-evasion-in-malware) /$ and the routes that touch them. Constraints placed near critical assets buy more risk reduction per ounce of operational pain, which builds support instead of friction.


### Application Control Done Right


Traditional allowlists can be rigid, but modern approaches can check signing, reputation, and path together. The art is to block untrusted launch paths while leaving room for business operations. Pilot in rings, measure the noise, and tune before you enforce. Expect to allow specific administrative workflows that are both necessary and safe. Document the exceptions with owners and sunsets so that special rules do not last forever by accident.


### Script Control with Guardrails


Scripts power the enterprise, which means scripts need boundaries rather than blanket bans. Use policy to restrict which scripts can run, where they can run from, and who can sign them. Capture script block logging and forward it to analytics. Pair that with just in time prompting so that risky actions require conscious approval.


## Detection Engineering for LOLBAS


Analytics thrive on context. Build detections that combine process relationships, identity clues, and network observations into stories. Favor sequences over single events, because single events lie. Look for rare parent child pairs initiated by sensitive identities. Watch for trusted utilities that suddenly write to autostart locations or open network sockets they usually avoid.


Use $ [threat intelligence](https://www.middlebury.edu/institute/academics/degree-programs/threat-intelligence) /$ as seasoning, not the main course, and adapt it to your environment. Invest in good triage so analysts can pivot quickly and confirm or dismiss a lead before it becomes an outage.


## Testing and Validation That Bring Confidence


Prove your controls the same way operators probe your edges. Design tabletop narratives that walk through discovery, collection, movement, and exfiltration using native tools. Pair those conversations with controlled exercises in a lab.


Measure how quickly alerts correlate into an incident, whether analysts can follow the breadcrumb trail, and how many false positives the run created. If a result surprises you, treat it as a clue that an assumption needs a tune up, then fix the gap and retest.


## Bringing It All Together


LOLBAS is a reminder that tools are neutral and context is king. Adversaries borrow the same utilities that keep the lights on, then string them into quiet symphonies of access. Defenders who chase files will keep losing the tune, while defenders who watch behavior, identity, and timing can hear the melody early.


$ [Invest in visibility](https://sec.co/blog/visibility-in-ics-why-dpi-alone-isnt-enough) /$ that explains not just what ran, but why it ran, under whose hand, and with which side effects. Tune detections, harden with empathy for your users, and practice the plan until the playbook feels like muscle memory.


## Conclusion


LOLBAS will never vanish because trustworthy tools will always exist and creativity is free. The good news is that creativity works on defense too. With careful visibility, sane hardening, and story driven detections, you can make post compromise life unpleasant for intruders without making daily life unpleasant for your colleagues.


Invest in observability, tune for your environment, and practice until your response feels calm and rehearsed. That is a trade worth making, and it starts with treating native tools as signals to be understood rather than dangers to be feared.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
