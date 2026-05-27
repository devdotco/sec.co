import type { Metadata } from "next";
import { HubPage } from "@/components/site/hub-page";
import { SERVICES_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Cybersecurity Services",
  description:
    "Senior advisory, security testing, managed security, and incident response — operated from a U.S.-based 24/7 SOC.",
};

export default function ServicesHubPage() {
  return (
    <HubPage
      eyebrow="Services"
      title={
        <>
          Cybersecurity services for teams that{" "}
          <span className="brand-gradient-text">can&apos;t afford to be wrong</span>.
        </>
      }
      sub="Four practice areas — advisory, offensive testing, managed security, and incident response — staffed by senior practitioners and operated from a U.S. SOC."
      primaryCta={{ href: "/contact?topic=assessment", label: "Get a Cyber Risk Assessment" }}
      secondaryCta={{ href: "/emergency", label: "Emergency Response" }}
      sections={SERVICES_SECTIONS}
      footerCta={{
        eyebrow: "Best first step",
        title: "Not sure which service fits?",
        body: "Most engagements start with a 2-week risk assessment. You get a prioritized roadmap, an executive readout, and clarity on what to fix first.",
        primary: { href: "/contact?topic=assessment", label: "Schedule Assessment" },
        secondary: { href: "/solutions", label: "Browse by problem instead" },
      }}
    />
  );
}
