"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Native-scroll wrapper. We use the browser's own scrolling (rock-solid, never
 * locks or freezes) instead of a custom virtual scroll. It publishes the same
 * `data-scrolled` / `data-scrolledFar` flags (from window.scrollY) so the
 * scroll-reactive UI — the navbar and the gold prompt button — keeps working.
 */
export default function NativeMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // reset flags on route change (new page starts at the top)
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.scrolled = "false";
    root.dataset.scrolledFar = "false";
    window.dispatchEvent(new Event("scrollstate"));
  }, [pathname]);

  useEffect(() => {
    const root = document.documentElement;
    let last = -1;
    const onScroll = () => {
      const y = window.scrollY;
      const state = y > 200 ? 2 : y > 30 ? 1 : 0;
      if (state === last) return;
      last = state;
      root.dataset.scrolled = state >= 1 ? "true" : "false";
      root.dataset.scrolledFar = state >= 2 ? "true" : "false";
      window.dispatchEvent(new Event("scrollstate"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // non-home pages clear the fixed navbar; the home hero sits full-bleed under it
  return <main className={isHome ? "" : "pt-16"}>{children}</main>;
}
