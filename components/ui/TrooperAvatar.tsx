'use client'

import { createElement, useEffect, useState } from 'react'
import { Avatar as BsAvatar } from '@bible-strong/avatar-react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import '@bible-strong/avatar-react/styles.css'

import { getTrooperAvatar } from '@/lib/avatars'
import type { Trooper } from '@/lib/troopers'
import TrooperMark from '@/components/ui/TrooperMark'

type TrooperAvatarProps = {
  trooper: Trooper
  size?: number
  className?: string
  /**
   * When true, mounts the procedural avatar and plays only while this
   * element is on screen. Default is the static SVG mark — cheap, no RAF.
   */
  live?: boolean
  /** Animation key used only when `live` and in view. */
  animation?: string
  label?: string
}

/**
 * Cast identity.
 *
 * Default: static SVG snapshot from the character builder (`/images/cast/*.svg`)
 * — no RAF, low memory. `live`: procedural avatar only while in view.
 */
export default function TrooperAvatar({
  trooper,
  size = 40,
  className = '',
  live = false,
  animation = 'idle',
  label,
}: TrooperAvatarProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { amount: 0.4, once: live ? undefined : true })
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    if (!live) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [live])

  const definition = getTrooperAvatar(trooper.handle)
  const shouldAnimate = live && !!definition && inView && !reduceMotion

  if (!shouldAnimate) {
    return (
      <span ref={ref} className={`inline-flex shrink-0 ${className}`}>
        <TrooperMark trooper={trooper} size={size} />
      </span>
    )
  }

  return (
    <span
      ref={ref}
      className={`inline-flex shrink-0 items-center justify-center overflow-visible ${className}`}
      style={{ width: size, height: size }}
    >
      {createElement(BsAvatar as never, {
        key: `${trooper.handle}-${animation}`,
        definition,
        defaultAnimation: animation,
        size,
        ariaLabel: label ?? `${trooper.name} avatar`,
      })}
    </span>
  )
}
