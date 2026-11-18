"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import type { Product } from "@/lib/products";
import { listingCategories, sortOptions } from "@/lib/listing";

const PER_PAGE = 8;

export default function ProductListing({ items }: { items: Product[] }) {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<string>(sortOptions[0]);
  const [page, setPage] = useState(1);
  const [viewAll, setViewAll] = useState(false);

  const filtered = useMemo(() => {
    const base = cat === "All" ? items : items.filter((p) => p.category === cat);
    const r = [...base];
    if (sort === "Price: Low to High") r.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") r.sort((a, b) => b.price - a.price);
    else if (sort === "Newest")
      r.sort((a, b) => (b.tag === "New" ? 1 : 0) - (a.tag === "New" ? 1 : 0));
    return r;
  }, [items, cat, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pageCount);
  const visible = viewAll
    ? filtered
    : filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const reset = () => {
    setPage(1);
    setViewAll(false);
  };

  return (
    <>
      {/* ── FILTER / SORT BAR ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        {/* category refinements */}
        <div className="flex flex-wrap gap-2">
          {listingCategories.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCat(c);
                  reset();
                }}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-foreground text-background"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* count + sort */}
        <div className="flex items-center gap-5">
          <span className="whitespace-nowrap text-xs tracking-wide text-muted">
            {filtered.length} products
          </span>
          <label className="flex items-center gap-2 text-sm text-foreground/80">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                reset();
              }}
              className="cursor-pointer rounded-full border border-border bg-transparent px-3 py-1.5 text-sm text-foreground focus:outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {/* ── PRODUCT LISTING (grid) ────────────────────────────────────── */}
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {/* ── PAGINATION ────────────────────────────────────────────────── */}
      {!viewAll && pageCount > 1 && (
        <nav
          aria-label="Pagination"
          className="mt-14 flex items-center justify-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="grid size-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
          >
            &lsaquo;
          </button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === current ? "page" : undefined}
              className={`grid size-9 place-items-center rounded-full text-sm transition-colors ${
                p === current
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={current === pageCount}
            aria-label="Next page"
            className="grid size-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/5 disabled:pointer-events-none disabled:opacity-30"
          >
            &rsaquo;
          </button>
        </nav>
      )}

      {/* ── VIEW BUTTON ───────────────────────────────────────────────── */}
      {!viewAll && filtered.length > PER_PAGE && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setViewAll(true)}
            className="rounded-full border border-border px-9 py-3.5 text-sm tracking-wide text-foreground transition-colors hover:bg-foreground/5"
          >
            View all {filtered.length} products
          </button>
        </div>
      )}
    </>
  );
}
