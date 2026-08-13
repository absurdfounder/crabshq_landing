import type { Metadata } from 'next';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import HowItWorksSteps from '@/components/HowItWorksSteps';
import MarketingSubpageTail from '@/components/marketing/MarketingSubpageTail';
import { buildPageMetadata } from '@/lib/og/buildMetadata';
import CopyCli from './CopyCli';
import SelfHostHero from './SelfHostHero';

export const metadata: Metadata = buildPageMetadata({
  title: 'Self-host Trooper | Open source on your machine',
  description:
    'Run Trooper on a laptop or virtual machine you own. Open source, your API keys, your models. Nothing has to live on our cloud.',
  canonical: 'https://trooper.so/self-host',
  ogKind: 'page',
  ogSlug: 'self-host',
});

const STEPS = [
  {
    number: '01',
    title: 'Install it.',
    example: 'Download the Mac or Windows app, or clone the repo and run the CLI. Same product, on hardware you control.',
  },
  {
    number: '02',
    title: 'Add your keys.',
    example: 'Point Trooper at Claude, GPT, Grok, Gemini, or a local model. Usage is billed by the provider, not by us.',
  },
  {
    number: '03',
    title: 'Give it work.',
    example: 'Assign a loop. Troopers use your tools, come back when they need a sign-off, and keep data on that machine.',
  },
] as const;

export default function SelfHostPage() {
  return (
    <div className="bg-canvas">
      <Header />
      <SelfHostHero />

      <SectionShell rhythm>
        <HowItWorksSteps
          align="center"
          title="Three steps. Then it is yours."
          lede="No cluster to provision. Install, connect a key, assign a loop."
          steps={STEPS}
        />
      </SectionShell>

      <section className="relative bg-canvas">
        <div className="rail border-t border-[var(--color-line)] py-12 sm:py-20">
          <div className="mx-auto w-full max-w-2xl text-center">
            <h2 className="h2-section mx-auto">Or install from the terminal</h2>
            <p className="lede mx-auto">One command. Then open the app and connect keys.</p>
          </div>
          <div className="hero-surface mt-9 rounded-2xl border border-black/5 px-4 py-8 sm:mt-11 sm:px-8 sm:py-10">
            <div className="mx-auto max-w-2xl">
              <CopyCli />
              <p className="mt-4 text-center text-sm text-neutral-600">
                Source:{' '}
                <a
                  href="https://github.com/Trooper-AI/trooper-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-neutral-800 underline-offset-2 hover:underline"
                >
                  github.com/Trooper-AI/trooper-core
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarketingSubpageTail />
    </div>
  );
}
