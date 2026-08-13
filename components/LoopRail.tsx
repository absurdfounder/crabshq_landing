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
import LoopComposer from './LoopComposer';
import { useScrollDrivenRail } from './useScrollDrivenRail';

const ease = [0.22, 1, 0.36, 1] as const;

/** Every category the rail can surface needs its own glyph — two categories
 *  sharing one is the kind of detail that reads as nobody looked. */
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

/**
 * Compact card. The grid version stood 12 of these four rows deep and ate a
 * whole screen; at this size two scrolling rows show more loops in a third of
 * the height, and a rail reads as "there are many of these" in a way a static
 * grid never does.
 *
 * The card shows the exit condition rather than the description, because the
 * exit condition is the thing the section's lede claims makes a loop a loop.
 * The description was prose that clipped mid-word at this width; the exit
 * condition is a short clause that differs on every card. The previous version
 * also carried a "Hardened" badge — 115 of 119 loops are hardened, so it
 * appeared on every card and distinguished nothing.
 */
function LoopCard({ loop, cloned }: { loop: LoopRailItem; cloned?: boolean }) {
  const Icon = CATEGORY_ICON[loop.category] ?? RefreshCw;

  return (
    <Link
      href={`/loops/${loop.slug}`}
      aria-hidden={cloned || undefined}
      tabIndex={cloned ? -1 : undefined}
      className="group flex h-[7.5rem] w-[17rem] shrink-0 flex-col justify-between rounded-xl bg-white px-4 py-3.5 shadow-xs ring-1 ring-black/5 transition-colors hover:bg-neutral-50"
    >
      <div className="flex items-start gap-2.5">
        <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-trooper-50 text-trooper-700">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-neutral-500">
            {loop.category}
          </p>
          <p className="mt-0.5 truncate text-sm font-medium leading-snug text-neutral-800">{loop.title}</p>
        </div>
      </div>

      <p className="line-clamp-2 text-[13px] leading-relaxed text-neutral-500">
        <span className="text-neutral-400">Runs until </span>
        {loop.exitCondition}
      </p>
    </Link>
  );
}

/**
 * One scroll-driven row. Same mechanism as the integrations rail — the track
 * advances with the page rather than on a timer, so nothing moves while the
 * reader is still.
 */
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
 * Loops: the composer, then two rows of them.
 *
 * The filter chips are gone with the grid. Filtering is a browse action and
 * /loops already does it properly; on the home page the job is to show that
 * there are a lot of these and that you can describe your own.
 */
export default function LoopRail({ items, totalCount }: LoopRailProps) {
  const half = Math.ceil(items.length / 2);
  const top = items.slice(0, half);
  const bottom = items.slice(half);

  return (
    <div>
      {/* Centred, like a launch screen: headline, lede, then the composer as
          the single focal object with real air around it, the catalog rows
          under it, and the browse link on the axis. */}
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section mx-auto">
          Troopers work from a loop,
          <br />
          not a prompt.
        </h2>
        <p className="lede mx-auto">
          A loop has a goal, a check command and an exit condition, so a trooper knows when the job
          is actually done. Describe one, or start from {totalCount}.
        </p>
      </motion.div>

      <div className="mx-auto mt-10 w-full max-w-[52rem] lg:mt-14">
        <LoopComposer />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10">
        <LoopRow loops={top} />
        <LoopRow loops={bottom} reverse />
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/loops" className="group link-mono">
          <span>Browse all {totalCount} loops</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
