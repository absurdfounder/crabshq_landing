import React from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import FeaturesBlocks from "@/components/FeaturesBlocks";
import Testimonials from "@/components/testimonials";
import HeroArticleDemo from "@/components/HeroArticleDemo";

export const metadata = {
    title: "AI Security Team - Automate Security Operations | Crabs HQ",
    description:
        "Deploy an AI-powered security team with Crabs HQ. Automate threat detection, vulnerability scanning, security monitoring, incident response, and compliance with intelligent AI employees.",
    alternates: {
        canonical: "https://crabshq.com/teams/security",
    },
    openGraph: {
        title: "AI Security Team - Automate Security Operations | Crabs HQ",
        description:
            "Deploy an AI-powered security team with Crabs HQ. Automate threat detection, vulnerability scanning, security monitoring, incident response, and compliance with intelligent AI employees.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                width: 1200,
                height: 630,
                alt: "AI Security Team - Automated Security Operations",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "AI Security Team - Automate Security Operations | Crabs HQ",
        description:
            "Deploy an AI-powered security team with Crabs HQ. Automate threat detection, vulnerability scanning, security monitoring, and incident response.",
        images: [
            {
                url: "https://dazzling-cat.netlify.app/crabshq_social.png",
                alt: "AI Security Team - Automated Security Operations",
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
                                            <span className="text-3xl sm:text-4xl md:text-5xl gradient-text-accent mx-4">that protects 24/7</span>
                                        </h1>
                                        <p className="max-w-md mx-auto mt-3 text-base text-slate-500 sm:mb-0 sm:text-lg md:mt-5 md:text-lg md:max-w-2xl">
                                            Deploy AI employees that handle threat detection, vulnerability scanning, security monitoring, incident response, compliance checks, and security audits automatically.
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
                            Strengthen your security posture with AI
                        </h2>
                        <div className="prose prose-slate prose-lg">
                            <p className="text-slate-600 mb-4">
                                Traditional security teams are overwhelmed by the volume of threats, vulnerabilities, and security events. Crabs HQ provides AI employees that monitor systems continuously, detect threats in real-time, and respond to security incidents automatically.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Your AI security team can scan for vulnerabilities, monitor network traffic, detect anomalies, analyze logs, respond to incidents, track security compliance, conduct security audits, and maintain security documentation. They work around the clock to protect your systems.
                            </p>
                            <p className="text-slate-600 mb-4">
                                Deploy specialized AI employees for vulnerability management, threat detection, incident response, security monitoring, compliance tracking, and penetration testing. All integrated with your security tools and SIEM systems.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 grid md:grid-cols-3 gap-8">
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Threat Detection</h3>
                            <p className="text-sm text-slate-600">Monitor systems for threats, detect anomalies, analyze security events, identify attacks, and alert on suspicious activities in real-time.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Vulnerability Management</h3>
                            <p className="text-sm text-slate-600">Scan for vulnerabilities, prioritize remediation, track patches, conduct security assessments, and maintain vulnerability databases.</p>
                        </div>
                        <div className="p-6 rounded-lg border border-neutral-200">
                            <h3 className="font-semibold text-slate-900 mb-2">Incident Response</h3>
                            <p className="text-sm text-slate-600">Respond to security incidents, contain threats, investigate breaches, generate incident reports, and implement remediation measures.</p>
                        </div>
                    </div>
                </div>
            </section>

            <FeaturesBlocks />
            <Testimonials />
        </div>
    );
}
