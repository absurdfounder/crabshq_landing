'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Check,
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

const coreFeatures = [
  { icon: Bot, label: 'Unlimited Agents' },
  { icon: MessageSquare, label: 'Unlimited Chats' },
  { icon: Monitor, label: 'Unlimited Devices' },
  { icon: Sparkles, label: 'All AI Models' },
  { icon: Terminal, label: 'Claude Code & Codex' },
  { icon: Brain, label: 'Adaptive Memory' },
  { icon: ShieldCheck, label: 'Data Encryption' },
  { icon: Puzzle, label: '3,000+ OpenClaw Skills' },
  { icon: Globe, label: 'Browser Automation' },
  { icon: Smartphone, label: 'Mac, Windows, iOS, Android' },
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
  features: string[];
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
    features: [
      'Lifetime access for 1 user',
      'Self-hosted on your own machine',
      'Crabs workflows and agents',
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
    features: [
      '5 team seats included',
      'Additional seats at $8/user/month',
      'Dedicated hosted workspace',
      'Long-running workflows and persistent agents',
      'Persistent cloud computer',
      'OpenClaw-powered task execution',
      'Multi-agent orchestration',
      'GitHub integration (commits, PRs, reviews)',
      'Email automation',
      'Team collaboration and shared memory',
      'Deploy apps, automations, and internal tools',
      'Admin controls',
      'Priority email support',
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
    features: [
      'Everything in Cloud, plus:',
      'Self-hosted deployment on your infra',
      'Private VPC / on-prem options',
      'SSO and enterprise auth',
      'Custom seat volume pricing',
      'White-label and custom domain',
      'Dedicated onboarding and migration',
      'Security reviews and custom agreements',
      'Internal integrations and custom workflows',
      'Shared company memory and knowledge',
      'Priority support with SLA',
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
        {/* Core features hero */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            Pricing
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Everything you need. Every plan.
          </h2>

          <p className="mt-4 text-base text-slate-500 md:text-lg">
            Every Crabs HQ plan ships with the full platform. No feature gates, no limits on usage.
          </p>
        </div>

        {/* Core features grid - the golden features */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {coreFeatures.map((feature) => (
              <div
                key={feature.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 px-3 py-5 text-center transition-colors hover:border-slate-200 hover:bg-slate-50"
              >
                <feature.icon className="h-6 w-6 text-red-600" />
                <span className="text-sm font-medium text-slate-800">{feature.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Plan selection heading */}
        <div className="mx-auto mt-16 max-w-3xl text-center">
          <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
            Choose how you want to run it
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Start with a lifetime deal, move to hosted cloud for your team,
            or self-host for enterprise control. Bring your own API keys.
          </p>
        </div>

        {/* Plan cards */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
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

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl text-center text-sm text-slate-400">
          Model usage is not included. You connect your own API keys and pay
          OpenAI, Anthropic, Google, or other providers directly for consumption.
        </div>
      </div>
    </section>
  );
}
