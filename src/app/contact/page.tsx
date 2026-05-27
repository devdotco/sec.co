import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SEC.co — assessment scheduling, compliance advisory, M&A diligence, or the 24/7 incident response hotline.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Tell us what you&apos;re dealing with —{" "}
            <span className="brand-gradient-text">we&apos;ll route you to the right person</span>.
          </>
        }
        sub="Most inquiries get a substantive reply within four business hours. If you're under active attack, please call the emergency hotline below instead of using the form."
      />

      <Container width="wide" className="pb-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Suspense
            fallback={
              <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-10 text-bone-dim">
                Loading form…
              </div>
            }
          >
            <ContactForm />
          </Suspense>

          {/* Side rail */}
          <aside className="space-y-6">
            <div
              className="relative overflow-hidden rounded-3xl border p-6"
              style={{
                borderColor: "rgba(255,107,53,0.40)",
                background:
                  "linear-gradient(155deg, rgba(255,107,53,0.10), rgba(255,107,53,0.02) 60%), var(--color-ink-1)",
              }}
            >
              <div className="mb-3 inline-flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-ember-bright)]">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-ember)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />
                </span>
                24/7 incident hotline
              </div>
              <h3 className="font-display text-[22px] leading-[1.15] text-bone">
                Under active attack?
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-bone-dim">
                Skip the form. Calls are answered by a senior responder, not a queue.
              </p>
              <a
                href="tel:+12062102954"
                className="mt-4 inline-block font-display text-3xl leading-tight text-[var(--color-ember)] hover:text-[var(--color-ember-bright)]"
              >
                +1 (206) 210-2954
              </a>
              <div className="mt-4">
                <Link
                  href="/emergency"
                  className="inline-flex h-10 items-center justify-center rounded-full bg-[var(--color-ember)] px-4 text-[13px] font-semibold tracking-tight text-ink-0 transition-colors hover:bg-[var(--color-ember-bright)]"
                >
                  Open Emergency Response
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6">
              <div className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.18em] text-mute">
                General inquiries
              </div>
              <dl className="space-y-3 text-[14px]">
                <div>
                  <dt className="text-mute">Email</dt>
                  <dd>
                    <a href="mailto:hello@sec.co" className="text-bone hover:text-white">
                      hello@sec.co
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-mute">Response time</dt>
                  <dd className="text-bone-dim">Substantive reply within 4 business hours, M–F.</dd>
                </div>
                <div>
                  <dt className="text-mute">Hours</dt>
                  <dd className="text-bone-dim">Office: M–F 8a–6p PT · SOC: 24/7</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6">
              <div className="mb-3 text-[10.5px] font-medium uppercase tracking-[0.18em] text-mute">
                Faster paths
              </div>
              <ul className="space-y-2.5 text-[14px]">
                <li>
                  <Link href="/tools/compliance-quiz" className="text-bone hover:text-white">
                    → Compliance readiness quiz
                  </Link>
                </li>
                <li>
                  <Link href="/resources/downloads/cyber-risk-checklist" className="text-bone hover:text-white">
                    → Download the cyber risk checklist
                  </Link>
                </li>
                <li>
                  <Link href="/industries/ma-due-diligence" className="text-bone hover:text-white">
                    → M&amp;A cyber diligence (for PE / sponsors)
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
