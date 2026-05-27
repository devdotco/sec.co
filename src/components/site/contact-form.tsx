"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

const TOPICS = [
  { value: "assessment", label: "Cyber Risk Assessment" },
  { value: "compliance", label: "Compliance (CMMC / SOC 2 / HIPAA / …)" },
  { value: "managed", label: "Managed Detection & Response" },
  { value: "vciso", label: "vCISO / Fractional Security Leadership" },
  { value: "testing", label: "Penetration / Application / API Testing" },
  { value: "ma", label: "M&A Cyber Due Diligence" },
  { value: "industry", label: "Industry-specific engagement" },
  { value: "ir", label: "Incident Response" },
  { value: "newsletter", label: "Newsletter / Resources" },
  { value: "other", label: "Something else" },
];

const TEAM_SIZES = ["1–50", "51–250", "251–1,000", "1,000+"];

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const params = useSearchParams();
  const initialTopic = params.get("topic") ?? "";
  const initialAsset = params.get("asset");
  const initialTool = params.get("tool");

  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const renderedAtRef = useRef<number>(Date.now());

  // Pre-fill message body based on landing from a download or tool CTA
  const initialMessage = (() => {
    if (initialAsset) return `I'd like the ${initialAsset.replace(/-/g, " ")} download.`;
    if (initialTool) return `I'd like access to the ${initialTool.replace(/-/g, " ")} tool.`;
    return "";
  })();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    const body: Record<string, FormDataEntryValue | number> = {};
    formData.forEach((v, k) => {
      body[k] = v;
    });
    body.rendered_at = renderedAtRef.current;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        if (data.errors) setFieldErrors(data.errors);
        setErrorMessage(data.error ?? "Submission failed. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-10 text-center">
        <div
          aria-hidden
          className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full brand-gradient text-ink-0"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5L10 17.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="font-display text-[24px] leading-tight text-bone">
          Got it. We&apos;ll be in touch.
        </h2>
        <p className="mt-3 mx-auto max-w-md text-[14.5px] leading-relaxed text-bone-dim">
          A senior practitioner will reply within four business hours. If this is an active
          security incident, please call the 24/7 hotline at{" "}
          <a href="tel:+12062102954" className="text-bone hover:underline">
            +1 (206) 210-2954
          </a>{" "}
          instead of waiting.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-bone px-5 text-[13.5px] font-semibold tracking-tight text-ink-0 hover:bg-white hover:-translate-y-px transition-all"
          >
            Back to home
          </Link>
          <Link
            href="/blog"
            className="inline-flex h-11 items-center rounded-full border border-[var(--color-line-strong)] px-5 text-[13.5px] font-medium text-bone hover:bg-ink-2 transition-colors"
          >
            Read the blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-[var(--color-line)] bg-ink-1/40 p-6 md:p-10"
      noValidate
    >
      {/* Honeypot — visually hidden, but keyboard-accessible bots will fill it */}
      <div className="sr-only" aria-hidden>
        <label>
          Website (leave empty)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          autoComplete="name"
          required
          error={fieldErrors.name}
        />
        <Field
          label="Work email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={fieldErrors.email}
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          required
          error={fieldErrors.company}
        />
        <Field
          label="Role / title"
          name="role"
          autoComplete="organization-title"
        />

        <div className="md:col-span-2">
          <Label htmlFor="topic">What can we help with?</Label>
          <select
            id="topic"
            name="topic"
            defaultValue={initialTopic}
            className="h-11 w-full rounded-xl border border-[var(--color-line)] bg-ink-0 px-3 text-[14px] text-bone outline-none transition-colors focus:border-[var(--color-brand-violet)] focus:ring-2 focus:ring-[var(--color-brand-violet)]/30"
          >
            <option value="" disabled>
              Select a topic
            </option>
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <Label>Team size</Label>
          <div className="flex flex-wrap gap-2">
            {TEAM_SIZES.map((sz) => (
              <label
                key={sz}
                className="cursor-pointer rounded-full border border-[var(--color-line)] bg-ink-0 px-3.5 py-1.5 text-[13px] text-bone-dim transition-colors has-[:checked]:border-[var(--color-brand-violet)] has-[:checked]:bg-[rgba(96,41,255,0.15)] has-[:checked]:text-bone"
              >
                <input type="radio" name="team_size" value={sz} className="peer sr-only" />
                {sz}
              </label>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="message">What&apos;s going on?</Label>
          <textarea
            id="message"
            name="message"
            rows={5}
            defaultValue={initialMessage}
            placeholder="A few sentences on context, timeline, and any compliance pressure."
            className="block w-full resize-y rounded-xl border border-[var(--color-line)] bg-ink-0 px-3 py-2.5 text-[14px] leading-relaxed text-bone outline-none transition-colors placeholder:text-mute focus:border-[var(--color-brand-violet)] focus:ring-2 focus:ring-[var(--color-brand-violet)]/30"
          />
          {fieldErrors.message && (
            <p className="mt-1.5 text-[12px] text-[var(--color-signal-red)]">{fieldErrors.message}</p>
          )}
        </div>
      </div>

      {/* Error banner */}
      {status === "error" && errorMessage && (
        <div className="mt-6 rounded-xl border border-[rgba(255,81,96,0.4)] bg-[rgba(255,81,96,0.08)] px-4 py-3 text-[13.5px] text-[var(--color-signal-red)]">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-relaxed text-mute">
          By submitting you agree to our{" "}
          <Link href="/privacy" className="underline-offset-2 hover:underline">
            privacy notice
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-bone px-6 text-[14px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-white hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              Send message
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Label({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[12px] font-medium uppercase tracking-[0.14em] text-mute"
    >
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-[var(--color-brand-magenta)]"> *</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`h-11 w-full rounded-xl border bg-ink-0 px-3 text-[14px] text-bone outline-none transition-colors placeholder:text-mute focus:border-[var(--color-brand-violet)] focus:ring-2 focus:ring-[var(--color-brand-violet)]/30 ${
          error ? "border-[var(--color-signal-red)]" : "border-[var(--color-line)]"
        }`}
      />
      {error && (
        <p className="mt-1.5 text-[12px] text-[var(--color-signal-red)]">{error}</p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className="animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path
        d="M12 3 a 9 9 0 0 1 9 9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
