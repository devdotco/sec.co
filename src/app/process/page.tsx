import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How SEC.co engagements work — from first call to ongoing partnership. Diagnose, scope, deliver, operate, review.",
};

const STEPS = [
  {
    n: "01",
    eyebrow: "Discover",
    title: "30-minute call with a practitioner",
    body: "Not a sales person. You tell us what's going on; we tell you whether we're the right fit — and if we're not, we'll point you toward who is. No deck.",
    artifacts: ["Sanity-check on scope", "Framework-fit recommendation", "Rough timing & order-of-magnitude estimate"],
  },
  {
    n: "02",
    eyebrow: "Diagnose",
    title: "Two-week risk assessment (most engagements start here)",
    body: "Senior engineer interviews your team, reviews your stack, and runs targeted assessment work. You get a prioritized roadmap with executive readout and a tactical punch list.",
    artifacts: ["Executive risk readout", "Prioritized 12-month roadmap", "Quick-win remediation list", "Compliance gap map (if relevant)"],
  },
  {
    n: "03",
    eyebrow: "Scope",
    title: "Right-sized statement of work",
    body: "We propose the smallest engagement that solves your actual problem. We will say no to expanding scope just to close a bigger number.",
    artifacts: ["Fixed-scope SOW with named team", "Timeline with checkpoints", "Pricing transparent on the page"],
  },
  {
    n: "04",
    eyebrow: "Deliver",
    title: "Senior team, weekly cadence",
    body: "A named lead engineer runs the engagement. Weekly status with two questions: what changed, and what's blocked? No theater. Real artifacts shipped on schedule.",
    artifacts: ["Weekly status with decisions, not slides", "Pull requests, runbooks, and dashboards", "Direct slack channel with our team"],
  },
  {
    n: "05",
    eyebrow: "Operate",
    title: "Hand off — or run it for you",
    body: "Two paths after delivery: we hand over what we built and your team owns it, or we operate it for you on retainer. Many clients do both — internal ownership with our SOC behind it 24/7.",
    artifacts: ["Documented runbooks for handoff", "Optional retainer for ongoing operation", "Named on-call rotation if retained"],
  },
  {
    n: "06",
    eyebrow: "Review",
    title: "Quarterly executive review",
    body: "Every retainer client gets a 90-minute quarterly review with leadership: incidents trended, risk posture changed, controls coverage, and the next 90-day priorities.",
    artifacts: ["Risk-posture delta vs. last quarter", "Incident retrospective", "Roadmap reprioritization"],
  },
];

const PRINCIPLES = [
  {
    title: "We start with a diagnostic, not a sale.",
    body: "Most engagements begin with a two-week risk assessment. It's the cheapest possible way to find out if we're the right partner — and the right answer is sometimes 'not us'.",
  },
  {
    title: "Named leads, not pooled juniors.",
    body: "Every engagement has a single senior engineer who owns delivery. The team behind them is senior too — no offshored back-office, no fresh-grad churn.",
  },
  {
    title: "We work in your stack.",
    body: "We engineer Splunk, Sentinel, CrowdStrike, SentinelOne, Okta, AWS, Azure, GCP — whatever you already pay for. We don't have a platform to upsell.",
  },
  {
    title: "We write things down.",
    body: "Every engagement ends with documentation your team can own. Runbooks, decision logs, detection rules with comments. Nothing lives only in our heads.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Process"
        title={
          <>
            How an engagement actually works,{" "}
            <span className="brand-gradient-text">end to end</span>.
          </>
        }
        sub="Six steps. The first is a 30-minute call, not a sales pitch. The last is a 90-minute quarterly review that asks: what changed, what got worse, and what should we focus on next?"
        primaryCta={{ href: "/contact?topic=assessment", label: "Book the 30-min call" }}
        secondaryCta={{ href: "/services", label: "Browse services" }}
      />

      {/* Steps */}
      <Container width="wide" className="py-20 md:py-28">
        <ol className="space-y-12">
          {STEPS.map((s) => (
            <li key={s.n} className="grid gap-8 md:grid-cols-[160px_1fr]">
              <div className="md:sticky md:top-24 md:self-start">
                <div className="font-display text-[64px] leading-none tracking-tight text-bone-dim/30">
                  {s.n}
                </div>
                <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-brand-cyan)]">
                  {s.eyebrow}
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-8">
                <h2 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-tight tracking-[-0.02em] text-bone">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bone-dim">{s.body}</p>
                <div className="mt-5 border-t border-[var(--color-line-subtle)] pt-5">
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                    What you walk away with
                  </div>
                  <ul className="grid gap-2 text-[13.5px] text-bone-dim sm:grid-cols-2">
                    {s.artifacts.map((a) => (
                      <li key={a} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-violet)]"
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      {/* Principles */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/30">
        <Container width="wide" className="py-20 md:py-24">
          <SectionHeader
            eyebrow="Operating principles"
            title="What we won't compromise on"
            sub="These are non-negotiable. If they sound wrong for your situation, we're probably not the right partner."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
              >
                <h3 className="font-display text-[18px] leading-tight text-bone">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Container width="wide" className="py-20 text-center">
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.5rem)] tracking-[-0.02em] text-bone">
          Want to see if we&apos;re a fit?
        </h2>
        <p className="mt-3 text-[15px] text-bone-dim">
          Start with the 30-minute call. We&apos;ll be honest with you about whether to keep talking.
        </p>
        <Link
          href="/contact?topic=assessment"
          className="group mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
        >
          Book the call
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </Container>
    </>
  );
}
