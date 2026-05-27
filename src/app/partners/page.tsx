import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "SEC.co partners with technology vendors, advisory firms, and private equity sponsors to deliver senior cybersecurity work at scale.",
};

const PARTNER_TYPES = [
  {
    eyebrow: "Technology",
    title: "Technology partners",
    body: "Vendors whose platforms we engineer, operate, and integrate. We hold current certifications across the EDR, SIEM, identity, and cloud security tools we deploy in production.",
    cta: { href: "/tools-we-use", label: "See the full vendor list" },
  },
  {
    eyebrow: "Advisory",
    title: "Co-advisory & MSSP",
    body: "Partner with us when your team needs senior security depth — managed SOC, vCISO bench, offensive testing capacity — without standing up a parallel practice.",
    cta: { href: "/contact?topic=other", label: "Discuss co-advisory" },
  },
  {
    eyebrow: "Private Equity",
    title: "PE & independent sponsors",
    body: "We support deal teams across the lifecycle — pre-LOI cyber diligence, 100-day plans for newly-acquired portfolio companies, and a standardized security baseline that scales across the portfolio.",
    cta: { href: "/industries/private-equity", label: "PE engagement model" },
  },
  {
    eyebrow: "Legal",
    title: "Legal & breach coach",
    body: "Pre-positioned with breach coaches and outside counsel for incident response engagements. We integrate cleanly with privilege workflows and have testified in court.",
    cta: { href: "/contact?topic=other", label: "Reach out about IR co-engagement" },
  },
];

const TECH_PARTNERS = [
  { name: "CrowdStrike", category: "EDR / XDR" },
  { name: "Microsoft Sentinel", category: "SIEM" },
  { name: "Splunk", category: "SIEM" },
  { name: "SentinelOne", category: "EDR" },
  { name: "Palo Alto Networks", category: "Network / SASE" },
  { name: "Okta", category: "Identity" },
  { name: "Microsoft Entra", category: "Identity" },
  { name: "Wiz", category: "CNAPP" },
  { name: "AWS", category: "Cloud" },
  { name: "Azure", category: "Cloud" },
  { name: "GCP", category: "Cloud" },
  { name: "Fortinet", category: "Network" },
];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title={
          <>
            We work best{" "}
            <span className="brand-gradient-text">in the middle of the field</span>.
          </>
        }
        sub="Our partners are technology vendors whose platforms we engineer, advisory firms who plug us in when senior depth is needed, private-equity sponsors managing portfolio cyber risk, and the legal teams we respond to incidents alongside."
        primaryCta={{ href: "/contact?topic=other", label: "Become a partner" }}
        secondaryCta={{ href: "/tools-we-use", label: "Technology stack" }}
      />

      {/* Partner types */}
      <Container width="wide" className="py-20 md:py-28">
        <SectionHeader
          eyebrow="How we partner"
          title="Four kinds of working relationship"
          sub="Each has a different operating cadence. Pick the one that maps to your situation."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {PARTNER_TYPES.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-brand-cyan)]">
                {p.eyebrow}
              </div>
              <h3 className="mt-2 font-display text-[22px] leading-tight tracking-[-0.01em] text-bone">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-bone-dim">{p.body}</p>
              <Link
                href={p.cta.href}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium tracking-tight text-bone hover:text-white"
              >
                {p.cta.label}
                <span aria-hidden className="transition-transform hover:translate-x-0.5">→</span>
              </Link>
            </div>
          ))}
        </div>
      </Container>

      {/* Technology partners grid */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/30">
        <Container width="wide" className="py-20">
          <SectionHeader
            eyebrow="Technology"
            title="Platforms we hold current certifications in"
            sub="The vendors below represent the working stack — not a logo wall. We operate, engineer, and integrate every platform listed."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {TECH_PARTNERS.map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-[var(--color-line)] bg-ink-1/60 px-4 py-4"
              >
                <div className="font-display text-[16px] leading-tight tracking-tight text-bone">
                  {p.name}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                  {p.category}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link
              href="/tools-we-use"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-medium tracking-tight text-bone hover:text-white"
            >
              Full vendor commentary →
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container width="wide" className="py-20 text-center">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] tracking-[-0.02em] text-bone">
          Want to partner with us?
        </h2>
        <p className="mt-3 max-w-xl mx-auto text-[15px] text-bone-dim">
          Tell us who you are and how you&apos;d like to work together. We respond within four business hours.
        </p>
        <Link
          href="/contact?topic=other"
          className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
        >
          Get in touch
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </Container>
    </>
  );
}
