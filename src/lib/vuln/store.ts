/**
 * Phase-1 file-backed repository for vulnerability records.
 *
 * One JSON file per CVE under .data/vuln/cve/<CVE-ID>.json holding
 * { record, enrichment?, page? }. Zero external services — runs anywhere.
 *
 * The exported functions ARE the repository interface. To move to Postgres
 * (docs/sec-schema.prisma), reimplement these against Prisma and delete the
 * fs bits; nothing else in the app changes.
 */
import fs from "node:fs";
import path from "node:path";
import type { CveRecord, Enrichment, PageMeta, StoredVuln } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data", "vuln", "cve");

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
function fileFor(cveId: string) {
  return path.join(DATA_DIR, `${cveId.toUpperCase()}.json`);
}

export function putRecord(record: CveRecord): void {
  ensureDir();
  const existing = getVuln(record.cveId);
  const next: StoredVuln = { ...existing, record };
  // Drop stale enrichment if the source content changed.
  if (existing?.enrichment && existing.enrichment.sourceHash !== record.contentHash) {
    delete next.enrichment;
    delete next.page;
  }
  fs.writeFileSync(fileFor(record.cveId), JSON.stringify(next, null, 2));
}

export function putEnrichment(cveId: string, enrichment: Enrichment): void {
  const v = getVuln(cveId);
  if (!v) throw new Error(`no record for ${cveId}`);
  fs.writeFileSync(fileFor(cveId), JSON.stringify({ ...v, enrichment }, null, 2));
}

export function putPage(cveId: string, page: PageMeta): void {
  const v = getVuln(cveId);
  if (!v) throw new Error(`no record for ${cveId}`);
  fs.writeFileSync(fileFor(cveId), JSON.stringify({ ...v, page }, null, 2));
}

export function getVuln(cveId: string): StoredVuln | undefined {
  try {
    return JSON.parse(fs.readFileSync(fileFor(cveId), "utf-8")) as StoredVuln;
  } catch {
    return undefined;
  }
}

export function allVulns(): StoredVuln[] {
  try {
    return fs
      .readdirSync(DATA_DIR)
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), "utf-8")) as StoredVuln);
  } catch {
    return [];
  }
}

/** Records that have no enrichment, or whose enrichment is stale vs source. */
export function needingEnrichment(): CveRecord[] {
  return allVulns()
    .filter((v) => !v.enrichment || v.enrichment.sourceHash !== v.record.contentHash)
    .map((v) => v.record);
}

/** All vulns with a page decision of `index` — what goes in the sitemap. */
export function listIndexed(): StoredVuln[] {
  return allVulns().filter((v) => v.page?.indexState === "index");
}

/** All vulns that have any page decision (viewable previews). */
export function listWithPages(): StoredVuln[] {
  return allVulns().filter((v) => !!v.page);
}

export function listKev(): StoredVuln[] {
  return allVulns().filter((v) => v.record.kev);
}
