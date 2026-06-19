'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import PixelButton from './ui/PixelButton';
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

const cloudFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Users, label: '5 team seats included', color: 'text-trooper' },
  { icon: DollarSign, label: 'Additional seats at $8/user/month', color: 'text-trooper-700' },
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
    perSeat: 'Free on your laptop · unlimited everything',
    description:
      'Install Trooper on your laptop at no cost. Same unlimited solo experience — self-hosted runtime on your machine.',
    badge: 'Free',
    note: 'Bring your own API keys. Model usage is billed separately by your providers.',
    sections: [
      {
        label: '',
        features: [
          { icon: Laptop, label: 'Install on your Mac, Windows, or Linux laptop', color: 'text-trooper' },
          { icon: Server, label: 'Self-install cloud runtime on your machine', color: 'text-indigo-500' },
          { icon: DollarSign, label: '$0/month — no subscription', color: 'text-trooper-700' },
        ],
      },
      { label: '', features: [], inheritsFrom: 'Unlimited everything in Solo Founder' },
    ],
    cta: {
      text: 'Install locally',
      href: 'https://app.trooper.so',
    },
    highlight: false,
  },
  {
    name: 'Solo Founder',
    eyebrow: 'Lifetime deal',
    price: '$79',
    cadence: 'one-time payment',
    perSeat: 'Pay once · use forever · no subscription',
    description:
      'For solo founders who want full control. Self-host on your own machine, pay once, use forever.',
    badge: 'Lifetime Access',
    note: 'Bring your own API keys. Model usage is billed separately by OpenAI, Anthropic, Google, etc.',
    sections: [{ label: '', features: soloFeatures }],
    cta: {
      text: 'Get lifetime deal',
      href: 'https://app.trooper.so',
    },
    highlight: false,
  },
  {
    name: 'Trooper Cloud',
    eyebrow: 'Hosted by us',
    price: '$99',
    cadence: '/ month',
    perSeat: '$8 per additional seat / month',
    description:
      'Your managed AI workspace in the cloud. We host the computer, workflows, and runtime for your team.',
    badge: 'Most Popular',
    note: '5 seats included. Additional seats $8/mo each. Bring your own API keys for model usage.',
    sections: [
      { label: '', features: cloudFeatures },
      { label: '', features: [], inheritsFrom: 'Everything from Solo Plan' },
    ],
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
              {section.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2">
                  <feature.icon className={`h-4 w-4 shrink-0 ${feature.color}`} />
                  <span className="text-sm text-slate-700">{feature.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

function DesktopPricingGrid({ plans }: { plans: Plan[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="grid grid-cols-4 grid-rows-[auto_auto_auto_auto_1fr]"
    >
      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`h-${plan.name}`}
            className={[
              'flex flex-col bg-white px-6 pt-6 pb-3 md:px-8 md:pt-8',
              !isLast ? 'border-r border-slate-200' : '',
              plan.highlight ? 'border-t-2 border-t-trooper -mt-px' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              {plan.eyebrow ? (
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  <span className="text-slate-400">{planNumber(idx)}</span> {plan.eyebrow}
                </span>
              ) : (
                <span />
              )}
              <PlanBadge plan={plan} />
            </div>
            <h3 className="mt-3 font-funneldisplay text-2xl font-medium tracking-tight text-slate-900">
              {plan.name}
            </h3>
          </div>
        );
      })}

      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`d-${plan.name}`}
            className={[
              'bg-white px-6 py-3 md:px-8',
              !isLast ? 'border-r border-slate-200' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <p className="text-sm leading-6 text-slate-500">{plan.description}</p>
          </div>
        );
      })}

      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`p-${plan.name}`}
            className={[
              'flex flex-col bg-white px-6 pt-3 pb-6 md:px-8 md:pb-8',
              !isLast ? 'border-r border-slate-200' : '',
              'border-b border-slate-200',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="flex items-end gap-2">
              <div className="font-funneldisplay text-4xl font-medium tabular-nums tracking-tight text-slate-900">
                {plan.price}
              </div>
              {plan.cadence && (
                <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div>
              )}
            </div>
            {plan.perSeat ? (
              <p className="mt-2 text-sm font-medium text-trooper">{plan.perSeat}</p>
            ) : (
              <p className="mt-2 text-sm font-medium text-transparent">—</p>
            )}
            {plan.note ? (
              <p className="mt-3 text-xs leading-5 text-slate-400">{plan.note}</p>
            ) : (
              <p className="mt-3 text-xs leading-5 text-transparent">—</p>
            )}
          </div>
        );
      })}

      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`c-${plan.name}`}
            className={[
              'flex items-center bg-white px-6 py-5 md:px-8',
              !isLast ? 'border-r border-slate-200' : '',
              'border-b border-slate-200',
            ]
              .filter(Boolean)
              .join(' ')}
          >
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
        );
      })}

      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`f-${plan.name}`}
            className={[
              'bg-white px-6 py-6 md:px-8',
              !isLast ? 'border-r border-slate-200' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <PlanFeatures plan={plan} />
          </div>
        );
      })}
    </motion.div>
  );
}

function MobilePricingCard({
  plan,
  idx,
  isLast,
}: {
  plan: Plan;
  idx: number;
  isLast: boolean;
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
        <p className="mt-4 text-sm leading-6 text-slate-500">{plan.description}</p>
        <div className="mt-5 flex items-end gap-2">
          <div className="font-funneldisplay text-4xl font-medium tabular-nums tracking-tight text-slate-900">
            {plan.price}
          </div>
          {plan.cadence && <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div>}
        </div>
        {plan.perSeat && (
          <p className="mt-2 text-sm font-medium text-trooper">{plan.perSeat}</p>
        )}
        {plan.note && <p className="mt-3 text-xs leading-5 text-slate-400">{plan.note}</p>}
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
