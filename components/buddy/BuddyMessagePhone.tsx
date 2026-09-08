'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, Mic, Signal, Video, Wifi } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const IMESSAGE_BLUE = '#007AFF'

type ChatMessage =
  | { id: string; kind: 'text'; direction: 'in' | 'out'; text: string }
  | { id: string; kind: 'text'; direction: 'in' | 'out'; text: string; delay?: number }

const SCRIPT: ChatMessage[] = [
  { id: '1', kind: 'text', direction: 'out', text: 'book dinner friday 7pm for 2 near soho' },
  { id: '2', kind: 'text', direction: 'in', text: 'on it — checking open tables now' },
  {
    id: '3',
    kind: 'text',
    direction: 'in',
    text: 'got lilia at 7:15. want me to reserve?',
  },
  { id: '4', kind: 'text', direction: 'out', text: 'yes, and add it to my calendar' },
  {
    id: '5',
    kind: 'text',
    direction: 'in',
    text: 'booked. calendar invite sent. i’ll text if anything changes.',
  },
]

function bubbleRadius(direction: 'in' | 'out', isFirst: boolean) {
  if (direction === 'out') {
    return [
      'rounded-[18px]',
      isFirst ? 'rounded-tr-[18px]' : 'rounded-tr-[6px]',
      'rounded-br-[6px]',
      'rounded-tl-[18px] rounded-bl-[18px]',
    ].join(' ')
  }
  return [
    'rounded-[18px]',
    isFirst ? 'rounded-tl-[18px]' : 'rounded-tl-[6px]',
    'rounded-bl-[6px]',
    'rounded-tr-[18px] rounded-br-[18px]',
  ].join(' ')
}

function StatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-3 pb-0.5 pt-0.5 text-[10px] font-semibold text-neutral-900 sm:px-5 sm:pt-1 sm:text-[12px]">
      <span className="tabular-nums tracking-tight">9:41</span>
      <div className="flex items-center gap-0.5 text-neutral-900 sm:gap-1">
        <Signal className="size-2.5 sm:size-3" strokeWidth={2.5} aria-hidden />
        <Wifi className="size-3 sm:size-3.5" strokeWidth={2.5} aria-hidden />
        <span className="ml-0.5 inline-flex h-[9px] w-[18px] items-center rounded-[3px] border border-neutral-900/80 p-[1px] sm:h-[11px] sm:w-[22px] sm:p-[1.5px]">
          <span className="h-full w-[72%] rounded-[1px] bg-neutral-900" />
        </span>
      </div>
    </div>
  )
}

function PhoneChrome({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="relative w-full min-w-0">
      {label ? (
        <p className="mb-2 text-center text-[12px] font-medium tracking-wide text-neutral-500">
          {label}
        </p>
      ) : null}
      <div
        className="relative rounded-[2.1rem] p-[3px] shadow-[0_28px_56px_-20px_rgba(26,26,26,0.38)] sm:rounded-[2.55rem]"
        style={{
          background: 'linear-gradient(160deg, #d4d4d6 0%, #8e8e93 38%, #3a3a3c 100%)',
        }}
      >
        <div className="relative aspect-[9/19.4] w-full overflow-hidden rounded-[1.95rem] bg-white sm:rounded-[2.35rem]">
          <div
            className="pointer-events-none absolute left-1/2 top-[8px] z-30 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:top-[10px] sm:h-[26px] sm:w-[96px]"
            aria-hidden
          />
          <div className="absolute inset-0 flex min-h-0 flex-col pt-7 sm:pt-10 [&>*]:min-h-0 [&>*]:flex-1">
            {children}
          </div>
          <div
            className="pointer-events-none absolute inset-x-[36%] bottom-1.5 z-30 h-[3px] rounded-full bg-black/15 sm:bottom-2 sm:h-[4px]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}

function BuddyChat({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion()
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? SCRIPT.length : 0)
  const [threadOffset, setThreadOffset] = useState(0)
  const [cycle, setCycle] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!play) {
      setVisibleCount(reduceMotion ? SCRIPT.length : 0)
      return
    }
    if (reduceMotion) {
      setVisibleCount(SCRIPT.length)
      return
    }

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    const clear = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
    const schedule = (fn: () => void, ms: number) => {
      clear()
      timeoutId = setTimeout(fn, ms)
    }

    const runCycle = () => {
      if (cancelled) return
      setVisibleCount(0)
      setCycle((c) => c + 1)
      const step = (index: number) => {
        if (cancelled) return
        if (index > SCRIPT.length) {
          schedule(runCycle, 2600)
          return
        }
        setVisibleCount(index)
        const msg = SCRIPT[index - 1]
        schedule(() => step(index + 1), msg?.direction === 'out' ? 750 : 950)
      }
      schedule(() => step(1), 400)
    }

    runCycle()
    return () => {
      cancelled = true
      clear()
    }
  }, [play, reduceMotion])

  useEffect(() => {
    const viewport = viewportRef.current
    const thread = threadRef.current
    if (!viewport || !thread) return
    setThreadOffset(Math.max(0, thread.scrollHeight - viewport.clientHeight))
  }, [visibleCount])

  const visible = SCRIPT.slice(0, visibleCount)

  return (
    <div className="flex h-full min-h-0 flex-col bg-white font-[system-ui] text-neutral-900">
      <StatusBar />

      <div className="relative z-10 shrink-0 px-2 pb-1.5 pt-0.5 sm:px-3 sm:pb-2 sm:pt-1">
        <div className="grid grid-cols-[40px_1fr_40px] items-start">
          <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-black/[0.06]">
            <ChevronLeft className="size-5 text-[#007AFF]" strokeWidth={2.5} aria-hidden />
          </span>
          <div className="flex flex-col items-center">
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full bg-[#F2F2F7] ring-1 ring-black/5">
              <Image
                src="/images/trooper-logomark-64.webp"
                alt=""
                width={22}
                height={22}
                className="size-[22px] object-contain"
              />
            </div>
            <span
              className="mt-1 inline-flex items-center rounded-full px-2.5 py-[3px] text-[11px] font-semibold text-white"
              style={{ background: IMESSAGE_BLUE }}
            >
              Buddy
            </span>
          </div>
          <span className="mt-1 ml-auto flex size-8 items-center justify-center rounded-full bg-black/[0.06]">
            <Video className="size-4 text-[#007AFF]" strokeWidth={2.25} aria-hidden />
          </span>
        </div>
      </div>

      <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-[3px] px-3 pb-2 pt-2"
          animate={{ y: reduceMotion ? 0 : -threadOffset }}
          transition={{ duration: 0.4, ease }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((message, i) => {
              const prev = visible[i - 1]
              const isFirst = prev?.direction !== message.direction
              const isOut = message.direction === 'out'
              return (
                <motion.div
                  key={`${cycle}-${message.id}`}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.26, ease }}
                  className={isFirst && i > 0 ? 'mt-2' : ''}
                >
                  <div
                    className={[
                      isOut ? 'ml-auto' : '',
                      'max-w-[82%] px-[12px] py-[8px] text-[15px] leading-[1.25] tracking-[-0.01em]',
                      bubbleRadius(message.direction, isFirst),
                      isOut ? 'bg-[#007AFF] text-white' : 'bg-[#E9E9EB] text-neutral-900',
                    ].join(' ')}
                  >
                    {message.text}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
          {visibleCount >= SCRIPT.length ? (
            <p className="mt-0.5 pr-1 text-right text-[11px] text-neutral-400">Read</p>
          ) : null}
        </motion.div>
      </div>

      <div className="shrink-0 bg-white px-2.5 pb-3 pt-1.5">
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E9E9EB] text-[20px] font-light leading-none text-neutral-500">
            +
          </span>
          <div className="flex min-h-[36px] flex-1 items-center rounded-full border border-black/10 bg-white pl-3.5 pr-2.5">
            <span className="flex-1 text-[15px] text-neutral-400">iMessage</span>
            <Mic className="size-5 text-neutral-400" strokeWidth={1.75} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Field Comms phone chrome — Buddy iMessage thread for the personal-assistant hero. */
export default function BuddyMessagePhone({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.28 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className={`mx-auto w-full max-w-[240px] sm:max-w-[280px] ${className}`}
      aria-label="Buddy on iMessage"
    >
      <PhoneChrome>
        <BuddyChat play={play} />
      </PhoneChrome>
    </div>
  )
}
