import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join SEC.co — a senior cybersecurity practice hiring SOC analysts, detection engineers, offensive operators, IR consultants, and vCISOs.",
};

const PRINCIPLES = [
  {
    title: "We hire senior.",
    body: "Junior hiring is rare and intentional. The vast majority of roles require 5+ years of doing the work in production.",
  },
  {
    title: "We pay above market.",
    body: "Top-quartile cash, real equity, and the benefits package below. Pay transparency on every job post.",
  },
  {
    title: "We don't pull all-nighters as a culture.",
    body: "Incident response is shift-rotated. On-call has comp time. Burnout is a recruiting problem, not a badge.",
  },
  {
    title: "We're U.S.-only by design.",
    body: "Our client work often requires U.S. citizens (federal, defense, regulated). We hire U.S. citizens, U.S.-based.",
  },
];

const BENEFITS = [
  "100% remote · 3 in-person offsites a year",
  "Top-quartile cash compensation",
  "Real equity in the firm",
  "Unlimited PTO with a 4-week minimum",
  "Full medical, dental, vision for you + family",
  "$5k/year training & certification budget",
  "$2k/year home-office stipend",
  "401(k) with 4% match",
  "16 weeks paid parental leave",
];

const OPEN_ROLES = [
  { team: "Security Operations", title: "Senior SOC Analyst (Tier 3)", location: "Remote · U.S.", type: "Full-time" },
  { team: "Security Operations", title: "Detection Engineer (Splunk / Sentinel)", location: "Remote · U.S.", type: "Full-time" },
  { team: "Incident Response", title: "Principal IR Consultant", location: "Remote · U.S.", type: "Full-time" },
  { team: "Incident Response", title: "DFIR Forensic Analyst", location: "Remote · U.S.", type: "Full-time" },
  { team: "Offensive Security", title: "Senior Penetration Tester (Web / API)", location: "Remote · U.S.", type: "Full-time" },
  { team: "Offensive Security", title: "Red Team Operator", location: "Remote · U.S.", type: "Full-time" },
  { team: "Advisory", title: "vCISO — Healthcare practice", location: "Remote · U.S.", type: "Full-time" },
  { team: "Advisory", title: "CMMC Lead Consultant", location: "Remote · U.S. (clearance preferred)", type: "Full-time" },
  { team: "Engineering", title: "Security Automation Engineer", location: "Remote · U.S.", type: "Full-time" },
  { team: "Engineering", title: "Site Reliability Engineer (Internal Platform)", location: "Remote · U.S.", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Senior cybersecurity work,{" "}
            <span className="brand-gradient-text">without the BS</span>.
          </>
        }
        sub="We're hiring across SOC operations, detection engineering, incident response, offensive testing, advisory, and security engineering. All roles are U.S. remote with top-quartile compensation and real equity."
        primaryCta={{ href: "#open-roles", label: "See open roles" }}
        secondaryCta={{ href: "mailto:careers@sec.co", label: "careers@sec.co" }}
      />

      {/* Principles */}
      <Container width="wide" className="py-20 md:py-28">
        <SectionHeader
          eyebrow="How we hire"
          title="What this place feels like"
          sub="Read these carefully. If any of them sound wrong, this probably isn't the right fit."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
            >
              <div className="font-mono text-[12px] text-mute">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-1 font-display text-[20px] leading-tight text-bone">{p.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-bone-dim">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Benefits */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/30">
        <Container width="wide" className="py-20">
          <SectionHeader
            eyebrow="Compensation & benefits"
            title="What you actually get"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-ink-1/40 px-4 py-3 text-[14px] text-bone-dim"
              >
                <span
                  aria-hidden
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-violet)]"
                />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Open roles */}
      <Container width="wide" className="py-20 md:py-28" id="open-roles">
        <SectionHeader
          eyebrow="Open roles"
          title="Where we're hiring right now"
          sub="Don't see your role? Email careers@sec.co — we're always interested in senior practitioners."
        />
        <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
          <table className="w-full text-left">
            <thead className="bg-ink-1/60">
              <tr className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                <th className="px-5 py-3.5">Role</th>
                <th className="hidden px-5 py-3.5 md:table-cell">Team</th>
                <th className="hidden px-5 py-3.5 lg:table-cell">Location</th>
                <th className="hidden px-5 py-3.5 lg:table-cell">Type</th>
                <th aria-hidden className="w-12 px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-line)]">
              {OPEN_ROLES.map((r) => (
                <tr
                  key={r.title}
                  className="group bg-ink-1/30 transition-colors hover:bg-ink-2"
                >
                  <td className="px-5 py-5">
                    <Link
                      href={`mailto:careers@sec.co?subject=${encodeURIComponent(r.title)}`}
                      className="block"
                    >
                      <div className="font-display text-[17px] leading-tight tracking-tight text-bone group-hover:text-white">
                        {r.title}
                      </div>
                      <div className="mt-1 text-[12.5px] text-mute md:hidden">
                        {r.team} · {r.location}
                      </div>
                    </Link>
                  </td>
                  <td className="hidden px-5 py-5 text-[13.5px] text-bone-dim md:table-cell">{r.team}</td>
                  <td className="hidden px-5 py-5 text-[13.5px] text-bone-dim lg:table-cell">{r.location}</td>
                  <td className="hidden px-5 py-5 text-[13.5px] text-mute lg:table-cell">{r.type}</td>
                  <td className="px-5 py-5 text-right">
                    <span
                      aria-hidden
                      className="text-mute transition-transform group-hover:translate-x-0.5 group-hover:text-bone"
                    >
                      →
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-[13px] text-mute">
          To apply: email <a href="mailto:careers@sec.co" className="text-bone hover:underline">careers@sec.co</a>{" "}
          with the role title in the subject and a short note about the closest work you&apos;ve done. No cover letters required.
        </p>
      </Container>
    </>
  );
}
