/**
 * Ready-made look themes for the simple character builder.
 * Each theme ships a 5-slot body palette so a virtual team reads as one set.
 */

export type CharacterThemeId = 'pastel' | 'neon' | 'soft' | 'mono' | 'vivid'

export type CharacterTheme = {
  id: CharacterThemeId
  name: string
  blurb: string
  /** Preferred eye fill — may be overridden for contrast against a dark/light body. */
  eyes: string
  /** Body fills for team slots 0…n (cycles if more slots). */
  bodies: readonly string[]
  /** Swatch shown on the theme chip. */
  swatch: string
}

const LIGHT_EYES = '#f4f4f5'
const DARK_EYES = '#18181b'

/** Relative luminance of a #RRGGBB (or #RGB) color. */
export function hexLuminance(hex: string): number {
  const raw = hex.replace('#', '').trim()
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map((c) => c + c)
          .join('')
      : raw
  if (full.length < 6) return 0.5
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Pick an eye color that stays readable on the body fill. */
export function contrastingEyes(body: string, preferredEyes: string): string {
  const bodyLum = hexLuminance(body)
  const preferredLum = hexLuminance(preferredEyes)
  if (Math.abs(bodyLum - preferredLum) >= 0.35) return preferredEyes
  return bodyLum < 0.5 ? LIGHT_EYES : DARK_EYES
}

export const CHARACTER_THEMES: readonly CharacterTheme[] = [
  {
    id: 'pastel',
    name: 'Pastel',
    blurb: 'Soft jelly fills — paper-friendly and Disney-ish.',
    eyes: '#3f3f46',
    bodies: ['#6bcf8e', '#7ebef0', '#f0b45c', '#b49aef', '#f0a0bc'],
    swatch: '#6bcf8e',
  },
  {
    id: 'neon',
    name: 'Neon',
    blurb: 'Electric fills with dark eyes — nightlife energy.',
    eyes: '#0a0a0a',
    bodies: ['#39ff14', '#00f0ff', '#ff2bd6', '#ffe600', '#ff6b00'],
    swatch: '#00f0ff',
  },
  {
    id: 'soft',
    name: 'Soft',
    blurb: 'Muted cream-and-sky — calm desk crew.',
    eyes: '#3f3f46',
    bodies: ['#a8c5b0', '#a9c4d8', '#d4b896', '#c4b5d8', '#d8a8b8'],
    swatch: '#a9c4d8',
  },
  {
    id: 'mono',
    name: 'Mono',
    blurb: 'Grayscale troop — light eyes on dark fills so faces stay visible.',
    eyes: '#18181b',
    // Avoid near-black fills that swallow faces; eyes still auto-contrast.
    bodies: ['#3f3f46', '#5c5c66', '#8a8a93', '#b8b8bf', '#e4e4e7'],
    swatch: '#8a8a93',
  },
  {
    id: 'vivid',
    name: 'Vivid',
    blurb: 'Saturated brand colors without going neon.',
    eyes: '#1a1a1a',
    bodies: ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899'],
    swatch: '#3b82f6',
  },
] as const

export function getCharacterTheme(id: string): CharacterTheme {
  return CHARACTER_THEMES.find((t) => t.id === id) ?? CHARACTER_THEMES[0]
}

export function themeColorsForSlot(theme: CharacterTheme, slotIndex: number) {
  const body = theme.bodies[slotIndex % theme.bodies.length]
  // Mono is silhouette-first — always pick cream vs charcoal so eyes never vanish.
  if (theme.id === 'mono') {
    return {
      body,
      eyes: hexLuminance(body) < 0.55 ? LIGHT_EYES : DARK_EYES,
    }
  }
  return { body, eyes: contrastingEyes(body, theme.eyes) }
}
