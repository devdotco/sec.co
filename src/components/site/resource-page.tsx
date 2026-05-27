import type { ResourcePage } from "@/lib/resource-pages";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "./page-hero";
import { SectionHeader } from "./section-header";

export function ResourcePageView({ page }: { page: ResourcePage }) {
  const isGradient = page.cta.tone === "gradient";
  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        sub={page.hero.sub}
        primaryCta={page.cta}
      />

      <Container width="wide" className="py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            {page.whatsInside && (
              <section>
                <SectionHeader eyebrow="What's inside" title="The table of contents" />
                <ul className="grid gap-3 sm:grid-cols-2">
                  {page.whatsInside.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-ink-1/40 px-4 py-3.5 text-[14px] leading-relaxed text-bone-dim"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-cyan)]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {page.sections && (
              <section className="mt-16 space-y-12">
                {page.sections.map((s) => (
                  <article key={s.title}>
                    <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-bone">
                      {s.title}
                    </h2>
                    <div className="mt-3 text-[15px] leading-relaxed text-bone-dim">{s.body}</div>
                  </article>
                ))}
              </section>
            )}
          </div>

          {/* CTA card */}
          <aside className="md:sticky md:top-24 md:self-start">
            <div
              className={`rounded-3xl border p-6 ${
                isGradient ? "brand-gradient-border bg-ink-1" : "border-[var(--color-line)] bg-ink-1/60"
              }`}
            >
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
                {page.hero.eyebrow}
              </div>
              <h3 className="mt-2 font-display text-[22px] leading-tight tracking-tight text-bone">
                {page.hero.title}
              </h3>
              <Link
                href={page.cta.href}
                className={`group mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-semibold tracking-tight transition-all duration-200 hover:-translate-y-px ${
                  isGradient
                    ? "brand-gradient text-ink-0 shadow-[0_10px_28px_-8px_rgba(96,41,255,0.55)]"
                    : "bg-bone text-ink-0 hover:bg-white"
                }`}
              >
                {page.cta.label}
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              {page.ctaNote && (
                <p className="mt-3 text-[12px] leading-relaxed text-mute">{page.ctaNote}</p>
              )}
            </div>
          </aside>
        </div>
      </Container>

      {page.related && page.related.length > 0 && (
        <section className="border-t border-[var(--color-line)] bg-ink-1/30">
          <Container width="wide" className="py-16">
            <SectionHeader eyebrow="Related" title="You may also want" />
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
                    <span aria-hidden className="text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-bone">
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
