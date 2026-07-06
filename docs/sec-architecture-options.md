# SEC.co Enrichment — Storage & Search Architecture Options

**Recommendation: Option A (Postgres-first, vector-selective) with a dedicated self-hosted Qdrant.** Rationale and the alternatives below.

## Evaluation of the five options

| Option | Complexity | Monthly $ | Scaling risk | Ops burden | Isolation | Query speed | Backup | Fit w/ Law.co | Long-term SEC.co fit |
|---|---|---|---|---|---|---|---|---|---|
| **A. Postgres-first** (vector only for semantic) | Low–Med | Low | Low | Low | High | Fast (indexed SQL joins) | pg_dump + Qdrant snapshot | Reuses pattern, own data | **Best** |
| B. Qdrant-heavy (metadata filtering in Qdrant) | Med | Low–Med | Med (Qdrant not a relational store) | Med | Med | Fast vec, awkward joins | snapshot | partial | Poor — CVE↔CPE↔vendor joins are relational |
| C. Pinecone-heavy | Med | **Med–High** (serverless $) | Med | Low | **Low** (shared) | Fast vec | provider | **Against org direction** (migrating off) | Poor |
| D. Hybrid Pinecone + Qdrant | High | Med–High | High | High | Low | — | two systems | worst | Poor (over-engineered) |
| E. pgvector | **Lowest** | Lowest | Med at high volume | Lowest (one datastore) | High | Good ≤ ~1–2M vectors | pg_dump | neutral | **Good Phase-1 fallback** |

## Recommended: Option A

```
Sources (NVD/KEV/OSV) ──▶ Ingestion service ──▶ POSTGRES (source of truth)
                                                   ├─ raw_*            (verbatim source)
                                                   ├─ cve/cpe/vendor/product/kev  (normalized)
                                                   ├─ enrichment_outputs          (AI prose, versioned)
                                                   ├─ published_pages / sitemap / internal_links
                                                   └─ *_sync_runs / *_cost_logs
                                                        │
                        selective embed (bge-small,$0) ─┘
                                                        ▼
                                   QDRANT (dedicated) — sec_cve_records,
                                   sec_vendor_product_entities  (semantic "related" only)
                                                        │
Next.js 16 app  ◀── ISR/static render from Postgres ────┘   (marketing site unchanged;
   /vulnerabilities/[cveId], /vendors/[v]/…                   data pages read the DB)
```

- **Postgres = source of truth & join engine.** Everything structured + all page metadata.
- **Qdrant (dedicated instance) = embeddings only, selective subset.** "Related vulnerabilities / related content." Local bge-small, 384-dim, $0 compute.
- **Most records are never embedded** (CPE rows, logs, low-value CVEs). Embed KEV + critical/high + vendor/product hubs first.
- **Publishing:** the data pages render from Postgres via ISR; the existing marketing site and its markdown blog are untouched. Ingestion/enrichment run in a **separate service/process**, never in the web runtime.

### Why not the others
- **Pinecone (C/D):** org is migrating *off* Pinecone → Qdrant (`law-co-backend/scripts/migrate_pinecone_to_qdrant.py`). Adopting it now adds serverless cost + cross-tenant isolation risk and fights the org direction.
- **Qdrant-heavy (B):** you need real relational joins (CVE↔CPE↔vendor↔KEV↔CWE); a vector DB is the wrong home for canonical data.
- **pgvector (E):** legitimate and simplest — **use it as the Phase-1 fallback** if we'd rather not run a second datastore during the prototype. Migrate to dedicated Qdrant when semantic volume/features grow.

## Vector isolation decision (important)
Given SEC.co is a plausible future **spinout/sale**, do **not** share Law.co's Qdrant instance/collections. Use a **dedicated Qdrant instance** for SEC.co (collections `sec_cve_records`, `sec_vendor_product_entities`, later `sec_osv_records`). This removes accidental-deletion, namespace-collision, cost-attribution, backup-scope, and clean-carve-out risk in one move, at trivial cost (384-dim vectors are tiny). Reuse Law.co's *embedding model and code pattern*, not its *data*.

## Data separation (never co-mingle)
1. raw source → 2. normalized → 3. AI-enriched → 4. published content → 5. embeddings → 6. SEO metadata → 7. internal-link graph. Each is a distinct table/store so re-enrichment, re-embedding, and un-publishing are independent operations.
