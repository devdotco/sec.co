import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "SEC.co is a senior cybersecurity team running a U.S. 24/7 security operations center for mid-market and enterprise clients. Founded on the idea that good security and good business are the same job.",
};

const VALUES = [
  {
    title: "Senior or nothing",
    body: "Every engagement is led by a practitioner who has owned the work in production — not a presales engineer handing off to juniors.",
  },
  {
    title: "Plain language",
    body: "We write executive readouts that a board reads in five minutes — and an engineer can act on the same afternoon.",
  },
  {
    title: "Independent of vendors",
    body: "We integrate with the tools you already pay for. No reseller margin. No platform lock-in.",
  },
  {
    title: "Show, don't sell",
    body: "Pilots, references, and a free risk checklist beat any slide. The right answer to most questions is a 2-week assessment.",
  },
];

const LEADERSHIP = [
  { name: "—", role: "Founder & CEO", focus: "Strategy, governance, board-level engagements" },
  { name: "—", role: "Head of Security Operations", focus: "24/7 SOC, MDR, threat hunting program" },
  { name: "—", role: "Head of Offensive Security", focus: "Red team, pen testing, app & API security" },
  { name: "—", role: "Head of Advisory", focus: "vCISO program, compliance, risk advisory" },
  { name: "—", role: "Head of Incident Response", focus: "IR retainers, emergency engagements, forensics" },
  { name: "—", role: "Head of Engineering", focus: "Security automation, detection engineering, internal tooling" },
];

const LOCATIONS = [
  { city: "Seattle, WA", tag: "Headquarters · SOC operations", region: "Pacific" },
  { city: "Austin, TX", tag: "Advisory & compliance practice", region: "Central" },
  { city: "Arlington, VA", tag: "Federal & defense practice", region: "Eastern" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            Senior cybersecurity, built like a{" "}
            <span className="brand-gradient-text">practitioner shop</span> — not a sales floor.
          </>
        }
        sub="SEC.co was founded on a simple bet: that mid-market and enterprise teams want senior cybersecurity work without the consultant-shop overhead. We run a U.S. SOC, an offensive testing team, an advisory practice, and an incident response retainer — staffed by people who have done the work in production."
        primaryCta={{ href: "/contact?topic=assessment", label: "Talk to leadership" }}
        secondaryCta={{ href: "/careers", label: "See open roles" }}
      />

      {/* Mission */}
      <section id="mission" className="border-y border-[var(--color-line)] bg-ink-1/30 scroll-mt-24">
        <Container width="wide" className="py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-start">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute md:pt-3">
              Mission
            </div>
            <div>
              <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.18] tracking-[-0.02em] text-bone">
                We exist to keep good companies operational under adversarial pressure — and to make
                cybersecurity feel like a working partnership, not a procurement event.
              </p>
              <p className="mt-6 max-w-2xl text-[15.5px] leading-relaxed text-bone-dim">
                That means owning the unglamorous parts of the job — the runbook, the on-call rotation,
                the board readout, the auditor binder. It means saying so when a control isn&apos;t worth the
                cost. And it means showing up at 3am when it matters, with a senior engineer answering the phone.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <Container width="wide" className="py-20 md:py-28">
        <SectionHeader
          eyebrow="What we believe"
          title="Four principles, in tension on purpose"
          sub="These show up in how we hire, how we scope, and how we say no to work that isn't the right fit."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
            >
              <div className="font-mono text-[12px] tracking-tight text-mute">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-1 font-display text-[20px] leading-tight text-bone">{v.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{v.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Team */}
      <section id="team" className="border-y border-[var(--color-line)] bg-ink-1/20 scroll-mt-24">
        <Container width="wide" className="py-20 md:py-24">
          <SectionHeader
            eyebrow="Leadership"
            title="Who runs each practice"
            sub="Headshots and bios coming soon — these are the seats, not the placeholder names."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((m) => (
              <div
                key={m.role}
                className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-5"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-2 text-bone-dim font-display text-lg">
                  {m.name}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                  {m.role}
                </div>
                <div className="mt-2 text-[13.5px] leading-relaxed text-bone-dim">{m.focus}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Locations */}
      <section id="locations" className="scroll-mt-24">
        <Container width="wide" className="py-20 md:py-24">
          <SectionHeader
            eyebrow="Where we work from"
            title="Three U.S. offices, one virtual SOC"
            sub="Our analysts are U.S. citizens, U.S.-based, and operate under U.S. data-sovereignty constraints. Important for federal, defense, and regulated industries."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {LOCATIONS.map((l) => (
              <div
                key={l.city}
                className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-5"
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                  {l.region}
                </div>
                <div className="mt-1.5 font-display text-[22px] leading-tight tracking-tight text-bone">
                  {l.city}
                </div>
                <div className="mt-1 text-[13px] text-bone-dim">{l.tag}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="border-t border-[var(--color-line)] bg-ink-1/40">
        <Container width="wide" className="py-20">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-[-0.02em] text-bone">
                The shortest path to working with us is a 30-minute call.
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-dim">
                Tell us what you&apos;re trying to get done. We&apos;ll tell you whether we&apos;re the right fit —
                and if we&apos;re not, who probably is.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/contact?topic=assessment"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-white hover:-translate-y-px"
              >
                Schedule a call
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/careers"
                className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[14px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
              >
                Join the team
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
