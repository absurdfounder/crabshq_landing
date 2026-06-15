import Link from 'next/link';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import PixelButton from '@/components/ui/PixelButton';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import { OPENCLAW_CHANNELS, domainFromChannelIcon } from '@/lib/channelCatalog';
import { channelHubMeta } from '@/lib/channelContent';
import { getFaviconUrl } from '@/lib/favicon';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: channelHubMeta.title,
  description: channelHubMeta.description,
  alternates: { canonical: channelHubMeta.canonical },
  openGraph: {
    title: channelHubMeta.title,
    description: channelHubMeta.description,
    url: channelHubMeta.canonical,
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/trooper_social.png',
        width: 1200,
        height: 630,
        alt: 'Trooper Messaging Channels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/trooper_social.png',
        alt: 'Trooper Messaging Channels',
      },
    ],
  },
};

export default function ChannelsHubPage() {
  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-10">
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

      <SectionShell eyebrow="Channels" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {OPENCLAW_CHANNELS.map((channel) => {
              const domain = domainFromChannelIcon(channel.icon);
              const favicon = domain ? getFaviconUrl(domain, 32) : channel.icon;
              return (
                <Link
                  key={channel.id}
                  href={`/channels/${channel.id}`}
                  className="group flex flex-col gap-3 border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={favicon || channel.icon}
                      alt=""
                      className="h-8 w-8 rounded-sm object-contain"
                      loading="lazy"
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
              );
            })}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
