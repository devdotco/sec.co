import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your use of the SEC.co website and services, including acceptable use, intellectual property, disclaimers, limitation of liability, and dispute resolution.",
};

const LAST_UPDATED = "May 28, 2026";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of These Terms",
    body: (
      <>
        <p>
          These Terms of Service (the &ldquo;Terms&rdquo;) govern your access to and use of the
          website at sec.co and any content, functionality, and informational materials offered on
          or through it (the &ldquo;Site&rdquo;), operated by SEC.co (&ldquo;SEC.co,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing or using the Site,
          you agree to be bound by these Terms and our{" "}
          <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the Site.
        </p>
        <div className="callout">
          These Terms govern the <strong>Site</strong>. Paid cybersecurity engagements are governed
          by a separate written agreement — a Master Services Agreement (&ldquo;MSA&rdquo;) and one
          or more Statements of Work (&ldquo;SOW&rdquo;). Where those documents conflict with these
          Terms with respect to the Services, the MSA and SOW control.
        </div>
      </>
    ),
  },
  {
    id: "services",
    title: "The Services; No Engagement Created",
    body: (
      <>
        <p>
          The Site provides general information about SEC.co&rsquo;s cybersecurity advisory,
          managed-security, incident-response, compliance, and testing services. Information on the
          Site is provided for general purposes only and does not constitute professional,
          security, legal, or compliance advice, and it does not create a client relationship.
        </p>
        <p>
          No engagement exists, and no Services will be performed, until SEC.co and the client
          have executed a written MSA and SOW defining scope, deliverables, fees, authorization,
          and rules of engagement. Nothing on the Site is an offer capable of acceptance to perform
          Services.
        </p>
      </>
    ),
  },
  {
    id: "authorization",
    title: "Authorization for Security Testing",
    body: (
      <>
        <p>
          SEC.co performs offensive security testing (including penetration testing and red-team
          assessments) <strong>only</strong> under written authorization specifying the in-scope
          targets, testing windows, and rules of engagement. You represent and warrant that, for
          any system you ask us to test, you own the system or are fully authorized to grant access
          and authorize testing, and that such authorization does not violate any third party&rsquo;s
          rights or any law. You agree to obtain any consents required from hosting providers or
          other third parties. Unauthorized access to computer systems is unlawful, and SEC.co does
          not perform testing absent proper authorization.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use of the Site",
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site in violation of any applicable law or regulation;</li>
          <li>
            Attempt to gain unauthorized access to the Site, related systems, or networks, except
            as expressly permitted by our{" "}
            <Link href="/responsible-disclosure">Responsible Disclosure Policy</Link>;
          </li>
          <li>Interfere with or disrupt the integrity or performance of the Site;</li>
          <li>
            Introduce malware or any code of a destructive or malicious nature, or conduct denial-
            of-service activity;
          </li>
          <li>Scrape, harvest, or collect information about other users;</li>
          <li>Reverse engineer or copy any portion of the Site except as permitted by law;</li>
          <li>
            Use the Site to develop a competing product or to benchmark for a competitor without
            our written consent.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <>
        <p>
          The Site and all content, design, text, graphics, logos, the SEC.co name and shield
          mark, and the selection and arrangement thereof are owned by SEC.co or its licensors and
          are protected by intellectual-property laws. We grant you a limited, revocable,
          non-exclusive, non-transferable license to access and use the Site for your internal,
          non-commercial informational purposes. All rights not expressly granted are reserved.
        </p>
        <p>
          Downloadable resources (such as checklists and templates) are provided for your internal
          use; you may not resell or redistribute them as your own work product.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <p>
        Information you submit through the Site&rsquo;s contact forms is handled in accordance with
        our <Link href="/privacy">Privacy Policy</Link>. Please do not transmit confidential,
        regulated, or sensitive technical details (such as live credentials, vulnerability
        specifics, or system architecture) through the Site. Confidential information exchanged in
        the course of an engagement is governed by the confidentiality and non-disclosure terms of
        the applicable MSA. If you believe you have discovered a security issue, follow our{" "}
        <Link href="/responsible-disclosure">Responsible Disclosure Policy</Link> rather than
        posting details publicly.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Content and Links",
    body: (
      <p>
        The Site may reference or link to third-party websites, products, and services, and may
        name third-party technologies we work with. Such references are for convenience and do not
        constitute endorsement. We are not responsible for third-party content, products, or
        practices, and your dealings with third parties are solely between you and them.
      </p>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <>
        <p>
          THE SITE AND ALL CONTENT ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;
          WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING WITHOUT
          LIMITATION IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
          TITLE, AND NON-INFRINGEMENT. SEC.co DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED,
          ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT INFORMATION ON THE SITE IS ACCURATE,
          COMPLETE, OR CURRENT.
        </p>
        <p>
          Cybersecurity is inherently probabilistic. Nothing on the Site, and no engagement, is a
          guarantee that systems will be free from vulnerability, compromise, or breach. Any
          assessment reflects conditions at a point in time within a defined scope. Security
          outcomes depend on factors outside our control, including your own actions, third-party
          systems, and the evolving threat landscape.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL SEC.co OR ITS OFFICERS,
          DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, DATA,
          GOODWILL, OR BUSINESS INTERRUPTION, ARISING OUT OF OR RELATED TO YOUR USE OF — OR
          INABILITY TO USE — THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER
          LEGAL THEORY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, SEC.co&rsquo;S TOTAL AGGREGATE LIABILITY ARISING
          OUT OF OR RELATING TO YOUR USE OF THE SITE WILL NOT EXCEED ONE HUNDRED U.S. DOLLARS
          (US $100). Liability arising from paid Services is addressed exclusively in the
          applicable MSA. Some jurisdictions do not allow certain limitations, so some of the above
          may not apply to you.
        </p>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <p>
        You agree to indemnify, defend, and hold harmless SEC.co and its officers, directors,
        employees, and agents from and against any claims, liabilities, damages, losses, and
        expenses (including reasonable legal fees) arising out of or related to your misuse of the
        Site, your violation of these Terms, or your violation of any law or the rights of a third
        party.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspension and Termination",
    body: (
      <p>
        We may suspend or terminate your access to the Site at any time, with or without notice,
        for any reason, including if we believe you have violated these Terms. Provisions that by
        their nature should survive termination — including intellectual property, disclaimers,
        limitation of liability, indemnification, and governing law — will survive.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the State of Washington, United States, without
          regard to its conflict-of-laws principles. Subject to the arbitration provision below,
          the state and federal courts located in King County, Washington will have exclusive
          jurisdiction over any dispute not subject to arbitration, and you consent to personal
          jurisdiction there.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms or the Site that cannot be resolved
          informally will be finally resolved by binding arbitration administered under the rules
          of a recognized arbitration body, on an individual basis. <strong>You and SEC.co waive
          any right to a jury trial and to participate in a class action.</strong> Either party may
          seek injunctive relief in court for actual or threatened infringement or misuse of
          intellectual property or confidential information.
        </p>
      </>
    ),
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    body: (
      <p>
        SEC.co will not be liable for any failure or delay in performance resulting from causes
        beyond its reasonable control, including acts of God, natural disasters, war, terrorism,
        civil unrest, labor disputes, governmental action, utility or internet failures, or
        large-scale cyberattacks affecting infrastructure not under our control.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <>
        <p>
          These Terms, together with the Privacy Policy and any agreement governing the Services,
          constitute the entire agreement between you and SEC.co regarding the Site. If any
          provision is held unenforceable, the remaining provisions remain in effect. Our failure
          to enforce a provision is not a waiver. You may not assign these Terms without our
          consent; we may assign them in connection with a merger, acquisition, or sale of assets.
        </p>
        <p>
          We may revise these Terms at any time by posting an updated version with a new
          &ldquo;Last updated&rdquo; date. Your continued use of the Site after changes take effect
          constitutes acceptance of the revised Terms.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      summary="These terms govern your use of the SEC.co website. They cover acceptable use, intellectual property, the important distinction between this site and a paid engagement, our disclaimers, and how disputes are handled. Paid security engagements are governed separately by a signed agreement."
      sections={sections}
      closing={
        <div className="legal-prose">
          <h3>Questions</h3>
          <p>
            Questions about these Terms can be sent to{" "}
            <a href="mailto:legal@sec.co">legal@sec.co</a>.
          </p>
        </div>
      }
    />
  );
}
