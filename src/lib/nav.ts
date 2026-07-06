/**
 * SEC.co site navigation.
 *
 * Mega-menu structure follows the IA spec: each top-level item has 3–4 columns
 * of 4–5 items each (the strongest services), plus a featured side panel.
 * Deeper service pages live on the hub pages (e.g. /services/security-testing).
 */

export type NavLink = { label: string; href: string; emphasis?: "default" | "urgent" };

export type NavColumn = {
  title: string;
  links: NavLink[];
  viewAll?: NavLink;
};

export type FeaturedPanel = {
  eyebrow?: string;
  title: string;
  body: string;
  primary: NavLink;
  secondary?: NavLink;
  tone?: "default" | "urgent";
};

export type MegaMenu = {
  id: string;
  label: string;
  href: string;            // top-level hub
  columns: NavColumn[];
  featured: FeaturedPanel;
};

export type DropdownMenu = {
  id: string;
  label: string;
  href: string;
  links: NavLink[];
};

export type NavItem = MegaMenu | DropdownMenu;

export const isMegaMenu = (item: NavItem): item is MegaMenu =>
  "columns" in item;

// ─────────────────────────────────────────────────────────────────────────────

export const SERVICES: MegaMenu = {
  id: "services",
  label: "Services",
  href: "/services",
  columns: [
    {
      title: "Advisory & Governance",
      links: [
        { label: "vCISO Services", href: "/services/vciso" },
        { label: "Cyber Risk Assessment", href: "/services/cyber-risk-assessment" },
        { label: "Cybersecurity Program Development", href: "/services/cybersecurity-program-development" },
        { label: "Vendor Risk Management", href: "/services/vendor-risk-management" },
        { label: "Cyber Insurance Readiness", href: "/services/cyber-insurance-readiness" },
      ],
      viewAll: { label: "View all Advisory services", href: "/services/advisory" },
    },
    {
      title: "Security Testing",
      links: [
        { label: "Penetration Testing", href: "/services/penetration-testing" },
        { label: "Vulnerability Assessment", href: "/services/vulnerability-assessment" },
        { label: "Web Application Testing", href: "/services/web-application-testing" },
        { label: "API Security Testing", href: "/services/api-security-testing" },
        { label: "Red Team Assessment", href: "/services/red-team-assessment" },
      ],
      viewAll: { label: "View all Testing services", href: "/services/security-testing" },
    },
    {
      title: "Managed Security",
      links: [
        { label: "Managed Detection & Response", href: "/services/mdr" },
        { label: "SOC-as-a-Service", href: "/services/soc-as-a-service" },
        { label: "Managed SIEM", href: "/services/managed-siem" },
        { label: "Managed EDR / XDR", href: "/services/managed-edr-xdr" },
        { label: "Threat Hunting", href: "/services/threat-hunting" },
      ],
      viewAll: { label: "View all Managed Security", href: "/services/managed-security" },
    },
    {
      title: "Incident Response",
      links: [
        { label: "Incident Response Retainer", href: "/services/incident-response-retainer" },
        { label: "Emergency Breach Response", href: "/emergency", emphasis: "urgent" },
        { label: "Ransomware Response", href: "/services/ransomware-response" },
        { label: "Digital Forensics", href: "/services/digital-forensics" },
        { label: "Tabletop Exercises", href: "/services/tabletop-exercises" },
      ],
      viewAll: { label: "View all Incident Response", href: "/services/incident-response" },
    },
  ],
  featured: {
    eyebrow: "24/7 hotline",
    title: "Need urgent help?",
    body: "Breach, ransomware, business email compromise, or an active intrusion underway — we mobilize within an hour.",
    primary: { label: "Emergency Response", href: "/emergency", emphasis: "urgent" },
    secondary: { label: "Talk to a Security Advisor", href: "/contact" },
    tone: "urgent",
  },
};

export const COMPLIANCE: MegaMenu = {
  id: "compliance",
  label: "Compliance",
  href: "/compliance",
  columns: [
    {
      title: "Defense & Government",
      links: [
        { label: "CMMC Compliance", href: "/compliance/cmmc" },
        { label: "NIST 800-171", href: "/compliance/nist-800-171" },
        { label: "FedRAMP Readiness", href: "/compliance/fedramp" },
        { label: "DFARS Cybersecurity", href: "/compliance/dfars" },
      ],
    },
    {
      title: "Business & SaaS",
      links: [
        { label: "SOC 2 Readiness", href: "/compliance/soc-2" },
        { label: "ISO 27001 Readiness", href: "/compliance/iso-27001" },
        { label: "Vendor Security Reviews", href: "/compliance/vendor-security-reviews" },
        { label: "Security Questionnaires", href: "/compliance/security-questionnaires" },
      ],
    },
    {
      title: "Regulated Industries",
      links: [
        { label: "HIPAA Security Risk Assessment", href: "/compliance/hipaa" },
        { label: "PCI DSS Compliance", href: "/compliance/pci-dss" },
        { label: "GDPR Readiness", href: "/compliance/gdpr" },
        { label: "SEC Cybersecurity Disclosure Readiness", href: "/compliance/sec-disclosure" },
      ],
    },
  ],
  featured: {
    eyebrow: "Not sure where to start?",
    title: "Which framework applies to you?",
    body: "Get a 30-minute gap assessment matched to your industry, contracts, and growth stage.",
    primary: { label: "Request Compliance Assessment", href: "/contact?topic=compliance" },
    secondary: { label: "View all compliance services", href: "/compliance" },
  },
};

export const INDUSTRIES: MegaMenu = {
  id: "industries",
  label: "Industries",
  href: "/industries",
  columns: [
    {
      title: "Regulated",
      links: [
        { label: "Financial Services", href: "/industries/financial-services" },
        { label: "Healthcare", href: "/industries/healthcare" },
        { label: "Legal", href: "/industries/legal" },
        { label: "Government Contractors", href: "/industries/government-contractors" },
        { label: "Insurance", href: "/industries/insurance" },
      ],
    },
    {
      title: "Technology",
      links: [
        { label: "SaaS Companies", href: "/industries/saas" },
        { label: "Software Development Firms", href: "/industries/software-development" },
        { label: "AI Companies", href: "/industries/ai" },
        { label: "Fintech", href: "/industries/fintech" },
        { label: "E-commerce", href: "/industries/ecommerce" },
      ],
    },
    {
      title: "Industrial",
      links: [
        { label: "Manufacturing", href: "/industries/manufacturing" },
        { label: "Logistics & Transportation", href: "/industries/logistics" },
        { label: "Construction", href: "/industries/construction" },
        { label: "Energy & Utilities", href: "/industries/energy" },
        { label: "Operational Technology (OT)", href: "/industries/ot" },
      ],
    },
    {
      title: "Investors & Operators",
      links: [
        { label: "Private Equity", href: "/industries/private-equity" },
        { label: "Independent Sponsors", href: "/industries/independent-sponsors" },
        { label: "Portfolio Companies", href: "/industries/portfolio-companies" },
        { label: "M&A Cyber Due Diligence", href: "/industries/ma-due-diligence" },
      ],
    },
  ],
  featured: {
    eyebrow: "Private equity",
    title: "Cybersecurity for portfolio companies",
    body: "Assess cyber risk before and after acquisition. Reduce buy-side surprises and lift exit value.",
    primary: { label: "View M&A Cybersecurity Services", href: "/industries/ma-due-diligence" },
  },
};

export const SOLUTIONS: MegaMenu = {
  id: "solutions",
  label: "Solutions",
  href: "/solutions",
  columns: [
    {
      title: "I need to…",
      links: [
        { label: "Get a Cybersecurity Assessment", href: "/solutions/cybersecurity-assessment" },
        { label: "Prepare for CMMC", href: "/solutions/prepare-for-cmmc" },
        { label: "Prepare for SOC 2", href: "/solutions/prepare-for-soc-2" },
        { label: "Improve Ransomware Readiness", href: "/solutions/ransomware-readiness" },
        { label: "Respond to a Breach", href: "/emergency", emphasis: "urgent" },
      ],
    },
    {
      title: "I need ongoing help",
      links: [
        { label: "24/7 Security Monitoring", href: "/solutions/24-7-monitoring" },
        { label: "Hire a Fractional CISO", href: "/services/vciso" },
        { label: "Manage Vulnerabilities", href: "/solutions/vulnerability-management" },
        { label: "Improve Cloud Security", href: "/solutions/cloud-security" },
        { label: "Automate Security Workflows", href: "/solutions/security-automation" },
      ],
    },
    {
      title: "I need technical security",
      links: [
        { label: "Test an Application", href: "/services/web-application-testing" },
        { label: "Secure APIs", href: "/services/api-security-testing" },
        { label: "Review Cloud Infrastructure", href: "/solutions/cloud-security-review" },
        { label: "Secure AI / LLM Systems", href: "/solutions/ai-llm-security" },
        { label: "Implement Zero Trust", href: "/solutions/zero-trust" },
      ],
    },
  ],
  featured: {
    eyebrow: "Best first step",
    title: "Start with a cyber risk assessment",
    body: "Most clients begin here. A 2-week diagnostic that produces a prioritized roadmap and an executive readout.",
    primary: { label: "Schedule Assessment", href: "/contact?topic=assessment" },
  },
};

export const RESOURCES: MegaMenu = {
  id: "resources",
  label: "Resources",
  href: "/resources",
  columns: [
    {
      title: "Learn",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Cybersecurity Guides", href: "/resources/guides/cybersecurity" },
        { label: "Compliance Guides", href: "/resources/guides/compliance" },
        { label: "Incident Response Resources", href: "/resources/guides/incident-response" },
        { label: "AI Security Resources", href: "/resources/guides/ai-security" },
      ],
    },
    {
      title: "Downloads",
      links: [
        { label: "Cyber Risk Checklist", href: "/resources/downloads/cyber-risk-checklist" },
        { label: "Ransomware Readiness Checklist", href: "/resources/downloads/ransomware-readiness" },
        { label: "CMMC Readiness Checklist", href: "/resources/downloads/cmmc-readiness" },
        { label: "SOC 2 Readiness Checklist", href: "/resources/downloads/soc-2-readiness" },
        { label: "Incident Response Plan Template", href: "/resources/downloads/ir-plan-template" },
      ],
    },
    {
      title: "Tools",
      links: [
        { label: "Cyber Risk Calculator", href: "/tools/cyber-risk-calculator" },
        { label: "Compliance Readiness Quiz", href: "/tools/compliance-quiz" },
        { label: "Vendor Risk Questionnaire", href: "/tools/vendor-risk-questionnaire" },
        { label: "Cyber Insurance Readiness Checklist", href: "/tools/cyber-insurance-readiness" },
      ],
    },
  ],
  featured: {
    eyebrow: "New to SEC.co?",
    title: "Start with our Cyber Risk Checklist",
    body: "A 12-point self-audit that surfaces the gaps most teams discover only after an incident.",
    primary: { label: "Download Checklist", href: "/resources/downloads/cyber-risk-checklist" },
  },
};

export const COMPANY: DropdownMenu = {
  id: "company",
  label: "Company",
  href: "/about",
  links: [
    { label: "About", href: "/about" },
    { label: "Our Process", href: "/process" },
    { label: "Tools We Use", href: "/tools-we-use" },
    { label: "Frameworks", href: "/frameworks" },
    { label: "Partners", href: "/partners" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

export const NAV: NavItem[] = [
  SERVICES,
  COMPLIANCE,
  INDUSTRIES,
  SOLUTIONS,
  RESOURCES,
  COMPANY,
];

// Footer mirrors the nav but flattened with a few extras.
export const FOOTER_COLUMNS: NavColumn[] = [
  {
    title: "Services",
    links: [
      { label: "vCISO Services", href: "/services/vciso" },
      { label: "Penetration Testing", href: "/services/penetration-testing" },
      { label: "Managed Detection & Response", href: "/services/mdr" },
      { label: "Incident Response Retainer", href: "/services/incident-response-retainer" },
      { label: "View all services", href: "/services" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "CMMC", href: "/compliance/cmmc" },
      { label: "SOC 2", href: "/compliance/soc-2" },
      { label: "ISO 27001", href: "/compliance/iso-27001" },
      { label: "HIPAA", href: "/compliance/hipaa" },
      { label: "View all frameworks", href: "/compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Careers", href: "/careers" },
      { label: "Partners", href: "/partners" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Guides", href: "/resources/guides/cybersecurity" },
      { label: "Tools", href: "/tools/cyber-risk-calculator" },
      { label: "Downloads", href: "/resources/downloads/cyber-risk-checklist" },
      { label: "DEV", href: "https://dev.co?=secdotco" },
    ],
  },
  {
    title: "Vulnerability Intelligence",
    links: [
      { label: "Vulnerability database", href: "/vulnerabilities" },
      { label: "Known exploited (KEV)", href: "/vulnerabilities/known-exploited" },
      { label: "Critical vulnerabilities", href: "/vulnerabilities/severity/critical" },
      { label: "High-severity", href: "/vulnerabilities/severity/high" },
    ],
  },
];
