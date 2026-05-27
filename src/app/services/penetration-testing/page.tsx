import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";

export const metadata: Metadata = {
  title: "Penetration Testing",
  description:
    "Adversary-simulation testing for networks, infrastructure, and external perimeter. Exploit narratives, business-impact write-ups, and remediation guidance — not just a CVE dump.",
};

export default function PenTestingPage() {
  return (
    <ServiceDetailPage
      config={{
        category: "Security Testing",
        title: (
          <>
            Adversary simulation,{" "}
            <span className="brand-gradient-text">not vulnerability scanning</span>.
          </>
        ),
        sub: "We test the way an adversary would actually attack — chaining vulnerabilities, abusing trust relationships, pivoting through identity. You get exploit narratives, business-impact framing, and remediation guidance ranked by risk. Scanners can't do this.",
        primaryCta: { href: "/contact?topic=testing", label: "Scope a pen test" },
        secondaryCta: { href: "/services/red-team-assessment", label: "Compare to red team" },

        factStrip: [
          { label: "Engagement", value: "Project" },
          { label: "Typical duration", value: "2–4 weeks" },
          { label: "Team", value: "OSCP / CRTO / OSCE" },
          { label: "Deliverable", value: "Narrative report" },
        ],

        included: {
          title: "What we test",
          sub: "We scope precisely so the work targets your actual risk — not a generic checklist.",
          items: [
            { title: "External penetration testing", body: "Internet-exposed perimeter: web apps, APIs, VPN, mail, DNS, and the long tail. We test what an unauthenticated adversary can reach." },
            { title: "Internal penetration testing", body: "What happens after initial access. Active Directory abuse, lateral movement, privilege escalation, data exfiltration paths." },
            { title: "Cloud penetration testing", body: "AWS, Azure, GCP. Identity misuse, role-chain abuse, public storage, metadata service exposure, lambda privesc." },
            { title: "Network & wireless testing", body: "Segmentation validation, wireless attack surface, VLAN hopping, IoT exposure in production environments." },
            { title: "Social engineering", body: "Targeted phishing and pretext campaigns scoped to your environment — designed to validate awareness training and IR detection." },
            { title: "Exploit narrative & chaining", body: "Every finding is presented as a narrative: how the adversary got in, what they could reach, why it matters to the business." },
            { title: "Risk-ranked remediation", body: "Findings prioritized by exploitability × business impact — not CVSS score. Engineering-ready fix guidance, not just descriptions." },
            { title: "Retest included", body: "30-day retest of remediated findings included in every engagement. You shouldn't have to pay twice to confirm the fix." },
          ],
        },

        process: {
          title: "From scoping to retest",
          steps: [
            { eyebrow: "Week 0", title: "Scoping call", body: "We agree on targets, methodology, testing windows, and rules of engagement. Fixed-price SOW with named lead testers." },
            { eyebrow: "Week 1", title: "Reconnaissance & discovery", body: "Passive recon, asset discovery, attack-surface mapping. Most clients learn something here about what's actually exposed." },
            { eyebrow: "Weeks 1–3", title: "Active testing", body: "Manual exploitation work, paired with automated tooling where useful. We chain findings — a 'low' that enables a 'critical' isn't a low." },
            { eyebrow: "Week 3", title: "Report draft & debrief", body: "Findings written up with executive summary, technical detail, and exploit narratives. 90-minute debrief with engineering and leadership." },
            { eyebrow: "Day 30", title: "Retest", body: "30-day window to remediate. We retest fixed findings and update the report. You can share the final report with auditors and customers." },
          ],
        },

        outcomes: {
          title: "What you walk away with",
          items: [
            "Executive summary your board can read in 5 minutes",
            "Technical findings with full exploit narratives",
            "Risk-ranked remediation roadmap (exploitability × business impact)",
            "Engineering-ready fix guidance per finding",
            "Retest report confirming remediations",
            "Audit-ready evidence for SOC 2, ISO 27001, PCI, HITRUST, CMMC",
            "Customer-shareable attestation letter",
            "Confidence that you've been tested by humans, not just scanners",
          ],
        },

        differentiators: [
          { title: "We chain findings", body: "Scanners report individual vulnerabilities. We chain them into attack paths and tell you which combinations actually matter. A 'low' that enables a 'critical' isn't a low." },
          { title: "Narrative reports", body: "Every finding is a story: how the adversary got in, what they touched, why it matters to your business. Auditors and executives can both read it." },
          { title: "Retest included", body: "30-day retest is in scope, not a change order. You shouldn't have to pay twice to confirm the fix." },
          { title: "Senior testers only", body: "Every test is led by an OSCP / CRTO / OSCE-certified senior tester. No bait-and-switch where a senior scopes and juniors execute." },
        ],

        faq: [
          { q: "How is this different from a vulnerability scan?", a: "A vulnerability scan finds known issues from a signature database. A pen test demonstrates whether and how those (and unknown) issues can be exploited and chained against your specific environment. Both have a place — but they're not substitutes." },
          { q: "Will this break production?", a: "Standard engagements use non-destructive techniques and avoid production-impact tests. If you want destructive testing (DoS validation, ransomware-style simulation), we'll scope it explicitly and run it in a maintenance window." },
          { q: "Can you support our SOC 2 / ISO / PCI audit?", a: "Yes. Reports are written to satisfy auditor evidence requirements. We've worked with most of the major audit firms and can speak directly with your auditor if needed." },
          { q: "Do you provide a clean letter for customer trust calls?", a: "Yes. Every engagement closes with a customer-shareable attestation letter summarizing scope, methodology, and high-level posture — without disclosing exploitable details." },
          { q: "What's the difference between this and a red team?", a: "A pen test enumerates exploitable findings within a defined scope. A red team is goal-based (e.g., 'reach the customer database') and tests detection and response. Most clients start with pen testing and graduate to red team annually." },
        ],

        related: [
          { href: "/services/red-team-assessment", title: "Red Team Assessment", body: "Multi-vector, objective-based — tests detection, not just controls." },
          { href: "/services/web-application-testing", title: "Web Application Testing", body: "OWASP-aligned testing for production apps, including auth flows and business logic." },
          { href: "/services/api-security-testing", title: "API Security Testing", body: "REST, GraphQL, gRPC — including unauthenticated and JWT misuse paths." },
        ],

        finalCta: {
          title: <>Scope a pen test this quarter.</>,
          body: "We typically book 4–6 weeks out. Start the scoping conversation now to land tests inside your audit cycle.",
          primary: { href: "/contact?topic=testing", label: "Get a fixed-price SOW" },
          secondary: { href: "/services/security-testing", label: "All testing services" },
        },
      }}
    />
  );
}
