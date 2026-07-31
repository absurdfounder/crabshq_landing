/** Trooper brand green #3f6b00 and derived shades */
const brandGreen = {
  DEFAULT: '#3f6b00',
  50: '#f0f5e6',
  100: '#ddebc8',
  200: '#c4d9a0',
  300: '#9db866',
  400: '#7aa824',
  500: '#3f6b00',
  600: '#385f00',
  700: '#325600',
  800: '#284800',
  900: '#1f3800',
  // 950 exists because the aliases below stand in for stock Tailwind ramps,
  // and `lime-950` is in use (TopBar). Without it the class silently vanishes.
  950: '#152600',
};

/*
 * One accent green.
 *
 * `fern` used to be a second, lighter sage (#6BA82E) running alongside
 * `trooper` (#3f6b00). Between them — plus the `emerald`/`teal` aliases below
 * and a few raw hex literals — ~17 distinct greens rendered on the home page
 * under four naming systems, and the eye had nowhere to land.
 *
 * `fern` is now an alias of the brand ramp. The key names are preserved so the
 * ~60 existing `fern-*` call sites keep compiling; only the hue changes.
 */
const fernAccent = {
  ...brandGreen,
  light: brandGreen[400],
  bright: brandGreen[400],
  check: brandGreen.DEFAULT,
  dark: brandGreen[700],
  muted: brandGreen[300],
};

/*
 * Warm neutral ramp.
 *
 * Tailwind's stock `slate` is blue-tinted (#f1f5f9, #64748b …). The page's
 * canvas is warm (#FAFAF8), so every `slate-*` call site — ~100 of them, all
 * semantically correct, meaning "hairline", "muted text", "heading ink" —
 * rendered cool against a warm surface. Two hairline colours were competing
 * head-to-head: 299 `slate-100` borders against 269 `--color-line` borders.
 *
 * Retargeting the ramp fixes the hue at every call site at once and preserves
 * the lightness ladder, so no contrast relationship shifts.
 */
const warmSlate = {
  50: '#FAFAF8',  // = canvas
  100: '#e8e8e5', // = --color-line; collapses the two-hairline split
  200: '#e0e0dc',
  300: '#cfcfc9',
  400: '#8f8f8a',
  500: '#737373', // = ink-faint
  600: '#525252', // = ink-muted
  700: '#404040',
  800: '#262626',
  900: '#1a1a1a', // = ink; collapses the h2 colour split
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fern: fernAccent,
        slate: warmSlate,
        canvas: {
          DEFAULT: '#FAFAF8',
          warm: '#F7F7F4',
          section: '#FCFCFA',
        },
        ink: {
          DEFAULT: '#1a1a1a',
          muted: '#525252',
          faint: '#737373',
        },
        split: '#14170f',
        trooper: {
          ...brandGreen,
          olive: '#6d9220',
          'olive-light': '#ddebc8',
          'olive-mid': '#c4d9a0',
          'olive-strong': '#9db866',
        },
        /*
         * `stone` is the same retarget `slate` gets, for the same reason.
         *
         * 224 call sites — nearly all of them in components/marketing/visuals
         * — reached for Tailwind's stock stone ramp, which is warm but not
         * *this* warm: stone-600 is #57534e and stone-900 #1c1917, against
         * #525252 and #1a1a1a here. Rendered side by side on one page that is
         * four neutral families (neutral, slate, stone, gray) reading as four
         * slightly different greys, which is exactly the kind of drift that
         * makes a page look assembled rather than designed.
         *
         * Aliasing fixes every call site at once and preserves the lightness
         * ladder, so no contrast relationship moves.
         */
        stone: { ...warmSlate, 950: '#0f0f0e' },
        // Frozen aliases. `emerald`, `teal` and `lime` all resolve to the brand
        // ramp so legacy subpage call sites keep working and cannot reintroduce
        // a second green. Do not use them in new code — use `trooper`.
        emerald: { ...brandGreen },
        lime: { ...brandGreen },
        gray: {
          100: '#FBFBFB',
          200: '#EAEAEA',
          300: '#DFDFDF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#666666',
          700: '#4C4C4C',
          800: '#333333',
          900: '#191919',
        },
        blue: {
          100: '#E6F0FD',
          200: '#CCE2FC',
          300: '#99C5FA',
          400: '#66A9F7',
          500: '#338CF5',
          600: '#0070F4',
          700: '#0064DA',
          800: '#0059C2',
          900: '#004391',
        },
        teal: { ...brandGreen },
      },
      boxShadow: {
        // The card elevation. Pairs with `ring-1 ring-black/5` — the ring draws
        // the edge, this lifts it off the page. It used to be
        // `0 0 0 1px rgba(0,0,0,0.16)`, i.e. a hard border wearing a shadow's
        // name, which double-drew against the ring. No call sites relied on it.
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
        default: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
      },
      spacing: {
        '9/16': '56.25%',
        '3/4': '75%',
        '1/1': '100%',
      },
      /*
       * Trooper typography (Ferndesk-aligned)
       * — font-sans / font-inter        → body, UI (Inter)
       * — font-display / font-erode     → headlines (Erode via Fontshare)
       * — font-mono                     → code, terminal, agent UI (system stack)
       * — font-brand / font-silkscreen  → section kickers, logo wordmark
       * Utilities: type-h1, type-h2, type-body, type-caption, type-label, type-code, kicker
       */
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-erode)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        brand: ['var(--font-silkscreen)', 'monospace'],
        inter: ['var(--font-inter)', 'sans-serif'],
        erode: ['var(--font-erode)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        funneldisplay: ['var(--font-erode)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        silkscreen: ['var(--font-silkscreen)', 'monospace'],
      },
      /*
       * The type ramp is stock Tailwind, and the pairs are the point.
       *
       * This block used to be ten bare strings. Two things followed from that.
       * First, the sizes drifted off the reference design's scale — `3xl` was
       * 2rem against 1.875, `4xl` 2.625 against 2.25, `5xl` 3.25 against 3, and
       * `6xl` 5.5rem against 3.75, so the hero headline rendered at 88px where
       * the reference sets 48. Second, and worse: a bare string emits
       * `font-size` with **no** `line-height`, so every `text-sm`/`text-base`
       * on the site inherited leading from whatever ancestor last set it. A
       * census of the home page found 14px running at 21px, 19.25px and 19.2px
       * in three different places, and 12px at 19.5px, 19.2px and 18px. That is
       * the mechanism behind "the text size" reading as wrong: not one bad
       * value, but the same value set six ways.
       *
       * Restoring the stock pairs fixes both at once and costs no call sites —
       * `text-4xl` still means "the fourth step up", it just lands where the
       * reference puts it.
       */
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      inset: {
        '1/2': '50%',
        'full': '100%',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.2rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      /*
       * Page measure.
       *
       * `max-w-7xl` is the shared rail used by SectionShell, the hero,
       * DarkSplitSection, the header and the footer — ~100 call sites.
       * Overriding the token rather than editing those keeps every rail aligned
       * (a narrowed section next to a full-width dark band would visibly step in
       * and out) and keeps the change to one line.
       *
       * This was 72rem, on the claim that it tightened the measure "without
       * squeezing the 4-column board in the hero demo". It squeezed it. The demo
       * is a fixed 1600px canvas scaled by min(1, width/1600); at 72rem it had
       * 1022px to work with and rendered at 0.64x, so 14px card titles came out
       * around 9px. 80rem gives it 1278px once the band bleeds to the hairlines
       * — 0.80x. It also gives the header enough room to stop overflowing.
       *
       * 80rem is Tailwind's stock value, so this key now only documents intent.
       */
      maxWidth: {
        '7xl': '80rem',
      },
      minWidth: {
        '10': '2.5rem',
        '48': '12rem',
      },
      opacity: {
        '90': '0.9',
      },
      scale: {
        '98': '.98'
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)', },
          '50%': { transform: 'translateY(-5%)', },
        },
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
