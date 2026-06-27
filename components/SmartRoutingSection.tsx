'use client';

import { Check, X } from 'lucide-react';
import { getFaviconUrl } from '@/lib/favicon';
import FeaturePeekStage from './ui/FeaturePeekStage';

const sectionXPadding = 'px-4 sm:px-6 lg:px-8';

const ROUTING_STEPS = [
  'Models have different strengths — one is great at math, another at code, another at writing.',
  'Give them all the same test and they each miss the questions outside their strengths.',
  'If you take only the answers each one got right and combine them into one test,',
  'That combined test outscores every individual model.',
  'That is routing. Requests go to the model most likely to get it right, so the system as a whole beats any single model.',
];

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
    <Check className="mx-auto size-4 text-emerald-600" strokeWidth={2.5} aria-label="Correct" />
  ) : (
    <X className="mx-auto size-4 text-red-500" strokeWidth={2.5} aria-label="Incorrect" />
  );
}

function SmartRoutingVisual() {
  const scoreByModel = MODELS.map((model) => {
    const wins = CATEGORIES.filter((row) => row.winner === model.id).length;
    return { ...model, score: Math.round((wins / CATEGORIES.length) * 100) };
  });

  return (
    <div className="flex h-full min-h-0 w-full flex-col justify-center">
      <p className="mb-4 text-center font-serif text-lg text-ink sm:mb-5 sm:text-xl">
        Same test, different{' '}
        <span className="text-amber-600">strengths.</span>
      </p>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="pb-2 pr-2 font-mono text-[10px] font-normal uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]" />
              {MODELS.map((model) => (
                <th key={model.id} className="pb-2 px-1 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ModelIcon domain={model.domain} label={model.label} size={20} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-slate-600 sm:text-[11px]">
                      {model.label}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((row) => (
              <tr key={row.label} className="border-b border-slate-100">
                <td className="py-2 pr-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500 sm:text-[11px]">
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
              <td className="pt-3 pr-2 font-mono text-[10px] uppercase tracking-[0.08em] text-slate-400 sm:text-[11px]">
                Score
              </td>
              {scoreByModel.map((model) => (
                <td
                  key={model.id}
                  className="pt-3 px-1 text-center font-mono text-sm font-semibold tabular-nums text-slate-500 sm:text-base"
                >
                  {model.score}%
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.35)_1px,transparent_0)] bg-[length:10px_10px] px-3 py-4 sm:mt-6 sm:px-4 sm:py-5">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 sm:text-[11px]">
          Routed test · Beats every model
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((row, index) => {
            const model = MODELS.find((m) => m.id === row.winner)!;
            return (
              <span key={row.label} className="inline-flex items-center gap-1.5">
                {index > 0 ? (
                  <span className="font-mono text-xs text-slate-400" aria-hidden>
                    +
                  </span>
                ) : null}
                <ModelIcon domain={model.domain} label={model.label} size={22} />
              </span>
            );
          })}
          <span className="font-mono text-sm text-slate-400 sm:text-base" aria-hidden>
            =
          </span>
          <span className="font-serif text-2xl font-medium text-amber-600 sm:text-3xl">100%</span>
        </div>
      </div>
    </div>
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
          <ol className="mt-5 divide-y divide-slate-200 border-t border-slate-200 sm:mt-6">
            {ROUTING_STEPS.map((step, index) => (
              <li
                key={index}
                className="flex gap-3 py-3 text-sm leading-relaxed text-ink-muted sm:gap-4 sm:py-3.5 sm:text-[15px] sm:leading-7"
              >
                <span className="shrink-0 font-mono text-xs tabular-nums text-slate-400 sm:text-sm">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[320px] border-t border-[var(--color-line)] sm:min-h-[380px] lg:min-h-[500px] lg:border-t-0 lg:rounded-r-xl">
          <FeaturePeekStage>
            <SmartRoutingVisual />
          </FeaturePeekStage>
        </div>
      </div>
    </article>
  );
}
