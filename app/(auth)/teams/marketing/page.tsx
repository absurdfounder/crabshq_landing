import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Marketing Team - Automated Marketing Campaigns & Strategy | Crabs HQ",
    description:
        "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, campaign management, social media, SEO, and analytics to scale your marketing efforts.",
    alternates: {
        canonical: "https://crabshq.com/teams/marketing",
    },
    openGraph: {
        title: "AI Marketing Team - Automated Marketing Campaigns & Strategy | Crabs HQ",
        description:
            "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, campaign management, social media, SEO, and analytics to scale your marketing efforts.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Marketing Team - Automated Marketing Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Marketing Team - Automated Marketing Campaigns & Strategy | Crabs HQ",
        description:
            "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, campaign management, social media, SEO, and analytics.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Marketing Team - Automated Marketing Operations",
            },
        ],
    },
};

export default function MarketingTeamPage() {
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
                                                AI Marketing Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that never sleeps</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI marketing team that handles content creation, campaign management, social media scheduling, SEO optimization, and performance analytics. Scale your marketing without scaling headcount.
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
                            Why AI marketing teams outperform traditional agencies
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional marketing teams are expensive, slow, and limited by working hours. Crabs HQ's AI marketing team operates 24/7, creating content, analyzing data, optimizing campaigns, and engaging with audiences across all your channels simultaneously.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI marketing team can write blog posts, design social media campaigns, conduct competitor research, optimize SEO, manage email campaigns, analyze performance metrics, and adjust strategies in real-time. All while maintaining your brand voice and following your strategic guidelines.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for content marketing, social media management, SEO, paid advertising, email marketing, and analytics. Each works autonomously while collaborating on unified campaigns.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Content Creation & Distribution</h3>
                            <p className="text-sm text-slate-600">Generate blog posts, social media content, email campaigns, and landing pages. Automatically distribute across channels with perfect timing.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Campaign Management</h3>
                            <p className="text-sm text-slate-600">Plan, execute, and optimize multi-channel marketing campaigns. Track performance and adjust strategies in real-time based on data.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Analytics & Optimization</h3>
                            <p className="text-sm text-slate-600">Monitor campaign performance, analyze audience behavior, conduct A/B testing, and generate actionable insights to improve ROI.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
