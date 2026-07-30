import Link from 'next/link';
import { Infinity as InfinityIcon, ShieldCheck, UsersRound } from 'lucide-react';

import LandingIconsGrid from '@/components/LandingIconsGrid';
import TrooperHelmet from '@/components/TrooperHelmet';

type Capability = {
  icon: typeof InfinityIcon;
  title: string;
  body: string;
  href?: string;
};

const CAPABILITIES: Capability[] = [
  {
    icon: InfinityIcon,
    title: 'Unlimited capability',
    body: 'From code to content, Trooper handles it all.',
    href: '/features/browser-control',
  },
  {
    icon: UsersRound,
    title: 'AI that works with you',
    body: 'Augments your team, not replaces it.',
  },
  {
    icon: ShieldCheck,
    title: 'Built for real teams',
    body: 'Secure, scalable and ready for anything.',
  },
] as const;

export default function BrowserCapabilitySection() {
  return (
    <section className="bg-gradient-to-b from-neutral-50 to-canvas">
      <div className="mx-auto max-w-7xl border border-[var(--color-line)] border-b-0">
        <div className="border-b border-[var(--color-line)] px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 xl:px-14">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-8 xl:gap-10">
            <TrooperHelmet
              size={150}
              tilt={-10}
              className="shrink-0 lg:-ml-3 xl:-ml-5"
            />

            <h2 className="shrink-0 text-balance text-center font-display text-[1.75rem] font-medium leading-[1.2] tracking-tight text-ink sm:text-[1.9rem] lg:max-w-[19rem] lg:text-left xl:max-w-[23rem] xl:text-[2.1rem]">
              Anything you do in a computer,{' '}
              Trooper can do for <span className="text-fern">you</span>.
            </h2>

            <ul className="grid w-full flex-1 gap-7 border-t border-[var(--color-line)] pt-8 sm:grid-cols-3 sm:gap-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 xl:gap-9 xl:pl-12">
              {CAPABILITIES.map(({ icon: Icon, title, body, href }) => {
                const heading = (
                  <span className="font-display text-[14.5px] font-semibold leading-snug tracking-tight text-ink">
                    {title}
                  </span>
                );
                return (
                  <li key={title} className="min-w-0">
                    <Icon
                      className="mb-2.5 size-5 text-fern"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                    {href ? (
                      <Link
                        href={href}
                        className="decoration-fern/40 underline-offset-4 decoration-dotted hover:underline"
                      >
                        {heading}
                      </Link>
                    ) : (
                      heading
                    )}
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">{body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="border-b border-[var(--color-line)] p-0">
          <LandingIconsGrid />
        </div>

        <div className="border-b border-[var(--color-line)] px-6 py-10 sm:px-8 sm:py-12 md:px-14 md:py-16 xl:px-36">
          <p className="mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-ink-muted sm:text-base sm:leading-7">
            Unlike agents that only work through brittle integrations, Trooper&apos;s workforce uses
            browsers and accounts the same way your team does — GitHub, Gmail, Slack, and any site
            you can log into. If a human can do it in a tab, your agents can too.
          </p>
        </div>
      </div>
    </section>
  );
}
