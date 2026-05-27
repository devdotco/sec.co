import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcePageView } from "@/components/site/resource-page";
import { TOOL_PAGES } from "@/lib/resource-pages";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(TOOL_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = TOOL_PAGES[slug];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = TOOL_PAGES[slug];
  if (!page) notFound();
  return <ResourcePageView page={page} />;
}
