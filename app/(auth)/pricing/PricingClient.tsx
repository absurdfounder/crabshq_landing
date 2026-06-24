"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import Header from "@/components/ui/header";
import SectionShell from "@/components/ui/SectionShell";
import SimplePricing from "@/components/SimplePricing";
import PricingCompareTable from "@/components/PricingCompareTable";
import { formatUsd, PRICING_USD } from "@/lib/pricing";

// --- Exit Intent Popup ---
interface ExitIntentPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-start bg-black bg-opacity-70 p-4 z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 bg-slate-200 hover:bg-slate-300 rounded-md w-8 h-8 flex items-center justify-center transition-colors z-10"
                        >
                            <X size={16} />
                        </button>
                        <span className="text-lg font-bold bg-emerald-600 text-white rounded-full p-2 px-4">Psst.</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3">
                            Before you go...
                        </h2>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            Get started in minutes - your dedicated server is ready to go. No credit card friction, just sign up and deploy.
                        </p>
                        <Link
                            href="https://app.trooper.so"
                            className="bg-emerald-600 text-white text-lg w-fit py-3 px-6 rounded-lg block hover:bg-emerald-700 transition-colors shadow-lg font-medium"
                            onClick={() => onClose()}
                        >
                            OK Lets get started
                        </Link>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- FAQ ---
interface FAQItem {
    question: string;
    answer: string;
}

const faqs: Record<string, FAQItem[]> = {
    Pricing: [
        {
            question: "Do I need my own API keys?",
            answer: "Yes. Trooper follows a bring-your-own-key model. You connect your own OpenAI, Anthropic, Gemini, or other provider keys. Model usage is billed separately — no markup, you pay providers directly at their rates.",
        },
        {
            question: "What is the difference between Solo, Cloud, and Enterprise?",
            answer: `Local Install is ${formatUsd(PRICING_USD.localLifetime)} one-time for a lifetime license on your machine — one workspace, no connected devices. Solo Cloud is ${formatUsd(PRICING_USD.cloudLifetime)} one-time for hosted team collaboration forever — also one workspace, no connected devices. Trooper Cloud is ${formatUsd(PRICING_USD.cloudStandardMonthly)}/mo (Cloud) or ${formatUsd(PRICING_USD.cloudPremiumMonthly)}/mo (Cloud Max) with multi-workspace support and unlimited connected devices. Enterprise is custom pricing with self-hosting, SSO, VPC, and dedicated support. All plans include unlimited agents and chats.`,
        },
        {
            question: "Does Trooper Cloud include hosting?",
            answer: "Yes. With Trooper Cloud, we host and manage the workspace, Always-on Virtual PC, and runtime. Your team gets a dedicated environment without managing any infrastructure.",
        },
        {
            question: "Can I self-host Trooper?",
            answer: "Yes. Enterprise customers deploy on their own infrastructure with private VPC, on-prem options, SSO, white-label branding, and custom security requirements. Solo plan users run on their own machine.",
        },
        {
            question: "Can I upgrade later from the lifetime deal?",
            answer: "Yes. The lifetime deal is designed for solo founders to get started quickly. As your needs grow, you can move to Cloud for team collaboration or Enterprise for self-hosted deployment.",
        },
        {
            question: "Are there discounts for startups or nonprofits?",
            answer: "Yes. We offer special discounts for students, startups, and nonprofits. Contact support@trooper.so with proof of eligibility.",
        },
        {
            question: "Can I cancel or switch plans anytime?",
            answer: "Yes. You can upgrade, downgrade, or cancel your plan at any time from your dashboard. Changes take effect in your next billing cycle.",
        },
    ],
    "AI Features": [
        {
            question: "What can the AI agents actually do?",
            answer: "Agents write and commit code to GitHub, create and review pull requests, browse any website, fill forms, extract data, send and read emails, run shell commands, query databases, process files, write documentation, and coordinate with other agents on complex multi-step workflows — all autonomously.",
        },
        {
            question: "What is the Always-on Virtual PC?",
            answer: "Every workspace includes a persistent virtual computer that runs 24/7. Agents use it to execute code, run scripts, browse the web, and manage files — even when you're not online. Like giving your AI employees their own dedicated workstation.",
        },
        {
            question: "How does multi-agent orchestration work?",
            answer: "Deploy multiple specialized agents that collaborate. A research agent gathers data, a coding agent writes the implementation, a review agent checks the code, a docs agent updates documentation — all running in parallel, sharing context through organizational memory.",
        },
        {
            question: "What is Adaptive Memory and System Memory?",
            answer: "Adaptive Memory means agents remember your preferences, project conventions, and past decisions across sessions — they get smarter over time. System Memory tracks every edit, deletion, and config change in your workspace, giving agents a complete audit trail of what changed, when, and why.",
        },
        {
            question: "What integrations are supported?",
            answer: "GitHub, Gmail, Slack, Discord, WhatsApp, Telegram, Signal, Salesforce, Linear, Trello, Jira, Notion, Figma, Stripe, Vercel, PostgreSQL, and any tool with an API. Plus 3,000+ OpenClaw skills from ClawHub for extending capabilities.",
        },
        {
            question: "Can agents run code and shell commands?",
            answer: "Yes. Agents execute code in any language (Python, Node.js, Bash, etc.), run shell commands, query databases, manage files, and interact with APIs — all within sandboxed environments on the Always-on Virtual PC.",
        },
        {
            question: "What is OpenClaw?",
            answer: "OpenClaw is the open-source AI execution engine powering Trooper. It handles agent orchestration, persistent memory, multi-agent collaboration, skill execution, and task management. Trooper provides a polished UI and managed infrastructure on top of it.",
        },
    ],
};

// --- FAQ Accordion ---
const FAQAccordion: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-slate-200">
            <button
                className="w-full text-left py-4 px-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium text-slate-900">{question}</span>
                <span className="flex-shrink-0 ml-2 text-slate-500">
                    {isOpen ? <X size={16} /> : <span className="text-lg">+</span>}
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-4 text-slate-600"
                    >
                        <p>{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- FAQ Section ---
const FAQSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Pricing");

    return (
        <div className="mt-20 max-w-7xl">
            <div className="px-4">
                <div className="text-start mb-10">
                    <h2 className="font-funneldisplay text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600 max-w-2xl">
                        Have a different question? Reach out to our support team by
                        <a
                            href="mailto:vaibhav@trooper.so"
                            className="text-emerald-600 hover:text-emerald-700 hover:underline px-2"
                        >
                            sending us an email
                        </a>
                        and we&apos;ll get back to you as soon as we can.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="flex justify-center p-4 border-b border-slate-200">
                        {Object.keys(faqs).map((tab) => (
                            <button
                                key={tab}
                                className={`px-4 py-2 mx-1 text-sm md:text-base font-medium rounded-md transition-colors ${activeTab === tab
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-100"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="divide-y divide-slate-200">
                        {faqs[activeTab].map((faq, index) => (
                            <FAQAccordion key={index} {...faq} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Pricing Component ---
const Pricing: React.FC = () => {
    const [showExitPopup, setShowExitPopup] = useState(false);
    const exitIntentShown = useRef(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !exitIntentShown.current) {
                setShowExitPopup(true);
                exitIntentShown.current = true;
            }
        };
        document.addEventListener("mouseout", handleMouseLeave);
        return () => document.removeEventListener("mouseout", handleMouseLeave);
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <ExitIntentPopup isOpen={showExitPopup} onClose={() => setShowExitPopup(false)} />
            <Header />

            <SectionShell eyebrow="PRICING" eyebrowNumber="01" bgClass="bg-white" clearSiteHeader>
                <SimplePricing showFullPricingLink={false} />
            </SectionShell>

            <SectionShell eyebrow="COMPARE PLANS" eyebrowNumber="02" bgClass="bg-slate-50">
                <PricingCompareTable />
            </SectionShell>

            <SectionShell eyebrow="FAQ" eyebrowNumber="03" bgClass="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12">
                    <FAQSection />
                </div>
            </SectionShell>
        </div>
    );
};

export default Pricing;
