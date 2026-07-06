# SEC.co Enrichment — Cost Model (measured)

**Date:** 2026-07-06 · **Basis:** live Haiku 4.5 enrichment of 3 real CVEs + verified model pricing.

## 1. Verified model pricing (2026-07)
| Model | Input $/MTok | Output $/MTok | Batch |
|---|---|---|---|
| Haiku 4.5 (`claude-haiku-4-5`) | $1.00 | $5.00 | −50% |
| Sonnet 5 (`claude-sonnet-5`) | $3.00 ($2 intro→2026-08-31) | $15.00 ($10 intro) | −50% |
| Opus 4.8 | $5.00 | $25.00 | −50% |
Embeddings: **local `BAAI/bge-small-en-v1.5` (384-dim, CPU) = $0** (Law.co pattern). No embedding-API line item.

## 2. Measured per-CVE enrichment (Haiku 4.5, 14-field structured JSON)
| CVE | in_tok | out_tok | $ standard | $ batch |
|---|---|---|---|---|
| CVE-2021-44228 (Log4Shell) | 1,638 | 2,584 | 0.01456 | 0.00728 |
| CVE-2023-34362 (MOVEit) | 1,235 | 1,872 | 0.01060 | 0.00530 |
| CVE-2024-3400 (PAN-OS) | 1,089 | 1,773 | 0.00995 | 0.00498 |
| **avg** | **1,321** | **2,076** | **0.01170** | **0.00585** |

**Output tokens dominate** ($5 vs $1/MTok). The cost lever is enrichment length, not input; prompt-caching the shared system+schema saves little.

## 3. Enrichment cost by corpus size & tier
| Records | Minimal (~$0.003) | **Standard batch (~$0.0059)** | Premium Sonnet (~$0.013) |
|---|---|---|---|
| 10,000 | ~$30 | **~$59** | ~$130 |
| 50,000 | ~$150 | **~$295** | ~$650 |
| 100,000 | ~$300 | **~$590** | ~$1,300 |
| 250,000 (≈full CVE) | ~$750 | **~$1,460** | ~$3,250 |
| 500,000 | ~$1,500 | **~$2,950** | ~$6,500 |
| 1,000,000 | ~$3,000 | **~$5,900** | ~$13,000 |

**Recommended blend:** premium (Sonnet 5) on ~1,200 KEV + ~4k critical (~$70); standard Haiku on the rest. Full 250k ≈ **~$1,500 one-time**.

## 4. Other cost lines
| Line | Estimate | Notes |
|---|---|---|
| Embeddings compute | $0 | local bge-small; selective subset only |
| Vector DB (Qdrant) | ~$0 marginal / small dedicated VM (~$5–15/mo Hetzner) | 384-dim, 250k vectors ≈ ~0.4 GB |
| Postgres storage | low tens of GB | raw+enriched corpus; existing/new small instance |
| Ingestion/enrichment service | small worker (existing Coolify box or ~$10–20/mo VM) | |
| NVD/OSV/KEV bandwidth | negligible | bulk + deltas |

## 5. Ongoing monthly (low / base / high)
| | Low | Base | High |
|---|---|---|---|
| Daily NVD delta enrich (~50–200 new/changed/day, batch) | ~$5 | ~$15 | ~$40 |
| Re-enrichment of changed records (content-hash gated) | ~$5 | ~$25 | ~$120 |
| Model calls for on-site semantic features | ~$0 | ~$10 | ~$40 |
| Infra (Postgres + Qdrant VM + worker + monitoring) | ~$20 | ~$60 | ~$150 |
| **Total / mo** | **~$35** | **~$110** | **~$350** |

## 6. Initial build (one-time)
- Pilot (Phase 1, 1k CVEs + KEV, ~500–1k enrich): **< $50** model spend.
- Full CVE corpus enrichment: **~$1,500** model spend.
- Dev time: separate line — ingestion service + schema + page template + sitemap + admin ≈ the bulk of real investment.

## 7. Dashboard items to confirm manually (not in local config)
- Anthropic account rate-limit tier (Batch throughput for 250k jobs).
- Whether SEC.co enrichment runs on its **own** Anthropic key (recommended, for clean cost attribution) vs the shared `ENRICHMENT_ANTHROPIC_API_KEY`.
- Hetzner/Coolify capacity for a dedicated Postgres + Qdrant.
