import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Responsible Disclosure",
  description:
    "SEC.co's vulnerability disclosure policy: scope, safe-harbor protections for good-faith research, how to report, our response commitments, and rules of engagement.",
};

const LAST_UPDATED = "May 28, 2026";

const sections: LegalSection[] = [
  {
    id: "intro",
    title: "Our Commitment",
    body: (
      <>
        <p>
          SEC.co welcomes reports from security researchers and members of the public who identify
          potential vulnerabilities in our Site or systems. We are a security company, and we
          believe coordinated disclosure makes everyone safer. This Responsible Disclosure Policy
          (the &ldquo;Policy&rdquo;) explains what is in scope, how to report safely, the legal
          protections we extend to good-faith research, and what you can expect from us in return.
        </p>
        <p>
          This Policy applies to vulnerabilities discovered in SEC.co&rsquo;s own internet-facing
          assets. It does <strong>not</strong> authorize testing of our clients&rsquo; systems —
          those are owned by the clients and are out of scope here.
        </p>
      </>
    ),
  },
  {
    id: "safe-harbor",
    title: "Safe Harbor",
    body: (
      <>
        <p>
          We will not pursue or support legal action against you for security research and
          vulnerability disclosure activities conducted in good faith and in accordance with this
          Policy. Specifically, if you make a good-faith effort to comply with this Policy during
          your research, we will:
        </p>
        <ul>
          <li>
            Consider your activity authorized under the Computer Fraud and Abuse Act and analogous
            laws, and we will not bring a claim against you for accidental, good-faith violations
            of this Policy;
          </li>
          <li>
            Consider your activity exempt from anti-circumvention provisions of the Digital
            Millennium Copyright Act (DMCA), and we will not bring a DMCA claim against you for
            circumventing technical measures in the course of your research;
          </li>
          <li>
            Work with you to understand and resolve the issue promptly, and recognize your
            contribution if you are the first to report a previously unknown vulnerability.
          </li>
        </ul>
        <p>
          If legal action is initiated by a third party against you for activities conducted in
          good faith under this Policy, we will make this authorization known. This safe harbor
          applies only to claims under our control; it does not bind third parties, and it does
          not authorize activity against our clients or any system not listed in scope.
        </p>
        <div className="callout">
          If you are unsure whether a specific action is authorized, stop and ask us first at{" "}
          <a href="mailto:security@sec.co">security@sec.co</a>. We are happy to clarify scope
          before you proceed.
        </div>
      </>
    ),
  },
  {
    id: "scope",
    title: "Scope",
    body: (
      <>
        <h3>In scope</h3>
        <ul>
          <li>The SEC.co website at <strong>sec.co</strong> and its sub-domains that we operate;</li>
          <li>
            Authentication, authorization, injection, and data-exposure issues affecting those
            properties;
          </li>
          <li>Security misconfigurations that materially affect confidentiality or integrity.</li>
        </ul>
        <h3>Out of scope</h3>
        <ul>
          <li>
            <strong>Any system belonging to our clients</strong>, or any engagement target —
            testing these is unlawful without the client&rsquo;s own authorization;
          </li>
          <li>Third-party services and platforms we use but do not operate;</li>
          <li>
            Denial-of-service (DoS/DDoS), volumetric, or resource-exhaustion attacks; physical
            attacks; and social engineering of our personnel, clients, or vendors;
          </li>
          <li>
            Findings from automated scanners without a demonstrated, exploitable impact; missing
            best-practice headers or cookie flags without a concrete attack scenario; reports based
            solely on outdated software versions without a working proof of concept;
          </li>
          <li>Spam, content injection requiring an already-compromised account, and self-XSS.</li>
        </ul>
      </>
    ),
  },
  {
    id: "rules",
    title: "Rules of Engagement",
    body: (
      <>
        <p>To remain within this Policy and its safe harbor, you agree to:</p>
        <ul>
          <li>
            <strong>Avoid privacy violations and data destruction.</strong> Do not access, modify,
            delete, or store data that is not your own. If you encounter personal or confidential
            data, stop, do not download it, and report immediately.
          </li>
          <li>
            <strong>Minimize impact.</strong> Use only the minimum interaction necessary to
            demonstrate a vulnerability. Do not pivot to other systems.
          </li>
          <li>
            <strong>Stop if you gain access.</strong> If you obtain access to non-public data or
            systems, cease testing immediately and report.
          </li>
          <li>
            <strong>Do not run disruptive tests.</strong> No DoS, no automated high-volume
            scanning that degrades service, no spam.
          </li>
          <li>
            <strong>Keep it confidential.</strong> Give us a reasonable opportunity to remediate
            before disclosing publicly, and coordinate any public disclosure with us.
          </li>
          <li>
            <strong>Use test accounts where possible</strong>, and do not interact with accounts
            you do not own or have explicit permission to use.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-to-report",
    title: "How to Report",
    body: (
      <>
        <p>
          Send your report to <a href="mailto:security@sec.co">security@sec.co</a>. To help us
          triage and resolve quickly, please include:
        </p>
        <ul>
          <li>A clear description of the vulnerability and its potential impact;</li>
          <li>The affected URL, endpoint, parameter, or component;</li>
          <li>
            Step-by-step reproduction instructions, including any required accounts, payloads, or
            request/response samples;
          </li>
          <li>A proof of concept (screenshots or a short screen recording are helpful);</li>
          <li>Your assessment of severity, and any suggested remediation;</li>
          <li>How you would like to be credited, if at all.</li>
        </ul>
        <p>
          If you wish to encrypt your report, request our PGP key at the same address and we will
          provide it before you send sensitive details.
        </p>
      </>
    ),
  },
  {
    id: "our-commitments",
    title: "What You Can Expect From Us",
    body: (
      <>
        <p>When you report in good faith under this Policy, we commit to:</p>
        <ul>
          <li>
            <strong>Acknowledge</strong> your report within three (3) business days;
          </li>
          <li>
            <strong>Triage and validate</strong> the issue and provide an initial assessment,
            typically within ten (10) business days;
          </li>
          <li>
            <strong>Keep you informed</strong> of remediation progress at reasonable intervals;
          </li>
          <li>
            <strong>Remediate</strong> validated vulnerabilities in a timeframe commensurate with
            their severity;
          </li>
          <li>
            <strong>Credit you</strong> for the discovery, with your permission, once the issue is
            resolved.
          </li>
        </ul>
        <p>
          We do not currently operate a paid bug-bounty program, and submissions are not eligible
          for monetary reward. We are, however, genuinely grateful — and recognition is offered to
          researchers who help us improve.
        </p>
      </>
    ),
  },
  {
    id: "recognition",
    title: "Recognition",
    body: (
      <p>
        With your consent, we are glad to acknowledge researchers who responsibly disclose valid,
        previously unknown vulnerabilities. Let us know in your report how you would like to be
        credited (name, handle, or anonymous).
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Policy from time to time. The version in effect at the time of your
        research governs your activity. Material changes will be reflected by an updated
        &ldquo;Last updated&rdquo; date above.
      </p>
    ),
  },
];

export default function ResponsibleDisclosurePage() {
  return (
    <LegalPage
      title="Responsible Disclosure"
      lastUpdated={LAST_UPDATED}
      summary="We're a security company — if you find a vulnerability in our own site or systems, we want to know, and we'll protect good-faith research that follows this policy. Here's what's in scope, how to report safely, and what you can expect from us in return."
      sections={sections}
      closing={
        <div className="legal-prose">
          <h3>Report a Vulnerability</h3>
          <p>
            Email <a href="mailto:security@sec.co">security@sec.co</a> with the details described
            above. For an active security incident affecting <em>your</em> organization (not a
            vulnerability in our site), use our{" "}
            <Link href="/emergency">24/7 incident hotline</Link> instead.
          </p>
        </div>
      }
    />
  );
}
