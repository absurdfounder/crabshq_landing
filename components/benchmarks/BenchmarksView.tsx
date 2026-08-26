import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  aggregateByHarness,
  aggregateByModel,
  BENCHMARK_META,
  CATEGORIES,
  FAQ_ITEMS,
  formatCount,
  formatElo,
  formatUsd,
  OVERALL_ROWS,
  PROVISIONAL_TASKS,
} from '@/lib/benchmarks';
import CatalogHero from '@/components/marketing/CatalogHero';
import PixelButton from '@/components/ui/PixelButton';
import BenchmarksNav from './BenchmarksNav';
import { CostBandRows, EloBarChart, EloCostScatter, HarnessLegend } from './charts';
import { BrandTile, brandForHarness, brandForModel } from './marks';
import OverallTable from './OverallTable';

function Card({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
  return (
    <div className="border border-black/10 bg-white p-5">
      <h3 className="text-[15px] font-medium text-neutral-900">{title}</h3>
      <p className="mt-1 text-[13px] leading-snug text-black/45">{lede}</p>
      {children}
    </div>
  );
}

export default function BenchmarksView() {
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
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700/10 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
            Last run {BENCHMARK_META.lastRun}
          </span>
          <p className="text-sm tabular-nums text-neutral-500">
            {formatCount(BENCHMARK_META.tasks)} tasks · ${formatCount(BENCHMARK_META.spend)} measured spend ·{' '}
            {BENCHMARK_META.from} → {BENCHMARK_META.to}
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          {BENCHMARK_META.significantAgents} of {BENCHMARK_META.totalAgents} agents have statistically significant coverage
          (≥{BENCHMARK_META.significantFloor} tasks). Coverage expands as sessions grow.
        </p>
      </CatalogHero>

      <section className="bg-canvas">
        <div className="rail pb-16 pt-10 sm:pb-24 sm:pt-12">
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-10">
            <BenchmarksNav />
            <div className="min-w-0 flex-1">
              <div className="mb-10 grid gap-4 md:grid-cols-2">
                <div className="border border-black/10 bg-white p-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-black/40">
                    Cheapest pair on the board · vs Hermes, same model
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 font-display text-[28px] font-medium tracking-tight tabular-nums md:text-[32px]">
                    <BrandTile brand="trooper" />
                    $0.11 / task
                    <span className="text-black/25">·</span>
                    1.3× cheaper
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    Trooper × DeepSeek V4 Flash is the lowest typical cost on this snapshot — $0.11 vs $0.14 for Hermes
                    on the same weights, at a higher Elo (1,096 vs 1,068).
                  </p>
                </div>
                <div className="border border-black/10 bg-white p-6">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-black/40">
                    Trooper × ChatGPT Luna · vs Codex, same window
                  </p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 font-display text-[28px] font-medium tracking-tight tabular-nums md:text-[32px]">
                    <BrandTile brand="openai" />
                    $1.42 / task
                    <span className="text-black/25">·</span>
                    1.3× cheaper
                  </p>
                  <p className="mt-2 text-[14px] leading-relaxed text-black/55">
                    Luna on Trooper lands at $1.42 typical versus Codex × GPT-5.6 Sol at $1.88 — same production traffic,
                    less spend per task.
                  </p>
                </div>
              </div>
              <section id="overall" className="scroll-mt-28">
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  Overall rankings
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  All task categories combined. Filter by harness, click a column to re-sort. Only same-harness rows
                  are a like-for-like runtime comparison; swapping the model changes the price of a token.
                </p>
                <div className="mt-5">
                  <OverallTable />
                </div>
              </section>

              <section id="harness" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  Harness rankings
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  Volume-weighted Elo across every model a harness ran. Use this when you are choosing the runtime, not the weights.
                </p>
                <div className="mt-5 overflow-x-auto border border-black/10 bg-white">
                  <table className="w-full border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-black/10 text-[11px] font-normal uppercase tracking-[0.12em] text-black/40">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Harness</th>
                        <th className="px-4 py-3 text-right">Elo</th>
                        <th className="px-4 py-3 text-right">Win rate</th>
                        <th className="px-4 py-3 text-right">$ / task</th>
                        <th className="px-4 py-3 text-right">Tasks</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {harnessRows.map((row, i) => (
                        <tr key={row.harness} className={`border-b border-black/5 last:border-0 ${row.harness === 'Trooper' ? 'bg-black/[0.03]' : i % 2 === 1 ? 'bg-black/[0.015]' : ''}`}>
                          <td className="px-4 py-2.5 text-black/40">{i + 1}</td>
                          <td className="whitespace-nowrap px-4 py-2.5">
                            <span className="inline-flex items-center gap-2">
                              <BrandTile brand={brandForHarness(row.harness)} size="sm" />
                              {row.harness}
                            </span>
                            <span className="mt-0.5 block text-[12px] text-black/45">
                              Best model {row.bestModel} · {row.models} models
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right">{formatElo(Math.round(row.elo))}</td>
                          <td className="px-4 py-2.5 text-right">{row.winRate.toFixed(1)}%</td>
                          <td className="px-4 py-2.5 text-right">{formatUsd(row.cost)}</td>
                          <td className="px-4 py-2.5 text-right text-black/45">{formatCount(row.tasks)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="models" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  Model rankings
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  Each model at the harness it actually ran under. Same Elo as the overall board, grouped so you can scan weights first.
                </p>
                <div className="mt-5 overflow-x-auto border border-black/10 bg-white">
                  <table className="w-full min-w-[640px] border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-black/10 text-[11px] font-normal uppercase tracking-[0.12em] text-black/40">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">Model</th>
                        <th className="px-4 py-3">Harness</th>
                        <th className="px-4 py-3 text-right">Elo</th>
                        <th className="px-4 py-3 text-right">$ / task</th>
                        <th className="hidden px-4 py-3 text-right sm:table-cell">Time</th>
                        <th className="px-4 py-3 text-right">Tasks</th>
                      </tr>
                    </thead>
                    <tbody className="tabular-nums">
                      {modelRows.map((row, i) => (
                        <tr key={`${row.harness}-${row.model}`} className={`border-b border-black/5 last:border-0 ${row.harness === 'Trooper' ? 'bg-black/[0.03]' : i % 2 === 1 ? 'bg-black/[0.015]' : ''}`}>
                          <td className="px-4 py-2.5 text-black/40">{i + 1}</td>
                          <td className="whitespace-nowrap px-4 py-2.5">
                            <span className="inline-flex items-center gap-2">
                              <BrandTile brand={brandForModel(row.model)} size="sm" />
                              {row.model}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-2.5 text-black/50">
                            <span className="inline-flex items-center gap-2">
                              <BrandTile brand={brandForHarness(row.harness)} size="sm" />
                              {row.harness}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 text-right">{formatElo(row.elo)}</td>
                          <td className="px-4 py-2.5 text-right">{formatUsd(row.cost)}</td>
                          <td className="hidden px-4 py-2.5 text-right sm:table-cell">{row.time}</td>
                          <td className="px-4 py-2.5 text-right text-black/45">{formatCount(row.tasks)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="value-per-dollar" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  Value per dollar
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  Elo against what a typical task costs. Up and to the left is the sweet spot.
                </p>
                <div className="mt-4">
                <Card title="Elo vs typical task cost" lede="Every pair across all categories — pairs on the line are the efficient frontier.">
                  <EloCostScatter rows={OVERALL_ROWS} />
                  <HarnessLegend />
                </Card>
                </div>
              </section>

              {CATEGORIES.map((category) => (
                  <section key={category.id} id={category.id} className="mt-14 scroll-mt-28">
                    <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                      {category.title}
                    </h2>
                    <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                      {category.blurb} — {formatCount(category.tasks)} tasks.
                    </p>
                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <Card title="Elo rankings" lede={`Head-to-head rating on ${category.title} work — longer bar is better.`}>
                        <EloBarChart rows={category.rows} />
                        <HarnessLegend />
                      </Card>
                      <Card title="Elo vs cost" lede="Up and to the left wins more for less.">
                        <EloCostScatter rows={category.rows} />
                        <HarnessLegend />
                      </Card>
                    </div>
                    <div className="mt-4 border border-black/10 bg-white px-4 py-5 sm:px-5">
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <h3 className="text-[15px] font-medium text-neutral-900">Cost per task</h3>
                          <p className="mt-1 text-[13px] text-black/45">
                            Light, typical, and heavy task cost for each pair.
                          </p>
                        </div>
                        <ul className="flex gap-4 text-[12px] text-black/45">
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-black/40" /> light
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-black/40" /> typical
                          </li>
                          <li className="inline-flex items-center gap-1.5">
                            <span className="size-3 rounded-full bg-black/40" /> heavy
                          </li>
                        </ul>
                      </div>
                      <CostBandRows rows={category.rows} />
                    </div>
                  </section>
              ))}

              <section id="methodology" className="mt-14 scroll-mt-28">
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  Methodology
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  What these numbers mean and where they come from.
                </p>
                <div className="prose-sm mt-4 max-w-2xl space-y-4 text-[14px] leading-6 text-neutral-600">
                  <p>
                    Every row aggregates tasks that Trooper users&apos; agents ran between {BENCHMARK_META.from} and{' '}
                    {BENCHMARK_META.to}. Nothing here is a lab exercise: each task had an owner waiting on the result, and
                    each pair is measured on the work it was actually given. Trooper is scored as another harness in
                    the same snapshot — not a separate lab run.
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
                <h2 className="font-display text-[22px] font-medium leading-tight tracking-tight text-neutral-800 md:text-[26px]">
                  FAQ
                </h2>
                <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-black/60">
                  Quick answers on how to read the leaderboard.
                </p>
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
