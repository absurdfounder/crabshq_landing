import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Skills & Plugins - Extend AI Employees with Custom Capabilities | Crabs HQ",
    description:
        "Extend your AI employees with skills and plugins from ClawHub or build your own. Connect to any API, tool, or service through the OpenClaw skill ecosystem.",
    alternates: {
        canonical: "https://crabshq.com/features/skills-plugins",
    },
    openGraph: {
        title: "Skills & Plugins - Extend AI Employees with Custom Capabilities | Crabs HQ",
        description:
            "Extend your AI employees with skills and plugins from ClawHub or build your own. Connect to any API, tool, or service.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Skills & Plugins - Extend AI with Custom Capabilities",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Skills & Plugins - Extend AI Employees with Custom Capabilities | Crabs HQ",
        description:
            "Extend AI employees with skills from ClawHub or build custom plugins. Connect to any API or service.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Skills & Plugins - Extend AI with Custom Capabilities",
            },
        ],
    },
};

export default function SkillsPluginsPage() {
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
                                                Extend with community
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">or custom skills</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            AI employees are only as capable as the tools they can use. Crabs HQ connects to the ClawHub skill marketplace and supports custom plugins, so your AI workforce can interact with any API, service, or internal tool your business relies on.
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
                            An extensible skill system for unlimited capabilities
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Crabs HQ is built on the OpenClaw framework, which means AI employees can be equipped with skills from the ClawHub marketplace. Skills are modular capabilities that give AI employees the ability to interact with specific services: GitHub, Gmail, Notion, Stripe, Jira, and hundreds more.
                            </p>
                            <p className="text-slate-600 mb-4">
                                If a skill does not exist for your use case, you can build your own. The OpenClaw skill format is straightforward: define what the skill does, what inputs it needs, and how it connects to your API or service. Your custom skills become available to every AI employee in your organization.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Skills can be combined for complex workflows. An AI employee might use a GitHub skill to read a pull request, a Notion skill to update documentation, a Slack skill to notify the team, and a custom internal skill to update your deployment tracker. All within a single task.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">ClawHub Marketplace</h3>
                            <p className="text-sm text-slate-600">Browse and install community-built skills from ClawHub. Instantly give your AI employees new capabilities without writing any code.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Custom Skill Builder</h3>
                            <p className="text-sm text-slate-600">Build your own skills to connect AI employees to proprietary tools, internal APIs, and custom workflows unique to your organization.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Composable Workflows</h3>
                            <p className="text-sm text-slate-600">Combine multiple skills into powerful multi-step workflows. AI employees chain skills together to accomplish complex tasks across systems.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
