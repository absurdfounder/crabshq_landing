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

/** Shared row bands — keeps headers, prices, steppers, features, and CTAs aligned across columns. */
const PRICING_GRID_TEMPLATE_ROWS =
  'auto minmax(4.5rem,auto) minmax(2.75rem,auto) minmax(2.5rem,auto) minmax(2.75rem,auto) minmax(11.5rem,auto) minmax(0px,1fr) auto';

function planCellClass() {
  return 'bg-white px-5 xl:px-6';
}

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
          : 'border-slate-100 bg-slate-100 text-slate-600',
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
  featured = false,
}: {
  index: string;
  eyebrow: string;
  badge: string;
  title: string;
  icon: LucideIcon;
  featured?: boolean;
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
          <span className="text-slate-400">[{index}]</span> {eyebrow}
        </span>
        <PlanBadge featured={featured}>{badge}</PlanBadge>
      </div>
      <div className="mt-4 flex items-center gap-2.5">
        <Icon className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
        <h3 className="font-funneldisplay text-xl font-medium tracking-tight text-slate-900">{title}</h3>
      </div>
    </>
  );
}

function AllowanceStepper({
  label,
  value,
  min,
  max = 150,
  onChange,
  helper,
  disableIncrease = false,
}: {
  label: string;
  value: number;
  min: number;
  max?: number;
  onChange: (value: number) => void;
  helper: string;
  disableIncrease?: boolean;
}) {
  const atMax = disableIncrease || value >= max;
  return (
    <div className="flex items-center justify-between gap-2 border border-slate-100 bg-white px-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{helper}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1" role="group" aria-label={`${label} quantity`}>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-100 bg-white text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-3.5 w-3.5" aria-hidden />
        </button>
        <span className="w-8 text-center text-sm font-medium tabular-nums text-slate-900">{value}</span>
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-slate-100 bg-white text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
          disabled={atMax}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function TierRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center lg:min-h-[4.5rem]">
      <div className="flex w-full items-center lg:py-2">{children}</div>
    </div>
  );
}

function HostingModePill({ label, selected = true }: { label: string; selected?: boolean }) {
  return (
    <TierRail>
      <div
        className="grid w-fit gap-1 rounded-sm border border-slate-100/90 bg-slate-50/60 p-1"
        role="radiogroup"
        aria-label="Hosting mode"
      >
        <button
          type="button"
          role="radio"
          aria-checked={selected}
          tabIndex={-1}
          className={[
            'h-8 cursor-default rounded-sm px-3 py-2 xl:px-3',
            selected ? 'bg-white text-slate-600 ring-1 ring-slate-200/80' : 'text-slate-400',
          ].join(' ')}
        >
          <span className="block text-center text-[10px] font-medium xl:text-[11px]">{label}</span>
        </button>
      </div>
    </TierRail>
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
    <TierRail>
      <div
        className="grid w-full grid-cols-2 gap-1 rounded-sm border border-slate-300 bg-slate-100 p-1 shadow-sm"
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
              aria-label={`${tier.label} ${formatUsd(tier.price)} per month`}
              onClick={() => onChange(tier.id)}
              className={[
                'flex h-8 items-center justify-center gap-1 rounded-sm px-2 transition-all duration-150 xl:gap-1.5 xl:px-2.5',
                selected
                  ? 'bg-trooper text-white shadow-sm ring-1 ring-trooper/40'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900',
              ].join(' ')}
            >
              <span className="text-[10px] font-semibold leading-none xl:text-[11px]">{tier.label}</span>
              <span
                className={[
                  'text-[10px] font-medium tabular-nums leading-none xl:text-[11px]',
                  selected ? 'text-white/90' : 'text-slate-500',
                ].join(' ')}
              >
                {formatUsd(tier.price)}/mo
              </span>
            </button>
          );
        })}
      </div>
    </TierRail>
  );
}

function AllowanceBlock({
  seatCount,
  workspaceCount,
  onSeatChange,
  onWorkspaceChange,
  minSeats,
  minWorkspaces,
  maxSeats = 150,
  maxWorkspaces = 150,
  seatHelper,
  workspaceHelper,
  disableIncrease = false,
}: {
  seatCount: number;
  workspaceCount: number;
  onSeatChange: (value: number) => void;
  onWorkspaceChange: (value: number) => void;
  minSeats: number;
  minWorkspaces: number;
  maxSeats?: number;
  maxWorkspaces?: number;
  seatHelper: string;
  workspaceHelper: string;
  disableIncrease?: boolean;
}) {
  return (
    <div className="space-y-2 lg:min-h-[11.5rem]">
      <AllowanceStepper
        label="Team members"
        value={seatCount}
        min={minSeats}
        max={maxSeats}
        onChange={onSeatChange}
        helper={seatHelper}
        disableIncrease={disableIncrease}
      />
      <AllowanceStepper
        label="Workspaces"
        value={workspaceCount}
        min={minWorkspaces}
        max={maxWorkspaces}
        onChange={onWorkspaceChange}
        helper={workspaceHelper}
        disableIncrease={disableIncrease}
      />
    </div>
  );
}

function PricingAmount({
  price,
  cadence,
}: {
  price: string;
  cadence?: string;
}) {
  return (
    <div className="flex items-end gap-1.5 lg:min-h-[2.75rem]">
      <span className="font-funneldisplay text-3xl font-medium tabular-nums tracking-tight text-slate-900 sm:text-4xl">
        {price}
      </span>
      {cadence ? <span className="pb-1 text-sm text-slate-500">{cadence}</span> : null}
    </div>
  );
}

function PricingSubline({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-medium leading-snug text-emerald-700 lg:min-h-[2.5rem]">{children}</p>
  );
}

function PricingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs leading-5 text-slate-500 lg:min-h-[2.75rem]">
      {children ?? <span className="hidden lg:inline">&nbsp;</span>}
    </p>
  );
}

type DesktopPlanColumnProps = {
  index: string;
  eyebrow: string;
  badge: string;
  title: string;
  icon: LucideIcon;
  featured?: boolean;
  price: string;
  cadence?: string;
  subline: React.ReactNode;
  note: React.ReactNode;
  tierRail: React.ReactNode;
  allowance: React.ReactNode;
  features: React.ReactNode;
  cta: React.ReactNode;
  isLast?: boolean;
};

function DesktopPlanColumn({
  index,
  eyebrow,
  badge,
  title,
  icon,
  featured = false,
  price,
  cadence,
  subline,
  note,
  tierRail,
  allowance,
  features,
  cta,
  isLast = false,
}: DesktopPlanColumnProps) {
  return (
    <article
      className={[
        'relative grid grid-rows-subgrid bg-white [grid-row:1/-1]',
        !isLast ? 'border-r border-slate-100' : '',
        featured ? 'z-[1] shadow-[0_8px_28px_rgba(15,23,42,0.08)] ring-1 ring-emerald-500/25' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-emerald-500" aria-hidden />
      ) : null}

      <div className={`${planCellClass()} border-b border-slate-100 py-5`}>
        <PlanHeader
          index={index}
          eyebrow={eyebrow}
          badge={badge}
          title={title}
          icon={icon}
          featured={featured}
        />
      </div>

      <div className={`${planCellClass()} flex items-center py-2`}>{tierRail}</div>

      <div className={`${planCellClass()} py-1`}>
        <PricingAmount price={price} cadence={cadence} />
      </div>

      <div className={`${planCellClass()} flex items-start py-1`}>{subline}</div>

      <div className={`${planCellClass()} flex items-start py-1`}>{note}</div>

      <div className={`${planCellClass()} py-1`}>{allowance}</div>

      <div className={`${planCellClass()} py-4`}>
        <ul className="space-y-2.5">{features}</ul>
      </div>

      <div className={`${planCellClass()} flex items-center border-t border-slate-100 py-5`}>{cta}</div>
    </article>
  );
}

function MobilePlanCard({
  index,
  eyebrow,
  badge,
  title,
  icon,
  featured = false,
  price,
  cadence,
  subline,
  note,
  tierRail,
  allowance,
  features,
  cta,
  isLast = false,
}: DesktopPlanColumnProps) {
  return (
    <section
      className={[
        'relative flex min-w-0 flex-col bg-white',
        !isLast ? 'border-b border-slate-100' : '',
        featured ? 'shadow-[0_8px_28px_rgba(15,23,42,0.08)] ring-1 ring-emerald-500/25' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {featured ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-emerald-500" aria-hidden />
      ) : null}

      <div className="border-b border-slate-100 px-4 py-4 sm:px-5 sm:py-5">
        <PlanHeader
          index={index}
          eyebrow={eyebrow}
          badge={badge}
          title={title}
          icon={icon}
          featured={featured}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-6 xl:px-6">
        {tierRail}
        <div className="mt-2 sm:mt-4">
          <PricingAmount price={price} cadence={cadence} />
        </div>
        <div className="mt-1.5 sm:mt-2">{subline}</div>
        <div className="mt-1">{note}</div>
        <div className="mt-2.5 sm:mt-4">{allowance}</div>
        <div className="mt-5 border-y border-slate-100 py-4 sm:mt-6">{cta}</div>
        <ul className="mt-4 space-y-2.5 sm:mt-5">{features}</ul>
      </div>
    </section>
  );
}

export default function SimplePricing({ showFullPricingLink = true }: SimplePricingProps) {
  const [cloudTier, setCloudTier] = useState<CloudSubscriptionTier>('standard');
  const [seatCount, setSeatCount] = useState<number>(PRICING_USD.cloudIncludedMembers);
  const [workspaceCount, setWorkspaceCount] = useState<number>(PRICING_USD.cloudIncludedWorkspaces);
  const [localSeatCount, setLocalSeatCount] = useState<number>(PRICING_USD.localIncludedMembers);
  const [localWorkspaceCount, setLocalWorkspaceCount] = useState<number>(PRICING_USD.localIncludedWorkspaces);
  const [soloSeatCount, setSoloSeatCount] = useState<number>(PRICING_USD.cloudIncludedMembers);
  const [soloWorkspaceCount, setSoloWorkspaceCount] = useState<number>(PRICING_USD.cloudIncludedWorkspaces);
  const [enterpriseSeatCount, setEnterpriseSeatCount] = useState<number>(PRICING_USD.cloudIncludedMembers);
  const [enterpriseWorkspaceCount, setEnterpriseWorkspaceCount] = useState<number>(PRICING_USD.cloudIncludedWorkspaces);

  const estimatedMonthly = estimateCloudMonthly({
    tier: cloudTier,
    seatCount,
    workspaceCount,
  });

  const cloudTierPrice = formatUsd(getCloudTierMonthlyPrice(cloudTier));

  const localAllowance = (
    <AllowanceBlock
      seatCount={localSeatCount}
      workspaceCount={localWorkspaceCount}
      onSeatChange={setLocalSeatCount}
      onWorkspaceChange={setLocalWorkspaceCount}
      minSeats={PRICING_USD.localIncludedMembers}
      maxSeats={PRICING_USD.localIncludedMembers}
      minWorkspaces={PRICING_USD.localIncludedWorkspaces}
      maxWorkspaces={PRICING_USD.localIncludedWorkspaces}
      seatHelper={`${PRICING_USD.localIncludedMembers} included`}
      workspaceHelper={`${PRICING_USD.localIncludedWorkspaces} included`}
    />
  );

  const soloAllowance = (
    <AllowanceBlock
      seatCount={soloSeatCount}
      workspaceCount={soloWorkspaceCount}
      onSeatChange={setSoloSeatCount}
      onWorkspaceChange={setSoloWorkspaceCount}
      minSeats={PRICING_USD.cloudIncludedMembers}
      maxSeats={PRICING_USD.cloudIncludedMembers}
      minWorkspaces={PRICING_USD.cloudIncludedWorkspaces}
      maxWorkspaces={PRICING_USD.cloudIncludedWorkspaces}
      seatHelper={`${PRICING_USD.cloudIncludedMembers} included`}
      workspaceHelper={`${PRICING_USD.cloudIncludedWorkspaces} included`}
    />
  );

  const cloudAllowance = (
    <AllowanceBlock
      seatCount={seatCount}
      workspaceCount={workspaceCount}
      onSeatChange={setSeatCount}
      onWorkspaceChange={setWorkspaceCount}
      minSeats={PRICING_USD.cloudIncludedMembers}
      minWorkspaces={PRICING_USD.cloudIncludedWorkspaces}
      seatHelper={`${PRICING_USD.cloudIncludedMembers} included`}
      workspaceHelper={`${PRICING_USD.cloudIncludedWorkspaces} included`}
    />
  );

  const enterpriseAllowance = (
    <AllowanceBlock
      seatCount={enterpriseSeatCount}
      workspaceCount={enterpriseWorkspaceCount}
      onSeatChange={setEnterpriseSeatCount}
      onWorkspaceChange={setEnterpriseWorkspaceCount}
      minSeats={PRICING_USD.cloudIncludedMembers}
      minWorkspaces={PRICING_USD.cloudIncludedWorkspaces}
      seatHelper="200 included"
      workspaceHelper="100 included"
      disableIncrease
    />
  );

  const localFeatures = (
    <>
      {COMMON_PLAN_FEATURES.map((feature) => (
        <FeatureItem key={feature}>{feature}</FeatureItem>
      ))}
      <FeatureItem>Install on Mac, Windows, or Linux</FeatureItem>
      <FeatureItem>Bring your own API keys</FeatureItem>
    </>
  );

  const lifetimeFeatures = (
    <>
      {COMMON_PLAN_FEATURES.map((feature) => (
        <FeatureItem key={feature}>{feature}</FeatureItem>
      ))}
      <FeatureItem>Always-on managed cloud computer</FeatureItem>
      <FeatureItem>Lifetime hosted access — pay once</FeatureItem>
    </>
  );

  const cloudFeatures = (
    <>
      {COMMON_PLAN_FEATURES.map((feature) => (
        <FeatureItem key={feature}>{feature}</FeatureItem>
      ))}
      <FeatureItem>Multi-workspace support and unlimited connected devices</FeatureItem>
      <FeatureItem>Admin controls and team collaboration</FeatureItem>
    </>
  );

  const enterpriseFeatures = (
    <>
      {COMMON_PLAN_FEATURES.map((feature) => (
        <FeatureItem key={feature}>{feature}</FeatureItem>
      ))}
      <FeatureItem>Private VPC or on-prem deployment</FeatureItem>
      <FeatureItem>SSO, custom domains, and agreements</FeatureItem>
      <FeatureItem>Priority support with SLA</FeatureItem>
    </>
  );

  const planProps = {
    local: {
      index: '01',
      eyebrow: 'Self-install',
      badge: 'Lifetime',
      title: 'Local Install',
      icon: Laptop,
      price: formatUsd(PRICING_USD.localLifetime),
      cadence: 'one-time',
      subline: (
        <PricingSubline>1 workspace · no connected devices · lifetime license on your machine</PricingSubline>
      ),
      note: <PricingNote>Bring your own API keys. Model usage billed by your providers.</PricingNote>,
      tierRail: <HostingModePill label="Self Hosted" />,
      allowance: localAllowance,
      features: localFeatures,
      cta: (
        <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
          Install locally
        </PixelButton>
      ),
    },
    lifetime: {
      index: '02',
      eyebrow: 'Lifetime deal',
      badge: 'Lifetime',
      title: 'Solo Cloud',
      icon: Infinity,
      price: formatUsd(PRICING_USD.cloudLifetime),
      cadence: 'one-time',
      subline: (
        <PricingSubline>
          1 workspace · {PRICING_USD.cloudIncludedMembers} team members · no connected devices
        </PricingSubline>
      ),
      note: <PricingNote>Bring your own API keys. Model usage billed by your providers.</PricingNote>,
      tierRail: <HostingModePill label="Cloud Self Hosting" />,
      allowance: soloAllowance,
      features: lifetimeFeatures,
      cta: (
        <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
          Get lifetime deal
        </PixelButton>
      ),
    },
    cloud: {
      index: '03',
      eyebrow: 'Hosted by us',
      badge: 'Most popular',
      title: 'Trooper Cloud',
      icon: Cloud,
      featured: true,
      price: cloudTierPrice,
      cadence: '/ month',
      subline: <PricingSubline>{PRICING_USD.cloudIncludedMembers} team members included</PricingSubline>,
      note: (
        <PricingNote>
          Each workspace uses the selected tier ({cloudTierPrice}/mo). Additional members are{' '}
          {formatUsd(PRICING_USD.cloudAdditionalMemberMonthly)}/month.
        </PricingNote>
      ),
      tierRail: <CloudTierTabs value={cloudTier} onChange={setCloudTier} />,
      allowance: cloudAllowance,
      features: cloudFeatures,
      cta: (
        <PixelButton href="https://app.trooper.so" external size="md" tone="brand" className="w-full">
          Choose · {formatUsd(estimatedMonthly)}/month
        </PixelButton>
      ),
    },
    enterprise: {
      index: '04',
      eyebrow: 'Private deployment',
      badge: 'Custom',
      title: 'Enterprise',
      icon: Building2,
      price: 'Custom',
      subline: <PricingSubline>Volume pricing and dedicated support</PricingSubline>,
      note: <PricingNote>Self-hosted deployment with migration and custom agreements.</PricingNote>,
      tierRail: <HostingModePill label="Self Hosted" />,
      allowance: enterpriseAllowance,
      features: enterpriseFeatures,
      cta: (
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
      ),
    },
  } as const;

  const plans = [planProps.local, planProps.lifetime, planProps.cloud, planProps.enterprise];

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

      <div className="border-t border-slate-100 sm:-mx-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="hidden overflow-hidden border-b border-slate-100 bg-slate-200 lg:grid lg:grid-cols-4"
          style={{ gridTemplateRows: PRICING_GRID_TEMPLATE_ROWS }}
        >
          {plans.map((plan, idx) => (
            <DesktopPlanColumn key={plan.title} {...plan} isLast={idx === plans.length - 1} />
          ))}
        </motion.div>

        <div className="border-b border-slate-100 bg-white lg:hidden">
          {plans.map((plan, idx) => (
            <MobilePlanCard key={plan.title} {...plan} isLast={idx === plans.length - 1} />
          ))}
        </div>

        {showFullPricingLink ? (
          <div className="border-t border-slate-100 bg-trooper-50/80">
            <Link
              href="/pricing"
              className="group flex w-full items-center justify-center gap-2 px-4 py-3.5 text-sm font-medium text-trooper transition-colors hover:text-trooper-700 sm:py-4 md:py-5"
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
