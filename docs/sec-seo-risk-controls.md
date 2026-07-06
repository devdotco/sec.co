# SEC.co — SEO & Content Risk Controls

**The measured pages are ~1,380 words (not thin). The real SEO risk is the opposite: scaled, uniform, AI-generated pages on a trust-sensitive (YMYL-adjacent) cybersecurity domain — exactly Google's scaled-content-abuse / helpful-content target.** These controls are mandatory, not optional.

## Risk register
| Risk | Severity | Control |
|---|---|---|
| Thin content | **Low (measured)** | Pages avg ~1,380 words; still gate: **don't publish < quality threshold**, `noindex` until it clears. |
| **AI-padded uniformity** (every page same 14-section skeleton) | **High** | Vary structure by CVE profile (KEV vs low-severity vs no-CVSS get different templates); suppress empty/low-signal sections; don't force all 14 fields on a sparse CVE. |
| Duplicate / near-duplicate | High | Canonicalize variants; one canonical per CVE; dedupe vendor/product hubs. |
| Index bloat / crawl budget | High | **Progressive sitemap release**; publish KEV+critical first, long tail later; `noindex` low-value; segment sitemaps. |
| Doorway pages | Med | Vendor/product/year hubs must add aggregation value, not just link lists. |
| Stale vuln data | High | "Last updated" on every page; daily NVD/KEV sync; content-hash re-enrich; staleness monitor. |
| **Hallucinated remediation / wrong advice** | **High (liability)** | AI = explanation only; **patch versions/CVSS/KEV/affected-products/references render from source**; patch specifics cite a source ref or flag "verify vs vendor advisory." |
| YMYL trust | High | Author/brand E-E-A-T signals, disclaimers, source provenance visible. |
| Exploit content | High | No exploit code, no weaponized PoC steps (enforced in enrichment system prompt — verified in test). |
| Naming a specific company as vulnerable | High | Only from authorized public data (KEV names *products*, not victims); never assert a named org is currently breached. |
| No value above source | Med | Enrichment must add synthesis (business impact, prioritization, detection) — the measured output does; keep the bar. |

## Mandatory safeguards (build into the pipeline)
1. **Quality-score gate** — compute a per-page score (source completeness + enrichment length/variety + KEV/CVSS signal). Publish `index` only above threshold; else `noindex,follow`.
2. **Deterministic facts** — CVSS, severity, vector, CWE, CPE/affected products, references, KEV status/dates rendered by **code from source**. The model never emits these as authoritative.
3. **Separation on the page** — a clearly labeled "Source data (NVD/CISA)" block distinct from "SEC.co analysis" (AI). Signals to both users and Google what's factual vs interpretive.
4. **Provenance + freshness** — source, source URL, license, "last updated" on every page.
5. **Structural variety** — template variants by CVE profile; hide empty sections; don't emit boilerplate for missing data.
6. **Progressive rollout + monitoring** — sitemap segments released in waves; Search Console watch on indexation %, impressions, manual actions; **documented rollback plan** (bulk `noindex` + sitemap withdrawal) if indexation quality drops.
7. **Human review for high-value** — KEV/critical pages get a review queue before `index`.
8. **Internal linking with intent** — CVE→CWE→related-CVE→vendor/product→service CTA, driven by real relationships (and the vector "related" set), not blanket cross-linking.
9. **Disclaimers** — informational-only, not professional security advice (present in test output).

## Publish-decision flow
```
enriched record → quality_score ≥ T ?
    ├─ no  → status=noindex (stored, not in sitemap)
    └─ yes → high-value (KEV/critical)? → human review → index + sitemap
             else                         → index + sitemap (sampled QA)
```

## Metrics to watch (Search Console + logs)
Indexed/submitted ratio, avg position, impressions/clicks per page-type, crawl rate, manual actions, % pages below quality threshold, staleness (days since source change unreflected). Trigger rollback if indexed-ratio or quality trend degrades over 2–3 weeks.
