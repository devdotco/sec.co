# SEC.co Public-Data Enrichment & Programmatic SEO — Phase 0 Assessment

**Status:** Assessment only. No ingestion, no publishing. Go/no-go decision doc.
**Date:** 2026-07-06
**Sibling reference:** Law.co public-record enrichment (`law-co-backend`, `docs/case-ingestion-plan.md`)
**Repo under assessment:** `github.com/devdotco/sec.co` (checkout: `~/sec.co`)

---

## 0. Executive summary (read this first)

| Question | Answer |
|---|---|
| **Can the current server/app handle this?** | **No — because there is no data infrastructure to handle it *with*.** SEC.co today is a static Next.js 16 marketing site with a file-based markdown blog, no database, no queue, no vector store, no cron, and no sitemap. Bulk ingestion wouldn't "overload" it — there's simply nowhere for the data to go. The work is **additive**: stand up a separate ingestion/enrichment service + its own Postgres, publish pages into the Next.js app via static/ISR. Do **not** run ingestion inside the marketing site's runtime. |
| **What must be upgraded / added?** | A dedicated Postgres; an ingestion + enrichment worker service (Law.co's Celery-on-Redis pattern); a Qdrant collection for selective embeddings; a `sitemap.ts` (missing today); a page-quality gate; a small admin/control plane. None of this exists yet. |
| **Reuse Pinecone?** | **No.** The org is actively migrating *off* Pinecone *onto* self-hosted Qdrant (`law-co-backend/scripts/migrate_pinecone_to_qdrant.py`). Starting a new project on Pinecone serverless would swim against that direction and add cost + isolation risk. |
| **Reuse Qdrant?** | **Yes — but in a dedicated collection namespace, ideally a dedicated instance.** Qdrant self-hosted on Hetzner is the org's forward direction. Given SEC.co is a plausible future spinout/sale, isolate its vectors from Law.co's 14.75M-vector corpus (separate instance preferred; separate collections at minimum). |
| **What lives in Postgres?** | Everything structured and canonical: CVE/CPE/vendor/product/KEV records, enrichment outputs, page metadata, sitemap entries, internal-link graph, sync runs, cost logs. Postgres is the source of truth. |
| **What lives in the vector DB?** | **Only embeddings, and only for the subset of pages where semantic "related-vulnerability / related-content" retrieval adds value** (CVE descriptions, vendor/product hubs). Most records never need embeddings. |
| **Estimated initial cost** | **Pilot (Phase 1): < $50** all-in. **Full CVE corpus enrichment (~250k CVEs): ~$1,460 one-time** in model spend (Haiku 4.5 via Batch API) — **measured, see §5**, up from an earlier ~$940 desk estimate because real enrichment output is richer. Embeddings **$0** if we mirror Law.co's local `bge-small` model. |
| **Estimated ongoing monthly** | **Low ~$40 / Base ~$150 / High ~$400** (daily NVD+KEV deltas, re-enrichment of changed records, sitemap regen, vector storage on existing box, model calls, monitoring). |
| **Cheapest safe version** | Postgres-first + local `bge-small` embeddings ($0) on a selective subset + self-hosted Qdrant + Haiku-batch enrichment + static/ISR publishing. |
| **Best scalable version** | Same, plus a **dedicated** Qdrant instance for isolation, an EPSS+KEV prioritization layer to enrich high-value first, an admin control plane, and a human-review queue for high-value pages. |
| **Recommended first dataset** | **NVD CVE + CISA KEV.** KEV is the ~1,200-record prioritization layer that tells you which CVEs are worth premium enrichment first. OSV/open-source comes later (Phase 4). |
| **Biggest risks** | (1) **SEO** — programmatic thin-content penalty on a trust-sensitive (YMYL-adjacent) cyber domain; (2) **hallucinated remediation / incorrect security advice** → liability; (3) the data layer **doesn't exist yet** (real build effort); (4) **stale vuln data** if sync breaks; (5) **shared-vector isolation** with Law.co. |
| **What NOT to build yet** | Mass ingestion, full-corpus enrichment, OSV expansion, vendor/product page explosion, the tools layer (calculators/scanners), and embeddings-for-all-pages. |
| **Go / No-Go** | **Conditional GO for a Phase 1 dev prototype** (1k CVEs + KEV, ~$5 of enrichment, unpublished previews). **NO-GO on mass ingestion or any production publishing** until the pilot proves per-record cost + page quality against a bar, and the data-layer infra is stood up separately from the marketing site. |

---

## 1. Infrastructure readiness (Step 1) — inspected, not assumed

Classification per component: **Ready / Minor / Major / Not present / Unknown.**

| Component | State today | Verdict |
|---|---|---|
| Framework | Next.js 16.2.6, React 19, Tailwind v4 | **Ready** |
| Hosting / deploy flow | README is default `create-next-app`; no Dockerfile/Coolify config in repo. Org norm is Coolify-on-Hetzner. Where/whether sec.co is deployed is **not evidenced in the repo**. | **Unknown — verify** |
| Runtime | Node / Next server (App Router, RSC) | **Ready** |
| Database | **None.** No Prisma, no `pg`, no `DATABASE_URL`. Env has only `RESEND_*`. | **Not present** |
| ORM / query layer | None | **Not present** |
| CMS | None — blog is markdown files (`src/content/blog/*.md`) via `gray-matter`+`remark` | **Not present** (fine for now) |
| Search | None | **Not present** |
| Sitemap generation | **No `sitemap.ts`, no robots** | **Not present** (blocker for SEO play) |
| Blog/content structure | ~130 markdown posts, file-based | **Minor** (won't scale to 100k+ pages this way — programmatic pages must be DB-driven) |
| Dynamic routes | `blog/[slug]`, `tools/[slug]`, `resources/guides/[topic]`, `resources/downloads/[asset]` | **Ready** (pattern proven; add `vulnerabilities/[cveId]` etc.) |
| API routes | `api/contact` (Resend) only | **Minor** |
| Cron / jobs | None | **Not present** |
| Queue / background workers | None | **Not present** |
| Logging / monitoring | None evident | **Not present** |
| Error handling | Standard Next; contact route handles errors | **Minor** |
| Cache layer | None (no Redis) | **Not present** |
| CDN / cache behavior | Whatever the (unverified) host provides | **Unknown** |
| Env / secrets | `.env.example` → `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | **Ready** (minimal) |
| Analytics / Search Console | Not evident in repo | **Unknown** |
| Server CPU/RAM/disk | N/A (no dedicated server provisioned for data work) | **Not present** |
| Would bulk ingestion overload prod? | Not applicable — ingestion must run in a **separate** service, never in the marketing site's process. | n/a |

**Local dev machine** (for prototyping / batch runs): 8 cores, 16 GB RAM, ~124 GB free. Adequate for a Phase 1 prototype and for running local `bge-small` embeddings.

**Headline:** the marketing site is healthy and well-built; the *enrichment platform* is a from-scratch add-on. Treat them as two systems that share a domain.

---

## 2. Vector / LLM infrastructure assessment (Step 2) — what actually exists org-wide

Inspected across `~/Projects/*` (env var *names* and integration files only; no secret values read).

| Capability | Where it lives | Notes for SEC.co |
|---|---|---|
| **Pinecone** | `law-co-backend` (`PINECONE_API_KEY`, `PINECONE_INDEX_NAME`), PEI app | Index `lawcoseverless`, ~14.75M vectors, 384-dim. **Being migrated away from.** |
| **Qdrant** | `law-co-backend` (`QDRANT_URL`, `QDRANT_API_KEY`), self-hosted on Hetzner | **The forward direction.** Reuse the *pattern*, isolate the *data*. |
| **Embeddings** | Law.co: `BAAI/bge-small-en-v1.5`, **384-dim, local CPU** | **Embedding cost = $0.** Strongly recommend SEC.co mirror this. |
| **Anthropic** | `ANTHROPIC_API_KEY` across ~89 references; Law.co `chat_complete()` is provider-agnostic (Opus/Sonnet default, bulk on cheaper tiers via Batch API) | Enrichment plugs into the same pattern. |
| **OpenAI / Voyage / Cohere** | Present in Law.co/PEI (Voyage, OpenAI) | Not needed if we use local `bge-small`. |

**Reuse decision & namespacing.** Do **not** inherit Pinecone. Reuse self-hosted **Qdrant** with SEC.co-owned collections:
- `sec_cve_records`
- `sec_vendor_product_entities`
- `sec_osv_records` (Phase 4)

**Isolation risks with a shared Qdrant** (cost attribution, accidental deletion, namespace collision, query contention, backup scope, and — critically — **future sale/spinout of SEC.co**) argue for a **dedicated Qdrant instance** for SEC.co rather than sharing Law.co's. It's cheap (384-dim vectors are tiny: even 1M vectors ≈ ~1.5 GB raw) and removes the entire class of cross-tenant risk. Recommend a dedicated instance.

---

## 3. Data sources (Step 3) — the green light

All four primary sources are **public domain or permissively licensed and explicitly allow commercial reuse, AI enrichment, and derivative pages.** This is the foundation the whole play rests on.

| Source | Access | License / reuse | ~Volume | Role |
|---|---|---|---|---|
| **NVD CVE** (NVD 2.0 API + CVE List v5 bulk on GitHub) | REST API (2,000/page; ~5 req/30s no key, ~50 req/30s with free key; `lastModStartDate` incremental) **or** bulk JSON | US Gov work → **public domain**; attribution courtesy | ~240k+ CVEs | **Primary — first dataset.** Bulk for initial load, API for daily deltas. |
| **NVD CPE dictionary + match feeds** | API / feeds | Public domain | ~1.3M CPE names | Powers vendor/product pages; **normalization is the hard part** (noisy vendor/product strings). |
| **CISA KEV** | Single JSON/CSV | US Gov → **public domain** | ~1,200 entries | **Prioritization layer** — which CVEs are actively exploited. Join on CVE ID. Enrich these first. |
| **OSV.dev** | Per-ecosystem bulk zips (GCS) + API | Apache-2.0 / CC-BY, reuse allowed | 150k+ advisories across npm/PyPI/Maven/Go/crates.io/etc. | **Phase 4** open-source/supply-chain hub. |

**Phase-2+ (high-level, gate on licensing each time):** EPSS (FIRST.org, CC, daily CSV — great prioritization signal), CWE/CAPEC/ATT&CK (MITRE, free w/ attribution), GitHub Security Advisories (overlaps OSV). **Flag:** Exploit-DB, Vulners, Shodan/Censys carry licensing/ethics constraints — do not ingest without explicit review, and never publish exploit instructions or weaponized PoCs.

---

## 4. Storage & search architecture (Step 5) — recommendation

**Recommended: Option A — Postgres-first, vector-selective.**

- **Postgres** is the canonical store for *all* structured records and all published-page metadata. It's the source of truth, the join engine (CVE↔CPE↔vendor↔KEV↔CWE), and what the Next.js pages render from (via a read replica or the app's own connection, ISR-cached).
- **Qdrant (self-hosted, dedicated)** holds embeddings for **only** the pages where semantic similarity is a feature — "related vulnerabilities," "similar issues in this product." Generated with **local `bge-small` (384-dim, $0)**.
- **Not every record gets embedded.** Embed CVE descriptions and vendor/product hubs selectively (start with KEV + critical/high). CPE rows, sync logs, cost logs → Postgres only.

Why not the alternatives: Pinecone-heavy (against org direction, cost, isolation); Qdrant-heavy for canonical data (wrong tool — you need relational joins); pgvector (viable and simplest, but the org already runs Qdrant and Law.co's retrieval pattern is Qdrant — reuse the muscle memory). pgvector remains a legitimate fallback if we want to avoid running a second datastore in Phase 1.

**Separate these concerns explicitly (never co-mingle):** (1) raw source data, (2) normalized records, (3) AI-enriched fields, (4) published content, (5) embeddings, (6) SEO metadata, (7) internal-link graph.

---

## 5. Cost model (Step 6) — grounded in verified pricing

**Model pricing (verified via the claude-api reference, 2026-07):** Haiku 4.5 = $1/$5 per MTok in/out; Sonnet 5 = $3/$15 (intro $2/$10 through 2026-08-31); Opus 4.8 = $5/$25. **Batch API = 50% off.**

**MEASURED (2026-07-06) — live Haiku 4.5 enrichment of 3 real CVEs (Log4Shell, MOVEit, PAN-OS):**
- Avg input ≈ 1,320 tok, avg **output ≈ 2,076 tok** (14-field structured JSON incl. FAQ). Output tokens dominate cost.
- Standard ≈ **$0.0117 / CVE**; **Batch (−50%) ≈ $0.0059 / CVE**. This is ~50% above the initial desk estimate because the enrichment is richer than the 1,200-token output I first assumed.
- **The cost lever is output length, not input** (Haiku output is $5/MTok vs input $1). Prompt caching the shared system+schema saves little here. To hit a lower $/CVE, trim fields/length — which trades directly against page richness (see §6 thin-content tradeoff).

| Records | Minimal* (~$0.003) | **Standard batched (~$0.0059, measured)** | Premium** (~$0.013) |
|---|---|---|---|
| 10,000 | ~$30 | **~$59** | ~$130 |
| 50,000 | ~$150 | **~$295** | ~$650 |
| 100,000 | ~$300 | **~$590** | ~$1,300 |
| 250,000 (≈ full CVE corpus) | ~$750 | **~$1,460** | ~$3,250 |
| 500,000 | ~$1,500 | **~$2,950** | ~$6,500 |
| 1,000,000 | ~$3,000 | **~$5,900** | ~$13,000 |

\*Minimal = trimmed field set (summary + remediation + meta only, ~600–800 output tok). \*\*Premium = Sonnet 5 for high-value pages. Recommended: premium on ~1,200 KEV + a few thousand critical CVEs (~$60–120 total), standard-Haiku for the long tail.

**Page-length result (same test):** avg assembled page **~1,380 words / ~6.9 min read**; source prose alone averages only ~108 words (thin). Even a sparse-source CVE (57 source words) enriched to 1,115 words. **Conclusion: pages are not thin — the risk is the opposite (AI-padded uniformity), which the §6 controls address.**

- **Embeddings: $0** (local `bge-small`), assuming we mirror Law.co. Only compute + a few GB of storage.
- **Vector DB: ~$0 marginal** — Qdrant runs on the existing/dedicated Hetzner box; 384-dim vectors are tiny. A dedicated small instance is the only real line item (~existing box or a small Hetzner VM).
- **Postgres storage:** raw + enriched CVE corpus is low tens of GB — trivial.

**Ongoing monthly (low / base / high):** **~$40 / ~$150 / ~$400** — dominated by re-enrichment of changed records + daily model calls; storage/vector/cron are near-noise.

---

## 6. SEO & content risk (Step 7) — the real risk, not the infra

A cybersecurity domain publishing 100k+ auto-generated pages is exactly the profile Google's helpful-content / scaled-content-abuse systems target. This is the single biggest threat to the initiative's value.

**Mandatory safeguards (build these into the pipeline, not as an afterthought):**
1. **Quality-score gate** — only publish pages above a threshold; everything else `noindex` until enriched.
2. **Deterministic source rendering for factual fields** — CVSS, KEV status, affected products, references, dates come **from source data only**, rendered by code. The AI **never** invents these.
3. **AI = explanation layer only** — plain-English summary, business impact, remediation guidance, FAQ. Clearly separated from the source facts on the page.
4. **Provenance on every page** — source, source URL, "last updated," license. This is both trust signal and takedown audit trail (Law.co pattern).
5. **Progressive sitemap release** + Search Console monitoring + a documented **indexation rollback plan**.
6. **Canonicalization** of near-duplicate variants; human review for high-value (KEV/critical) pages.
7. **YMYL discipline** — disclaimers, no exploit instructions, no weaponized PoCs, never assert a *named company* is vulnerable from this public data.

---

## 7. Recommended phased rollout (Steps 11) & first-30-days

- **Phase 0 — Assessment (this doc).** ✅
- **Phase 1 — Dev prototype (~$5, unpublished):** stand up ingestion service + Postgres; ingest KEV + 1k–10k CVEs; normalize; enrich ~500–1,000 with Haiku; render **unpublished** `/vulnerabilities/[cveId]` previews; measure real per-record cost + quality; benchmark render.
- **Phase 2 — Limited pilot (~$40):** ingest 10k CVEs; publish only 500–1,000 high-quality (KEV/critical) pages; ship `sitemap.ts` (a segment); monitor indexation, load, cost; `noindex` weaker pages.
- **Phase 3 — Full CVE (~$1k one-time):** ingest all CVEs; enrich high-value first (KEV → critical → by year/severity); add vendor/product pages + internal linking.
- **Phase 4 — OSV / open-source & supply-chain hub.**
- **Phase 5 — Tools & conversion layer** (CVE prioritizer, dependency-risk checker, vCISO/assessment CTAs).

**First 30 days:** (1) confirm deploy target + provision a dedicated Postgres and (dedicated) Qdrant; (2) build the ingestion service off the Law.co blueprint (KEV + NVD connector, provenance-stamped `SecMeta`-style table, content-hash change detection); (3) add the missing `sitemap.ts`; (4) build `/vulnerabilities/[cveId]` template with deterministic-facts + AI-explanation separation; (5) enrich + publish a **limited, monitored** KEV pilot behind a quality gate; (6) wire Search Console.

---

## 8. Deliverables status

This is the anchor assessment (covers Steps 1, 2, 3, 5, 6, 7, 11, 13). Still to produce on request, as separate files:
`sec-cost-model.md` · `sec-data-source-review.md` · `sec-architecture-options.md` · `sec-recommended-roadmap.md` · `sec-seo-risk-controls.md` · `sec-implementation-plan.md`, plus the Postgres schema, queue/job architecture, enrichment JSON schema, a sample CVE page object, and an admin wireframe. Say the word and I'll generate them.

**Go/No-Go: conditional GO for Phase 1 only. NO-GO on mass ingestion / production publishing until the pilot proves cost + quality and the data layer is stood up separately from the marketing site.**
