import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Maison order.",
};

function Field({
  label,
  className,
  ...props
}: {
  label: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={className}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <Input {...props} />
    </label>
  );
}

export default function CheckoutPage() {
  return (
    <Container className="py-12">
      <h1 className="mb-10 font-serif text-3xl sm:text-4xl">Checkout</h1>

      <form className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          {/* contact */}
          <section>
            <h2 className="mb-4 font-serif text-xl">Contact</h2>
            <div className="grid gap-4">
              <Field label="Email" type="email" placeholder="you@example.com" />
              <Field label="Phone" type="tel" placeholder="+92 3xx xxxxxxx" />
            </div>
          </section>

          {/* shipping */}
          <section>
            <h2 className="mb-4 font-serif text-xl">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" placeholder="First name" />
              <Field label="Last name" placeholder="Last name" />
              <Field
                label="Address"
                placeholder="Street address"
                className="sm:col-span-2"
              />
              <Field label="City" placeholder="City" />
              <Field label="Postal code" placeholder="Postal code" />
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Place order
          </Button>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-2xl border border-border bg-card p-6">
          <h2 className="font-serif text-xl">Your Order</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>Rs 29,300</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>Free</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>Total</dt>
              <dd>Rs 29,300</dd>
            </div>
          </dl>
        </aside>
      </form>
    </Container>
  );
}
