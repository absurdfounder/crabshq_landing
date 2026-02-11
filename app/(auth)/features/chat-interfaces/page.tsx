import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "Chat Anywhere - WhatsApp, Telegram, Discord, Slack, Signal | Crabs HQ",
    description:
        "Interact with your AI employees from any chat platform. WhatsApp, Telegram, Discord, Slack, Signal, and more. Assign tasks, get updates, and manage your AI workforce from wherever you already communicate.",
    alternates: {
        canonical: "https://crabshq.com/features/chat-interfaces",
    },
    openGraph: {
        title: "Chat Anywhere - WhatsApp, Telegram, Discord, Slack, Signal | Crabs HQ",
        description:
            "Interact with your AI employees from any chat platform. Assign tasks and get updates from WhatsApp, Telegram, Discord, Slack, and Signal.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Chat Interfaces - WhatsApp, Telegram, Discord, Slack",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Chat Anywhere - WhatsApp, Telegram, Discord, Slack, Signal | Crabs HQ",
        description:
            "Interact with your AI employees from WhatsApp, Telegram, Discord, Slack, and Signal.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Chat Interfaces - WhatsApp, Telegram, Discord, Slack",
            },
        ],
    },
};

export default function ChatInterfacesPage() {
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
                                                Chat from anywhere:
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">WhatsApp, Telegram & more</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Your AI employees meet you where you already communicate. Assign tasks, get progress updates, ask questions, and manage your AI workforce directly from WhatsApp, Telegram, Discord, Slack, Signal, or any messaging platform your team uses.
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
                            Manage your AI workforce from any messaging app
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                You should not have to switch to a new dashboard every time you want to talk to your AI employees. Crabs HQ connects to the messaging platforms you already use every day. Send a message on WhatsApp, and your AI employee starts working on the task. Get a Telegram notification when the work is done.
                            </p>
                            <p className="text-slate-600 mb-4">
                                This works across WhatsApp, Telegram, Discord, Slack, and Signal. Each platform supports full two-way communication with your AI employees. You can assign new tasks, check on progress, ask clarifying questions, approve outputs, and receive completion notifications, all from the same chat interface you use for everything else.
                            </p>
                            <p className="text-slate-600 mb-4">
                                For teams, this means different people can interact with the same AI organization through their preferred platform. A CEO checks in via WhatsApp while the engineering lead manages tasks through Slack. The AI employees handle the context switching, not your team.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Multi-Platform Support</h3>
                            <p className="text-sm text-slate-600">Connect through WhatsApp, Telegram, Discord, Slack, or Signal. Use whichever platform fits your workflow. Switch between them freely.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Full Task Management</h3>
                            <p className="text-sm text-slate-600">Assign tasks, track progress, approve deliverables, and receive notifications. Everything you can do in the dashboard, you can do from chat.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Team Flexibility</h3>
                            <p className="text-sm text-slate-600">Different team members can use different platforms to interact with the same AI organization. The AI handles cross-platform context seamlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
