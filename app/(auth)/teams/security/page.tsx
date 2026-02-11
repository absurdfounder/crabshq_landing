import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Security Team - Security Audits & Threat Detection | Crabs HQ",
    description:
        "Deploy an AI-powered security team with Crabs HQ. Automate security audits, threat detection, vulnerability scanning, and incident response to protect your systems 24/7.",
    alternates: {
        canonical: "https://crabshq.com/teams/security",
    },
    openGraph: {
        title: "AI Security Team - Security Audits & Threat Detection | Crabs HQ",
        description:
            "Deploy an AI-powered security team with Crabs HQ. Automate security audits, threat detection, and incident response.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Security Team - Security & Threat Detection",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Security Team - Security Audits & Threat Detection | Crabs HQ",
        description:
            "Deploy an AI-powered security team with Crabs HQ. Automate security audits and threat detection.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Security Team - Security & Threat Detection",
            },
        ],
    },
};

export default function SecurityTeamPage() {
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
                                                AI Security Team
                                            </span>
                                            <br className="block" />
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">protecting 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy an entire AI security team that handles security audits, threat detection, vulnerability scanning, and incident response. Protect your systems continuously without expanding your security team.
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
                            Why AI security teams provide better protection
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional security teams can't monitor systems 24/7 and struggle to keep up with evolving threats. Crabs HQ's AI security team operates continuously, detecting threats, scanning for vulnerabilities, and responding to incidents in real-time.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI security team can conduct security audits, scan for vulnerabilities, monitor logs, detect anomalies, analyze threats, implement patches, respond to incidents, and maintain security documentation. All while staying current with the latest threats and best practices.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for vulnerability management, threat detection, incident response, security auditing, and compliance monitoring. Each works autonomously while collaborating to maintain comprehensive security.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Threat Detection</h3>
                            <p className="text-sm text-slate-600">Monitor systems continuously, detect anomalies, identify threats, and respond to security incidents before they escalate.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Vulnerability Management</h3>
                            <p className="text-sm text-slate-600">Scan for vulnerabilities, assess risk levels, prioritize patches, and ensure systems remain secure and up-to-date.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Security Audits</h3>
                            <p className="text-sm text-slate-600">Conduct regular audits, review configurations, ensure compliance, and maintain security documentation and policies.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
