import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";
import { SERVICE_PAGES } from "@/lib/service-pages";

const page = SERVICE_PAGES["cyber-risk-assessment"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={page.config} />;
}
