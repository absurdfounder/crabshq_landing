'use client';

import Link from 'next/link';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';

type TierVariant = 'solo' | 'cloud' | 'enterprise-card';

type PricingTier = {
  id: TierVariant;
  name: string;
  description: string;
  price: string;
  cadence: string;
  bullets: string[];
  cta: { label: string; href: string };
  highlight?: boolean;
  badge?: string;
};

const tiers: PricingTier[] = [
  {
    id: 'solo',
    name: 'Solo Founder',
    description: 'For solo founders who want full control. Self-host, pay once, use forever.',
    price: '$79',
    cadence: 'one-time',
    bullets: [
      'Unlimited agents, chats & devices',
      'All AI models — bring your own keys',
      'Claude Code, Codex & GitHub integration',
      'Always-on Virtual PC',
      '3,000+ OpenClaw skills & browser automation',
      'Adaptive memory & system memory',
      'License for 1 org · lifetime access',
    ],
    cta: { label: 'Get lifetime deal', href: 'https://app.trooper.so' },
  },
  {
    id: 'cloud',
    name: 'Trooper Cloud',
    description: 'Your managed AI workspace in the cloud. We host the runtime for your team.',
    price: '$99',
    cadence: '/mo',
    highlight: true,
    badge: 'Most picked',
    bullets: [
      '5 team seats included · +$8/seat/mo',
      'Multi-org support',
      'Hosted by Trooper — we run the computer',
      'Team collaboration & shared memory',
      'Email automation & admin controls',
      'Shared team knowledge base',
      'Priority email support',
      'Everything in Solo Founder',
    ],
    cta: { label: 'Start with cloud', href: 'https://app.trooper.so' },
  },
];

type EnterpriseGroup = {
  title: string;
  items: string[];
};

const enterpriseGroups: EnterpriseGroup[] = [
  {
    title: 'Security & compliance',
    items: [
      'Self-hosted on your infrastructure',
      'Private VPC / on-prem options',
      'SSO and enterprise auth',
      'Security reviews & custom agreements',
      'Data encryption end-to-end',
    ],
  },
  {
    title: 'Scale & deployment',
    items: [
      'Multi-org support',
      'Custom seat volume pricing (~$4/seat/mo)',
      'White-label & custom domain',
      'Dedicated onboarding & migration',
      'Internal integrations & custom workflows',
    ],
  },
  {
    title: 'Enterprise support',
    items: [
      'Shared company memory & knowledge',
      'Priority support with SLA',
      'Forward-deployed onboarding',
      'Custom rate limits & throughput',
      'Starts at ~$7,000/year',
    ],
  },
];

function Stipple({
  cols,
  cells,
  light,
}: {
  cols: number;
  cells: string[];
  light?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-1 right-1 z-[2] grid gap-[3px]`}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {cells.map((cell, i) => (
        <span key={i} className={`block size-[10px] ${cell}`} />
      ))}
    </div>
  );
}

function TierBullet({
  children,
  highlight,
  first,
}: {
  children: React.ReactNode;
  highlight?: boolean;
  first?: boolean;
}) {
  return (
    <li
      className={[
        'flex items-start gap-3 py-2.5',
        !first ? (highlight ? 'border-t border-white/10' : 'border-t border-slate-900/[0.05]') : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span
        aria-hidden
        className={`mt-[7px] block size-[6px] shrink-0 ${highlight ? 'bg-white/70' : 'bg-trooper/60'}`}
      />
      <span
        className={`text-[13.5px] leading-[1.4] ${highlight ? 'text-white/85' : 'text-slate-600'}`}
      >
        {children}
      </span>
    </li>
  );
}

function TierCta({
  href,
  label,
  variant,
}: {
  href: string;
  label: string;
  variant: 'default' | 'highlight' | 'enterprise';
}) {
  const external = href.startsWith('http');
  const className = [
    'group relative flex w-full items-center justify-center gap-2 overflow-hidden py-3 px-4',
    'font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200',
    variant === 'highlight'
      ? 'border border-white/25 bg-white text-trooper hover:bg-trooper-50'
      : variant === 'enterprise'
        ? 'border border-slate-300 bg-white text-slate-800 hover:border-trooper hover:text-trooper'
        : 'border border-slate-300 bg-white text-slate-800 hover:border-trooper hover:text-trooper',
  ].join(' ');

  const content = (
    <>
      <span className="relative z-[1]">{label}</span>
      <svg
        viewBox="0 0 16 16"
        className="relative z-[1] h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        fill="none"
        aria-hidden
      >
        <path
          d="M3 8h10m0 0l-4-4m4 4l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  const highlight = tier.highlight;
  const stipple =
    tier.id === 'solo' ? (
      <Stipple cols={1} cells={['bg-trooper/40']} />
    ) : (
      <Stipple
        cols={3}
        light
        cells={[
          'bg-white/40',
          'bg-white/60',
          'bg-white',
          'bg-white/20',
          'bg-white/40',
          'bg-white/60',
          'bg-white/[0.06]',
          'bg-white/20',
          'bg-white/40',
        ]}
      />
    );

  return (
    <div
      className={[
        'tier-card relative flex flex-col px-7 py-9 max-lg:px-6 max-lg:py-7 max-md:px-5 max-md:py-6',
        'transition-colors duration-300 ease-out border-r border-slate-200 max-lg:border-b max-md:border-r-0',
        highlight
          ? 'bg-trooper text-white border-l border-r border-trooper-700/30 z-[1]'
          : 'bg-slate-50 text-slate-900 hover:bg-white',
      ].join(' ')}
    >
      {highlight && tier.badge ? (
        <div className="absolute bottom-full right-[-1px] z-[3] flex items-center bg-trooper-700 px-2.5 py-[6px] font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-white shadow-sm max-md:right-1">
          {tier.badge}
        </div>
      ) : null}
      {highlight ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-40 mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          }}
        />
      ) : null}
      {stipple}
      <div className="relative z-[1] flex flex-1 flex-col">
        <h3
          className={`font-funneldisplay text-[26px] font-medium tracking-[-0.025em] leading-none ${highlight ? 'text-white' : 'text-slate-900'}`}
        >
          {tier.name}
        </h3>
        <p
          className={`mt-3.5 min-h-[42px] text-[13.5px] leading-[1.55] text-balance max-md:min-h-0 ${highlight ? 'text-white/65' : 'text-slate-500'}`}
        >
          {tier.description}
        </p>
        <div className="mb-7 mt-7 flex items-baseline gap-1.5">
          <span
            className={`font-funneldisplay text-[52px] max-lg:text-[44px] font-medium tabular-nums leading-none tracking-[-0.035em] ${highlight ? 'text-white' : 'text-slate-900'}`}
          >
            {tier.price}
          </span>
          <span className={`text-base ${highlight ? 'text-white/55' : 'text-slate-500'}`}>
            {tier.cadence}
          </span>
        </div>
        <ul className="m-0 flex flex-1 list-none flex-col p-0">
          {tier.bullets.map((bullet, i) => (
            <TierBullet key={bullet} highlight={highlight} first={i === 0}>
              {bullet}
            </TierBullet>
          ))}
        </ul>
        <div className="mt-7">
          <TierCta
            href={tier.cta.href}
            label={tier.cta.label}
            variant={highlight ? 'highlight' : 'default'}
          />
        </div>
      </div>
    </div>
  );
}

function EnterpriseBand() {
  const stippleCells = [
    'bg-trooper/20',
    'bg-trooper/40',
    'bg-trooper/[0.08]',
    'bg-trooper/[0.04]',
    'bg-trooper/[0.02]',
    'bg-trooper/40',
    'bg-trooper/60',
    'bg-trooper/20',
    'bg-trooper/[0.08]',
    'bg-trooper/[0.04]',
    'bg-trooper/60',
    'bg-trooper',
    'bg-trooper/40',
    'bg-trooper/20',
    'bg-trooper/[0.08]',
    'bg-trooper',
    'bg-trooper',
    'bg-trooper/60',
    'bg-trooper/40',
    'bg-trooper/20',
    'bg-trooper',
    'bg-trooper',
    'bg-trooper',
    'bg-trooper/60',
    'bg-trooper/40',
  ];

  return (
    <aside className="relative border-t border-slate-200 bg-trooper-50">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-3 z-[2] grid grid-cols-5 gap-[2px] max-md:hidden"
      >
        {stippleCells.map((cell, i) => (
          <span key={i} className={`block size-[10px] ${cell}`} />
        ))}
      </div>
      <div className="grid grid-cols-[minmax(280px,0.9fr)_minmax(0,2.2fr)] items-start gap-x-16 gap-y-8 px-8 py-9 max-lg:grid-cols-1 max-lg:gap-x-10 max-lg:gap-y-7 max-lg:px-6 max-lg:py-8 max-md:gap-y-5 max-md:px-5 max-md:py-7">
        <div className="flex flex-col gap-5 max-md:gap-3">
          <div className="flex flex-col gap-1">
            <span className="font-funneldisplay text-[22px] font-medium leading-[1.27] tracking-[-0.02em] text-slate-900 max-md:text-[20px]">
              Enterprise
            </span>
            <span className="max-w-[26ch] text-[14.5px] font-normal leading-[1.55] text-slate-600 max-md:text-[13.5px]">
              For companies that want Trooper on their own infrastructure with custom pricing and
              security requirements.
            </span>
          </div>
          <h3 className="font-funneldisplay text-[44px] font-medium leading-none tracking-[-0.03em] text-slate-900 max-lg:text-[38px] max-md:text-[34px]">
            Custom
          </h3>
          <TierCta
            href="https://cal.com/trooper/setup-call"
            label="Talk to sales"
            variant="enterprise"
          />
        </div>
        <div className="grid grid-cols-3 gap-x-10 gap-y-8 max-lg:gap-x-8 max-md:grid-cols-1 max-md:gap-y-5">
          {enterpriseGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-3 max-md:gap-2">
              <h4 className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-slate-500">
                {group.title}
              </h4>
              <ul className="m-0 flex list-none flex-col p-0">
                {group.items.map((item, i) => (
                  <TierBullet key={item} first={i === 0}>
                    {item}
                  </TierBullet>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

type SimplePricingProps = {
  /** Show link strip to full /pricing page (homepage embed). */
  showFullPricingLink?: boolean;
};

export default function SimplePricing({ showFullPricingLink = true }: SimplePricingProps) {
  return (
    <div className="w-full pb-8 md:pb-10">
      <div className="flex flex-col gap-8 pb-10 pt-2 max-md:gap-6 max-md:pb-8 md:pt-4">
        <MarketingHeadline
          as="h2"
          size="section"
          lines={[
            {
              parts: [
                { text: 'Simple pricing,', tone: 'default' },
                { text: 'by deployment.', tone: 'default' },
              ],
            },
            {
              parts: [{ text: 'Pay for the plan you need.', tone: 'brand' }],
            },
          ]}
          subline="Every plan runs on a private server with your keys. No surprise bills on model usage — you pay providers directly."
        />
      </div>

      <div className="-mx-3 border-t border-slate-200 sm:-mx-4 md:-mx-6">
        <div className="grid grid-cols-2 max-lg:grid-cols-1">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
        <EnterpriseBand />
        {showFullPricingLink ? (
          <div className="border-t border-b border-slate-200 bg-trooper-50/80">
            <Link
              href="/pricing"
              className="group flex w-full items-center justify-center gap-2 py-5 text-sm font-medium text-trooper transition-colors hover:text-trooper-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[15px] w-[15px] shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="13" y2="17" />
              </svg>
              See full rate card and FAQ
              <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" aria-hidden>
                <path
                  d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
