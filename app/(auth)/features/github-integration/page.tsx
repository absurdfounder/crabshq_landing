import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "GitHub Integration - Autonomous Commits, PRs & Code Reviews | Crabs HQ",
    description:
        "AI employees that work directly in your GitHub repos. Autonomous commits, pull requests, code reviews, issue management, and CI/CD pipeline monitoring powered by OpenClaw.",
    alternates: {
        canonical: "https://crabshq.com/features/github-integration",
    },
    openGraph: {
        title: "GitHub Integration - Autonomous Commits, PRs & Code Reviews | Crabs HQ",
        description:
            "AI employees that work directly in your GitHub repos. Autonomous commits, pull requests, code reviews, and issue management powered by OpenClaw.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "Crabs HQ GitHub Integration - Autonomous Commits and PRs",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "GitHub Integration - Autonomous Commits, PRs & Code Reviews | Crabs HQ",
        description:
            "AI employees that work directly in your GitHub repos. Autonomous commits, pull requests, and code reviews powered by OpenClaw.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "Crabs HQ GitHub Integration - Autonomous Commits and PRs",
            },
        ],
    },
};

export default function GitHubIntegrationPage() {
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
                                                Autonomous commits,
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">PRs, and code reviews</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Your AI employees work directly inside your GitHub repositories. They commit code, open pull requests, review changes, manage issues, and monitor CI/CD pipelines without leaving your existing workflow.
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
                            GitHub-native AI that ships code
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Crabs HQ AI employees integrate directly with GitHub through the OpenClaw runtime. This is not another code suggestion tool that waits for you to copy-paste. Your AI employees autonomously create branches, write code, commit changes, open pull requests, and respond to review comments.
                            </p>
                            <p className="text-slate-600 mb-4">
                                When an issue is filed, an AI employee can pick it up, understand the codebase context from persistent memory, implement the fix, run tests, and submit a PR for human review. The entire workflow happens inside GitHub using your existing branch protection rules and CI/CD pipelines.
                            </p>
                            <p className="text-slate-600 mb-4">
                                AI employees also perform code reviews on pull requests opened by your human team. They check for bugs, style consistency, security vulnerabilities, and suggest improvements with inline comments, just like any other team member on your repository.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Autonomous Commits & PRs</h3>
                            <p className="text-sm text-slate-600">AI employees create branches, write code, and open pull requests. Every change follows your existing branch protection and review rules.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Automated Code Reviews</h3>
                            <p className="text-sm text-slate-600">Get thorough code reviews with inline comments on every pull request. AI employees check for bugs, security issues, and style consistency.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Issue Triage & Resolution</h3>
                            <p className="text-sm text-slate-600">AI employees monitor issues, triage them by priority, and can autonomously implement fixes for well-defined bugs and feature requests.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
