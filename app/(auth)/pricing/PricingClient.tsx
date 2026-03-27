"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, X, Users, Sparkles, HelpCircle, Globe, Headphones,
    Bot, MessageSquare, Monitor, Terminal, Brain, Eye, History,
    ShieldCheck, Puzzle, Smartphone, Cpu, Network, GitBranch,
    Server, Lock, BadgeCheck, Settings, Mail, Share2, Database,
    Workflow, Palette, UserPlus, FileCheck, Wrench, DollarSign,
} from 'lucide-react';
import Header from "@/components/ui/header";
import SimplePricing from "@/components/SimplePricing";
import FAQ from "@/components/faq";

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
                        <span className="text-lg font-bold bg-red-600 text-white rounded-full p-2 px-4">Psst.</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-3">
                            Before you go...
                        </h2>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            Get started in minutes - your dedicated server is ready to go. No credit card friction, just sign up and deploy.
                        </p>
                        <Link
                            href="https://app.crabshq.com"
                            className="bg-red-600 text-white text-lg w-fit py-3 px-6 rounded-lg block hover:bg-red-700 transition-colors shadow-lg font-medium"
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

// --- Comparison Table Types ---
type ComparisonCell = boolean | { text: string; sub?: string };

interface ComparisonRow {
    feature: string;
    solo: ComparisonCell;
    cloud: ComparisonCell;
    enterprise: ComparisonCell;
}

interface ComparisonCategory {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    iconColor: string;
    rows: ComparisonRow[];
}

// --- Comparison Table Data (Solo vs Cloud vs Enterprise) ---
const comparisonCategories: ComparisonCategory[] = [
    {
        title: "Core AI",
        icon: Sparkles,
        iconColor: "text-violet-500",
        rows: [
            { feature: "Unlimited Agents", solo: true, cloud: true, enterprise: true },
            { feature: "Unlimited Chats", solo: true, cloud: true, enterprise: true },
            { feature: "Unlimited Devices", solo: true, cloud: true, enterprise: true },
            { feature: "All AI Models (OpenAI, Claude, Gemini, etc.)", solo: true, cloud: true, enterprise: true },
            { feature: "Claude Code & Codex support", solo: true, cloud: true, enterprise: true },
            { feature: "Multi-agent orchestration", solo: true, cloud: true, enterprise: true },
        ],
    },
    {
        title: "Memory & Context",
        icon: Brain,
        iconColor: "text-green-500",
        rows: [
            { feature: "Adaptive Memory", solo: true, cloud: true, enterprise: true },
            { feature: "Context Awareness", solo: true, cloud: true, enterprise: true },
            { feature: "System Memory", solo: true, cloud: true, enterprise: true },
            { feature: "Shared team knowledge base", solo: false, cloud: true, enterprise: true },
            { feature: "Shared company memory", solo: false, cloud: false, enterprise: true },
        ],
    },
    {
        title: "Platform & Tools",
        icon: Globe,
        iconColor: "text-cyan-500",
        rows: [
            { feature: "Always-on Virtual PC", solo: true, cloud: true, enterprise: true },
            { feature: "3,000+ OpenClaw Skills", solo: true, cloud: true, enterprise: true },
            { feature: "Browser Automation", solo: true, cloud: true, enterprise: true },
            { feature: "GitHub integration (commits, PRs, reviews)", solo: true, cloud: true, enterprise: true },
            { feature: "Email automation", solo: false, cloud: true, enterprise: true },
            { feature: "Shared workflows across team", solo: false, cloud: true, enterprise: true },
            { feature: "Deploy apps, automations, internal tools", solo: false, cloud: true, enterprise: true },
        ],
    },
    {
        title: "Apps & Devices",
        icon: Smartphone,
        iconColor: "text-slate-600",
        rows: [
            { feature: "Mac app", solo: true, cloud: true, enterprise: true },
            { feature: "Windows app", solo: true, cloud: true, enterprise: true },
            { feature: "iOS app", solo: true, cloud: true, enterprise: true },
            { feature: "Android app", solo: true, cloud: true, enterprise: true },
        ],
    },
    {
        title: "Team & Collaboration",
        icon: Users,
        iconColor: "text-red-500",
        rows: [
            { feature: "Team seats", solo: { text: "1 user" }, cloud: { text: "5 included", sub: "+$8/seat/mo" }, enterprise: { text: "Custom" } },
            { feature: "Invite teammates & assign roles", solo: false, cloud: true, enterprise: true },
            { feature: "Team collaboration & shared memory", solo: false, cloud: true, enterprise: true },
            { feature: "Admin controls & permissions", solo: false, cloud: true, enterprise: true },
        ],
    },
    {
        title: "Security & Compliance",
        icon: ShieldCheck,
        iconColor: "text-blue-500",
        rows: [
            { feature: "Data encryption", solo: true, cloud: true, enterprise: true },
            { feature: "SSO and enterprise auth", solo: false, cloud: false, enterprise: true },
            { feature: "Private VPC / on-prem", solo: false, cloud: false, enterprise: true },
            { feature: "Security reviews & custom agreements", solo: false, cloud: false, enterprise: true },
        ],
    },
    {
        title: "Deployment",
        icon: Server,
        iconColor: "text-indigo-500",
        rows: [
            { feature: "Self-hosted", solo: false, cloud: false, enterprise: true },
            { feature: "Cloud-hosted by CrabsHQ", solo: false, cloud: true, enterprise: false },
            { feature: "White-label & custom domain", solo: false, cloud: false, enterprise: true },
            { feature: "Custom seat volume pricing", solo: false, cloud: false, enterprise: true },
            { feature: "Dedicated onboarding & migration", solo: false, cloud: false, enterprise: true },
        ],
    },
    {
        title: "Support",
        icon: Headphones,
        iconColor: "text-amber-500",
        rows: [
            { feature: "Community support", solo: true, cloud: true, enterprise: true },
            { feature: "Priority email support", solo: false, cloud: true, enterprise: true },
            { feature: "Priority support with SLA", solo: false, cloud: false, enterprise: true },
        ],
    },
];

// --- FAQ ---
interface FAQItem {
    question: string;
    answer: string;
}

const faqs: Record<string, FAQItem[]> = {
    Pricing: [
        {
            question: "Do I need my own API keys?",
            answer: "Yes. Crabs HQ follows a bring-your-own-key model, so you connect your own OpenAI, Anthropic, Gemini, or other provider keys. Model usage is billed separately by those providers.",
        },
        {
            question: "What is the difference between Solo, Cloud, and Enterprise?",
            answer: "Solo is a one-time $79 lifetime deal for individual founders with all core features. Cloud is $99/mo with team seats, hosted infrastructure, and collaboration features. Enterprise is custom pricing with self-hosting, SSO, VPC, and dedicated support.",
        },
        {
            question: "Does CrabsHQ Cloud include hosting?",
            answer: "Yes. With CrabsHQ Cloud, we host and manage the workspace, virtual PC, and runtime so your team can focus on using workflows instead of operating infrastructure.",
        },
        {
            question: "Can I upgrade later from the lifetime deal?",
            answer: "Yes. The lifetime deal is designed for solo founders to get started quickly. As your needs grow, you can move to Cloud for team features or Enterprise for self-hosted deployment.",
        },
        {
            question: "Are there discounts for startups or nonprofits?",
            answer: "Yes! We offer special discounts. Please contact support@crabshq.com with proof of eligibility to apply.",
        },
        {
            question: "Can I cancel or switch plans anytime?",
            answer: "Yes, you can upgrade, downgrade, or cancel your plan at any time from your dashboard. Changes will take effect in your next billing cycle.",
        },
    ],
    Features: [
        {
            question: "What is Crabs HQ?",
            answer: "Crabs HQ is an AI workspace platform powered by OpenClaw. It lets you run AI agents, workflows, and automations using your own API keys from providers like OpenAI, Anthropic, and Google.",
        },
        {
            question: "How is Crabs HQ different from ChatGPT or Claude?",
            answer: "ChatGPT and Claude are single-model chat interfaces. Crabs HQ is a workspace where you can run multiple AI agents, build persistent workflows, connect to tools like GitHub and Gmail, and deploy automations that run 24/7.",
        },
        {
            question: "What AI models does Crabs HQ support?",
            answer: "Crabs HQ works with OpenAI (GPT-4, GPT-4o), Anthropic (Claude), Google (Gemini), and other providers. You bring your own API keys and choose which models to use.",
        },
        {
            question: "What is OpenClaw?",
            answer: "OpenClaw is the AI execution engine behind Crabs HQ. It powers task execution, agent orchestration, and persistent workflows across your workspace.",
        },
    ]
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
                            href="mailto:vaibhav@crabshq.com"
                            className="text-red-600 hover:text-red-700 hover:underline px-2"
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
                                    ? "bg-red-100 text-red-800"
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

// --- Comparison Cell Renderer ---
const CellRenderer: React.FC<{ cell: ComparisonCell }> = ({ cell }) => {
    if (typeof cell === "boolean") {
        return cell ? (
            <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={1.5} />
        ) : (
            <X className="w-5 h-5 text-slate-300 shrink-0" strokeWidth={1.5} />
        );
    }
    return (
        <div className="flex flex-col text-center items-center">
            <span className="text-slate-700 text-sm">{cell.text}</span>
            {cell.sub && <span className="text-slate-500 text-xs">{cell.sub}</span>}
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

            {/* SimplePricing section */}
            <div className="pt-16">
                <SimplePricing />
            </div>

            {/* Comparison Table */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                {/* Desktop comparison */}
                <div className="hidden lg:block mb-12 sm:mb-20">
                    <h4 className="text-xl sm:text-2xl font-bold text-slate-900 text-start mb-6 sm:mb-8">
                        Compare plans
                    </h4>
                    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        {/* Sticky header */}
                        <div className="sticky top-16 z-10 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 py-4">
                                <div className="font-medium text-slate-600">Features</div>
                                <div className="text-center font-medium text-slate-600">Solo Founder</div>
                                <div className="text-center font-medium text-slate-900">CrabsHQ Cloud</div>
                                <div className="text-center font-medium text-slate-600">Enterprise</div>
                            </div>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {comparisonCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <div key={category.title}>
                                        <div className="border-b border-slate-100 bg-slate-50/50">
                                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 py-4">
                                                <h3 className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500`}>
                                                    <Icon className={`w-[18px] h-[18px] ${category.iconColor}`} />
                                                    {category.title}
                                                </h3>
                                                <div />
                                                <div />
                                                <div />
                                            </div>
                                        </div>
                                        {category.rows.map((row) => (
                                            <div key={row.feature} className="border-b border-slate-100">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 items-center py-3">
                                                    <div className="text-slate-700 text-sm">{row.feature}</div>
                                                    <div className="flex justify-center"><CellRenderer cell={row.solo} /></div>
                                                    <div className="flex justify-center"><CellRenderer cell={row.cloud} /></div>
                                                    <div className="flex justify-center"><CellRenderer cell={row.enterprise} /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                            {/* Price row */}
                            <div className="border-b border-slate-100">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 items-center py-3">
                                    <div className="font-medium text-sm text-slate-900">Price</div>
                                    <div className="flex justify-center">
                                        <span className="text-sm text-slate-900 font-semibold">$79 one-time</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="text-sm text-slate-900 font-semibold">$99/mo</span>
                                    </div>
                                    <div className="flex justify-center">
                                        <span className="text-sm text-slate-900 font-semibold">Custom</span>
                                    </div>
                                </div>
                            </div>
                            {/* CTA row */}
                            <div className="border-b border-slate-200 bg-slate-50/30">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 py-6">
                                    <div />
                                    <div className="flex justify-center px-4">
                                        <Link
                                            href="https://app.crabshq.com"
                                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                                        >
                                            Get lifetime deal
                                        </Link>
                                    </div>
                                    <div className="flex justify-center px-4">
                                        <Link
                                            href="https://app.crabshq.com"
                                            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
                                        >
                                            Start with cloud
                                        </Link>
                                    </div>
                                    <div className="flex justify-center px-4">
                                        <Link
                                            href="https://cal.com/crabshq/setup-call"
                                            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
                                        >
                                            Talk to sales
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile comparison - stacked cards */}
                <div className="lg:hidden mb-12">
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Compare plans</h4>
                    {comparisonCategories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <div key={category.title} className="mb-6">
                                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
                                    <Icon className={`w-4 h-4 ${category.iconColor}`} />
                                    {category.title}
                                </h3>
                                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden divide-y divide-slate-100">
                                    {category.rows.map((row) => (
                                        <div key={row.feature} className="px-4 py-3">
                                            <div className="text-sm font-medium text-slate-800 mb-2">{row.feature}</div>
                                            <div className="grid grid-cols-3 gap-2 text-xs">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-slate-400">Solo</span>
                                                    <CellRenderer cell={row.solo} />
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-slate-400">Cloud</span>
                                                    <CellRenderer cell={row.cloud} />
                                                </div>
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-slate-400">Enterprise</span>
                                                    <CellRenderer cell={row.enterprise} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ */}
                <FAQSection />
            </div>
        </div>
    );
};

export default Pricing;
