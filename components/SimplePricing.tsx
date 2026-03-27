'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

interface FlippingButtonLinkProps {
  href: string;
  initialText: string;
  hoverText: string;
  className?: string;
}

const FlippingButtonLink: React.FC<FlippingButtonLinkProps> = ({
  href,
  initialText,
  hoverText,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses =
    'flex items-center justify-center py-3 px-4 rounded-xl font-medium text-sm md:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full relative overflow-hidden';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`transition-transform duration-300 ${
          isHovered ? '-translate-y-8 opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {initialText}
      </span>
      <span
        className={`absolute transition-transform duration-300 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {hoverText}
      </span>
    </Link>
  );
};

type Feature = {
  icon: LucideIcon;
  label: string;
  color: string;
};

// Solo features - the base that every plan gets
const soloFeatures: Feature[] = [
  { icon: Bot, label: 'Unlimited Agents', color: 'text-red-500' },
  { icon: MessageSquare, label: 'Unlimited Chats', color: 'text-orange-500' },
  { icon: Monitor, label: 'Unlimited Devices', color: 'text-yellow-500' },
  { icon: Sparkles, label: 'All AI Models', color: 'text-emerald-500' },
  { icon: Terminal, label: 'Claude Code & Codex', color: 'text-indigo-500' },
  { icon: Brain, label: 'Adaptive Memory', color: 'text-green-500' },
  { icon: Eye, label: 'Context Awareness', color: 'text-cyan-500' },
  { icon: History, label: 'System Memory', color: 'text-violet-500' },
  { icon: ShieldCheck, label: 'Data Encryption', color: 'text-blue-500' },
  { icon: Puzzle, label: '3,000+ OpenClaw Skills', color: 'text-pink-500' },
  { icon: Globe, label: 'Browser Automation', color: 'text-red-500' },
  { icon: Smartphone, label: 'Mac, Windows, iOS, Android', color: 'text-slate-500' },
  { icon: Cpu, label: 'Always-on Virtual PC', color: 'text-indigo-500' },
  { icon: Network, label: 'Multi-agent orchestration', color: 'text-cyan-500' },
  { icon: GitBranch, label: 'GitHub integration (commits, PRs, reviews)', color: 'text-orange-500' },
  { icon: Infinity, label: 'Lifetime access for 1 user', color: 'text-emerald-500' },
];

// Cloud-only additions - team/collab features
const cloudFeatures: Feature[] = [
  { icon: Users, label: '5 team seats included', color: 'text-red-500' },
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
    description:
      'For solo founders who want full control. Self-host on your own machine, pay once, use forever.',
    badge: 'Lifetime Access',
    note: 'Bring your own API keys. Model usage is billed separately by OpenAI, Anthropic, Google, etc.',
    sections: [
      { label: '', features: soloFeatures },
    ],
    cta: {
      text: 'Get lifetime deal',
      href: 'https://app.crabshq.com',
    },
    highlight: false,
  },
  {
    name: 'CrabsHQ Cloud',
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
      href: 'https://app.crabshq.com',
    },
    highlight: true,
  },
  {
    name: 'Enterprise',
    eyebrow: 'Self-host / private deployment',
    price: 'Custom',
    cadence: '',
    perSeat: 'Volume pricing from ~$4/seat/month',
    description:
      'For companies that want Crabs HQ on their own infrastructure, with full control and custom pricing.',
    badge: 'Self-host',
    note: 'Starts at ~$7,000/year. Volume seat pricing available. Runs on your infra.',
    sections: [
      { label: '', features: enterpriseFeatures },
      { label: '', features: [], inheritsFrom: 'Everything from Cloud Plan' },
    ],
    cta: {
      text: 'Talk to sales',
      href: 'https://cal.com/crabshq/setup-call',
    },
    highlight: false,
  },
];

export default function SimplePricing() {
  return (
    <section className="relative bg-white py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            Pricing
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            <span className="inline-flex items-center justify-center gap-2 flex-wrap">
              <span>Deploy</span>
              <img src="/favicon.ico" alt="logo" className="inline-block w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-md align-middle" />
              <span>Crabs at your company</span>
            </span>
          </h2>

          <p className="mt-4 text-base text-slate-500 md:text-lg">
            Deploy AI employees that get real work done.
            CrabsHQ gives your team dedicated AI coworkers on their own private server — no shared infra, no vendor lock-in.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-6 md:p-8 ${
                plan.highlight
                  ? 'border-red-200 bg-white shadow-lg shadow-red-100/50 ring-1 ring-red-100'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {plan.eyebrow && (
                    <div className={`text-sm font-medium ${plan.highlight ? 'text-red-600' : 'text-slate-500'}`}>
                      {plan.eyebrow}
                    </div>
                  )}
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{plan.name}</h3>
                </div>

                {plan.badge && (
                  <div className={`rounded-full px-3 py-1 text-xs font-medium ${
                    plan.highlight
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : plan.badge === 'Lifetime Access'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {plan.badge}
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-500">{plan.description}</p>

              <div className="mt-6 flex items-end gap-2">
                <div className="text-4xl font-semibold tracking-tight text-slate-900">
                  {plan.price}
                </div>
                <div className="pb-1 text-sm text-slate-400">{plan.cadence}</div>
              </div>

              {plan.perSeat && (
                <p className="mt-2 text-sm font-medium text-red-600">{plan.perSeat}</p>
              )}

              {plan.note && (
                <p className="mt-3 text-xs leading-5 text-slate-400">{plan.note}</p>
              )}

              <div className="mt-6">
                <FlippingButtonLink
                  href={plan.cta.href}
                  initialText={plan.cta.text}
                  hoverText="Let's go"
                  className={
                    plan.highlight
                      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                      : 'bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500'
                  }
                />
              </div>

              {/* Feature sections */}
              <div className="mt-8">
                {plan.sections.map((section, sIdx) => (
                  <div key={sIdx}>
                    {section.inheritsFrom ? (
                      <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-100">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
