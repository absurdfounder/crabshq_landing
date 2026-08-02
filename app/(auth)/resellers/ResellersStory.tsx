'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  ClipboardList,
  Mail,
  MessageSquare,
  Store,
  Users,
} from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import DarkSplitSection from '@/components/ui/DarkSplitSection';
import PixelButton from '@/components/ui/PixelButton';
import type { IndustryCard } from '@/lib/industryContent';

const ease = [0.22, 1, 0.36, 1] as const;

const workflows = [
  { icon: Mail, label: 'New enquiries', tint: 'bg-sky-50 text-sky-600' },
  { icon: ClipboardList, label: 'Quotes', tint: 'bg-amber-50 text-amber-600' },
  { icon: Calendar, label: 'Scheduling', tint: 'bg-emerald-50 text-emerald-600' },
  { icon: MessageSquare, label: 'Follow-ups', tint: 'bg-rose-50 text-rose-600' },
  { icon: Users, label: 'Customer updates', tint: 'bg-violet-50 text-violet-600' },
  { icon: Store, label: 'Admin', tint: 'bg-lime-50 text-lime-700' },
];

function FadeIn({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </motion.div>
  );
}

function ResellerSteps() {
  const steps = [
    {
      number: '01',
      title: 'Sit with the owner.',
      example:
        'Map enquiries, quotes, scheduling, follow-ups, and admin — the work that eats their week.',
    },
    {
      number: '02',
      title: 'Build it on Trooper.',
      example:
        'Move those loops into Mission Control. Customize agents and channels to how they already operate.',
    },
    {
      number: '03',
      title: 'Charge for the solution.',
      example:
        'They pay for Trooper. You bill $200–$500/month to run it. Recurring revenue they can see.',
    },
  ];

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section">
          From owner conversation
          <br />
          to recurring revenue.
        </h2>
        <p className="lede">
          High effort, low risk: set up something the client can clearly see — then get paid every
          month to keep it running.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease }}
            viewport={{ once: true, margin: '-20px' }}
            className="card"
          >
            <span className="block font-display text-2xl tabular-nums text-neutral-300 sm:text-3xl">
              {step.number}
            </span>
            <h3 className="mt-4 font-sans text-lg font-semibold text-ink sm:text-xl">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
              {step.example}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ResellersIndustries({ industries }: { industries: IndustryCard[] }) {
  return (
    <SectionShell id="industries" rhythm eyebrow="AI Front Office by industry" bgClass="bg-canvas">
      <FadeIn>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="h2-section">Playbooks ready for the businesses you sell to.</h2>
            <p className="lede">
              Each industry page is a starting point — call handling, booking, dispatch, and
              follow-up. Click through, then customize for your client.
            </p>
          </div>
          <PixelButton
            href="/industries"
            size="md"
            variant="outline"
            tone="dark"
            icon={<ArrowRight className="h-3.5 w-3.5" />}
            className="shrink-0"
          >
            View all industries
          </PixelButton>
        </div>
      </FadeIn>

      <div className="rail-bleed mt-10">
        <div className="dot-grid rounded-2xl border border-black/5 p-4 sm:p-5 md:p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, i) => (
              <FadeIn key={industry.slug} delay={Math.min(i, 8) * 0.03}>
                <Link
                  href={industry.href}
                  className="card-flush group flex h-full flex-col transition-transform duration-200 hover:scale-[1.015]"
                >
                  <div className="relative h-44 overflow-hidden border-b border-black/5 sm:h-48">
                    <Image
                      src={industry.coverImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-2.5 py-1 text-[13px] font-medium text-neutral-800 shadow-xs backdrop-blur">
                      {industry.name}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
                    <h3 className="text-base font-semibold text-balance text-neutral-800 group-hover:text-fern-800 sm:text-lg">
                      {industry.title}
                    </h3>
                    <p className="card-body flex-1 line-clamp-2">{industry.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-fern-700">
                      Open playbook
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

export function ResellersFaq() {
  const items = [
    {
      question: 'How is this different from the affiliate program?',
      answer:
        'Affiliates earn commission when someone signs up through their link. Resellers build and sell custom Trooper setups to their own clients, set their own prices, and keep the service margin.',
    },
    {
      question: 'Do my clients pay Trooper directly?',
      answer:
        'Typically yes — clients pay for Trooper Mission Control, and you charge them separately for setup, customization, and ongoing operation. We’ll confirm the right commercial model when you apply.',
    },
    {
      question: 'Who is a good fit?',
      answer:
        'Consultants, freelancers, agencies, and operators who already work with local or non-tech businesses and can sit with an owner to map real workflows.',
    },
    {
      question: 'What kinds of businesses work best?',
      answer:
        'Home services and field businesses — HVAC, plumbing, roofing, cleaners, landscapers, and similar — where missed calls and admin still run the day.',
    },
    {
      question: 'How do I apply?',
      answer:
        'Click Apply and email us. Tell us who you are, the clients you serve, and how you’d use Trooper. We’ll follow up from support@trooper.so.',
    },
  ];

  return (
    <SectionShell rhythm eyebrow="FAQ" bgClass="bg-canvas-warm">
      <FadeIn>
        <h2 className="h2-section">Questions before you apply.</h2>
        <p className="lede">
          Still unsure? Email{' '}
          <a href="mailto:support@trooper.so" className="text-fern-700 hover:underline">
            support@trooper.so
          </a>
          .
        </p>
      </FadeIn>
      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => (
          <FaqItem key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>
    </SectionShell>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card !p-0">
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
          className={`mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
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
  );
}

/** Opportunity + process + workflows — the beats unique to resellers. */
export default function ResellersStory() {
  return (
    <>
      <DarkSplitSection>
        <div className="py-12 sm:py-20">
          <FadeIn>
            <p className="kicker-dark">The opportunity</p>
            <h2 className="h2-section-dark mt-2">
              Ten clients compounds.
              <br />
              Twenty gets you close to $10k / month.
            </h2>
            <p className="lede-dark">
              Package Mission Control for a local business. Charge $200–$500 / month to run it. For
              the owner, it’s often cheaper than hiring another employee.
            </p>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { value: '$200–$500', label: 'Typical monthly fee per client' },
              { value: '10 clients', label: 'Where recurring revenue starts compounding' },
              { value: '~$10k / mo', label: 'Around 20 clients at mid-range pricing' },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.06}>
                <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10 sm:p-7">
                  <p className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-white/55">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </DarkSplitSection>

      <SectionShell rhythm eyebrow="How it works" bgClass="bg-white">
        <ResellerSteps />
      </SectionShell>

      <SectionShell rhythm eyebrow="What you automate" bgClass="bg-canvas-warm">
        <FadeIn>
          <h2 className="h2-section">The repetitive parts of a real business.</h2>
          <p className="lede">
            Sit with the owner, map how work flows today, then move the manual loops into Mission
            Control.
          </p>
        </FadeIn>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {workflows.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.label} delay={i * 0.04}>
                <div className="card flex h-full flex-col items-start gap-4 !p-5 transition-transform duration-200 hover:scale-[1.02]">
                  <span className={`flex size-11 items-center justify-center rounded-xl ${item.tint}`}>
                    <Icon className="size-5" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </SectionShell>
    </>
  );
}
