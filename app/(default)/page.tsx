export const metadata = {
  metadataBase: new URL('https://crabshq.com'),
  title: 'Crabs HQ: AI Workforce Powered by OpenClaw | GitHub Integration',
  description: 'Build AI workforce teams with OpenClaw AI. Multiple AI employees execute tasks autonomously using GitHub, Gmail, browsers, and APIs. From the creators of ClawdBot and MoltBot.',
  alternates: {
    canonical: 'https://crabshq.com',
  },
  openGraph: {
    title: 'Crabs HQ: AI Workforce Platform Built on OpenClaw GitHub',
    description: 'Deploy AI workforce teams powered by OpenClaw AI. ClawdBot evolution for teams—GitHub commits, autonomous execution, persistent memory.',
    url: 'https://crabshq.com',
    siteName: 'Crabs HQ',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ - OpenClaw AI Workforce Platform with GitHub Integration",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: 'Crabs HQ: OpenClaw AI Workforce for Teams',
    description: 'Scale your ClawdBot into a full AI workforce. Multiple OpenClaw AI employees working together—GitHub integration, autonomous execution.',
    site: '@Crabs_HQ',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/crabshq_social.png",
        alt: "Crabs HQ - OpenClaw GitHub AI Workforce Platform",
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
import FAQ from '@/components/faq'

export default function Home() {
  return (
    <>
      <FloatingScrollIndicator />
      <div
        style={{
          backgroundImage: "linear-gradient(rgb(254 254 255), rgb(255 255 255 / 74%), rgb(255 255 255 / 48%)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <Header />



        <Hero />


      </div>

      <section className="px-4 py-8 md:px-6 md:py-12 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4">
            <span className="mt-1 text-base font-medium text-balance text-gray-400 text-center">
              Trusted by leading product-led companies
            </span>
            <div className="flex flex-wrap place-items-center items-center justify-center gap-8">
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/zeroslistlogo.png"
                  alt="Transistor"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/marketingxlogo.png"
                  alt="Gummy Search"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/dealflowlogo.png"
                  alt="Right Message"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/downtownlogo.png"
                  alt="Company 4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>








      <OldWays />

      <SimplePricing />

      <FAQ />

    </>
  )
}
