'use client'

import { useHomeMode, type HomeAgentMode } from '@/components/home/HomeModeContext'

const OPTIONS: { id: HomeAgentMode; label: string }[] = [
  { id: 'personal', label: 'Buddy' },
  { id: 'multi', label: 'Workforce' },
]

/**
 * Homepage product-mode switch — Buddy (personal) vs Workforce (multiplayer).
 */
export default function HomeModeToggle({ className = '' }: { className?: string }) {
  const { mode, setMode } = useHomeMode()

  return (
    <div
      className={`mx-auto grid w-full max-w-md grid-cols-2 gap-0.5 rounded-lg border border-[var(--color-line)] bg-white p-[5px] ${className}`}
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
              'flex min-h-[2.5rem] items-center justify-center rounded-md px-2 py-1.5 transition-all duration-150',
              selected
                ? 'bg-white text-ink shadow-sm ring-1 ring-black/[0.04]'
                : 'text-ink-muted hover:bg-neutral-50 hover:text-ink',
            ].join(' ')}
          >
            <span className="text-[12px] font-semibold leading-tight tracking-tight sm:text-[13px]">
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
