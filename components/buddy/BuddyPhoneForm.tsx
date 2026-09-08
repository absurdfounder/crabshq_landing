'use client'

import { useState, type FormEvent } from 'react'
import { ChevronDown } from 'lucide-react'

import PixelButton from '@/components/ui/PixelButton'
import { COUNTRY_DIALS, type CountryDial } from '@/components/buddy/countryCodes'

const APP_START = 'https://app.trooper.so?ref=buddy'

function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

function Flag({ code }: { code: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- flagcdn
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      alt=""
      width={18}
      height={13}
      className="rounded-[2px] object-cover ring-1 ring-black/10"
      loading="lazy"
      decoding="async"
    />
  )
}

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
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="buddy-phone" className="mb-2 block text-sm font-medium text-neutral-600">
        Your iMessage number
      </label>

      <div
        className={[
          'flex h-12 items-center rounded-xl bg-white/95 shadow-sm ring-1 ring-black/10 backdrop-blur-sm',
          error ? 'ring-red-500/35' : '',
        ].join(' ')}
      >
        <div className="relative flex h-full shrink-0 items-center pl-3 pr-2">
          <Flag code={country.code} />
          <select
            aria-label="Country code"
            value={`${country.code}|${country.dial}`}
            onChange={(e) => {
              const [code, dial] = e.target.value.split('|')
              const next = COUNTRY_DIALS.find((c) => c.code === code && c.dial === dial)
              if (next) setCountry(next)
            }}
            className="absolute inset-0 z-10 cursor-pointer opacity-0 outline-none focus:outline-none focus-visible:outline-none"
          >
            {COUNTRY_DIALS.map((c) => (
              <option key={`${c.code}-${c.dial}`} value={`${c.code}|${c.dial}`}>
                {c.name} ({c.dial})
              </option>
            ))}
          </select>
          <span className="ml-2 text-[13px] font-semibold tabular-nums tracking-tight text-neutral-800">
            {country.dial}
          </span>
          <ChevronDown className="ml-0.5 h-3.5 w-3.5 text-neutral-400" aria-hidden />
        </div>

        <div className="h-6 w-px shrink-0 bg-black/10" aria-hidden />

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
          className="h-full min-w-0 flex-1 appearance-none border-0 bg-transparent px-3 text-[15px] tracking-tight text-neutral-800 shadow-none outline-none ring-0 placeholder:text-neutral-400 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none active:outline-none"
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
        Get Buddy
        <span className="ml-2.5 font-medium tabular-nums text-white/55">$20/mo</span>
      </PixelButton>
    </form>
  )
}
