import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byCwe } from "@/lib/vuln/links";
import { cweFacet, extraPageNumbers } from "@/lib/vuln/facets";

type Params = { cweId: string; n: string };

export function generateStaticParams(): Params[] {
  return [...byCwe().keys()].flatMap((cweId) => {
    const f = cweFacet(cweId);
    return f ? extraPageNumbers(f.items).map((n) => ({ cweId, n: String(n) })) : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { cweId, n } = await params;
  const f = cweFacet(cweId);
  return {
    title: `${cweId.toUpperCase()} — Related Vulnerabilities — page ${n}`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function CweHubPage({ params }: { params: Promise<Params> }) {
  const { cweId, n } = await params;
  const f = cweFacet(cweId);
  if (!f) notFound();
  return <VulnArchive {...f} page={Number(n)} browse={STANDARD_BROWSE} />;
}
