import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byVendor, vendorName } from "@/lib/vuln/links";
import { vendorFacet } from "@/lib/vuln/facets";

type Params = { vendor: string };

export function generateStaticParams(): Params[] {
  return [...byVendor().keys()].map((vendor) => ({ vendor }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { vendor } = await params;
  const f = vendorFacet(vendor);
  const name = vendorName(vendor).replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} Vulnerabilities (CVEs)`,
    description: `${f?.items.length ?? 0} known vulnerabilities affecting ${name} products, with remediation guidance from SEC.co.`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function VendorHub({ params }: { params: Promise<Params> }) {
  const { vendor } = await params;
  const f = vendorFacet(vendor);
  if (!f) notFound();
  return <VulnArchive {...f} page={1} browse={STANDARD_BROWSE} />;
}
