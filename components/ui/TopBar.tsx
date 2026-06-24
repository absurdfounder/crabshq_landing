'use client'

import Link from 'next/link'
import { ArrowRight, BookOpen, Puzzle } from 'lucide-react'

import LiquidOrb from '@/components/ui/LiquidOrb'

const CHANGELOG_UPDATED_AT = new Date('2026-06-23T10:42:00Z')

function formatRelativeTime(date: Date) {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 48) return `${hours} hour${hours === 1 ? '' : 's'} ago`
  const days = Math.floor(hours / 24)
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} ago`
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

const linkClass =
  'flex items-center gap-2 text-xs font-medium text-ink-muted transition-colors hover:text-ink'

export default function TopBar() {
  const changelogLabel = formatRelativeTime(CHANGELOG_UPDATED_AT)

  return (
    <div className="site-top-bar">
      <Link
        href="/download"
        className="group flex items-center justify-center gap-1.5 bg-fern-bright px-4 py-2 text-center text-xs font-medium text-ink transition-colors hover:bg-fern"
      >
        <span>New: Trooper for Mac — run your AI workforce on your machine</span>
        <span className="inline-flex items-center gap-0.5 font-medium">
          Download
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
        </span>
      </Link>

      <div className="border-b border-[var(--color-line)] bg-canvas">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-x border-[var(--color-line)] px-4 py-2 sm:px-6">
          <div className="hidden flex-grow items-center gap-3 text-xs font-medium text-ink-muted md:flex">
            <span>
              <span className="text-ink">Trooper</span> the delightful{' '}
              <span className="text-ink">AI workforce</span> platform
            </span>
            <a
              href="https://app.trooper.so/changelog"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View changelog: ${CHANGELOG_UPDATED_AT.toLocaleString()}`}
              title={`Changelog: ${CHANGELOG_UPDATED_AT.toLocaleString()}`}
              className="flex items-center gap-1.5 text-xs font-medium text-ink-muted opacity-90 transition-opacity hover:opacity-100"
            >
              <LiquidOrb variant="changelog" />
              <span>Changelog: {changelogLabel}</span>
            </a>
          </div>

          <a
            href="https://app.trooper.so"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors hover:text-ink md:ml-0"
          >
            <LiquidOrb variant="status" />
            <span className="text-ink">Online</span>
          </a>

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/download" className={linkClass}>
              <Puzzle className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2.25} />
              <span>Download Apps</span>
            </Link>
            <a
              href="https://docs.openclaw.ai"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <BookOpen className="h-3.5 w-3.5 text-ink-muted" strokeWidth={2.25} />
              <span>Docs</span>
            </a>
            <a
              href="https://discord.com/invite/clawd"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <DiscordIcon className="h-3.5 w-3.5 text-ink-muted" />
              <span>Discord</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
