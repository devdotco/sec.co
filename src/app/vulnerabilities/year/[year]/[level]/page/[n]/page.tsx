import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byYearSeverity } from "@/lib/vuln/links";
import { yearSeverityFacet, extraPageNumbers } from "@/lib/vuln/facets";

type Params = { year: string; level: string; n: string };

export function generateStaticParams(): Params[] {
  return [...byYearSeverity().keys()].flatMap((k) => {
    const [year, level] = k.split("::");
    const f = yearSeverityFacet(year, level);
    return f ? extraPageNumbers(f.items).map((n) => ({ year, level, n: String(n) })) : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, level, n } = await params;
  const f = yearSeverityFacet(year, level);
  return {
    title: `${f?.title ?? `${level} ${year}`} — page ${n}`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function YearSeverityHubPage({ params }: { params: Promise<Params> }) {
  const { year, level, n } = await params;
  const f = yearSeverityFacet(year, level);
  if (!f) notFound();
  return <VulnArchive {...f} page={Number(n)} browse={[{ href: `/vulnerabilities/year/${year}`, label: `← All ${year}` }, ...STANDARD_BROWSE]} />;
}
