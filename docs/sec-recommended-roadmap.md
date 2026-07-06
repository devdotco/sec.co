# SEC.co Enrichment — Recommended Roadmap

**First dataset: NVD CVE + CISA KEV.** KEV (1,631 records) is the prioritization layer — enrich those first. OSV/open-source is Phase 4.

## Phase 0 — Assessment ✅ (this doc set)
Repo/infra inspected, vector-infra reuse decided, sources licensed, cost measured, page-length proven, go/no-go issued.

## Phase 1 — Dev prototype (~$50, unpublished) — **the gate**
- Stand up ingestion service + Postgres (or pgvector fallback).
- Ingest KEV (all 1,631) + 1k–10k CVEs (bulk).
- Normalize; content-hash; provenance-stamp.
- Enrich ~500–1,000 with Haiku 4.5 (measured ~$0.006 each batched).
- Render **unpublished** `/vulnerabilities/[cveId]` previews.
- **Exit criteria:** per-record cost confirmed ≤ ~$0.007; ≥90% of sample pages pass quality gate; no fact hallucinations on a 50-page spot-check; render p95 acceptable.

## Phase 2 — Limited production pilot (~$60)
- Ingest 10k CVEs; publish only 500–1,000 high-quality (KEV + critical) pages.
- Ship `sitemap.ts` (currently missing) as a **segment**; submit to Search Console.
- `noindex` weaker pages. Monitor indexation, load, cost, crawl for 3–4 weeks.
- **Exit criteria:** healthy indexed ratio, no manual actions, stable crawl, cost on-model.

## Phase 3 — Full CVE expansion (~$1,500 one-time)
- Ingest all ~240k CVEs; enrich high-value first (KEV → critical → high → by year/severity).
- Publish progressively (sitemap waves). Launch vendor/product hub pages (after CPE normalization).
- Add internal-link graph + related-vuln (vector) linking. Search Console monitoring at scale.

## Phase 4 — OSV / open-source & supply-chain hub
- Ingest OSV per-ecosystem; build package/version/advisory pages (attribution per record).
- Optional: connect DEV.co package content if relevant. Supply-chain security content hub.

## Phase 5 — Tools & conversion layer
- CVE prioritizer, dependency-risk checker, CVSS calculator; vCISO / risk-assessment CTAs; lead capture; account-based assessment funnel.

## 30/60/90
- **30 days:** confirm deploy target; provision Postgres (+ dedicated Qdrant or pgvector); build ingestion (KEV + NVD connector) + `SecMeta`-style provenance table; add `sitemap.ts`; `/vulnerabilities/[cveId]` template with source/AI separation; enrich + publish a limited monitored KEV pilot; wire Search Console.
- **60 days:** 10k-CVE pilot published behind quality gate; indexation monitoring; CPE normalization spike.
- **90 days:** decision to scale to full corpus based on Phase-2 signals; begin vendor/product hubs.

## Explicitly NOT yet
Mass ingestion, full-corpus enrichment, OSV, vendor/product explosion, tools layer, embeddings-for-all-pages — all gated behind Phase-1/2 exit criteria.
