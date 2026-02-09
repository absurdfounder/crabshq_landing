export const metadata = {
  metadataBase: new URL('https://crabshq.com'),
  title: 'Wonder: Notion to Blog, Helpdesk & Directory Sites (NoCode & SEO)',
  description: 'Create superfast websites with Notion as your CMS. Go from Notion to Blog, Helpdesk, Documentation, Marketplace or Directory in minutes. Build unlimited sites!',
  openGraph: {
    images: [
      {
        url: "https://dazzling-cat.netlify.app/WonderSites_socialshare.png",
        width: 1200,
        height: 630,
        alt: "Notion to Helpdesk , Notion to Directory , Notion to Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/WonderSites_socialshare.png",
        alt: "Notion to Helpdesk , Notion to Directory , Notion to Blog",
      },
    ],
  },
}

import Hero from '@/components/hero'
import Header from '@/components/ui/header'
import Features from '@/components/features'
import FeaturesBlocks from '@/components/FeaturesBlocks'
import FeaturesBlocksV2 from '@/components/FeaturesBlocksV2'
import HowItWorksSection from '@/components/HowItWorksSection'
import AIAgentSection from '@/components/AIAgentSection'
import CustomerStorySection from '@/components/CustomerStorySection'
import CustomerStorySection2 from '@/components/CustomerStorySection2'
import GetStartedSection from '@/components/GetStartedSection'
import OldWays from '@/components/OldWays'
import Testimonials from '@/components/testimonials'
import Showcases from '@/components/showcase'
import Newsletter from '@/components/newsletter'
import MarketplaceType from '@/components/MarketplaceType'
import FAQ from '@/components/faq'
import ModalVideo from '@/components/ModalVideo'
import NotionToWebsite from '@/components/NotionToWebsite'
import SimpleAnalyticsDashboard from '@/components/DashboardComponent'
import FloatingScrollIndicator from '@/components/FloatingScrollIndicator'
import WonderComparison from '@/components/comparison'

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

        {/** 
        <WonderComparison/>
        */}
      </div>

      <section className="hidden px-4 py-6 md:px-6 md:py-10 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-center">
            <span className="mt-1 text-base font-medium text-balance text-gray-400 md:text-left">
              Trusted by leading product-led companies
            </span>
            <div className="mx-auto flex flex-wrap place-items-center items-center justify-center gap-8">
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/zeroslistlogo.png"
                  alt="Transistor"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/marketingxlogo.png"
                  alt="Gummy Search"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/dealflowlogo.png"
                  alt="Right Message"
                />
              </div>
              <div className="h-12 max-h-12 w-32 transition-all duration-300 hover:scale-110">
                <img
                  className="h-full w-full origin-center object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  src="https://dazzling-cat.netlify.app/logos/downtownlogo.png"
                  alt="Company 4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* 
      <MarketplaceType />
      <Testimonials />
      <ModalVideo />
      <AIAgentSection />
      <OldWays />
      <SimpleAnalyticsDashboard />
      <GetStartedSection />

      <HowItWorksSection />
      <CustomerStorySection2 />

      <Showcases />

      <GetStartedSection />

            <AIAgentSection />
      <CustomerStorySection />
      <FeaturesBlocks />

      <ModalVideo />


*/}


      <OldWays />



    </>
  )
}
