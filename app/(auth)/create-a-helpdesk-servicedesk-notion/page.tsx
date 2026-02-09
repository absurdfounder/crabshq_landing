
import React, { useState, useEffect } from "react";

import ModalVideo from "@/components/FullModalVideo";
import VideoThumb from "@/public/images/hero-image.png";

import Link from "next/link";
import Image from "next/image";

import TrustedBy from "../compare-against/TrustedBy";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import HelpdeskType from "@/components/HelpdeskType";

import Testimonials from "@/components/testimonials";

import Header from "@/components/ui/header";

import OldWays from "@/components/OldWays";


import Aos from "aos";
import 'aos/dist/aos.css'
import HowToHelpdesk from "@/components/HowToHelpdesk";


export const metadata = {
    title: "Get a help desk with Notion (no-code and free)",
    description:
        "Build a help desk in Notion, with our Notion help desk maker. Go live in under a minute.  Build your free CrabsHQ  help desk website in a minute!",
    alternates: {
        canonical: "https://crabshq.com/create-a-helpdesk-servicedesk-notion",
    },
    openGraph: {
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
                width: 1200,
                height: 630,
                alt: "Get a help desk with Notion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontohelpdesk_socialshare.png",
                alt: "Get a help desk with Notion",
            },
        ],
    },
};

export default function PageDetail() {
    return (

        <div >
            <section   
                    style={{
          backgroundImage: "linear-gradient(rgb(255 255 255), rgb(255 255 255 / 70%), rgb(255 255 255 / 48%)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
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


                                    <div className="text-center px-4 sm:px-6 lg:px-8">
                                        <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tighter tracking-tighter mb-4 aos-init aos-animate">
                                          
                                            <span className="text-3xl sm:text-4xl md:text-5xl relative">

                                                AI Agent that keeps your 
                                            </span>
                                            <br className="block" />
                                             <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">helpdesk</span>  up-to-date.
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Your support inbox is flooded with customers who want to self-serve, not spend hours talking to an agent.  But your help center is constantly out of date and your customers can’t find what they’re looking for. With Wonder, never again.
                                        </p>
                                        <div className="flex flex-col-reverse justify-center w-full mt-10 sm:flex-row">
                                            <div className="mt-3 sm:mt-0">
                                                <Link href="/signup" className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md shadow bg-red-700 sm:w-auto">
                                                    <strong className="mr-1">Get a help desk with Notion →</strong>
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


            <HelpdeskType />


            <HowToHelpdesk />

            <FeaturesBlocks />




            <Testimonials />



        </div>

    );
}
