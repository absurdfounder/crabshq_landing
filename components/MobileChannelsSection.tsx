'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, FileSpreadsheet, FileText, Signal, Wifi } from 'lucide-react';
import FieldCommsChannelIcon from '@/components/marketing/FieldCommsChannelIcon';
import { OPENCLAW_CHANNELS } from '@/lib/channelCatalog';

const ease = [0.22, 1, 0.36, 1] as const;
const CHANNEL_SETUP_URL = 'https://app.trooper.so/settings/channels';

const FEATURED_CHANNEL_IDS = ['imessage', 'telegram', 'whatsapp', 'email'] as const;

const featuredChannels = FEATURED_CHANNEL_IDS.map(
  (id) => OPENCLAW_CHANNELS.find((channel) => channel.id === id)!,
);

const MORE_CHANNELS = 'SMS, Slack, Discord, WebChat';

type ChatMessage =
  | { id: string; direction: 'in' | 'out'; kind: 'text'; text: string }
  | { id: string; direction: 'in' | 'out'; kind: 'image' }
  | { id: string; direction: 'in' | 'out'; kind: 'file'; name: string; meta: string; fileKind: 'doc' | 'sheet' | 'pdf' };

const CHAT_SCRIPT: ChatMessage[] = [
  { id: 'leads', kind: 'text', text: '23 leads came in overnight — enriched and scored.', direction: 'in' },
  { id: 'demo', kind: 'text', text: 'Top one is Series B HR tech. Wants a demo this week.', direction: 'in' },
  { id: 'sarah', kind: 'text', text: 'Sarah at Vanta replied to your outreach.', direction: 'in' },
  { id: 'book', kind: 'text', text: 'book the demo for Thursday', direction: 'out' },
  { id: 'draft', kind: 'text', text: 'and draft a follow-up to Sarah', direction: 'out' },
  { id: 'confirm', kind: 'text', text: 'Done — demo booked Thu 2pm PT. Pulling assets now.', direction: 'in' },
  { id: 'chart', kind: 'image', direction: 'in' },
  { id: 'doc', kind: 'file', name: 'vanta-follow-up.docx', meta: 'DOCX · 18 KB', fileKind: 'doc', direction: 'in' },
  { id: 'csv', kind: 'file', name: 'lead-scores-jan.csv', meta: 'CSV · 42 KB', fileKind: 'sheet', direction: 'in' },
  { id: 'deck', kind: 'file', name: 'demo-deck-vanta.pdf', meta: 'PDF · 1.2 MB', fileKind: 'pdf', direction: 'in' },
  { id: 'ready', kind: 'text', text: 'Follow-up + deck attached. Review before I send to Sarah.', direction: 'in' },
];

function LeadChartImage() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-[#2C2C2E]">
      <div className="border-b border-white/10 px-2.5 py-1.5">
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/45">Lead score breakdown</p>
      </div>
      <div className="space-y-1.5 p-2.5">
        {[
          { label: 'Vanta', w: '92%' },
          { label: 'Rippling', w: '78%' },
          { label: 'Gusto', w: '64%' },
        ].map((row) => (
          <div key={row.label} className="grid grid-cols-[52px_1fr] items-center gap-2">
            <span className="truncate font-mono text-[9px] text-white/55">{row.label}</span>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-gradient-to-r from-fern to-fern-light" style={{ width: row.w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FileAttachment({ name, meta, fileKind }: { name: string; meta: string; fileKind: 'doc' | 'sheet' | 'pdf' }) {
  const icon =
    fileKind === 'sheet' ? (
      <FileSpreadsheet className="size-4 text-emerald-400" strokeWidth={2} />
    ) : (
      <FileText className={`size-4 ${fileKind === 'pdf' ? 'text-red-400' : 'text-blue-400'}`} strokeWidth={2} />
    );

  return (
    <div className="flex items-center gap-2.5 rounded-[14px] bg-[#2C2C2E] px-2.5 py-2 ring-1 ring-white/10">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/10">{icon}</span>
      <div className="min-w-0">
        <p className="truncate text-[11px] font-medium text-white">{name}</p>
        <p className="font-mono text-[9px] text-white/45">{meta}</p>
      </div>
    </div>
  );
}

function ChatBubble({
  message,
  isGrouped,
}: {
  message: ChatMessage;
  isGrouped: boolean;
}) {
  const isIn = message.direction === 'in';
  const shell = [
    'max-w-[88%] shadow-sm',
    isIn ? 'rounded-[18px]' : 'ml-auto rounded-[18px] bg-fern text-white',
    isIn && isGrouped ? 'rounded-tl-[4px]' : '',
    isIn && !isGrouped ? 'rounded-bl-[4px]' : '',
    !isIn && isGrouped ? 'rounded-tr-[4px]' : '',
    !isIn && !isGrouped ? 'rounded-br-[4px]' : '',
  ]
    .filter(Boolean)
    .join(' ');

  if (message.kind === 'image') {
    return (
      <div className={`${shell} overflow-hidden p-1`}>
        <LeadChartImage />
      </div>
    );
  }

  if (message.kind === 'file') {
    return (
      <div className={shell}>
        <FileAttachment name={message.name} meta={message.meta} fileKind={message.fileKind} />
      </div>
    );
  }

  return (
    <div
      className={[
        shell,
        'px-3 py-[7px] text-[11px] leading-[1.38]',
        isIn ? 'bg-[#3A3A3C] text-white' : '',
      ].join(' ')}
    >
      {message.text}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="inline-flex max-w-[78%] items-center gap-1 rounded-[18px] rounded-bl-[4px] bg-[#3A3A3C] px-3.5 py-2.5 shadow-sm">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-white/50"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div className="mt-2 flex shrink-0 items-center justify-between px-3 pb-1 pt-3 text-[10px] font-semibold text-white">
      <span className="tabular-nums opacity-50">9:41</span>
      <div className="flex items-center gap-1 text-white/90 opacity-50">
        <Signal className="size-3" strokeWidth={2.5} aria-hidden />
        <Wifi className="size-3" strokeWidth={2.5} aria-hidden />
        <span className="ml-0.5 inline-flex h-2.5 w-[18px] rounded-[3px] border border-white/35 p-[1px]">
          <span className="h-full w-[72%] rounded-[1px] bg-white" />
        </span>
      </div>
    </div>
  );
}

function PhoneChatScreen() {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? CHAT_SCRIPT.length : 0);
  const [showTyping, setShowTyping] = useState(!reduceMotion);
  const [threadOffset, setThreadOffset] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 700;

    CHAT_SCRIPT.forEach((message, index) => {
      const prev = CHAT_SCRIPT[index - 1];
      const showTypingBefore =
        message.direction === 'in' && index > 0 && prev?.direction === 'out';

      if (showTypingBefore) {
        timers.push(setTimeout(() => setShowTyping(true), delay - 500));
      }

      timers.push(
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
        }, delay),
      );

      if (message.kind === 'file' || message.kind === 'image') {
        delay += 750;
      } else if (message.direction === 'in') {
        delay += 1100;
      } else {
        delay += 800;
      }
    });

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const thread = threadRef.current;
    if (!viewport || !thread) return;
    setThreadOffset(Math.max(0, thread.scrollHeight - viewport.clientHeight));
  }, [visibleCount, showTyping]);

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#000000]">
      <PhoneStatusBar />

      <div className="shrink-0 border-b border-white/[0.06] px-3 pb-2.5 pt-1">
        <div className="flex items-center gap-2">
          <div className="mx-auto flex flex-col items-center">
            <div className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/12">
              <Image
                src="/images/trooper-logomark.png"
                alt=""
                width={22}
                height={22}
                className="size-[22px] object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <p className="mt-0.5 text-[11px] font-medium text-white">Trooper</p>
            <p className="text-[9px] text-white/35">AI workforce</p>
          </div>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-1 px-3.5 pb-2 pt-2"
          animate={{ y: reduceMotion ? 0 : -threadOffset }}
          transition={{ duration: 0.45, ease }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleMessages.map((message, i) => {
              const prev = visibleMessages[i - 1];
              const isGrouped = prev?.direction === message.direction;
              return (
                <motion.div
                  key={message.id}
                  layout
                  initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <ChatBubble message={message} isGrouped={isGrouped} />
                </motion.div>
              );
            })}
          </AnimatePresence>

          {showTyping ? (
            <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TypingIndicator />
            </motion.div>
          ) : null}
        </motion.div>
      </div>

      <div className="mb-4 shrink-0 border-t border-white/[0.06] px-3 py-2">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#1C1C1E] px-3 py-1.5">
          <span className="flex-1 text-[11px] text-white/25">iMessage</span>
          <span className="flex size-6 items-center justify-center rounded-full bg-fern text-[10px] font-bold text-white">
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

function IphoneDevice() {
  return (
    <div className="relative mx-auto w-full max-w-[272px] sm:max-w-[290px] lg:max-w-[300px]">
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div
          className="absolute left-1/2 top-[22%] -z-10 h-[65%] w-[110%] -translate-x-1/2 rounded-full bg-fern/20 blur-[56px]"
          aria-hidden
        />

        <div className="relative rounded-[2.65rem] bg-gradient-to-b from-[#48484a] via-[#2c2c2e] to-[#1c1c1e] p-[2.5px] shadow-[0_48px_96px_-28px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/[0.08]">
          <div className="relative overflow-hidden rounded-[2.45rem] bg-black">
            <div
              className="pointer-events-none absolute left-1/2 top-2 z-30 h-[22px] w-[76px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              aria-hidden
            />

            <div className="aspect-[9/19.2] w-full">
              <PhoneChatScreen />
            </div>

            <div
              className="pointer-events-none absolute inset-x-[38%] bottom-1.5 z-30 h-[4px] rounded-full bg-white/25"
              aria-hidden
            />
          </div>
        </div>

        <div
          className="pointer-events-none absolute -inset-x-6 -bottom-8 h-16 bg-gradient-to-t from-split/80 to-transparent"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}

function ChannelChip({ channelId, channelName }: { channelId: string; channelName: string }) {
  return (
    <Link
      href={`/channels/${channelId}`}
      className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-white/90 transition-all hover:border-white/16 hover:bg-white/[0.07] sm:px-3.5"
    >
      <FieldCommsChannelIcon channelId={channelId} size={20} />
      <span>{channelName}</span>
    </Link>
  );
}

function DarkMockCard({
  title,
  meta,
  children,
  footer,
}: {
  title: string;
  meta?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_24px_48px_-24px_rgba(0,0,0,0.5)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3 sm:px-5">
        <span className="text-[13px] font-semibold tracking-tight text-white sm:text-sm">{title}</span>
        {meta ? (
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35">{meta}</span>
        ) : null}
      </div>
      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
      {footer ? (
        <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] px-4 py-2.5 sm:px-5">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function ConnectCard() {
  return (
    <DarkMockCard title="Save Trooper to your phone" meta="channel setup">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
            <Image
              src="/images/trooper-connect-qr.png"
              alt="QR code to open Trooper channel setup"
              width={108}
              height={108}
              className="size-[108px]"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-8 items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200/80">
              <Image
                src="/images/trooper-logomark.png"
                alt=""
                width={18}
                height={18}
                className="size-[18px] object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-sm leading-relaxed text-white/50">
            Scan to open channel setup — then message your workforce from the apps you already use.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={CHANNEL_SETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-split transition-colors hover:bg-white/92 sm:w-auto"
            >
              <Download className="size-4" strokeWidth={2} aria-hidden />
              Connect channels
            </a>
            <Link
              href="/download"
              className="inline-flex w-full items-center justify-center gap-1 text-sm font-medium text-white/50 transition-colors hover:text-white/75 sm:w-auto sm:px-2"
            >
              Mobile apps
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </DarkMockCard>
  );
}

export default function MobileChannelsSection() {
  return (
    <div className="py-10 md:py-14 lg:py-16">
      <div className="mb-8 lg:mb-10">
        <span className="type-eyebrow-num-dark">
          <span className="text-white/40">[04]</span>
          <span>&nbsp;</span>
          Field Comms
        </span>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        {/* Phone stage */}
        <div className="relative order-2 flex justify-center lg:order-1 lg:justify-start">
          <div className="relative w-full max-w-[340px] overflow-hidden rounded-2xl lg:max-w-none">
            <div>
              <IphoneDevice />
            </div>
          </div>
        </div>

        {/* Copy */}
        <motion.div
          className="order-1 flex flex-col gap-6 lg:order-2 lg:gap-7"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="font-funneldisplay text-[1.75rem] leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08]">
              Chat with your workforce,
              <br className="hidden sm:block" />
              <span className="sm:whitespace-nowrap"> on the go.</span>
            </h2>
            <p className="mx-auto max-w-md text-[15px] leading-relaxed text-white/50 sm:text-base lg:mx-0 lg:max-w-lg">
              Text your agents from iMessage, WhatsApp, Telegram, or email — the same channels your
              team already checks.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 lg:items-start">
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {featuredChannels.map((channel) => (
                <ChannelChip key={channel.id} channelId={channel.id} channelName={channel.name} />
              ))}
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
              + {MORE_CHANNELS}
            </p>
          </div>

          <ConnectCard />

          <Link
            href="/channels"
            className="mx-auto inline-flex items-center gap-1.5 text-sm font-medium text-fern transition-colors hover:text-fern-light lg:mx-0"
          >
            Browse all channels
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
