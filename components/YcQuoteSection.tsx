'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

const ENDORSERS = ['Y Combinator', 'OpenClaw', 'GitHub', 'ClawdBot'] as const;

export default function YcQuoteSection() {
  return (
    <div className="py-10 md:py-14 lg:py-16">
      <div className="mb-6 space-y-3 text-center sm:mb-8 lg:mb-10 lg:text-left">
        <span className="type-eyebrow-num-dark">
          <span className="text-white/40">[01]</span>
          <span>&nbsp;</span>
          Endorsed
        </span>
        <p className="text-xs leading-relaxed text-white/40 sm:text-sm">
          From builders at{' '}
          {ENDORSERS.map((name, index) => (
            <span key={name}>
              {index > 0 ? <span className="text-white/20"> · </span> : null}
              <span className="text-white/55">{name}</span>
            </span>
          ))}
        </p>
      </div>

      <motion.figure
        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-6 sm:px-7 sm:py-8 lg:px-9 lg:py-10"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <blockquote className="border-l-2 border-[var(--color-quote-gold)] pl-4 sm:pl-5">
          <p className="font-display text-[1.125rem] font-medium leading-[1.4] tracking-tight text-white sm:text-xl lg:text-[1.65rem] lg:leading-[1.35]">
            Placing agent power on your own computer empowers every user and I&apos;m so here for
            that.
          </p>
        </blockquote>

        <figcaption className="mt-6 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-6 sm:mt-7 sm:flex-row sm:justify-between sm:pt-7 lg:items-center">
          <div className="flex items-center gap-3 sm:gap-3.5">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-12 sm:w-12">
              <Image
                src="/images/garry-tan.jpg"
                alt="Garry Tan"
                fill
                className="object-cover object-top grayscale"
                sizes="48px"
              />
            </div>
            <div className="min-w-0 text-center sm:text-left">
              <p className="font-display text-[15px] font-medium tracking-tight text-white sm:text-base">
                Garry Tan
              </p>
              <p className="mt-0.5 text-xs text-white/45 sm:text-sm">CEO of Y Combinator</p>
            </div>
          </div>

          <Link
            href="https://x.com/garrytan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-white/45 transition-colors hover:text-white/75"
          >
            View on X
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
          </Link>
        </figcaption>
      </motion.figure>
    </div>
  );
}
