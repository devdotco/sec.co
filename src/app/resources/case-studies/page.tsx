import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Anonymized engagement outcomes across MDR, incident response, vCISO, and compliance — including ransomware containment, SOC 2 readiness, and CMMC remediation.",
};

const PLACEHOLDER_STUDIES = [
  { tag: "Manufacturing · Ransomware", title: "Ransomware contained at 4-plant manufacturer in under 18 hours", outcome: "Production restored from validated backups; zero ransom paid; OT segmentation hardened." },
  { tag: "SaaS · SOC 2", title: "$80M ARR SaaS hits SOC 2 Type I in 71 days", outcome: "From kickoff to clean audit report. Enterprise sales pipeline unblocked." },
  { tag: "PE-backed · M&A", title: "Buy-side cyber diligence saves PE sponsor $2.4M post-close", outcome: "Pre-LOI diligence surfaced latent breach; LOI repriced; post-close plan executed in 100 days." },
  { tag: "Healthcare · HIPAA", title: "Multi-state provider passes OCR audit post-incident", outcome: "Post-incident SRA + remediation; defensible posture in OCR investigation; no monetary penalty." },
  { tag: "DIB · CMMC", title: "Tier-2 defense sub achieves CMMC Level 2 on first attempt", outcome: "12-month remediation; C3PAO assessment passed first cycle; contract eligibility maintained." },
  { tag: "Fintech · BEC", title: "$3.1M wire-fraud prevented at growth-stage neobank", outcome: "Pre-positioned controls + IR retainer caught attack in progress; funds frozen at correspondent bank." },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title={
          <>
            What actually happened, <span className="brand-gradient-text">anonymized</span>.
          </>
        }
        sub="Engagement outcomes from across the practice. Names and identifying details removed; numbers and timelines kept honest. Full versions available under NDA."
        primaryCta={{ href: "/contact?topic=other", label: "Request full case studies" }}
      />

      <Container width="wide" className="py-16 md:py-24">
        <div className="grid gap-4 md:grid-cols-2">
          {PLACEHOLDER_STUDIES.map((s) => (
            <article
              key={s.title}
              className="group rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6 transition-colors hover:border-bone-dim hover:bg-ink-1"
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-brand-cyan)]">
                {s.tag}
              </div>
              <h2 className="mt-2 font-display text-[20px] leading-tight tracking-tight text-bone">
                {s.title}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">{s.outcome}</p>
              <div className="mt-5 text-[12.5px] text-mute">
                Full version available under NDA — contact us.
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/contact?topic=other"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
          >
            Request the full case studies →
          </Link>
        </div>
      </Container>
    </>
  );
}
