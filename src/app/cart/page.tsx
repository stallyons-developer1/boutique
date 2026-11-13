"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

/* Dummy cart lines for now — Phase 6 me zustand store se aayenge. */
type Line = { slug: string; size: string; qty: number };

const initialLines: Line[] = [
  { slug: "ivory-silk-dress", size: "M", qty: 1 },
  { slug: "cashmere-knit", size: "S", qty: 2 },
];

export default function CartPage() {
  const [lines, setLines] = useState<Line[]>(initialLines);

  function setQty(i: number, delta: number) {
    setLines((prev) =>
      prev.map((l, idx) =>
        idx === i ? { ...l, qty: Math.max(1, l.qty + delta) } : l,
      ),
    );
  }

  function remove(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  const detailed = lines
    .map((l) => ({ line: l, product: products.find((p) => p.slug === l.slug)! }))
    .filter((x) => x.product);

  const subtotal = detailed.reduce(
    (sum, { line, product }) => sum + product.price * line.qty,
    0,
  );
  const shipping = subtotal > 10000 || subtotal === 0 ? 0 : 500;
  const total = subtotal + shipping;

  if (detailed.length === 0) {
    return (
      <Container className="py-24 text-center">
        <h1 className="font-serif text-3xl">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted">
          Looks like you haven’t added anything yet.
        </p>
        <div className="mt-8">
          <Button href="/products" size="lg">
            Continue shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="mb-10 font-serif text-3xl sm:text-4xl">Shopping Bag</h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* line items */}
        <ul className="divide-y divide-border border-y border-border">
          {detailed.map(({ line, product }, i) => (
            <li key={i} className="flex gap-4 py-6">
              <div
                className="h-28 w-24 shrink-0 rounded-lg"
                style={{ backgroundColor: product.color }}
              />
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted">Size {line.size}</p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(product.price * line.qty)}
                  </span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      onClick={() => setQty(i, -1)}
                      className="flex h-9 w-9 items-center justify-center"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{line.qty}</span>
                    <button
                      onClick={() => setQty(i, 1)}
                      className="flex h-9 w-9 items-center justify-center"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* order summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Order Summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button href="/checkout" size="lg" className="mt-6 w-full">
            Checkout
          </Button>
          <Link
            href="/products"
            className="mt-4 block text-center text-sm text-muted hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </Container>
  );
}
