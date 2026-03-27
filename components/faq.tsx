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
  Website: [
    {
      question: "What is Wondersites?",
      answer: "Wondersites is an all-in-one, no-code website builder that transforms your Notion pages into fully functional, professional websites. It supports blogs, help centers, directories, landing pages, and more, all without writing a single line of code.",
    },
    {
      question: "Can I use my own domain with Wondersites?",
      answer: "Yes. Wondersites allows you to connect a custom domain to your website, making your site look more professional and aligned with your brand.",
    },
    {
      question: "What types of websites can I build with Wondersites?",
      answer: "You can build a variety of websites including blogs, directories, help centers, landing pages, and marketplaces using Notion as your CMS.",
    },
    {
      question: "Is SEO optimization available?",
      answer: "Yes, Wondersites includes built-in SEO tools to ensure your website is optimized for search engines including fast loading speeds and metadata customization.",
    },
    {
      question: "How does Wondersites handle content updates from Notion?",
      answer: "Your site syncs with Notion, meaning any updates you make in Notion will reflect on your live website in real-time.",
    },
    {
      question: "Can I add custom code?",
      answer: "Yes. For users who want advanced control, Wondersites supports adding custom code to enhance functionality or design.",
    },
    {
      question: "Is Wondersites suitable for non-technical users?",
      answer: "Absolutely. Wondersites is designed to be user-friendly and doesn't require any technical knowledge. It's perfect for creators, startups, and businesses.",
    },
    {
      question: "Can I track website analytics?",
      answer: "Yes. Wondersites comes with privacy-focused analytics, letting you monitor visitor activity without compromising data privacy.",
    },
    {
      question: "Can I build a help center or documentation site?",
      answer: "Yes. You can build a professional help center similar to HelpKit.so, powered entirely by Notion pages and customizable through Wondersites.",
    },
    {
      question: "Can I create a membership or subscription-based website?",
      answer: "Yes, Wondersites supports gated content and user-level access, enabling you to build membership-based sites with ease.",
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
      "Solo is a one-time lifetime deal for individual founders using their own API keys. Cloud is our hosted subscription where we manage the infrastructure for you. Enterprise is a private self-hosted deployment for companies that want full control over infrastructure, security, and branding.",
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
      question: "Do I need to host my site separately?",
      answer: "No. Hosting is managed entirely by Wondersites. You don’t need to worry about servers or technical setup.",
    },
    {
      question: "Is Wondersites optimized for speed?",
      answer: "Yes. All Wondersites are optimized for performance and speed to ensure a seamless browsing experience and better SEO.",
    },
    {
      question: "Can I integrate third-party tools?",
      answer: "Yes. You can integrate various third-party services like email tools, analytics, and chat widgets to extend your site's functionality.",
    },
    {
      question: "Is Wondersites secure?",
      answer: "Yes. Wondersites follows best practices for web security, including HTTPS and data protection protocols.",
    },
    {
      question: "Does Wondersites support mobile optimization?",
      answer: "Yes. Every site built with Wondersites is fully responsive and looks great on all devices.",
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
  const [activeTab, setActiveTab] = useState<string>("Website");

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
