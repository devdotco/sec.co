import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byYear } from "@/lib/vuln/links";
import { yearFacet, yearSeverityLinks } from "@/lib/vuln/facets";

type Params = { year: string };

export function generateStaticParams(): Params[] {
  return [...byYear().keys()].map((year) => ({ year }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year } = await params;
  const f = yearFacet(year);
  return {
    title: f?.title ?? `Vulnerabilities ${year}`,
    description: `${f?.items.length ?? 0} CVEs published in ${year}, analyzed by SEC.co.`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function YearHub({ params }: { params: Promise<Params> }) {
  const { year } = await params;
  const f = yearFacet(year);
  if (!f) notFound();
  return <VulnArchive {...f} page={1} refine={yearSeverityLinks(year)} browse={STANDARD_BROWSE} />;
}
