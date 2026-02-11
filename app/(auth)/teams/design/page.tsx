import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Design Team - Automated Design & Brand Assets | Crabs HQ",
    description:
        "Deploy an AI-powered design team with Crabs HQ. Automate UI/UX design, brand assets, graphics, presentations, and design system management to scale your creative output.",
    alternates: {
        canonical: "https://crabshq.com/teams/design",
    },
    openGraph: {
        title: "AI Design Team - Automated Design & Brand Assets | Crabs HQ",
        description:
            "Deploy an AI-powered design team with Crabs HQ. Automate UI/UX design, brand assets, graphics, and design system management.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Design Team - Automated Creative Work",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Design Team - Automated Design & Brand Assets | Crabs HQ",
        description:
            "Deploy an AI-powered design team with Crabs HQ. Automate UI/UX design, brand assets, and graphics creation.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Design Team - Automated Creative Work",
            },
        ],
    },
};

export default function DesignTeamPage() {
    return (
        <div>
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
                        <div className="max-w-4xl py-6 mx-auto lg:py-6">
                            <div className="text-center">
                                <div className="max-w-screen-xl px-4 mx-auto sm:px-6 mb-4">
                                    <div className="text-center px-4 sm:px-6 lg:px-8">
                                        <h1 className="font-funneldisplay text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tighter tracking-tighter mb-4 aos-init aos-animate">
                                            <span className="text-3xl sm:text-4xl md:text-5xl relative">
                                                AI Design Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">creating on-brand assets</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI design team that handles UI/UX design, brand assets, graphics, presentations, and design system management. Scale your creative output without scaling headcount.
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

                        <HeroArticleDemo />
                    </div>
                </div>
            </section>

            <section className="relative py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-funneldisplay text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                            Why AI design teams deliver consistent brand experiences
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional design teams struggle with consistency, bandwidth limitations, and high costs. Crabs HQ's AI design team maintains perfect brand consistency while producing unlimited creative assets across all channels.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI design team can create UI mockups, design social media graphics, build presentations, maintain design systems, generate marketing materials, and ensure brand consistency. All while following your design guidelines and brand standards.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for UI/UX design, graphic design, brand management, motion design, and design system maintenance. Each works autonomously while collaborating to deliver cohesive visual experiences.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">UI/UX Design</h3>
                            <p className="text-sm text-slate-600">Create wireframes, mockups, prototypes, and user flows. Design interfaces that are beautiful, intuitive, and conversion-optimized.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Brand Assets</h3>
                            <p className="text-sm text-slate-600">Generate social media graphics, marketing materials, presentations, and branded content that maintains consistent visual identity.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Design Systems</h3>
                            <p className="text-sm text-slate-600">Maintain component libraries, style guides, and design tokens. Ensure consistency across all digital touchpoints.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
