'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import BuddyAtmosphere from '@/components/buddy/BuddyAtmosphere'
import BuddyMessagePhone from '@/components/buddy/BuddyMessagePhone'
import BuddyPhoneForm from '@/components/buddy/BuddyPhoneForm'

const ease = [0.22, 1, 0.36, 1] as const
const TRUST = ['Free to start', 'Your keys stay yours', 'Full computer, not just chat'] as const

/**
 * Poke-style messaging hero: soft atmosphere that fades to white, Trooper type + Field Comms phone.
 */
export default function BuddyHero() {
  return (
    <section className="site-header-clear relative isolate overflow-hidden bg-white">
      <BuddyAtmosphere />

      {/* Tall hero so the bottom fade has room before features */}
      <div className="rail relative z-10 pb-24 pt-10 sm:pb-32 sm:pt-14 lg:pb-40 lg:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
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

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Buddy highlights">
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm text-neutral-600">
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-fern-600"
                    strokeWidth={2.5}
                    aria-hidden
                  />
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
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {/* Soft glow under the phone */}
            <div
              className="pointer-events-none absolute bottom-[8%] left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl lg:left-auto lg:right-[18%] lg:translate-x-0"
              aria-hidden
            />
            <BuddyMessagePhone className="relative" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
