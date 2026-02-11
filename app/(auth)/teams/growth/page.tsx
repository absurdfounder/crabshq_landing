import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Growth Team - User Acquisition & Retention | Crabs HQ",
    description:
        "Deploy an AI-powered growth team with Crabs HQ. Automate user acquisition, retention strategies, growth experiments, and data-driven optimization to accelerate growth.",
    alternates: {
        canonical: "https://crabshq.com/teams/growth",
    },
    openGraph: {
        title: "AI Growth Team - User Acquisition & Retention | Crabs HQ",
        description:
            "Deploy an AI-powered growth team with Crabs HQ. Automate user acquisition, retention strategies, and growth experiments.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Growth Team - User Acquisition & Retention",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Growth Team - User Acquisition & Retention | Crabs HQ",
        description:
            "Deploy an AI-powered growth team with Crabs HQ. Automate user acquisition and retention strategies.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Growth Team - User Acquisition & Retention",
            },
        ],
    },
};

export default function GrowthTeamPage() {
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
                                                AI Growth Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">accelerating your growth</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI growth team that handles user acquisition, retention strategies, growth experiments, and data-driven optimization. Scale faster with systematic growth.
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
                            Why AI growth teams scale faster than traditional methods
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional growth teams are limited by bandwidth and manual experimentation. Crabs HQ's AI growth team runs continuous experiments, analyzes data in real-time, and optimizes every stage of your funnel simultaneously.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI growth team can design experiments, implement A/B tests, analyze user behavior, optimize conversion funnels, create retention campaigns, identify growth opportunities, and scale winning strategies. All while learning from data and improving over time.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for acquisition optimization, conversion rate optimization, retention marketing, product analytics, and growth experimentation. Each works autonomously while collaborating to accelerate growth metrics.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Acquisition Optimization</h3>
                            <p className="text-sm text-slate-600">Optimize ad campaigns, improve landing pages, test messaging, and scale channels that deliver the best cost per acquisition.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Conversion Optimization</h3>
                            <p className="text-sm text-slate-600">Run A/B tests, optimize funnels, reduce friction, and improve conversion rates at every stage of the user journey.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Retention & Engagement</h3>
                            <p className="text-sm text-slate-600">Build retention campaigns, identify churn risks, re-engage users, and maximize lifetime value through data-driven strategies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
