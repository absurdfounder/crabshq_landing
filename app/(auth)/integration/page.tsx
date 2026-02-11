import React from 'react';
import Header from '@/components/ui/header';
import { _loadFromJson, _loadSkills } from '@/app/utils/helper';
import IntegrationClient from './IntegrationClient';

export const metadata = {
  title: 'Integrations & OpenClaw Skills | Crabs HQ',
  description: 'Extend your AI workforce with platform integrations and 3,000+ OpenClaw skills. Connect GitHub, Gmail, Slack, Notion, and hundreds of other tools to your AI employees.',
  alternates: {
    canonical: "https://crabshq.com/integration",
  },
  openGraph: {
    title: 'Integrations & OpenClaw Skills | Crabs HQ',
    description: 'Extend your AI workforce with platform integrations and 3,000+ OpenClaw skills.',
    images: [
      {
        url: "https://dazzling-cat.netlify.app/WonderSitesintegrations_socialshare.png",
        width: 1200,
        height: 630,
        alt: "Crabs HQ Integrations & OpenClaw Skills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://dazzling-cat.netlify.app/WonderSitesintegrations_socialshare.png",
        alt: "Crabs HQ Integrations & OpenClaw Skills",
      },
    ],
  },
}

const Integration = async () => {
  const [integrations, skills] = await Promise.all([
    _loadFromJson(false),
    _loadSkills(),
  ]);

  return (
    <section>
      <Header />

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-12 pb-6 md:pt-4 md:pb-6">
          <div className="max-w-3xl mx-auto text-center pb-8 md:pb-12">
            <h1 className="font-funneldisplay text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Integrations & Skills
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect your AI workforce to your entire tech stack. Platform integrations for embedded tools, plus thousands of OpenClaw skills for everything from GitHub to Gmail.
            </p>
          </div>

          <IntegrationClient integrations={integrations} skills={skills} />
        </div>
      </div>
    </section>
  );
};

export default Integration;
