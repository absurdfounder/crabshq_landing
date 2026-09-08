'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Check, ChevronDown, Search } from 'lucide-react'

import PixelButton from '@/components/ui/PixelButton'
import { COUNTRY_DIALS, type CountryDial } from '@/components/buddy/countryCodes'

const APP_START = 'https://app.trooper.so?ref=buddy'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function Flag({ code, className = '' }: { code: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- flagcdn serves crisp country flags
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      alt=""
      width={20}
      height={15}
      className={`rounded-[3px] object-cover shadow-sm ring-1 ring-black/10 ${className}`}
      loading="lazy"
      decoding="async"
    />
  )
}

function CountryPicker({
  value,
  onChange,
}: {
  value: CountryDial
  onChange: (next: CountryDial) => void
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => searchRef.current?.focus(), 0)
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const filtered = COUNTRY_DIALS.filter((c) => {
    if (!query.trim()) return true
    const q = query.trim().toLowerCase()
    return (
      c.name.toLowerCase().includes(q) ||
      c.dial.includes(q) ||
      c.code.toLowerCase().includes(q)
    )
  })

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Country code ${value.name} ${value.dial}`}
        onClick={() => setOpen((v) => !v)}
        className={[
          'inline-flex h-10 items-center gap-2 rounded-xl px-2.5 transition-colors duration-200',
          open ? 'bg-stone-200/70' : 'bg-stone-100/90 hover:bg-stone-200/60',
        ].join(' ')}
      >
        <Flag code={value.code} />
        <span className="text-[13px] font-semibold tabular-nums tracking-tight text-neutral-800">
          {value.dial}
        </span>
        <ChevronDown
          className={[
            'h-3.5 w-3.5 text-neutral-400 transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-2xl bg-white/95 shadow-[0_24px_48px_-20px_rgba(28,25,23,0.35)] ring-1 ring-black/10 backdrop-blur-xl">
          <div className="border-b border-black/[0.06] p-2.5">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400"
                aria-hidden
              />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country or code"
                className="h-10 w-full rounded-xl bg-stone-50 pl-9 pr-3 text-sm text-neutral-800 outline-none ring-1 ring-black/[0.06] placeholder:text-neutral-400 focus:bg-white focus:ring-black/15"
              />
            </label>
          </div>
          <ul
            id={listId}
            role="listbox"
            className="max-h-64 overflow-y-auto overscroll-contain py-1.5 [scrollbar-width:thin]"
          >
            {filtered.map((c) => {
              const selected = c.code === value.code && c.dial === value.dial
              return (
                <li key={`${c.code}-${c.dial}`}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(c)
                      setOpen(false)
                      setQuery('')
                    }}
                    className={[
                      'flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors duration-150',
                      selected
                        ? 'bg-[#f0f5e6] text-neutral-900'
                        : 'text-neutral-700 hover:bg-stone-50',
                    ].join(' ')}
                  >
                    <Flag code={c.code} />
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{c.name}</span>
                    <span className="text-[13px] tabular-nums text-neutral-500">{c.dial}</span>
                    {selected ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-fern-700" strokeWidth={2.5} aria-hidden />
                    ) : (
                      <span className="w-3.5 shrink-0" aria-hidden />
                    )}
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 ? (
              <li className="px-3.5 py-4 text-sm text-neutral-500">No matches</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

/** iMessage number capture — one glass field with an inset flag chip. */
export default function BuddyPhoneForm() {
  const [country, setCountry] = useState<CountryDial>(COUNTRY_DIALS[0])
  const [local, setLocal] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const n = digitsOnly(local)
    if (n.length < 7) {
      setError('Enter a valid iMessage number.')
      return
    }
    setError(null)
    const e164 = `${country.dial}${n}`
    const url = new URL(APP_START)
    url.searchParams.set('phone', e164)
    url.searchParams.set('channel', 'imessage')
    window.location.assign(url.toString())
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="buddy-phone" className="mb-2.5 block text-sm font-medium text-neutral-600">
        Your iMessage number
      </label>

      <div
        className={[
          'flex h-14 items-center gap-2 rounded-2xl bg-white/95 px-2 shadow-[0_14px_36px_-18px_rgba(28,25,23,0.35)] backdrop-blur-md transition duration-200',
          focused
            ? 'ring-2 ring-neutral-900/15 ring-offset-2 ring-offset-transparent'
            : 'ring-1 ring-black/[0.08]',
          error ? 'ring-2 ring-red-500/35' : '',
        ].join(' ')}
      >
        <CountryPicker value={country} onChange={setCountry} />
        <input
          id="buddy-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="415 555 0123"
          value={local}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setLocal(e.target.value)
            if (error) setError(null)
          }}
          className="h-full min-w-0 flex-1 bg-transparent pr-3 text-[16px] tracking-tight text-neutral-800 outline-none placeholder:text-neutral-400"
        />
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <PixelButton
        type="submit"
        size="lg"
        tone="dark"
        className="mt-3.5 w-full plausible-event-name=CTA+Click plausible-event-location=Buddy"
      >
        Start with Buddy
      </PixelButton>

      <p className="mt-2.5 text-center text-[13px] leading-relaxed text-neutral-500">
        Free to start. Buddy texts you on iMessage.
      </p>
    </form>
  )
}
