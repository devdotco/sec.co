import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SEC.co collects, uses, discloses, and protects personal information across our website and services, including GDPR and CCPA/CPRA disclosures and your data rights.",
};

const LAST_UPDATED = "May 28, 2026";

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of This Policy",
    body: (
      <>
        <p>
          This Privacy Policy describes how SEC.co (&ldquo;SEC.co,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, discloses, and safeguards
          personal information in connection with our website at sec.co (the &ldquo;Site&rdquo;),
          our cybersecurity advisory, managed-security, incident-response, and testing services
          (collectively, the &ldquo;Services&rdquo;), and any related communications.
        </p>
        <p>
          This Policy applies to information about website visitors, prospective clients, client
          personnel who interact with us, event attendees, newsletter subscribers, and job
          applicants. It does <strong>not</strong> govern our processing of client data that we
          handle as a service provider or processor in the course of delivering the Services —
          that processing is governed by the applicable Master Services Agreement, Statement of
          Work, and Data Processing Addendum (&ldquo;DPA&rdquo;) executed with the client.
        </p>
        <div className="callout">
          When we act as a <strong>processor</strong> (for example, when monitoring a client&rsquo;s
          environment or conducting forensics on client systems), the client is the controller of
          that data and their privacy notices and our DPA govern. This Policy addresses data for
          which SEC.co is the <strong>controller</strong>.
        </div>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <h3>Information you provide to us</h3>
        <ul>
          <li>
            <strong>Contact and inquiry data</strong> — name, business email, company, role,
            team size, and the contents of any message you submit through our contact form,
            an assessment request, or email.
          </li>
          <li>
            <strong>Engagement data</strong> — information exchanged while scoping or delivering
            Services, including points of contact, environment descriptions, and project
            correspondence.
          </li>
          <li>
            <strong>Recruitment data</strong> — if you apply for a role, your CV/resume, work
            history, and any information you choose to provide.
          </li>
          <li>
            <strong>Marketing preferences</strong> — newsletter subscriptions and event
            registrations.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Device and usage data</strong> — IP address, browser type, operating system,
            referring URLs, pages viewed, and timestamps, collected through server logs and
            privacy-respecting analytics.
          </li>
          <li>
            <strong>Cookies and similar technologies</strong> — see{" "}
            <a href="#cookies">Cookies &amp; Tracking</a> below.
          </li>
        </ul>

        <h3>Information from third parties</h3>
        <ul>
          <li>
            <strong>Business contact databases and referrals</strong> — we may receive your
            business contact details from partners, mutual contacts, or publicly available
            professional sources.
          </li>
          <li>
            <strong>Service providers</strong> — analytics, email delivery, and security vendors
            that support our operations.
          </li>
        </ul>
        <p>
          We do not intentionally collect special categories of personal data (such as health,
          biometric, or government-identifier data) through the Site, and we ask that you do not
          submit such information through our forms.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Information",
    body: (
      <>
        <p>We use personal information to:</p>
        <ul>
          <li>Respond to inquiries, scope engagements, and provide the Services;</li>
          <li>Operate, maintain, secure, and improve the Site and Services;</li>
          <li>Communicate about engagements, security matters, and service updates;</li>
          <li>Send marketing communications where permitted, subject to your right to opt out;</li>
          <li>Evaluate job applications;</li>
          <li>Detect, investigate, and prevent fraud, abuse, and security incidents;</li>
          <li>
            Comply with legal obligations, enforce our agreements, and establish, exercise, or
            defend legal claims.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> sell personal information, and we do not use the contents of
          client engagement communications for advertising.
        </p>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing (EEA/UK)",
    body: (
      <>
        <p>
          Where the EU or UK General Data Protection Regulation applies, we process personal data
          on the following legal bases:
        </p>
        <ul>
          <li>
            <strong>Contract</strong> — to take steps at your request before entering into, and to
            perform, an engagement.
          </li>
          <li>
            <strong>Legitimate interests</strong> — to operate and secure our business, understand
            how the Site is used, and pursue business development, balanced against your rights.
          </li>
          <li>
            <strong>Consent</strong> — for non-essential cookies and certain marketing, which you
            may withdraw at any time.
          </li>
          <li>
            <strong>Legal obligation</strong> — to comply with applicable law, including tax,
            accounting, and security-incident obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-share",
    title: "How We Disclose Information",
    body: (
      <>
        <p>We disclose personal information only as described here:</p>
        <ul>
          <li>
            <strong>Service providers / sub-processors</strong> — vendors that host our
            infrastructure, deliver email, provide analytics, and support security operations,
            bound by contractual confidentiality and data-protection obligations.
          </li>
          <li>
            <strong>Professional advisors</strong> — lawyers, auditors, and insurers, as needed.
          </li>
          <li>
            <strong>Legal and safety</strong> — where required by law, legal process, or to
            protect the rights, property, or safety of SEC.co, our clients, or others.
          </li>
          <li>
            <strong>Business transfers</strong> — in connection with a merger, acquisition,
            financing, or sale of assets, subject to this Policy.
          </li>
        </ul>
        <p>We do not sell or rent personal information to third parties.</p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <>
        <p>
          We retain personal information for as long as necessary to fulfill the purposes described
          in this Policy, including to satisfy legal, accounting, security, or reporting
          requirements, and to establish or defend legal claims. Retention periods vary by data
          type and context — for example, inquiry data is generally retained for the duration of
          our business relationship plus a reasonable period thereafter, and recruitment data is
          retained only as long as needed to evaluate your application unless you consent to a
          longer period. When information is no longer required, we delete or de-identify it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How We Protect Information",
    body: (
      <>
        <p>
          Security is our profession. We maintain administrative, technical, and physical
          safeguards designed to protect personal information against unauthorized access, loss,
          misuse, and alteration, including encryption in transit and at rest, least-privilege
          access controls, multi-factor authentication, continuous monitoring, and a documented
          incident-response program. For details, see our{" "}
          <Link href="/security">Security</Link> page. No method of transmission or storage is
          completely secure, and we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "international",
    title: "International Data Transfers",
    body: (
      <>
        <p>
          SEC.co operates from the United States, and our infrastructure and personnel are
          U.S.-based. If you access the Site or engage with us from outside the United States, your
          information may be transferred to, stored in, and processed in the United States and
          other jurisdictions that may have different data-protection laws than your own. Where
          required, we rely on appropriate transfer mechanisms, such as the European Commission&rsquo;s
          Standard Contractual Clauses, to protect personal data transferred internationally.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    body: (
      <>
        <p>
          Depending on where you live, you may have the right to access, correct, delete, or
          port your personal information; to object to or restrict certain processing; and to
          withdraw consent. These rights are subject to legal limitations and exceptions.
        </p>
        <h3>EEA/UK residents</h3>
        <p>
          You may exercise the GDPR rights described above and have the right to lodge a complaint
          with your local supervisory authority.
        </p>
        <h3>California residents (CCPA/CPRA)</h3>
        <p>
          You may request disclosure of the categories and specific pieces of personal
          information we have collected, request deletion, request correction, and opt out of any
          &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. We do not sell or
          share personal information as those terms are defined under the CPRA. We will not
          discriminate against you for exercising your rights.
        </p>
        <p>
          To exercise any right, contact us at{" "}
          <a href="mailto:privacy@sec.co">privacy@sec.co</a>. We will verify your request and
          respond within the timeframes required by applicable law. You may use an authorized
          agent where permitted.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & Tracking",
    body: (
      <>
        <p>
          We use a minimal set of cookies and similar technologies. Strictly necessary cookies are
          required for the Site to function. With your consent where required, we may use analytics
          cookies to understand aggregate usage and improve the Site. You can control cookies
          through your browser settings; disabling some cookies may affect Site functionality. We
          honor Global Privacy Control (GPC) signals where applicable.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children&rsquo;s Privacy",
    body: (
      <p>
        The Site and Services are intended for businesses and are not directed to children under
        16. We do not knowingly collect personal information from children. If you believe a child
        has provided us personal information, contact us and we will delete it.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Links",
    body: (
      <p>
        The Site may contain links to third-party websites and services that we do not control.
        This Policy does not apply to those properties, and we are not responsible for their
        privacy practices. We encourage you to review the privacy notices of any third party you
        visit.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <p>
        We may update this Policy from time to time. When we make material changes, we will revise
        the &ldquo;Last updated&rdquo; date above and, where appropriate, provide additional
        notice. Your continued use of the Site after an update constitutes acceptance of the
        revised Policy.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      summary="This policy explains what personal information SEC.co collects, why we collect it, how we use and protect it, and the rights you have over your information. We collect as little as we need, never sell personal data, and protect what we hold the way we protect our clients."
      sections={sections}
      closing={
        <div className="legal-prose">
          <h3>Contact Us</h3>
          <p>
            For privacy questions, requests, or complaints, contact our privacy team at{" "}
            <a href="mailto:privacy@sec.co">privacy@sec.co</a>, or write to us at SEC.co, Privacy
            Office. We will respond as promptly as practicable and within the timeframes required
            by applicable law.
          </p>
        </div>
      }
    />
  );
}
