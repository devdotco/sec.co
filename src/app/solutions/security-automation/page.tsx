import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";
import { SOLUTION_PAGES } from "@/lib/solution-pages";

const page = SOLUTION_PAGES["security-automation"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={page.config} />;
}
