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
import BrowserCapabilitySection from '@/components/BrowserCapabilitySection'
import OldWays from '@/components/OldWays'
import FloatingScrollIndicator from '@/components/FloatingScrollIndicator'
import SimplePricing from '@/components/SimplePricing'
import GovernanceSection from '@/components/GovernanceSection'
import FAQ from '@/components/faq'
import FounderMessageSection from '@/components/FounderMessageSection'
import MobileChannelsSection from '@/components/MobileChannelsSection'
import YcQuoteSection from '@/components/YcQuoteSection'
import DarkSplitSection from '@/components/ui/DarkSplitSection'
import SectionShell from '@/components/ui/SectionShell'

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
      <FloatingScrollIndicator />
      <div className="hero-shell bg-canvas">
        <Header />
        <Hero />
      </div>

      <DarkSplitSection>
        <YcQuoteSection />
      </DarkSplitSection>

      <SectionShell eyebrow="How It Works" eyebrowNumber="02">
        <HowItWorksSteps />
      </SectionShell>

      <BrowserCapabilitySection />

      <SectionShell eyebrow="Capabilities" eyebrowNumber="03">
        <OldWays />
      </SectionShell>

      <DarkSplitSection innerClassName="bg-gray-900">
        <MobileChannelsSection />
      </DarkSplitSection>

      <SectionShell eyebrow="Governance" eyebrowNumber="05">
        <GovernanceSection />
      </SectionShell>

      <SectionShell eyebrow="Deployment Plans" eyebrowNumber="06">
        <SimplePricing />
      </SectionShell>

      <SectionShell eyebrow="Message from the founder" eyebrowNumber="07">
        <FounderMessageSection />
      </SectionShell>

      <SectionShell eyebrow="Intel Brief" eyebrowNumber="08" bgClass="bg-canvas-warm">
        <FAQ />
      </SectionShell>
      </div>
    </>
  )
}
