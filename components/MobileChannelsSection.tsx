'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, MessagesSquare } from 'lucide-react';
import ChannelIcon from '@/components/marketing/ChannelIcon';
import PixelButton from '@/components/ui/PixelButton';
import { OPENCLAW_CHANNELS } from '@/lib/channelCatalog';

const ease = [0.22, 1, 0.36, 1] as const;

const FEATURED_CHANNEL_IDS = ['imessage', 'telegram', 'whatsapp', 'email'] as const;

const featuredChannels = FEATURED_CHANNEL_IDS.map(
  (id) => OPENCLAW_CHANNELS.find((channel) => channel.id === id)!,
);

const INCOMING_MESSAGES = [
  'Morning briefing — inbox triaged and 14 tasks completed overnight.',
  '23 leads enriched and scored. Top: Series B HR tech wants a demo this week.',
  'Sarah at Vanta replied to your outreach.',
];

const OUTGOING_MESSAGES = ['Book the demo for Thursday', 'Draft a follow-up to Sarah'];

function PhoneChatMockup() {
  return (
    <div className="mx-auto w-full max-w-[280px] rounded-[2rem] border-[6px] border-slate-900 bg-slate-900 p-1.5 shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
      <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-white px-4 pb-3 pt-3">
          <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-slate-900" aria-hidden />
          <div className="flex flex-col items-center gap-1">
            <Image
              src="/images/trooper-logomark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            <div className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700">
              Team Lead
              <ArrowRight className="h-3 w-3 text-slate-400" aria-hidden />
            </div>
          </div>
        </div>

        <div className="min-h-[360px] space-y-2.5 bg-[#FAFAF8] px-3 py-4">
          {INCOMING_MESSAGES.map((message) => (
            <div
              key={message}
              className="max-w-[88%] border border-slate-200 bg-white px-3 py-2 text-[11px] leading-relaxed text-slate-700"
            >
              {message}
            </div>
          ))}
          {OUTGOING_MESSAGES.map((message) => (
            <div
              key={message}
              className="ml-auto max-w-[82%] bg-trooper px-3 py-2 text-[11px] leading-relaxed text-white"
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelChip({
  channelId,
  channelName,
  iconUrl,
}: {
  channelId: string;
  channelName: string;
  iconUrl: string;
}) {
  return (
    <Link
      href={`/channels/${channelId}`}
      className="inline-flex items-center gap-2 border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:border-trooper-200 hover:bg-trooper-50/40"
    >
      <ChannelIcon channelId={channelId} channelName={channelName} iconUrl={iconUrl} size={18} />
      <span>{channelName}</span>
    </Link>
  );
}

export default function MobileChannelsSection() {
  return (
    <div className="pb-10 pt-2 md:pb-16">
      <div className="grid grid-cols-1 overflow-hidden border border-slate-200 bg-white lg:grid-cols-2">
        <motion.div
          className="border-b border-slate-200 bg-[#FAFAF8] p-6 sm:p-8 lg:border-b-0 lg:border-r"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <PhoneChatMockup />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center p-6 sm:p-8 md:p-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            Chat with your workforce,
            <br />
            on the go.
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {featuredChannels.map((channel) => (
              <ChannelChip
                key={channel.id}
                channelId={channel.id}
                channelName={channel.name}
                iconUrl={channel.icon}
              />
            ))}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            and SMS, Slack, Discord, Signal, WebChat
          </p>

          <div className="mt-8 border border-slate-200 bg-[#FAFAF8] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-slate-200 bg-white">
                <MessagesSquare className="h-10 w-10 text-trooper" strokeWidth={1.5} aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-900">Connect channels in Trooper</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Message your agents from the apps you already use. Same workforce, same memory — whichever
                  channel you reply from.
                </p>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <PixelButton
                    href="https://app.trooper.so/settings/channels"
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
                  <PixelButton
                    href="/channels"
                    size="md"
                    variant="outline"
                    tone="dark"
                    icon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    Browse all channels
                  </PixelButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
