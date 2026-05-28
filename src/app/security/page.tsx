import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How SEC.co secures its own organization, infrastructure, and the client data entrusted to us — covering governance, access control, encryption, monitoring, incident response, compliance, and sub-processor management.",
};

const LAST_UPDATED = "May 28, 2026";

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our Security Commitment",
    body: (
      <>
        <p>
          Security is not a department at SEC.co — it is the business. We hold ourselves to the
          standard we set for clients, and we treat the data entrusted to us as we would defend our
          own most sensitive systems. This page describes the safeguards that protect our
          organization, our infrastructure, and client data we handle in the course of delivering
          the Services.
        </p>
        <p>
          Our program is aligned to recognized frameworks including the NIST Cybersecurity
          Framework, NIST SP 800-53, and ISO/IEC 27001, and is designed to satisfy the
          requirements of SOC 2 and the regulated industries we serve.
        </p>
      </>
    ),
  },
  {
    id: "governance",
    title: "Governance & Personnel",
    body: (
      <>
        <ul>
          <li>
            <strong>Senior, vetted personnel.</strong> Our practitioners are experienced
            professionals. All personnel undergo background screening consistent with applicable
            law prior to engagement, and where client contracts or regulations require it, we
            staff engagements with U.S. citizens working from the United States.
          </li>
          <li>
            <strong>Security training.</strong> All personnel complete security and privacy
            awareness training at onboarding and at least annually, with additional role-specific
            training for engineers and incident responders.
          </li>
          <li>
            <strong>Confidentiality obligations.</strong> All personnel and contractors are bound
            by written confidentiality and acceptable-use agreements.
          </li>
          <li>
            <strong>Defined ownership.</strong> Security policies, risk management, and the
            incident-response program are owned by named leadership and reviewed on a recurring
            cadence.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "access-control",
    title: "Access Control",
    body: (
      <>
        <ul>
          <li>
            <strong>Least privilege.</strong> Access to systems and client data is granted on a
            need-to-know basis, scoped to the specific engagement, and revoked promptly upon role
            change or departure.
          </li>
          <li>
            <strong>Multi-factor authentication.</strong> MFA is enforced on all internal systems,
            administrative interfaces, and remote access. Hardware-backed or phishing-resistant
            authenticators are used for privileged access.
          </li>
          <li>
            <strong>Privileged access management.</strong> Administrative access is restricted,
            logged, and subject to just-in-time elevation and review where appropriate.
          </li>
          <li>
            <strong>Periodic access reviews.</strong> Access rights are reviewed on a recurring
            basis and after material organizational or engagement changes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-protection",
    title: "Data Protection & Encryption",
    body: (
      <>
        <ul>
          <li>
            <strong>Encryption in transit.</strong> Data transmitted to and from our systems and
            the Site is encrypted using current TLS standards.
          </li>
          <li>
            <strong>Encryption at rest.</strong> Data at rest is encrypted using strong,
            industry-standard algorithms, with key management following least-privilege and
            separation-of-duties principles.
          </li>
          <li>
            <strong>Data minimization.</strong> We collect and retain only the data necessary to
            deliver the Services, and we segregate client data by engagement.
          </li>
          <li>
            <strong>Secure disposal.</strong> When data is no longer required, it is securely
            deleted or rendered unrecoverable in accordance with our retention schedule and
            contractual obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "infrastructure",
    title: "Infrastructure & Network Security",
    body: (
      <>
        <ul>
          <li>
            <strong>Hardened, segmented infrastructure.</strong> Production systems are segmented
            from corporate systems, and network access is controlled by default-deny firewalling.
          </li>
          <li>
            <strong>Endpoint protection.</strong> All endpoints run managed endpoint detection and
            response (EDR) with centralized monitoring.
          </li>
          <li>
            <strong>Vulnerability management.</strong> We scan, prioritize, and remediate
            vulnerabilities across our systems on a continuous basis and subject our own
            environment to periodic independent testing.
          </li>
          <li>
            <strong>Secure development.</strong> Code changes follow review and change-management
            practices, with dependency and secrets scanning integrated into our pipelines.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "monitoring",
    title: "Monitoring & Detection",
    body: (
      <p>
        We operate continuous monitoring across our endpoints, identity providers, cloud
        infrastructure, and network, with centralized logging and alerting. Detections are
        triaged by senior analysts, and we conduct proactive threat hunting informed by current
        intelligence. Logs are retained in accordance with our policies and applicable
        contractual and regulatory requirements.
      </p>
    ),
  },
  {
    id: "incident-response",
    title: "Incident Response",
    body: (
      <p>
        We maintain a documented incident-response plan with defined roles, severity
        classification, escalation paths, and communication procedures, and we exercise it
        regularly. In the event of a security incident affecting client data, we will respond in
        accordance with our incident-response plan and the notification obligations set out in the
        applicable client agreement and Data Processing Addendum, and as required by law. Clients
        with an incident-response retainer receive the response service levels defined in their
        engagement.
      </p>
    ),
  },
  {
    id: "business-continuity",
    title: "Resilience & Business Continuity",
    body: (
      <p>
        We maintain backup, disaster-recovery, and business-continuity practices designed to
        preserve the availability and integrity of critical systems and data. Backups are
        encrypted, access-controlled, and periodically tested for restorability. Our 24/7 security
        operations are designed for continuity across personnel, shifts, and locations.
      </p>
    ),
  },
  {
    id: "compliance",
    title: "Compliance & Independent Assurance",
    body: (
      <>
        <p>
          Our program is designed and operated to meet the expectations of the frameworks and
          regulations relevant to our clients, including SOC 2, ISO/IEC 27001, HIPAA, PCI DSS,
          CMMC, and NIST 800-171. We undergo independent assessment as appropriate and can provide
          relevant attestations or summaries to clients and prospects under NDA.
        </p>
        <p>
          To request our current security documentation, attestations, or to complete a vendor
          security review, contact <a href="mailto:security@sec.co">security@sec.co</a>.
        </p>
      </>
    ),
  },
  {
    id: "subprocessors",
    title: "Sub-Processors & Vendor Management",
    body: (
      <p>
        We carefully select and assess the third-party providers that support our operations,
        binding them to contractual confidentiality and data-protection obligations and
        monitoring them on a risk-tiered basis. Where we process client personal data, our use of
        sub-processors is governed by the applicable Data Processing Addendum, including any
        notice and objection rights set out there.
      </p>
    ),
  },
  {
    id: "report",
    title: "Reporting a Security Concern",
    body: (
      <>
        <p>
          If you believe you have found a security vulnerability in our Site or systems, we want to
          hear from you. Please review and follow our{" "}
          <Link href="/responsible-disclosure">Responsible Disclosure Policy</Link>, which
          describes how to report safely and the protections we extend to good-faith researchers.
        </p>
        <div className="callout">
          To report a suspected vulnerability, email{" "}
          <a href="mailto:security@sec.co">security@sec.co</a>. For an active security incident
          involving your organization, use our{" "}
          <Link href="/emergency">24/7 incident hotline</Link>.
        </div>
      </>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPage
      title="Security"
      lastUpdated={LAST_UPDATED}
      summary="Security is the business at SEC.co. This page describes how we protect our own organization, our infrastructure, and the client data entrusted to us — and how to reach us with a security concern. We hold ourselves to the standard we set for the clients we defend."
      sections={sections}
      closing={
        <div className="legal-prose">
          <h3>Contact</h3>
          <p>
            Security questions, documentation requests, and vendor security reviews:{" "}
            <a href="mailto:security@sec.co">security@sec.co</a>. Suspected vulnerabilities: please
            follow our <Link href="/responsible-disclosure">Responsible Disclosure Policy</Link>.
          </p>
        </div>
      }
    />
  );
}
