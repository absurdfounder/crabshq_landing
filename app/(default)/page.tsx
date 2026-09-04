import { ogImageMeta } from '@/lib/og/url';

const homeOg = ogImageMeta('home', 'Trooper: AI teammates that ship real work');

export const metadata = {
  metadataBase: new URL('https://trooper.so'),
  title: 'Trooper: AI teammates that ship real work',
  description:
    'Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.',
  alternates: {
    canonical: 'https://trooper.so',
  },
  openGraph: {
    title: 'Trooper: AI teammates that ship real work',
    description:
      'Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.',
    url: 'https://trooper.so',
    siteName: 'Trooper',
    images: homeOg.openGraph!.images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Trooper: AI teammates that ship real work',
    description:
      'Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.',
    site: '@trooper_so',
    images: homeOg.twitter!.images,
  },
  keywords: [
    'trooper',
    'ai teammates',
    'ai employees',
    'ai workforce',
    'loop api',
    'self-host ai agents',
    'openclaw',
  ],
}

import dynamic from 'next/dynamic'
import Hero from '@/components/hero'
import Header from '@/components/ui/header'
import LoopRail from '@/components/LoopRail'
import { getLoopRailItems, LOOP_CATALOG_COUNT } from '@/lib/loopCatalog'
import IntegrationScroller from '@/components/IntegrationScroller'
import { getIntegrationTiles } from '@/lib/integrationScroller'
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog'
import VoicesSection from '@/components/VoicesSection'
import { getVoices } from '@/lib/voices'
import SimplePricing from '@/components/SimplePricing'
import GovernanceSection from '@/components/GovernanceSection'
import FAQ from '@/components/faq'
import FounderMessageSection from '@/components/FounderMessageSection'
import DarkSplitSection from '@/components/ui/DarkSplitSection'
import SectionShell from '@/components/ui/SectionShell'

const DashboardShowcaseSection = dynamic(() => import('@/components/DashboardShowcaseSection'))
const OldWays = dynamic(() => import('@/components/OldWays'))
const TrooperCastSection = dynamic(() => import('@/components/TrooperCastSection'))
const LoopApiSection = dynamic(() => import('@/components/LoopApiSection'))
const MobileChannelsSection = dynamic(() => import('@/components/MobileChannelsSection'))

export default function Home() {
  const loopRailItems = getLoopRailItems(22)
  const integrationTiles = getIntegrationTiles(36)
  const voices = getVoices()

  return (
    <>
      {/* No page-level overflow clip: it hid misalignment instead of
          preventing it. The hero keeps a local one for its rotated demo. */}
      <div>
      <div className="hero-shell bg-canvas">
        <Header />
        <Hero />
      </div>

      <DarkSplitSection>
        <VoicesSection voices={voices} eyebrowNumber="01" />
      </DarkSplitSection>

      {/* Ferndesk-style product frame: chat + board coordination after social proof.
          Owns its own section so the dither demo band can run edge-to-edge. */}
      <DashboardShowcaseSection />

      <SectionShell rhythm eyebrow="Works with everything" eyebrowNumber="03">
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
      </SectionShell>

      <SectionShell rhythm eyebrow="The cast" eyebrowNumber="04">
        <TrooperCastSection />
      </SectionShell>

      {/* Orgs / action / memory / tickets, then desktop / browser / devices —
          one Capabilities rhythm, not a second section. */}
      <SectionShell rhythm eyebrowNumber="05">
        <OldWays />
      </SectionShell>

      {/* Loop APIs — owns its own section so the dither band runs edge-to-edge. */}
      <LoopApiSection />

      <SectionShell
        rhythm
        eyebrow="Loops"
        eyebrowNumber="07"
        eyebrowAlign="center"
      >
        <LoopRail items={loopRailItems} totalCount={LOOP_CATALOG_COUNT} />
      </SectionShell>

      {/* Field Comms — channels + phone pair on the page rail. */}
      <MobileChannelsSection />

      <DarkSplitSection>
        <GovernanceSection eyebrowNumber="09" />
      </DarkSplitSection>

      <SectionShell rhythm eyebrow="Deployment Plans" eyebrowNumber="10">
        <SimplePricing />
      </SectionShell>

      <SectionShell rhythm eyebrowNumber="11">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell rhythm eyebrow="Intel Brief" eyebrowNumber="12">
        <FAQ />
      </SectionShell>
      </div>
    </>
  )
}
