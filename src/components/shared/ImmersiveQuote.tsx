"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Immersive quote panel — a full-screen, heavily-veiled dark image with a large
 * centred serif line framed by a thin filigree ornament above and below.
 *
 * Reveal (matches the reference's technique): the line is split into words and
 * characters, and each CHARACTER fades + un-blurs + rises individually, in a
 * left-to-right stagger, when the panel scrolls into view. The background also
 * drifts with a subtle parallax. Font, imagery, ornament and copy are our own —
 * replace QUOTE with your own line.
 */
const QUOTE =
  "True elegance is never loud — it lingers in the quiet precision of every seam and the calm of considered design.";

// ---- reveal (measured frame-by-frame from the live site) ----
// The whole line RISES once as a block (container translate 43px→0), while each
// LETTER focus-fades in — opacity 0→1 AND blur 22px→0 — staggered ~19ms apart.
// Letters do NOT translate individually. Easing ≈ power2.out (easeOutQuad).
const STAGGER = 19; //    ms between each letter starting (measured ~18.6)
const CHAR_DUR = 900; //  ms each letter takes to fade + un-blur (measured ~924)
const CHAR_BLUR = 22; //  px start blur per letter → 0 (focus-in; measured ~22)
const RISE = 43; //       px the whole block rises from → 0 (measured ~43)
const RISE_DUR = 1900; // ms for the block to rise (measured ~1900)
const EASE = "cubic-bezier(0.25,0.46,0.45,0.94)"; // ~power2.out
// -------------------------------------------------------------

// split into words (kept whole so they wrap cleanly), each with per-char indices
const WORDS: { ch: string; i: number }[][] = (() => {
  let i = 0;
  return QUOTE.split(" ").map((w) => [...w].map((ch) => ({ ch, i: i++ })));
})();

function Ornament({ shown, delay }: { shown: boolean; delay: number }) {
  return (
    <svg
      width="10"
      height="50"
      viewBox="0 0 10 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      aria-hidden
      className="text-white/60 transition-opacity duration-1000 ease-out"
      style={{ opacity: shown ? 1 : 0, transitionDelay: `${delay}ms` }}
    >
      <path d="M5 2 C7.5 9 2.5 15 5 22" strokeLinecap="round" />
      <path d="M5 28 C7.5 35 2.5 41 5 48" strokeLinecap="round" />
      <path d="M5 25 l2.4 -2.4 -2.4 -2.4 -2.4 2.4 z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ImmersiveQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const [shown, setShown] = useState(false);

  // reveal once the panel enters view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // subtle background parallax tied to scroll position
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      const bg = bgRef.current;
      if (el && bg) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = (r.top + r.height / 2 - vh / 2) / vh;
        bg.style.transform = `translate3d(0, ${(-progress * 44).toFixed(1)}px, 0) scale(1.12)`;
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const lastDelay = (QUOTE.replace(/\s/g, "").length - 1) * STAGGER;

  return (
    <section
      ref={sectionRef}
      className="snap-start relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-neutral-950"
    >
      {/* parallax background image (heavily veiled) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={bgRef}
        src="/editorial/2.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.12)" }}
        draggable={false}
      />
      <div className="absolute inset-0 bg-neutral-950/78" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 48% at 50% 46%, rgba(255,255,255,0.12), rgba(0,0,0,0) 70%)",
        }}
      />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-6 text-center sm:gap-16">
        <Ornament shown={shown} delay={0} />

        {/* the whole line rises once as a block (container transform) */}
        <p
          className="max-w-[14.7em] font-serif text-[clamp(1.9rem,4.6vw,3.5rem)] font-light leading-[1.12] text-white will-change-transform"
          style={{
            transform: shown ? "translateY(0)" : `translateY(${RISE}px)`,
            transition: `transform ${RISE_DUR}ms ${EASE}`,
          }}
        >
          {WORDS.map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.map(({ ch, i }) => (
                <span
                  key={i}
                  className="inline-block will-change-[opacity,filter]"
                  style={{
                    opacity: shown ? 1 : 0,
                    filter: shown ? "blur(0px)" : `blur(${CHAR_BLUR}px)`,
                    transition: `opacity ${CHAR_DUR}ms ${EASE}, filter ${CHAR_DUR}ms ${EASE}`,
                    transitionDelay: `${i * STAGGER}ms`,
                  }}
                >
                  {ch}
                </span>
              ))}
              {wi < WORDS.length - 1 ? " " : null}
            </span>
          ))}
        </p>

        <Ornament shown={shown} delay={lastDelay + 150} />
      </div>
    </section>
  );
}
