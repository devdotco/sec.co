import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "./page-hero";
import { SectionHeader } from "./section-header";
import { ServiceCard } from "./service-card";
import type { CardSection } from "@/lib/page-content";

type HubPageProps = {
  eyebrow: string;
  title: ReactNode;
  sub: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  sections: CardSection[];
  /** Final CTA band at bottom. */
  footerCta?: {
    eyebrow?: string;
    title: ReactNode;
    body: ReactNode;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
    tone?: "default" | "urgent";
  };
};

export function HubPage({
  eyebrow,
  title,
  sub,
  primaryCta,
  secondaryCta,
  sections,
  footerCta,
}: HubPageProps) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        sub={sub}
        primaryCta={primaryCta}
        secondaryCta={secondaryCta}
      />

      {/* Section anchor nav */}
      {sections.length > 1 && (
        <Container width="wide" className="border-y border-[var(--color-line)] bg-ink-1/30">
          <nav aria-label="Sections" className="-mx-1 flex flex-wrap items-center gap-x-1 gap-y-2 py-4">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-3 py-1.5 text-[12.5px] font-medium tracking-tight text-bone-dim transition-colors hover:bg-ink-2 hover:text-bone"
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </Container>
      )}

      {/* Sections */}
      <Container width="wide" className="py-20 md:py-28">
        <div className="space-y-24">
          {sections.map((section) => (
            <section key={section.id}>
              <SectionHeader
                id={section.id}
                title={section.title}
                sub={section.intro}
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <ServiceCard
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    description={item.description}
                    meta={item.meta}
                    emphasis={item.emphasis}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>

      {/* Footer CTA band */}
      {footerCta && (
        <section className="relative isolate overflow-hidden border-y border-[var(--color-line)] bg-ink-1/40">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                footerCta.tone === "urgent"
                  ? "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,53,0.10), transparent 70%)"
                  : "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(96,41,255,0.12), transparent 70%)",
            }}
          />
          <Container width="wide" className="py-20">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                {footerCta.eyebrow && (
                  <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
                    {footerCta.eyebrow}
                  </div>
                )}
                <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-bone">
                  {footerCta.title}
                </h2>
                <p className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-bone-dim">
                  {footerCta.body}
                </p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link
                  href={footerCta.primary.href}
                  className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[14px] font-semibold tracking-tight transition-all duration-200 hover:-translate-y-px ${
                    footerCta.tone === "urgent"
                      ? "bg-[var(--color-ember)] text-ink-0 hover:bg-[var(--color-ember-bright)]"
                      : "bg-bone text-ink-0 hover:bg-white"
                  }`}
                >
                  {footerCta.primary.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
                {footerCta.secondary && (
                  <Link
                    href={footerCta.secondary.href}
                    className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[14px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
                  >
                    {footerCta.secondary.label}
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
