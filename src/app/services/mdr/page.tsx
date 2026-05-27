import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";

export const metadata: Metadata = {
  title: "Managed Detection & Response (MDR)",
  description:
    "24/7 monitoring, threat hunting, and human-led incident response across endpoint, identity, and cloud — operated from a U.S.-based SOC.",
};

export default function MdrPage() {
  return (
    <ServiceDetailPage
      config={{
        category: "Managed Security",
        title: (
          <>
            24/7 detection and response,{" "}
            <span className="brand-gradient-text">without you in the middle</span>.
          </>
        ),
        sub: "Our U.S.-based SOC monitors your endpoint, identity, and cloud telemetry around the clock. When something matters, a senior analyst triages it, contains it, and reports — with you informed, not paged at 3am.",
        primaryCta: { href: "/contact?topic=managed", label: "Talk to managed services" },
        secondaryCta: { href: "/services/incident-response-retainer", label: "Pair with an IR retainer" },

        factStrip: [
          { label: "Coverage", value: "24/7/365" },
          { label: "SOC location", value: "U.S." },
          { label: "Median triage", value: "4 min" },
          { label: "Onboarding", value: "2–4 weeks" },
        ],

        included: {
          title: "What's covered",
          sub: "Telemetry from every layer of your stack, normalized into one timeline. Analysts who hunt — not a queue-triage shop.",
          items: [
            { title: "Endpoint coverage (EDR / XDR)", body: "CrowdStrike, SentinelOne, Defender — we operate the platform you've already chosen." },
            { title: "Identity monitoring", body: "Okta, Entra, Google Workspace. Privilege escalation, MFA bypass, token theft, anomalous logins." },
            { title: "Cloud security monitoring", body: "AWS, Azure, GCP. CloudTrail, GuardDuty, Azure Activity, GCP audit logs — correlated against ATT&CK." },
            { title: "SaaS coverage", body: "M365, Google Workspace, Slack, GitHub, Salesforce, and the long tail. Account abuse, data exfiltration, OAuth grant theft." },
            { title: "Continuous threat hunting", body: "Hypothesis-driven hunts informed by current threat intel — not just queue triage." },
            { title: "Custom detection engineering", body: "Detections written, tuned, and version-controlled. We commit them to your repo; you keep them if we part ways." },
            { title: "Human-led response", body: "Pre-authorized containment actions: isolate hosts, revoke tokens, kill sessions, block C2. No bot-only decisions." },
            { title: "Monthly & quarterly reporting", body: "Executive readout monthly; quarterly review with detections trended, gaps surfaced, roadmap reprioritized." },
          ],
        },

        process: {
          title: "From kickoff to steady state",
          steps: [
            { eyebrow: "Week 1", title: "Telemetry inventory", body: "We map your stack, identify gaps, and propose the minimal additions for coverage. Most clients don't need new tools." },
            { eyebrow: "Weeks 1–3", title: "Onboarding & integration", body: "Sensors deployed, logs forwarded, detections tuned to your environment. We baseline your normal so we can spot abnormal." },
            { eyebrow: "Week 4", title: "Tabletop & response playbook", body: "We run a tabletop with your team to validate response authority, escalation paths, and communication chains." },
            { eyebrow: "Ongoing", title: "24/7 operations", body: "Continuous monitoring, hunting, and triage. Confirmed incidents trigger containment — pre-authorized, documented, audited." },
            { eyebrow: "Quarterly", title: "Review & re-tune", body: "Detections trended, false-positive rates analyzed, threat-intel coverage updated. Roadmap reprioritized." },
          ],
        },

        outcomes: {
          title: "What you walk away with",
          items: [
            "Median triage under 5 minutes across all production alerts",
            "Median containment under 60 minutes for confirmed incidents",
            "Threat-hunting program backed by current intel — not just queue work",
            "Detection-as-code in your repo, owned by you",
            "Monthly executive readouts that take 5 minutes to read",
            "Quarterly board-ready security narrative",
            "Authorized response actions documented and audited",
            "Confidence to take vacation",
          ],
        },

        differentiators: [
          { title: "U.S. SOC, U.S. citizens, U.S. data residency", body: "All analysts are U.S. citizens, U.S.-based. Required for federal, defense, and regulated industries — useful for everyone else." },
          { title: "Senior on every shift", body: "No tier-1 click-and-pass-to-tier-3. The person who picks up your alert can investigate it end-to-end." },
          { title: "We operate your existing tools", body: "Bring your EDR, SIEM, and identity provider. We engineer the platform you've already paid for." },
          { title: "Detection-as-code", body: "Every detection is version-controlled, peer-reviewed, and committed to a repo you can take with you. No platform lock-in." },
        ],

        faq: [
          { q: "Do we need to buy new tools?", a: "Usually no. We operate the EDR, SIEM, and identity platforms you already pay for. Most clients add 1–2 small additions to close coverage gaps; we tell you which ones in week 1." },
          { q: "What's your authority to act?", a: "Pre-authorized containment actions are documented in a response runbook that you sign off on during onboarding — typically: isolate host, disable account, revoke tokens, block IOC. Beyond that scope, we escalate to your named on-call." },
          { q: "How is this different from an MSSP?", a: "Traditional MSSPs run a queue and pass alerts back to you. We triage end-to-end, contain when we have authority, and respond as one team with your engineers." },
          { q: "What happens if you can't reach our team?", a: "Pre-authorized containment proceeds per your runbook. Communication continues via documented escalation paths. We've built this for the exact case where your team is unreachable — that's when MDR earns its keep." },
          { q: "Can we move to a different MDR later?", a: "Yes. Detections-as-code are yours, runbooks are yours, dashboards are yours. We've designed the engagement to be portable — though most clients stay." },
        ],

        related: [
          { href: "/services/incident-response-retainer", title: "Incident Response Retainer", body: "MDR + IR retainer is the standard pairing for serious programs." },
          { href: "/services/threat-hunting", title: "Threat Hunting", body: "Hypothesis-driven hunting included in every MDR engagement." },
          { href: "/services/managed-siem", title: "Managed SIEM", body: "If your SIEM is the bottleneck, start here." },
        ],

        finalCta: {
          title: <>Stop being your own SOC.</>,
          body: "Most engagements start with a coverage gap assessment — we map your current telemetry against ATT&CK and show you exactly where you're blind.",
          primary: { href: "/contact?topic=managed", label: "Get a coverage gap assessment" },
          secondary: { href: "/services/managed-security", label: "All managed security services" },
        },
      }}
    />
  );
}
