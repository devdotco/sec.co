import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
  /** When true, renders a heavier ambient backdrop. */
  intense?: boolean;
  align?: "start" | "center";
};

/**
 * Standard interior page hero. Used on hubs, service pages, industries, etc.
 * Differs from the homepage hero: smaller display size, no stat strip,
 * single column.
 */
export function PageHero({
  eyebrow,
  title,
  sub,
  primaryCta,
  secondaryCta,
  intense = false,
  align = "start",
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px]"
        style={{
          background: intense
            ? "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(96,41,255,0.22), transparent 70%), radial-gradient(ellipse 50% 40% at 15% 30%, rgba(25,191,255,0.14), transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(96,41,255,0.14), transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grain" />

      <Container width="wide" className="relative pt-10 pb-14 md:pt-14 md:pb-20">
        <div
          className={
            align === "center"
              ? "mx-auto max-w-3xl text-center"
              : "max-w-[920px]"
          }
        >
          {eyebrow && (
            <div className="mb-5 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
              {eyebrow}
            </div>
          )}
          <h1 className="font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.04] tracking-[-0.03em] text-bone">
            {title}
          </h1>
          {sub && (
            <p className="mt-6 max-w-[620px] text-[17px] leading-[1.55] text-bone-dim">
              {sub}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className={`mt-8 flex flex-wrap items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-[14px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-white hover:-translate-y-px"
                >
                  {primaryCta.label}
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                </Link>
              )}
              {secondaryCta && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex h-11 items-center rounded-full border border-[var(--color-line-strong)] px-5 text-[14px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
