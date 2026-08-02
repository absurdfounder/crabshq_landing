'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PixelButton from '@/components/ui/PixelButton';
import PixelDitherGradient from '@/components/ui/PixelDitherGradient';
import FernCircleCheckIcon from '@/components/ui/FernCircleCheckIcon';

const APPLY_MAILTO =
  'mailto:support@trooper.so?subject=Reseller%20Program%20Application&body=Hi%20Trooper%20team%2C%0A%0AI%27d%20like%20to%20apply%20to%20the%20Trooper%20Reseller%20Program.%0A%0AName%3A%0ACompany%20%2F%20practice%3A%0AWebsite%3A%0ANiche%20or%20client%20types%3A%0A%0AThanks!';

const ease = [0.22, 1, 0.36, 1] as const;

const TRUST = [
  'You set the price',
  '$200–$500 / client / mo',
  'Industry playbooks included',
] as const;

/**
 * Centered reseller hero — brand-forward headline, no duplicate logo,
 * no side panel. Atmosphere from the same dither band as other Trooper heroes.
 */
export default function ResellersHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <PixelDitherGradient variant="hero" className="opacity-90" />
      <div className="relative z-10">
        <div className="rail page-hero-padding pb-16 text-center sm:pb-20 lg:pb-24">
          <motion.div
            className="mx-auto max-w-3xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="kicker mb-4">Partner with Trooper</p>
            <h1 className="text-balance font-display text-4xl leading-[1.05] tracking-tight text-neutral-800 sm:text-5xl md:text-6xl lg:text-[4rem]">
              Trooper Reseller Program
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-neutral-700 sm:text-lg md:text-xl">
              Build custom AI front offices for local businesses on Mission Control.
              Charge for the layer you own — and keep the recurring revenue.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PixelButton
                href={APPLY_MAILTO}
                external
                target="_self"
                size="lg"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Apply to the program
              </PixelButton>
              <PixelButton href="#industries" size="lg" variant="outline" tone="dark">
                Browse industry playbooks
              </PixelButton>
            </div>

            <ul
              className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2"
              aria-label="Program highlights"
            >
              {TRUST.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[13px] text-neutral-700">
                  <FernCircleCheckIcon className="h-3.5 w-3.5 shrink-0 text-fern-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
