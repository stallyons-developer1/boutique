"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Virtual scroll with spring-snapping — modelled on the real Brunello Cucinelli
 * site (measured frame-by-frame). html/body stay `overflow:hidden`; the content
 * is moved with a transform.
 *
 * Feel: wheel/touch input is *damped* (a small scroll barely moves, like the
 * live site's ~0.18 resistance) and springs back fast when you stop — no
 * debounce, no dead delay. Only a strong/sustained gesture past COMMIT advances
 * to the next `[data-snap]` section, which then glides in smoothly.
 *
 * Progressive enhancement: the `.smooth` class is only added once this mounts,
 * so with JS disabled the page still scrolls natively.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const section = useRef(0); // committed section index
  const drag = useRef(0); // live damped offset from the committed section (px)
  const pos = useRef(0); // lerped display position (px)
  const max = useRef(0);
  const pathname = usePathname();

  // reset on route change
  useEffect(() => {
    section.current = 0;
    drag.current = 0;
    pos.current = 0;
  }, [pathname]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- tuning (matched to the measured live feel) ---
    const WHEEL_DAMP = 0.22; // wheel delta -> drag (resistance; live ~0.18)
    const TOUCH_GAIN = 1.1; // finger px -> drag
    const DECAY = 0.75; // per-frame spring-back of drag when idle
    const COMMIT = 130; // drag px needed to advance a section
    const EASE = reduce ? 1 : 0.24; // pos lerp toward target
    const IDLE_MS = 80; // ms since last input => spring back
    const MAX_DRAG = 300; // cap so you can't rubber-band forever
    const PARALLAX = 70; // px the inner content lags/leads its section
    const VEIL_MAX = 0.25; // max darken of a section's veil during its transition

    // each [data-section] gets a parallax inner + a veil overlay driven by scroll
    let sections: {
      top: number;
      h: number;
      inner: HTMLElement | null;
      veil: HTMLElement | null;
    }[] = [];
    const measureSections = () => {
      const cTop = content.getBoundingClientRect().top;
      sections = Array.from(
        content.querySelectorAll<HTMLElement>("[data-section]")
      ).map((el) => ({
        top: Math.round(el.getBoundingClientRect().top - cTop),
        h: el.offsetHeight,
        inner: el.querySelector<HTMLElement>("[data-parallax]"),
        veil: el.querySelector<HTMLElement>("[data-veil]"),
      }));
    };

    const recalc = () => {
      max.current = Math.max(0, content.scrollHeight - window.innerHeight);
      measureSections();
    };
    const clamp = (v: number) => Math.min(Math.max(v, 0), max.current);

    // layout offset of each [data-snap] section (independent of the transform)
    const snaps = () => {
      const cTop = content.getBoundingClientRect().top;
      const raw = Array.from(
        content.querySelectorAll<HTMLElement>("[data-snap]")
      ).map((el) => Math.round(el.getBoundingClientRect().top - cTop));
      const pts = Array.from(new Set(raw.map((v) => clamp(v)))).sort(
        (a, b) => a - b
      );
      if (pts[0] !== 0) pts.unshift(0);
      if (max.current - pts[pts.length - 1] > 40) pts.push(max.current);
      return pts;
    };

    let lastInput = -1e9;
    let locked = false; // one section-commit per gesture (carousel feel)
    const push = (px: number) => {
      drag.current = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, drag.current + px));
      lastInput = performance.now();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      push(e.deltaY * WHEEL_DAMP);
    };

    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      lastInput = performance.now();
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      push((touchY - y) * TOUCH_GAIN);
      touchY = y;
      if (e.cancelable) e.preventDefault();
    };

    const go = (i: number) => {
      const n = snaps().length;
      section.current = Math.max(0, Math.min(n - 1, i));
      drag.current = 0;
      lastInput = -1e9;
    };
    const isTyping = (el: EventTarget | null) => {
      const n = el as HTMLElement | null;
      return (
        !!n &&
        (n.tagName === "INPUT" || n.tagName === "TEXTAREA" || n.isContentEditable)
      );
    };
    const onKey = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      const k = e.key;
      if (["ArrowDown", "PageDown", " "].includes(k)) {
        e.preventDefault();
        go(section.current + 1);
      } else if (["ArrowUp", "PageUp"].includes(k)) {
        e.preventDefault();
        go(section.current - 1);
      } else if (k === "Home") {
        e.preventDefault();
        go(0);
      } else if (k === "End") {
        e.preventDefault();
        go(snaps().length - 1);
      }
    };

    let raf = 0;
    let wasScrolled = false;
    let wasFar = false;
    const render = () => {
      const pts = snaps();
      const n = pts.length;
      if (section.current > n - 1) section.current = n - 1;

      const idle = performance.now() - lastInput > IDLE_MS;
      if (idle) {
        drag.current *= DECAY;
        if (Math.abs(drag.current) < 0.5) drag.current = 0;
        locked = false; // gesture ended -> allow the next commit
      }

      // commit to the next / previous section once dragged past the threshold
      // (locked => one section per gesture, carousel-style, no multi-section blow-through)
      if (!locked && drag.current >= COMMIT && section.current < n - 1) {
        section.current += 1;
        drag.current = 0;
        locked = true;
      } else if (!locked && drag.current <= -COMMIT && section.current > 0) {
        section.current -= 1;
        drag.current = 0;
        locked = true;
      }

      const committed = pts[Math.min(section.current, n - 1)];
      const targetPos = clamp(committed + drag.current);

      const next = pos.current + (targetPos - pos.current) * EASE;
      pos.current = Math.abs(targetPos - next) < 0.08 ? targetPos : next;
      content.style.transform = `translate3d(0, ${-pos.current}px, 0)`;

      // per-section parallax + veil, driven by where each section sits on screen
      const vh = window.innerHeight;
      for (const s of sections) {
        const center = s.top - pos.current + s.h / 2;
        const k = Math.max(-1, Math.min(1, (center - vh / 2) / vh));
        if (s.inner)
          s.inner.style.transform = `translate3d(0, ${(k * PARALLAX).toFixed(
            1
          )}px, 0)`;
        if (s.veil)
          s.veil.style.opacity = `${(Math.min(1, Math.abs(k)) * VEIL_MAX).toFixed(
            3
          )}`;
      }

      // publish scroll state for scroll-reactive UI (window.scrollY stays 0 here)
      const nowScrolled = pos.current > 30;
      const nowFar = pos.current > 200;
      if (nowScrolled !== wasScrolled || nowFar !== wasFar) {
        wasScrolled = nowScrolled;
        wasFar = nowFar;
        root.dataset.scrolled = nowScrolled ? "true" : "false";
        root.dataset.scrolledFar = nowFar ? "true" : "false";
        window.dispatchEvent(new Event("scrollstate"));
      }

      raf = requestAnimationFrame(render);
    };

    recalc();
    root.classList.add("smooth");
    const ro = new ResizeObserver(recalc);
    ro.observe(content);
    window.addEventListener("resize", recalc);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", recalc);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      // clear imperatively-set styles so a dev HMR remount hydrates cleanly
      sections.forEach((s) => {
        if (s.inner) s.inner.style.transform = "";
        if (s.veil) s.veil.style.opacity = "";
      });
      root.classList.remove("smooth");
    };
  }, []);

  const isHome = pathname === "/";

  return (
    <div className="smooth-wrapper">
      <div
        ref={contentRef}
        className="smooth-content"
        style={{ paddingTop: isHome ? 0 : "4rem" }}
      >
        {children}
      </div>
    </div>
  );
}
