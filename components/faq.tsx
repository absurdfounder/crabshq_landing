"use client";

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatUsd, PRICING_USD } from '@/lib/pricing';

interface FAQ {
  question: string;
  answer: string;
}

type FAQCategories = {
  [key: string]: FAQ[];
};

const faqs: FAQCategories = {
  General: [
    {
      question: "What is Trooper?",
      answer: "Trooper is an AI workforce platform powered by OpenClaw. You deploy teams of AI employees — agents that autonomously write code, manage GitHub repos, browse the web, send emails, run shell commands, and execute multi-step workflows using your own API keys.",
    },
    {
      question: "How is Trooper different from ChatGPT or Claude?",
      answer: "ChatGPT and Claude are single-model chat interfaces. Trooper gives you an entire AI workforce — multiple specialized agents that collaborate, share persistent memory, make real GitHub commits, control browsers, send emails, and run 24/7 on their own Always-on Virtual PC. It's not a chatbot, it's a team.",
    },
    {
      question: "What is OpenClaw?",
      answer: "OpenClaw is the open-source AI execution engine powering Trooper. It handles agent orchestration, persistent memory, multi-agent collaboration, skill execution, and task management. Trooper gives you a polished UI and managed infrastructure on top of OpenClaw.",
    },
    {
      question: "What AI models does Trooper support?",
      answer: "All major models. OpenAI (GPT-4, GPT-4o, o1), Anthropic (Claude 4, Sonnet, Haiku), Google (Gemini), and any other provider with an API. You bring your own keys and switch models anytime. It also supports Claude Code and Codex subscriptions.",
    },
    {
      question: "Do I need technical knowledge to use Trooper?",
      answer: "No. You assign tasks in plain language via chat. Trooper handles the execution — writing code, running commands, browsing the web, sending emails. The cloud plan manages all infrastructure for you. Power users can self-host for full control.",
    },
    {
      question: "What can the AI agents actually do?",
      answer: "Agents can write and commit code to GitHub, create and review pull requests, browse any website, fill forms, extract data, send and read emails, run shell commands, query databases, process files, manage projects, write documentation, and coordinate with other agents on complex multi-step workflows.",
    },
  ],
  "AI Features": [
    {
      question: "What is the Always-on Virtual PC?",
      answer: "Every Trooper workspace includes a persistent virtual computer that runs 24/7. Your agents use it to execute code, run scripts, browse the web, and manage files — even when you're not online. It's like giving your AI employees their own dedicated workstation.",
    },
    {
      question: "How does multi-agent orchestration work?",
      answer: "You can deploy multiple specialized AI agents that work together. A research agent gathers data, a coding agent writes the implementation, a review agent checks the code, and a docs agent updates documentation — all running in parallel, sharing context through organizational memory.",
    },
    {
      question: "What is Adaptive Memory?",
      answer: "Agents remember context across sessions. Your coding preferences, project conventions, past decisions, communication styles — all persist. Agents get smarter over time. You explain something once and it sticks permanently across all future interactions.",
    },
    {
      question: "What is Context Awareness?",
      answer: "AI always knows the current context — which project you're working on, what files are open, what was discussed previously, what other agents are doing. No need to re-explain your setup or repeat instructions.",
    },
    {
      question: "What is System Memory?",
      answer: "System Memory tracks everything that happens in your workspace — every edit, deletion, configuration change, and agent action. It gives agents a complete audit trail so they understand what changed, when, and why.",
    },
    {
      question: "What are OpenClaw Skills?",
      answer: "Skills are plugins that extend what agents can do. Over 3,000 community-built skills are available on ClawHub — covering coding, browser automation, data analysis, DevOps, testing, documentation, security, design, and more. You can also build custom skills for your internal tools.",
    },
    {
      question: "How does GitHub integration work?",
      answer: "Agents make real commits to your repositories, create branches, open and review pull requests, resolve merge conflicts, triage issues, detect bugs, suggest fixes, and integrate with GitHub Actions. It's not just reading code — agents actively contribute like a developer.",
    },
    {
      question: "Can agents browse the web?",
      answer: "Yes. Agents can navigate any website, fill forms, extract data, take screenshots, handle multi-tab sessions, and work with JavaScript-heavy apps. Use cases include web research, competitor monitoring, data extraction, and automating recurring web tasks.",
    },
    {
      question: "Can agents send and read emails?",
      answer: "Yes. With Gmail integration, agents can read incoming emails, categorize by urgency, compose context-aware replies using persistent memory, handle attachments, manage threads, and run scheduled email campaigns — all autonomously.",
    },
    {
      question: "What communication channels are supported?",
      answer: "You can interact with agents via the web app, Slack, Discord, WhatsApp, Telegram, and Signal. Different team members can use different platforms — agents maintain shared context across all channels.",
    },
  ],
  Pricing: [
    {
      question: "Do I need my own API keys?",
      answer: "Yes. Trooper follows a bring-your-own-key model. You connect your own OpenAI, Anthropic, Gemini, or other provider keys. Model usage is billed separately by those providers. This means no markup on AI usage — you pay providers directly at their rates.",
    },
    {
      question: "What is the difference between Solo, Cloud, and Enterprise?",
      answer: `Local Install is ${formatUsd(PRICING_USD.localLifetime)} one-time for a lifetime license on your machine — one workspace, no connected devices. Solo Cloud is ${formatUsd(PRICING_USD.cloudLifetime)} one-time for hosted team collaboration forever — also one workspace, no connected devices. Trooper Cloud is ${formatUsd(PRICING_USD.cloudStandardMonthly)}/mo (Cloud) or ${formatUsd(PRICING_USD.cloudPremiumMonthly)}/mo (Cloud Max) with multi-workspace support and unlimited connected devices. Enterprise is custom pricing with self-hosting, multi-workspace support, SSO, VPC, and dedicated support. All plans include unlimited agents and chats.`,
    },
    {
      question: "Does Trooper Cloud include hosting?",
      answer: "Yes. With Trooper Cloud, we host and manage the workspace, Always-on Virtual PC, and runtime. Your team gets a dedicated environment without managing any infrastructure.",
    },
    {
      question: "Can I self-host Trooper?",
      answer: "Yes. Enterprise customers can deploy Trooper on their own infrastructure with private VPC, on-prem options, SSO, white-label branding, and custom security requirements. Solo plan users run on their own machine.",
    },
    {
      question: "Can I upgrade later from the lifetime deal?",
      answer: "Yes. The lifetime deal is designed for solo founders to get started quickly. As your needs grow, you can move to Cloud for team collaboration or Enterprise for self-hosted deployment.",
    },
    {
      question: "Are there discounts for startups or nonprofits?",
      answer: "Yes. We offer special discounts for students, startups, and nonprofits. Contact support@trooper.so with proof of eligibility.",
    },
  ],
  Technical: [
    {
      question: "Do I need to manage any infrastructure?",
      answer: "No. Trooper Cloud handles all hosting, compute, and runtime. You connect your API keys and start deploying agents. Enterprise customers can self-host on their own infrastructure if needed.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Every organization gets an isolated workspace with encrypted connections. API keys are never stored on our servers. Enterprise customers get additional controls — SSO, private VPC, on-prem deployment, and custom security agreements.",
    },
    {
      question: "What integrations are supported?",
      answer: "GitHub, Gmail, Slack, Discord, WhatsApp, Telegram, Signal, Salesforce, Linear, Trello, Jira, Notion, Figma, Stripe, Vercel, PostgreSQL, and any tool with an API. Plus 3,000+ OpenClaw skills from ClawHub for extending capabilities further.",
    },
    {
      question: "Can agents run code and shell commands?",
      answer: "Yes. Agents execute code in any language (Python, Node.js, Bash, etc.), run shell commands, query databases, manage files, and interact with APIs — all within sandboxed execution environments on the Always-on Virtual PC.",
    },
    {
      question: "Can I build custom skills for my internal tools?",
      answer: "Yes. You can create proprietary skills that connect to your internal APIs, databases, and tools. Skills follow a simple structure (SKILL.md, _meta.json, setup.json) and can be composed into complex workflows.",
    },
    {
      question: "Can I export my data?",
      answer: "Yes. Workflows, agent configurations, and workspace data can be exported. Enterprise customers on self-hosted deployments have full ownership and control of all data.",
    },
  ],
};

interface FAQCellProps {
  question: string;
  answer: string;
  index: number;
  totalRows: number;
  totalCount: number;
}

const FAQCell: React.FC<FAQCellProps> = ({ question, answer, index, totalRows, totalCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  // For 2-col md grid: cells in left column (even index) need right hairline on md+.
  // Cells in last row drop bottom hairline.
  const isLeftCol = index % 2 === 0;
  const rowIndex = Math.floor(index / 2);
  const isLastRowDesktop = rowIndex === totalRows - 1;
  const isLastMobile = index === totalCount - 1;

  const borderClasses = [
    // Mobile: every cell gets a bottom hairline except the final cell
    !isLastMobile ? 'border-b border-slate-100' : '',
    // Desktop: bottom hairline unless on last row
    'md:border-b',
    isLastRowDesktop ? 'md:border-b-0' : '',
    // Desktop: right hairline only on left column
    isLeftCol ? 'md:border-r md:border-slate-100' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`relative group bg-white ${borderClasses}`}>
      <button
        className="w-full text-left px-4 py-4 sm:px-6 sm:py-6 flex items-start gap-3 sm:gap-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-semibold text-slate-900 text-[14px] sm:text-base leading-snug">
          {question}
        </span>
        <span
          className="font-mono text-slate-400 text-base leading-none mt-0.5 select-none"
          aria-hidden="true"
        >
          {isOpen ? '[−]' : '[+]'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-sm leading-relaxed text-slate-600">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('General');
  const activeFaqs = faqs[activeTab];
  const totalRows = Math.ceil(activeFaqs.length / 2);

  return (
    <div className="px-0 pt-4 sm:pt-6 pb-12 sm:pb-20 max-w-7xl mx-auto">
      <div className="max-w-2xl">
        <h2 className="font-funneldisplay text-[1.65rem] sm:text-4xl tracking-tight text-slate-900">
          Intel brief.
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-3">
          Missing intel? Transmit your question to{' '}
          <a
            href="mailto:vaibhav@trooper.so"
            className="text-trooper-700 hover:text-trooper hover:underline"
            target="_blank"
            rel="noopener"
          >
            vaibhav@trooper.so
          </a>
          .
        </p>
      </div>

      {/* Category tabs — flat mono text links with red underline on active */}
      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-b border-slate-100 sm:mt-8 sm:gap-x-6">
        {Object.keys(faqs).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`-mb-px pb-2.5 sm:pb-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.12em] sm:tracking-[0.15em] transition-colors ${
              activeTab === tab
                ? 'text-slate-900 border-b-2 border-trooper'
                : 'text-slate-500 hover:text-slate-800 border-b-2 border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2-column shared-border grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 border border-slate-100 bg-white">
        {activeFaqs.map((faq, index) => (
          <FAQCell
            key={`${activeTab}-${index}`}
            question={faq.question}
            answer={faq.answer}
            index={index}
            totalRows={totalRows}
            totalCount={activeFaqs.length}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
