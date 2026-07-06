import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { SEVERITIES } from "@/lib/vuln/links";
import { severityFacet, extraPageNumbers } from "@/lib/vuln/facets";

type Params = { level: string; n: string };

export function generateStaticParams(): Params[] {
  return SEVERITIES.flatMap((level) => {
    const f = severityFacet(level);
    return f ? extraPageNumbers(f.items).map((n) => ({ level, n: String(n) })) : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { level, n } = await params;
  const f = severityFacet(level);
  return {
    title: `${f?.title ?? "Vulnerabilities"} — page ${n}`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function SeverityHubPage({ params }: { params: Promise<Params> }) {
  const { level, n } = await params;
  const f = severityFacet(level);
  if (!f) notFound();
  return <VulnArchive {...f} page={Number(n)} browse={STANDARD_BROWSE.filter((b) => !b.href.endsWith(level))} />;
}
