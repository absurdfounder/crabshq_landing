'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, Contact, Download } from 'lucide-react';
import ChannelIcon from '@/components/marketing/ChannelIcon';
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
    <div className="inline-flex max-w-[72%] items-center gap-1 rounded-2xl rounded-tl-md bg-[#E9E9EB] px-3.5 py-2.5">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-slate-400"
          animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function PhoneChatMockup() {
  const reduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduceMotion ? CHAT_SCRIPT.length : 0);
  const [showTyping, setShowTyping] = useState(!reduceMotion);

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

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[290px] shrink-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease }}
      viewport={{ once: true, margin: '-40px' }}
    >
      <div className="rounded-[2.75rem] border-[10px] border-slate-950 bg-slate-950 shadow-[0_32px_64px_-12px_rgba(15,23,42,0.35)]">
        <div className="overflow-hidden rounded-[2rem] bg-white">
          <div className="relative bg-white px-4 pb-3 pt-10 text-center">
            <div className="absolute left-1/2 top-2.5 h-6 w-[88px] -translate-x-1/2 rounded-full bg-slate-950" aria-hidden />
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-trooper-50 ring-1 ring-trooper/20">
              <Image
                src="/images/trooper-logomark.png"
                alt=""
                width={26}
                height={26}
                className="h-6 w-6 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <p className="mt-2 flex items-center justify-center gap-0.5 text-[13px] font-medium text-slate-900">
              Trooper
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} aria-hidden />
            </p>
          </div>

          <div className="min-h-[400px] space-y-2 bg-white px-3.5 pb-5 pt-1">
            <AnimatePresence initial={false}>
              {visibleMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.32, ease }}
                  className={[
                    'max-w-[88%] px-3.5 py-2 text-[12px] leading-[1.45]',
                    message.direction === 'in'
                      ? 'rounded-2xl rounded-tl-md bg-[#E9E9EB] text-slate-900'
                      : 'ml-auto rounded-2xl rounded-tr-md bg-trooper text-white',
                  ].join(' ')}
                >
                  {message.text}
                </motion.div>
              ))}
            </AnimatePresence>

            {showTyping ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <TypingIndicator />
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChannelPill({
  channelId,
  channelName,
  iconUrl,
  index,
}: {
  channelId: string;
  channelName: string;
  iconUrl: string;
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
        className="inline-flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[15px] font-medium text-slate-800 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
      >
        <ChannelIcon channelId={channelId} channelName={channelName} iconUrl={iconUrl} size={20} />
        <span>{channelName}</span>
      </Link>
    </motion.div>
  );
}

function ConnectQrPanel() {
  return (
    <motion.div
      className="mt-10 flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-slate-50 p-5 sm:flex-row sm:items-center sm:p-6"
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
          <Contact className="h-5 w-5 text-slate-500" strokeWidth={1.75} aria-hidden />
          <p className="text-base font-semibold text-slate-900 sm:text-lg">Save Trooper to your phone</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Scan to open channel setup, then text your workforce from anywhere — iMessage, WhatsApp,
          Telegram, or email.
        </p>
        <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-start">
          <a
            href={CHANNEL_SETUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 sm:w-auto"
          >
            <Download className="h-4 w-4" strokeWidth={2} aria-hidden />
            Connect channels
          </a>
          <Link
            href="/download"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
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
    <div className="pb-12 pt-4 md:pb-20 md:pt-6">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16 xl:gap-20">
        <PhoneChatMockup />

        <motion.div
          className="w-full max-w-xl lg:max-w-none lg:flex-1"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="font-funneldisplay text-[2rem] leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
            Chat with your workforce,
            <br />
            on the go.
          </h2>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {featuredChannels.map((channel, index) => (
              <ChannelPill
                key={channel.id}
                channelId={channel.id}
                channelName={channel.name}
                iconUrl={channel.icon}
                index={index}
              />
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-500">and SMS, Slack, Discord, WebChat</p>

          <ConnectQrPanel />

          <Link
            href="/channels"
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-trooper transition-colors hover:text-trooper-700"
          >
            Browse all channels
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
