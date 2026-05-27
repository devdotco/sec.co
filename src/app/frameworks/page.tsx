import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "Frameworks",
  description:
    "The security and compliance frameworks SEC.co works with — NIST CSF, NIST 800-53, NIST 800-171, CIS Controls, MITRE ATT&CK, ISO 27001, and more.",
};

type Framework = {
  id: string;
  name: string;
  scope: string;
  body: string;
  href?: string;
};

const SECURITY_FRAMEWORKS: Framework[] = [
  {
    id: "nist-csf",
    name: "NIST Cybersecurity Framework (CSF) 2.0",
    scope: "Voluntary · Industry-agnostic",
    body: "Six functions: Govern, Identify, Protect, Detect, Respond, Recover. We use the CSF as the default program structure for clients who don't have a specific regulatory mandate.",
  },
  {
    id: "nist-800-53",
    name: "NIST SP 800-53",
    scope: "Federal · FISMA / FedRAMP",
    body: "Control catalog underlying FedRAMP, FISMA, and many state programs. We implement at Low, Moderate, and High baselines.",
  },
  {
    id: "nist-800-171",
    name: "NIST SP 800-171",
    scope: "Defense · CUI",
    body: "110 controls for protecting Controlled Unclassified Information in non-federal systems. Required by DFARS and the precursor to CMMC.",
    href: "/compliance/nist-800-171",
  },
  {
    id: "cis",
    name: "CIS Controls v8",
    scope: "Industry-agnostic · IG1–IG3",
    body: "18 control families organized into three implementation groups. Pragmatic baseline that pairs well with NIST CSF.",
  },
  {
    id: "iec-62443",
    name: "IEC 62443",
    scope: "Industrial · OT / ICS",
    body: "Cybersecurity for industrial automation and control systems. The reference framework for manufacturing, energy, and utilities clients.",
  },
];

const COMPLIANCE_FRAMEWORKS: Framework[] = [
  { id: "cmmc", name: "CMMC 2.0", scope: "Defense Industrial Base", body: "Three-level maturity model required for DoD contracts touching CUI. Built on NIST 800-171.", href: "/compliance/cmmc" },
  { id: "fedramp", name: "FedRAMP", scope: "Federal cloud", body: "Authorization for cloud-service providers selling into the federal government.", href: "/compliance/fedramp" },
  { id: "soc-2", name: "SOC 2 (Type I & II)", scope: "Trust services · SaaS / B2B", body: "AICPA Trust Services Criteria. The de facto B2B sales requirement for SaaS.", href: "/compliance/soc-2" },
  { id: "iso-27001", name: "ISO/IEC 27001:2022", scope: "International · ISMS", body: "Information Security Management System certification. Required outside the U.S. and increasingly in U.S. enterprise procurement.", href: "/compliance/iso-27001" },
  { id: "hipaa", name: "HIPAA Security Rule", scope: "Healthcare · PHI", body: "Required for covered entities and business associates touching PHI in the U.S.", href: "/compliance/hipaa" },
  { id: "pci", name: "PCI DSS v4", scope: "Payments · Cardholder data", body: "Required by the card brands for any system handling, processing, or transmitting cardholder data.", href: "/compliance/pci-dss" },
  { id: "gdpr", name: "GDPR", scope: "EU / UK · Personal data", body: "EU regulation governing personal data processing. Applies to U.S. companies handling EU residents' data.", href: "/compliance/gdpr" },
];

const THREAT_MODELS: Framework[] = [
  {
    id: "attack",
    name: "MITRE ATT&CK",
    scope: "Adversary tactics & techniques",
    body: "The reference taxonomy for adversary behavior. We map detection coverage and threat-hunting hypotheses to ATT&CK techniques.",
  },
  {
    id: "d3fend",
    name: "MITRE D3FEND",
    scope: "Defensive countermeasures",
    body: "Companion to ATT&CK. We use D3FEND to map controls to the adversary techniques they actually disrupt.",
  },
  {
    id: "cyber-kill-chain",
    name: "Cyber Kill Chain",
    scope: "Intrusion lifecycle",
    body: "Lockheed Martin model of an intrusion lifecycle. Older than ATT&CK but still useful for executive narrative.",
  },
  {
    id: "stride",
    name: "STRIDE",
    scope: "Application threat modeling",
    body: "Threat-categorization model used for application threat modeling: Spoofing, Tampering, Repudiation, Information disclosure, DoS, Elevation of privilege.",
  },
];

export default function FrameworksPage() {
  return (
    <>
      <PageHero
        eyebrow="Frameworks"
        title={
          <>
            The reference frameworks we work in —{" "}
            <span className="brand-gradient-text">and when each one applies</span>.
          </>
        }
        sub="Cybersecurity is a regulated discipline. Engagements typically reference one or more of the frameworks below — for control selection, audit alignment, or executive communication. This page is the index."
        primaryCta={{ href: "/compliance", label: "Compliance services" }}
        secondaryCta={{ href: "/services", label: "Security services" }}
      />

      <Container width="wide" className="py-20 md:py-28 space-y-20">
        <FrameworkSection
          eyebrow="Security"
          title="Security frameworks"
          intro="Control catalogs and program structures we use to design and operate security programs."
          items={SECURITY_FRAMEWORKS}
        />
        <FrameworkSection
          eyebrow="Compliance"
          title="Compliance & audit frameworks"
          intro="Required for procurement, sales, or law. Each links to the dedicated compliance page where applicable."
          items={COMPLIANCE_FRAMEWORKS}
        />
        <FrameworkSection
          eyebrow="Threat modeling"
          title="Threat & adversary models"
          intro="How we describe attacker behavior, design detections, and threat-model applications."
          items={THREAT_MODELS}
        />
      </Container>
    </>
  );
}

function FrameworkSection({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  items: Framework[];
}) {
  return (
    <section>
      <SectionHeader eyebrow={eyebrow} title={title} sub={intro} />
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((f) => {
          const inner = (
            <article
              id={f.id}
              className={`scroll-mt-24 rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6 transition-colors ${
                f.href ? "hover:bg-ink-1 hover:border-bone-dim" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-[19px] leading-tight tracking-tight text-bone">
                  {f.name}
                </h3>
                {f.href && (
                  <span aria-hidden className="text-bone-dim transition-transform hover:translate-x-0.5">
                    →
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                {f.scope}
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-bone-dim">{f.body}</p>
            </article>
          );
          return f.href ? (
            <Link key={f.id} href={f.href} className="group block">
              {inner}
            </Link>
          ) : (
            <div key={f.id}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
