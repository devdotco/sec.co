import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcePageView } from "@/components/site/resource-page";
import { DOWNLOAD_PAGES } from "@/lib/resource-pages";

type Params = { asset: string };

export function generateStaticParams(): Params[] {
  return Object.keys(DOWNLOAD_PAGES).map((asset) => ({ asset }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { asset } = await params;
  const page = DOWNLOAD_PAGES[asset];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { asset } = await params;
  const page = DOWNLOAD_PAGES[asset];
  if (!page) notFound();
  return <ResourcePageView page={page} />;
}
