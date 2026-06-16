'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MarketingHeadline from '@/components/marketing/MarketingHeadline';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FounderMessageSection() {
  return (
    <div className="pb-10 md:pb-16 pt-2">
      <motion.div
        className="mb-8 md:mb-12 max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <MarketingHeadline
          size="section"
          lines={[
            {
              parts: [
                { text: 'Why we built ', tone: 'default' },
                { text: 'Trooper', tone: 'brand' },
              ],
            },
          ]}
          subline="A note from the founder on command, control, and the AI workforce."
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 border border-slate-200 bg-white overflow-hidden">
        <motion.div
          className="relative overflow-hidden bg-slate-100 lg:border-r border-slate-200"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          viewport={{ once: true, margin: '-20px' }}
        >
          <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-auto lg:min-h-[420px] lg:h-full">
            <Image
              src="/images/founder-portrait.png"
              alt="Vaibhav, founder of Trooper"
              fill
              className="object-cover object-center"
              style={{
                filter:
                  'grayscale(100%) brightness(0.95) sepia(100%) hue-rotate(200deg) saturate(60%)',
              }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div
              className="absolute inset-0 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, rgba(0,0,0,0.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 75%),
                  linear-gradient(45deg, rgba(0,0,0,0.3) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.3) 75%)
                `,
                backgroundSize: '4px 4px',
                backgroundPosition: '0 0, 2px 2px',
                imageRendering: 'pixelated',
              }}
            />
          </div>
        </motion.div>

        <motion.div
          className="p-6 md:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 border-slate-200"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
          viewport={{ once: true, margin: '-20px' }}
        >
          <blockquote className="font-funneldisplay text-xl sm:text-2xl md:text-[1.65rem] leading-[1.35] tracking-tight text-slate-900">
            &ldquo;AI agents that can browse, code, and ship are here. What&apos;s missing is the{' '}
            <span className="text-trooper">command layer</span> — a place where you stay in charge
            while a real workforce executes.&rdquo;
          </blockquote>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
            <p>
              I started with OpenClaw and ClawdBot because I wanted agents that could actually do
              work — not another chat window. Trooper is what happens when you scale that into a
              team: multiple AI employees, persistent memory, GitHub commits, browser sessions, and
              every action traced back to you.
            </p>
            <p>
              You operate as the board. Approve hires, review strategy, pause or override anything.
              Autonomy is a privilege you grant — not a default the runtime takes for granted.
            </p>
          </div>

          <footer className="mt-8 pt-6 border-t border-dashed border-slate-200">
            <p className="font-funneldisplay text-base sm:text-lg text-slate-900">Vaibhav</p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Founder, Trooper
            </p>
            <a
              href="https://twitter.com/absurdfounder"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-trooper-700 hover:text-trooper transition-colors"
            >
              @absurdfounder
            </a>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}
