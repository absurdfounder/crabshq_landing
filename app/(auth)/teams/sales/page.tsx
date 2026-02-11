import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Sales Team - Automated Lead Generation & Deal Closing | Crabs HQ",
    description:
        "Deploy an AI-powered sales team with Crabs HQ. Automate prospecting, lead qualification, outreach, follow-ups, and deal management to scale your revenue.",
    alternates: {
        canonical: "https://crabshq.com/teams/sales",
    },
    openGraph: {
        title: "AI Sales Team - Automated Lead Generation & Deal Closing | Crabs HQ",
        description:
            "Deploy an AI-powered sales team with Crabs HQ. Automate prospecting, lead qualification, outreach, follow-ups, and deal management to scale your revenue.",
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
        title: "AI Sales Team - Automated Lead Generation & Deal Closing | Crabs HQ",
        description:
            "Deploy an AI-powered sales team with Crabs HQ. Automate prospecting, lead qualification, outreach, and deal management.",
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
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">closing deals 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI sales team that handles prospecting, lead qualification, personalized outreach, follow-ups, and CRM management. Close more deals without hiring more reps.
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
                            Why AI sales teams outperform traditional sales development
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional sales teams are expensive to hire, train, and scale. Crabs HQ's AI sales team operates 24/7, handling prospecting, qualification, personalized outreach, and follow-ups across multiple channels simultaneously.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI sales team can research prospects, enrich lead data, craft personalized messages, schedule meetings, update CRM records, analyze deal stages, and coordinate with account executives. All while learning from successful patterns and continuously improving conversion rates.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for prospecting, lead qualification, outbound outreach, inbound lead response, deal management, and sales analytics. Each works autonomously while collaborating to move deals through your pipeline.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Intelligent Prospecting</h3>
                            <p className="text-sm text-slate-600">Automatically identify ideal prospects, enrich contact data, research companies, and build targeted lists based on your ICP.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Personalized Outreach</h3>
                            <p className="text-sm text-slate-600">Craft customized emails, LinkedIn messages, and call scripts. Automatically follow up and nurture leads through multi-touch sequences.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Deal Management</h3>
                            <p className="text-sm text-slate-600">Track pipeline health, update CRM records, schedule meetings, send proposals, and coordinate with your team to close deals faster.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
