// app/layout.tsx or layout.js (depending on your setup)
import './css/style.css'

import { Inter, Roboto_Mono, Source_Serif_4, Comfortaa, Josefin_Slab } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'

import Banner from '@/components/banner'
import SchemaMarkup from '@/components/SchemaMarkup'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono', display: 'swap' })
const sourceSerif4 = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif-4', display: 'swap' })
const comfortaa = Comfortaa({ subsets: ['latin'], variable: '--font-comfortaa', display: 'swap' })
const josefinSlab = Josefin_Slab({ subsets: ['latin'], variable: '--font-josefin-slab', display: 'swap' })

const silkscreen = localFont({
  src: [{ path: '../public/fonts/Silkscreen-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-silkscreen'
})

const bungee = localFont({
  src: '../public/fonts/Bungee-Regular.ttf',
  variable: '--font-bungee'
})

const funneldisplay = localFont({
  src: '../public/fonts/FunnelDisplay-VariableFont_wght.ttf',
  variable: '--font-funneldisplay'
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://crabshq.com'),
  title: 'Wonder: Notion to Blog, Helpdesk & Directory Sites (NoCode & SEO)',
  description: 'Create superfast websites with Notion as your CMS. Go from Notion to Blog, Helpdesk, Documentation, Marketplace or Directory in minutes. Build unlimited sites!',
  alternates: {
    canonical: 'https://crabshq.com',
  },
  openGraph: {
    title: 'Wonder: Notion to Blog, Helpdesk & Directory Sites (NoCode & SEO)',
    description: 'Create superfast websites with Notion as your CMS. Go from Notion to Blog, Helpdesk, Documentation, Marketplace or Directory in minutes. Build unlimited sites!',
    url: 'https://crabshq.com',
    siteName: 'Wonder',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/WonderSites_socialshare.png',
        width: 1200,
        height: 630,
        alt: 'Get a Marketplace with Notion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wonder: Notion to Blog, Helpdesk & Directory Sites (NoCode & SEO)',
    description: 'Create superfast websites with Notion as your CMS. Go from Notion to Blog, Helpdesk, Documentation, Marketplace or Directory in minutes. Build unlimited sites!',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/WonderSites_socialshare.png',
        alt: 'Get a Marketplace with Notion',
      },
    ],
    site: '@Crabs_HQ',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const canonicalUrl = 'https://crabshq.com'
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href={canonicalUrl} />
        {/* Google Translate Script */}
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" 
          strategy="afterInteractive" 
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false,
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              }
            `,
          }}
        />
        {/* Add style to hide Google Translate bar */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .VIpgJd-ZVi9od-ORHb-OEVmcd, 
            .VIpgJd-ZVi9od-aZ2wEe-wOHMyf, 
            .goog-te-banner-frame, 
            .skiptranslate {
              display: none !important; 
              visibility: hidden !important;
            }
            body {
              top: 0 !important;
            }
          `,
        }} />
        
        {/* Channel.io Script */}
        <Script id="channel-io" strategy="afterInteractive">
          {`
            (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();
            ChannelIO('boot', { "pluginKey": "29ebc168-9857-467f-bc42-1a19419801d8" });
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${robotoMono.variable} ${sourceSerif4.variable} ${comfortaa.variable} ${josefinSlab.variable} ${silkscreen.variable} ${bungee.variable} ${funneldisplay.variable} bg-gray-50 font-inter antialiased text-slate-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          {children}
          <SchemaMarkup />
        </div>
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" className="hidden"></div>
      </body>
    </html>
  )
}
