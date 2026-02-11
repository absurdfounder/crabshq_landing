import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Operations Team - Streamline Business Operations | Crabs HQ",
    description:
        "Deploy an AI-powered operations team with Crabs HQ. Automate workflows, process management, data entry, reporting, and operational efficiency with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/operations",
    },
    openGraph: {
        title: "AI Operations Team - Streamline Business Operations | Crabs HQ",
        description:
            "Deploy an AI-powered operations team with Crabs HQ. Automate workflows, process management, data entry, reporting, and operational efficiency with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Operations Team - Automated Business Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Operations Team - Streamline Business Operations | Crabs HQ",
        description:
            "Deploy an AI-powered operations team with Crabs HQ. Automate workflows, process management, and operational efficiency.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Operations Team - Automated Business Operations",
            },
        ],
    },
};

export default function OperationsTeamPage() {
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
                                                AI Operations Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that streamlines everything</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle workflow automation, process management, data entry, reporting, inventory management, and operational optimization across your business.
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
                            Optimize your operations with AI employees
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional operations teams are overwhelmed by manual processes, data entry, and repetitive tasks that slow down business growth. Crabs HQ provides AI employees that automate operational workflows, ensuring efficiency and accuracy across all business functions.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI operations team can manage workflows, process documents, update databases, generate reports, coordinate between departments, monitor systems, and optimize processes. They handle the operational backbone of your business automatically.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for process automation, data management, quality assurance, inventory control, vendor management, and operational reporting. All working together to keep your business running smoothly.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Workflow Automation</h3>
                            <p className="text-sm text-slate-600">Automate repetitive processes, data entry, document processing, and approval workflows to eliminate manual work and reduce errors.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Process Management</h3>
                            <p className="text-sm text-slate-600">Monitor and optimize business processes, identify bottlenecks, implement improvements, and ensure operations run efficiently.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Data & Reporting</h3>
                            <p className="text-sm text-slate-600">Collect, organize, and analyze operational data. Generate reports, dashboards, and insights to drive data-informed decisions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
