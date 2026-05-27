/**
 * POST /api/contact
 *
 * Receives the contact form (from /contact). Validates input, drops obvious
 * spam, sends a notification email via Resend, optionally sends a
 * confirmation to the submitter.
 *
 * Required env vars:
 *   RESEND_API_KEY        — from https://resend.com/api-keys
 *   CONTACT_FROM_EMAIL    — must be on a verified Resend sending domain
 *                            (e.g. "noreply@sec.co" once sec.co is verified)
 *   CONTACT_TO_EMAIL      — where the team gets notified (e.g. "team@sec.co")
 *
 * Optional:
 *   CONTACT_BCC           — comma-separated additional recipients
 *   CONTACT_REPLY_TO      — defaults to the submitter's email
 *   CONFIRMATION_ENABLED  — "true" to send the submitter a confirmation
 */

import { Resend } from "resend";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.CONTACT_FROM_EMAIL ?? "noreply@sec.co";
const TO = process.env.CONTACT_TO_EMAIL ?? "team@sec.co";
const BCC = process.env.CONTACT_BCC
  ? process.env.CONTACT_BCC.split(",").map((s) => s.trim()).filter(Boolean)
  : undefined;
const CONFIRMATION_ENABLED = process.env.CONFIRMATION_ENABLED === "true";

type SubmissionBody = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  topic?: string;
  team_size?: string;
  message?: string;
  /** Honeypot — must be empty. */
  website?: string;
  /** When the form was rendered, ms since epoch. Bots tend to submit too fast. */
  rendered_at?: number;
};

const TOPIC_LABELS: Record<string, string> = {
  assessment: "Cyber Risk Assessment",
  compliance: "Compliance",
  managed: "Managed Detection & Response",
  vciso: "vCISO / Fractional Security Leadership",
  testing: "Penetration / Application / API Testing",
  ma: "M&A Cyber Due Diligence",
  industry: "Industry-specific engagement",
  newsletter: "Newsletter / Resources",
  ir: "Incident Response",
  other: "Other",
};

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 503 }
    );
  }

  let body: SubmissionBody;
  try {
    body = (await req.json()) as SubmissionBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Spam: honeypot + min time-on-page
  if (body.website && body.website.trim() !== "") {
    // Pretend success so bots don't learn
    return NextResponse.json({ ok: true });
  }
  if (body.rendered_at && Date.now() - Number(body.rendered_at) < 1500) {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const role = (body.role ?? "").trim();
  const topic = (body.topic ?? "").trim();
  const team_size = (body.team_size ?? "").trim();
  const message = (body.message ?? "").trim();

  // Basic validation
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Required";
  if (!email) errors.email = "Required";
  else if (!isValidEmail(email)) errors.email = "Not a valid email";
  if (!company) errors.company = "Required";
  if (message.length > 5000) errors.message = "Message is too long";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const topicLabel = (topic && TOPIC_LABELS[topic]) || topic || "—";

  // Get optional URL context the form may attach (e.g. ?asset= from download CTAs)
  const url = new URL(req.url);
  const referer = req.headers.get("referer") ?? "";

  const subject = `[sec.co] ${topicLabel} — ${name} @ ${company}`;

  const text = [
    `New contact submission`,
    ``,
    `Topic:     ${topicLabel}`,
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Company:   ${company}`,
    `Role:      ${role || "—"}`,
    `Team size: ${team_size || "—"}`,
    ``,
    `Message:`,
    message || "—",
    ``,
    `---`,
    `Submitted via: ${referer || url.toString()}`,
    `User agent:    ${req.headers.get("user-agent") ?? "—"}`,
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto;">
      <h2 style="margin:0 0 16px; font-size: 18px;">New contact submission</h2>
      <table style="width:100%; border-collapse:collapse; font-size: 14px;">
        ${[
          ["Topic", escapeHtml(topicLabel)],
          ["Name", escapeHtml(name)],
          ["Email", `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`],
          ["Company", escapeHtml(company)],
          ["Role", escapeHtml(role) || "—"],
          ["Team size", escapeHtml(team_size) || "—"],
        ]
          .map(
            ([k, v]) =>
              `<tr><td style="padding:6px 12px 6px 0;color:#666;width:120px;">${k}</td><td style="padding:6px 0;">${v}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="margin:24px 0 8px; font-size: 14px; color: #666;">Message</h3>
      <div style="white-space:pre-wrap; font-size:14px; line-height:1.6; padding:12px; background:#f6f6f6; border-radius:8px;">${
        escapeHtml(message) || "—"
      }</div>
      <hr style="margin:32px 0; border:none; border-top:1px solid #eee;" />
      <div style="font-size:12px; color:#888;">
        Submitted via: ${escapeHtml(referer || url.toString())}<br/>
        User agent: ${escapeHtml(req.headers.get("user-agent") ?? "—")}
      </div>
    </div>
  `;

  const resend = new Resend(RESEND_API_KEY);

  try {
    // 1. Internal notification
    const notify = await resend.emails.send({
      from: FROM,
      to: TO,
      bcc: BCC,
      replyTo: email,
      subject,
      text,
      html,
    });
    if (notify.error) {
      console.error("[/api/contact] notify error", notify.error);
      return NextResponse.json(
        { ok: false, error: "Send failed." },
        { status: 502 }
      );
    }

    // 2. Optional confirmation to submitter
    if (CONFIRMATION_ENABLED) {
      await resend.emails.send({
        from: FROM,
        to: email,
        subject: "We got your message — SEC.co",
        text:
          `Thanks for reaching out to SEC.co. A senior practitioner will reply within 4 business hours.\n\n` +
          `What you sent:\n` +
          `Topic: ${topicLabel}\n` +
          `Company: ${company}\n\n` +
          `If this is an active security incident, please call our 24/7 hotline at +1 (206) 210-2954 instead.\n\n` +
          `— SEC.co`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] exception", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
