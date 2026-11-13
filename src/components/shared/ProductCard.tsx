import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* image placeholder — replace with <Image> once real photos exist */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-border">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ backgroundColor: product.color }}
        />
        {product.tag && (
          <Badge
            className={
              "absolute left-3 top-3 " +
              (product.tag === "Sale" ? "bg-accent text-accent-foreground" : "")
            }
          >
            {product.tag}
          </Badge>
        )}
        <span className="pointer-events-none absolute bottom-4 left-4 font-serif text-lg text-foreground/50">
          {product.name}
        </span>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium text-foreground">{product.name}</h3>
          <p className="text-xs text-muted">{product.category}</p>
        </div>
        <span className="shrink-0 text-sm font-medium">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}
