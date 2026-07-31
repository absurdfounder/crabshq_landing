'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import type { IntegrationTile } from '@/lib/integrationScroller';
import { useScrollDrivenRail } from './useScrollDrivenRail';

const ease = [0.22, 1, 0.36, 1] as const;

type IntegrationScrollerProps = {
  tiles: IntegrationTile[];
  /** Real catalog size — the only number this section asserts. */
  totalCount: number;
};

function Tile({ tile, cloned }: { tile: IntegrationTile; cloned?: boolean }) {
  const [broken, setBroken] = useState(false);

  return (
    <Link
      href={tile.href}
      // The second copy exists only so the -50% loop is seamless; it must not
      // be reachable by keyboard or announced twice.
      aria-hidden={cloned || undefined}
      tabIndex={cloned ? -1 : undefined}
      // A chip, not a cell: rounded, lifted off the page by a ring and a 1px
      // shadow rather than boxed in by a full-strength hairline. Seventy-two of
      // these run across the widest part of the page, so whatever they are, the
      // eye reads it as the site's basic unit — and 72 hard-edged rectangles in
      // a row is the single loudest "assembled by a machine" signal on the page.
      className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-white px-3 shadow-xs ring-1 ring-black/5 transition-colors hover:bg-neutral-50"
    >
      {!broken && (
        // Plain <img>: 36 remote logos through the image optimiser is server
        // cost for no gain at this size.
        <img
          src={tile.logo}
          alt=""
          width={18}
          height={18}
          loading="lazy"
          decoding="async"
          className="size-[18px] shrink-0 rounded-[3px] object-contain"
          onError={() => setBroken(true)}
        />
      )}
      <span className="whitespace-nowrap text-[13px] font-medium text-neutral-700">
        {tile.name}
      </span>
    </Link>
  );
}

function Row({ tiles, reverse = false }: { tiles: IntegrationTile[]; reverse?: boolean }) {
  const trackRef = useScrollDrivenRail<HTMLDivElement>(reverse);

  return (
    <div className="rail-fade scrollbar-hide overflow-x-auto">
      <div ref={trackRef} className="rail-track flex gap-3">
        {tiles.map((tile) => (
          <Tile key={tile.slug} tile={tile} />
        ))}
        {tiles.map((tile) => (
          <Tile key={`clone-${tile.slug}`} tile={tile} cloned />
        ))}
      </div>
    </div>
  );
}

/**
 * Works with everything.
 *
 * Two rails that move as the page is scrolled, over the real plugin catalog —
 * every tile links to a real /plugin/* page, so this is 36 genuine internal
 * links rather than decoration. It replaces a hardcoded 24-favicon 3D grid
 * that asserted nothing checkable.
 */
export default function IntegrationScroller({ tiles, totalCount }: IntegrationScrollerProps) {
  const half = Math.ceil(tiles.length / 2);
  const top = tiles.slice(0, half);
  const bottom = tiles.slice(half);

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section">
          Anything you do in a computer,
          <br />
          Trooper can do for you.
        </h2>
        <p className="lede">
          Troopers work in the tools you already pay for — and if it has an API, they can reach it.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        <Row tiles={top} />
        <Row tiles={bottom} reverse />
      </div>

      <div className="mt-6">
        <Link href="/plugin" className="group link-mono">
          <span>Browse all {totalCount.toLocaleString()} integrations</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
