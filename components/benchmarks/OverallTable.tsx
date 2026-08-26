'use client';

import { useMemo, useState } from 'react';
import {
  HARNESSES,
  OVERALL_ROWS,
  PROVISIONAL_TASKS,
  formatCount,
  formatElo,
  formatUsd,
  paretoFrontier,
  timeToSeconds,
  type HarnessId,
} from '@/lib/benchmarks';
import { BrandTile, brandForHarness, brandForModel } from './marks';

type SortKey = 'elo' | 'winRate' | 'cost' | 'time' | 'tasks';

export default function OverallTable() {
  const [filter, setFilter] = useState<HarnessId | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('cost');
  const [asc, setAsc] = useState(true);

  const frontierIds = useMemo(() => new Set(paretoFrontier(OVERALL_ROWS).map((row) => row.id)), []);

  const rows = useMemo(() => {
    const filtered = filter === 'all' ? OVERALL_ROWS : OVERALL_ROWS.filter((row) => row.harness === filter);
    const dir = asc ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = sortKey === 'time' ? timeToSeconds(a.time) : a[sortKey];
      const bv = sortKey === 'time' ? timeToSeconds(b.time) : b[sortKey];
      if (av === bv) return b.elo - a.elo;
      return (av < bv ? -1 : 1) * dir;
    });
  }, [filter, sortKey, asc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setAsc((v) => !v);
    else {
      setSortKey(key);
      setAsc(key === 'cost' || key === 'time');
    }
  }

  function SortBtn({ k, label }: { k: SortKey; label: string }) {
    const active = sortKey === k;
    return (
      <button
        type="button"
        onClick={() => toggleSort(k)}
        className={`uppercase tracking-[0.12em] ${active ? 'text-neutral-900' : 'hover:text-neutral-800'}`}
      >
        {label}
        <span className={`ml-1 inline-block w-2 ${active ? '' : 'opacity-0'}`}>{asc ? '↑' : '↓'}</span>
      </button>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap border border-black/10 bg-white text-[11px] uppercase tracking-[0.12em]">
          {(['all', ...HARNESSES] as const).map((item) => {
            const on = filter === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(item)}
                className={`px-3.5 py-1.5 transition-colors ${on ? 'bg-black text-white' : 'text-black/50 hover:text-black'}`}
              >
                {item === 'all' ? 'All harnesses' : item}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-black/40">
          Sorted by {sortKey === 'winRate' ? 'win rate' : sortKey === 'cost' ? '$ / task' : sortKey} {asc ? '↑' : '↓'}
        </p>
      </div>
      <div className="overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[760px] border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-black/10 text-[11px] font-normal uppercase tracking-[0.12em] text-black/40">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Harness</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3 text-right">
                <SortBtn k="elo" label="Elo" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortBtn k="winRate" label="Win rate" />
              </th>
              <th className="px-4 py-3 text-right">
                <SortBtn k="cost" label="$ / task" />
              </th>
              <th className="hidden px-4 py-3 text-right sm:table-cell">
                <SortBtn k="time" label="Time / task" />
              </th>
              <th className="hidden px-4 py-3 text-right md:table-cell">
                <SortBtn k="tasks" label="Tasks" />
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {rows.map((row, i) => (
              <tr
                key={row.id}
                id={row.id}
                className={`border-b border-black/5 last:border-0 ${
                  row.harness === 'Trooper' ? 'bg-black/[0.03]' : i % 2 === 1 ? 'bg-black/[0.015]' : ''
                }`}
              >
                <td className="px-4 py-2.5 text-black/40">{i + 1}</td>
                <td className="whitespace-nowrap px-4 py-2.5">
                  <span className="inline-flex items-center gap-2">
                    <BrandTile brand={brandForHarness(row.harness)} size="sm" />
                    {row.harness}
                    {frontierIds.has(row.id) ? (
                      <span className="text-black/40" title="On the cost-efficiency frontier">
                        ◆
                      </span>
                    ) : null}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-black/50">
                  <span className="inline-flex items-center gap-2">
                    <BrandTile brand={brandForModel(row.model)} size="sm" />
                    {row.model}
                    {row.tasks < PROVISIONAL_TASKS ? (
                      <span className="text-[10px] uppercase tracking-wide text-black/35">provisional</span>
                    ) : null}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-2.5 text-right">
                  {formatElo(row.elo)}
                  <span
                    className={`ml-1.5 text-[11px] ${
                      row.delta > 0 ? 'text-emerald-700' : row.delta < 0 ? 'text-red-700' : 'text-black/30'
                    }`}
                  >
                    {row.delta > 0 ? `↑${row.delta}` : row.delta < 0 ? `↓${Math.abs(row.delta)}` : ''}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">{row.winRate}%</td>
                <td className="px-4 py-2.5 text-right">{formatUsd(row.cost)}</td>
                <td className="hidden px-4 py-2.5 text-right sm:table-cell">{row.time}</td>
                <td className="hidden px-4 py-2.5 text-right text-black/45 md:table-cell">{formatCount(row.tasks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-black/10 px-4 py-3 text-[12px] text-black/45">
          ◆ on the cost-efficiency frontier — no other pair is both cheaper and higher-Elo. Default sort is $ / task so
          Trooper’s cheaper pairs sit at the top.
        </p>
      </div>
    </div>
  );
}
