'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/ui/footer'
import Newsletter from '@/components/newsletter'
import SectionShell from '@/components/ui/SectionShell'

const CATALOG_PATH_PREFIXES = ['/plugin', '/integration', '/loops', '/download', '/skill']

function isCatalogPage(pathname: string) {
  return CATALOG_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Resellers already ends with its own apply CTA — stacking "Try Trooper now"
  // under it reads as a second footer.
  const hideNewsletter =
    pathname === '/wonder-auth' ||
    pathname === '/resellers' ||
    isCatalogPage(pathname)

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
