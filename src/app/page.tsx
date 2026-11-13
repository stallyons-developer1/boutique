import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/ProductCard";
import HeroCarousel from "@/components/shared/HeroCarousel";
import { products, categories } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      {/* hero — coverflow carousel (header overlays on top) */}
      <HeroCarousel />

      {/* categories */}
      <section>
        <Container className="py-12">
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
        </Container>
      </section>

      {/* featured products */}
      <section>
        <Container className="pb-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl">New Arrivals</h2>
            <Button href="/products" variant="ghost" size="sm">
              View all →
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
