'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Sparkles, FileImage, Smile } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image'; // Use Next.js Image for optimization

import HeroArticleDemo from './HeroArticleDemo';

// Defer non-critical Cal.com widget import
const getCalApiImport = () => import("@calcom/embed-react").then(mod => mod.getCalApi);

// Optimized SVG components using Next.js Image for better loading
const ProductHuntBadge = () => (
  <div className="rounded flex items-center justify-center">
    <a href="https://www.producthunt.com/posts/wonder-1999?utm_source=badge-top-post-badge&amp;utm_medium=badge&amp;utm_souce=badge-wonder-2"
      target="_blank"
      className="group justify-center grid mb-4 sm:mb-6 md:mb-8 w-full"
      title="View Crabs HQ on Product Hunt">
      <Image
        src="https://dazzling-cat.netlify.app/producthunt.svg" // Using the provided URL
        width={192}
        height={37}
        alt="Product Hunt Badge"
        priority // Mark as priority for immediate loading
        className="w-40 h-auto sm:w-44 md:w-48"
      />
    </a>
  </div>
);

const NotionLogo = () => (
  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mr-1 sm:mr-2 flex items-center justify-center rounded">
    <Image
      src="https://dazzling-cat.netlify.app/notionicon.svg" // Using the provided URL
      width={48}
      height={48}
      alt="Notion Logo"
      priority // Mark as priority for immediate loading
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
      name: "Plans and executes tasks end-to-end", 
      icon: <Sparkles className="w-5 h-5 text-lime-500" />
    },
    { 
      name: "Uses tools, browsers, and files autonomously", 
      icon: <FileImage className="w-5 h-5 text-sky-500" />
    },
    { 
      name: "Owns outcomes without constant human input", 
      icon: <Smile className="w-5 h-5 text-amber-500" />
    }
  ];

  return (
    <ul className="flex flex-row gap-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          {feature.icon}
          <span className="underline cursor-pointer decoration-dashed underline-offset-4 decoration-neutral-200">
            {feature.name}
          </span>
        </li>
      ))}
    </ul>
  );
});


interface HeroProps {
  onCategorySelect?: (category: string) => void;
}

export default function Hero({ onCategorySelect }: HeroProps) {
  // Simplified state - removed index since we no longer need rotating words
  const [isHovered, setIsHovered] = useState(false);

  // Removed words array and rotation effect since they're no longer needed

  // Defer Cal.com widget loading to well after initial render
  useEffect(() => {
    // Only load Cal.com after a delay to prioritize core content rendering
    const timer = setTimeout(() => {
      const loadCalApi = async () => {
        try {
          const getCalApi = await getCalApiImport();
          const cal = await getCalApi({ "namespace": "setup-call" });
          cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        } catch (error) {
          console.error("Failed to load Cal.com widget:", error);
        }
      };

      // Use requestIdleCallback for low-priority loading
      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        window.requestIdleCallback(loadCalApi);
      } else {
        setTimeout(loadCalApi, 2000); // Longer fallback delay
      }
    }, 1500); // Delay initial load attempt

    return () => clearTimeout(timer);
  }, []);

  // Optimized category click handler
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">

        <br />
        <br />
        <br />
        <br />
        <br />


        <div className="pt-2 sm:pt-1 md:pt-2 pb-12 sm:pb-16 md:pb-20">
          {/* Left (text) + Right (tab sector) on lg; stacked on smaller screens */}
          <div className="flex flex-col lg:flex-col lg:justify-between lg:gap-4 xl:gap-6">
            {/* Left: text content */}
            <div className="flex-1 lg:max-w-full text-left p-4">
              <div className="px-2 sm:px-4 md:px-6 lg:px-0">
                <div className="hidden flex justify-start">
                  <ProductHuntBadge />
                </div>

                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl max-w-3xl lg:max-w-none mb-2 sm:mb-2 md:mb-2 leading-tight font-funneldisplay tracking-loose text-slate-700 font-normal">
                  <div className="block opacity-50 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    <span className="reveal reveal__hello-1">Hello,</span>{" "}
                    <span className="reveal reveal__hello-2">We are</span>{" "}
                    <span className="reveal reveal__hello-3">Crabs.</span>
                  </div>
                  <span className="block reveal reveal__usp mt-1 sm:mt-2 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    AI workforce set on a mission, <span className='opacity-50'>powered by <span style={{ color: '#bc0010' }}>OpenClaw</span></span>.
                  </span>
                </h1>




              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4 mb-2 sm:mb-2 items-start justify-start px-4 sm:px-0 lg:px-0">
                <Link
                  href="https://app.crabshq.com?ref=herolanding"
                  className="flex items-center justify-start py-3 sm:py-3 px-6 sm:px-6 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors w-full sm:w-auto relative text-sm sm:text-base min-h-[48px] sm:min-h-auto"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="relative overflow-hidden mr-2 h-5 sm:h-5">
                    <div
                      className="transition-transform duration-150 whitespace-nowrap"
                      style={{
                        transform: isHovered ? 'translateY(-100%)' : 'translateY(0)'
                      }}
                    >
                      Get Started for free
                    </div>
                    <div
                      className="absolute top-0 left-0 w-full text-center transition-transform duration-150 whitespace-nowrap"
                      style={{
                        transform: isHovered ? 'translateY(0)' : 'translateY(100%)'
                      }}
                    >
                      in just 15 mins.
                    </div>
                  </div>
                </Link>

                <button
                  data-cal-namespace="setup-call"
                  data-cal-link="set-meeting/setup-call"
                  data-cal-config='{"layout":"month_view"}'
                  className="text-black border border-gray-600 bg-white hover:bg-slate-800 hover:text-white flex items-center justify-start px-4 py-2.5 sm:py-2.5 rounded-md transition duration-150 ease-in-out group w-full sm:w-auto text-sm sm:text-base min-h-[48px] sm:min-h-auto sm:ml-0"
                >
                  <div className="flex items-center justify-start w-full">
                    <span>Book a Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>

              {/* Features - Works with (align left on desktop) */}
              <div className="flex justify-start mt-6">
                <Features />
              </div>
            </div>

            {/* Right: interactive article demo */}
            <div className="flex-1  w-full mt-10 lg:mt-0 lg:pl-4">
              <HeroArticleDemo />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}