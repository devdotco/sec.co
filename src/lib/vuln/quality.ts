/**
 * Page quality gate + enrichment pre-screen. Two decision points:
 *
 *   preScreen(record)  — BEFORE enrichment. Cheap exclusion so we never pay to
 *                        enrich a page we would never index (rejected/disputed
 *                        CVEs, thin-source stubs). Saves enrichment spend.
 *   scoreVuln(rec,enr) — AFTER enrichment. Final index / review / noindex.
 *
 * See docs/sec-seo-risk-controls.md. Tuned so an 8-word source stub cannot
 * reach the index threshold on the strength of AI padding alone.
 */
import type { CveRecord, Enrichment, IndexState, PageMeta } from "./types";

const THRESHOLD = 0.62;
const TARGET_WORDS = 900;
const MIN_DESC_WORDS = 12; // below this a source is a stub, not an article
const MIN_YEAR = 2000; // pre-2000 CVEs are low search value — don't index (KEV exempt)

export function descWordCount(r: CveRecord): number {
  return r.description.split(/\s+/).filter(Boolean).length;
}

/** Rejected/disputed CVEs must never be published. */
function rejectionReason(r: CveRecord): string | null {
  const status = (r.vulnStatus ?? "").toLowerCase();
  if (status.includes("reject")) return "rejected CVE";
  if (status.includes("disput")) return "disputed CVE";
  if (/\*\*\s*REJECT/i.test(r.description)) return "rejected CVE";
  if (/\*\*\s*DISPUTED/i.test(r.description)) return "disputed CVE";
  return null;
}

/** Decide eligibility BEFORE spending on enrichment. */
export function preScreen(r: CveRecord): { eligible: boolean; reason?: string } {
  const rej = rejectionReason(r);
  if (rej) return { eligible: false, reason: rej };
  if (descWordCount(r) < MIN_DESC_WORDS && !r.kev) {
    return { eligible: false, reason: `source too thin (<${MIN_DESC_WORDS} words)` };
  }
  const year = Number(r.published?.slice(0, 4));
  if (year && year < MIN_YEAR && !r.kev) {
    return { eligible: false, reason: `pre-${MIN_YEAR} (low search value)` };
  }
  // Defer un-analyzed CVEs (no CVSS, not exploited) — re-enriched once NVD
  // assigns a score (content hash changes). Avoids paying to enrich noindex pages.
  if (!r.cvss && !r.kev) {
    return { eligible: false, reason: "awaiting CVSS score" };
  }
  return { eligible: true };
}

export function scoreVuln(
  record: CveRecord,
  enrichment: Enrichment | undefined,
): PageMeta {
  const reasons: string[] = [];
  const pre = preScreen(record);
  const dw = descWordCount(record);

  // Source completeness (0..1): description richness carries most of the weight.
  const srcDesc = Math.min(1, dw / 40) * 0.5;
  const srcFacts =
    (record.cvss ? 0.25 : 0) +
    (record.references.length ? 0.15 : 0) +
    (record.affectedCount ? 0.1 : 0);
  const src = Math.min(1, srcDesc + srcFacts);

  // Enrichment richness (0..1), zero if missing or stale.
  const rich =
    enrichment && enrichment.sourceHash === record.contentHash
      ? Math.min(1, enrichment.wordCount / TARGET_WORDS)
      : 0;

  // Signal (0..1): actively exploited or severe.
  const sev = record.cvss?.severity ?? "N/A";
  const signal = record.kev
    ? 1
    : sev === "CRITICAL" ? 0.9
    : sev === "HIGH" ? 0.7
    : sev === "MEDIUM" ? 0.45
    : sev === "LOW" ? 0.25
    : 0.15;

  const score = Number((0.4 * src + 0.35 * rich + 0.25 * signal).toFixed(3));

  let indexState: IndexState;
  if (!pre.eligible) {
    indexState = "noindex";
    reasons.push(pre.reason!);
  } else if (!enrichment) {
    indexState = "noindex";
    reasons.push("not enriched");
  } else if (enrichment.sourceHash !== record.contentHash) {
    indexState = "noindex";
    reasons.push("enrichment stale vs source");
  } else if (score < THRESHOLD) {
    indexState = "noindex";
    reasons.push(`score ${score} < ${THRESHOLD}`);
  } else if (record.kev || sev === "CRITICAL") {
    indexState = "review"; // high-value → human review before indexing
    reasons.push("high-value: hold for review");
  } else {
    indexState = "index";
  }

  const slug = record.cveId.toLowerCase();
  return {
    slug,
    canonicalUrl: `https://sec.co/vulnerabilities/${slug}`,
    indexState,
    qualityScore: score,
    reasons,
  };
}
