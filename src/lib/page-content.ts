/**
 * Card descriptions and metadata for hub-page service grids.
 * The href values must match the entries in `lib/nav.ts`.
 */

export type CardEntry = {
  href: string;
  title: string;
  description: string;
  meta?: string;
  emphasis?: "default" | "urgent";
};

export type CardSection = {
  id: string;
  title: string;
  intro?: string;
  items: CardEntry[];
};

// ─── /services ───────────────────────────────────────────────────────────────

export const SERVICES_SECTIONS: CardSection[] = [
  {
    id: "advisory",
    title: "Advisory & Governance",
    intro: "Senior security leadership and structured risk programs — without the headcount.",
    items: [
      { href: "/services/vciso", title: "vCISO Services", description: "Fractional CISO leadership for orgs that need executive-grade security oversight without a full-time hire.", meta: "Retainer · Fractional" },
      { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", description: "A diagnostic that produces a prioritized roadmap and a board-ready executive readout.", meta: "2-week engagement" },
      { href: "/services/cybersecurity-program-development", title: "Program Development", description: "Build the policies, controls, and runbooks that turn ad-hoc security into a real program.", meta: "Project" },
      { href: "/services/vendor-risk-management", title: "Vendor Risk Management", description: "Inventory, assess, and continuously monitor third parties touching your data.", meta: "Ongoing" },
      { href: "/services/cyber-insurance-readiness", title: "Cyber Insurance Readiness", description: "Pre-binding controls review and post-claim support to keep premiums sane and claims paid.", meta: "Project · Renewal" },
    ],
  },
  {
    id: "testing",
    title: "Security Testing",
    intro: "Adversary-simulation and validation work, run by people who break things for a living.",
    items: [
      { href: "/services/penetration-testing", title: "Penetration Testing", description: "Network, infrastructure, and external-perimeter testing — with exploit narratives, not just CVE dumps.", meta: "Project" },
      { href: "/services/vulnerability-assessment", title: "Vulnerability Assessment", description: "Authenticated scans across infra, identity, and cloud, with risk-ranked remediation guidance.", meta: "Project · Quarterly" },
      { href: "/services/web-application-testing", title: "Web Application Testing", description: "OWASP-aligned testing for production apps, with auth flows and business-logic abuse cases.", meta: "Per app" },
      { href: "/services/api-security-testing", title: "API Security Testing", description: "REST, GraphQL, and gRPC surface analysis — including unauthenticated and JWT misuse paths.", meta: "Per API" },
      { href: "/services/red-team-assessment", title: "Red Team Assessment", description: "Multi-vector, objective-based engagement that tests detection and response, not just controls.", meta: "Project · Quarterly" },
    ],
  },
  {
    id: "managed",
    title: "Managed Security",
    intro: "Continuously-staffed services from our U.S. SOC.",
    items: [
      { href: "/services/mdr", title: "Managed Detection & Response", description: "24/7 monitoring, hunting, and human-led response across endpoint, identity, and cloud.", meta: "Retainer · 24/7" },
      { href: "/services/soc-as-a-service", title: "SOC-as-a-Service", description: "A full security operations center on tap — analysts, tooling, processes, dashboards.", meta: "Retainer" },
      { href: "/services/managed-siem", title: "Managed SIEM", description: "Splunk, Sentinel, Elastic — we engineer, tune, and operate the platform you've already invested in.", meta: "Retainer" },
      { href: "/services/managed-edr-xdr", title: "Managed EDR / XDR", description: "CrowdStrike, SentinelOne, Defender — operationalized so detections become decisions.", meta: "Retainer" },
      { href: "/services/threat-hunting", title: "Threat Hunting", description: "Hypothesis-driven hunts informed by current threat intel — not just queue triage.", meta: "Retainer · Continuous" },
    ],
  },
  {
    id: "ir",
    title: "Incident Response",
    intro: "When containment is the only thing that matters.",
    items: [
      { href: "/services/incident-response-retainer", title: "Incident Response Retainer", description: "Pre-negotiated SLAs, named team, and a runbook tuned to your environment — before the bad day.", meta: "Retainer" },
      { href: "/emergency", title: "Emergency Breach Response", description: "Active intrusion underway? We mobilize within the hour — containment, eradication, recovery.", meta: "24/7 hotline", emphasis: "urgent" },
      { href: "/services/ransomware-response", title: "Ransomware Response", description: "End-to-end ransomware lifecycle: triage, negotiation support, restore, root cause, hardening.", meta: "Engagement" },
      { href: "/services/digital-forensics", title: "Digital Forensics", description: "Chain-of-custody preservation, deep host/network forensics, expert testimony if needed.", meta: "Engagement" },
      { href: "/services/tabletop-exercises", title: "Tabletop Exercises", description: "Executive and technical war games that surface the playbook gaps before adversaries do.", meta: "Project · Annual" },
    ],
  },
];

// ─── /compliance ─────────────────────────────────────────────────────────────

export const COMPLIANCE_SECTIONS: CardSection[] = [
  {
    id: "defense",
    title: "Defense & Government",
    intro: "If you bid on federal contracts or handle CUI, your obligations are not optional.",
    items: [
      { href: "/compliance/cmmc", title: "CMMC Compliance", description: "Gap assessment, remediation, and L1 / L2 / L3 readiness for DIB primes and subs.", meta: "DoD · CUI" },
      { href: "/compliance/nist-800-171", title: "NIST 800-171", description: "Implement and document the 110 controls — and survive the assessment.", meta: "DFARS prerequisite" },
      { href: "/compliance/fedramp", title: "FedRAMP Readiness", description: "Pre-audit advisory for cloud-service providers seeking Low or Moderate authorization.", meta: "Cloud · Federal" },
      { href: "/compliance/dfars", title: "DFARS Cybersecurity", description: "Clause 252.204-7012 controls, SPRS submissions, and incident-reporting workflows.", meta: "Defense" },
    ],
  },
  {
    id: "saas",
    title: "Business & SaaS",
    intro: "What buyers ask for before they sign.",
    items: [
      { href: "/compliance/soc-2", title: "SOC 2 Readiness", description: "Type I or Type II readiness — controls, evidence, auditor selection, mock audits.", meta: "Trust services" },
      { href: "/compliance/iso-27001", title: "ISO 27001 Readiness", description: "ISMS scoping, Statement of Applicability, internal audit, and external audit prep.", meta: "ISMS" },
      { href: "/compliance/vendor-security-reviews", title: "Vendor Security Reviews", description: "Respond to (or run) third-party security reviews without slowing your sales cycle.", meta: "Procurement" },
      { href: "/compliance/security-questionnaires", title: "Security Questionnaires", description: "SIG, CAIQ, custom — we maintain the answer library so your sales team isn't writing essays.", meta: "Sales enablement" },
    ],
  },
  {
    id: "regulated",
    title: "Regulated Industries",
    intro: "Sector-specific frameworks that come with real penalties.",
    items: [
      { href: "/compliance/hipaa", title: "HIPAA Security Risk Assessment", description: "Required SRA + remediation roadmap for covered entities and business associates.", meta: "Healthcare" },
      { href: "/compliance/pci-dss", title: "PCI DSS Compliance", description: "SAQ and Level 1–4 advisory; QSA-ready evidence and ROC support.", meta: "Payments" },
      { href: "/compliance/gdpr", title: "GDPR Readiness", description: "Data mapping, DPIA, ROPA, controller/processor terms, breach response.", meta: "EU / UK" },
      { href: "/compliance/sec-disclosure", title: "SEC Cyber Disclosure", description: "Item 1.05 incident disclosure, Item 106 governance disclosure — and the materiality call.", meta: "Public co." },
    ],
  },
];

// ─── /industries ─────────────────────────────────────────────────────────────

export const INDUSTRIES_SECTIONS: CardSection[] = [
  {
    id: "regulated",
    title: "Regulated",
    intro: "Where the regulator is part of the threat model.",
    items: [
      { href: "/industries/financial-services", title: "Financial Services", description: "Banks, credit unions, RIAs, broker-dealers. SEC, FFIEC, NY DFS 23 NYCRR 500." },
      { href: "/industries/healthcare", title: "Healthcare", description: "Providers, payers, digital health. HIPAA Security Rule, HITRUST, and OCR audit prep." },
      { href: "/industries/legal", title: "Legal", description: "AmLaw and boutique firms. Client-data segmentation, e-discovery integrity, ABA Formal Opinion 477." },
      { href: "/industries/government-contractors", title: "Government Contractors", description: "Defense, civilian, and aerospace primes. CMMC, NIST 800-171, ITAR-aware segmentation." },
      { href: "/industries/insurance", title: "Insurance", description: "Carriers and MGAs. Underwriting-data protection, claims-fraud detection, model-IP integrity." },
    ],
  },
  {
    id: "tech",
    title: "Technology",
    intro: "Engineering-led companies that need security to keep up with shipping velocity.",
    items: [
      { href: "/industries/saas", title: "SaaS Companies", description: "Multi-tenant SaaS, growth-stage and enterprise. SOC 2, secure SDLC, and customer-trust evidence." },
      { href: "/industries/software-development", title: "Software Development Firms", description: "Agencies and product studios. Client-data isolation, SBOM hygiene, supply-chain integrity." },
      { href: "/industries/ai", title: "AI Companies", description: "Model providers, AI-native apps. Training-data governance, prompt-injection defense, model exfil." },
      { href: "/industries/fintech", title: "Fintech", description: "Embedded finance, neobanks, payments. Money-movement controls, BSA/AML adjacency, partner-bank reviews." },
      { href: "/industries/ecommerce", title: "E-commerce", description: "DTC and marketplaces. PCI DSS, account-takeover, scraping/bot mitigation, holiday-peak readiness." },
    ],
  },
  {
    id: "industrial",
    title: "Industrial",
    intro: "Where downtime is measured in lost product, not just lost revenue.",
    items: [
      { href: "/industries/manufacturing", title: "Manufacturing", description: "Discrete and process. OT/IT convergence, plant-floor segmentation, ransomware containment." },
      { href: "/industries/logistics", title: "Logistics & Transportation", description: "Carriers, 3PLs, freight tech. TMS integrity, EDI fraud, fleet-telematics security." },
      { href: "/industries/construction", title: "Construction", description: "GCs and developers. Wire-fraud prevention, project-data leakage, on-site OT exposure." },
      { href: "/industries/energy", title: "Energy & Utilities", description: "IOUs and IPPs. NERC CIP, OT/SCADA security, third-party operator risk." },
      { href: "/industries/ot", title: "Operational Technology", description: "ICS / SCADA environments. IEC 62443 alignment, passive monitoring, segmentation reviews." },
    ],
  },
  {
    id: "investors",
    title: "Investors & Operators",
    intro: "Cyber risk as an asset-level and portfolio-level concern.",
    items: [
      { href: "/industries/private-equity", title: "Private Equity", description: "Portfolio-wide cyber programs, value-creation playbooks, exit-prep diligence response." },
      { href: "/industries/independent-sponsors", title: "Independent Sponsors", description: "Pre-LOI cyber diligence and post-close 100-day plans without big-firm overhead." },
      { href: "/industries/portfolio-companies", title: "Portfolio Companies", description: "Standardized, sponsor-friendly security baseline that doesn't break the GP relationship." },
      { href: "/industries/ma-due-diligence", title: "M&A Cyber Due Diligence", description: "Buy-side or sell-side. Surface latent breach, IP exfil, and post-close remediation cost." },
    ],
  },
];

// ─── /solutions ──────────────────────────────────────────────────────────────

export const SOLUTIONS_SECTIONS: CardSection[] = [
  {
    id: "need-to",
    title: "I need to…",
    intro: "Time-boxed objectives. Pick the outcome, not the product.",
    items: [
      { href: "/solutions/cybersecurity-assessment", title: "Get a Cybersecurity Assessment", description: "A two-week diagnostic that surfaces the gaps most teams find only after an incident.", meta: "Best first step" },
      { href: "/solutions/prepare-for-cmmc", title: "Prepare for CMMC", description: "Scope, gap, remediate, document, rehearse — through Level 2 third-party assessment.", meta: "DoD contracts" },
      { href: "/solutions/prepare-for-soc-2", title: "Prepare for SOC 2", description: "Type I in 60–90 days; Type II within the audit period that follows.", meta: "B2B sales" },
      { href: "/solutions/ransomware-readiness", title: "Improve Ransomware Readiness", description: "Backup integrity, segmentation, IR retainer, tabletop — the things you wish you'd done." },
      { href: "/emergency", title: "Respond to a Breach", description: "Active intrusion underway? Mobilize an IR team within the hour.", emphasis: "urgent", meta: "Now" },
    ],
  },
  {
    id: "ongoing",
    title: "I need ongoing help",
    intro: "Programs that run continuously, not projects that end.",
    items: [
      { href: "/solutions/24-7-monitoring", title: "24/7 Security Monitoring", description: "Continuously-staffed eyes on your environment, with human-led triage." },
      { href: "/services/vciso", title: "Hire a Fractional CISO", description: "Executive security leadership in 4 to 16 hours a week — without the headcount." },
      { href: "/solutions/vulnerability-management", title: "Manage Vulnerabilities", description: "Scan, prioritize, remediate, validate. Quarterly metrics your board will actually read." },
      { href: "/solutions/cloud-security", title: "Improve Cloud Security", description: "AWS, Azure, GCP. Identity, posture, runtime, and secrets — operationalized." },
      { href: "/solutions/security-automation", title: "Automate Security Workflows", description: "SOAR-style automation built into your stack — fewer alerts, faster decisions." },
    ],
  },
  {
    id: "technical",
    title: "I need technical security",
    intro: "Targeted engineering and validation work.",
    items: [
      { href: "/services/web-application-testing", title: "Test an Application", description: "OWASP-aligned testing with auth flows and business-logic abuse — not just scanners." },
      { href: "/services/api-security-testing", title: "Secure APIs", description: "REST, GraphQL, gRPC. Authn, authz, rate-limits, data exposure, JWT misuse." },
      { href: "/solutions/cloud-security-review", title: "Review Cloud Infrastructure", description: "Identity, network, secrets, public exposure — across AWS / Azure / GCP." },
      { href: "/solutions/ai-llm-security", title: "Secure AI / LLM Systems", description: "Training-data governance, prompt-injection defense, model exfil, agent-action controls." },
      { href: "/solutions/zero-trust", title: "Implement Zero Trust", description: "Identity-centered architecture, BeyondCorp-style access, micro-segmentation roadmap." },
    ],
  },
];

// ─── /resources ──────────────────────────────────────────────────────────────

export const RESOURCES_SECTIONS: CardSection[] = [
  {
    id: "learn",
    title: "Learn",
    intro: "Background reading on the problems we work on every day.",
    items: [
      { href: "/blog", title: "Blog", description: "Threat write-ups, vendor-agnostic guidance, incident retrospectives." },
      { href: "/resources/guides/cybersecurity", title: "Cybersecurity Guides", description: "Long-form guides on core controls, threat models, and program design." },
      { href: "/resources/guides/compliance", title: "Compliance Guides", description: "Framework-by-framework walkthroughs: CMMC, SOC 2, ISO 27001, HIPAA, PCI." },
      { href: "/resources/guides/incident-response", title: "Incident Response Resources", description: "Plans, playbooks, decision trees, communication templates." },
      { href: "/resources/guides/ai-security", title: "AI Security Resources", description: "Practical guidance for LLM apps, agentic systems, and AI-supply-chain risk." },
    ],
  },
  {
    id: "downloads",
    title: "Downloads",
    intro: "Templates and checklists we use with clients — adapted for general use.",
    items: [
      { href: "/resources/downloads/cyber-risk-checklist", title: "Cyber Risk Checklist", description: "A 12-point self-audit that surfaces the gaps most teams find only after an incident." },
      { href: "/resources/downloads/ransomware-readiness", title: "Ransomware Readiness Checklist", description: "A pragmatic checklist focused on the controls that actually shorten an event." },
      { href: "/resources/downloads/cmmc-readiness", title: "CMMC Readiness Checklist", description: "Level 1 and Level 2 control-by-control readiness map." },
      { href: "/resources/downloads/soc-2-readiness", title: "SOC 2 Readiness Checklist", description: "Trust services criteria mapped to the evidence your auditor expects." },
      { href: "/resources/downloads/ir-plan-template", title: "Incident Response Plan Template", description: "A starting-point IR plan you can adapt in an afternoon." },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    intro: "Lightweight, no-signup interactive tools.",
    items: [
      { href: "/tools/cyber-risk-calculator", title: "Cyber Risk Calculator", description: "Quantify exposure in dollars — frequency × magnitude — calibrated to your industry." },
      { href: "/tools/compliance-quiz", title: "Compliance Readiness Quiz", description: "Five minutes to find out which framework actually applies to you." },
      { href: "/tools/vendor-risk-questionnaire", title: "Vendor Risk Questionnaire", description: "The 30-question short form we'd use to evaluate a new third party." },
      { href: "/tools/cyber-insurance-readiness", title: "Cyber Insurance Readiness Checklist", description: "Pre-binding control review to keep premiums sane and claims paid." },
    ],
  },
];
