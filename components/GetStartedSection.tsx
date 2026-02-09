'use client';

import Image from 'next/image';
import { Search, Palette, BarChart3, Globe, MessageSquare, UserPlus } from 'lucide-react';

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

const features = [
  {
    icon: Search,
    label: 'SEO-optimized',
    color: 'text-lime-500',
  },
  {
    icon: Palette,
    label: 'Fully customizable',
    color: 'text-violet-500',
  },
  {
    icon: BarChart3,
    label: 'Built-in analytics',
    color: 'text-red-500',
  },
  {
    icon: Globe,
    label: 'Custom domains',
    color: 'text-red-500',
  },
  {
    icon: MessageSquare,
    label: 'Collect customer feedback',
    color: 'text-emerald-500',
  },
  {
    icon: UserPlus,
    label: 'Invite your team',
    color: 'text-pink-500',
  },
];

const integrations = [
  {
    name: 'Intercom',
    logo: 'https://static.ferndesk.com/assets/logos/intercom.png',
  },
  {
    name: 'Zendesk',
    logo: 'https://static.ferndesk.com/assets/logos/zendesk.jpg',
  },
  {
    name: 'Crisp',
    logo: 'https://static.ferndesk.com/assets/logos/crisp.png',
  },
  {
    name: 'Help Scout',
    logo: 'https://static.ferndesk.com/assets/logos/helpscout.png',
  },
  {
    name: 'Fernand',
    logo: 'https://static.ferndesk.com/assets/logos/fernand.png',
  },
];

export default function GetStartedSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 border border-gray-800 bg-white">
      <div className="grid grid-cols-1 divide-x divide-neutral-800 lg:grid-cols-2 max-w-7xl m-auto">
        {/* First Section: Get started in minutes */}
        <section className="overflow-hidden">
          <div className="pr-0 lg:pr-8">
            <div className="pt-12 pb-12 sm:pt-20">
              <span className="font-silkscreen text-lg text-red-600">Wonder-hosted</span>
              <h2 className="mt-4 font-funneldisplay text-balance text-neutral-800 text-3xl lg:text-4xl">
                Get started in minutes
              </h2>
              <div className="mt-6">
                <p className="text-base text-slate-700">
                  Don&apos;t have a help center yet? Set up your help center and let our agent draft articles
                  for you in minutes.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  {features.map((feature) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={feature.label} className="flex items-center gap-2 shrink-0">
                        <IconComponent className={feature.color} size={24} strokeWidth={1.5} />
                        <span className="text-neutral-600 whitespace-nowrap">{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Section: Zero-downtime migration */}
        <section className="overflow-hidden">
          <div className="pl-0 lg:pl-8">
            <div className="pt-12 pb-12 sm:pt-20">
              <span className="font-silkscreen text-lg text-red-600">ONE-click migration</span>
              <h2 className="mt-4 font-funneldisplay text-balance text-neutral-800 text-3xl lg:text-4xl">
                Zero-downtime migration
              </h2>
              <p className="mt-6 text-base text-slate-700">
                Migrate your existing help center to CrabsHQ in one-click without breaking links, or hurting your SEO.
              </p>
            </div>
            <div className="pb-20">
              <div className="flex flex-wrap gap-2">
                {integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center gap-2 rounded-lg bg-stone-50 p-2 ring ring-stone-200 shrink-0"
                  >
                    <Image
                      src={integration.logo}
                      alt={integration.name}
                      width={24}
                      height={24}
                      className="size-6 rounded bg-white object-cover ring ring-neutral-200 shrink-0"
                    />
                    <span className="text-neutral-600 whitespace-nowrap">{integration.name}</span>
                  </div>
                ))}
                <a
                  className="rounded-md bg-stone-100 p-2 px-3 text-neutral-600 ring ring-stone-200 hover:bg-stone-200 transition-colors shrink-0 whitespace-nowrap"
                  href="/integration"
                >
                  View all integrations →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
