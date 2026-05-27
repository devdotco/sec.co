---
slug: "public-key-infrastructure-issues"
title: "What’s Actually Broken in PKI (And What’s Just Misunderstood)"
date: ""
description: "SEC.co is a cybersecurity and cyberdefense company with a focus on providing expert cybersecurity and SECops consulting to organizations worldwide."
source: "https://sec.co/blog/public-key-infrastructure-issues"
---

Public Key Infrastructure (PKI) has been called the internet’s duct tape and its Achilles’ heel—sometimes in the very same breath. Whenever a certificate authority (CA) gets delisted or a high-profile breach makes the news, “PKI is broken!” headlines follow.


Yet browsers keep loading pages over HTTPS, software continues to ship with valid signatures, and remote workers still authenticate to their VPNs every morning. So what’s genuinely falling apart inside PKI, and what’s simply getting a bad rap?


## Peeling Back the Layers of PKI


At its core, PKI is a bundle of cryptographic math, operational procedures, and human governance. The cryptography—RSA, ECC, hash functions—remains mathematically sound when properly implemented.


Where things wobble is in the operational and human layers: certificate issuance, revocation, storage, and policy enforcement. Understanding which problems belong to which layer helps separate “actually broken” from “largely misunderstood.”


## The Math Is Solid—It’s the Management That Hurts


Encryption algorithms and key–pair generation are not the culprits behind most PKI headaches. Instead, friction shows up during certificate lifecycle management:


- **Enrollment sprawl:** Enterprises juggle $ [public-facing TLS certs](https://sec.co/blog/tls-fingerprinting-at-scale) /$ , internal service certs, user auth certs, and code-signing certs, often issued by separate teams or third-party providers.
- **Shadow certificates:** Engineers spin up test environments, grab short-lived certs, and forget to revoke or renew them. Months later, those certs still sit in production workloads.
- **Renewal panic:** Expiry sneaks up on a business unit, a certificate lapses over the weekend, and suddenly customers stare at scary browser warnings.


**Enrollment sprawl:** Enterprises juggle $ [public-facing TLS certs](https://sec.co/blog/tls-fingerprinting-at-scale) /$ , internal service certs, user auth certs, and code-signing certs, often issued by separate teams or third-party providers.


**Shadow certificates:** Engineers spin up test environments, grab short-lived certs, and forget to revoke or renew them. Months later, those certs still sit in production workloads.


**Renewal panic:** Expiry sneaks up on a business unit, a certificate lapses over the weekend, and suddenly customers stare at scary browser warnings.


None of this stems from a flaw in RSA or ECDSA. It’s process debt: lack of inventory, weak automation, and siloed ownership.


Modern ACME-based issuance, certificate-discovery scanners, and central dashboards fix most of these snags—but only if the organization embraces them. Until then, the “PKI is broken!” refrain is really “our inventory is broken.”


## Certificate Revocation: Patchwork Solutions, Predictable Pain


Revocation is the one place where critics have a point—PKI’s original design did not anticipate today’s scale or latency demands.


Early designs leaned on **Certificate Revocation Lists (CRLs):** massive, periodically updated files clients must download. When certificates numbered in the thousands, CRLs worked. At today’s billions-strong certificate population, a CRL can balloon to hundreds of megabytes.


**Online Certificate Status Protocol (OCSP)** was supposed to help by letting clients query a responder for a single certificate’s status. The drawbacks are familiar: extra round-trips delay page loads, poorly configured responders time out, and privacy advocates dislike the browser “phone-home” pattern.


Browsers have patched the pain with **OCSP stapling** , **CRLite** , and **short-lived certificates** that expire before they need revoking. These mitigations work, but they feel like bolted-on plumbing more than clean design.


So is revocation “broken”? In a sense, yes: the heritage mechanisms are clumsy. But the web PKI community is iterating, and real-world failures are increasingly rare because of those layers of compensating controls.


## Trust Stores and Governance: Complicated, Not Broken


Every operating system and browser ships a root store—a curated list of certificate authorities it’s willing to trust. When a CA behaves badly or gets breached, the browser vendors yank its root and push an update.


Commentary after each incident inevitably screams “the CA model has failed.” More often, the model has actually worked: a misbehaving CA is detected, audited, and removed before large-scale damage.


The real pain is governance complexity:


- Dozens of browsers and operating systems maintain separate, sometimes overlapping root stores.
- Enterprises run their own private roots for internal traffic and must keep those roots synchronized across mobile devices, BYOD endpoints, and cloud workloads.
- Cross-jurisdiction compliance adds red tape, especially in finance and government.


Dozens of browsers and operating systems maintain separate, sometimes overlapping root stores.


Enterprises run their own private roots for internal traffic and must keep those roots synchronized across mobile devices, BYOD endpoints, and cloud workloads.


Cross-jurisdiction compliance adds red tape, especially in finance and government.


These hurdles are operationally messy, but they are surmountable with clear policy, automation, and transparency logs like **Certificate Transparency (CT)** , which have already made fraudulent certificates far easier to detect.


The root-store system is noisy and political, yet it keeps bad actors at bay surprisingly well.


## Post-Quantum Anxiety: An Evolution, Not a Collapse


Looming on the horizon is the fear that quantum computers will unravel today’s asymmetric cryptography. That prospect fuels many “PKI is doomed” sound bites.


The truth is more nuanced:


- **NIST** is already standardizing post-quantum algorithms (e.g., CRYSTALS-KYBER, CRYSTALS-DILITHIUM).
- **Hybrid certificates** —combining a classical and a post-quantum signature—are being tested in browsers and operating systems right now.
- Migration can follow the same playbook used when **SHA-1** was retired: staged deprecation, compatibility windows, and aggressive linter checks.


**NIST** is already standardizing post-quantum algorithms (e.g., CRYSTALS-KYBER, CRYSTALS-DILITHIUM).


**Hybrid certificates** —combining a classical and a post-quantum signature—are being tested in browsers and operating systems right now.


Migration can follow the same playbook used when **SHA-1** was retired: staged deprecation, compatibility windows, and aggressive linter checks.


Quantum-safe PKI will demand new algorithms and larger key sizes, but it won’t scrap the trust-hierarchy model or certificate-binding concepts. In other words, the engine will get a new set of pistons, not an entirely different vehicle.


## What’s Truly Broken vs. Misunderstood


**Where PKI shows genuine cracks:**


- Legacy revocation mechanisms (CRLs, non-stapled OCSP)
- Manual, spreadsheet-driven certificate inventory and renewal
- Siloed ownership that hides expired or rogue certs until they fail


Legacy revocation mechanisms (CRLs, non-stapled OCSP)


Manual, spreadsheet-driven certificate inventory and renewal


Siloed ownership that hides expired or rogue certs until they fail


**Where PKI is merely misunderstood:**


- The mathematical strength of RSA/ECC when key sizes are modern
- Browser trust-store governance, noisy but largely effective
- The perceived “quantum apocalypse,” which is already being engineered around


The mathematical strength of RSA/ECC when key sizes are modern


Browser trust-store governance, noisy but largely effective


The perceived “quantum apocalypse,” which is already being engineered around


The distinction matters. Calling PKI “broken” can nudge organizations toward simplistic “trust-on-first-use” shortcuts or proprietary key exchanges that lack peer review.


A more $ [productive framing](https://sec.co/blog/nist-800-53-vs-iso-27001-which-framework-fits-your-security-strategy) /$ is that PKI’s plumbing needs regular maintenance—inventory automation, short-lived certs, CT monitoring, and carefully managed private roots.


## Final Thoughts


A functioning PKI is less about cryptographic wizardry and more about disciplined operations.


Automated issuance via ACME, continuous discovery scans, intuitive dashboards, and alerting before expiry can prevent 90% of headline-grabbing outages. Meanwhile, the community’s ongoing work on lightweight revocation, encrypted OCSP, and post-quantum readiness shows that PKI is anything but stagnant.


The next time someone declares that PKI is hopelessly broken, remember that the same system quietly secures trillions of dollars in e-commerce, signs every mainstream operating-system update, and authenticates millions of corporate logins each day.


That doesn’t sound like a corpse; it sounds like infrastructure doing its job—imperfectly, but reliably—while its caretakers keep hammering out the dents.


Eric Lamanna


Eric Lamanna


Eric Lamanna is a Digital Sales Manager with a strong passion for software and website development, AI, automation, and cybersecurity. With a background in multimedia design and years of hands-on experience in tech-driven sales, Eric thrives at the intersection of innovation and strategy—helping businesses grow through smart, scalable solutions. He specializes in streamlining workflows, improving digital security, and guiding clients through the fast-changing landscape of technology. Known for building strong, lasting relationships, Eric is committed to delivering results that make a meaningful difference. He holds a degree in multimedia design from Olympic College and lives in Denver, Colorado, with his wife and children.
