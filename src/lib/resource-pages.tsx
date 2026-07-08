/**
 * Resource pages — guides, downloads, and tools.
 * Lighter shape than services/compliance — these are content + CTA pages.
 */

import type { ReactNode } from "react";

export type ResourcePage = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: ReactNode;
    sub: ReactNode;
  };
  /** Bulleted "what's inside" list, for downloads or guide tables-of-contents. */
  whatsInside?: string[];
  /** Long-form body rendered as sections. */
  sections?: { title: string; body: ReactNode }[];
  /** Primary CTA (download, start tool, etc.). */
  cta: { href: string; label: string; tone?: "default" | "gradient" };
  /** Secondary copy under the CTA. */
  ctaNote?: string;
  /** Related links. */
  related?: { href: string; title: string; body: string }[];
};

// ─── /resources/guides/[topic] ────────────────────────────────────────────────

export const GUIDE_PAGES: Record<string, ResourcePage> = {
  cybersecurity: {
    meta: { title: "Cybersecurity Guides", description: "Long-form guides on core controls, threat models, and security-program design — vendor-agnostic, practitioner-written." },
    hero: {
      eyebrow: "Guides · Cybersecurity",
      title: <>Cybersecurity, <span className="brand-gradient-text">from the practitioner shelf</span>.</>,
      sub: "Long-form guides we wrote because the existing material is either too generic or too marketing. Vendor-agnostic, practitioner-written, updated as the field changes.",
    },
    whatsInside: [
      "Identity & access program design",
      "Endpoint detection strategy (CrowdStrike / SentinelOne / Defender)",
      "Cloud security baselines (AWS / Azure / GCP)",
      "Network segmentation in practice",
      "Detection engineering as a discipline",
      "Modern secrets management",
    ],
    cta: { href: "/contact?topic=other", label: "Suggest a topic" },
    ctaNote: "Most guides start from a question a client kept asking. Send yours.",
    related: [
      { href: "/blog", title: "Blog", body: "Shorter pieces and threat write-ups." },
      { href: "/resources/guides/compliance", title: "Compliance guides", body: "Framework-by-framework walkthroughs." },
      { href: "/resources/downloads/cyber-risk-checklist", title: "Cyber Risk Checklist", body: "A 12-point self-audit." },
    ],
  },
  compliance: {
    meta: { title: "Compliance Guides", description: "Framework-by-framework walkthroughs: CMMC, SOC 2, ISO 27001, HIPAA, PCI, and more." },
    hero: {
      eyebrow: "Guides · Compliance",
      title: <>Compliance, <span className="brand-gradient-text">framework by framework</span>.</>,
      sub: "Each major framework, broken down by what it actually requires, what auditors actually look for, and what we've learned implementing them across dozens of engagements.",
    },
    whatsInside: [
      "SOC 2 Type I vs. Type II in plain language",
      "ISO 27001:2022 — what changed, and what it means for your ISMS",
      "CMMC Level 2: scoping the enclave correctly",
      "NIST 800-171 implementation patterns",
      "HIPAA Security Risk Assessment — what OCR actually wants",
      "PCI DSS v4 scope reduction strategies",
    ],
    cta: { href: "/compliance", label: "See compliance services" },
    related: [
      { href: "/tools/compliance-quiz", title: "Compliance Readiness Quiz", body: "Find out which framework applies to you." },
      { href: "/compliance", title: "Compliance hub", body: "Service pages for every framework." },
      { href: "/resources/downloads/cyber-risk-checklist", title: "Cyber Risk Checklist", body: "Baseline self-audit." },
    ],
  },
  "incident-response": {
    meta: { title: "Incident Response Resources", description: "Plans, playbooks, decision trees, and communication templates for incident response programs." },
    hero: {
      eyebrow: "Guides · Incident Response",
      title: <>Incident response, <span className="brand-gradient-text">before you need it</span>.</>,
      sub: "Plans, playbooks, decision trees, and communication templates. Everything we wish every client had ready before the bad day.",
    },
    whatsInside: [
      "IR plan template (adaptable to your stack)",
      "Tabletop scenarios — executive and technical",
      "Communication templates — internal, external, regulator",
      "First-hour decision tree",
      "Cyber insurance + breach coach coordination",
      "Post-incident retrospective format",
    ],
    cta: { href: "/resources/downloads/ir-plan-template", label: "Download IR plan template", tone: "gradient" },
    related: [
      { href: "/services/incident-response-retainer", title: "IR Retainer", body: "The proactive engagement." },
      { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Test the playbook." },
      { href: "/emergency", title: "Emergency Response", body: "Under active attack now." },
    ],
  },
  "ai-security": {
    meta: { title: "AI Security Resources", description: "Practical guidance for LLM apps, agentic systems, and AI-supply-chain risk." },
    hero: {
      eyebrow: "Guides · AI Security",
      title: <>AI security, <span className="brand-gradient-text">grounded in what's actually happening</span>.</>,
      sub: "Less hype than the average AI-security resource. Practical guidance on prompt injection, training-data governance, agent-action controls, and the AI customer-trust posture buyers actually ask about.",
    },
    whatsInside: [
      "OWASP LLM Top 10, with context",
      "Prompt-injection defenses that work in production",
      "Training-data governance for LLM apps",
      "Agent-action controls — what 'human in the loop' actually means",
      "AI-supply-chain risk (model providers, datasets, agents)",
      "NIST AI RMF in practice",
    ],
    cta: { href: "/solutions/ai-llm-security", label: "AI security engagement model" },
    related: [
      { href: "/industries/ai", title: "AI Companies", body: "Industry-specific framing." },
      { href: "/solutions/ai-llm-security", title: "Secure AI / LLM Systems", body: "Solution-oriented engagement." },
      { href: "/services/api-security-testing", title: "API Security Testing", body: "Including AI API surface." },
    ],
  },
};

// ─── /resources/downloads/[asset] ────────────────────────────────────────────

export const DOWNLOAD_PAGES: Record<string, ResourcePage> = {
  "cyber-risk-checklist": {
    meta: { title: "Cyber Risk Checklist", description: "A 12-point self-audit that surfaces the gaps most teams discover only after an incident." },
    hero: {
      eyebrow: "Download · Free · 12 pages",
      title: <>The 12-point cyber risk checklist.</>,
      sub: "We use this with new clients to surface the gaps most teams discover only after an incident. Adapted from our internal engagement intake — generalized for self-serve use.",
    },
    whatsInside: [
      "Identity & access — 3 questions that matter",
      "Endpoint coverage — what you're actually monitoring",
      "Cloud posture — public exposure check",
      "Vendor & supply chain — concentration risk",
      "Incident readiness — runbook reality check",
      "Compliance landing zone — what applies to you",
      "Backup integrity — restore vs. 'we have backups'",
      "Logging coverage — what's actually retained",
      "Privileged access — break-glass and standing access",
      "Communication channels — who calls whom at 3am",
      "Cyber insurance posture — pre-binding controls",
      "Board narrative — can you defend posture in 10 slides",
    ],
    cta: { href: "/contact?topic=other&asset=cyber-risk-checklist", label: "Get the checklist", tone: "gradient" },
    ctaNote: "Delivered by email. No phone-number requirement. Unsubscribe is one click.",
    related: [
      { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "When you'd rather have us run the full diagnostic." },
      { href: "/resources/downloads/ransomware-readiness", title: "Ransomware Readiness Checklist", body: "Companion checklist focused on ransomware." },
      { href: "/tools/cyber-risk-calculator", title: "Cyber Risk Calculator", body: "Quantify exposure in dollars." },
    ],
  },
  "ransomware-readiness": {
    meta: { title: "Ransomware Readiness Checklist", description: "A pragmatic checklist focused on the controls that actually shorten a ransomware event." },
    hero: {
      eyebrow: "Download · Free · 10 pages",
      title: <>Ransomware readiness — the short version.</>,
      sub: "The controls that actually shorten a ransomware event, not the ones that sound good in a vendor pitch. From our IR retainer onboarding checklist.",
    },
    whatsInside: [
      "Offline / immutable backups — restoration tested",
      "Segmentation across IT-OT, dev-prod, identity boundaries",
      "EDR coverage and pre-authorized isolation",
      "Privileged access — break-glass procedures",
      "MFA universal on identity provider, RDP, VPN",
      "IR retainer + named responder",
      "Communication templates — internal, customer, regulator",
      "Cyber insurance — pre-binding controls in place",
      "Tabletop tested in the last 12 months",
      "Detection-aware testing (red team or pen test)",
    ],
    cta: { href: "/contact?topic=other&asset=ransomware-readiness", label: "Get the checklist", tone: "gradient" },
    related: [
      { href: "/solutions/ransomware-readiness", title: "Ransomware Readiness Engagement", body: "The full engagement, not just the checklist." },
      { href: "/services/incident-response-retainer", title: "IR Retainer", body: "The most-leveraged control." },
      { href: "/services/ransomware-response", title: "Ransomware Response", body: "If it's already happening." },
    ],
  },
  "cmmc-readiness": {
    meta: { title: "CMMC Readiness Checklist", description: "Level 1 and Level 2 control-by-control readiness map." },
    hero: {
      eyebrow: "Download · Free · 14 pages",
      title: <>CMMC readiness — the L1/L2 checklist.</>,
      sub: "Control-by-control readiness map for Level 1 and Level 2. Built from our CMMC engagements with DIB primes and subs.",
    },
    whatsInside: [
      "All 110 Level 2 controls — yes/no/partial",
      "CUI flow mapping starter template",
      "Enclave / authorization-boundary worksheet",
      "Common gaps — what we see across engagements",
      "Estimated remediation effort by control family",
      "SSP / POAM starter outline",
    ],
    cta: { href: "/contact?topic=compliance&asset=cmmc-readiness", label: "Get the checklist", tone: "gradient" },
    related: [
      { href: "/compliance/cmmc", title: "CMMC Compliance", body: "Engagement detail." },
      { href: "/solutions/prepare-for-cmmc", title: "Prepare for CMMC", body: "End-to-end program." },
      { href: "/industries/government-contractors", title: "Government Contractors", body: "Industry framing." },
    ],
  },
  "soc-2-readiness": {
    meta: { title: "SOC 2 Readiness Checklist", description: "Trust services criteria mapped to the evidence your auditor expects." },
    hero: {
      eyebrow: "Download · Free · 11 pages",
      title: <>SOC 2 readiness — the evidence-mapped checklist.</>,
      sub: "TSC criteria mapped to the specific evidence your auditor will request. Built from our SOC 2 engagements and validated with the major audit firms.",
    },
    whatsInside: [
      "Trust Services Criteria — Security, Confidentiality, Availability, Processing Integrity, Privacy",
      "Evidence map for the Security baseline",
      "Common audit failures — what to avoid",
      "Auditor questions you'll be asked",
      "Continuous evidence collection workflow starter",
      "Mock-audit prompts",
    ],
    cta: { href: "/contact?topic=compliance&asset=soc-2-readiness", label: "Get the checklist", tone: "gradient" },
    related: [
      { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Engagement detail." },
      { href: "/solutions/prepare-for-soc-2", title: "Prepare for SOC 2", body: "End-to-end program." },
      { href: "/compliance/iso-27001", title: "ISO 27001 Readiness", body: "Companion international framework." },
    ],
  },
  "ir-plan-template": {
    meta: { title: "Incident Response Plan Template", description: "A starting-point IR plan you can adapt in an afternoon." },
    hero: {
      eyebrow: "Download · Free · 28 pages",
      title: <>Incident response plan — the editable template.</>,
      sub: "A working IR plan template, structured the way IR retainer engagements actually use it. Editable Word + Markdown formats.",
    },
    whatsInside: [
      "Roles and responsibilities (RACI)",
      "Severity-classification matrix",
      "Escalation paths — internal and external",
      "Communication templates — internal, customer, regulator, breach-coach",
      "Containment authorization framework",
      "Post-incident retrospective format",
      "Tabletop scenarios — 6 included",
      "Decision-tree appendix",
    ],
    cta: { href: "/contact?topic=ir&asset=ir-plan-template", label: "Get the template", tone: "gradient" },
    related: [
      { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Beyond the plan — operationalized." },
      { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Test the plan with a facilitated exercise." },
      { href: "/resources/guides/incident-response", title: "IR Guides", body: "Long-form IR content." },
    ],
  },
};

// ─── /tools/[slug] ──────────────────────────────────────────────────────────

export const TOOL_PAGES: Record<string, ResourcePage> = {
  "cyber-risk-calculator": {
    meta: { title: "Cyber Risk Calculator", description: "Quantify exposure in dollars — frequency × magnitude — calibrated to your industry." },
    hero: {
      eyebrow: "Tool · Interactive",
      title: <>Quantify cyber risk <span className="brand-gradient-text">in dollars</span>.</>,
      sub: "Most cyber-risk conversations stop at 'high/medium/low'. This tool converts your exposure into an annualized dollar range — frequency × magnitude — calibrated to industry benchmarks. No signup; nothing leaves your browser.",
    },
    whatsInside: [
      "Industry-calibrated frequency benchmarks",
      "Magnitude estimation by control posture",
      "Sensitivity analysis on inputs",
      "Boardroom-ready output",
      "Calibrated to FAIR methodology",
    ],
    cta: { href: "/services/cyber-risk-assessment", label: "Get the expert assessment" },
    related: [
      { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "The expert version of this analysis." },
      { href: "/services/cyber-insurance-readiness", title: "Cyber Insurance Readiness", body: "Quantified risk informs insurance binding." },
      { href: "/resources/downloads/cyber-risk-checklist", title: "Cyber Risk Checklist", body: "Qualitative companion." },
    ],
  },
  "compliance-quiz": {
    meta: { title: "Compliance Readiness Quiz", description: "Five minutes to find out which framework actually applies to you." },
    hero: {
      eyebrow: "Tool · 5 minutes",
      title: <>Which compliance framework <span className="brand-gradient-text">actually applies to you</span>?</>,
      sub: "12 questions about your industry, customers, contracts, and growth stage. We'll send back a tailored framework map and a starting readiness checklist.",
    },
    whatsInside: [
      "Industry-and-customer-driven framework selection",
      "Mapped against SOC 2, ISO 27001, CMMC, HIPAA, PCI, GDPR",
      "Practical 'do this first' starter list",
      "Estimated effort by framework",
      "No signup required",
    ],
    cta: { href: "/contact?topic=compliance&tool=compliance-quiz", label: "Request early access" },
    ctaNote: "Quiz launching soon. We'll send the link.",
    related: [
      { href: "/compliance", title: "Compliance hub", body: "See all frameworks and engagements." },
      { href: "/resources/guides/compliance", title: "Compliance guides", body: "Long-form framework breakdowns." },
      { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Expert assessment companion." },
    ],
  },
  "vendor-risk-questionnaire": {
    meta: { title: "Vendor Risk Questionnaire", description: "The 30-question short-form we'd use to evaluate a new third party." },
    hero: {
      eyebrow: "Tool · Template",
      title: <>The 30-question vendor risk <span className="brand-gradient-text">short-form</span>.</>,
      sub: "Most vendor questionnaires are 200 questions and assess nothing. This is the 30-question short-form we'd actually use to triage a new third party. Editable; bring your own scoring.",
    },
    whatsInside: [
      "30 questions across security, privacy, operational risk",
      "Risk-tier guidance (when to send full SIG vs. short form)",
      "Scoring rubric starter",
      "Editable Word + Notion-friendly formats",
    ],
    cta: { href: "/contact?topic=other&tool=vendor-risk-questionnaire", label: "Get the questionnaire" },
    related: [
      { href: "/services/vendor-risk-management", title: "Vendor Risk Management", body: "When you need a full program." },
      { href: "/compliance/vendor-security-reviews", title: "Vendor Security Reviews", body: "When you're on the receiving end." },
    ],
  },
  "cyber-insurance-readiness": {
    meta: { title: "Cyber Insurance Readiness Checklist", description: "Pre-binding control review to keep premiums sane and claims paid." },
    hero: {
      eyebrow: "Tool · Checklist",
      title: <>Cyber insurance readiness, <span className="brand-gradient-text">underwriter-aligned</span>.</>,
      sub: "Underwriters are auditors with checkbooks. This checklist mirrors what carriers are actually scoring on this cycle — MFA, EDR coverage, backup integrity, segmentation, IR retainer. Run it before renewal.",
    },
    whatsInside: [
      "This-cycle underwriting criteria",
      "MFA coverage scoring matrix",
      "EDR / backup / IR scoring",
      "Pre-binding controls gap detector",
      "Application-answer guidance",
      "Renewal-cycle timeline",
    ],
    cta: { href: "/contact?topic=other&tool=cyber-insurance-readiness", label: "Get the checklist" },
    related: [
      { href: "/services/cyber-insurance-readiness", title: "Cyber Insurance Readiness Engagement", body: "The full pre-binding review service." },
      { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Commonly credited by underwriters." },
    ],
  },
};
