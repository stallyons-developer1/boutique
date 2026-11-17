"use client";

import { useState } from "react";
import Link from "next/link";

/** Full-bleed editorial panel with an interactive "look" selector — pick a
 *  thumbnail and the hero image cross-fades to it. Own imagery + copy. */
const looks = [
  { img: "/editorial/1.webp", label: "Knitwear" },
  { img: "/editorial/2.webp", label: "Outerwear" },
  { img: "/editorial/3.webp", label: "Tailoring" },
  { img: "/editorial/4.webp", label: "Accessories" },
  { img: "/editorial/5.webp", label: "Footwear" },
];

export default function EditorialSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="snap-start relative min-h-screen w-full overflow-hidden bg-neutral-900 text-white">
      {/* full-bleed background, cross-fading between the selected looks */}
      <div className="absolute inset-0">
        {looks.map((l, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={l.img}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[800ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            draggable={false}
          />
        ))}
        {/* legibility washes: darker on the left + bottom where the text sits */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /> */}
      </div>

      {/* content column (left) */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 sm:px-12 lg:px-28">
        <div className="max-w-xl pt-28 sm:pt-36">
          <h2 className="font-serif text-5xl leading-[1.04] sm:text-6xl">
            Made for
            <br />
            the moment
          </h2>
          <p className="mt-5 max-w-sm text-base text-white/80">
            Standout pieces, chosen for the evenings that matter.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center rounded-full bg-black/35 px-8 py-3.5 text-sm tracking-wide text-[#eae3d5] backdrop-blur-2xl transition-colors duration-300 hover:bg-black/45"
          >
            Explore the edit
          </Link>
        </div>

        {/* thumbnail "look" selector (bottom-left) */}
        <div className="mt-auto flex gap-3 pb-44 sm:gap-6">
          {looks.map((l, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={l.label}
              aria-pressed={i === active}
              className="relative shrink-0 p-2 transition duration-300 sm:p-2.5"
            >
              {/* active frame — frosted white-bordered overlay, fades in on active */}
              <div
                className={`pointer-events-none absolute inset-0 border border-white bg-white/10 backdrop-blur-2xl transition-opacity duration-300 ease-linear ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="relative h-24 w-16 overflow-hidden sm:h-42 sm:w-30">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
