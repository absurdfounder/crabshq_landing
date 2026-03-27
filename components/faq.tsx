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
      answer: "Crabs HQ is an AI workspace platform powered by OpenClaw. It lets you run AI agents, workflows, and automations using your own API keys from providers like OpenAI, Anthropic, and Google.",
    },
    {
      question: "How is Crabs HQ different from ChatGPT or Claude?",
      answer: "ChatGPT and Claude are single-model chat interfaces. Crabs HQ is a workspace where you can run multiple AI agents, build persistent workflows, connect to tools like GitHub and Gmail, and deploy automations that run 24/7.",
    },
    {
      question: "Do I need technical knowledge to use Crabs HQ?",
      answer: "No. Crabs HQ is designed for founders and teams who want to use AI without managing infrastructure. The cloud plan handles everything for you. Power users can self-host for full control.",
    },
    {
      question: "What AI models does Crabs HQ support?",
      answer: "Crabs HQ works with OpenAI (GPT-4, GPT-4o), Anthropic (Claude), Google (Gemini), and other providers. You bring your own API keys and choose which models to use.",
    },
    {
      question: "Can I use Crabs HQ for my team?",
      answer: "Yes. The Cloud plan includes 5 team seats with shared workspaces, collaborative memory, and admin controls. Enterprise customers can add unlimited seats with volume pricing.",
    },
    {
      question: "What is OpenClaw?",
      answer: "OpenClaw is the AI execution engine behind Crabs HQ. It powers task execution, agent orchestration, and persistent workflows across your workspace.",
    },
  ],
  Pricing: [
  {
    question: "Do I need my own API keys?",
    answer:
      "Yes. Crabs HQ follows a bring-your-own-key model, so you connect your own OpenAI, Anthropic, Gemini, or other provider keys. Model usage is billed separately by those providers.",
  },
  {
    question: "What is the difference between Solo, Cloud, and Enterprise?",
    answer:
      "Solo is a one-time lifetime deal for individual founders. You self-host on your own machine using your own API keys. Cloud is our hosted subscription where we manage the infrastructure for your team. Enterprise is a private self-hosted deployment for companies that want full control over infrastructure, security, and branding. All plans include Mac, Windows, iOS, and Android apps.",
  },
  {
    question: "Does CrabsHQ Cloud include hosting?",
    answer:
      "Yes. With CrabsHQ Cloud, we host and manage the workspace, cloud computer, and runtime so your team can focus on using workflows instead of operating infrastructure.",
  },
  {
    question: "Can I self-host Crabs HQ for my company?",
    answer:
      "Yes. Enterprise customers can deploy Crabs HQ on their own infrastructure with private networking, internal integrations, and custom security requirements.",
  },
  {
    question: "Can I upgrade later from the lifetime deal?",
    answer:
      "Yes. The lifetime deal is designed for solo founders to get started quickly. As your needs grow, you can move to Cloud for hosted workflows or Enterprise for self-hosted deployment.",
  },
],
  
  Technical: [
    {
      question: "Do I need to manage any infrastructure?",
      answer: "No. With CrabsHQ Cloud, we handle all hosting, compute, and runtime. You just connect your API keys and start building. Enterprise customers can self-host on their own infrastructure if needed.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Crabs HQ follows security best practices including encrypted connections, isolated workspaces, and no storage of your API keys on our servers. Enterprise customers get additional controls like SSO and private VPC deployment.",
    },
    {
      question: "Can I integrate third-party tools and APIs?",
      answer: "Yes. Crabs HQ supports integrations with GitHub, Gmail, browsers, and external APIs. Enterprise customers can build custom integrations for internal tools and workflows.",
    },
    {
      question: "What happens if I hit usage limits?",
      answer: "Crabs HQ does not limit your AI model usage since you use your own API keys. Cloud compute and workspace limits depend on your plan, and you can upgrade anytime.",
    },
    {
      question: "Can I export my data?",
      answer: "Yes. Your workflows, agents, and workspace data can be exported. Enterprise customers on self-hosted deployments have full ownership and control of all data.",
    }
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
