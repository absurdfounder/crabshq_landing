'use client';

import { Check, Lock, Phone, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { TROOPER_LOGOMARK } from '@/lib/trooperLogomark';

type StackTool = {
  name: string;
  price: number;
  pos: string;
  posLg: string;
};

const OLD_TOOLS: StackTool[] = [
  {
    name: 'Answering service',
    price: 200,
    pos: 'left-[8px] top-0 z-[9] rotate-[-3deg]',
    posLg: 'lg:left-[2px] lg:top-0 lg:z-[9] lg:rotate-[-3.5deg]',
  },
  {
    name: 'Booking software',
    price: 49,
    pos: 'right-[4px] top-[14px] z-[8] rotate-[2.5deg]',
    posLg: 'lg:right-auto lg:left-[148px] lg:top-[14px] lg:z-[8] lg:rotate-[2.5deg]',
  },
  {
    name: 'CRM seat',
    price: 89,
    pos: 'left-[18px] top-[80px] z-[7] rotate-[1.5deg]',
    posLg: 'lg:left-[34px] lg:top-[78px] lg:z-[7] lg:rotate-[1.5deg]',
  },
  {
    name: 'SMS / text blast',
    price: 39,
    pos: 'right-[12px] top-[94px] z-[6] rotate-[-2deg]',
    posLg: 'lg:right-auto lg:left-[176px] lg:top-[96px] lg:z-[6] lg:rotate-[-2deg]',
  },
  {
    name: 'Review request tool',
    price: 29,
    pos: 'left-[6px] top-[160px] z-[5] rotate-[2deg]',
    posLg: 'lg:left-[6px] lg:top-[158px] lg:z-[5] lg:rotate-[2deg]',
  },
  {
    name: 'Dispatch board',
    price: 79,
    pos: 'right-[6px] top-[178px] z-[4] rotate-[-1.5deg]',
    posLg: 'lg:right-auto lg:left-[150px] lg:top-[176px] lg:z-[4] lg:rotate-[-1.5deg]',
  },
  {
    name: 'Email sequences',
    price: 25,
    pos: 'left-[14px] top-[242px] z-[3] rotate-[-2.5deg]',
    posLg: 'lg:left-[48px] lg:top-[236px] lg:z-[3] lg:rotate-[-2.5deg]',
  },
  {
    name: 'Chat widget',
    price: 39,
    pos: 'right-[10px] top-[258px] z-[2] rotate-[3deg]',
    posLg: 'lg:right-auto lg:left-[188px] lg:top-[254px] lg:z-[2] lg:rotate-[3deg]',
  },
  {
    name: 'Voicemail AI',
    price: 49,
    pos: 'left-[10px] top-[324px] z-[1] rotate-[1deg]',
    posLg: 'lg:left-[14px] lg:top-[316px] lg:z-[1] lg:rotate-[1deg]',
  },
  {
    name: 'Call tracking',
    price: 29,
    pos: 'right-[8px] top-[338px] z-[1] rotate-[-3deg]',
    posLg: 'lg:right-auto lg:left-[158px] lg:top-[334px] lg:z-[1] lg:rotate-[-3deg]',
  },
];

const TOTAL = OLD_TOOLS.reduce((sum, t) => sum + t.price, 0);

const NOTES = [
  {
    text: 'Your time, every week',
    value: '15+ hrs',
    pos: 'left-[36px] top-[70px] z-[11] rotate-[4deg] lg:left-[114px] lg:top-[60px]',
  },
  {
    text: 'Logins & UIs to learn',
    value: '10 apps',
    pos: 'left-[-2px] top-[230px] z-[11] rotate-[-4deg] lg:left-[-6px] lg:top-[212px]',
  },
  {
    text: 'Missed after-hours calls',
    value: 'all week',
    pos: 'left-[93px] top-[390px] z-[11] rotate-[3.5deg] lg:left-[120px] lg:top-[300px]',
  },
] as const;

const AGENT_STEPS = [
  {
    title: 'Caught every missed call',
    detail: 'Answered 14 after-hours leads this week',
    icon: Phone,
    extra: (
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['New lead · HVAC', 'Booked · Tue 2pm', 'Quoted · $420'].map((label) => (
          <span
            key={label}
            className="inline-flex rounded-md bg-white px-2 py-1 text-[10px] font-medium text-neutral-600 ring-1 ring-neutral-200"
          >
            {label}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: 'Synced the calendar',
    detail: 'Jobs routed to the right tech',
    icon: Calendar,
    extra: (
      <div className="mt-2 flex flex-wrap gap-1.5">
        {['Google Calendar', 'Jobber', 'ServiceTitan'].map((label) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[11px] font-medium text-neutral-700 ring-1 ring-neutral-200"
          >
            <span className="size-1.5 rounded-full bg-fern-500" />
            {label}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: 'Sent follow-ups in their voice',
    detail: 'Quotes, reminders, review asks — no prompting',
    icon: MessageSquare,
    extra: null,
  },
] as const;

function ToolCard({ tool }: { tool: StackTool }) {
  return (
    <div
      className={`absolute w-[160px] overflow-hidden rounded-[11px] border border-neutral-900/[0.12] bg-white saturate-[0.72] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_14px_30px_-16px_rgba(15,23,42,0.22)] lg:w-[212px] ${tool.pos} ${tool.posLg}`}
    >
      <div className="flex h-6 items-center gap-1.5 border-b border-neutral-900/[0.06] bg-neutral-50 px-[9px]">
        <div className="flex gap-1">
          <span className="block size-[7px] rounded-full bg-neutral-200" />
          <span className="block size-[7px] rounded-full bg-neutral-200" />
          <span className="block size-[7px] rounded-full bg-neutral-200" />
        </div>
        <div className="ml-1 h-[11px] flex-1 rounded-[3px] bg-neutral-100" />
      </div>
      <div className="flex items-start justify-between gap-2.5 px-3 pb-[13px] pt-[11px]">
        <div className="min-w-0">
          <div className="text-[12.5px] font-semibold leading-tight tracking-[-0.01em] text-neutral-600">
            {tool.name}
          </div>
          <div className="mt-[5px] flex items-center gap-[5px] font-mono text-[10px] text-neutral-400">
            <Lock className="size-[9px] opacity-70" strokeWidth={1.6} aria-hidden />
            sign in
          </div>
        </div>
        <div className="shrink-0 pt-px font-display text-[20px] leading-none text-rose-500">
          ${tool.price}
          <span className="font-mono text-[10px] text-rose-400">/mo</span>
        </div>
      </div>
    </div>
  );
}

function TrooperMark({ size = 28 }: { size?: number }) {
  return (
    <span
      className="mt-0.5 inline-block shrink-0 -rotate-3 overflow-hidden rounded-[9px] bg-fern-50 ring-1 ring-fern-100"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={TROOPER_LOGOMARK.w64}
        alt=""
        width={size}
        height={size}
        className="block object-cover"
        style={{ width: size, height: size }}
      />
    </span>
  );
}

/**
 * Old fragmented front-office stack vs Mission Control — adapted from the
 * Genviral "one chat replaces all of it" composition for Trooper resellers.
 */
export default function ResellersOldStack() {
  return (
    <SectionShell rhythm eyebrow="The problem you sell against" bgClass="bg-white">
      <style>{`
        @keyframes reseller-eq-dash-flow { to { stroke-dashoffset: -24; } }
        @keyframes reseller-eq-wobble {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        .reseller-eq-dash-flow { animation: reseller-eq-dash-flow 2.6s linear infinite; }
        .reseller-eq-wobble {
          animation: reseller-eq-wobble 4.5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-[2.5rem] leading-[1.04] tracking-[-0.02em] text-neutral-800 sm:text-[3.5rem]">
          Running a front office is a full-time job,{' '}
          <em className="italic text-fern-700">and the owner already has one.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-[1.6] text-neutral-500">
          To do it themselves, they&apos;re paying for ten tools and logging into all of them: an
          answering service, a booking app, a CRM, SMS, reviews, dispatch. Around ${TOTAL} a month —
          and they&apos;re still the integration layer. Every week.
        </p>
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
        {/* ── Old stack ── */}
        <div className="relative">
          <div className="flex justify-center lg:justify-start lg:pl-1.5">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              <span aria-hidden className="text-[8px] text-neutral-300">
                ◆
              </span>
              The old stack
            </span>
          </div>

          <div className="relative mx-auto mt-[18px] h-[444px] w-full max-w-[336px] lg:mt-5 lg:h-[460px] lg:w-[412px] lg:max-w-none">
            {OLD_TOOLS.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}

            {NOTES.map((note) => (
              <div
                key={note.text}
                className={`absolute w-[150px] rounded-[9px] border border-neutral-900/[0.06] bg-white px-[11px] py-[7px] text-[11px] italic leading-[1.4] text-neutral-500 saturate-[0.7] shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${note.pos}`}
              >
                + {note.text}{' '}
                <b className="font-mono text-[10.5px] font-semibold not-italic text-neutral-600">
                  {note.value}
                </b>
              </div>
            ))}
          </div>

          <div aria-hidden className="-mb-1.5 mt-2.5 flex justify-center">
            <svg
              viewBox="0 0 44 50"
              width="44"
              height="50"
              fill="none"
              className="reseller-eq-wobble overflow-visible"
            >
              <defs>
                <linearGradient id="reseller-eq-grad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#fda4af" />
                  <stop offset="55%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              {[15, 29].map((x) => (
                <g key={x}>
                  <path
                    d={`M ${x} 5 C ${x - 6} 14, ${x + 6} 21, ${x} 29 C ${x - 4} 35, ${x + 3} 39, ${x} 45`}
                    stroke="#fda4af"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                  <path
                    d={`M ${x} 5 C ${x - 6} 14, ${x + 6} 21, ${x} 29 C ${x - 4} 35, ${x + 3} 39, ${x} 45`}
                    stroke="url(#reseller-eq-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    className="reseller-eq-dash-flow"
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="relative mx-auto mt-[26px] flex max-w-[430px] flex-wrap items-baseline justify-center gap-x-3.5 gap-y-1.5 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_0_0_1px_rgba(15,23,42,0.12)]">
            <span className="font-display text-[32px] leading-none tracking-[-0.01em] text-rose-600">
              ${TOTAL}
              <span className="font-mono text-[12px] text-rose-400">/mo</span>
            </span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">10 logins</span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">15+ hrs</span>
            <span className="mt-0.5 basis-full text-center font-mono text-[10.5px] italic text-neutral-400">
              *they are the integration layer
            </span>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-3.5 py-2 lg:flex-col lg:px-6 lg:py-0">
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:flex-none" />
          <span className="whitespace-nowrap text-center text-[10px] font-semibold uppercase leading-normal tracking-[0.16em] text-fern-700 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:tracking-[0.18em]">
            One Mission Control replaces all of it
          </span>
          <span aria-hidden className="text-[13px] leading-none text-fern-600">
            ↓
          </span>
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:flex-none" />
        </div>

        {/* ── Mission Control chat ── */}
        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_18px_40px_-12px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.07]">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 px-4 py-3 sm:px-5">
              <TrooperMark />
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="text-[13px] font-semibold text-neutral-900">Mission Control</span>
                <span className="flex items-center gap-1 text-[11px] text-fern-600">
                  <span className="size-1.5 rounded-full bg-fern-500" />
                  Front office agent · online
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
              <div className="flex justify-end">
                <p className="max-w-[82%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2.5 text-[13px] leading-snug text-neutral-800">
                  ok Trooper, take my whole front office off my plate. go.
                </p>
              </div>

              <div className="flex gap-2.5">
                <TrooperMark />
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <p className="text-[13px] leading-snug text-neutral-700">On it. Watch me work 👇</p>

                  <div className="pt-0.5">
                    {AGENT_STEPS.map((step, i) => {
                      const Icon = step.icon;
                      const isLast = i === AGENT_STEPS.length - 1;
                      return (
                        <div
                          key={step.title}
                          className={`relative flex gap-2.5 ${isLast ? '' : 'pb-3.5'}`}
                        >
                          {!isLast ? (
                            <span
                              aria-hidden
                              className="pointer-events-none absolute bottom-0 left-[11px] top-6 w-px bg-neutral-200/80"
                            />
                          ) : null}
                          <span className="relative z-10 grid size-[23px] shrink-0 place-items-center rounded-full bg-fern-50 text-fern-600 ring-1 ring-fern-100">
                            <Icon className="size-3" strokeWidth={2.2} aria-hidden />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12.5px] font-medium text-neutral-800">
                                {step.title}
                              </span>
                              <Check
                                className="size-3 text-fern-500"
                                strokeWidth={3}
                                aria-hidden
                              />
                            </div>
                            <p className="mt-0.5 text-[11px] leading-snug text-neutral-400">
                              {step.detail}
                            </p>
                            {step.extra}
                          </div>
                        </div>
                      );
                    })}

                    <div className="relative flex gap-2.5 pt-3.5">
                      <span className="relative z-10 grid size-[23px] shrink-0 place-items-center rounded-full bg-white text-fern-600 ring-1 ring-fern-200">
                        <Calendar className="size-3" strokeWidth={2.2} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12.5px] font-medium text-neutral-800">
                            Scheduling callbacks
                          </span>
                          <span className="inline-flex items-center gap-[3px]">
                            <span
                              className="size-1 animate-bounce rounded-full bg-fern-400"
                              style={{ animationDelay: '0ms' }}
                            />
                            <span
                              className="size-1 animate-bounce rounded-full bg-fern-400"
                              style={{ animationDelay: '160ms' }}
                            />
                            <span
                              className="size-1 animate-bounce rounded-full bg-fern-400"
                              style={{ animationDelay: '320ms' }}
                            />
                          </span>
                        </div>
                        <p className="mt-0.5 text-[11px] leading-snug text-neutral-400">
                          Finding open slots on the truck calendar
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] font-medium leading-snug text-neutral-900">
                    Front office covered. Next lead drops in any minute.{' '}
                    <span className="ml-1 inline-flex translate-y-px items-center gap-1 font-normal text-fern-700">
                      Review board
                      <ArrowRight className="size-3" aria-hidden />
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <p className="max-w-[82%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2.5 text-[13px] leading-snug text-neutral-800">
                  ok you&apos;re officially hired. run this every week forever 🫡
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-100 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2">
                <MessageSquare className="size-3.5 shrink-0 text-fern-600" aria-hidden />
                <span className="min-w-0 flex-1 truncate text-[13px] text-neutral-400">
                  Message Mission Control…
                </span>
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-neutral-900 text-white">
                  <ArrowRight className="size-3.5 -rotate-90" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
