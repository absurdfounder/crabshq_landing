'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function YcQuoteSection() {
  return (
    <div className="pb-10 pt-2 md:pb-14">
      <motion.div
        className="grid grid-cols-1 overflow-hidden border border-slate-200 bg-white lg:grid-cols-[1fr_auto]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, margin: '-20px' }}
      >
        <div className="flex items-center border-b border-slate-200 px-6 py-8 sm:px-8 sm:py-10 lg:border-b-0 lg:border-r lg:py-12">
          <blockquote className="max-w-3xl">
            <p className="font-funneldisplay text-xl leading-[1.35] tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem] md:leading-[1.3]">
              &ldquo;Placing agent power on your own computer empowers every user and I&apos;m so here for
              that.&rdquo;{' '}
              <Link
                href="https://trooper.so"
                className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-trooper transition-colors hover:text-trooper-700 sm:text-base"
              >
                trooper.so
              </Link>
            </p>
          </blockquote>
        </div>

        <div className="flex items-center justify-center bg-[#FAFAF8] px-6 py-8 sm:px-8 lg:min-w-[280px] lg:px-10">
          <div className="flex w-full max-w-sm items-center gap-4 border border-slate-200 bg-white p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-slate-200 bg-slate-100">
              <Image
                src="/images/garry-tan.jpg"
                alt="Garry Tan"
                fill
                className="object-cover object-top grayscale"
                sizes="64px"
              />
            </div>
            <div className="min-w-0">
              <p className="font-funneldisplay text-base tracking-tight text-slate-900">Garry Tan</p>
              <p className="mt-0.5 text-sm text-slate-600">CEO of Y Combinator</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                600K+ followers
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
