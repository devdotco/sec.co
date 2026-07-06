import type { MetadataRoute } from "next";
import { listIndexed } from "@/lib/vuln/store";

const BASE = "https://sec.co";

/**
 * Progressive sitemap. Only vulnerability pages with an `index` decision
 * (above the quality threshold, review-approved) are emitted — the
 * scaled-content-abuse safeguard from docs/sec-seo-risk-controls.md.
 *
 * Core marketing routes are listed explicitly; extend as new hubs graduate.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/solutions",
    "/industries",
    "/compliance",
    "/blog",
    "/vulnerabilities",
    "/vulnerabilities/known-exploited",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: now, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));

  const vulns: MetadataRoute.Sitemap = listIndexed().map((v) => ({
    url: v.page!.canonicalUrl,
    lastModified: v.record.lastModified ? new Date(v.record.lastModified) : now,
    changeFrequency: "monthly",
    priority: v.record.kev ? 0.8 : 0.5,
  }));

  return [...core, ...vulns];
}
