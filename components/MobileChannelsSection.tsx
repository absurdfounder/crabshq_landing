'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Download } from 'lucide-react';
import FieldCommsChannelIcon from '@/components/marketing/FieldCommsChannelIcon';
import { OPENCLAW_CHANNELS } from '@/lib/channelCatalog';

const ease = [0.22, 1, 0.36, 1] as const;
const CHANNEL_SETUP_URL = 'https://app.trooper.so/settings/channels';

const FEATURED_CHANNEL_IDS = ['imessage', 'telegram', 'whatsapp', 'email'] as const;

const featuredChannels = FEATURED_CHANNEL_IDS.map(
  (id) => OPENCLAW_CHANNELS.find((channel) => channel.id === id)!,
);

const MORE_CHANNELS = 'SMS, Slack, Discord, WebChat';

type ChatMessage = {
  id: string;
  text: string;
  direction: 'in' | 'out';
};

const CHAT_SCRIPT: ChatMessage[] = [
  { id: 'leads', text: '23 leads came in overnight — enriched and scored.', direction: 'in' },
  { id: 'demo', text: 'Top one is Series B HR tech. Wants a demo this week.', direction: 'in' },
  { id: 'sarah', text: 'Sarah at Vanta replied to your outreach.', direction: 'in' },
  { id: 'book', text: 'book the demo for Thursday', direction: 'out' },
  { id: 'draft', text: 'and draft a follow-up to Sarah', direction: 'out' },
];

function TypingIndicator() {
  return (
    <div className="inline-flex max-w-[78%] items-center gap-1 rounded-2xl rounded-tl-md bg-[#3A3A3C] px-3 py-2">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-white/45"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: 'easeInOut' }}
        />
      ))}
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
    let delay = 600;

    CHAT_SCRIPT.forEach((message, index) => {
      if (message.direction === 'in' && index > 0) {
        timers.push(setTimeout(() => setShowTyping(true), delay - 400));
      }

      timers.push(
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
        }, delay),
      );

      delay += message.direction === 'in' ? 1200 : 800;
    });

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const thread = threadRef.current;
    if (!viewport || !thread) return;

    const overflow = Math.max(0, thread.scrollHeight - viewport.clientHeight);
    setThreadOffset(overflow);
  }, [visibleCount, showTyping]);

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <div className="flex h-full min-h-0 flex-col bg-black">
      <div className="shrink-0 border-b border-white/10 bg-black px-3 pb-2 pt-8 text-center">
        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <Image
            src="/images/trooper-logomark.png"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <p className="mt-1 flex items-center justify-center gap-0.5 text-[11px] font-medium text-white">
          Trooper
          <ChevronRight className="h-3 w-3 text-white/40" strokeWidth={2} aria-hidden />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 100%)',
        }}
      >
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-1.5 px-3.5 pb-3 pt-1"
          animate={{ y: reduceMotion ? 0 : -threadOffset }}
          transition={{ duration: 0.45, ease }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleMessages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease }}
                className={[
                  'max-w-[88%] px-3 py-1.5 text-[10.5px] leading-[1.4] sm:text-[11px]',
                  message.direction === 'in'
                    ? 'rounded-2xl rounded-tl-md bg-[#3A3A3C] text-white'
                    : 'ml-auto rounded-2xl rounded-tr-md bg-fern text-white',
                ].join(' ')}
              >
                {message.text}
              </motion.div>
            ))}
          </AnimatePresence>

          {showTyping ? (
            <motion.div layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <TypingIndicator />
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}

/** Screen cutout aligned to public/images/iphone-frame.png (292×350). */
const IPHONE_SCREEN_INSET = {
  top: '12.57%',
  right: '12.33%',
  bottom: '5.14%',
  left: '12.33%',
} as const;

function PhoneChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]">
      <div
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[55%] w-[90%] -translate-x-1/2 rounded-full bg-fern/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        className="relative aspect-[292/350] w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div
          className="absolute overflow-hidden bg-black"
          style={{
            top: IPHONE_SCREEN_INSET.top,
            right: IPHONE_SCREEN_INSET.right,
            bottom: IPHONE_SCREEN_INSET.bottom,
            left: IPHONE_SCREEN_INSET.left,
            borderRadius: '1.45rem',
          }}
        >
          <PhoneChatScreen />
        </div>

        <Image
          src="/images/iphone-frame.png"
          alt="Trooper conversation on iPhone"
          fill
          sizes="(max-width: 640px) 280px, 320px"
          className="pointer-events-none z-10 select-none object-fill"
          priority
        />
      </motion.div>
    </div>
  );
}

function ChannelChip({ channelId, channelName }: { channelId: string; channelName: string }) {
  return (
    <Link
      href={`/channels/${channelId}`}
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[13px] font-medium text-white/90 transition-colors hover:border-white/20 hover:bg-white/[0.09] sm:px-3.5 sm:py-2 sm:text-sm"
    >
      <FieldCommsChannelIcon channelId={channelId} size={22} />
      <span>{channelName}</span>
    </Link>
  );
}

function ConnectCard() {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-5">
        <div className="relative shrink-0">
          <div className="overflow-hidden rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-white/10">
            <Image
              src="/images/trooper-connect-qr.png"
              alt="QR code to open Trooper channel setup"
              width={112}
              height={112}
              className="h-28 w-28"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-slate-200">
              <Image
                src="/images/trooper-logomark.png"
                alt=""
                width={18}
                height={18}
                className="h-4 w-4 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-base font-semibold text-white sm:text-[1.05rem]">Save Trooper to your phone</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/50">
            Scan to open channel setup — then message your workforce from the apps you already use.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={CHANNEL_SETUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-split transition-colors hover:bg-white/92 sm:w-auto"
            >
              <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
              Connect channels
            </a>
            <Link
              href="/download"
              className="inline-flex w-full items-center justify-center gap-1 text-sm font-medium text-white/55 transition-colors hover:text-white/80 sm:w-auto sm:px-2"
            >
              Mobile apps
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </div>
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

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        {/* Copy — first on mobile, right column on desktop */}
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
            <p className="text-xs text-white/35 sm:text-[13px]">+ {MORE_CHANNELS}</p>
          </div>

          <div className="hidden lg:block">
            <ConnectCard />
          </div>

          <Link
            href="/channels"
            className="mx-auto inline-flex items-center gap-1.5 text-sm font-medium text-fern transition-colors hover:text-fern-light lg:mx-0"
          >
            Browse all channels
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>

        {/* Phone — second on mobile, left column on desktop */}
        <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
          <PhoneChatMockup />
        </div>

        {/* Connect card — mobile/tablet only, below phone */}
        <div className="order-3 lg:hidden">
          <ConnectCard />
        </div>
      </div>
    </div>
  );
}
