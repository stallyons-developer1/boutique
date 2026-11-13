import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const columns = [
  {
    title: "Shop",
    links: ["New In", "Dresses", "Knitwear", "Accessories"],
  },
  {
    title: "Help",
    links: ["Shipping", "Returns", "Size Guide", "Contact"],
  },
  {
    title: "About",
    links: ["Our Story", "Sustainability", "Stores", "Careers"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <Container className="grid grid-cols-2 gap-10 py-14 md:grid-cols-5">
        {/* brand + newsletter */}
        <div className="col-span-2">
          <p className="font-serif text-2xl">MAISON</p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Curated boutique fashion. Timeless pieces, crafted with care.
          </p>
          <form className="mt-5 flex max-w-sm gap-2">
            <Input type="email" placeholder="Email address" aria-label="Email" />
            <Button type="submit" size="md">
              Join
            </Button>
          </form>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-medium">{col.title}</p>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted sm:flex-row">
          <p>© {2026} Maison. All rights reserved.</p>
          <p>Made with care in Pakistan.</p>
        </Container>
      </div>
    </footer>
  );
}
