import type { Metadata } from "next";
import { HubPage } from "@/components/site/hub-page";
import { RESOURCES_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Cybersecurity and compliance guides, downloadable checklists, and interactive readiness tools — no signup walls on the basics.",
};

export default function ResourcesHubPage() {
  return (
    <HubPage
      eyebrow="Resources"
      title={
        <>
          Plan, prepare,{" "}
          <span className="brand-gradient-text">respond</span>.
        </>
      }
      sub="The guides, checklists, and tools we use with clients — adapted for general use. If you're trying to figure out where you stand, start with the Cyber Risk Checklist."
      primaryCta={{ href: "/resources/downloads/cyber-risk-checklist", label: "Download Cyber Risk Checklist" }}
      secondaryCta={{ href: "/blog", label: "Read the blog" }}
      sections={RESOURCES_SECTIONS}
      footerCta={{
        eyebrow: "Stay current",
        title: "A monthly write-up worth opening",
        body: "Threat retrospectives, framework updates, and short pieces on practical security. No marketing emails. Unsubscribe is one click.",
        primary: { href: "/contact?topic=newsletter", label: "Subscribe to the newsletter" },
        secondary: { href: "/blog", label: "Browse recent posts" },
      }}
    />
  );
}
