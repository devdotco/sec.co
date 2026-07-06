import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { SEVERITIES } from "@/lib/vuln/links";
import { severityFacet } from "@/lib/vuln/facets";

type Params = { level: string };

export function generateStaticParams(): Params[] {
  return SEVERITIES.map((level) => ({ level }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { level } = await params;
  const f = severityFacet(level);
  return {
    title: f?.title ?? "Vulnerabilities",
    description: `${f?.items.length ?? 0} ${level}-severity CVEs with remediation and detection guidance from SEC.co.`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function SeverityHub({ params }: { params: Promise<Params> }) {
  const { level } = await params;
  const f = severityFacet(level);
  if (!f) notFound();
  return <VulnArchive {...f} page={1} browse={STANDARD_BROWSE.filter((b) => !b.href.endsWith(level))} />;
}
