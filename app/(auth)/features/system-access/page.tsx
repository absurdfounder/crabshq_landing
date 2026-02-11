import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import ModalVideo from "@/components/FullModalVideo";

export const metadata = {
    title: "Full System Access - Execute Scripts, Manage Files & Run Commands | Crabs HQ",
    description:
        "AI employees with full system access. Execute scripts, manage files, run shell commands, and interact with databases and APIs on your private OpenClaw server.",
    alternates: {
        canonical: "https://crabshq.com/features/system-access",
    },
    openGraph: {
        title: "Full System Access - Execute Scripts, Manage Files & Run Commands | Crabs HQ",
        description:
            "AI employees with full system access. Execute scripts, manage files, run shell commands, and interact with databases on your private OpenClaw server.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ System Access - Execute Scripts and Manage Files",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Full System Access - Execute Scripts, Manage Files & Run Commands | Crabs HQ",
        description:
            "AI employees with full system access. Execute scripts, manage files, and run commands on your private OpenClaw server.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ System Access - Execute Scripts and Manage Files",
            },
        ],
    },
};

export default function SystemAccessPage() {
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
                                                Execute scripts,
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">manage files, run commands</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Crabs HQ AI employees operate on a private OpenClaw server with full system access. They run shell commands, execute scripts in any language, manage files and directories, query databases, and interact with your infrastructure directly.
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
                            A private server for every AI organization
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Every Crabs HQ AI organization runs on its own private OpenClaw server. This gives your AI employees unrestricted access to the tools they need: shell commands, file systems, package managers, databases, and any CLI tool you use in your workflow.
                            </p>
                            <p className="text-slate-600 mb-4">
                                AI employees can write and execute Python scripts, run Node.js programs, query PostgreSQL databases, process CSV files, generate reports, and automate DevOps tasks. They have the same capabilities as a developer sitting at a terminal, but they work around the clock.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Because each organization gets its own server, your data stays siloed and secure. There is no shared infrastructure with other customers. Your AI employees operate within a contained environment with the packages, tools, and configurations your team needs.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Script Execution</h3>
                            <p className="text-sm text-slate-600">Run Python, Node.js, Bash, and other scripts. AI employees write and execute code to process data, automate tasks, and generate outputs.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">File & Database Management</h3>
                            <p className="text-sm text-slate-600">Create, read, update, and organize files. Query databases, process spreadsheets, and manage your data infrastructure programmatically.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Isolated & Secure</h3>
                            <p className="text-sm text-slate-600">Every organization runs on its own private server. Your data and processes are completely isolated from other customers.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
