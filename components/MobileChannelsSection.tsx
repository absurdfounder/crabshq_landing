'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Contact, Download } from 'lucide-react';
import FieldCommsChannelIcon from '@/components/marketing/FieldCommsChannelIcon';
import { OPENCLAW_CHANNELS } from '@/lib/channelCatalog';

const ease = [0.22, 1, 0.36, 1] as const;
const CHANNEL_SETUP_URL = 'https://app.trooper.so/settings/channels';

const FEATURED_CHANNEL_IDS = ['imessage', 'telegram', 'whatsapp', 'email'] as const;

const featuredChannels = FEATURED_CHANNEL_IDS.map(
  (id) => OPENCLAW_CHANNELS.find((channel) => channel.id === id)!,
);

type ChatMessage = {
  id: string;
  text: string;
  direction: 'in' | 'out';
};

const CHAT_SCRIPT: ChatMessage[] = [
  { id: 'weather', text: 'Morning — nice day in SF, 64°.', direction: 'in' },
  {
    id: 'leads',
    text: '23 leads came in overnight, already enriched and scored.',
    direction: 'in',
  },
  {
    id: 'demo',
    text: 'Top one is a Series B HR tech — wants a demo this week.',
    direction: 'in',
  },
  { id: 'sarah', text: 'Also: Sarah at Vanta replied to your outreach.', direction: 'in' },
  { id: 'book', text: 'book the demo for Thursday', direction: 'out' },
  { id: 'draft', text: 'and draft a follow-up to Sarah', direction: 'out' },
];

function TypingIndicator() {
  return (
    <div className="inline-flex max-w-[72%] items-center gap-1 rounded-2xl rounded-tl-md bg-[#3A3A3C] px-3.5 py-2.5">
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
    let delay = 700;

    CHAT_SCRIPT.forEach((message, index) => {
      if (message.direction === 'in' && index > 0) {
        timers.push(setTimeout(() => setShowTyping(true), delay - 450));
      }

      timers.push(
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
        }, delay),
      );

      delay += message.direction === 'in' ? 1300 : 850;
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
      <div className="shrink-0 border-b border-white/10 bg-black px-4 pb-2 pt-9 text-center">
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
          <Image
            src="/images/trooper-logomark.png"
            alt=""
            width={22}
            height={22}
            className="h-5 w-5 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <p className="mt-1 flex items-center justify-center gap-0.5 text-[12px] font-medium text-white">
          Trooper
          <ChevronRight className="h-3.5 w-3.5 text-white/40" strokeWidth={2} aria-hidden />
        </p>
      </div>

      <div
        ref={viewportRef}
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 16%, black 100%)',
        }}
      >
        <motion.div
          ref={threadRef}
          className="flex min-h-full flex-col justify-end gap-2 px-8 pb-4 pt-2"
          animate={{ y: reduceMotion ? 0 : -threadOffset }}
          transition={{ duration: 0.45, ease }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {visibleMessages.map((message) => (
              <motion.div
                key={message.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease }}
                className={[
                  'max-w-[85%] px-3.5 py-2 text-[11px] leading-[1.45] sm:text-[12px]',
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
            <motion.div
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
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
    <motion.div
      className="relative mx-auto w-[min(100%,300px)] shrink-0 sm:w-[340px]"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative aspect-[292/350] w-full">
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
          alt="Trooper iMessage conversation on iPhone"
          fill
          sizes="340px"
          className="pointer-events-none z-10 select-none object-fill"
          priority
        />
      </div>
    </motion.div>
  );
}

function ChannelPill({
  channelId,
  channelName,
  index,
}: {
  channelId: string;
  channelName: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease }}
      viewport={{ once: true }}
    >
      <Link
        href={`/channels/${channelId}`}
        className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:border-white/22 hover:bg-white/10 sm:gap-3 sm:px-4 sm:py-2.5 sm:text-[15px]"
      >
        <FieldCommsChannelIcon channelId={channelId} size={26} />
        <span>{channelName}</span>
      </Link>
    </motion.div>
  );
}

function ConnectQrPanel() {
  return (
    <motion.div
      className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease }}
      viewport={{ once: true }}
    >
      <div className="relative mx-auto shrink-0 sm:mx-0">
        <div className="overflow-hidden rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200/80">
          <Image
            src="/images/trooper-connect-qr.png"
            alt="QR code to open Trooper channel setup"
            width={132}
            height={132}
            className="h-[132px] w-[132px]"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-slate-200">
            <Image
              src="/images/trooper-logomark.png"
              alt=""
              width={22}
              height={22}
              className="h-5 w-5 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
      </div>

      <div className="min-w-0 flex-1 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 sm:justify-start">
          <Contact className="h-5 w-5 text-white/50" strokeWidth={1.75} aria-hidden />
          <p className="text-base font-semibold text-white sm:text-lg">Save Trooper to your phone</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          Scan to open channel setup, then text your workforce from anywhere — iMessage, WhatsApp,
          Telegram, or email.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-start">
          <a
            href={CHANNEL_SETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-split transition-colors hover:bg-white/90 sm:w-auto"
          >
            <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
            Connect channels
          </a>
          <Link
            href="/download"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 sm:w-auto"
          >
            Mobile apps
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileChannelsSection() {
  return (
    <div className="py-8 md:py-14 lg:py-16">
      <div className="mb-8 md:mb-10">
        <span className="type-eyebrow-num-dark">
          <span className="text-white/40">[04]</span>
          <span>&nbsp;</span>
          Field Comms
        </span>
      </div>

      <div className="flex flex-col items-center gap-10 max-md:gap-8 lg:flex-row lg:items-start lg:gap-16 xl:gap-20">
        <div className="mx-auto w-[min(100%,300px)] shrink-0 sm:w-[340px] lg:mx-0 lg:pt-2">
          <PhoneChatMockup />
        </div>

        <motion.div
          className="w-full max-w-xl lg:max-w-none lg:flex-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="font-funneldisplay text-[1.625rem] leading-[1.15] tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Chat with your workforce,
            <br />
            on the go.
          </h2>

          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5">
            {featuredChannels.map((channel, index) => (
              <ChannelPill
                key={channel.id}
                channelId={channel.id}
                channelName={channel.name}
                index={index}
              />
            ))}
          </div>

          <p className="mt-4 text-sm text-white/45">and SMS, Slack, Discord, WebChat</p>

          <ConnectQrPanel />

          <Link
            href="/channels"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fern transition-colors hover:text-fern-light"
          >
            Browse all channels
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
