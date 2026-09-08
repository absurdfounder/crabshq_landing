import { getFaviconUrl } from '@/lib/favicon'

type FeatureCell =
  | {
      id: string
      title: string
      kind: 'icons'
      domains: string[]
      suffix?: string
    }
  | {
      id: string
      title: string
      kind: 'mark'
      mark: 'sparkles' | 'link' | 'lock' | 'mcp'
    }

const FEATURES: FeatureCell[] = [
  {
    id: 'keys',
    title: 'Bring your own model keys',
    kind: 'icons',
    domains: ['openai.com', 'anthropic.com', 'google.com'],
  },
  {
    id: 'models',
    title: 'Claude, GPT, Gemini — latest models',
    kind: 'mark',
    mark: 'sparkles',
  },
  {
    id: 'payments',
    title: 'Agentic payments via Stripe',
    kind: 'mark',
    mark: 'link',
  },
  {
    id: 'integrations',
    title: '1,000+ integrations for your tools',
    kind: 'icons',
    domains: ['notion.so', 'slack.com', 'calendar.google.com', 'gmail.com', 'github.com'],
    suffix: '+999',
  },
  {
    id: 'mcp',
    title: 'Add any custom MCPs or CLIs',
    kind: 'mark',
    mark: 'mcp',
  },
  {
    id: 'computer',
    title: 'Full privacy — your personal computer',
    kind: 'mark',
    mark: 'lock',
  },
]

function Favicon({ domain, size = 20 }: { domain: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand favicon via Google s2
    <img
      src={getFaviconUrl(domain, 64)}
      alt=""
      width={size}
      height={size}
      className="rounded-[5px] bg-white ring-1 ring-black/5"
      loading="lazy"
      decoding="async"
    />
  )
}

function Mark({ kind }: { kind: Extract<FeatureCell, { kind: 'mark' }>['mark'] }) {
  if (kind === 'sparkles') {
    return (
      <span className="inline-flex items-center gap-1">
        <Favicon domain="anthropic.com" />
        <Favicon domain="openai.com" />
        <Favicon domain="google.com" />
      </span>
    )
  }
  if (kind === 'link') {
    return (
      <span className="inline-flex size-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <path
            d="M3.5 8h9M8.5 4.5 12 8l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )
  }
  if (kind === 'mcp') {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M3 4.5h4.5M3 8h10M3 11.5h7"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-violet-50 text-violet-700 ring-1 ring-violet-100">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path
              d="M4 11.5 8 4.5l4 7H4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M6.2 9.5h3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </span>
    )
  }
  return (
    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
        <rect x="3.5" y="7" width="9" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M5.5 7V5.8a2.5 2.5 0 0 1 5 0V7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  )
}

/** Companion-style feature grid: brand/model icons in cells, Trooper card language. */
export default function BuddyFeatures() {
  return (
    <section className="w-full" aria-labelledby="buddy-features-heading">
      <h2
        id="buddy-features-heading"
        className="font-display text-2xl font-medium tracking-tight text-balance text-fern-700 sm:text-3xl"
      >
        Features
      </h2>
      <ul className="mt-5 grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <li
            key={f.id}
            className={[
              'flex items-start gap-3.5 p-5 sm:p-6',
              i % 2 === 0 ? 'sm:border-r sm:border-black/5' : '',
              i >= 2 ? 'border-t border-black/5' : '',
              i === 1 ? 'border-t border-black/5 sm:border-t-0' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="mt-0.5 shrink-0">
              {f.kind === 'icons' ? (
                <span className="inline-flex items-center gap-1">
                  {f.domains.map((d) => (
                    <Favicon key={d} domain={d} />
                  ))}
                  {f.suffix ? (
                    <span className="ml-0.5 rounded-md bg-stone-100 px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-neutral-600">
                      {f.suffix}
                    </span>
                  ) : null}
                </span>
              ) : (
                <Mark kind={f.mark} />
              )}
            </div>
            <h3 className="min-w-0 pt-0.5 text-[15px] font-semibold leading-snug text-pretty text-neutral-800 sm:text-base">
              {f.title}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  )
}
