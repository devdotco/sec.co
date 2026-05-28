"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/wordmark";
import { Container } from "@/components/ui/container";
import { ArrowRight } from "@/components/ui/button";
import { MegaPanel } from "./mega-panel";
import { MobileMenu } from "./mobile-menu";
import { NAV, isMegaMenu, type NavItem, type DropdownMenu } from "@/lib/nav";

const CLOSE_DELAY = 180;

export function Header() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Sticky-header scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop mega menu on Esc + click outside
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

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Esc
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

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
        scrolled || openId || mobileOpen ? "header-scrolled" : "border-b border-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      <Container width="wide" className="flex h-[72px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-10">
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Link
            href="/contact?topic=assessment"
            className="hidden md:inline-flex h-10 items-center rounded-full border border-[var(--color-line-strong)] px-4 text-[13px] font-medium text-bone transition-colors hover:bg-ink-2 hover:border-bone-dim"
          >
            Get Assessment
          </Link>

          {/* Emergency Response — compact on mobile, full on sm+ */}
          <Link
            href="/emergency"
            className="group inline-flex h-10 items-center gap-1.5 rounded-full bg-[var(--color-ember)] px-3 sm:gap-2 sm:px-4 text-[12.5px] sm:text-[13px] font-semibold tracking-tight text-ink-0 transition-all duration-200 hover:bg-[var(--color-ember-bright)] hover:-translate-y-px shadow-[0_0_0_1px_rgba(255,107,53,0.55),0_10px_30px_-10px_rgba(255,107,53,0.55)]"
            aria-label="Emergency Response"
          >
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-ink-0 animate-pulse"
              style={{ boxShadow: "0 0 12px rgba(255,255,255,0.7)" }}
            />
            <span className="sm:hidden">Emergency</span>
            <span className="hidden sm:inline">Emergency Response</span>
            <ArrowRight className="hidden sm:block" />
          </Link>

          {/* Hamburger — only below lg, where the desktop nav is hidden */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-strong)] text-bone transition-colors hover:bg-ink-2 lg:hidden"
          >
            <Hamburger open={mobileOpen} />
          </button>
        </div>
      </Container>

      {/* Desktop mega panel surface */}
      {activeMenu && isMega && (
        <div
          className="absolute left-0 right-0 top-full hidden lg:block"
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
              style={{ background: "linear-gradient(to bottom, rgba(8,9,12,0.5), transparent)" }}
            />
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && <MobileMenu onNavigate={() => setMobileOpen(false)} />}
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden>
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
          open ? "top-1.5 rotate-45" : "top-0.5"
        }`}
      />
      <span
        className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-200 ${
          open ? "top-1.5 -rotate-45" : "top-[10px]"
        }`}
      />
    </span>
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

      {!isMegaMenu(item) && isOpen && <CompanyDropdown menu={item} />}
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
