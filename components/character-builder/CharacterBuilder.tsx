'use client'

import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import { Check } from 'lucide-react'

import LiveAvatarPreview from '@/components/character-builder/LiveAvatarPreview'
import { assembleAvatarDefinition } from '@/lib/avatars/assembleAvatar'
import {
  CHARACTER_CATEGORIES,
  CHARACTER_PRESETS,
  getCharacterPreset,
  presetsByCategory,
  type CharacterPreset,
  type CharacterPresetCategory,
} from '@/lib/avatars/characterCatalog'
import {
  CHARACTER_THEMES,
  getCharacterTheme,
  themeColorsForSlot,
  type CharacterThemeId,
} from '@/lib/avatars/characterThemes'

type BuilderLook = {
  themeId: CharacterThemeId
  presetId: string
}

const STORAGE_KEY = 'trooper.character-builder.v2'

function defaultLook(): BuilderLook {
  return {
    themeId: 'pastel',
    presetId: CHARACTER_PRESETS[0]?.id ?? 'mickey',
  }
}

function loadLook(): BuilderLook {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultLook()
    const parsed = JSON.parse(raw) as Partial<BuilderLook>
    const themeId = CHARACTER_THEMES.some((t) => t.id === parsed.themeId)
      ? (parsed.themeId as CharacterThemeId)
      : 'pastel'
    const presetId =
      parsed.presetId && getCharacterPreset(parsed.presetId)
        ? parsed.presetId
        : defaultLook().presetId
    return { themeId, presetId }
  } catch {
    return defaultLook()
  }
}

function saveLook(look: BuilderLook) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(look))
  } catch {
    /* ignore */
  }
}

function updateLook(
  setLook: Dispatch<SetStateAction<BuilderLook>>,
  patch: Partial<BuilderLook> | ((prev: BuilderLook) => BuilderLook),
) {
  setLook((prev) => {
    const next = typeof patch === 'function' ? patch(prev) : { ...prev, ...patch }
    saveLook(next)
    return next
  })
}

/**
 * Simple character builder — theme + ready-made characters.
 * Grid shows live characters (not abstract shapes). Preview lists every animation.
 */
export default function CharacterBuilder() {
  const [look, setLook] = useState<BuilderLook>(defaultLook)
  const [category, setCategory] = useState<CharacterPresetCategory | 'all'>('all')
  const [animation, setAnimation] = useState('idle')

  useEffect(() => {
    setLook(loadLook())
  }, [])

  const theme = getCharacterTheme(look.themeId)
  const preset = getCharacterPreset(look.presetId) ?? CHARACTER_PRESETS[0]
  const presetIndex = Math.max(
    0,
    CHARACTER_PRESETS.findIndex((p) => p.id === preset.id),
  )
  const colors = themeColorsForSlot(theme, presetIndex)

  const definition = useMemo(
    () =>
      assembleAvatarDefinition({
        name: preset.name,
        preset,
        colors,
      }),
    [preset, colors.body, colors.eyes],
  )

  const filtered = presetsByCategory(category)
  const animations = definition.animationOrder
  const expressionCount = definition.expressionOrder.length

  useEffect(() => {
    if (!animations.includes(animation)) setAnimation(animations[0] ?? 'idle')
  }, [animations, animation])

  return (
    <div className="pb-16 pt-8 sm:pb-20 sm:pt-10">
      <p className="kicker">Character builder</p>
      <h1 className="h2-section mt-3 max-w-3xl">Decide how your virtual team looks.</h1>
      <p className="lede mt-3 max-w-2xl">
        Pick a theme style, then a ready-made character. Every pick includes the full expression and
        animation catalog — drag the preview to look around.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
              Theme style
            </h2>
            <p className="mt-1 text-[14px] text-ink-muted">
              One palette for the whole crew — pastel, neon, and more.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {CHARACTER_THEMES.map((t) => {
                const selected = t.id === look.themeId
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => updateLook(setLook, { themeId: t.id })}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-medium transition ${
                      selected
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-white text-ink ring-1 ring-black/5 hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="size-3.5 rounded-full ring-1 ring-black/10"
                      style={{ backgroundColor: t.swatch }}
                      aria-hidden
                    />
                    {t.name}
                    {selected ? <Check className="size-3.5 opacity-80" aria-hidden /> : null}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-[13px] text-ink-faint">{theme.blurb}</p>
          </section>

          <section>
            <h2 className="font-display text-xl tracking-tight text-ink sm:text-2xl">
              Characters
            </h2>
            <p className="mt-1 text-[14px] text-ink-muted">
              Soft Disney-ish looks, classic characters, and simple bodies — pick one.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {CHARACTER_CATEGORIES.map((c) => {
                const selected = c.id === category
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCategory(c.id)}
                    className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                      selected
                        ? 'bg-ink text-white'
                        : 'bg-stone-100 text-ink-muted hover:bg-stone-200/80'
                    }`}
                  >
                    {c.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {filtered.map((p) => {
                const selected = p.id === preset.id
                const cardColors = themeColorsForSlot(
                  theme,
                  CHARACTER_PRESETS.findIndex((x) => x.id === p.id),
                )
                return (
                  <CharacterCard
                    key={p.id}
                    preset={p}
                    colors={cardColors}
                    selected={selected}
                    onSelect={() => updateLook(setLook, { presetId: p.id })}
                    // Only the selected card runs a non-idle loop — keeps the grid light.
                    animation={selected ? animation : 'idle'}
                    liveMotion={selected}
                  />
                )
              })}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl bg-stone-50 px-5 py-6 ring-1 ring-black/5">
            <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
              Preview · {preset.name}
            </p>
            <div className="mt-4 flex justify-center">
              <div
                className="flex size-[200px] items-center justify-center rounded-2xl bg-white ring-1 ring-black/5"
                style={{ backgroundColor: `${colors.body}18` }}
              >
                <LiveAvatarPreview
                  definition={definition}
                  size={168}
                  animation={animation}
                  label={`${preset.name} preview`}
                  interactiveLook
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[13px] text-ink-muted">
              {preset.name} · {theme.name}
            </p>
            <p className="mt-1 text-center text-[11px] text-ink-faint">Drag to look around</p>

            <p className="mt-5 text-[11px] font-medium uppercase tracking-wider text-ink-faint">
              Animations · {animations.length}
            </p>
            <div className="mt-2 flex max-h-[11rem] flex-wrap gap-1.5 overflow-y-auto">
              {animations.map((a) => {
                const selected = a === animation
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAnimation(a)}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium capitalize transition ${
                      selected
                        ? 'bg-ink text-white'
                        : 'bg-white text-ink-muted ring-1 ring-black/5 hover:text-ink'
                    }`}
                  >
                    {a}
                  </button>
                )
              })}
            </div>

            <ul className="mt-5 space-y-1.5 text-[12px] text-ink-muted">
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-600" aria-hidden />
                {expressionCount} expressions included
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-600" aria-hidden />
                {animations.length} animations included
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-3.5 text-emerald-600" aria-hidden />
                Saved in this browser
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}

function CharacterCard({
  preset,
  colors,
  selected,
  onSelect,
  animation,
  liveMotion,
}: {
  preset: CharacterPreset
  colors: { body: string; eyes: string }
  selected: boolean
  onSelect: () => void
  animation: string
  liveMotion: boolean
}) {
  const definition = useMemo(
    () =>
      assembleAvatarDefinition({
        name: preset.name,
        preset,
        colors,
      }),
    [preset, colors.body, colors.eyes],
  )

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex flex-col items-center rounded-2xl bg-white px-3 py-4 text-center transition ring-1 ${
        selected ? 'ring-2 ring-ink shadow-sm' : 'ring-black/5 hover:ring-black/10'
      }`}
    >
      <div
        className={`flex size-[76px] items-center justify-center rounded-xl ${
          selected ? 'bg-stone-100' : 'bg-stone-50'
        }`}
        style={selected ? { backgroundColor: `${colors.body}22` } : undefined}
      >
        <LiveAvatarPreview
          definition={definition}
          size={64}
          animation={liveMotion ? animation : 'idle'}
          label={preset.name}
        />
      </div>
      <span className="mt-2 font-display text-[15px] tracking-tight text-ink">{preset.name}</span>
      <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-faint">
        {preset.blurb}
      </span>
    </button>
  )
}
