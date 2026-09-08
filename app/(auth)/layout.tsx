'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/ui/footer'
import Newsletter from '@/components/newsletter'
import SectionShell from '@/components/ui/SectionShell'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Resellers already ends with its own apply CTA — stacking another closer
  // under it reads as a second footer. wonder-auth is a focused auth surface.
  const hideNewsletter =
    pathname === '/wonder-auth' || pathname === '/resellers' || pathname === '/buddy'

  return (
    <>
      {/* Match homepage canvas — gray-50 put a cool gutter beside the warm rail */}
      <main className="grow bg-canvas">{children}</main>
      {!hideNewsletter ? (
        <SectionShell eyebrow="Deploy Orders" bgClass="bg-canvas" noBorderBottom={false}>
          <Newsletter />
        </SectionShell>
      ) : null}
      <Footer />
    </>
  )
}
