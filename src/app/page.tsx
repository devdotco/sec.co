import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ThreatFlow } from "@/components/site/threat-flow";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ThreatFlow />
    </>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Ambient layers */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-aurora" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(96,41,255,0.18), transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-grain" />

      <Container width="wide" className="relative pt-10 pb-20 md:pt-14 md:pb-24">
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[var(--color-line-strong)] bg-ink-1/60 px-3 py-1.5 backdrop-blur">
          <span
            aria-hidden
            className="relative flex h-1.5 w-1.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-signal-green)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-signal-green)]" />
          </span>
          <span className="text-[12px] font-medium tracking-tight text-bone-dim">
            24/7 SOC online · Avg breach response under 60 min
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display max-w-[1100px] text-[clamp(2.75rem,6.5vw,5.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-bone"
        >
<span className="brand-gradient-text">Cybersecurity</span> with eyes on your stack, 24/7.
          <br />
          Detect, contain, and <span className="brand-gradient-text">eradicate</span>
          <br className="hidden sm:block" /> before it becomes a breach.
        </h1>

        {/* Subhead */}
        <p className="mt-7 max-w-[640px] text-[18px] leading-[1.55] text-bone-dim">
          SEC.co is a senior cybersecurity team running a U.S.-based 24/7 SOC.
          We monitor your environment, hunt for adversaries, and lead response
          when minutes matter — backed by vCISO, compliance, and offensive
          testing programs designed for mid-market and enterprise teams.
        </p>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/contact?topic=assessment"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[15px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)]"
          >
            Get a Cyber Risk Assessment
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex h-12 items-center rounded-full border border-[var(--color-line-strong)] px-6 text-[15px] font-medium tracking-tight text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
          >
            Explore Services
          </Link>
          <Link
            href="/emergency"
            className="group inline-flex h-12 items-center gap-2 px-3 text-[14px] font-medium tracking-tight text-[var(--color-ember)] transition-colors hover:text-[var(--color-ember-bright)]"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-[var(--color-ember)] animate-pulse"
            />
            Under active attack? — Open hotline
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        {/* Stat strip */}
        <div className="mt-14 grid max-w-3xl grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4">
          {[
            { v: "<60m", l: "median breach\nresponse time" },
            { v: "24/7", l: "U.S.-staffed\nsecurity ops center" },
            { v: "12yr+", l: "avg analyst\ntenure on retainer" },
            { v: "100%", l: "SOC 2 audits\npassed first cycle" },
          ].map((s) => (
            <div key={s.v} className="border-l border-[var(--color-line)] pl-4">
              <div className="font-display text-3xl font-medium tracking-tight text-bone">
                {s.v}
              </div>
              <div className="mt-1.5 whitespace-pre-line text-[12.5px] leading-tight text-mute">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  const logos = [
    "Atlas Health",
    "Northwind Capital",
    "Helios AI",
    "Brightline",
    "Foundry Logistics",
    "Caldera Bank",
    "Vector Labs",
  ];
  return (
    <section className="border-y border-[var(--color-line)] bg-ink-1/40 py-10">
      <Container width="wide" className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute lg:max-w-[180px]">
          Trusted by regulated and high-growth teams
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-4 opacity-70">
          {logos.map((name) => (
            <span
              key={name}
              className="text-[15px] font-medium tracking-tight text-bone-dim grayscale"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
