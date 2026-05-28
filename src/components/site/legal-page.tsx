import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalPageProps = {
  title: string;
  lastUpdated: string;
  effectiveDate?: string;
  summary: ReactNode;
  sections: LegalSection[];
  /** Closing block (e.g. contact details). */
  closing?: ReactNode;
};

export function LegalPage({
  title,
  lastUpdated,
  effectiveDate,
  summary,
  sections,
  closing,
}: LegalPageProps) {
  return (
    <article className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[360px] bg-aurora opacity-40" />

      {/* Header */}
      <Container width="content" className="pt-10 pb-10 md:pt-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] text-mute">
          <Link href="/" className="hover:text-bone">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-bone-dim">{title}</span>
        </nav>
        <h1 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.03em] text-bone">
          {title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[13px] text-mute">
          <span>Last updated: {lastUpdated}</span>
          {effectiveDate && <span>Effective: {effectiveDate}</span>}
        </div>
        <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-dim">{summary}</p>
      </Container>

      <Container width="content" className="pb-24">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Table of contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-mute">
                On this page
              </div>
              <nav aria-label="Table of contents">
                <ol className="space-y-2 text-[13px]">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="flex gap-2 text-bone-dim transition-colors hover:text-bone"
                      >
                        <span className="text-mute font-mono text-[11px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </aside>

          {/* Body */}
          <div className="legal-prose min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2>
                  <span className="mr-2 font-mono text-[0.7em] text-mute align-middle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}

            {closing && <div className="mt-12 border-t border-[var(--color-line)] pt-8">{closing}</div>}
          </div>
        </div>
      </Container>
    </article>
  );
}

/** Convenience inline components for authoring legal copy. */

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>;
}

export function Sub({ children }: { children: ReactNode }) {
  return <h3>{children}</h3>;
}
