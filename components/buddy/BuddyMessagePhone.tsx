'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronLeft, ChevronRight, Mic, Signal, Wifi } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

/** Poke-like muted outgoing — not iMessage blue. */
const OUT_BUBBLE = '#8E9AAF'
const IN_BUBBLE = '#F2F2F7'

type ChatMessage = { id: string; direction: 'in' | 'out'; text: string }

const SCRIPT: ChatMessage[] = [
  { id: '1', direction: 'in', text: 'enjoy your sunny day by the coast' },
  { id: '2', direction: 'out', text: "yeah i'm melting" },
  { id: '3', direction: 'in', text: "100°F! don't forget your sunscreen" },
  { id: '4', direction: 'in', text: 'airbnb host left some on the counter if u need it' },
  { id: '5', direction: 'out', text: 'omg awesome' },
  { id: '6', direction: 'in', text: 'want me to book dinner near soho for friday?' },
]

function bubbleRadius(direction: 'in' | 'out', isFirst: boolean) {
  if (direction === 'out') {
    return [
      'rounded-[20px]',
      isFirst ? 'rounded-tr-[20px]' : 'rounded-tr-[8px]',
      'rounded-br-[8px]',
      'rounded-tl-[20px] rounded-bl-[20px]',
    ].join(' ')
  }
  return [
    'rounded-[20px]',
    isFirst ? 'rounded-tl-[20px]' : 'rounded-tl-[8px]',
    'rounded-bl-[8px]',
    'rounded-tr-[20px] rounded-br-[20px]',
  ].join(' ')
}

function StatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-5 pb-0.5 pt-1 text-[12px] font-semibold text-neutral-900">
      <span className="tabular-nums tracking-tight">9:41</span>
      <div className="flex items-center gap-1 text-neutral-900">
        <Signal className="size-3" strokeWidth={2.5} aria-hidden />
        <Wifi className="size-3.5" strokeWidth={2.5} aria-hidden />
        <span className="ml-0.5 inline-flex h-[11px] w-[22px] items-center rounded-[3px] border border-neutral-900/80 p-[1.5px]">
          <span className="h-full w-[72%] rounded-[1px] bg-neutral-900" />
        </span>
      </div>
    </div>
  )
}

function TypingDots() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-[18px] bg-[#F2F2F7] px-3.5 py-3"
      aria-hidden
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-1.5 rounded-full bg-neutral-400"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -1.5, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function PhoneChrome({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full min-w-0">
      <div
        className="relative rounded-[2.35rem] p-[3px] shadow-[0_32px_64px_-24px_rgba(26,26,26,0.45)] sm:rounded-[2.7rem]"
        style={{
          background: 'linear-gradient(160deg, #e8e8ea 0%, #a1a1a6 40%, #3a3a3c 100%)',
        }}
      >
        <div className="relative aspect-[9/19.4] w-full overflow-hidden rounded-[2.15rem] bg-white sm:rounded-[2.5rem]">
          <div
            className="pointer-events-none absolute left-1/2 top-[10px] z-30 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:top-[12px] sm:h-[26px] sm:w-[100px]"
            aria-hidden
          />
          <div className="absolute inset-0 flex min-h-0 flex-col pt-9 sm:pt-11 [&>*]:min-h-0 [&>*]:flex-1">
            {children}
          </div>
          <div
            className="pointer-events-none absolute inset-x-[36%] bottom-2 z-30 h-[4px] rounded-full bg-black/15"
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
  const [typing, setTyping] = useState(false)
  const [threadOffset, setThreadOffset] = useState(0)
  const [cycle, setCycle] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!play) {
      setVisibleCount(reduceMotion ? SCRIPT.length : 0)
      setTyping(false)
      return
    }
    if (reduceMotion) {
      setVisibleCount(SCRIPT.length)
      setTyping(false)
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
      setTyping(false)
      setCycle((c) => c + 1)

      const step = (index: number) => {
        if (cancelled) return
        if (index > SCRIPT.length) {
          setTyping(true)
          schedule(() => {
            setTyping(false)
            schedule(runCycle, 2200)
          }, 1400)
          return
        }
        const msg = SCRIPT[index - 1]
        if (msg?.direction === 'in') {
          setTyping(true)
          schedule(() => {
            setTyping(false)
            setVisibleCount(index)
            schedule(() => step(index + 1), 700)
          }, 650)
          return
        }
        setVisibleCount(index)
        schedule(() => step(index + 1), 800)
      }
      schedule(() => step(1), 500)
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
  }, [visibleCount, typing])

  const visible = SCRIPT.slice(0, visibleCount)
  const done = visibleCount >= SCRIPT.length && !typing

  return (
    <div className="flex h-full min-h-0 flex-col bg-white font-[system-ui] text-neutral-900">
      <StatusBar />

      {/* Poke-style header: avatar tile + verified name */}
      <div className="relative z-10 shrink-0 px-3 pb-2 pt-1">
        <div className="grid grid-cols-[40px_1fr_40px] items-start">
          <span className="mt-1 flex size-8 items-center justify-center rounded-full bg-black/[0.06]">
            <ChevronLeft className="size-5 text-neutral-700" strokeWidth={2.25} aria-hidden />
          </span>
          <div className="flex flex-col items-center">
            <div className="flex size-11 items-center justify-center overflow-hidden rounded-[13px] bg-[#1f2a1a] shadow-sm ring-1 ring-black/10">
              <Image
                src="/images/trooper-logomark-64.webp"
                alt=""
                width={26}
                height={26}
                className="size-[26px] object-contain brightness-0 invert"
              />
            </div>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold tracking-tight text-neutral-900">
              <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-neutral-400/80">
                <Check className="size-2.5 text-white" strokeWidth={3} aria-hidden />
              </span>
              Buddy
              <ChevronRight className="size-3 text-neutral-400" strokeWidth={2.5} aria-hidden />
            </span>
          </div>
          <span className="mt-1" aria-hidden />
        </div>
      </div>

      <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-[3px] px-3.5 pb-8 pt-2"
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
                  className={isFirst && i > 0 ? 'mt-2.5' : ''}
                >
                  <div
                    className={[
                      isOut ? 'ml-auto' : '',
                      'max-w-[84%] px-[13px] py-[9px] text-[15px] leading-[1.28] tracking-[-0.01em]',
                      bubbleRadius(message.direction, isFirst),
                      isOut ? 'text-white' : 'text-neutral-900',
                    ].join(' ')}
                    style={{ background: isOut ? OUT_BUBBLE : IN_BUBBLE }}
                  >
                    {message.text}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {typing ? (
            <div className="mt-1">
              <TypingDots />
            </div>
          ) : null}

          {done ? (
            <p className="mt-0.5 pr-1 text-right text-[11px] text-neutral-400">Delivered</p>
          ) : null}
        </motion.div>

        {/* Soft fade into the composer — poke chat dissolve */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="relative z-10 shrink-0 bg-white px-2.5 pb-3.5 pt-1">
        <div className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E9E9EB] text-[20px] font-light leading-none text-neutral-500">
            +
          </span>
          <div className="flex min-h-[38px] flex-1 items-center rounded-full border border-black/8 bg-white pl-3.5 pr-2.5 shadow-sm">
            <span className="flex-1 text-[15px] text-neutral-400">Message Buddy</span>
            <Mic className="size-5 text-neutral-400" strokeWidth={1.75} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Field Comms phone chrome with a Poke-inspired Buddy Messages thread. */
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
      className={`mx-auto w-full max-w-[280px] sm:max-w-[320px] ${className}`}
      aria-label="Buddy on iMessage"
    >
      <PhoneChrome>
        <BuddyChat play={play} />
      </PhoneChrome>
    </div>
  )
}
