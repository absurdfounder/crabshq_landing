'use client';

import { useState } from 'react';
import {
  HARNESSES,
  formatElo,
  formatUsd,
  paretoFrontier,
  PROVISIONAL_TASKS,
  type PairRow,
} from '@/lib/benchmarks';
import { BrandTile, brandForHarness, shortModel } from './marks';

const ELO_MIN = 1025;
const ELO_MAX = 1225;

function logRange(min: number, max: number) {
  const lo = Math.log10(Math.max(min, 0.05));
  const hi = Math.log10(max);
  return { x: (v: number) => (Math.log10(Math.max(v, 0.05)) - lo) / (hi - lo) };
}

export function HarnessLegend() {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-neutral-600">
      {HARNESSES.map((harness) => (
        <li key={harness} className="inline-flex items-center gap-1.5">
          <BrandTile brand={brandForHarness(harness)} size="sm" />
          {harness}
        </li>
      ))}
    </ul>
  );
}

export function EloBarChart({ rows }: { rows: PairRow[] }) {
  const ranked = [...rows].sort((a, b) => b.elo - a.elo);
  const max = Math.max(...ranked.map((row) => row.elo - ELO_MIN));
  return (
    <div className="mt-5 space-y-3">
      {ranked.map((row) => {
        const width = Math.max(8, ((row.elo - ELO_MIN) / max) * 100);
        const own = row.harness === 'Trooper';
        const harness = row.harness === 'Claude Code' ? 'Claude' : row.harness;
        return (
          <div key={`${row.harness}-${row.model}`} className="grid grid-cols-[minmax(132px,38%)_1fr_40px] items-center gap-3">
            <span className="flex min-w-0 items-center gap-2">
              <BrandTile brand={brandForHarness(row.harness)} size="sm" />
              <span className="min-w-0 truncate text-[13px] text-neutral-800" title={`${row.harness} × ${row.model}`}>
                {harness}
                <span className="text-black/40"> · </span>
                <span className="text-black/50">{shortModel(row.model)}</span>
              </span>
            </span>
            <div className="h-2.5">
              <div className={`h-full ${own ? 'bg-neutral-900' : 'bg-black/20'}`} style={{ width: `${width}%` }} />
            </div>
            <span className="text-right text-[12px] tabular-nums text-neutral-500">{formatElo(row.elo)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function EloCostScatter({ rows }: { rows: PairRow[] }) {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const width = 560;
  const height = 220;
  const pad = { top: 10, right: 14, bottom: 10, left: 8 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const costs = rows.map((r) => r.cost);
  const minC = Math.min(...costs) * 0.7;
  const maxC = Math.max(...costs) * 1.25;
  const { x: xOf } = logRange(minC, maxC);
  const yOf = (elo: number) => innerH - ((elo - ELO_MIN) / (ELO_MAX - ELO_MIN)) * innerH;
  const yTicks = [1025, 1075, 1125, 1175, 1225];
  const front = paretoFrontier(rows);
  const ticks = [0.1, 1, 10].filter((t) => t >= minC * 0.5 && t <= maxC * 1.4);
  const hover = rows.find((row) => row.id === hoverId);

  const path = front
    .map((row, i) => {
      const x = pad.left + xOf(row.cost) * innerW;
      const y = pad.top + yOf(row.elo);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const plotX = (cost: number) => ((pad.left + xOf(cost) * innerW) / width) * 100;
  const plotY = (elo: number) => ((pad.top + yOf(elo)) / height) * 100;

  return (
    <div className="mt-4">
      <div className="flex gap-3">
        <p className="w-4 shrink-0 self-center text-center text-[11px] leading-3 text-neutral-500 [writing-mode:vertical-rl] rotate-180">
          Quality — Elo ↑
        </p>
        <div className="min-w-0 flex-1 pl-12">
          <div className="relative h-52 sm:h-56">
            {yTicks.map((elo) => (
              <span
                key={elo}
                className="absolute right-full pr-2 text-[11px] tabular-nums text-neutral-400"
                style={{ top: `${plotY(elo)}%`, transform: 'translateY(-50%)' }}
              >
                {formatElo(elo)}
              </span>
            ))}
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full" preserveAspectRatio="none" aria-hidden>
              {yTicks.map((elo) => {
                const y = pad.top + yOf(elo);
                return <line key={elo} x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#ecece8" />;
              })}
              {path ? <path d={path} fill="none" stroke="#171717" strokeWidth="1.25" vectorEffect="non-scaling-stroke" /> : null}
            </svg>
            {rows.map((row) => {
              const active = hoverId === row.id;
              return (
                <button
                  key={`${row.harness}-${row.model}`}
                  type="button"
                  aria-label={`${row.harness} × ${row.model}`}
                  className="absolute rounded-sm outline-none"
                  style={{
                    left: `${plotX(row.cost)}%`,
                    top: `${plotY(row.elo)}%`,
                    zIndex: row.harness === 'Trooper' ? 15 : active ? 20 : 10,
                    transform: `translate(-50%, -50%) scale(${active ? 1.12 : 1})`,
                  }}
                  onMouseEnter={() => setHoverId(row.id)}
                  onMouseLeave={() => setHoverId((id) => (id === row.id ? null : id))}
                  onFocus={() => setHoverId(row.id)}
                  onBlur={() => setHoverId((id) => (id === row.id ? null : id))}
                >
                  <BrandTile brand={brandForHarness(row.harness)} size="sm" />
                </button>
              );
            })}
            {hover ? (
              <div
                className="pointer-events-none absolute z-30 w-max max-w-[240px] border border-black/10 bg-white px-3 py-2 text-left text-[13px] leading-5 text-neutral-600 shadow-sm"
                style={{
                  left: `${Math.min(78, Math.max(14, plotX(hover.cost)))}%`,
                  top: `${Math.max(10, plotY(hover.elo) - 10)}%`,
                  transform: 'translate(-50%, -100%)',
                }}
              >
                <p className="font-medium text-neutral-800">
                  {hover.harness} × {hover.model}
                </p>
                <p className="text-[12px]">
                  Elo {formatElo(hover.elo)} · {formatUsd(hover.cost)} typical
                </p>
              </div>
            ) : null}
          </div>
          <div className="relative mt-1 h-4">
            {ticks.map((tick) => (
              <span
                key={tick}
                className="absolute text-[11px] tabular-nums text-neutral-400"
                style={{ left: `${plotX(tick)}%`, transform: 'translateX(-50%)' }}
              >
                {formatUsd(tick)}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-1 pl-16 text-center text-[11px] text-neutral-500">Median cost per task — log scale</p>
    </div>
  );
}

export function CostBandRows({ rows }: { rows: PairRow[] }) {
  const maxHeavy = Math.max(...rows.map((r) => r.heavy));
  return (
    <ol>
      {rows.map((row, i) => {
        const points = [
          { value: row.light, size: 6, label: 'light' as const },
          { value: row.cost, size: 9, label: 'typical' as const },
          { value: row.heavy, size: 12, label: 'heavy' as const },
        ].map((point) => ({ ...point, pct: Math.max(6, (point.value / maxHeavy) * 100) }));
        const own = row.harness === 'Trooper';
        return (
          <li
            key={`${row.harness}-${row.model}-${i}`}
            className={`grid items-center gap-x-6 gap-y-3 py-3.5 sm:grid-cols-[minmax(240px,280px)_1fr] ${
              own ? 'bg-black/[0.03]' : i % 2 === 0 ? '' : 'bg-black/[0.015]'
            }`}
          >
            <div className="min-w-0 px-1">
              <p className="flex items-center gap-2 text-[13px] text-neutral-800">
                <span className="w-4 shrink-0 tabular-nums text-neutral-400">{i + 1}</span>
                <BrandTile brand={brandForHarness(row.harness)} size="sm" />
                <span className="font-medium">{row.harness}</span>
                <span className="text-black/30">·</span>
                <span className="truncate text-black/50">{shortModel(row.model)}</span>
              </p>
              <p className="mt-1 whitespace-nowrap pl-6 text-[12px] tabular-nums text-neutral-500">
                Elo {formatElo(row.elo)} · {row.winRate}% · {row.time} · {row.tasks.toLocaleString()} tasks
                {row.tasks < PROVISIONAL_TASKS ? ' · provisional' : ''}
              </p>
            </div>
            <div className="relative mx-1 h-12 min-w-0">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-black/10" />
              {points.map((point, index) => {
                const prev = points[index - 1];
                const next = points[index + 1];
                const closePrev = prev ? point.pct - prev.pct < 14 : false;
                const closeNext = next ? next.pct - point.pct < 14 : false;
                const showLabel = point.label === 'typical' || !(closePrev || closeNext);
                return (
                  <span
                    key={point.label}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${Math.min(94, Math.max(4, point.pct))}%` }}
                    title={`${point.label} ${formatUsd(point.value)}`}
                  >
                    <span
                      className="block rounded-full"
                      style={{
                        width: point.size,
                        height: point.size,
                        backgroundColor: own ? '#111111' : '#737373',
                      }}
                    />
                    {showLabel ? (
                      <span className="absolute left-1/2 top-3.5 -translate-x-1/2 whitespace-nowrap text-[11px] tabular-nums text-neutral-500">
                        {formatUsd(point.value)}
                      </span>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
