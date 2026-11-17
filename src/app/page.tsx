import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/ProductCard";
import HeroCarousel from "@/components/shared/HeroCarousel";
import Reveal from "@/components/shared/Reveal";
import { products, categories } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* hero — carousel (snap section) */}
      <div data-snap>
        <HeroCarousel />
      </div>

      {/* new arrivals — full-screen section with parallax inner + veil (snaps) */}
      <section
        data-snap
        data-section
        className="relative flex h-screen items-center overflow-hidden bg-background"
      >
        {/* veil — darkens on enter/leave, clears when centred (opacity driven by SmoothScroll) */}
        <div
          data-veil
          className="pointer-events-none absolute inset-0 z-10 bg-[#14110e] opacity-0"
        />
        <div data-parallax className="w-full will-change-transform">
          <Container className="py-20">
          <Reveal>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mb-8 mt-10 flex items-end justify-between">
            <Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl">New Arrivals</h2>
            </Reveal>
            <Reveal delay={100}>
              <Button href="/products" variant="ghost" size="sm">
                View all →
              </Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          </Container>
        </div>
      </section>
    </>
  );
}
