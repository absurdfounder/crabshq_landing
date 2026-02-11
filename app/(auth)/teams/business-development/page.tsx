import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Business Development Team - Automate BD Operations | Crabs HQ",
    description:
        "Deploy an AI-powered business development team with Crabs HQ. Automate partnership research, deal sourcing, relationship management, and opportunity tracking with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/business-development",
    },
    openGraph: {
        title: "AI Business Development Team - Automate BD Operations | Crabs HQ",
        description:
            "Deploy an AI-powered business development team with Crabs HQ. Automate partnership research, deal sourcing, relationship management, and opportunity tracking with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Business Development Team - Automated BD Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Business Development Team - Automate BD Operations | Crabs HQ",
        description:
            "Deploy an AI-powered business development team with Crabs HQ. Automate partnership research, deal sourcing, and opportunity tracking.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Business Development Team - Automated BD Operations",
            },
        ],
    },
};

export default function BusinessDevelopmentTeamPage() {
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
                                                AI Business Development Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that finds opportunities</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle partnership research, deal sourcing, relationship management, opportunity tracking, and market expansion automatically.
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
                            Scale your business development with AI
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional business development teams struggle to identify and pursue all potential opportunities. Crabs HQ provides AI employees that continuously research markets, identify partnership opportunities, track industry trends, and manage relationship pipelines at scale.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI business development team can research potential partners, identify strategic opportunities, analyze market trends, qualify leads, draft partnership proposals, track relationship progress, and coordinate outreach. They work continuously to expand your business network.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for partnership research, deal sourcing, market analysis, relationship management, opportunity qualification, and competitive intelligence. All working together to accelerate your business growth.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Opportunity Research</h3>
                            <p className="text-sm text-slate-600">Identify partnership opportunities, research potential partners, analyze market trends, and qualify opportunities based on strategic fit.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Relationship Management</h3>
                            <p className="text-sm text-slate-600">Track partnership pipelines, manage relationships, coordinate outreach, schedule meetings, and maintain detailed records of interactions.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Market Intelligence</h3>
                            <p className="text-sm text-slate-600">Monitor industry trends, analyze competitors, identify market gaps, track strategic moves, and provide insights for expansion strategies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
