import type { Metadata } from "next";
import { ServiceDetailPage } from "@/components/site/service-detail";
import { COMPLIANCE_PAGES } from "@/lib/compliance-pages";

const page = COMPLIANCE_PAGES["pci-dss"];

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
};

export default function Page() {
  return <ServiceDetailPage config={page.config} />;
}
