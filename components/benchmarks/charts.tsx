import {
  formatElo,
  formatUsd,
  HARNESS_COLOR,
  paretoFrontier,
  type HarnessId,
  type PairRow,
} from '@/lib/benchmarks';

const ELO_MIN = 1025;
const ELO_MAX = 1225;

function logRange(min: number, max: number) {
  const lo = Math.log10(Math.max(min, 0.05));
  const hi = Math.log10(max);
  return { lo, hi, x: (v: number) => ((Math.log10(Math.max(v, 0.05)) - lo) / (hi - lo)) };
}

export function HarnessLegend() {
  const items: HarnessId[] = ['Claude Code', 'Codex', 'Hermes'];
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-neutral-500">
      {items.map((harness) => (
        <li key={harness} className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: HARNESS_COLOR[harness] }}
            aria-hidden
          />
          {harness}
        </li>
      ))}
    </ul>
  );
}

export function EloBarChart({ rows }: { rows: PairRow[] }) {
  const width = 560;
  const height = 248;
  const pad = { top: 22, right: 8, bottom: 52, left: 8 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const gap = 10;
  const barW = Math.min(48, (innerW - gap * (rows.length - 1)) / rows.length);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Elo rankings">
      {rows.map((row, i) => {
        const x = pad.left + i * (barW + gap) + (innerW - rows.length * barW - gap * (rows.length - 1)) / 2;
        const t = (row.elo - ELO_MIN) / (ELO_MAX - ELO_MIN);
        const h = Math.max(8, t * innerH);
        const y = pad.top + innerH - h;
        const color = HARNESS_COLOR[row.harness];
        return (
          <g key={row.id}>
            <rect x={x} y={y} width={barW} height={h} rx="4" fill={color} opacity={0.9} />
            <text
              x={x + barW / 2}
              y={y - 6}
              textAnchor="middle"
              className="fill-neutral-800"
              fontSize="11"
              fontWeight="600"
            >
              {formatElo(row.elo)}
            </text>
            <text
              x={x + barW / 2}
              y={height - 28}
              textAnchor="middle"
              className="fill-neutral-600"
              fontSize="9"
            >
              {row.model.split(' ').slice(-2).join(' ')}
            </text>
            <circle cx={x + barW / 2} cy={height - 12} r="5" fill={color} />
          </g>
        );
      })}
    </svg>
  );
}

export function EloCostScatter({ rows }: { rows: PairRow[] }) {
  const width = 560;
  const height = 248;
  const pad = { top: 16, right: 16, bottom: 36, left: 44 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const costs = rows.map((r) => r.cost);
  const minC = Math.min(...costs) * 0.7;
  const maxC = Math.max(...costs) * 1.25;
  const { x: xOf } = logRange(minC, maxC);
  const yOf = (elo: number) => innerH - ((elo - ELO_MIN) / (ELO_MAX - ELO_MIN)) * innerH;
  const front = paretoFrontier(rows);
  const ticks = [0.1, 1, 10].filter((t) => t >= minC * 0.5 && t <= maxC * 1.4);

  const path = front
    .map((row, i) => {
      const x = pad.left + xOf(row.cost) * innerW;
      const y = pad.top + yOf(row.elo);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Elo versus cost">
      {[1025, 1075, 1125, 1175, 1225].map((elo) => {
        const y = pad.top + yOf(elo);
        return (
          <g key={elo}>
            <line x1={pad.left} x2={width - pad.right} y1={y} y2={y} stroke="#e8e8e5" />
            <text x={pad.left - 8} y={y + 3} textAnchor="end" className="fill-neutral-400" fontSize="9">
              {formatElo(elo)}
            </text>
          </g>
        );
      })}
      {path ? <path d={path} fill="none" stroke="#171717" strokeWidth="1.25" /> : null}
      {rows.map((row) => {
        const x = pad.left + xOf(row.cost) * innerW;
        const y = pad.top + yOf(row.elo);
        return (
          <g key={row.id}>
            <circle cx={x} cy={y} r="6.5" fill="#fff" stroke={HARNESS_COLOR[row.harness]} strokeWidth="2.5" />
            <title>{`${row.harness} × ${row.model} — Elo ${formatElo(row.elo)}, ${formatUsd(row.cost)} / task`}</title>
          </g>
        );
      })}
      {ticks.map((tick) => (
        <text
          key={tick}
          x={pad.left + xOf(tick) * innerW}
          y={height - 14}
          textAnchor="middle"
          className="fill-neutral-400"
          fontSize="9"
        >
          {formatUsd(tick)}
        </text>
      ))}
      <text x={pad.left + innerW / 2} y={height - 2} textAnchor="middle" className="fill-neutral-500" fontSize="10">
        Median cost per task — log scale
      </text>
      <text
        x={12}
        y={pad.top + innerH / 2}
        textAnchor="middle"
        className="fill-neutral-500"
        fontSize="10"
        transform={`rotate(-90 12 ${pad.top + innerH / 2})`}
      >
        Quality — Elo score ↑
      </text>
    </svg>
  );
}

export function CostBandRows({ rows }: { rows: PairRow[] }) {
  const maxHeavy = Math.max(...rows.map((r) => r.heavy));
  return (
    <ol className="divide-y divide-[var(--color-line)]">
      {rows.map((row, i) => {
        const toPct = (n: number) => `${Math.max(4, (n / maxHeavy) * 100)}%`;
        return (
          <li key={row.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-800">
                <span className="mr-2 tabular-nums text-neutral-400">{i + 1}</span>
                {row.harness}
                <span className="px-1.5 text-neutral-400">×</span>
                <span className="font-normal text-neutral-600">{row.model}</span>
              </p>
              <p className="mt-1 text-[11px] tabular-nums text-neutral-500">
                Elo {formatElo(row.elo)} · {row.winRate}% win rate · {row.time} · {row.tasks.toLocaleString()} tasks
                {row.tasks < 250 ? ' · provisional' : ''}
              </p>
            </div>
            <div className="relative h-10">
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-[var(--color-line)]" />
              {(
                [
                  [row.light, 6, 'light'],
                  [row.cost, 9, 'typical'],
                  [row.heavy, 12, 'heavy'],
                ] as const
              ).map(([value, size, label]) => (
                <span
                  key={label}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: toPct(value) }}
                  title={`${label} ${formatUsd(value)}`}
                >
                  <span
                    className="block rounded-full bg-emerald-600"
                    style={{ width: size, height: size }}
                  />
                  <span className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-[10px] tabular-nums text-neutral-600">
                    {formatUsd(value)}
                  </span>
                </span>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
