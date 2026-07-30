'use client';

import { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ArrowUp, ChevronDown, Mic, Plus } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';

/**
 * A faithful mock of the real composer in app.trooper.so.
 *
 * The previous version was a plain bordered box with a mono label and a pixel
 * button — page furniture that looked nothing like the thing it was selling.
 * This mirrors the actual product chrome: the rounded card, the contenteditable
 * line with inline mention chips carrying avatars and favicons, and the toolbar
 * of pill controls underneath (add, usage ring, model, reasoning, mic, send).
 *
 * It is marked `data-mock-ui` so the radius census allow-lists it — rounded
 * corners are banned as page furniture, but this is product UI being quoted,
 * the same exemption HeroArticleDemo and the phone mock get.
 */

/**
 * Tool chips carry their own favicon domain rather than looking one up.
 * `getProviderDomain` maps coding agents and model providers only — it has no
 * entry for GitHub, Slack or Stripe, so routing those through it fell back to
 * trooper.so and painted a Trooper monogram on a GitHub chip.
 */
type Chip =
  | { kind: 'agent'; label: string; avatar: string }
  | { kind: 'tool'; label: string; domain: string };

type Token = string | Chip;

const PROMPTS: Token[][] = [
  [
    'hey ',
    { kind: 'agent', label: 'Leo', avatar: 'https://i.pravatar.cc/150?u=agent-leo' },
    ' use ',
    { kind: 'tool', label: 'Claude Code', domain: 'claude.ai' },
    ' to plan this, then ',
    { kind: 'tool', label: 'Codex CLI', domain: 'openai.com' },
    ' to execute — test before you commit',
  ],
  [
    'every Friday at 4pm, scan my open PRs in ',
    { kind: 'tool', label: 'GitHub', domain: 'github.com' },
    ' and post a status update to ',
    { kind: 'tool', label: 'Slack', domain: 'slack.com' },
  ],
  [
    'when a refund lands in ',
    { kind: 'tool', label: 'Stripe', domain: 'stripe.com' },
    ', reconcile it and tell ',
    { kind: 'agent', label: 'Aria', avatar: 'https://i.pravatar.cc/150?u=agent-aria' },
    ' what broke',
  ],
];

const TYPE_MS = 34;
/** Longer than a character — a chip should land like an accepted mention. */
const CHIP_MS = 240;
const HOLD_MS = 2600;

const text = (t: Token) => (typeof t === 'string' ? t : `@${t.label}`);
const plain = (tokens: Token[]) => tokens.map(text).join('');

/** The product's inline reference chip: avatar or favicon, then the label. */
function MentionChip({ chip }: { chip: Chip }) {
  // An avatar that fails to load leaves a hole in the middle of a sentence;
  // fall back to the initial on the same disc so it still reads as a person.
  const [avatarBroken, setAvatarBroken] = useState(false);

  return (
    <span className="mx-0.5 inline-flex max-w-full translate-y-[1px] items-center gap-1 rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 align-middle text-[0.92em] font-medium text-neutral-700">
      {chip.kind === 'agent' ? (
        avatarBroken ? (
          <span className="inline-flex h-[1.05em] w-[1.05em] shrink-0 items-center justify-center rounded-full bg-neutral-300 text-[0.6em] font-semibold text-white">
            {chip.label.charAt(0)}
          </span>
        ) : (
          <img
            src={chip.avatar}
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setAvatarBroken(true)}
            className="h-[1.05em] w-[1.05em] shrink-0 rounded-full object-cover"
          />
        )
      ) : (
        <DemoFavicon domain={chip.domain} size={14} rounded="sm" />
      )}
      <span className="truncate">{chip.kind === 'agent' ? `@${chip.label}` : chip.label}</span>
    </span>
  );
}

function useTypedTokens() {
  const reduceMotion = useReducedMotion();
  const [promptIndex, setPromptIndex] = useState(0);
  const [tokenIndex, setTokenIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (!reduceMotion) return;
    setTokenIndex(PROMPTS[0].length);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const tokens = PROMPTS[promptIndex];

    if (tokenIndex >= tokens.length) {
      const id = window.setTimeout(() => {
        setPromptIndex((i) => (i + 1) % PROMPTS.length);
        setTokenIndex(0);
        setCharCount(0);
      }, HOLD_MS);
      return () => window.clearTimeout(id);
    }

    const token = tokens[tokenIndex];
    if (typeof token !== 'string') {
      const id = window.setTimeout(() => setTokenIndex((i) => i + 1), CHIP_MS);
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
  }, [reduceMotion, promptIndex, tokenIndex, charCount]);

  const tokens = PROMPTS[promptIndex];
  return { tokens, tokenIndex, charCount, typing: !reduceMotion && tokenIndex < tokens.length, label: plain(tokens) };
}

/** Pill control in the composer toolbar. */
function ToolbarPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-white px-2 text-[11px] font-medium text-neutral-700 sm:h-8 sm:px-3 sm:text-sm">
      {children}
      <ChevronDown className="ml-0.5 h-3.5 w-3.5 text-neutral-400" aria-hidden />
    </span>
  );
}

export default function LoopComposer() {
  const typed = useTypedTokens();

  // The prompts wrap to different heights; render the longest invisibly in flow
  // as an exact spacer so cycling never resizes the card.
  const longest = useMemo(
    () => PROMPTS.reduce((a, b) => (plain(a).length >= plain(b).length ? a : b)),
    [],
  );

  return (
    <div
      data-mock-ui
      className="w-full min-w-0 rounded-2xl border border-neutral-200/70 bg-white"
    >
      <div className="flex flex-col gap-0 p-1">
        <div className="relative px-3 pb-0 pt-3 sm:px-3.5">
          <div className="relative text-[15px] leading-[1.45] text-neutral-900 sm:text-base sm:leading-[1.65]">
            <p className="invisible" aria-hidden>
              {plain(longest)}
            </p>

            <p className="absolute inset-0" aria-hidden>
              {typed.tokens.slice(0, typed.tokenIndex).map((token, i) =>
                typeof token === 'string' ? (
                  <span key={i}>{token}</span>
                ) : (
                  <MentionChip key={i} chip={token} />
                ),
              )}
              {typeof typed.tokens[typed.tokenIndex] === 'string' && (
                <span>{(typed.tokens[typed.tokenIndex] as string).slice(0, typed.charCount)}</span>
              )}
              {typed.typing && (
                <span className="ml-px inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-neutral-900" />
              )}
            </p>

            <span className="sr-only">{typed.label}</span>
          </div>
        </div>

        {/* Toolbar — mirrors the product's control row. */}
        <div className="flex min-w-0 items-center justify-between gap-1 px-1.5 py-1 sm:px-2 sm:py-1.5">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 sm:h-8 sm:w-8">
            <Plus className="h-4 w-4" aria-hidden />
          </span>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 overflow-hidden sm:gap-1.5">
            {/* Hosted usage ring */}
            <span className="relative hidden h-8 w-8 shrink-0 items-center justify-center sm:inline-flex">
              <svg width="30" height="30" viewBox="0 0 30 30" className="-rotate-90" aria-hidden>
                <circle className="fill-none stroke-neutral-200" cx="15" cy="15" r="13.625" strokeWidth="2.75" />
                <circle
                  className="fill-none stroke-trooper"
                  cx="15"
                  cy="15"
                  r="13.625"
                  strokeWidth="2.75"
                  strokeDasharray="85.6"
                  strokeDashoffset="75.3"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <ToolbarPill>
              <span className="max-w-[8rem] truncate">Trooper Auto</span>
            </ToolbarPill>
            <span className="hidden sm:inline-flex">
              <ToolbarPill>Auto</ToolbarPill>
            </span>

            <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-500 sm:inline-flex">
              <Mic className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
            </span>

            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white shadow sm:h-8 sm:w-8">
              <ArrowUp className="h-4 w-4 translate-y-px" strokeWidth={2.25} aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
