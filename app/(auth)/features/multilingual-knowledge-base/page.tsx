import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Multilingual Knowledge Base - Translate your help center | Wonder",
    description:
        "Translate your help center into multiple languages automatically. Reach customers worldwide with Wonder's multilingual knowledge base.",
    alternates: {
        canonical: "https://crabshq.com/features/multilingual-knowledge-base",
    },
    openGraph: {
        images: [
            {
                url: "https://dazzling-cat.netlify.app/backgroundgreysketch.png",
                width: 1200,
                height: 630,
                alt: "Multilingual Knowledge Base - Translate your help center",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/backgroundgreysketch.png",
                alt: "Multilingual Knowledge Base - Translate your help center",
            },
        ],
    },
};

export default function MultilingualKnowledgeBasePage() {
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
                        <div className="max-w-4xl py-6 mx-auto lg:py-6">
                            <div className="text-center">
                                <div className="max-w-screen-xl px-4 mx-auto sm:px-6 mb-4">
                                    <div className="text-center px-4 sm:px-6 lg:px-8">
                                        <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tighter tracking-tighter mb-4 aos-init aos-animate">
                                            <span className="text-3xl sm:text-4xl md:text-5xl relative">
                                                Translate your
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">help center</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Reach customers worldwide with automatic translations. CrabsHQ translates your help center into multiple languages, making your documentation accessible to everyone.
                                        </p>
                                        <div className="flex flex-col-reverse justify-center w-full mt-10 sm:flex-row">
                                            <div className="mt-3 sm:mt-0">
                                                <Link href="https://app.crabshq.com" className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md shadow bg-red-700 sm:w-auto">
                                                    <strong className="mr-1">Get Started →</strong>
                                                </Link>
                                                <p className="mt-3 text-sm text-slate-700"><strong>Free</strong> 3 day trial. Free Design Service.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ModalVideo />
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
