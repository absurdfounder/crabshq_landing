import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Multi-Agent Collaboration - AI Teams Working Together | Crabs HQ",
    description:
        "Multiple AI employees collaborating on complex tasks. Automatic task splitting, parallel execution, shared memory, and coordinated progress across your AI workforce.",
    alternates: {
        canonical: "https://crabshq.com/features/multi-agent-collaboration",
    },
    openGraph: {
        title: "Multi-Agent Collaboration - AI Teams Working Together | Crabs HQ",
        description:
            "Multiple AI employees collaborating on complex tasks. Automatic task splitting, parallel execution, and coordinated progress.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Multi-Agent Collaboration - AI Teams Working Together",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Multi-Agent Collaboration - AI Teams Working Together | Crabs HQ",
        description:
            "Multiple AI employees collaborating on complex tasks with shared memory and coordinated progress.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Multi-Agent Collaboration - AI Teams Working Together",
            },
        ],
    },
};

export default function MultiAgentCollaborationPage() {
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
                                                AI employees collaborate
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">on complex tasks</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Complex projects require teamwork. Crabs HQ automatically splits large tasks across multiple AI employees who work in parallel, share progress through organizational memory, and coordinate to deliver unified results.
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
                            Teamwork between AI employees, not just individual agents
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Most AI platforms give you a single agent that handles everything sequentially. Crabs HQ is built around multi-agent collaboration from the ground up. When a task is too complex for one AI employee, the system automatically divides it among team members based on their roles and skills.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Consider a product launch: one AI employee researches competitors and writes positioning copy, another prepares the GitHub repository and documentation, a third drafts announcement emails and social posts, and a fourth monitors channels for questions after launch. They all work simultaneously, sharing progress through organizational memory.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Coordination happens automatically. When one AI employee produces an output that another needs, it becomes available through shared memory. If a dependency is blocked, the system re-routes work or escalates to a human. The result is complex projects completed faster than any single agent could manage.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Automatic Task Distribution</h3>
                            <p className="text-sm text-slate-600">Complex tasks are automatically broken down and assigned to the right AI employees based on their roles, skills, and current workload.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Parallel Execution</h3>
                            <p className="text-sm text-slate-600">Multiple AI employees work on different parts of a project simultaneously. Research, execution, review, and follow-ups happen in parallel.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Coordinated Handoffs</h3>
                            <p className="text-sm text-slate-600">AI employees share context and coordinate dependencies through organizational memory. When one finishes their part, the next picks up seamlessly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
