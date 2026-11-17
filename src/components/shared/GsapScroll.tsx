"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Footer from "@/components/shared/Footer";

/**
 * Smooth scroll + section snapping, built on GSAP's own ScrollSmoother and
 * ScrollTrigger (the same library the reference site uses) — battle-tested, so
 * it doesn't lock/freeze like a hand-rolled virtual scroll.
 *
 * ScrollSmoother lerps the content transform (the smooth, "virtual" feel);
 * ScrollTrigger's snap settles the scroll onto each full-screen `[data-panel]`.
 * Fixed chrome (Navbar, BottomPrompt) lives OUTSIDE #smooth-wrapper so it stays
 * pinned correctly.
 */
export default function GsapScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: reduce ? 0 : 1,
      effects: false,
    });
    smootherRef.current = smoother;

    // publish scroll state for the navbar + gold prompt button (on state change only)
    let lastState = -1;
    const publish = () => {
      const y = smoother.scrollTop();
      const s = y > 200 ? 2 : y > 30 ? 1 : 0;
      if (s === lastState) return;
      lastState = s;
      root.dataset.scrolled = s >= 1 ? "true" : "false";
      root.dataset.scrolledFar = s >= 2 ? "true" : "false";
      window.dispatchEvent(new Event("scrollstate"));
    };
    const pubST = ScrollTrigger.create({ onUpdate: publish });
    publish();

    return () => {
      pubST.kill();
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  // on route change: jump to top and recompute triggers for the new page
  useEffect(() => {
    smootherRef.current?.scrollTo(0, false);
    ScrollTrigger.refresh();
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main className={isHome ? "" : "pt-16"}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
