import {
  KeyRound,
  Lock,
  MessageCircle,
  Monitor,
  Puzzle,
  Terminal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const FEATURES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MessageCircle,
    title: 'iMessage in, work out',
    body: 'Text Buddy like a friend. Assign tasks from the messages app you already live in.',
  },
  {
    icon: Monitor,
    title: 'Your own computer',
    body: 'Buddy runs on a personal always-on machine — browser, files, desktop apps, not just chat.',
  },
  {
    icon: Terminal,
    title: 'Terminal, browser, files',
    body: 'Shell commands, web research, downloads, and local files. A real computer, not a browser tab.',
  },
  {
    icon: Puzzle,
    title: 'Tools you already use',
    body: 'Connect Gmail, Calendar, Notion, GitHub, and more. Buddy reaches anything with an API.',
  },
  {
    icon: KeyRound,
    title: 'Your keys, your models',
    body: 'Bring your own API keys. Use the latest models without markup on usage.',
  },
  {
    icon: Lock,
    title: 'You approve what ships',
    body: 'Sensitive sends and commits wait for your say. Autonomy is something you grant.',
  },
]

export default function BuddyFeatures() {
  return (
    <section className="w-full" aria-labelledby="buddy-features-heading">
      <h2
        id="buddy-features-heading"
        className="font-display text-xl font-medium tracking-tight text-fern-700 sm:text-2xl"
      >
        Features
      </h2>
      <ul className="mt-5 grid grid-cols-1 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-white sm:grid-cols-2 sm:divide-y-0">
        {FEATURES.map((f, i) => {
          const Icon = f.icon
          return (
            <li
              key={f.title}
              className={[
                'flex gap-3.5 p-5 sm:p-6',
                i % 2 === 0 ? 'sm:border-r sm:border-[var(--color-line)]' : '',
                i >= 2 ? 'sm:border-t sm:border-[var(--color-line)]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-ink">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <h3 className="font-sans text-[15px] font-semibold leading-snug tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{f.body}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
