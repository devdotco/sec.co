/**
 * SEC.co vulnerability-intelligence types (Phase 1 prototype).
 *
 * These are the normalized shapes the ingestion pipeline produces and the
 * pages render from. The production target is Postgres (see
 * docs/sec-schema.prisma); Phase 1 uses a file-backed store behind the
 * repository interface in ./store.ts so the pipeline runs with zero external
 * services. Nothing here is coupled to the storage backend.
 */

/** Provenance stamped on every source record — the takedown/audit trail. */
export type Provenance = {
  name: string; // 'NVD' | 'CISA KEV'
  url: string;
  license: string; // 'public-domain' | 'cc-by-4.0' | ...
  retrievedAt: string; // ISO
};

export type CvssMetric = {
  version: string; // '3.1' | '3.0' | '2.0'
  score: number;
  severity: string; // CRITICAL | HIGH | MEDIUM | LOW | N/A
  vector: string;
} | null;

export type CveReference = { url: string; tags: string[] };

export type AffectedProduct = {
  vendor: string;
  product: string;
  cpe23: string;
  versionRange?: string;
};

/** CISA Known Exploited Vulnerabilities info, joined onto a CVE at ingest. */
export type KevInfo = {
  vulnerabilityName: string;
  dateAdded: string;
  dueDate?: string;
  requiredAction: string;
  knownRansomwareCampaignUse: string; // 'Known' | 'Unknown'
};

/** Normalized CVE record — the deterministic SOURCE layer (never AI-written). */
export type CveRecord = {
  cveId: string; // canonical uppercase, e.g. CVE-2021-44228
  description: string;
  cvss: CvssMetric;
  cwes: string[];
  published?: string;
  lastModified?: string;
  vulnStatus?: string; // NVD: Analyzed | Modified | Rejected | Awaiting Analysis ...
  references: CveReference[];
  affected: AffectedProduct[];
  affectedCount: number;
  kev: KevInfo | null;
  source: Provenance;
  contentHash: string; // gates re-enrichment
};

/** AI enrichment — the EXPLANATION layer. Matches sec-enrichment.schema.json. */
export type EnrichmentData = {
  plain_english_summary: string;
  technical_summary: string;
  business_impact: string;
  affected_systems_summary: string;
  exploitability_summary: string;
  remediation_summary: string;
  patch_guidance: string;
  detection_guidance: string;
  prioritization_reason: string;
  risk_score_explanation: string;
  faq: { q: string; a: string }[];
  seo_title: string;
  seo_description: string;
  disclaimers: string;
};

export type Enrichment = {
  data: EnrichmentData;
  model: string;
  promptVersion: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number; // batch-equivalent not applied here; standard rate
  wordCount: number;
  sourceHash: string; // contentHash the enrichment was generated against
  createdAt: string;
};

export type IndexState = "index" | "noindex" | "review";

export type PageMeta = {
  slug: string; // lowercase, e.g. cve-2021-44228
  canonicalUrl: string; // https://sec.co/vulnerabilities/cve-2021-44228
  indexState: IndexState;
  qualityScore: number;
  reasons: string[];
};

/** The full stored unit: source + optional enrichment + optional page decision. */
export type StoredVuln = {
  record: CveRecord;
  enrichment?: Enrichment;
  page?: PageMeta;
};
