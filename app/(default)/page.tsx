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
import HowItWorksSteps from '@/components/HowItWorksSteps'
import LoopRail from '@/components/LoopRail'
import { getLoopRailItems, LOOP_CATALOG_COUNT } from '@/lib/loopCatalog'
import IntegrationScroller from '@/components/IntegrationScroller'
import { getIntegrationTiles } from '@/lib/integrationScroller'
import { PLUGIN_CATALOG_COUNT } from '@/lib/pluginCatalog'
import VoicesSection from '@/components/VoicesSection'
import { getVoices } from '@/lib/voices'
import OldWays from '@/components/OldWays'
import SimplePricing from '@/components/SimplePricing'
import GovernanceSection from '@/components/GovernanceSection'
import FAQ from '@/components/faq'
import FounderMessageSection from '@/components/FounderMessageSection'
import MobileChannelsSection from '@/components/MobileChannelsSection'
import DarkSplitSection from '@/components/ui/DarkSplitSection'
import SectionShell from '@/components/ui/SectionShell'

export default function Home() {
  const loopRailItems = getLoopRailItems(9)
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

      <SectionShell rhythm eyebrow="How It Works" eyebrowNumber="02">
        <HowItWorksSteps />
      </SectionShell>

      <SectionShell rhythm eyebrow="Capabilities" eyebrowNumber="03">
        <OldWays />
      </SectionShell>

      {/* Works with everything: what it connects to (scroll-driven rails over
          the real plugin catalog), then what it does (the loop rail). */}
      <SectionShell rhythm eyebrow="Works with everything" eyebrowNumber="04" bgClass="bg-canvas-warm">
        <IntegrationScroller tiles={integrationTiles} totalCount={PLUGIN_CATALOG_COUNT} />
        <div className="mt-12 border-t border-[var(--color-line)] pt-10 md:mt-16 md:pt-12">
          <LoopRail items={loopRailItems} totalCount={LOOP_CATALOG_COUNT} />
        </div>
      </SectionShell>

      {/* Two dark bands in a row, both bg-split — they read as one continuous
          surface instead of meeting at a visible seam. */}
      <DarkSplitSection>
        <MobileChannelsSection />
      </DarkSplitSection>

      <DarkSplitSection>
        <GovernanceSection eyebrowNumber="06" />
      </DarkSplitSection>

      <SectionShell rhythm eyebrow="Deployment Plans" eyebrowNumber="07">
        <SimplePricing />
      </SectionShell>

      <SectionShell rhythm eyebrow="Message from the founder" eyebrowNumber="08">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell rhythm eyebrow="Intel Brief" eyebrowNumber="09" bgClass="bg-canvas-warm">
        <FAQ />
      </SectionShell>
      </div>
    </>
  )
}
