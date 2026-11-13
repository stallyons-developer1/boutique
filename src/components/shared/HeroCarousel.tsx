"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Slide = { id: number; img: string; gradient: string; label: string };

/* Each slide shows /hero/0X.jpg if present, else falls back to the gradient
   (CSS background layering — no broken-image icon). Put your photos in
   boutique/public/hero/  as 01.jpg … 06.jpg  */
const SLIDES: Slide[] = [
  { id: 1, img: "/hero/01.jpeg", gradient: "linear-gradient(160deg,#6b5a46,#241b12)", label: "Look 01" },
  { id: 2, img: "/hero/02.jpeg", gradient: "linear-gradient(160deg,#9c8363,#43341f)", label: "Look 02" },
  { id: 3, img: "/hero/03.jpeg", gradient: "linear-gradient(160deg,#b89b74,#5c4a30)", label: "Look 03" },
  { id: 4, img: "/hero/04.jpeg", gradient: "linear-gradient(160deg,#8f8575,#38332a)", label: "Look 04" },
  { id: 5, img: "/hero/05.jpeg", gradient: "linear-gradient(160deg,#7a6f60,#2a241c)", label: "Look 05" },
  { id: 6, img: "/hero/03.jpeg", gradient: "linear-gradient(160deg,#a28a68,#473824)", label: "Look 06" },
];

export default function HeroCarousel() {
  const n = SLIDES.length;
  const [active, setActive] = useState(0);
  const [spacing, setSpacing] = useState(360);

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n],
  );

  // full-width: spacing scales with the viewport so slides reach both edges
  useEffect(() => {
    const update = () =>
      setSpacing(Math.max(300, Math.min(window.innerWidth * 0.17, 540)));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // // autoplay
  // useEffect(() => {
  //   const t = setInterval(() => setActive((a) => (a + 1) % n), 400);
  //   return () => clearInterval(t);
  // }, [n]);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0e1a]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* slides track — faded on both sides */}
      <div className="max-w-[1200px] relative w-full">

      <div
        className="relative h-[70vh] max-h-[560px] w-full"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 5%, #000 95%, transparent 100%)",
        }}
      >
        {SLIDES.map((s, i) => {
          let offset = i - active;
          const half = Math.floor(n / 2);
          if (offset > half) offset -= n;
          if (offset < -half) offset += n;

          const abs = Math.abs(offset);
          const center = offset === 0;
          const scale = center ? 1 : abs === 1 ? 0.82 : 0.82;

          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              aria-label={`Show ${s.label}`}
              className="absolute left-1/2 top-1/2 h-[420px] w-[300px] transition-all duration-500 ease-out sm:h-[470px] sm:w-[340px]"
              style={{
                transform: `translate(-50%,-50%) translateX(${offset * spacing}px) scale(${scale})`,
                zIndex: 50 - abs,
                opacity: abs > 2 ? 0 : 1,
              }}
            >
              {/* frame */}
              <div
                className={cn(
                  "h-full w-full overflow-hidden bg-[#0a0e1a] border-2 border-white"
                )}
              >
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${s.img}), ${s.gradient}`,
                    filter: center ? "none" : "brightness(.82)",
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* arrows (minimal chevrons) */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous"
        className="absolute left-5 top-1/2 z-[55] -translate-y-1/2 text-white/60 transition-colors hover:text-white sm:-left-12"
      >
        <Chevron dir="left" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Next"
        className="absolute right-5 top-1/2 z-[55] -translate-y-1/2 text-white/60 transition-colors hover:text-white sm:-right-12"
      >
        <Chevron dir="right" />
      </button>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
      {dir === "left" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
