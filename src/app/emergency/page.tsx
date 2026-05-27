import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Emergency Breach Response — 24/7 Hotline",
  description:
    "Active intrusion, ransomware, or business-email-compromise underway? SEC.co mobilizes an incident response team within the hour. U.S.-staffed 24/7 hotline.",
};

const PHONE_DISPLAY = "+1 (206) 210-2954";
const PHONE_HREF = "tel:+12062102954";

export default function EmergencyPage() {
  return (
    <>
      {/* Hero / hotline */}
      <section className="relative isolate overflow-hidden">
        {/* Ember urgency wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255,107,53,0.22), transparent 65%), radial-gradient(ellipse 50% 40% at 90% 30%, rgba(255,61,189,0.10), transparent 70%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grid opacity-30" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grain" />

        <Container width="wide" className="relative pt-10 pb-14 md:pt-14 md:pb-20">
          {/* Status pill */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,107,53,0.5)] bg-[rgba(255,107,53,0.08)] px-3 py-1.5 backdrop-blur">
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-ember)] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-ember)]" />
            </span>
            <span className="text-[12px] font-medium tracking-tight text-[var(--color-ember-bright)]">
              24/7 hotline · U.S. analysts on call right now
            </span>
          </div>

          <h1 className="font-display max-w-[1000px] text-[clamp(2.5rem,5.5vw,5rem)] font-medium leading-[1.02] tracking-[-0.035em] text-bone">
            Under attack?{" "}
            <span className="text-[var(--color-ember)]">Call us first</span>,
            <br className="hidden md:block" /> contain the intrusion next.
          </h1>

          <p className="mt-6 max-w-[640px] text-[18px] leading-[1.55] text-bone-dim">
            Ransomware, business-email compromise, an alert nobody can explain — when minutes matter,
            our senior responders mobilize within the hour. Skip the form. Pick up the phone.
          </p>

          {/* Phone CTA */}
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
            <a
              href={PHONE_HREF}
              className="group inline-flex h-16 items-center gap-3 rounded-full bg-[var(--color-ember)] px-7 text-ink-0 transition-all duration-200 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px shadow-[0_0_0_1px_rgba(255,107,53,0.55),0_18px_60px_-12px_rgba(255,107,53,0.55)]"
            >
              <PhoneIcon />
              <span className="font-display text-[28px] font-medium tracking-tight">
                {PHONE_DISPLAY}
              </span>
            </a>
            <div className="text-[13px] leading-snug text-bone-dim">
              Calls are answered by a senior security engineer.<br />
              No queues, no triage form.
            </div>
          </div>

          {/* Trust ribbon */}
          <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 sm:grid-cols-4 max-w-3xl">
            {[
              { v: "<60m", l: "median first-call\nto containment work" },
              { v: "24/7", l: "U.S.-staffed\nsecurity ops center" },
              { v: "Senior", l: "every responder is a\nlead-grade engineer" },
              { v: "Retainer\nor on-demand", l: "no contract required\nto get help today" },
            ].map((s) => (
              <div key={s.l} className="border-l border-[rgba(255,107,53,0.30)] pl-4">
                <div className="font-display whitespace-pre-line text-2xl font-medium tracking-tight text-bone">
                  {s.v}
                </div>
                <div className="mt-1.5 whitespace-pre-line text-[12px] leading-tight text-mute">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What to do RIGHT NOW */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/30">
        <Container width="wide" className="py-20">
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
              While you wait for us to pick up
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-bone">
              Five things to do <span className="text-[var(--color-ember)]">in the next five minutes</span>
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-5">
            {DO_NOW.map((step, i) => (
              <li
                key={step.title}
                className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-5"
              >
                <div className="font-mono text-[12px] font-medium tracking-tight text-[var(--color-ember)]">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 font-display text-[19px] leading-tight text-bone">
                  {step.title}
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-bone-dim">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-[13.5px] leading-relaxed text-mute">
            <strong className="text-bone-dim">Don&apos;t:</strong> wipe the affected machine, restart from a backup
            before scope is known, pay a ransom demand, or alert the attacker that you&apos;ve detected them. We&apos;ll
            walk you through it on the call.
          </p>
        </Container>
      </section>

      {/* Scenarios */}
      <Container width="wide" className="py-20 md:py-28">
        <div className="mb-12 max-w-3xl">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
            Common scenarios
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-bone">
            We&apos;ve seen this exact situation before
          </h2>
          <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-bone-dim">
            If any of these sound like what you&apos;re looking at, pick up the phone now and walk us through it.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-[var(--color-line)] bg-ink-1/40 p-6"
            >
              <h3 className="font-display text-[18px] leading-tight tracking-tight text-bone">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-bone-dim">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Final CTA */}
      <section className="relative isolate overflow-hidden border-t border-[var(--color-line)]">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,107,53,0.14), transparent 70%)",
          }}
        />
        <Container width="wide" className="py-20 text-center">
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] tracking-[-0.02em] text-bone">
            Don&apos;t spend the first hour on a form.
          </h2>
          <a
            href={PHONE_HREF}
            className="group mt-6 inline-flex h-14 items-center gap-3 rounded-full bg-[var(--color-ember)] px-7 text-ink-0 transition-all duration-200 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px"
          >
            <PhoneIcon />
            <span className="font-display text-[22px] font-medium tracking-tight">{PHONE_DISPLAY}</span>
          </a>
          <p className="mt-4 text-[13px] text-bone-dim">
            Not under active attack?{" "}
            <Link href="/services/incident-response-retainer" className="text-bone underline-offset-2 hover:underline">
              Set up an IR retainer
            </Link>{" "}
            so we&apos;re ready before the call is urgent.
          </p>
        </Container>
      </section>
    </>
  );
}

const DO_NOW = [
  {
    title: "Disconnect, don't power off",
    body: "Pull network cables / disable Wi-Fi on suspected hosts. Don't shut them down — volatile memory is evidence.",
  },
  {
    title: "Preserve logs",
    body: "Snapshot EDR, SIEM, mail, identity provider, and cloud audit logs. Lock retention so nothing rolls off.",
  },
  {
    title: "Convene a small bridge",
    body: "Tight call: IT lead, security lead, legal/comms decision-maker. Don't broadcast widely yet.",
  },
  {
    title: "Inventory what you know",
    body: "First indicator. Time of detection. Affected accounts / hosts / data. Don't speculate — record observations.",
  },
  {
    title: "Don't tip off the actor",
    body: "Don't email or message the threat actor. Don't change credentials in a way that signals you've seen them.",
  },
];

const SCENARIOS = [
  {
    title: "Ransomware note on a workstation",
    body: "Files encrypted, a note demanding payment. We help with scope, negotiation support, restoration, and root-cause work.",
  },
  {
    title: "Suspicious wire-transfer request",
    body: "A vendor or executive 'changed banking details' — and you're not sure if the email chain was hijacked.",
  },
  {
    title: "Unfamiliar admin in your identity provider",
    body: "A new admin account, an MFA bypass, or unexplained role assignments in Okta / Entra / Google Workspace.",
  },
  {
    title: "Mass-emailed phishing from an internal address",
    body: "Looks like an employee's mailbox is sending phishing externally — almost always a business-email-compromise.",
  },
  {
    title: "EDR / antivirus alerts spiking",
    body: "More detections than usual on multiple hosts, or a single alert your team can't explain away.",
  },
  {
    title: "Customer reporting fraudulent activity",
    body: "Account takeovers, fraudulent charges, suspicious password resets — often the first signal of a credential leak.",
  },
];

function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="opacity-90"
    >
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
