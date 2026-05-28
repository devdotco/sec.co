"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV, isMegaMenu, type NavItem } from "@/lib/nav";

/**
 * Full-screen mobile navigation. Each top-level item is an accordion:
 * - Mega menus expand to show their columns + links
 * - The Company dropdown expands to show its links
 * Tapping any link calls onNavigate() so the parent can close the menu.
 */
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto overscroll-contain bg-ink-0/98 backdrop-blur-xl lg:hidden">
      <div className="bg-grid absolute inset-0 -z-10 opacity-30" aria-hidden />

      <nav aria-label="Mobile" className="px-5 py-4">
        <ul className="divide-y divide-[var(--color-line)]">
          {NAV.map((item) => (
            <li key={item.id}>
              <AccordionItem
                item={item}
                isOpen={expanded === item.id}
                onToggle={() =>
                  setExpanded((cur) => (cur === item.id ? null : item.id))
                }
                onNavigate={onNavigate}
              />
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-6 flex flex-col gap-3 pb-10">
          <Link
            href="/contact?topic=assessment"
            onClick={onNavigate}
            className="inline-flex h-12 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-[15px] font-medium text-bone transition-colors hover:bg-ink-2"
          >
            Get Assessment
          </Link>
          <Link
            href="/emergency"
            onClick={onNavigate}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-ember)] text-[15px] font-semibold tracking-tight text-ink-0 transition-colors hover:bg-[var(--color-ember-bright)]"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ink-0 animate-pulse" />
            Emergency Response
          </Link>
          <a
            href="tel:+12062102954"
            onClick={onNavigate}
            className="mt-1 text-center text-[13px] text-mute"
          >
            24/7 hotline · +1 (206) 210-2954
          </a>
        </div>
      </nav>
    </div>
  );
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  onNavigate,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Tapping the label navigates to the hub; tapping the chevron expands */}
        <Link
          href={item.href}
          onClick={onNavigate}
          className="flex-1 py-4 text-[17px] font-medium tracking-tight text-bone"
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
          aria-expanded={isOpen}
          className="flex h-11 w-11 items-center justify-center text-bone-dim"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="pb-5">
          {isMegaMenu(item) ? (
            <div className="space-y-5">
              {item.columns.map((col) => (
                <div key={col.title}>
                  <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-mute">
                    {col.title}
                  </div>
                  <ul className="space-y-px">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className={`block py-2 text-[15px] ${
                            link.emphasis === "urgent"
                              ? "text-[var(--color-ember)]"
                              : "text-bone-dim"
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {col.viewAll && (
                    <Link
                      href={col.viewAll.href}
                      onClick={onNavigate}
                      className="mt-1 inline-block py-1 text-[13px] font-medium text-bone"
                    >
                      {col.viewAll.label} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-px">
              {item.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="block py-2 text-[15px] text-bone-dim"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
