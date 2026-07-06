/**
 * Ingest the CISA KEV catalog → cache it for CVE joins.
 * Usage: npm run vuln:ingest-kev
 */
import fs from "node:fs";
import path from "node:path";
import { loadEnv } from "./_env";
import { parseKevCatalog } from "../../src/lib/vuln/nvd";

loadEnv();
const KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";
const OUT = path.join(process.cwd(), ".data", "vuln", "kev.json");

async function main() {
  console.log("Fetching CISA KEV catalog…");
  const res = await fetch(KEV_URL);
  if (!res.ok) throw new Error(`KEV fetch ${res.status}`);
  const json = await res.json();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(json));
  const map = parseKevCatalog(json);
  console.log(`KEV catalog ${(json as { catalogVersion?: string }).catalogVersion ?? "?"} — ${map.size} entries cached → ${path.relative(process.cwd(), OUT)}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
