import Link from "next/link";

/**
 * Editorial split panel — a tall feature image pinned on the left while a
 * two-column grid of product cards scrolls past on the right, each card zooming
 * gently on hover with a frosted wishlist heart. Mirrors the reference
 * boutique's "sticky look + scrolling product grid" section: the cards are
 * mixed sizes (some span two rows) for a magazine-like rhythm. On desktop the
 * left image is `sticky` and the right grid (taller than the viewport) drives
 * the scroll; on mobile everything stacks. Own imagery + code.
 */
const feature = {
  src: "/editorial/1.webp",
  alt: "Sequinned double-breasted suit",
  pos: "object-top",
};

// right-hand scrolling grid — mixed sizes like the live site; `big` cards span
// two rows so the grid staggers instead of being a uniform block.
const cards = [
  { src: "/editorial/4.webp", alt: "Sequinned beanie" , big: true },
  { src: "/hero/01.jpeg", alt: "Suede shoulder bag" },
  { src: "/editorial/3.webp", alt: "Sequinned knit hood"},
  { src: "/editorial/2.webp", alt: "Shearling trapper hat" },
  { src: "/editorial/5.webp", alt: "Metallic slingback heel" , big: true },
  { src: "/hero/04.jpeg", alt: "Fur trapper hat" },
  // { src: "/hero/04.jpeg", alt: "Knit cardigan and felt hat", big: true },
  // { src: "/hero/05.jpeg", alt: "Winter carousel campaign" },
];

function Heart() {
  return (
    <span
      aria-hidden
      className="absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-black/25 text-white/85 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/40 group-hover:text-white"
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

function CardImg({ src, pos }: { src: string; pos?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={`absolute inset-0 h-full w-full object-cover ${pos ?? "object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
      draggable={false}
    />
  );
}

export default function EditorialGrid() {
  return (
    // `--pad` is the single source of truth for the frame: the section padding,
    // the sticky top offset and the left image height all derive from it, so
    // changing it in ONE place keeps them in sync (change these two values only).
    <section className="snap-start relative w-full bg-background [--pad:0.75rem] p-[var(--pad)] sm:[--pad:3rem]">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-4">
        {/* LEFT — full feature image, pinned (one screen) while the page scrolls */}
        <div className="mb-3 sm:mb-4 lg:sticky lg:top-[var(--pad)] lg:mb-0 lg:h-[calc(100vh_-_2_*_var(--pad))]">
          <Link
            href="/products"
            aria-label={feature.alt}
            className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-foreground/5 lg:aspect-auto lg:h-full"
          >
            <CardImg src={feature.src} pos={feature.pos} />
            <Heart />
          </Link>
        </div>

        {/* RIGHT — masonry columns that scroll with the page. A `big` card is
            sized to exactly the LEFT image height (one screen minus the frame),
            so it reads as a matched pair beside the feature; normal cards keep a
            4:5 ratio. The negative bottom margin cancels the trailing card
            margin so the column ends flush (no extra gap at the bottom). */}
        <div className="columns-2 gap-3 -mb-3 sm:gap-4 sm:-mb-4">
          {cards.map((c) => (
            <Link
              key={c.src}
              href="/products"
              aria-label={c.alt}
              className={`group relative mb-3 block break-inside-avoid overflow-hidden rounded-[2px] bg-foreground/5 sm:mb-4 ${
                c.big
                  ? "aspect-[4/5] lg:aspect-auto lg:h-[calc(100vh_-_2_*_var(--pad))]"
                  : "aspect-[4/5]"
              }`}
            >
              <CardImg src={c.src} />
              <Heart />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
