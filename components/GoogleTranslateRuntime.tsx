'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const LOAD_EVENT = 'trooper:load-translate'

function prefersTranslatedPage() {
  try {
    const match = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/)
    const fromCookie = match?.[2]?.split('/')[2]
    if (fromCookie && fromCookie !== 'en') return true
    const stored = localStorage.getItem('selectedLanguageCode')
    return Boolean(stored && stored !== 'en')
  } catch {
    return false
  }
}

/** Load Google Translate only when a non-English preference is already set. */
export default function GoogleTranslateRuntime() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (prefersTranslatedPage()) setEnabled(true)
    const enable = () => setEnabled(true)
    window.addEventListener(LOAD_EVENT, enable)
    return () => window.removeEventListener(LOAD_EVENT, enable)
  }, [])

  return (
    <>
      <div
        id="google_translate_element"
        className="pointer-events-none fixed left-0 top-0 -z-50 opacity-0"
        aria-hidden
      />
      {enabled ? (
        <>
          <Script id="google-translate-init" strategy="afterInteractive">
            {`
              window.googleTranslateElementInit = function () {
                if (!window.google || !window.google.translate) return;
                if (window.googleTranslateInitialized) return;
                window.googleTranslateInitialized = true;
                new window.google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false,
                  layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 'google_translate_element');
              };
            `}
          </Script>
          <Script
            id="google-translate-script"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
          />
        </>
      ) : null}
    </>
  )
}

export function requestGoogleTranslate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(LOAD_EVENT))
  }
}
