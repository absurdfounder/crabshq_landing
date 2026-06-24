'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Code2,
  Megaphone,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/ui/header';
import { PixelMissionTag } from '@/components/PixelAtmosphere';
import PixelButton from '@/components/ui/PixelButton';
import PixelDitherGradient from '@/components/ui/PixelDitherGradient';

const AFFILIATE_SIGNUP = 'https://trooper.lemonsqueezy.com/affiliates';

/** Cloud plan ($99/mo) × 30% commission, illustrative */
const COMMISSION_PER_REFERRAL_MONTHLY = 29.7;
const SLIDER_MIN = 5;
const SLIDER_MAX = 500;

function formatMoney(value: number) {
  return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function sliderProgress(value: number) {
  return `${((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100}%`;
}

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="border-b border-slate-200 px-4 py-3 sm:px-6 lg:px-8">
      <span className="type-eyebrow-num">
        <span className="text-slate-400">[{index}]</span>&nbsp;{label}
      </span>
    </div>
  );
}

function EarningsCalculator() {
  const [referrals, setReferrals] = useState(SLIDER_MIN);

  const monthly = useMemo(
    () => Math.round(referrals * COMMISSION_PER_REFERRAL_MONTHLY),
    [referrals],
  );
  const yearly = monthly * 12;

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h2 id="earnings-calculator" className="affiliate-section-title">
          Number of referrals:{' '}
          <span className="tabular-nums text-trooper">{referrals}</span>
        </h2>

        <div className="mx-auto mt-8 max-w-3xl">
          <label htmlFor="referral-count" className="sr-only">
            Number of referrals
          </label>
          <input
            id="referral-count"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={referrals}
            onChange={(e) => setReferrals(Number(e.target.value))}
            className="earnings-slider w-full"
            style={{ '--slider-progress': sliderProgress(referrals) } as React.CSSProperties}
          />
          <div className="mt-3 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
            <span>{SLIDER_MIN} referrals</span>
            <span>{SLIDER_MAX} referrals</span>
          </div>
        </div>

        <p className="mt-8 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-trooper-700">
          Your potential earnings
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </p>
      </div>

      <div className="grid gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-2">
        <div className="bg-white px-6 py-10 text-center sm:px-8">
          <p className="font-funneldisplay text-4xl tabular-nums tracking-tight text-slate-900 sm:text-5xl">
            ~${formatMoney(monthly)}
          </p>
          <p className="mt-3 text-sm text-slate-500">monthly</p>
        </div>
        <div className="bg-trooper-50 px-6 py-10 text-center sm:px-8">
          <p className="font-funneldisplay text-4xl tabular-nums tracking-tight text-trooper-700 sm:text-5xl">
            ~${formatMoney(yearly)}
          </p>
          <p className="mt-3 text-sm font-medium text-trooper-700">yearly</p>
        </div>
      </div>

      <p className="border-t border-slate-200 bg-[#FAFAF8] px-4 py-3 text-xs leading-relaxed text-slate-500 sm:px-6 lg:px-8">
        Estimates assume Cloud plan referrals at 30% recurring commission. Actual payouts vary by plan mix
        and retention.
      </p>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: 'How much commission do I earn?',
    answer:
      'You earn 30% recurring commission on every paying customer you refer. You get paid every month for as long as they stay subscribed. There is no cap on earnings.',
  },
  {
    question: 'How and when do I get paid?',
    answer:
      'Payouts are handled through Lemon Squeezy. PayPal and most bank options start at a $50 minimum balance. Wise and some international bank transfers typically start at $200.',
  },
  {
    question: 'How do I track my referrals?',
    answer:
      'After signup you get an affiliate dashboard with clicks, sign-ups, conversions, and earnings in near real time.',
  },
  {
    question: 'Can I promote Trooper alongside other offers?',
    answer:
      'Yes. Many partners recommend Trooper next to newsletters, courses, and other SaaS tools.',
  },
  {
    question: 'Can I use paid ads to promote Trooper?',
    answer:
      'Check your affiliate terms in the dashboard before running paid traffic. We generally expect organic promotion — content, newsletters, communities, and direct recommendations.',
  },
  {
    question: 'How long does the cookie last?',
    answer:
      'The affiliate cookie lasts 30 days. If someone clicks your link and converts within that window, you receive credit.',
  },
  {
    question: 'I have another question.',
    answer: 'Email support@trooper.so and we will get back to you as soon as we can.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Join the program',
    description:
      'Sign up for free in under a minute. You get a unique affiliate link and access to your dashboard.',
  },
  {
    number: '02',
    title: 'Share your link',
    description:
      'Share Trooper in videos, blog posts, newsletters, or social posts. Promote to founders, operators, and builders.',
  },
  {
    number: '03',
    title: 'Get paid every month',
    description:
      'Earn 30% recurring commission on every paying customer you refer. For as long as they stay subscribed, you keep earning.',
  },
];

const stats = [
  { value: '30%', label: 'Recurring commission' },
  { value: '30 days', label: 'Cookie duration' },
  { value: 'Lifetime', label: 'Payouts per referral' },
];

const audiences = [
  {
    icon: Rocket,
    title: 'Founders & startup operators',
    description:
      'Perfect for audiences shipping product, running lean teams, and looking for AI employees that execute real work.',
  },
  {
    icon: Code2,
    title: 'Developers & technical creators',
    description:
      'Trooper agents make GitHub commits, review PRs, run shell commands, and automate dev workflows on an always-on virtual PC.',
  },
  {
    icon: Megaphone,
    title: 'YouTubers and newsletter writers',
    description:
      'Easy to demo: assign a task, watch agents work, show GitHub or browser output, explain why it beats generic AI chat.',
  },
  {
    icon: BarChart3,
    title: 'Operators and business storytellers',
    description:
      'Great for research, reporting, inbox triage, and recurring ops work where autonomous agents save hours every week.',
  },
  {
    icon: Building2,
    title: 'Agencies and consultants',
    description:
      'Recommend Trooper to clients who need coding, research, and execution done continuously — and add recurring revenue.',
  },
  {
    icon: Sparkles,
    title: 'AI tool and workflow reviewers',
    description:
      'A differentiated pitch: multi-agent AI workforce with OpenClaw skills, browser control, and persistent memory.',
  },
];

const whyPromote = [
  {
    title: 'High-intent product',
    description:
      'Trooper solves ongoing execution for teams. Referrals who need agents for real work convert better than casual AI curiosity clicks.',
  },
  {
    title: 'Sticky subscriptions',
    description:
      'Teams that deploy AI employees for GitHub, email, and browser workflows tend to stay — so your recurring commissions keep paying.',
  },
  {
    title: 'Growing category',
    description:
      'AI workforce and agentic systems are accelerating. More buyers are actively searching for tools in this space every month.',
  },
  {
    title: 'Partner dashboard',
    description:
      'Track clicks, sign-ups, conversions, and payouts in one place so you always know how your promotions are performing.',
  },
];

export default function AffiliateClient() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="mx-auto max-w-7xl border-x border-slate-200">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200">
          <PixelDitherGradient />
          <div className="relative z-10">
            <div className="page-hero-padding px-4 sm:px-6 lg:px-8">
              <PixelMissionTag index="01" label="Affiliate program" className="mb-4" />

              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h1 className="font-funneldisplay text-3xl leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem]">
                    Earn 30% recurring.
                    <br />
                    For life.
                  </h1>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                    Get <strong className="font-semibold text-slate-900">30% recurring commission</strong> for every
                    customer you refer. No cap, no expiry. Share your link and get paid every month.
                  </p>
                </div>

                <div className="shrink-0 lg:text-right">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    Free to join
                  </p>
                  <PixelButton
                    href={AFFILIATE_SIGNUP}
                    external
                    size="lg"
                    tone="brand"
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    Become an affiliate
                  </PixelButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section aria-labelledby="earnings-calculator">
          <SectionEyebrow index="02" label="Earnings calculator" />
          <EarningsCalculator />
        </section>

        {/* Stats */}
        <section className="border-b border-slate-200">
          <div className="grid grid-cols-1 gap-px bg-slate-200 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-8 text-center sm:px-8">
                <p className="font-funneldisplay text-2xl tracking-tight text-trooper-700 sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-m-20 border-b border-slate-200">
          <SectionEyebrow index="03" label="How it works" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Three steps to start earning
            </h2>
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

        {/* Who it's for */}
        <section className="border-b border-slate-200 bg-[#FAFAF8]">
          <SectionEyebrow index="04" label="Who it's for" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Promote Trooper to people who need work done
            </h2>
            <p className="affiliate-section-desc mt-3">
              Easiest to recommend when your audience builds, ships, markets, or runs operations with software every
              week.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="affiliate-ds-card">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-slate-200 bg-white p-2 text-trooper-700">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why promote */}
        <section className="border-b border-slate-200">
          <SectionEyebrow index="05" label="Why promote Trooper" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              A product your audience will love
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-2">
            {whyPromote.map((item) => (
              <div key={item.title} className="flex gap-4 bg-white p-6 sm:p-8">
                <span className="mt-0.5 shrink-0 font-mono text-sm font-bold text-trooper-700">✓</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-200 bg-[#FAFAF8]">
          <SectionEyebrow index="06" label="FAQ" />
          <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
            <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
              Frequently asked questions
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-t border-slate-200 bg-white">
            {FAQ_ITEMS.map((item) => (
              <article key={item.question} className="px-4 py-6 sm:px-8 lg:px-10">
                <h3 className="font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-b border-slate-200">
          <div className="flex flex-col gap-6 border border-slate-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:mx-8 lg:my-10">
            <div className="max-w-xl">
              <h2 className="font-funneldisplay text-2xl tracking-tight text-slate-900 sm:text-3xl">
                Ready to start earning?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                Free to join. 30% recurring commission. No cap on earnings.
              </p>
            </div>
            <PixelButton
              href={AFFILIATE_SIGNUP}
              external
              size="lg"
              tone="brand"
              icon={<ArrowRight className="h-4 w-4" />}
              className="shrink-0"
            >
              Become an affiliate
            </PixelButton>
          </div>
        </section>
      </div>
    </div>
  );
}
