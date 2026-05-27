import Image from "next/image";
import { Container } from "@/components/ui/container";

/**
 * Detection → Response flow diagram for the homepage.
 *
 * 4 source surfaces (left)  →  SOC core (center)  →  4 response outcomes (right)
 * Animated dots flow along curved gradient paths; the SOC core pulses concentric rings.
 * Pure CSS / SVG — no JS runtime.
 */
export function ThreatFlow() {
  return (
    <section className="relative isolate overflow-hidden py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(96,41,255,0.10), transparent 70%)",
        }}
      />
      <Container width="wide">
        {/* Section header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
            Detection → Response
          </div>
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.05] tracking-[-0.025em] text-bone">
            From signal to containment,{" "}
            <span className="brand-gradient-text">without you in the middle</span>.
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-bone-dim">
            Telemetry from every layer of your stack feeds a continuously-staffed SOC.
            When something matters, our analysts triage, contain, and recover —
            with you informed, not paged at 3am.
          </p>
        </div>

        {/* Flow diagram */}
        <Diagram />

        {/* Lifecycle phases beneath */}
        <ol className="mt-20 grid gap-4 md:grid-cols-5">
          {PHASES.map((p, i) => (
            <li
              key={p.title}
              className="relative rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-5"
            >
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                <span className="brand-gradient-text font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.eyebrow}
              </div>
              <div className="mt-2 font-display text-[19px] leading-tight text-bone">
                {p.title}
              </div>
              <div className="mt-2 text-[13px] leading-relaxed text-bone-dim">
                {p.body}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

const PHASES = [
  {
    eyebrow: "Collect",
    title: "Unified telemetry",
    body: "Endpoint, identity, cloud, network, and SaaS feeds normalized into one timeline.",
  },
  {
    eyebrow: "Detect",
    title: "Correlated signal",
    body: "Our analytics + threat intel surface what matters and suppress what doesn't.",
  },
  {
    eyebrow: "Triage",
    title: "Human verdict",
    body: "A senior analyst reviews every escalation. No bot-only decisions on your environment.",
  },
  {
    eyebrow: "Contain",
    title: "Authorized action",
    body: "Isolate hosts, revoke tokens, kill sessions, block C2 — pre-approved playbooks.",
  },
  {
    eyebrow: "Recover",
    title: "Root cause + brief",
    body: "Forensic write-up, IOCs shared, hardening guidance — all within the same retainer.",
  },
];

// ─── Diagram ────────────────────────────────────────────────────────────────

const SOURCES = [
  { label: "Cloud", sub: "AWS · Azure · GCP", icon: IconCloud },
  { label: "Endpoint", sub: "Laptops · Servers", icon: IconEndpoint },
  { label: "Identity", sub: "Okta · Entra · Google", icon: IconIdentity },
  { label: "Network", sub: "Firewall · DNS · VPN", icon: IconNetwork },
];

const RESPONSES = [
  { label: "Isolate", sub: "Quarantine host", icon: IconIsolate },
  { label: "Block", sub: "Cut C2 traffic", icon: IconBlock },
  { label: "Notify", sub: "Slack · phone · email", icon: IconNotify },
  { label: "Recover", sub: "Restore & harden", icon: IconRecover },
];

function Diagram() {
  return (
    <div className="relative rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-10 backdrop-blur">
      {/* Soft inner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(96,41,255,0.08), transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 items-stretch gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        {/* Sources column */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
          {SOURCES.map((n, i) => (
            <FlowNode key={n.label} {...n} side="left" delay={i * 0.4} />
          ))}
        </div>

        {/* Core */}
        <div className="relative flex items-center justify-center md:px-6">
          <SocCore />
        </div>

        {/* Response column */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
          {RESPONSES.map((n, i) => (
            <FlowNode key={n.label} {...n} side="right" delay={i * 0.4 + 0.2} />
          ))}
        </div>
      </div>

      {/* Connecting lines + animated dots, drawn over the grid */}
      <ConnectingLines />

      {/* Diagram legend / annotation */}
      <div className="relative mt-8 flex flex-wrap items-center gap-6 border-t border-[var(--color-line-subtle)] pt-5 text-[12px] text-mute">
        <Legend dotColor="var(--color-brand-cyan)" label="Telemetry in" />
        <Legend dotColor="var(--color-brand-magenta)" label="Action out" />
        <span className="ml-auto inline-flex items-center gap-2">
          <span
            aria-hidden
            className="relative flex h-1.5 w-1.5"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-signal-green)] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-signal-green)]" />
          </span>
          SOC live · median triage 4 min
        </span>
      </div>
    </div>
  );
}

function Legend({ dotColor, label }: { dotColor: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
      />
      {label}
    </span>
  );
}

function FlowNode({
  label,
  sub,
  icon: Icon,
  side,
  delay,
}: {
  label: string;
  sub: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  side: "left" | "right";
  delay: number;
}) {
  return (
    <div
      className={`group/node relative flex items-center gap-3 rounded-xl border border-[var(--color-line)] bg-ink-1/80 px-4 py-3 transition-colors hover:border-bone-dim ${
        side === "right" ? "md:flex-row-reverse md:text-right" : ""
      }`}
      style={{ animation: `node-pulse 6s ${delay}s var(--ease-out-quint) infinite` }}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          side === "left" ? "bg-[rgba(25,191,255,0.10)]" : "bg-[rgba(255,61,189,0.10)]"
        }`}
      >
        <Icon
          className={
            side === "left"
              ? "text-[var(--color-brand-cyan)]"
              : "text-[var(--color-brand-magenta)]"
          }
        />
      </div>
      <div className="min-w-0">
        <div className="text-[13.5px] font-medium tracking-tight text-bone">
          {label}
        </div>
        <div className="text-[11.5px] text-mute">{sub}</div>
      </div>
    </div>
  );
}

function SocCore() {
  return (
    <div className="relative flex h-[200px] w-[200px] items-center justify-center md:h-[240px] md:w-[240px]">
      {/* Outer pulse rings */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full border border-[var(--color-brand-violet)]/30"
        style={{ animation: "ring-pulse 3.6s var(--ease-out-quint) infinite" }}
      />
      <span
        aria-hidden
        className="absolute inset-4 rounded-full border border-[var(--color-brand-violet)]/40"
        style={{ animation: "ring-pulse 3.6s 0.6s var(--ease-out-quint) infinite" }}
      />
      <span
        aria-hidden
        className="absolute inset-8 rounded-full border border-[var(--color-brand-violet)]/50"
        style={{ animation: "ring-pulse 3.6s 1.2s var(--ease-out-quint) infinite" }}
      />

      {/* Core badge */}
      <div className="relative flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-ink-0 brand-gradient-border">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(96,41,255,0.25), transparent 70%)",
          }}
        />
        <Image
          src="/brand/shield-gradient.png"
          alt=""
          width={42}
          height={42}
          className="relative"
          aria-hidden
        />
        <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-bone-dim">
          SEC.co SOC
        </div>
        <div className="text-[9.5px] text-mute">24/7 · U.S. staffed</div>
      </div>
    </div>
  );
}

function ConnectingLines() {
  // Decorative gradient sparkline streaks. Rendered absolutely behind the nodes.
  // Each streak is a thin gradient bar that travels across with a CSS animation.
  // Only visible on md+ where the 3-column layout exists.
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-hidden rounded-3xl md:block"
    >
      {/* 4 inbound streaks (left → center), staggered */}
      {[0, 1, 2, 3].map((i) => (
        <span
          key={`in-${i}`}
          className="absolute left-[30%] h-px w-[20%] origin-left"
          style={{
            top: `${22 + i * 18}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(25,191,255,0.55) 30%, rgba(96,41,255,0.55) 70%, transparent)",
            animation: `streak-in 3.2s ${i * 0.45}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
      {/* 4 outbound streaks (center → right), staggered */}
      {[0, 1, 2, 3].map((i) => (
        <span
          key={`out-${i}`}
          className="absolute right-[30%] h-px w-[20%] origin-right"
          style={{
            top: `${22 + i * 18}%`,
            background:
              "linear-gradient(90deg, transparent, rgba(96,41,255,0.55) 30%, rgba(255,61,189,0.55) 70%, transparent)",
            animation: `streak-out 3.2s ${i * 0.45 + 0.6}s linear infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

// ─── Inline icons (16×16 viewport, currentColor) ────────────────────────────

function IconCloud({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.4A4 4 0 1 1 17 18H7Z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
function IconEndpoint({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconIdentity({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconNetwork({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 12h16M12 4c2.5 2.4 2.5 13.2 0 16M12 4c-2.5 2.4-2.5 13.2 0 16" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
function IconIsolate({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconBlock({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.2 6.2l11.6 11.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconNotify({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function IconRecover({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M20 12a8 8 0 1 1-3-6.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 4v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
