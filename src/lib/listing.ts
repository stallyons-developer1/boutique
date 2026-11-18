import type { Product } from "./products";

/**
 * Ready-to-wear listing data — our own products (colour swatches stand in for
 * photography until real imagery is added). Enough items to exercise filtering,
 * sorting and pagination on the listing page.
 */
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// [name, category, price, swatch, tag?]
const rows: [string, string, number, string, ("New" | "Sale")?][] = [
  ["Ivory Silk Slip Dress", "Dresses", 1890, "#e7ded0", "New"],
  ["Pleated Chiffon Midi Dress", "Dresses", 2450, "#d9cdbb"],
  ["Belted Poplin Shirt Dress", "Dresses", 1290, "#cfc3b0"],
  ["Draped Jersey Gown", "Dresses", 3200, "#2c2a27"],
  ["Cashmere Crew Jumper", "Knitwear", 980, "#ded3c2", "New"],
  ["Ribbed Roll-Neck Knit", "Knitwear", 760, "#b9a88f"],
  ["Fine-Gauge Cardigan", "Knitwear", 1120, "#c8bca9"],
  ["Alpaca Cropped Knit", "Knitwear", 890, "#9a8f7d", "Sale"],
  ["Double-Breasted Wool Blazer", "Blazers", 2890, "#3a4151", "New"],
  ["Linen Tailored Blazer", "Blazers", 1650, "#d6cbb6"],
  ["Cropped Bouclé Jacket", "Blazers", 2100, "#cbb79c"],
  ["Camel Wool Coat", "Coats", 3900, "#c3a985", "New"],
  ["Belted Trench Coat", "Coats", 2650, "#b7a68d"],
  ["Quilted Car Coat", "Coats", 1780, "#4a4a44"],
  ["Knife-Pleated Midi Skirt", "Skirts", 980, "#c8bca9"],
  ["A-Line Wool Skirt", "Skirts", 720, "#8a7c68"],
  ["Satin Bias Skirt", "Skirts", 640, "#ddd3c2", "Sale"],
  ["High-Rise Wide Trousers", "Trousers", 890, "#2b2b2b"],
  ["Tailored Cigarette Trousers", "Trousers", 760, "#bdae98"],
  ["Pleated Linen Trousers", "Trousers", 680, "#d8cbba", "New"],
  ["Silk Camisole", "Tops", 390, "#e4dccf"],
  ["Cotton Poplin Shirt", "Tops", 460, "#eae3d5"],
  ["Boat-Neck Fine Knit", "Tops", 540, "#cfc3b0"],
  ["Georgette Blouse", "Tops", 620, "#d9cdbb", "Sale"],
];

export const listing: Product[] = rows.map(([name, category, price, color, tag]) => ({
  slug: slugify(name),
  name,
  category,
  price,
  color,
  tag,
  description: `${name} — cut in considered fabrics for an easy, lasting elegance.`,
}));

export const listingCategories = [
  "All",
  "Dresses",
  "Knitwear",
  "Blazers",
  "Coats",
  "Skirts",
  "Trousers",
  "Tops",
];

export const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
] as const;
