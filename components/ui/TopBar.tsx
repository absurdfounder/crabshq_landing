'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="site-top-bar bg-[#8cc352]">
      <Link
        href="/download/mac"
        className="group relative flex h-10 w-full items-center justify-center gap-2 px-4 text-sm font-medium text-lime-950/80 transition-colors hover:text-lime-950 sm:gap-2.5"
      >
        <span className="mr-1 shrink-0 rounded-md bg-lime-900/20 px-1 py-0.5 text-[11px] font-semibold leading-none text-lime-950/90">
          New
        </span>
        <span className="min-w-0 truncate sm:hidden">Trooper for Mac</span>
        <span className="hidden min-w-0 truncate sm:inline">
          Trooper for Mac — run your AI workforce on your machine
        </span>
        <span className="ml-2 hidden shrink-0 items-center gap-1 text-sm font-medium text-lime-950/50 transition-colors group-hover:text-lime-950/70 sm:inline-flex">
          <span aria-hidden className="mr-1">
            |
          </span>
          <span>Download</span>
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
        </span>
      </Link>
    </div>
  )
}
