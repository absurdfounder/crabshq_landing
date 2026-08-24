import './css/style.css'

import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script'
import PlausibleProvider from 'next-plausible'

import GoogleTranslateRuntime from '@/components/GoogleTranslateRuntime'
import SchemaMarkup from '@/components/SchemaMarkup'
import { ogImageMeta } from '@/lib/og/url'

const homeOg = ogImageMeta('home', 'Trooper: AI teammates that ship real work')

/** Body — paragraphs, nav, UI */
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

/** Section kickers, logo wordmark, small brand labels */
const silkscreen = localFont({
  src: [{ path: '../public/fonts/Silkscreen-Regular.ttf', weight: '400', style: 'normal' }],
  variable: '--font-silkscreen',
})

/** H1, hero, section titles — Funnel Display */
const display = localFont({
  src: '../public/fonts/FunnelDisplay-VariableFont_wght.ttf',
  variable: '--font-display',
  display: 'swap',
  weight: '300 800',
})

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
    card: 'summary_large_image',
    title: 'Trooper: AI teammates that ship real work',
    description:
      'Give tasks to AI employees like teammates. They use your tools, run loops you approved, and come back when they need a sign-off.',
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
    'trooper',
    'ai teammates',
    'ai employees',
    'ai workforce',
    'ai agents',
    'loop api',
    'self-host ai agents',
    'openclaw',
    'openclaw skills',
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
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="96x96" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        {/* Canonical comes from metadata.alternates on each page. A hardcoded
            homepage URL here overwrote /self-host, /pricing, and every other route. */}
        {/* LLM Indexing - llms.txt standard */}
        <link rel="alternate" type="text/plain" href="https://trooper.so/llms.txt" title="LLM-readable summary" />
        <link rel="alternate" type="text/plain" href="https://trooper.so/llms-full.txt" title="LLM-readable full reference" />
        {/*
          Plausible via first-party proxy (withPlausibleProxy → /q/js/... + /q/proxy/api/event).
          Rendered in <head> so the tag is present in SSR HTML for installer checks.
          Do not pass Next.js Script `strategy` via scriptProps — that prop is not on
          HTMLScriptAttributes and fails `next build` typecheck.
        */}
        <PlausibleProvider
          domain="trooper.so"
          trackOutboundLinks
          taggedEvents
        />
        <link rel="preload" as="image" href="/images/trooper-logomark-128.webp" type="image/webp" />
      </head>
      <body
        className={`${inter.variable} ${silkscreen.variable} ${display.variable} bg-canvas font-sans antialiased text-ink`}
      >
        {/* GA + Clarity site-wide (covers (auth) pages too). */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FKXTBWH4RE" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKXTBWH4RE');
          `}
        </Script>
        <Script id="clarity-script" strategy="lazyOnload">
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
        <GoogleTranslateRuntime />
      </body>
    </html>
  )
}
