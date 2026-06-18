'use client';

import { useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Code2,
  Megaphone,
  Plus,
  Rocket,
  Sparkles,
} from 'lucide-react';
import Header from '@/components/ui/header';
import PixelButton from '@/components/ui/PixelButton';

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

function EarningsCalculator() {
  const [referrals, setReferrals] = useState(SLIDER_MIN);

  const monthly = useMemo(
    () => Math.round(referrals * COMMISSION_PER_REFERRAL_MONTHLY),
    [referrals],
  );
  const yearly = monthly * 12;

  return (
    <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-slate-50 px-5 py-10 shadow-[0_24px_80px_rgba(14,16,15,0.06)] sm:px-10 lg:px-14">
      <div className="text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
          Earnings calculator
        </p>
        <h2
          className="mt-4 font-funneldisplay font-black leading-tight tracking-tight text-slate-900"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
        >
          Number of referrals:{' '}
          <span className="tabular-nums text-trooper">{referrals}</span>
        </h2>
      </div>

      <div className="mt-10">
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
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-sm text-slate-500">{SLIDER_MIN} referrals</span>
          <span className="text-sm text-slate-500">{SLIDER_MAX} referrals</span>
        </div>
      </div>

      <p className="mt-10 flex items-center justify-center gap-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-trooper-700">
        Your potential earnings
        <ArrowRight className="h-4 w-4" aria-hidden />
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-center sm:py-10">
          <p
            className="font-black leading-none tabular-nums text-slate-900"
            style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}
          >
            ~${formatMoney(monthly)}
          </p>
          <p className="mt-4 text-lg text-slate-500">monthly</p>
        </div>
        <div className="rounded-xl border border-trooper-200 bg-trooper-50 px-6 py-8 text-center sm:py-10">
          <p
            className="font-black leading-none tabular-nums text-trooper-700"
            style={{ fontSize: 'clamp(48px, 7vw, 72px)' }}
          >
            ~${formatMoney(yearly)}
          </p>
          <p className="mt-4 text-lg text-trooper-700">yearly</p>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        Estimates assume Cloud plan referrals at 30% recurring commission. Actual payouts vary by plan
        mix and retention.
      </p>
    </div>
  );
}

function AffiliateFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      question: 'How much commission do I earn?',
      answer:
        'You earn 30% recurring commission on every paying customer you refer. You get paid every month for as long as they stay subscribed. There is no cap on earnings.',
    },
    {
      question: 'How and when do I get paid?',
      answer:
        'Payouts are handled through Lemon Squeezy. PayPal and most bank options start at a $50 minimum balance. Wise and some international bank transfers typically start at $200. Processing times are shown in your affiliate dashboard.',
    },
    {
      question: 'How do I track my referrals?',
      answer:
        'After signup you get an affiliate dashboard with clicks, sign-ups, conversions, and earnings in near real time.',
    },
    {
      question: 'Can I promote Trooper alongside other offers?',
      answer:
        'Yes. Many partners recommend Trooper next to newsletters, courses, and other SaaS tools. Use your link anywhere your audience trusts your recommendations.',
    },
    {
      question: 'Can I use paid ads to promote Trooper?',
      answer:
        'Check your affiliate terms in the dashboard before running paid traffic. We generally expect organic promotion — content, newsletters, communities, and direct recommendations.',
    },
    {
      question: 'Are there brand assets I can use?',
      answer:
        'Yes. Partners can request logos, banners, and sample copy for posts, videos, and newsletters. Reach out if you need a custom format.',
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

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="space-y-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 rounded-sm text-left font-medium text-slate-900 outline-none transition-colors hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-trooper focus-visible:ring-offset-2"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {item.question}
                <Plus
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                  aria-hidden
                />
              </button>
              <div
                className={`overflow-hidden text-slate-600 transition-all leading-relaxed ${
                  isOpen ? 'mt-3 max-h-96' : 'max-h-0'
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
      'Share Trooper in videos, blog posts, newsletters, or social posts. Promote to founders, operators, and builders however works best for you.',
  },
  {
    number: '03',
    title: 'Get paid every month',
    description:
      'Earn 30% recurring commission on every paying customer you refer. For as long as they stay subscribed, you keep earning.',
  },
];

const audiences = [
  {
    icon: Rocket,
    title: 'Founders & startup operators',
    description:
      'Perfect for audiences shipping product, running lean teams, and looking for AI employees that execute real work — not another chat window.',
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
      'Easy to demo in one flow: assign a task, watch agents work, show GitHub or browser output, and explain why it beats generic AI chat.',
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
      'Recommend Trooper to clients who need coding, research, and execution done continuously — and add recurring affiliate revenue.',
  },
  {
    icon: Sparkles,
    title: 'AI tool and workflow reviewers',
    description:
      'A differentiated pitch: multi-agent AI workforce with OpenClaw skills, browser control, and persistent memory — not a single-model chatbot.',
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
      'Teams that deploy AI employees for GitHub, email, and browser workflows tend to stay. That means your recurring commissions keep paying month after month.',
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
    <main className="flex min-h-screen w-full flex-col bg-white">
      <Header />

      <section className="border-b border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl border-x border-slate-200 px-4 text-center md:px-8">
          <p className="affiliate-section-label">Affiliate Program</p>
          <h1
            className="mx-auto mb-6 max-w-4xl font-funneldisplay font-black leading-[0.95] tracking-[-0.04em] text-slate-900"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            Earn 30% recurring.
            <br />
            For life.
          </h1>
          <p className="affiliate-section-desc mx-auto mb-10 text-center">
            Get <strong className="font-semibold text-slate-900">30% recurring commission</strong> for
            every customer you refer. No cap, no expiry. Share your link and get paid every month.
          </p>

          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
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

          <EarningsCalculator />
        </div>
      </section>

      <section className="border-b border-slate-200 py-12 md:py-16">
        <div className="mx-auto max-w-7xl border-x border-slate-200 px-4 md:px-8">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div>
              <p
                className="mb-1 font-black text-trooper-700"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                30%
              </p>
              <p className="text-slate-600">Recurring commission</p>
            </div>
            <div>
              <p
                className="mb-1 font-black text-trooper-700"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                30 days
              </p>
              <p className="text-slate-600">Cookie duration</p>
            </div>
            <div>
              <p
                className="mb-1 font-black text-trooper-700"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
              >
                Lifetime
              </p>
              <p className="text-slate-600">Payouts per referral</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl border-x border-slate-200 px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="affiliate-section-label">How It Works</p>
            <h2 className="affiliate-section-title mt-4">Three steps to start earning</h2>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="affiliate-ds-card text-center md:text-left">
                <span
                  className="mb-4 block font-mono text-sm font-bold text-trooper-700"
                  style={{ letterSpacing: '2px' }}
                >
                  {step.number}
                </span>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                <p className="leading-relaxed text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl border-x border-slate-200 px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="affiliate-section-label">Who It&apos;s For</p>
            <h2 className="affiliate-section-title mt-4">
              Promote Trooper to people who need work done
            </h2>
            <p className="affiliate-section-desc mx-auto mt-4 text-center">
              It is easiest to recommend when your audience already builds, ships, markets, or runs
              operations with software every week.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audiences.map((item) => (
              <div key={item.title} className="affiliate-ds-card">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-trooper-700">
                  <item.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="leading-relaxed text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="affiliate-section-label">Why Promote Trooper</p>
            <h2 className="affiliate-section-title mt-4">A product your audience will love</h2>
          </div>
          <div className="space-y-8">
            {whyPromote.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="mt-0.5 text-lg font-bold text-trooper-700">✓</span>
                <div>
                  <h3 className="mb-1 font-bold text-slate-900">{item.title}</h3>
                  <p className="leading-relaxed text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <p className="affiliate-section-label text-center">FAQ</p>
          <h2 className="affiliate-section-title mt-4 text-center">Frequently asked questions</h2>
          <div className="mt-12">
            <AffiliateFaq />
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 py-16 md:py-24">
        <div className="mx-auto max-w-7xl border-x border-slate-200 px-4 text-center md:px-8">
          <h2
            className="mx-auto mb-4 max-w-4xl font-funneldisplay font-black leading-[0.95] tracking-[-0.04em] text-slate-900"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            Ready to start earning?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Free to join. 30% recurring commission. No cap on earnings.
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
      </section>
    </main>
  );
}
