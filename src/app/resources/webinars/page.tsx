import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Webinars",
  description: "Live and recorded sessions with the SEC.co practice — threat retrospectives, compliance walkthroughs, and live incident-response tabletops.",
};

const UPCOMING = [
  { date: "TBD", title: "CMMC Level 2 — what most assessment failures have in common", presenter: "Head of Advisory" },
  { date: "TBD", title: "Live ransomware tabletop — executive edition", presenter: "Head of Incident Response" },
  { date: "TBD", title: "AI security in production — what's actually working", presenter: "Solutions practice" },
];

export default function WebinarsPage() {
  return (
    <>
      <PageHero
        eyebrow="Webinars"
        title={
          <>
            Live sessions, recorded for later, <span className="brand-gradient-text">no fluff</span>.
          </>
        }
        sub="Practitioner-led sessions on the topics we get asked about most. Free, no sales floor, recordings posted within 48 hours."
        primaryCta={{ href: "/contact?topic=newsletter", label: "Get notified" }}
      />

      <Container width="wide" className="py-16 md:py-24">
        <div className="mb-8 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
          Upcoming
        </div>
        <ul className="divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {UPCOMING.map((w) => (
            <li key={w.title} className="flex flex-col gap-2 bg-ink-1/40 px-5 py-5 transition-colors hover:bg-ink-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display text-[18px] leading-tight tracking-tight text-bone">
                  {w.title}
                </div>
                <div className="mt-1 text-[12.5px] text-mute">{w.presenter} · {w.date}</div>
              </div>
              <Link
                href="/contact?topic=newsletter"
                className="inline-flex h-9 items-center rounded-full border border-[var(--color-line-strong)] px-3.5 text-[12.5px] font-medium text-bone hover:bg-ink-2 hover:border-bone-dim transition-colors"
              >
                Notify me
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-10 text-center">
          <div className="font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-tight tracking-[-0.02em] text-bone">
            Recordings archive — coming soon
          </div>
          <p className="mt-3 mx-auto max-w-xl text-[14.5px] leading-relaxed text-bone-dim">
            Past sessions migrating from the legacy site. Subscribe to the newsletter to get the recording link as each goes up.
          </p>
        </div>
      </Container>
    </>
  );
}
