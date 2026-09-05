# Gumloop exact mirror (lab)

Internal design-reference capture of [gumloop.com](https://www.gumloop.com/).

## What’s here

| Path | Contents |
|------|----------|
| `public/lab/gumloop-exact/` | Static SSR HTML + CSS + fonts served at `/lab/gumloop-exact/` |
| `lab-assets/gumloop/page.ssr.html` | Raw SSR snapshot |
| `lab-assets/gumloop/css/` | Copied CSS chunks |
| `lab-assets/gumloop/keyframes.css` | Extracted `@keyframes` |
| `lab-assets/gumloop/MANIFEST.json` | CSS + JS asset URL list |
| `lab-assets/gumloop/tokens-extract.css` | Color/font CSS variables sample |

## View

- In-app iframe: `/lab/gumloop/exact`
- Fullscreen static: `/lab/gumloop-exact/index.html`

## Re-fetch

```bash
node scripts/fetch-gumloop-exact.mjs
```

JS bundles are **listed** in the manifest only (not vendored). Interactive bits need the live site; this mirror is for layout, type, color, and SVG structure.
