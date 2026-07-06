/**
 * Re-apply the current quality gate to every stored record. Run after tuning
 * src/lib/vuln/quality.ts to see the new index/review/noindex split without
 * re-enriching. Usage: npm run vuln:rescore
 */
import { loadEnv } from "./_env";
import { allVulns, putPage } from "../../src/lib/vuln/store";
import { scoreVuln } from "../../src/lib/vuln/quality";

loadEnv();
const tally: Record<string, number> = { index: 0, review: 0, noindex: 0 };
for (const v of allVulns()) {
  const page = scoreVuln(v.record, v.enrichment);
  putPage(v.record.cveId, page);
  tally[page.indexState]++;
}
console.log(`Rescored ${Object.values(tally).reduce((a, b) => a + b, 0)}: ${tally.index} index · ${tally.review} review · ${tally.noindex} noindex`);
