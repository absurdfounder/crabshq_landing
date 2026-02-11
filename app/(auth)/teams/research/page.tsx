import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Research Team - Market Research & Data Analysis | Crabs HQ",
    description:
        "Deploy an AI-powered research team with Crabs HQ. Automate market research, competitive analysis, customer insights, and data analysis to inform strategic decisions.",
    alternates: {
        canonical: "https://crabshq.com/teams/research",
    },
    openGraph: {
        title: "AI Research Team - Market Research & Data Analysis | Crabs HQ",
        description:
            "Deploy an AI-powered research team with Crabs HQ. Automate market research, competitive analysis, and data analysis.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Research Team - Market Research & Analysis",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Research Team - Market Research & Data Analysis | Crabs HQ",
        description:
            "Deploy an AI-powered research team with Crabs HQ. Automate market research and competitive analysis.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Research Team - Market Research & Analysis",
            },
        ],
    },
};

export default function ResearchTeamPage() {
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
                                                AI Research Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">uncovering insights</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI research team that handles market research, competitive analysis, customer insights, and data analysis. Make data-driven decisions with comprehensive research.
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
                            Why AI research teams deliver deeper insights faster
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional research is time-consuming and expensive. Crabs HQ's AI research team conducts comprehensive research continuously, analyzing vast amounts of data, identifying patterns, and delivering actionable insights.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI research team can conduct market research, analyze competitors, gather customer feedback, process survey data, identify trends, synthesize findings, and generate reports. All while maintaining research quality and methodology.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for market research, competitive intelligence, user research, data analysis, and trend monitoring. Each works autonomously while collaborating to provide comprehensive insights.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Market Research</h3>
                            <p className="text-sm text-slate-600">Analyze market trends, size opportunities, identify target segments, and understand customer needs and preferences.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Competitive Intelligence</h3>
                            <p className="text-sm text-slate-600">Monitor competitors, analyze strategies, track product updates, and identify market positioning opportunities.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Data Analysis</h3>
                            <p className="text-sm text-slate-600">Process quantitative data, conduct statistical analysis, visualize findings, and generate actionable insights for strategy.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
