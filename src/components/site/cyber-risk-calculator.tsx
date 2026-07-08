"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Cyber Risk Calculator — FAIR-lite quantification

   Converts posture + exposure into an ANNUALIZED loss range in dollars.

     Loss Event Frequency (LEF) = base breach frequency
                                  × company-size factor
                                  × data-attractiveness factor
                                  × Π(control frequency reducers)
     Loss Magnitude (per event) = primary (records × cost/record × sensitivity)
                                  + secondary (response + fines + downtime/churn)
                                  , attenuated by control magnitude reducers,
                                  drawn as a lognormal to capture tail risk.
     Annualized Loss Exposure   = Monte Carlo over Poisson(LEF) × Σ magnitudes.

   Benchmarks are calibrated from public sources (IBM Cost of a Data Breach,
   Verizon DBIR). Seeded RNG → identical inputs yield an identical curve.
   ───────────────────────────────────────────────────────────────────────── */

// ── Benchmark tables ────────────────────────────────────────────────────────

type Industry = {
  id: string;
  label: string;
  /** Expected material breaches/yr for an average-posture mid-market org. */
  baseFreq: number;
  /** Primary loss per compromised record ($), average posture. */
  costPerRecord: number;
};

const INDUSTRIES: Industry[] = [
  { id: "healthcare", label: "Healthcare / Life Sciences", baseFreq: 0.32, costPerRecord: 410 },
  { id: "financial", label: "Financial Services", baseFreq: 0.28, costPerRecord: 340 },
  { id: "technology", label: "Technology / SaaS", baseFreq: 0.3, costPerRecord: 260 },
  { id: "retail", label: "Retail / E-commerce", baseFreq: 0.26, costPerRecord: 200 },
  { id: "energy", label: "Energy / Utilities", baseFreq: 0.23, costPerRecord: 230 },
  { id: "manufacturing", label: "Manufacturing / Industrial", baseFreq: 0.22, costPerRecord: 190 },
  { id: "government", label: "Government / Public Sector", baseFreq: 0.25, costPerRecord: 180 },
  { id: "education", label: "Education", baseFreq: 0.24, costPerRecord: 185 },
  { id: "professional", label: "Professional Services", baseFreq: 0.2, costPerRecord: 180 },
  { id: "media", label: "Media / Entertainment", baseFreq: 0.21, costPerRecord: 170 },
  { id: "other", label: "Other / General Business", baseFreq: 0.22, costPerRecord: 190 },
];

type RevenueBand = {
  id: string;
  label: string;
  /** Attack-surface / targeting multiplier on frequency. */
  freqMult: number;
  /** Fixed-cost scaling (forensics, legal, notification, ops). */
  fixedMult: number;
};

const REVENUE_BANDS: RevenueBand[] = [
  { id: "xs", label: "Under $10M", freqMult: 0.55, fixedMult: 0.35 },
  { id: "sm", label: "$10M – $50M", freqMult: 0.8, fixedMult: 0.7 },
  { id: "md", label: "$50M – $250M", freqMult: 1.0, fixedMult: 1.0 },
  { id: "lg", label: "$250M – $1B", freqMult: 1.35, fixedMult: 1.9 },
  { id: "xl", label: "$1B+", freqMult: 1.8, fixedMult: 3.5 },
];

type DataType = {
  id: string;
  label: string;
  /** Multiplier on per-record primary loss. */
  recordMult: number;
  /** Added frequency attractiveness. */
  freqBump: number;
  /** Fixed regulatory / recovery exposure per breach ($). */
  fixedAdd: number;
};

const DATA_TYPES: DataType[] = [
  { id: "pii", label: "Personal data (PII)", recordMult: 1.0, freqBump: 0.05, fixedAdd: 40_000 },
  { id: "phi", label: "Health records (PHI / HIPAA)", recordMult: 1.25, freqBump: 0.08, fixedAdd: 250_000 },
  { id: "pci", label: "Payment / cardholder (PCI)", recordMult: 1.15, freqBump: 0.1, fixedAdd: 180_000 },
  { id: "ip", label: "IP / trade secrets", recordMult: 1.0, freqBump: 0.06, fixedAdd: 600_000 },
];

type Control = {
  id: string;
  label: string;
  hint: string;
  /** Frequency multiplier when enabled (<1 reduces likelihood). */
  freqMult: number;
  /** Magnitude multiplier when enabled (<1 reduces impact). */
  magMult: number;
};

const CONTROLS: Control[] = [
  { id: "mfa", label: "MFA everywhere", hint: "Phishing-resistant MFA on all accounts", freqMult: 0.55, magMult: 1.0 },
  { id: "edr", label: "EDR / managed detection", hint: "24×7 endpoint detection & response", freqMult: 0.72, magMult: 0.75 },
  { id: "backups", label: "Tested backups & DR", hint: "Immutable, restore-tested backups", freqMult: 1.0, magMult: 0.7 },
  { id: "training", label: "Security awareness training", hint: "Recurring phishing simulation & training", freqMult: 0.83, magMult: 1.0 },
  { id: "encryption", label: "Encryption at rest", hint: "Sensitive data encrypted at rest", freqMult: 1.0, magMult: 0.84 },
  { id: "segmentation", label: "Network segmentation", hint: "Limits blast radius of an intrusion", freqMult: 0.85, magMult: 0.85 },
  { id: "ir", label: "IR plan + retainer", hint: "Tested incident-response plan on retainer", freqMult: 1.0, magMult: 0.72 },
  { id: "patching", label: "Vulnerability management", hint: "Prioritized, SLA-driven patching", freqMult: 0.8, magMult: 1.0 },
];

// ── Model ────────────────────────────────────────────────────────────────────

type Inputs = {
  industryId: string;
  revenueId: string;
  records: number;
  dataTypes: string[];
  controls: string[];
};

const RECORD_ANCHOR = 10_000; // records below which per-record cost is at full benchmark
const FREQ_FLOOR = 0.1; // residual likelihood — no control set drives risk to zero
const MAG_FLOOR = 0.32; // residual impact
const SIGMA = 0.72; // per-event lognormal spread (P90/P10 ≈ ~5×)
const ITERATIONS = 4000;

// Deterministic RNG so identical inputs render an identical curve (no flicker).
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashInputs(i: Inputs): number {
  const s = JSON.stringify(i);
  let h = 2166136261;
  for (let k = 0; k < s.length; k++) {
    h ^= s.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function poisson(lambda: number, rng: () => number): number {
  // Knuth — fine for the small λ this model produces.
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= rng();
  } while (p > L);
  return k - 1;
}

function stdNormal(rng: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rng();
  while (v === 0) v = rng();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

type Model = {
  lef: number; // expected breaches / year
  eventMagnitude: number; // median single-event loss ($)
  primaryShare: number; // 0..1 of magnitude that is primary (record) loss
  ale: number; // mean annualized loss ($)
  p50: number;
  p90: number;
  p95: number;
  worstEvent: number; // P90 single-event magnitude
  returnPeriod: number; // avg years between material breaches
  curve: { loss: number; prob: number }[]; // loss-exceedance curve
};

function computeModel(inp: Inputs): Model {
  const industry = INDUSTRIES.find((x) => x.id === inp.industryId) ?? INDUSTRIES[0];
  const band = REVENUE_BANDS.find((x) => x.id === inp.revenueId) ?? REVENUE_BANDS[2];
  const dts = DATA_TYPES.filter((d) => inp.dataTypes.includes(d.id));
  const ctrls = CONTROLS.filter((c) => inp.controls.includes(c.id));

  // Frequency
  const dataFreq = 1 + dts.reduce((a, d) => a + d.freqBump, 0);
  const ctrlFreq = Math.max(
    FREQ_FLOOR,
    ctrls.reduce((a, c) => a * c.freqMult, 1),
  );
  const lef = industry.baseFreq * band.freqMult * dataFreq * ctrlFreq;

  // Magnitude (median single event)
  const recordMult = dts.reduce((a, d) => Math.max(a, d.recordMult), 1); // dominant sensitivity
  const ctrlMag = Math.max(
    MAG_FLOOR,
    ctrls.reduce((a, c) => a * c.magMult, 1),
  );
  // Per-record cost is sublinear: benchmarks hold for small breaches, but
  // mega-breaches cost far less per record (Anthem 79M recs ≈ $3/rec, not $400).
  const records = Math.max(inp.records, 1);
  const costDecay = Math.min(1, Math.pow(RECORD_ANCHOR / Math.max(records, RECORD_ANCHOR), 0.4));
  const primaryRaw = records * industry.costPerRecord * recordMult * costDecay;
  const fixedRaw = (250_000 + dts.reduce((a, d) => a + d.fixedAdd, 0)) * band.fixedMult;
  const primary = primaryRaw * ctrlMag;
  const fixed = fixedRaw * ctrlMag;
  const eventMagnitude = primary + fixed;
  const primaryShare = eventMagnitude > 0 ? primary / eventMagnitude : 0;

  // Monte Carlo → annualized distribution
  const rng = mulberry32(hashInputs(inp));
  const median = Math.max(eventMagnitude, 1);
  const mu = Math.log(median);
  const losses = new Float64Array(ITERATIONS);
  for (let i = 0; i < ITERATIONS; i++) {
    const events = poisson(lef, rng);
    let total = 0;
    for (let e = 0; e < events; e++) {
      total += Math.exp(mu + SIGMA * stdNormal(rng));
    }
    losses[i] = total;
  }
  losses.sort();
  const pct = (p: number) => losses[Math.min(ITERATIONS - 1, Math.floor(p * ITERATIONS))];
  const ale = losses.reduce((a, b) => a + b, 0) / ITERATIONS;

  // Loss-exceedance curve — P(annual loss ≥ x)
  const maxLoss = Math.max(pct(0.995), median);
  const curve: { loss: number; prob: number }[] = [];
  const STEPS = 60;
  for (let s = 0; s <= STEPS; s++) {
    const loss = (maxLoss * s) / STEPS;
    let count = 0;
    for (let i = 0; i < ITERATIONS; i++) if (losses[i] >= loss) count++;
    curve.push({ loss, prob: count / ITERATIONS });
  }

  const worstEvent = Math.exp(mu + SIGMA * 1.2816); // P90 single event

  return {
    lef,
    eventMagnitude,
    primaryShare,
    ale,
    p50: pct(0.5),
    p90: pct(0.9),
    p95: pct(0.95),
    worstEvent,
    returnPeriod: lef > 0 ? 1 / lef : Infinity,
    curve,
  };
}

// ── Formatting ───────────────────────────────────────────────────────────────

function fmtUSD(n: number): string {
  if (!isFinite(n)) return "—";
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(n < 10_000_000_000 ? 1 : 0)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(n < 10_000_000 ? 2 : 1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n)}`;
}

function fmtNum(n: number): string {
  return n.toLocaleString("en-US");
}

// ── Component ────────────────────────────────────────────────────────────────

const inputBase =
  "h-11 w-full rounded-xl border border-[var(--color-line)] bg-ink-0 px-3 text-[14px] text-bone outline-none transition-colors focus:border-[var(--color-brand-violet)] focus:ring-2 focus:ring-[var(--color-brand-violet)]/30";

export function CyberRiskCalculator() {
  const [industryId, setIndustryId] = useState("healthcare");
  const [revenueId, setRevenueId] = useState("md");
  const [records, setRecords] = useState(250_000);
  const [dataTypes, setDataTypes] = useState<string[]>(["pii", "phi"]);
  const [controls, setControls] = useState<string[]>(["mfa", "backups"]);

  const inputs: Inputs = { industryId, revenueId, records, dataTypes, controls };
  const model = useMemo(() => computeModel(inputs), [industryId, revenueId, records, dataTypes.join(","), controls.join(",")]);

  // Sensitivity: marginal ALE reduction from each not-yet-enabled control.
  const levers = useMemo(() => {
    return CONTROLS.filter((c) => !controls.includes(c.id))
      .map((c) => {
        const improved = computeModel({ ...inputs, controls: [...controls, c.id] });
        return { control: c, savings: Math.max(0, model.ale - improved.ale) };
      })
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 3);
  }, [industryId, revenueId, records, dataTypes.join(","), controls.join(",")]);

  const toggle = (arr: string[], set: (v: string[]) => void, id: string) =>
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
      {/* ── Inputs ── */}
      <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-7">
        <h2 className="font-display text-[20px] tracking-tight text-bone">Your profile</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-mute">
          Five inputs. The estimate updates live.
        </p>

        <div className="mt-6 space-y-6">
          <Field label="Industry">
            <select value={industryId} onChange={(e) => setIndustryId(e.target.value)} className={inputBase}>
              {INDUSTRIES.map((i) => (
                <option key={i.id} value={i.id} className="bg-ink-1">
                  {i.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Annual revenue">
            <select value={revenueId} onChange={(e) => setRevenueId(e.target.value)} className={inputBase}>
              {REVENUE_BANDS.map((b) => (
                <option key={b.id} value={b.id} className="bg-ink-1">
                  {b.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Sensitive records at risk" value={fmtNum(records)}>
            <input
              type="range"
              min={1000}
              max={10_000_000}
              step={1000}
              value={records}
              onChange={(e) => setRecords(Number(e.target.value))}
              className="mt-1 w-full accent-[var(--color-brand-violet)]"
            />
            <div className="mt-1 flex justify-between text-[11px] text-faint">
              <span>1K</span>
              <span>10M</span>
            </div>
          </Field>

          <Field label="Data you hold" hint="Drives per-record cost and regulatory exposure">
            <div className="flex flex-wrap gap-2">
              {DATA_TYPES.map((d) => (
                <Chip key={d.id} active={dataTypes.includes(d.id)} onClick={() => toggle(dataTypes, setDataTypes, d.id)}>
                  {d.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Controls in place" hint="Toggle what you actually have deployed">
            <div className="grid gap-2 sm:grid-cols-2">
              {CONTROLS.map((c) => {
                const on = controls.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggle(controls, setControls, c.id)}
                    title={c.hint}
                    className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] transition-colors ${
                      on
                        ? "border-[var(--color-brand-violet)] bg-[rgba(96,41,255,0.15)] text-bone"
                        : "border-[var(--color-line)] bg-ink-0 text-bone-dim hover:border-line-strong"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border text-[10px] ${
                        on ? "border-transparent bg-[var(--color-brand-violet)] text-ink-0" : "border-line-strong text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                    {c.label}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      </div>

      {/* ── Output ── */}
      <div className="space-y-5">
        <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-7">
          <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-mute">
            Annualized loss exposure
          </div>
          <div className="mt-2 font-display text-[clamp(2.4rem,6vw,3.6rem)] leading-none tracking-[-0.03em]">
            <span className="brand-gradient-text">{fmtUSD(model.ale)}</span>
            <span className="ml-2 align-middle text-[15px] font-normal tracking-normal text-mute">/ year expected</span>
          </div>
          <p className="mt-3 max-w-[46ch] text-[13.5px] leading-relaxed text-bone-dim">
            Probability-weighted loss across a year. A material breach is expected roughly{" "}
            <strong className="text-bone">
              {model.returnPeriod < 1
                ? `${(1 / model.returnPeriod).toFixed(1)}× per year`
                : `every ${model.returnPeriod.toFixed(1)} years`}
            </strong>
            .
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Stat label="Bad-year loss (1-in-20)" value={fmtUSD(model.p95)} tone="amber" />
            <Stat label="Typical single incident" value={fmtUSD(model.eventMagnitude)} tone="plain" />
          </div>
        </div>

        {/* Loss-exceedance curve */}
        <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-7">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-[16px] tracking-tight text-bone">Loss exceedance</h3>
            <span className="text-[11px] text-mute">probability annual loss ≥ X</span>
          </div>
          <ExceedanceCurve curve={model.curve} p90={model.p90} p95={model.p95} />
        </div>

        {/* Breakdown + levers */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6">
            <h3 className="font-display text-[15px] tracking-tight text-bone">Where the loss sits</h3>
            <div className="mt-4">
              <div className="flex h-2.5 overflow-hidden rounded-full bg-ink-0">
                <div
                  className="h-full bg-[var(--color-brand-cyan)]"
                  style={{ width: `${model.primaryShare * 100}%` }}
                />
                <div className="h-full w-0.5 bg-ink-1" />
                <div className="h-full flex-1 bg-[var(--color-brand-magenta)]" />
              </div>
              <div className="mt-3 space-y-2 text-[12.5px]">
                <LegendRow color="var(--color-brand-cyan)" label="Data / records (primary)" pct={model.primaryShare} />
                <LegendRow color="var(--color-brand-magenta)" label="Response, fines, downtime" pct={1 - model.primaryShare} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6">
            <h3 className="font-display text-[15px] tracking-tight text-bone">Biggest levers</h3>
            {levers.length === 0 ? (
              <p className="mt-3 text-[13px] leading-relaxed text-bone-dim">
                Every modeled control is enabled — you&apos;re at the residual-risk floor.
              </p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {levers.map((l) => (
                  <li key={l.control.id} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-bone-dim">{l.control.label}</span>
                    <span className="shrink-0 font-medium text-[var(--color-signal-green)]">
                      −{fmtUSD(l.savings)}/yr
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <p className="px-1 text-[11.5px] leading-relaxed text-faint">
          Estimate only. A FAIR-lite model calibrated to public benchmarks (IBM Cost of a Data
          Breach, Verizon DBIR); it is not a substitute for a scoped assessment. No inputs leave
          your browser.
        </p>
      </div>
    </div>
  );
}

// ── Subcomponents ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  value,
  children,
}: {
  label: string;
  hint?: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label className="text-[13px] font-medium text-bone">{label}</label>
        {value && <span className="font-mono text-[12px] text-bone-dim">{value}</span>}
      </div>
      {children}
      {hint && <p className="mt-1.5 text-[11.5px] leading-relaxed text-mute">{hint}</p>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors ${
        active
          ? "border-[var(--color-brand-violet)] bg-[rgba(96,41,255,0.15)] text-bone"
          : "border-[var(--color-line)] bg-ink-0 text-bone-dim hover:border-line-strong"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "amber" | "plain" }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-ink-0/60 px-4 py-3.5">
      <div className="text-[11px] uppercase tracking-[0.12em] text-mute">{label}</div>
      <div
        className={`mt-1 font-display text-[22px] tracking-tight ${
          tone === "amber" ? "text-[var(--color-signal-amber)]" : "text-bone"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function LegendRow({ color, label, pct }: { color: string; label: string; pct: number }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2 text-bone-dim">
        <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-[3px]" style={{ background: color }} />
        {label}
      </span>
      <span className="font-mono text-mute">{Math.round(pct * 100)}%</span>
    </div>
  );
}

// Loss-exceedance curve — single-series magnitude, no legend (title names it).
function ExceedanceCurve({
  curve,
  p90,
  p95,
}: {
  curve: { loss: number; prob: number }[];
  p90: number;
  p95: number;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 520;
  const H = 220;
  const padL = 8;
  const padR = 8;
  const padT = 12;
  const padB = 28;
  const maxLoss = curve[curve.length - 1]?.loss || 1;
  const x = (loss: number) => padL + (loss / maxLoss) * (W - padL - padR);
  const y = (prob: number) => padT + (1 - prob) * (H - padT - padB);

  const line = curve.map((c, i) => `${i === 0 ? "M" : "L"}${x(c.loss).toFixed(1)},${y(c.prob).toFixed(1)}`).join(" ");
  const area = `${line} L${x(maxLoss).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const marks = [
    { loss: p90, label: "P90", prob: 0.1 },
    { loss: p95, label: "P95", prob: 0.05 },
  ].filter((m) => m.loss > 0 && m.loss <= maxLoss);

  const hovered = hover != null ? curve[hover] : null;

  return (
    <div className="mt-4">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        role="img"
        aria-label="Loss exceedance curve"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = ((e.clientX - rect.left) / rect.width) * W;
          const loss = ((px - padL) / (W - padL - padR)) * maxLoss;
          let best = 0;
          let bd = Infinity;
          curve.forEach((c, i) => {
            const d = Math.abs(c.loss - loss);
            if (d < bd) {
              bd = d;
              best = i;
            }
          });
          setHover(best);
        }}
      >
        <defs>
          <linearGradient id="lecStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-brand-cyan)" />
            <stop offset="55%" stopColor="var(--color-brand-violet)" />
            <stop offset="100%" stopColor="var(--color-brand-magenta)" />
          </linearGradient>
          <linearGradient id="lecFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(96,41,255,0.28)" />
            <stop offset="100%" stopColor="rgba(96,41,255,0.02)" />
          </linearGradient>
        </defs>

        {/* recessive gridlines at 25/50/75% probability */}
        {[0.25, 0.5, 0.75].map((p) => (
          <line
            key={p}
            x1={padL}
            x2={W - padR}
            y1={y(p)}
            y2={y(p)}
            stroke="var(--color-line-subtle)"
            strokeWidth={1}
          />
        ))}

        <path d={area} fill="url(#lecFill)" />
        <path d={line} fill="none" stroke="url(#lecStroke)" strokeWidth={2.5} strokeLinejoin="round" />

        {/* percentile markers */}
        {marks.map((m) => (
          <g key={m.label}>
            <line x1={x(m.loss)} x2={x(m.loss)} y1={y(m.prob)} y2={H - padB} stroke="var(--color-line-strong)" strokeWidth={1} strokeDasharray="3 3" />
            <circle cx={x(m.loss)} cy={y(m.prob)} r={4} fill="var(--color-bone)" />
            <text x={x(m.loss)} y={H - padB + 16} textAnchor="middle" className="fill-[var(--color-mute)]" fontSize={10}>
              {m.label} · {fmtUSD(m.loss)}
            </text>
          </g>
        ))}

        {/* hover crosshair */}
        {hovered && (
          <g>
            <line x1={x(hovered.loss)} x2={x(hovered.loss)} y1={padT} y2={H - padB} stroke="var(--color-line-strong)" strokeWidth={1} />
            <circle cx={x(hovered.loss)} cy={y(hovered.prob)} r={4.5} fill="var(--color-bone)" stroke="var(--color-ink-0)" strokeWidth={1.5} />
          </g>
        )}
      </svg>

      <div className="mt-1 h-5 text-center text-[12px] text-bone-dim">
        {hovered ? (
          <>
            <span className="font-medium text-bone">{Math.round(hovered.prob * 100)}%</span> chance of losing{" "}
            <span className="font-medium text-bone">{fmtUSD(hovered.loss)}</span> or more this year
          </>
        ) : (
          <span className="text-mute">Hover the curve to read any threshold</span>
        )}
      </div>
    </div>
  );
}
