'use client'

import { useHomeMode, type HomeAgentMode } from '@/components/home/HomeModeContext'

const OPTIONS: { id: HomeAgentMode; label: string; hint: string }[] = [
  { id: 'personal', label: 'Personal agent', hint: 'Buddy' },
  { id: 'multi', label: 'Multiplayer agents', hint: 'Workforce' },
]

/**
 * Homepage product-mode switch — Personal (Buddy) vs multiplayer workforce.
 * Visual language matches CloudTierTabs.
 */
export default function HomeModeToggle({ className = '' }: { className?: string }) {
  const { mode, setMode } = useHomeMode()

  return (
    <div
      className={`mx-auto grid w-full max-w-md grid-cols-2 gap-0.5 rounded-lg border border-[var(--color-line)] bg-neutral-100 p-0.5 ${className}`}
      role="radiogroup"
      aria-label="Agent mode"
    >
      {OPTIONS.map((opt) => {
        const selected = mode === opt.id
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setMode(opt.id)}
            className={[
              'flex min-h-[2.5rem] flex-col items-center justify-center rounded-md px-2 py-1.5 transition-all duration-150',
              selected
                ? 'bg-white text-ink shadow-sm ring-1 ring-black/[0.04]'
                : 'text-ink-muted hover:bg-white/70 hover:text-ink',
            ].join(' ')}
          >
            <span className="text-[12px] font-semibold leading-tight tracking-tight sm:text-[13px]">
              {opt.label}
            </span>
            <span
              className={[
                'mt-0.5 text-[10px] font-medium leading-none',
                selected ? 'text-ink-muted' : 'text-ink-faint',
              ].join(' ')}
            >
              {opt.hint}
            </span>
          </button>
        )
      })}
    </div>
  )
}
