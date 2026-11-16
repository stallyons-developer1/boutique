"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* Rotating example prompts (the real site cycles its placeholder). */
const PROMPTS = [
  "I need an outfit for a movie premiere",
  "Suggest me some looks for a weekend outdoor",
  "Find the ideal gift for my mother",
  "What should I wear to a winter wedding",
  "Build me a capsule travel wardrobe",
];

/** The persistent frosted prompt bar (no button — that lives in BottomPrompt). */
export default function AiPrompt() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);
  const [hintOverflow, setHintOverflow] = useState(0);

  // cycle the placeholder; pause while the user is typing/focused
  useEffect(() => {
    if (focused || value) return;
    const t = setInterval(() => {
      setFade(false);
      window.setTimeout(() => {
        setIdx((i) => (i + 1) % PROMPTS.length);
        setFade(true);
      }, 350);
    }, 2800);
    return () => clearInterval(t);
  }, [focused, value]);

  // quick-start chips (e.g. "Find the ideal gift") fill + focus the bar
  useEffect(() => {
    const onFill = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (typeof detail === "string") {
        setValue(detail);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("ai-fill", onFill as EventListener);
    return () => window.removeEventListener("ai-fill", onFill as EventListener);
  }, []);

  // measure how much the placeholder overflows so a long hint scrolls + fades
  useEffect(() => {
    if (!showHint) {
      setHintOverflow(0);
      return;
    }
    const el = hintRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const ov = el.scrollWidth - el.clientWidth;
      setHintOverflow(ov > 2 ? ov : 0);
    });
    return () => cancelAnimationFrame(raf);
    // showHint is derived from value/focused — re-measure when the hint changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, value, focused]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    // TODO: send `value` to the AI endpoint (Phase 6 — Claude API)
    alert(`Prompt: ${value}`);
  }

  const showHint = !value && !focused;

  return (
    <form
      onSubmit={submit}
      className="flex w-full items-center gap-2 rounded-full border !border-[#dfdbd826] bg-[rgba(24,19,16,0.62)] p-1.5 shadow-lg shadow-black/20 backdrop-blur-[10px]"
    >
      <button
        type="button"
        aria-label="Add context"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20"
      >
        <PlusIcon />
      </button>

      <div className="relative flex-1">
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-1 text-[15px] text-white caret-white focus:outline-none"
        />
        {showHint && (
          <span
            ref={hintRef}
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center overflow-hidden px-1 text-[15px] text-white/45 transition-opacity duration-300",
              fade ? "opacity-100" : "opacity-0",
            )}
            style={
              hintOverflow > 0
                ? {
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent)",
                    maskImage:
                      "linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent)",
                  }
                : undefined
            }
          >
            <span
              key={idx}
              className={cn(
                "shrink-0 whitespace-nowrap",
                hintOverflow > 0 && "hint-marquee",
              )}
              style={
                hintOverflow > 0
                  ? ({ "--marquee-x": `-${hintOverflow + 6}px` } as React.CSSProperties)
                  : undefined
              }
            >
              {PROMPTS[idx]}
            </span>
          </span>
        )}
      </div>

      <button
        type="submit"
        aria-label="Send"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
      >
        <ArrowUpIcon />
      </button>
    </form>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <line x1="12" y1="19" x2="12" y2="5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}
