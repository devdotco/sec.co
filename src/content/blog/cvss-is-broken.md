---
slug: "cvss-is-broken"
title: "CVSS Is Broken: Scoring Risk in the Real World"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/cvss-is-broken"
---

If you work in $ [cybersecurity](http://sec.co/) /$ for more than five minutes, you’ll bump into CVSS—the Common Vulnerability Scoring System. It shows up in scanning reports, vendor advisories, regulatory frameworks, and endless slide decks. At first glance, a single number between 0.0 and 10.0 that tells you “how bad” a vulnerability is feels intuitive, almost comforting.


But after dealing with real production networks, most defenders reach the same conclusion: CVSS is broken—or at least badly bent—when it comes to $ [prioritizing risk](https://sec.co/blog/vector-database-leakage-risks) /$ in the real world. Below are five hard-earned lessons that explain why leaning on the CVSS base score alone can steer your team straight into trouble, plus a few practical ways to escape its gravitational pull.


## CVSS Treats Every Environment as Identical


CVSS was designed to be vendor- and environment-agnostic. That sounds fair and neutral, but neutrality comes at a price: context blindness. The same RCE in a test lab and in your internet-facing payment gateway both receive a 9.8, even though the business impact is worlds apart.


Your board doesn’t care about theoretical severity—they care about downtime, data loss, and brand damage. If a score ignores whether the vulnerable host is air-gapped or exposed, you’ll waste precious patching cycles on issues that can’t hurt you while missing the ones that can.


Real-world fix: Tag assets with business context—“public-facing,” “PCI,” “OT floor,” “executive laptop”—then overlay that information on top of the raw CVSS number. A medium-scoring flaw on a crown-jewel asset often deserves to jump ahead of a critical score on a throwaway development VM.


## Exploitability Today Beats Hypothetical Danger Tomorrow


The CVSS base score assumes worst-case exploitability, even when no exploit code exists. Meanwhile, actively exploited bugs often linger below the critical threshold. One notorious example: the Pulse Secure VPN flaw (CVE-2019-11510) sat at 9.8 but was largely ignored until nation-state actors started feasting on it months later. By the time mass exploitation began, incident responders were already behind.


Real-world fix: Pair CVSS with threat-intel signals such as CISA’s Known Exploited Vulnerabilities (KEV) list or the Exploit Prediction Scoring System (EPSS). If a “medium” 7.2 suddenly shows up in ransomware playbooks, treat it like a hair-on-fire 10.0.


## Scoring Math Can Be Gamed—Intentionally or Not


Vulnerability reporters can tweak the eight CVSS base metrics to nudge a final score up or down. Need to get a vendor’s attention? Mark “User Interaction” as None and watch the score climb. Prefer to downplay an embarrassing flaw? Set “Privileges Required” to High and “Scope” to Unchanged. There are guidelines to prevent abuse, but in practice scorers can arrive at different numbers for the same bug, and the industry rarely reconciles them.


Real-world fix: Validate vendor-supplied scores with your own engineering team. If you rely on a third-party scanner, check whether it re-calculates CVSS or simply parrots the vendor’s advisory. A quick internal review often reveals inflated or underestimated numbers.


## Temporal Metrics Age Like Milk, Not Wine


CVSS offers an optional “Temporal” section (exploit code maturity, remediation level, report confidence). In theory, updating those values keeps a score fresh. In practice, vendors freeze the base score the day the CVE is published and move on. Three months later, a proof-of-concept pops up on GitHub, yet your dashboards still show the original rating. Meanwhile, your SOC is drowning in alerts from fresh attacks that the “static” CVSS can’t capture.


Real-world fix: Automate score aging. Set policies that automatically escalate vulnerabilities once functional exploit code is public or when the attack surface changes (e.g., new firewall rule exposes an old server). If your tooling can’t adjust CVSS over time, flag those items manually—ideally before the attackers do.


## The 10-Point Scale Masks Nuance and Creates Patch Paralysis


Tell two engineers they have “twenty-three criticals” and watch them sigh in unison. A pile of 9.8s is paralyzing; nobody can fix everything yesterday. Some orgs swing to the opposite extreme—patch nothing until a Change Control meeting in Q4—and hope the dice roll in their favor. The real world demands a triage ladder, not a binary “Critical vs. Everything Else.”


Real-world fix: Break down “critical” into finer slices:


- **Critical-Active:** Exploited in the wild or extremely easy to weaponize—drop everything and patch.
- **Critical-Exposure:** Publicly reachable from the internet—schedule an emergency window.
- **Critical-Internal:** Exists only on segmented hosts—patch during the next maintenance cycle.


**Critical-Active:** Exploited in the wild or extremely easy to weaponize—drop everything and patch.


**Critical-Exposure:** Publicly reachable from the internet—schedule an emergency window.


**Critical-Internal:** Exists only on segmented hosts—patch during the next maintenance cycle.


By coupling CVSS with reachability and exploit status, you turn an overwhelming to-do list into workable sprints.


## Moving Beyond CVSS—Without Throwing It Away


Declaring CVSS “broken” doesn’t mean deleting it from your toolbox. The framework remains a useful common language for vendors, researchers, and auditors. The trick is to recognize its blind spots and enrich it with data you already collect:


- **Asset Criticality:** business impact, compliance scope, recovery cost
- $ [**Threat Intelligence**](https://sec.co/blog/ai-vs-ai-how-machine-learning-is-both-a-cybersecurity-threat-and-solution) /$ **:** exploitation in the wild, crime-ware chatter, proof-of-concept code
- **Compensating Controls:** WAF rules, network segmentation, zero-trust policies
- **Exposure Surface:** internet-facing, partner-accessible, or internal-only


**Asset Criticality:** business impact, compliance scope, recovery cost


$ [**Threat Intelligence**](https://sec.co/blog/ai-vs-ai-how-machine-learning-is-both-a-cybersecurity-threat-and-solution) /$ **:** exploitation in the wild, crime-ware chatter, proof-of-concept code


**Compensating Controls:** WAF rules, network segmentation, zero-trust policies


**Exposure Surface:** internet-facing, partner-accessible, or internal-only


Several commercial and open-source tools already crunch these variables into risk-based scores. If you’re rolling your own, start small: add a one-to-three-point boost for “actively exploited,” subtract a point for “isolated network,” and see how your patch queue reshuffles.


## Case Study: The Tale of Two 9.8s


Last year, a global manufacturer faced two critical CVEs:


- **CVE-2022-XXXXX:** 9.8 RCE in an out-of-support SSH library used on a single, isolated build server.
- **CVE-2022-YYYYY:** 9.8 SQL injection in their public e-commerce portal.


**CVE-2022-XXXXX:** 9.8 RCE in an out-of-support SSH library used on a single, isolated build server.


**CVE-2022-YYYYY:** 9.8 SQL injection in their public e-commerce portal.


Traditional CVSS logic ranks them equally urgent. After applying context—internet exposure, revenue impact, compensating WAF rules—the team patched the portal the same day, isolated the build server behind additional controls, and scheduled a library upgrade for the next quarter. Zero incidents followed. Had they blindly chased CVSS numbers, they would have burned a weekend patching a server no attacker could reach while leaving their cash register wide open.


## Practical First Steps for Security Teams


- **Inventory Your Environment:** You can’t add context if you don’t know what assets exist or how they connect.
- **Tag Assets with Business Impact:** Critical system? Customer-facing? Executive workstation? Tag it.
- **Integrate Threat Intel Feeds:** Free sources like $ [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities) /$ or commercial services plug directly into most scanners and ticketing systems.
- **Automate Re-Scoring:** Use scripts or built-in scanner features to revise vulnerability scores based on new intel or exposure changes.
- **Communicate in Risk, Not Scores:** When briefing leadership, replace “We have 37 critical CVEs” with “Two internet-facing systems could enable ransomware takeover; patches are in testing and deploy tonight.” Context drives action.


**Inventory Your Environment:** You can’t add context if you don’t know what assets exist or how they connect.


**Tag Assets with Business Impact:** Critical system? Customer-facing? Executive workstation? Tag it.


**Integrate Threat Intel Feeds:** Free sources like $ [CISA KEV](https://www.cisa.gov/known-exploited-vulnerabilities) /$ or commercial services plug directly into most scanners and ticketing systems.


**Automate Re-Scoring:** Use scripts or built-in scanner features to revise vulnerability scores based on new intel or exposure changes.


**Communicate in Risk, Not Scores:** When briefing leadership, replace “We have 37 critical CVEs” with “Two internet-facing systems could enable ransomware takeover; patches are in testing and deploy tonight.” Context drives action.


## Final Thoughts


CVSS gave the industry a standardized yardstick when we desperately needed one. Two decades later, attackers move faster, environments are cloud-first, and “critical” is the new normal. If you still treat a CVSS base score like gospel, you’re operating on yesterday’s playbook. Inject business context, live threat data, and exposure analysis, and you’ll transform that blunt 10-point club into a surgical risk scalpel.


In short: CVSS isn’t hopeless—it’s just incomplete. Fix the gaps, and you’ll finally score risk the way the real world does.


Nate Nead


Nate Nead


Nate Nead is a technology entrepreneur and the CEO of Nead, LLC, where he leads multiple digital ventures spanning software development, AI, and cybersecurity. With over a decade of experience in building and scaling online platforms, Nate brings a practical, business-focused perspective to cybersecurity challenges. He is particularly interested in the intersection of data security, enterprise risk, and emerging technologies like AI and blockchain. On SEC.co, Nate writes about threat intelligence, cyber risk management, and how businesses can stay ahead of evolving digital threats. When he’s not working on tech solutions, Nate enjoys mountain biking in Bentonville, Arkansas, where he lives with his wife and four kids.
