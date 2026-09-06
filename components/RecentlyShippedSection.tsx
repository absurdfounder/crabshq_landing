'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * Gumloop-style “Recently shipped” timeline — above the footer CTA.
 * Marks are Trooper silhouette colors so the strip reads as product identity.
 */

const SHIPPED = [
  {
    title: 'Company Brain',
    body: 'Shared knowledge, skills, and live activity in one place agents and humans can use.',
    date: '4 Sep 2026',
    color: '#11AC4B',
    shape: 'clover' as const,
  },
  {
    title: 'Optimize your troopers',
    body: 'Open-source model routing, self-improving loops, and evals built into the product.',
    date: '3 Sep 2026',
    color: '#9810FA',
    shape: 'pebble' as const,
  },
  {
    title: 'Loop API',
    body: 'Kick off approved playbooks from chat, cron, or your own systems — with human review gates.',
    date: '28 Aug 2026',
    color: '#03A2FE',
    shape: 'squircle' as const,
  },
  {
    title: 'Desktop apps',
    body: 'Download for Mac and Windows. Troopers run on your machine with your keys.',
    date: '20 Aug 2026',
    color: '#FE9A00',
    shape: 'round-rect' as const,
  },
  {
    title: 'Channels that call home',
    body: 'Slack, WhatsApp, and more — troopers meet your team where work already happens.',
    date: '12 Aug 2026',
    color: '#FB3C98',
    shape: 'circle' as const,
  },
] as const;

function ShipMark({
  color,
  shape,
}: {
  color: string;
  shape: (typeof SHIPPED)[number]['shape'];
}) {
  const common = { width: 14, height: 14, className: 'block shrink-0' } as const;
  switch (shape) {
    case 'circle':
      return (
        <svg viewBox="0 0 14 14" {...common} aria-hidden>
          <circle cx="7" cy="7" r="7" fill={color} />
        </svg>
      );
    case 'round-rect':
      return (
        <svg viewBox="0 0 14 14" {...common} aria-hidden>
          <rect width="14" height="14" rx="3" fill={color} />
        </svg>
      );
    case 'squircle':
      return (
        <svg viewBox="0 0 14 14" {...common} aria-hidden>
          <path
            d="M0 5.5C0 1.8 1.8 0 5.5 0h3C12.2 0 14 1.8 14 5.5v5C14 13.2 12.2 14 9.5 14h-5C1.8 14 0 12.2 0 9.5v-4z"
            fill={color}
          />
        </svg>
      );
    case 'pebble':
      return (
        <svg viewBox="0 0 14 14" {...common} aria-hidden>
          <path
            d="M5.8.3C3.2.9 1.2 2.6.5 5.1-.3 8.2.6 12.4 4 13.6c2.2.8 5 .4 6.8-1.2 2-1.8 3-4.6 2.8-7.3C13.4 2.3 10.6-.4 5.8.3z"
            fill={color}
          />
        </svg>
      );
    case 'clover':
      return (
        <svg viewBox="0 0 14 14" {...common} aria-hidden>
          <path
            d="M7 1.2c1.1-1.2 3-.9 4 .5 1.2 1.6.6 3.8-.8 4.8 1.4 1 2 3.2.8 4.8-1 1.4-2.9 1.7-4 .5-1.1 1.2-3 .9-4-.5-1.2-1.6-.6-3.8.8-4.8-1.4-1-2-3.2-.8-4.8 1-1.4 2.9-1.7 4-.5z"
            fill={color}
          />
        </svg>
      );
  }
}

export default function RecentlyShippedSection() {
  return (
    <div className="w-full">
      <Link
        href="https://github.com/Trooper-AI/trooper-core/releases"
        target="_blank"
        rel="noopener noreferrer"
        className="kicker inline-flex items-center gap-1.5 transition-colors hover:text-ink"
      >
        See what&apos;s new
        <ArrowRight className="h-3 w-3" aria-hidden />
      </Link>
      <h2 className="h2-section mt-3">Recently shipped</h2>

      <div className="relative mt-10 md:mt-12">
        {/* Timeline rule */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 right-0 top-[6px] hidden h-px bg-[var(--color-line)] md:block"
        />

        <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-5 md:gap-5">
          {SHIPPED.map((item) => (
            <li key={item.title} className="relative flex flex-col pt-0 md:pt-0">
              <span className="relative z-[1] mb-4 inline-flex size-3.5 items-center justify-center bg-canvas md:mb-5">
                <ShipMark color={item.color} shape={item.shape} />
              </span>
              <h3 className="text-[15px] font-medium leading-snug tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-muted">{item.body}</p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.06em] text-ink-faint">
                {item.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
