/**
 * Weekly vulnerability-intelligence digest.
 *
 * Summarizes the CVE store — totals, what was added/enriched in the last 7
 * days, KEV coverage, and the week's most severe new entries — and emails it
 * via Resend. Designed to run once a week from the vuln-digest workflow.
 *
 *   npm run vuln:digest              # send (or dry-run if unconfigured)
 *   npm run vuln:digest -- --dry     # force console-only preview
 *
 * Env:
 *   RESEND_API_KEY       — required to actually send (else dry-run to console)
 *   DIGEST_TO_EMAIL      — recipient        (default nate@dev.co)
 *   DIGEST_FROM_EMAIL    — sender, must be on a verified Resend domain
 *                          (default CONTACT_FROM_EMAIL ?? "noreply@sec.co")
 *   DIGEST_WINDOW_DAYS   — lookback window  (default 7)
 */

import { execSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const CVE_DIR = path.join(process.cwd(), ".data/vuln/cve");
const KEV_FILE = path.join(process.cwd(), ".data/vuln/kev.json");
const SITE = "https://sec.co";
const WINDOW_DAYS = Number(process.env.DIGEST_WINDOW_DAYS || 7);
const DRY = process.argv.includes("--dry");

type Cve = {
  record: {
    cveId: string;
    description?: string;
    cvss?: { score?: number; severity?: string };
    published?: string;
    kev?: unknown;
  };
  page: { slug: string; indexState: string };
  enrichment?: { createdAt?: string } | null;
};

function loadAll(): Cve[] {
  return readdirSync(CVE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(path.join(CVE_DIR, f), "utf8")) as Cve);
}

/** Files added to the store in the window, via git (best-effort). */
function newPagesViaGit(): number | null {
  try {
    const base = execSync(`git rev-list -1 --before="${WINDOW_DAYS} days ago" HEAD`, {
      encoding: "utf8",
    }).trim();
    if (!base) return null;
    const out = execSync(
      `git diff --diff-filter=A --name-only ${base} HEAD -- .data/vuln/cve`,
      { encoding: "utf8" },
    );
    return out.split("\n").filter((l) => l.trim().endsWith(".json")).length;
  } catch {
    return null; // shallow clone / no history — degrade gracefully
  }
}

function kevCount(): number | null {
  try {
    const d = JSON.parse(readFileSync(KEV_FILE, "utf8"));
    if (Array.isArray(d)) return d.length;
    if (Array.isArray(d?.vulnerabilities)) return d.vulnerabilities.length;
    return null;
  } catch {
    return null;
  }
}

const fmt = (n: number) => n.toLocaleString("en-US");

function main() {
  const now = Date.now();
  const cutoff = now - WINDOW_DAYS * 864e5;
  const all = loadAll();

  const total = all.length;
  const enriched = all.filter((c) => c.enrichment?.createdAt);
  const indexed = all.filter((c) => c.page.indexState === "index").length;
  const review = all.filter((c) => c.page.indexState === "review").length;
  const notEnriched = total - enriched.length;

  const enrichedThisWeek = enriched.filter(
    (c) => new Date(c.enrichment!.createdAt!).getTime() >= cutoff,
  );

  // Most severe entries enriched this week (indexable), for the highlight list.
  const highlights = [...enrichedThisWeek]
    .filter((c) => c.page.indexState === "index")
    .sort((a, b) => (b.record.cvss?.score ?? 0) - (a.record.cvss?.score ?? 0))
    .slice(0, 8);

  const newPages = newPagesViaGit();
  const kev = kevCount();
  const kevInStore = all.filter((c) => c.record.kev).length;

  const period = `${new Date(cutoff).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} – ${new Date(now).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  const subject = `SEC.co vuln digest — ${fmt(enrichedThisWeek.length)} enriched this week (${fmt(
    indexed,
  )} live)`;

  // ── Plain text ──
  const text = [
    `SEC.co Vulnerability Intelligence — Weekly Digest`,
    period,
    ``,
    `THIS WEEK`,
    `  Newly enriched:   ${fmt(enrichedThisWeek.length)}`,
    newPages != null ? `  New pages added:  ${fmt(newPages)}` : null,
    ``,
    `STORE`,
    `  Total CVE pages:  ${fmt(total)}`,
    `  Indexed (live):   ${fmt(indexed)}`,
    `  In review:        ${fmt(review)}`,
    `  Enriched:         ${fmt(enriched.length)}  (${Math.round((enriched.length / total) * 100)}%)`,
    `  Not yet enriched: ${fmt(notEnriched)}`,
    kevInStore ? `  KEV in store:     ${fmt(kevInStore)}${kev ? ` of ${fmt(kev)} catalog` : ""}` : null,
    ``,
    highlights.length ? `TOP NEW THIS WEEK` : `No new enrichments this week.`,
    ...highlights.map(
      (c) =>
        `  ${c.record.cvss?.severity ?? "—"} ${c.record.cvss?.score ?? ""}  ${c.record.cveId}  ${SITE}/vulnerabilities/${c.page.slug}`,
    ),
  ]
    .filter((l) => l !== null)
    .join("\n");

  // ── HTML ──
  const stat = (label: string, value: string, accent = "#E8E8E3") =>
    `<td style="padding:14px 16px;background:#0F1015;border:1px solid rgba(232,232,227,0.10);border-radius:12px;">
       <div style="font:600 22px/1 -apple-system,Segoe UI,Roboto,sans-serif;color:${accent};letter-spacing:-0.02em;">${value}</div>
       <div style="font:500 11px/1.4 -apple-system,Segoe UI,Roboto,sans-serif;color:#7A7B80;text-transform:uppercase;letter-spacing:0.08em;margin-top:6px;">${label}</div>
     </td>`;

  const sevColor = (s?: string) =>
    s === "CRITICAL" ? "#FF5160" : s === "HIGH" ? "#F5C544" : s === "MEDIUM" ? "#19BFFF" : "#7A7B80";

  const rows = highlights
    .map(
      (c) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid rgba(232,232,227,0.06);">
          <span style="display:inline-block;min-width:58px;font:600 11px/1 -apple-system,sans-serif;color:${sevColor(
            c.record.cvss?.severity,
          )};">${c.record.cvss?.severity ?? "—"} ${c.record.cvss?.score ?? ""}</span>
          <a href="${SITE}/vulnerabilities/${c.page.slug}" style="font:600 13px/1.4 ui-monospace,Menlo,monospace;color:#E8E8E3;text-decoration:none;">${c.record.cveId}</a>
          <div style="font:400 12px/1.5 -apple-system,sans-serif;color:#B5B5B0;margin-top:3px;">${escapeHtml(
            (c.record.description ?? "").slice(0, 130),
          )}${(c.record.description ?? "").length > 130 ? "…" : ""}</div>
        </td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#08090C;padding:24px;">
  <div style="max-width:600px;margin:0 auto;background:#08090C;">
    <div style="height:4px;border-radius:4px;background:linear-gradient(90deg,#19BFFF,#6029FF,#FF3DBD);"></div>
    <div style="padding:28px 4px 8px;">
      <div style="font:500 11px/1 -apple-system,sans-serif;color:#7A7B80;text-transform:uppercase;letter-spacing:0.16em;">SEC.co · Vulnerability Intelligence</div>
      <h1 style="font:600 24px/1.2 Georgia,serif;color:#E8E8E3;letter-spacing:-0.02em;margin:10px 0 2px;">Weekly digest</h1>
      <div style="font:400 13px/1 -apple-system,sans-serif;color:#7A7B80;">${period}</div>
    </div>

    <table role="presentation" width="100%" cellspacing="8" style="margin:14px 0;"><tr>
      ${stat("Enriched this week", fmt(enrichedThisWeek.length), "#19BFFF")}
      ${stat("Live pages", fmt(indexed), "#E8E8E3")}
      ${newPages != null ? stat("New pages", fmt(newPages), "#E8E8E3") : stat("Backlog left", fmt(notEnriched), "#E8E8E3")}
    </tr></table>

    <table role="presentation" width="100%" cellspacing="8" style="margin:0 0 20px;"><tr>
      ${stat("Total pages", fmt(total))}
      ${stat("Enriched", `${Math.round((enriched.length / total) * 100)}%`)}
      ${stat("KEV in store", kevInStore ? fmt(kevInStore) : "—")}
    </tr></table>

    ${
      highlights.length
        ? `<div style="font:600 13px/1 -apple-system,sans-serif;color:#E8E8E3;margin:4px 4px 8px;">Most severe added this week</div>
           <table role="presentation" width="100%" style="background:#0F1015;border:1px solid rgba(232,232,227,0.10);border-radius:12px;overflow:hidden;">${rows}</table>`
        : `<div style="padding:16px;background:#0F1015;border-radius:12px;font:400 13px/1.5 -apple-system,sans-serif;color:#B5B5B0;">No new enrichments this week — the pipeline is caught up.</div>`
    }

    <div style="margin-top:24px;">
      <a href="${SITE}/vulnerabilities" style="display:inline-block;background:#E8E8E3;color:#08090C;font:600 13px/1 -apple-system,sans-serif;text-decoration:none;padding:11px 18px;border-radius:999px;">Browse the vulnerability database →</a>
    </div>
    <div style="font:400 11px/1.6 -apple-system,sans-serif;color:#4A4B52;margin-top:22px;padding-top:16px;border-top:1px solid rgba(232,232,227,0.06);">
      Automated weekly summary from the sec.co vuln-refresh pipeline. Benchmarks & data from NVD + CISA KEV.
    </div>
  </div>
</body></html>`;

  if (DRY || !process.env.RESEND_API_KEY) {
    console.log(`[digest] ${DRY ? "--dry" : "no RESEND_API_KEY"} → console preview only\n`);
    console.log(`Subject: ${subject}\n`);
    console.log(text);
    return;
  }

  send(subject, html, text);
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function send(subject: string, html: string, text: string) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.DIGEST_TO_EMAIL || "nate@dev.co";
  const from = process.env.DIGEST_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL || "noreply@sec.co";
  const res = await resend.emails.send({ from, to, subject, html, text });
  if (res.error) {
    console.error("[digest] send failed:", res.error);
    process.exit(1);
  }
  console.log(`[digest] sent to ${to} (id ${res.data?.id})`);
}

main();
