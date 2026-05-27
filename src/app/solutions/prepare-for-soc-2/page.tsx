import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";
import { SOLUTION_PAGES } from "@/lib/solution-pages";

const page = SOLUTION_PAGES["prepare-for-soc-2"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={page.config} />;
}
