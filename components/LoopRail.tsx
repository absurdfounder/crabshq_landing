'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  Bug,
  FileText,
  GitPullRequest,
  Globe,
  LifeBuoy,
  type LucideIcon,
  Megaphone,
  PenTool,
  Plug,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';

import type { LoopRailItem } from '@/lib/loopCatalog';

const ease = [0.22, 1, 0.36, 1] as const;

const CATEGORY_ICON: Record<string, LucideIcon> = {
  CI: RefreshCw,
  Review: GitPullRequest,
  Testing: Bug,
  Quality: Bug,
  Growth: Megaphone,
  Website: Globe,
  Docs: FileText,
  Documents: FileText,
  Design: PenTool,
  Operations: LifeBuoy,
  Security: ShieldCheck,
  Finance: Banknote,
  Integrations: Plug,
};

const TRIGGER_LABEL: Record<string, string> = {
  manual: 'On demand',
  interval: 'On a schedule',
  event: 'On an event',
  webhook: 'On a webhook',
};

const TYPED_PROMPTS = [
  'Every Friday at 4pm, scan my open PRs and draft a team status update.',
  'When a refund lands in Stripe, reconcile it and tell me what broke.',
  'Watch the changelog and rewrite the help docs that go stale.',
];

const TYPE_MS = 38;
const HOLD_MS = 2200;

function useTypedPrompt(enabled: boolean) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [charCount, setCharCount] = useState(TYPED_PROMPTS[0].length);

  useEffect(() => {
    if (!enabled) return;
    setCharCount(0);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const full = TYPED_PROMPTS[promptIndex];

    if (charCount < full.length) {
      const id = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setPromptIndex((i) => (i + 1) % TYPED_PROMPTS.length);
      setCharCount(0);
    }, HOLD_MS);
    return () => window.clearTimeout(id);
  }, [enabled, charCount, promptIndex]);

  return {
    text: TYPED_PROMPTS[promptIndex].slice(0, charCount),
    typing: enabled && charCount < TYPED_PROMPTS[promptIndex].length,
  };
}

type LoopRailProps = {
  items: LoopRailItem[];
  totalCount: number;
};

/**
 * Browsable rail of real loops with category chips.
 *
 * Turns "we support a lot of things" into something the reader can actually
 * scan. Items are passed in from the server so the full catalog never reaches
 * the client bundle.
 */
export default function LoopRail({ items, totalCount }: LoopRailProps) {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [category, setCategory] = useState('All');
  const [progress, setProgress] = useState(0);

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const item of items) {
      if (!seen.includes(item.category)) seen.push(item.category);
    }
    return ['All', ...seen];
  }, [items]);

  const visible = useMemo(
    () => (category === 'All' ? items : items.filter((item) => item.category === category)),
    [items, category],
  );

  const typed = useTypedPrompt(!reduceMotion);

  const updateProgress = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, el.scrollLeft / max)) : 1);
  }, []);

  useEffect(() => {
    updateProgress();
  }, [updateProgress, visible.length]);

  useEffect(() => {
    // Reset to the start whenever the filter changes so the first card of the
    // new set is actually in view.
    scrollerRef.current?.scrollTo({ left: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [category, reduceMotion]);

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="font-funneldisplay text-[1.65rem] leading-[1.15] tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          Troopers work from a loop,
          <br />
          not a prompt.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          A loop has a goal, a check command and an exit condition — so a trooper knows when the
          job is actually done. Start from {totalCount} of them, or describe your own.
        </p>
      </motion.div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex shrink-0 flex-col gap-5 lg:w-[15rem]">
          <div
            className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:flex-wrap"
            role="group"
            aria-label="Filter loops by category"
          >
            {categories.map((name) => {
              const active = name === category;
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(name)}
                  className={[
                    'shrink-0 border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors',
                    active
                      ? 'border-ink bg-ink text-white'
                      : 'border-[var(--color-line)] bg-white text-ink-muted hover:bg-canvas-warm',
                  ].join(' ')}
                >
                  {name}
                </button>
              );
            })}
          </div>

          <Link
            href="/loops"
            className="group hidden items-center gap-1.5 self-start border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink lg:inline-flex"
          >
            <span>Browse all {totalCount} loops</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <div
            ref={scrollerRef}
            onScroll={updateProgress}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
          >
            {/* Describe-your-own card leads the rail: the fastest way to show
                that the catalog is a starting point, not a ceiling. */}
            <div className="flex w-[16rem] shrink-0 snap-start flex-col justify-between border border-[var(--color-line)] bg-white p-5 sm:w-[18rem]">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-line)] bg-canvas-section text-fern">
                  <PenTool className="h-4 w-4" />
                </span>
                <h3 className="mt-4 font-sans text-base text-ink">Describe your own</h3>
                <div className="mt-3 min-h-[5.5rem] border border-[var(--color-line)] bg-canvas-section p-3">
                  <p className="font-mono text-[11px] leading-relaxed text-ink-muted">
                    {typed.text}
                    {typed.typing && (
                      <span className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] bg-fern" />
                    )}
                  </p>
                </div>
              </div>
              <Link
                href="https://app.trooper.so?ref=looprail"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center self-start bg-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-neutral-800"
              >
                Build it
              </Link>
            </div>

            {visible.map((loop) => {
              const Icon = CATEGORY_ICON[loop.category] ?? RefreshCw;
              return (
                <Link
                  key={loop.slug}
                  href={`/loops/${loop.slug}`}
                  className="group flex w-[16rem] shrink-0 snap-start flex-col justify-between border border-[var(--color-line)] bg-white p-5 transition-colors hover:border-ink/25 hover:bg-canvas-section sm:w-[18rem]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="inline-flex h-10 w-10 items-center justify-center border border-[var(--color-line)] bg-canvas-section text-ink-muted">
                        <Icon className="h-4 w-4" />
                      </span>
                      {loop.hardened && (
                        <span className="border border-[var(--color-line)] px-1.5 py-1 font-silkscreen text-[9px] font-bold uppercase tracking-[0.14em] text-fern">
                          Hardened
                        </span>
                      )}
                    </div>
                    <h3 className="mt-4 font-sans text-base leading-snug text-ink">{loop.title}</h3>
                    <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-500">
                      {loop.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="border border-[var(--color-line)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                      {loop.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      {TRIGGER_LABEL[loop.trigger] ?? loop.trigger}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-4 h-px w-full bg-[var(--color-line)]" aria-hidden="true">
            <div
              className="h-px bg-ink transition-[width] duration-150"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>

          <Link
            href="/loops"
            className="group mt-5 inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink lg:hidden"
          >
            <span>Browse all {totalCount} loops</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
