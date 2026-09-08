import type { Metadata } from 'next'
import Link from 'next/link'

import BuddyFaq from '@/components/buddy/BuddyFaq'
import BuddyFeatures from '@/components/buddy/BuddyFeatures'
import BuddyPhoneForm from '@/components/buddy/BuddyPhoneForm'
import Header from '@/components/ui/header'
import { buildPageMetadata } from '@/lib/og/buildMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Buddy — Your personal AI on iMessage',
  description:
    'Buddy is a personal iMessage assistant with its own computer. Text a task, watch it browse, run commands, and use your tools — then approve what ships.',
  canonical: 'https://trooper.so/buddy',
  ogKind: 'page',
  ogSlug: 'buddy',
})

export default function BuddyPage() {
  return (
    <div className="bg-canvas">
      <Header />

      <main className="rail pb-16 pt-[calc(var(--site-header-height)+2.5rem)] sm:pb-24 sm:pt-[calc(var(--site-header-height)+3.5rem)]">
        <div className="mx-auto w-full max-w-xl">
          <p className="kicker !inline">Personal agent</p>

          <h1 className="mt-3 font-display text-[2.35rem] font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl sm:leading-[1.08]">
            Meet <span className="text-fern-700">Buddy</span>
          </h1>

          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-muted sm:text-base sm:leading-7">
            An iMessage assistant simplified for you — with a personal computer that browses,
            runs the terminal, uses your tools, and comes back for approval.
          </p>

          <div className="mt-8">
            <BuddyPhoneForm />
          </div>

          <p className="mt-4 text-[13px] text-ink-faint">
            Need a team of agents instead?{' '}
            <Link href="/?mode=multi" className="font-medium text-ink-muted underline-offset-2 hover:text-ink hover:underline">
              See Workforce
            </Link>
            .
          </p>

          <div className="mt-14 sm:mt-16">
            <BuddyFeatures />
          </div>

          <div className="mt-14 sm:mt-16">
            <BuddyFaq />
          </div>
        </div>
      </main>
    </div>
  )
}
