import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Growth Team - Automate Growth & Optimization | Crabs HQ",
    description:
        "Deploy an AI-powered growth team with Crabs HQ. Automate growth experiments, conversion optimization, user acquisition, retention strategies, and analytics with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/growth",
    },
    openGraph: {
        title: "AI Growth Team - Automate Growth & Optimization | Crabs HQ",
        description:
            "Deploy an AI-powered growth team with Crabs HQ. Automate growth experiments, conversion optimization, user acquisition, retention strategies, and analytics with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Growth Team - Automated Growth Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Growth Team - Automate Growth & Optimization | Crabs HQ",
        description:
            "Deploy an AI-powered growth team with Crabs HQ. Automate growth experiments, conversion optimization, user acquisition, and retention strategies.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Growth Team - Automated Growth Operations",
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
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that scales your business</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle growth experiments, conversion optimization, user acquisition, retention strategies, A/B testing, and analytics automatically.
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
                            Accelerate growth with AI-powered optimization
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional growth teams are limited by the number of experiments they can run and analyze simultaneously. Crabs HQ provides AI employees that continuously test, optimize, and scale growth initiatives across all channels and customer touchpoints.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI growth team can design and run experiments, optimize conversion funnels, test messaging variations, analyze user behavior, identify growth opportunities, implement retention strategies, and track key metrics. They work continuously to compound your growth rates.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for growth experiments, conversion optimization, user acquisition, retention analysis, funnel optimization, and growth analytics. All working together to systematically scale your business.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Growth Experiments</h3>
                            <p className="text-sm text-slate-600">Design, launch, and analyze growth experiments. Run A/B tests, multivariate tests, and feature experiments to identify winning strategies.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Conversion Optimization</h3>
                            <p className="text-sm text-slate-600">Optimize conversion funnels, improve landing pages, refine messaging, reduce friction, and increase conversion rates across all touchpoints.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">User Acquisition & Retention</h3>
                            <p className="text-sm text-slate-600">Identify acquisition channels, optimize campaigns, improve onboarding, implement retention tactics, and reduce churn through data-driven strategies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
