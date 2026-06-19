'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import PixelButton from './ui/PixelButton';
import {
  CLOUD_SUBSCRIPTION_TIERS,
  COMMON_PLAN_FEATURES,
  estimateCloudMonthly,
  formatUsd,
  getCloudTierMonthlyPrice,
  PRICING_USD,
  type CloudSubscriptionTier,
} from '@/lib/pricing';
import {
  Building2,
  Check,
  Cloud,
  Infinity,
  Laptop,
  Minus,
  Plus,
  Server,
  type LucideIcon,
} from 'lucide-react';

type SimplePricingProps = {
  /** Show link strip to full /pricing page (homepage embed). */
  showFullPricingLink?: boolean;
};

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-sm leading-5 text-slate-700/90">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function PlanBadge({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <span
      className={[
        'border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]',
        featured
          ? 'border-trooper-200 bg-trooper-50 text-trooper'
          : 'border-slate-200 bg-slate-100 text-slate-600',
      ].join(' ')}
    >
      {children}
    </span>
  );
}

function PlanHeader({
  index,
  eyebrow,
  badge,
  title,
  icon: Icon,
  description,
  featured = false,
}: {
  index: string;
  eyebrow: string;
  badge: string;
  title: string;
  icon: LucideIcon;
  description: string;
  featured?: boolean;
}) {
  return (
    <div className="border-b border-slate-200 px-5 py-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="text-slate-400">[{index}]</span> {eyebrow}
        </span>
        <PlanBadge featured={featured}>{badge}</PlanBadge>
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <Icon className="h-5 w-5 text-emerald-600" aria-hidden />
        <h3 className="font-funneldisplay text-xl font-medium tracking-tight text-slate-900">{title}</h3>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function AllowanceStepper({
  label,
  value,
  min,
  onChange,
  helper,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
  helper: string;
}) {
  return (
    <div className="flex items-center justify-between gap-2 border border-slate-200 bg-white px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{helper}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1" role="group" aria-label={`${label} quantity`}>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-3.5 w-3.5" aria-hidden />
        </button>
        <span className="w-8 text-center text-sm font-medium tabular-nums text-slate-900">{value}</span>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
          onClick={() => onChange(Math.min(150, value + 1))}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
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
      className="grid grid-cols-2 gap-1 border border-slate-200 bg-slate-50/80 p-1"
      role="radiogroup"
      aria-label="Trooper Cloud tier"
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
              'rounded-sm px-3 py-2.5 text-left transition-colors',
              selected ? 'bg-white shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-white/70',
            ].join(' ')}
          >
            <span className="block text-[11px] font-medium">{tier.label}</span>
            <span className="mt-0.5 block text-base font-semibold tabular-nums text-slate-900">
              {formatUsd(tier.price)}
              <span className="text-[11px] font-normal text-slate-500">/mo</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function PlanCardBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-1 flex-col px-6 py-6 md:px-8">{children}</div>;
}

export default function SimplePricing({ showFullPricingLink = true }: SimplePricingProps) {
  const [cloudTier, setCloudTier] = useState<CloudSubscriptionTier>('standard');
  const [seatCount, setSeatCount] = useState<number>(PRICING_USD.cloudIncludedMembers);
  const [workspaceCount, setWorkspaceCount] = useState<number>(PRICING_USD.cloudIncludedWorkspaces);

  const estimatedMonthly = estimateCloudMonthly({
    tier: cloudTier,
    seatCount,
    workspaceCount,
  });

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
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="grid overflow-hidden gap-px border-b border-slate-200 bg-slate-200 lg:grid-cols-2"
        >
          <section className="flex min-w-0 flex-col bg-white">
            <PlanHeader
              index="01"
              eyebrow="Self-install"
              badge="Free"
              title="Local Install"
              icon={Laptop}
              description="Install Trooper on your laptop at no cost. Self-hosted runtime on your machine — one workspace, no connected devices."
            />
            <PlanCardBody>
              <div className="flex items-end gap-1.5">
                <span className="font-funneldisplay text-4xl font-medium tabular-nums tracking-tight text-slate-900">
                  {formatUsd(0)}
                </span>
                <span className="pb-1 text-sm text-slate-500">/ month</span>
              </div>
              <p className="mt-2 text-sm font-medium text-emerald-700">
                1 workspace · no connected devices · optional {formatUsd(PRICING_USD.localLifetime)} lifetime
                license
              </p>
              <ul className="mt-6 space-y-2.5">
                {COMMON_PLAN_FEATURES.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
                <FeatureItem>Install on Mac, Windows, or Linux</FeatureItem>
                <FeatureItem>Bring your own API keys</FeatureItem>
                <FeatureItem>Self-hosted runtime on your laptop</FeatureItem>
              </ul>
              <div className="mt-auto pt-7">
                <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
                  Install locally
                </PixelButton>
              </div>
            </PlanCardBody>
          </section>

          <section className="flex min-w-0 flex-col bg-white">
            <PlanHeader
              index="02"
              eyebrow="Lifetime deal"
              badge="Lifetime access"
              title="Cloud Lifetime"
              icon={Infinity}
              description="For solo founders who want hosted infrastructure. Pay once and use Trooper forever — one workspace, no connected devices."
            />
            <PlanCardBody>
              <div className="flex items-end gap-1.5">
                <span className="font-funneldisplay text-4xl font-medium tabular-nums tracking-tight text-slate-900">
                  {formatUsd(PRICING_USD.cloudLifetime)}
                </span>
                <span className="pb-1 text-sm text-slate-500">one-time</span>
              </div>
              <p className="mt-2 text-sm font-medium text-emerald-700">
                1 workspace · {PRICING_USD.cloudIncludedMembers} team members · no connected devices
              </p>
              <ul className="mt-6 space-y-2.5">
                {COMMON_PLAN_FEATURES.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
                <FeatureItem>Always-on managed cloud computer</FeatureItem>
                <FeatureItem>Bring your own API keys</FeatureItem>
                <FeatureItem>Lifetime hosted access — pay once</FeatureItem>
              </ul>
              <div className="mt-auto pt-7">
                <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
                  Get lifetime deal
                </PixelButton>
              </div>
            </PlanCardBody>
          </section>

          <section className="flex min-w-0 flex-col border-t-2 border-t-emerald-500 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.08)] lg:col-span-2">
            <PlanHeader
              featured
              index="03"
              eyebrow="Hosted by us"
              badge="Most popular"
              title="Trooper Cloud"
              icon={Cloud}
              description="A managed AI workspace with hosted runtime, workflows, memory, and collaboration for your team."
            />
            <PlanCardBody>
              <CloudTierTabs value={cloudTier} onChange={setCloudTier} />
              <p className="mt-4 text-sm font-medium text-emerald-700">
                {PRICING_USD.cloudIncludedMembers} team members included
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Each workspace uses the selected usage tier ({formatUsd(getCloudTierMonthlyPrice(cloudTier))}/mo).
                Additional members are {formatUsd(PRICING_USD.cloudAdditionalMemberMonthly)}/month.
              </p>
              <div className="mt-4 space-y-2">
                <AllowanceStepper
                  label="Team members"
                  value={seatCount}
                  min={PRICING_USD.cloudIncludedMembers}
                  onChange={setSeatCount}
                  helper={`${PRICING_USD.cloudIncludedMembers} included`}
                />
                <AllowanceStepper
                  label="Workspaces"
                  value={workspaceCount}
                  min={PRICING_USD.cloudIncludedWorkspaces}
                  onChange={setWorkspaceCount}
                  helper={`${PRICING_USD.cloudIncludedWorkspaces} included`}
                />
              </div>
              <ul className="mt-6 space-y-2.5">
                {COMMON_PLAN_FEATURES.map((feature) => (
                  <FeatureItem key={feature}>{feature}</FeatureItem>
                ))}
                <FeatureItem>Always-on managed cloud computer</FeatureItem>
                <FeatureItem>Multi-workspace support and unlimited connected devices</FeatureItem>
                <FeatureItem>Admin controls and team collaboration</FeatureItem>
              </ul>
              <div className="mt-auto pt-7">
                <PixelButton href="https://app.trooper.so" external size="md" tone="brand" className="w-full">
                  Choose · {formatUsd(estimatedMonthly)}/month
                </PixelButton>
              </div>
            </PlanCardBody>
          </section>

          <section className="flex min-w-0 flex-col bg-white lg:col-span-2 lg:grid lg:grid-cols-[1fr_1.3fr_auto] lg:items-center">
            <PlanHeader
              index="04"
              eyebrow="Private deployment"
              badge="Custom"
              title="Enterprise"
              icon={Building2}
              description="For companies that need Trooper on private infrastructure with deployment, security, and support tailored to them."
            />
            <div className="border-t border-slate-200 px-6 py-6 md:px-8 lg:border-t-0 lg:border-r lg:border-slate-200">
              <p className="text-sm font-medium text-emerald-700">Volume pricing and dedicated support</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                <FeatureItem>Private VPC or on-prem deployment</FeatureItem>
                <FeatureItem>SSO, custom domains, and agreements</FeatureItem>
                <FeatureItem>Custom integrations and migration</FeatureItem>
                <FeatureItem>Priority support with SLA</FeatureItem>
              </ul>
            </div>
            <div className="border-t border-slate-200 px-6 pb-6 md:px-8 lg:border-t-0 lg:pb-0 lg:pr-8">
              <PixelButton
                href="https://cal.com/trooper/setup-call"
                external
                size="md"
                tone="dark"
                variant="outline"
                className="w-full"
                icon={<Server className="h-4 w-4" aria-hidden />}
              >
                Talk to sales
              </PixelButton>
            </div>
          </section>
        </motion.div>

        {showFullPricingLink ? (
          <div className="border-t border-slate-200 bg-trooper-50/80">
            <Link
              href="/pricing"
              className="group flex w-full items-center justify-center gap-2 py-5 text-sm font-medium text-trooper transition-colors hover:text-trooper-700"
            >
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
