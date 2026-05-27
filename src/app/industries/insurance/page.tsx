import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";

const page = INDUSTRY_PAGES["insurance"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={page.config} />;
}
