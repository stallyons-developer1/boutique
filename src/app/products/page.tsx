import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import ProductCard from "@/components/shared/ProductCard";
import { products, categories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse the full Maison collection of boutique fashion.",
};

export default function ProductsPage() {
  return (
    <Container className="py-12">
      <header className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl">Shop</h1>
        <p className="mt-2 text-sm text-muted">
          {products.length} pieces in the collection
        </p>
      </header>

      {/* category filter pills (visual for now) */}
      <div className="mb-10 flex flex-wrap gap-2">
        <span className="rounded-full bg-foreground px-4 py-2 text-sm text-background">
          All
        </span>
        {categories.map((c) => (
          <span
            key={c}
            className="cursor-pointer rounded-full border border-border px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-foreground/40"
          >
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </Container>
  );
}
