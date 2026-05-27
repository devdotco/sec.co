---
slug: "covert-channels-in-legitimate-protocols"
title: "Covert Channels in Legitimate Protocols: DNS, ICMP, and More"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/covert-channels-in-legitimate-protocols"
---

In the fast-moving world of Cybersecurity & Cyberdefense, defenders often focus on the noisy threats—ransomware outbreaks, automated scans, and blunt-force credential stuffing. Yet a quieter menace routinely slips past perimeter devices: covert channels that ride on top of otherwise legitimate network protocols.


By disguising malicious traffic as “normal,” adversaries can smuggle data out of an organization, maintain resilient $ [command-and-control (C2)](https://sec.co/blog/command-and-control-%28c2%29-obfuscation) /$ links, or simply hide in plain sight for months. DNS and ICMP tunneling are the most talked-about examples, but they are only the tip of the iceberg. Understanding how these channels work—and how to spot and shut them down—has become an essential skill for security teams.


## Understanding Covert Channels


### The Concept in Plain Language


A covert channel is any method that allows information to flow in a way it was never intended to. Instead of inventing entirely new pathways, attackers hijack the “plumbing” that is already trusted inside a network. When an internal host sends what looks like a routine DNS query or ICMP echo request, most $ [firewalls and intrusion prevention systems](https://sec.co/blog/human-firewall-cybersecurity-culture) /$ treat it as benign. By embedding or “tunneling” extra data inside those packets, an attacker can conduct clandestine communications without drawing attention.


### Why Attackers Love Legitimate Protocols


- **Pervasiveness** : DNS and ICMP are everywhere and rarely blocked.
- **Plausibility** : Even during off-hours, it is normal to see DNS lookups or pings.
- **Evasion** : Many organizations use protocol-focused rulesets—anything that conforms to RFC syntax sails through.
- **Stealth Persistence** : Once the covert channel is in place, small bursts of data can drip out over weeks, staying below most alerting thresholds.


**Pervasiveness** : DNS and ICMP are everywhere and rarely blocked.


**Plausibility** : Even during off-hours, it is normal to see DNS lookups or pings.


**Evasion** : Many organizations use protocol-focused rulesets—anything that conforms to RFC syntax sails through.


**Stealth Persistence** : Once the covert channel is in place, small bursts of data can drip out over weeks, staying below most alerting thresholds.


## DNS Tunneling: The Workhorse of Hidden Traffic


### How It Works


DNS was designed for one purpose: to turn human-readable domain names into IP addresses. Each query contains a domain label, and that label can legally contain up to 255 bytes. A tunneling toolkit chops arbitrary data—password dumps, keystrokes, shell commands—into 255-byte chunks, base32 or base64-encoded it, and stuffs each chunk into the subdomain portion of a lookup.


A single exfiltration session might look like routine traffic to “data123.payload.example.com.” The attacker’s authoritative name server collects the queries, extracts the payload, and may even respond with commands embedded in its DNS answers.


### Notable Real-World Incidents


- A nation-state intrusion revealed in 2018 used $ [DNS TXT records](https://sec.co/blog/covert-channels-in-legitimate-protocols) /$ to siphon certificate private keys from targeted Middle Eastern telecoms.
- During a red-team exercise at a major bank, pentesters hid 40 MB of data inside thousands of seemingly random DNS queries over a weekend—no alerts were triggered.
- Malware such as “Dnscat2,” “Iodine,” and “DNSMessenger” remain open-source blueprints for adversaries to customize.


A nation-state intrusion revealed in 2018 used $ [DNS TXT records](https://sec.co/blog/covert-channels-in-legitimate-protocols) /$ to siphon certificate private keys from targeted Middle Eastern telecoms.


During a red-team exercise at a major bank, pentesters hid 40 MB of data inside thousands of seemingly random DNS queries over a weekend—no alerts were triggered.


Malware such as “Dnscat2,” “Iodine,” and “DNSMessenger” remain open-source blueprints for adversaries to customize.


### Detection Clues


- High volume of queries to domains with long or random-looking subdomains.
- Consistent query size or timing patterns, hinting at automation rather than human web activity.
- NXDOMAIN storms—multiple failed DNS replies because the authoritative server exists only to parse the hidden data.


High volume of queries to domains with long or random-looking subdomains.


Consistent query size or timing patterns, hinting at automation rather than human web activity.


NXDOMAIN storms—multiple failed DNS replies because the authoritative server exists only to parse the hidden data.


## ICMP Tunneling: The Unexpected Backdoor


### Echo Request and Reply Manipulation


ICMP, best known for the “ping” utility, carries small diagnostic or error messages. A threat actor can modify the data field of ICMP Type 8 (echo request) packets, embedding chunks of encrypted C2 traffic. On the return path, Type 0 (echo reply) delivers attacker instructions. Because many enterprises still allow outbound pings for troubleshooting, this covert channel often escapes notice.


### Challenges in Spotting ICMP Abuse


- **Packet Inspection Depth** : Some appliances only log ICMP headers, ignoring payload bytes.
- **Low Bandwidth Needs** : C2 instructions often fit comfortably within the 56-byte default data field, so traffic volume stays minimal.
- **Legacy Dependencies** : Blocking ICMP outright can break path MTU discovery and network diagnostics, so security teams hesitate to apply a firm hand.


**Packet Inspection Depth** : Some appliances only log ICMP headers, ignoring payload bytes.


**Low Bandwidth Needs** : C2 instructions often fit comfortably within the 56-byte default data field, so traffic volume stays minimal.


**Legacy Dependencies** : Blocking ICMP outright can break path MTU discovery and network diagnostics, so security teams hesitate to apply a firm hand.


## Beyond DNS and ICMP: Other Everyday Protocols Under Siege


### HTTP/S Tunnels


Attackers encapsulate arbitrary traffic inside HTTP POST bodies or WebSocket frames, then route everything through port 443. With TLS in place, traditional IDS devices see only encrypted blobs. Cloud-based $ [living off the land](https://sec.co/blog/defending-against-dll-hijacking-attacks) /$ tools—think Dropbox or Google Drive APIs—double as covert channels when authentication tokens are stolen.


### SMTP, FTP, and Even VoIP


Infiltrators attach archive files to self-addressed emails, pad FTP directory listings with hidden data, or hide encrypted text inside the steganographic slack space of voice packets. The unifying theme: pick a protocol the target already relies on, then weaponize it.


### DoH and DoT: The Next Frontier


DNS over HTTPS (DoH) and DNS over TLS (DoT) were introduced for privacy, but they also blind traditional DNS monitoring. When a laptop queries a malicious domain through DoH, the content is tucked inside an HTTPS request, making classic tunneling harder to inspect yet easier to conceal.


## Building a Defense: From Visibility to Response


### Layered Monitoring Beats Single-Point Filters


No single control can foil every covert channel, but stacking defenses dramatically raises the attacker’s cost:


- **Network Flow Analytics** : Track per-host baselines for DNS, ICMP, and HTTP volume. Sudden spikes become red flags.
- $ [Deep Packet Inspection (DPI)](https://sec.co/blog/flow-based-detection-vs-dpi-performance-vs-precision) /$ : Inspect payload length, randomness, and entropy—even inside “legitimate” protocols.
- **Secure DNS Forwarders** : Route all internal lookups through resolvers that log full query strings and apply anomaly detection.
- **Endpoint Telemetry** : Correlate unusual network activity with process lineage; a whoami.exe making 10,000 DNS queries stands out.
- $ [Zero Trust](https://sec.co/blog/identity-federation-vs-zero-trust-choosing-the-right-model-for-cloud-security) /$ Segmentation: Restrict which hosts can initiate external ICMP or reach arbitrary DNS servers; force egress through controlled gateways.


**Network Flow Analytics** : Track per-host baselines for DNS, ICMP, and HTTP volume. Sudden spikes become red flags.


$ [Deep Packet Inspection (DPI)](https://sec.co/blog/flow-based-detection-vs-dpi-performance-vs-precision) /$ : Inspect payload length, randomness, and entropy—even inside “legitimate” protocols.


**Secure DNS Forwarders** : Route all internal lookups through resolvers that log full query strings and apply anomaly detection.


**Endpoint Telemetry** : Correlate unusual network activity with process lineage; a whoami.exe making 10,000 DNS queries stands out.


$ [Zero Trust](https://sec.co/blog/identity-federation-vs-zero-trust-choosing-the-right-model-for-cloud-security) /$ Segmentation: Restrict which hosts can initiate external ICMP or reach arbitrary DNS servers; force egress through controlled gateways.


## Practical Countermeasures in Daily Operations


- **Log Everything, Keep It Longer** : Thirty days of PCAP or flow data is rarely enough to observe drip-feed exfiltration campaigns.
- **Alert on Obfuscation Patterns** : Long domain labels with high Shannon entropy are unnatural; tune SIEM rules accordingly.
- **Enforce Egress Filtering** : Only allow DNS queries to designated resolvers, block direct UDP/53 to the internet, and disable outbound ICMP unless business-justified.
- **Test Your Defenses** : Schedule red-team or purple-team engagements that specifically attempt DNS and ICMP tunneling; refine rules based on findings.
- **Educate System Owners** : Network engineers may resist ICMP restrictions—show them telemetry to build consensus, not conflict.


**Log Everything, Keep It Longer** : Thirty days of PCAP or flow data is rarely enough to observe drip-feed exfiltration campaigns.


**Alert on Obfuscation Patterns** : Long domain labels with high Shannon entropy are unnatural; tune SIEM rules accordingly.


**Enforce Egress Filtering** : Only allow DNS queries to designated resolvers, block direct UDP/53 to the internet, and disable outbound ICMP unless business-justified.


**Test Your Defenses** : Schedule red-team or purple-team engagements that specifically attempt DNS and ICMP tunneling; refine rules based on findings.


**Educate System Owners** : Network engineers may resist ICMP restrictions—show them telemetry to build consensus, not conflict.


## Conclusion


Covert channels succeed because they borrow the trust we place in the basic plumbing of the internet. DNS was never meant to act as a highway for stolen databases, just as ICMP was never designed to ferry shell commands across continents. Yet in modern threat landscapes, these everyday protocols are among an adversary’s favorite camouflage.


The good news? With the right blend of visibility, analytics, and policy, defenders can drag these hidden conversations into the light. From fine-grained DNS logging to judicious ICMP controls and encrypted-traffic inspection, every layer matters. By treating covert channels as a core pillar of incident response—not an edge-case curiosity—organizations can tilt the balance of power back toward proactive Cybersecurity & Cyberdefense.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
