'use client'

import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'

import PixelButton from '@/components/ui/PixelButton'
import { COUNTRY_DIALS } from '@/components/buddy/countryCodes'

const APP_START = 'https://app.trooper.so?ref=buddy'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/**
 * iMessage number capture — country dial + local number, then start in the app.
 */
export default function BuddyPhoneForm() {
  const [countryIdx, setCountryIdx] = useState(0)
  const [local, setLocal] = useState('')
  const [error, setError] = useState<string | null>(null)

  const country = COUNTRY_DIALS[countryIdx] ?? COUNTRY_DIALS[0]

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
      <label htmlFor="buddy-phone" className="mb-2 block text-sm text-ink-muted">
        Your iMessage number
      </label>
      <div className="flex overflow-hidden rounded-xl border border-[var(--color-line)] bg-white shadow-sm focus-within:ring-2 focus-within:ring-ink/10">
        <div className="relative shrink-0 border-r border-[var(--color-line)]">
          <label htmlFor="buddy-country" className="sr-only">
            Country code
          </label>
          <select
            id="buddy-country"
            value={countryIdx}
            onChange={(e) => setCountryIdx(Number(e.target.value))}
            className="h-12 appearance-none bg-transparent py-0 pl-3 pr-8 text-sm font-medium text-ink outline-none"
            aria-label="Country selector"
          >
            {COUNTRY_DIALS.map((c, i) => (
              <option key={`${c.code}-${c.dial}`} value={i}>
                {c.name} {c.dial}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
        </div>
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
          className="h-12 min-w-0 flex-1 bg-transparent px-3 text-[15px] text-ink outline-none placeholder:text-ink-faint"
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
      <p className="mt-2.5 text-center text-[13px] text-ink-muted">
        Free to start. Buddy texts you on iMessage — with a computer that actually does the work.
      </p>
    </form>
  )
}
