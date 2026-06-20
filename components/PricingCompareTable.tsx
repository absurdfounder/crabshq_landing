'use client';

import React from 'react';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import PixelButton from '@/components/ui/PixelButton';
import { formatUsd, PRICING_USD } from '@/lib/pricing';
import { Check, Server, X } from 'lucide-react';

type ComparisonCell = boolean | { text: string; sub?: string };

type ComparisonRow = {
  feature: string;
  local: ComparisonCell;
  cloudLifetime: ComparisonCell;
  cloud: ComparisonCell;
  enterprise: ComparisonCell;
};

type ComparisonCategory = {
  title: string;
  rows: ComparisonRow[];
};

const PLAN_COLUMNS = [
  { key: 'local' as const, label: 'Local Install' },
  { key: 'cloudLifetime' as const, label: 'Solo Cloud' },
  { key: 'cloud' as const, label: 'Trooper Cloud', featured: true },
  { key: 'enterprise' as const, label: 'Enterprise' },
];

const comparisonCategories: ComparisonCategory[] = [
  {
    title: 'Core AI',
    rows: [
      { feature: 'Unlimited Agents', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Unlimited Chats', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Unlimited Devices', local: false, cloudLifetime: false, cloud: true, enterprise: true },
      { feature: 'All AI Models (OpenAI, Claude, Gemini, etc.)', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Claude Code & Codex support', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Multi-agent orchestration', local: true, cloudLifetime: true, cloud: true, enterprise: true },
    ],
  },
  {
    title: 'Memory & Context',
    rows: [
      { feature: 'Adaptive Memory', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Context Awareness', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'System Memory', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Shared team knowledge base', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Shared company memory', local: false, cloudLifetime: false, cloud: false, enterprise: true },
    ],
  },
  {
    title: 'Platform & Tools',
    rows: [
      { feature: 'Always-on Virtual PC', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: '3,000+ OpenClaw Skills', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Browser Automation', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'GitHub integration (commits, PRs, reviews)', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Email automation', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Shared workflows across team', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Deploy apps, automations, internal tools', local: false, cloudLifetime: true, cloud: true, enterprise: true },
    ],
  },
  {
    title: 'Apps & Devices',
    rows: [
      { feature: 'Mac app', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Windows app', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'iOS app', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Android app', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      {
        feature: 'Connected devices (OpenClaw nodes)',
        local: { text: 'None' },
        cloudLifetime: { text: 'None' },
        cloud: { text: 'Unlimited' },
        enterprise: { text: 'Unlimited' },
      },
    ],
  },
  {
    title: 'Team & Collaboration',
    rows: [
      {
        feature: 'Team seats',
        local: { text: '1 user', sub: `${formatUsd(PRICING_USD.localLifetime)} lifetime` },
        cloudLifetime: { text: '2 included', sub: 'lifetime' },
        cloud: { text: '2 included', sub: `+${formatUsd(PRICING_USD.cloudAdditionalMemberMonthly)}/member/mo` },
        enterprise: { text: 'Custom' },
      },
      { feature: 'Workspaces', local: { text: '1 workspace' }, cloudLifetime: { text: '1 workspace' }, cloud: { text: 'Multi-workspace' }, enterprise: { text: 'Multi-workspace' } },
      {
        feature: 'Org licensing',
        local: { text: 'Personal laptop install' },
        cloudLifetime: { text: 'Hosted lifetime · 1 org' },
        cloud: { text: 'Multi-workspace' },
        enterprise: { text: 'Multi-workspace' },
      },
      { feature: 'Invite teammates & assign roles', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Team collaboration & shared memory', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Admin controls & permissions', local: false, cloudLifetime: true, cloud: true, enterprise: true },
    ],
  },
  {
    title: 'Security & Compliance',
    rows: [
      { feature: 'Data encryption', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'SSO and enterprise auth', local: false, cloudLifetime: false, cloud: false, enterprise: true },
      { feature: 'Private VPC / on-prem', local: false, cloudLifetime: false, cloud: false, enterprise: true },
      { feature: 'Security reviews & custom agreements', local: false, cloudLifetime: false, cloud: false, enterprise: true },
    ],
  },
  {
    title: 'Deployment',
    rows: [
      { feature: 'Runs on your laptop', local: true, cloudLifetime: false, cloud: false, enterprise: false },
      { feature: 'Self-hosted', local: true, cloudLifetime: false, cloud: false, enterprise: true },
      { feature: 'Cloud-hosted by Trooper', local: false, cloudLifetime: true, cloud: true, enterprise: false },
      { feature: 'White-label & custom domain', local: false, cloudLifetime: false, cloud: false, enterprise: true },
      { feature: 'Custom seat volume pricing', local: false, cloudLifetime: false, cloud: false, enterprise: true },
      { feature: 'Dedicated onboarding & migration', local: false, cloudLifetime: false, cloud: false, enterprise: true },
    ],
  },
  {
    title: 'Support',
    rows: [
      { feature: 'Community support', local: true, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Priority email support', local: false, cloudLifetime: true, cloud: true, enterprise: true },
      { feature: 'Priority support with SLA', local: false, cloudLifetime: false, cloud: false, enterprise: true },
    ],
  },
];

const DESKTOP_GRID_COLS = 'grid-cols-[minmax(12rem,1.15fr)_repeat(4,minmax(0,1fr))]';
const DESKTOP_GRID = `grid ${DESKTOP_GRID_COLS} gap-px bg-slate-200`;

function compareCellClass(featured = false) {
  return ['px-5 py-3 xl:px-6', featured ? 'bg-emerald-50/45' : 'bg-white'].join(' ');
}

function compareHeaderCellClass(featured = false) {
  return [
    'sticky top-16 z-10 px-5 py-4 xl:px-6',
    featured ? 'border-t-2 border-emerald-500 bg-emerald-50/45' : 'bg-white',
  ].join(' ');
}

function CompareCell({ cell }: { cell: ComparisonCell }) {
  if (typeof cell === 'boolean') {
    return cell ? (
      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" strokeWidth={2} aria-hidden />
    ) : (
      <X className="h-3.5 w-3.5 shrink-0 text-slate-300" strokeWidth={1.5} aria-hidden />
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-sm text-slate-700">{cell.text}</span>
      {cell.sub ? <span className="mt-0.5 text-[11px] leading-snug text-slate-500">{cell.sub}</span> : null}
    </div>
  );
}

function DesktopCompareTable() {
  return (
    <div className="hidden overflow-hidden border-b border-slate-200 lg:block">
      <div className={DESKTOP_GRID}>
        <div className={compareHeaderCellClass()}>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Features</span>
        </div>
        {PLAN_COLUMNS.map((plan) => (
          <div key={plan.key} className={`${compareHeaderCellClass(plan.featured)} text-center`}>
            <span
              className={[
                'font-mono text-[10px] font-bold uppercase tracking-[0.14em]',
                plan.featured ? 'text-slate-900' : 'text-slate-600',
              ].join(' ')}
            >
              {plan.label}
            </span>
          </div>
        ))}

        {comparisonCategories.map((category) => (
          <React.Fragment key={category.title}>
            <div className="col-span-5 bg-[#FAFAF8] px-5 py-2.5 xl:px-6">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-trooper-700">
                {category.title}
              </span>
            </div>
            {category.rows.map((row) => (
              <React.Fragment key={row.feature}>
                <div className={`${compareCellClass()} flex items-center`}>
                  <span className="text-sm leading-snug text-slate-700">{row.feature}</span>
                </div>
                {PLAN_COLUMNS.map((plan) => (
                  <div key={plan.key} className={`${compareCellClass(plan.featured)} flex items-center justify-center`}>
                    <CompareCell cell={row[plan.key]} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        <div className={`${compareCellClass()} flex items-center py-4`}>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-900">Price</span>
        </div>
        <div className={`${compareCellClass()} flex items-center justify-center py-4 text-center`}>
          <span className="text-sm font-medium tabular-nums text-slate-900">
            {formatUsd(PRICING_USD.localLifetime)} one-time
          </span>
        </div>
        <div className={`${compareCellClass()} flex items-center justify-center py-4 text-center`}>
          <span className="text-sm font-medium tabular-nums text-slate-900">
            {formatUsd(PRICING_USD.cloudLifetime)} one-time
          </span>
        </div>
        <div className={`${compareCellClass(true)} flex items-center justify-center py-4 text-center`}>
          <span className="text-sm font-medium tabular-nums text-slate-900">
            {formatUsd(PRICING_USD.cloudStandardMonthly)}/mo · {formatUsd(PRICING_USD.cloudPremiumMonthly)}/mo Max
          </span>
        </div>
        <div className={`${compareCellClass()} flex items-center justify-center py-4 text-center`}>
          <span className="font-funneldisplay text-lg font-medium text-slate-900">Custom</span>
        </div>

        <div className={`${compareCellClass()} py-5`} />
        <div className={`${compareCellClass()} flex items-center justify-center px-3 py-5`}>
          <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
            Install locally
          </PixelButton>
        </div>
        <div className={`${compareCellClass()} flex items-center justify-center px-3 py-5`}>
          <PixelButton href="https://app.trooper.so" external size="md" tone="dark" className="w-full">
            Get lifetime deal
          </PixelButton>
        </div>
        <div className={`${compareCellClass(true)} flex items-center justify-center px-3 py-5`}>
          <PixelButton href="https://app.trooper.so" external size="md" tone="brand" className="w-full">
            Start with cloud
          </PixelButton>
        </div>
        <div className={`${compareCellClass()} flex items-center justify-center px-3 py-5`}>
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
      </div>
    </div>
  );
}

function MobileCompareTable() {
  return (
    <div className="border-b border-slate-200 bg-white lg:hidden">
      {comparisonCategories.map((category) => (
        <div key={category.title} className="border-b border-slate-200">
          <div className="border-b border-slate-200 bg-[#FAFAF8] px-5 py-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-trooper-700">
              {category.title}
            </span>
          </div>
          {category.rows.map((row) => (
            <div key={row.feature} className="border-b border-slate-200 px-5 py-4 last:border-b-0">
              <div className="text-sm font-medium leading-snug text-slate-800">{row.feature}</div>
              <div className="mt-3 grid grid-cols-2 gap-px border border-slate-200 bg-slate-200 sm:grid-cols-4">
                {PLAN_COLUMNS.map((plan) => (
                  <div
                    key={plan.key}
                    className={[
                      'flex flex-col items-center gap-1.5 px-2 py-3',
                      plan.featured ? 'bg-emerald-50/45' : 'bg-white',
                    ].join(' ')}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{plan.label}</span>
                    <CompareCell cell={row[plan.key]} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function PricingCompareTable() {
  return (
    <div className="w-full pb-8 md:pb-10">
      <div className="flex flex-col gap-6 pb-8 pt-2 max-md:gap-5 max-md:pb-6 md:pt-4">
        <MarketingHeadline
          as="h2"
          size="section"
          lines={[
            {
              parts: [{ text: 'Compare plans', tone: 'default' }],
            },
            {
              parts: [{ text: 'feature by feature.', tone: 'brand' }],
            },
          ]}
          subline="Same grid rhythm as the cards above — every row aligned across Local Install, Solo Cloud, Trooper Cloud, and Enterprise."
        />
      </div>

      <div className="-mx-3 border-t border-slate-200 sm:-mx-4 md:-mx-6">
        <DesktopCompareTable />
        <MobileCompareTable />
      </div>
    </div>
  );
}
