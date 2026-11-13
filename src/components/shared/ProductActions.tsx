"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function ProductActions() {
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);

  function addToCart() {
    if (!size) {
      alert("Please select a size");
      return;
    }
    // Phase 6 me ye zustand cart store + API call banega
    alert(`Added ${qty} item(s), size ${size}`);
  }

  return (
    <div className="space-y-6">
      {/* size selector */}
      <div>
        <p className="mb-2 text-sm font-medium">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "h-10 min-w-10 rounded-lg border px-3 text-sm transition-colors",
                size === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground/40",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* quantity + add to cart */}
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <Button size="lg" className="flex-1" onClick={addToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
