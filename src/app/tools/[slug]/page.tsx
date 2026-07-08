import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ResourcePageView } from "@/components/site/resource-page";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";
import { Container } from "@/components/ui/container";
import { CyberRiskCalculator } from "@/components/site/cyber-risk-calculator";
import { TOOL_PAGES } from "@/lib/resource-pages";

type Params = { slug: string };

const CALCULATOR_SLUG = "cyber-risk-calculator";

export function generateStaticParams(): Params[] {
  return Object.keys(TOOL_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = TOOL_PAGES[slug];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = TOOL_PAGES[slug];
  if (!page) notFound();

  if (slug === CALCULATOR_SLUG) {
    return (
      <>
        <PageHero eyebrow={page.hero.eyebrow} title={page.hero.title} sub={page.hero.sub} />

        <Container width="wide" className="pb-8">
          <CyberRiskCalculator />
        </Container>

        {/* Methodology */}
        <section className="border-t border-[var(--color-line)] bg-ink-1/30">
          <Container width="wide" className="py-16 md:py-20">
            <SectionHeader
              eyebrow="Methodology"
              title="How the estimate is built"
              sub="A transparent FAIR-lite model — frequency × magnitude — calibrated to public benchmarks. No black box, no signup, nothing leaves your browser."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  h: "Frequency",
                  b: "A per-industry base breach rate, scaled by your revenue (attack surface) and the data you hold (attacker interest), then reduced by the preventive controls you have deployed.",
                },
                {
                  h: "Magnitude",
                  b: "Primary loss (records × industry cost-per-record × data sensitivity) plus secondary loss (forensics, legal, notification, regulatory fines, downtime and churn), attenuated by your response controls.",
                },
                {
                  h: "Annualized exposure",
                  b: "A Monte Carlo simulation combines frequency and magnitude into a full distribution — surfaced as an expected annual loss, a bad-year tail, and a loss-exceedance curve.",
                },
              ].map((c) => (
                <article
                  key={c.h}
                  className="rounded-2xl border border-[var(--color-line)] bg-ink-1/40 p-6"
                >
                  <h3 className="font-display text-[18px] tracking-tight text-bone">{c.h}</h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-bone-dim">{c.b}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-[13px] leading-relaxed text-mute">
              Benchmarks are derived from public sources including the IBM Cost of a Data Breach
              report and the Verizon Data Breach Investigations Report (DBIR). This is a directional
              estimate for planning and board conversations — not a scoped assessment.
            </p>
          </Container>
        </section>

        {page.related && page.related.length > 0 && (
          <section className="border-t border-[var(--color-line)]">
            <Container width="wide" className="py-16">
              <SectionHeader eyebrow="Related" title="Go deeper" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {page.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="group rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-5 transition-all hover:-translate-y-0.5 hover:border-bone-dim hover:bg-ink-1"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-[17px] leading-tight tracking-tight text-bone">
                        {r.title}
                      </h3>
                      <span
                        aria-hidden
                        className="text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-bone"
                      >
                        →
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-bone-dim">{r.body}</p>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </>
    );
  }

  return <ResourcePageView page={page} />;
}
