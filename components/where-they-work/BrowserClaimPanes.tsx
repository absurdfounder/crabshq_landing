'use client';

import { Check, ChevronDown, Search, Star } from 'lucide-react';
import { DemoFavicon } from '@trooper/demo';

export type ClaimTabId = 'gmail' | 'stripe' | 'qbo' | 'notion';

export const CLAIM_TABS: {
  id: ClaimTabId;
  title: string;
  domain: string;
  url: string;
  action: string;
}[] = [
  {
    id: 'gmail',
    title: 'Inbox',
    domain: 'mail.google.com',
    url: 'mail.google.com/mail/u/0/#inbox',
    action: 'Scanning inbox for “Q3 ledger”…',
  },
  {
    id: 'stripe',
    title: 'Payments',
    domain: 'stripe.com',
    url: 'dashboard.stripe.com/payments',
    action: 'Filtering succeeded payments · last 30 days',
  },
  {
    id: 'qbo',
    title: 'QuickBooks',
    domain: 'quickbooks.intuit.com',
    url: 'app.qbo.intuit.com/app/report?id=generalledger',
    action: 'Opening Chart of Accounts · exporting CSV',
  },
  {
    id: 'notion',
    title: 'Finance wiki',
    domain: 'notion.so',
    url: 'www.notion.so/wonder/finance-ops',
    action: 'Reading close checklist from Notion',
  },
];

function BrandMark({
  domain,
  size,
  className = '',
}: {
  domain: string;
  size: number;
  className?: string;
}) {
  return <DemoFavicon domain={domain} size={size} className={className} rounded="sm" />;
}

/* ─── Gmail ─── */
function GmailPane() {
  const rows = [
    {
      from: 'QuickBooks Online',
      sub: 'Your January P&L is ready to download',
      snip: ' — Wonder Studio · Accrual basis',
      time: '9:12 AM',
      unread: true,
      domain: 'quickbooks.intuit.com',
    },
    {
      from: 'Stripe',
      sub: 'Payout of $18,420.00 is on the way',
      snip: ' — Expected in your bank by Jul 30',
      time: '8:04 AM',
      unread: true,
      domain: 'stripe.com',
    },
    {
      from: 'Leo',
      sub: 'Re: Q3 ledger from office Mac',
      snip: ' — Pulling it from QuickBooks now',
      time: 'Yesterday',
      unread: false,
      domain: null as string | null,
      color: '#1a73e8',
    },
    {
      from: 'Notion',
      sub: 'Finance wiki · Close checklist updated',
      snip: ' — 2 items completed',
      time: 'Mon',
      unread: false,
      domain: 'notion.so',
    },
  ];

  return (
    <div className="flex h-full min-h-0 bg-white text-[11px] text-[#202124]">
      <aside className="flex w-[120px] shrink-0 flex-col border-r border-[#e0e0e0] bg-[#f6f8fc] sm:w-[136px]">
        <div className="flex items-center gap-2 px-2.5 py-2">
          <BrandMark domain="mail.google.com" size={18} />
          <span className="text-[15px] font-normal tracking-tight text-[#5f6368]">Gmail</span>
        </div>
        <button
          type="button"
          className="mx-1.5 mb-1.5 flex items-center gap-2 rounded-2xl bg-[#c2e7ff] px-2.5 py-2 text-[12px] font-medium text-[#001d35] shadow-sm"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="currentColor"
              d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v4.18l6.05 3.23-.99 1.85L17 12.82V22h-2v-9.18l-5.06 2.7-.99-1.85L15 10.18V6h2z"
            />
          </svg>
          Compose
        </button>
        <nav className="flex flex-col gap-0.5 px-1 text-[11px]">
          {[
            { label: 'Inbox', count: '2', active: true },
            { label: 'Starred', count: '', active: false },
            { label: 'Snoozed', count: '', active: false },
            { label: 'Sent', count: '', active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between rounded-r-full px-2.5 py-1 font-medium ${
                item.active ? 'bg-[#d3e3fd] text-[#041e49]' : 'text-[#202124]'
              }`}
            >
              <span>{item.label}</span>
              {item.count ? <span className="text-[10px]">{item.count}</span> : null}
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-2.5 py-1.5">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-[#eaf1fb] px-2.5 py-1 text-[11px] text-[#444746]">
            <Search className="size-3.5 shrink-0" strokeWidth={2} />
            <span className="truncate">Search mail</span>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {rows.map((r) => (
            <div
              key={r.sub}
              className={`grid grid-cols-[16px_18px_88px_1fr_52px] items-center gap-1 border-b border-[#f1f3f4] px-2 py-1.5 sm:grid-cols-[16px_18px_104px_1fr_56px] ${
                r.unread ? 'bg-[#f2f6fc]' : 'bg-white'
              }`}
            >
              <span className="size-3 rounded border border-[#747775]" />
              <Star className="size-3 text-[#747775]" strokeWidth={1.75} />
              <div className="flex min-w-0 items-center gap-1">
                {r.domain ? (
                  <BrandMark domain={r.domain} size={16} />
                ) : (
                  <span
                    className="flex size-4 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
                    style={{ background: r.color ?? '#1a73e8' }}
                  >
                    {r.from[0]}
                  </span>
                )}
                <span className={`truncate ${r.unread ? 'font-bold' : 'font-medium'}`}>{r.from}</span>
              </div>
              <div className="min-w-0 truncate">
                <span className={r.unread ? 'font-bold' : 'font-medium'}>{r.sub}</span>
                <span className="text-[#5f6368]">{r.snip}</span>
              </div>
              <span
                className={`text-right text-[10px] tabular-nums ${r.unread ? 'font-bold' : 'text-[#5f6368]'}`}
              >
                {r.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Stripe ─── */
function StripePane() {
  const rows = [
    { amt: '$2,400.00', status: 'Succeeded', desc: 'Acme Labs · Invoice #1842', date: 'Jul 29', method: 'Visa ···· 4242' },
    { amt: '$890.00', status: 'Succeeded', desc: 'Northwind · Subscription', date: 'Jul 28', method: 'Mastercard ···· 4444' },
    { amt: '$120.00', status: 'Refunded', desc: 'Orbit Co · One-time', date: 'Jul 27', method: 'Visa ···· 1881' },
    { amt: '$4,200.00', status: 'Succeeded', desc: 'Kinetic · Annual plan', date: 'Jul 26', method: 'Amex ···· 0005' },
  ];
  const nav = ['Home', 'Balances', 'Transactions', 'Customers', 'Reports'];

  return (
    <div className="flex h-full min-h-0 bg-[#f6f9fc] text-[11px] text-[#0a2540]">
      <aside className="hidden w-[120px] shrink-0 flex-col bg-[#0a2540] text-white sm:flex">
        <div className="flex items-center gap-2 px-2.5 py-2.5">
          <BrandMark domain="stripe.com" size={18} />
          <span className="text-[12px] font-semibold tracking-tight">stripe</span>
        </div>
        <nav className="flex flex-col gap-0.5 px-1.5">
          {nav.map((item) => (
            <span
              key={item}
              className={`rounded-md px-2 py-1.5 text-[11px] font-medium ${
                item === 'Transactions' ? 'bg-white/15 text-white' : 'text-white/65'
              }`}
            >
              {item}
            </span>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 px-2.5 py-2 text-[10px] text-white/50">
          Wonder · <span className="text-[#00d924]">Live</span>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-[#e3e8ee] bg-white px-3 py-2">
          <div>
            <p className="text-[13px] font-semibold tracking-tight">Payments</p>
            <p className="text-[10px] text-[#697386]">Wonder · United States · USD</p>
          </div>
          <button
            type="button"
            className="rounded-md bg-[#635bff] px-2.5 py-1 text-[11px] font-semibold text-white"
          >
            Export
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-[#e3e8ee] bg-white px-3 py-1.5">
          {['Succeeded', 'Last 30 days', 'USD'].map((chip) => (
            <span
              key={chip}
              className="inline-flex items-center gap-1 rounded-full border border-[#e3e8ee] bg-[#f6f9fc] px-2 py-0.5 text-[10px] font-medium"
            >
              {chip}
              <ChevronDown className="size-2.5 text-[#697386]" />
            </span>
          ))}
        </div>

        <div className="grid grid-cols-[0.7fr_0.7fr_1.2fr_0.55fr] gap-2 border-b border-[#e3e8ee] bg-white px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#697386]">
          <span>Amount</span>
          <span>Status</span>
          <span>Description</span>
          <span>Date</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {rows.map((r) => (
            <div
              key={r.desc}
              className="grid grid-cols-[0.7fr_0.7fr_1.2fr_0.55fr] gap-2 border-b border-[#eef2f7] bg-white px-3 py-2"
            >
              <span className="font-semibold tabular-nums">{r.amt}</span>
              <span>
                <span
                  className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                    r.status === 'Succeeded'
                      ? 'bg-[#d6f5e9] text-[#0d7a5f]'
                      : 'bg-[#ffeacc] text-[#9a5b00]'
                  }`}
                >
                  {r.status}
                </span>
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium">{r.desc}</p>
                <p className="truncate text-[10px] text-[#697386]">{r.method}</p>
              </div>
              <span className="tabular-nums text-[#697386]">{r.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── QuickBooks ─── */
function QuickBooksPane() {
  const rows = [
    { num: '1000', name: 'Cash and cash equivalents', bal: '$142,880.12', type: 'Bank' },
    { num: '1200', name: 'Accounts receivable (A/R)', bal: '$38,240.00', type: 'Accounts receivable' },
    { num: '4000', name: 'Product revenue', bal: '$512,900.45', type: 'Income' },
    { num: '6000', name: 'Operating expenses', bal: '$91,120.88', type: 'Expense' },
  ];
  const nav = ['Dashboard', 'Banking', 'Expenses', 'Sales', 'Reports'];

  return (
    <div className="flex h-full min-h-0 bg-[#f4f5f8] text-[11px] text-[#393a3d]">
      <aside className="flex w-[112px] shrink-0 flex-col bg-[#2ca01c] text-white sm:w-[128px]">
        <div className="flex items-center gap-1.5 border-b border-white/20 px-2 py-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white shadow-sm">
            <BrandMark domain="quickbooks.intuit.com" size={16} />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[9px] font-bold tracking-wide">QUICKBOOKS</p>
            <p className="truncate text-[8px] text-white/80">Online</p>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 p-1">
          {nav.map((item) => (
            <span
              key={item}
              className={`rounded px-2 py-1.5 text-[11px] font-medium ${
                item === 'Reports' ? 'bg-white/20' : 'text-white/90'
              }`}
            >
              {item}
            </span>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-[#d4d7de] bg-white px-3 py-2">
          <div>
            <p className="text-[13px] font-semibold">Chart of Accounts</p>
            <p className="text-[10px] text-[#6b6c72]">Wonder Studio · Accrual</p>
          </div>
          <span className="rounded bg-[#2ca01c] px-2 py-1 text-[10px] font-semibold text-white">
            Run report
          </span>
        </div>

        <div className="grid grid-cols-[44px_1.4fr_0.75fr_0.9fr] gap-2 border-b border-[#d4d7de] bg-[#eef0f4] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-[#6b6c72]">
          <span>#</span>
          <span>Account</span>
          <span className="text-right">Balance</span>
          <span>Type</span>
        </div>
        <div className="min-h-0 flex-1 overflow-hidden">
          {rows.map((r) => (
            <div
              key={r.num}
              className="grid grid-cols-[44px_1.4fr_0.75fr_0.9fr] gap-2 border-b border-[#e5e7eb] bg-white px-3 py-2"
            >
              <span className="font-mono text-[10px] text-[#6b6c72]">{r.num}</span>
              <span className="truncate font-semibold text-[#2ca01c]">{r.name}</span>
              <span className="text-right font-medium tabular-nums">{r.bal}</span>
              <span className="truncate text-[#6b6c72]">{r.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Notion ─── */
function NotionPane() {
  const pages = ['Home', 'Finance ops', 'Close checklist', 'Board pack'];
  const todos = [
    { text: 'Export Stripe payouts CSV', done: true },
    { text: 'Pull QuickBooks general ledger', done: true },
    { text: 'Reconcile AR vs bank feed', done: false },
    { text: 'Drop files in #finance-close', done: false },
  ];

  return (
    <div className="flex h-full min-h-0 bg-white text-[11px] text-[#37352f]">
      <aside className="flex w-[120px] shrink-0 flex-col border-r border-black/[0.06] bg-[#f7f6f3] sm:w-[132px]">
        <div className="flex items-center gap-2 px-2 py-2">
          <BrandMark domain="notion.so" size={15} />
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold">Wonder</p>
            <p className="truncate text-[9px] text-black/40">Workspace</p>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 px-1">
          {pages.map((p) => (
            <span
              key={p}
              className={`truncate rounded px-2 py-1 text-[11px] ${
                p === 'Close checklist' ? 'bg-black/[0.06] font-medium' : 'text-black/60'
              }`}
            >
              {p}
            </span>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 overflow-hidden px-3 py-2.5 sm:px-4">
        <div className="mb-1 flex items-center gap-1.5 text-[10px] text-black/40">
          <span>Finance ops</span>
          <span>/</span>
          <span className="text-black/60">Close checklist</span>
        </div>
        <h4 className="text-[17px] font-bold tracking-tight text-[#37352f]">Close checklist</h4>
        <div className="mt-1.5 flex flex-wrap gap-1.5 text-[10px] text-black/50">
          <span className="rounded bg-black/[0.04] px-1.5 py-0.5">Owner · Leo</span>
          <span className="rounded bg-black/[0.04] px-1.5 py-0.5">Due · Jul 31</span>
          <span className="rounded bg-[#e8f5e9] px-1.5 py-0.5 text-[#2e7d32]">In progress</span>
        </div>
        <div className="mt-2.5 space-y-1.5 border-t border-black/[0.06] pt-2.5">
          {todos.map((t) => (
            <div key={t.text} className="flex items-start gap-2">
              <span
                className={`mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border ${
                  t.done ? 'border-[#2383e2] bg-[#2383e2] text-white' : 'border-black/25 bg-white'
                }`}
              >
                {t.done ? <Check className="size-2.5" strokeWidth={3} /> : null}
              </span>
              <span className={`text-[12px] leading-snug ${t.done ? 'text-black/40 line-through' : ''}`}>
                {t.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrowserClaimPage({ tabId }: { tabId: ClaimTabId }) {
  if (tabId === 'gmail') return <GmailPane />;
  if (tabId === 'stripe') return <StripePane />;
  if (tabId === 'qbo') return <QuickBooksPane />;
  return <NotionPane />;
}

export function TabFavicon({ tabId, size = 14 }: { tabId: ClaimTabId; size?: number }) {
  const tab = CLAIM_TABS.find((t) => t.id === tabId)!;
  return <DemoFavicon domain={tab.domain} size={size} rounded="sm" alt={tab.title} />;
}
