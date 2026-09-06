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

import TrooperAvatar from './ui/TrooperAvatar';
import type { LoopRailItem } from '@/lib/loopCatalog';
import { TROOPERS, type Trooper } from '@/lib/troopers';
import LoopComposer from './LoopComposer';
import { useScrollDrivenRail } from './useScrollDrivenRail';

const ease = [0.22, 1, 0.36, 1] as const;

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

const TROOPER_BY_LOOP = new Map(TROOPERS.map((t) => [t.loopSlug, t]));

/**
 * Compact loop tile — same size/structure as the original rail cards.
 * Attribution line under the exit condition shows who runs it for whom.
 */
function LoopCard({ loop, cloned }: { loop: LoopRailItem; cloned?: boolean }) {
  const Icon = CATEGORY_ICON[loop.category] ?? RefreshCw;
  const trooper = TROOPER_BY_LOOP.get(loop.slug);

  return (
    <Link
      href={`/loops/${loop.slug}`}
      aria-hidden={cloned || undefined}
      tabIndex={cloned ? -1 : undefined}
      className="group flex h-[8.75rem] w-[17rem] shrink-0 flex-col rounded-xl border border-[var(--color-line)] bg-white px-4 py-3 transition-colors hover:border-ink/25 hover:bg-canvas-section"
    >
      <div className="flex items-start gap-2.5">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-[var(--color-line)] bg-canvas-section text-ink-muted transition-colors group-hover:border-ink/20">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase leading-none tracking-[0.12em] text-ink-faint">
            {loop.category}
          </p>
          <p className="mt-1.5 truncate text-sm font-medium leading-snug text-ink">{loop.title}</p>
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-ink-muted">
        <span className="text-ink-faint">Runs until </span>
        {loop.exitCondition}
      </p>

      {trooper ? (
        <Attribution trooper={trooper} />
      ) : (
        <span className="mt-auto" aria-hidden />
      )}
    </Link>
  );
}

function Attribution({ trooper }: { trooper: Trooper }) {
  return (
    <p className="mt-auto flex min-w-0 items-center gap-1.5 pt-2 text-[11px] leading-none text-ink-muted">
      <TrooperAvatar trooper={trooper} size={18} />
      <span className="truncate">
        <span className="font-medium text-ink">{trooper.name}</span>
        {` ${trooper.verb} `}
      </span>
      <HumanFace name={trooper.human} />
      <span className="min-w-0 truncate">
        <span className="font-medium text-ink">{trooper.human}&rsquo;s</span>
        {` ${trooper.artifact}`}
      </span>
    </p>
  );
}

function HumanFace({ name }: { name: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny attribution face
    <img
      src={`https://i.pravatar.cc/48?u=human-${name.toLowerCase()}`}
      alt=""
      width={14}
      height={14}
      className="size-3.5 shrink-0 rounded-full object-cover ring-1 ring-[var(--color-line)]"
    />
  );
}

function LoopRow({ loops, reverse = false }: { loops: LoopRailItem[]; reverse?: boolean }) {
  const trackRef = useScrollDrivenRail<HTMLDivElement>(reverse);

  return (
    <div className="scrollbar-hide overflow-x-auto py-1.5">
      <div ref={trackRef} className="rail-track flex gap-3">
        {loops.map((loop) => (
          <LoopCard key={loop.slug} loop={loop} />
        ))}
        {loops.map((loop) => (
          <LoopCard key={`clone-${loop.slug}`} loop={loop} cloned />
        ))}
      </div>
    </div>
  );
}

type LoopRailProps = {
  items: LoopRailItem[];
  totalCount: number;
};

/**
 * “oo” in loop — continuous Gerono lemniscate (∞) so the dash travels
 * around both O lobes like a real infinity, not a vertical bounce.
 */
function LoopInfinityOo() {
  // Parametric Gerono: x=a·cos(t), y=a·sin(t)·cos(t) — one closed ∞ stroke.
  const d =
    'M44.50 13.00L44.46 14.21L44.34 15.39L44.14 16.54L43.87 17.62L43.52 18.63L43.09 19.54L42.59 20.34L42.02 21.01L41.38 21.55L40.68 21.93L39.91 22.17L39.08 22.25L38.20 22.17L37.26 21.93L36.28 21.55L35.25 21.01L34.18 20.34L33.08 19.54L31.95 18.63L30.79 17.62L29.61 16.54L28.41 15.39L27.21 14.21L26.00 13.00L24.79 11.79L23.59 10.61L22.39 9.46L21.21 8.37L20.05 7.37L18.92 6.46L17.82 5.66L16.75 4.99L15.72 4.45L14.74 4.07L13.80 3.83L12.92 3.75L12.09 3.83L11.32 4.07L10.62 4.45L9.98 4.99L9.41 5.66L8.91 6.46L8.48 7.37L8.13 8.37L7.86 9.46L7.66 10.61L7.54 11.79L7.50 13.00L7.54 14.21L7.66 15.39L7.86 16.54L8.13 17.62L8.48 18.63L8.91 19.54L9.41 20.34L9.98 21.01L10.62 21.55L11.32 21.93L12.09 22.17L12.92 22.25L13.80 22.17L14.74 21.93L15.72 21.55L16.75 21.01L17.82 20.34L18.92 19.54L20.05 18.63L21.21 17.62L22.39 16.54L23.59 15.39L24.79 14.21L26.00 13.00L27.21 11.79L28.41 10.61L29.61 9.46L30.79 8.38L31.95 7.37L33.08 6.46L34.18 5.66L35.25 4.99L36.28 4.45L37.26 4.07L38.20 3.83L39.08 3.75L39.91 3.83L40.68 4.07L41.38 4.45L42.02 4.99L42.59 5.66L43.09 6.46L43.52 7.37L43.87 8.38L44.14 9.46L44.34 10.61L44.46 11.79L44.50 13.00';

  return (
    <span className="loop-oo relative mx-[0.02em] inline-block align-[-0.12em]" aria-hidden>
      <svg viewBox="0 0 52 26" className="h-[0.72em] w-[1.48em] overflow-visible" fill="none">
        <path
          className="loop-oo-track"
          d={d}
          pathLength={100}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        />
        <path
          className="loop-oo-flow"
          d={d}
          pathLength={100}
          stroke="currentColor"
          strokeWidth="3.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="sr-only">oo</span>
    </span>
  );
}

function LoopHeadline() {
  return (
    <h2 className="h2-section mx-auto">
      Troopers work from a l
      <LoopInfinityOo />
      p,
      <br />
      not a prompt.
    </h2>
  );
}

/**
 * Loops: composer, then two compact scroll rows — original card craft,
 * with a quiet trooper→human line so the rail reads as multiplayer.
 */
export default function LoopRail({ items, totalCount }: LoopRailProps) {
  const bySlug = new Map(items.map((l) => [l.slug, l]));
  const featured: LoopRailItem[] = TROOPERS.map((t) => {
    const hit = bySlug.get(t.loopSlug);
    if (hit) return hit;
    return {
      slug: t.loopSlug,
      title: t.loopTitle,
      category: LOOP_CATEGORY[t.loopSlug] ?? t.role,
      exitCondition: LOOP_EXIT[t.loopSlug] ?? t.detail,
    };
  });
  const rest = items.filter((l) => !TROOPERS.some((t) => t.loopSlug === l.slug));
  const preview = [...featured, ...rest].slice(0, Math.max(items.length, featured.length));
  const half = Math.ceil(preview.length / 2);
  const top = preview.slice(0, half);
  const bottom = preview.slice(half);

  return (
    <div>
      <motion.div
        className="mx-auto mb-6 max-w-3xl text-center md:mb-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <LoopHeadline />
        <p className="lede mx-auto">
          A loop has a goal, a check command and an exit condition — so a trooper knows when the
          job is actually done. Describe one, or start from {totalCount}.
        </p>
      </motion.div>

      <div className="mx-auto max-w-3xl">
        <LoopComposer />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <LoopRow loops={top} />
        <LoopRow loops={bottom} reverse />
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
