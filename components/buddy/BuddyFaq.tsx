'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    question: 'What is Buddy?',
    answer:
      'Buddy is Trooper’s personal agent — an iMessage assistant with its own computer. Text it tasks; it browses, runs commands, uses your tools, and comes back when it needs your approval.',
  },
  {
    question: 'How is Buddy different from Workforce?',
    answer:
      'Workforce is multiplayer: teams of specialized troopers that coordinate on org work. Buddy is one personal agent simplified for you — same computer power, no team to manage.',
  },
  {
    question: 'Is it just a chatbot on iMessage?',
    answer:
      'No. Buddy gets a full personal computer — browser, terminal, files, and desktop apps — so it can finish work, not only answer questions.',
  },
  {
    question: 'Can Buddy use my existing tools?',
    answer:
      'Yes. Connect the apps you already use. If it has an API, Buddy can reach it — email, calendar, docs, code hosts, and more.',
  },
  {
    question: 'Can Buddy make payments?',
    answer:
      'Yes. Buddy can run agentic payments through Stripe when you grant approval — nothing sensitive ships without your say.',
  },
  {
    question: 'Does it support MCP and CLIs?',
    answer:
      'Yes. Add custom MCPs or CLIs so Buddy can use tools directly instead of only clicking through websites.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Your workspace is isolated. API keys stay yours. Sensitive actions wait in Human Review until you release them.',
  },
] as const

function FaqCell({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-white shadow-xs ring-1 ring-black/5">
      <button
        type="button"
        className="flex w-full items-start gap-3 px-5 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="flex-1 text-[15px] font-semibold leading-snug text-neutral-800 sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-500 sm:px-6 sm:pb-6">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function BuddyFaq() {
  return (
    <div>
      <div className="max-w-2xl">
        <h2 className="h2-section">Questions.</h2>
        <p className="lede">
          Missing something? Email{' '}
          <a
            href="mailto:vaibhav@trooper.so"
            className="text-trooper hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            vaibhav@trooper.so
          </a>
          .
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
        {FAQS.map((faq) => (
          <FaqCell key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  )
}
