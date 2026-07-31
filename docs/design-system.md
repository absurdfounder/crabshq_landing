# The Trooper design system

Derived from ferndesk.com, which is the same design lineage as this site — it
already shares the display face (Erode), the body face (Inter), the pixel face
(Silkscreen), the dark (`#14170f`) and the lime accent. What follows is how
those tokens are actually meant to be used.

Everything here is measured from ferndesk's shipped markup, not invented.

---

## 1. The single rule that changes everything

**Sections are horizontal bands. They have no side edges.**

A section is a full-bleed band with a background and a `border-b`. Its content
sits in a centred `max-w-7xl` column with horizontal padding. There is no
left border and no right border, ever.

```html
<section class="border-b border-black/5 bg-white">
  <div class="section-x mx-auto max-w-7xl py-12 sm:py-20"> … </div>
</section>
```

The old `.rail` drew `border-l` and `border-r` on every section — fourteen
boxed rectangles stacked down the page. That is what produced "there are so
many grids that it takes focus away" and "it feels so fucking lost". The rail
is gone.

Band separators are `border-b border-black/5` — 5% black, roughly `#0000000d`.
Not `#e8e8e5`. The line should be felt, not read.

---

## 2. Surfaces

Three background values alternate down the page, and nothing else:

| token | value | use |
|---|---|---|
| white | `#fff` | default band |
| stone-50 | `#fafaf9` | alternate band, and any recessed well |
| ink | `#14170f` | dark bands (max two per page, never adjacent) |

Two textures exist, both as a band background only, never under body copy:

- **`dot-grid`** — faint dot lattice. Used behind card grids (pricing, features).
- **`pixel-surface`** — an 8px dither ramp in a tint. Used behind product
  imagery, and on the dark band in `#0a0a0a`. Carries a `--pixel-bg` data-URI.

---

## 3. The card

One card idiom. Not a border — a ring and a shadow.

```
rounded-2xl bg-white p-6 ring-1 ring-black/5 shadow-xs sm:p-7
```

Variants:
- media card: `flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-xs`
  with a `h-52` media well on top carrying `border-b border-black/5`
- chip: `inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-700 shadow-xs ring-1 ring-black/5`
- floating badge: add `bg-white/95 backdrop-blur`

**Corners are round.** `rounded-2xl` for cards, `rounded-xl` for icon tiles,
`rounded-lg` for chips and controls, `rounded-md` for inline tags. The previous
"square everything" rule was wrong and is repealed.

**Cards never nest.** A card inside a card inside a bordered section is three
rectangles deep and reads as noise.

---

## 4. Icon tiles

Pastel tinted squares, one accent per item, cycling:

```
flex size-11 items-center justify-center rounded-xl bg-{rose|sky|amber|emerald|lime}-50
```

The icon inside is the matching `-600`. This is the only place multiple hues
are allowed; it is what stops a long feature grid reading as grey.

---

## 5. Type

| role | spec |
|---|---|
| h1 | `font-display text-4xl sm:text-5xl text-balance text-neutral-800` |
| h2 | `font-display text-4xl sm:text-5xl text-balance text-neutral-800 max-w-3xl` |
| h3 (card) | `text-base font-semibold text-neutral-800` |
| h3 (feature) | `text-lg font-semibold text-balance text-neutral-800` |
| lede | `body-text mt-4 max-w-2xl leading-relaxed text-pretty` → `text-neutral-600` |
| card body | `text-[15px] leading-relaxed text-pretty text-neutral-500` |
| small | `text-sm text-neutral-500`, `text-[13px]` |
| kicker | `kicker text-lg`, optionally `text-lime-700` |

`text-balance` on every heading. `text-pretty` on every paragraph. These are
the difference between ragging that looks considered and ragging that looks
automatic — 41 uses of the pair on ferndesk's home page alone.

Heading colour is `neutral-800`, not black. Body is `neutral-600`. Muted is
`neutral-500`. Faint is `neutral-400`.

### Kickers are phrases, not catalogue numbers

ferndesk: *"Sound familiar?"*, *"Meet Ferndesk"*, *"Batteries included"*,
*"Customers"*, *"One-click migration"*, *"Pricing"*.

This site currently prints `[01] HOW IT WORKS`, `[02] CAPABILITIES` … in a
pixel font inside a bordered chip. Numbering a marketing page like a parts
catalogue tells the reader there are nine more of these to get through. Drop
the numbers and the chip; keep the kicker as a short line of speech.

---

## 6. Buttons

Double-shell bezel. An outer gradient shell with 2px of padding, an inner
surface with its own border.

**Primary**
```html
<a class="relative flex rounded-[10px] p-0.5 duration-200 hover:scale-[1.02] active:scale-[0.98]
          bg-linear-to-b from-neutral-900 to-neutral-950 text-white">
  <span class="flex h-full w-full items-center justify-center gap-2 rounded-[8px] border
               border-neutral-700/80 bg-linear-to-b from-neutral-900 to-neutral-900
               min-h-12 px-6 py-3 text-base font-medium">
    <span class="flex items-center gap-2 whitespace-nowrap font-bold">Get started</span>
  </span>
</a>
```

**Secondary** — same shell, `ring-1 ring-black/8 border border-white bg-white shadow-xs text-neutral-600`.

**Small** — inner becomes `px-3 py-1.5 text-xs`.

Every interactive surface gets `transition-colors duration-200`. Buttons get
`hover:scale-[1.02] active:scale-[0.98]`.

---

## 7. Layout and rhythm

- Container: `mx-auto max-w-7xl` (80rem) + `section-x` padding
- `section-x` = `px-4 sm:px-6 lg:px-8`
- Section padding: `py-12 sm:py-20`. A hero or a first-of-kind gets
  `pt-16 sm:pt-32`. A tight utility band gets `py-8 sm:py-9`.
- Grid gap: `gap-5` or `gap-6`. Card grids are `md:grid-cols-3`.
- The hero is a **two-column split**, not a stacked band:
  `grid lg:min-h-[40rem] lg:grid-cols-2 lg:items-center`, copy left on
  `section-x`, product visual right on a `pixel-surface` with `lg:border-l`.
  The visual column is full-bleed to the viewport edge — it is the one thing
  allowed outside the centred column.

Under the hero CTAs, a row of three plain reassurances:
`flex flex-wrap gap-x-5 gap-y-2` → `text-sm text-neutral-500` with a small icon.

---

## 8. Page structure

ferndesk's running order, which is a better argument than ours:

1. **Promise** — h1 states the outcome in the reader's language
2. **Pain** — *"Sound familiar?"* + three specific, embarrassing moments
3. **Division of labour** — *"You build the product. Fern handles the docs."*
   plus three steps, with the agent as a named character
4. **Feature grid** — nine small cards, each with a tinted icon tile
5. **Proof** — dark band, one real customer quote, one number
6. **Objection** — the thing that stops people buying, answered
7. **Pricing** — on `dot-grid`
8. **FAQ** — two-column, headings left, accordion right
9. **Close** — the h1 repeated verbatim

Note what is absent: no capability matrix, no numbered section index, no
second navigation, no floating scroll indicator.

---

## 9. Motion

Restrained. `transition-colors duration-200` on hover states,
`transition-transform` on buttons and cards, `hover:scale-[1.02]`.

Scroll-driven rails move with the page (see `components/useScrollDrivenRail.ts`
— `animation-timeline: view()` does not run in our target browsers as measured).
Nothing animates on a timer while the reader is still.

Everything is gated on `prefers-reduced-motion`.
