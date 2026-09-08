'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import BuddyMessagePhone from '@/components/buddy/BuddyMessagePhone'
import BuddyPhoneForm from '@/components/buddy/BuddyPhoneForm'
import PixelDitherGradient from '@/components/ui/PixelDitherGradient'

const ease = [0.22, 1, 0.36, 1] as const
const TRUST = ['Free to start', 'Your keys stay yours', 'Full computer, not just chat'] as const

/**
 * Poke-style messaging hero, Trooper layout: copy + signup left, Field Comms phone right.
 */
export default function BuddyHero() {
  return (
    <section className="site-header-clear bg-canvas">
      <div className="rail relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <PixelDitherGradient variant="warm" className="opacity-55" />
          <div className="absolute inset-0 bg-canvas/60" />
        </div>

        <div className="relative z-10 grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:py-20 xl:gap-16">
          <motion.div
            className="w-full min-w-0 text-left"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="kicker mb-3 !inline">Personal agent</p>
            <h1 className="h1-hero text-balance">
              Meet Buddy.
              <span className="mt-1 block text-neutral-800">
                Your new favorite <span className="text-fern-700">contact.</span>
              </span>
            </h1>
            <p className="lede !mt-4 max-w-md">
              Proactive, private, personal — right in your iMessage. Buddy runs a real computer:
              browser, terminal, tools, and approvals when it needs you.
            </p>

            <div className="mt-8 max-w-md">
              <BuddyPhoneForm />
            </div>

            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2" aria-label="Buddy highlights">
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <Check className="h-3.5 w-3.5 shrink-0 text-fern-600" strokeWidth={2.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-5 text-[13px] text-neutral-500">
              Need a team of agents instead?{' '}
              <Link
                href="/"
                className="font-medium text-neutral-700 underline-offset-2 hover:text-neutral-900 hover:underline"
              >
                See Workforce
              </Link>
              .
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease }}
          >
            <BuddyMessagePhone />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
