'use client'

import { usePathname } from 'next/navigation'
import Footer from "@/components/ui/footer"
import Newsletter from "@/components/newsletter"

export default function AuthLayout({ children }: { children: React.ReactNode }) {  
  const pathname = usePathname()
  const hideNewsletter = pathname === '/wonder-auth' || pathname === '/download'
  
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