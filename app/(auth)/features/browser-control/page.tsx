import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Browser Control - AI That Navigates the Web Autonomously | Crabs HQ",
    description:
        "AI employees that browse the web, fill forms, extract data, and interact with web apps. Full browser automation powered by OpenClaw for research, monitoring, and data collection.",
    alternates: {
        canonical: "https://crabshq.com/features/browser-control",
    },
    openGraph: {
        title: "Browser Control - AI That Navigates the Web Autonomously | Crabs HQ",
        description:
            "AI employees that browse the web, fill forms, extract data, and interact with web apps. Full browser automation powered by OpenClaw.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ Browser Control - AI Web Navigation and Data Extraction",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Browser Control - AI That Navigates the Web Autonomously | Crabs HQ",
        description:
            "AI employees that browse the web, fill forms, extract data, and interact with web apps autonomously.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ Browser Control - AI Web Navigation and Data Extraction",
            },
        ],
    },
};

export default function BrowserControlPage() {
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
                                                Navigate the web,
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">fill forms, extract data</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Crabs HQ AI employees can control a full browser session. They navigate websites, fill out forms, take screenshots, extract structured data, and interact with web applications just like a human would.
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
                            Full browser automation for real-world tasks
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Many business tasks require interacting with websites that do not have APIs. Checking competitor pricing, filling out vendor forms, extracting data from dashboards, or monitoring web applications. Crabs HQ AI employees handle all of this through full browser control.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Using the OpenClaw runtime, AI employees launch headless browser sessions where they can click buttons, type into fields, scroll pages, take screenshots, and navigate between sites. They understand page structure and can adapt when layouts change, making them reliable for recurring web-based tasks.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Combine browser control with other skills for powerful workflows. An AI employee can research a topic on the web, extract key data points, compile the findings into a document, commit it to your GitHub repo, and notify your team on Slack, all as one continuous task.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Web Research & Data Extraction</h3>
                            <p className="text-sm text-slate-600">AI employees browse the web, extract structured data from any website, and compile research findings into actionable reports.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Form Filling & Interaction</h3>
                            <p className="text-sm text-slate-600">Automate repetitive web-based tasks like filling out forms, updating records in web apps, and completing multi-step online processes.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Screenshot & Monitoring</h3>
                            <p className="text-sm text-slate-600">Take screenshots of web pages, monitor websites for changes, and track competitor activity. AI employees report findings with visual evidence.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
