"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Footer from "@/components/shared/Footer";

/**
 * Native browser scroll with CSS scroll-snap for the section-to-section feel
 * (snapping lives in globals.css: `scroll-snap-type` + `.snap-panel`). Native
 * scroll never locks or freezes, and CSS snap is the browser's own — rock-solid.
 *
 * This component just publishes the `data-scrolled` / `data-scrolledFar` flags
 * from window.scrollY so the navbar + gold prompt button keep reacting.
 */
export default function SnapScroll({ children }: { children: React.ReactNode }) {
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
      const s = y > 200 ? 2 : y > 30 ? 1 : 0;
      if (s === last) return;
      last = s;
      root.dataset.scrolled = s >= 1 ? "true" : "false";
      root.dataset.scrolledFar = s >= 2 ? "true" : "false";
      window.dispatchEvent(new Event("scrollstate"));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <main className={isHome ? "" : "pt-16"}>{children}</main>
      <Footer />
    </>
  );
}
