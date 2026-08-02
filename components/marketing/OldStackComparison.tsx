'use client';

import { useId } from 'react';
import { Check, Lock, ArrowRight, MessageSquare, Calendar } from 'lucide-react';
import SectionShell from '@/components/ui/SectionShell';
import { TROOPER_LOGOMARK } from '@/lib/trooperLogomark';
import {
  NOTE_POSITIONS,
  OLD_STACK_ICONS,
  TOOL_POSITIONS,
  sumTools,
  type OldStackContent,
  type OldStackTool,
} from '@/lib/oldStackContent/types';

function ToolCard({
  tool,
  pos,
  posLg,
}: {
  tool: OldStackTool;
  pos: string;
  posLg: string;
}) {
  return (
    <div
      className={`absolute w-[160px] overflow-hidden rounded-[11px] border border-neutral-900/[0.12] bg-white saturate-[0.72] shadow-[0_1px_2px_rgba(15,23,42,0.05),0_14px_30px_-16px_rgba(15,23,42,0.22)] lg:w-[212px] ${pos} ${posLg}`}
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

type Props = {
  content: OldStackContent;
  bgClass?: string;
};

/**
 * Old fragmented tool stack vs Mission Control chat — content-driven so each
 * page (pricing, industry, team, resellers) can show a custom comparison.
 */
export default function OldStackComparison({ content, bgClass = 'bg-white' }: Props) {
  const uid = useId().replace(/:/g, '');
  const total = sumTools(content.tools);
  const tools = content.tools.slice(0, TOOL_POSITIONS.length);
  const notes = content.notes.slice(0, NOTE_POSITIONS.length);

  return (
    <SectionShell rhythm eyebrow={content.eyebrow} bgClass={bgClass}>
      <style>{`
        @keyframes oldstack-eq-dash-${uid} { to { stroke-dashoffset: -24; } }
        @keyframes oldstack-eq-wobble-${uid} {
          0%, 100% { transform: rotate(-3deg); }
          50%      { transform: rotate(3deg); }
        }
        .oldstack-eq-dash-${uid} { animation: oldstack-eq-dash-${uid} 2.6s linear infinite; }
        .oldstack-eq-wobble-${uid} {
          animation: oldstack-eq-wobble-${uid} 4.5s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
      `}</style>

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-[2.5rem] leading-[1.04] tracking-[-0.02em] text-neutral-800 sm:text-[3.5rem]">
          {content.headline}{' '}
          <em className="italic text-fern-700">{content.headlineEmphasis}</em>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-[1.6] text-neutral-500">
          {content.lede.replace('{total}', String(total))}
        </p>
      </div>

      <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
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
            {tools.map((tool, i) => (
              <ToolCard
                key={`${tool.name}-${i}`}
                tool={tool}
                pos={TOOL_POSITIONS[i].pos}
                posLg={TOOL_POSITIONS[i].posLg}
              />
            ))}

            {notes.map((note, i) => (
              <div
                key={note.text}
                className={`absolute w-[150px] rounded-[9px] border border-neutral-900/[0.06] bg-white px-[11px] py-[7px] text-[11px] italic leading-[1.4] text-neutral-500 saturate-[0.7] shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${NOTE_POSITIONS[i]}`}
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
              className={`oldstack-eq-wobble-${uid} overflow-visible`}
            >
              <defs>
                <linearGradient id={`oldstack-eq-grad-${uid}`} x1="0" x2="0" y1="0" y2="1">
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
                    stroke={`url(#oldstack-eq-grad-${uid})`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    className={`oldstack-eq-dash-${uid}`}
                  />
                </g>
              ))}
            </svg>
          </div>

          <div className="relative mx-auto mt-[26px] flex max-w-[430px] flex-wrap items-baseline justify-center gap-x-3.5 gap-y-1.5 rounded-2xl bg-white px-[18px] py-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.05),0_0_0_1px_rgba(15,23,42,0.12)]">
            <span className="font-display text-[32px] leading-none tracking-[-0.01em] text-rose-600">
              ${total}
              <span className="font-mono text-[12px] text-rose-400">/mo</span>
            </span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">{tools.length} logins</span>
            <span aria-hidden className="self-center text-[14px] text-neutral-200">
              ·
            </span>
            <span className="font-mono text-[12px] text-neutral-500">{content.timeLabel}</span>
            <span className="mt-0.5 basis-full text-center font-mono text-[10.5px] italic text-neutral-400">
              {content.footnote}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3.5 py-2 lg:flex-col lg:px-6 lg:py-0">
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:min-w-0 lg:flex-none" />
          <span className="whitespace-nowrap text-center text-[10px] font-semibold uppercase leading-normal tracking-[0.16em] text-fern-700 lg:[writing-mode:vertical-rl] lg:rotate-180 lg:tracking-[0.18em]">
            {content.dividerLabel}
          </span>
          <span aria-hidden className="text-[13px] leading-none text-fern-600">
            ↓
          </span>
          <span className="h-px min-w-[36px] flex-1 bg-neutral-900/[0.12] lg:h-auto lg:min-h-[54px] lg:w-px lg:min-w-0 lg:flex-none" />
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="w-full max-w-[440px] overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_18px_40px_-12px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.07]">
            <div className="flex items-center gap-2.5 border-b border-neutral-100 px-4 py-3 sm:px-5">
              <TrooperMark />
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="text-[13px] font-semibold text-neutral-900">Mission Control</span>
                <span className="flex items-center gap-1 text-[11px] text-fern-600">
                  <span className="size-1.5 rounded-full bg-fern-500" />
                  {content.agentLabel}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
              <div className="flex justify-end">
                <p className="max-w-[82%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2.5 text-[13px] leading-snug text-neutral-800">
                  {content.userAsk}
                </p>
              </div>

              <div className="flex gap-2.5">
                <TrooperMark />
                <div className="flex min-w-0 flex-1 flex-col gap-3">
                  <p className="text-[13px] leading-snug text-neutral-700">{content.agentAck}</p>

                  <div className="pt-0.5">
                    {content.steps.map((step, i) => {
                      const Icon = OLD_STACK_ICONS[step.icon];
                      const isLast = i === content.steps.length - 1;
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
                              <Check className="size-3 text-fern-500" strokeWidth={3} aria-hidden />
                            </div>
                            <p className="mt-0.5 text-[11px] leading-snug text-neutral-400">
                              {step.detail}
                            </p>
                            {step.tags && step.tags.length > 0 ? (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {step.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 rounded-md bg-white px-2 py-1 text-[10px] font-medium text-neutral-600 ring-1 ring-neutral-200"
                                  >
                                    <span className="size-1.5 rounded-full bg-fern-500" />
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
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
                            {content.pendingTitle}
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
                          {content.pendingDetail}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[13px] font-medium leading-snug text-neutral-900">
                    {content.closingLine}{' '}
                    <span className="ml-1 inline-flex translate-y-px items-center gap-1 font-normal text-fern-700">
                      {content.closingCta}
                      <ArrowRight className="size-3" aria-hidden />
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <p className="max-w-[82%] rounded-2xl rounded-br-md bg-neutral-100 px-3.5 py-2.5 text-[13px] leading-snug text-neutral-800">
                  {content.userHire}
                </p>
              </div>
            </div>

            <div className="border-t border-neutral-100 px-4 py-3 sm:px-5">
              <div className="mb-2 flex items-center justify-between gap-2 rounded-lg bg-fern-50 px-3 py-2 ring-1 ring-fern-100">
                <span className="text-[11px] font-medium text-fern-800">Trooper replaces the stack</span>
                <span className="font-display text-[15px] leading-none text-fern-700">
                  {content.trooperPriceLabel}
                </span>
              </div>
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
