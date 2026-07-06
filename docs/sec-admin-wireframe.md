# SEC.co Enrichment — Admin / Control Plane (text wireframe)

A small internal admin, gated to staff (reuse the org auth pattern — e.g. Google + owner allowlist like app.dev.co). Built before publishing at scale.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ SEC.co Vulnerability Intelligence — Admin            [nate@dev.co ▾]  [Logout] │
├───────────┬──────────────────────────────────────────────────────────────────┤
│ SIDEBAR   │  ▶ OVERVIEW                                                         │
│           │  ┌────────────┬────────────┬────────────┬────────────┐             │
│ Overview  │  │ CVEs       │ Enriched   │ Published  │ AI spend   │             │
│ Sources   │  │ 241,320    │ 8,412      │ 1,004      │ $52.18 mo  │             │
│ Enrich Q  │  └────────────┴────────────┴────────────┴────────────┘             │
│ Records   │  Source freshness: NVD ✓ 22m ago · KEV ✓ 6h · OSV — not started    │
│ Pages     │  Failed imports (24h): 3  [view]     Pending enrich: 6,120         │
│ Costs     │                                                                    │
│ Vectors   │  ▶ SOURCE SYNC                                                      │
│ Links     │   nvd-delta  hourly  last 22m  fetched 41  changed 12  ✓           │
│ Settings  │   cisa-kev   daily   last 6h   1,631 recs   ✓                       │
│           │   osv        —       [enable]                                       │
├───────────┴──────────────────────────────────────────────────────────────────┤
│ ▶ ENRICHMENT QUEUE                                                             │
│  pending 6,120 · running 100 (batch) · failed 3 · avg $0.0059/rec · [Run] [Dry]│
│  ┌ CVE ─────────── sev ── KEV ─ status ──── words ─ $ ── actions ───────────┐  │
│  │ CVE-2024-3400   CRIT   yes  reviewed     1,115  .005  [preview][index]    │  │
│  │ CVE-2023-1234   MED    no   generated      940  .005  [preview][re-enrich]│  │
│  │ CVE-2022-0001   LOW    no   below-gate      —    —    [noindex]           │  │
│  └───────────────────────────────────────────────────────────────────────── ┘ │
├────────────────────────────────────────────────────────────────────────────── │
│ ▶ RECORD DETAIL (CVE-2021-44228)                                               │
│   SOURCE (read-only, from NVD/CISA)     │  ENRICHMENT (Haiku, editable)        │
│   CVSS 10.0 CRITICAL · KEV yes (ransom) │  plain_english_summary … [edit]      │
│   CWE-502,20,400,917 · 166 products     │  remediation_summary  … [edit]       │
│   refs 103 · pub 2021-12-10             │  faq (4) · seo_title · disclaimers   │
│   [view raw JSON]                       │  quality 0.86  ✓ above gate          │
│   PAGE PREVIEW ▸  /vulnerabilities/cve-2021-44228   [open]                     │
│   [Index] [Noindex] [Re-enrich] [Approve] [Unpublish] [Delete]                 │
├────────────────────────────────────────────────────────────────────────────── │
│ ▶ PAGES / SITEMAP           index 1,004 · noindex 7,408 · review 0             │
│   segment: kev [in sitemap]  critical-2024 [staged]  low-* [held]              │
│   duplicate/canonical warnings: 2  [review]                                    │
│ ▶ VECTORS (Qdrant sec_cve_records)  vectors 8,412 · dim 384 · [snapshot]       │
│ ▶ COSTS  this mo $52.18 · by model: haiku $41 / sonnet $11 · [export]          │
│ ▶ LINK GRAPH  preview related-vuln edges for a CVE  [render]                   │
└────────────────────────────────────────────────────────────────────────────── ┘
```

**Capabilities:** source-sync dashboard + freshness; failed-import viewer; enrichment queue (run/dry-run/sample); per-record source-vs-enrichment side-by-side with page preview; approve / index / noindex / re-enrich / unpublish / delete; sitemap-inclusion controls (per segment); AI + embedding cost dashboards; Qdrant usage; quality scores; internal-link-graph preview; duplicate/canonical warnings. **RBAC:** owner-only for publish/delete/settings; analyst read + enrich; reuse existing staff-auth pattern.
