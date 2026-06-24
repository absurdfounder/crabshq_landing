'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { getFaviconUrl } from '@/lib/favicon';

const COLS = 8;
const ROWS = 3;
const CELL = 400;
const GAP = 80;
const GRID_W = COLS * CELL + (COLS - 1) * GAP;
const GRID_H = ROWS * CELL + (ROWS - 1) * GAP;
const ROTATE_X = 48;

/** 8×3 grid — apps and sites Trooper agents commonly operate through. */
const LANDING_ICONS: ReadonlyArray<{ domain: string; label: string }> = [
  { domain: 'linkedin.com', label: 'LinkedIn' },
  { domain: 'slack.com', label: 'Slack' },
  { domain: 'github.com', label: 'GitHub' },
  { domain: 'linear.app', label: 'Linear' },
  { domain: 'notion.so', label: 'Notion' },
  { domain: 'stripe.com', label: 'Stripe' },
  { domain: 'figma.com', label: 'Figma' },
  { domain: 'discord.com', label: 'Discord' },
  { domain: 'google.com', label: 'Google' },
  { domain: 'gmail.com', label: 'Gmail' },
  { domain: 'x.com', label: 'X' },
  { domain: 'airtable.com', label: 'Airtable' },
  { domain: 'drive.google.com', label: 'Google Drive' },
  { domain: 'calendar.google.com', label: 'Google Calendar' },
  { domain: 'hubspot.com', label: 'HubSpot' },
  { domain: 'salesforce.com', label: 'Salesforce' },
  { domain: 'whatsapp.com', label: 'WhatsApp' },
  { domain: 'youtube.com', label: 'YouTube' },
  { domain: 'amazon.com', label: 'Amazon' },
  { domain: 'shopify.com', label: 'Shopify' },
  { domain: 'vercel.com', label: 'Vercel' },
  { domain: 'datadoghq.com', label: 'Datadog' },
  { domain: 'openai.com', label: 'OpenAI' },
  { domain: 'anthropic.com', label: 'Anthropic' },
];

function IconTile({ domain, label }: { domain: string; label: string }) {
  return (
    <div
      className="relative shrink-0 cursor-default hover:z-10"
      style={{ width: CELL, height: CELL }}
    >
      <div
        className="pointer-events-none absolute z-0 rounded-full"
        aria-hidden
        style={{
          left: '50%',
          bottom: 42,
          width: 312,
          height: 88,
          background:
            'radial-gradient(rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.28) 28%, rgba(0,0,0,0.1) 54%, transparent 76%)',
          opacity: 0.88,
          filter: 'blur(10px)',
          transform: 'translateX(-50%)',
        }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex h-[58%] w-[58%] items-center justify-center rounded-[2rem] bg-white shadow-[0_18px_40px_-12px_rgba(15,23,42,0.28),0_4px_12px_-4px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.06]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFaviconUrl(domain, 128)}
            alt=""
            width={112}
            height={112}
            className="h-[62%] w-[62%] rounded-2xl object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default function LandingIconsGrid() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.32);

  useLayoutEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const update = () => {
      const width = node.clientWidth;
      const inset = width >= 1024 ? 96 : 48;
      const next = Math.min(0.42, Math.max(0.22, (width - inset) / GRID_W));
      setScale(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={viewportRef}
      className="landing-icons-mask relative -mt-16 h-80 w-full overflow-hidden"
      role="img"
      aria-label="App and service icons Trooper agents can work with in the browser"
    >
      <div
        className="absolute inset-y-0 left-0 right-0 flex h-80 items-end justify-center overflow-hidden lg:left-10 lg:right-10 xl:left-12 xl:right-12"
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'calc(50% + 12px) 100%',
        }}
      >
        <div
          className="grid origin-bottom overflow-visible"
          style={{
            width: GRID_W,
            height: GRID_H,
            gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
            gap: GAP,
            transformOrigin: 'calc(50% + 12px) bottom',
            transform: `rotateX(${ROTATE_X}deg) scale(${scale})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {LANDING_ICONS.map((icon) => (
            <IconTile key={`${icon.domain}-${icon.label}`} domain={icon.domain} label={icon.label} />
          ))}
        </div>
      </div>
    </div>
  );
}
