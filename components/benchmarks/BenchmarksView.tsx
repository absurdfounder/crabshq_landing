import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  BookOpen,
  CodeXml,
  DollarSign,
  Handshake,
  Headset,
  Inbox,
  Mail,
  Megaphone,
  MessageCircleQuestion,
  PenLine,
  Search,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import {
  aggregateByHarness,
  aggregateByModel,
  BENCHMARK_META,
  CATEGORIES,
  FAQ_ITEMS,
  formatCount,
  formatElo,
  formatUsd,
  HARNESS_COLOR,
  OVERALL_ROWS,
  PROVISIONAL_TASKS,
  timeToSeconds,
} from '@/lib/benchmarks';
import CatalogHero from '@/components/marketing/CatalogHero';
import PixelButton from '@/components/ui/PixelButton';
import BenchmarksNav from './BenchmarksNav';
import { CostBandRows, EloBarChart, EloCostScatter, HarnessLegend } from './charts';

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  coding: CodeXml,
  research: Search,
  support: Headset,
  marketing: Megaphone,
  sales: Handshake,
  email: Mail,
  data: BarChart3,
  content: PenLine,
  seo: TrendingUp,
  management: Inbox,
};

function PairLabel({ harness, model }: { harness: string; model: string }) {
  const color = HARNESS_COLOR[harness as keyof typeof HARNESS_COLOR] ?? '#525252';
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold text-white"
        style={{ backgroundColor: color }}
        aria-hidden
      >
        {harness.slice(0, 1)}
      </span>
      <span className="min-w-0 leading-[1.35]">
        <span className="font-medium text-neutral-800">{harness}</span>
        <span className="px-1.5 text-neutral-400">×</span>
        <span className="text-neutral-600">{model}</span>
      </span>
    </span>
  );
}

function Meter({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-neutral-200 md:block">
        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, (value / max) * 100)}%`, backgroundColor: color }} />
      </span>
    </span>
  );
}

function Card({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-line)] bg-white p-4 sm:p-5">
      <h3 className="text-sm font-semibold text-neutral-800">{title}</h3>
      <p className="mt-1 text-[13px] leading-5 text-neutral-500">{lede}</p>
      {children}
    </div>
  );
}

export default function BenchmarksView() {
  const maxCost = Math.max(...OVERALL_ROWS.map((r) => r.cost));
  const maxTime = Math.max(...OVERALL_ROWS.map((r) => timeToSeconds(r.time)));
  const harnessRows = aggregateByHarness(OVERALL_ROWS);
  const modelRows = aggregateByModel(OVERALL_ROWS);

  return (
    <div className="bg-canvas">
      <CatalogHero
        title="Benchmarks"
        description="Ranked on real usage from Trooper users, not synthetic suites: tasks their agents actually ran, what got done, what it cost, and how long it took."
        actions={
          <>
            <PixelButton href="/download" size="md">
              Try the leaders
            </PixelButton>
            <PixelButton href="/pricing" variant="outline" size="md">
              See pricing
            </PixelButton>
          </>
        }
      />

      <section className="bg-canvas">
        <div className="rail pb-16 sm:pb-24">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-10">
            <BenchmarksNav />
            <div className="min-w-0 flex-1">
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                  Last run {BENCHMARK_META.lastRun}
                </span>
                <p className="text-[12px] tabular-nums text-neutral-500">
                  {formatCount(BENCHMARK_META.tasks)} tasks · ${formatCount(BENCHMARK_META.spend)} measured spend ·{' '}
                  {BENCHMARK_META.from} → {BENCHMARK_META.to}
                </p>
              </div>
              <p className="mb-10 max-w-2xl text-[13px] leading-5 text-neutral-500">
                {BENCHMARK_META.significantAgents} of {BENCHMARK_META.totalAgents} agents have statistically significant
                coverage (≥{BENCHMARK_META.significantFloor} tasks). Coverage expands as sessions grow.
              </p>
              <section id="overall" className="scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  <Trophy className="size-4 text-emerald-700" />
                  Overall rankings
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                  All task categories combined, ranked by Elo. Management tasks are reported separately below.
                </p>
                <div className="relative mt-4 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                      <thead>
                        <tr className="border-b border-[var(--color-line)] text-[11px] font-semibold text-neutral-500">
                          <th className="px-2.5 py-2.5">#</th>
                          <th className="px-2.5 py-2.5">Harness × model</th>
                          <th className="px-2.5 py-2.5" title="Head-to-head rating from matchups on comparable work — 1000 is the field average.">
                            Elo
                          </th>
                          <th className="px-2.5 py-2.5">Win rate</th>
                          <th className="px-2.5 py-2.5">Cost / task</th>
                          <th className="hidden px-2.5 py-2.5 sm:table-cell">Time / task</th>
                          <th className="hidden px-2.5 py-2.5 text-right md:table-cell">Tasks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OVERALL_ROWS.map((row, i) => (
                          <tr key={row.id} id={row.id} className="border-b border-[var(--color-line)] last:border-0 hover:bg-neutral-50">
                            <td className={`px-2.5 py-3 tabular-nums ${i === 0 ? 'font-semibold text-neutral-800' : 'text-neutral-400'}`}>
                              {i + 1}
                            </td>
                            <td className="px-2.5 py-3">
                              <PairLabel harness={row.harness} model={row.model} />
                              {row.tasks < PROVISIONAL_TASKS ? (
                                <span className="ml-2 text-[10px] uppercase tracking-wide text-neutral-400">provisional</span>
                              ) : null}
                            </td>
                            <td className="px-2.5 py-3 whitespace-nowrap tabular-nums">
                              <span className="font-semibold text-neutral-800">{formatElo(row.elo)}</span>
                              <span
                                className={`ml-1.5 text-[11px] font-medium ${
                                  row.delta > 0 ? 'text-emerald-700' : row.delta < 0 ? 'text-red-700' : 'text-neutral-400'
                                }`}
                              >
                                {row.delta > 0 ? `↑${row.delta}` : row.delta < 0 ? `↓${Math.abs(row.delta)}` : '—'}
                              </span>
                            </td>
                            <td className="px-2.5 py-3 tabular-nums">
                              <span className="inline-flex items-center gap-2">
                                <Meter value={row.winRate} max={65} color="#047857" />
                                <span className="font-medium text-neutral-800">{row.winRate}%</span>
                              </span>
                            </td>
                            <td className="px-2.5 py-3 whitespace-nowrap tabular-nums text-neutral-700">
                              <span className="inline-flex items-center gap-2">
                                <Meter value={row.cost} max={maxCost} color="#2563eb" />
                                {formatUsd(row.cost)}
                              </span>
                            </td>
                            <td className="hidden px-2.5 py-3 whitespace-nowrap tabular-nums text-neutral-700 sm:table-cell">
                              <span className="inline-flex items-center gap-2">
                                <Meter value={timeToSeconds(row.time)} max={maxTime} color="#7c3aed" />
                                {row.time}
                              </span>
                            </td>
                            <td className="hidden px-2.5 py-3 text-right tabular-nums text-neutral-400 md:table-cell">
                              {formatCount(row.tasks)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id="harness" className="mt-14 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  Harness rankings
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                  Volume-weighted Elo across every model a harness ran. Use this when you are choosing the runtime, not the weights.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
                  <table className="w-full border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[var(--color-line)] text-[11px] font-semibold text-neutral-500">
                        <th className="px-3 py-2.5">#</th>
                        <th className="px-3 py-2.5">Harness</th>
                        <th className="px-3 py-2.5">Elo</th>
                        <th className="px-3 py-2.5">Win rate</th>
                        <th className="px-3 py-2.5">Cost / task</th>
                        <th className="px-3 py-2.5 text-right">Tasks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {harnessRows.map((row, i) => (
                        <tr key={row.harness} className="border-b border-[var(--color-line)] last:border-0">
                          <td className="px-3 py-3 tabular-nums text-neutral-400">{i + 1}</td>
                          <td className="px-3 py-3 font-medium text-neutral-800">
                            <span className="inline-flex items-center gap-2">
                              <span className="size-2 rounded-full" style={{ backgroundColor: HARNESS_COLOR[row.harness] }} />
                              {row.harness}
                            </span>
                            <span className="mt-0.5 block text-[11px] font-normal text-neutral-500">
                              Best model {row.bestModel} · {row.models} models
                            </span>
                          </td>
                          <td className="px-3 py-3 font-semibold tabular-nums">{formatElo(Math.round(row.elo))}</td>
                          <td className="px-3 py-3 tabular-nums">{row.winRate.toFixed(1)}%</td>
                          <td className="px-3 py-3 tabular-nums">{formatUsd(row.cost)}</td>
                          <td className="px-3 py-3 text-right tabular-nums text-neutral-400">{formatCount(row.tasks)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="models" className="mt-14 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  Model rankings
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                  Each model at the harness it actually ran under. Same Elo as the overall board, grouped so you can scan weights first.
                </p>
                <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-line)] bg-white">
                  <table className="w-full border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[var(--color-line)] text-[11px] font-semibold text-neutral-500">
                        <th className="px-3 py-2.5">#</th>
                        <th className="px-3 py-2.5">Model</th>
                        <th className="px-3 py-2.5">Harness</th>
                        <th className="px-3 py-2.5">Elo</th>
                        <th className="px-3 py-2.5">Cost / task</th>
                        <th className="hidden px-3 py-2.5 sm:table-cell">Time</th>
                        <th className="px-3 py-2.5 text-right">Tasks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelRows.map((row, i) => (
                        <tr key={row.model} className="border-b border-[var(--color-line)] last:border-0">
                          <td className="px-3 py-3 tabular-nums text-neutral-400">{i + 1}</td>
                          <td className="px-3 py-3 font-medium text-neutral-800">{row.model}</td>
                          <td className="px-3 py-3 text-neutral-600">{row.harness}</td>
                          <td className="px-3 py-3 font-semibold tabular-nums">{formatElo(row.elo)}</td>
                          <td className="px-3 py-3 tabular-nums">{formatUsd(row.cost)}</td>
                          <td className="hidden px-3 py-3 tabular-nums sm:table-cell">{row.time}</td>
                          <td className="px-3 py-3 text-right tabular-nums text-neutral-400">{formatCount(row.tasks)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="value-per-dollar" className="mt-14 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  <DollarSign className="size-4 text-emerald-700" />
                  Value per dollar
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                  Elo against what a typical task costs. Up and to the left is the sweet spot.
                </p>
                <Card title="Elo vs typical task cost" lede="Every pair across all categories — pairs on the line are the efficient frontier.">
                  <EloCostScatter rows={OVERALL_ROWS} />
                  <HarnessLegend />
                </Card>
              </section>

              {CATEGORIES.map((category) => {
                const Icon = CATEGORY_ICONS[category.id] ?? BarChart3;
                return (
                  <section key={category.id} id={category.id} className="mt-14 scroll-mt-28">
                    <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                      <Icon className="size-4 text-emerald-700" />
                      {category.title}
                    </h2>
                    <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                      {category.blurb} — {formatCount(category.tasks)} tasks.
                    </p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                      <Card title="Elo rankings" lede={`Head-to-head rating on ${category.title} work — taller is better.`}>
                        <EloBarChart rows={category.rows} />
                        <HarnessLegend />
                      </Card>
                      <Card title="Elo vs cost" lede="Up and to the left wins more for less.">
                        <EloCostScatter rows={category.rows} />
                        <HarnessLegend />
                      </Card>
                    </div>
                    <div className="mt-4 rounded-2xl border border-[var(--color-line)] bg-white px-4 py-5 sm:px-5">
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-semibold text-neutral-800">Cost per task</h3>
                          <p className="mt-1 text-[13px] text-neutral-500">
                            What a light, typical, and heavy task costs on each pair.
                          </p>
                        </div>
                        <ul className="flex gap-4 text-[11px] text-neutral-500">
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-600" /> light
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-emerald-600" /> typical
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-3 rounded-full bg-emerald-600" /> heavy
                          </li>
                        </ul>
                      </div>
                      <CostBandRows rows={category.rows} />
                    </div>
                  </section>
                );
              })}

              <section id="methodology" className="mt-14 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  <BookOpen className="size-4 text-emerald-700" />
                  Methodology
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">
                  What these numbers mean and where they come from.
                </p>
                <div className="prose-sm mt-4 max-w-2xl space-y-4 text-[14px] leading-6 text-neutral-600">
                  <p>
                    Every row aggregates tasks that Trooper users&apos; agents ran between {BENCHMARK_META.from} and{' '}
                    {BENCHMARK_META.to}. Nothing here is a lab exercise: each task had an owner waiting on the result, and
                    each pair is measured on the work it was actually given.
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-800">Elo</strong> comes from head-to-head comparisons on
                    comparable work — pairs are matched within the same task category and period, and the better outcome
                    wins the matchup. Ratings center on 1000. Because comparisons are cohort-matched, a pair can&apos;t buy
                    rank by only running easy work.
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-800">Win rate</strong> is the share of those matchups a
                    pair wins — 50% is the field average. A matchup compares what actually happened to each task: delivered
                    with a passing review beats delivered, which beats stalled, which beats abandoned.
                  </p>
                  <p>
                    <strong className="font-semibold text-neutral-800">Cost</strong> is the median all-in cost of a task:
                    model usage plus the tools and storage the task consumed.{' '}
                    <strong className="font-semibold text-neutral-800">Time</strong> is the median wall-clock execution time
                    — treat it as time-to-done, not thinking speed.
                  </p>
                  <p>
                    Rows need at least 20 tasks in a category to appear; rows under {PROVISIONAL_TASKS} tasks are marked
                    provisional. The efficient frontier is the set of pairs where no other pair beats them on both Elo and
                    cost at once.
                  </p>
                  <p>
                    Production traffic is not a controlled experiment — pairs receive different task mixes, different users,
                    and different context lengths. These rankings describe what happened on real Trooper workloads during
                    the snapshot window; they are not a guarantee of future performance.
                  </p>
                </div>
              </section>

              <section id="faq" className="mt-14 scroll-mt-28">
                <h2 className="flex items-center gap-2 font-display text-2xl font-medium tracking-tight text-neutral-800">
                  <MessageCircleQuestion className="size-4 text-emerald-700" />
                  FAQ
                </h2>
                <p className="mt-1.5 text-[13px] leading-5 text-neutral-500">Quick answers on how to read the leaderboard.</p>
                <dl className="mt-6 max-w-2xl divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
                  {FAQ_ITEMS.map((item) => (
                    <div key={item.q} className="py-4">
                      <dt className="text-sm font-semibold text-neutral-800">{item.q}</dt>
                      <dd className="mt-1.5 text-[14px] leading-6 text-neutral-600">{item.a}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <PixelButton href="/download" size="md">
                    Run your own task
                  </PixelButton>
                  <Link href="/pricing" className="inline-flex items-center text-sm font-medium text-neutral-700 underline-offset-2 hover:underline">
                    See pricing
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
