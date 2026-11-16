"use client";

import { useEffect, useState } from "react";

/**
 * Reads a scroll flag published by SmoothScroll (which uses virtual scroll, so
 * window.scrollY is always 0). SmoothScroll sets `data-scrolled` (early) and
 * `data-scrolled-far` (later) on <html> and fires a "scrollstate" event.
 *
 *   useScrolled()            -> true once scrolled a little   (data-scrolled)
 *   useScrolled("scrolledFar") -> true once scrolled further  (data-scrolled-far)
 */
export function useScrolled(key: "scrolled" | "scrolledFar" = "scrolled") {
  const [value, setValue] = useState(false);

  useEffect(() => {
    const read = () => setValue(document.documentElement.dataset[key] === "true");
    read();
    window.addEventListener("scrollstate", read);
    return () => window.removeEventListener("scrollstate", read);
  }, [key]);

  return value;
}
