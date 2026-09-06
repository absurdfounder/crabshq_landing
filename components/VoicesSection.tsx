'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { Voice } from '@/lib/voices';

const ease = [0.22, 1, 0.36, 1] as const;

type VoicesSectionProps = {
  voices: Voice[];
  /** Position in the host page's numbered section rhythm. */
  eyebrowNumber?: string;
};

function Attribution({ voice, compact = false }: { voice: Voice; compact?: boolean }) {
  return (
    <figcaption
      className={
        compact
          ? 'mt-5 flex items-center gap-3 border-t border-white/15 pt-5'
          : 'mt-6 flex flex-col items-start gap-4 border-t border-white/15 pt-6 sm:mt-7 sm:flex-row sm:items-center sm:justify-between sm:pt-7'
      }
    >
      <div className="flex items-center gap-3 sm:gap-3.5">
        {voice.avatar ? (
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-12 sm:w-12">
            <Image
              src={voice.avatar}
              alt={voice.author}
              fill
              className="object-cover object-top grayscale"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/70 sm:h-12 sm:w-12">
            {voice.author.charAt(0)}
          </div>
        )}
        <div className="min-w-0 text-left">
          <p className="font-display text-[15px] font-medium tracking-tight text-white sm:text-base">
            {voice.author}
          </p>
          <p className="mt-0.5 text-xs text-white/45 sm:text-sm">{voice.title}</p>
        </div>
      </div>

      {!compact && (
        <Link
          href={voice.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group link-mono-dark"
        >
          <span>{voice.sourceLabel}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </figcaption>
  );
}

/**
 * Social proof quote band.
 *
 * Layout is a function of how many quotes exist, so adding one is a data-only
 * change in lib/voices.ts:
 *   1   → the featured single quote
 *   2   → two-up
 *   3+  → hairline-gap grid, which is count- and breakpoint-independent
 */
export default function VoicesSection({ voices }: VoicesSectionProps) {
  const featured = voices[0];
  if (!featured) return null;

  return (
    <div className="py-9 sm:py-16 lg:py-20">
      <p className="mb-5 flex items-baseline gap-2 sm:mb-7">
        <span className="font-mono text-[11px] tabular-nums text-white/35 sm:text-[12px]">01</span>
        <span className="kicker-dark !inline">Voices</span>
      </p>
      {voices.length === 1 ? (
        <motion.figure
          className="relative"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <blockquote className="border-l-2 border-[var(--color-quote-gold)] pl-4 sm:pl-5 lg:max-w-3xl">
            <p className="font-display text-[1.125rem] font-medium leading-[1.4] tracking-tight text-white sm:text-xl lg:text-[1.65rem] lg:leading-[1.35]">
              {featured.quote}
            </p>
          </blockquote>

          <Attribution voice={featured} />
        </motion.figure>
      ) : (
        <div
          className={[
            'grid gap-4',
            voices.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
          ].join(' ')}
        >
          {voices.map((voice, index) => (
            <motion.figure
              key={voice.id}
              className="flex flex-col justify-between border-t border-white/15 pt-5 sm:pt-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(index, 3) * 0.07, ease }}
              viewport={{ once: true, margin: '-20px' }}
            >
              <blockquote className="border-l-2 border-[var(--color-quote-gold)] pl-4">
                <p className="font-display text-base font-medium leading-[1.45] tracking-tight text-white sm:text-lg">
                  {voice.quote}
                </p>
              </blockquote>
              <Attribution voice={voice} compact />
            </motion.figure>
          ))}
        </div>
      )}
    </div>
  );
}
