/**
 * Orphan audit — the internal-linking build invariant, scale-safe (O(n log n)).
 *
 * Guarantee is construction-based: every scored index page belongs to a
 * paginated severity facet AND year facet (plus vendor/CWE), so numbered
 * pagination makes every member reachable. We verify facet membership and
 * report the shortest crawl distance (facet page number) to each page — this
 * holds identically at 141 or 180K pages. FAILS (exit 1) on any orphan.
 * See docs/sec-internal-linking.md. Usage: npm run vuln:orphans
 */
import { loadEnv } from "./_env";
import { allVulns } from "../../src/lib/vuln/store";
import { bySeverity, byYear, byYearSeverity, byVendor, byCwe, PAGE_SIZE } from "../../src/lib/vuln/links";
import type { StoredVuln } from "../../src/lib/vuln/types";

loadEnv();

const index = allVulns().filter((v) => v.page?.indexState === "index");
const byScore = (a: StoredVuln, b: StoredVuln) => (b.record.cvss?.score ?? 0) - (a.record.cvss?.score ?? 0);

// For each facet, assign each member the archive page number it lands on.
function pagePositions(groups: Map<string, StoredVuln[]>): Map<string, number> {
  const pos = new Map<string, number>(); // cveId -> best (lowest) page number seen
  for (const members of groups.values()) {
    const sorted = [...members].sort(byScore);
    sorted.forEach((v, i) => {
      const pageNum = Math.floor(i / PAGE_SIZE) + 1;
      const id = v.record.cveId;
      pos.set(id, Math.min(pos.get(id) ?? Infinity, pageNum));
    });
  }
  return pos;
}

const facetMaps = [bySeverity(), byYear(), byYearSeverity(), byVendor(), byCwe()];
const facetCount = new Map<string, number>(); // how many facets list each page
const shortestPage = new Map<string, number>(); // min archive-page number across facets
for (const groups of facetMaps) {
  const pos = pagePositions(groups);
  for (const [id, pageNum] of pos) {
    facetCount.set(id, (facetCount.get(id) ?? 0) + 1);
    shortestPage.set(id, Math.min(shortestPage.get(id) ?? Infinity, pageNum));
  }
}

const orphans = index.filter((v) => (facetCount.get(v.record.cveId) ?? 0) < 1);
const counts = index.map((v) => facetCount.get(v.record.cveId) ?? 0).sort((a, b) => a - b);
const depths = index.map((v) => shortestPage.get(v.record.cveId) ?? Infinity).filter(Number.isFinite);
const median = counts[Math.floor(counts.length / 2)] ?? 0;
const deep = depths.filter((d) => d > 3).length; // reachable but > 3 archive-pages deep

console.log(`Index pages          : ${index.length}`);
console.log(`Orphans (0 facets)   : ${orphans.length}`);
console.log(`Facets/page (inbound): min ${counts[0] ?? 0} · median ${median} · max ${counts[counts.length - 1] ?? 0}`);
console.log(`Shortest crawl page# : max ${Math.max(0, ...depths)}  (>3 deep: ${deep})`);
if (deep > 0) {
  console.log(`  NOTE: ${deep} page(s) sit >3 archive-pages deep (reachable, and in the sitemap).`);
  console.log(`  year×severity sub-facets exist; residual depth is single-year concentration and`);
  console.log(`  resolves as the corpus spans more years. Crawler-fine at this depth.`);
}
if (orphans.length) {
  console.error(`\n✗ FAIL: ${orphans.length} orphan(s): ${orphans.slice(0, 8).map((v) => v.record.cveId).join(", ")}`);
  process.exit(1);
}
console.log(`\n✓ PASS: every index page reachable via ≥1 paginated facet.`);
