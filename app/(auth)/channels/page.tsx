import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import ChannelIcon from '@/components/marketing/ChannelIcon';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import { OPENCLAW_CHANNELS } from '@/lib/channelCatalog';
import { channelHubMeta } from '@/lib/channelContent';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import { ArrowRight } from 'lucide-react';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';

export const metadata = buildPageMetadata({
  title: channelHubMeta.title,
  description: channelHubMeta.description,
  canonical: channelHubMeta.canonical,
  ogKind: 'hub',
  ogSlug: 'channels',
});

export default function ChannelsHubPage() {
  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="page-hero-padding px-4 sm:px-6 lg:px-8 pb-10">
          <PixelMissionTag index="01" label="Comms hub" className="mb-4" />
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            Messaging Channels
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Command your Trooper workforce from Slack, WhatsApp, Telegram, Discord, Signal, iMessage, and Email.
            Same agents, same memory — whichever channel you message from.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Connect a channel
            </PixelButton>
            <PixelButton
              href="/features/chat-interfaces"
              size="lg"
              variant="outline"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Chat anywhere feature
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Channels" eyebrowNumber="02" bgClass="bg-slate-50" noBorderBottom={false}>
        <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-16 md:pb-24">
          <p className="mb-6 text-sm text-slate-600">
            All {OPENCLAW_CHANNELS.length} OpenClaw messaging channels supported in Trooper.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {OPENCLAW_CHANNELS.map((channel) => (
              <Link
                key={channel.id}
                href={`/channels/${channel.id}`}
                className="group flex min-h-[168px] flex-col gap-3 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <ChannelIcon
                    channelId={channel.id}
                    channelName={channel.name}
                    iconUrl={channel.icon}
                    size={32}
                    className="h-8 w-8"
                  />
                  <h2 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {channel.name}
                  </h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{channel.desc}</p>
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                  View setup →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>

      <MarketingSubpageTail />
    </div>
  );
}
