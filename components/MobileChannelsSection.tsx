'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  FileText,
  Mic,
  Signal,
  Video,
  Wifi,
} from 'lucide-react';
import FieldCommsChannelIcon from '@/components/marketing/FieldCommsChannelIcon';
import PixelButton from '@/components/ui/PixelButton';
import TrooperAvatar from '@/components/ui/TrooperAvatar';
import { getTrooper } from '@/lib/troopers';
import { PLATFORM_DOWNLOADS } from '@/lib/platformDownload';

const CHANNEL_BADGES: { id: string; name: string }[] = [
  { id: 'imessage', name: 'iMessage' },
  { id: 'whatsapp', name: 'WhatsApp' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'email', name: 'Gmail' },
  { id: 'sms', name: 'SMS' },
  { id: 'slack', name: 'Slack' },
  { id: 'discord', name: 'Discord' },
  { id: 'teams', name: 'Teams' },
];

/** Identity rainbow — static SVG marks in the headline (no RAF). */
const WORKFORCE_HANDLES = ['nova', 'scout', 'wren', 'pip'] as const;

function WorkforceAvatarStack() {
  const troopers = WORKFORCE_HANDLES.map((h) => getTrooper(h)).filter(Boolean);
  return (
    <span
      className="mx-1 inline-flex translate-y-[-0.05em] items-center align-middle sm:mx-1.5"
      aria-hidden
    >
      {troopers.map((trooper, i) => (
        <span
          key={trooper!.handle}
          className="relative inline-flex overflow-visible"
          style={{ marginLeft: i === 0 ? 0 : -5, zIndex: troopers.length - i }}
        >
          <span className="sm:hidden">
            <TrooperAvatar trooper={trooper!} size={26} />
          </span>
          <span className="hidden sm:inline-flex">
            <TrooperAvatar trooper={trooper!} size={34} />
          </span>
        </span>
      ))}
    </span>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;
const IMESSAGE_BLUE = '#007AFF';

/* ─── One Vanta story across both phones ─── */

type ChatMessage =
  | { id: string; direction: 'in' | 'out'; kind: 'text'; text: string }
  | { id: string; direction: 'in' | 'out'; kind: 'chart' }
  | { id: string; direction: 'in' | 'out'; kind: 'photo' }
  | {
      id: string;
      direction: 'in' | 'out';
      kind: 'file';
      name: string;
      meta: string;
      fileKind: 'doc' | 'pdf';
    };

const CHAT_SCRIPT: ChatMessage[] = [
  { id: 'leads', kind: 'text', text: '23 leads overnight — enriched and scored.', direction: 'in' },
  {
    id: 'demo',
    kind: 'text',
    text: 'Top one is Vanta. Series B. Wants a demo this week.',
    direction: 'in',
  },
  {
    id: 'book',
    kind: 'text',
    text: 'Book Thursday and draft a follow-up to Sarah.',
    direction: 'out',
  },
  { id: 'confirm', kind: 'text', text: 'Done — Thu 2pm PT. Assets + PR ready.', direction: 'in' },
  { id: 'chart', kind: 'chart', direction: 'in' },
  { id: 'photo', kind: 'photo', direction: 'in' },
  {
    id: 'doc',
    kind: 'file',
    name: 'vanta-follow-up.docx',
    meta: 'DOCX · 18 KB',
    fileKind: 'doc',
    direction: 'in',
  },
  {
    id: 'deck',
    kind: 'file',
    name: 'demo-deck-vanta.pdf',
    meta: 'PDF · 1.2 MB',
    fileKind: 'pdf',
    direction: 'in',
  },
  {
    id: 'ready',
    kind: 'text',
    text: 'PR for the Vanta demo page is up — merge when ready.',
    direction: 'in',
  },
];

function LeadChartCard() {
  return (
    <div className="overflow-hidden rounded-[18px] bg-white ring-1 ring-black/10">
      <div className="border-b border-black/[0.06] px-3 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-neutral-400">
          Lead score breakdown
        </p>
      </div>
      <div className="space-y-2 p-3">
        {[
          { label: 'Vanta', score: '92' },
          { label: 'Rippling', score: '78' },
          { label: 'Gusto', score: '64' },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2">
            <span className="truncate text-[10px] font-medium text-neutral-600">{row.label}</span>
            <span className="tabular-nums text-[11px] font-semibold text-[#34C759]">{row.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoBubble() {
  return (
    <div className="overflow-hidden rounded-[18px] ring-1 ring-black/10">
      <div className="relative aspect-[4/3] w-full min-w-0">
        <Image
          src="/images/desktop/wallpaper.png"
          alt=""
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>
    </div>
  );
}

function FileBubble({
  name,
  meta,
  fileKind,
}: {
  name: string;
  meta: string;
  fileKind: 'doc' | 'pdf';
}) {
  return (
    <div className="flex w-full max-w-[90%] min-w-0 items-center gap-2 rounded-[18px] bg-white px-2 py-1.5 ring-1 ring-black/10 sm:gap-2.5 sm:px-2.5 sm:py-2">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-[#F2F2F7] sm:size-10">
        <FileText
          className={`size-4 sm:size-5 ${fileKind === 'pdf' ? 'text-[#FF3B30]' : 'text-[#007AFF]'}`}
          strokeWidth={1.75}
        />
      </span>
      <div className="min-w-0 pr-1">
        <p className="truncate text-[11px] font-medium leading-tight text-neutral-900 sm:text-[13px]">
          {name}
        </p>
        <p className="mt-0.5 text-[10px] text-neutral-400 sm:text-[11px]">{meta}</p>
      </div>
    </div>
  );
}

function bubbleRadius(direction: 'in' | 'out', isFirst: boolean, isLast: boolean) {
  // iOS Messages: big outer corners, tight corners when grouped
  if (direction === 'out') {
    return [
      'rounded-[18px]',
      isFirst ? 'rounded-tr-[18px]' : 'rounded-tr-[6px]',
      isLast ? 'rounded-br-[6px]' : 'rounded-br-[6px]',
      'rounded-tl-[18px] rounded-bl-[18px]',
    ].join(' ');
  }
  return [
    'rounded-[18px]',
    isFirst ? 'rounded-tl-[18px]' : 'rounded-tl-[6px]',
    isLast ? 'rounded-bl-[6px]' : 'rounded-bl-[6px]',
    'rounded-tr-[18px] rounded-br-[18px]',
  ].join(' ');
}

function ChatBubble({
  message,
  isFirst,
  isLast,
}: {
  message: ChatMessage;
  isFirst: boolean;
  isLast: boolean;
}) {
  const isOut = message.direction === 'out';
  const align = isOut ? 'ml-auto' : '';
  const radius = bubbleRadius(message.direction, isFirst, isLast);

  if (message.kind === 'chart') {
    return (
      <div className={`${align} w-[86%] max-w-[220px]`}>
        <LeadChartCard />
      </div>
    );
  }

  if (message.kind === 'photo') {
    return (
      <div className={`${align} w-[78%] max-w-[200px]`}>
        <PhotoBubble />
      </div>
    );
  }

  if (message.kind === 'file') {
    return (
      <div className={align}>
        <FileBubble name={message.name} meta={message.meta} fileKind={message.fileKind} />
      </div>
    );
  }

  return (
    <div
      className={[
        align,
        'max-w-[82%] px-[9px] py-[6px] text-[12px] leading-[1.25] tracking-[-0.01em] sm:px-[12px] sm:py-[8px] sm:text-[15px]',
        radius,
        isOut ? 'bg-[#007AFF] text-white' : 'bg-[#E9E9EB] text-neutral-900',
      ].join(' ')}
    >
      {message.text}
    </div>
  );
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
  );
}

function ImessageScreen({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? CHAT_SCRIPT.length : 0);
  const [threadOffset, setThreadOffset] = useState(0);
  const [cycle, setCycle] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!play) {
      setVisibleCount(reduceMotion ? CHAT_SCRIPT.length : 0);
      return;
    }
    if (reduceMotion) {
      setVisibleCount(CHAT_SCRIPT.length);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
    const schedule = (fn: () => void, ms: number) => {
      clear();
      timeoutId = setTimeout(fn, ms);
    };

    const runCycle = () => {
      if (cancelled) return;
      setVisibleCount(0);
      setCycle((c) => c + 1);

      const step = (index: number) => {
        if (cancelled) return;
        if (index > CHAT_SCRIPT.length) {
          schedule(runCycle, 2800);
          return;
        }
        setVisibleCount(index);
        const msg = CHAT_SCRIPT[index - 1];
        const wait =
          msg?.kind === 'text' ? (msg.direction === 'out' ? 800 : 1000) : msg?.kind === 'photo' ? 900 : 750;
        schedule(() => step(index + 1), wait);
      };
      schedule(() => step(1), 450);
    };

    runCycle();
    return () => {
      cancelled = true;
      clear();
    };
  }, [play, reduceMotion]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const thread = threadRef.current;
    if (!viewport || !thread) return;
    setThreadOffset(Math.max(0, thread.scrollHeight - viewport.clientHeight));
  }, [visibleCount]);

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <div className="flex h-full min-h-0 flex-col bg-white font-[system-ui] text-neutral-900">
      <StatusBar />

      {/* Nav — matches real Messages: back circle, avatar + blue name pill, FaceTime */}
      <div className="relative z-10 shrink-0 px-2 pb-1.5 pt-0.5 sm:px-3 sm:pb-2 sm:pt-1">
        <div className="grid grid-cols-[32px_1fr_32px] items-start sm:grid-cols-[40px_1fr_40px]">
          <button
            type="button"
            tabIndex={-1}
            className="mt-0.5 flex size-6 items-center justify-center rounded-full bg-black/[0.06] sm:mt-1 sm:size-8"
            aria-hidden
          >
            <ChevronLeft className="size-4 text-[#007AFF] sm:size-5" strokeWidth={2.5} />
          </button>

          <div className="flex flex-col items-center">
            <div className="flex size-7 items-center justify-center overflow-hidden rounded-full bg-[#F2F2F7] ring-1 ring-black/5 sm:size-10">
              <Image
                src="/images/trooper-logomark-64.webp"
                alt=""
                width={22}
                height={22}
                className="size-[16px] object-contain sm:size-[22px]"
              />
            </div>
            <span
              className="mt-0.5 inline-flex items-center rounded-full px-1.5 py-[2px] text-[9px] font-semibold text-white sm:mt-1 sm:px-2.5 sm:py-[3px] sm:text-[11px]"
              style={{ background: IMESSAGE_BLUE }}
            >
              Trooper
            </span>
          </div>

          <button
            type="button"
            tabIndex={-1}
            className="mt-0.5 ml-auto flex size-6 items-center justify-center rounded-full bg-black/[0.06] sm:mt-1 sm:size-8"
            aria-hidden
          >
            <Video className="size-3 text-[#007AFF] sm:size-4" strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div ref={viewportRef} className="relative min-h-0 flex-1 overflow-hidden bg-white">
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-[2px] px-2 pb-1.5 pt-1.5 sm:gap-[3px] sm:px-3 sm:pb-2 sm:pt-2"
          animate={{ y: reduceMotion ? 0 : -threadOffset }}
          transition={{ duration: 0.4, ease }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleMessages.map((message, i) => {
              const prev = visibleMessages[i - 1];
              const next = visibleMessages[i + 1];
              const isFirst = prev?.direction !== message.direction;
              const isLast = next?.direction !== message.direction;
              return (
                <motion.div
                  key={`${cycle}-${message.id}`}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.26, ease }}
                  className={isFirst && i > 0 ? 'mt-2' : ''}
                >
                  <ChatBubble message={message} isFirst={isFirst} isLast={isLast} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {visibleCount >= CHAT_SCRIPT.length ? (
            <p className="mt-0.5 pr-1 text-right text-[11px] text-neutral-400">Read</p>
          ) : null}
        </motion.div>
      </div>

      {/* Composer — + | iMessage pill with mic (real Messages, not green send) */}
      <div className="shrink-0 bg-white px-1.5 pb-2 pt-1 sm:px-2.5 sm:pb-3 sm:pt-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#E9E9EB] text-[16px] font-light leading-none text-neutral-500 sm:size-8 sm:text-[20px]">
            +
          </span>
          <div className="flex min-h-[28px] flex-1 items-center rounded-full border border-black/10 bg-white pl-2.5 pr-2 sm:min-h-[36px] sm:pl-3.5 sm:pr-2.5">
            <span className="flex-1 text-[12px] text-neutral-400 sm:text-[15px]">iMessage</span>
            <Mic className="size-4 text-neutral-400 sm:size-5" strokeWidth={1.75} aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Trooper app — same Vanta PR ─── */

function TrooperAppScreen({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(reduceMotion ? 4 : 0);

  useEffect(() => {
    if (!play) {
      setStep(reduceMotion ? 4 : 0);
      return;
    }
    if (reduceMotion) {
      setStep(4);
      return;
    }

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const clear = () => {
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
    const schedule = (fn: () => void, ms: number) => {
      clear();
      timeoutId = setTimeout(fn, ms);
    };

    const run = () => {
      if (cancelled) return;
      setStep(0);
      schedule(() => {
        if (cancelled) return;
        setStep(1);
        schedule(() => {
          if (cancelled) return;
          setStep(2);
          schedule(() => {
            if (cancelled) return;
            setStep(3);
            schedule(() => {
              if (cancelled) return;
              setStep(4);
              schedule(run, 3200);
            }, 700);
          }, 700);
        }, 650);
      }, 400);
    };

    run();
    return () => {
      cancelled = true;
      clear();
    };
  }, [play, reduceMotion]);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#0c0b09] font-[system-ui] text-[#f2f0ea]">
      <div className="shrink-0 px-2.5 pb-1.5 pt-0.5 sm:px-4 sm:pb-2 sm:pt-1">
        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#7a776e] sm:text-[10px]">
          Trooper
        </p>
      </div>

      <div className="relative min-h-0 flex-1 space-y-2 overflow-y-auto overflow-x-hidden px-2 pb-3 sm:space-y-3 sm:px-4 sm:pb-4">
        {step < 1 ? (
          <div className="absolute inset-x-0 bottom-4 flex flex-col items-center gap-1.5 sm:bottom-6 sm:gap-2">
            {getTrooper('scout') ? (
              <>
                <span className="sm:hidden">
                  <TrooperAvatar trooper={getTrooper('scout')!} size={40} live animation="listening" />
                </span>
                <span className="hidden sm:inline-flex">
                  <TrooperAvatar trooper={getTrooper('scout')!} size={56} live animation="listening" />
                </span>
              </>
            ) : null}
            <p className="text-[9px] text-[#7a776e] sm:text-[11px]">Scout is on the Vanta task…</p>
          </div>
        ) : null}
        <AnimatePresence mode="sync">
          {step >= 1 ? (
            <motion.div
              key="title"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease }}
              className="px-0.5"
            >
              <h2 className="text-[12px] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[16px] sm:leading-[1.25]">
                Add Vanta demo page + follow-up assets
              </h2>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[9px] text-[#9a978e] sm:mt-2 sm:gap-2 sm:text-[11px]">
                <span className="rounded-full bg-[rgba(61,214,140,0.14)] px-1.5 py-0.5 font-medium text-[#3dd68c] sm:px-2">
                  Open
                </span>
                <span className="text-[#3dd68c]">+48</span>
                <span className="text-[#f09595]">−6</span>
                <span>3 Files</span>
              </div>
            </motion.div>
          ) : null}

          {step >= 2 ? (
            <motion.div
              key="merge"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease }}
              className="rounded-xl border border-white/[0.09] bg-[#171612] p-2.5 sm:rounded-2xl sm:p-4"
            >
              <p className="mb-1.5 text-[11px] font-medium sm:mb-2.5 sm:text-[13px]">Ready to Merge</p>
              <div className="mb-2 flex items-center gap-1.5 sm:mb-3 sm:gap-2">
                <motion.span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#3dd68c] text-black sm:size-6"
                  initial={reduceMotion ? false : { scale: 0.6 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                >
                  <Check className="size-3 sm:size-3.5" strokeWidth={3} />
                </motion.span>
                <span className="text-[9px] leading-snug text-[#c8c4b8] sm:text-[11px]">
                  All required checks passed
                </span>
              </div>
              <button
                type="button"
                disabled
                className="h-8 w-full rounded-lg bg-[#f2f0ea] text-[11px] font-semibold text-[#0c0b09] sm:h-10 sm:rounded-xl sm:text-[13px]"
              >
                Squash & Merge
              </button>
            </motion.div>
          ) : null}

          {step >= 3 ? (
            <motion.div
              key="demo"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease }}
            >
              <p className="mb-1 text-[9px] text-[#7a776e] sm:mb-1.5 sm:text-[11px]">Demos</p>
              <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#171612] sm:rounded-2xl">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/images/desktop/wallpaper.png"
                    alt=""
                    fill
                    className="object-cover opacity-90"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="flex size-7 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35 backdrop-blur-sm sm:size-9"
                      animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="ml-0.5 text-[9px] text-white sm:text-[11px]">▶</span>
                    </motion.div>
                  </div>
                  <div className="absolute inset-x-2 bottom-1.5 sm:inset-x-3 sm:bottom-2.5">
                    <p className="text-[10px] font-semibold text-white sm:text-[12px]">Vanta walkthrough</p>
                    <p className="text-[8px] text-white/65 sm:text-[10px]">og-image · demo assets</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}

          {step >= 4 ? (
            <motion.div
              key="files"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, ease }}
              className="space-y-2 sm:space-y-3"
            >
              <div>
                <p className="mb-1 text-[9px] text-[#7a776e] sm:mb-1.5 sm:text-[11px]">Files</p>
                <div className="overflow-hidden rounded-xl border border-white/[0.09] bg-[#171612] sm:rounded-2xl">
                  <div className="flex items-center gap-1.5 border-b border-white/[0.09] px-2 py-1.5 sm:gap-2 sm:px-3.5 sm:py-2.5">
                    <ChevronDown className="size-3 shrink-0 text-[#9a978e] sm:size-3.5" />
                    <span className="min-w-0 flex-1 truncate font-mono text-[9px] sm:text-[11px]">
                      app/demos/vanta.tsx
                    </span>
                    <span className="text-[9px] text-[#3dd68c] sm:text-[11px]">+48</span>
                    <span className="text-[9px] text-[#f09595] sm:text-[11px]">−6</span>
                  </div>
                  <div className="px-0.5 py-1 font-mono text-[8px] leading-[1.55] sm:text-[10px]">
                    <div className="grid grid-cols-[22px_1fr] bg-[rgba(240,149,149,0.14)] sm:grid-cols-[28px_1fr]">
                      <span className="px-0.5 text-right text-[#9a978e]/70 sm:px-1">18</span>
                      <span className="truncate px-1 text-[#f09595]">- title: &quot;Generic demo&quot;</span>
                    </div>
                    <div className="grid grid-cols-[22px_1fr] bg-[rgba(61,214,140,0.14)] sm:grid-cols-[28px_1fr]">
                      <span className="px-0.5 text-right text-[#9a978e]/70 sm:px-1">18</span>
                      <span className="truncate px-1 text-[#3dd68c]">+ title: &quot;Vanta · Thu 2pm&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 rounded-xl border border-white/[0.09] bg-[#171612] px-2 py-1.5 sm:gap-2 sm:rounded-2xl sm:px-3.5 sm:py-2.5">
                <Check className="size-3 text-[#3dd68c] sm:size-3.5" strokeWidth={3} />
                <span className="min-w-0 flex-1 truncate text-[9px] text-[#c8c4b8] sm:text-[11px]">
                  Marketing preview live
                </span>
                <span className="text-[8px] text-[#9a978e] sm:text-[10px]">1m</span>
                <ArrowUpRight className="size-3 text-[#9a978e] sm:size-3.5" />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PhoneDevice({
  children,
  screenBg,
  label,
}: {
  children: ReactNode;
  screenBg: string;
  label: string;
}) {
  return (
    <div className="relative w-full min-w-0">
      <p className="mb-1.5 text-center text-[10px] font-medium tracking-wide text-neutral-500 sm:mb-2.5 sm:text-[12px]">
        {label}
      </p>
      <div
        className="relative rounded-[1.65rem] p-[2px] shadow-[0_20px_40px_-18px_rgba(26,26,26,0.35)] sm:rounded-[2.55rem] sm:p-[3px] sm:shadow-[0_28px_56px_-20px_rgba(26,26,26,0.35)]"
        style={{
          background: 'linear-gradient(160deg, #d4d4d6 0%, #8e8e93 38%, #3a3a3c 100%)',
        }}
      >
        <div
          className="relative aspect-[9/19.4] w-full overflow-hidden rounded-[1.5rem] sm:rounded-[2.35rem]"
          style={{ background: screenBg }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[6px] z-30 h-[14px] w-[52px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)] sm:top-[10px] sm:h-[26px] sm:w-[96px]"
            aria-hidden
          />
          <div className="absolute inset-0 flex min-h-0 flex-col pt-5 sm:pt-10 [&>*]:min-h-0 [&>*]:flex-1">
            {children}
          </div>
          <div
            className="pointer-events-none absolute inset-x-[36%] bottom-1 z-30 h-[2.5px] rounded-full bg-black/15 sm:bottom-2 sm:h-[4px]"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function PhonePair() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPlay(e.isIntersecting), { threshold: 0.28 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex w-full max-w-full flex-row items-end justify-center gap-2.5 sm:gap-5 lg:gap-6"
      aria-label="iMessage chat and Trooper app on iPhone"
    >
      <div className="w-[min(46%,10.5rem)] min-w-0 sm:w-auto sm:max-w-[210px] sm:flex-none">
        <PhoneDevice screenBg="#ffffff" label="iMessage">
          <ImessageScreen play={play} />
        </PhoneDevice>
      </div>
      <div className="w-[min(46%,10.5rem)] min-w-0 sm:w-auto sm:max-w-[210px] sm:flex-none">
        <PhoneDevice screenBg="#0c0b09" label="Trooper app">
          <TrooperAppScreen play={play} />
        </PhoneDevice>
      </div>
    </div>
  );
}

function ChannelBadge({ id, name }: { id: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-neutral-600">
      <FieldCommsChannelIcon channelId={id} size={24} />
      <span>{name}</span>
    </span>
  );
}

export default function MobileChannelsSection() {
  const ios = PLATFORM_DOWNLOADS.ios;
  const android = PLATFORM_DOWNLOADS.android;

  return (
    <section className="relative overflow-visible bg-canvas">
      <div className="rail overflow-visible border-t border-[var(--color-line)] py-9 sm:py-16 lg:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:items-center lg:gap-10 xl:gap-14">
          <div className="w-full min-w-0 text-left">
            <h2 className="h2-section text-balance">
              Chat with your{' '}
              <span className="inline sm:whitespace-nowrap">
                workforce
                <WorkforceAvatarStack />
              </span>{' '}
              on the go.
            </h2>
            <p className="lede">
              Text your agents from the apps you already live in. Review work and ship from the
              Trooper app.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
              {CHANNEL_BADGES.map((channel) => (
                <ChannelBadge key={channel.id} id={channel.id} name={channel.name} />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <PixelButton href={ios.href} external={ios.external} size="sm" tone="dark">
                <span className="inline-flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ios.iconSrc}
                    alt=""
                    aria-hidden
                    className="h-4 w-4 object-contain brightness-0 invert"
                  />
                  {ios.label}
                </span>
              </PixelButton>
              <PixelButton
                href={android.href}
                external={android.external}
                size="sm"
                variant="outline"
                tone="dark"
              >
                <span className="inline-flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={android.iconSrc} alt="" aria-hidden className="h-4 w-4 object-contain" />
                  {android.label}
                </span>
              </PixelButton>
            </div>

            <Link href="/channels" className="group link-mono mt-5 inline-flex">
              <span>Browse all channels</span>
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          <PhonePair />
        </div>
      </div>
    </section>
  );
}
