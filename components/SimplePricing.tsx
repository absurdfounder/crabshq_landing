'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import PixelButton from './ui/PixelButton';
import {
  CLOUD_SUBSCRIPTION_TIERS,
  formatUsd,
  PRICING_USD,
  type CloudSubscriptionTier,
} from '@/lib/pricing';
import {
  Bot,
  MessageSquare,
  Monitor,
  Sparkles,
  Terminal,
  Brain,
  ShieldCheck,
  Puzzle,
  Globe,
  Smartphone,
  Eye,
  History,
  Users,
  Server,
  Cpu,
  Workflow,
  GitBranch,
  Mail,
  Share2,
  Settings,
  Headphones,
  Network,
  Lock,
  Palette,
  UserPlus,
  FileCheck,
  Wrench,
  Database,
  BadgeCheck,
  LucideIcon,
  DollarSign,
  Infinity,
  CheckCircle,
  Building2,
  Laptop,
} from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  label: string;
  color: string;
  included?: boolean;
};

const soloFeatures: Feature[] = [
  { icon: Bot, label: 'Unlimited Agents', color: 'text-trooper' },
  { icon: MessageSquare, label: 'Unlimited Chats', color: 'text-trooper-olive' },
  { icon: Monitor, label: 'Unlimited Devices', color: 'text-slate-600' },
  { icon: Sparkles, label: 'All AI Models', color: 'text-trooper' },
  { icon: Terminal, label: 'Claude Code & Codex', color: 'text-trooper-700' },
  { icon: Brain, label: 'Adaptive Memory', color: 'text-trooper-olive' },
  { icon: Eye, label: 'Context Awareness', color: 'text-cyan-500' },
  { icon: History, label: 'System Memory', color: 'text-violet-500' },
  { icon: ShieldCheck, label: 'Data Encryption', color: 'text-blue-500' },
  { icon: Puzzle, label: '3,000+ OpenClaw Skills', color: 'text-pink-500' },
  { icon: Globe, label: 'Browser Automation', color: 'text-trooper' },
  { icon: Smartphone, label: 'Mac, Windows, iOS, Android', color: 'text-slate-500' },
  { icon: Cpu, label: 'Always-on Virtual PC', color: 'text-indigo-500' },
  { icon: Network, label: 'Multi-agent orchestration', color: 'text-cyan-500' },
  { icon: GitBranch, label: 'GitHub integration (commits, PRs, reviews)', color: 'text-orange-500' },
  { icon: Building2, label: 'License for 1 org', color: 'text-slate-600' },
  { icon: Infinity, label: 'Lifetime access for 1 user', color: 'text-trooper' },
];

const teamCloudExcluded: Feature[] = [
  { icon: Users, label: '2 team members included', color: 'text-slate-300', included: false },
  { icon: DollarSign, label: 'Additional members at $10/user/month', color: 'text-slate-300', included: false },
  { icon: Share2, label: 'Team collaboration and shared memory', color: 'text-slate-300', included: false },
  { icon: UserPlus, label: 'Invite teammates and assign roles', color: 'text-slate-300', included: false },
  { icon: Mail, label: 'Email automation', color: 'text-slate-300', included: false },
  { icon: Settings, label: 'Admin controls and permissions', color: 'text-slate-300', included: false },
  { icon: Database, label: 'Shared team knowledge base', color: 'text-slate-300', included: false },
  { icon: Workflow, label: 'Shared workflows across team', color: 'text-slate-300', included: false },
  { icon: Headphones, label: 'Priority email support', color: 'text-slate-300', included: false },
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-300', included: false },
];

const enterpriseExcluded: Feature[] = [
  { icon: Server, label: 'Self-hosted deployment on your infra', color: 'text-slate-300', included: false },
  { icon: Lock, label: 'Private VPC / on-prem options', color: 'text-slate-300', included: false },
  { icon: BadgeCheck, label: 'SSO and enterprise auth', color: 'text-slate-300', included: false },
  { icon: Palette, label: 'White-label and custom domain', color: 'text-slate-300', included: false },
  { icon: UserPlus, label: 'Dedicated onboarding and migration', color: 'text-slate-300', included: false },
  { icon: FileCheck, label: 'Security reviews and custom agreements', color: 'text-slate-300', included: false },
  { icon: Wrench, label: 'Internal integrations and custom workflows', color: 'text-slate-300', included: false },
  { icon: Headphones, label: 'Priority support with SLA', color: 'text-slate-300', included: false },
];

const localInstallHeader: Feature[] = [
  { icon: Laptop, label: 'Install on your Mac, Windows, or Linux laptop', color: 'text-trooper' },
  { icon: Server, label: 'Self-install cloud runtime on your machine', color: 'text-indigo-500' },
  { icon: DollarSign, label: '$0/month — no subscription', color: 'text-trooper-700' },
  {
    icon: Infinity,
    label: `${formatUsd(PRICING_USD.localLifetime)} one-time lifetime license on your laptop`,
    color: 'text-trooper',
  },
];

const localSoloFeatures: Feature[] = soloFeatures.map((feature) => {
  if (feature.label === 'Lifetime access for 1 user') {
    return { ...feature, label: 'Free unlimited access on your laptop', color: 'text-trooper' };
  }
  if (feature.label === 'License for 1 org') {
    return { ...feature, label: 'Personal laptop install' };
  }
  return feature;
});

const cloudFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Users, label: '2 team members included', color: 'text-trooper' },
  { icon: DollarSign, label: 'Additional members at $10/user/month', color: 'text-trooper-700' },
  { icon: Share2, label: 'Team collaboration and shared memory', color: 'text-green-500' },
  { icon: UserPlus, label: 'Invite teammates and assign roles', color: 'text-orange-500' },
  { icon: Mail, label: 'Email automation', color: 'text-violet-500' },
  { icon: Settings, label: 'Admin controls and permissions', color: 'text-slate-500' },
  { icon: Database, label: 'Shared team knowledge base', color: 'text-yellow-500' },
  { icon: Workflow, label: 'Shared workflows across team', color: 'text-cyan-500' },
  { icon: Headphones, label: 'Priority email support', color: 'text-blue-500' },
];

const enterpriseFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Server, label: 'Self-hosted deployment on your infra', color: 'text-indigo-500' },
  { icon: Lock, label: 'Private VPC / on-prem options', color: 'text-blue-500' },
  { icon: BadgeCheck, label: 'SSO and enterprise auth', color: 'text-green-500' },
  { icon: DollarSign, label: 'Custom seat volume pricing', color: 'text-trooper-700' },
  { icon: Palette, label: 'White-label and custom domain', color: 'text-pink-500' },
  { icon: UserPlus, label: 'Dedicated onboarding and migration', color: 'text-orange-500' },
  { icon: FileCheck, label: 'Security reviews and custom agreements', color: 'text-cyan-500' },
  { icon: Wrench, label: 'Internal integrations and custom workflows', color: 'text-violet-500' },
  { icon: Database, label: 'Shared company memory and knowledge', color: 'text-yellow-500' },
  { icon: Headphones, label: 'Priority support with SLA', color: 'text-blue-500' },
];

const cloudLifetimeFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Users, label: '2 team members included', color: 'text-trooper' },
  { icon: Cpu, label: 'Always-on managed cloud computer', color: 'text-indigo-500' },
  { icon: Share2, label: 'Team collaboration and shared memory', color: 'text-green-500' },
  { icon: Workflow, label: 'Shared workflows across team', color: 'text-cyan-500' },
  { icon: Headphones, label: 'Priority email support', color: 'text-blue-500' },
  { icon: Infinity, label: 'Lifetime hosted access — pay once', color: 'text-trooper' },
];

type Plan = {
  name: string;
  eyebrow?: string;
  price: string;
  cadence: string;
  perSeat?: string;
  description: string;
  badge?: string | null;
  note?: string;
  sections: {
    label: string;
    features: Feature[];
    inheritsFrom?: string;
  }[];
  excludedFeatures?: Feature[];
  cloudTiers?: boolean;
  cta: {
    text: string;
    href: string;
  };
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: 'Local Install',
    eyebrow: 'Self-install',
    price: '$0',
    cadence: '/ month',
    perSeat: `Free, or ${formatUsd(PRICING_USD.localLifetime)} one-time lifetime on your laptop`,
    description:
      'Install Trooper on your laptop at no cost. Same unlimited solo experience — self-hosted runtime on your machine.',
    badge: 'Free',
    note: 'Bring your own API keys. Model usage is billed separately by your providers.',
    sections: [
      {
        label: '',
        features: [...localInstallHeader, ...localSoloFeatures],
      },
    ],
    excludedFeatures: [...teamCloudExcluded, ...enterpriseExcluded],
    cta: {
      text: 'Install locally',
      href: 'https://app.trooper.so',
    },
    highlight: false,
  },
  {
    name: 'Cloud Lifetime',
    eyebrow: 'Lifetime deal',
    price: formatUsd(PRICING_USD.cloudLifetime),
    cadence: 'one-time payment',
    perSeat: 'One user · one organization',
    description:
      'For solo founders who want full control with hosted infrastructure. Pay once and use Trooper Cloud forever.',
    badge: 'Lifetime Access',
    note: 'Includes 2 team members. Bring your own API keys for model usage.',
    sections: [
      { label: '', features: cloudLifetimeFeatures },
      { label: '', features: [], inheritsFrom: 'All core AI features from Local Install' },
    ],
    excludedFeatures: enterpriseExcluded,
    cta: {
      text: 'Get lifetime deal',
      href: 'https://app.trooper.so',
    },
    highlight: false,
  },
  {
    name: 'Trooper Cloud',
    eyebrow: 'Hosted by us',
    price: formatUsd(PRICING_USD.cloudStandardMonthly),
    cadence: '/ month',
    perSeat: `${PRICING_USD.cloudIncludedMembers} team members included`,
    description:
      'A managed AI workspace with hosted runtime, workflows, memory, and collaboration for your team.',
    badge: 'Most Popular',
    note: `Additional members ${formatUsd(PRICING_USD.cloudAdditionalMemberMonthly)}/mo each. Bring your own API keys for model usage.`,
    cloudTiers: true,
    sections: [
      { label: '', features: cloudFeatures },
      { label: '', features: [], inheritsFrom: 'Everything from Cloud Lifetime' },
    ],
    excludedFeatures: enterpriseExcluded,
    cta: {
      text: 'Start with cloud',
      href: 'https://app.trooper.so',
    },
    highlight: true,
  },
  {
    name: 'Enterprise',
    eyebrow: 'Private deployment',
    price: 'Custom',
    cadence: '',
    perSeat: 'Volume pricing from ~$4/seat/month',
    description:
      'For companies that want Trooper on their own infrastructure, with full control and custom pricing.',
    badge: 'Self-host',
    note: 'Starts at ~$7,000/year. Volume seat pricing available. Runs on your infra.',
    sections: [
      { label: '', features: enterpriseFeatures },
      { label: '', features: [], inheritsFrom: 'Everything from Cloud Plan' },
    ],
    cta: {
      text: 'Talk to sales',
      href: 'https://cal.com/trooper/setup-call',
    },
    highlight: false,
  },
];

type SimplePricingProps = {
  /** Show link strip to full /pricing page (homepage embed). */
  showFullPricingLink?: boolean;
};

export default function SimplePricing({ showFullPricingLink = true }: SimplePricingProps) {
  const [cloudTier, setCloudTier] = useState<CloudSubscriptionTier>('standard');

  return (
    <div className="w-full pb-8 md:pb-10">
      <div className="flex flex-col gap-6 pb-8 pt-2 max-md:gap-5 max-md:pb-6 md:pt-4">
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
        <div className="hidden border-b border-slate-200 bg-white lg:block">
          <DesktopPricingGrid plans={plans} />
        </div>

        <div className="border-b border-slate-200 bg-white lg:hidden">
          {plans.map((plan, idx) => (
            <MobilePricingCard
              key={plan.name}
              plan={plan}
              idx={idx}
              isLast={idx === plans.length - 1}
              cloudTier={cloudTier}
              onCloudTierChange={setCloudTier}
            />
          ))}
        </div>

        {showFullPricingLink ? (
          <div className="border-t border-slate-200 bg-trooper-50/80">
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
              <svg
                viewBox="0 0 14 14"
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
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

function planNumber(idx: number) {
  return `[${String(idx + 1).padStart(2, '0')}]`;
}

function getCloudTierPrice(tier: CloudSubscriptionTier) {
  return CLOUD_SUBSCRIPTION_TIERS.find((entry) => entry.id === tier)?.price ?? PRICING_USD.cloudStandardMonthly;
}

/** Shared row tracks — mirrors Trooper app onboarding plan card bands. */
const PRICING_GRID_TEMPLATE_ROWS =
  'auto minmax(4.75rem,auto) minmax(5.5rem,auto) minmax(2.75rem,auto) minmax(2.5rem,auto) minmax(3.25rem,auto) auto minmax(0,1fr)';

function planCellClass() {
  return 'bg-white px-6 md:px-8';
}

function CloudTierTabs({
  value,
  onChange,
}: {
  value: CloudSubscriptionTier;
  onChange: (tier: CloudSubscriptionTier) => void;
}) {
  return (
    <div
      className="grid grid-cols-2 gap-1.5 rounded-lg border border-slate-200 bg-slate-50 p-1.5"
      role="radiogroup"
      aria-label="Cloud plan tier"
    >
      {CLOUD_SUBSCRIPTION_TIERS.map((tier) => {
        const selected = value === tier.id;
        return (
          <button
            key={tier.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(tier.id)}
            className={[
              'flex flex-col items-center rounded-md px-2 py-2 text-center transition',
              selected
                ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                : 'text-slate-500 hover:bg-white/60 hover:text-slate-700',
            ].join(' ')}
          >
            <span className="font-funneldisplay text-lg font-medium tabular-nums tracking-tight">
              {formatUsd(tier.price)}
            </span>
            <span className="text-[0.65rem] font-medium text-slate-400">/ mo</span>
            <span className="mt-1 text-[0.7rem] font-medium text-slate-600">{tier.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function PricingTierRail({
  plan,
  cloudTier,
  onCloudTierChange,
}: {
  plan: Plan;
  cloudTier: CloudSubscriptionTier;
  onCloudTierChange: (tier: CloudSubscriptionTier) => void;
}) {
  if (plan.cloudTiers) {
    return <CloudTierTabs value={cloudTier} onChange={onCloudTierChange} />;
  }

  return <div className="h-full min-h-[5.5rem]" aria-hidden />;
}

function PricingAmount({
  plan,
  cloudTier,
}: {
  plan: Plan;
  cloudTier: CloudSubscriptionTier;
}) {
  const price = plan.cloudTiers ? formatUsd(getCloudTierPrice(cloudTier)) : plan.price;

  return (
    <div className="flex h-full min-h-[2.75rem] items-end gap-2">
      <div className="font-funneldisplay text-4xl font-medium tabular-nums tracking-tight text-slate-900">
        {price}
      </div>
      {plan.cadence ? <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div> : null}
    </div>
  );
}

function planPerSeatLabel(plan: Plan, cloudTier: CloudSubscriptionTier) {
  if (plan.cloudTiers) {
    const tierLabel = cloudTier === 'premium' ? 'Cloud Max' : 'Cloud';
    return `${PRICING_USD.cloudIncludedMembers} team members included · ${tierLabel}`;
  }
  return plan.perSeat ?? '\u00a0';
}

function PricingPlanColumn({
  plan,
  idx,
  isLast,
  cloudTier,
  onCloudTierChange,
}: {
  plan: Plan;
  idx: number;
  isLast: boolean;
  cloudTier: CloudSubscriptionTier;
  onCloudTierChange: (tier: CloudSubscriptionTier) => void;
}) {
  const perSeat = planPerSeatLabel(plan, cloudTier);

  return (
    <article
      className={[
        'grid grid-rows-subgrid bg-white [grid-row:1/-1]',
        !isLast ? 'border-r border-slate-200' : '',
        plan.highlight ? 'border-t-2 border-t-trooper -mt-px' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={`${planCellClass()} pt-6 pb-3 md:pt-8`}>
        <div className="flex min-h-[3.25rem] items-start justify-between gap-3">
          {plan.eyebrow ? (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-400">{planNumber(idx)}</span> {plan.eyebrow}
            </span>
          ) : (
            <span aria-hidden className="min-h-[1rem]" />
          )}
          <PlanBadge plan={plan} />
        </div>
        <h3 className="mt-3 font-funneldisplay text-2xl font-medium tracking-tight text-slate-900">
          {plan.name}
        </h3>
      </div>

      <div className={`${planCellClass()} flex items-start py-3`}>
        <p className="line-clamp-3 text-sm leading-6 text-slate-500">{plan.description}</p>
      </div>

      <div className={`${planCellClass()} py-2`}>
        <PricingTierRail plan={plan} cloudTier={cloudTier} onCloudTierChange={onCloudTierChange} />
      </div>

      <div className={`${planCellClass()} py-1`}>
        <PricingAmount plan={plan} cloudTier={cloudTier} />
      </div>

      <div className={`${planCellClass()} flex items-center py-1`}>
        <p className="text-sm font-medium leading-snug text-trooper">{perSeat}</p>
      </div>

      <div className={`${planCellClass()} flex items-start py-1`}>
        <p className="text-xs leading-5 text-slate-400">{plan.note ?? '\u00a0'}</p>
      </div>

      <div className={`${planCellClass()} flex items-center border-b border-slate-200 py-5`}>
        <PixelButton
          href={plan.cta.href}
          external={plan.cta.href.startsWith('http')}
          size="md"
          tone={plan.highlight ? 'brand' : 'dark'}
          className="w-full"
        >
          {plan.cta.text}
        </PixelButton>
      </div>

      <div className={`${planCellClass()} py-6`}>
        <PlanFeatures plan={plan} />
      </div>
    </article>
  );
}

function PlanBadge({ plan }: { plan: Plan }) {
  if (!plan.badge) return null;
  const tone = plan.highlight
    ? 'bg-trooper-50 text-trooper border-trooper-200'
    : plan.badge === 'Lifetime Access' || plan.badge === 'Free'
      ? 'bg-trooper-50 text-trooper border-trooper-200'
      : 'bg-slate-100 text-slate-600 border-slate-200';
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${tone}`}
    >
      {plan.badge}
    </span>
  );
}

function PlanFeatures({ plan }: { plan: Plan }) {
  return (
    <>
      {plan.sections.map((section, sIdx) => (
        <div key={sIdx}>
          {section.inheritsFrom ? (
            <div className="mt-5 flex items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2.5">
              <CheckCircle className="h-4 w-4 shrink-0 text-trooper" />
              <span className="text-sm font-medium text-slate-600">{section.inheritsFrom}</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {section.features.map((feature) => {
                const included = feature.included !== false;
                return (
                  <li key={feature.label} className="flex items-center gap-2">
                    <feature.icon
                      className={`h-4 w-4 shrink-0 ${included ? feature.color : 'text-slate-300'}`}
                    />
                    <span className={`text-sm ${included ? 'text-slate-700' : 'text-slate-400'}`}>
                      {feature.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}

      {plan.excludedFeatures && plan.excludedFeatures.length > 0 ? (
        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
            Not included
          </p>
          <ul className="space-y-2">
            {plan.excludedFeatures.map((feature) => (
              <li key={feature.label} className="flex items-center gap-2">
                <feature.icon className="h-4 w-4 shrink-0 text-slate-300" />
                <span className="text-sm text-slate-400">{feature.label}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}

function DesktopPricingGrid({ plans }: { plans: Plan[] }) {
  const [cloudTier, setCloudTier] = useState<CloudSubscriptionTier>('standard');

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="grid grid-cols-4"
      style={{ gridTemplateRows: PRICING_GRID_TEMPLATE_ROWS }}
    >
      {plans.map((plan, idx) => (
        <PricingPlanColumn
          key={plan.name}
          plan={plan}
          idx={idx}
          isLast={idx === plans.length - 1}
          cloudTier={cloudTier}
          onCloudTierChange={setCloudTier}
        />
      ))}
    </motion.div>
  );
}

function MobilePricingCard({
  plan,
  idx,
  isLast,
  cloudTier,
  onCloudTierChange,
}: {
  plan: Plan;
  idx: number;
  isLast: boolean;
  cloudTier: CloudSubscriptionTier;
  onCloudTierChange: (tier: CloudSubscriptionTier) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className={[
        'relative flex flex-col bg-white',
        !isLast ? 'border-b border-slate-200' : '',
        plan.highlight ? 'border-t-2 border-t-trooper -mt-px' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="border-b border-slate-200 px-6 pt-6 pb-6">
        <div className="flex items-start justify-between gap-3">
          {plan.eyebrow && (
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-400">{planNumber(idx)}</span> {plan.eyebrow}
            </span>
          )}
          <PlanBadge plan={plan} />
        </div>
        <h3 className="mt-3 font-funneldisplay text-2xl font-medium tracking-tight text-slate-900">
          {plan.name}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">{plan.description}</p>

        <div className="mt-5 space-y-3">
          <PricingTierRail plan={plan} cloudTier={cloudTier} onCloudTierChange={onCloudTierChange} />
          <PricingAmount plan={plan} cloudTier={cloudTier} />
          <p className="text-sm font-medium leading-snug text-trooper">{planPerSeatLabel(plan, cloudTier)}</p>
          {plan.note ? <p className="text-xs leading-5 text-slate-400">{plan.note}</p> : null}
        </div>
      </div>

      <div className="border-b border-slate-200 px-6 py-5">
        <PixelButton
          href={plan.cta.href}
          external={plan.cta.href.startsWith('http')}
          size="md"
          tone={plan.highlight ? 'brand' : 'dark'}
          className="w-full"
        >
          {plan.cta.text}
        </PixelButton>
      </div>

      <div className="px-6 py-6">
        <PlanFeatures plan={plan} />
      </div>
    </motion.div>
  );
}
