'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="site-top-bar">
      <Link
        href="/download/mac"
        className="group relative flex min-h-10 w-full items-center justify-center gap-1.5 px-3 py-2 text-[13px] font-bold leading-snug text-[#0b1400] transition-colors hover:text-black sm:gap-2.5 sm:px-4 sm:text-sm sm:font-semibold"
      >
        <span className="shrink-0 rounded-md bg-[#0b1400]/[0.12] px-1.5 py-0.5 text-[11px] font-bold leading-none tracking-wide text-[#0b1400]">
          New
        </span>
        <span className="min-w-0 text-center sm:hidden">
          Trooper for Mac — run your AI workforce
        </span>
        <span className="hidden min-w-0 sm:inline">
          Trooper for Mac — run your AI workforce on your machine
        </span>
        <span className="inline-flex shrink-0 items-center gap-0.5 font-bold text-[#0b1400] transition-colors group-hover:text-black sm:ml-1 sm:gap-1 sm:font-semibold">
          <span aria-hidden className="mx-0.5 hidden text-[#0b1400]/40 sm:inline">
            |
          </span>
          <span>Download</span>
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
        </span>
      </Link>
    </div>
  )
}
