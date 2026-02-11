import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "Email & Communication Automation - Gmail, Slack, Discord | Crabs HQ",
    description:
        "AI employees that manage email, Slack, and Discord autonomously. Draft replies, send updates, triage inboxes, and handle team communication across all your channels.",
    alternates: {
        canonical: "https://crabshq.com/features/email-automation",
    },
    openGraph: {
        title: "Email & Communication Automation - Gmail, Slack, Discord | Crabs HQ",
        description:
            "AI employees that manage email, Slack, and Discord autonomously. Draft replies, send updates, and triage inboxes across all your channels.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Email Automation - Gmail, Slack, Discord Integration",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Email & Communication Automation - Gmail, Slack, Discord | Crabs HQ",
        description:
            "AI employees that manage email, Slack, and Discord autonomously. Draft replies, send updates, and triage inboxes.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Email Automation - Gmail, Slack, Discord Integration",
            },
        ],
    },
};

export default function EmailAutomationPage() {
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
                                                Gmail, Slack, Discord
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">managed by AI</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Let AI employees handle your communication channels. They draft and send emails, respond in Slack threads, post Discord updates, triage inboxes by priority, and keep your team informed without you managing every message.
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
                            Communication on autopilot across every channel
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Teams spend hours every day managing email inboxes, responding in Slack channels, and monitoring Discord servers. Crabs HQ AI employees take over these communication tasks so your team can focus on the work that actually moves your business forward.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Connect your Gmail account and AI employees can read incoming emails, categorize them by urgency and topic, draft context-aware replies using persistent memory, and send responses on your behalf. They follow your tone, reference past conversations, and handle routine correspondence end-to-end.
                            </p>
                            <p className="text-slate-600 mb-4">
                                On Slack and Discord, AI employees monitor channels for questions, respond to team queries, post status updates, and surface important messages. They can bridge communication between channels, ensuring your GitHub activity gets summarized in Slack and your customer feedback from Discord reaches the right team.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Gmail Inbox Management</h3>
                            <p className="text-sm text-slate-600">AI employees read, categorize, draft, and send emails. They handle routine correspondence and flag important messages for your attention.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Slack & Discord Automation</h3>
                            <p className="text-sm text-slate-600">Monitor channels, answer questions, post updates, and keep communication flowing across your team collaboration platforms.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Cross-Channel Coordination</h3>
                            <p className="text-sm text-slate-600">AI employees bridge communication across email, Slack, Discord, and other tools. Keep everyone informed without duplicating effort.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
