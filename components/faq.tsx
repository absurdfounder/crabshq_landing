"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BookOpen, ShoppingBag, Lock, AlignLeft, ArrowRight, LucideIcon } from 'lucide-react';


interface FAQ {
  question: string;
  answer: string;
}

type FAQCategories = {
  [key: string]: FAQ[];
}

const faqs: FAQCategories = {
  General: [
    {
      question: "What is Crabs HQ?",
      answer: "Crabs HQ is an AI workforce platform powered by OpenClaw. You deploy teams of AI employees — agents that autonomously write code, manage GitHub repos, browse the web, send emails, run shell commands, and execute multi-step workflows using your own API keys.",
    },
    {
      question: "How is Crabs HQ different from ChatGPT or Claude?",
      answer: "ChatGPT and Claude are single-model chat interfaces. Crabs HQ gives you an entire AI workforce — multiple specialized agents that collaborate, share persistent memory, make real GitHub commits, control browsers, send emails, and run 24/7 on their own Always-on Virtual PC. It's not a chatbot, it's a team.",
    },
    {
      question: "What is OpenClaw?",
      answer: "OpenClaw is the open-source AI execution engine powering Crabs HQ. It handles agent orchestration, persistent memory, multi-agent collaboration, skill execution, and task management. CrabsHQ gives you a polished UI and managed infrastructure on top of OpenClaw.",
    },
    {
      question: "What AI models does Crabs HQ support?",
      answer: "All major models. OpenAI (GPT-4, GPT-4o, o1), Anthropic (Claude 4, Sonnet, Haiku), Google (Gemini), and any other provider with an API. You bring your own keys and switch models anytime. It also supports Claude Code and Codex subscriptions.",
    },
    {
      question: "Do I need technical knowledge to use Crabs HQ?",
      answer: "No. You assign tasks in plain language via chat. Crabs HQ handles the execution — writing code, running commands, browsing the web, sending emails. The cloud plan manages all infrastructure for you. Power users can self-host for full control.",
    },
    {
      question: "What can the AI agents actually do?",
      answer: "Agents can write and commit code to GitHub, create and review pull requests, browse any website, fill forms, extract data, send and read emails, run shell commands, query databases, process files, manage projects, write documentation, and coordinate with other agents on complex multi-step workflows.",
    },
  ],
  "AI Features": [
    {
      question: "What is the Always-on Virtual PC?",
      answer: "Every Crabs HQ workspace includes a persistent virtual computer that runs 24/7. Your agents use it to execute code, run scripts, browse the web, and manage files — even when you're not online. It's like giving your AI employees their own dedicated workstation.",
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
      answer: "Yes. Crabs HQ follows a bring-your-own-key model. You connect your own OpenAI, Anthropic, Gemini, or other provider keys. Model usage is billed separately by those providers. This means no markup on AI usage — you pay providers directly at their rates.",
    },
    {
      question: "What is the difference between Solo, Cloud, and Enterprise?",
      answer: "Solo is a one-time $79 lifetime deal for individual founders with all core AI features and a license for 1 org. Cloud is $99/mo with team seats, multi-org support, hosted infrastructure, and collaboration features. Enterprise is custom pricing with self-hosting, multi-org support, SSO, VPC, and dedicated support. All plans include unlimited agents, chats, and devices.",
    },
    {
      question: "Does CrabsHQ Cloud include hosting?",
      answer: "Yes. With CrabsHQ Cloud, we host and manage the workspace, Always-on Virtual PC, and runtime. Your team gets a dedicated environment without managing any infrastructure.",
    },
    {
      question: "Can I self-host Crabs HQ?",
      answer: "Yes. Enterprise customers can deploy Crabs HQ on their own infrastructure with private VPC, on-prem options, SSO, white-label branding, and custom security requirements. Solo plan users run on their own machine.",
    },
    {
      question: "Can I upgrade later from the lifetime deal?",
      answer: "Yes. The lifetime deal is designed for solo founders to get started quickly. As your needs grow, you can move to Cloud for team collaboration or Enterprise for self-hosted deployment.",
    },
    {
      question: "Are there discounts for startups or nonprofits?",
      answer: "Yes. We offer special discounts for students, startups, and nonprofits. Contact support@crabshq.com with proof of eligibility.",
    },
  ],
  Technical: [
    {
      question: "Do I need to manage any infrastructure?",
      answer: "No. CrabsHQ Cloud handles all hosting, compute, and runtime. You connect your API keys and start deploying agents. Enterprise customers can self-host on their own infrastructure if needed.",
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
  ]
};


interface FAQAccordionProps {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border p-2 rounded-md bg-white">
      <button
        className="w-full text-left p-4 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-slate-900 text-lg">{question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 text-slate-500"
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("General");

  return (
    <div className="mx-auto mt-10">
      <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center sm:max-w-2xl lg:mx-auto">
          <h2 className="font-funneldisplay text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-base font-normal text-slate-600 mt-4 sm:text-lg">
            Have a different question and can't find the answer you're looking for? Reach out to us by
            <a 
              href="mailto:vaibhav@crabshq.com" 
              className="text-red-800 hover:text-red-500 hover:underline px-2"
              target="_blank" rel="noopener"  
              
            >
              sending us an email.
            </a>
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center mb-8 flex-wrap">
            {Object.keys(faqs).map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 font-semibold text-lg rounded-md m-2 font-roboto-mono ${
                  activeTab === tab 
                    ? "bg-red-700 text-red-50" 
                    : "text-slate-700 hover:bg-red-100"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          <div className="space-y-6">
            {faqs[activeTab].map((faq, index) => (
              <FAQAccordion key={index} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
