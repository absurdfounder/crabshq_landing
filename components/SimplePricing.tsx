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

  const baseClasses = 'flex items-center justify-center py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 w-full relative';

  return (
    <Link
      href={href}
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-5">
        <div
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

export default function SimplePricing() {
  const monthlyPrice = 99;
  const features = [
    'Unlimited AI agents',
    'Mission Control dashboard',
    'Telegram integration',
    'Custom squad setup',
    'Personal onboarding',
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Deploy <img src="/favicon.ico" className="inline-block w-14 h-14 rounded-md align-middle mx-1" /> Crabs at your company
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Never write another help article. CrabsHQ customers save 20 hours a month on support and docs on average. Get started today with a 7-day free trial. No credit card required.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden flex flex-col w-full max-w-md"
          >
            <div className="p-8 flex-grow">
              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-slate-900">
                    ${monthlyPrice}
                  </span>
                  <span className="text-slate-600 ml-2">/ month</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-3" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-8 pb-8">
              <FlippingButtonLink
                href="https://app.crabshq.com"
                initialText="Get started - free"
                hoverText="in under 15 mins"
                className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
