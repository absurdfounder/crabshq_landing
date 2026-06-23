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
    <div className="pb-8 md:pb-16 pt-2">
      <motion.div
        className="border border-slate-200 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        viewport={{ once: true, margin: '-20px' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="relative h-52 w-full shrink-0 overflow-hidden border-b-4 border-[#007040] bg-white sm:h-60 lg:h-auto lg:w-48 lg:border-b-0 lg:border-r lg:border-r-slate-200 xl:w-52">
            <Image
              src="/images/founder-portrait.png"
              alt="Vaibhav, founder of Trooper"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 208px"
              priority={false}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6 md:p-7 lg:p-9">
            <p className="font-funneldisplay text-lg leading-[1.45] tracking-tight text-slate-900 sm:text-xl md:text-[1.65rem] md:leading-[1.35]">
              Everyone deserves a{' '}
              <span className="font-semibold text-trooper">fully powered agentic system</span> that
              does real work for them. That power should not sit only in the hands of big
              corporations — so we built Trooper for you, and made it{' '}
              <span className="font-semibold text-trooper">free for anyone to use</span>.
            </p>

            <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:flex-row sm:items-end sm:justify-between md:mt-6">
              <div>
                <p className="font-funneldisplay text-sm font-bold text-slate-900 sm:text-base md:text-lg">
                  Vaibhav
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 sm:text-[11px] sm:tracking-[0.18em]">
                  Founder, Trooper
                </p>
                <a
                  href="https://twitter.com/absurdfounder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block font-mono text-[10px] uppercase tracking-[0.12em] text-trooper transition-colors hover:text-trooper-700 sm:text-[11px] sm:tracking-[0.14em]"
                >
                  @absurdfounder
                </a>
              </div>

              <PixelButton
                size="lg"
                variant="outline"
                tone="dark"
                className="w-full shrink-0 sm:w-auto"
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
