import { cn } from "@/lib/utils";

/**
 * Brand logo rendered from /public/logo.svg via a CSS mask so it inherits the
 * current text colour — white over the hero, dark when the header turns solid —
 * and scales cleanly. Save your SVG to  boutique/public/logo.svg
 *
 * The box keeps the logo's ~206:65 aspect ratio; change w/h together in the
 * className to resize.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Maison"
      className={cn("block bg-current", className)}
      style={{
        maskImage: "url(/logo.svg)",
        WebkitMaskImage: "url(/logo.svg)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
