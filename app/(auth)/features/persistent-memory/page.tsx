import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Persistent Memory - AI That Remembers Context Across Tasks | Crabs HQ",
    description:
        "AI employees with persistent memory that remember past work, decisions, and preferences. Every task builds on previous knowledge for faster, more accurate results.",
    alternates: {
        canonical: "https://crabshq.com/features/persistent-memory",
    },
    openGraph: {
        title: "Persistent Memory - AI That Remembers Context Across Tasks | Crabs HQ",
        description:
            "AI employees with persistent memory that remember past work, decisions, and preferences. Every task builds on previous knowledge.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Persistent Memory - AI That Remembers Everything",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Persistent Memory - AI That Remembers Context Across Tasks | Crabs HQ",
        description:
            "AI employees with persistent memory. Every task builds on previous knowledge for faster, more accurate results.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Persistent Memory - AI That Remembers Everything",
            },
        ],
    },
};

export default function PersistentMemoryPage() {
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
                                                Remembers context
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">across every task</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Unlike chatbots that forget everything between sessions, Crabs HQ AI employees maintain persistent memory. Past work, decisions, preferences, and project context carry forward across every task, making each interaction smarter than the last.
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

                        <ModalVideo />
                    </div>
                </div>
            </section>

            <section className="relative py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <h2 className="font-funneldisplay text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                            Memory that makes AI employees smarter over time
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                A real employee does not start from scratch every morning. They remember what was discussed yesterday, what decisions were made last week, and what the team prefers. Crabs HQ AI employees work the same way through persistent memory powered by OpenClaw.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Every task an AI employee completes becomes part of their accumulated knowledge. They remember your codebase conventions, your communication style, your project priorities, and the outcomes of previous work. This means an AI employee assigned to your repository today will be significantly more effective next month.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Memory is shared across the AI organization too. When one AI employee learns something about a project or client, that knowledge is accessible to other employees in the same organization. No more repeating context or re-explaining requirements.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Cross-Task Memory</h3>
                            <p className="text-sm text-slate-600">Decisions, preferences, and outcomes from past tasks carry forward automatically. Your AI employees never ask the same question twice.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Organizational Knowledge</h3>
                            <p className="text-sm text-slate-600">Memory is shared across AI employees in the same organization. What one employee learns, the whole team benefits from.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Compounding Intelligence</h3>
                            <p className="text-sm text-slate-600">AI employees get better at their jobs over time. Every interaction builds on previous knowledge, making results faster and more accurate.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
