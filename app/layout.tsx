import './css/style.css'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import PlausibleProvider from 'next-plausible'

import Banner from '@/components/banner'
import SchemaMarkup from '@/components/SchemaMarkup'
import { ogImageMeta } from '@/lib/og/url'

const homeOg = ogImageMeta('home', 'Trooper - AI Workforce Powered by OpenClaw AI and ClawdBot')

/** Body — paragraphs, nav, UI */
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

/** Section kickers, logo wordmark, small brand labels */
const silkscreen = localFont({
  src: [{ path: '../public/fonts/Silkscreen-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-silkscreen',
})

/** H1, hero, section titles — Erode (Ferndesk display face) */
const erode = localFont({
  src: '../public/fonts/Erode-Variable.ttf',
  variable: '--font-erode',
  display: 'swap',
  weight: '300 700',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://trooper.so'),
  title: 'Trooper: AI Workforce Powered by OpenClaw | GitHub Integration',
  description: 'Build AI workforce teams with OpenClaw AI. Multiple AI employees execute tasks autonomously using GitHub, Gmail, browsers, and APIs. From the creators of ClawdBot and MoltBot.',
  alternates: {
    canonical: 'https://trooper.so',
  },
  openGraph: {
    title: 'Trooper: AI Workforce Platform Built on OpenClaw GitHub',
    description: 'Deploy AI workforce teams powered by OpenClaw AI. ClawdBot evolution for teams—GitHub commits, autonomous execution, persistent memory. Real work, not just answers.',
    url: 'https://trooper.so',
    siteName: 'Trooper',
    images: homeOg.openGraph!.images,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trooper: OpenClaw AI Workforce for Teams | GitHub OpenClaw',
    description: 'Scale your ClawdBot into a full AI workforce. Multiple OpenClaw AI employees working together—GitHub integration, autonomous execution, MoltBot evolution.',
    images: homeOg.twitter!.images,
    site: '@trooper_so',
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/images/trooper-logomark.webp', sizes: '512x512', type: 'image/webp' },
      { url: '/images/trooper-logomark.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.png',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  keywords: [
    'openclaw ai',
    'github openclaw',
    'openclaw github',
    'openclaw clawdbot',
    'clawdbot openclaw',
    'clawdbot',
    'moltbot',
    'ai workforce',
    'openclaw team',
    'ai employees',
    'ai agents',
    'autonomous ai',
    'openclaw skills',
    'ai workforce platform',
  ],
  other: {
    'robots': 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const canonicalUrl = 'https://trooper.so'
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href={canonicalUrl} />
        {/* LLM Indexing - llms.txt standard */}
        <link rel="alternate" type="text/plain" href="https://trooper.so/llms.txt" title="LLM-readable summary" />
        <link rel="alternate" type="text/plain" href="https://trooper.so/llms-full.txt" title="LLM-readable full reference" />
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
            .skiptranslate,
            iframe.skiptranslate,
            #google_translate_element iframe {
              display: none !important; 
              visibility: hidden !important;
              pointer-events: none !important;
              height: 0 !important;
              width: 0 !important;
            }
            body {
              top: 0 !important;
            }
          `,
        }} />
      </head>
      <body
        className={`${inter.variable} ${silkscreen.variable} ${erode.variable} bg-canvas font-sans antialiased text-ink`}
      >
        {/* Site-wide Plausible — must live in the root layout so (auth) pages
            (pricing, features, loops, …) are tracked, not only the homepage. */}
        <PlausibleProvider
          domain="trooper.so"
          trackOutboundLinks
          taggedEvents
        />
        {/* GA + Clarity also site-wide (same prior gap as Plausible). */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FKXTBWH4RE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKXTBWH4RE');
          `}
        </Script>
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mm5deyus4u");
          `}
        </Script>
        <div className="flex flex-col min-h-screen">
          {children}
          <SchemaMarkup />
        </div>
        {/* Hidden Google Translate Element */}
        <div id="google_translate_element" className="fixed -z-50 top-0 left-0 opacity-0 pointer-events-none" aria-hidden />
      </body>
    </html>
  )
}
