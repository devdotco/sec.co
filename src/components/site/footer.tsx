import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/brand/wordmark";
import { FOOTER_COLUMNS } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-32 border-t border-[var(--color-line)] bg-ink-0">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(25,191,255,0.5), rgba(96,41,255,0.5), rgba(255,61,189,0.5), transparent)",
        }}
      />
      <Container width="wide" className="py-20">
        <div className="grid gap-14 md:grid-cols-[1.4fr_3fr]">
          {/* Brand block */}
          <div>
            <Wordmark size="lg" />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-bone-dim">
              SEC.co is a senior cybersecurity team operating 24/7 from a U.S.-based
              security operations center. We protect mid-market and enterprise
              companies from breach — and respond when one is underway.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["SOC 2 Type II", "ISO 27001", "CMMC L2", "FedRAMP"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-[var(--color-line)] px-2.5 py-1 text-[11px] font-medium tracking-tight text-bone-dim"
                >
                  {b}
                </span>
              ))}
            </div>
            <div className="mt-8">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                24/7 incident hotline
              </div>
              <a
                href="tel:+12062102954"
                className="mt-1 inline-block font-display text-3xl text-bone hover:text-white"
              >
                +1 (206) 210-2954
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="min-w-0">
                <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                  {col.title}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-[13.5px] text-bone-dim transition-colors hover:text-bone"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-line-subtle)] pt-6 text-[12.5px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} SEC.co. All rights reserved.</div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-bone">Privacy</Link>
            <Link href="/terms" className="hover:text-bone">Terms</Link>
            <Link href="/security" className="hover:text-bone">Security</Link>
            <Link href="/responsible-disclosure" className="hover:text-bone">Responsible Disclosure</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
