import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/site/page-hero";
import { allVulns, listKev } from "@/lib/vuln/store";

export const metadata: Metadata = {
  title: "Vulnerability Intelligence",
  description:
    "SEC.co vulnerability intelligence — CVE details, CVSS severity, affected products, and remediation guidance built on NVD and CISA KEV data.",
};

export default function VulnHub() {
  const all = allVulns();
  const indexed = all.filter((v) => v.page?.indexState === "index");
  const enriched = all.filter((v) => v.enrichment);
  const kev = listKev();

  const recent = [...enriched]
    .sort((a, b) => (b.record.published ?? "").localeCompare(a.record.published ?? ""))
    .slice(0, 40);

  return (
    <div className="relative isolate">
      <PageHero
        eyebrow="Vulnerability Intelligence"
        title="Know what's exploitable before it's exploited"
        sub="CVE analysis built on public NVD and CISA KEV data — enriched with practical remediation, detection, and prioritization guidance."
        primaryCta={{ href: "/vulnerabilities/known-exploited", label: "Known exploited (KEV)" }}
        secondaryCta={{ href: "/services/vulnerability-assessment", label: "Talk to our team" }}
      />
      <Container width="content" className="pb-24">
        <div className="grid grid-cols-3 gap-4 border-y border-[var(--color-line)] py-6 text-center">
          <div><div className="font-display text-2xl text-bone">{all.length}</div><div className="text-[12px] text-mute">CVEs ingested</div></div>
          <div><div className="font-display text-2xl text-bone">{indexed.length}</div><div className="text-[12px] text-mute">Published</div></div>
          <div><div className="font-display text-2xl text-bone">{kev.length}</div><div className="text-[12px] text-mute">Known exploited</div></div>
        </div>

        {recent.length === 0 ? (
          <p className="mt-10 text-[14px] text-mute">
            No vulnerabilities ingested yet. Run <span className="font-mono">npm run vuln:ingest-kev</span>,{" "}
            <span className="font-mono">vuln:ingest-nvd</span>, then <span className="font-mono">vuln:enrich</span>.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-[var(--color-line)]">
            {recent.map((v) => (
              <li key={v.record.cveId} className="py-4">
                <Link href={`/vulnerabilities/${v.record.cveId.toLowerCase()}`} className="group flex items-baseline justify-between gap-4">
                  <span className="font-mono text-[14px] text-bone group-hover:underline">{v.record.cveId}</span>
                  <span className="flex items-center gap-3 text-[12px] text-mute">
                    {v.record.kev && <span className="text-[#ff5a5a]">KEV</span>}
                    <span>{v.record.cvss?.severity ?? "N/A"} {v.record.cvss ? v.record.cvss.score.toFixed(1) : ""}</span>
                    <span className="hidden md:inline">{v.enrichment?.wordCount ?? 0}w</span>
                  </span>
                </Link>
                {v.enrichment && (
                  <p className="mt-1 max-w-3xl text-[13px] leading-snug text-bone/70 line-clamp-2">
                    {v.enrichment.data.plain_english_summary}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
}
