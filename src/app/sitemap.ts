import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { listIndexed } from "@/lib/vuln/store";
import { getAllSlugs } from "@/lib/blog";
import { bySeverity, byYear, byVendor, byCwe, PAGE_SIZE } from "@/lib/vuln/links";
import type { StoredVuln } from "@/lib/vuln/types";

const BASE = "https://sec.co";

/**
 * Progressive sitemap over the INDEXABLE surface only:
 *   - all static marketing pages (discovered from src/app)
 *   - vuln hub pages with ≥3 members (paginated), matching each route's robots
 *   - CVE detail pages with an `index` decision (quality-gated)
 * Excludes noindex/review CVE previews and thin hubs — Google only sees vetted
 * pages. See docs/sec-seo-risk-controls.md.
 */

/** Discover static (non-dynamic) marketing routes by walking src/app. */
function staticRoutes(): string[] {
  const root = path.join(process.cwd(), "src", "app");
  const out: string[] = [];
  const walk = (dir: string, segs: string[]) => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    const hasPage = entries.some((e) => e.isFile() && /^page\.(tsx|jsx|ts|js|mdx)$/.test(e.name));
    if (hasPage) out.push("/" + segs.filter(Boolean).join("/"));
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      const name = e.name;
      if (name === "api" || name.startsWith("[")) continue; // skip dynamic + api
      const seg = name.startsWith("(") && name.endsWith(")") ? "" : name; // route groups
      walk(path.join(dir, name), [...segs, seg]);
    }
  };
  walk(root, []);
  return out;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (url: string, priority = 0.6, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({
    url: url.startsWith("http") ? url : `${BASE}${url}`,
    lastModified,
    changeFrequency: "weekly",
    priority,
  });

  // 1) Static marketing + static vuln pages (/, /services/*, /vulnerabilities, …)
  const marketing = staticRoutes().map((r) => entry(r, r === "" || r === "/" ? 1 : 0.7));

  // 1b) Blog posts (dynamic /blog/[slug]).
  const blog = getAllSlugs().map((slug) => entry(`/blog/${slug}`, 0.6));

  // 2) Indexable vuln hubs (≥3 members), page 1 + numbered pages.
  const hubs: MetadataRoute.Sitemap = [];
  const addHub = (base: string, members: StoredVuln[]) => {
    if (members.length < 3) return; // matches route robots gate
    const pages = Math.max(1, Math.ceil(members.length / PAGE_SIZE));
    for (let n = 1; n <= pages; n++) hubs.push(entry(n === 1 ? base : `${base}/page/${n}`, 0.5));
  };
  for (const [k, m] of bySeverity()) addHub(`/vulnerabilities/severity/${k}`, m);
  for (const [k, m] of byYear()) addHub(`/vulnerabilities/year/${k}`, m);
  for (const [k, m] of byVendor()) addHub(`/vendors/${k}/vulnerabilities`, m);
  for (const [k, m] of byCwe()) addHub(`/cwe/${k}`, m);

  // 3) CVE detail pages that passed the quality gate.
  const cves = listIndexed().map((v) =>
    entry(v.page!.canonicalUrl, v.record.kev ? 0.8 : 0.6, v.record.lastModified ? new Date(v.record.lastModified) : now),
  );

  return [...marketing, ...blog, ...hubs, ...cves];
}
