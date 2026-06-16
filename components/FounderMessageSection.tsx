'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PixelButton from '@/components/ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;
const getCalApiImport = () => import('@calcom/embed-react').then((mod) => mod.getCalApi);

export default function FounderMessageSection() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadCalApi = async () => {
        try {
          const getCalApi = await getCalApiImport();
          const cal = await getCalApi({ namespace: 'setup-call' });
          cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
        } catch {
          // Cal.com widget failed to load silently
        }
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(loadCalApi);
      } else {
        setTimeout(loadCalApi, 2000);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-10 md:pb-16 pt-2">
      <motion.div
        className="border border-slate-200 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, margin: '-20px' }}
      >
        <div className="flex flex-col md:flex-row md:items-stretch">
          <div className="relative mx-auto aspect-square w-full max-w-[14rem] shrink-0 overflow-hidden border-[6px] border-trooper bg-trooper-50 border-b border-slate-200 md:mx-0 md:aspect-auto md:h-auto md:w-[22rem] md:max-w-none md:self-stretch md:border-b-0 md:border-r md:border-r-slate-200">
            <Image
              src="/images/founder-portrait.png"
              alt="Vaibhav, founder of Trooper"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 14rem, 22rem"
              priority={false}
            />
          </div>

          <div className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
            <p className="font-funneldisplay text-xl sm:text-2xl md:text-[1.65rem] leading-[1.35] tracking-tight text-slate-900">
              AI agents that can browse, code, and ship are here. What&apos;s missing is the{' '}
              <span className="text-trooper font-semibold">command layer</span> — a place where you
              stay in charge while a real workforce executes.
            </p>

            <div className="mt-6">
              <p className="font-funneldisplay text-base sm:text-lg font-bold text-slate-900">
                Vaibhav
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Founder, Trooper
              </p>
              <a
                href="https://twitter.com/absurdfounder"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-trooper hover:text-trooper-700 transition-colors"
              >
                @absurdfounder
              </a>
            </div>

            <div className="mt-auto flex justify-end pt-8 md:pt-10">
              <PixelButton
                size="lg"
                variant="outline"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
                data-cal-namespace="setup-call"
                data-cal-link="set-meeting/setup-call"
                data-cal-config='{"layout":"month_view"}'
              >
                Talk to founder
              </PixelButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
