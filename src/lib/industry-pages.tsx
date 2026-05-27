/**
 * Industry page content. Reuses ServiceDetailPage template — same shape works:
 * included → common threats in this sector
 * process  → how we typically engage
 * outcomes → what clients in this industry walk away with
 * related  → relevant services + compliance + adjacent industries
 */

import type { ServiceDetailConfig } from "@/components/site/service-detail";

type IndustryPage = {
  meta: { title: string; description: string };
  config: ServiceDetailConfig;
};

export const INDUSTRY_PAGES: Record<string, IndustryPage> = {
  // ─── Regulated ────────────────────────────────────────────────────────────

  "financial-services": {
    meta: { title: "Cybersecurity for Financial Services", description: "Cybersecurity for banks, credit unions, RIAs, and broker-dealers. SEC, FFIEC, NY DFS 23 NYCRR 500, and the regulator-driven realities of the sector." },
    config: {
      category: "Industries · Regulated",
      title: <>Cybersecurity for <span className="brand-gradient-text">financial services</span>.</>,
      sub: "Where the regulator is part of the threat model. We work with banks, credit unions, RIAs, broker-dealers, and asset managers — across SEC, FFIEC, OCC, and state-financial-regulator expectations.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to financial-services practice" },
      factStrip: [
        { label: "Sector", value: "Banking · RIA · BD" },
        { label: "Regulators", value: "SEC · FFIEC · OCC · NYDFS" },
        { label: "Common engagement", value: "vCISO + MDR" },
        { label: "Audit posture", value: "Continuous" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Wire-fraud + BEC", body: "Sophisticated business-email-compromise targeting wire instructions, often coordinated with vendor or counterparty pretext." },
          { title: "Account-takeover at customers", body: "Credential-stuffing and SIM-swap attacks targeting retail or corporate customer accounts." },
          { title: "Regulatory exam preparation", body: "Findings-driven remediation under exam pressure — common in NYDFS, FFIEC, and SEC OCIE cycles." },
          { title: "Third-party / fintech-partner risk", body: "Concentration risk in vendor relationships and embedded-finance partnerships." },
          { title: "Insider data exfiltration", body: "Material-non-public information, customer lists, model code — high-value, low-attribution targets." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk assessment", body: "Calibrated against your regulator and exam history." },
          { eyebrow: "Quarter 1", title: "Quick-win remediation", body: "Wire-fraud controls, customer-MFA hardening, vendor due-diligence updates." },
          { eyebrow: "Quarter 2+", title: "MDR + vCISO retainer", body: "Continuous monitoring + senior governance for exam readiness." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Wire-fraud + BEC controls hardened",
          "Customer-MFA program operational",
          "Regulator-exam posture documented",
          "Third-party concentration risk surfaced and mitigated",
          "Audit-evidence for FFIEC, NYDFS, SEC OCIE",
          "Defensible board-level cyber narrative",
        ],
      },
      related: [
        { href: "/services/vciso", title: "vCISO Services", body: "Senior governance for exam preparation." },
        { href: "/services/mdr", title: "Managed Detection & Response", body: "Continuous monitoring for fraud + ATO patterns." },
        { href: "/industries/fintech", title: "Fintech", body: "Adjacent — fintechs partnering with banks." },
      ],
    },
  },

  healthcare: {
    meta: { title: "Cybersecurity for Healthcare", description: "Cybersecurity for providers, payers, and digital health. HIPAA Security Rule, HITRUST, and OCR audit preparation." },
    config: {
      category: "Industries · Regulated",
      title: <>Cybersecurity for <span className="brand-gradient-text">healthcare</span>.</>,
      sub: "Providers, payers, and digital-health companies. HIPAA Security Rule is the floor; OCR enforcement and ransomware are the day-to-day reality.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to healthcare practice" },
      factStrip: [
        { label: "Sector", value: "Provider · Payer · DigitalHealth" },
        { label: "Frameworks", value: "HIPAA · HITRUST · HITECH" },
        { label: "Top threat", value: "Ransomware" },
        { label: "Engagement", value: "SRA → MDR + vCISO" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Ransomware against clinical operations", body: "Patient-impact threats with hours-not-days response windows. Different stakes than typical ransomware." },
          { title: "PHI exfiltration + extortion", body: "Adversaries increasingly exfiltrate first, encrypt second — and threaten OCR-reportable disclosure." },
          { title: "Business-associate compromise", body: "Compromise in vendor / BA networks propagating to your environment via integrations." },
          { title: "OCR-audit posture", body: "Risk-assessment-required findings cited routinely by OCR; documentation matters." },
          { title: "Medical-device + IoMT risk", body: "Connected medical devices with limited patching, often on flat clinical networks." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "HIPAA Security Risk Assessment", body: "Required by the Security Rule; OCR-defensible." },
          { eyebrow: "Quarter 1", title: "Ransomware-readiness sprint", body: "Backup integrity, segmentation, EDR coverage, IR retainer." },
          { eyebrow: "Quarter 2+", title: "MDR + vCISO + BA-VRM", body: "Continuous monitoring, governance, vendor / BA risk program." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "OCR-defensible Security Risk Assessment",
          "Ransomware-readiness with tested restoration",
          "BA-VRM program operating",
          "Medical-device segmentation strategy",
          "60-day breach-notification workflow tested",
          "Continued eligibility for payer contracts",
        ],
      },
      related: [
        { href: "/compliance/hipaa", title: "HIPAA SRA", body: "The required SRA — the foundation engagement." },
        { href: "/services/ransomware-response", title: "Ransomware Response", body: "Sector-leading threat." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Clinical-impact incidents need faster mobilization." },
      ],
    },
  },

  legal: {
    meta: { title: "Cybersecurity for Law Firms", description: "Cybersecurity for AmLaw and boutique firms — client-data segmentation, e-discovery integrity, and ABA Formal Opinion 477 compliance." },
    config: {
      category: "Industries · Regulated",
      title: <>Cybersecurity for <span className="brand-gradient-text">law firms</span>.</>,
      sub: "AmLaw and boutique firms hold their clients' worst secrets. We work with general counsel and IT to harden the firm — without breaking the way lawyers actually work.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to legal practice" },
      factStrip: [
        { label: "Sector", value: "AmLaw · Boutique" },
        { label: "Framework", value: "ABA Op. 477 · client expectations" },
        { label: "Top threat", value: "Targeted intrusion + ransomware" },
        { label: "Engagement", value: "vCISO + MDR + ATO defense" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Targeted nation-state intrusion", body: "Clients on the wrong end of geopolitics make firms targets. APT-style intrusions are routine." },
          { title: "Client-data isolation failures", body: "Matter teams sharing tooling, network, and credentials — when ethics walls require segmentation." },
          { title: "Ransomware against matter-management systems", body: "Operational paralysis hits docketing, e-billing, and document management hardest." },
          { title: "Client security questionnaires", body: "Corporate clients running VRMs on outside counsel — increasingly common." },
          { title: "ABA Opinion 477 expectations", body: "Reasonable security measures expected; documentation needs to defend the firm if challenged." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk assessment + ethics-wall review", body: "Including segmentation review against current matters." },
          { eyebrow: "Quarter 1", title: "Hardening sprint", body: "Identity, EDR, segmentation, backup integrity." },
          { eyebrow: "Quarter 2+", title: "MDR + vCISO + client-VRM response", body: "Continuous monitoring, governance, client questionnaire workflow." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Documented ethics-wall enforcement",
          "Hardened identity and endpoint posture",
          "Ransomware-resilient matter-management infrastructure",
          "Client-questionnaire workflow with answer library",
          "Defensible ABA Opinion 477 posture",
        ],
      },
      related: [
        { href: "/services/vciso", title: "vCISO Services", body: "Most firms run governance through a vCISO." },
        { href: "/services/ransomware-response", title: "Ransomware Response", body: "Critical for matter-management continuity." },
        { href: "/compliance/vendor-security-reviews", title: "Vendor Security Reviews", body: "Handle inbound client questionnaires efficiently." },
      ],
    },
  },

  "government-contractors": {
    meta: { title: "Cybersecurity for Government Contractors", description: "CMMC, NIST 800-171, ITAR-aware segmentation, and DFARS-compliant operations for DoD and federal contractors." },
    config: {
      category: "Industries · Regulated",
      title: <>Cybersecurity for <span className="brand-gradient-text">government contractors</span>.</>,
      sub: "Defense, civilian, and aerospace primes and subs. CMMC, NIST 800-171, and ITAR-aware segmentation are non-optional — but they're also operating constraints, not just compliance tasks.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to defense practice" },
      factStrip: [
        { label: "Sector", value: "Defense · Federal · Aero" },
        { label: "Frameworks", value: "CMMC · 800-171 · DFARS · ITAR" },
        { label: "Engagement", value: "CMMC prep + ongoing" },
        { label: "Citizenship", value: "U.S. analysts" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Nation-state IP theft", body: "DIB primes and subs are persistent APT targets. Living-off-the-land intrusion is the norm." },
          { title: "Subcontractor compromise propagating up", body: "Tier-2 and tier-3 subs as soft targets for accessing prime networks." },
          { title: "ITAR / export-controlled data exposure", body: "Misclassified data flowing to non-eligible personnel via collaboration tools." },
          { title: "CMMC assessment readiness", body: "C3PAO assessments rejecting evidence that doesn't meet evidentiary standard." },
          { title: "Continuous-monitoring obligations", body: "ConMon expectations exceeding what most DIB orgs have stood up." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Scope + gap assessment", body: "CUI flow mapping, 800-171 gap, ITAR segmentation review." },
          { eyebrow: "Quarter 1–3", title: "Remediation", body: "Controls + segmentation + documentation." },
          { eyebrow: "Quarter 4+", title: "Assessment + ongoing", body: "C3PAO assessment + ConMon + MDR." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "C3PAO-ready CMMC Level 2 posture",
          "ITAR-aware data segmentation",
          "Sub-contractor flow-down language operating",
          "Continuous monitoring program",
          "U.S.-citizen SOC analysts (where required)",
          "Continued contract eligibility",
        ],
      },
      related: [
        { href: "/compliance/cmmc", title: "CMMC Compliance", body: "The certification regime." },
        { href: "/compliance/nist-800-171", title: "NIST 800-171", body: "The underlying control set." },
        { href: "/compliance/dfars", title: "DFARS Cybersecurity", body: "Contract-clause requirements." },
      ],
    },
  },

  insurance: {
    meta: { title: "Cybersecurity for Insurance", description: "Cybersecurity for carriers and MGAs — underwriting-data protection, claims-fraud detection, and model-IP integrity." },
    config: {
      category: "Industries · Regulated",
      title: <>Cybersecurity for <span className="brand-gradient-text">insurance</span>.</>,
      sub: "Carriers, reinsurers, MGAs, and insurtech. Concentration of personally-identifiable data, underwriting models, and high-value fraud surfaces makes the sector a persistent target.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to insurance practice" },
      factStrip: [
        { label: "Sector", value: "Carriers · MGAs · Insurtech" },
        { label: "Regulators", value: "State · NYDFS" },
        { label: "Top threat", value: "PII exfiltration + claims fraud" },
        { label: "Engagement", value: "vCISO + MDR" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Mass PII exfiltration", body: "Insurance databases concentrate decades of PII, claims history, and medical data." },
          { title: "Claims fraud at scale", body: "Account takeover and synthetic-identity fraud against claims systems." },
          { title: "Underwriting-model IP theft", body: "Proprietary risk models exfiltrated via insider or vendor compromise." },
          { title: "NYDFS 23 NYCRR 500", body: "Cyber regulation requirements with annual certification obligations." },
          { title: "Insurtech-partner risk", body: "Embedded distribution partners with varying security maturity." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk assessment + NYDFS gap", body: "If NYDFS-regulated, this drives the first 90 days." },
          { eyebrow: "Quarter 1", title: "Identity + data-protection hardening", body: "MFA, privileged access, DLP, data classification." },
          { eyebrow: "Quarter 2+", title: "MDR + vCISO + partner-VRM", body: "Ongoing monitoring, governance, partner risk program." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "NYDFS 23 NYCRR 500 certification-ready posture",
          "PII data-classification program",
          "Underwriting-model-protection controls",
          "Insurtech-partner risk program",
          "Claims-fraud detection integrated with MDR",
        ],
      },
      related: [
        { href: "/services/vciso", title: "vCISO Services", body: "NYDFS certifications need governance ownership." },
        { href: "/industries/financial-services", title: "Financial Services", body: "Adjacent — similar regulator + threat landscape." },
        { href: "/services/cyber-insurance-readiness", title: "Cyber Insurance Readiness", body: "Both buyer-side and seller-side." },
      ],
    },
  },

  // ─── Technology ───────────────────────────────────────────────────────────

  saas: {
    meta: { title: "Cybersecurity for SaaS Companies", description: "SOC 2, secure SDLC, customer-trust evidence, and multi-tenant security for B2B and enterprise SaaS." },
    config: {
      category: "Industries · Technology",
      title: <>Cybersecurity for <span className="brand-gradient-text">SaaS companies</span>.</>,
      sub: "Multi-tenant SaaS where security work has to keep up with shipping velocity. SOC 2 is the floor; enterprise procurement is the next gate; AI features keep the threat model evolving.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to SaaS practice" },
      factStrip: [
        { label: "Sector", value: "B2B · Enterprise SaaS" },
        { label: "First milestone", value: "SOC 2 Type I" },
        { label: "Velocity", value: "Ship-friendly" },
        { label: "Common engagement", value: "vCISO + program" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Multi-tenant boundary failures", body: "IDOR, mass-assignment, JWT scoping — the classic vectors for cross-tenant data exposure." },
          { title: "OAuth / API token theft", body: "Tokens granted to integrations, then misused or leaked." },
          { title: "Build-pipeline + supply-chain", body: "Compromised dependencies, build-server access, package-publishing credential theft." },
          { title: "Enterprise procurement gate", body: "Custom questionnaires, ISO 27001 demands, and pen-test letter requirements." },
          { title: "AI-feature attack surface", body: "Prompt injection, training-data exposure, agent-action abuse." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk assessment + SOC 2 scoping", body: "Most engagements start here." },
          { eyebrow: "Quarter 1", title: "SOC 2 Type I prep", body: "60–90 days to audit-ready posture." },
          { eyebrow: "Quarter 2+", title: "Program ownership + MDR", body: "vCISO + managed detection for ongoing posture." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "SOC 2 Type I / Type II on a defensible cadence",
          "Multi-tenant boundary tested + documented",
          "OAuth / API token hardening",
          "Build-pipeline security posture",
          "Enterprise-procurement-ready trust center",
          "AI-feature threat model documented",
        ],
      },
      related: [
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Most SaaS engagements start with SOC 2." },
        { href: "/services/api-security-testing", title: "API Security Testing", body: "Multi-tenant SaaS = API-first attack surface." },
        { href: "/solutions/ai-llm-security", title: "Secure AI / LLM Systems", body: "If you're shipping AI features." },
      ],
    },
  },

  "software-development": {
    meta: { title: "Cybersecurity for Software Development Firms", description: "Client-data isolation, SBOM hygiene, and supply-chain integrity for agencies, product studios, and contract development firms." },
    config: {
      category: "Industries · Technology",
      title: <>Cybersecurity for <span className="brand-gradient-text">software development firms</span>.</>,
      sub: "Agencies, product studios, and contract dev shops carry client risk on every engagement. Strong tenant isolation, SBOM hygiene, and supply-chain integrity are differentiators — and increasingly contract requirements.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to dev-firm practice" },
      factStrip: [
        { label: "Sector", value: "Agencies · Studios · Dev shops" },
        { label: "Top risk", value: "Client-data spillover" },
        { label: "Common ask", value: "Client security questionnaires" },
        { label: "Engagement", value: "Program + SOC 2" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Client-data spillover between teams", body: "Shared tooling, shared identity, shared infrastructure across client engagements." },
          { title: "Sensitive credentials in source", body: "Long-lived API keys, customer credentials, .env files in repos — your repos and theirs." },
          { title: "Supply-chain / dependency risk", body: "Compromised packages reaching client production via your builds." },
          { title: "Contractor / 1099 lifecycle gaps", body: "Access provisioning and deprovisioning for project-based contractors." },
          { title: "Client security questionnaires", body: "Increasingly common in enterprise-client procurement." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk + tenant-isolation review", body: "Where client data lives, who touches what." },
          { eyebrow: "Quarter 1", title: "Hardening sprint", body: "Secrets management, dependency scanning, contractor lifecycle." },
          { eyebrow: "Quarter 2+", title: "SOC 2 + ongoing", body: "SOC 2 for enterprise-client procurement + MDR." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Tenant-isolated client environments",
          "Secrets management operating",
          "Dependency / SBOM hygiene",
          "Contractor lifecycle automation",
          "SOC 2 Type I for enterprise-client procurement",
          "Client-questionnaire answer library",
        ],
      },
      related: [
        { href: "/industries/saas", title: "SaaS Companies", body: "Adjacent — many dev firms ship their own SaaS." },
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Common procurement requirement." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Often required by enterprise clients." },
      ],
    },
  },

  ai: {
    meta: { title: "Cybersecurity for AI Companies", description: "Training-data governance, prompt-injection defense, model exfiltration prevention, and agent-action controls for AI-native companies." },
    config: {
      category: "Industries · Technology",
      title: <>Cybersecurity for <span className="brand-gradient-text">AI companies</span>.</>,
      sub: "Model providers, agentic-AI startups, and AI-native apps face a threat model that didn't exist five years ago. We help with the controls, governance, and audit posture investors and enterprise customers expect.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to AI practice" },
      factStrip: [
        { label: "Sector", value: "AI-native · Foundation · Agentic" },
        { label: "Top risk", value: "Training data + agent action" },
        { label: "Customer ask", value: "AI security questionnaires" },
        { label: "Engagement", value: "Threat model + controls" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Training-data exfiltration", body: "PII or proprietary data leaking through training, fine-tuning, or RAG indices." },
          { title: "Prompt-injection chains", body: "Indirect injection via documents, websites, or tools enabling agent abuse." },
          { title: "Model exfiltration / inversion", body: "Adversaries extracting model weights or reconstructing training data via API." },
          { title: "Agent-action abuse", body: "Agents granted tool access being manipulated into unauthorized actions." },
          { title: "Vendor / model-provider risk", body: "Concentration risk in foundation-model providers and inference vendors." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "AI threat model", body: "Specific to your architecture, data flows, and agent capabilities." },
          { eyebrow: "Quarter 1", title: "Controls implementation", body: "Data governance, prompt-injection mitigations, agent guardrails." },
          { eyebrow: "Quarter 2+", title: "Audit posture + ongoing", body: "SOC 2 + AI-specific controls + MDR for agent telemetry." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "AI-specific threat model documented",
          "Training-data governance operating",
          "Prompt-injection mitigations layered",
          "Agent-action controls + audit logging",
          "Customer-facing AI security trust content",
          "Investor-ready AI risk narrative",
        ],
      },
      related: [
        { href: "/solutions/ai-llm-security", title: "Secure AI / LLM Systems", body: "Solution-oriented framing." },
        { href: "/services/api-security-testing", title: "API Security Testing", body: "Agent APIs need targeted testing." },
        { href: "/industries/saas", title: "SaaS Companies", body: "If you're a SaaS shipping AI features." },
      ],
    },
  },

  fintech: {
    meta: { title: "Cybersecurity for Fintech", description: "Money-movement controls, BSA/AML adjacency, partner-bank reviews, and embedded-finance security." },
    config: {
      category: "Industries · Technology",
      title: <>Cybersecurity for <span className="brand-gradient-text">fintech</span>.</>,
      sub: "Embedded finance, neobanks, payments — sectors where security failure equals regulatory failure equals partner-bank termination. Stakes are higher than typical tech.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to fintech practice" },
      factStrip: [
        { label: "Sector", value: "Embedded · Neobank · Payments" },
        { label: "Adjacencies", value: "BSA · AML · KYC" },
        { label: "Partner-bank ask", value: "Continuous attestation" },
        { label: "Engagement", value: "SOC 2 + program + MDR" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Account-takeover at retail customers", body: "Credential stuffing, SIM swap, social engineering at scale." },
          { title: "Money-mule + synthetic-identity fraud", body: "Fraud rings using your platform as a money-movement layer." },
          { title: "Partner-bank attestation gaps", body: "Sponsor banks running quarterly attestations on your security posture." },
          { title: "BSA / AML adjacency", body: "Security incidents triggering BSA / SAR obligations." },
          { title: "API exposure", body: "Public APIs for embedded partners — high-value, high-volume attack surface." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk + partner-bank gap", body: "What your sponsor bank actually expects, calibrated to current attestations." },
          { eyebrow: "Quarter 1", title: "SOC 2 + fraud controls", body: "SOC 2 prep + fraud-detection integration with MDR." },
          { eyebrow: "Quarter 2+", title: "Ongoing", body: "vCISO + MDR + partner-bank quarterly attestations." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "SOC 2 + partner-bank-aligned controls",
          "Fraud-detection integrated with security operations",
          "Quarterly partner-bank attestations passing",
          "BSA / AML-adjacent incident workflows",
          "API hardening with rate-limiting + abuse detection",
        ],
      },
      related: [
        { href: "/industries/financial-services", title: "Financial Services", body: "Adjacent — partner banks and regulators." },
        { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "Common partner-bank requirement." },
        { href: "/services/api-security-testing", title: "API Security Testing", body: "Embedded APIs are core attack surface." },
      ],
    },
  },

  ecommerce: {
    meta: { title: "Cybersecurity for E-commerce", description: "PCI DSS, account-takeover, scraping / bot mitigation, and holiday-peak readiness for DTC and marketplace operators." },
    config: {
      category: "Industries · Technology",
      title: <>Cybersecurity for <span className="brand-gradient-text">e-commerce</span>.</>,
      sub: "DTC brands and marketplaces. Where uptime equals revenue, and Black Friday equals 'don't be the one in the headline'.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to e-commerce practice" },
      factStrip: [
        { label: "Sector", value: "DTC · Marketplace" },
        { label: "Top requirements", value: "PCI DSS + uptime" },
        { label: "Top threat", value: "ATO + scraping + DDoS" },
        { label: "Cadence", value: "Holiday-peak ready" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Account-takeover at scale", body: "Credential stuffing against the customer base, often via leaked-credential lists from other breaches." },
          { title: "Scraping + competitive intelligence bots", body: "Pricing scraping, inventory scraping, content scraping — at volumes that hurt." },
          { title: "PCI DSS scope creep", body: "Card-data handling expanding into systems no one realizes are in scope." },
          { title: "Magecart / digital skimming", body: "Third-party tag and dependency compromise injecting card-skimmers." },
          { title: "Holiday-peak DDoS", body: "Volumetric attacks during peak revenue windows." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "PCI scope + risk", body: "Aggressive scope reduction + ATO baseline." },
          { eyebrow: "Quarter 1", title: "Hardening sprint", body: "ATO controls, bot mitigation, third-party tag review." },
          { eyebrow: "Pre-peak", title: "Peak-readiness", body: "DDoS, scaling, IR tabletop — all calibrated to your peak window." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Minimized PCI DSS scope",
          "Account-takeover defenses operating",
          "Bot + scraping mitigation calibrated",
          "Third-party tag governance",
          "Peak-readiness tested and documented",
        ],
      },
      related: [
        { href: "/compliance/pci-dss", title: "PCI DSS Compliance", body: "The required framework." },
        { href: "/services/penetration-testing", title: "Penetration Testing", body: "Annual + pre-peak testing." },
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "Pre-positioned for peak season." },
      ],
    },
  },

  // ─── Industrial ───────────────────────────────────────────────────────────

  manufacturing: {
    meta: { title: "Cybersecurity for Manufacturing", description: "OT/IT convergence, plant-floor segmentation, and ransomware containment for discrete and process manufacturers." },
    config: {
      category: "Industries · Industrial",
      title: <>Cybersecurity for <span className="brand-gradient-text">manufacturing</span>.</>,
      sub: "Where downtime is measured in lost production, not just lost revenue. We work with discrete and process manufacturers on OT/IT convergence, plant-floor segmentation, and incident containment.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to manufacturing practice" },
      factStrip: [
        { label: "Sector", value: "Discrete · Process" },
        { label: "Framework", value: "IEC 62443 · NIST CSF" },
        { label: "Top threat", value: "Ransomware against OT" },
        { label: "Engagement", value: "Assess → segment → MDR" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Ransomware reaching OT", body: "IT-side compromise propagating to plant floor via flat networks." },
          { title: "Legacy OT exposure", body: "Decade-old PLCs, HMIs, and SCADA systems on the same network as modern IT." },
          { title: "Vendor-remote-access risk", body: "OEM vendors with persistent remote access to plant equipment." },
          { title: "Insider risk", body: "Disgruntled employees or contractors with privileged plant access." },
          { title: "Supply-chain disruption", body: "Compromise at suppliers triggering production-impact cascades." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "OT / IT assessment", body: "Passive monitoring, segmentation review, asset discovery." },
          { eyebrow: "Quarter 1", title: "Segmentation + vendor-access", body: "DMZ design, vendor remote access redesign, OT-IT boundary." },
          { eyebrow: "Quarter 2+", title: "MDR with OT telemetry", body: "IT-side MDR + OT-aware monitoring + IR retainer." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "OT asset inventory + segmentation",
          "Vendor remote access redesigned",
          "Ransomware-containment architecture",
          "MDR with OT-aware monitoring",
          "IR-ready for production-impact incidents",
        ],
      },
      related: [
        { href: "/industries/ot", title: "Operational Technology", body: "Deeper OT/ICS framing." },
        { href: "/services/ransomware-response", title: "Ransomware Response", body: "Critical for production-environment incidents." },
        { href: "/frameworks#iec-62443", title: "IEC 62443", body: "Reference framework." },
      ],
    },
  },

  logistics: {
    meta: { title: "Cybersecurity for Logistics & Transportation", description: "TMS integrity, EDI fraud prevention, and fleet-telematics security for carriers, 3PLs, and freight tech." },
    config: {
      category: "Industries · Industrial",
      title: <>Cybersecurity for <span className="brand-gradient-text">logistics & transportation</span>.</>,
      sub: "Carriers, 3PLs, freight brokers, and freight-tech companies. Where downtime breaks supply chains and double-brokering fraud is a daily reality.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to logistics practice" },
      factStrip: [
        { label: "Sector", value: "Carriers · 3PL · Freight tech" },
        { label: "Top threat", value: "EDI fraud + double-brokering" },
        { label: "Critical asset", value: "TMS + dispatch" },
        { label: "Engagement", value: "Risk + MDR + IR" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Double-brokering + identity-theft fraud", body: "Adversaries impersonating carriers, brokers, or shippers to redirect loads." },
          { title: "TMS compromise", body: "Operational paralysis when transportation-management systems go down." },
          { title: "EDI fraud", body: "Fake invoices, redirected payments, fraudulent BOL acknowledgments." },
          { title: "Fleet-telematics exposure", body: "Connected fleet data leaking competitive or operational intel." },
          { title: "Driver-app + ELD security", body: "Mobile-app attack surface for fleet apps and electronic logging devices." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Risk + TMS-resilience review", body: "Identity, TMS, EDI, and fleet-telematics surfaces." },
          { eyebrow: "Quarter 1", title: "Hardening", body: "MFA, payment-redirect controls, vendor verification workflows." },
          { eyebrow: "Quarter 2+", title: "MDR + IR", body: "Ongoing monitoring with TMS-aware detection + retainer." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Carrier-identity verification workflow",
          "Payment-redirect controls operating",
          "TMS-recovery plan tested",
          "Fleet-telematics security baseline",
          "EDI fraud detection operationalized",
        ],
      },
      related: [
        { href: "/services/incident-response-retainer", title: "IR Retainer", body: "TMS outages need fast response." },
        { href: "/industries/manufacturing", title: "Manufacturing", body: "Adjacent — many manufacturers operate logistics fleets." },
      ],
    },
  },

  construction: {
    meta: { title: "Cybersecurity for Construction", description: "Wire-fraud prevention, project-data leakage, and on-site OT exposure for general contractors and developers." },
    config: {
      category: "Industries · Industrial",
      title: <>Cybersecurity for <span className="brand-gradient-text">construction</span>.</>,
      sub: "GCs, developers, and large subs. Wire fraud is the daily threat; project-data exposure and on-site OT round out the picture.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to construction practice" },
      factStrip: [
        { label: "Sector", value: "GCs · Developers · Subs" },
        { label: "Top threat", value: "Wire-transfer fraud" },
        { label: "Critical surface", value: "Project mgmt + AP" },
        { label: "Engagement", value: "Risk + AP hardening" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Wire-transfer / BEC fraud", body: "Targeted at project payment cycles. Often six-figure single incidents." },
          { title: "Project-data leakage", body: "Plans, bids, and proprietary methods exfiltrated to competitors." },
          { title: "On-site OT exposure", body: "Construction equipment with GPS, telematics, and remote control increasingly connected." },
          { title: "Sub-contractor identity drift", body: "Project-based contractor access often outliving the project." },
          { title: "Project-management-platform compromise", body: "Procore, BIM 360, and similar platforms as concentrated targets." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "AP + project-data assessment", body: "Where money moves and where data sits." },
          { eyebrow: "Quarter 1", title: "Wire-fraud + identity hardening", body: "Out-of-band verification, MFA, contractor-lifecycle." },
          { eyebrow: "Quarter 2+", title: "Ongoing", body: "MDR + vCISO calibrated for the sector." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "Wire-fraud controls operating",
          "Project-data governance",
          "Sub-contractor lifecycle automated",
          "On-site OT inventory + security baseline",
          "Project-management-platform hardened",
        ],
      },
      related: [
        { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Common starting engagement." },
        { href: "/services/vciso", title: "vCISO Services", body: "Senior governance for GC and developer leadership." },
      ],
    },
  },

  energy: {
    meta: { title: "Cybersecurity for Energy & Utilities", description: "NERC CIP, OT/SCADA security, and third-party operator risk for IOUs, IPPs, and energy operators." },
    config: {
      category: "Industries · Industrial",
      title: <>Cybersecurity for <span className="brand-gradient-text">energy & utilities</span>.</>,
      sub: "IOUs, IPPs, midstream, and renewable operators. NERC CIP defines the floor; nation-state targeting and OT exposure define the daily reality.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to energy practice" },
      factStrip: [
        { label: "Sector", value: "IOU · IPP · Midstream · Renewable" },
        { label: "Frameworks", value: "NERC CIP · IEC 62443" },
        { label: "Top threat", value: "Nation-state OT targeting" },
        { label: "Engagement", value: "Compliance + segmentation + MDR" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Nation-state OT targeting", body: "Persistent, well-funded adversaries with specific operational objectives." },
          { title: "Legacy SCADA exposure", body: "Decade-plus equipment with limited patching paths." },
          { title: "Third-party operator risk", body: "Field-service vendors with remote access to OT environments." },
          { title: "NERC CIP audit posture", body: "Documentation-heavy compliance regime with material penalties." },
          { title: "Distributed-renewable expansion risk", body: "Solar / wind / battery operators with limited security maturity." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "NERC CIP + OT assessment", body: "Compliance gap + segmentation + third-party access review." },
          { eyebrow: "Quarter 1+", title: "Remediation + segmentation", body: "OT-IT boundary, vendor remote access, NERC documentation." },
          { eyebrow: "Ongoing", title: "MDR + IR + audit", body: "Continuous monitoring, IR retainer, annual audit." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "NERC CIP audit-ready posture",
          "OT-IT segmentation hardened",
          "Vendor remote-access redesigned",
          "OT-aware MDR coverage",
          "Documented IR readiness with utility-aware playbooks",
        ],
      },
      related: [
        { href: "/industries/ot", title: "Operational Technology", body: "OT/ICS framing." },
        { href: "/industries/manufacturing", title: "Manufacturing", body: "Adjacent — similar OT challenges." },
        { href: "/frameworks#iec-62443", title: "IEC 62443", body: "Reference framework." },
      ],
    },
  },

  ot: {
    meta: { title: "Cybersecurity for Operational Technology (OT)", description: "ICS / SCADA environments — IEC 62443 alignment, passive monitoring, and segmentation reviews for OT-heavy operators." },
    config: {
      category: "Industries · Industrial",
      title: <>Cybersecurity for <span className="brand-gradient-text">operational technology</span>.</>,
      sub: "ICS, SCADA, DCS, and other OT environments where availability is the first principle and disruption has physical consequences.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to OT practice" },
      factStrip: [
        { label: "Scope", value: "ICS · SCADA · DCS · IoT" },
        { label: "Framework", value: "IEC 62443" },
        { label: "Method", value: "Passive monitoring" },
        { label: "Engagement", value: "Assessment + segmentation" },
      ],
      included: {
        title: "Threats we routinely see in this sector",
        items: [
          { title: "Flat OT networks", body: "Decades-old architecture without segmentation between safety-critical and corporate." },
          { title: "Legacy protocol exposure", body: "Modbus, DNP3, OPC, BACnet — unauthenticated by design, exposed to broader networks." },
          { title: "Vendor-engineering laptops", body: "OEM laptops with privileged access, often without endpoint security." },
          { title: "USB / removable-media attack surface", body: "Air-gapped systems aren't actually air-gapped — they're USB-gapped." },
          { title: "IT/OT convergence pressure", body: "Business demand for OT data driving rushed integrations." },
        ],
      },
      process: {
        title: "How we typically engage",
        steps: [
          { eyebrow: "Start", title: "Passive assessment", body: "Network capture + asset discovery without active scanning — appropriate for fragile OT environments." },
          { eyebrow: "Quarter 1", title: "Segmentation + vendor access", body: "DMZ architecture, vendor remote redesign, USB controls." },
          { eyebrow: "Quarter 2+", title: "OT-aware monitoring + IR", body: "Continuous monitoring with OT-aware detections + OT-aware IR retainer." },
        ],
      },
      outcomes: {
        title: "What clients in this sector walk away with",
        items: [
          "OT asset inventory",
          "IEC 62443-aligned zone + conduit model",
          "Vendor remote-access architecture",
          "OT-aware MDR coverage",
          "IR runbook for production-impact incidents",
        ],
      },
      related: [
        { href: "/industries/manufacturing", title: "Manufacturing", body: "Largest OT operator segment we work with." },
        { href: "/industries/energy", title: "Energy & Utilities", body: "OT-heavy with regulatory overlay." },
        { href: "/frameworks#iec-62443", title: "IEC 62443", body: "Reference framework." },
      ],
    },
  },

  // ─── Investors & Operators ────────────────────────────────────────────────

  "private-equity": {
    meta: { title: "Cybersecurity for Private Equity", description: "Portfolio-wide cyber programs, value-creation playbooks, and exit-prep diligence response for PE firms and their portfolio companies." },
    config: {
      category: "Industries · Investors & Operators",
      title: <>Cybersecurity for <span className="brand-gradient-text">private equity</span>.</>,
      sub: "We work with PE firms across the deal lifecycle — pre-LOI diligence, 100-day plans, portfolio-wide baselines, and exit prep. Designed to scale across the portfolio without burning each portco's security team.",
      primaryCta: { href: "/industries/ma-due-diligence", label: "Buy-side diligence" },
      secondaryCta: { href: "/contact?topic=industry", label: "PE engagement model" },
      factStrip: [
        { label: "Audience", value: "GP · Ops partners" },
        { label: "Lifecycle", value: "Pre-LOI → exit" },
        { label: "Cadence", value: "Portfolio-wide" },
        { label: "Engagement", value: "Standardized" },
      ],
      included: {
        title: "How we work across the lifecycle",
        items: [
          { title: "Pre-LOI cyber diligence", body: "Surface latent breach, IP exfil, and post-close remediation cost before the LOI." },
          { title: "100-day plan", body: "Post-close security plan with prioritized remediation and integration risk reduction." },
          { title: "Portfolio-wide baseline", body: "Standardized security posture across the portfolio with sponsor-friendly reporting." },
          { title: "Sector-specialized engagements", body: "Healthcare, financial, manufacturing — portfolio-companies' sectors call for sector-specific work." },
          { title: "Value-creation playbook", body: "Security as a value-creation lever — better cyber-insurance, faster sales cycles, defensible due-diligence." },
          { title: "Exit-prep diligence response", body: "Sell-side: prepare for buy-side cyber diligence. We've sat on both sides of the table." },
        ],
      },
      process: {
        title: "Sponsor lifecycle",
        steps: [
          { eyebrow: "Pre-LOI", title: "Cyber due diligence", body: "5–10 business days. Surface material findings affecting valuation." },
          { eyebrow: "0–100 days", title: "Plan + execute", body: "Risk-ranked 100-day plan executed by us or coached for portco team." },
          { eyebrow: "Years 1–N", title: "Portfolio operations", body: "Standardized baseline + MDR + sponsor reporting." },
          { eyebrow: "Pre-exit", title: "Exit prep", body: "Diligence-response readiness with documentation buyers expect." },
        ],
      },
      outcomes: {
        title: "What sponsors walk away with",
        items: [
          "Pre-LOI cyber-diligence reports affecting valuation decisions",
          "Standardized portfolio-wide security baseline",
          "Sponsor-friendly reporting cadence",
          "Sector-specialized engagement at portco level",
          "Better cyber-insurance terms across the portfolio",
          "Exit-ready diligence response",
        ],
      },
      related: [
        { href: "/industries/ma-due-diligence", title: "M&A Cyber Diligence", body: "Buy-side and sell-side cyber due diligence." },
        { href: "/industries/portfolio-companies", title: "Portfolio Companies", body: "How we engage at the portco level." },
        { href: "/industries/independent-sponsors", title: "Independent Sponsors", body: "Adjacent — sponsors without traditional fund overhead." },
      ],
    },
  },

  "independent-sponsors": {
    meta: { title: "Cybersecurity for Independent Sponsors", description: "Pre-LOI cyber diligence and post-close 100-day plans for independent sponsors without big-firm overhead." },
    config: {
      category: "Industries · Investors & Operators",
      title: <>Cybersecurity for <span className="brand-gradient-text">independent sponsors</span>.</>,
      sub: "Without traditional fund overhead, independent sponsors need pragmatic, fast cyber diligence and post-close plans — not big-firm consulting bills.",
      primaryCta: { href: "/industries/ma-due-diligence", label: "Buy-side diligence" },
      secondaryCta: { href: "/contact?topic=industry", label: "Engagement model" },
      factStrip: [
        { label: "Pricing", value: "Fixed fee" },
        { label: "Diligence", value: "5–10 days" },
        { label: "100-day plan", value: "Included" },
        { label: "Engagement", value: "Lightweight" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Pre-LOI cyber diligence", body: "Fixed-fee, 5–10 business day engagement. Surface findings that affect valuation or financing." },
          { title: "Post-close 100-day plan", body: "Risk-ranked plan executed by the portco's team with our coaching." },
          { title: "Quarterly check-ins", body: "Lightweight cadence appropriate for sponsor governance overhead." },
          { title: "Pre-exit prep", body: "When you're ready to sell, we get the cyber narrative ready for buy-side diligence." },
        ],
      },
      process: {
        title: "Lifecycle",
        steps: [
          { eyebrow: "Pre-LOI", title: "Diligence", body: "Fixed-fee report in 5–10 days. Sized for the deal." },
          { eyebrow: "Days 0–100", title: "Plan", body: "Coached execution by portco team." },
          { eyebrow: "Quarterly", title: "Check-in", body: "Light-touch governance cadence." },
          { eyebrow: "Pre-exit", title: "Exit prep", body: "Diligence-ready narrative + documentation." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Pre-LOI cyber diligence appropriate for sponsor scale",
          "Executable 100-day plan",
          "Sponsor-appropriate governance cadence",
          "Exit-ready diligence response",
        ],
      },
      related: [
        { href: "/industries/private-equity", title: "Private Equity", body: "Adjacent — fund-backed sponsors." },
        { href: "/industries/ma-due-diligence", title: "M&A Cyber Diligence", body: "The diligence-specific engagement." },
        { href: "/industries/portfolio-companies", title: "Portfolio Companies", body: "How we engage at portco level." },
      ],
    },
  },

  "portfolio-companies": {
    meta: { title: "Cybersecurity for Portfolio Companies", description: "Standardized, sponsor-friendly security baseline for PE-backed and sponsor-backed portfolio companies." },
    config: {
      category: "Industries · Investors & Operators",
      title: <>Cybersecurity for <span className="brand-gradient-text">portfolio companies</span>.</>,
      sub: "We work with portcos under PE and sponsor ownership — building security programs that satisfy GP-level governance without breaking how the company actually operates.",
      primaryCta: { href: "/contact?topic=industry", label: "Talk to portco practice" },
      factStrip: [
        { label: "Audience", value: "PE / sponsor-backed" },
        { label: "Cadence", value: "Sponsor-aligned" },
        { label: "Reporting", value: "GP-friendly" },
        { label: "Engagement", value: "Program + ongoing" },
      ],
      included: {
        title: "What's included",
        items: [
          { title: "Sponsor-aligned baseline", body: "Security baseline calibrated to GP expectations + portco realities. Not over-engineered." },
          { title: "Program ownership", body: "vCISO running the program, with sponsor-friendly reporting and quarterly board updates." },
          { title: "MDR + IR coverage", body: "Continuous monitoring + IR retainer scaled to portco size." },
          { title: "Compliance + customer trust", body: "SOC 2, HIPAA, or whatever applies — operating, not theatrical." },
          { title: "Exit-readiness", body: "Documentation buyers will ask for, ready when the sponsor is." },
        ],
      },
      process: {
        title: "Engagement lifecycle",
        steps: [
          { eyebrow: "0–30 days", title: "Baseline", body: "Risk assessment + sponsor-alignment review." },
          { eyebrow: "Months 1–6", title: "Build", body: "Program development + control implementation." },
          { eyebrow: "Ongoing", title: "Operate", body: "MDR + vCISO + quarterly reporting." },
          { eyebrow: "Pre-exit", title: "Diligence-ready", body: "Documentation buyers want, ready when sponsor is." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Sponsor-aligned security baseline",
          "Operating security program",
          "Customer-trust evidence (SOC 2, ISO 27001, etc.)",
          "MDR + IR coverage scaled appropriately",
          "Exit-ready posture",
        ],
      },
      related: [
        { href: "/industries/private-equity", title: "Private Equity", body: "The sponsor side." },
        { href: "/industries/ma-due-diligence", title: "M&A Cyber Diligence", body: "Diligence response for exits." },
        { href: "/services/vciso", title: "vCISO Services", body: "Common program-ownership engagement." },
      ],
    },
  },

  "ma-due-diligence": {
    meta: { title: "M&A Cyber Due Diligence", description: "Buy-side and sell-side cyber due diligence — surface latent breach, IP exfil, and post-close remediation cost before signing." },
    config: {
      category: "Industries · Investors & Operators",
      title: <>M&A cyber due diligence, <span className="brand-gradient-text">surface what's actually material</span>.</>,
      sub: "Most cyber diligence is a checkbox exercise. We surface material findings affecting valuation: latent breach, IP exfiltration, post-close remediation cost, hidden compliance liabilities. Both buy-side and sell-side.",
      primaryCta: { href: "/contact?topic=ma", label: "Scope a diligence engagement" },
      factStrip: [
        { label: "Engagement", value: "Buy-side + sell-side" },
        { label: "Duration", value: "5–15 business days" },
        { label: "Pricing", value: "Fixed fee" },
        { label: "Output", value: "Findings + cost estimate" },
      ],
      included: {
        title: "What we do",
        items: [
          { title: "Latent-breach surface", body: "Indicators of past or ongoing compromise that target's team may not know about." },
          { title: "IP exfiltration evidence", body: "Source code, customer data, model IP — has anything walked?" },
          { title: "Compliance liability scan", body: "Hidden HIPAA, GDPR, or contractual obligations affecting post-close cost." },
          { title: "Post-close remediation cost estimate", body: "What it'll cost to bring target up to your portfolio standard." },
          { title: "Integration-risk surface", body: "Where target's network meeting your portfolio's network creates new risk." },
          { title: "Sell-side prep", body: "When you're selling, we make the cyber narrative defensible to buy-side scrutiny." },
        ],
      },
      process: {
        title: "Diligence lifecycle",
        steps: [
          { eyebrow: "Day 0", title: "Scoping call", body: "Target size, sector, deal stage, sensitivities. Fixed-fee SOW." },
          { eyebrow: "Days 1–5", title: "Diligence work", body: "Document review, interviews, technical scanning where authorized." },
          { eyebrow: "Days 5–10", title: "Report + readout", body: "Findings, materiality flags, post-close cost estimate. 90-minute deal-team readout." },
          { eyebrow: "Post-close", title: "100-day plan", body: "If you proceed, we hand off a 100-day plan." },
        ],
      },
      outcomes: {
        title: "What you walk away with",
        items: [
          "Material findings affecting valuation",
          "Post-close remediation cost estimate",
          "Integration-risk narrative",
          "Defensible diligence record",
          "100-day plan ready post-close (buy-side)",
          "Buy-side-ready narrative (sell-side)",
        ],
      },
      related: [
        { href: "/industries/private-equity", title: "Private Equity", body: "Sponsor-level lifecycle." },
        { href: "/industries/independent-sponsors", title: "Independent Sponsors", body: "Lightweight diligence model." },
        { href: "/industries/portfolio-companies", title: "Portfolio Companies", body: "Post-close engagement." },
      ],
    },
  },
};
