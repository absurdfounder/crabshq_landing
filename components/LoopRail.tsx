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
 * Cast-inspired loop cell: hairline grid, mono category, bold job line, quiet CTA.
 * Same craft as the cast roster — different job (playbook, not person).
 */
function LoopCard({ loop, index }: { loop: LoopRailItem; index: number }) {
  const Icon = CATEGORY_ICON[loop.category] ?? RefreshCw;

  return (
    <motion.div
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
            {loop.title}
          </h3>
          <p className="mt-1 truncate font-mono text-[11px] tracking-tight text-ink-muted sm:text-xs">
            /loops/{loop.slug}
          </p>
        </div>
        <span className="ml-auto shrink-0 bg-white px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-faint ring-1 ring-[var(--color-line)]">
          {loop.category}
        </span>
      </div>

      <p className="mt-5 text-base leading-snug text-ink sm:text-lg">
        Runs until <span className="font-semibold">{loop.exitCondition}</span>.
      </p>

      <Link
        href={`/loops/${loop.slug}`}
        className="group mt-auto inline-flex items-center gap-1.5 self-start border-b border-transparent pb-0.5 pt-5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink sm:text-xs"
      >
        <span>Open loop</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}

type LoopRailProps = {
  items: LoopRailItem[];
  totalCount: number;
};

/**
 * Loops — playbook catalog on the home page.
 *
 * Visual language matches the cast hairline grid so the page feels one system;
 * the job stays distinct: cast = who, loops = the playbook they run.
 * Composer stays above the grid; section order on the homepage is unchanged.
 */
export default function LoopRail({ items, totalCount }: LoopRailProps) {
  // Five loops + the browse cell fills a 3×2 cast-style grid.
  const preview = items.slice(0, 5);

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

      {/* Same hairline grid craft as the cast — opaque cells, 1px line gaps. */}
      <div className="mt-8 grid grid-cols-1 gap-px border border-[var(--color-line)] bg-[var(--color-line)] sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((loop, index) => (
          <LoopCard key={loop.slug} loop={loop} index={index} />
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
