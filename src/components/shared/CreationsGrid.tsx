import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

/**
 * "Selected creations" product grid — a full-width flex-wrap grid of portrait
 * product cards (2 columns on mobile, 3 on desktop) over a warm cream wash.
 * The interaction model mirrors the reference boutique's products-grid panel,
 * rebuilt in our own code:
 *   - image zooms to 1.05 on hover (ease-out-quart, ~500ms)
 *   - the product name "rolls" vertically on hover: the label slides up and out
 *     while a duplicate slides up into its place
 *   - a frosted wishlist heart whose backdrop deepens on hover
 *   - cards fade + slide up as they scroll into view, staggered per column
 * Imagery, product names and code are our own.
 */
const EASE = "cubic-bezier(0.17,0.17,0.25,1)"; // the reference's ease-out-quart

const creations = [
  { src: "/editorial/1.webp", name: "Sequinned double-breasted suit", pos: "object-top" },
  { src: "/editorial/4.webp", name: "Sequinned cashmere beanie", pos: "object-center" },
  { src: "/editorial/3.webp", name: "Sequinned knit hood", pos: "object-top" },
  { src: "/hero/04.jpeg", name: "Chunky knit cardigan", pos: "object-top" },
  { src: "/editorial/2.webp", name: "Shearling trapper hat", pos: "object-center" },
  { src: "/editorial/5.webp", name: "Metallic slingback heel", pos: "object-center" },
];

function Heart() {
  return (
    <span
      aria-hidden
      className="absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-black/20 text-white/90 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/40"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </span>
  );
}

export default function CreationsGrid() {
  return (
    <section className="snap-start w-full bg-[#f1ede7] p-1 pb-28 sm:pb-40">
  
      <div className="mx-auto grid grid-cols-2 gap-x-1 gap-y-16 lg:grid-cols-3 lg:gap-y-12">
        {creations.map((c, i) => (
          <div key={c.src}>
            <Reveal delay={(i % 3) * 100}>
              <Link href="/products" aria-label={c.name} className="group/cta block">
                {/* 4:5 image, inner layer zooms to 1.05 on hover */}
                <div className="relative aspect-[4/5] overflow-hidden  bg-foreground/5">
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-[var(--ease)] group-hover/cta:scale-105"
                    style={{ ["--ease" as string]: EASE }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.src}
                      alt=""
                      className={`absolute inset-0 h-full w-full object-cover ${c.pos}`}
                      draggable={false}
                    />
                  </div>
                  <Heart />
                </div>

                {/* caption: the name "rolls" up on hover (base slides out, a
                    duplicate slides in) + a chevron that nudges right */}
                <div className="mt-4 flex items-center gap-1.5 text-[15px] font-light text-foreground">
                  <span className="relative inline-block overflow-hidden leading-[1.4]">
                    <span
                      className="block transition-transform duration-500 ease-[var(--ease)] group-hover/cta:-translate-y-full"
                      style={{ ["--ease" as string]: EASE }}
                    >
                      {c.name}
                    </span>
                    <span
                      className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease)] group-hover/cta:translate-y-0"
                      style={{ ["--ease" as string]: EASE }}
                      aria-hidden
                    >
                      {c.name}
                    </span>
                  </span>
                  <span className="translate-y-px transition-transform duration-500 ease-[var(--ease)] group-hover/cta:translate-x-1" style={{ ["--ease" as string]: EASE }}>
                    &rsaquo;
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
