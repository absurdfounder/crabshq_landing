'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import TrustedByStrip from '@/components/TrustedByStrip';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FounderDarkQuote() {
  return (
    <>
      <TrustedByStrip label="Built for operators who ship" logos={['Solo founders', 'Startups', 'Agencies', 'Product teams']} />

      <motion.div
        className="grid grid-cols-1 gap-6 py-10 sm:gap-8 sm:py-12 md:grid-cols-[auto_1fr] md:gap-10 md:py-14 lg:gap-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, margin: '-20px' }}
      >
        <div
          className="font-display text-[4.5rem] leading-[0.85] tracking-tight text-[var(--color-quote-gold)] sm:text-[5.5rem] md:pt-1"
          aria-hidden
        >
          &ldquo;
        </div>

        <div className="min-w-0">
          <blockquote>
            <p className="font-display text-xl font-medium leading-[1.35] tracking-tight text-white sm:text-2xl md:text-[1.75rem] md:leading-[1.3] lg:text-[2rem]">
              Everyone deserves a fully powered agentic system that does real work — not just
              answers in a chat window.
            </p>
          </blockquote>

          <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-14 sm:w-14">
                <Image
                  src="/images/founder-portrait.png"
                  alt="Vaibhav, founder of Trooper"
                  fill
                  className="object-cover object-top"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-display text-base font-medium tracking-tight text-white sm:text-lg">
                  Vaibhav
                </p>
                <p className="mt-0.5 text-sm text-white/50">Founder, Trooper</p>
              </div>
            </div>

            <Link
              href="https://twitter.com/absurdfounder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/45 transition-colors hover:text-white/70"
            >
              @absurdfounder &rsaquo;
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
}
