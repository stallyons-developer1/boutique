import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import ProductListing from "@/components/shared/ProductListing";
import { listing } from "@/lib/listing";

export const metadata: Metadata = {
  title: "Ready to Wear",
  description:
    "Women's ready-to-wear — dresses, knitwear, tailoring and coats cut for an easy, lasting elegance.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background pb-24 pt-36 sm:pt-44">
      <Container>
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs tracking-wide text-muted">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">Ready to Wear</li>
          </ol>
        </nav>

        {/* heading */}
        <header className="mb-8 mt-5">
          <h1 className="font-serif text-3xl sm:text-4xl">Ready to Wear</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Fluid dresses, softly tailored jackets and knitwear in the season&rsquo;s
            finest fibres.
          </p>
        </header>

        {/* filter → listing → pagination → view button */}
        <ProductListing items={listing} />

        {/* descriptive text */}
        <section className="mx-auto mt-24 max-w-3xl text-center">
          <h2 className="font-serif text-2xl text-foreground">
            Women&rsquo;s Ready-to-Wear
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Our ready-to-wear collection gathers the pieces a considered
              wardrobe is built on &mdash; a silk slip that moves with you, a
              blazer cut to soften the shoulder, knitwear spun from cashmere and
              fine alpaca. Each style begins with the cloth, chosen for the way it
              drapes, wears and lasts.
            </p>
            <p>
              Designed to be layered and returned to, season after season, these
              are clothes made for living in: quiet in their detail, generous in
              their comfort, and unhurried in their elegance.
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
