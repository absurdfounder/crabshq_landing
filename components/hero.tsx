'use client';

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

import MarketingHeadline from '@/components/marketing/MarketingHeadline';
import HeroRotatingHeadline from './HeroRotatingHeadline';
import HeroArticleDemo from './HeroArticleDemo';
import HeroMarquee from './HeroMarquee';
import HeroDownloadButtons from './HeroDownloadButtons';
import PixelButton from './ui/PixelButton';
import { PixelMissionTag } from './PixelAtmosphere';

// Optimized SVG components using Next.js Image for better loading
const ProductHuntBadge = () => (
  <div className="rounded flex items-center justify-center">
    <a href="https://www.producthunt.com/posts/wonder-1999?utm_source=badge-top-post-badge&amp;utm_medium=badge&amp;utm_souce=badge-wonder-2"
      target="_blank"
      className="group justify-center grid mb-4 sm:mb-6 md:mb-8 w-full"
      title="View Trooper on Product Hunt">
      <Image
        src="https://dazzling-cat.netlify.app/producthunt.svg"
        width={192}
        height={37}
        alt="Product Hunt Badge"
        priority
        className="w-40 h-auto sm:w-44 md:w-48"
      />
    </a>
  </div>
);

const NotionLogo = () => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mr-1 sm:mr-2 flex items-center justify-center rounded">
    <Image
      src="https://dazzling-cat.netlify.app/notionicon.svg"
      width={48}
      height={48}
      alt="Notion Logo"
      priority
      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
    />
  </div>
);

// Notion icon component for features section
const NotionIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.887l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.07-1.448-.14-1.962-.794l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z" />
  </svg>
);


const Features = React.memo(() => {
  const features = [
    {
      name: 'Not a chatbot. Agents have roles, ranks, and objectives.',
    },
    {
      name: 'Not a prompt tool. A full AI unit with org charts, memory, and mission alignment.',
    },
    {
      name: "You're command. Agents can't act without your authorization.",
    },
  ];

  return (
    <ul className="mt-1 space-y-2.5 max-w-xl">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
          <Check className="w-4 h-4 text-trooper flex-shrink-0 mt-0.5" strokeWidth={2.25} />
          <span>{feature.name}</span>
        </li>
      ))}
    </ul>
  );
});


interface HeroProps {
  onCategorySelect?: (category: string) => void;
}

export default function Hero({ onCategorySelect }: HeroProps) {
  const handleCategoryClick = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }

    const templateSection = document.getElementById('template-section');
    if (templateSection) {
      templateSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-l border-r border-slate-200">

        <div className="pt-20 sm:pt-28 md:pt-32 pb-0">
          {/* Left (text) + Right (tab sector) on lg; stacked on smaller screens */}
          <div className="flex flex-col lg:flex-col lg:justify-between lg:gap-4 xl:gap-6">
            {/* Copy — open layout, no nested box */}
            <div className="pb-6 sm:pb-8 lg:px-2">
              <div className="hidden">
                <ProductHuntBadge />
              </div>

              <div className="mb-4">
                <PixelMissionTag index="01" label="Mission briefing" />
              </div>

              <div className="reveal reveal__usp max-w-3xl">
                <HeroRotatingHeadline />
                <MarketingHeadline
                  as="h2"
                  size="hero"
                  className="mt-2 max-md:mt-1.5 sm:mt-4"
                  lines={[
                    {
                      parts: [
                        { text: 'Whole Team.', tone: 'default' },
                        { text: 'One App.', tone: 'brand' },
                      ],
                    },
                  ]}
                />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[17px] sm:leading-relaxed md:text-lg">
                AI units that write code, make commits, browse the web, send emails, and execute real missions — not just answer questions. You hold command as the board of directors. Powered by{' '}
                <span className="font-semibold text-trooper-700">OpenClaw</span>.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-start sm:gap-4">
                <PixelButton
                  href="https://app.trooper.so?ref=herolanding"
                  external
                  size="lg"
                  tone="brand"
                  className="w-full max-sm:active:translate-x-0 max-sm:active:translate-y-0 sm:w-auto"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Get Started for free
                </PixelButton>

                <HeroDownloadButtons />
              </div>

              <div className="mt-6">
                <Features />
              </div>

              <div className="mt-8">
                <HeroMarquee />
              </div>
            </div>

            {/* Demo — soft olive tint behind mockup only */}
            <div className="relative hidden flex-1 overflow-hidden lg:-mx-6 lg:block">
              <HeroArticleDemo />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
