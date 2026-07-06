import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byCwe } from "@/lib/vuln/links";
import { cweFacet } from "@/lib/vuln/facets";

type Params = { cweId: string };

export function generateStaticParams(): Params[] {
  return [...byCwe().keys()].map((cweId) => ({ cweId }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { cweId } = await params;
  const f = cweFacet(cweId);
  return {
    title: `${cweId.toUpperCase()} — Weakness & Related Vulnerabilities`,
    description: `Vulnerabilities of weakness type ${cweId.toUpperCase()}, with remediation and detection guidance from SEC.co.`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function CweHub({ params }: { params: Promise<Params> }) {
  const { cweId } = await params;
  const f = cweFacet(cweId);
  if (!f) notFound();
  return <VulnArchive {...f} page={1} browse={STANDARD_BROWSE} />;
}
