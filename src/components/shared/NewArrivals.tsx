import Link from "next/link";

/**
 * "New Arrivals" product panel — a centered serif heading + subtitle above a
 * clean three-up grid of portrait product cards, each with a frosted wishlist
 * heart, set over a soft grey→cream wash, with a "Discover more" link below.
 * Mirrors the reference boutique's new-arrivals panel (centered header, three
 * equal 4:5 cards, frosted heart). Images are placeholders from our own set —
 * swap the `src` values for real product photos when ready.
 */
const items = [
  { src: "/hero/02.jpeg", alt: "Sequinned tailored suit", pos: "object-top" },
  { src: "/editorial/3.webp", alt: "Sequinned knit hood", pos: "object-top" },
  { src: "/hero/04.jpeg", alt: "Knit cardigan and felt hat", pos: "object-top" },
];

function Heart() {
  return (
    <span
      aria-hidden
      className="absolute bottom-3 right-3 z-10 grid size-10 place-items-center rounded-full bg-black/20 text-white/90 ring-1 ring-white/20 backdrop-blur-md transition-colors duration-300 group-hover:bg-black/35"
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

export default function NewArrivals() {
  return (
    <section className="snap-start relative flex min-h-screen w-full flex-col justify-center overflow-hidden">
      {/* soft vertical wash: light grey at the top fading into the page's cream */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#cecbc4] via-[#e7e3db] to-background" />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col px-6 pb-24 pt-28">
        {/* centered heading + subtitle */}
        <header className="text-center">
          <h2 className="font-serif text-[2rem] leading-tight text-foreground sm:text-[2.5rem]">
            New Arrivals for Women
          </h2>
          <p className="mt-3 text-base text-foreground/55 sm:text-lg">
            Discover fresh pieces for you
          </p>
        </header>

        {/* three equal 4:5 cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-3 sm:gap-8">
          {items.map((p) => (
            <Link
              key={p.src}
              href="/products"
              aria-label={p.alt}
              className="group relative block aspect-[4/5] overflow-hidden rounded-[2px] bg-foreground/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover ${p.pos} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                draggable={false}
              />
              <Heart />
            </Link>
          ))}
        </div>

        {/* discover-more link, aligned under the first card */}
        <Link
          href="/products"
          className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm text-foreground/90 transition-colors hover:text-foreground"
        >
          Discover More New Arrivals
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            &rsaquo;
          </span>
        </Link>
      </div>
    </section>
  );
}
