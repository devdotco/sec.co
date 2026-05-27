/**
 * Service-page content store.
 *
 * Keys are the URL slug; values are the full ServiceDetailConfig the
 * shared `<ServiceDetailPage>` template renders.
 *
 * Each page file under `src/app/services/<slug>/page.tsx` imports its config
 * from here. This lets us edit content centrally without touching routing.
 *
 * Flagship pages (vciso, mdr, penetration-testing, incident-response-retainer)
 * have their own explicit page files with inline configs — kept that way
 * because they were authored first and are the highest-value pages.
 */

import type { ServiceDetailConfig } from "@/components/site/service-detail";

type ServicePage = {
  meta: { title: string; description: string };
  config: ServiceDetailConfig;
};

export const SERVICE_PAGES: Record<string, ServicePage> = {
  // ─── Advisory & Governance ────────────────────────────────────────────────

  "cyber-risk-assessment": {
    meta: {
      title: "Cyber Risk Assessment",
      description: "A two-week diagnostic that produces a prioritized roadmap and a board-ready executive readout — the cheapest possible way to find out where you actually stand.",
    },
    config: {
      category: "Advisory & Governance",
      title: <>The fastest way to find out <span className="brand-gradient-text">where you actually stand</span>.</>,
      sub: "Most engagements start here. Two weeks, a senior practitioner, and a prioritized roadmap your board can act on. The right answer to most security questions is a risk assessment first.",
      primaryCta: { href: "/contact?topic=assessment", label: "Schedule the assessment" },
      secondaryCta: { href: "/process", label: "How engagements work" },
      factStrip: [
        { label: "Duration", value: "2 weeks" },
        { label: "Engagement", value: "Fixed price" },
        { label: "Team", value: "Senior lead" },
        { label: "Deliverable", value: "Roadmap + readout" },
      ],
      included: {
        title: "What gets assessed",
        items: [
          { title: "Identity & access posture", body: "MFA coverage, privileged-access controls, lifecycle automation, federation hygiene." },
          { title: "Endpoint & cloud telemetry", body: "EDR/SIEM coverage map against MITRE ATT&CK, with gap analysis." },
          { title: "Vendor & supply-chain risk", body: "Critical third parties inventoried with concentration-risk view." },
          { title: "Compliance gap (if relevant)", body: "Mapped against the framework that actually applies to you — SOC 2, CMMC, HIPAA, etc." },
          { title: "Incident readiness", body: "Runbook review, escalation paths, contact verification, tabletop scenario." },
          { title: "Board-level narrative", body: "Your security story translated for executive and board audiences." },
        ],
      },
      process: {
        title: "Two weeks from kickoff to readout",
        steps: [
          { eyebrow: "Day 1–3", title: "Stakeholder interviews", body: "60-min conversations with engineering, security, IT, legal, and an executive sponsor. We listen before we recommend." },
          { eyebrow: "Day 3–7", title: "Stack & data review", body: "Configuration review of the most-load-bearing controls. Active scanning where authorized." },
          { eyebrow: "Day 7–10", title: "Synthesis & roadmap", body: "Findings synthesized, prioritized, and ranked by business impact. We build the 12-month plan." },
          { eyebrow: "Day 10–14", title: "Executive readout", body: "90-minute readout with leadership + Q&A. You get the deck, the detailed findings, and the prioritized punch list." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "12-month security roadmap with quarter-by-quarter priorities",
          "Risk register tied to actual business impact",
          "Quick-win punch list — things you can act on this week",
          "Compliance gap map (if a framework applies)",
          "Board-ready executive readout deck",
          "Authoritative recommendation on what to build vs. buy vs. outsource",
        ],
      },
      related: [
        { href: "/services/vciso", title: "vCISO Services", body: "Most assessments lead into vCISO engagements — same team, same plan, executed." },
        { href: "/services/cybersecurity-program-development", title: "Program Development", body: "If the roadmap calls for net-new program work." },
        { href: "/services/mdr", title: "Managed Detection & Response", body: "If the gap analysis shows monitoring is the biggest hole." },
      ],
      finalCta: {
        title: <>Start with the assessment.</>,
        body: "It's the cheapest engagement we offer and the most leveraged. We'll be honest with you about whether you need us at all.",
        primary: { href: "/contact?topic=assessment", label: "Schedule the assessment" },
        secondary: { href: "/services", label: "Browse all services" },
      },
    },
  },

  "cybersecurity-program-development": {
    meta: {
      title: "Cybersecurity Program Development",
      description: "Build a real security program — policies, controls, runbooks, training, and operating cadence — from a 90-day baseline to a sustainable operating model.",
    },
    config: {
      category: "Advisory & Governance",
      title: <>Build a real program, <span className="brand-gradient-text">not a binder</span>.</>,
      sub: "Most companies have security tools but not a security program. We build the operating layer: policies that match how you actually work, controls that fit your stack, runbooks your engineers will read, and a calendar that keeps the program alive.",
      primaryCta: { href: "/contact?topic=other", label: "Scope program development" },
      factStrip: [
        { label: "Duration", value: "90–180 days" },
        { label: "Output", value: "Operating program" },
        { label: "Cadence", value: "Weekly delivery" },
        { label: "Handoff", value: "Yes" },
      ],
      included: {
        title: "What we build",
        items: [
          { title: "Policy library", body: "Written for your stack and stage, not a template-shop dump. Policies your engineers will actually follow." },
          { title: "Control framework", body: "Mapped to whichever framework applies (NIST CSF, ISO 27001, CIS, SOC 2). Owners assigned, evidence required." },
          { title: "Runbooks & playbooks", body: "Operational playbooks for the events you'll actually face — onboarding, offboarding, IR, vendor reviews." },
          { title: "Risk register & exception process", body: "A risk register tied to revenue impact, with a working exception process — not just a spreadsheet." },
          { title: "Training & awareness program", body: "Role-based, including engineering-specific and executive-specific tracks. Not generic phishing modules." },
          { title: "Calendar & cadence", body: "Quarterly board cadence, monthly executive readout, weekly security stand-up. We set the rhythm." },
        ],
      },
      process: {
        title: "From baseline to operating program",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Baseline assessment", body: "What exists, what works, what's a gap. We don't rebuild what already works." },
          { eyebrow: "Weeks 2–6", title: "Policy & control authoring", body: "Iterative authoring with stakeholder review. Policies are written FOR the people who'll follow them." },
          { eyebrow: "Weeks 6–10", title: "Runbook & training rollout", body: "Operational playbooks deployed; training launched with tracking; awareness baselined." },
          { eyebrow: "Weeks 10–12", title: "Operating handoff", body: "Calendar, cadence, and ownership transferred to your team — or operated by us if you stay on retainer." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "A working security program, not just documents",
          "Policy library that survives auditor review",
          "Control framework with named owners and evidence requirements",
          "Runbooks for the events you'll actually face",
          "Risk register tied to revenue impact",
          "Quarterly operating cadence that keeps the program alive",
          "Audit-ready posture for SOC 2, ISO 27001, CMMC, or HIPAA",
          "Defensible security narrative for board and customers",
        ],
      },
      related: [
        { href: "/services/vciso", title: "vCISO Services", body: "Program development is often the lead-in to a vCISO retainer." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "If you haven't established the baseline yet, start here." },
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Program development is the path to SOC 2 audit-readiness." },
      ],
      finalCta: {
        title: <>Stop having tools without a program.</>,
        body: "Most companies have spent more on security tools than on the program that operates them. A 90-day engagement closes that gap.",
        primary: { href: "/contact?topic=other", label: "Scope it with us" },
        secondary: { href: "/services/cyber-risk-assessment", label: "Or start with an assessment" },
      },
    },
  },

  "vendor-risk-management": {
    meta: {
      title: "Vendor Risk Management",
      description: "Inventory, assess, and continuously monitor third parties touching your data. Reduce the blast radius of a supply-chain compromise.",
    },
    config: {
      category: "Advisory & Governance",
      title: <>Your third parties are <span className="brand-gradient-text">part of your attack surface</span>.</>,
      sub: "Most breaches start with a vendor. We inventory who touches what data, assess them against a calibrated risk threshold, and monitor for material changes — without the questionnaire-fatigue theater.",
      primaryCta: { href: "/contact?topic=other", label: "Start a VRM engagement" },
      factStrip: [
        { label: "Engagement", value: "Project or ongoing" },
        { label: "Coverage", value: "Tiered" },
        { label: "Inventory", value: "Yes" },
        { label: "Monitoring", value: "Continuous" },
      ],
      included: {
        title: "What VRM covers",
        items: [
          { title: "Vendor inventory & tiering", body: "Inventory all third parties, tier by data sensitivity and operational dependency. Concentration risk surfaced." },
          { title: "Calibrated assessment depth", body: "Tier-1 vendors get deep questionnaires + evidence review; tier-3 gets a smoke test. Effort matches risk." },
          { title: "Contract & DPA review", body: "Security clauses, breach-notification timing, audit rights — reviewed against your risk register." },
          { title: "Continuous monitoring", body: "Public-signal monitoring (data breaches, certificate expiries, ratings shifts) on tier-1 vendors." },
          { title: "Onboarding & renewal workflows", body: "VRM integrated into procurement so it doesn't get bypassed under deadline pressure." },
          { title: "Annual vendor review", body: "Tier-1 vendors re-assessed annually with evidence refresh. Tier-3 spot-checked." },
        ],
      },
      process: {
        title: "Build the program, then operate it",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Inventory & tiering", body: "Pull from procurement, finance, and IT to build a complete vendor picture. Tier by data + operational risk." },
          { eyebrow: "Weeks 2–6", title: "Tier-1 assessments", body: "Deep assessments on the riskiest vendors — questionnaires, evidence requests, attestation review." },
          { eyebrow: "Weeks 6–8", title: "Workflow integration", body: "VRM checkpoints embedded in procurement, contract review, and renewal cycles." },
          { eyebrow: "Ongoing", title: "Monitor & renew", body: "Continuous monitoring on tier-1, annual refresh on all, ad-hoc on triggers." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Complete vendor inventory tiered by data + operational risk",
          "Concentration-risk view across the supply chain",
          "Tier-1 vendors assessed with evidence on file",
          "Procurement integration so VRM isn't bypassed",
          "Continuous monitoring on the highest-risk vendors",
          "Audit-evidence for SOC 2 vendor management criteria",
        ],
      },
      related: [
        { href: "/compliance/vendor-security-reviews", title: "Vendor Security Reviews", body: "When you're on the receiving end of a customer's VRM." },
        { href: "/compliance/security-questionnaires", title: "Security Questionnaires", body: "Answer-library service that turns VRM responses into a managed workflow." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "VRM often surfaces in the broader risk assessment." },
      ],
    },
  },

  "cyber-insurance-readiness": {
    meta: {
      title: "Cyber Insurance Readiness",
      description: "Pre-binding controls review to get better premiums, and post-claim support to keep claims paid. Underwriters are auditors with checkbooks.",
    },
    config: {
      category: "Advisory & Governance",
      title: <>Underwriters are <span className="brand-gradient-text">auditors with checkbooks</span>.</>,
      sub: "Cyber insurance premiums and claim outcomes are downstream of the same controls. We prepare you for both — the broker conversation that gets you the right policy, and the post-claim posture that gets the claim paid.",
      primaryCta: { href: "/contact?topic=other", label: "Renewal coming up?" },
      factStrip: [
        { label: "Engagement", value: "Project" },
        { label: "Cadence", value: "Annual" },
        { label: "Outcome", value: "Better terms" },
        { label: "Claim support", value: "Available" },
      ],
      included: {
        title: "What we do",
        items: [
          { title: "Pre-binding controls review", body: "What underwriters are actually scoring you on this cycle — MFA, EDR coverage, backup integrity, segmentation." },
          { title: "Application review & coaching", body: "Most applications are answered conservatively to avoid future denial. We help you answer accurately and favorably." },
          { title: "Broker conversation support", body: "We sit with you and your broker to translate the technical posture into underwriter language." },
          { title: "Post-binding controls gap closure", body: "If the policy assumes controls you don't yet have, we close them before binding." },
          { title: "Claim-readiness package", body: "The evidence package the claim adjuster needs to validate your controls. Pre-built." },
          { title: "Post-claim engagement support", body: "If you have an incident, we work with your breach coach and broker to keep the claim on track." },
        ],
      },
      process: {
        title: "Renewal cycle, end to end",
        steps: [
          { eyebrow: "T-90 days", title: "Posture review", body: "Where you stand against this year's underwriting criteria. What's improved, what's slipped, what's new." },
          { eyebrow: "T-60 days", title: "Application prep", body: "Application answered with documented evidence. Conservative claims pre-flagged for accuracy." },
          { eyebrow: "T-30 days", title: "Broker & underwriter conversations", body: "We participate to translate the controls story. Often unlocks better terms." },
          { eyebrow: "Bind", title: "Controls gap closure", body: "Anything the policy assumes that you don't yet have — closed before binding so the policy is enforceable." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Documented controls posture aligned to this cycle's underwriting criteria",
          "Accurately-answered application that won't void the policy",
          "Better premiums or better terms (or both) most cycles",
          "Pre-built claim-readiness package",
          "Broker relationship that's calibrated to your actual posture",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "Incident Response Retainer", body: "Retainer letters are commonly credited by underwriters." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "The assessment doubles as underwriting evidence." },
        { href: "/tools/cyber-insurance-readiness", title: "Insurance Readiness Checklist", body: "Self-serve checklist if you want to start solo." },
      ],
    },
  },

  // ─── Security Testing ─────────────────────────────────────────────────────

  "vulnerability-assessment": {
    meta: {
      title: "Vulnerability Assessment",
      description: "Authenticated scans across infrastructure, identity, and cloud with risk-ranked remediation guidance. Quarterly cadence, audit-ready evidence.",
    },
    config: {
      category: "Security Testing",
      title: <>Find what's actually exploitable — <span className="brand-gradient-text">and act on it</span>.</>,
      sub: "Authenticated, credentialed scans across infrastructure, identity, and cloud — paired with manual validation so you're not chasing scanner false-positives. Remediation guidance ranked by exploitability and business impact.",
      primaryCta: { href: "/contact?topic=testing", label: "Scope a VA cycle" },
      factStrip: [
        { label: "Engagement", value: "Project or quarterly" },
        { label: "Method", value: "Authenticated + manual" },
        { label: "Output", value: "Risk-ranked roadmap" },
        { label: "Retest", value: "Included" },
      ],
      included: {
        title: "What we scan",
        items: [
          { title: "External infrastructure", body: "Internet-exposed perimeter, certificates, exposed services, and the long tail of forgotten assets." },
          { title: "Internal network & identity", body: "Authenticated scans of internal hosts, AD/Entra configuration, and privileged access surface." },
          { title: "Cloud configuration", body: "AWS, Azure, GCP posture against CIS benchmarks and provider best practices." },
          { title: "Application stack", body: "Web apps, APIs, container images, and dependency vulnerabilities (SCA)." },
          { title: "Manual validation", body: "False-positives stripped out before you see the report. You don't pay to chase noise." },
          { title: "Risk-ranked remediation", body: "Findings prioritized by exploitability × business impact, with engineering-ready fix guidance." },
        ],
      },
      process: {
        title: "From scoping to retest",
        steps: [
          { eyebrow: "Week 0", title: "Scoping", body: "We agree on targets, credentials, scan windows, and what's out of scope." },
          { eyebrow: "Week 1", title: "Discovery & scanning", body: "Asset discovery, authenticated scans, manual validation of findings." },
          { eyebrow: "Week 2", title: "Report & remediation guidance", body: "Risk-ranked report with executive summary, technical detail, and remediation steps." },
          { eyebrow: "Day 30", title: "Retest & attestation", body: "Retest of remediated findings; final attestation letter for auditors and customers." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Risk-ranked findings stripped of false positives",
          "Engineering-ready remediation steps per finding",
          "Quarterly trend data (if on a recurring cadence)",
          "Audit-evidence for SOC 2, ISO 27001, PCI, HIPAA",
          "Retest report confirming remediations",
          "Customer-shareable attestation letter",
        ],
      },
      related: [
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "When you need exploit narratives, not just findings." },
        { href: "/solutions/vulnerability-management", title: "Vulnerability Management", body: "Continuous ongoing program (this is the operating layer)." },
        { href: "/services/web-application-testing", title: "Web Application Testing", body: "Application-specific testing for production apps." },
      ],
    },
  },

  "web-application-testing": {
    meta: {
      title: "Web Application Testing",
      description: "OWASP-aligned testing for production web applications — including auth flows, business-logic abuse cases, and chained-finding narratives.",
    },
    config: {
      category: "Security Testing",
      title: <>Test how an adversary <span className="brand-gradient-text">actually attacks your app</span>.</>,
      sub: "OWASP Top 10 is the floor, not the ceiling. We test authenticated flows, business-logic abuse, IDOR, multi-step state machines — the stuff scanners miss and adversaries find first.",
      primaryCta: { href: "/contact?topic=testing", label: "Scope a web app test" },
      factStrip: [
        { label: "Duration", value: "2–3 weeks" },
        { label: "Method", value: "Manual + tooling" },
        { label: "Coverage", value: "Auth + logic + perimeter" },
        { label: "Retest", value: "Included" },
      ],
      included: {
        title: "What we test",
        items: [
          { title: "OWASP Top 10 baseline", body: "Injection, broken auth, sensitive data exposure, XXE, broken access control, misconfig, XSS, deserialization, components with known vulns, insufficient logging." },
          { title: "Authentication & session", body: "Auth flow, password reset, MFA, SSO, session fixation, JWT misuse, OAuth flow abuse." },
          { title: "Authorization & IDOR", body: "Vertical and horizontal access control. Multi-tenant boundary enforcement. API authz on every endpoint, not just the obvious ones." },
          { title: "Business-logic abuse", body: "Race conditions, state-machine abuse, multi-step transaction abuse, price/coupon manipulation, workflow bypass." },
          { title: "Client-side surface", body: "DOM-based XSS, postMessage abuse, client-side prototype pollution, third-party tag exposure." },
          { title: "Chained-finding exploitation", body: "Where we can chain findings into a higher-impact attack path, we demonstrate it — and rank the chain, not the components." },
        ],
      },
      process: {
        title: "From scoping to retest",
        steps: [
          { eyebrow: "Week 0", title: "Scoping & access", body: "Test accounts provisioned at each role tier. Rules of engagement agreed." },
          { eyebrow: "Week 1", title: "Recon & mapping", body: "Endpoint discovery, role mapping, auth-flow analysis. We baseline before we exploit." },
          { eyebrow: "Weeks 1–2", title: "Active testing", body: "Manual exploitation of identified attack surface. Findings validated and chained where applicable." },
          { eyebrow: "Week 3", title: "Report & debrief", body: "Findings with reproduction steps, business-impact narrative, and engineering-ready remediation." },
          { eyebrow: "Day 30", title: "Retest", body: "Remediations validated and attestation letter issued." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Findings with full reproduction steps and exploit narratives",
          "Risk ranked by exploitability and business impact",
          "Engineering-ready remediation per finding",
          "Audit-evidence for SOC 2, ISO 27001, HITRUST, PCI",
          "Customer-shareable attestation letter",
          "Retest confirming all critical/high findings closed",
        ],
      },
      related: [
        { href: "/services/api-security-testing", title: "API Security Testing", body: "Testing the API layer specifically — REST, GraphQL, gRPC." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Broader infrastructure pen test if you need that scope too." },
        { href: "/services/red-team-assessment", title: "Red Team Assessment", body: "Goal-based, detection-aware engagement — annual cadence." },
      ],
    },
  },

  "api-security-testing": {
    meta: {
      title: "API Security Testing",
      description: "REST, GraphQL, and gRPC surface testing — including unauthenticated paths, JWT misuse, mass assignment, and authorization gaps.",
    },
    config: {
      category: "Security Testing",
      title: <>APIs are <span className="brand-gradient-text">where the real attack surface lives</span> now.</>,
      sub: "Most modern apps are thin clients on top of a wide API. We test the surface adversaries actually probe — unauthenticated paths, broken object-level auth, JWT misuse, GraphQL introspection abuse, mass assignment.",
      primaryCta: { href: "/contact?topic=testing", label: "Scope an API test" },
      factStrip: [
        { label: "Duration", value: "2–3 weeks" },
        { label: "Protocols", value: "REST · GraphQL · gRPC" },
        { label: "Method", value: "OWASP API Top 10+" },
        { label: "Retest", value: "Included" },
      ],
      included: {
        title: "What we test",
        items: [
          { title: "OWASP API Security Top 10", body: "Broken object-level auth, broken auth, excessive data exposure, lack of rate limiting, broken function-level auth, mass assignment, security misconfig, injection, improper assets, insufficient logging." },
          { title: "Authentication paths", body: "Token issuance, refresh flow, JWT validation, OAuth flows, API key handling, signed-request schemes." },
          { title: "Authorization at every endpoint", body: "Not just the obvious ones. Authorization tested on every method × resource combination. This is where IDOR lives." },
          { title: "GraphQL specifics", body: "Introspection exposure, deeply-nested queries (DoS), batched queries, field-level authorization, fragment abuse." },
          { title: "Rate limiting & abuse", body: "Per-user, per-IP, per-endpoint. Account creation, password reset, OTP, login — the abuse surfaces." },
          { title: "Schema & data exposure", body: "Excessive data exposure in responses, sensitive fields leaking via includes/expands, mass assignment vulnerabilities." },
        ],
      },
      process: {
        title: "Lightweight scoping, deep testing",
        steps: [
          { eyebrow: "Week 0", title: "Scoping & schema review", body: "API documentation, schemas, and role tiers reviewed. Test accounts provisioned at each tier." },
          { eyebrow: "Week 1", title: "Authn & authz testing", body: "Authentication flows and authorization on every endpoint × role combination. This is the bulk of the work." },
          { eyebrow: "Week 2", title: "Logic & abuse testing", body: "Business-logic abuse, rate-limiting, schema exposure, GraphQL-specific testing (if applicable)." },
          { eyebrow: "Week 3", title: "Report & retest", body: "Findings with reproduction steps and remediation. 30-day retest included." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Per-endpoint authz validation report",
          "JWT/OAuth/session findings with remediation",
          "GraphQL-specific findings (if applicable)",
          "Rate-limiting and abuse-surface coverage map",
          "Engineering-ready remediation guidance",
          "Audit-evidence for SOC 2 + ISO 27001",
        ],
      },
      related: [
        { href: "/services/web-application-testing", title: "Web Application Testing", body: "If you need the client and the API tested together." },
        { href: "/solutions/ai-llm-security", title: "Secure AI / LLM Systems", body: "API surface for LLM-backed apps has its own threat model." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Broader infrastructure penetration testing." },
      ],
    },
  },

  "red-team-assessment": {
    meta: {
      title: "Red Team Assessment",
      description: "Multi-vector, objective-based engagement that tests detection and response — not just controls. The annual exercise that surfaces what your SOC actually catches.",
    },
    config: {
      category: "Security Testing",
      title: <>Test whether you'd <span className="brand-gradient-text">actually detect a real adversary</span>.</>,
      sub: "A pen test enumerates findings. A red team has an objective — and tests whether your detection, response, and recovery actually work. Annual exercise that validates what your SOC catches and what slips through.",
      primaryCta: { href: "/contact?topic=testing", label: "Scope a red team" },
      factStrip: [
        { label: "Duration", value: "4–8 weeks" },
        { label: "Method", value: "Objective-based" },
        { label: "Detection-aware", value: "Yes" },
        { label: "Debrief", value: "Purple-team session" },
      ],
      included: {
        title: "What we do",
        items: [
          { title: "Objective-based scoping", body: "Concrete goals: 'reach the customer database', 'exfiltrate finance data', 'achieve domain admin'. Not generic 'find vulnerabilities'." },
          { title: "Multi-vector access", body: "Phishing, valid-account abuse, exposed-service exploitation, supply-chain pretext — whatever a real adversary would use." },
          { title: "Detection-aware execution", body: "We track which actions triggered alerts, which were investigated, and which slipped through entirely." },
          { title: "Living-off-the-land technique", body: "We use the same tools an adversary would — not noisy red-team frameworks that your EDR catches in the first five minutes." },
          { title: "Purple-team debrief", body: "Joint debrief with your SOC where we walk through the timeline, alert by alert. The biggest learning happens here." },
          { title: "Detection-engineering recommendations", body: "Specific detections to write — with sample rules — based on what we got away with." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Objective + recon", body: "Objective agreed with executive sponsor (often kept from the SOC). External recon and target profiling." },
          { eyebrow: "Weeks 2–5", title: "Access + traverse", body: "Initial access vectors executed. Lateral movement, persistence, privilege escalation toward the objective." },
          { eyebrow: "Weeks 5–6", title: "Objective + exit", body: "Objective achieved (or documented why not). Clean exit with all artifacts cataloged." },
          { eyebrow: "Week 7", title: "Purple-team debrief", body: "Joint walkthrough with your SOC. Timeline overlaid against your alerts. Honest conversation about what worked." },
          { eyebrow: "Week 8", title: "Detection engineering", body: "Detection rules drafted for the techniques that slipped through. Roadmap for the next 90 days." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Honest read on what your SOC actually catches",
          "Catalog of techniques that slipped through detection",
          "Detection rules for the gaps, ready to deploy",
          "Purple-team muscle memory for your defenders",
          "Defensible audit-evidence of adversary-emulation testing",
          "Executive-ready narrative for the board",
        ],
      },
      related: [
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Start here if you've never done adversary-simulation work." },
        { href: "/services/threat-hunting", title: "Threat Hunting", body: "The defensive companion — proactive hunting for what slips through." },
        { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Executive and decision-maker exercise — complements the technical engagement." },
      ],
    },
  },

  // ─── Managed Security ─────────────────────────────────────────────────────

  "soc-as-a-service": {
    meta: {
      title: "SOC-as-a-Service",
      description: "A complete security operations center on tap — analysts, tooling, processes, dashboards — without building one from scratch.",
    },
    config: {
      category: "Managed Security",
      title: <>A full SOC, <span className="brand-gradient-text">without building one</span>.</>,
      sub: "Standing up a security operations center is a 24-month, multi-million-dollar project — and that's before you hire the third shift. We run a full SOC for you: analysts, tooling, processes, dashboards, escalations. You get the outcomes, we run the operation.",
      primaryCta: { href: "/contact?topic=managed", label: "Talk to SOC operations" },
      factStrip: [
        { label: "Coverage", value: "24/7/365" },
        { label: "Location", value: "U.S." },
        { label: "Onboarding", value: "4–8 weeks" },
        { label: "Reporting", value: "Monthly + quarterly" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Tier 1–3 analyst coverage", body: "Senior on every shift. No tier-1 click-and-pass-to-tier-3 — the analyst who picks up your alert can investigate it." },
          { title: "Detection engineering", body: "Custom detections written for your environment, version-controlled, peer-reviewed. Yours to keep." },
          { title: "Continuous threat hunting", body: "Hypothesis-driven hunts informed by current threat intel." },
          { title: "Incident triage & response", body: "Pre-authorized containment actions executed in-shift. Documented and audited." },
          { title: "Operating dashboards", body: "Real-time view into your environment with the metrics that matter — not vanity charts." },
          { title: "Monthly + quarterly reporting", body: "Executive readout monthly; deeper quarterly review with detections trended and roadmap reprioritized." },
        ],
      },
      process: {
        title: "From onboarding to operating",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Telemetry inventory", body: "We map your stack, identify gaps, and propose minimal additions for coverage." },
          { eyebrow: "Weeks 2–6", title: "Onboarding & integration", body: "Sensors deployed, logs forwarded, detections tuned to your environment." },
          { eyebrow: "Week 6", title: "Cutover", body: "24/7 monitoring goes live. We've baselined your normal so we can spot abnormal." },
          { eyebrow: "Ongoing", title: "Operate, hunt, report", body: "Continuous coverage, monthly executive readouts, quarterly review." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Median triage under 5 minutes",
          "Median containment under 60 minutes for confirmed incidents",
          "Detection-as-code in your repo",
          "Operating dashboards with metrics that matter",
          "Executive narrative for board and customers",
          "Confidence to take vacation",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "MDR is the productized form of SOCaaS — same outcomes, different commercial model." },
        { href: "/services/managed-siem", title: "Managed SIEM", body: "If you already have the SIEM but need the SOC behind it." },
        { href: "/services/threat-hunting", title: "Threat Hunting", body: "Included in SOCaaS, also available standalone." },
      ],
    },
  },

  "managed-siem": {
    meta: {
      title: "Managed SIEM",
      description: "Splunk, Sentinel, and Elastic — engineered, tuned, and operated by people who write detections for a living.",
    },
    config: {
      category: "Managed Security",
      title: <>The SIEM you bought, <span className="brand-gradient-text">finally working</span>.</>,
      sub: "SIEMs are expensive to license and twice as expensive to operate badly. We engineer Splunk ES, Microsoft Sentinel, and Elastic Security — ingestion, detection, tuning, dashboards, runbooks — and run them 24/7.",
      primaryCta: { href: "/contact?topic=managed", label: "Talk to SIEM engineering" },
      factStrip: [
        { label: "Platforms", value: "Splunk · Sentinel · Elastic" },
        { label: "Coverage", value: "24/7" },
        { label: "Detection style", value: "Detection-as-code" },
        { label: "Onboarding", value: "4–6 weeks" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Ingestion engineering", body: "Sources onboarded, parsed, normalized. CIM/CEF compliance where it matters." },
          { title: "Custom detection authoring", body: "Detections written for your stack, mapped to MITRE ATT&CK, version-controlled in your repo." },
          { title: "Detection tuning & false-positive reduction", body: "Every detection has an owner, a tuning history, and a precision target. We measure what we ship." },
          { title: "24/7 analyst coverage", body: "Senior analysts on every shift, triaging alerts in-platform." },
          { title: "Search & content packs", body: "Industry-tuned content packs deployed and maintained — never just out-of-the-box noise." },
          { title: "Quarterly tuning review", body: "What worked, what didn't, what false-positived. Detections retired or rewritten." },
        ],
      },
      process: {
        title: "From inheritance to operating",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Platform audit", body: "Current ingestion, content packs, retention, dashboards — and what's worth keeping vs. rebuilding." },
          { eyebrow: "Weeks 2–4", title: "Ingestion + detection authoring", body: "Sources rationalized, custom detections authored, content packs deployed." },
          { eyebrow: "Weeks 4–6", title: "Tuning & dashboards", body: "False-positive rate brought into range. Dashboards built for executives, operators, and engineers." },
          { eyebrow: "Ongoing", title: "Operate + tune", body: "24/7 coverage with quarterly tuning review." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "SIEM ingesting what it should, parsing correctly",
          "Detection library mapped to ATT&CK, version-controlled",
          "False-positive rate inside operational range",
          "Dashboards built for the audience that uses them",
          "Audit-evidence for the SIEM as a control",
          "Lower licensing waste from over-ingestion",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "If you also want endpoint and identity covered, not just SIEM." },
        { href: "/services/managed-edr-xdr", title: "Managed EDR / XDR", body: "Pairs naturally with managed SIEM." },
        { href: "/tools-we-use#splunk", title: "Vendor commentary", body: "Our take on Splunk vs. Sentinel vs. Elastic." },
      ],
    },
  },

  "managed-edr-xdr": {
    meta: {
      title: "Managed EDR / XDR",
      description: "CrowdStrike, SentinelOne, Microsoft Defender — operationalized so detections become decisions.",
    },
    config: {
      category: "Managed Security",
      title: <>Your EDR, <span className="brand-gradient-text">operationalized</span>.</>,
      sub: "EDR is a tool. Operating it well is a job. We deploy, tune, monitor, and respond on CrowdStrike Falcon, SentinelOne, and Microsoft Defender — turning a noisy alert pipeline into a decision pipeline.",
      primaryCta: { href: "/contact?topic=managed", label: "Talk to managed EDR" },
      factStrip: [
        { label: "Platforms", value: "CrowdStrike · S1 · Defender" },
        { label: "Coverage", value: "24/7" },
        { label: "Containment", value: "Pre-authorized" },
        { label: "Onboarding", value: "2–4 weeks" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Deployment & policy tuning", body: "Sensor deployment, exclusion management, policy configuration — calibrated for your environment, not vendor defaults." },
          { title: "24/7 detection coverage", body: "Senior analysts triage every detection. Pre-authorized containment in-shift." },
          { title: "Threat hunting", body: "Hypothesis-driven hunts on the EDR telemetry. Not just ticket-triage." },
          { title: "Custom detection rules", body: "Where the vendor's rules miss your specific environment, we author custom detections." },
          { title: "Pre-authorized containment", body: "Isolate hosts, kill processes, quarantine files — documented and audited per your runbook." },
          { title: "Monthly + quarterly reporting", body: "What we saw, what we did, what to fix. Executive-ready." },
        ],
      },
      process: {
        title: "From rollout to steady state",
        steps: [
          { eyebrow: "Week 1", title: "Sensor deployment", body: "Pilot deployment, then phased rollout. Exclusion list managed iteratively." },
          { eyebrow: "Week 2", title: "Policy tuning", body: "Detection policies tuned to your environment. Vendor defaults are starting points, not endpoints." },
          { eyebrow: "Week 3", title: "Containment authorization", body: "Pre-authorized actions documented in your runbook and tabletop-tested." },
          { eyebrow: "Ongoing", title: "Operate + hunt", body: "24/7 monitoring, hunting, response. Quarterly tuning review." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Sensor coverage at deployment target with low false-positive rate",
          "Pre-authorized containment actions executed in-shift",
          "Custom detections layered over vendor defaults",
          "Threat-hunting program tied to EDR telemetry",
          "Monthly executive reporting that takes 5 minutes to read",
          "Audit-evidence of detection and response capability",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "MDR is the bundled version — EDR + identity + cloud + SIEM under one engagement." },
        { href: "/services/managed-siem", title: "Managed SIEM", body: "If the SIEM is the next thing to clean up." },
        { href: "/tools-we-use#crowdstrike", title: "Vendor commentary", body: "CrowdStrike vs. SentinelOne vs. Defender — our take." },
      ],
    },
  },

  "threat-hunting": {
    meta: {
      title: "Threat Hunting",
      description: "Hypothesis-driven hunts informed by current threat intel — proactive search for what's slipped through detection.",
    },
    config: {
      category: "Managed Security",
      title: <>Hunting beats <span className="brand-gradient-text">waiting for the alert</span>.</>,
      sub: "Detection catches what you wrote a rule for. Threat hunting catches what you didn't. Hypothesis-driven hunts informed by current threat intel, run continuously across your telemetry — not just when something already looks wrong.",
      primaryCta: { href: "/contact?topic=managed", label: "Talk to hunting team" },
      factStrip: [
        { label: "Cadence", value: "Continuous" },
        { label: "Method", value: "Hypothesis-driven" },
        { label: "Threat intel", value: "Current" },
        { label: "Output", value: "Detections + IOCs" },
      ],
      included: {
        title: "What we do",
        items: [
          { title: "Hypothesis development", body: "Hunts framed as testable hypotheses based on threat intel, your stack, and your adversary surface." },
          { title: "Multi-source query authoring", body: "Hunts span endpoint, identity, network, cloud, and SaaS — wherever the telemetry lives." },
          { title: "Manual investigation", body: "Findings investigated by senior analysts, not just flagged for someone else to look at." },
          { title: "Detection promotion", body: "Successful hunts get promoted into continuous detections — your detection library grows over time." },
          { title: "IOC + IOA generation", body: "Indicators of compromise and indicators of attack documented, shared, and applied across the program." },
          { title: "Monthly hunt readout", body: "What we hunted, what we found, what we promoted. Executive-readable." },
        ],
      },
      process: {
        title: "How a hunt cycle works",
        steps: [
          { eyebrow: "Plan", title: "Hypothesis development", body: "Hunts framed against threat intel, your stack, your adversary surface, and recent ATT&CK techniques." },
          { eyebrow: "Hunt", title: "Query + investigate", body: "Multi-source queries authored and run. Findings investigated by senior analysts." },
          { eyebrow: "Decide", title: "Detection promotion", body: "Successful hunts become continuous detections. Negative results inform next cycle's hypotheses." },
          { eyebrow: "Report", title: "Monthly readout", body: "What we hunted, what we found, what changed in the program." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Detection library that grows monthly",
          "Coverage gaps documented and prioritized",
          "Current-intel-informed hunting program",
          "IOCs and IOAs shared across the program",
          "Monthly hunt readout for executives",
          "Audit-evidence of proactive threat-hunting program",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "Hunting is included in MDR, also available standalone." },
        { href: "/services/managed-siem", title: "Managed SIEM", body: "Hunting runs on top of your SIEM telemetry." },
        { href: "/services/red-team-assessment", title: "Red Team Assessment", body: "The offensive companion — emulate adversaries to validate detections." },
      ],
    },
  },

  // ─── Incident Response (remaining) ────────────────────────────────────────

  "ransomware-response": {
    meta: {
      title: "Ransomware Response",
      description: "End-to-end ransomware lifecycle: triage, negotiation support, restoration, root-cause analysis, and hardening.",
    },
    config: {
      category: "Incident Response",
      title: <>Ransomware is <span className="brand-gradient-text">a campaign, not an event</span>.</>,
      sub: "By the time the ransom note appears, the adversary has been inside for weeks. We handle the whole lifecycle — triage, scoping, negotiation support, restoration, root cause, and hardening so it doesn't happen again.",
      primaryCta: { href: "/emergency", label: "Active ransomware — call now" },
      secondaryCta: { href: "/services/incident-response-retainer", label: "Set up a retainer instead" },
      factStrip: [
        { label: "SLA (retainer)", value: "1 hour" },
        { label: "Scope", value: "End-to-end" },
        { label: "Negotiation support", value: "Yes" },
        { label: "Forensics", value: "Included" },
      ],
      included: {
        title: "What we handle",
        items: [
          { title: "Containment & isolation", body: "Stop the spread first. Network segmentation, endpoint isolation, identity revocation — pre-authorized per your runbook." },
          { title: "Scope determination", body: "What's encrypted, what's exfiltrated, what's still clean. Critical to recovery and to legal/regulatory decisions." },
          { title: "Negotiation support", body: "We don't negotiate with threat actors directly, but we coordinate with specialized negotiators when the business decides to engage." },
          { title: "Restoration & recovery", body: "Backup integrity validation, clean-room rebuild, sequential service restoration." },
          { title: "Root-cause analysis", body: "How did they get in. How long were they inside. What did they touch. Documented for executive, board, and legal review." },
          { title: "Post-incident hardening", body: "Specific control changes to make this incident not happen again — and to detect the next attempt faster." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Hour 0", title: "Containment", body: "Isolation actions begin within minutes of the call. Stop the spread before scoping." },
          { eyebrow: "Hours 0–24", title: "Scope + triage", body: "What's affected, what's exfiltrated, what's still clean. Decision frameworks for the executive team." },
          { eyebrow: "Days 1–5", title: "Negotiation + restoration planning", body: "If negotiation is on the table, we coordinate. In parallel, restoration plan is built." },
          { eyebrow: "Week 1–2", title: "Restoration execution", body: "Clean-room rebuild, sequential service restoration, validated backups." },
          { eyebrow: "Week 2–4", title: "Root cause + hardening", body: "How they got in, documented. Specific hardening to close the path." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Contained, scoped, and recovered environment",
          "Root-cause narrative for executives, board, and (if needed) regulators",
          "Specific hardening to close the original access path",
          "Detection rules to catch the next attempt earlier",
          "Documented evidence for cyber-insurance claim",
          "Post-incident retrospective with lessons learned",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "The proactive version. Set up before you need it." },
        { href: "/services/digital-forensics", title: "Digital Forensics", body: "Chain-of-custody preservation when litigation is likely." },
        { href: "/emergency", title: "Emergency Response", body: "If you're under active attack, skip the form." },
      ],
      finalCta: {
        title: <>Under active ransomware? Call us first.</>,
        body: "The faster we're engaged, the better the outcomes. The 24/7 hotline routes directly to a senior responder.",
        primary: { href: "/emergency", label: "Open emergency response" },
        secondary: { href: "tel:+12062102954", label: "Call +1 (206) 210-2954" },
        tone: "urgent",
      },
    },
  },

  "digital-forensics": {
    meta: {
      title: "Digital Forensics",
      description: "Chain-of-custody preservation, deep host and network forensics, and expert testimony for matters that may end up in court.",
    },
    config: {
      category: "Incident Response",
      title: <>Forensic work that <span className="brand-gradient-text">holds up in court</span>.</>,
      sub: "When an incident may lead to litigation, regulatory action, or law enforcement, normal IR isn't enough. We perform forensic work to evidentiary standard — chain of custody, defensible methodology, expert testimony if needed.",
      primaryCta: { href: "/contact?topic=ir", label: "Engage forensics" },
      factStrip: [
        { label: "Standard", value: "Evidentiary" },
        { label: "Chain of custody", value: "Documented" },
        { label: "Testimony", value: "Available" },
        { label: "Scope", value: "Host + network + cloud" },
      ],
      included: {
        title: "What we do",
        items: [
          { title: "Chain-of-custody preservation", body: "From first touch through final delivery. Documentation that holds up in court." },
          { title: "Host forensics", body: "Disk and memory imaging, artifact analysis, timeline reconstruction." },
          { title: "Network forensics", body: "Packet capture analysis, flow data reconstruction, lateral-movement timeline." },
          { title: "Cloud forensics", body: "AWS/Azure/GCP audit log analysis, API call reconstruction, identity-action timelines." },
          { title: "Insider-threat investigation", body: "Account, file, and access analysis where the threat actor may be internal." },
          { title: "Expert testimony", body: "Our principals have testified in federal court. Reports written to withstand cross-examination." },
        ],
      },
      process: {
        title: "From engagement to final report",
        steps: [
          { eyebrow: "Hour 0", title: "Preservation", body: "Evidence preservation begins immediately. Chain-of-custody documentation starts on first touch." },
          { eyebrow: "Days 1–5", title: "Imaging + collection", body: "Forensic imaging of relevant hosts, memory capture, log collection." },
          { eyebrow: "Weeks 1–3", title: "Analysis", body: "Artifact analysis, timeline reconstruction, narrative construction." },
          { eyebrow: "Week 3–4", title: "Reporting + testimony prep", body: "Final report with reproducible methodology. If testimony is needed, we prepare." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Chain-of-custody documentation from first touch",
          "Forensic images preserved per evidentiary standards",
          "Reconstructed timeline of adversary activity",
          "Court-defensible report with reproducible methodology",
          "Expert testimony available if litigation proceeds",
          "Coordination with breach coach and outside counsel",
        ],
      },
      related: [
        { href: "/services/ransomware-response", title: "Ransomware Response", body: "Forensics is included in ransomware response by default." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Forensics-trained team on standby, pre-positioned with your legal team." },
        { href: "/emergency", title: "Emergency Response", body: "If you need forensics work to begin immediately." },
      ],
    },
  },

  "tabletop-exercises": {
    meta: {
      title: "Tabletop Exercises",
      description: "Executive and technical war games scenario-customized to your industry and stack. Surface the playbook gaps before adversaries do.",
    },
    config: {
      category: "Incident Response",
      title: <>Find the gaps in your playbook <span className="brand-gradient-text">before adversaries do</span>.</>,
      sub: "A good tabletop reveals what your IR plan actually says vs. what your team actually does. We run executive and technical tabletops scenario-customized to your industry, stack, and recent threat landscape.",
      primaryCta: { href: "/contact?topic=ir", label: "Schedule a tabletop" },
      factStrip: [
        { label: "Duration", value: "2–4 hours" },
        { label: "Format", value: "Executive or technical" },
        { label: "Customization", value: "Industry + stack" },
        { label: "Output", value: "Gap report + actions" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Scenario design", body: "Scenarios written for your specific industry, stack, and threat surface — not generic 'ransomware exercise' templates." },
          { title: "Executive-level tabletops", body: "Decision-focused. CEO, CFO, GC, COO walk through the calls they'd actually have to make." },
          { title: "Technical tabletops", body: "Detection, response, and containment workflows. Engineering, IT, and security in the room together." },
          { title: "Injects & evolution", body: "Scenarios evolve in real-time as the team makes decisions. Adversary doesn't sit still." },
          { title: "Observation & coaching", body: "Senior facilitator coaches in real time. Honest feedback on gaps, not feel-good wrap-ups." },
          { title: "Gap report + action items", body: "Written report with specific gaps identified, owners assigned, and timeline to close." },
        ],
      },
      process: {
        title: "From design to readout",
        steps: [
          { eyebrow: "Week 1", title: "Scenario design", body: "Industry, stack, recent threats — scenario tailored. Stakeholder list confirmed." },
          { eyebrow: "Week 2", title: "Tabletop session", body: "2–4 hour facilitated session with the right people in the room (or on the call)." },
          { eyebrow: "Week 3", title: "Readout + actions", body: "Written gap report with prioritized action items. 90-minute executive readout if desired." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Honest read on playbook gaps and team readiness",
          "Specific action items with named owners",
          "Documentation auditors and regulators look for",
          "Cyber-insurance underwriting credit",
          "Cross-functional muscle memory for the real day",
          "Defensible 'we've tested this' narrative",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Quarterly tabletop is included in every retainer." },
        { href: "/services/red-team-assessment", title: "Red Team Assessment", body: "The technical companion — execute the scenario, don't just discuss it." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Tabletop is a useful part of broader risk assessment." },
      ],
    },
  },
};
