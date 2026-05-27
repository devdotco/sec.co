import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";

export const metadata: Metadata = {
  title: "Incident Response Retainer",
  description:
    "Pre-negotiated SLAs, named response team, and a runbook tuned to your environment — so the worst day starts with the right people already in motion.",
};

export default function IrRetainerPage() {
  return (
    <ServiceDetailPage
      config={{
        category: "Incident Response",
        title: (
          <>
            The worst day starts{" "}
            <span className="brand-gradient-text">with the right people already in motion</span>.
          </>
        ),
        sub: "An IR retainer is the cheapest insurance policy you'll buy. Pre-negotiated SLAs, a named response team that's already learned your environment, a runbook tuned to your stack — so when minutes matter, you don't lose them to procurement.",
        primaryCta: { href: "/contact?topic=ir", label: "Set up a retainer" },
        secondaryCta: { href: "/emergency", label: "Active incident now?", },

        factStrip: [
          { label: "SLA", value: "1 hour" },
          { label: "Coverage", value: "24/7" },
          { label: "Named team", value: "Yes" },
          { label: "Hours roll", value: "Quarterly" },
        ],

        included: {
          title: "What the retainer guarantees",
          sub: "Every retainer client gets the same operational guarantees — coverage scales with hour bucket.",
          items: [
            { title: "1-hour response SLA, 24/7", body: "From your call to a senior responder on the bridge in under an hour — any day, any time, including holidays." },
            { title: "Named response team", body: "Same lead responder and bench every time. They've read your IR plan, walked your network diagram, and tabletop'd with your team." },
            { title: "Environment-tuned runbook", body: "Your IR runbook lives in our system. Contacts, escalation paths, change-window rules, sensitive systems — pre-loaded." },
            { title: "Pre-authorized containment actions", body: "Documented during onboarding: isolate hosts, disable accounts, revoke tokens, block IOCs. No 'do we have authority' questions at 3am." },
            { title: "Pre-positioned legal & breach coach", body: "We're pre-positioned with your breach coach and outside counsel. Privilege workflows are pre-agreed." },
            { title: "Quarterly tabletop", body: "One tabletop exercise per quarter, scenario-customized to your industry. Surfaces playbook gaps before adversaries do." },
            { title: "Hours roll quarter to quarter", body: "Unused retainer hours roll forward. No use-it-or-lose-it dynamic that incentivizes wasted exercises." },
            { title: "Post-incident retrospective", body: "Every engagement closes with a 90-minute retro covering root cause, control gaps, communication review, and hardening recommendations." },
          ],
        },

        process: {
          title: "From retainer signing to readiness",
          steps: [
            { eyebrow: "Week 1", title: "Retainer scoping", body: "We agree on hour bucket, response SLA, on-call routing, and pre-authorized response actions. Fixed retainer fee." },
            { eyebrow: "Weeks 1–3", title: "Environment onboarding", body: "Asset inventory, identity map, EDR/SIEM access, change-window rules, sensitive systems. Your environment is loaded into our IR platform." },
            { eyebrow: "Week 4", title: "First tabletop", body: "Scenario-customized exercise with your IT, security, legal, and executive teams. Surfaces gaps in escalation, communication, and authority." },
            { eyebrow: "Ongoing", title: "Always on, on standby", body: "24/7/365 readiness. Quarterly tabletops, runbook updates, and contact verification keep the retainer warm." },
            { eyebrow: "When an incident hits", title: "1-hour response", body: "Bridge opens, named responders join, containment work begins per pre-authorized runbook. Communication continues per documented escalation." },
          ],
        },

        outcomes: {
          title: "What you walk away with",
          items: [
            "Confidence that the worst day has a 1-hour-to-bridge response",
            "Pre-positioned legal and breach-coach relationships",
            "Documented runbook that survives staff turnover",
            "Quarterly-validated tabletop muscle memory",
            "Audit-evidence: incident readiness for SOC 2, ISO 27001, HITRUST, CMMC",
            "Cyber-insurance underwriting leverage (better premiums, better terms)",
            "Pre-authorized containment, documented for audit",
            "No procurement at 3am",
          ],
        },

        differentiators: [
          { title: "Named responders, not a queue", body: "You get the same lead responder every time. They learn your environment once and remember it." },
          { title: "Hours roll forward", body: "Unused retainer hours roll quarter to quarter. We don't incentivize waste, and you don't lose budget you didn't need to use." },
          { title: "Senior on every call", body: "Every incident is led by a principal-grade responder. No tier-1 triage filtering before you get help." },
          { title: "Cyber insurance leverage", body: "Retainer letters are commonly accepted by carriers for underwriting credit. We work directly with your broker if helpful." },
        ],

        faq: [
          { q: "Do we need a retainer to call you in an incident?", a: "No. Our 24/7 emergency hotline accepts non-retainer callers and we'll mobilize on a time-and-materials basis. But you'll be one of several in queue, and we won't know your environment. Retained clients always get priority." },
          { q: "How big should our hour bucket be?", a: "Most clients start with 40–80 hours per year. That covers quarterly tabletops, runbook maintenance, and a moderate incident. We'll right-size after a 30-min scoping call." },
          { q: "What if we never use it?", a: "Most clients use a portion for tabletops, runbook updates, and the occasional 'is this a thing?' triage call. Retainer hours roll forward — there's no penalty for staying lucky." },
          { q: "Can our cyber insurance carrier credit this?", a: "Yes — most carriers credit IR retainers as a control during underwriting. We provide retainer letters in the format your broker needs." },
          { q: "What happens if we exceed our hour bucket during an incident?", a: "We continue working at the contracted hourly rate. The clock doesn't stop because the bucket is empty — but you have visibility into burn rate hour-by-hour during the engagement." },
        ],

        related: [
          { href: "/services/mdr", title: "Managed Detection & Response", body: "MDR + IR retainer is the standard pairing for serious programs." },
          { href: "/services/tabletop-exercises", title: "Tabletop Exercises", body: "Standalone tabletops, separate from a retainer if needed." },
          { href: "/services/ransomware-response", title: "Ransomware Response", body: "Specialized ransomware lifecycle handling within or outside a retainer." },
        ],

        finalCta: {
          title: <>Don&apos;t shop for IR during an incident.</>,
          body: "A 30-minute call now means a 1-hour-to-bridge response the day you need it. Most retainers are signed within two weeks.",
          primary: { href: "/contact?topic=ir", label: "Set up a retainer" },
          secondary: { href: "/emergency", label: "Active incident — call now" },
        },
      }}
    />
  );
}
