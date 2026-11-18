"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AiPrompt from "@/components/shared/AiPrompt";
import { useScrolled } from "@/lib/useScrolled";
import { cn } from "@/lib/utils";

/**
 * Fixed bottom overlay (home only), mirroring the reference flow:
 *  - the prompt BAR stays pinned while the page scrolls behind it
 *  - the corner footer text (below the bar) COLLAPSES early — freeing its
 *    height so the bar slides DOWN by that amount
 *  - the "Find the ideal gift" chip just FADES (opacity, in place) a little
 *    later — no height collapse, it keeps its size and moves down with the group
 *  Everything fades in on first load.
 */
export default function BottomPrompt() {
  const pathname = usePathname();
  const scrolled = useScrolled(); // early: corner text
  const scrolledFar = useScrolled("scrolledFar"); // later: find-gift chip
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (pathname !== "/") return null;

  const cornerVisible = mounted && !scrolled;
  const chipVisible = mounted && !scrolledFar;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-4 px-6">
      {/* find-gift chip — plain opacity fade, keeps its size/position */}
      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("ai-fill", { detail: "Help me find the ideal gift" }),
          )
        }
        className={cn(
          "gift-btn relative overflow-hidden rounded-full px-4 py-3.5 text-[15px] text-[#f3efe9] transition-[transform,opacity,scale] duration-500 ease-out",
          chipVisible
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-100 opacity-0",
        )}
      >
        {/* frosted dark pill + pulsing gold ring + warm sweep */}
        <span aria-hidden className="gift-btn__bg">
          <span aria-hidden className="gift-btn__warm" />
        </span>
        {/* text fades in AFTER the pill (two-stage reveal, like the reference) */}
        <span
          className={cn(
            "relative z-10 inline-block transition-opacity duration-300",
            chipVisible ? "opacity-100 delay-200" : "opacity-0",
          )}
        >
          Find the ideal gift
        </span>
      </button>

      {/* persistent prompt bar */}
      <div className="pointer-events-auto w-full max-w-[420px] mb-2">
        <AiPrompt />
      </div>

      {/* corner footer — collapses (height) + fades, letting the bar slide down */}
      <div
        className={cn(
          "grid w-full transition-all duration-500 ease-out",
          cornerVisible ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] translate-y-1 opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-white/45">
            <span>© 2026 Maison — All rights reserved</span>
            <span className="hidden sm:inline">This website runs on your own AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
