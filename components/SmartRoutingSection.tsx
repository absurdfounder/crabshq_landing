'use client';

import { Check, X } from 'lucide-react';
import { getFaviconUrl } from '@/lib/favicon';
import FeaturePeekStage from './ui/FeaturePeekStage';

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

const ROUTING_DESCRIPTION =
  'Trooper routes each request to the model most likely to get it right — combining strengths so the system beats any single model.';

type ModelId = 'gemini' | 'claude' | 'chatgpt';

type CategoryRow = {
  label: string;
  winner: ModelId;
};

const MODELS: { id: ModelId; label: string; domain: string }[] = [
  { id: 'gemini', label: 'Gemini', domain: 'gemini.google.com' },
  { id: 'claude', label: 'Claude', domain: 'claude.ai' },
  { id: 'chatgpt', label: 'ChatGPT', domain: 'openai.com' },
];

const CATEGORIES: CategoryRow[] = [
  { label: 'Accounting', winner: 'gemini' },
  { label: 'Coding', winner: 'claude' },
  { label: 'Writing', winner: 'chatgpt' },
  { label: 'Health', winner: 'gemini' },
  { label: 'Algorithms', winner: 'claude' },
  { label: 'Law', winner: 'chatgpt' },
];

const MockCard = ({
  title,
  meta,
  children,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/90 shadow-[0_28px_64px_-28px_rgba(28,25,23,0.35)] ring-1 ring-black/[0.04] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
      <span className="truncate text-[13px] font-semibold tracking-tight text-slate-900 sm:text-sm">{title}</span>
      {meta ? (
        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">{meta}</span>
      ) : null}
    </div>
    {children}
  </div>
);

const MockFoot = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2 border-t border-slate-100 px-4 py-3 sm:px-5 sm:py-3.5">
    {children}
  </div>
);

function ModelIcon({ domain, label, size = 18 }: { domain: string; label: string; size?: number }) {
  return (
    <img
      src={getFaviconUrl(domain, 64)}
      alt={label}
      width={size}
      height={size}
      className="rounded-sm"
      loading="lazy"
    />
  );
}

function ResultMark({ pass }: { pass: boolean }) {
  return pass ? (
    <Check className="mx-auto size-3.5 text-trooper" strokeWidth={2.5} aria-label="Correct" />
  ) : (
    <X className="mx-auto size-3.5 text-red-500" strokeWidth={2.5} aria-label="Incorrect" />
  );
}

function SmartRoutingVisual() {
  const scoreByModel = MODELS.map((model) => {
    const wins = CATEGORIES.filter((row) => row.winner === model.id).length;
    return { ...model, score: Math.round((wins / CATEGORIES.length) * 100) };
  });

  return (
    <MockCard
      title={
        <>
          Same test, different <span className="text-amber-600">strengths.</span>
        </>
      }
      meta="6 categories"
    >
      <div className="overflow-x-auto px-2 py-2 sm:px-3">
        <table className="w-full min-w-[260px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-2 pr-2 font-mono text-[9px] font-normal uppercase tracking-[0.12em] text-slate-400" />
              {MODELS.map((model) => (
                <th key={model.id} className="px-1 pb-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ModelIcon domain={model.domain} label={model.label} size={18} />
                    <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-slate-500">
                      {model.label}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((row) => (
              <tr key={row.label} className="border-b border-slate-50">
                <td className="py-2 pr-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500">
                  {row.label}
                </td>
                {MODELS.map((model) => (
                  <td key={model.id} className="px-1 py-2 text-center">
                    <ResultMark pass={row.winner === model.id} />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td className="pt-2.5 pr-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">Score</td>
              {scoreByModel.map((model) => (
                <td
                  key={model.id}
                  className="px-1 pt-2.5 text-center font-mono text-[12px] font-semibold tabular-nums text-slate-500"
                >
                  {model.score}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <MockFoot>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
          Routed test · beats every model
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {CATEGORIES.map((row, index) => {
            const model = MODELS.find((m) => m.id === row.winner)!;
            return (
              <span key={row.label} className="inline-flex items-center gap-1.5">
                {index > 0 ? (
                  <span className="font-mono text-[11px] text-slate-300" aria-hidden>
                    +
                  </span>
                ) : null}
                <ModelIcon domain={model.domain} label={model.label} size={20} />
              </span>
            );
          })}
          <span className="font-mono text-[12px] text-slate-300" aria-hidden>
            =
          </span>
          <span className="font-display text-xl font-medium tabular-nums text-amber-600 sm:text-2xl">100%</span>
        </div>
      </MockFoot>
    </MockCard>
  );
}

type SmartRoutingSectionProps = {
  kicker?: string;
};

/** Same card shell as other capabilities — sits between sticky deck segments. */
export default function SmartRoutingSection({ kicker = '09' }: SmartRoutingSectionProps) {
  return (
    <article
      aria-labelledby="smart-routing-heading"
      className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5"
    >
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <div className={`${sectionXPadding} flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-14`}>
          <p className="kicker text-sm sm:text-base">
            <span className="text-ink-faint/80">[{kicker}]</span>{' '}
            <span className="normal-case">Smart Routing</span>
          </p>
          <h3
            id="smart-routing-heading"
            className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]"
          >
            No single model wins every query
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
            {ROUTING_DESCRIPTION}
          </p>
        </div>

        <div className="relative min-h-[320px] border-t border-[var(--color-line)] sm:min-h-[380px] lg:min-h-[500px] lg:border-t-0 lg:rounded-r-xl">
          <FeaturePeekStage framed={false}>
            <SmartRoutingVisual />
          </FeaturePeekStage>
        </div>
      </div>
    </article>
  );
}
