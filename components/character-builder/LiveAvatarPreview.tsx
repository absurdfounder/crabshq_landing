'use client'

import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { Avatar as BsAvatar } from '@bible-strong/avatar-react'
import '@bible-strong/avatar-react/styles.css'

type LiveAvatarPreviewProps = {
  definition: unknown
  size?: number
  animation?: string
  label?: string
  className?: string
  /** Enable click-drag to tilt the head (studio-style look-around). */
  interactiveLook?: boolean
}

type HeadLook = { x: number; y: number }

const LOOK_LIMIT = 32

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

/** Bake head tilt into every expression so drag-look survives animation playback. */
function applyHeadLook(definition: unknown, look: HeadLook): unknown {
  if (!definition || (!look.x && !look.y)) return definition
  const def = definition as {
    expressions?: Record<string, { head?: { x?: number; y?: number; z?: number } }>
  }
  if (!def.expressions) return definition
  const expressions: typeof def.expressions = {}
  for (const [key, expr] of Object.entries(def.expressions)) {
    expressions[key] = {
      ...expr,
      head: {
        x: (expr.head?.x ?? 0) + look.x,
        y: (expr.head?.y ?? 0) + look.y,
        z: expr.head?.z ?? 0,
      },
    }
  }
  return { ...def, expressions }
}

/**
 * Live procedural preview for an assembled avatar definition.
 * Optional drag-to-look mirrors the advanced studio surface drag.
 */
export default function LiveAvatarPreview({
  definition,
  size = 160,
  animation = 'idle',
  label = 'Avatar preview',
  className = '',
  interactiveLook = false,
}: LiveAvatarPreviewProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [look, setLook] = useState<HeadLook>({ x: 0, y: 0 })
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    origin: HeadLook
  } | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // Reset look when the character/theme changes.
  useEffect(() => {
    setLook({ x: 0, y: 0 })
  }, [definition])

  const posed = useMemo(() => applyHeadLook(definition, look), [definition, look])

  if (!posed) return null

  const def = posed as {
    name?: string
    colors?: { body?: string; eyes?: string }
    body?: { primary?: { type?: string } }
  }
  const lookKey = [
    def.name,
    def.body?.primary?.type,
    def.colors?.body,
    def.colors?.eyes,
    animation,
    reduceMotion ? 'static' : 'live',
  ].join(':')

  const onPointerDown = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!interactiveLook || (e.pointerType === 'mouse' && e.button !== 0)) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: look,
    }
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLSpanElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== e.pointerId) return
    const dx = e.clientX - drag.startX
    const dy = e.clientY - drag.startY
    // Horizontal drag → yaw (head.y), vertical → pitch (head.x)
    setLook({
      x: clamp(drag.origin.x - dy * 0.18, -LOOK_LIMIT, LOOK_LIMIT),
      y: clamp(drag.origin.y + dx * 0.22, -LOOK_LIMIT, LOOK_LIMIT),
    })
  }

  const onPointerUp = (e: ReactPointerEvent<HTMLSpanElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== e.pointerId) return
    dragRef.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-visible ${
        interactiveLook ? 'cursor-grab touch-none active:cursor-grabbing' : ''
      } ${className}`}
      style={{ width: size, height: size }}
      onPointerDown={interactiveLook ? onPointerDown : undefined}
      onPointerMove={interactiveLook ? onPointerMove : undefined}
      onPointerUp={interactiveLook ? onPointerUp : undefined}
      onPointerCancel={interactiveLook ? onPointerUp : undefined}
      role={interactiveLook ? 'img' : undefined}
      aria-label={interactiveLook ? `${label}. Drag to look around.` : undefined}
    >
      {createElement(BsAvatar as never, {
        // Remount on look so definition head offsets apply (Avatar caches definition).
        key: `${lookKey}:${look.x.toFixed(0)}:${look.y.toFixed(0)}`,
        definition: posed,
        defaultAnimation: reduceMotion ? undefined : animation,
        size,
        ariaLabel: label,
      })}
    </span>
  )
}
