# SEC.co — Internal Linking Strategy & Orphan Prevention

**Date:** 2026-07-06. **Problem (measured):** in the current Phase-1 scaffold, **75% of index-eligible CVE pages (106/141) are orphans** — present in the sitemap but with zero internal links pointing at them. At full scale (~120k+ pages) this is fatal: a sitemap gets a URL *discovered*, but Google allocates crawl and ranking on **internal link paths**. Orphaned programmatic pages get crawled late, shallowly, or dropped. This doc is the plan to guarantee **no orphans and ≤3-click crawl depth** to every published page.

## Design principles
1. **No orphan index pages.** Every `index` page must have ≥3 inbound internal links from *other crawlable pages* (not just the sitemap).
2. **≤3 clicks from a hub.** Homepage/nav → hub → (paginated archive) → detail.
3. **Links follow real relationships** (shared vendor, product, CWE, semantic similarity) — never blanket cross-linking (that reads as manipulation).
4. **Equity flows to value.** Hubs concentrate and pass link equity toward KEV/critical pages.
5. **Never link *to* noindex pages** from indexable content (wasted crawl); noindex pages may still link *out* (`noindex,follow`).
6. **Enforced as a build invariant**, not a hope — an orphan audit fails the build if any index page is under-linked.

## The linking architecture (5 layers)

### Layer 1 — Taxonomy hubs (the crawl backbone)
Hub pages that list their members and are themselves linked from nav/footer. Each detail page links *up* to its hubs; each hub links *down* to its members (paginated). This bidirectional spoke↔hub structure is what removes orphans.

| Hub | Route | Links from CVE | Coverage on sample |
|---|---|---|---|
| Vendor | `/vendors/[vendor]/vulnerabilities` | every CVE → its vendor(s) | 123/141 have a vendor |
| Product | `/products/[vendor]/[product]/vulnerabilities` | every CVE → its product(s) | most |
| Weakness (CWE) | `/cwe/[cweId]` | every CVE → its CWE(s) | 71/141 have a CWE |
| Severity archive | `/vulnerabilities/severity/[critical\|high\|medium]` | every CVE → its severity | 100% (scored) |
| Year archive | `/vulnerabilities/year/[year]` | every CVE → its year | 100% |
| Known-exploited (KEV) | `/vulnerabilities/known-exploited` ✅ exists | KEV CVEs | KEV subset |

Every scored index page belongs to **at least severity + year archives**, so even a CVE with no vendor/CWE is never an orphan. Vendor/CWE hubs add richer, more relevant paths.

### Layer 2 — Related vulnerabilities (page ↔ page mesh)
On each CVE page, a "Related vulnerabilities" block of **6–10 links**, prioritized:
1. Same CWE (same weakness class)
2. Same vendor/product
3. Semantically similar (vector: local `bge-small` in Qdrant — Phase 2)
This dense mesh is the biggest single orphan-killer and distributes equity laterally. Cap outbound at ~10 to keep signal focused; never include noindex targets.

### Layer 3 — Pagination & archive design
Hubs/archives must be **crawlable-paginated** (numbered pages or `rel=prev/next`, not infinite-scroll-only). Cap ~60–100 child links per page. Large vendors (e.g. `linux` had 260 configs on the sample) need multi-page archives so every child is reachable within depth budget.

### Layer 4 — Breadcrumbs + JSON-LD
`CVE → Vendor → Product` and `CVE → CWE` breadcrumbs on every detail page, with `BreadcrumbList` JSON-LD. Reinforces hierarchy for crawlers and users. (Detail page has a simple breadcrumb today — upgrade to hub-aware + structured data.)

### Layer 5 — Cross-links to money & editorial pages
- **Contextual service/solution CTAs** by CVE profile (ransomware-KEV → `/services/ransomware-response`; web CVE → `/services/web-application-testing`; etc.). Ties the programmatic corpus to conversion pages and lends them topical relevance.
- **Blog ↔ vuln:** the ~130 existing posts link to relevant CWE/vendor hubs; vuln pages link to 1–2 related posts. Editorial links are strong quality signals into the programmatic set.
- **Global nav + footer:** add a "Vulnerabilities" nav entry + footer links to KEV / severity / recent hubs, so every page on the site has a path to the corpus (and vice-versa).

## Orphan prevention as a build invariant
Populate an **internal-link graph** at publish time (from taxonomy membership + related computation), store it (the `InternalLink` model in `sec-schema.prisma`), render from it, and **audit it**:

- `vuln:orphans` script computes, for every `index` page, its inbound internal-link count and crawl depth from the hub roots.
- **Fail the build / block publish** if any index page has `< 3` inbound links or depth `> 3`.
- Report distribution (orphans, under-linked, depth histogram) each run; watch alongside GSC "Discovered – currently not indexed" (the orphan smell in Search Console).

## Plan of attack (phased)

**P1 — Relational linking (no vectors, kills orphans now):**
1. Build `/cwe/[cweId]`, `/vendors/[vendor]/vulnerabilities`, `/vulnerabilities/severity/[level]`, `/vulnerabilities/year/[year]` routes (paginated), reading from the store.
2. Add to each CVE page: **Affected vendors/products** links, **Weaknesses (CWE)** links, **Related vulnerabilities** (same-CWE then same-vendor, 6–10).
3. Upgrade breadcrumbs + add `BreadcrumbList` JSON-LD.
4. Add "Vulnerabilities" to header nav + footer hub links.
5. Add `scripts/vuln/orphan-audit.ts` + wire it as a publish gate.
→ Target: **0 orphans** among index pages using pure relational data.

**P2 — Semantic relatedness:** local `bge-small` embeddings → Qdrant; add vector "related" beyond taxonomy for CVEs thin on vendor/CWE.

**P3 — Conversion + editorial mesh:** contextual service CTAs by CVE profile; blog↔vuln cross-linking.

**Ongoing:** orphan audit in CI; monitor GSC coverage/crawl; recency/relevance dial (the sample surfaced ~54 ancient 1988–1994 index pages — legitimately scored but low value; consider down-weighting pre-2000 or gating on traffic potential so link equity isn't spent on dead history).

## Success metrics
- Orphan index pages: **0** (build-enforced).
- Max crawl depth to any index page: **≤3**.
- Median inbound internal links per index page: **≥5**.
- GSC: "Discovered – currently not indexed" stays low as the corpus grows; indexed-ratio holds across sitemap waves.
