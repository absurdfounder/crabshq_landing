
import React, { useState, useEffect } from "react";

import ModalVideo from "@/components/ModalVideo";
import VideoThumb from "@/public/images/hero-image.png";

import Link from "next/link";
import Image from "next/image";

import TrustedBy from "../compare-against/TrustedBy";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import BlogType from "@/components/BlogType";

import Testimonials from "@/components/testimonials";
import Header from "@/components/ui/header";
import TokenPage from "@/components/TokenPage";
import CrabsHQDashboard from "@/components/watchburn";


import Aos from "aos";
import 'aos/dist/aos.css'


export const metadata = {
    title: "Get a blog with Notion (no-code and free)",
    description:
        "Build a blog in Notion, with our Notion blog maker. Go live in under a minute.  Build your free CrabsHQ  blog website in a minute!",
    alternates: {
        canonical: "https://crabshq.com/create-a-blog-notion",
    },
    openGraph: {
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontoblog_socialshare.png",
                width: 1200,
                height: 630,
                alt: "Get a blog with Notion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/notiontoblog_socialshare.png",
                alt: "Get a blog with Notion",
            },
        ],
    },
};

export default function PageDetail() {
    return (



        <div>

            <div
                style={{
                    backgroundImage: "linear-gradient(rgb(255 255 255 / 0%), rgba(255, 255, 255, 0)), url(https://dazzling-cat.netlify.app/backgroundgreysketch.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed"
                }}
            >


                <section >

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
                                            <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tighter tracking-tighter mb-4 aos-init aos-animate flex justify-center items-center gap-2">
                                                watch the  <img src="https://media1.giphy.com/media/26BRt5hkD6hLzTl3q/200w.gif?cid=6c09b952dvny52hb3olq7nti3a99q5xto0e8m088nulfadxs&ep=v1_stickers_search&rid=200w.gif&ct=s" className='w-16' />  <span className="text-3xl sm:text-4xl md:text-7xl gradient-text-accent"> burn</span>
                                            </h1>
                                            <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                                CrabsHQ token is <b>burned with every action</b> signup, website creation, or every when they get traffic on their website, scarecity rises as CrabsHQ grows.
                                            </p>
                                            <div className="flex flex-col-reverse justify-center w-full mt-10 sm:flex-row">
                                                <div className="mt-3 sm:mt-0">
                                                    <Link href="/signup" className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md shadow bg-red-700 sm:w-auto">
                                                        <strong className="mr-1">Verify BURN on SolScan</strong>
                                                    </Link>
                                                    <p className="mt-3 text-sm text-slate-700"><strong>16720</strong> $CrabsHQ burned 60 mins ago.</p>
                                                </div>
                                            </div>



                                        </div>

                                    </div>


                                </div>
                            </div>

                            <CrabsHQDashboard />




                        </div>
                    </div>



                </section>

            </div>


        </div>

    );
}