import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeader } from "@/components/site/section-header";

export const metadata: Metadata = {
  title: "Tools We Use",
  description:
    "The security platforms we engineer, operate, and integrate with — including CrowdStrike, Microsoft Sentinel, Splunk, Palo Alto Networks, AWS, Azure Defender, and more.",
};

type Tool = {
  id: string; // anchor — matches redirect destinations in lib/redirects.ts
  name: string;
  category: string;
  body: string;
  ourTake: string;
};

const SIEM: Tool[] = [
  {
    id: "splunk",
    name: "Splunk",
    category: "SIEM / observability",
    body: "Splunk Enterprise Security and the SOAR module power some of our largest managed-SIEM deployments. We engineer ingestion, write detections, tune correlation, and operate the platform 24/7.",
    ourTake: "Right answer when you already pay for it and want detection engineering that ages well.",
  },
  {
    id: "microsoft-sentinel",
    name: "Microsoft Sentinel",
    category: "SIEM / cloud-native",
    body: "Azure-native SIEM with deep M365 / Entra ID integration. Strong choice for orgs already standardized on Microsoft.",
    ourTake: "Best total-cost-of-ownership when your stack is mostly Microsoft and you want to consolidate.",
  },
];

const EDR: Tool[] = [
  {
    id: "crowdstrike",
    name: "CrowdStrike Falcon",
    category: "EDR / XDR",
    body: "Endpoint, identity, and cloud telemetry on a single platform. We operate Falcon as part of our MDR — from initial deployment through tuned detection-as-code.",
    ourTake: "Our default EDR recommendation. Fast, well-staffed vendor, strong threat intel.",
  },
  {
    id: "sentinelone",
    name: "SentinelOne",
    category: "EDR / XDR",
    body: "Autonomous endpoint protection with strong rollback and forensics features. Common in mid-market deployments.",
    ourTake: "Comparable to CrowdStrike at a different price point. Solid for cost-sensitive deployments.",
  },
  {
    id: "microsoft-defender",
    name: "Microsoft Defender",
    category: "EDR / XDR",
    body: "Native Microsoft endpoint and identity protection. Often the right answer for E5 customers — value is already paid for.",
    ourTake: "Underrated when you already have E5 licenses. We help orgs operationalize it correctly.",
  },
];

const CLOUD: Tool[] = [
  {
    id: "aws",
    name: "AWS Security Hub",
    category: "Cloud security posture",
    body: "Centralized findings across GuardDuty, Inspector, Config, and Macie. We integrate Security Hub with your SIEM and operationalize the findings.",
    ourTake: "Necessary for AWS-heavy orgs. Most value comes from triage and tuning, not the raw feed.",
  },
  {
    id: "azure-defender",
    name: "Azure Defender for Cloud",
    category: "Cloud security posture",
    body: "CSPM and CWP across Azure subscriptions, with extensions to multi-cloud. We deploy, scope, and tune for actionable signal.",
    ourTake: "Required when running production workloads in Azure. Configuration matters more than the license.",
  },
  {
    id: "wiz",
    name: "Wiz",
    category: "Cloud security posture",
    body: "Agentless CNAPP across AWS, Azure, GCP, and Kubernetes. We help mid-market orgs evaluate and deploy Wiz alongside MDR.",
    ourTake: "Excellent for visibility across multi-cloud. Best when the rest of the program can act on findings.",
  },
];

const NETWORK: Tool[] = [
  {
    id: "palo-alto-networks",
    name: "Palo Alto Networks",
    category: "Network security · NGFW · SASE",
    body: "PAN-OS, Prisma Access, and Cortex XSOAR. We architect, deploy, and operate Palo Alto stacks — including SD-WAN cutovers and SASE migrations.",
    ourTake: "Strong NGFW story; Prisma Access is the SASE platform we recommend most often for regulated industries.",
  },
  {
    id: "fortinet",
    name: "Fortinet",
    category: "Network security · NGFW",
    body: "FortiGate firewall + FortiAnalyzer / FortiSIEM. Common in mid-market and industrial environments.",
    ourTake: "Good economics for mid-market. Configuration discipline is the difference between safe and breached.",
  },
  {
    id: "cisco",
    name: "Cisco Secure",
    category: "Network · Identity · Threat",
    body: "Cisco Duo, Umbrella, Secure Endpoint, and Secure Network. We operate Cisco stacks for clients standardized on the platform.",
    ourTake: "Best when you're already deep in Cisco — Duo in particular punches above its weight.",
  },
];

const IDENTITY: Tool[] = [
  {
    id: "okta",
    name: "Okta",
    category: "Identity",
    body: "Workforce and customer identity. We harden Okta tenants, design lifecycle automation, and integrate with privileged access.",
    ourTake: "The right answer for most non-Microsoft-first orgs. Post-Lapsus, configuration discipline is non-negotiable.",
  },
  {
    id: "entra",
    name: "Microsoft Entra ID",
    category: "Identity",
    body: "Identity and access management for Microsoft 365 and beyond. We harden Entra tenants and design conditional access policies that don't break the business.",
    ourTake: "Default choice for Microsoft-first orgs. Conditional Access is what makes or breaks the deployment.",
  },
];

export default function ToolsWeUsePage() {
  return (
    <>
      <PageHero
        eyebrow="Tools We Use"
        title={
          <>
            We engineer the tools{" "}
            <span className="brand-gradient-text">you already pay for</span>.
          </>
        }
        sub="We don't have a platform to upsell. We operate the vendors below — across SIEM, EDR/XDR, cloud security, network, and identity — to make the tools you've already invested in actually do their job. If your tool isn't listed, ask: we work with most of them."
        primaryCta={{ href: "/contact?topic=managed", label: "Talk to managed services" }}
      />

      <Container width="wide" className="py-20 md:py-28 space-y-20">
        <ToolSection
          eyebrow="SIEM"
          title="SIEM & log analytics"
          intro="The platforms we operate as managed-SIEM engagements."
          tools={SIEM}
        />
        <ToolSection
          eyebrow="EDR / XDR"
          title="Endpoint & extended detection"
          intro="Where attackers land, and where most incidents are detected and contained."
          tools={EDR}
        />
        <ToolSection
          eyebrow="Cloud"
          title="Cloud security posture"
          intro="Where modern environments live — and where misconfiguration costs the most."
          tools={CLOUD}
        />
        <ToolSection
          eyebrow="Network"
          title="Network & perimeter"
          intro="Firewalls, SASE, network segmentation — still the spine of most architectures."
          tools={NETWORK}
        />
        <ToolSection
          eyebrow="Identity"
          title="Identity & access"
          intro="The blast radius of every modern breach. Where we spend the most time hardening."
          tools={IDENTITY}
        />
      </Container>

      {/* Footer CTA */}
      <section className="border-y border-[var(--color-line)] bg-ink-1/40">
        <Container width="wide" className="py-20">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-[-0.02em] text-bone">
                Don&apos;t see your stack?
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-bone-dim">
                We work with most enterprise security tools — including a long tail not listed here. Tell us what you run; we&apos;ll tell you whether we&apos;re the right operators.
              </p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/contact?topic=managed"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold tracking-tight text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
              >
                Ask about your stack →
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ToolSection({
  eyebrow,
  title,
  intro,
  tools,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  tools: Tool[];
}) {
  return (
    <section>
      <SectionHeader eyebrow={eyebrow} title={title} sub={intro} />
      <div className="grid gap-4 lg:grid-cols-2">
        {tools.map((t) => (
          <article
            key={t.id}
            id={t.id}
            className="scroll-mt-24 rounded-2xl border border-[var(--color-line)] bg-ink-1/60 p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-[20px] leading-tight tracking-tight text-bone">
                {t.name}
              </h3>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                {t.category}
              </span>
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-bone-dim">{t.body}</p>
            <div className="mt-4 border-t border-[var(--color-line-subtle)] pt-4">
              <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-brand-cyan)]">
                Our take
              </div>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-bone">{t.ourTake}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
