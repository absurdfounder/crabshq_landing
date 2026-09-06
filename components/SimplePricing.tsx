'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import HeroDownloadButtons from '@/components/HeroDownloadButtons';
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

/** Shared row bands — keep columns aligned without tall empty stretch. */
const PRICING_GRID_TEMPLATE_ROWS = 'auto auto auto auto auto auto auto auto';

function planCellClass() {
  return 'bg-transparent px-4 xl:px-5';
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[13px] leading-5 text-ink-muted">
      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

function PlanBadge({ children, featured = false }: { children: React.ReactNode; featured?: boolean }) {
  return (
    <span
      className={[
        'rounded-md px-2 py-0.5 text-[11px] font-medium tracking-normal',
        featured
          ? 'bg-trooper text-white'
          : 'bg-neutral-100 text-ink-muted ring-1 ring-black/[0.04]',
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
        <span className="kicker">{eyebrow}</span>
        <PlanBadge featured={featured}>{badge}</PlanBadge>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Icon className="h-[18px] w-[18px] shrink-0 text-ok-600" aria-hidden />
        <h3 className="font-display text-lg font-medium tracking-tight text-ink">{title}</h3>
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
    <div className="flex items-center justify-between gap-2 rounded-md border border-[var(--color-line)] bg-white px-2.5 py-1.5">
      <div className="min-w-0">
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="text-[10px] leading-snug text-ink-muted">{helper}</p>
      </div>
      <div className="flex shrink-0 items-center gap-0.5" role="group" aria-label={`${label} quantity`}>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-line)] bg-white text-ink-muted transition hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-40"
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <Minus className="h-3 w-3" aria-hidden />
        </button>
        <span className="w-7 text-center text-[13px] font-medium tabular-nums text-ink">{value}</span>
        <button
          type="button"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--color-line)] bg-white text-ink-muted transition hover:bg-neutral-50 disabled:pointer-events-none disabled:opacity-40"
          disabled={atMax}
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <Plus className="h-3 w-3" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function TierRail({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center">
      <div className="flex w-full items-center">{children}</div>
    </div>
  );
}

function HostingModePill({ label, selected = true }: { label: string; selected?: boolean }) {
  // Compact mode chip — same height as CloudTierTabs for subgrid alignment.
  return (
    <TierRail>
      <div
        className="flex h-8 w-full items-center rounded-md bg-neutral-50 px-2.5"
        role="status"
        aria-label={`Hosting mode: ${label}`}
      >
        <span
          className={[
            'text-[11px] font-medium tracking-wide',
            selected ? 'text-ink-muted' : 'text-ink-faint',
          ].join(' ')}
        >
          {label}
        </span>
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
        className="grid w-full grid-cols-2 gap-0.5 rounded-md border border-[var(--color-line)] bg-neutral-100 p-0.5"
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
                'flex h-7 items-center justify-center gap-1 rounded-sm px-1.5 transition-all duration-150',
                selected
                  ? 'bg-trooper text-white shadow-sm'
                  : 'text-ink-muted hover:bg-white hover:text-ink',
              ].join(' ')}
            >
              <span className="text-[10px] font-semibold leading-none">{tier.label}</span>
              <span
                className={[
                  'text-[10px] font-medium tabular-nums leading-none',
                  selected ? 'text-white/90' : 'text-ink-muted',
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
    <div className="space-y-1.5">
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
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-[1.85rem] font-medium leading-none tracking-tight text-ink tabular-nums sm:text-[2.1rem]">
        {price}
      </span>
      {cadence ? <span className="text-[13px] font-medium text-ink-muted">{cadence}</span> : null}
    </div>
  );
}

function PricingSubline({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-medium leading-snug text-ok-700">{children}</p>
  );
}

function PricingNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] leading-snug text-ink-muted">
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
}: DesktopPlanColumnProps) {
  return (
    <article
      className={[
        'relative grid grid-rows-subgrid overflow-hidden rounded-2xl [grid-row:1/-1]',
        featured
          ? 'z-[1] bg-trooper-50/35 ring-2 ring-trooper shadow-[0_18px_40px_-24px_rgba(63,107,0,0.45)]'
          : 'border border-black/8 bg-white shadow-xs',
      ].join(' ')}
    >
      <div className={`${planCellClass()} border-b border-[var(--color-line)] py-3.5`}>
        <PlanHeader
          index={index}
          eyebrow={eyebrow}
          badge={badge}
          title={title}
          icon={icon}
          featured={featured}
        />
      </div>

      <div className={`${planCellClass()} flex items-center py-1.5`}>{tierRail}</div>

      <div className={`${planCellClass()} py-1`}>
        <PricingAmount price={price} cadence={cadence} />
      </div>

      <div className={`${planCellClass()} flex items-start py-0.5`}>{subline}</div>

      <div className={`${planCellClass()} flex items-start py-0.5`}>{note}</div>

      <div className={`${planCellClass()} py-1`}>{allowance}</div>

      <div className={`${planCellClass()} py-2.5`}>
        <ul className="space-y-1.5">{features}</ul>
      </div>

      <div className={`${planCellClass()} flex items-center border-t border-[var(--color-line)] py-3.5`}>{cta}</div>
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
}: DesktopPlanColumnProps) {
  return (
    <section
      className={[
        'relative flex min-w-0 flex-col overflow-hidden rounded-2xl',
        featured
          ? 'bg-trooper-50/35 ring-2 ring-trooper shadow-[0_18px_40px_-24px_rgba(63,107,0,0.45)]'
          : 'border border-black/8 bg-white shadow-xs',
      ].join(' ')}
    >
      <div className="border-b border-[var(--color-line)] px-4 py-4 sm:px-5 sm:py-5">
        <PlanHeader
          index={index}
          eyebrow={eyebrow}
          badge={badge}
          title={title}
          icon={icon}
          featured={featured}
        />
      </div>

      <div className="flex flex-1 flex-col px-4 py-4 sm:px-5 sm:py-6">
        {tierRail}
        <div className="mt-3 sm:mt-4">
          <PricingAmount price={price} cadence={cadence} />
        </div>
        <div className="mt-2">{subline}</div>
        <div className="mt-1.5">{note}</div>
        <div className="mt-3 sm:mt-4">{allowance}</div>
        <div className="mt-5 border-y border-[var(--color-line)] py-4 sm:mt-6">{cta}</div>
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
      {/* Not Linux: the product ships build-dmg.yml and build-windows.yml and
          nothing else, so a Linux desktop install was never buildable. */}
      <FeatureItem>Install on Mac or Windows</FeatureItem>
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
      eyebrow: 'Self-host',
      badge: 'Free',
      title: 'Self-host',
      icon: Laptop,
      price: formatUsd(PRICING_USD.localLifetime),
      cadence: 'free forever',
      subline: (
        <PricingSubline>1 workspace · no connected devices · free forever on your machine</PricingSubline>
      ),
      note: <PricingNote>BYO API keys — providers bill usage.</PricingNote>,
      tierRail: <HostingModePill label="On your machine" />,
      allowance: localAllowance,
      features: localFeatures,
      cta: <HeroDownloadButtons size="md" variant="solid" tone="dark" className="w-full" />,
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
      note: <PricingNote>BYO API keys — providers bill usage.</PricingNote>,
      tierRail: <HostingModePill label="Pay once · hosted" />,
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
          Extra members {formatUsd(PRICING_USD.cloudAdditionalMemberMonthly)}/mo. BYO keys.
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
      note: <PricingNote>Private deployment with custom agreements.</PricingNote>,
      tierRail: <HostingModePill label="Private cloud / VPC" />,
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
    /* Vertical rhythm belongs to the SectionShell wrapping this. */
    <div className="w-full">
      <div className="mx-auto max-w-2xl pb-8 text-center max-md:pb-6">
        <h2 className="h2-section mx-auto max-w-[22ch]">Simple pricing, by deployment.</h2>
        <p className="lede mx-auto !mt-4 max-w-lg">
          Every plan runs on a private server with your keys. No surprise bills on model usage —
          you pay providers&nbsp;directly.
        </p>
      </div>

      <div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          viewport={{ once: true }}
          className="hidden gap-5 xl:gap-6 lg:grid lg:grid-cols-4"
          style={{ gridTemplateRows: PRICING_GRID_TEMPLATE_ROWS }}
        >
          {plans.map((plan, idx) => (
            <DesktopPlanColumn key={plan.title} {...plan} isLast={idx === plans.length - 1} />
          ))}
        </motion.div>

        <div className="flex flex-col gap-4 lg:hidden">
          {plans.map((plan, idx) => (
            <MobilePlanCard key={plan.title} {...plan} isLast={idx === plans.length - 1} />
          ))}
        </div>

        {showFullPricingLink ? (
          <div className="mt-4 overflow-hidden rounded-xl bg-trooper-50/80 shadow-xs ring-1 ring-black/5">
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
