import type { Metadata } from "next";
import { HubPage } from "@/components/site/hub-page";
import { COMPLIANCE_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "CMMC, SOC 2, ISO 27001, HIPAA, PCI, GDPR, FedRAMP, and SEC cyber-disclosure readiness — built around the controls auditors actually expect.",
};

export default function ComplianceHubPage() {
  return (
    <HubPage
      eyebrow="Compliance"
      title={
        <>
          Compliance,{" "}
          <span className="brand-gradient-text">without the binder full of busy work</span>.
        </>
      }
      sub="We treat compliance like an outcome of good security — not a separate workstream. Gap, remediate, document, rehearse, audit — with a senior practitioner driving the engagement."
      primaryCta={{ href: "/contact?topic=compliance", label: "Request Compliance Assessment" }}
      secondaryCta={{ href: "/tools/compliance-quiz", label: "Take the readiness quiz" }}
      sections={COMPLIANCE_SECTIONS}
      footerCta={{
        eyebrow: "Don't know which framework applies?",
        title: "Five minutes to find out where you stand",
        body: "Answer 12 questions about your industry, customers, and contracts. We'll send a tailored framework map and a starting checklist.",
        primary: { href: "/tools/compliance-quiz", label: "Start the quiz" },
        secondary: { href: "/contact?topic=compliance", label: "Talk to a compliance advisor" },
      }}
    />
  );
}
