'use client';

import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

import HeroArticleDemo from '@/components/HeroArticleDemo';
import HeroDownloadButtons from '@/components/HeroDownloadButtons';
import FernCircleCheckIcon from '@/components/ui/FernCircleCheckIcon';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;
const GITHUB_URL = 'https://github.com/Trooper-AI/trooper-core';
const TRUST = ['Open source', 'Your keys, your models', 'Laptop or VM'] as const;

export default function SelfHostHero() {
  return (
    <section className="relative bg-canvas site-header-clear">
      <div className="rail py-12 sm:py-20">
        <motion.div
          className="mx-auto w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          viewport={{ once: true, margin: '-40px' }}
        >
          <h1 className="h2-section mx-auto">
            Run Trooper on a machine you own
          </h1>
          <p className="lede mx-auto">
            Open source. Your keys, your models, your laptop or VM. Give troopers real work
            without sending the computer to someone else.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7">
            <HeroDownloadButtons size="md" variant="solid" tone="dark" />
            <PixelButton
              href={GITHUB_URL}
              external
              size="md"
              variant="outline"
              tone="dark"
              icon={<Github className="h-3.5 w-3.5" />}
            >
              View on GitHub
            </PixelButton>
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5" aria-label="Self-host highlights">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-1.5 text-[13px] text-neutral-700">
                <FernCircleCheckIcon className="h-3.5 w-3.5 shrink-0 text-fern-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-10 hidden lg:mt-14 lg:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease }}
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="hero-surface rail-bleed relative overflow-visible border-y border-black/5 px-2 py-6 sm:px-3 sm:py-8 lg:px-3 lg:py-9">
            <HeroArticleDemo rotate flush maxHeight={560} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
