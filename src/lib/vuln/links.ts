/**
 * Internal-link graph for the vulnerability corpus. Single source of truth for
 * BOTH rendering (hub membership, related-vuln blocks) and the orphan audit
 * (scripts/vuln/orphan-audit.ts). See docs/sec-internal-linking.md.
 *
 * Only `index` pages participate — we never link to noindex targets.
 */
import { listIndexed } from "./store";
import type { CveRecord, StoredVuln } from "./types";

export const PAGE_SIZE = 100; // members per archive page (numbered pagination)
export const SEVERITIES = ["critical", "high", "medium", "low"] as const;

/** Split a member list into a numbered page. page is 1-based. */
export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const total = Math.max(1, Math.ceil(items.length / size));
  const p = Math.min(Math.max(1, page), total);
  return { slice: items.slice((p - 1) * size, p * size), page: p, total, count: items.length };
}

export function vendorSlug(v: string): string {
  return v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
export function cweSlug(c: string): string {
  return c.toLowerCase(); // 'CWE-79' -> 'cwe-79'
}

export type HubLink = { href: string; label: string; kind: "vendor" | "cwe" | "severity" | "year" };

/** The hubs a CVE links UP to. Guarantees ≥ severity+year for any scored CVE. */
export function hubsFor(r: CveRecord): HubLink[] {
  const hubs: HubLink[] = [];
  for (const v of [...new Set(r.affected.map((a) => a.vendor))]) {
    hubs.push({ href: `/vendors/${vendorSlug(v)}/vulnerabilities`, label: v, kind: "vendor" });
  }
  for (const c of r.cwes) hubs.push({ href: `/cwe/${cweSlug(c)}`, label: c, kind: "cwe" });
  const sev = r.cvss?.severity?.toLowerCase();
  if (sev && (SEVERITIES as readonly string[]).includes(sev)) {
    hubs.push({ href: `/vulnerabilities/severity/${sev}`, label: r.cvss!.severity, kind: "severity" });
  }
  if (r.published) {
    const y = r.published.slice(0, 4);
    hubs.push({ href: `/vulnerabilities/year/${y}`, label: y, kind: "year" });
  }
  return hubs;
}

// ── grouped indexes over index pages (built once per call) ───────────────────
function group<T>(keyFn: (v: StoredVuln) => T[]): Map<string, StoredVuln[]> {
  const m = new Map<string, StoredVuln[]>();
  for (const v of listIndexed()) {
    for (const k of keyFn(v) as unknown as string[]) {
      (m.get(k) ?? m.set(k, []).get(k)!).push(v);
    }
  }
  return m;
}

export function byVendor(): Map<string, StoredVuln[]> {
  return group((v) => [...new Set(v.record.affected.map((a) => vendorSlug(a.vendor)))]);
}
export function byCwe(): Map<string, StoredVuln[]> {
  return group((v) => v.record.cwes.map(cweSlug));
}
export function bySeverity(): Map<string, StoredVuln[]> {
  return group((v) => {
    const s = v.record.cvss?.severity?.toLowerCase();
    return s && (SEVERITIES as readonly string[]).includes(s) ? [s] : [];
  });
}
export function byYear(): Map<string, StoredVuln[]> {
  return group((v) => (v.record.published ? [v.record.published.slice(0, 4)] : []));
}

/** Original-cased vendor display name for a slug. */
export function vendorName(slug: string): string {
  for (const v of listIndexed()) {
    for (const a of v.record.affected) if (vendorSlug(a.vendor) === slug) return a.vendor;
  }
  return slug;
}

/** Related index CVEs: shared CWE (×3) > shared vendor (×2) > same severity (×0.5). */
export function relatedTo(r: CveRecord, limit = 8): StoredVuln[] {
  const myCwe = new Set(r.cwes);
  const myVendor = new Set(r.affected.map((a) => a.vendor));
  const scored: { v: StoredVuln; s: number }[] = [];
  for (const v of listIndexed()) {
    if (v.record.cveId === r.cveId) continue;
    let s = 0;
    s += v.record.cwes.filter((c) => myCwe.has(c)).length * 3;
    s += [...new Set(v.record.affected.map((a) => a.vendor))].filter((x) => myVendor.has(x)).length * 2;
    if (v.record.cvss?.severity && v.record.cvss.severity === r.cvss?.severity) s += 0.5;
    if (s > 0) scored.push({ v, s });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.v);
}
