import type { Metadata } from 'next'

import BuddyFaq from '@/components/buddy/BuddyFaq'
import BuddyFeatures from '@/components/buddy/BuddyFeatures'
import BuddyHero from '@/components/buddy/BuddyHero'
import Header from '@/components/ui/header'
import SectionShell from '@/components/ui/SectionShell'
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
    <div className="bg-white">
      <Header />
      <BuddyHero />

      {/* Pull features up into the fade so the hero dissolves into content */}
      <div className="relative z-10 -mt-4 bg-white sm:-mt-8">
        <SectionShell rhythm noBorder bgClass="bg-white">
          <BuddyFeatures />
        </SectionShell>
      </div>

      <SectionShell rhythm bgClass="bg-white">
        <BuddyFaq />
      </SectionShell>
    </div>
  )
}
