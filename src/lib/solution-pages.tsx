/**
 * Solution pages — buyer-intent framing.
 * Same template, different angle: outcome-driven not service-driven.
 */

import type { ServiceDetailConfig } from "@/components/site/service-detail";

type SolutionPage = {
  meta: { title: string; description: string };
  config: ServiceDetailConfig;
};

export const SOLUTION_PAGES: Record<string, SolutionPage> = {
  // ─── I need to… ───────────────────────────────────────────────────────────

  "cybersecurity-assessment": {
    meta: { title: "Get a Cybersecurity Assessment", description: "A two-week diagnostic that produces a prioritized roadmap and a board-ready readout. The most-leveraged first engagement most teams can buy." },
    config: {
      category: "Solutions · I need to…",
      title: <>Find out <span className="brand-gradient-text">where you actually stand</span>.</>,
      sub: "The single most-leveraged engagement we offer. Two weeks, a senior practitioner, a prioritized roadmap. Most clients buy this first — and many never need to buy anything else.",
      primaryCta: { href: "/contact?topic=assessment", label: "Schedule the assessment" },
      secondaryCta: { href: "/services/cyber-risk-assessment", label: "Engagement detail" },
      factStrip: [
        { label: "Duration", value: "2 weeks" },
        { label: "Pricing", value: "Fixed fee" },
        { label: "Output", value: "Roadmap + readout" },
        { label: "Next step", value: "Optional" },
      ],
      included: {
        title: "What you'll find out",
        items: [
          { title: "Where your real exposure is", body: "Not theoretical risk — actual exploitable surface, ranked by business impact." },
          { title: "What to fix this quarter", body: "A prioritized punch list of changes that move the needle in 90 days." },
          { title: "What to build vs. buy vs. outsource", body: "Honest take on whether to staff up, buy a tool, or outsource — and to whom." },
          { title: "Which compliance framework actually applies", body: "We'll tell you if you actually need SOC 2, CMMC, HIPAA — or if a peer is selling you on the wrong one." },
        ],
      },
      process: {
        title: "Two weeks, end to end",
        steps: [
          { eyebrow: "Days 1–3", title: "Interviews", body: "60-min conversations with engineering, security, IT, legal, and an executive sponsor." },
          { eyebrow: "Days 3–10", title: "Review + analysis", body: "Configuration review, threat modeling, gap analysis." },
          { eyebrow: "Day 14", title: "Executive readout", body: "90-minute readout with leadership. You get the deck, the findings, the punch list." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "12-month security roadmap",
          "Quick-win punch list for this quarter",
          "Risk register tied to revenue impact",
          "Board-ready executive readout",
          "Honest recommendation on next engagement (if any)",
        ],
      },
      related: [
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "The service detail." },
        { href: "/services/vciso", title: "vCISO Services", body: "Common next step after assessment." },
        { href: "/process", title: "Our Process", body: "Where this engagement sits in the broader process." },
      ],
    },
  },

  "prepare-for-cmmc": {
    meta: { title: "Prepare for CMMC", description: "Scope, gap, remediate, document, rehearse — through CMMC Level 2 assessment by an authorized C3PAO." },
    config: {
      category: "Solutions · I need to…",
      title: <>Get ready for <span className="brand-gradient-text">CMMC assessment</span>.</>,
      sub: "If you bid on DoD contracts touching CUI, CMMC is the gate. Most teams underestimate timeline by 6 months. Start now.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule CMMC kickoff" },
      secondaryCta: { href: "/compliance/cmmc", label: "Framework detail" },
      factStrip: [
        { label: "Target", value: "L1 · L2 · L3" },
        { label: "Timeline", value: "6–18 months" },
        { label: "Engagement", value: "Gap → remediate → audit" },
        { label: "Outcome", value: "C3PAO-ready" },
      ],
      included: {
        title: "Our CMMC prep program",
        items: [
          { title: "Scoping + CUI flow mapping", body: "Define enclave, identify CUI flows, set audit boundary." },
          { title: "Control-by-control gap", body: "Map current state against all 110 controls." },
          { title: "Remediation execution or coaching", body: "We execute or coach — your call." },
          { title: "SSP + POAM authoring", body: "Audit-grade documentation." },
          { title: "Pre-assessment readiness review", body: "Internal review before C3PAO arrives." },
          { title: "C3PAO assessment support", body: "We sit through assessment week with you." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Months 1–2", title: "Scope + gap", body: "Define enclave, map CUI, assess against 110 controls." },
          { eyebrow: "Months 2–9", title: "Remediate", body: "Most clients need 3–9 months here." },
          { eyebrow: "Months 9–11", title: "Document", body: "SSP + POAM + evidence package." },
          { eyebrow: "Month 12", title: "Assess", body: "C3PAO assessment with our team present." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "CMMC Level 2 certified",
          "C3PAO-acceptable evidence package",
          "Continuous monitoring program",
          "Continued DoD contract eligibility",
        ],
      },
      related: [
        { href: "/compliance/cmmc", title: "CMMC Compliance", body: "Framework detail." },
        { href: "/compliance/nist-800-171", title: "NIST 800-171", body: "Underlying control set." },
        { href: "/industries/government-contractors", title: "Government Contractors", body: "Industry framing." },
      ],
    },
  },

  "prepare-for-soc-2": {
    meta: { title: "Prepare for SOC 2", description: "SOC 2 Type I in 60–90 days; Type II in the audit period that follows. The B2B sales requirement, managed end-to-end." },
    config: {
      category: "Solutions · I need to…",
      title: <>Get to <span className="brand-gradient-text">SOC 2 Type I</span> on schedule.</>,
      sub: "Most companies need SOC 2 because a buyer asked for it. We run the program end-to-end — controls, evidence, auditor selection, mock audits — so the buyer gets the report and you can close the deal.",
      primaryCta: { href: "/contact?topic=compliance", label: "Schedule SOC 2 kickoff" },
      secondaryCta: { href: "/compliance/soc-2", label: "Framework detail" },
      factStrip: [
        { label: "Type I", value: "60–90 days" },
        { label: "Type II", value: "+6–12 months" },
        { label: "Engagement", value: "End-to-end" },
        { label: "Outcome", value: "Audit report" },
      ],
      included: {
        title: "What we run",
        items: [
          { title: "Scoping + TSC selection", body: "Often just Security. Sometimes Confidentiality, Availability, Privacy." },
          { title: "Gap assessment + remediation", body: "Every control assessed and remediated to audit-ready." },
          { title: "Evidence collection workflow", body: "Continuous evidence collection, not an audit-week fire drill." },
          { title: "Auditor selection", body: "We help select the right auditor for your stage." },
          { title: "Mock audit", body: "Internal audit before the real one." },
          { title: "Audit support", body: "We sit alongside you through the audit." },
        ],
      },
      process: {
        title: "From kickoff to Type II",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Scope + gap", body: "TSC scoping, gap analysis." },
          { eyebrow: "Weeks 3–10", title: "Remediate + document", body: "Controls implemented, policies authored." },
          { eyebrow: "Weeks 10–12", title: "Mock + auditor RFP", body: "Internal audit + auditor selection." },
          { eyebrow: "Months 3–6", title: "Type I audit", body: "Auditor engagement with our support." },
          { eyebrow: "Months 3–15", title: "Type II", body: "Continuous evidence collection through monitoring period." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "SOC 2 Type I report on the timeline you need",
          "Type II in the next audit period",
          "Continuous evidence-collection workflow",
          "Trust-center content ready to publish",
          "Sales-team-ready security narrative",
        ],
      },
      related: [
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Framework detail." },
        { href: "/services/vciso", title: "vCISO Services", body: "Common program ownership." },
        { href: "/compliance/iso-27001", title: "ISO 27001 Readiness", body: "Often the next milestone." },
      ],
    },
  },

  "ransomware-readiness": {
    meta: { title: "Improve Ransomware Readiness", description: "Backup integrity, segmentation, IR retainer, and tabletop — the controls that actually shorten a ransomware event." },
    config: {
      category: "Solutions · I need to…",
      title: <>Be ready for ransomware <span className="brand-gradient-text">before the note appears</span>.</>,
      sub: "Most ransomware events are decided long before the encryption starts. The controls that shorten the event — backup integrity, segmentation, IR readiness, tabletop muscle memory — have to exist beforehand.",
      primaryCta: { href: "/contact?topic=ir", label: "Schedule readiness assessment" },
      secondaryCta: { href: "/services/incident-response-retainer", label: "Set up IR retainer" },
      factStrip: [
        { label: "Engagement", value: "Project + retainer" },
        { label: "Duration", value: "60 days" },
        { label: "Includes", value: "Tabletop" },
        { label: "Outcome", value: "Tested readiness" },
      ],
      included: {
        title: "The readiness work",
        items: [
          { title: "Backup integrity assessment", body: "Test restoration of business-critical systems from offline backups. Not 'we have backups' — 'restoration works'." },
          { title: "Segmentation review", body: "Lateral-movement paths mapped and constrained. Especially OT/IT, dev/prod, and identity boundaries." },
          { title: "Identity hardening", body: "Privileged access, MFA coverage, dormant account cleanup — the entry points ransomware actually uses." },
          { title: "IR retainer setup", body: "1-hour SLA, named team, pre-authorized containment — before you need it." },
          { title: "Tabletop exercise", body: "Scenario-customized ransomware tabletop with executive and technical teams." },
          { title: "Communication playbook", body: "Internal, external, regulator, customer — pre-drafted, pre-approved messaging." },
        ],
      },
      process: {
        title: "60 days to tested readiness",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Assessment", body: "Backup integrity, segmentation, identity, IR plan review." },
          { eyebrow: "Weeks 3–7", title: "Remediation", body: "Quick-wins implemented; IR retainer onboarded." },
          { eyebrow: "Week 8", title: "Tabletop + readout", body: "Full tabletop exercise + readiness readout for executives." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Tested backup-restoration capability",
          "Segmentation hardened against lateral movement",
          "Identity entry points closed",
          "IR retainer in place with 1-hour SLA",
          "Tabletop-tested executive muscle memory",
          "Pre-drafted communication playbook",
          "Cyber-insurance underwriting credit",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Core component of readiness." },
        { href: "/services/ransomware-response", title: "Ransomware Response", body: "When prevention isn't enough." },
        { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Standalone exercise if that's all you need." },
      ],
    },
  },

  // ─── I need ongoing help ─────────────────────────────────────────────────

  "24-7-monitoring": {
    meta: { title: "24/7 Security Monitoring", description: "Continuously-staffed eyes on your environment, with human-led triage and response." },
    config: {
      category: "Solutions · Ongoing help",
      title: <>24/7 eyes on your stack, <span className="brand-gradient-text">staffed by senior analysts</span>.</>,
      sub: "You don't need to staff a 24/7 SOC. We do. Senior on every shift, pre-authorized response actions, monthly readouts.",
      primaryCta: { href: "/contact?topic=managed", label: "Talk to managed services" },
      secondaryCta: { href: "/services/mdr", label: "MDR engagement detail" },
      factStrip: [
        { label: "Coverage", value: "24/7/365" },
        { label: "Staffing", value: "U.S. senior analysts" },
        { label: "Onboarding", value: "2–4 weeks" },
        { label: "Triage SLA", value: "<5 min" },
      ],
      included: {
        title: "What's covered",
        items: [
          { title: "Endpoint coverage", body: "CrowdStrike, SentinelOne, Defender — operated, not just deployed." },
          { title: "Identity monitoring", body: "Okta, Entra, Google Workspace — token theft, privilege escalation, anomalous login." },
          { title: "Cloud monitoring", body: "AWS, Azure, GCP audit logs correlated against ATT&CK." },
          { title: "SaaS monitoring", body: "M365, Google, Slack, GitHub — account abuse, OAuth grant theft, data exfil." },
          { title: "Pre-authorized containment", body: "Isolate, revoke, block — documented and audited." },
          { title: "Human-led response", body: "Every confirmed incident handled by a senior analyst — not a bot." },
        ],
      },
      process: {
        title: "From onboarding to operating",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Inventory + integration", body: "Sensors deployed, logs forwarded, detections tuned." },
          { eyebrow: "Week 3", title: "Runbook + authorization", body: "Pre-authorized actions documented and tabletop-tested." },
          { eyebrow: "Week 4+", title: "Operating", body: "24/7 monitoring, hunting, response, reporting." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Median triage <5 min, median containment <60 min",
          "Pre-authorized containment actions in audit log",
          "Detection-as-code in your repo",
          "Monthly executive readout",
          "Confidence to take vacation",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "The full service detail." },
        { href: "/services/soc-as-a-service", title: "SOC-as-a-Service", body: "Larger-scope version of the same engagement." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Standard pairing with MDR." },
      ],
    },
  },

  "vulnerability-management": {
    meta: { title: "Manage Vulnerabilities", description: "Continuous scanning, manual validation, risk-ranked remediation — quarterly metrics your board will actually read." },
    config: {
      category: "Solutions · Ongoing help",
      title: <>Stop chasing scanner noise. <span className="brand-gradient-text">Act on what matters.</span></>,
      sub: "Most vulnerability programs drown in scanner output. We run a tight loop: scan, validate, prioritize by exploitability × impact, remediate, retest, report. Quarterly metrics your board will actually read.",
      primaryCta: { href: "/contact?topic=managed", label: "Scope a VM program" },
      secondaryCta: { href: "/services/vulnerability-assessment", label: "Single-cycle assessment" },
      factStrip: [
        { label: "Cadence", value: "Continuous" },
        { label: "Method", value: "Scan + validate" },
        { label: "Output", value: "Quarterly metrics" },
        { label: "Engagement", value: "Retainer" },
      ],
      included: {
        title: "Program components",
        items: [
          { title: "Continuous scanning", body: "Authenticated scans across infra, identity, cloud, app stack." },
          { title: "Manual validation", body: "False-positives stripped before findings reach engineering." },
          { title: "Risk-ranked remediation", body: "Exploitability × business impact — not CVSS theater." },
          { title: "Engineering integration", body: "Findings land in your tracker with reproduction + fix guidance." },
          { title: "Retest + verification", body: "Closure validated, not assumed." },
          { title: "Quarterly metrics", body: "Trends, MTTR, exposure-time. Board-readable." },
        ],
      },
      process: {
        title: "Operating cadence",
        steps: [
          { eyebrow: "Setup", title: "Scanner integration", body: "Existing or new scanners onboarded; coverage gaps closed." },
          { eyebrow: "Weekly", title: "Triage + validate", body: "New findings validated and routed to engineering." },
          { eyebrow: "Monthly", title: "Remediation status", body: "Open / closed / overdue. Stale findings re-prioritized." },
          { eyebrow: "Quarterly", title: "Metrics + board", body: "Trends, MTTR, executive readout." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Engineers acting on validated findings only",
          "Risk-ranked remediation queue",
          "Quarterly trend metrics",
          "Audit-evidence for SOC 2, ISO 27001",
          "Defensible board narrative on exposure",
        ],
      },
      related: [
        { href: "/services/vulnerability-assessment", title: "Vulnerability Assessment", body: "Project-mode equivalent." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "When you need exploit narratives, not just findings." },
        { href: "/services/mdr", title: "Managed Detection & Response", body: "VM + MDR is a common pairing." },
      ],
    },
  },

  "cloud-security": {
    meta: { title: "Improve Cloud Security", description: "AWS, Azure, GCP — identity, posture, runtime, and secrets, operationalized." },
    config: {
      category: "Solutions · Ongoing help",
      title: <>Cloud security, <span className="brand-gradient-text">past the dashboard</span>.</>,
      sub: "Most cloud-security programs end at the CSPM dashboard. We integrate identity, posture, runtime, and secrets management — and run them as a program with quarterly review.",
      primaryCta: { href: "/contact?topic=managed", label: "Scope cloud-security program" },
      secondaryCta: { href: "/solutions/cloud-security-review", label: "One-time review instead" },
      factStrip: [
        { label: "Clouds", value: "AWS · Azure · GCP" },
        { label: "Engagement", value: "Project + ongoing" },
        { label: "Components", value: "Identity · Posture · Runtime" },
        { label: "Cadence", value: "Quarterly" },
      ],
      included: {
        title: "What's in scope",
        items: [
          { title: "Identity & access", body: "Cloud IAM, federation, role assumption, secrets management." },
          { title: "Posture (CSPM)", body: "Continuous posture against CIS, Well-Architected, and your internal baselines." },
          { title: "Runtime (CWPP)", body: "Workload protection — drift detection, anomaly detection, runtime EDR." },
          { title: "Public exposure", body: "What's reachable from the internet — storage, services, secrets, metadata." },
          { title: "Cloud-native logging", body: "CloudTrail, Activity, Audit — ingested into your SIEM with detections." },
          { title: "Quarterly review", body: "Posture trended, gaps closed, roadmap reprioritized." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "Weeks 1–4", title: "Assessment + roadmap", body: "Current posture, top gaps, prioritized remediation." },
          { eyebrow: "Months 1–6", title: "Remediation", body: "Critical gaps closed, baselines deployed." },
          { eyebrow: "Ongoing", title: "Operate", body: "Continuous monitoring + quarterly review." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Cloud identity hardened across providers",
          "Posture baseline deployed and monitored",
          "Runtime protection on production workloads",
          "Public-exposure surface minimized",
          "Cloud telemetry integrated with MDR",
        ],
      },
      related: [
        { href: "/solutions/cloud-security-review", title: "Cloud Security Review", body: "Project-mode equivalent." },
        { href: "/services/mdr", title: "Managed Detection & Response", body: "Cloud monitoring is core to MDR." },
        { href: "/solutions/zero-trust", title: "Implement Zero Trust", body: "Cloud-native zero trust is the architectural target." },
      ],
    },
  },

  "security-automation": {
    meta: { title: "Automate Security Workflows", description: "SOAR-style automation built into your stack — fewer alerts, faster decisions, repeatable response." },
    config: {
      category: "Solutions · Ongoing help",
      title: <>Automate the work that <span className="brand-gradient-text">should never need a human</span>.</>,
      sub: "Most security teams do the same tasks every week. We build automation that handles the routine — alert enrichment, ticket creation, containment workflows — so analysts can focus on what actually requires judgment.",
      primaryCta: { href: "/contact?topic=managed", label: "Scope automation engagement" },
      factStrip: [
        { label: "Engagement", value: "Project or ongoing" },
        { label: "Platforms", value: "SOAR · custom · workflow" },
        { label: "Output", value: "Working playbooks" },
        { label: "Owner", value: "You" },
      ],
      included: {
        title: "What gets automated",
        items: [
          { title: "Alert enrichment", body: "Threat intel, identity context, asset context — appended before a human ever sees the alert." },
          { title: "Ticket creation + routing", body: "Auto-tickets with the right owner, severity, and context. Stale-ticket detection." },
          { title: "Containment playbooks", body: "Isolate host, disable account, revoke token — orchestrated with auditing." },
          { title: "User-reported phishing", body: "Auto-analyze, sandbox, IOC extraction, mass-mailbox cleanup." },
          { title: "Lifecycle automation", body: "Joiner / mover / leaver workflows across identity providers." },
          { title: "Detection-as-code CI/CD", body: "Detection rules in source control, tested, deployed via pipeline." },
        ],
      },
      process: {
        title: "From scoping to operating playbooks",
        steps: [
          { eyebrow: "Weeks 1–2", title: "Workflow inventory", body: "What's repetitive, what's wasteful, what's slow." },
          { eyebrow: "Weeks 2–8", title: "Playbook build", body: "Prioritized playbooks built and tested." },
          { eyebrow: "Ongoing", title: "Iterate", body: "Quarterly review — new playbooks added, existing ones tuned." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Working playbooks committed to your repo",
          "Analyst time reclaimed for judgment work",
          "Faster mean-time-to-respond",
          "Audit-evidence of repeatable response",
          "Detection-as-code CI/CD pipeline",
        ],
      },
      related: [
        { href: "/services/mdr", title: "Managed Detection & Response", body: "Most automation is built into MDR engagements." },
        { href: "/services/managed-siem", title: "Managed SIEM", body: "SIEM-tier automation lives here." },
        { href: "/solutions/24-7-monitoring", title: "24/7 Security Monitoring", body: "Operating layer the automation supports." },
      ],
    },
  },

  // ─── I need technical security ───────────────────────────────────────────

  "cloud-security-review": {
    meta: { title: "Review Cloud Infrastructure", description: "A point-in-time review of AWS, Azure, or GCP — identity, network, secrets, exposure — with prioritized remediation." },
    config: {
      category: "Solutions · Technical",
      title: <>Find out what's <span className="brand-gradient-text">actually exposed in your cloud</span>.</>,
      sub: "A point-in-time deep review of your cloud environment. Identity, network, secrets, public exposure, runtime — with risk-ranked remediation guidance.",
      primaryCta: { href: "/contact?topic=testing", label: "Scope a review" },
      secondaryCta: { href: "/solutions/cloud-security", label: "Ongoing program instead" },
      factStrip: [
        { label: "Engagement", value: "Project" },
        { label: "Duration", value: "2–3 weeks" },
        { label: "Clouds", value: "AWS · Azure · GCP" },
        { label: "Output", value: "Risk-ranked findings" },
      ],
      included: {
        title: "What we review",
        items: [
          { title: "Identity & access", body: "Role assumption paths, IAM policy hygiene, federation, secrets handling." },
          { title: "Network exposure", body: "What's reachable from the internet. What shouldn't be." },
          { title: "Storage exposure", body: "S3, blobs, GCS — public-by-accident, ACL drift, share-with-anyone." },
          { title: "Workload security", body: "Compute, container, serverless — privileged execution, drift, vulnerable images." },
          { title: "Secrets management", body: "Static credentials, hardcoded keys, rotation hygiene." },
          { title: "Logging + audit", body: "What's logged, what's missing, what's not being acted on." },
        ],
      },
      process: {
        title: "From kickoff to report",
        steps: [
          { eyebrow: "Week 0", title: "Scoping + access", body: "Read-only access provisioned; scope agreed." },
          { eyebrow: "Week 1", title: "Automated review", body: "CSPM tooling + custom checks across the environment." },
          { eyebrow: "Week 2", title: "Manual analysis", body: "Senior engineer reviews findings, identifies chains, prioritizes." },
          { eyebrow: "Week 3", title: "Report + readout", body: "Risk-ranked findings with remediation guidance and 90-minute debrief." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Risk-ranked findings across identity, network, storage, workload",
          "Engineering-ready remediation guidance",
          "Exposure-minimization roadmap",
          "Audit-evidence for SOC 2, ISO 27001",
        ],
      },
      related: [
        { href: "/solutions/cloud-security", title: "Cloud Security Program", body: "Ongoing version of this engagement." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "When you need exploit narratives, not just configuration findings." },
        { href: "/services/mdr", title: "Managed Detection & Response", body: "Operating layer once posture is hardened." },
      ],
    },
  },

  "ai-llm-security": {
    meta: { title: "Secure AI / LLM Systems", description: "Training-data governance, prompt-injection defense, model exfiltration prevention, and agent-action controls." },
    config: {
      category: "Solutions · Technical",
      title: <>Secure your AI <span className="brand-gradient-text">before customers ask</span>.</>,
      sub: "AI-native and AI-enabled apps face a threat model that didn't exist five years ago. We help you design and operate the controls customers, investors, and regulators are starting to require.",
      primaryCta: { href: "/contact?topic=other", label: "Scope an AI security engagement" },
      factStrip: [
        { label: "Engagement", value: "Project + ongoing" },
        { label: "Scope", value: "Models · Agents · APIs" },
        { label: "Frameworks", value: "OWASP LLM Top 10 · NIST AI RMF" },
        { label: "Output", value: "Threat model + controls" },
      ],
      included: {
        title: "What's in scope",
        items: [
          { title: "AI-specific threat model", body: "Specific to your architecture, data flows, and agent capabilities. Not a generic checklist." },
          { title: "Training-data governance", body: "What's used, what's licensed, what's PII, what's logged." },
          { title: "Prompt-injection mitigations", body: "Layered defenses — pre-processing, isolation, output filtering, agent guardrails." },
          { title: "Model exfiltration / inversion controls", body: "Rate limiting, response scrubbing, abuse detection." },
          { title: "Agent-action controls", body: "Tool-use authorization, action audit logs, human-in-the-loop for material actions." },
          { title: "AI customer-trust content", body: "What customers, regulators, and security questionnaires actually ask about." },
        ],
      },
      process: {
        title: "From threat model to operating controls",
        steps: [
          { eyebrow: "Weeks 1–3", title: "Threat model", body: "Architecture review + AI-specific threat modeling." },
          { eyebrow: "Months 1–3", title: "Controls implementation", body: "Layered mitigations + agent guardrails + audit logging." },
          { eyebrow: "Month 4+", title: "Operating + trust", body: "Monitoring + customer-trust content + ongoing tuning." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "AI-specific threat model documented",
          "Training-data governance operating",
          "Prompt-injection mitigations layered",
          "Agent-action controls + audit logging",
          "AI customer-trust narrative + evidence",
          "Investor-ready AI risk story",
        ],
      },
      related: [
        { href: "/industries/ai", title: "AI Companies", body: "Industry-specific framing." },
        { href: "/services/api-security-testing", title: "API Security Testing", body: "AI APIs need targeted testing." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Including AI-specific pen tests when scoped." },
      ],
    },
  },

  "zero-trust": {
    meta: { title: "Implement Zero Trust", description: "Identity-centered architecture, BeyondCorp-style access, micro-segmentation — designed for incremental rollout." },
    config: {
      category: "Solutions · Technical",
      title: <>Zero trust, <span className="brand-gradient-text">implemented in increments</span>.</>,
      sub: "Zero trust isn't a product. It's an architectural shift toward identity-centered, context-aware access. We design and implement it in phases — each phase delivering value on its own.",
      primaryCta: { href: "/contact?topic=other", label: "Scope zero-trust roadmap" },
      factStrip: [
        { label: "Engagement", value: "Project + phased" },
        { label: "Duration", value: "12–24 months" },
        { label: "Frameworks", value: "NIST 800-207 · BeyondCorp" },
        { label: "Output", value: "Phased architecture" },
      ],
      included: {
        title: "What we deliver",
        items: [
          { title: "Current-state architecture review", body: "Identity, network, device, application — what already exists, what's missing." },
          { title: "Phased target architecture", body: "Identity-centric model with phased rollout — each phase delivers value on its own." },
          { title: "Identity hardening", body: "MFA universal, conditional access, privileged access, federation hygiene." },
          { title: "Application access modernization", body: "BeyondCorp-style access for internal apps; VPN elimination roadmap." },
          { title: "Device posture integration", body: "Device-trust signals integrated into access decisions." },
          { title: "Network micro-segmentation", body: "Workload-level segmentation where it pays off." },
        ],
      },
      process: {
        title: "Phased rollout",
        steps: [
          { eyebrow: "Phase 0", title: "Architecture + roadmap", body: "Current state, target state, prioritized phases." },
          { eyebrow: "Phase 1", title: "Identity foundation", body: "MFA, conditional access, privileged access modernized." },
          { eyebrow: "Phase 2", title: "Application access", body: "BeyondCorp-style access for internal apps." },
          { eyebrow: "Phase 3", title: "Device posture + segmentation", body: "Device-trust signals + workload micro-segmentation." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Identity-centric access architecture",
          "VPN-elimination roadmap",
          "Reduced lateral-movement surface",
          "Device-posture-aware access decisions",
          "Audit-evidence for federal and enterprise procurement",
        ],
      },
      related: [
        { href: "/solutions/cloud-security", title: "Cloud Security", body: "Cloud-native zero trust is the architectural target." },
        { href: "/frameworks#nist-csf", title: "NIST CSF", body: "Reference framework alignment." },
        { href: "/services/vciso", title: "vCISO Services", body: "Zero-trust roadmap commonly owned by vCISO." },
      ],
    },
  },
};
