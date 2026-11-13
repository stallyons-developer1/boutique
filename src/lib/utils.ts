/** Join class names, ignoring falsy values. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Format a number as PKR currency. */
export function formatPrice(amount: number) {
  return "Rs " + amount.toLocaleString("en-PK");
}
