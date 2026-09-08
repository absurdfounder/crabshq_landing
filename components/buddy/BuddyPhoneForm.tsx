'use client'

import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'

import PixelButton from '@/components/ui/PixelButton'
import { COUNTRY_DIALS, type CountryDial } from '@/components/buddy/countryCodes'

const APP_START = 'https://app.trooper.so?ref=buddy'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
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
  const listId = useId()

  useEffect(() => {
    if (!open) return
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
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
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label="Country code"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 items-center gap-1.5 border-r border-black/5 bg-transparent px-3 text-sm font-medium text-neutral-800 outline-none transition hover:bg-stone-50"
      >
        <span className="text-base leading-none" aria-hidden>
          {value.flag}
        </span>
        <span className="tabular-nums">{value.dial}</span>
        <ChevronDown className="h-3.5 w-3.5 text-neutral-400" aria-hidden />
      </button>

      {open ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-30 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/10">
          <div className="border-b border-black/5 p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search country"
              className="h-9 w-full rounded-lg bg-stone-50 px-3 text-sm text-neutral-800 outline-none ring-1 ring-black/5 placeholder:text-neutral-400 focus:ring-black/15"
            />
          </div>
          <ul
            id={listId}
            role="listbox"
            className="max-h-56 overflow-y-auto overscroll-contain py-1"
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
                      'flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition',
                      selected ? 'bg-stone-100 text-neutral-900' : 'text-neutral-700 hover:bg-stone-50',
                    ].join(' ')}
                  >
                    <span className="text-base leading-none" aria-hidden>
                      {c.flag}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{c.name}</span>
                    <span className="tabular-nums text-neutral-500">{c.dial}</span>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 ? (
              <li className="px-3 py-3 text-sm text-neutral-500">No matches</li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

/**
 * iMessage number capture — compact flag+dial picker, then start in the app.
 */
export default function BuddyPhoneForm() {
  const [country, setCountry] = useState<CountryDial>(COUNTRY_DIALS[0])
  const [local, setLocal] = useState('')
  const [error, setError] = useState<string | null>(null)

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
    <form onSubmit={onSubmit} className="w-full max-w-md">
      <label htmlFor="buddy-phone" className="mb-2 block text-sm text-neutral-500">
        Your iMessage number
      </label>
      <div className="flex overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-black/5 focus-within:ring-black/15">
        <CountryPicker value={country} onChange={setCountry} />
        <input
          id="buddy-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="415 555 0123"
          value={local}
          onChange={(e) => {
            setLocal(e.target.value)
            if (error) setError(null)
          }}
          className="h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-neutral-800 outline-none placeholder:text-neutral-400"
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
        className="mt-3 w-full plausible-event-name=CTA+Click plausible-event-location=Buddy"
      >
        Start with Buddy
      </PixelButton>
      <p className="mt-2.5 text-[13px] leading-relaxed text-neutral-500">
        Free to start. Buddy texts you on iMessage — with a computer that actually does the work.
      </p>
    </form>
  )
}
