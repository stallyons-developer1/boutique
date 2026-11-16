# Live reference notes — Brunello Cucinelli "AI" boutique

Source inspected: `shop.brunellocucinelli.com/en-gb/ai`

Engineering notes captured by inspecting the live site, so we can recreate the
_feel / flow_ in MAISON with our **own** React/Next + Tailwind code. We build
originals — we do **not** copy their proprietary Vue/GSAP/WebGL bundles (minified,
and they wouldn't run in Next anyway). This file is the persistent reference; when
we need another element, inspect it live and add the technique here.

## Stack & scroll

- **Vue 3 + GSAP** (`gsap-bundle.js`). Vue `<Transition>` for component enter/leave.
- `html, body { overflow: hidden }` → **virtual scroll**: content is moved with a
  `transform: translateY()`, no native scroll. Edges fade via a mask-overflow wrapper.
- Our equivalent: `src/components/shared/SmoothScroll.tsx` (wheel/touch → lerped
  translateY) publishing `data-scrolled` / `data-scrolled-far`.

## Fonts / colours

- Fonts: sans `gt_eesti_pro`, serif `quarto`, handwritten `jane_austen`. (We use Inter / Playfair.)
- Base background beige `#f1ede7`; dark hero ~`#0a0e1a`.

## Signature easings

- `--ease-out: cubic-bezier(.17,.17,.25,1)`
- `--ease-out-quint: cubic-bezier(.22,1,.36,1)`
- `--ease-out-quart: cubic-bezier(.26,1,.48,1)`
- `--ease-out-back: cubic-bezier(.17,.89,.32,1.27)`

## "Find the ideal gift" gold button (`PromptBarStickyBtn--gold`)

- **Rest:** dark frosted pill `rgba(24,19,16,.62)` + `backdrop-filter: blur(10px)`
  + subtle white inset border `inset 0 0 0 1.5px #ffffff29`.
- **Gold PULSES** every `--gold-cycle: 3.2s` (it is NOT constant — that's why it
  reads as subtle):
  - border ring → `::before` conic `from var(--gold-angle)` masked to the 1.5px edge
    (`mask-composite: exclude`); `@keyframes gold-travel { --gold-angle: 170deg→510deg }`
    + `gold-fade { opacity: 0 → .85 (18–36%) → 0 (66%) }`.
  - warm sweep → a `linear-gradient` band centred at `var(--gold-x)`;
    `gold-slide { --gold-x: 0%→100% }` + `gold-fade`.
- **Hover:** a stronger gold tint/gradient fades in + soft glow box-shadow.
- **Reveal:** background `clip-path .5s ease-out`; text `opacity .2s` with `.3s` delay
  (pill appears first, text after).
- Our build: `.gift-btn__bg` + `.gift-btn__warm` in `src/app/globals.css` (same technique).

## Scroll flow (modules, top → bottom)

1. **Hero** — starry bg, centred logo, coverflow carousel (images auto-cycle with a
   loader-blink), heading, subtitle, gold button, prompt bar, corner footer.
2. First-scroll **tutorial** overlay ("Browse ideas", Skip/Continue, story-progress bars).
3. **Editorial** full-screen ("Elegance for the Holidays") — image bg, heading,
   "Discover the look" CTA, a row of look thumbnails.
4. **Product grid** — masonry of products with wishlist hearts (light bg).
5. **AI response** — "Crafting your answer" loader → generated cards
   ("Women's / Men's New Arrivals"), closeable.

- The prompt bar persists at the bottom throughout; the find-gift chip + corner text
  fade/collapse on scroll.

## Component transition patterns

- Header menu / cart / history panels: `clip-path .5s var(--ease-out-quint)` (expand from a corner).
- Loaders (`PromptLoader`): background clip-path + content transform + text opacity with delay.
- Widgets / modules enter: `opacity .3s var(--ease-out)`.
