/**
 * Facet resolvers — shared by each hub's page-1 route and its /page/[n] route
 * so pagination logic lives in one place. Every scored index page belongs to a
 * severity facet AND a year facet, so paginated facet membership is what
 * guarantees no orphans at any scale (see docs/sec-internal-linking.md).
 */
import { bySeverity, byYear, byYearSeverity, byCwe, byVendor, vendorName, SEVERITIES, PAGE_SIZE } from "./links";
import type { StoredVuln } from "./types";

export type Facet = { eyebrow: string; title: string; sub: string; basePath: string; items: StoredVuln[] };

const byScore = (a: StoredVuln, b: StoredVuln) => (b.record.cvss?.score ?? 0) - (a.record.cvss?.score ?? 0);
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
const SEV_LABEL: Record<string, string> = { critical: "Critical", high: "High", medium: "Medium", low: "Low" };

export function severityFacet(level: string): Facet | null {
  if (!(SEVERITIES as readonly string[]).includes(level)) return null;
  return {
    eyebrow: "By severity",
    title: `${SEV_LABEL[level]}-severity vulnerabilities`,
    sub: `CVEs rated ${SEV_LABEL[level]} by CVSS, with SEC.co remediation and prioritization guidance.`,
    basePath: `/vulnerabilities/severity/${level}`,
    items: (bySeverity().get(level) ?? []).sort(byScore),
  };
}

export function yearFacet(year: string): Facet | null {
  const m = byYear().get(year);
  if (!m) return null;
  return {
    eyebrow: "By year",
    title: `Vulnerabilities disclosed in ${year}`,
    sub: `CVEs published in ${year} with SEC.co analysis.`,
    basePath: `/vulnerabilities/year/${year}`,
    items: [...m].sort(byScore),
  };
}

export function yearSeverityFacet(year: string, level: string): Facet | null {
  if (!(SEVERITIES as readonly string[]).includes(level)) return null;
  const m = byYearSeverity().get(`${year}::${level}`);
  if (!m || !m.length) return null;
  return {
    eyebrow: `${year} · ${SEV_LABEL[level]}`,
    title: `${SEV_LABEL[level]}-severity vulnerabilities disclosed in ${year}`,
    sub: `${SEV_LABEL[level]}-rated CVEs published in ${year}, with SEC.co remediation and prioritization guidance.`,
    basePath: `/vulnerabilities/year/${year}/${level}`,
    items: [...m].sort(byScore),
  };
}

/** Severity refine-links available within a given year (for the year hub). */
export function yearSeverityLinks(year: string): { href: string; label: string }[] {
  return SEVERITIES.map((level) => ({ level, n: (byYearSeverity().get(`${year}::${level}`) ?? []).length }))
    .filter((x) => x.n > 0)
    .map((x) => ({ href: `/vulnerabilities/year/${year}/${x.level}`, label: `${SEV_LABEL[x.level]} (${x.n})` }));
}

export function cweFacet(cweId: string): Facet | null {
  const m = byCwe().get(cweId);
  if (!m) return null;
  const id = cweId.toUpperCase();
  return {
    eyebrow: "By weakness (CWE)",
    title: `${id}: related vulnerabilities`,
    sub: `CVEs classified under ${id}. Understanding the weakness class helps prioritize systemic fixes over one-off patches.`,
    basePath: `/cwe/${cweId}`,
    items: [...m].sort(byScore),
  };
}

export function vendorFacet(vendor: string): Facet | null {
  const m = byVendor().get(vendor);
  if (!m) return null;
  const name = titleCase(vendorName(vendor));
  return {
    eyebrow: "By vendor",
    title: `${name} vulnerabilities`,
    sub: `Known CVEs affecting ${name} products, prioritized by severity, with SEC.co remediation and detection guidance.`,
    basePath: `/vendors/${vendor}/vulnerabilities`,
    items: [...m].sort(byScore),
  };
}

/** Page numbers ≥2 for a facet's /page/[n] static params. */
export function extraPageNumbers(items: StoredVuln[]): number[] {
  const total = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const out: number[] = [];
  for (let n = 2; n <= total; n++) out.push(n);
  return out;
}
