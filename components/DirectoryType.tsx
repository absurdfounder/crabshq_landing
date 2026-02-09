"use client";

import React, { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";

import helpdeskImage from "@/public/images/helpdesk.gif";
import blogImage from "@/public/images/blog.gif";
import marketplaceImage from "@/public/images/marketplace.gif";
import helpdeskrival1 from "@/public/images/simpler-helpdesk.png";
import helpdeskrival2 from "@/public/images/simpler-helpdesk2.png";
import blogrival1 from "@/public/images/simpler-blog.png";
import blogrival2 from "@/public/images/simpler-blog2.png";
import marketplacerival1 from "@/public/images/simpler-catalogue.png";
import marketplacerival2 from "@/public/images/simpler-catalogue2.png";

interface TabButtonProps {
  tabIndex: number;
  text: string;
  currentTab: number;
  setTab: (index: number) => void;
}

const TabButton: React.FC<TabButtonProps> = ({ tabIndex, text, currentTab, setTab }) => (
  <button
    className={`group flex items-center justify-between text-base sm:text-lg p-4 sm:p-5 rounded-md border transition duration-300 ease-in-out hover:shadow-lg text-slate-900 ${
      currentTab !== tabIndex ? "bg-slate-100" : "bg-red-100 text-red-600"
    }`}
    onClick={() => setTab(tabIndex)}
  >
    <div className="flex items-center">
      <div className="h4 font-bold leading-snug tracking-tight mb-1">
        <span className="bg-clip-text">{text}</span> Directory
      </div>
    </div>
    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </button>
);

interface TabContentProps {
  show: boolean;
  image: StaticImageData;
  alt1: StaticImageData;
  alt2: StaticImageData;
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

export default function Directory_Type() {
  const [tab, setTab] = useState<number>(1);
  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current && tabs.current.parentElement)
      tabs.current.parentElement.style.height = `${tabs.current.clientHeight}px`;
  };

  useEffect(() => {
    heightFix();
  }, []);

  return (
    <section id="directory-section" className="relative mt-4 mb-4 pb-4">
      

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-6 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl mb-4 text-slate-800">
              Unique your directory concept? <span className=" block font-normal text-red-600">CrabsHQ can support it.</span>
            </h1>
            <p className="text-xl text-slate-600">
              CrabsHQ  is designed for all types from content curation to
              content creation. Build company blogs, helpdesks, company wiki,
              documentations, and marketplaces.
            </p>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-6">
            <div
              className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6"
              data-aos="fade-right"
            >
              <div className="grid gap-4 mb-8 md:mb-0">
                <TabButton tabIndex={1} text="Business" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={2} text="Local" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={3} text="Professional" currentTab={tab} setTab={setTab} />
                <TabButton tabIndex={4} text="Niche" currentTab={tab} setTab={setTab} />
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
                    alt1={helpdeskrival1}
                    alt2={helpdeskrival2}
                  />
                  <TabContent
                    show={tab === 2}
                    image={blogImage}
                    alt1={blogrival1}
                    alt2={blogrival2}
                  />
                  <TabContent
                    show={tab === 3}
                    image={marketplaceImage}
                    alt1={marketplacerival1}
                    alt2={marketplacerival2}
                  />
                  <TabContent
                    show={tab === 4}
                    image={helpdeskImage} // Replace with appropriate image
                    alt1={helpdeskrival1} // Replace with appropriate image
                    alt2={helpdeskrival2} // Replace with appropriate image
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