"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight, HelpCircle, BookOpen, ShoppingBag, FileText, LucideIcon } from "lucide-react";

import helpdeskImage from "@/public/images/helpdesk.gif";
import marketplaceImage from "@/public/images/marketplace.gif";

interface TabButtonProps {
  tabIndex: number;
  icon: LucideIcon;
  text: string;
  currentTab: number;
  setTab: (index: number) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tabIndex, icon: Icon, text, currentTab, setTab }) => (
  <button
    className={`group flex items-center justify-between text-base sm:text-lg p-4 sm:p-5 rounded-md border transition duration-300 ease-in-out hover:shadow-lg text-slate-900 ${
      currentTab !== tabIndex ? "bg-slate-100" : "bg-red-100 text-red-600"
    }`}
    onClick={() => setTab(tabIndex)}
  >
    <div className="flex items-center">
      <Icon className="w-6 h-6 mr-2" />
      <div className="h4 font-bold leading-snug tracking-tight mb-1">
        Notion to <span className="bg-clip-text">{text}</span>
      </div>
    </div>
    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </button>
);

interface TabContentProps {
  show: boolean;
  image: string | StaticImageData;
  alt1: string;
  alt2: string;
}

const TabContent: React.FC<TabContentProps> = ({ show, image, alt1, alt2 }) => (
  <Transition
    show={show}
    appear={true}
    className="w-full"
    enter="transition ease-in-out duration-700 transform order-first"
    enterFrom="opacity-0 translate-y-16"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in-out duration-300 transform absolute"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 -translate-y-16"
    unmount={false}
  >
    <div className="relative inline-flex flex-col">
      <Image
        className="md:max-w-none mx-auto rounded-2xl border border-2 border-slate-600 shadow-lg"
        src={image}
        unoptimized
        width={500}
        height={462}
        alt="Features bg"
      />
      <div className="flex flex-wrap gap-2 justify-center items-center mt-4 text-sm sm:text-base md:text-xl text-slate-900 px-2">
        <span>A simpler alternative to</span>
        <Image
          alt="Alternative 1"
          width={120}
          height={120}
          src={alt1}
          className="rounded-md w-auto h-6 sm:h-8"
          unoptimized
        />
        <span>and</span>
        <Image
          alt="Alternative 2"
          width={120}
          height={120}
          src={alt2}
          className="rounded-md w-auto h-6 sm:h-8"
          unoptimized
        />
      </div>
    </div>
  </Transition>
);

export default function Features() {
  const [tab, setTab] = useState(1);
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section
      id="featured-section"
      className="relative mt-4 mb-4 pb-4"
    >
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-6 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-800">
              Have a unique website concept? <span className="block font-normal text-red-600">CrabsHQ can build it.</span>
            </h1>
            <p className="text-xl text-slate-600">
              CrabsHQ is designed for all use cases — from content curation to
              content creation. Build company blogs, helpdesks, company wikis,
              documentation sites, and marketplaces.
            </p>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-6">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="grid gap-4 mb-8 md:mb-0">
                <TabButton tabIndex={1} icon={HelpCircle} text="Helpdesk" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={2} icon={BookOpen} text="Blog" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={3} icon={ShoppingBag} text="Marketplace" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={4} icon={FileText} text="Company Wiki" currentTab={tab} setTab={setTab} />
              </div>
            </div>

            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 grid gap-4 mb-8 md:mb-0 md:order-1 m-auto w-full">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  <TabContent
                    show={tab === 1}
                    image={helpdeskImage}
                    alt1="./images/simpler-helpdesk2.png"
                    alt2="./images/simpler-helpdesk.png"
                  />
                  <TabContent
                    show={tab === 2}
                    image="/images/blog.gif"
                    alt1="./images/simpler-blog.png"
                    alt2="./images/simpler-blog2.png"
                  />
                  <TabContent
                    show={tab === 3}
                    image={marketplaceImage}
                    alt1="./images/simpler-marketplaceue2.png"
                    alt2="./images/simpler-marketplaceue.png"
                  />
                  <TabContent
                    show={tab === 4}
                    image="/path/to/your/fourth-tab-image.gif"
                    alt1="./images/webflow-icon.png"
                    alt2="/images/framer-icon.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}