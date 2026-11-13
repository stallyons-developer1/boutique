import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import ProductActions from "@/components/shared/ProductActions";
import { products, getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

/* Pre-render every product page at build time (great for SEO + speed). */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/* Per-product SEO metadata. */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <Container className="py-10">
      {/* breadcrumb */}
      <nav className="mb-8 text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/products" className="hover:text-foreground">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* image */}
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-2xl"
          style={{ backgroundColor: product.color }}
        >
          {product.tag && (
            <Badge
              className={
                "absolute left-4 top-4 " +
                (product.tag === "Sale" ? "bg-accent text-accent-foreground" : "")
              }
            >
              {product.tag}
            </Badge>
          )}
        </div>

        {/* details */}
        <div className="md:py-4">
          <p className="text-sm uppercase tracking-[0.15em] text-muted">
            {product.category}
          </p>
          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl">{formatPrice(product.price)}</p>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
            {product.description}
          </p>

          <div className="mt-8">
            <ProductActions />
          </div>

          <ul className="mt-10 space-y-2 border-t border-border pt-6 text-sm text-muted">
            <li>• Free shipping on orders over Rs 10,000</li>
            <li>• 14-day easy returns</li>
            <li>• Ethically made, natural fabrics</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
