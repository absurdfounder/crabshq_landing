import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Sales Team - Automate Your Sales Process | Crabs HQ",
    description:
        "Deploy an AI-powered sales team with Crabs HQ. Automate lead generation, outreach, follow-ups, CRM management, and deal closing with intelligent AI sales employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/sales",
    },
    openGraph: {
        title: "AI Sales Team - Automate Your Sales Process | Crabs HQ",
        description:
            "Deploy an AI-powered sales team with Crabs HQ. Automate lead generation, outreach, follow-ups, CRM management, and deal closing with intelligent AI sales employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Sales Team - Automated Sales Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Sales Team - Automate Your Sales Process | Crabs HQ",
        description:
            "Deploy an AI-powered sales team with Crabs HQ. Automate lead generation, outreach, follow-ups, CRM management, and deal closing.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Sales Team - Automated Sales Operations",
            },
        ],
    },
};

export default function SalesTeamPage() {
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
                                                AI Sales Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that closes deals</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle lead generation, personalized outreach, follow-ups, CRM updates, proposal creation, and deal management across your entire sales pipeline.
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
                            Scale your sales operations with AI employees
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional sales teams spend countless hours on repetitive tasks like lead qualification, email outreach, and data entry. Crabs HQ transforms your sales process with AI employees that handle these tasks automatically while maintaining a personal touch.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI sales team can research prospects, craft personalized outreach messages, schedule meetings, update CRM records, create proposals, and track deal progress. They learn from successful interactions and continuously optimize their approach.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for lead generation, SDR outreach, account management, proposal creation, and sales analytics. All working together to move deals through your pipeline faster and more efficiently.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Lead Generation</h3>
                            <p className="text-sm text-slate-600">Identify and qualify prospects automatically using intelligent research, data enrichment, and scoring algorithms that prioritize the best opportunities.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Personalized Outreach</h3>
                            <p className="text-sm text-slate-600">Craft and send personalized emails, LinkedIn messages, and follow-ups that resonate with prospects while maintaining consistent communication cadence.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">CRM Management</h3>
                            <p className="text-sm text-slate-600">Automatically update contact records, log activities, track deal stages, and generate sales reports without manual data entry.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
