'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PIXEL_SURFACE_BANNER_STYLE } from '@/lib/pixelSurfaceBanner'
import PixelSurface, { type PixelSurfaceStyle } from './PixelSurface'

export default function TopBar() {
  return (
    <div className="site-top-bar">
      <PixelSurface
        className="bg-fern-bright"
        surfaceStyle={{
          ...(PIXEL_SURFACE_BANNER_STYLE as PixelSurfaceStyle),
          '--pixel-bg-size': 'auto 100%',
          '--pixel-bg-repeat': 'repeat-x',
        }}
      >
        <Link
          href="/download/mac"
          className="group flex h-10 w-full items-center justify-center gap-2 px-4 text-sm font-medium text-lime-950/85 transition-colors hover:bg-fern/90 sm:gap-2.5"
        >
          <span className="shrink-0 rounded-md bg-lime-950/15 px-1.5 py-0.5 text-[11px] font-semibold leading-none text-lime-950/90">
            New
          </span>
          <span className="min-w-0 truncate sm:hidden">Trooper for Mac</span>
          <span className="hidden min-w-0 truncate sm:inline">
            Trooper for Mac — run your AI workforce on your machine
          </span>
          <span className="hidden shrink-0 items-center gap-1 text-lime-950/55 transition-colors group-hover:text-lime-950/75 sm:inline-flex">
            <span aria-hidden className="text-lime-950/35">
              |
            </span>
            <span>Download</span>
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </span>
        </Link>
      </PixelSurface>
    </div>
  )
}
