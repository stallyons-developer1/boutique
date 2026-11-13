export type Product = {
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  /** placeholder swatch colour until real images are added */
  color: string;
  tag?: "New" | "Sale";
};

/* Dummy data for now — Phase 5 me ye MongoDB se aayega. */
export const products: Product[] = [
  {
    slug: "ivory-silk-dress",
    name: "Ivory Silk Dress",
    price: 8900,
    category: "Dresses",
    description:
      "A fluid silk slip dress cut on the bias for an effortless drape. Finished with delicate adjustable straps.",
    color: "#e4dccf",
    tag: "New",
  },
  {
    slug: "camel-wool-coat",
    name: "Camel Wool Coat",
    price: 14500,
    category: "Outerwear",
    description:
      "An oversized double-breasted coat in brushed wool. Tailored shoulders, deep patch pockets, warm and timeless.",
    color: "#cbb79c",
  },
  {
    slug: "linen-wrap-top",
    name: "Linen Wrap Top",
    price: 4200,
    category: "Tops",
    description:
      "Breathable European linen in a flattering wrap silhouette. Ties at the waist, soft rounded sleeves.",
    color: "#d8cbba",
    tag: "Sale",
  },
  {
    slug: "pleated-midi-skirt",
    name: "Pleated Midi Skirt",
    price: 5600,
    category: "Skirts",
    description:
      "Knife-pleated midi skirt with a comfortable elasticated waist and a gentle swing with every step.",
    color: "#c8bca9",
  },
  {
    slug: "cashmere-knit",
    name: "Cashmere Crew Knit",
    price: 10200,
    category: "Knitwear",
    description:
      "Pure cashmere crew-neck in a relaxed fit. Lightweight, impossibly soft, the kind you reach for daily.",
    color: "#ded3c2",
    tag: "New",
  },
  {
    slug: "tailored-trousers",
    name: "Tailored Trousers",
    price: 6800,
    category: "Trousers",
    description:
      "High-rise wide-leg trousers with pressed creases and a clean, elongating line. Hidden side zip.",
    color: "#bdae98",
  },
  {
    slug: "leather-tote",
    name: "Minimal Leather Tote",
    price: 11900,
    category: "Bags",
    description:
      "A structured everyday tote in vegetable-tanned leather that softens beautifully with time.",
    color: "#c5b299",
  },
  {
    slug: "silk-scarf",
    name: "Printed Silk Scarf",
    price: 3200,
    category: "Accessories",
    description:
      "Hand-rolled silk twill scarf with an artful seasonal print. Tie it any way you like.",
    color: "#dccfbb",
    tag: "Sale",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const categories = [
  "Dresses",
  "Outerwear",
  "Knitwear",
  "Trousers",
  "Accessories",
];
