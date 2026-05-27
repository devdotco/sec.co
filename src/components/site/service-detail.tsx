import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "./page-hero";
import { SectionHeader } from "./section-header";

export type ServiceDetailConfig = {
  category: string;             // e.g., "Managed Security"
  title: ReactNode;             // page hero title (can include <span class="brand-gradient-text">)
  sub: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };

  /** Quick at-a-glance facts shown under the hero. */
  factStrip?: { label: string; value: string }[];

  /** "What's included" — bulleted features grouped optionally. */
  included: {
    title: string;              // section title
    sub?: string;
    items: { title: string; body: string }[];
  };

  /** "How it works" — sequential steps. */
  process: {
    title: string;
    sub?: string;
    steps: { eyebrow?: string; title: string; body: string }[];
  };

  /** "What you walk away with" — outcomes. */
  outcomes: {
    title: string;
    sub?: string;
    items: string[];
  };

  /** "Why us" — differentiators. */
  differentiators?: { title: string; body: string }[];

  /** FAQ — collapsible Q&A. */
  faq?: { q: string; a: string }[];

  /** Related service cards. */
  related?: { href: string; title: string; body: string }[];

  /** Final CTA band. */
  finalCta?: {
    title: ReactNode;
    body: ReactNode;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
    tone?: "default" | "urgent";
  };
};

export function ServiceDetailPage({ config }: { config: ServiceDetailConfig }) {
  return (
    <>
      <PageHero
        eyebrow={config.category}
        title={config.title}
        sub={config.sub}
        primaryCta={config.primaryCta}
        secondaryCta={config.secondaryCta}
      />

      {config.factStrip && (
        <section className="border-y border-[var(--color-line)] bg-ink-1/30">
          <Container width="wide" className="py-8">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {config.factStrip.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-display text-[22px] leading-tight tracking-tight text-bone">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {/* What's included */}
      <Container width="wide" className="py-20 md:py-28">
        <SectionHeader
          eyebrow="What's included"
          title={config.included.title}
          sub={config.included.sub}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {config.included.items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
            >
              <h3 className="font-display text-[18px] leading-tight tracking-tight text-bone">
                {it.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{it.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* How it works */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/30">
        <Container width="wide" className="py-20 md:py-24">
          <SectionHeader
            eyebrow="How it works"
            title={config.process.title}
            sub={config.process.sub}
          />
          <ol className="space-y-8">
            {config.process.steps.map((s, i) => (
              <li key={s.title} className="grid gap-6 md:grid-cols-[120px_1fr]">
                <div>
                  <div className="font-display text-[44px] leading-none tracking-tight text-bone-dim/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {s.eyebrow && (
                    <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-brand-cyan)]">
                      {s.eyebrow}
                    </div>
                  )}
                </div>
                <div className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6">
                  <h3 className="font-display text-[19px] leading-tight tracking-tight text-bone">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Outcomes */}
      <Container width="wide" className="py-20 md:py-28">
        <SectionHeader
          eyebrow="Outcomes"
          title={config.outcomes.title}
          sub={config.outcomes.sub}
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {config.outcomes.items.map((o) => (
            <li
              key={o}
              className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-ink-1/40 px-4 py-3.5 text-[14px] leading-relaxed text-bone-dim"
            >
              <CheckIcon />
              <span>{o}</span>
            </li>
          ))}
        </ul>
      </Container>

      {/* Differentiators */}
      {config.differentiators && (
        <section className="border-y border-[var(--color-line)] bg-ink-1/30">
          <Container width="wide" className="py-20">
            <SectionHeader eyebrow="Why us" title="What makes our engagement different" />
            <div className="grid gap-4 md:grid-cols-2">
              {config.differentiators.map((d) => (
                <div
                  key={d.title}
                  className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
                >
                  <h3 className="font-display text-[18px] leading-tight tracking-tight text-bone">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{d.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      {config.faq && config.faq.length > 0 && (
        <Container width="wide" className="py-20 md:py-28">
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          <div className="space-y-3">
            {config.faq.map((q) => (
              <details
                key={q.q}
                className="group rounded-2xl border border-[var(--color-line)] bg-ink-1/40 px-5 py-4 transition-colors hover:bg-ink-1"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[15px] font-medium tracking-tight text-bone">
                  {q.q}
                  <span
                    aria-hidden
                    className="mt-0.5 text-bone-dim transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">{q.a}</p>
              </details>
            ))}
          </div>
        </Container>
      )}

      {/* Related */}
      {config.related && config.related.length > 0 && (
        <section className="border-y border-[var(--color-line)] bg-ink-1/30">
          <Container width="wide" className="py-20">
            <SectionHeader eyebrow="Related" title="You may also want" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {config.related.map((r) => (
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

      {/* Final CTA */}
      {config.finalCta && (
        <section className="relative isolate overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 -z-10"
            style={{
              background:
                config.finalCta.tone === "urgent"
                  ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,53,0.14), transparent 70%)"
                  : "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(96,41,255,0.14), transparent 70%)",
            }}
          />
          <Container width="wide" className="py-20">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <h2 className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-bone">
                  {config.finalCta.title}
                </h2>
                <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-bone-dim">
                  {config.finalCta.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href={config.finalCta.primary.href}
                  className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold tracking-tight transition-all duration-200 hover:-translate-y-px ${
                    config.finalCta.tone === "urgent"
                      ? "bg-[var(--color-ember)] text-ink-0 hover:bg-[var(--color-ember-bright)]"
                      : "bg-bone text-ink-0 hover:bg-white"
                  }`}
                >
                  {config.finalCta.primary.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                {config.finalCta.secondary && (
                  <Link
                    href={config.finalCta.secondary.href}
                    className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[14px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
                  >
                    {config.finalCta.secondary.label}
                  </Link>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[var(--color-brand-cyan)]"
    >
      <path
        d="M3 8.5L6.5 12 13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
