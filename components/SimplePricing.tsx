'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

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
  text: string;
  included: boolean;
};

type Plan = {
  name: string;
  eyebrow?: string;
  price: string;
  cadence: string;
  perSeat?: string;
  description: string;
  badge?: string | null;
  note?: string;
  features: Feature[];
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
      'For solo founders who want the Crabs HQ experience with their own API keys. Pay once, use forever.',
    badge: 'Lifetime Access',
    note: 'Bring your own API keys. Model usage is billed separately by OpenAI, Anthropic, Google, etc.',
    features: [
      { text: 'Lifetime access for 1 user', included: true },
      { text: 'Bring your own OpenAI / Anthropic / Gemini keys', included: true },
      { text: 'Crabs workflows and agents', included: true },
      { text: 'Local or lightweight self-managed setup', included: true },
      { text: 'Core chat, tasks, and workflow memory', included: true },
      { text: 'Hosted cloud computer', included: false },
      { text: 'Team seats or collaboration', included: false },
      { text: 'Enterprise support', included: false },
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
      { text: '5 team seats included', included: true },
      { text: 'Additional seats at $8/user/month', included: true },
      { text: 'Dedicated hosted Crabs workspace', included: true },
      { text: 'Long-running workflows and agents', included: true },
      { text: 'Persistent cloud computer', included: true },
      { text: 'OpenClaw-powered task execution', included: true },
      { text: 'Team collaboration and shared memory', included: true },
      { text: 'Deploy apps, automations, and internal tools', included: true },
      { text: 'Admin controls', included: true },
      { text: 'Priority email support', included: true },
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
      { text: 'Self-hosted deployment on your infra', included: true },
      { text: 'Private VPC / on-prem options', included: true },
      { text: 'SSO and enterprise auth', included: true },
      { text: 'Custom seat volume pricing', included: true },
      { text: 'White-label and custom domain', included: true },
      { text: 'Dedicated onboarding and migration', included: true },
      { text: 'Security reviews and custom agreements', included: true },
      { text: 'Internal integrations and custom workflows', included: true },
      { text: 'Shared company memory and knowledge', included: true },
      { text: 'Priority support with SLA', included: true },
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
            Choose how you want to run Crabs HQ
          </h2>

          <p className="mt-4 text-base text-slate-500 md:text-lg">
            Start with a lifetime deal, move to hosted cloud for your team,
            or self-host for enterprise control. Bring your own API keys.
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

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-slate-700' : 'text-slate-400'}`}>
                      {feature.text}
                    </span>
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
