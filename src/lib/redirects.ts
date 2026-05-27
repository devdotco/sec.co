/**
 * Legacy URL → new IA redirect map for sec.co.
 *
 * Source of truth: the flat URL structure scanned from the live sec.co
 * sitemap (May 2026). Every legacy slug must land somewhere in the new IA —
 * either a 1:1 equivalent, a hub page that covers the topic, or the closest
 * conceptual sibling.
 *
 * Append to this list any time a new page is built that subsumes a legacy URL.
 *
 * Format matches Next.js `redirects()` API:
 *   { source, destination, permanent }
 * `permanent: true` emits 308; appropriate for IA migrations where the
 * destination is canonical.
 */

export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  /** Internal notes — not used by Next, just documentation. */
  note?: string;
};

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  // ─── Services (flat → /services/*) ──────────────────────────────────────
  { source: "/secops", destination: "/services/soc-as-a-service", permanent: true, note: "SecOps consulting → SOCaaS" },
  { source: "/incident-response", destination: "/services#ir", permanent: true, note: "Direct to anchor — avoids chained redirect" },
  { source: "/managed-security", destination: "/services#managed", permanent: true, note: "Direct to anchor — avoids chained redirect" },
  { source: "/audit", destination: "/services/cyber-risk-assessment", permanent: true, note: "Closest semantic equivalent" },
  { source: "/training", destination: "/services/tabletop-exercises", permanent: true, note: "Closest existing offering until awareness-training page exists" },
  { source: "/support", destination: "/services/managed-security", permanent: true },

  // ─── Security domains (flat → /services/* or /solutions/*) ──────────────
  { source: "/cloud-security", destination: "/solutions/cloud-security", permanent: true },
  { source: "/edr", destination: "/services/managed-edr-xdr", permanent: true },
  { source: "/siem", destination: "/services/managed-siem", permanent: true },
  { source: "/zero-trust-architecture", destination: "/solutions/zero-trust", permanent: true },
  { source: "/iam", destination: "/solutions/cloud-security", permanent: true, note: "No exact IAM page yet — closest match" },
  { source: "/vulnerability-management", destination: "/solutions/vulnerability-management", permanent: true },
  { source: "/security-automation", destination: "/solutions/security-automation", permanent: true },
  { source: "/threat-intelligence", destination: "/services/threat-hunting", permanent: true, note: "Threat intel folded into threat-hunting service" },

  // ─── Vendor / technology partner pages → /tools-we-use ──────────────────
  { source: "/microsoft-sentinel", destination: "/tools-we-use#microsoft-sentinel", permanent: true },
  { source: "/aws", destination: "/tools-we-use#aws", permanent: true },
  { source: "/azure-defender", destination: "/tools-we-use#azure-defender", permanent: true },
  { source: "/splunk", destination: "/tools-we-use#splunk", permanent: true },
  { source: "/palo-alto-networks", destination: "/tools-we-use#palo-alto-networks", permanent: true },
  { source: "/crowdstrike", destination: "/tools-we-use#crowdstrike", permanent: true },
  { source: "/technology", destination: "/tools-we-use", permanent: true },

  // ─── Industries (flat → /industries/*) ──────────────────────────────────
  { source: "/healthcare", destination: "/industries/healthcare", permanent: true },
  { source: "/government", destination: "/industries/government-contractors", permanent: true, note: "Closest fit; was generic government" },
  { source: "/ecommerce", destination: "/industries/ecommerce", permanent: true },
  { source: "/financial-services", destination: "/industries/financial-services", permanent: true },

  // ─── Services category hubs → anchored sections of /services ──────────
  { source: "/services/advisory", destination: "/services#advisory", permanent: false, note: "Mega-menu 'View all Advisory' — redirects to anchor on hub" },
  { source: "/services/security-testing", destination: "/services#testing", permanent: false },
  { source: "/services/managed-security", destination: "/services#managed", permanent: false },
  { source: "/services/incident-response", destination: "/services#ir", permanent: false },

  // ─── Compliance ─────────────────────────────────────────────────────────
  // /compliance is preserved 1:1 — no redirect needed (Next would reject the identity loop)

  // ─── Company (consolidated under /about) ────────────────────────────────
  { source: "/mission", destination: "/about#mission", permanent: true },
  { source: "/team", destination: "/about#team", permanent: true },
  { source: "/locations", destination: "/about#locations", permanent: true },

  // ─── Resources & content ────────────────────────────────────────────────
  { source: "/case-studies", destination: "/resources/case-studies", permanent: true, note: "TODO: build /resources/case-studies hub" },
  { source: "/whitepapers", destination: "/resources/guides/cybersecurity", permanent: true },
  { source: "/webinars", destination: "/resources/webinars", permanent: true, note: "TODO: build /resources/webinars" },
  { source: "/tools", destination: "/tools/cyber-risk-calculator", permanent: true },

  // ─── Engagement ─────────────────────────────────────────────────────────
  { source: "/schedule-a-consultation", destination: "/contact?topic=assessment", permanent: true },

  // ─── Blog: 1:1 pass-through (no slug change), explicit so we don't break
  //     the 120 existing articles. The /blog hub and individual posts
  //     already keep their slugs; this is a placeholder for when we
  //     consolidate any post URLs.
  // { source: "/blog/:slug*", destination: "/blog/:slug*", permanent: false },
];

/**
 * Live-site URL inventory (scanned 2026-05-27 from sec.co sitemap).
 * Useful as documentation — every entry here should either match a new
 * page or appear as a `source` in LEGACY_REDIRECTS above.
 *
 * Status flags:
 *   ✅ = redirect mapped above
 *   📄 = direct port (same URL on new site, e.g. /about, /contact, /careers, /partners, /blog)
 *   📝 = blog post (1:1 preserved, 120 of these)
 */
export const LIVE_SITE_INVENTORY = `
ROOT
  /                                  📄 (new homepage)

SERVICES (flat)
  /secops                            ✅
  /incident-response                 ✅
  /managed-security                  ✅
  /audit                             ✅
  /compliance                        ✅
  /training                          ✅
  /support                           ✅

SECURITY DOMAINS
  /cloud-security                    ✅
  /edr                               ✅
  /siem                              ✅
  /zero-trust-architecture           ✅
  /iam                               ✅
  /vulnerability-management          ✅
  /security-automation               ✅
  /threat-intelligence               ✅

TECHNOLOGY / VENDORS
  /microsoft-sentinel                ✅ (→ /tools-we-use#…)
  /aws                               ✅
  /azure-defender                    ✅
  /splunk                            ✅
  /palo-alto-networks                ✅
  /crowdstrike                       ✅
  /technology                        ✅

INDUSTRIES
  /healthcare                        ✅
  /government                        ✅
  /ecommerce                         ✅
  /financial-services                ✅

COMPANY
  /about                             📄
  /mission                           ✅ (→ /about#mission)
  /team                              ✅ (→ /about#team)
  /careers                           📄
  /locations                         ✅ (→ /about#locations)
  /partners                          📄

RESOURCES
  /case-studies                      ✅
  /whitepapers                       ✅
  /webinars                          ✅
  /tools                             ✅

ENGAGEMENT
  /contact                           📄
  /schedule-a-consultation           ✅

BLOG (120 posts)
  /blog                              📄
  /blog/:slug                        📝 (1:1 preserved)
`;
