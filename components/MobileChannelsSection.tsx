'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Contact, Download } from 'lucide-react';
import ChannelIcon from '@/components/marketing/ChannelIcon';
import PixelButton from '@/components/ui/PixelButton';
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
  {
    id: 'briefing',
    text: 'Morning briefing — inbox triaged and 14 tasks completed overnight.',
    direction: 'in',
  },
  {
    id: 'leads',
    text: '23 leads enriched and scored. Top: Series B HR tech wants a demo this week.',
    direction: 'in',
  },
  {
    id: 'sarah',
    text: 'Sarah at Vanta replied to your outreach.',
    direction: 'in',
  },
  { id: 'demo', text: 'Book the demo for Thursday', direction: 'out' },
  { id: 'followup', text: 'Draft a follow-up to Sarah', direction: 'out' },
];

function TypingIndicator() {
  return (
    <div className="flex max-w-[72%] items-center gap-1 border border-slate-200 bg-white px-3 py-2.5">
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
    let delay = 800;

    CHAT_SCRIPT.forEach((message, index) => {
      if (message.direction === 'in' && index > 0) {
        timers.push(
          setTimeout(() => {
            setShowTyping(true);
          }, delay - 500),
        );
      }

      timers.push(
        setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(index + 1);
        }, delay),
      );

      delay += message.direction === 'in' ? 1500 : 1000;
    });

    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  const visibleMessages = CHAT_SCRIPT.slice(0, visibleCount);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[300px]"
      animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div
        className="pointer-events-none absolute -inset-8 rounded-full bg-trooper/10 blur-3xl"
        aria-hidden
      />

      <div className="relative rounded-[2.75rem] bg-gradient-to-b from-slate-700 via-slate-900 to-black p-[3px] shadow-[0_28px_60px_rgba(15,23,42,0.35)]">
        <div className="absolute -left-[2px] top-24 h-10 w-[3px] rounded-l bg-slate-700" aria-hidden />
        <div className="absolute -left-[2px] top-40 h-14 w-[3px] rounded-l bg-slate-700" aria-hidden />
        <div className="absolute -right-[2px] top-32 h-16 w-[3px] rounded-r bg-slate-700" aria-hidden />

        <div className="overflow-hidden rounded-[2.6rem] bg-slate-950 p-2">
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[#FAFAF8]">
            <div className="relative z-10 flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-slate-900">
              <span>9:41</span>
              <div className="flex items-center gap-1" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-slate-900" />
                <span className="h-2.5 w-2.5 rounded-sm border border-slate-900" />
              </div>
            </div>

            <div className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black" aria-hidden />

            <div className="border-b border-slate-200 bg-white/95 px-4 pb-3 pt-8 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-9 w-9 items-center justify-center border border-slate-200 bg-white">
                  <Image
                    src="/images/trooper-logomark.png"
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700">
                  Team Lead
                  <ArrowRight className="h-3 w-3 text-trooper" aria-hidden />
                </div>
              </div>
            </div>

            <div className="min-h-[390px] space-y-2.5 bg-[linear-gradient(180deg,#FAFAF8_0%,#f4f6ef_100%)] px-3 py-4">
              <AnimatePresence initial={false}>
                {visibleMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease }}
                    className={[
                      'max-w-[88%] px-3 py-2 text-[11px] leading-relaxed shadow-sm',
                      message.direction === 'in'
                        ? 'border border-slate-200 bg-white text-slate-700'
                        : 'ml-auto bg-trooper text-white',
                    ].join(' ')}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    {message.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {showTyping ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                >
                  <TypingIndicator />
                </motion.div>
              ) : null}
            </div>

            <div className="flex justify-center bg-[#FAFAF8] pb-2 pt-1">
              <div className="h-1 w-24 rounded-full bg-slate-900/80" aria-hidden />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ChannelTile({
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease }}
      viewport={{ once: true, margin: '-20px' }}
      className="bg-white"
    >
      <Link
        href={`/channels/${channelId}`}
        className="group flex h-full items-center gap-3 p-4 transition-colors hover:bg-trooper-50/50 sm:p-5"
      >
        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 bg-[#FAFAF8] transition-colors group-hover:border-trooper-200 group-hover:bg-white">
          <ChannelIcon channelId={channelId} channelName={channelName} iconUrl={iconUrl} size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">Channel</p>
          <p className="font-semibold text-slate-900">{channelName}</p>
        </div>
        <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-trooper" />
      </Link>
    </motion.div>
  );
}

function ConnectQrPanel() {
  return (
    <motion.div
      className="mt-8 overflow-hidden border border-slate-200 bg-white"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease }}
      viewport={{ once: true, margin: '-20px' }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr]">
        <div className="flex items-center justify-center border-b border-slate-200 bg-[#FAFAF8] p-5 sm:border-b-0 sm:border-r sm:p-6">
          <div className="relative">
            <div className="border border-slate-200 bg-white p-2 shadow-sm">
              <Image
                src="/images/trooper-connect-qr.png"
                alt="QR code to open Trooper channel setup"
                width={148}
                height={148}
                className="h-[148px] w-[148px]"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-10 w-10 items-center justify-center border border-slate-200 bg-white shadow-sm">
                <Image
                  src="/images/trooper-logomark.png"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-[#FAFAF8] text-trooper">
              <Contact className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </div>
            <div>
              <p className="font-funneldisplay text-lg tracking-tight text-slate-900 sm:text-xl">
                Save Trooper to your phone
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Scan to open channel setup, then message your workforce from iMessage, WhatsApp,
                Telegram, or email — same agents, same memory.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <PixelButton
              href={CHANNEL_SETUP_URL}
              external
              size="md"
              tone="brand"
              icon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              Connect channels
            </PixelButton>
            <PixelButton
              href="/download"
              size="md"
              variant="outline"
              tone="dark"
              icon={<Download className="h-3.5 w-3.5" />}
            >
              Get mobile apps
            </PixelButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function MobileChannelsSection() {
  return (
    <div className="pb-10 pt-2 md:pb-16">
      <div className="grid grid-cols-1 overflow-hidden border border-slate-200 bg-white lg:grid-cols-2">
        <div className="relative border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-0 pixel-camo-wash opacity-70" aria-hidden />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(250,250,248,0.88)_100%)]" aria-hidden />

          <motion.div
            className="relative flex min-h-[520px] items-center justify-center p-8 sm:p-10 lg:p-12"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <PhoneChatMockup />
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Chat with your workforce,
            <br />
            on the go.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2">
            {featuredChannels.map((channel, index) => (
              <ChannelTile
                key={channel.id}
                channelId={channel.id}
                channelName={channel.name}
                iconUrl={channel.icon}
                index={index}
              />
            ))}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            and SMS, Slack, Discord, Signal, WebChat
          </p>

          <ConnectQrPanel />

          <div className="mt-4">
            <Link
              href="/channels"
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-trooper transition-colors hover:text-trooper-700"
            >
              Browse all channels
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
