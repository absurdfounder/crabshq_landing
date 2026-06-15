import { TROOPER_DEMO as T } from '@/components/demoTheme';

export function CodingHarnessVisual() {
  const agents = [
    { name: 'Claude Code', task: 'parser.ts patch', status: 'Running tests' },
    { name: 'Codex', task: 'ETL dedupe', status: 'Applying patch' },
    { name: 'Cursor', task: 'Release notes', status: 'Drafting' },
  ];

  return (
    <div className="flex h-full flex-col bg-[#FAF9F6] p-4">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Multi-agent harness</div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {agents.map((a) => (
          <div key={a.name} className="flex flex-col border border-stone-200 bg-white">
            <div className="border-b border-stone-100 px-2 py-1.5 text-[10px] font-semibold text-stone-700">{a.name}</div>
            <div className="flex-1 p-2 font-mono text-[9px] leading-relaxed text-stone-500">
              <div className="mb-1 text-stone-800">{a.task}</div>
              <div className="rounded bg-stone-50 p-1.5 text-[8px]">
                + filter(Boolean) before parseRow
                <br />
                <span style={{ color: T.brand }}>● {a.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CodingBoardVisual() {
  const cols = [
    { label: 'In progress', tasks: ['Parser hotfix', 'ETL dedupe'] },
    { label: 'Backlog', tasks: ['Release notes'] },
    { label: 'Done', tasks: ['Lint config'] },
  ];

  return (
    <div className="flex h-full flex-col bg-white p-4">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Unified coding board</div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {cols.map((col) => (
          <div key={col.label} className="rounded border border-stone-200 bg-stone-50/80 p-2">
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-wide text-stone-500">{col.label}</div>
            {col.tasks.map((t) => (
              <div key={t} className="mb-1.5 rounded border border-stone-200 bg-white px-2 py-1.5 text-[10px] font-medium text-stone-800">
                {t}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CampaignPipelineVisual() {
  const steps = ['Brief', 'SEO recon', 'Drafts', 'Review', 'Schedule'];
  return (
    <div className="flex h-full flex-col justify-center bg-white p-6">
      <div className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Campaign pipeline</div>
      <div className="flex items-center gap-1">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1">
            <div className={`rounded border px-2 py-2 text-center text-[9px] font-semibold ${i < 3 ? 'border-trooper-200 bg-trooper-50 text-trooper-800' : 'border-stone-200 bg-stone-50 text-stone-600'}`}>
              {s}
            </div>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-stone-200" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SalesPipelineVisual() {
  const stages = [
    { name: 'Inbound', count: 3 },
    { name: 'Qualified', count: 2, active: true },
    { name: 'Demo', count: 1 },
    { name: 'Close', count: 0 },
  ];
  return (
    <div className="flex h-full flex-col bg-[#FAF9F6] p-5">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Sales pipeline</div>
      <div className="grid flex-1 grid-cols-4 gap-2">
        {stages.map((s) => (
          <div key={s.name} className={`rounded border p-2 ${s.active ? 'border-trooper bg-trooper-50' : 'border-stone-200 bg-white'}`}>
            <div className="text-[9px] font-semibold text-stone-600">{s.name}</div>
            <div className="mt-2 text-lg font-semibold tabular-nums text-stone-900">{s.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SlackRoutingVisual() {
  return (
    <div className="flex h-full items-stretch gap-3 bg-[#f8f5fb] p-4">
      <div className="flex w-[42%] flex-col rounded border border-[#611f69]/20 bg-white p-3">
        <div className="mb-2 text-[10px] font-bold text-[#611f69]">#sales</div>
        <div className="rounded bg-stone-50 p-2 text-[10px] text-stone-600">Sarah: schedule a demo this week?</div>
      </div>
      <div className="flex flex-col items-center justify-center text-[10px] text-stone-400">→</div>
      <div className="flex flex-1 flex-col rounded border border-stone-200 bg-white p-3">
        <div className="mb-2 font-mono text-[9px] uppercase text-stone-500">Ticket #4421</div>
        <div className="rounded bg-trooper-50 px-2 py-1.5 text-[10px] font-medium text-trooper-800">Schedule Acme demo</div>
        <div className="mt-2 text-[9px] text-stone-500">Jordan · Aria assigned</div>
      </div>
    </div>
  );
}

export function WhatsAppRoutingVisual() {
  return (
    <div className="flex h-full flex-col bg-[#ece5dd] p-4">
      <div className="ml-auto max-w-[75%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-3 py-2 text-[10px] text-stone-800">
        Login still broken after reset
      </div>
      <div className="mt-3 rounded border border-stone-200 bg-white p-2 text-[10px]">
        <span className="font-semibold text-trooper">Ticket #881</span> — Leo investigating
      </div>
    </div>
  );
}

export function LegalReviewVisual() {
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Human review gate</div>
      <div className="space-y-2">
        {['Liability cap flagged', 'Redline drafted', 'Counsel approval required'].map((line, i) => (
          <div key={line} className="flex items-center gap-2 rounded border border-stone-200 px-3 py-2 text-[10px]">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold ${i < 2 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
              {i + 1}
            </span>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OpsRunbookVisual() {
  const items = [
    { label: 'Vendor reconciliation', done: true },
    { label: 'Access review', done: true },
    { label: 'Budget variance', done: false },
    { label: 'Backup verification', done: true },
  ];
  return (
    <div className="flex h-full flex-col bg-white p-5">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">Weekly runbook</div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-[10px] text-stone-700">
            <span className={`flex h-4 w-4 items-center justify-center rounded border ${item.done ? 'border-trooper bg-trooper-50 text-trooper' : 'border-stone-300'}`}>
              {item.done ? '✓' : ''}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EngineeringIncidentVisual() {
  return (
    <div className="flex h-full flex-col bg-stone-900 p-4 text-stone-100">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-red-400">Incident #442</div>
      <div className="space-y-1 font-mono text-[9px] leading-relaxed text-stone-300">
        <div>08:12 p99 spike detected</div>
        <div>08:14 pool exhaustion identified</div>
        <div className="text-green-400">08:18 rollback v2.3.1 complete</div>
      </div>
    </div>
  );
}

export function MessagingRoutingVisual() {
  return (
    <div className="flex h-full items-center justify-center gap-4 bg-[#FAF9F6] p-4">
      <div className="rounded-full border border-stone-200 bg-white px-4 py-2 text-[10px] font-medium">Any channel</div>
      <span className="text-stone-400">→</span>
      <div className="rounded border border-trooper-200 bg-trooper-50 px-4 py-2 text-[10px] font-semibold text-trooper-800">Traced ticket</div>
    </div>
  );
}

export function EmailRoutingVisual() {
  return (
    <div className="flex h-full flex-col bg-white p-4">
      <div className="rounded border border-stone-200 p-3">
        <div className="text-[9px] text-stone-500">From: procurement@enterprise.co</div>
        <div className="mt-1 text-[11px] font-semibold text-stone-900">RFP — AI ops platform</div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-stone-600">
        <span className="rounded bg-trooper-50 px-2 py-1 font-medium text-trooper-800">Ticket #772</span>
        <span>Research + draft queued</span>
      </div>
    </div>
  );
}
