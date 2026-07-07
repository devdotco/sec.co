import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getVuln, listWithPages } from "@/lib/vuln/store";
import { hubsFor, relatedTo } from "@/lib/vuln/links";
import type { StoredVuln } from "@/lib/vuln/types";

type Params = { cveId: string };

const SEV_COLOR: Record<string, string> = {
  CRITICAL: "#ff5a5a",
  HIGH: "#ff9f43",
  MEDIUM: "#ffd93d",
  LOW: "#8ecae6",
};

/**
 * Human-searched H1: derive a descriptive headline (product + vuln type) from
 * the AI seo_title instead of the bare CVE ID — people search "log4j rce", not
 * "CVE-2021-44228". Works for all past enriched pages (seo_title is stored) and
 * future ones. Falls back to the CVE ID when unenriched.
 */
function humanHeadline(seoTitle: string | undefined, cveId: string): string {
  if (!seoTitle) return cveId;
  let h = seoTitle.split(" | ")[0].split(" – SEC")[0];
  h = h.replace(/\s*[-–—]\s*(SEC\.co|Vulnerability Analysis).*$/i, "");
  h = h.replace(/\s+Explained\.?$/i, "").trim();
  if (!h) return cveId;
  return h.toUpperCase().includes(cveId.toUpperCase()) ? h : `${cveId}: ${h}`;
}

/** The searchable description without the leading CVE-ID prefix (for link anchors). */
function searchableDesc(seoTitle: string | undefined, cveId: string): string {
  const h = humanHeadline(seoTitle, cveId);
  const stripped = h.replace(new RegExp(`^${cveId}\\s*[:\\-–—]?\\s*`, "i"), "").trim();
  return stripped || h;
}

export function generateStaticParams(): Params[] {
  return listWithPages().map((v) => ({ cveId: v.record.cveId.toLowerCase() }));
}

function load(cveId: string): StoredVuln | undefined {
  return getVuln(cveId.toUpperCase());
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { cveId } = await params;
  const v = load(cveId);
  if (!v) return {};
  const e = v.enrichment?.data;
  const doIndex = v.page?.indexState === "index";
  return {
    title: e?.seo_title ?? `${v.record.cveId} — Vulnerability Details`,
    description:
      e?.seo_description ??
      `Details, severity, affected products, and remediation guidance for ${v.record.cveId}.`,
    alternates: { canonical: v.page?.canonicalUrl },
    robots: { index: doIndex, follow: true },
  };
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-t border-[var(--color-line)] py-3">
      <dt className="text-[12px] uppercase tracking-wide text-mute">{label}</dt>
      <dd className="text-[14px] text-bone">{children}</dd>
    </div>
  );
}

function Section({ title, body }: { title: string; body?: string }) {
  if (!body) return null;
  return (
    <section className="mt-8">
      <h2 className="font-display text-[1.35rem] leading-tight text-bone">{title}</h2>
      <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-bone/85">{body}</p>
    </section>
  );
}

export default async function VulnPage({ params }: { params: Promise<Params> }) {
  const { cveId } = await params;
  const v = load(cveId);
  if (!v) notFound();

  const { record: r, enrichment, page } = v;
  const e = enrichment?.data;
  const sev = r.cvss?.severity ?? "N/A";

  const hubs = hubsFor(r);
  const vendorHubs = hubs.filter((h) => h.kind === "vendor");
  const cweHubs = hubs.filter((h) => h.kind === "cwe");
  const browseHubs = hubs.filter((h) => h.kind === "severity" || h.kind === "year" || h.kind === "yearsev");
  const related = relatedTo(r, 8);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Vulnerabilities", item: "https://sec.co/vulnerabilities" },
      ...(vendorHubs[0]
        ? [{ "@type": "ListItem", position: 2, name: vendorHubs[0].label, item: `https://sec.co${vendorHubs[0].href}` }]
        : []),
      { "@type": "ListItem", position: vendorHubs[0] ? 3 : 2, name: r.cveId, item: page?.canonicalUrl },
    ],
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: e?.seo_title ?? r.cveId,
    description: e?.seo_description ?? r.description.slice(0, 200),
    dateModified: r.lastModified,
    datePublished: r.published,
    about: { "@type": "Thing", name: r.cveId },
    isBasedOn: r.source.url,
    publisher: { "@type": "Organization", name: "SEC.co" },
  };

  return (
    <article className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-aurora opacity-40" />
      <Container width="content" className="pt-10 pb-24">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-1.5 text-[12.5px] text-mute">
          <Link href="/vulnerabilities" className="hover:text-bone">Vulnerabilities</Link>
          {vendorHubs[0] && (
            <>
              <span aria-hidden>/</span>
              <Link href={vendorHubs[0].href} className="capitalize hover:text-bone">{vendorHubs[0].label}</Link>
            </>
          )}
          <span aria-hidden>/</span>
          <span className="text-bone-dim">{r.cveId}</span>
        </nav>

        <header className="border-b border-[var(--color-line)] pb-8">
          <div className="flex flex-wrap items-center gap-3">
            {r.cvss && (
              <span
                className="rounded px-2 py-0.5 text-[12px] font-semibold text-ink-0"
                style={{ background: SEV_COLOR[sev] ?? "#9aa" }}
              >
                {sev} {r.cvss.score.toFixed(1)}
              </span>
            )}
            {r.kev && (
              <span className="rounded border border-[#ff5a5a] px-2 py-0.5 text-[12px] font-semibold text-[#ff5a5a]">
                CISA KEV — Actively Exploited
              </span>
            )}
            {r.kev?.knownRansomwareCampaignUse === "Known" && (
              <span className="rounded border border-[var(--color-line)] px-2 py-0.5 text-[12px] text-mute">
                Known ransomware use
              </span>
            )}
          </div>
          <h1 className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.7rem)] leading-[1.1] tracking-[-0.03em] text-bone">
            {humanHeadline(e?.seo_title, r.cveId)}
          </h1>
          {e && <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-bone/80">{e.plain_english_summary}</p>}
        </header>

        {/* ── SOURCE LAYER (deterministic, public domain) ────────────────── */}
        <div className="mt-10 grid gap-x-12 gap-y-2 md:grid-cols-2">
          <div>
            <p className="text-[12px] uppercase tracking-wide text-mute">Source data · NVD / CISA · public domain</p>
            <dl className="mt-2">
              {r.cvss && <Fact label="CVSS">{r.cvss.version} · {r.cvss.score.toFixed(1)} {sev} · <span className="font-mono text-[12px]">{r.cvss.vector}</span></Fact>}
              <Fact label="Weaknesses (CWE)">{r.cwes.length ? r.cwes.join(", ") : "—"}</Fact>
              <Fact label="Affected products">{r.affectedCount} configuration(s)</Fact>
              <Fact label="Published / Modified">{r.published ?? "—"} / {r.lastModified ?? "—"}</Fact>
              {r.kev && <Fact label="KEV due date">{r.kev.dueDate ?? "—"} (added {r.kev.dateAdded})</Fact>}
            </dl>
          </div>
          <div>
            <p className="text-[12px] uppercase tracking-wide text-mute">NVD description (verbatim)</p>
            <p className="mt-2 text-[14px] leading-relaxed text-bone/75">{r.description}</p>
            {r.references.length > 0 && (
              <p className="mt-4 text-[12px] text-mute">
                {r.references.length} reference(s) ·{" "}
                <a href={r.source.url} className="underline hover:text-bone" rel="nofollow noopener" target="_blank">View on NVD →</a>
              </p>
            )}
          </div>
        </div>

        {/* ── ANALYSIS LAYER (AI-assisted, clearly labeled) ─────────────── */}
        {e ? (
          <div className="mt-14 border-t border-[var(--color-line)] pt-8">
            <p className="text-[12px] uppercase tracking-wide text-mute">SEC.co analysis · AI-assisted, reviewed against source</p>
            <Section title="Technical summary" body={e.technical_summary} />
            <Section title="Business impact" body={e.business_impact} />
            <Section title="Affected systems" body={e.affected_systems_summary} />
            <Section title="Exploitability" body={e.exploitability_summary} />
            <Section title="Remediation" body={e.remediation_summary} />
            <Section title="Patch guidance" body={e.patch_guidance} />
            <Section title="Detection guidance" body={e.detection_guidance} />
            <Section title="Why prioritize this" body={e.prioritization_reason} />
            <Section title="Risk score, explained" body={e.risk_score_explanation} />

            {e.faq?.length > 0 && (
              <section className="mt-10">
                <h2 className="font-display text-[1.35rem] text-bone">Frequently asked questions</h2>
                <div className="mt-4 space-y-5">
                  {e.faq.map((f, i) => (
                    <div key={i}>
                      <p className="text-[15px] font-medium text-bone">{f.q}</p>
                      <p className="mt-1 text-[14px] leading-relaxed text-bone/80">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-12 border-t border-[var(--color-line)] pt-5 text-[12px] leading-relaxed text-mute">
              {e.disclaimers} Source: {r.source.name} ({r.source.license}), retrieved{" "}
              {r.source.retrievedAt.slice(0, 10)}. Analysis generated by SEC.co ({enrichment?.model}).
            </p>
          </div>
        ) : (
          <p className="mt-14 border-t border-[var(--color-line)] pt-8 text-[14px] text-mute">
            SEC.co analysis for this vulnerability is pending. Source data above is from NVD/CISA.
          </p>
        )}

        {/* ── INTERNAL LINKING (orphan prevention) ──────────────────────── */}
        <div className="mt-14 grid gap-10 border-t border-[var(--color-line)] pt-8 md:grid-cols-2">
          <div>
            {vendorHubs.length > 0 && (
              <div className="mb-6">
                <p className="text-[12px] uppercase tracking-wide text-mute">Affected vendors</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {vendorHubs.map((h) => (
                    <Link key={h.href} href={h.href} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-[13px] capitalize text-bone-dim hover:text-bone">
                      {h.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {cweHubs.length > 0 && (
              <div className="mb-6">
                <p className="text-[12px] uppercase tracking-wide text-mute">Weaknesses (CWE)</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {cweHubs.map((h) => (
                    <Link key={h.href} href={h.href} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-[13px] uppercase text-bone-dim hover:text-bone">
                      {h.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {browseHubs.length > 0 && (
              <div>
                <p className="text-[12px] uppercase tracking-wide text-mute">Browse</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {browseHubs.map((h) => (
                    <Link key={h.href} href={h.href} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-[13px] text-bone-dim hover:text-bone">
                      {h.kind === "severity" ? `${h.label} severity` : h.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div>
              <p className="text-[12px] uppercase tracking-wide text-mute">Related vulnerabilities</p>
              <ul className="mt-2 divide-y divide-[var(--color-line)]">
                {related.map((rv) => (
                  <li key={rv.record.cveId} className="py-2.5">
                    <Link href={`/vulnerabilities/${rv.record.cveId.toLowerCase()}`} className="group block">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-mono text-[12.5px] text-mute">{rv.record.cveId}</span>
                        <span className="text-[11px] text-mute">{rv.record.cvss?.severity ?? "N/A"}</span>
                      </span>
                      <span className="mt-0.5 block text-[13.5px] leading-snug text-bone/85 line-clamp-2 group-hover:text-bone group-hover:underline">
                        {rv.enrichment ? searchableDesc(rv.enrichment.data.seo_title, rv.record.cveId) : rv.record.cveId}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {page && page.indexState !== "index" && (
          <p className="mt-8 rounded border border-[var(--color-line)] px-4 py-2 text-[12px] text-mute">
            Preview — this page is <span className="font-mono">{page.indexState}</span> (quality {page.qualityScore}).
            {page.reasons.length > 0 && ` ${page.reasons.join("; ")}.`}
          </p>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </Container>
    </article>
  );
}
