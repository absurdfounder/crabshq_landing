import { ogImageMeta } from '@/lib/og/url';

const homeOg = ogImageMeta('home', 'Trooper - OpenClaw AI Workforce Platform with GitHub Integration');

export const metadata = {
  metadataBase: new URL('https://trooper.so'),
  title: 'Trooper: AI Workforce Powered by OpenClaw | GitHub Integration',
  description: 'Build AI workforce teams with OpenClaw AI. Multiple AI employees execute tasks autonomously using GitHub, Gmail, browsers, and APIs. From the creators of ClawdBot and MoltBot.',
  alternates: {
    canonical: 'https://trooper.so',
  },
  openGraph: {
    title: 'Trooper: AI Workforce Platform Built on OpenClaw GitHub',
    description: 'Deploy AI workforce teams powered by OpenClaw AI. ClawdBot evolution for teams—GitHub commits, autonomous execution, persistent memory.',
    url: 'https://trooper.so',
    siteName: 'Trooper',
    images: homeOg.openGraph!.images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Trooper: OpenClaw AI Workforce for Teams',
    description: 'Scale your ClawdBot into a full AI workforce. Multiple OpenClaw AI employees working together—GitHub integration, autonomous execution.',
    site: '@trooper_so',
    images: homeOg.twitter!.images,
  },
  keywords: [
    'openclaw ai',
    'github openclaw',
    'openclaw github',
    'openclaw clawdbot',
    'clawdbot openclaw',
    'clawdbot',
    'moltbot',
    'ai workforce',
  ],
}

import Hero from '@/components/hero'
import Header from '@/components/ui/header'
import LoopRail from '@/components/LoopRail'
import { getLoopRailItems, LOOP_CATALOG_COUNT } from '@/lib/loopCatalog'
import IntegrationScroller from '@/components/IntegrationScroller'
import { getIntegrationTiles } from '@/lib/integrationScroller'
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog'
import VoicesSection from '@/components/VoicesSection'
import { getVoices } from '@/lib/voices'
import DashboardShowcaseSection from '@/components/DashboardShowcaseSection'
import OldWays from '@/components/OldWays'
import SimplePricing from '@/components/SimplePricing'
import GovernanceSection from '@/components/GovernanceSection'
import FAQ from '@/components/faq'
import FounderMessageSection from '@/components/FounderMessageSection'
import MobileChannelsSection from '@/components/MobileChannelsSection'
import DarkSplitSection from '@/components/ui/DarkSplitSection'
import SectionShell from '@/components/ui/SectionShell'

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

      {/* Orgs / action / memory / tickets, then desktop / browser / devices —
          one Capabilities rhythm, not a second section. */}
      <SectionShell rhythm eyebrowNumber="04">
        <OldWays />
      </SectionShell>

      <SectionShell
        rhythm
        eyebrow="Loops"
        eyebrowNumber="05"
        eyebrowAlign="center"
        bgClass="bg-canvas-warm"
      >
        <LoopRail items={loopRailItems} totalCount={LOOP_CATALOG_COUNT} />
      </SectionShell>

      {/* Field Comms — channels + phone pair on the page rail. */}
      <MobileChannelsSection />

      <DarkSplitSection>
        <GovernanceSection eyebrowNumber="07" />
      </DarkSplitSection>

      <SectionShell rhythm eyebrow="Deployment Plans" eyebrowNumber="08">
        <SimplePricing />
      </SectionShell>

      <SectionShell rhythm eyebrowNumber="09">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell rhythm eyebrow="Intel Brief" eyebrowNumber="10" bgClass="bg-canvas-warm">
        <FAQ />
      </SectionShell>
      </div>
    </>
  )
}
