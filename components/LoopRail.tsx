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
      className="group flex h-[8.75rem] w-[17rem] shrink-0 flex-col border border-[var(--color-line)] bg-white px-4 py-3 transition-colors hover:border-ink/25 hover:bg-canvas-section"
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
    <p className="mt-auto flex min-w-0 items-center gap-1 pt-2 text-[11px] leading-none text-ink-muted">
      <TrooperMark trooper={trooper} size={14} />
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
    <div className="rail-fade scrollbar-hide overflow-x-auto">
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

      <LoopComposer />

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
