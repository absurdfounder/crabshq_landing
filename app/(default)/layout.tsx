'use client'

import { useEffect } from 'react'
import PlausibleProvider from 'next-plausible'
import Script from 'next/script'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Footer from '@/components/ui/footer'
import Newsletter from '@/components/newsletter'
import { initGoogleTranslate, ensureTranslation } from '@/app/utils/googleTranslateHelper';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
    
    // Initialize Google Translate with our custom helper
    initGoogleTranslate();
    
    // Remove hash from URL if present (without page refresh)
    if (typeof window !== 'undefined' && window.location.hash.includes('googtrans')) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // Apply stored language after a delay to ensure Google Translate is fully loaded
    setTimeout(() => {
      ensureTranslation();
    }, 1000);
  }, [])

  // This is a fallback for the standard Google Translate initialization
  // Our custom helper method is the primary approach
  const googleTranslateInit = `
    function googleTranslateElementInit() {
      if (!window.googleTranslateInitialized) {
        window.googleTranslateInitialized = true;
        
        new google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false,
          includedLanguages: 'af,sq,ar,hy,az,eu,be,bn,bs,bg,ca,ceb,ny,zh-CN,zh-TW,co,hr,cs,da,nl,en,eo,et,tl,fi,fr,fy,gl,ka,de,el,gu,ht,ha,haw,iw,hi,hmn,hu,is,ig,id,ga,it,ja,jw,kn,kk,km,ko,ku,ky,lo,la,lv,lt,lb,mk,mg,ms,ml,mt,mi,mr,mn,my,ne,no,ps,fa,pl,pt,pa,ro,ru,sm,gd,sr,st,sn,sd,si,sk,sl,so,es,su,sw,sv,tg,ta,te,th,tr,uk,ur,uz,vi,cy,xh,yi,yo,zu',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
        
        // Hide Google Translate UI elements
        const hideElements = () => {
          const style = document.createElement('style');
          style.textContent = \`
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
          \`;
          document.head.appendChild(style);
        };
        
        // Apply the style immediately and again after a delay
        hideElements();
        setTimeout(hideElements, 1000);
      }
    }
  `;

  return (
    <PlausibleProvider domain="crabshq.com">
      {/* Google Analytics */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-FKXTBWH4RE" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FKXTBWH4RE');
        `}
      </Script>

      {/* Microsoft Clarity */}
      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "mm5deyus4u");
        `}
      </Script>

      {/* Clear googtrans hash from URL if present */}
      <Script id="clear-hash" strategy="beforeInteractive">
        {`
          if (window.location.hash && window.location.hash.includes('googtrans')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        `}
      </Script>

      {/* Google Translate Scripts */}
      <Script id="google-translate-init" strategy="beforeInteractive">
        {googleTranslateInit}
      </Script>
      <Script
        id="google-translate-script"
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Google Translate container (hidden) */}
      <div id="google_translate_element" className="fixed -z-50 top-0 left-0 opacity-0 pointer-events-none" />

      {/* Main Content */}
      <main className="grow bg-gray-50">
        {children}
      </main>

      <Newsletter />
      <Footer />
    </PlausibleProvider>
  )
}