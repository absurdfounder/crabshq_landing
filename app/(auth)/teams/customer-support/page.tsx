import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Customer Support Team - 24/7 Support & Customer Success | Crabs HQ",
    description:
        "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support, resolve tickets, manage escalations, and deliver exceptional customer experiences at scale.",
    alternates: {
        canonical: "https://crabshq.com/teams/customer-support",
    },
    openGraph: {
        title: "AI Customer Support Team - 24/7 Support & Customer Success | Crabs HQ",
        description:
            "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support, resolve tickets, and deliver exceptional customer experiences.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Customer Support Team - 24/7 Support",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Customer Support Team - 24/7 Support & Customer Success | Crabs HQ",
        description:
            "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support and resolve tickets instantly.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Customer Support Team - 24/7 Support",
            },
        ],
    },
};

export default function CustomerSupportTeamPage() {
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
                                                AI Customer Support Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">supporting customers 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI customer support team that handles tickets, resolves issues, manages escalations, and delivers exceptional experiences. Delight customers without expanding headcount.
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
                            Why AI support teams deliver better customer experiences
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional support teams are limited by shifts, time zones, and capacity constraints. Crabs HQ's AI customer support team operates 24/7, resolving issues instantly while maintaining empathy and personalization.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI support team can triage tickets, resolve common issues, draft personalized responses, escalate complex cases, update help documentation, track satisfaction metrics, and identify recurring problems. All while providing consistent, high-quality support.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for ticket triage, technical support, billing inquiries, onboarding, customer success, and feedback analysis. Each works autonomously while collaborating to resolve issues faster.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Instant Resolution</h3>
                            <p className="text-sm text-slate-600">Handle tickets across email, chat, and social media. Resolve common issues instantly and escalate complex cases to humans with full context.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Proactive Support</h3>
                            <p className="text-sm text-slate-600">Monitor customer health, identify at-risk accounts, reach out proactively, and prevent churn before it happens.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Knowledge Management</h3>
                            <p className="text-sm text-slate-600">Maintain help documentation, identify gaps, create new articles from tickets, and ensure knowledge base stays current.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
