import Link from "next/link";
import { Container } from "@/components/ui/container";
import { paginate } from "@/lib/vuln/links";
import type { StoredVuln } from "@/lib/vuln/types";

type Browse = { href: string; label: string };

/** Windowed page numbers: 1, a window around current, and last. */
function pageWindow(current: number, total: number): (number | "…")[] {
  const set = new Set<number>([1, total, current - 1, current, current + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] - nums[i - 1] > 1) out.push("…");
    out.push(nums[i]);
  }
  return out;
}

/**
 * Shared list layout for vendor / CWE / severity / year hubs, with numbered
 * pagination so EVERY member is reachable (no dropped tail) — the orphan-at-
 * scale fix. Pass the full sorted `items`; the component slices to `page`.
 */
export function VulnArchive({
  eyebrow,
  title,
  sub,
  items,
  page = 1,
  basePath,
  browse = [],
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  items: StoredVuln[];
  page?: number;
  basePath: string;
  browse?: Browse[];
}) {
  const { slice, page: p, total, count } = paginate(items, page);
  const href = (n: number) => (n === 1 ? basePath : `${basePath}/page/${n}`);

  return (
    <div className="relative isolate">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[360px] bg-aurora opacity-30" />
      <Container width="content" className="pt-10 pb-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-[12.5px] text-mute">
          <Link href="/vulnerabilities" className="hover:text-bone">← Vulnerability intelligence</Link>
        </nav>
        <p className="text-[12px] uppercase tracking-wide text-mute">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,3.5vw,2.6rem)] leading-tight tracking-[-0.02em] text-bone">
          {title}
        </h1>
        {sub && <p className="mt-3 max-w-2xl text-[15px] text-bone/75">{sub}</p>}
        <p className="mt-3 text-[13px] text-mute">
          {count} published vulnerabilit{count === 1 ? "y" : "ies"}
          {total > 1 && <> · page {p} of {total}</>}
        </p>

        {browse.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {browse.map((b) => (
              <Link key={b.href} href={b.href} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-[12px] text-bone-dim hover:text-bone">
                {b.label}
              </Link>
            ))}
          </div>
        )}

        <ul className="mt-8 divide-y divide-[var(--color-line)]">
          {slice.map((v) => (
            <li key={v.record.cveId} className="py-4">
              <Link href={`/vulnerabilities/${v.record.cveId.toLowerCase()}`} className="group flex items-baseline justify-between gap-4">
                <span className="font-mono text-[14px] text-bone group-hover:underline">{v.record.cveId}</span>
                <span className="flex items-center gap-3 text-[12px] text-mute">
                  {v.record.kev && <span className="text-[#ff5a5a]">KEV</span>}
                  <span>{v.record.cvss?.severity ?? "N/A"} {v.record.cvss ? v.record.cvss.score.toFixed(1) : ""}</span>
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

        {total > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center gap-1.5 text-[13px]">
            {p > 1 && <Link rel="prev" href={href(p - 1)} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-bone-dim hover:text-bone">← Prev</Link>}
            {pageWindow(p, total).map((n, i) =>
              n === "…" ? (
                <span key={`e${i}`} className="px-1 text-mute">…</span>
              ) : (
                <Link
                  key={n}
                  href={href(n)}
                  aria-current={n === p ? "page" : undefined}
                  className={`rounded px-2.5 py-1 ${n === p ? "bg-bone/10 text-bone" : "border border-[var(--color-line)] text-bone-dim hover:text-bone"}`}
                >
                  {n}
                </Link>
              ),
            )}
            {p < total && <Link rel="next" href={href(p + 1)} className="rounded border border-[var(--color-line)] px-2.5 py-1 text-bone-dim hover:text-bone">Next →</Link>}
          </nav>
        )}
      </Container>
    </div>
  );
}

/** Sibling-hub cross-links shown on every archive — strengthens the graph. */
export const STANDARD_BROWSE: Browse[] = [
  { href: "/vulnerabilities/known-exploited", label: "Known exploited (KEV)" },
  { href: "/vulnerabilities/severity/critical", label: "Critical" },
  { href: "/vulnerabilities/severity/high", label: "High" },
  { href: "/vulnerabilities/severity/medium", label: "Medium" },
  { href: "/vulnerabilities", label: "All recent" },
];
