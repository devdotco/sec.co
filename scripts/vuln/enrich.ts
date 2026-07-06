/**
 * Enrich stored CVEs with Haiku 4.5 → update page quality decision.
 *
 *   npm run vuln:enrich -- --limit 10            # synchronous (standard price)
 *   npm run vuln:enrich -- --batch --limit 200   # Batch API (50% off)
 *   npm run vuln:enrich -- --batch --kev-only
 *
 * Pre-screens with quality.preScreen so we never pay to enrich a page we'd
 * never index. Needs ENRICHMENT_ANTHROPIC_API_KEY (or ANTHROPIC_API_KEY).
 */
import { loadEnv } from "./_env";
import { needingEnrichment, putEnrichment, putPage } from "../../src/lib/vuln/store";
import {
  enrichCve,
  submitEnrichmentBatch,
  getBatchStatus,
  collectBatchResults,
} from "../../src/lib/vuln/enrichment";
import { preScreen, scoreVuln } from "../../src/lib/vuln/quality";
import type { CveRecord } from "../../src/lib/vuln/types";

loadEnv();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function store(rec: CveRecord, enr: Awaited<ReturnType<typeof enrichCve>>) {
  putEnrichment(rec.cveId, enr);
  const page = scoreVuln(rec, enr);
  putPage(rec.cveId, page);
  return page;
}

async function main() {
  const args = process.argv.slice(2);
  const limit = args.includes("--limit") ? Number(args[args.indexOf("--limit") + 1] || 10) : 10;
  const kevOnly = args.includes("--kev-only");
  const batch = args.includes("--batch");

  let queue = needingEnrichment();
  if (kevOnly) queue = queue.filter((r) => r.kev);

  // Pre-screen: drop ineligible before spending on enrichment.
  const skipped: Record<string, number> = {};
  queue = queue.filter((r) => {
    const pre = preScreen(r);
    if (!pre.eligible) {
      putPage(r.cveId, scoreVuln(r, undefined)); // record the noindex decision
      skipped[pre.reason!] = (skipped[pre.reason!] ?? 0) + 1;
      return false;
    }
    return true;
  });
  const skippedTotal = Object.values(skipped).reduce((a, b) => a + b, 0);
  queue = queue.slice(0, limit);

  if (skippedTotal) {
    console.log(`Pre-screen skipped ${skippedTotal}: ${Object.entries(skipped).map(([k, v]) => `${v} ${k}`).join(", ")}`);
  }
  if (!queue.length) { console.log("Nothing eligible to enrich."); return; }

  let words = 0, cost = 0, n = 0;
  const tally: Record<string, number> = { index: 0, review: 0, noindex: 0 };

  if (batch) {
    console.log(`Submitting Batch API job for ${queue.length} CVE(s)…`);
    const byId = new Map(queue.map((r) => [r.cveId, r]));
    const batchId = await submitEnrichmentBatch(queue);
    console.log(`  batch ${batchId} — polling…`);
    let resultsUrl: string | undefined;
    for (let i = 0; i < 240; i++) {
      const s = await getBatchStatus(batchId);
      if (s.status === "ended") { resultsUrl = s.resultsUrl; break; }
      if (i % 4 === 0) console.log(`  … ${s.status} ${JSON.stringify(s.counts ?? {})}`);
      await sleep(15000);
    }
    if (!resultsUrl) throw new Error("batch did not end within ~60 min");
    const { results, failed } = await collectBatchResults(resultsUrl, byId);
    for (const rec of queue) {
      const enr = results.get(rec.cveId);
      if (!enr) continue;
      const page = store(rec, enr);
      words += enr.wordCount; cost += enr.costUsd; n++; tally[page.indexState]++;
    }
    if (failed.length) console.log(`  ${failed.length} failed: ${failed.slice(0, 3).map((f) => f.cveId).join(", ")}…`);
  } else {
    console.log(`Enriching ${queue.length} CVE(s) synchronously…\n`);
    for (const rec of queue) {
      try {
        const enr = await enrichCve(rec);
        const page = store(rec, enr);
        words += enr.wordCount; cost += enr.costUsd; n++; tally[page.indexState]++;
        console.log(`  ✓ ${rec.cveId}  ${enr.wordCount}w  q${page.qualityScore} → ${page.indexState}`);
      } catch (e) {
        console.error(`  ✗ ${rec.cveId}: ${(e as Error).message}`);
      }
      await sleep(300);
    }
  }

  if (n) {
    console.log(`\n=== ENRICHED ${n} (${batch ? "batch −50%" : "standard"}) ===`);
    console.log(`decisions          : ${tally.index} index · ${tally.review} review · ${tally.noindex} noindex`);
    console.log(`avg words          : ${Math.round(words / n)}  (~${(words / n / 200).toFixed(1)} min read)`);
    console.log(`total cost         : $${cost.toFixed(4)}`);
    console.log(`avg cost/CVE       : $${(cost / n).toFixed(5)}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); });
