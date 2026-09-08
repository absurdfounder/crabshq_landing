import type { Metadata } from 'next'
import Link from 'next/link'

import BuddyFaq from '@/components/buddy/BuddyFaq'
import BuddyFeatures from '@/components/buddy/BuddyFeatures'
import BuddyPhoneForm from '@/components/buddy/BuddyPhoneForm'
import Header from '@/components/ui/header'
import { buildPageMetadata } from '@/lib/og/buildMetadata'

export const metadata: Metadata = buildPageMetadata({
  title: 'Buddy — Personal iMessage AI assistant',
  description:
    'Buddy is a personal iMessage assistant with its own computer. Text a task, watch it browse, run commands, use your tools, and approve what ships.',
  canonical: 'https://trooper.so/buddy-personal-assistant',
  ogKind: 'page',
  ogSlug: 'buddy-personal-assistant',
})

export default function BuddyPersonalAssistantPage() {
  return (
    <div className="bg-canvas">
      <Header />

      <main>
        <section className="border-b border-black/5 bg-canvas">
          <div className="rail py-12 sm:py-16 lg:py-20">
            <div className="mx-auto w-full max-w-xl">
              <p className="kicker !inline text-neutral-500">Personal agent</p>

              <h1 className="mt-3 font-display text-4xl font-medium leading-[1.08] tracking-tight text-balance text-neutral-800 sm:text-5xl">
                Meet <span className="text-fern-700">Buddy</span>
              </h1>

              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-pretty text-neutral-600 sm:text-base sm:leading-7">
                An iMessage assistant simplified for you — with a personal computer that browses,
                runs the terminal, uses your tools, and comes back for approval.
              </p>

              <div className="mt-8">
                <BuddyPhoneForm />
              </div>

              <p className="mt-4 text-[13px] text-neutral-500">
                Need a team of agents instead?{' '}
                <Link
                  href="/"
                  className="font-medium text-neutral-700 underline-offset-2 hover:text-neutral-900 hover:underline"
                >
                  See Workforce
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-black/5 bg-white">
          <div className="rail py-12 sm:py-16">
            <div className="mx-auto w-full max-w-xl">
              <BuddyFeatures />
            </div>
          </div>
        </section>

        <section className="bg-canvas">
          <div className="rail py-12 sm:py-16 lg:pb-24">
            <div className="mx-auto w-full max-w-xl">
              <BuddyFaq />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
