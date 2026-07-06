/**
 * Haiku 4.5 enrichment — the EXPLANATION layer.
 *
 * Validated live (see docs/sec-cost-model.md): fact-faithful, ~1,270 words,
 * ~$0.006/CVE batched. The model NEVER emits CVSS/KEV/affected-products/
 * references — those are ground truth passed in and rendered deterministically.
 */
import type { CveRecord, Enrichment, EnrichmentData } from "./types";

export const PROMPT_VERSION = "sec-cve-v1";
const MODEL = "claude-haiku-4-5";
// Haiku 4.5 pricing $/MTok (standard; Batch API halves both).
const IN_PER_MTOK = 1.0;
const OUT_PER_MTOK = 5.0;

export const ENRICHMENT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "plain_english_summary", "technical_summary", "business_impact",
    "affected_systems_summary", "exploitability_summary", "remediation_summary",
    "patch_guidance", "detection_guidance", "prioritization_reason",
    "risk_score_explanation", "faq", "seo_title", "seo_description", "disclaimers",
  ],
  properties: {
    plain_english_summary: { type: "string" },
    technical_summary: { type: "string" },
    business_impact: { type: "string" },
    affected_systems_summary: { type: "string" },
    exploitability_summary: { type: "string" },
    remediation_summary: { type: "string" },
    patch_guidance: { type: "string" },
    detection_guidance: { type: "string" },
    prioritization_reason: { type: "string" },
    risk_score_explanation: { type: "string" },
    faq: {
      // Note: structured-output schemas reject array minItems/maxItems > 1;
      // the 3-4 FAQ count is enforced via the system prompt instead.
      type: "array",
      items: {
        type: "object", additionalProperties: false,
        required: ["q", "a"],
        properties: { q: { type: "string" }, a: { type: "string" } },
      },
    },
    seo_title: { type: "string" },
    seo_description: { type: "string" },
    disclaimers: { type: "string" },
  },
} as const;

const SYSTEM =
  "You are a senior security analyst writing an original, factual explainer for a vulnerability " +
  "intelligence page on SEC.co, a cybersecurity firm. Write clear, useful prose for a technical-but-busy " +
  "security leader. NEVER invent CVSS scores, KEV status, affected products, patch version numbers, or " +
  "references — those come from the structured source data provided to you as ground truth. Explain, " +
  "contextualize, and advise; do not restate the raw description verbatim. If you reference a patch version, " +
  "it must be traceable to the provided data or explicitly framed as 'verify against the vendor advisory'. " +
  "No exploit code, no weaponized proof-of-concept steps. 3-4 FAQ items. Keep each field substantive but not padded.";

function apiKey(): string {
  const k = process.env.ENRICHMENT_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!k) throw new Error("Set ENRICHMENT_ANTHROPIC_API_KEY (or ANTHROPIC_API_KEY).");
  return k;
}

function wordCount(data: EnrichmentData): number {
  const parts: string[] = [];
  for (const [k, v] of Object.entries(data)) {
    if (k === "seo_title" || k === "seo_description") continue;
    if (typeof v === "string") parts.push(v);
  }
  for (const f of data.faq) parts.push(f.q, f.a);
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

/** Ground-truth facts handed to the model (it must not contradict these). */
function facts(r: CveRecord) {
  return {
    id: r.cveId,
    description: r.description,
    published: r.published,
    modified: r.lastModified,
    cvss: r.cvss,
    cwes: r.cwes,
    vendors_products: r.affected.slice(0, 40).map((a) => `${a.vendor} ${a.product}`),
    kev: !!r.kev,
    kev_dateAdded: r.kev?.dateAdded ?? null,
    kev_dueDate: r.kev?.dueDate ?? null,
    kev_ransomware: r.kev?.knownRansomwareCampaignUse ?? null,
  };
}

/** The per-record request params — shared by the single and batch paths. */
function buildParams(record: CveRecord) {
  return {
    model: MODEL,
    max_tokens: 4096,
    system: SYSTEM,
    output_config: { format: { type: "json_schema", schema: ENRICHMENT_SCHEMA } },
    messages: [
      {
        role: "user",
        content:
          "Ground-truth source data (do not contradict):\n" +
          JSON.stringify(facts(record), null, 2) +
          "\n\nWrite the enrichment JSON for this vulnerability's SEC.co intelligence page.",
      },
    ],
  };
}

type ApiMessage = {
  stop_reason: string;
  content: { type: string; text?: string }[];
  usage: { input_tokens: number; output_tokens: number };
};

function toEnrichment(record: CveRecord, msg: ApiMessage, batch: boolean): Enrichment {
  if (msg.stop_reason === "max_tokens") throw new Error(`${record.cveId}: hit max_tokens`);
  const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const data = JSON.parse(text) as EnrichmentData;
  const { input_tokens, output_tokens } = msg.usage;
  const mult = batch ? 0.5 : 1; // Batch API is 50% off both directions
  const costUsd = ((input_tokens / 1e6) * IN_PER_MTOK + (output_tokens / 1e6) * OUT_PER_MTOK) * mult;
  return {
    data,
    model: MODEL,
    promptVersion: PROMPT_VERSION,
    inputTokens: input_tokens,
    outputTokens: output_tokens,
    costUsd: Number(costUsd.toFixed(5)),
    wordCount: wordCount(data),
    sourceHash: record.contentHash,
    createdAt: new Date().toISOString(),
  };
}

function authHeaders(): Record<string, string> {
  return { "x-api-key": apiKey(), "anthropic-version": "2023-06-01", "content-type": "application/json" };
}

/** Synchronous single-record enrichment (standard price). */
export async function enrichCve(record: CveRecord): Promise<Enrichment> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(buildParams(record)),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return toEnrichment(record, (await res.json()) as ApiMessage, false);
}

// ── Batch API (50% off) — the production enrichment path ─────────────────────
const BATCHES = "https://api.anthropic.com/v1/messages/batches";

export async function submitEnrichmentBatch(records: CveRecord[]): Promise<string> {
  const requests = records.map((r) => ({ custom_id: r.cveId, params: buildParams(r) }));
  const res = await fetch(BATCHES, { method: "POST", headers: authHeaders(), body: JSON.stringify({ requests }) });
  if (!res.ok) throw new Error(`Batch submit ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return ((await res.json()) as { id: string }).id;
}

export async function getBatchStatus(
  batchId: string,
): Promise<{ status: string; resultsUrl?: string; counts?: Record<string, number> }> {
  const res = await fetch(`${BATCHES}/${batchId}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Batch status ${res.status}`);
  const j = (await res.json()) as { processing_status: string; results_url?: string; request_counts?: Record<string, number> };
  return { status: j.processing_status, resultsUrl: j.results_url, counts: j.request_counts };
}

export async function collectBatchResults(
  resultsUrl: string,
  byId: Map<string, CveRecord>,
): Promise<{ results: Map<string, Enrichment>; failed: { cveId: string; error: string }[] }> {
  const res = await fetch(resultsUrl, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Batch results ${res.status}`);
  const text = await res.text();
  const results = new Map<string, Enrichment>();
  const failed: { cveId: string; error: string }[] = [];
  for (const line of text.split("\n").filter(Boolean)) {
    const row = JSON.parse(line) as {
      custom_id: string;
      result: { type: string; message?: ApiMessage; error?: unknown };
    };
    const rec = byId.get(row.custom_id);
    if (!rec) continue;
    if (row.result.type === "succeeded" && row.result.message) {
      try {
        results.set(rec.cveId, toEnrichment(rec, row.result.message, true));
      } catch (e) {
        failed.push({ cveId: rec.cveId, error: (e as Error).message });
      }
    } else {
      failed.push({ cveId: rec.cveId, error: `${row.result.type}: ${JSON.stringify(row.result.error).slice(0, 120)}` });
    }
  }
  return { results, failed };
}
