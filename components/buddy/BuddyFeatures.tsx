import {
  CreditCard,
  MessageCircle,
  Monitor,
  Puzzle,
  Sparkles,
  Terminal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { getFaviconUrl } from '@/lib/favicon'

type Feature = {
  title: string
  body: string
  icon: LucideIcon
  tint: string
  iconColor: string
  brands?: string[]
}

const FEATURES: Feature[] = [
  {
    title: 'iMessage in, work out',
    body: 'Text Buddy like a friend. Assign tasks from Messages — no dashboard required to start.',
    icon: MessageCircle,
    tint: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    title: 'Latest models, your keys',
    body: 'Claude, GPT, Gemini — bring your own keys. No markup on model usage.',
    icon: Sparkles,
    tint: 'bg-violet-50',
    iconColor: 'text-violet-600',
    brands: ['anthropic.com', 'openai.com', 'google.com'],
  },
  {
    title: 'Your own computer',
    body: 'Always-on machine with browser, files, and desktop apps — not a browser tab agent.',
    icon: Monitor,
    tint: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'Terminal, MCP, CLIs',
    body: 'Shell commands and custom tools. Buddy uses MCPs and CLIs directly when you connect them.',
    icon: Terminal,
    tint: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    title: '1,000+ integrations',
    body: 'Gmail, Calendar, Notion, GitHub, Slack — if it has an API, Buddy can reach it.',
    icon: Puzzle,
    tint: 'bg-rose-50',
    iconColor: 'text-rose-600',
    brands: ['gmail.com', 'notion.so', 'github.com', 'slack.com'],
  },
  {
    title: 'Agentic payments',
    body: 'Pay and book through Stripe when you approve. Nothing sensitive ships without your say.',
    icon: CreditCard,
    tint: 'bg-lime-50',
    iconColor: 'text-lime-700',
    brands: ['stripe.com'],
  },
]

function BrandRow({ domains }: { domains: string[] }) {
  return (
    <span className="mt-3 inline-flex items-center gap-1">
      {domains.map((d) => (
        // eslint-disable-next-line @next/next/no-img-element -- brand favicon via Google s2
        <img
          key={d}
          src={getFaviconUrl(d, 64)}
          alt=""
          width={18}
          height={18}
          className="rounded-[4px] bg-white ring-1 ring-black/5"
          loading="lazy"
          decoding="async"
        />
      ))}
    </span>
  )
}

/** Trooper feature grid — pastel icon tiles, ring cards, brand marks where they matter. */
export default function BuddyFeatures() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-left sm:text-center">
        <p className="kicker !inline">Batteries included</p>
        <h2 className="h2-section mx-auto mt-2">Everything Buddy brings to the thread</h2>
        <p className="lede mx-auto">
          A personal agent with a computer — models, tools, payments, and approvals — simplified for
          one person.
        </p>
      </div>

      <div className="dot-grid mt-10 rounded-2xl border border-black/5 bg-white/50 p-4 backdrop-blur-sm sm:mt-12 sm:p-5 md:p-6">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <li
                key={f.title}
                className="rounded-2xl bg-white/95 p-5 shadow-[0_12px_28px_-18px_rgba(28,25,23,0.35)] ring-1 ring-black/5 sm:p-6"
              >
                <span
                  className={`flex size-11 items-center justify-center rounded-xl ${f.tint} ${f.iconColor}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-4 text-base font-semibold text-balance text-neutral-800">
                  {f.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-pretty text-neutral-500">
                  {f.body}
                </p>
                {f.brands ? <BrandRow domains={f.brands} /> : null}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
