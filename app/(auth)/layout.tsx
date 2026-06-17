'use client'

import { usePathname } from 'next/navigation'
import Footer from "@/components/ui/footer"
import Newsletter from "@/components/newsletter"

const CATALOG_PATH_PREFIXES = ['/plugin', '/integration', '/loops', '/download', '/skill']

function isCatalogPage(pathname: string) {
  return CATALOG_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {  
  const pathname = usePathname()
  const hideNewsletter = pathname === '/wonder-auth' || isCatalogPage(pathname)
  
  return (
    <>
      <main className="grow bg-gray-50">
        {children}
      </main>
      {!hideNewsletter && <Newsletter />}
      <Footer />
    </>
  )
}