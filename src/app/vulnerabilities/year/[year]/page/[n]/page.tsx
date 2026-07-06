import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byYear } from "@/lib/vuln/links";
import { yearFacet, extraPageNumbers } from "@/lib/vuln/facets";

type Params = { year: string; n: string };

export function generateStaticParams(): Params[] {
  return [...byYear().keys()].flatMap((year) => {
    const f = yearFacet(year);
    return f ? extraPageNumbers(f.items).map((n) => ({ year, n: String(n) })) : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { year, n } = await params;
  const f = yearFacet(year);
  return {
    title: `${f?.title ?? `Vulnerabilities ${year}`} — page ${n}`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function YearHubPage({ params }: { params: Promise<Params> }) {
  const { year, n } = await params;
  const f = yearFacet(year);
  if (!f) notFound();
  return <VulnArchive {...f} page={Number(n)} browse={STANDARD_BROWSE} />;
}
