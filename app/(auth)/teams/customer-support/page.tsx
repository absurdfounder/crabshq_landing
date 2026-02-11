import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Customer Support Team - 24/7 Intelligent Support | Crabs HQ",
    description:
        "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support, handle tickets, resolve issues, and deliver exceptional customer service with intelligent AI agents.",
    alternates: {
        canonical: "https://crabshq.com/teams/customer-support",
    },
    openGraph: {
        title: "AI Customer Support Team - 24/7 Intelligent Support | Crabs HQ",
        description:
            "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support, handle tickets, resolve issues, and deliver exceptional customer service with intelligent AI agents.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Customer Support Team - 24/7 Automated Support",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Customer Support Team - 24/7 Intelligent Support | Crabs HQ",
        description:
            "Deploy an AI-powered customer support team with Crabs HQ. Provide 24/7 support, handle tickets, and resolve issues.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Customer Support Team - 24/7 Automated Support",
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
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">available 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle customer inquiries, resolve tickets, provide technical support, and deliver exceptional service across email, chat, and social media channels.
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
                            Scale your support operations with AI agents
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional customer support teams struggle with ticket volume, response times, and 24/7 availability. Crabs HQ provides AI support agents that handle inquiries instantly, resolve common issues automatically, and escalate complex cases to human agents when needed.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI support team can answer questions, troubleshoot problems, process refunds, update account information, provide product guidance, and track issue resolution. They learn from past interactions and continuously improve their responses.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for tier 1 support, technical support, billing inquiries, product questions, and customer success. All integrated with your helpdesk, CRM, and communication channels.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Instant Responses</h3>
                            <p className="text-sm text-slate-600">Handle customer inquiries across email, chat, and social media with instant, accurate responses that resolve issues on first contact.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Ticket Management</h3>
                            <p className="text-sm text-slate-600">Automatically categorize, prioritize, route, and resolve support tickets while maintaining detailed logs and follow-up schedules.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Knowledge Base</h3>
                            <p className="text-sm text-slate-600">Maintain and update knowledge base articles, FAQs, and help documentation based on common customer questions and feedback.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
