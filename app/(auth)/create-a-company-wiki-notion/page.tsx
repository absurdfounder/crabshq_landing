
import React, { useState, useEffect } from "react";

import ModalVideo from "@/components/FullModalVideo";
import VideoThumb from "@/public/images/hero-image.png";

import Link from "next/link";
import Image from "next/image";

import TrustedBy from "../compare-against/TrustedBy";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import CompanyWikiType from "@/components/CompanyWikiType";

import Testimonials from "@/components/testimonials";
import Header from "@/components/ui/header";


import Aos from "aos";
import 'aos/dist/aos.css'


export const metadata = {
    title: "Get a company wiki with Notion (no-code and free)",
    description:
        "Build a company wiki in Notion, with our Notion company wiki maker. Go live in under a minute.  Build your free CrabsHQ  company wiki website in a minute!",
    alternates: {
        canonical: "https://crabshq.com/create-a-company-wiki-notion",
    },
    openGraph: {
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontocompanywiki_socialshare.png",
                width: 1200,
                height: 630,
                alt: "Get a company wiki with Notion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontocompanywiki_socialshare.png",
                alt: "Get a company wiki with Notion",
            },
        ],
    },
};

export default function PageDetail() {
    return (

        <div>
            <section 
                    style={{
          backgroundImage: "linear-gradient(rgb(255 255 255 / 59%), rgba(255, 255, 255, 0)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
            >

                <Header />

<br/>
<br/>
<br/>
<br/>
<br/>



                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="pt-12 pb-6 md:pt-4 md:pb-6">
                        {/* Page header */}

                        <div className="max-w-4xl py-6 mx-auto lg:py-6">
                            <div className="text-center">
                                <div className="max-w-screen-xl px-4 mx-auto sm:px-6 mb-4">
                                    <div className="text-center">
                                        <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tighter tracking-tighter mb-4 aos-init aos-animate">
                                          
                                            <span className="text-3xl sm:text-4xl md:text-5xl relative">
                                                <span className="inline-flex items-center relative sm:bottom-0 bottom-[-1px] justify-center mx-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="12 0.19 487.619 510.941" className="w-6 h-6 sm:w-9 sm:h-9">
                                                        <path
                                                            d="M96.085 91.118c15.81 12.845 21.741 11.865 51.43 9.884l279.888-16.806c5.936 0 1-5.922-.98-6.906L379.94 43.686c-8.907-6.915-20.773-14.834-43.516-12.853L65.408 50.6c-9.884.98-11.858 5.922-7.922 9.883zm16.804 65.228v294.491c0 15.827 7.909 21.748 25.71 20.769l307.597-17.799c17.81-.979 19.794-11.865 19.794-24.722V136.57c0-12.836-4.938-19.758-15.84-18.77l-321.442 18.77c-11.863.997-15.82 6.931-15.82 19.776zm303.659 15.797c1.972 8.903 0 17.798-8.92 18.799l-14.82 2.953v217.412c-12.868 6.916-24.734 10.87-34.622 10.87-15.831 0-19.796-4.945-31.654-19.76l-96.944-152.19v147.248l30.677 6.922s0 17.78-24.75 17.78l-68.23 3.958c-1.982-3.958 0-13.832 6.921-15.81l17.805-4.935V210.7l-24.721-1.981c-1.983-8.903 2.955-21.74 16.812-22.736l73.195-4.934L358.186 335.22V198.836l-25.723-2.952c-1.974-10.884 5.927-18.787 15.819-19.767zM42.653 23.919l281.9-20.76c34.618-2.969 43.525-.98 65.283 14.825l89.986 63.247c14.848 10.876 19.797 13.837 19.797 25.693v346.883c0 21.74-7.92 34.597-35.608 36.564L136.64 510.14c-20.785.991-30.677-1.971-41.562-15.815l-66.267-85.978C16.938 392.52 12 380.68 12 366.828V58.495c0-17.778 7.922-32.608 30.653-34.576z"
                                                            fillRule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </span>
                                                Github into an
                                            </span>
                                            <br className="block" />
                                             <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">company wikipedia</span>  up-to-date.
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Your support inbox is flooded with customers who want to self-serve, not spend hours talking to an agent.  But your help center is constantly out of date and your customers can’t find what they’re looking for. With Wonder, never again.
                                        </p>
                                        <div className="flex flex-col-reverse justify-center w-full mt-10 sm:flex-row">
                                            <div className="mt-3 sm:mt-0">
                                                <Link href="/signup" className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md shadow bg-red-700 sm:w-auto">
                                                    <strong className="mr-1">Get a company wiki with Notion →</strong>
                                                </Link>
                                                <p className="mt-3 text-sm text-slate-700"><strong>Free</strong> 3 day trial. Free Design Service.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <ModalVideo
                        />

                    </div>
                </div>
            </section>


            <CompanyWikiType />


            <FeaturesBlocks />






            <Testimonials />



        </div>

    );
}
