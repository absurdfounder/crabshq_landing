'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

import TrooperAvatar from '@/components/ui/TrooperAvatar'
import PixelButton from '@/components/ui/PixelButton'
import { TROOPERS } from '@/lib/troopers'

/**
 * Character Builder hub — Trooper cast powered by Bible Strong procedural
 * avatars, plus a door into the full authoring studio.
 */
export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-14">
      <p className="kicker">Characters</p>
      <h1 className="h2-section mt-3 max-w-3xl">
        Build agents that look like someone, not a blob.
      </h1>
      <p className="lede max-w-2xl">
        Procedural 3D-style characters with eyes, blinks, and idle head motion.
        Pick a starting point from the Trooper cast, or open the studio and
        author your own body, expressions, and animations.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <PixelButton
          href="/character-studio/"
          size="md"
          tone="dark"
          icon={<Sparkles className="h-4 w-4" />}
        >
          Open character builder
        </PixelButton>
        <Link href="/loops" className="group link-mono">
          <span>See loops that run them</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {TROOPERS.map((trooper) => (
          <div key={trooper.handle} className="flex flex-col items-center text-center">
            <TrooperAvatar trooper={trooper} size={112} live animation="idle" />
            <p className="mt-3 font-display text-lg tracking-tight text-ink">{trooper.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-ink-muted">
              {trooper.handle}@trooper.so
            </p>
            <p className="mt-1 text-[12px] text-ink-faint">{trooper.role}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-[var(--color-line)] bg-[#fafafa] px-6 py-10 sm:px-10">
        <h2 className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
          Full studio, in the browser
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
          Shape a body from primitives, tune neutral eyes, author expressions,
          and compose looping animations. Export a runtime definition your
          agents can wear anywhere in Trooper.
        </p>
        <div className="mt-6">
          <PixelButton href="/character-studio/" size="md" tone="dark">
            Launch studio
          </PixelButton>
        </div>
      </div>
    </div>
  )
}
