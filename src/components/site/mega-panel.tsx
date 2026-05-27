import Link from "next/link";
import type { MegaMenu, NavLink } from "@/lib/nav";

function MenuLink({ link, urgentTone = false }: { link: NavLink; urgentTone?: boolean }) {
  const isUrgent = link.emphasis === "urgent" || urgentTone;
  return (
    <Link
      href={link.href}
      className={`group/link block py-1.5 text-[14px] leading-snug transition-colors duration-150 ${
        isUrgent
          ? "text-[var(--color-ember)] hover:text-[var(--color-ember-bright)]"
          : "text-bone-dim hover:text-bone"
      }`}
    >
      <span className="relative">
        {link.label}
        {isUrgent && (
          <span
            aria-hidden
            className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-ember)] align-middle animate-pulse"
          />
        )}
      </span>
    </Link>
  );
}

export function MegaPanel({ menu }: { menu: MegaMenu }) {
  const isUrgentFeatured = menu.featured.tone === "urgent";
  return (
    <div
      className="menu-panel grid gap-10 px-2 py-10 md:grid-cols-[1fr_300px] md:gap-14"
      role="region"
      aria-label={`${menu.label} menu`}
    >
      {/* Columns */}
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 md:grid-cols-4">
        {menu.columns.map((col) => (
          <div key={col.title} className="min-w-0">
            <div className="mb-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
              {col.title}
            </div>
            <ul className="space-y-px">
              {col.links.map((link) => (
                <li key={link.href}>
                  <MenuLink link={link} />
                </li>
              ))}
            </ul>
            {col.viewAll && (
              <Link
                href={col.viewAll.href}
                className="group mt-4 inline-flex items-center gap-1 text-[12px] font-medium tracking-tight text-bone transition-colors hover:text-white"
              >
                {col.viewAll.label}
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Featured side panel */}
      <aside
        className={`relative overflow-hidden rounded-2xl p-6 ${
          isUrgentFeatured ? "" : "brand-gradient-border bg-ink-1"
        }`}
        style={
          isUrgentFeatured
            ? {
                background:
                  "linear-gradient(155deg, rgba(255,107,53,0.10), rgba(255,107,53,0.02) 60%), var(--color-ink-1)",
                boxShadow: "inset 0 0 0 1px rgba(255,107,53,0.35)",
              }
            : undefined
        }
      >
        {!isUrgentFeatured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(80% 60% at 0% 0%, rgba(25,191,255,0.10), transparent 60%), radial-gradient(60% 50% at 100% 100%, rgba(255,61,189,0.10), transparent 60%)",
            }}
          />
        )}
        <div className="relative">
          {menu.featured.eyebrow && (
            <div
              className={`mb-3 text-[10.5px] font-medium uppercase tracking-[0.18em] ${
                isUrgentFeatured ? "text-[var(--color-ember-bright)]" : "text-bone-dim"
              }`}
            >
              {menu.featured.eyebrow}
            </div>
          )}
          <h3 className="font-display text-[22px] leading-[1.15] text-bone">
            {menu.featured.title}
          </h3>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-bone-dim">
            {menu.featured.body}
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <Link
              href={menu.featured.primary.href}
              className={`group inline-flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-all duration-200 ${
                isUrgentFeatured
                  ? "bg-[var(--color-ember)] text-ink-0 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px"
                  : "bg-bone text-ink-0 hover:bg-white hover:-translate-y-px"
              }`}
            >
              {menu.featured.primary.label}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
            {menu.featured.secondary && (
              <Link
                href={menu.featured.secondary.href}
                className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--color-line-strong)] px-4 text-[13px] font-medium text-bone transition-colors hover:bg-ink-2"
              >
                {menu.featured.secondary.label}
              </Link>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
