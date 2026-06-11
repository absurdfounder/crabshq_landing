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
    images: [
      {
        url: "https://dazzling-cat.netlify.app/trooper_social.png",
        width: 1200,
        height: 630,
        alt: "Trooper - OpenClaw AI Workforce Platform with GitHub Integration",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Trooper: OpenClaw AI Workforce for Teams',
    description: 'Scale your ClawdBot into a full AI workforce. Multiple OpenClaw AI employees working together—GitHub integration, autonomous execution.',
    site: '@trooper_so',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/trooper_social.png",
        alt: "Trooper - OpenClaw GitHub AI Workforce Platform",
      },
    ],
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
import OldWays from '@/components/OldWays'
import FloatingScrollIndicator from '@/components/FloatingScrollIndicator'
import SimplePricing from '@/components/SimplePricing'
import Positioning from '@/components/Positioning'
import MultiCompany from '@/components/MultiCompany'
import FAQ from '@/components/faq'
import SectionShell from '@/components/ui/SectionShell'

const trustedLogos = [
  { src: 'https://dazzling-cat.netlify.app/logos/zeroslistlogo.png', alt: 'Zeros List' },
  { src: 'https://dazzling-cat.netlify.app/logos/marketingxlogo.png', alt: 'Marketing X' },
  { src: 'https://dazzling-cat.netlify.app/logos/dealflowlogo.png', alt: 'Dealflow' },
  { src: 'https://dazzling-cat.netlify.app/logos/downtownlogo.png', alt: 'Downtown' },
]

export default function Home() {
  return (
    <>
      <FloatingScrollIndicator />
      <div className="bg-white">
        <Header />
        <Hero />
      </div>

      <div className="pixel-divider" aria-hidden />

      <SectionShell eyebrow="Allied Units" eyebrowNumber="02" bgClass="bg-trooper-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 md:pb-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 border border-slate-200/80 bg-white/80 backdrop-blur-sm rounded-sm overflow-hidden">
            {trustedLogos.map((logo, i) => (
              <div
                key={logo.alt}
                className={[
                  'flex items-center justify-center h-20 sm:h-24 px-4',
                  // Mobile (2-up grid): vertical divider between left/right column, bottom divider between rows
                  i % 2 === 0 ? 'border-r border-slate-200' : '',
                  i < 2 ? 'border-b border-slate-200 sm:border-b-0' : '',
                  // Desktop (4-up): vertical dividers between every cell except the last
                  i < trustedLogos.length - 1 ? 'sm:border-r sm:border-slate-200' : 'sm:border-r-0',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <img
                  className="h-10 sm:h-12 w-auto max-w-[140px] origin-center object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <div className="pixel-divider" aria-hidden />

      <SectionShell eyebrow="Field Manual" eyebrowNumber="03" bgClass="bg-slate-50">
        <OldWays />
      </SectionShell>

      <div className="pixel-divider" aria-hidden />

      <SectionShell eyebrow="Battle Plan" eyebrowNumber="04" bgClass="bg-white">
        <Positioning />
      </SectionShell>

      <SectionShell eyebrow="Command Posts" eyebrowNumber="05" bgClass="bg-slate-50">
        <MultiCompany />
      </SectionShell>

      <SectionShell eyebrow="Deployment Plans" eyebrowNumber="06" bgClass="bg-white">
        <SimplePricing />
      </SectionShell>

      <SectionShell eyebrow="Intel Brief" eyebrowNumber="07" bgClass="bg-gray-50">
        <FAQ />
      </SectionShell>
    </>
  )
}
