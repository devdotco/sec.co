import type { Metadata } from "next";
import { HubPage } from "@/components/site/hub-page";
import { INDUSTRIES_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Cybersecurity for regulated, technology, industrial, and private-equity-backed companies. Sector-specific threat models, controls, and compliance.",
};

export default function IndustriesHubPage() {
  return (
    <HubPage
      eyebrow="Industries"
      title={
        <>
          We work the way your{" "}
          <span className="brand-gradient-text">industry actually works</span>.
        </>
      }
      sub="Threat models, control sets, and compliance expectations differ by sector. Our engagements are pre-tuned for the realities of your industry — not retrofitted from a generic playbook."
      primaryCta={{ href: "/contact?topic=industry", label: "Talk to an Industry Advisor" }}
      secondaryCta={{ href: "/industries/ma-due-diligence", label: "M&A Cyber Diligence" }}
      sections={INDUSTRIES_SECTIONS}
      footerCta={{
        eyebrow: "Private equity",
        title: "Standardize cyber across the portfolio",
        body: "Pre-LOI diligence, 100-day plans, and a portfolio-wide security baseline that scales with the deal pace — not against it.",
        primary: { href: "/industries/private-equity", label: "PE engagement model" },
        secondary: { href: "/industries/ma-due-diligence", label: "M&A diligence" },
      }}
    />
  );
}
