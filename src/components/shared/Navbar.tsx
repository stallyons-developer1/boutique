"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { useScrolled } from "@/lib/useScrolled";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/products", label: "New In" },
  { href: "#", label: "Collections" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled();

  // compact = scrolled OR not on the home hero
  const compact = scrolled || !isHome;

  return (
    <>
      <header className="fixed bg-transparent text-white inset-x-0 top-0 z-50 transition-all duration-300">
        <div className="bg-[linear-gradient(#00000099,_#ffffff00)] items-start relative mx-auto flex max-w-[1600px] items-center justify-between p-6 transition-all duration-300 sm:p-12">
          {/* left — menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex gap-2.5 text-sm"
            aria-label="Open menu"
          >
            <HamburgerIcon />
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* center — logo (scales a little on scroll) */}
          <Link href="/" className="flex flex-col ">
            <Logo
              className={cn(
                "transition-all duration-500",
                compact ? "h-20 w-[500px]" : "h-22 w-[500px]",
              )}
            />
          </Link>

          {/* right — icons */}
          <div className="flex items-start gap-4 sm:gap-5">
            <button aria-label="Recently viewed" className="hidden sm:block">
              <HistoryIcon />
            </button>
            <button aria-label="Wishlist" className="relative">
              <HeartIcon />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </button>
            <Link href="/cart" aria-label="Cart">
              <BagIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* spacer so inner-page content clears the fixed header */}
      {!isHome && <div aria-hidden className="h-16" />}

      {/* full-screen menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background text-foreground transition-opacity duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <Logo className="h-6 w-[76px]" />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-10 flex flex-col px-6 sm:px-10">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-border py-5 font-serif text-3xl transition-colors hover:text-accent sm:text-4xl"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ---------- icons (inline so no icon library needed) ---------- */

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="6" y1="18" x2="18" y2="6" />
    </svg>
  );
}

function HistoryIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 4v4h4" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 20s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 5c-2.5 4.5-9.5 9-9.5 9Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 7h12l-1 13H7L6 7Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
