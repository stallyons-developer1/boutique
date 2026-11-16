"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

  const go = useCallback(
    (dir: number) => setActive((a) => (a + dir + n) % n),
    [n],
  );

  // // autoplay
  // useEffect(() => {
  //   const t = setInterval(() => setActive((a) => (a + 1) % n), 400);
  //   return () => clearInterval(t);
  // }, [n]);
  const GAP = 28; // equal gap between card edges (px); negative = overlap
  const scaleFor = (k: number) => (k === 0 ? 1 : 0.82);

  // measure the real (unscaled) card width so gaps stay equal at any size
  const cardRef = useRef<HTMLButtonElement>(null);
  const [cardW, setCardW] = useState(340);
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) setCardW(cardRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function xFor(offset: number) {
    const dir = Math.sign(offset);
    let x = 0;
    for (let k = 1; k <= Math.abs(offset); k++) {
      x += (cardW * scaleFor(k - 1)) / 2 + GAP + (cardW * scaleFor(k)) / 2;
    }
    return dir * x;
  }

  return (
    <section
      className="relative flex h-full text-center flex-col min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0e1a]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* slides track — faded on both sides */}
      <div className=" w-dvw relative h-[70dvh] 2xl:w-[60dvw] max-h-[35dvh] md:max-h-[40dvh] 2xl:max-w-1100 max-w-[900px]">

      <div
        className="relative h-full w-full"
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
              ref={i === 0 ? cardRef : undefined}
              onClick={() => setActive(i)}
              aria-label={`Show ${s.label}`}
              className="absolute left-1/2 top-1/2 h-full aspect-9/16 md:aspect-12/16 transition-all duration-500 ease-out "
              style={{
                transform: `translate(-50%,-50%) translateX(${xFor(offset)}px) scale(${scale})`,
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
      <h2 className="mt-8 text-[2.5rem] font-light text-white font-serif md:text-h3 2xl:text-h2 md:max-w-[32ch] 2xl:max-w-[22ch]">
        Where ideas become endless possibilities
      </h2>
      <p className="text-base text-white font-light">Welcome to the Online Boutique</p>
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
