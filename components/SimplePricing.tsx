'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

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

type Plan = {
  name: string;
  eyebrow?: string;
  price: string;
  cadence: string;
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
    cadence: 'one-time',
    description:
      'Best for solo founders who want the Crabs HQ experience with their own API keys.',
    badge: null,
    note: 'Bring your own API keys. API usage is billed separately by your model providers.',
    features: [
      'Lifetime access for 1 founder',
      'Bring your own OpenAI / Anthropic / Gemini keys',
      'Use Crabs workflows and agents',
      'Local or lightweight self-managed setup',
      'Core chat, tasks, and workflow memory',
      'No hosted cloud computer included',
      'No team seats',
      'No enterprise support',
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
    description:
      'Your managed AI workspace in the cloud. We host the computer, workflows, and runtime.',
    badge: 'Most Popular',
    note: 'Includes hosted infrastructure. Bring your own API keys for model usage.',
    features: [
      'Dedicated hosted Crabs workspace',
      '5 users included',
      'Additional seats can be added later',
      'Long-running workflows and agents',
      'Persistent cloud computer',
      'OpenClaw-powered task execution',
      'Team collaboration and shared memory',
      'Deploy apps, automations, and internal tools',
      'Admin controls',
      'Priority email support',
    ],
    cta: {
      text: 'Start in cloud',
      href: 'https://app.crabshq.com',
    },
    highlight: true,
  },
  {
    name: 'Enterprise',
    eyebrow: 'Self-host / private deployment',
    price: 'Custom',
    cadence: '',
    description:
      'For companies that want Crabs HQ on their own infrastructure, with full control.',
    badge: 'Self-host',
    note: 'Runs on your infra. Your keys, your data, your security policies.',
    features: [
      'Self-hosted deployment',
      'Private VPC / on-prem options',
      'SSO and enterprise auth',
      'Custom seat volume pricing',
      'White-label and custom domain options',
      'Dedicated onboarding',
      'Security reviews and custom agreements',
      'Internal integrations and custom workflows',
      'Shared company memory and knowledge',
      'Priority support and migration help',
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
    <section className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300">
            Pricing
          </div>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Pricing shaped like how people actually buy AI tools
          </h2>

          <p className="mt-4 text-base text-zinc-400 md:text-lg">
            Start solo with a lifetime deal, move to CrabsHQ Cloud when you want hosted
            workflows, or self-host for enterprise control.
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
                  ? 'border-cyan-400/40 bg-zinc-900 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]'
                  : 'border-zinc-800 bg-zinc-950/70'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {plan.eyebrow && (
                    <div className="text-sm font-medium text-cyan-300">{plan.eyebrow}</div>
                  )}
                  <h3 className="mt-2 text-2xl font-semibold text-white">{plan.name}</h3>
                </div>

                {plan.badge && (
                  <div className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-200">
                    {plan.badge}
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm leading-6 text-zinc-400">{plan.description}</p>

              <div className="mt-6 flex items-end gap-2">
                <div className="text-4xl font-semibold tracking-tight text-white">
                  {plan.price}
                </div>
                <div className="pb-1 text-sm text-zinc-400">{plan.cadence}</div>
              </div>

              {plan.note && (
                <p className="mt-3 text-xs leading-5 text-zinc-500">{plan.note}</p>
              )}

              <div className="mt-6">
                <FlippingButtonLink
                  href={plan.cta.href}
                  initialText={plan.cta.text}
                  hoverText="Let’s go"
                  className={
                    plan.highlight
                      ? 'bg-cyan-400 text-black hover:bg-cyan-300 focus:ring-cyan-400'
                      : 'bg-white text-black hover:bg-zinc-200 focus:ring-white'
                  }
                />
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-3xl text-center text-sm text-zinc-500">
          Model usage is not included in the plans above. Customers connect their own API keys
          and pay OpenAI, Anthropic, Google, or other providers directly for consumption.
        </div>
      </div>
    </section>
  );
}
