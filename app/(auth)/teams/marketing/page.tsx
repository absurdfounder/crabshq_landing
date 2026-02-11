import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Marketing Team - Automate Your Marketing Operations | Crabs HQ",
    description:
        "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, social media management, email campaigns, SEO optimization, and more with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/marketing",
    },
    openGraph: {
        title: "AI Marketing Team - Automate Your Marketing Operations | Crabs HQ",
        description:
            "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, social media management, email campaigns, SEO optimization, and more with intelligent AI employees.",
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
        title: "AI Marketing Team - Automate Your Marketing Operations | Crabs HQ",
        description:
            "Deploy an AI-powered marketing team with Crabs HQ. Automate content creation, social media management, email campaigns, and SEO optimization.",
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
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that works 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle content creation, social media management, email campaigns, SEO optimization, and marketing analytics automatically across your entire marketing stack.
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
                            Scale your marketing operations with AI employees
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional marketing teams are limited by time, resources, and manual processes. Crabs HQ changes that by providing AI employees that can create content, manage campaigns, optimize SEO, analyze data, and engage with audiences across all your marketing channels.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI marketing team can write blog posts, create social media content, draft email campaigns, conduct keyword research, analyze competitor strategies, and track campaign performance. They work continuously, learning from data and adapting strategies in real-time.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for content marketing, social media management, email automation, SEO optimization, paid advertising, and marketing analytics. All working together with shared context and coordinated strategies.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Content Creation</h3>
                            <p className="text-sm text-slate-600">Generate blog posts, social media content, email copy, landing pages, and ad creative that matches your brand voice and resonates with your audience.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Campaign Management</h3>
                            <p className="text-sm text-slate-600">Plan, launch, and optimize marketing campaigns across multiple channels with automated A/B testing, performance tracking, and budget allocation.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">SEO & Analytics</h3>
                            <p className="text-sm text-slate-600">Conduct keyword research, optimize content for search engines, track rankings, analyze competitor strategies, and generate actionable insights from marketing data.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
