---
slug: "encrypted-dns-enterprises-doh-dot-policy-monitoring"
title: "Encrypted DNS in Enterprises: DoH/DoT Policy and Monitoring"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/encrypted-dns-enterprises-doh-dot-policy-monitoring"
---

Encrypted DNS is the sort of topic that makes security teams sit up straight and reach for coffee, because it blends privacy, control, and a dash of drama. In enterprises, DNS over HTTPS and DNS over TLS can shut the door on easy eavesdropping, yet they can also hide activity that teams need to see. Balancing policy and monitoring without wrecking productivity is the name of the game in $ [cybersecurity & cyberdefense](../) /$ .


If you do it well, your users get privacy, your analysts get insight, and your auditors stop sending those all-caps emails. If you do it poorly, you get gaps, noise, and a broken help desk queue. Let’s do it well.


## What Encrypted DNS Actually Changes


Traditional DNS is chatty and easy to inspect. Encrypted DNS wraps those queries in TLS, so passive observers cannot read the domain names in transit. That is great for privacy and often improves integrity, since clients validate the resolver’s certificate. It also means classic network taps and middleboxes can no longer watch queries roll by. The traffic still leaves traces, just not the obvious ones that used to float past in plain text.


## DoH vs. DoT vs. DoQ


DNS over HTTPS runs over standard HTTPS on port 443, which blends neatly with web traffic and often slips through even restrictive egress rules. DNS over TLS uses port 853 and looks like dedicated DNS security plumbing, which makes it simpler to identify and control.


DNS over QUIC rides on UDP with a $ [TLS-like handshake](https://sec.co/blog/tls-fingerprinting-at-scale) /$ and a performance focus. The right choice depends on your tooling, your egress policies, and the resolvers you trust. Many enterprises standardize on a single method to simplify troubleshooting.


## Why Enterprises Care About Policy


A good policy is a promise: privacy for end users, visibility for defenders, and reliability for the business. Without policy, you get shadow resolvers, inconsistent device behavior, and troubleshooting that feels like chasing butterflies in a wind tunnel. With policy, you define who resolves what, where, with what encryption, and how you observe it. That policy becomes the backbone for controls in identity providers, device management tools, firewalls, and SIEM rules.


## Policy Design Principles That Work


Start with a clear statement of intent. For most organizations, that intent is to encrypt DNS on every managed device, direct those queries to trusted resolvers, and prevent unknown applications from sending DNS to the public internet. The second principle is to map identities to resolution paths.


The finance team on managed laptops might use a corporate resolver with threat filtering. Developers on build servers might need access to internal zones, lab zones, and public resolvers, all through a controlled gateway.


### Default-Deny With Clear Exceptions


If you can, block outbound DoH and DoT to the open internet, then allow only your sanctioned resolvers or a small set of vetted providers. Publish a simple exception process. If a product team needs an external resolver, make them document why, for how long, and what monitoring you will keep in place. Keep the exception short lived and visible.


### Identity-Aware Resolution


Tie $ [DNS paths](https://sec.co/blog/red-team-infrastructure-at-scale) /$ to user and device identity. Managed devices should authenticate to your resolver using client certificates or tokens. That lets you link queries to a device record and a human. It also keeps your resolver from becoming a free service for freeloaders who discover your IP.


### Location and Device State


Your policy should consider whether a device is on campus, in a branch, or roaming. It should also consider device posture. If the endpoint agent is unhealthy, route DNS through a stricter path. If the device is compliant, relax only what you must so people can actually do their jobs.


## Deployment Patterns That Keep You Sane


Many enterprises standardize on a centralized or regional set of resolvers that accept DoT or DoH from managed clients. These resolvers forward to authoritative sources, apply threat intelligence, and export logs. The beauty is consistency. Your SOC knows where to look, your auditors know what to check, and your operations team has knobs to turn that affect the whole fleet.


### Corporate DoT With Egress Controls


If you prefer DoT, lock down port 853 to your resolvers and to a very short allowlist of external providers for redundancy. Enforce this on firewalls and cloud egress gateways. Publish resolver addresses via MDM and system profiles so clients auto-discover and use them without hacks.


### DoH With Trusted Endpoints


If you prefer DoH, use known resolver endpoints and pin them in configuration. Some enterprises deploy an on-premise DoH gateway that bridges to upstream while keeping logs local. Close the door to random DoH endpoints by blocking known public DoH hostnames at egress, then verify with periodic scans.


### Roaming Users and Split Brain


Remote users are where good intentions go to break. Use your $ [VPN or ZTNA client](https://medium.com/@mmeranfarooq/vpn-vs-ztna-whats-the-difference-d7862937709f) /$ to steer only enterprise DNS to your resolver while leaving local consumer domains alone. For internal zones, publish them only through your resolver. For public domains, forward upstream. Keep the split predictable, and document it so the help desk is not guessing.


## Monitoring Without Overreach


Encrypted DNS does not mean invisible DNS. You can monitor at the resolver, at the endpoint agent, and at the egress gateway. The sweet spot is to collect rich telemetry at the resolver and minimal yet meaningful telemetry at the endpoint. You do not need to record every request forever. You do need to be able to answer who resolved what, roughly when, and from which device identity.


### Telemetry Sources That Matter


Your resolver can export logs to a SIEM with fields for domain, response code, client identity, and policy action. Your $ [endpoint agent](https://sec.co/blog/quic-visibility-telemetry-threat-detection-without-decryption) /$ can record resolver health, failure counts, and whether it detects an application trying to bypass policy. Your egress layer can log attempted connections to known public DoH hosts that your policy blocks. That trio is enough for most investigations.


### What To Alert On


Alert when a managed device resolves domains through an unknown resolver, when an application opens a session to a public DoH endpoint, when a user hits a domain on your threat list, and when query volumes spike far beyond normal baselines. Keep thresholds tight enough to catch real trouble and loose enough to avoid waking people up because a developer ran a package install.


## Handling BYOD and Shadow DoH


Personal devices are tricky, since you cannot push system profiles everywhere. Start with network egress controls that block public DoH and DoT from guest segments. Offer a guest resolver that supports DoT so privacy is still strong, and publish those settings prominently on the captive portal.


For managed mobile devices, enforce resolver profiles through MDM and verify with periodic compliance checks. For unmanaged but business-critical partners, give them a restricted network and a resolver profile that satisfies your monitoring needs without heavy-handed rules.


## Incident Response And Forensics


When something goes bump, you want a clean trail. That means resolver logs linked to device identities, endpoint agent health records, and egress blocks that show attempted circumvention. Create playbooks that start with resolver logs, pivot to endpoint evidence, and then confirm whether the traffic attempted to use alternate DNS channels. Keep the playbooks boring, repeatable, and short enough that responders actually follow them.


## Compliance And Data Retention


Retention should match regulation and risk, not curiosity. Keep detailed DNS logs for a period that supports your investigations, usually measured in weeks or a few months. After that, roll up to aggregates. Protect logs with the same rigor as email or HR data. If you export DNS telemetry to a third party, document the purpose, the controls, and the data elements, then run a privacy review. Your legal team will thank you later.


## Future-Proofing For New Protocols


Encrypted Client Hello limits what you can learn from TLS handshake metadata. Oblivious DoH pushes privacy even further by separating client identity from query content through relays. DNS over QUIC will be more common as performance wins keep stacking up.


None of this breaks your strategy if you anchor it in identity, sanctioned resolvers, and endpoints that attest to their configuration. The more privacy the internet adds by default, the more important it is to align resolution with device and user identity.


## Common Pitfalls To Avoid


Do not chase total visibility at the cost of user trust. Do not allow every public resolver under the sun just because a vendor demo made it look convenient. Do not rely only on $ [network inspection](./real-time-packet-inspection-deep-dive-into-performance-vs-precision) /$ to catch bypasses, since DoH on port 443 looks like every other web session.


Do not forget about internal names and split horizon DNS. Do not assume developers will read your wiki pages. Bake configuration into device management, automate checks, and verify continuously.


## Putting It All Together


A mature deployment feels simple. Managed devices automatically use your resolvers with DoH or DoT. Unknown resolvers are blocked at egress. Your SOC sees clean, correlated logs and a handful of well-tuned alerts. BYOD users get privacy-friendly resolver options that still play nicely with your network.


Incident responders know exactly where to look when something misbehaves, and auditors get a crisp document that shows how policy maps to controls and outcomes. Users, meanwhile, keep working without thinking about DNS at all, which is the real victory.


## Conclusion


Encrypted DNS is not a binary choice between privacy and visibility. It is a design exercise that starts with identity, continues with sanctioned resolvers and tight egress, and ends with focused telemetry. Keep the policy simple enough to follow, yet firm enough to stand up to modern applications.


Monitor at the resolver and the endpoint rather than trying to pry open traffic on the wire. Plan for BYOD with guest-friendly settings that still respect your boundaries. If you do this, you get quieter alerts, happier users, and far fewer mysteries lurking in your network. And you get to say your DNS is both private and well behaved, which is a rare and delightful combination.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
