import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";

export const metadata: Metadata = {
  title: "vCISO Services — Fractional Security Leadership",
  description:
    "Executive-grade cybersecurity leadership on retainer. Strategy, governance, board engagement, and program ownership — without the full-time hire.",
};

export default function VCisoPage() {
  return (
    <ServiceDetailPage
      config={{
        category: "Advisory & Governance",
        title: (
          <>
            Executive cybersecurity leadership,{" "}
            <span className="brand-gradient-text">on the schedule you need</span>.
          </>
        ),
        sub: "Most mid-market companies need CISO-level judgment well before they need a full-time CISO. Our vCISOs run your program — board reporting, risk strategy, compliance ownership, hiring, vendor strategy — at 4 to 16 hours a week, with a senior bench behind them.",
        primaryCta: { href: "/contact?topic=vciso", label: "Talk to a vCISO" },
        secondaryCta: { href: "/process", label: "How engagements work" },

        factStrip: [
          { label: "Engagement", value: "Retainer" },
          { label: "Cadence", value: "4–16 hrs / week" },
          { label: "Onboarding", value: "2 weeks" },
          { label: "Min term", value: "6 months" },
        ],

        included: {
          title: "What a vCISO actually does for you",
          sub: "These are the recurring deliverables — every engagement is tuned to your stage, industry, and risk profile.",
          items: [
            { title: "Security strategy & roadmap", body: "A 12-month plan, refreshed quarterly. What changes, when, and at what cost — translated into business risk." },
            { title: "Board & executive reporting", body: "Quarterly board materials and monthly executive readouts. Plain English, not heatmaps." },
            { title: "Risk register & policy ownership", body: "We maintain the risk register, write the policies, and run the exception process." },
            { title: "Compliance program ownership", body: "SOC 2, ISO 27001, HIPAA, CMMC — we own the program calendar, not just the audit week." },
            { title: "Vendor & tool strategy", body: "What to buy, what to consolidate, what to drop. No reseller bias — we don't sell tools." },
            { title: "Security hiring & team design", body: "Job specs, interview loops, comp benchmarks, and bench support while seats are open." },
            { title: "Incident readiness & response leadership", body: "Tabletop exercises, IR plan ownership, and senior in-the-seat leadership when an incident hits." },
            { title: "Customer & deal-team support", body: "Sales-cycle security calls, questionnaire response, and customer trust-center maintenance." },
          ],
        },

        process: {
          title: "From kickoff to operating cadence",
          sub: "Five steps. Most clients are running on the operating cadence by week six.",
          steps: [
            { eyebrow: "Week 1", title: "30-minute fit call", body: "We confirm scope, stage, industry, and the calendar of pressure points (audits, board cycles, fundraising, contracts)." },
            { eyebrow: "Weeks 1–2", title: "Onboarding & risk register", body: "Stakeholder interviews, stack review, and a starter risk register — calibrated to your actual revenue impact, not generic." },
            { eyebrow: "Week 3", title: "12-month roadmap", body: "Quarter-by-quarter plan with budget envelope, dependency map, and a defendable narrative for the board." },
            { eyebrow: "Ongoing", title: "Operating cadence", body: "Standing weekly leadership sync, monthly exec readout, quarterly board prep. Direct slack for between-meeting decisions." },
            { eyebrow: "Quarterly", title: "Review & re-plan", body: "What changed, what got worse, what should we focus on next? Roadmap is re-prioritized, not re-written." },
          ],
        },

        outcomes: {
          title: "What you walk away with",
          items: [
            "A 12-month security roadmap your board signs off on",
            "Risk register tied to revenue impact, not generic likelihood × impact",
            "Compliance program operating on a calendar — no fire drills",
            "Security questionnaire answer library for sales enablement",
            "Tabletop-tested incident response plan with named decision owners",
            "Defensible security narrative for customer trust calls",
            "Vendor stack consolidated where wasteful, hardened where deployed",
            "Hiring plan with comp benchmarks and a working interview loop",
          ],
        },

        differentiators: [
          { title: "Senior practitioners, not career consultants", body: "Every vCISO has owned in-house security leadership at a mid-market or enterprise org. They've signed the audit attestation. They've made the 3am call." },
          { title: "Bench depth behind one named lead", body: "Your vCISO is one person — but they're backed by our SOC, offensive team, advisory practice, and IR retainer. No 'I'll need to bring someone in next quarter'." },
          { title: "Independent of vendors", body: "We don't resell tools. The advice you get is calibrated to your stack, not our margin." },
          { title: "Comp transparency", body: "Day rate is published on the engagement letter. No mystery uplift, no hidden travel, no enterprise-edition tax." },
        ],

        faq: [
          { q: "How is this different from a security consultancy?", a: "A consultancy runs projects and leaves. A vCISO runs the program — they own the calendar, the board narrative, the policy library, and the next 12 months. Most clients use both: the vCISO owns the program, with project work routed through them." },
          { q: "When does it make sense to convert to a full-time CISO?", a: "Usually when the program needs more than 16 hours a week of leadership attention, and when there's a defensible internal candidate to step up. Many of our vCISOs help recruit and onboard their full-time replacement." },
          { q: "Can the vCISO testify to the board?", a: "Yes. We sign board materials, attend board meetings, and present quarterly. Many clients add their vCISO as an officer of the company for governance purposes." },
          { q: "What if we already have a security manager / director?", a: "Even better. A vCISO works above that role — providing strategy, board interface, and senior judgment — while letting your in-house person own operations and people." },
          { q: "How do you handle conflicts when we disagree?", a: "We document the recommendation, you make the call, and we don't sulk. If a pattern of conflict emerges, we end the engagement cleanly — no contract handcuffs." },
        ],

        related: [
          { href: "/services/cyber-risk-assessment", title: "Cyber Risk Assessment", body: "Most vCISO engagements start with a 2-week risk assessment to calibrate scope." },
          { href: "/services/cybersecurity-program-development", title: "Program Development", body: "When you need to build the program before you operate it." },
          { href: "/compliance/soc-2", title: "SOC 2 Readiness", body: "vCISOs commonly own SOC 2 readiness end-to-end." },
        ],

        finalCta: {
          title: <>Talk to a vCISO this week.</>,
          body: "30-minute fit call with a senior practitioner — no slide deck, no sales floor. We'll tell you whether a vCISO is the right fit, and if it isn't, what is.",
          primary: { href: "/contact?topic=vciso", label: "Book the call" },
          secondary: { href: "/services", label: "Browse all services" },
        },
      }}
    />
  );
}
