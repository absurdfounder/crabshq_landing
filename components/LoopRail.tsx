'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { DemoTagBadge } from '@trooper/demo/tag-badge';

import type { LoopRailItem } from '@/lib/loopCatalog';
import type { LoopTag } from '@/lib/loopTagIcons';

import PixelButton from './ui/PixelButton';

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

/**
 * A prompt is a list of tokens, not a string.
 *
 * The old version typed a plain sentence one character at a time, which can
 * never express an entity — a tag is an atomic node, not a run of characters.
 * Modelling the prompt as `Array<string | LoopTag>` lets the tools the loop
 * actually touches type in as pills, the same ones the product uses.
 */
type PromptToken = string | LoopTag;

const TYPED_PROMPTS: PromptToken[][] = [
  [
    'Every Friday at 4pm, scan my open PRs in ',
    { label: 'GitHub', type: 'site', domain: 'github.com' },
    ' and post a status update to ',
    { label: 'Slack', type: 'site', domain: 'slack.com' },
    '.',
  ],
  [
    'When a refund lands in ',
    { label: 'Stripe', type: 'site', domain: 'stripe.com' },
    ', reconcile it and tell me what broke.',
  ],
  [
    'Watch the ',
    { label: 'changelog', type: 'topic' },
    ' and rewrite the ',
    { label: 'help docs', type: 'topic' },
    ' that go stale.',
  ],
];

const TYPE_MS = 38;
/** Longer than a character: a tag should land like an accepted autocomplete. */
const TAG_MS = 220;
const HOLD_MS = 2200;

const tokenText = (t: PromptToken) => (typeof t === 'string' ? t : t.label);
const promptText = (tokens: PromptToken[]) => tokens.map(tokenText).join('');

function useTypedPrompt(enabled: boolean) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Start at zero on both server and first client render so there is no flash.
  // The old hook seeded charCount to the full length and then reset it in an
  // effect, which painted the whole sentence for one frame on every mount.
  useEffect(() => {
    if (enabled) return;
    setTokenIndex(TYPED_PROMPTS[0].length);
    setCharCount(0);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const tokens = TYPED_PROMPTS[promptIndex];

    if (tokenIndex >= tokens.length) {
      const id = window.setTimeout(() => {
        setPromptIndex((i) => (i + 1) % TYPED_PROMPTS.length);
        setTokenIndex(0);
        setCharCount(0);
      }, HOLD_MS);
      return () => window.clearTimeout(id);
    }

    const token = tokens[tokenIndex];

    if (typeof token !== 'string') {
      const id = window.setTimeout(() => setTokenIndex((i) => i + 1), TAG_MS);
      return () => window.clearTimeout(id);
    }

    if (charCount < token.length) {
      const id = window.setTimeout(() => setCharCount((c) => c + 1), TYPE_MS);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => {
      setTokenIndex((i) => i + 1);
      setCharCount(0);
    }, TYPE_MS);
    return () => window.clearTimeout(id);
  }, [enabled, promptIndex, tokenIndex, charCount]);

  const tokens = TYPED_PROMPTS[promptIndex];
  return {
    tokens,
    tokenIndex,
    charCount,
    typing: enabled && tokenIndex < tokens.length,
    /** Static equivalent for assistive tech; the animated line is decoration. */
    label: promptText(tokens),
  };
}

function TypedPrompt() {
  const reduceMotion = useReducedMotion();
  const typed = useTypedPrompt(!reduceMotion);

  // The three prompts wrap to different heights, so cycling them would jump the
  // composer. Render the longest in flow but invisible as an exact spacer, and
  // float the animated one over it — no magic min-height, correct at any width.
  const longest = useMemo(
    () => TYPED_PROMPTS.reduce((a, b) => (promptText(a).length >= promptText(b).length ? a : b)),
    [],
  );

  return (
    <div className="relative">
      <p className="invisible text-[15px] leading-relaxed sm:text-base" aria-hidden>
        {promptText(longest)}
      </p>

      <p className="absolute inset-0 text-[15px] leading-relaxed text-ink sm:text-base" aria-hidden>
        {typed.tokens.slice(0, typed.tokenIndex).map((token, i) =>
          typeof token === 'string' ? (
            <span key={i}>{token}</span>
          ) : (
            <span key={i} className="mx-0.5 inline-flex translate-y-[1px] align-middle">
              <DemoTagBadge tag={token} size="xs" />
            </span>
          ),
        )}
        {typeof typed.tokens[typed.tokenIndex] === 'string' && (
          <span>{(typed.tokens[typed.tokenIndex] as string).slice(0, typed.charCount)}</span>
        )}
        {typed.typing && (
          <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-trooper" />
        )}
      </p>

      <span className="sr-only">{typed.label}</span>
    </div>
  );
}

type LoopRailProps = {
  items: LoopRailItem[];
  totalCount: number;
};

/**
 * Loops: a composer, then the catalog.
 *
 * The composer used to be the first card inside the same horizontal scroller
 * as the loops, styled identically — so the one element that invites you to
 * write something looked like just another tile, and the cards themselves got
 * clipped mid-word at the rail's edge. It now leads the section at full width,
 * and the loops sit under it in a grid that nothing cuts off.
 */
export default function LoopRail({ items, totalCount }: LoopRailProps) {
  const [category, setCategory] = useState('All');

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

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section">
          Troopers work from a loop,
          <br />
          not a prompt.
        </h2>
        <p className="lede">
          A loop has a goal, a check command and an exit condition — so a trooper knows when the
          job is actually done. Describe one, or start from {totalCount}.
        </p>
      </motion.div>

      {/* Composer — an input surface, not a card. */}
      <div className="border border-[var(--color-line)] bg-white p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          <PenTool className="h-3.5 w-3.5 text-trooper" aria-hidden />
          Describe your own
        </div>

        <div className="mt-4 border border-[var(--color-line)] bg-canvas-section p-4">
          <TypedPrompt />
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-ink-muted">
            Name the trigger, the tools and the finish line. Trooper writes the loop.
          </p>
          <PixelButton
            href="https://app.trooper.so?ref=looprail"
            external
            size="sm"
            tone="dark"
            icon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Build it
          </PixelButton>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter loops by category">
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

      {/* Every category ships exactly `perCategory` loops, so a filter always
          fills a whole row rather than leaving one orphan card. min-h holds two
          rows so filtering doesn't jump the rest of the page. */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:min-h-[34rem] lg:grid-cols-3">
        {visible.map((loop) => {
          const Icon = CATEGORY_ICON[loop.category] ?? RefreshCw;
          return (
            <Link
              key={loop.slug}
              href={`/loops/${loop.slug}`}
              className="group flex h-full flex-col justify-between border border-[var(--color-line)] bg-white p-5 transition-colors hover:border-ink/25 hover:bg-canvas-section"
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
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">
                  {loop.description}
                </p>

                {loop.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {loop.tags.map((tag) => (
                      <DemoTagBadge key={tag.label} tag={tag} size="xs" />
                    ))}
                  </div>
                )}
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

      <div className="mt-6">
        <Link href="/loops" className="group link-mono">
          <span>Browse all {totalCount} loops</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
