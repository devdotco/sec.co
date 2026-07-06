import type { MetadataRoute } from "next";

/** robots.txt — allows crawl and points GSC at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://sec.co/sitemap.xml",
    host: "https://sec.co",
  };
}
