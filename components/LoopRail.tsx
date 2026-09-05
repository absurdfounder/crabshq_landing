'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Circle, Loader2 } from 'lucide-react';

import { TROOPERS, type Trooper } from '@/lib/troopers';
import LoopComposer from './LoopComposer';
import TrooperMark from './ui/TrooperMark';

const ease = [0.22, 1, 0.36, 1] as const;

type LoopRailProps = {
  /** Kept for call-site compatibility; cast stories drive the home preview. */
  items?: unknown;
  totalCount: number;
};

/**
 * Loops on the homepage: composer, then trooper×loop cards with live product
 * demos — who runs what, and what the loop is doing right now.
 *
 * Cast section is gone; this grid carries that story without the redundant
 * “everyone gets a trooper” band above.
 */
export default function LoopRail({ totalCount }: LoopRailProps) {
  const [rex, nova, ...rest] = TROOPERS;

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-12"
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
        <p className="mt-3 text-[15px] leading-relaxed text-ink-muted sm:text-base">
          A loop has a goal, a check, and an exit. Each card is one trooper, one
          human job, and the loop mid-flight — approve, triage, ship.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-[52rem]">
        <LoopComposer />
      </div>

      {/* Featured pair — deep demos for the two flagship stories */}
      <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] lg:mt-10 lg:grid-cols-2">
        {rex && (
          <FeatureCard trooper={rex} demo={<RexShipDemo />} delay={0} />
        )}
        {nova && (
          <FeatureCard trooper={nova} demo={<NovaInboxDemo />} delay={0.06} />
        )}
      </div>

      {/* Rest of the roster — same story format, compact live status */}
      <div className="mt-px grid grid-cols-1 gap-px border border-[var(--color-line)] border-t-0 bg-[var(--color-line)] sm:grid-cols-3">
        {rest.map((trooper, index) => (
          <CompactCard
            key={trooper.handle}
            trooper={trooper}
            demo={<CompactLoopDemo trooper={trooper} />}
            delay={0.1 + index * 0.05}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-[var(--color-line)] border-t-0 bg-white px-5 py-4 sm:px-6">
        <p className="text-[15px] text-ink-muted">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
            {totalCount} loops
          </span>
          <span className="mx-2 text-ink-faint">·</span>
          CI, review, growth, ops, finance — same deal: goal, check, exit.
        </p>
        <Link
          href="/loops"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:text-ink sm:text-xs"
        >
          <span>Browse all {totalCount}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

function FeatureCard({
  trooper,
  demo,
  delay,
}: {
  trooper: Trooper;
  demo: ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      viewport={{ once: true, margin: '-20px' }}
      className="flex flex-col bg-canvas-section p-5 sm:p-6 md:p-7"
    >
      <CardHeader trooper={trooper} />
      <StoryLine trooper={trooper} />
      <div className="mt-5 flex-1">{demo}</div>
      <LoopLink trooper={trooper} />
    </motion.article>
  );
}

function CompactCard({
  trooper,
  demo,
  delay,
}: {
  trooper: Trooper;
  demo: ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease }}
      viewport={{ once: true, margin: '-20px' }}
      className="flex flex-col bg-canvas-section p-5 sm:p-6"
    >
      <CardHeader trooper={trooper} compact />
      <StoryLine trooper={trooper} compact />
      <div className="mt-4 flex-1">{demo}</div>
      <LoopLink trooper={trooper} />
    </motion.article>
  );
}

function CardHeader({
  trooper,
  compact,
}: {
  trooper: Trooper;
  compact?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <TrooperMark trooper={trooper} size={compact ? 32 : 40} />
      <div className="min-w-0">
        <h3
          className={`font-funneldisplay tracking-tight text-ink ${
            compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
          }`}
        >
          {trooper.name}
        </h3>
        <p className="mt-0.5 truncate font-mono text-[11px] tracking-tight text-ink-muted">
          {`${trooper.handle}@trooper.so`}
        </p>
      </div>
      <span className="ml-auto shrink-0 bg-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint ring-1 ring-[var(--color-line)]">
        {trooper.role}
      </span>
    </div>
  );
}

function StoryLine({
  trooper,
  compact,
}: {
  trooper: Trooper;
  compact?: boolean;
}) {
  return (
    <p
      className={`mt-4 leading-snug text-ink ${
        compact ? 'text-[15px] sm:text-base' : 'text-base sm:text-lg'
      }`}
    >
      <span className="font-semibold">{trooper.name}</span> {trooper.verb}{' '}
      <span className="font-semibold">{trooper.human}&rsquo;s</span> {trooper.artifact}.
    </p>
  );
}

function LoopLink({ trooper }: { trooper: Trooper }) {
  return (
    <Link
      href={`/loops/${trooper.loopSlug}`}
      className="group/link mt-auto inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
    >
      <span>Runs {trooper.loopTitle}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
    </Link>
  );
}

/* ── Product demos ─────────────────────────────────────────────────────── */

const REX_STEPS = [
  { id: 'branch', label: 'Open branch fix/og-image' },
  { id: 'tests', label: 'Run vitest + playwright' },
  { id: 'push', label: 'Push + watch CI' },
  { id: 'green', label: 'CI green — ready for Priya' },
] as const;

function RexShipDemo() {
  const [step, setStep] = useState(0);
  const [approved, setApproved] = useState(false);
  const done = step >= REX_STEPS.length - 1;

  return (
    <div
      data-mock-ui
      className="flex h-full flex-col overflow-hidden bg-white ring-1 ring-[var(--color-line)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          ship-pr-until-green
        </span>
        <span
          className={`inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] ${
            approved ? 'text-ok-600' : done ? 'text-ok-600' : 'text-ink-muted'
          }`}
        >
          {approved ? (
            <>
              <Check className="h-3 w-3" strokeWidth={2.5} /> Merged
            </>
          ) : done ? (
            <>
              <Check className="h-3 w-3" strokeWidth={2.5} /> Green
            </>
          ) : (
            <>
              <Loader2 className="h-3 w-3 animate-spin" /> Looping
            </>
          )}
        </span>
      </div>

      <ul className="flex-1 space-y-2 px-3.5 py-3">
        {REX_STEPS.map((s, i) => {
          const active = i === step && !approved;
          const complete = i < step || approved || (done && i <= step);
          return (
            <li key={s.id} className="flex items-center gap-2.5 text-[13px]">
              <span
                className={`inline-flex size-5 shrink-0 items-center justify-center ${
                  complete
                    ? 'bg-ok-600 text-white'
                    : active
                      ? 'bg-ink text-white'
                      : 'bg-canvas-section text-ink-faint ring-1 ring-[var(--color-line)]'
                }`}
              >
                {complete ? (
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                ) : active ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Circle className="h-2.5 w-2.5" strokeWidth={2} />
                )}
              </span>
              <span className={complete || active ? 'text-ink' : 'text-ink-faint'}>
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-2 border-t border-[var(--color-line)] bg-canvas-section px-3.5 py-2.5">
        {!done ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(s + 1, REX_STEPS.length - 1))}
            className="bg-ink px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
          >
            Advance loop
          </button>
        ) : !approved ? (
          <>
            <button
              type="button"
              onClick={() => setApproved(true)}
              className="bg-ok-600 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
            >
              Approve merge
            </button>
            <span className="text-[12px] text-ink-muted">Held for Priya</span>
          </>
        ) : (
          <button
            type="button"
            onClick={() => {
              setApproved(false);
              setStep(0);
            }}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted underline-offset-2 hover:text-ink hover:underline"
          >
            Reset demo
          </button>
        )}
      </div>
    </div>
  );
}

const INBOX = [
  {
    id: 't1',
    from: 'Acme · billing',
    subject: 'Invoice discrepancy on March seat count',
    draft:
      'Thanks for flagging — seats were prorated mid-cycle. Here’s the corrected PDF and a one-line explanation for finance.',
  },
  {
    id: 't2',
    from: 'Nora · trial',
    subject: 'Can we SSO before the pilot kickoff?',
    draft:
      'Yes — Okta SAML is live on your workspace. I’ve attached the 4-step setup; reply if you want me to walk IT through it.',
  },
  {
    id: 't3',
    from: 'Lee · churn risk',
    subject: 'Export keeps timing out on large orgs',
    draft:
      'Reproduced on a 40k-row org. Patch is in review; workaround is CSV chunked export until Friday’s release.',
  },
] as const;

function NovaInboxDemo() {
  const [selected, setSelected] = useState(0);
  const [sent, setSent] = useState<Record<string, boolean>>({});
  const ticket = INBOX[selected]!;
  const isSent = Boolean(sent[ticket.id]);

  return (
    <div
      data-mock-ui
      className="flex h-full flex-col overflow-hidden bg-white ring-1 ring-[var(--color-line)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3.5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          inbox-triage-with-approval
        </span>
        <span className="font-mono text-[10px] text-ink-muted">
          {Object.keys(sent).length}/{INBOX.length} cleared
        </span>
      </div>

      <div className="grid flex-1 grid-cols-1 border-b border-[var(--color-line)] sm:grid-cols-[7.5rem_1fr]">
        <ul className="divide-y divide-[var(--color-line)] border-b border-[var(--color-line)] sm:border-b-0 sm:border-r">
          {INBOX.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={`flex w-full flex-col gap-0.5 px-3 py-2.5 text-left transition-colors ${
                  i === selected ? 'bg-canvas-section' : 'hover:bg-canvas-section/60'
                }`}
              >
                <span className="flex items-center gap-1.5 truncate text-[11px] font-medium text-ink">
                  {sent[t.id] ? (
                    <Check className="h-3 w-3 shrink-0 text-ok-600" strokeWidth={2.5} />
                  ) : null}
                  <span className="truncate">{t.from}</span>
                </span>
                <span className="truncate text-[10px] text-ink-faint">{t.subject}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col px-3.5 py-3">
          <p className="text-[11px] font-medium text-ink">{ticket.subject}</p>
          <p className="mt-2 flex-1 text-[12px] leading-relaxed text-ink-muted">
            {ticket.draft}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!isSent ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setSent((prev) => ({ ...prev, [ticket.id]: true }))
                  }
                  className="bg-ok-600 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
                >
                  Approve send
                </button>
                <span className="text-[11px] text-ink-muted">Held for Sam</span>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-ok-600">
                <Check className="h-3 w-3" strokeWidth={2.5} /> Sent in Sam’s voice
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactLoopDemo({ trooper }: { trooper: Trooper }) {
  const [running, setRunning] = useState(true);
  const [tick, setTick] = useState(0);

  const lines: Record<string, string[]> = {
    scout: [
      'Variant A · $42 CAC',
      'Variant B · $31 CAC ← winner',
      'Budget cap: Dana’s $2.4k/day',
    ],
    pip: [
      'Slack · 14 overnight threads',
      'Support · 3 escalations',
      'One-pager on Ana’s desk',
    ],
    wren: [
      'Figma → staging sync',
      'Screenshot diff: 2px off',
      'Iterate until match',
    ],
  };
  const copy = lines[trooper.handle] ?? [
    'Goal set',
    'Check running',
    'Exit when done',
  ];

  return (
    <div
      data-mock-ui
      className="overflow-hidden bg-white ring-1 ring-[var(--color-line)]"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-line)] px-3 py-2">
        <span className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint">
          {trooper.loopSlug}
        </span>
        <button
          type="button"
          onClick={() => {
            setRunning((r) => !r);
            setTick((t) => t + 1);
          }}
          className={`font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${
            running ? 'text-ok-600' : 'text-ink-muted'
          }`}
        >
          {running ? '● Live' : '○ Paused'}
        </button>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {copy.map((line, i) => (
          <li
            key={`${tick}-${line}`}
            className={`flex items-start gap-2 text-[12px] leading-snug ${
              running && i === copy.length - 1 ? 'text-ink' : 'text-ink-muted'
            }`}
          >
            <span
              className={`mt-1 size-1.5 shrink-0 ${
                running && i === copy.length - 1 ? 'bg-ok-600' : 'bg-ink-faint'
              }`}
            />
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
