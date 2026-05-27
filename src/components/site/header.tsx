"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/button";
import { MegaPanel } from "./mega-panel";
import { NAV, isMegaMenu, type NavItem, type DropdownMenu } from "@/lib/nav";

const CLOSE_DELAY = 180;

export function Header() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Sticky-header scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on Esc + click outside
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    const onClick = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenId(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openId]);

  const openMenu = useCallback((id: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenId(id);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  }, []);

  const activeMenu = NAV.find((n) => n.id === openId) ?? null;
  const isMega = activeMenu && isMegaMenu(activeMenu);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-[background,backdrop-filter,border-color] duration-200 ${
        scrolled || openId ? "header-scrolled" : "border-b border-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      <Container width="wide" className="flex h-[72px] items-center justify-between">
        <div className="flex items-center gap-10">
          <Wordmark size="md" />
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <NavButton
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onOpen={() => openMenu(item.id)}
                  onScheduleClose={scheduleClose}
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/contact?topic=assessment"
            className="hidden md:inline-flex h-10 items-center rounded-full border border-[var(--color-line-strong)] px-4 text-[13px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
          >
            Get Assessment
          </Link>
          <Link
            href="/emergency"
            className="group inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-ember)] px-4 text-[13px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px shadow-[0_0_0_1px_rgba(255,107,53,0.55),0_10px_30px_-10px_rgba(255,107,53,0.55)]"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-ink-0 animate-pulse"
              style={{ boxShadow: "0 0 0 3px rgba(8,9,12,0.0), 0 0 12px rgba(255,255,255,0.7)" }}
            />
            Emergency Response
            <ArrowRight />
          </Link>
        </div>
      </Container>

      {/* Mega panel surface */}
      {activeMenu && isMega && (
        <div
          className="absolute left-0 right-0 top-full"
          onMouseEnter={() => openMenu(activeMenu.id)}
          onMouseLeave={scheduleClose}
        >
          <div className="border-y border-[var(--color-line)] bg-[rgba(15,16,21,0.92)] backdrop-blur-xl">
            <Container width="wide">
              <MegaPanel menu={activeMenu} />
            </Container>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -bottom-12 h-12"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(8,9,12,0.5), transparent)",
              }}
            />
          </div>
        </div>
      )}
    </header>
  );
}

function NavButton({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
}: {
  item: NavItem;
  isOpen: boolean;
  onOpen: () => void;
  onScheduleClose: () => void;
}) {
  return (
    <li
      className="relative"
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <Link
        href={item.href}
        className={`relative inline-flex h-10 items-center rounded-full px-3 text-[13.5px] font-medium tracking-tight transition-colors duration-150 ${
          isOpen ? "text-bone" : "text-bone-dim hover:text-bone"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {item.label}
        {isOpen && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-3 -bottom-px h-px brand-gradient"
          />
        )}
      </Link>

      {/* Company gets a small anchored dropdown instead of a mega panel */}
      {!isMegaMenu(item) && isOpen && (
        <CompanyDropdown menu={item} />
      )}
    </li>
  );
}

function CompanyDropdown({ menu }: { menu: DropdownMenu }) {
  return (
    <div className="menu-panel absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 min-w-[200px]">
      <div className="rounded-2xl border border-[var(--color-line)] bg-[rgba(15,16,21,0.96)] p-1.5 backdrop-blur-xl shadow-2xl shadow-black/40">
        <ul>
          {menu.links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-2 text-[13.5px] text-bone-dim transition-colors hover:bg-ink-2 hover:text-bone"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
