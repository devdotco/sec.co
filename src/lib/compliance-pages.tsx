/**
 * Compliance framework pages.
 * Reuses the ServiceDetailPage template — same shape works for "what's included /
 * how it works / outcomes" pattern across both service and framework pages.
 */

import type { ServiceDetailConfig } from "@/components/site/service-detail";

type CompliancePage = {
  meta: { title: string; description: string };
  config: ServiceDetailConfig;
};

export const COMPLIANCE_PAGES: Record<string, CompliancePage> = {
  // ─── Defense & Government ─────────────────────────────────────────────────

  cmmc: {
    meta: {
      title: "CMMC Compliance",
      description: "CMMC Level 1, 2, and 3 readiness for DoD contractors and subcontractors handling FCI and CUI. Gap assessment, remediation, and C3PAO-ready evidence.",
    },
    config: {
      category: "Defense & Government",
      title: <>CMMC, <span className="brand-gradient-text">level by level</span>.</>,
      sub: "If you bid on DoD contracts and touch FCI or CUI, CMMC is the gate. We run gap assessment, drive remediation, build the evidence package, and stay engaged through C3PAO assessment.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule CMMC gap assessment" },
      secondaryCta: { href: "/solutions/prepare-for-cmmc", label: "How we typically engage" },
      factStrip: [
        { label: "Levels covered", value: "L1 · L2 · L3" },
        { label: "Engagement", value: "Gap + remediate + audit" },
        { label: "Typical timeline", value: "6–18 months" },
        { label: "C3PAO support", value: "Yes" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Scope analysis", body: "Which contracts, which data, which systems are actually in scope. Most clients are surprised by this answer." },
          { title: "Gap assessment vs. all 110 controls", body: "Control-by-control map of where you are vs. where Level 2 requires you to be." },
          { title: "Remediation roadmap & execution", body: "Prioritized roadmap with timeline. We can execute most controls or coach your team — your choice." },
          { title: "SSP & POAM authoring", body: "System Security Plan and Plan of Action & Milestones authored to C3PAO-acceptable standard." },
          { title: "Evidence collection & organization", body: "The artifact package that proves the controls work — organized for assessment week, not buried in shared drives." },
          { title: "C3PAO assessment support", body: "We sit through assessment week with you. Pre-flight on questions, post-flight on any findings." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Phase 1", title: "Scope + gap", body: "Define enclave, identify CUI flows, assess against all 110 controls. Deliverable: gap report + remediation roadmap." },
          { eyebrow: "Phase 2", title: "Remediate", body: "Execute controls, write policies, deploy technical fixes. Most clients need 3–9 months here depending on starting posture." },
          { eyebrow: "Phase 3", title: "Document", body: "SSP, POAM, evidence package authored to C3PAO standard." },
          { eyebrow: "Phase 4", title: "Assess", body: "C3PAO assessment with our team present. Pre-flight and post-flight support included." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "C3PAO-ready evidence package",
          "SSP and POAM authored to acceptable standard",
          "Remediation complete on all 110 (Level 2) controls",
          "Defensible CUI enclave architecture",
          "Continued eligibility for DoD contracts touching CUI",
          "Documented continuous-monitoring program",
        ],
      },
      related: [
        { href: "/compliance/nist-800-171", title: "NIST 800-171", body: "The control set underneath CMMC — same 110 controls." },
        { href: "/compliance/dfars", title: "DFARS Cybersecurity", body: "Contract-clause requirements adjacent to CMMC." },
        { href: "/industries/government-contractors", title: "Government Contractors", body: "Industry-specific framing for DIB clients." },
      ],
      finalCta: {
        title: <>Get the gap assessment first.</>,
        body: "Most clients save 30–50% on remediation timeline by starting with a structured gap assessment — instead of remediating against assumptions.",
        primary: { href: "/contact?topic=compliance", label: "Schedule the gap assessment" },
        secondary: { href: "/compliance/nist-800-171", label: "Start with NIST 800-171" },
      },
    },
  },

  "nist-800-171": {
    meta: {
      title: "NIST 800-171",
      description: "Implementation and assessment of the 110 NIST SP 800-171 controls protecting Controlled Unclassified Information in non-federal systems.",
    },
    config: {
      category: "Defense & Government",
      title: <>NIST 800-171, <span className="brand-gradient-text">the 110 controls</span>.</>,
      sub: "NIST 800-171 is the underlying control set for DFARS, CMMC, and many state programs. Required if you handle CUI. We implement, document, and assess against the full control set — including the new Rev 3 update.",
      primaryCta: { href: "/contact?topic=compliance", label: "Start a NIST 800-171 engagement" },
      factStrip: [
        { label: "Controls", value: "110 (Rev 3)" },
        { label: "Engagement", value: "Implement + assess" },
        { label: "Output", value: "SPRS-ready" },
        { label: "Maps to", value: "CMMC L2" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "CUI flow mapping", body: "Where CUI enters, lives, and leaves your environment. Most engagements start with the discovery that scope is broader than expected." },
          { title: "Control-by-control gap", body: "All 110 controls assessed against your current implementation. Mapped to specific evidence requirements." },
          { title: "Implementation roadmap", body: "Prioritized by exploitability, audit risk, and effort. Quick wins first; structural work scheduled." },
          { title: "Documentation authoring", body: "Policies, procedures, and the System Security Plan — written to withstand DFARS assessment." },
          { title: "SPRS score support", body: "Help with score calculation and submission. Most companies underreport — we help you report accurately." },
          { title: "Annual reassessment", body: "Annual delta assessment to catch drift and add new requirements as Rev 3 evolves." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Scope + gap", body: "CUI flow mapping, full control gap, evidence-requirement mapping." },
          { eyebrow: "Months 1–6", title: "Remediation", body: "Technical and procedural controls implemented. Pace depends on starting posture." },
          { eyebrow: "Months 6–8", title: "Documentation + SPRS", body: "SSP, POAM, and SPRS score assembled. Submission support if required." },
          { eyebrow: "Annual", title: "Reassessment", body: "Delta assessment + score refresh + Rev 3 updates." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "All 110 controls implemented or formally exception-documented",
          "Audit-ready SSP and POAM",
          "Accurate SPRS score submitted",
          "Defensible posture under DFARS assessment",
          "Foundation for CMMC Level 2",
          "Annual continuous-improvement cadence",
        ],
      },
      related: [
        { href: "/compliance/cmmc", title: "CMMC Compliance", body: "The certification regime built on top of 800-171." },
        { href: "/compliance/dfars", title: "DFARS Cybersecurity", body: "The contract clause that requires 800-171." },
        { href: "/compliance/fedramp", title: "FedRAMP Readiness", body: "Adjacent program for federal cloud providers." },
      ],
    },
  },

  fedramp: {
    meta: {
      title: "FedRAMP Readiness",
      description: "Pre-audit advisory for cloud-service providers seeking FedRAMP Low, Moderate, or High authorization.",
    },
    config: {
      category: "Defense & Government",
      title: <>FedRAMP, <span className="brand-gradient-text">demystified</span>.</>,
      sub: "FedRAMP is a multi-year, multi-million-dollar program. We help cloud-service providers scope realistically, achieve readiness, and survive 3PAO assessment without the consultancy bloat.",
      primaryCta: { href: "/contact?topic=compliance", label: "Scope a FedRAMP engagement" },
      factStrip: [
        { label: "Baselines", value: "Low · Moderate · High" },
        { label: "Engagement", value: "Pre-audit advisory" },
        { label: "Timeline", value: "12–24 months" },
        { label: "3PAO support", value: "Yes" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Authorization path strategy", body: "Agency sponsor vs. JAB. Realistic timeline. Cost envelope. The strategy call most engagements skip." },
          { title: "Boundary definition", body: "Authorization boundary defined and documented to satisfy 3PAO scrutiny — a common cause of failed assessments." },
          { title: "Control implementation", body: "NIST 800-53 baseline implementation. Most CSPs need significant engineering work here." },
          { title: "SSP and supporting documentation", body: "System Security Plan and all supporting artifacts — the audit deliverable." },
          { title: "Continuous monitoring program", body: "ConMon program built to satisfy post-authorization requirements." },
          { title: "3PAO support", body: "Pre-assessment readiness review and through-assessment support." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Phase 1", title: "Strategy + boundary", body: "Authorization path, sponsor strategy, boundary definition." },
          { eyebrow: "Phase 2", title: "Control implementation", body: "Engineering and process work to meet baseline controls." },
          { eyebrow: "Phase 3", title: "Documentation", body: "SSP and supporting artifacts to 3PAO-acceptable standard." },
          { eyebrow: "Phase 4", title: "Assess + authorize", body: "3PAO assessment, P-ATO/ATO issuance, ConMon launch." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "P-ATO or ATO at the targeted baseline",
          "Defensible authorization boundary",
          "Continuous monitoring program operating",
          "Federal sales eligibility",
          "Audit-evidence reusable for adjacent frameworks (NIST 800-53)",
        ],
      },
      related: [
        { href: "/compliance/nist-800-171", title: "NIST 800-171", body: "Related control set; FedRAMP uses 800-53." },
        { href: "/compliance/cmmc", title: "CMMC Compliance", body: "Adjacent defense-program requirement." },
        { href: "/frameworks#nist-800-53", title: "NIST SP 800-53", body: "The control catalog underneath FedRAMP." },
      ],
    },
  },

  dfars: {
    meta: {
      title: "DFARS Cybersecurity",
      description: "DFARS clause 252.204-7012 compliance — controls, SPRS submissions, and incident-reporting workflows for DoD contractors.",
    },
    config: {
      category: "Defense & Government",
      title: <>DFARS 7012, <span className="brand-gradient-text">implementation-grade</span>.</>,
      sub: "DFARS clause 252.204-7012 requires adequate security and rapid incident reporting for covered defense information. We implement the controls, build the reporting workflow, and stand-up the program.",
      primaryCta: { href: "/contact?topic=compliance", label: "Start DFARS engagement" },
      factStrip: [
        { label: "Clause", value: "252.204-7012" },
        { label: "Maps to", value: "NIST 800-171" },
        { label: "Reporting SLA", value: "72 hours" },
        { label: "SPRS", value: "Submission included" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Clause-by-clause assessment", body: "Every DFARS clause your contracts contain, mapped to current implementation status." },
          { title: "NIST 800-171 implementation", body: "The required control set, implemented and documented." },
          { title: "Incident reporting workflow", body: "72-hour cyber incident reporting workflow with DoD — pre-built, pre-tested." },
          { title: "SPRS score submission", body: "Score calculation, submission, and dispute-handling support." },
          { title: "Subcontractor flowdown", body: "Flow-down requirements for your subs — language, expectations, monitoring." },
          { title: "Continuous monitoring", body: "Annual posture refresh + ad-hoc when contracts change." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–4", title: "Assess + scope", body: "Clause review, CUI flow mapping, gap analysis against 800-171." },
          { eyebrow: "Months 1–6", title: "Remediate", body: "Controls implemented and documented." },
          { eyebrow: "Months 6–8", title: "Workflows + SPRS", body: "Incident-reporting workflow built and tested; SPRS submitted." },
          { eyebrow: "Annual", title: "Reassess", body: "Posture refresh, score recalculation, contract delta review." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "NIST 800-171 controls implemented and documented",
          "Tested 72-hour incident-reporting workflow",
          "Accurate SPRS score submitted",
          "Subcontractor flow-down language ready",
          "Continued eligibility for DFARS-covered contracts",
        ],
      },
      related: [
        { href: "/compliance/cmmc", title: "CMMC Compliance", body: "The certification regime DFARS is migrating toward." },
        { href: "/compliance/nist-800-171", title: "NIST 800-171", body: "The control set underneath DFARS." },
        { href: "/industries/government-contractors", title: "Government Contractors", body: "Industry framing for DIB clients." },
      ],
    },
  },

  // ─── Business & SaaS ──────────────────────────────────────────────────────

  "soc-2": {
    meta: {
      title: "SOC 2 Readiness",
      description: "Type I and Type II readiness — controls, evidence, auditor selection, and mock audits. The B2B sales requirement, treated as a control program.",
    },
    config: {
      category: "Business & SaaS",
      title: <>SOC 2, <span className="brand-gradient-text">in time for the buyer</span>.</>,
      sub: "SOC 2 is the de facto B2B sales requirement for SaaS. We run readiness end-to-end — controls, evidence collection, auditor selection, mock audits — for Type I in 60–90 days and Type II in the audit period that follows.",
      primaryCta: { href: "/solutions/prepare-for-soc-2", label: "Our SOC 2 program" },
      secondaryCta: { href: "/contact?topic=compliance", label: "Schedule a readiness call" },
      factStrip: [
        { label: "Types", value: "I → II" },
        { label: "Type I", value: "60–90 days" },
        { label: "Type II", value: "+6–12 months" },
        { label: "Auditor support", value: "Yes" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Scope and TSC selection", body: "Which Trust Services Criteria apply — most clients only need Security; some need Confidentiality, Availability, Processing Integrity, or Privacy added." },
          { title: "Control gap assessment", body: "Every applicable control assessed against current implementation. Gaps prioritized by audit risk and remediation effort." },
          { title: "Remediation execution or coaching", body: "We execute the technical work, or coach your engineers, or both. Your call." },
          { title: "Evidence collection workflow", body: "Continuous evidence collection — not a fire drill the week of audit." },
          { title: "Auditor selection support", body: "We work with most of the major SOC 2 auditors. We help you pick the right one for your stage." },
          { title: "Mock audit", body: "Internal audit before the real one. Surfaces gaps when there's still time to close them." },
        ],
      },
      process: {
        title: "From kickoff to Type II",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Scope + gap", body: "TSC scoping, control gap, remediation roadmap." },
          { eyebrow: "Weeks 3–10", title: "Remediate + document", body: "Technical and procedural controls implemented; policies authored." },
          { eyebrow: "Weeks 10–12", title: "Mock audit + auditor selection", body: "Internal audit + auditor RFP. Type I audit scheduled." },
          { eyebrow: "Months 3–6", title: "Type I audit", body: "Auditor on-site / remote. We support every interaction." },
          { eyebrow: "Months 3–15", title: "Type II monitoring period", body: "Continuous evidence collection, control operation monitoring, Type II audit at end of period." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "SOC 2 Type I report on schedule for sales pipeline",
          "Type II report in the following audit period",
          "Continuous evidence-collection workflow that survives staff turnover",
          "Customer trust-center content ready to publish",
          "Sales-team-ready security narrative",
          "Audit-relationship calibrated for your business",
        ],
      },
      related: [
        { href: "/solutions/prepare-for-soc-2", title: "Prepare for SOC 2", body: "Solution-oriented framing if you're not sure where to start." },
        { href: "/compliance/iso-27001", title: "ISO 27001 Readiness", body: "Complementary international framework." },
        { href: "/services/vciso", title: "vCISO Services", body: "Most SOC 2 programs are run by a vCISO." },
      ],
    },
  },

  "iso-27001": {
    meta: {
      title: "ISO 27001 Readiness",
      description: "ISMS scoping, Statement of Applicability, internal audit, and external certification preparation. The international companion to SOC 2.",
    },
    config: {
      category: "Business & SaaS",
      title: <>ISO 27001, <span className="brand-gradient-text">as an operating system</span>.</>,
      sub: "ISO 27001 is more rigorous than SOC 2 — and required outside the U.S. or for enterprise procurement. We build the ISMS, scope it correctly, run the internal audit, and prepare you for external certification.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule an ISO 27001 call" },
      factStrip: [
        { label: "Standard", value: "ISO/IEC 27001:2022" },
        { label: "Engagement", value: "ISMS build + audit prep" },
        { label: "Timeline", value: "6–12 months" },
        { label: "Reuses", value: "SOC 2 controls" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "ISMS scoping", body: "Information Security Management System scope — what's in, what's out, and why. Critical for certification." },
          { title: "Risk assessment & treatment", body: "Risk-based methodology that drives control selection. Not a generic Annex A drop." },
          { title: "Statement of Applicability", body: "SoA authored with treatment decisions documented for every Annex A control." },
          { title: "Internal audit", body: "Internal audit run before certification. Findings closed with formal corrective actions." },
          { title: "Management review", body: "Top-management review process built and operated." },
          { title: "External certification support", body: "We work with most of the major certifying bodies and support every interaction." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Months 1–2", title: "Scoping + risk", body: "ISMS scope, risk methodology, risk assessment, treatment plan." },
          { eyebrow: "Months 2–6", title: "Control implementation", body: "Annex A controls implemented per SoA. Documentation authored." },
          { eyebrow: "Month 6", title: "Internal audit", body: "Internal audit run; corrective actions closed." },
          { eyebrow: "Months 7–8", title: "Stage 1 audit", body: "External auditor documentation review." },
          { eyebrow: "Months 9–12", title: "Stage 2 audit + certification", body: "Stage 2 implementation audit. Certification issued." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "ISO/IEC 27001:2022 certification",
          "Working ISMS with formal review cadence",
          "Risk register tied to business impact",
          "Audit-ready evidence library",
          "Significant overlap with SOC 2 controls (re-usable evidence)",
          "Enterprise-procurement eligibility (Fortune 500, EU)",
        ],
      },
      related: [
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Most companies pursuing ISO 27001 also have or want SOC 2." },
        { href: "/services/cybersecurity-program-development", title: "Program Development", body: "ISO 27001 is essentially a program-development engagement with certification at the end." },
        { href: "/services/vciso", title: "vCISO Services", body: "ISMS ownership is a natural vCISO responsibility." },
      ],
    },
  },

  "vendor-security-reviews": {
    meta: {
      title: "Vendor Security Reviews",
      description: "Respond to (or run) third-party security reviews without slowing your sales cycle or growing the security-questionnaire backlog.",
    },
    config: {
      category: "Business & SaaS",
      title: <>Get the deal closed <span className="brand-gradient-text">without burning the security team</span>.</>,
      sub: "Whether you're on the receiving end of enterprise security reviews or running them on your own vendors, we make the workflow efficient — without skipping the substance.",
      primaryCta: { href: "/contact?topic=compliance", label: "Talk about your VSR workflow" },
      factStrip: [
        { label: "Engagement", value: "Project or ongoing" },
        { label: "Speeds up", value: "Sales cycle" },
        { label: "Reduces", value: "Security backlog" },
        { label: "Output", value: "Answer library" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Answer-library build", body: "Standard answers for the questions you'll see 80% of the time — version-controlled, accurate, and pre-approved." },
          { title: "Trust center", body: "Public trust-center page with SOC 2, ISO 27001, controls, sub-processors — the page enterprise buyers want to find first." },
          { title: "Custom questionnaire workflow", body: "When the buyer sends a custom questionnaire, we handle the response — your security team approves, doesn't write." },
          { title: "Buyer calls", body: "We attend buyer security calls alongside your sales engineer when needed." },
          { title: "Inbound VRM", body: "If you receive questionnaires more than ad-hoc, we operationalize the inbound queue." },
          { title: "Outbound VRM", body: "If you need to assess your own vendors — see the vendor-risk-management service." },
        ],
      },
      process: {
        title: "Build, then operate",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Answer-library build", body: "We compile your current state into a maintained answer library." },
          { eyebrow: "Weeks 3–5", title: "Trust center", body: "Public page authored and published." },
          { eyebrow: "Ongoing", title: "Operate", body: "Custom questionnaires answered, buyer calls attended, trust center kept current." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Trust center that deflects routine asks",
          "Answer library kept current with controls",
          "Faster security-review turnaround time",
          "Less security-team time burned per deal",
          "Sales-team enablement for security conversations",
        ],
      },
      related: [
        { href: "/compliance/security-questionnaires", title: "Security Questionnaires", body: "The questionnaire-specific service." },
        { href: "/services/vendor-risk-management", title: "Vendor Risk Management", body: "If you need to run VSRs on your own vendors." },
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "The most common evidence buyers ask for." },
      ],
    },
  },

  "security-questionnaires": {
    meta: {
      title: "Security Questionnaires",
      description: "SIG, CAIQ, and custom security questionnaires — answered by a managed workflow, not your engineering team.",
    },
    config: {
      category: "Business & SaaS",
      title: <>Stop having engineers <span className="brand-gradient-text">write essays</span>.</>,
      sub: "SIG, CAIQ, and the long tail of custom questionnaires consume security-team time that should be spent elsewhere. We maintain the answer library and respond to questionnaires — your security team approves, doesn't author.",
      primaryCta: { href: "/contact?topic=compliance", label: "Offload your questionnaire queue" },
      factStrip: [
        { label: "Formats", value: "SIG · CAIQ · custom" },
        { label: "Turnaround", value: "5 business days" },
        { label: "Coverage", value: "All major templates" },
        { label: "Approval", value: "Your team signs off" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Answer-library maintenance", body: "Centralized, version-controlled answer library tied to current controls and policies." },
          { title: "SIG / CAIQ / custom response", body: "We respond to incoming questionnaires using the maintained library. Your team approves." },
          { title: "Custom mapping work", body: "When a buyer sends a unique format, we map it to library answers — not from scratch every time." },
          { title: "Evidence package assembly", body: "Pre-built evidence packages by buyer-type (financial, healthcare, federal, etc.)." },
          { title: "Trust-center maintenance", body: "Public-facing trust center kept current so many buyers self-serve." },
          { title: "Quarterly library refresh", body: "Library updated as controls evolve, audits complete, certifications renew." },
        ],
      },
      process: {
        title: "How it works",
        steps: [
          { eyebrow: "Onboarding", title: "Library build", body: "We compile your current state into a maintained answer library — 2 to 4 weeks depending on starting posture." },
          { eyebrow: "Ongoing", title: "Inbound triage", body: "Questionnaires arrive, get triaged, mapped to library." },
          { eyebrow: "5 days", title: "Response", body: "Draft response within 5 business days. Your team approves." },
          { eyebrow: "Quarterly", title: "Library refresh", body: "Answers updated as your controls evolve." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Centralized, current answer library",
          "5-business-day turnaround on incoming questionnaires",
          "Engineering team writing code, not essays",
          "Pre-built evidence packages by buyer type",
          "Trust center deflecting routine asks",
        ],
      },
      related: [
        { href: "/compliance/vendor-security-reviews", title: "Vendor Security Reviews", body: "Broader inbound-VRM workflow if you need it." },
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Most-requested evidence in questionnaires." },
        { href: "/compliance/iso-27001", title: "ISO 27001 Readiness", body: "Enterprise-buyer companion to SOC 2." },
      ],
    },
  },

  // ─── Regulated Industries ─────────────────────────────────────────────────

  hipaa: {
    meta: {
      title: "HIPAA Security Risk Assessment",
      description: "Required HIPAA Security Rule risk assessment and remediation for covered entities and business associates handling PHI.",
    },
    config: {
      category: "Regulated Industries",
      title: <>HIPAA, <span className="brand-gradient-text">implementation-grade</span>.</>,
      sub: "The Security Rule requires an SRA. The Office for Civil Rights expects to see a real one — not a one-page attestation. We perform the SRA, drive remediation, and prepare you for OCR audit posture.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule HIPAA SRA" },
      factStrip: [
        { label: "Rule", value: "HIPAA Security Rule" },
        { label: "Scope", value: "Covered entities + BAs" },
        { label: "Output", value: "SRA + roadmap" },
        { label: "Cadence", value: "Annual" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Security Risk Assessment", body: "Full SRA per the Security Rule — administrative, physical, and technical safeguards." },
          { title: "BAA review", body: "Business Associate Agreements reviewed against your actual data flows and obligations." },
          { title: "Remediation roadmap", body: "Prioritized by probability × impact and OCR-audit risk." },
          { title: "Policy library", body: "HIPAA-specific policies written for your stack and stage." },
          { title: "Workforce training program", body: "Required workforce training built and tracked." },
          { title: "Incident response & breach notification", body: "60-day breach notification workflow built and tested." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Risk assessment", body: "Full SRA covering administrative, physical, and technical safeguards." },
          { eyebrow: "Weeks 3–4", title: "Remediation roadmap", body: "Prioritized roadmap with realistic timeline and ownership." },
          { eyebrow: "Months 1–6", title: "Remediate", body: "Controls implemented; policies authored; training launched." },
          { eyebrow: "Annual", title: "Refresh", body: "SRA refreshed annually or on material change." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "OCR-audit-defensible Security Risk Assessment",
          "Remediation roadmap with documented ownership",
          "Policy library tuned to your stack",
          "Workforce training operating",
          "60-day breach-notification workflow tested",
          "Annual continuous-improvement cadence",
        ],
      },
      related: [
        { href: "/industries/healthcare", title: "Healthcare", body: "Industry-specific framing for providers, payers, and digital health." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "60-day notification clock starts when you discover the breach — retainers shorten the discovery window." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Broader risk assessment companion to the HIPAA-specific SRA." },
      ],
    },
  },

  "pci-dss": {
    meta: {
      title: "PCI DSS Compliance",
      description: "SAQ and Level 1–4 advisory; QSA-ready evidence and ROC support for organizations handling cardholder data.",
    },
    config: {
      category: "Regulated Industries",
      title: <>PCI DSS, <span className="brand-gradient-text">scoped to reality</span>.</>,
      sub: "PCI DSS rewards aggressive scope reduction. We help you minimize the CDE, implement controls correctly, and pass QSA review — without paying the enterprise-edition tax.",
      primaryCta: { href: "/contact?topic=compliance", label: "Scope PCI assessment" },
      factStrip: [
        { label: "Version", value: "PCI DSS v4" },
        { label: "Levels", value: "1–4" },
        { label: "SAQ types", value: "All" },
        { label: "QSA support", value: "Yes" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "CDE scope reduction", body: "The single highest-leverage activity in PCI. We help you minimize the cardholder data environment aggressively." },
          { title: "SAQ determination", body: "Which SAQ actually applies — A, A-EP, B, C, C-VT, D-Merchant, D-SP. Often a surprise." },
          { title: "Control implementation", body: "All 12 requirements implemented to the level your SAQ requires." },
          { title: "QSA selection (Level 1)", body: "For Level 1, we help select a QSA and support the ROC engagement." },
          { title: "Tokenization & segmentation", body: "Architectural work to reduce scope further — typically saves audit cost in subsequent cycles." },
          { title: "Annual reassessment", body: "Annual posture refresh; SAQ resubmission or ROC support." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–4", title: "Scope + SAQ", body: "CDE mapping and scope-reduction analysis. SAQ determination." },
          { eyebrow: "Months 1–6", title: "Implement", body: "Controls implemented; tokenization / segmentation if applicable." },
          { eyebrow: "Months 6–8", title: "Assess", body: "SAQ submission or QSA ROC engagement, depending on level." },
          { eyebrow: "Annual", title: "Reassess", body: "Annual refresh + scope re-validation." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Minimized cardholder data environment",
          "Correct SAQ or ROC for your level",
          "All 12 requirements implemented and documented",
          "Brand-acceptable validation evidence",
          "Lower long-term assessment cost",
        ],
      },
      related: [
        { href: "/industries/ecommerce", title: "E-commerce", body: "Industry framing for DTC and marketplaces." },
        { href: "/industries/financial-services", title: "Financial Services", body: "Industry framing for FIs and processors." },
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Broader assessment companion." },
      ],
    },
  },

  gdpr: {
    meta: {
      title: "GDPR Readiness",
      description: "Data mapping, DPIA, ROPA, controller/processor terms, and breach response for EU/UK data-processing obligations.",
    },
    config: {
      category: "Regulated Industries",
      title: <>GDPR, <span className="brand-gradient-text">where it actually matters</span>.</>,
      sub: "GDPR applies to U.S. companies handling EU residents' data — and the penalties are material. We help you understand what applies, build the operating program, and respond to subject requests and breach obligations.",
      primaryCta: { href: "/contact?topic=compliance", label: "Scope GDPR engagement" },
      factStrip: [
        { label: "Scope", value: "EU / UK personal data" },
        { label: "Engagement", value: "Implement + operate" },
        { label: "Subject requests", value: "Workflow built" },
        { label: "Breach SLA", value: "72 hours" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Applicability analysis", body: "Where GDPR applies to your business and where it doesn't. Many companies over-scope." },
          { title: "Data mapping & ROPA", body: "Record of Processing Activities built and maintained." },
          { title: "DPIA where required", body: "Data Protection Impact Assessment for high-risk processing." },
          { title: "Controller / processor terms", body: "Data Processing Agreements with your customers, vendors, and sub-processors." },
          { title: "Subject-request workflow", body: "Access, deletion, portability, restriction — workflow built and SLA-managed." },
          { title: "Breach-notification workflow", body: "72-hour notification workflow with documentation requirements." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Scope + map", body: "Applicability analysis, data mapping, ROPA built." },
          { eyebrow: "Months 1–3", title: "Controls + agreements", body: "Controls implemented; DPAs negotiated with customers and vendors." },
          { eyebrow: "Months 3–4", title: "Workflows", body: "Subject-request and breach-notification workflows tested." },
          { eyebrow: "Ongoing", title: "Operate + refresh", body: "Quarterly refresh; ad-hoc on material change." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Defensible applicability narrative",
          "Current ROPA and DPIAs where required",
          "DPA library negotiated with key counterparties",
          "Subject-request workflow operating within SLAs",
          "72-hour breach-notification workflow tested",
          "EU / UK enterprise procurement eligibility",
        ],
      },
      related: [
        { href: "/compliance/soc-2", title: "SOC 2 (Privacy TSC)", body: "Privacy criterion in SOC 2 maps to GDPR controls." },
        { href: "/compliance/iso-27001", title: "ISO 27001", body: "Often paired with GDPR for international enterprise sales." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "72-hour breach SLA needs response infrastructure ready." },
      ],
    },
  },

  "sec-disclosure": {
    meta: {
      title: "SEC Cybersecurity Disclosure Readiness",
      description: "Item 1.05 incident disclosure, Item 106 governance disclosure, and the materiality call — for public companies and pre-IPO.",
    },
    config: {
      category: "Regulated Industries",
      title: <>SEC cyber disclosure, <span className="brand-gradient-text">before the materiality call</span>.</>,
      sub: "The 2023 SEC rules require Item 1.05 incident disclosure within four business days of a materiality determination, and Item 106 annual governance disclosure. We help public companies and pre-IPO orgs prepare for both.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule SEC readiness call" },
      factStrip: [
        { label: "Items covered", value: "1.05 · 106" },
        { label: "Audience", value: "Public + pre-IPO" },
        { label: "Materiality", value: "Framework built" },
        { label: "Cadence", value: "Annual + ad-hoc" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Materiality framework", body: "A documented framework for making the materiality call quickly under pressure. Reviewed by legal." },
          { title: "Item 1.05 playbook", body: "Four-day clock workflow with cross-functional roles defined (security, legal, comms, IR, board)." },
          { title: "Item 106 disclosure authoring", body: "Annual 10-K disclosure on cybersecurity governance, risk management, and material risks." },
          { title: "Board cybersecurity briefing program", body: "Quarterly briefings designed for board-fiduciary needs, not security-team comfort." },
          { title: "Risk-factor language review", body: "10-K risk factor language reviewed for accuracy and defensibility." },
          { title: "Tabletop with executives + GC", body: "Materiality-call tabletop run with C-suite and General Counsel." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–4", title: "Framework + playbook", body: "Materiality framework, Item 1.05 playbook, roles defined." },
          { eyebrow: "Weeks 4–8", title: "Item 106 + risk factors", body: "Annual disclosure drafted; risk-factor language reviewed." },
          { eyebrow: "Month 3", title: "Tabletop", body: "Materiality-call tabletop with C-suite and GC." },
          { eyebrow: "Annual", title: "Refresh", body: "Disclosures refreshed for the next 10-K cycle." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Documented materiality framework signed off by legal",
          "Four-day Item 1.05 playbook with cross-functional roles",
          "Item 106 disclosure language reviewed and drafted",
          "Board cybersecurity briefing cadence operating",
          "Risk-factor language defensible",
          "Tabletop-tested executive muscle memory",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Item 1.05 needs IR-readiness underneath." },
        { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Materiality-call tabletop is a specialized variant." },
        { href: "/services/vciso", title: "vCISO Services", body: "vCISO often owns SEC-disclosure program for public clients." },
      ],
    },
  },
};
