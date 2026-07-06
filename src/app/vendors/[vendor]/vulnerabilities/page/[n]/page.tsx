import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VulnArchive, STANDARD_BROWSE } from "@/components/site/vuln-archive";
import { byVendor } from "@/lib/vuln/links";
import { vendorFacet, extraPageNumbers } from "@/lib/vuln/facets";

type Params = { vendor: string; n: string };

export function generateStaticParams(): Params[] {
  return [...byVendor().keys()].flatMap((vendor) => {
    const f = vendorFacet(vendor);
    return f ? extraPageNumbers(f.items).map((n) => ({ vendor, n: String(n) })) : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { vendor, n } = await params;
  const f = vendorFacet(vendor);
  return {
    title: `${f?.title ?? "Vendor vulnerabilities"} — page ${n}`,
    robots: { index: (f?.items.length ?? 0) >= 3, follow: true },
  };
}

export default async function VendorHubPage({ params }: { params: Promise<Params> }) {
  const { vendor, n } = await params;
  const f = vendorFacet(vendor);
  if (!f) notFound();
  return <VulnArchive {...f} page={Number(n)} browse={STANDARD_BROWSE} />;
}
