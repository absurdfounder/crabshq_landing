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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseClasses = 'flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm md:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 w-full relative';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-6 sm:h-7 md:h-8 leading-tight">
        <div
          className="w-full text-center"
          style={{
            transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {initialText}
        </div>
        <div
          className="absolute top-0 left-0 w-full text-center"
          style={{
            transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {hoverText}
        </div>
      </div>
    </Link>
  );
};

const plans = [
  {
    name: 'Crabs Cloud Computer',
    price: 49,
    description: 'We deploy and manage your dedicated server. You just use it.',
    badge: null,
    specs: { vcpu: 2, ram: '4 GB', disk: '40 GB' },
    features: [
      { text: 'Unlimited AI agents', bold: true },
      { text: 'Unlimited browser use', bold: true },
      { text: 'Unlimited OpenClaw Skills', bold: true },
      { text: 'Unlimited devices', bold: true },
      { text: 'Unlimited channels', bold: true },
      { text: 'Unlimited chats', bold: true },
      { text: 'Adaptive memory', bold: true },
      { text: 'Workflow memory', bold: true },
      { text: 'Long-running tasks', bold: true },
      { text: 'Full desktop built-in', bold: false },
      { text: 'Install your own apps', bold: false },
      { text: 'Mac, Windows & iOS apps', bold: false },
      { text: 'Full Mission Control', bold: false },
      { text: 'Telegram integration', bold: false },
      { text: 'Trained on Company Wiki', bold: false },
    ],
    cta: { text: 'Get started', href: 'https://app.crabshq.com' },
    highlight: false,
  },
  {
    name: 'Private / Enterprise',
    price: 149,
    description: 'Runs on your own infrastructure. Your keys, your data, your control.',
    badge: 'Enterprise',
    specs: null,
    features: [
      { text: 'Unlimited AI agents', bold: true },
      { text: 'Unlimited browser use', bold: true },
      { text: 'Unlimited OpenClaw Skills', bold: true },
      { text: 'Unlimited devices', bold: true },
      { text: 'Unlimited channels', bold: true },
      { text: 'Unlimited chats', bold: true },
      { text: 'Adaptive memory', bold: true },
      { text: 'Workflow memory', bold: true },
      { text: 'Long-running tasks', bold: true },
      { text: 'Any server size you want', bold: true },
      { text: 'Full desktop built-in', bold: false },
      { text: 'Install your own apps', bold: false },
      { text: 'Mac, Windows & iOS apps', bold: false },
      { text: 'Full Mission Control', bold: false },
      { text: 'All integrations', bold: false },
      { text: 'Trained on Company Wiki', bold: false },
      { text: 'White-label ready', bold: false },
    ],
    cta: { text: 'Get started', href: 'https://app.crabshq.com' },
    highlight: true,
  },
];

export default function SimplePricing() {
  return (
    <section className="bg-white py-8 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
            <span className="inline-flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              <span>Deploy</span>
              <img src="/favicon.ico" className="hidden sm:inline-block w-8 h-8 sm:w-14 sm:h-14 rounded-md align-middle" alt="logo" />
              <span>Crabs at your company</span>
            </span>
          </h2>
          <p className="text-slate-700 max-w-2xl mx-auto text-base sm:text-lg md:text-xl px-2 font-medium">
            Every plan gets its own isolated server. The difference is who controls it.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch max-w-3xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`relative bg-white rounded-xl border overflow-hidden flex flex-col w-full ${
                plan.highlight
                  ? 'border-red-500 shadow-xl shadow-red-100'
                  : 'border-slate-200 shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="bg-red-600 text-white text-xs font-semibold text-center py-1.5 tracking-wide uppercase">
                  {plan.badge}
                </div>
              )}
              <div className="p-6 md:p-8 flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-slate-900">${plan.price}</span>
                  <span className="text-slate-500 text-sm">/ month</span>
                </div>
                {plan.specs && (
                  <div className="flex gap-3 mb-6">
                    <div className="flex-1 bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900">{plan.specs.vcpu}</div>
                      <div className="text-xs text-slate-500">vCPU</div>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900">{plan.specs.ram}</div>
                      <div className="text-xs text-slate-500">RAM</div>
                    </div>
                    <div className="flex-1 bg-slate-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-slate-900">{plan.specs.disk}</div>
                      <div className="text-xs text-slate-500">Disk</div>
                    </div>
                  </div>
                )}
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className={`text-sm ${feature.bold ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 md:px-8 pb-6 md:pb-8">
                <Link
                  href={plan.cta.href}
                  className={`flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm transition-colors w-full ${
                    plan.highlight
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta.text}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
