'use client';

import {
  ArrowRight,
  Calendar,
  ClipboardList,
  Hammer,
  Mail,
  MessageSquare,
  Scissors,
  Store,
  Users,
} from 'lucide-react';
import Header from '@/components/ui/header';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelButton from '@/components/ui/PixelButton';
import PixelDitherGradient from '@/components/ui/PixelDitherGradient';

const APPLY_MAILTO =
  'mailto:support@trooper.so?subject=Reseller%20Program%20Application&body=Hi%20Trooper%20team%2C%0A%0AI%27d%20like%20to%20apply%20to%20the%20reseller%20program.%0A%0AName%3A%0ACompany%20%2F%20practice%3A%0AWebsite%3A%0ANiche%20or%20client%20types%3A%0A%0AThanks!';

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
      <span className="kicker">{label}</span>
    </div>
  );
}

const steps = [
  {
    number: '01',
    title: 'Sit with the owner',
    description:
      'Walk through how the business actually runs — enquiries, quotes, scheduling, follow-ups, and admin. Find the repetitive work that eats their week.',
  },
  {
    number: '02',
    title: 'Build on Trooper',
    description:
      'Move those workflows into Trooper Mission Control. Customize agents, channels, and automations so the setup matches how they already operate.',
  },
  {
    number: '03',
    title: 'Charge for the solution',
    description:
      'They pay for Trooper. You bill them $200–$500/month to run and maintain the setup. Recurring revenue tied to work they can see and feel.',
  },
];

const workflows = [
  { icon: Mail, label: 'New enquiries' },
  { icon: ClipboardList, label: 'Quotes' },
  { icon: Calendar, label: 'Scheduling' },
  { icon: MessageSquare, label: 'Follow-ups' },
  { icon: Users, label: 'Customer updates' },
  { icon: Store, label: 'Admin' },
];

const examples = [
  {
    icon: Scissors,
    title: 'Hair salons',
    description:
      'Intake new booking requests, confirm appointments, chase no-shows, and keep clients updated without the front desk drowning in messages.',
  },
  {
    icon: Hammer,
    title: 'Renovation companies',
    description:
      'Turn site visits into quotes, schedule crews, send progress updates, and follow up on unpaid invoices — all from one Mission Control setup.',
  },
  {
    icon: Store,
    title: 'Other local businesses',
    description:
      'Physical businesses still far from AI. Once they see repetitive work handled, the value is obvious — and often cheaper than hiring another employee.',
  },
];

const economics = [
  {
    value: '$200–$500',
    label: 'Typical monthly fee per client',
  },
  {
    value: '10 clients',
    label: 'Where recurring revenue starts compounding',
  },
  {
    value: '~$10k/mo',
    label: 'Around 20 clients at mid-range pricing',
  },
];

const whyResell = [
  {
    title: 'You set the price',
    description:
      'Sell Trooper as part of your own custom solution. Charge what the workflow is worth to the client — not a fixed referral cut.',
  },
  {
    title: 'High effort, low risk',
    description:
      'You’re packaging real operational work into something clients understand. Sticky recurring revenue, not one-off project gigs.',
  },
  {
    title: 'Clear client value',
    description:
      'Owners see fewer missed leads, faster quotes, and less admin. Enough saved labor that many avoid hiring another person.',
  },
  {
    title: 'Built for customization',
    description:
      'Mission Control is designed to be shaped around each business — channels, agents, and workflows you configure once and run ongoing.',
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
      'Hair salons, renovation companies, clinics, shops, and other physical businesses with repetitive enquiries, scheduling, follow-ups, and admin — especially teams still far from AI tools.',
  },
  {
    question: 'How do I apply?',
    answer:
      'Click Apply and email us. Tell us who you are, the clients you serve, and how you’d use Trooper. We’ll follow up from support@trooper.so.',
  },
];

export default function ResellersClient() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-7xl border-x border-slate-200">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200">
          <PixelDitherGradient />
          <div className="relative z-10">
            <div className="page-hero-padding px-4 sm:px-6 lg:px-8">
              <PixelMissionTag index="01" label="Reseller program" className="mb-4" />

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h1 className="font-funneldisplay text-3xl leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                    Resell Trooper.
                    <br />
                    Build the custom layer.
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    Package Trooper Mission Control for local businesses, charge for the
                    solution you build, and keep recurring revenue as you run it for them.
                  </p>
                </div>

                <div className="shrink-0 lg:text-right">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    Opens your email
                  </p>
                  <PixelButton
                    href={APPLY_MAILTO}
                    external
                    target="_self"
                    size="lg"
                    tone="brand"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Apply to resell
                  </PixelButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Economics */}
        <section className="border-b border-slate-200">
          <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-3">
            {economics.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-8 text-center sm:px-8">
                <p className="font-funneldisplay text-2xl tracking-tight text-trooper-700 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-m-20 border-b border-slate-200">
          <SectionEyebrow label="How it works" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              From owner conversation to recurring revenue
            </h2>
            <p className="affiliate-section-desc mt-3">
              High effort, low risk: you set up something the client can clearly see and
              understand — then you get paid every month to keep it running.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="bg-white p-6 sm:p-8">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-trooper-700">
                  {step.number}
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflows moved into Mission Control */}
        <section className="border-b border-slate-200 bg-[#FAFAF8]">
          <SectionEyebrow label="What you move into Trooper" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              The repetitive parts of a real business
            </h2>
            <p className="affiliate-section-desc mt-3">
              Sit with the owner, map how work flows today, then move the manual loops into
              Trooper Mission Control.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-3 lg:grid-cols-6">
            {workflows.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-3 bg-white px-4 py-8 text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center border border-slate-200 bg-[#FAFAF8] text-trooper-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="text-sm font-medium text-slate-900">{item.label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Examples */}
        <section className="border-b border-slate-200">
          <SectionEyebrow label="Who resellers are building for" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Local businesses still far from AI
            </h2>
            <p className="affiliate-section-desc mt-3">
              Non-tech owners often don’t know where to start — but once they see the setup,
              they feel the value immediately.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-3">
            {examples.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white p-6 sm:p-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-slate-200 bg-[#FAFAF8] text-trooper-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why resell */}
        <section className="border-b border-slate-200 bg-[#FAFAF8]">
          <SectionEyebrow label="Why resell Trooper" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Your product. Your pricing. Their operations.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-2">
            {whyResell.map((item) => (
              <div key={item.title} className="flex gap-4 bg-white p-6 sm:p-8">
                <span className="mt-0.5 shrink-0 font-mono text-sm font-bold text-trooper-700">
                  ✓
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-200">
          <SectionEyebrow label="FAQ" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
            {FAQ_ITEMS.map((item) => (
              <article key={item.question} className="px-4 py-6 sm:px-8 lg:px-10">
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-b border-slate-200">
          <div className="flex flex-col gap-6 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mx-8 lg:my-10">
            <div className="max-w-xl">
              <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
                Ready to start reselling?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Tell us about your practice and the clients you serve. We’ll follow up at
                support@trooper.so.
              </p>
            </div>
            <PixelButton
              href={APPLY_MAILTO}
              external
              target="_self"
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
              className="shrink-0"
            >
              Apply to resell
            </PixelButton>
          </div>
        </section>
      </div>
    </div>
  );
}
