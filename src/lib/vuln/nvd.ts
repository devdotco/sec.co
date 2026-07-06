/**
 * NVD + CISA KEV parsers. Turn raw source JSON into normalized CveRecords.
 * SOURCE layer only — no interpretation, no invented fields.
 */
import { createHash } from "node:crypto";
import type {
  AffectedProduct,
  CveRecord,
  CveReference,
  CvssMetric,
  KevInfo,
} from "./types";

export type KevMap = Map<string, KevInfo>;

/** Parse the CISA KEV catalog JSON into a cveID → KevInfo map. */
export function parseKevCatalog(json: unknown): KevMap {
  const map: KevMap = new Map();
  const vulns = (json as { vulnerabilities?: unknown[] })?.vulnerabilities ?? [];
  for (const raw of vulns) {
    const v = raw as Record<string, string>;
    if (!v.cveID) continue;
    map.set(v.cveID, {
      vulnerabilityName: v.vulnerabilityName ?? "",
      dateAdded: v.dateAdded ?? "",
      dueDate: v.dueDate || undefined,
      requiredAction: v.requiredAction ?? "",
      knownRansomwareCampaignUse: v.knownRansomwareCampaignUse ?? "Unknown",
    });
  }
  return map;
}

function sha256(s: string): string {
  return createHash("sha256").update(s).digest("hex").slice(0, 16);
}

/** Map a base score to a severity band. CVSS v2 caps at HIGH (no CRITICAL). */
function deriveSeverity(version: string, score: number): string {
  if (score <= 0) return "N/A";
  if (version === "2.0") return score >= 7 ? "HIGH" : score >= 4 ? "MEDIUM" : "LOW";
  return score >= 9 ? "CRITICAL" : score >= 7 ? "HIGH" : score >= 4 ? "MEDIUM" : "LOW";
}

/** Parse one NVD `cve` object (the inner object under vulnerabilities[].cve). */
export function parseCve(
  cve: Record<string, unknown>,
  kev: KevMap,
  retrievedAt = new Date().toISOString(),
): CveRecord {
  const id = String(cve.id);

  const descriptions = (cve.descriptions as { lang: string; value: string }[]) ?? [];
  const description =
    descriptions.find((d) => d.lang === "en")?.value ?? "";

  // CVSS — prefer v3.1 > v3.0 > v2. Derive severity when the source omits it
  // (CVSS v2 records carry baseSeverity on the metric wrapper, or not at all).
  const metrics = (cve.metrics as Record<string, (Record<string, unknown> & { cvssData: Record<string, unknown> })[]>) ?? {};
  let cvss: CvssMetric = null;
  for (const [key, ver] of [
    ["cvssMetricV31", "3.1"],
    ["cvssMetricV30", "3.0"],
    ["cvssMetricV2", "2.0"],
  ] as const) {
    const arr = metrics[key];
    if (arr && arr.length) {
      const d = arr[0].cvssData;
      const score = Number(d.baseScore ?? 0);
      const rawSev = (d.baseSeverity ?? arr[0].baseSeverity) as string | undefined;
      cvss = {
        version: ver,
        score,
        severity: rawSev ?? deriveSeverity(ver, score),
        vector: String(d.vectorString ?? ""),
      };
      break;
    }
  }

  // CWE
  const weaknesses = (cve.weaknesses as { description: { value: string }[] }[]) ?? [];
  const cwes = [
    ...new Set(
      weaknesses
        .flatMap((w) => w.description ?? [])
        .map((d) => d.value)
        .filter((v) => v.startsWith("CWE-")),
    ),
  ].sort();

  // References
  const references: CveReference[] = (
    (cve.references as { url: string; tags?: string[] }[]) ?? []
  ).map((r) => ({ url: r.url, tags: r.tags ?? [] }));

  // Affected products (from configurations → nodes → cpeMatch)
  const affectedMap = new Map<string, AffectedProduct>();
  const configs = (cve.configurations as { nodes: { cpeMatch: Record<string, unknown>[] }[] }[]) ?? [];
  for (const cfg of configs) {
    for (const node of cfg.nodes ?? []) {
      for (const m of node.cpeMatch ?? []) {
        const criteria = String(m.criteria ?? "");
        const parts = criteria.split(":");
        const vendor = parts[3] ?? "";
        const product = parts[4] ?? "";
        if (!vendor || vendor === "*") continue;
        const start = m.versionStartIncluding as string | undefined;
        const end = m.versionEndExcluding as string | undefined;
        const range =
          start || end
            ? `${start ? `>= ${start}` : ""}${start && end ? " " : ""}${end ? `< ${end}` : ""}`.trim()
            : undefined;
        affectedMap.set(criteria, { vendor, product, cpe23: criteria, versionRange: range });
      }
    }
  }
  const affected = [...affectedMap.values()];

  const contentHash = sha256(
    JSON.stringify([description, cvss, cwes, references.map((r) => r.url), affected.map((a) => a.cpe23)]),
  );

  return {
    cveId: id,
    description,
    cvss,
    cwes,
    published: (cve.published as string | undefined)?.slice(0, 10),
    lastModified: (cve.lastModified as string | undefined)?.slice(0, 10),
    vulnStatus: cve.vulnStatus as string | undefined,
    references,
    affected,
    affectedCount: affected.length,
    kev: kev.get(id) ?? null,
    source: {
      name: "NVD",
      url: `https://nvd.nist.gov/vuln/detail/${id}`,
      license: "public-domain",
      retrievedAt,
    },
    contentHash,
  };
}

/** Parse a full NVD API response (single or list) into records. */
export function parseCveResponse(json: unknown, kev: KevMap): CveRecord[] {
  const vulns = (json as { vulnerabilities?: { cve: Record<string, unknown> }[] })?.vulnerabilities ?? [];
  return vulns.map((v) => parseCve(v.cve, kev));
}
