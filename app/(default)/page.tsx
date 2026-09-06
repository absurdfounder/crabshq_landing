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
const LoopApiSection = dynamic(() => import('@/components/LoopApiSection'))
const MobileChannelsSection = dynamic(() => import('@/components/MobileChannelsSection'))
const CompanyBrainSection = dynamic(() => import('@/components/CompanyBrainSection'))
const OptimizeAgentsSection = dynamic(() => import('@/components/OptimizeAgentsSection'))

export default function Home() {
  const loopRailItems = getLoopRailItems(8)
  const integrationTiles = getIntegrationTiles(36)
  const voices = getVoices()

  return (
    <>
      {/* overflow-x-clip stops one misbehaving absolute child from widening the page
          (same pattern Gumloop/Cursor use) without creating a sticky-breaking scrollport. */}
      <div className="overflow-x-clip">
      <div className="hero-shell bg-canvas">
        <Header />
        <Hero />
      </div>

      <DarkSplitSection>
        <VoicesSection voices={voices} />
      </DarkSplitSection>

      {/* Ferndesk-style product frame: chat + board coordination after social proof.
          Owns its own section so the dither demo band can run edge-to-edge. */}
      <DashboardShowcaseSection />

      <SectionShell rhythm>
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
      </SectionShell>

      <SectionShell rhythm>
        <CompanyBrainSection />
      </SectionShell>

      {/* Orgs / action / memory / workflows / surfaces */}
      <SectionShell rhythm>
        <OldWays />
      </SectionShell>

      <SectionShell rhythm>
        <OptimizeAgentsSection />
      </SectionShell>

      {/* Loop APIs — owns its own section so the dither band runs edge-to-edge. */}
      <LoopApiSection />

      <SectionShell rhythm>
        <LoopRail items={loopRailItems} totalCount={LOOP_CATALOG_COUNT} />
      </SectionShell>

      {/* Field Comms — channels + phone pair on the page rail. */}
      <MobileChannelsSection />

      <DarkSplitSection>
        <GovernanceSection />
      </DarkSplitSection>

      <SectionShell rhythm>
        <SimplePricing />
      </SectionShell>

      <SectionShell rhythm>
        <FounderMessageSection />
      </SectionShell>

      <SectionShell rhythm>
        <FAQ />
      </SectionShell>
      </div>
    </>
  )
}
