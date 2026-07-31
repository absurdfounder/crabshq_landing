'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Laptop,
  Loader2,
  Monitor,
  MousePointer2,
  Smartphone,
  Terminal,
} from 'lucide-react';
import {
  BrowserClaimPage,
  CLAIM_TABS,
  TabFavicon,
} from './BrowserClaimPanes';

/**
 * Marketing simulations for Where they work — real product surfaces
 * (Chrome tabs you already use, a Mac session, a device fleet routing work)
 * instead of schematic Wonder Analytics SVGs / static status lists.
 */

function useVisibleTick(steps: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(reduceMotion ? steps : 0);

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
      if (id) clearInterval(id);
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

/* ═══════════════════════════════════════════════════════════════
 * Browser — claim a real logged-in tab (Stripe / Gmail / QuickBooks)
 * ═══════════════════════════════════════════════════════════════ */

export function BrowserScene() {
  const { ref, tick } = useVisibleTick(CLAIM_TABS.length, 2400);
  const active = CLAIM_TABS[Math.min(tick, CLAIM_TABS.length - 1)];

  return (
    <div ref={ref} className="flex h-[22rem] w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10 sm:h-[26rem]">
      {/* Chrome tab strip */}
      <div className="flex items-end gap-0.5 border-b border-neutral-200 bg-[#DEE1E6] px-2 pt-1.5">
        {CLAIM_TABS.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <div
              key={tab.id}
              className={`relative mb-[-1px] flex max-w-[128px] items-center gap-1.5 rounded-t-lg px-2.5 py-1.5 text-[11px] ${
                isActive
                  ? 'bg-white text-neutral-900 shadow-[0_-1px_0_#fff]'
                  : 'bg-[#D3D6DB] text-neutral-600'
              }`}
            >
              <TabFavicon tabId={tab.id} size={16} />
              <span className="truncate font-medium">{tab.title}</span>
              {isActive ? (
                <span className="ml-0.5 size-1.5 shrink-0 rounded-full bg-[#3f6b00]" title="Claimed" />
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-white px-2.5 py-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#f0f5e6] px-2 py-0.5 text-[10px] font-semibold text-[#325600] ring-1 ring-[#c4d9a0]">
          Claimed
        </span>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] text-neutral-600">
          <TabFavicon tabId={active.id} size={16} />
          <span className="truncate font-mono">{active.url}</span>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-semibold text-neutral-600"
        >
          <MousePointer2 className="size-3" strokeWidth={2} />
          Take control
        </button>
      </div>

      {/* Page */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-neutral-100">
        <div key={active.id} className="absolute inset-0">
          <BrowserClaimPage tabId={active.id} />
        </div>
        <div className="absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-lg bg-neutral-900/85 px-2.5 py-1.5 text-[11px] text-white backdrop-blur-sm">
          <Loader2 className="size-3.5 shrink-0 animate-spin text-[#a3e635]" strokeWidth={2.5} />
          <span className="min-w-0 truncate font-medium">{active.action}</span>
          <span className="ml-auto shrink-0 tabular-nums text-white/50">09:14:0{tick}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Desktop — wake Mac, open real Numbers, work the sheet
 * ═══════════════════════════════════════════════════════════════ */

const DESKTOP_LINES = [
  '$ trooper device wake studio-mac',
  'device responded in 4.2s · seat acquired',
  '$ open -a Numbers ~/Finance/Q3-forecast.numbers',
  'workbook opened · recalculating model…',
  'wrote Total row · exported PDF to Desktop',
];

const NUMBERS_ROWS = [
  { region: 'North America', q2: '$412k', q3: '$486k', delta: '+18%', up: true },
  { region: 'EMEA', q2: '$288k', q3: '$274k', delta: '−5%', up: false },
  { region: 'APAC', q2: '$196k', q3: '$271k', delta: '+38%', up: true },
  { region: 'LATAM', q2: '$84k', q3: '$97k', delta: '+15%', up: true },
];

export function DesktopScene() {
  const { ref, tick } = useVisibleTick(DESKTOP_LINES.length, 1500);
  const lines = DESKTOP_LINES.slice(0, Math.max(1, tick));
  const sheetOpen = tick >= 2;

  return (
    <div
      ref={ref}
      className="flex h-[22rem] w-full flex-col overflow-hidden rounded-xl bg-[#1c1c1e] shadow-sm ring-1 ring-black/20 sm:h-[26rem]"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <div className="flex items-center gap-2 text-[12px] text-white/90">
          <Laptop className="size-3.5 text-white/60" strokeWidth={2} />
          <span className="font-medium">Studio-Mac</span>
          <span className="text-white/40">macOS 15.2</span>
        </div>
        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-200 ring-1 ring-amber-400/30">
          ● Busy
        </span>
      </div>

      <div className="relative min-h-0 flex-1 bg-[#2c2c2e] p-2.5">
        <div
          className={`flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-opacity duration-500 ${
            sheetOpen ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-[#F5F5F5] px-3 py-1.5">
            <span className="flex gap-1">
              <span className="size-2.5 rounded-full bg-[#FF5F57]" />
              <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="size-2.5 rounded-full bg-[#28C840]" />
            </span>
            <span className="truncate text-[11px] font-medium text-neutral-700">
              Numbers — Q3-forecast.numbers
            </span>
          </div>
          <div className="min-h-0 flex-1 overflow-hidden p-2">
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="bg-[#E8F0FE] text-left text-[10px] font-semibold uppercase tracking-wide text-[#1a73e8]">
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Region</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Q2 actual</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Q3 forecast</th>
                  <th className="border border-[#C5D7F5] px-2 py-1.5">Δ</th>
                </tr>
              </thead>
              <tbody>
                {NUMBERS_ROWS.map((r) => (
                  <tr key={r.region}>
                    <td className="border border-neutral-200 px-2 py-1.5 font-medium text-neutral-800">
                      {r.region}
                    </td>
                    <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-neutral-600">
                      {r.q2}
                    </td>
                    <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-neutral-800">
                      {r.q3}
                    </td>
                    <td
                      className={`border border-neutral-200 px-2 py-1.5 font-semibold tabular-nums ${
                        r.up ? 'text-[#1e8e3e]' : 'text-[#d93025]'
                      }`}
                    >
                      {r.delta}
                    </td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-semibold">
                  <td className="border border-neutral-200 px-2 py-1.5">Total</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums">$980k</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums">$1.128M</td>
                  <td className="border border-neutral-200 px-2 py-1.5 tabular-nums text-[#1e8e3e]">
                    +15%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black px-3 py-2 font-mono text-[10px] leading-relaxed text-[#a3e635]">
        <div className="mb-1 flex items-center gap-2 text-[10px] text-white/40">
          <Terminal className="size-3" strokeWidth={2} />
          Terminal 1
        </div>
        {lines.map((line) => (
          <div key={line} className={line.startsWith('$') ? 'text-white' : 'text-[#a3e635]/85'}>
            {line}
          </div>
        ))}
        <span className="inline-block h-3 w-1.5 animate-pulse bg-[#a3e635]" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Devices — route work: Home for forecast, Office for QuickBooks ledger
 * ═══════════════════════════════════════════════════════════════ */

type DeviceRow = {
  name: string;
  os: string;
  icon: typeof Laptop;
  phases: { status: 'idle' | 'online' | 'busy' | 'done'; note: string }[];
};

const FLEET: DeviceRow[] = [
  {
    name: 'Home-Mini',
    os: 'macOS 15.1',
    icon: Monitor,
    phases: [
      { status: 'online', note: 'Idle · ready' },
      { status: 'busy', note: 'Numbers — opening Q3 forecast' },
      { status: 'busy', note: 'Exporting forecast.pdf' },
      { status: 'done', note: 'Sent forecast.pdf' },
      { status: 'done', note: 'Sent forecast.pdf' },
    ],
  },
  {
    name: 'Office-iMac',
    os: 'macOS 14.6',
    icon: Monitor,
    phases: [
      { status: 'online', note: 'Idle · ready' },
      { status: 'online', note: 'Queued for accounting pull' },
      { status: 'busy', note: 'QuickBooks — Chart of Accounts' },
      { status: 'busy', note: 'Exporting general-ledger.csv' },
      { status: 'done', note: 'Sent general-ledger.csv' },
    ],
  },
  {
    name: 'Studio-Mac',
    os: 'macOS 15.2',
    icon: Laptop,
    phases: [
      { status: 'online', note: 'Idle · coordinator' },
      { status: 'busy', note: 'Routing ask across fleet…' },
      { status: 'busy', note: 'Waiting on Home + Office' },
      { status: 'busy', note: 'Merging files into #finance-close' },
      { status: 'done', note: 'Ledger + forecast ready' },
    ],
  },
  {
    name: 'Vaibhav iPhone',
    os: 'iOS 18',
    icon: Smartphone,
    phases: [
      { status: 'idle', note: 'Approvals only' },
      { status: 'idle', note: 'Approvals only' },
      { status: 'idle', note: 'Approvals only' },
      { status: 'idle', note: 'Approvals only' },
      { status: 'idle', note: 'Tap to approve close pack' },
    ],
  },
];

const STATUS_PILL: Record<string, string> = {
  busy: 'bg-[#3f6b00] text-white',
  online: 'bg-[#f0f5e6] text-[#325600] ring-1 ring-[#c4d9a0]',
  done: 'bg-[#f0f5e6] text-[#325600] ring-1 ring-[#c4d9a0]',
  idle: 'bg-neutral-100 text-neutral-500 ring-1 ring-neutral-200',
};

export function DevicesScene() {
  const { ref, tick } = useVisibleTick(4, 1800);
  const phase = Math.min(tick, 4);

  return (
    <div
      ref={ref}
      className="flex h-[22rem] w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/10 sm:h-[26rem]"
    >
      <div className="border-b border-[#E7E5E4] bg-[#FAFAF9] px-3.5 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[12px] font-semibold text-neutral-900">Devices</span>
          <span className="text-[11px] text-neutral-500">4 paired · routing</span>
        </div>
        <div className="mt-2 rounded-lg bg-[#f0f5e6] px-2.5 py-1.5 text-[11px] text-[#325600] ring-1 ring-[#c4d9a0]">
          <span className="font-semibold">Ask · </span>
          pull the Q3 ledger from Office QuickBooks, and the forecast from my Home Mac
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-auto p-2.5">
        {FLEET.map((device) => {
          const state = device.phases[phase] ?? device.phases[device.phases.length - 1];
          const Icon = device.icon;
          const active = state.status === 'busy';
          return (
            <div
              key={device.name}
              className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 ring-1 transition-colors ${
                active
                  ? 'bg-[#f0f5e6]/60 ring-[#c4d9a0]'
                  : state.status === 'done'
                    ? 'bg-white ring-[#E7E5E4]'
                    : 'bg-neutral-50/80 ring-[#E7E5E4]'
              }`}
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
                <Icon className="size-3.5 text-neutral-600" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-neutral-900">{device.name}</p>
                <p className="truncate text-[11px] text-neutral-500">
                  {device.os} · {state.note}
                </p>
              </div>
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${STATUS_PILL[state.status]}`}
              >
                {active ? <Loader2 className="size-2.5 animate-spin" strokeWidth={2.5} /> : null}
                {state.status === 'done' ? 'done' : state.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-[#E7E5E4] bg-[#FAFAF9]/80 px-3.5 py-2 text-[11px]">
        {phase >= 4 ? (
          <>
            <span className="inline-flex items-center gap-1.5 font-medium text-[#325600]">
              <Check className="size-3" strokeWidth={2.5} />
              general-ledger.csv + forecast.pdf ready
            </span>
            <span className="text-neutral-500">Awaiting phone approval</span>
          </>
        ) : (
          <>
            <span className="text-neutral-500">Routing across awake machines…</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#325600]">
              Devices
              <ArrowRight className="size-3" strokeWidth={2} />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
