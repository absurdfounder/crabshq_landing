import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Task Execution - End-to-End AI Task Completion | Crabs HQ",
    description:
        "AI employees that complete tasks from start to finish. No more copy-pasting suggestions. Crabs HQ AI takes action, executes scripts, updates files, and delivers results autonomously.",
    alternates: {
        canonical: "https://crabshq.com/features/task-execution",
    },
    openGraph: {
        title: "Task Execution - End-to-End AI Task Completion | Crabs HQ",
        description:
            "AI employees that complete tasks from start to finish. No more copy-pasting suggestions. Crabs HQ AI takes action and delivers results autonomously.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Task Execution - End-to-End AI Task Completion",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Task Execution - End-to-End AI Task Completion | Crabs HQ",
        description:
            "AI employees that complete tasks from start to finish. Crabs HQ AI takes action and delivers results autonomously.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Task Execution - End-to-End AI Task Completion",
            },
        ],
    },
};

export default function TaskExecutionPage() {
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
                                                End-to-end task completion,
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">not just answers</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Most AI tools give you suggestions. Crabs HQ AI employees take action. They plan tasks, execute multi-step workflows, update files, run commands, send communications, and deliver finished results without constant human input.
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
                            AI that does the work, not just talks about it
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                The gap between AI-generated advice and actual task completion is enormous. Crabs HQ bridges that gap entirely. When you assign a task to an AI employee, it plans the steps, gathers the necessary context, uses the right tools, and executes every step from beginning to end.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Need a bug fixed? Your AI employee reads the issue, checks out the code, understands the context from previous work, implements the fix, runs the test suite, and submits a pull request. Need a research report? It browses the web, extracts data, compiles findings, and delivers a formatted document.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Every task is tracked with full transparency. You can see what your AI employee planned, what actions it took, what tools it used, and what the outcome was. If it hits an obstacle, it reports back with context rather than silently failing.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Multi-Step Workflows</h3>
                            <p className="text-sm text-slate-600">AI employees plan and execute complex workflows that span multiple tools, files, and systems. Each step builds on the previous one.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Full Transparency</h3>
                            <p className="text-sm text-slate-600">Every action taken by an AI employee is logged. See the plan, the execution steps, the tools used, and the final output for every task.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Owns the Outcome</h3>
                            <p className="text-sm text-slate-600">AI employees do not wait for you to act on suggestions. They take ownership of the task and deliver a completed result, escalating only when necessary.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
