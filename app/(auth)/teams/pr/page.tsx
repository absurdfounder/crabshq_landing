import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI PR Team - Automate Public Relations | Crabs HQ",
    description:
        "Deploy an AI-powered PR team with Crabs HQ. Automate press release writing, media outreach, reputation management, crisis communications, and brand monitoring with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/pr",
    },
    openGraph: {
        title: "AI PR Team - Automate Public Relations | Crabs HQ",
        description:
            "Deploy an AI-powered PR team with Crabs HQ. Automate press release writing, media outreach, reputation management, crisis communications, and brand monitoring with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI PR Team - Automated Public Relations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI PR Team - Automate Public Relations | Crabs HQ",
        description:
            "Deploy an AI-powered PR team with Crabs HQ. Automate press release writing, media outreach, reputation management, and brand monitoring.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI PR Team - Automated Public Relations",
            },
        ],
    },
};

export default function PRTeamPage() {
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
                                                AI PR Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that builds your brand</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle press releases, media outreach, reputation management, crisis communications, brand monitoring, and PR strategy automatically.
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
                            Amplify your brand with AI-powered PR
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional PR teams struggle to maintain consistent media presence and respond quickly to opportunities or crises. Crabs HQ provides AI employees that manage your public relations continuously, ensuring your brand message reaches the right audiences at the right time.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI PR team can write press releases, pitch stories to journalists, monitor brand mentions, manage media relationships, respond to inquiries, track coverage, coordinate crisis communications, and maintain your brand reputation across all channels.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for press relations, reputation management, crisis communications, media monitoring, influencer outreach, and PR analytics. All working together to build and protect your brand image.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Media Relations</h3>
                            <p className="text-sm text-slate-600">Write press releases, pitch stories, build journalist relationships, coordinate interviews, and secure media coverage for your brand.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Reputation Management</h3>
                            <p className="text-sm text-slate-600">Monitor brand mentions, track sentiment, respond to coverage, manage reviews, and maintain positive brand perception across all channels.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Crisis Communications</h3>
                            <p className="text-sm text-slate-600">Detect potential issues early, draft crisis responses, coordinate communications, manage stakeholders, and protect brand reputation during crises.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
