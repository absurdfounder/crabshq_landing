import React from 'react';
import Header from '@/components/ui/header';
import SectionShell from '@/components/ui/SectionShell';
import { _loadSkills } from '@/app/utils/helper';
import IntegrationClient from './IntegrationClient';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelButton from '@/components/ui/PixelButton';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'OpenClaw Skills | Trooper',
  description:
    'Extend your AI workforce with 3,000+ OpenClaw skills. Connect GitHub, Gmail, Slack, Notion, AWS, Docker, Shopify, and hundreds of other tools to your AI employees.',
  alternates: {
    canonical: 'https://trooper.so/integration',
  },
  openGraph: {
    title: 'OpenClaw Skills | Trooper',
    description: 'Extend your AI workforce with 3,000+ OpenClaw skills.',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/Trooperintegrations_socialshare.png',
        width: 1200,
        height: 630,
        alt: 'Trooper OpenClaw Skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://dazzling-cat.netlify.app/Trooperintegrations_socialshare.png',
        alt: 'Trooper OpenClaw Skills',
      },
    ],
  },
};

const Integration = async () => {
  const skills = await _loadSkills();

  return (
    <div className="bg-white">
      <Header />
      <section className="max-w-7xl mx-auto border-l border-r border-slate-200">
        <div className="pt-24 sm:pt-28 md:pt-32 px-4 sm:px-6 lg:px-8 pb-10">
          <PixelMissionTag index="01" label="Skills catalog" className="mb-4" />
          <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-[2.5rem] tracking-tight text-slate-900 max-w-3xl">
            OpenClaw Skills
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Extend your AI workforce with thousands of community-built skills. From GitHub to Gmail, Slack to Shopify — connect your entire stack.
          </p>
          <div className="mt-6">
            <PixelButton
              href="https://app.trooper.so"
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Deploy with skills
            </PixelButton>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Catalog" eyebrowNumber="02" bgClass="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <IntegrationClient skills={skills} />
        </div>
      </SectionShell>
    </div>
  );
};

export default Integration;
