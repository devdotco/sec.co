# SEC.co Enrichment — Implementation Plan (incl. queue/job architecture)

## Deployment reality (corrected)
- SEC.co deploys via **Coolify** (org standard). **No `Dockerfile` is committed** — Coolify is building the marketing site via Nixpacks/buildpack auto-detection. That's fine for the static site.
- **The data layer must not run in the marketing web process.** Two deploy targets:
  1. **Marketing site** (existing) — unchanged; add `sitemap.ts` and the `/vulnerabilities/[cveId]` + hub routes that read from Postgres via ISR.
  2. **Ingestion/enrichment service** (new) — its own Coolify app with a committed **`Dockerfile` + Next/Node worker (or Python, matching Law.co)**, a Postgres, a dedicated Qdrant, and cron/queue. For the web app, if we co-locate DB reads, set `output: 'standalone'` and add a Dockerfile for reproducible builds.

## Component build order
1. **Postgres** (schema in `sec-schema.prisma`) — the source of truth.
2. **Ingestion connectors:** `KevConnector` (single JSON diff), `NvdCveConnector` (bulk initial + `lastModStartDate` deltas), later `CpeConnector`, `OsvConnector`. Each: Fetch → Parse → Normalize → provenance-stamp → upsert → content-hash.
3. **Enrichment worker:** reads records needing enrichment → Haiku 4.5 (Batch API for bulk) with the `sec-enrichment.schema.json` structured output → validate → store `enrichment_outputs` (versioned by prompt_version) → cost log.
4. **Embedder (selective):** local bge-small (384-dim) → dedicated Qdrant `sec_cve_records`. Only KEV/critical/high + hubs.
5. **Publisher / quality gate:** compute `page_quality_score` → set `published_pages.status` (index / noindex / review) → sitemap entries.
6. **Web routes:** `/vulnerabilities/[cveId]`, `/vulnerabilities/known-exploited`, `/vulnerabilities/severity/[level]`, `/vulnerabilities/year/[year]`, `/vendors/[vendor]/vulnerabilities`, `/products/[vendor]/[product]/vulnerabilities`, `/cwe/[cweId]`, `/cybersecurity-glossary/[term]`. ISR revalidate on record change.
7. **`sitemap.ts` + `robots`** (missing today) — segmented, progressive.
8. **Admin/control plane** (see `sec-admin-wireframe.md`).

## Queue / job architecture
Mirror Law.co's decision (Celery-on-Redis was its largest net-new infra item). SEC.co has no queue today.
```
Cron (Coolify scheduled / systemd timer)
  ├─ sync:kev        daily   → KevConnector           → source_sync_runs
  ├─ sync:nvd-delta  hourly  → NvdCveConnector(delta)  → source_sync_runs
  ├─ enrich:pending  cont.   → EnrichmentWorker (Batch)→ enrichment_outputs + ai_cost_logs
  ├─ embed:pending   cont.   → Embedder (bge-small)    → Qdrant
  ├─ score+publish   cont.   → QualityGate             → published_pages + sitemap_entries
  └─ sitemap:rebuild daily   → SitemapBuilder
```
- **Queue:** Redis + a worker (BullMQ if Node, Celery if Python-to-match-Law.co). Start simple: a DB-backed job table + cron if we want to avoid Redis in Phase 1.
- **Idempotency:** deterministic job keys (`cveId`+`prompt_version`); content-hash gates re-enrichment; Batch results keyed by `custom_id`.
- **Retry/backoff:** exponential; NVD rate-limit aware (get a free NVD API key → ~50 req/30s); dead-letter to `source_sync_errors`.
- **Dry-run / sample / production modes** on the enrichment worker.

## Enrichment call contract (validated live)
- Model `claude-haiku-4-5`, `max_tokens: 4096` (2000 truncated mid-JSON in testing — use ≥4096), `output_config.format = json_schema` (`sec-enrichment.schema.json`).
- System prompt enforces: never invent CVSS/KEV/affected-products/patch-versions/references; explain don't restate; no exploit code; 3–4 FAQ. (Verified: output was fact-faithful, no invented scores.)
- Bulk via **Batch API** (−50%). Per-record cost logged from `usage`.

## Guardrails from the assessment
- Separate raw / normalized / enriched / published / embeddings / SEO-meta / link-graph.
- Deterministic rendering of factual fields; AI for explanation only.
- Quality gate before `index`; human review for KEV/critical.
- Own Anthropic key for SEC.co (clean cost attribution) — confirm.

## Open items to confirm before Phase 1
- Coolify capacity for a dedicated Postgres + Qdrant (or use pgvector to start).
- SEC.co-specific Anthropic API key + Batch tier.
- Free NVD API key (raises delta-sync throughput).
