import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byYearSeverity } from "@/lib/vuln/links";
import { yearSeverityFacet } from "@/lib/vuln/facets";

type Params = { year: string; level: string };

export function generateStaticParams(): Params[] {
  return [...byYearSeverity().keys()].map((k) => {
    const [year, level] = k.split("::");
    return { year, level };
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, level } = await params;
  const f = yearSeverityFacet(year, level);
  return {
    title: f?.title ?? `${level} vulnerabilities ${year}`,
    description: `${f?.items.length ?? 0} ${level}-severity CVEs from ${year} with SEC.co guidance.`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function YearSeverityHub({ params }: { params: Promise<Params> }) {
  const { year, level } = await params;
  const f = yearSeverityFacet(year, level);
  if (!f) notFound();
  return <VulnArchive {...f} page={1} browse={[{ href: `/vulnerabilities/year/${year}`, label: `← All ${year}` }, ...STANDARD_BROWSE]} />;
}
