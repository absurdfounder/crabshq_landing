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
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            Never write another help article. CrabsHQ customers save 20 hours a month on support and docs on average. Get started today with a 7-day free trial. No credit card required.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden flex flex-col w-full max-w-md mx-4 sm:mx-auto"
          >
            <div className="p-4 sm:p-6 md:p-8 flex-grow">
              {/* Price */}
              <div className="text-center mb-6 sm:mb-7 md:mb-8">
                <div className="flex items-baseline justify-center flex-wrap gap-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                    ${monthlyPrice}
                  </span>
                  <span className="text-slate-600 text-sm sm:text-base">/ month</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 sm:mt-7 md:mt-8">
                <ul className="space-y-3 sm:space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start sm:items-center">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mr-2 sm:mr-3 mt-0.5 sm:mt-0" />
                      <span className="text-sm sm:text-base text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-6 md:pb-8">
              <Link
                href="https://app.crabshq.com"
                className="flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-xs sm:text-sm md:text-base bg-red-600 hover:bg-red-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 w-full"
              >
                Get started - free
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
