import React from 'react';
import Header from '@/components/ui/header';
import { _loadSkills } from '@/app/utils/helper';
import IntegrationClient from './IntegrationClient';

export const metadata = {
  title: 'OpenClaw Skills | Crabs HQ',
  description: 'Extend your AI workforce with 3,000+ OpenClaw skills. Connect GitHub, Gmail, Slack, Notion, AWS, Docker, Shopify, and hundreds of other tools to your AI employees.',
  alternates: {
    canonical: "https://crabshq.com/integration",
  },
  openGraph: {
    title: 'OpenClaw Skills | Crabs HQ',
    description: 'Extend your AI workforce with 3,000+ OpenClaw skills.',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/CrabsHQintegrations_socialshare.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ OpenClaw Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/CrabsHQintegrations_socialshare.png",
        alt: "Crabs HQ OpenClaw Skills",
      },
    ],
  },
}

const Integration = async () => {
  const skills = await _loadSkills();

  return (
    <section>
      <Header />

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <div className="max-w-7xl px-4 sm:px-6 m-auto">
        <div className="pt-12 pb-6 md:pt-4 md:pb-6">
          <div className="max-w-3xl text-start pb-8 md:pb-12">
            <h1 className="font-funneldisplay text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              OpenClaw Skills
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Extend your AI workforce with thousands of community-built skills. From GitHub to Gmail, Slack to Shopify — connect your entire stack.
            </p>
          </div>

          <IntegrationClient skills={skills} />
        </div>
      </div>
    </section>
  );
};

export default Integration;
