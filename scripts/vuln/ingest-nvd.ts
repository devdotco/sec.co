/**
 * Ingest CVEs from the NVD 2.0 API → normalized store (joins KEV).
 *
 *   npm run vuln:ingest-nvd -- --recent 100          # last-30-day window
 *   npm run vuln:ingest-nvd -- --ids CVE-2021-44228,CVE-2023-34362
 *
 * Run vuln:ingest-kev first so the KEV join is available. Respects NVD rate
 * limits (a free NVD_API_KEY raises them; set it in .env.local if you have one).
 */
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./_env";
import { parseCveResponse, parseKevCatalog, type KevMap } from "../../src/lib/vuln/nvd";
import { putRecord, putPage } from "../../src/lib/vuln/store";
import { scoreVuln } from "../../src/lib/vuln/quality";

loadEnv();
const API = "https://services.nvd.nist.gov/rest/json/cves/2.0";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function loadKev(): KevMap {
  const p = path.join(process.cwd(), ".data", "vuln", "kev.json");
  if (!fs.existsSync(p)) { console.warn("⚠ no KEV cache — run vuln:ingest-kev first (KEV join skipped)"); return new Map(); }
  return parseKevCatalog(JSON.parse(fs.readFileSync(p, "utf-8")));
}

function headers(): Record<string, string> {
  const key = process.env.NVD_API_KEY;
  return key ? { apiKey: key } : {};
}

async function nvdGet(qs: string): Promise<unknown> {
  const res = await fetch(`${API}?${qs}`, { headers: headers() });
  if (!res.ok) throw new Error(`NVD ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return res.json();
}

function isoNvd(d: Date): string {
  return d.toISOString().replace("Z", "").slice(0, 23);
}

async function main() {
  const args = process.argv.slice(2);
  const kev = loadKev();
  const delay = process.env.NVD_API_KEY ? 700 : 6500; // rate-limit spacing
  let records = 0;

  const idsArg = args[args.indexOf("--ids") + 1];
  const recentArg = args.includes("--recent") ? Number(args[args.indexOf("--recent") + 1] || 100) : 0;

  if (idsArg && args.includes("--ids")) {
    const ids = idsArg.split(",").map((s) => s.trim()).filter(Boolean);
    for (const id of ids) {
      const json = await nvdGet(`cveId=${encodeURIComponent(id)}`);
      for (const rec of parseCveResponse(json, kev)) {
        putRecord(rec);
        putPage(rec.cveId, scoreVuln(rec, undefined));
        records++;
        console.log(`  + ${rec.cveId}  ${rec.cvss?.severity ?? "N/A"}${rec.kev ? " [KEV]" : ""}`);
      }
      await sleep(delay);
    }
  }

  if (recentArg > 0) {
    // Recently *published* (not just reanalyzed) → realistic modern severity mix.
    const end = new Date();
    const start = new Date(end.getTime() - 40 * 864e5);
    const qs = `resultsPerPage=${Math.min(recentArg, 2000)}&pubStartDate=${isoNvd(start)}&pubEndDate=${isoNvd(end)}`;
    console.log(`Fetching ${recentArg} recently-published CVEs…`);
    const json = await nvdGet(qs);
    for (const rec of parseCveResponse(json, kev)) {
      putRecord(rec);
      putPage(rec.cveId, scoreVuln(rec, undefined));
      records++;
    }
  }

  if (!records) { console.log("Nothing ingested. Pass --recent N and/or --ids CVE-...,CVE-..."); return; }
  console.log(`\nIngested/updated ${records} CVE record(s). (all noindex until enriched — run vuln:enrich)`);
}
main().catch((e) => { console.error(e); process.exit(1); });
