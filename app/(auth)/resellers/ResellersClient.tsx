'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  Mail,
  MessageSquare,
  Store,
  Users,
} from 'lucide-react';
import Header from '@/components/ui/header';
import TrooperLogo from '@/components/ui/TrooperLogo';
import PixelButton from '@/components/ui/PixelButton';
import { getIndustryCards } from '@/lib/industryContent';

const APPLY_MAILTO =
  'mailto:support@trooper.so?subject=Reseller%20Program%20Application&body=Hi%20Trooper%20team%2C%0A%0AI%27d%20like%20to%20apply%20to%20the%20reseller%20program.%0A%0AName%3A%0ACompany%20%2F%20practice%3A%0AWebsite%3A%0ANiche%20or%20client%20types%3A%0A%0AThanks!';

const ease = [0.22, 1, 0.36, 1] as const;
const PX = 'px-4 sm:px-6 lg:px-8';

const steps = [
  {
    number: '01',
    title: 'Sit with the owner.',
    example:
      'Walk through enquiries, quotes, scheduling, follow-ups, and admin. Find the repetitive work that eats their week.',
  },
  {
    number: '02',
    title: 'Build it on Trooper.',
    example:
      'Move those loops into Mission Control. Customize agents, channels, and automations to match how they already operate.',
  },
  {
    number: '03',
    title: 'Charge for the solution.',
    example:
      'They pay for Trooper. You bill $200–$500/month to run it. Recurring revenue tied to work they can see and feel.',
  },
];

const workflows = [
  { icon: Mail, label: 'New enquiries', tint: 'bg-sky-50 text-sky-600' },
  { icon: ClipboardList, label: 'Quotes', tint: 'bg-amber-50 text-amber-600' },
  { icon: Calendar, label: 'Scheduling', tint: 'bg-emerald-50 text-emerald-600' },
  { icon: MessageSquare, label: 'Follow-ups', tint: 'bg-rose-50 text-rose-600' },
  { icon: Users, label: 'Customer updates', tint: 'bg-violet-50 text-violet-600' },
  { icon: Store, label: 'Admin', tint: 'bg-lime-50 text-lime-700' },
];

const painMoments = [
  {
    title: 'Owners drowning in the inbox',
    body: 'Missed calls, unread quotes, and follow-ups that never leave sticky notes — while the truck is already on site.',
  },
  {
    title: 'They feel AI is “for tech companies”',
    body: 'Hair salons, renovation shops, and field crews don’t want a chatbot. They want less admin before Friday.',
  },
  {
    title: 'You need recurring revenue, not one-offs',
    body: 'Project gigs end. A Mission Control setup they rely on every day becomes a retainer they understand.',
  },
];

const whyResell = [
  {
    title: 'You set the price',
    description:
      'Sell Trooper as your custom front office. Charge what the workflow is worth — not a fixed referral cut.',
  },
  {
    title: 'High effort, low risk',
    description:
      'You’re packaging real operational work into something clients can see. Sticky MRR, not speculative AI demos.',
  },
  {
    title: 'Clear client value',
    description:
      'Fewer missed leads, faster quotes, less admin. Often enough saved labor to avoid hiring another person.',
  },
  {
    title: 'Playbooks by industry',
    description:
      'Start from AI Front Office setups for HVAC, plumbing, roofing, cleaners, and more — then customize per client.',
  },
];

const FAQ_ITEMS = [
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
    question: 'Who is a good fit for the reseller program?',
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

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

/** Dominant hero visual — Mission Control for a local business */
function ResellerHeroVisual() {
  const rows = [
    { label: 'New enquiry · salon', status: 'Qualified', tone: 'text-fern-700 bg-fern-50' },
    { label: 'Quote · renovation', status: 'Sent', tone: 'text-sky-700 bg-sky-50' },
    { label: 'Follow-up · HVAC', status: 'Due 2pm', tone: 'text-amber-700 bg-amber-50' },
    { label: 'Schedule · plumbing', status: 'Booked', tone: 'text-violet-700 bg-violet-50' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fern-50/80 via-transparent to-amber-50/40 blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-[0_24px_56px_-28px_rgba(28,25,23,0.32)] ring-1 ring-black/5">
        <div className="flex items-center justify-between border-b border-neutral-200/80 bg-[#FAFAF9] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[11px] font-medium text-neutral-500">Mission Control · Client HQ</span>
          <span className="rounded-md bg-fern-50 px-2 py-0.5 text-[10px] font-semibold text-fern-800 ring-1 ring-fern-200">
            Live
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1fr_1.15fr]">
          <div className="border-b border-neutral-100 bg-[#FAFAF9]/60 p-4 sm:border-b-0 sm:border-r sm:border-neutral-100">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Your clients
            </p>
            <ul className="mt-3 space-y-2">
              {['Riverside Salon', 'Northside Reno', 'Peak HVAC'].map((name, i) => (
                <li
                  key={name}
                  className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ${
                    i === 0 ? 'bg-white shadow-xs ring-1 ring-black/5' : ''
                  }`}
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-lg text-[11px] font-bold ${
                      i === 0
                        ? 'bg-rose-50 text-rose-600'
                        : i === 1
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-sky-50 text-sky-700'
                    }`}
                  >
                    {name.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-neutral-800">
                      {name}
                    </span>
                    <span className="block text-[11px] text-neutral-500">
                      {i === 0 ? '$420 / mo' : i === 1 ? '$380 / mo' : '$290 / mo'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400">
              Today’s queue
            </p>
            <ul className="mt-3 space-y-2">
              {rows.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-3 rounded-xl bg-[#FAFAF9] px-3 py-2.5 ring-1 ring-black/[0.04]"
                >
                  <span className="truncate text-[13px] font-medium text-neutral-800">
                    {row.label}
                  </span>
                  <span
                    className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold ${row.tone}`}
                  >
                    {row.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-fern-200 bg-fern-50/50 px-3 py-2.5">
              <Check className="size-4 shrink-0 text-fern-700" strokeWidth={2.5} />
              <p className="text-[12px] leading-snug text-fern-900">
                12 workflows running · you keep the retainer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResellersClient() {
  const industries = getIndustryCards();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Header />

      {/* ── Hero ── */}
      <section className="site-header-clear border-b border-black/5 bg-canvas">
        <div className={`mx-auto grid max-w-7xl items-center gap-10 lg:min-h-[36rem] lg:grid-cols-2 lg:gap-12 ${PX} pb-14 pt-10 sm:pb-16 sm:pt-14 lg:pb-20`}>
          <FadeIn>
            <TrooperLogo
              characterClassName="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              textClassName="text-2xl sm:text-3xl"
              className="mb-6"
            />
            <p className="kicker mb-3">Reseller program</p>
            <h1 className="max-w-xl text-balance font-display text-4xl leading-[1.08] tracking-tight text-neutral-800 sm:text-5xl lg:text-[3.25rem]">
              Resell Trooper.
              <br />
              Own the custom layer.
            </h1>
            <p className="lede mt-5 max-w-lg text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
              Package Mission Control for local businesses, charge for the front office you build,
              and keep recurring revenue as you run it for them.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <PixelButton
                href={APPLY_MAILTO}
                external
                target="_self"
                size="lg"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Apply to resell
              </PixelButton>
              <PixelButton href="#industries" size="lg" variant="outline" tone="dark">
                Browse industries
              </PixelButton>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-500">
              {['You set the price', '$200–$500 / client / mo', 'Industry playbooks ready'].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-1.5">
                    <Check className="size-3.5 text-fern-700" strokeWidth={2.5} />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </FadeIn>

          <FadeIn delay={0.1} className="lg:pl-4">
            <ResellerHeroVisual />
          </FadeIn>
        </div>
      </section>

      {/* ── Pain ── */}
      <section className="border-b border-black/5 bg-white">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker">Sound familiar?</p>
            <h2 className="h2-section mt-2">
              Local businesses need a front office.
              <br className="hidden sm:block" />
              You can be the one who builds it.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {painMoments.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl bg-stone-50 p-6 ring-1 ring-black/5 sm:p-7">
                  <h3 className="text-lg font-semibold text-balance text-neutral-800">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-pretty text-neutral-500">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="border-b border-black/5 bg-stone-50">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker">How it works</p>
            <h2 className="h2-section mt-2">
              From owner conversation
              <br />
              to recurring revenue.
            </h2>
            <p className="lede">
              High effort, low risk: set up something the client can clearly see — then get paid
              every month to keep it running.
            </p>
          </FadeIn>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 0.08}>
                <div className="h-full rounded-2xl bg-white p-6 shadow-xs ring-1 ring-black/5 sm:p-7">
                  <span className="block font-display text-2xl tabular-nums text-neutral-300 sm:text-3xl">
                    {step.number}
                  </span>
                  <h3 className="mt-4 font-sans text-lg font-semibold text-ink sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
                    {step.example}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflows ── */}
      <section className="border-b border-black/5 bg-white">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker">What you move into Trooper</p>
            <h2 className="h2-section mt-2">The repetitive parts of a real business.</h2>
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
                  <div className="flex h-full flex-col items-start gap-4 rounded-2xl bg-white p-5 shadow-xs ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.02]">
                    <span
                      className={`flex size-11 items-center justify-center rounded-xl ${item.tint}`}
                    >
                      <Icon className="size-5" strokeWidth={2} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold text-neutral-800">{item.label}</span>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section id="industries" className="scroll-mt-28 border-b border-black/5">
        <div className={`dot-grid mx-auto max-w-none py-12 sm:py-20`}>
          <div className={`mx-auto max-w-7xl ${PX}`}>
            <FadeIn>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="kicker">AI Front Office by industry</p>
                  <h2 className="h2-section mt-2">
                    Playbooks ready for the businesses you sell to.
                  </h2>
                  <p className="lede">
                    Each industry page is a starting point — call handling, booking, dispatch, and
                    follow-up shaped for that vertical. Click through, then customize for your
                    client.
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

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((industry, i) => (
                <FadeIn key={industry.slug} delay={Math.min(i, 8) * 0.03}>
                  <Link
                    href={industry.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5 transition-transform duration-200 hover:scale-[1.015]"
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
                      <p className="flex-1 text-[15px] leading-relaxed text-pretty text-neutral-500 line-clamp-2">
                        {industry.description}
                      </p>
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
      </section>

      {/* ── Economics / proof ── */}
      <section className="border-b border-black/5 bg-split text-white">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker-dark">The math</p>
            <h2 className="h2-section-dark mt-2">
              Ten clients compounds.
              <br />
              Twenty gets you close to $10k / month.
            </h2>
            <p className="lede-dark">
              Charge each client around $200–$500 / month to run their Mission Control. For the
              owner, it’s often cheaper than hiring another employee.
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
      </section>

      {/* ── Why ── */}
      <section className="border-b border-black/5 bg-white">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker">Why resell Trooper</p>
            <h2 className="h2-section mt-2">
              Your product. Your pricing.
              <br />
              Their operations.
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyResell.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-2xl bg-stone-50 p-6 ring-1 ring-black/5 sm:p-7">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-fern-50 text-fern-700 ring-1 ring-fern-200">
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800">{item.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-pretty text-neutral-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-black/5 bg-stone-50">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <p className="kicker">FAQ</p>
            <h2 className="h2-section mt-2">Questions before you apply.</h2>
            <p className="lede">
              Still unsure? Email{' '}
              <a href="mailto:support@trooper.so" className="text-fern-700 hover:underline">
                support@trooper.so
              </a>
              .
            </p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
            {FAQ_ITEMS.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="border-b border-black/5 bg-canvas">
        <div className={`mx-auto max-w-7xl py-12 sm:py-20 ${PX}`}>
          <FadeIn>
            <div className="flex flex-col gap-8 rounded-2xl bg-white p-8 shadow-xs ring-1 ring-black/5 sm:flex-row sm:items-center sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <TrooperLogo
                  characterClassName="h-9 w-9 object-contain"
                  textClassName="text-xl"
                  className="mb-4"
                />
                <h2 className="font-display text-3xl leading-tight tracking-tight text-neutral-800 sm:text-4xl">
                  Resell Trooper.
                  <br />
                  Own the custom layer.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-neutral-600">
                  Tell us about your practice and the clients you serve. We’ll follow up at
                  support@trooper.so.
                </p>
              </div>
              <PixelButton
                href={APPLY_MAILTO}
                external
                target="_self"
                size="lg"
                tone="dark"
                icon={<ArrowRight className="h-4 w-4" />}
                className="shrink-0"
              >
                Apply to resell
              </PixelButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
