'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  ArrowRight,
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
} from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  label: string;
  color: string;
};

// Solo features - the base that every plan gets
const soloFeatures: Feature[] = [
  { icon: Bot, label: 'Unlimited Agents', color: 'text-emerald-500' },
  { icon: MessageSquare, label: 'Unlimited Chats', color: 'text-orange-500' },
  { icon: Monitor, label: 'Unlimited Devices', color: 'text-yellow-500' },
  { icon: Sparkles, label: 'All AI Models', color: 'text-emerald-500' },
  { icon: Terminal, label: 'Claude Code & Codex', color: 'text-indigo-500' },
  { icon: Brain, label: 'Adaptive Memory', color: 'text-green-500' },
  { icon: Eye, label: 'Context Awareness', color: 'text-cyan-500' },
  { icon: History, label: 'System Memory', color: 'text-violet-500' },
  { icon: ShieldCheck, label: 'Data Encryption', color: 'text-blue-500' },
  { icon: Puzzle, label: '3,000+ OpenClaw Skills', color: 'text-pink-500' },
  { icon: Globe, label: 'Browser Automation', color: 'text-emerald-500' },
  { icon: Smartphone, label: 'Mac, Windows, iOS, Android', color: 'text-slate-500' },
  { icon: Cpu, label: 'Always-on Virtual PC', color: 'text-indigo-500' },
  { icon: Network, label: 'Multi-agent orchestration', color: 'text-cyan-500' },
  { icon: GitBranch, label: 'GitHub integration (commits, PRs, reviews)', color: 'text-orange-500' },
  { icon: Building2, label: 'License for 1 org', color: 'text-slate-600' },
  { icon: Infinity, label: 'Lifetime access for 1 user', color: 'text-emerald-500' },
];

// Cloud-only additions - team/collab features
const cloudFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Users, label: '5 team seats included', color: 'text-emerald-500' },
  { icon: DollarSign, label: 'Additional seats at $8/user/month', color: 'text-emerald-500' },
  { icon: Share2, label: 'Team collaboration and shared memory', color: 'text-green-500' },
  { icon: UserPlus, label: 'Invite teammates and assign roles', color: 'text-orange-500' },
  { icon: Mail, label: 'Email automation', color: 'text-violet-500' },
  { icon: Settings, label: 'Admin controls and permissions', color: 'text-slate-500' },
  { icon: Database, label: 'Shared team knowledge base', color: 'text-yellow-500' },
  { icon: Workflow, label: 'Shared workflows across team', color: 'text-cyan-500' },
  { icon: Headphones, label: 'Priority email support', color: 'text-blue-500' },
];

// Enterprise-only additions
const enterpriseFeatures: Feature[] = [
  { icon: Building2, label: 'Multi-org support', color: 'text-slate-600' },
  { icon: Server, label: 'Self-hosted deployment on your infra', color: 'text-indigo-500' },
  { icon: Lock, label: 'Private VPC / on-prem options', color: 'text-blue-500' },
  { icon: BadgeCheck, label: 'SSO and enterprise auth', color: 'text-green-500' },
  { icon: DollarSign, label: 'Custom seat volume pricing', color: 'text-emerald-500' },
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
    name: 'Solo Founder',
    eyebrow: 'Lifetime deal',
    price: '$79',
    cadence: 'one-time payment',
    perSeat: 'Pay once · use forever · no subscription',
    description:
      'For solo founders who want full control. Self-host on your own machine, pay once, use forever.',
    badge: 'Lifetime Access',
    note: 'Bring your own API keys. Model usage is billed separately by OpenAI, Anthropic, Google, etc.',
    sections: [
      { label: '', features: soloFeatures },
    ],
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

export default function SimplePricing() {
  return (
    <section className="relative bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-10 sm:mb-12">
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl tracking-tight mb-4 sm:mb-6 leading-tight">
            <span className="text-slate-800 block mb-2">
              <span className="inline-flex items-center gap-2">
                <span>Deploy</span>
                <img
                  src="/images/trooper-logomark.png"
                  alt="Trooper"
                  className="inline-block w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain align-middle bg-transparent"
                />
                <span>Trooper at your company</span>
              </span>
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
            Deploy AI employees that get real work done. Trooper gives your team dedicated AI
            coworkers on their own private server — no shared infra, no vendor lock-in.
          </p>
        </div>

        {/* Desktop: row-based grid so every plan-row is the height of the tallest cell.
            Mobile: stacked cards. */}
        <div className="mt-8 hidden border border-slate-200 bg-white lg:block">
          <DesktopPricingGrid plans={plans} />
        </div>

        <div className="mt-8 border border-slate-200 bg-white lg:hidden">
          {plans.map((plan, idx) => (
            <MobilePricingCard
              key={plan.name}
              plan={plan}
              idx={idx}
              isLast={idx === plans.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function planNumber(idx: number) {
  return `[${String(idx + 1).padStart(2, '0')}]`;
}

function PlanBadge({ plan }: { plan: Plan }) {
  if (!plan.badge) return null;
  const tone = plan.highlight
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : plan.badge === 'Lifetime Access'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
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
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500" />
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

/**
 * Desktop pricing grid.
 *
 * We render every plan's content in 5 explicit rows (header, description,
 * price, CTA, features). Because each row is a CSS-grid row, its height is
 * driven by the tallest cell across the 3 plans — that guarantees
 * eyebrows/names, descriptions, prices, and CTAs are all baseline-aligned.
 */
function DesktopPricingGrid({ plans }: { plans: Plan[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true }}
      className="grid grid-cols-3 grid-rows-[auto_auto_auto_auto_1fr]"
    >
      {/* Row 1 — header (eyebrow + badge + name).
          No border-b so it flows into the description row. */}
      {plans.map((plan, idx) => {
        const isLast = idx === plans.length - 1;
        return (
          <div
            key={`h-${plan.name}`}
            className={[
              'flex flex-col bg-white px-6 pt-6 pb-3 md:px-8 md:pt-8',
              !isLast ? 'border-r border-slate-200' : '',
              plan.highlight ? 'border-t-2 border-t-emerald-500 -mt-px' : '',
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
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
              {plan.name}
            </h3>
          </div>
        );
      })}

      {/* Row 2 — description. No border-b. */}
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

      {/* Row 3 — price + per-seat + note. Border-b separates top half from CTA. */}
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
              <div className="text-4xl font-semibold tracking-tight text-slate-900">
                {plan.price}
              </div>
              {plan.cadence && (
                <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div>
              )}
            </div>
            {plan.perSeat ? (
              <p className="mt-2 text-sm font-medium text-emerald-600">{plan.perSeat}</p>
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

      {/* Row 4 — CTA */}
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

      {/* Row 5 — features */}
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
        plan.highlight ? 'border-t-2 border-t-emerald-500 -mt-px' : '',
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
        <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">{plan.name}</h3>
        <p className="mt-4 text-sm leading-6 text-slate-500">{plan.description}</p>
        <div className="mt-5 flex items-end gap-2">
          <div className="text-4xl font-semibold tracking-tight text-slate-900">{plan.price}</div>
          {plan.cadence && <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div>}
        </div>
        {plan.perSeat && (
          <p className="mt-2 text-sm font-medium text-emerald-600">{plan.perSeat}</p>
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
