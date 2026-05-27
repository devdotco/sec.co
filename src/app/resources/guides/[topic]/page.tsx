import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResourcePageView } from "@/components/site/resource-page";
import { GUIDE_PAGES } from "@/lib/resource-pages";

type Params = { topic: string };

export function generateStaticParams(): Params[] {
  return Object.keys(GUIDE_PAGES).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { topic } = await params;
  const page = GUIDE_PAGES[topic];
  if (!page) return {};
  return { title: page.meta.title, description: page.meta.description };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { topic } = await params;
  const page = GUIDE_PAGES[topic];
  if (!page) notFound();
  return <ResourcePageView page={page} />;
}
