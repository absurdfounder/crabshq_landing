import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Design Team - Automate Design & Creative Work | Crabs HQ",
    description:
        "Deploy an AI-powered design team with Crabs HQ. Automate graphic design, UI/UX design, branding, visual content creation, and design systems with intelligent AI designers.",
    alternates: {
        canonical: "https://crabshq.com/teams/design",
    },
    openGraph: {
        title: "AI Design Team - Automate Design & Creative Work | Crabs HQ",
        description:
            "Deploy an AI-powered design team with Crabs HQ. Automate graphic design, UI/UX design, branding, visual content creation, and design systems with intelligent AI designers.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Design Team - Automated Creative Design",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Design Team - Automate Design & Creative Work | Crabs HQ",
        description:
            "Deploy an AI-powered design team with Crabs HQ. Automate graphic design, UI/UX design, branding, and visual content creation.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Design Team - Automated Creative Design",
            },
        ],
    },
};

export default function DesignTeamPage() {
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
                                                AI Design Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that creates stunning visuals</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle graphic design, UI/UX design, branding, visual content creation, design systems, and creative direction automatically across your design workflow.
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
                            Scale your design operations with AI designers
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional design teams spend hours on repetitive tasks like resizing assets, creating variations, and maintaining design consistency. Crabs HQ provides AI designers that handle creative work while maintaining your brand identity and design standards.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI design team can create graphics, design user interfaces, develop brand assets, produce social media visuals, maintain design systems, and generate creative concepts. They work with your existing tools and follow your brand guidelines.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for graphic design, UI/UX design, brand design, illustration, motion graphics, and design system management. All working together to deliver consistent, high-quality visual content.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Graphic Design</h3>
                            <p className="text-sm text-slate-600">Create logos, banners, social media graphics, marketing materials, presentations, and visual assets that match your brand identity.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">UI/UX Design</h3>
                            <p className="text-sm text-slate-600">Design user interfaces, create wireframes, develop prototypes, conduct user research, and optimize user experiences across web and mobile.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Design Systems</h3>
                            <p className="text-sm text-slate-600">Build and maintain design systems, component libraries, style guides, and brand guidelines to ensure consistency across all touchpoints.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
