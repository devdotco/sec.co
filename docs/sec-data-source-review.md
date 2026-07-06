# SEC.co — Data Source & Copyright Review

**Date:** 2026-07-06. **Bottom line: the Phase 1/3 sources (NVD CVE, NVD CPE, CISA KEV) are US-Government public-domain or CC0 — free to republish, enrich, and build derivative pages commercially.** The licensing caution applies mainly to Phase-2+ sources (GHSA attribution, some OSV records) and to sources we should NOT ingest (Exploit-DB/Vulners/Shodan). Provenance must be stamped on every record regardless.

## The copyright question, answered

| Source | Legal status | Can we republish? | Enrich w/ AI? | Derivative pages? | Attribution |
|---|---|---|---|---|---|
| **CVE List (MITRE/CVE.org)** — the CVE IDs + descriptions | **CC0 1.0 / public domain** (CVE Program terms) | ✅ | ✅ | ✅ | Courtesy ("Source: CVE / NVD") |
| **NVD enrichment** (CVSS scores/vectors, CPE, CWE mapping, references) | **US Government work → public domain** (17 U.S.C. §105) | ✅ | ✅ | ✅ | Courtesy |
| **NVD CPE dictionary** | Public domain | ✅ | ✅ | ✅ | Courtesy |
| **CISA KEV** | **US Government work → public domain** | ✅ | ✅ | ✅ | Courtesy |
| **OSV.dev records** | Mixed — mostly **CC-BY 4.0 / Apache-2.0**; per-record `database_specific`/license varies | ✅ (with attribution where CC-BY) | ✅ | ✅ | **Required per-record** — carry the source DB + license |
| **GitHub Security Advisories (GHSA)** | **CC-BY 4.0** | ✅ | ✅ | ✅ | **Required** — attribute GitHub |
| **EPSS (FIRST.org)** | Free to use, cite FIRST | ✅ (scores) | ✅ | ✅ | Cite FIRST |
| **CWE / CAPEC / ATT&CK (MITRE)** | Free with attribution | ✅ | ✅ | ✅ | Required |

**Do NOT ingest without explicit review / likely exclude:** Exploit-DB (Offensive Security terms + it's exploit code), Vulners (commercial license), Shodan/Censys (ToS + targets live hosts → ethics/compliance). Vendor advisories (Microsoft/Cisco/etc.) are **copyrighted** — link to them as references, never copy their text.

**Operating rule (mirrors Law.co's copyright firewall):** republish only public-domain/CC0 factual fields as the page's *source layer*; generate all human-readable prose ourselves (our original derivative work); stamp `source`, `source_url`, `license`, `retrieved_at` on every record as the takedown audit trail. Never copy a commercial vendor's advisory prose or a paywalled write-up.

> ⚠️ **The one field to guard for correctness, not copyright:** AI-written **patch version numbers** and remediation specifics. In the live test Haiku got Log4Shell's versions right (2.16.0 / 2.12.2 / 2.3.1) because it's well-known, but for obscure CVEs the model can invent versions. Rule: patch specifics must be traceable to a source reference or flagged "verify against vendor advisory," never presented as authoritative from the model alone.

## Source access mechanics

### NVD CVE (Phase 1 primary)
- **API:** `https://services.nvd.nist.gov/rest/json/cves/2.0` — 2,000 results/page (`resultsPerPage`+`startIndex`); rate limit ~5 req/30s (no key) → ~50 req/30s with a **free** API key; incremental via `lastModStartDate`/`lastModEndDate`.
- **Bulk:** CVE List v5 JSON on GitHub (CVE.org) + NVD data — use bulk for the **initial ~240k load**, API for **daily deltas**. Verified live: single-CVE fetch returns descriptions, metrics (CVSS v3.1/v2), weaknesses (CWE), configurations (CPE match), references.
- ~240k+ CVEs; schema is stable and well-documented.

### NVD CPE dictionary
- ~1.3M CPE names; vendor:product:version structure; join CVE↔CPE via `cpeMatch.criteria`. **Normalization is the hard part** — vendor/product strings are noisy (casing, aliases). Vendor/product pages need a normalization pass before they're publishable.

### CISA KEV (Phase 1 prioritization layer)
- Single JSON: `https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json`. Verified live: **1,631 entries** (catalog 2026.07.01). Fields: `cveID`, `vendorProject`, `product`, `vulnerabilityName`, `dateAdded`, `shortDescription`, `requiredAction`, `dueDate`, `knownRansomwareCampaignUse`, `cwes`. Join to CVE on `cveID`. **This is the "enrich this first" signal.**

### OSV.dev (Phase 4)
- Per-ecosystem bulk zips on GCS + REST API. Ecosystems: npm, PyPI, Maven, Go, crates.io, RubyGems, NuGet, Packagist, Debian, Alpine, etc. Overlaps GHSA. Page opportunity by ecosystem / package / version / advisory.

### Phase-2+ (assess licensing each time before ingest)
EPSS (daily CSV, prioritization), CWE/CAPEC/ATT&CK (taxonomy/glossary pages), GHSA (attribution required).

## Update frequency & incremental support
| Source | Cadence | Incremental |
|---|---|---|
| NVD CVE | continuous | ✅ `lastModStartDate` |
| CISA KEV | ~weekly | full-file diff (small) |
| OSV | continuous | ✅ per-record `modified` |
| EPSS | daily | full CSV |

All support content-hash change detection → re-enrich only what changed.
