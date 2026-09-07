'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

import LiveAvatarPreview from '@/components/character-builder/LiveAvatarPreview'
import { assembleAvatarDefinition } from '@/lib/avatars/assembleAvatar'
import { getCharacterPreset } from '@/lib/avatars/characterCatalog'

/**
 * Soft blob silhouettes as letter-O replacements.
 * Colors match `text-neutral-200` so faces read as type, not stickers.
 */
const LETTER_INK = '#e5e5e5' // tailwind neutral-200
const LETTER_INK_DIM = '#d4d4d8' // slight second-O variation, still letter-family
const EYE_INK = '#a1a1aa' // neutral-400 — visible on light fills

const GLYPHS = [
  { presetId: 'strobi', body: LETTER_INK, animation: 'idle' },
  { presetId: 'cubee', body: LETTER_INK_DIM, animation: 'curious' },
] as const

function useEmPixels(host: HTMLElement | null, em: number) {
  const [px, setPx] = useState(48)

  useEffect(() => {
    if (!host) return
    const sync = () => {
      const fs = parseFloat(getComputedStyle(host).fontSize) || 48
      setPx(Math.max(24, Math.round(fs * em)))
    }
    sync()
    const ro = new ResizeObserver(sync)
    ro.observe(host)
    return () => ro.disconnect()
  }, [host, em])

  return px
}

/** Static letter-colored O — off-screen / reduced-motion. */
function LetterOFallback({ size, body }: { size: number; body: string }) {
  const eye = Math.max(3, Math.round(size * 0.1))
  const gap = Math.max(3, Math.round(size * 0.12))

  return (
    <span
      className="relative inline-block rounded-full"
      style={{
        width: size,
        height: size,
        background: body,
      }}
    >
      <span
        className="absolute left-1/2 top-[52%] flex -translate-x-1/2 -translate-y-1/2"
        style={{ gap }}
      >
        <span
          className="rounded-full"
          style={{ width: eye, height: Math.round(eye * 1.25), background: EYE_INK }}
        />
        <span
          className="rounded-full"
          style={{ width: eye, height: Math.round(eye * 1.25), background: EYE_INK }}
        />
      </span>
    </span>
  )
}

function FooterLiveO({
  presetId,
  body,
  animation,
  size,
  active,
}: {
  presetId: string
  body: string
  animation: string
  size: number
  active: boolean
}) {
  const definition = useMemo(() => {
    const preset = getCharacterPreset(presetId)
    if (!preset) return null
    return assembleAvatarDefinition({
      name: `footer-${presetId}`,
      preset,
      colors: { body, eyes: EYE_INK },
    })
  }, [presetId, body])

  if (!definition || !active) {
    return <LetterOFallback size={size} body={body} />
  }

  return (
    <LiveAvatarPreview
      definition={definition}
      size={size}
      animation={animation}
      label=""
      className="!overflow-visible"
    />
  )
}

/**
 * Giant footer watermark: “tr” + two live letter-O faces + “per.”
 * Faces share the letter color (no bobbing) so they read as type, not stickers.
 */
export default function FooterWordmark() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [host, setHost] = useState<HTMLElement | null>(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const nearFooter = useInView(rootRef, { amount: 0.01, margin: '40% 0px' })
  const live = nearFooter && !reduceMotion

  useEffect(() => {
    setHost(rootRef.current)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Match lowercase x-height; sit on the typographic baseline (not vertically centered).
  const glyphSize = useEmPixels(host, 0.72)

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none flex select-none items-baseline justify-center gap-[0.02em] overflow-x-hidden whitespace-nowrap font-display text-[clamp(2.75rem,16vw,11rem)] font-medium lowercase leading-none tracking-[-0.045em] text-neutral-200"
    >
      <span>tr</span>
      <span
        className="inline-flex items-baseline"
        style={{ gap: '0.06em', marginInline: '0.02em' }}
      >
        {GLYPHS.map((g, i) => (
          <span
            key={g.presetId}
            className="relative inline-flex shrink-0"
            style={{
              width: glyphSize,
              height: glyphSize,
              // Pull faces down onto the letter baseline (inline replaced boxes sit high otherwise).
              transform: 'translateY(0.12em)',
              marginLeft: i === 1 ? '-0.1em' : 0,
              zIndex: GLYPHS.length - i,
            }}
          >
            <FooterLiveO
              presetId={g.presetId}
              body={g.body}
              animation={g.animation}
              size={glyphSize}
              active={live}
            />
          </span>
        ))}
      </span>
      <span>per.</span>
    </div>
  )
}
