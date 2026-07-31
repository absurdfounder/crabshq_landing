'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Laptop, Monitor, Smartphone } from 'lucide-react';
import {
  DEMO_KEYFRAMES,
  DemoBrowserStream,
  DemoDesktopWorkspace,
  getDemoScenario,
} from '@trooper/demo';

import { WORK_SURFACES, type WorkSurface } from '@/lib/whereTheyWork';
import PixelButton from './ui/PixelButton';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The demo package injects its keyframes inside TrooperDemo's own render, so a
 * standalone mount gets dead `.demo-enter` / `.demo-live-dot` / `.demo-blink`
 * classes — and, more importantly, loses the reduced-motion block that lives in
 * the same stylesheet. Injecting once here fixes both.
 */
function DemoStyles() {
  return <style dangerouslySetInnerHTML={{ __html: DEMO_KEYFRAMES }} />;
}

/**
 * These panes take their progress as props — TrooperDemo normally drives them
 * from a scripted timeline. Marketing only needs a monotonic tick, paused when
 * off-screen and frozen entirely under reduced motion.
 */
function useTick(steps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setTick(steps);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let id: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (id) return;
      id = setInterval(() => setTick((t) => (t >= steps ? 0 : t + 1)), intervalMs);
    };
    const stop = () => {
      if (!id) return;
      clearInterval(id);
      id = null;
    };

    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    observer.observe(el);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduceMotion, steps, intervalMs]);

  return { ref, tick };
}

const DESKTOP_LINES = [
  '$ trooper device wake studio-mac',
  'device responded in 4.2s',
  'seat acquired · screen 1 (2560×1440)',
  '$ open -a Numbers ~/Finance/Q3-forecast.numbers',
  'workbook opened · 4 linked sheets resolved',
  'recalculated 1,842 cells in 2.8s',
];

const DESKTOP_ACTIVITY = [
  'Woke Studio-Mac',
  'Screen recording permission granted',
  'Opened Q3-forecast.numbers',
  'Recalculated the model',
];

/** The real desktop pane from the product, driven by a tick. */
function DesktopScene() {
  const session = getDemoScenario('device-work').desktopSession;
  const { ref, tick } = useTick(DESKTOP_LINES.length, 1400);
  if (!session) return null;

  return (
    <div ref={ref} className="h-[22rem] w-full sm:h-[26rem]">
      <DemoDesktopWorkspace
        session={session}
        lines={DESKTOP_LINES.slice(0, tick)}
        activities={DESKTOP_ACTIVITY.slice(0, Math.ceil(tick / 1.5))}
      />
    </div>
  );
}

/** The real browser pane. Its own fixture names the source "Chrome extension". */
function BrowserScene() {
  const session = getDemoScenario('browser-work').browserSession;
  const frames = session?.frames.length ?? 0;
  const { ref, tick } = useTick(frames, 1800);
  if (!session) return null;

  return (
    <div ref={ref} className="h-[22rem] w-full sm:h-[26rem]">
      <DemoBrowserStream session={session} frameCount={Math.max(1, tick)} />
    </div>
  );
}

/**
 * No fleet visual existed anywhere in the repo, so this one is built in the
 * page's own hairline idiom rather than imported. The status vocabulary
 * (online / busy / idle) is the product's real DemoDesktopSession contract.
 */
const DEVICES = [
  { name: 'Studio-Mac', os: 'macOS 15.2', status: 'busy', note: 'Numbers — Q3 forecast', icon: Laptop },
  { name: 'Office-iMac', os: 'macOS 14.6', status: 'online', note: 'Idle · ready for work', icon: Monitor },
  { name: 'Home-Mini', os: 'macOS 15.1', status: 'online', note: 'Nightly backups verified', icon: Monitor },
  { name: 'Vaibhav iPhone', os: 'iOS 18', status: 'idle', note: 'Approvals only', icon: Smartphone },
] as const;

const STATUS_STYLE: Record<string, string> = {
  busy: 'bg-fern text-white',
  online: 'border border-[var(--color-line)] bg-canvas-section text-trooper',
  idle: 'border border-[var(--color-line)] bg-canvas-section text-ink-faint',
};

function DevicesScene() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex h-[22rem] w-full flex-col justify-center rounded-xl bg-canvas-section p-4 ring-1 ring-black/5 sm:h-[26rem] sm:p-6">
      <div className="mb-3 flex items-center justify-between text-[13px] font-medium text-neutral-500">
        <span>Devices</span>
        <span>4 paired · 3 online</span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {DEVICES.map((device, index) => {
          const Icon = device.icon;
          return (
            <motion.div
              key={device.name}
              className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-xs ring-1 ring-black/5 sm:px-4"
              initial={reduceMotion ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease }}
              viewport={{ once: true, margin: '-20px' }}
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center border border-[var(--color-line)] bg-canvas-section text-ink-muted">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{device.name}</p>
                <p className="truncate text-[13px] text-neutral-500">
                  {device.os} · {device.note}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[device.status]}`}
              >
                {device.status}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-3 text-[13px] text-neutral-500">
        Devices → Connect this Mac
      </p>
    </div>
  );
}

const SCENE: Record<WorkSurface['id'], () => JSX.Element | null> = {
  desktop: DesktopScene,
  browser: BrowserScene,
  devices: DevicesScene,
};

/**
 * Where troopers work.
 *
 * One section, three scenes, deliberately — desktop, browser and devices are
 * three answers to the same question, and the page had just come down from 13
 * sections to 10. Splitting them into three top-level sections would put the
 * noise straight back.
 *
 * The scenes escalate in scope: this machine, then the browser on it, then
 * every machine you own.
 */
export default function WhereTheyWorkSection() {
  return (
    <div>
      <DemoStyles />

      <motion.div
        className="mb-8 max-w-3xl md:mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <h2 className="h2-section">
          Troopers work where
          <br />
          you already work.
        </h2>
        <p className="lede">
          Not in a sandbox that looks like your setup — on the actual machine, in the browser you
          are already signed in to, across every computer you own.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {WORK_SURFACES.map((surface, index) => {
          const Scene = SCENE[surface.id];
          // Alternate which side the visual sits on so three stacked 2-ups
          // don't read as one long column of identical rows.
          const visualFirst = index % 2 === 1;

          return (
            <article key={surface.id} className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-black/5">
              <div className="grid min-w-0 lg:grid-cols-2 lg:items-center">
                <div
                  className={`flex min-w-0 flex-col justify-center px-5 py-8 sm:px-7 sm:py-10 md:px-9 md:py-12 ${
                    visualFirst ? 'lg:order-2' : ''
                  }`}
                >
                  <span className="kicker-sm">
                    {surface.kicker}
                  </span>

                  <h3 className="mt-4 whitespace-pre-line font-funneldisplay text-xl font-medium leading-snug tracking-tight text-ink sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                    {surface.headline}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                    {surface.body}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {surface.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-ink-muted">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-trooper"
                          strokeWidth={2.5}
                          aria-hidden
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {surface.meta && (
                    <p className="mt-5 text-sm text-neutral-500">
                      {surface.meta}
                    </p>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <PixelButton
                      href={surface.cta.href}
                      external={surface.cta.external}
                      size="sm"
                      tone="dark"
                      icon={<ArrowRight className="h-3.5 w-3.5" />}
                    >
                      {surface.cta.label}
                    </PixelButton>
                    {surface.secondary && (
                      <Link href={surface.secondary.href} className="group link-mono">
                        <span>{surface.secondary.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </div>
                </div>

                <div
                  className={`relative min-w-0 border-t border-[var(--color-line)] p-4 sm:p-6 lg:border-t-0 ${
                    visualFirst ? 'lg:order-1 lg:border-r' : 'lg:border-l'
                  }`}
                >
                  <Scene />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
