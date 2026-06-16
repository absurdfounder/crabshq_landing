'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FounderMessageSection() {
  return (
    <div className="pb-10 md:pb-16 pt-2">
      <motion.div
        className="border border-slate-200 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <div className="relative aspect-[4/5] sm:aspect-[5/4] md:aspect-[16/9] min-h-[320px] max-h-[560px]">
          <Image
            src="/images/founder-portrait.png"
            alt="Vaibhav, founder of Trooper"
            fill
            className="object-cover object-center"
            style={{
              filter:
                'grayscale(100%) brightness(0.95) sepia(100%) hue-rotate(200deg) saturate(60%)',
            }}
            sizes="(max-width: 768px) 100vw, 1280px"
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
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-black/10 to-transparent"
          />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
            <p className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl text-white tracking-tight leading-none">
              Vaibhav
            </p>
            <p className="mt-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-white/90">
              FOUNDER TROOPER
            </p>
          </div>
        </div>

        <p className="px-6 py-5 md:px-8 md:py-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200 max-w-3xl">
          AI agents that can browse, code, and ship are here. What&apos;s missing is the{' '}
          <span className="text-trooper font-medium">command layer</span> — where you stay in
          charge while a real workforce executes.
        </p>
      </motion.div>
    </div>
  );
}
