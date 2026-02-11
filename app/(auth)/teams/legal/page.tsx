import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Legal Team - Automate Legal Operations | Crabs HQ",
    description:
        "Deploy an AI-powered legal team with Crabs HQ. Automate contract review, compliance monitoring, legal research, document drafting, and risk assessment with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/legal",
    },
    openGraph: {
        title: "AI Legal Team - Automate Legal Operations | Crabs HQ",
        description:
            "Deploy an AI-powered legal team with Crabs HQ. Automate contract review, compliance monitoring, legal research, document drafting, and risk assessment with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Legal Team - Automated Legal Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Legal Team - Automate Legal Operations | Crabs HQ",
        description:
            "Deploy an AI-powered legal team with Crabs HQ. Automate contract review, compliance monitoring, legal research, and document drafting.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Legal Team - Automated Legal Operations",
            },
        ],
    },
};

export default function LegalTeamPage() {
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
                                                AI Legal Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that protects your business</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle contract review, compliance monitoring, legal research, document drafting, risk assessment, and regulatory analysis automatically.
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
                            Scale your legal operations with AI
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional legal teams are overwhelmed by contract reviews, compliance monitoring, and legal research. Crabs HQ provides AI employees that handle routine legal tasks with precision, allowing your legal team to focus on strategic counsel and complex legal matters.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI legal team can review contracts, identify risks, ensure compliance, conduct legal research, draft standard documents, track regulatory changes, manage legal documentation, and provide preliminary legal analysis. They work with your legal processes and follow your guidelines.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for contract management, compliance monitoring, legal research, document review, risk assessment, and regulatory tracking. All integrated with your legal management systems.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Contract Review</h3>
                            <p className="text-sm text-slate-600">Analyze contracts, identify potential issues, flag risky clauses, ensure consistency with standards, and track contract lifecycles.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Compliance Monitoring</h3>
                            <p className="text-sm text-slate-600">Track regulatory requirements, monitor compliance status, identify gaps, generate compliance reports, and ensure adherence to regulations.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Legal Research</h3>
                            <p className="text-sm text-slate-600">Conduct legal research, analyze case law, summarize regulations, track legal precedents, and provide preliminary legal analysis.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
