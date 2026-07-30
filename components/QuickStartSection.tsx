'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Globe, Smartphone } from 'lucide-react';

import PixelButton from './ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

type Target = {
  id: string;
  /** Tab label. */
  label: string;
  /** Mono line describing what the reader is committing to. */
  requirements: string;
  /** Steps shown in the panel, in order. */
  steps: string[];
  cta: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
  icon: typeof Globe;
};

/**
 * Distribution surface, verbatim from the download page — every requirement
 * string and href below already ships on /download. Nothing here describes an
 * install path Trooper does not have: there is no public CLI or package, so
 * this is a platform picker rather than a copy-paste install block.
 */
const TARGETS: Target[] = [
  {
    id: 'web',
    label: 'Browser',
    requirements: 'No install · any modern browser',
    steps: [
      'Open app.trooper.so and sign in.',
      'Connect the tools your troopers need — Gmail, Slack, GitHub.',
      'Pick a loop, approve the first run.',
    ],
    cta: { label: 'Start in the browser', href: 'https://app.trooper.so?ref=quickstart', external: true },
    icon: Globe,
  },
  {
    id: 'mac',
    label: 'macOS',
    requirements: 'macOS 12+ · Universal (Intel & Apple Silicon)',
    steps: [
      'Download the Mac app.',
      'Sign in with the same account as the web app.',
      'Your troopers run on your machine, not a vendor cloud.',
    ],
    cta: { label: 'Download Mac app', href: '/download/mac' },
    secondary: { label: 'All platforms', href: '/download' },
    icon: Download,
  },
  {
    id: 'windows',
    label: 'Windows',
    requirements: 'Windows 10 20H2+ and Windows 11 · x64',
    steps: [
      'Download the Windows app.',
      'Sign in with the same account as the web app.',
      'Your troopers run on your machine, not a vendor cloud.',
    ],
    cta: { label: 'Download Windows app', href: '/download/windows' },
    secondary: { label: 'All platforms', href: '/download' },
    icon: Download,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    requirements: 'iPhone, iPad and Android',
    steps: [
      'Install the app on your phone.',
      'Approve work from anywhere — nothing sends until you say so.',
      'Or message your troopers from Slack, Telegram or WhatsApp.',
    ],
    cta: { label: 'Get the mobile apps', href: '/download' },
    secondary: { label: 'Browse channels', href: '/channels' },
    icon: Smartphone,
  },
];

/**
 * Quick Start.
 *
 * Modelled on openclaw.ai's install block — tabbed targets over one panel, so
 * the reader self-selects instead of scanning a matrix — but carrying Trooper's
 * actual distribution: hosted app, desktop apps, mobile.
 */
export default function QuickStartSection() {
  const [activeId, setActiveId] = useState(TARGETS[0].id);
  const active = TARGETS.find((t) => t.id === activeId) ?? TARGETS[0];
  const Icon = active.icon;

  return (
    <div>
      <motion.div
        className="mb-6 max-w-3xl md:mb-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="font-funneldisplay text-[1.65rem] leading-[1.15] tracking-tight text-ink sm:text-3xl md:text-4xl lg:text-[2.75rem]">
          Put a trooper to work
          <br />
          in about a minute.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          Start free in the browser, or run the whole workforce on your own machine.
        </p>
      </motion.div>

      <div className="border border-[var(--color-line)] bg-white">
        {/* Tab row — mirrors the panel's own border rhythm */}
        <div
          className="scrollbar-hide flex overflow-x-auto border-b border-[var(--color-line)]"
          role="tablist"
          aria-label="Choose a platform"
        >
          {TARGETS.map((target) => {
            const isActive = target.id === active.id;
            return (
              <button
                key={target.id}
                type="button"
                role="tab"
                id={`quickstart-tab-${target.id}`}
                aria-selected={isActive}
                aria-controls={`quickstart-panel-${target.id}`}
                onClick={() => setActiveId(target.id)}
                className={[
                  'shrink-0 border-r border-[var(--color-line)] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors sm:px-5',
                  isActive
                    ? 'bg-ink text-white'
                    : 'bg-canvas-section text-ink-muted hover:bg-canvas-warm hover:text-ink',
                ].join(' ')}
              >
                {target.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`quickstart-panel-${active.id}`}
          aria-labelledby={`quickstart-tab-${active.id}`}
          className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-start md:justify-between md:gap-10"
        >
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-faint">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {active.requirements}
            </p>

            <ol className="mt-5 flex flex-col gap-3">
              {active.steps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="shrink-0 font-mono text-xs tabular-nums text-ink-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-ink sm:text-base">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <PixelButton
              href={active.cta.href}
              external={active.cta.external}
              size="lg"
              tone="dark"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {active.cta.label}
            </PixelButton>
            {active.secondary && (
              <Link
                href={active.secondary.href}
                className="group inline-flex items-center gap-1.5 border-b border-transparent pb-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-current hover:text-ink"
              >
                <span>{active.secondary.label}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-500">
        Free to start, no credit card. Nothing leaves your desk without your approval — see{' '}
        <Link href="#governance" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-ink">
          Governance
        </Link>{' '}
        below.
      </p>
    </div>
  );
}
