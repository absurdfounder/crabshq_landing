import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Workforce - Deploy Multiple AI Employees as a Team | Crabs HQ",
    description:
        "Build AI workforce teams with Crabs HQ. Deploy multiple AI employees that collaborate, share context, and execute tasks autonomously across your entire tech stack.",
    alternates: {
        canonical: "https://crabshq.com/features/ai-workforce",
    },
    openGraph: {
        title: "AI Workforce - Deploy Multiple AI Employees as a Team | Crabs HQ",
        description:
            "Build AI workforce teams with Crabs HQ. Deploy multiple AI employees that collaborate, share context, and execute tasks autonomously across your entire tech stack.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Workforce - Multiple AI Employees Working Together",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Workforce - Deploy Multiple AI Employees as a Team | Crabs HQ",
        description:
            "Build AI workforce teams with Crabs HQ. Deploy multiple AI employees that collaborate, share context, and execute tasks autonomously.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Workforce - Multiple AI Employees Working Together",
            },
        ],
    },
};

export default function AIWorkforcePage() {
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
                                                Multiple AI employees
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">working as a team</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Stop relying on single-purpose AI tools. Crabs HQ lets you deploy entire AI organizations where multiple AI employees collaborate, share context, and execute tasks across GitHub, email, browsers, and your full tech stack.
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
                            Why AI organizations outperform single agents
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional AI assistants handle one task at a time. When the job gets complex, they fall short. Crabs HQ takes a fundamentally different approach by letting you create AI organizations made up of multiple AI employees, each with their own roles, skills, and system access.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Each AI employee can be assigned specific responsibilities such as managing GitHub repositories, handling customer communications, monitoring systems, or conducting research. They share organizational memory, coordinate work automatically, and escalate to humans only when needed.
                            </p>
                            <p className="text-slate-600 mb-4">
                                This means your engineering team gets an AI employee focused on code reviews and pull requests, your marketing team gets one managing content and outreach, and your support team gets one triaging tickets and drafting responses. All working together, all the time.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Role-Based AI Employees</h3>
                            <p className="text-sm text-slate-600">Assign specific roles like DevOps engineer, content writer, or support agent to each AI employee with dedicated skills and permissions.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Shared Organization Memory</h3>
                            <p className="text-sm text-slate-600">Every AI employee in your organization shares context. Decisions, preferences, and past work are accessible to the whole team.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Parallel Task Execution</h3>
                            <p className="text-sm text-slate-600">Complex projects are automatically broken down and distributed across AI employees for simultaneous execution.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
