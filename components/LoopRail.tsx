'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Newspaper,
  Package,
  PenTool,
  Plug,
  RefreshCw,
  Search,
  ShieldCheck,
} from 'lucide-react';

import type { LoopRailItem } from '@/lib/loopCatalog';
import { TROOPERS, type Trooper } from '@/lib/troopers';
import LoopComposer from './LoopComposer';
import TrooperMark from './ui/TrooperMark';

const ease = [0.22, 1, 0.36, 1] as const;

/** Exit lines for the trooper-backed preview — kept here so the client
 *  tile does not pull the full catalog / mermaid enricher. */
const LOOP_EXIT: Record<string, string> = {
  'ship-pr-until-green': 'all PR checks are success',
  'inbox-triage-with-approval':
    'all threads classified with drafts queued or escalations flagged',
  'meta-ads-ab-test':
    'launch meets target CPA or max test cycles complete with a documented winner',
  'morning-operator-brief':
    'brief is delivered with calendar conflicts, ticket status, and ranked actions',
  'landing-page-iteration': 'all annotated sections are addressed and preview is live',
};

const LOOP_CATEGORY: Record<string, string> = {
  'ship-pr-until-green': 'CI',
  'inbox-triage-with-approval': 'Operations',
  'meta-ads-ab-test': 'Growth',
  'morning-operator-brief': 'Operations',
  'landing-page-iteration': 'Design',
};

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
  Product: Package,
  Research: Search,
  Content: Newspaper,
};

type LoopRailProps = {
  /** Kept for call-site compatibility; trooper-backed loops drive the preview. */
  items?: LoopRailItem[];
  totalCount: number;
};

/**
 * Loops — playbook tiles on the home page.
 *
 * Each tile is the loop first (title + exit). A quiet attribution line under
 * it shows who runs it for whom — trooper mark + human face — without turning
 * the card into a product dashboard.
 */
export default function LoopRail({ totalCount }: LoopRailProps) {
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
          A loop has a goal, a check, and an exit. Describe one below, or start from{' '}
          {totalCount} playbooks the workforce already runs.
        </p>
      </motion.div>

      <div className="mx-auto w-full max-w-[52rem]">
        <LoopComposer />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {TROOPERS.map((trooper, index) => (
          <LoopTile key={trooper.handle} trooper={trooper} index={index} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease }}
          viewport={{ once: true, margin: '-20px' }}
          className="flex flex-col justify-between bg-white p-5 sm:p-6 md:p-7"
        >
          <div>
            <span className="type-eyebrow-num">{totalCount} loops</span>
            <p className="mt-5 text-base leading-snug text-ink sm:text-lg">
              The catalog is bigger than this page.
            </p>
            <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">
              CI, review, growth, ops, finance, security. Same deal: a goal, a check, and an
              exit that says when the job is done.
            </p>
          </div>
          <Link
            href="/loops"
            className="group mt-5 inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
          >
            <span>Browse all {totalCount} loops</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

function LoopTile({ trooper, index }: { trooper: Trooper; index: number }) {
  const title = trooper.loopTitle;
  const category = LOOP_CATEGORY[trooper.loopSlug] ?? trooper.role;
  const exit = LOOP_EXIT[trooper.loopSlug] ?? trooper.detail;
  const Icon = CATEGORY_ICON[category] ?? RefreshCw;

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 5) * 0.05, ease }}
      viewport={{ once: true, margin: '-20px' }}
      className="flex flex-col bg-canvas-section p-5 sm:p-6 md:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="inline-flex size-10 shrink-0 items-center justify-center bg-white text-ink ring-1 ring-[var(--color-line)]">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-funneldisplay text-lg tracking-tight text-ink sm:text-xl">
            {title}
          </h3>
          <p className="mt-1 truncate font-mono text-[11px] tracking-tight text-ink-muted sm:text-xs">
            /loops/{trooper.loopSlug}
          </p>
        </div>
        <span className="ml-auto shrink-0 bg-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint ring-1 ring-[var(--color-line)]">
          {category}
        </span>
      </div>

      <p className="mt-5 text-base leading-snug text-ink sm:text-lg">
        Runs until <span className="font-semibold">{exit}</span>.
      </p>

      <Attribution trooper={trooper} />

      <Link
        href={`/loops/${trooper.loopSlug}`}
        className="group mt-auto inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
      >
        <span>Open loop</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.article>
  );
}

/** Quiet foot line: who runs this loop for whom. */
function Attribution({ trooper }: { trooper: Trooper }) {
  return (
    <p className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13px] leading-snug text-ink-muted">
      <TrooperMark trooper={trooper} size={18} className="translate-y-px" />
      <span className="font-medium text-ink">{trooper.name}</span>
      <span>{trooper.verb}</span>
      <HumanFace name={trooper.human} />
      <span className="font-medium text-ink">{trooper.human}&rsquo;s</span>
      <span>{trooper.artifact}</span>
    </p>
  );
}

function HumanFace({ name }: { name: string }) {
  const src = `https://i.pravatar.cc/64?u=human-${name.toLowerCase()}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny demo face; next/image overkill
    <img
      src={src}
      alt=""
      width={18}
      height={18}
      className="size-[18px] shrink-0 rounded-full object-cover ring-1 ring-[var(--color-line)]"
    />
  );
}
