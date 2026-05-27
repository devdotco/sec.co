import type { Metadata } from "next";
import { HubPage } from "@/components/site/hub-page";
import { SOLUTIONS_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Buyer-intent solutions for cybersecurity outcomes — from one-time assessments to ongoing managed programs and targeted technical engagements.",
};

export default function SolutionsHubPage() {
  return (
    <HubPage
      eyebrow="Solutions"
      title={
        <>
          Start with the problem,{" "}
          <span className="brand-gradient-text">not the product</span>.
        </>
      }
      sub="Most buyers don't know if they need MDR or SIEM or vCISO. They know the outcome they need. These are organized by what you're trying to get done."
      primaryCta={{ href: "/contact?topic=assessment", label: "Schedule Assessment" }}
      secondaryCta={{ href: "/services", label: "Browse by service instead" }}
      sections={SOLUTIONS_SECTIONS}
      footerCta={{
        eyebrow: "Active intrusion?",
        title: "If you're being breached, skip the form",
        body: "Our 24/7 hotline routes directly to a senior responder. Median time from first call to containment work: 47 minutes.",
        primary: { href: "/emergency", label: "Open Emergency Response" },
        secondary: { href: "tel:+12062102954", label: "Call +1 (206) 210-2954" },
        tone: "urgent",
      }}
    />
  );
}
