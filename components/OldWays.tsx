'use client';

import { useEffect, useRef, useState } from "react";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

/* ─── Favicon helper ─── */
const Fav = ({ domain, size = 28 }: { domain: string; size?: number }) => (
  <div className="border border-dashed border-slate-300 rounded-lg p-2.5 flex items-center justify-center bg-white">
    <img
      src={`https://${domain}/favicon.ico`}
      alt={domain.split('.')[0]}
      width={size}
      height={size}
      className="rounded-sm"
      loading="lazy"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  </div>
);

/* ─── Crab bot message ─── */
const CrabMsg = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center text-base flex-shrink-0 border border-red-100">🦀</div>
    <div className="text-[13px] text-slate-600 leading-relaxed font-mono">{children}</div>
  </div>
);

/* ─── Dashed label tag ─── */
const DashedLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="inline-flex items-center gap-2 border border-dashed border-slate-300 rounded-lg px-3 py-1.5 bg-white">
    <span className="text-slate-400">{icon}</span>
    <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-slate-600">{text}</span>
  </div>
);

/* ─── SVG flowing line ─── */
const FlowLine = ({ className = '' }: { className?: string }) => (
  <svg className={`absolute text-slate-200 ${className}`} width="100%" height="100%" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none">
    <path d="M200 0 C180 100, 280 150, 200 250 C120 350, 300 400, 200 500" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M350 0 C330 120, 100 180, 180 300 C260 420, 50 460, 150 500" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

/* ─── Visual 1: AI Org — Org chart with crabs ─── */
const OrgVisual = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 sm:p-8">
    {/* CEO / Founder */}
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full border-2 border-white shadow-md overflow-hidden bg-red-50 flex items-center justify-center text-2xl -mb-4 relative z-10">
        🦀
      </div>
      <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-slate-200 px-6 py-4 text-center min-w-[180px]">
        <p className="font-semibold text-[14px] text-slate-900 mt-1">Crab Prime</p>
        <p className="text-[12px] text-slate-400">CEO, Founder</p>
      </div>
      <div className="flex items-center gap-1.5 mt-2 bg-slate-900 text-white rounded-md px-2.5 py-1">
        <span className="text-[11px] font-semibold">44</span>
        <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
      </div>
    </div>

    {/* Connector lines */}
    <div className="relative w-full max-w-[420px] h-10">
      {/* Vertical line from CEO */}
      <div className="absolute left-1/2 top-0 w-px h-4 bg-slate-300 -translate-x-1/2" />
      {/* Horizontal bar */}
      <div className="absolute top-4 left-[25%] right-[25%] h-px bg-slate-300" />
      {/* Left vertical */}
      <div className="absolute top-4 left-[25%] w-px h-6 bg-slate-300" />
      {/* Right vertical */}
      <div className="absolute top-4 right-[25%] w-px h-6 bg-slate-300" />
    </div>

    {/* Managers row */}
    <div className="flex gap-6 sm:gap-10">
      {[
        { name: 'Research Crab', role: 'Head of Research', count: 24 },
        { name: 'Dev Crab', role: 'Head of Engineering', count: 18 },
      ].map((mgr, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center text-lg -mb-3 relative z-10">
            🦀
          </div>
          <div className="bg-white rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-slate-200 px-5 py-3 text-center min-w-[150px]">
            <p className="font-semibold text-[13px] text-slate-900 mt-0.5">{mgr.name}</p>
            <p className="text-[11px] text-slate-400">{mgr.role}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2 bg-white border border-slate-200 rounded-md px-2.5 py-1 shadow-sm">
            <span className="text-[11px] font-semibold text-slate-700">{mgr.count}</span>
            <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Visual 2: Integrations — favicon grid + "Over 3000" ─── */
const IntegrationsVisual = () => {
  const row1 = ['salesforce.com', 'google.com', 'linear.app', 'trello.com', 'slack.com', 'figma.com'];
  const row2 = ['notion.so', 'atlassian.com', 'dropbox.com', 'asana.com', 'gmail.com', 'github.com'];

  return (
    <div className="relative h-full flex flex-col justify-center p-6 sm:p-8 overflow-hidden">
      <FlowLine className="inset-0 opacity-40" />
      <div className="relative z-10">
        <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-white/60 backdrop-blur-sm">
          <div className="grid grid-cols-6 gap-2 mb-2">
            {row1.map((d) => <Fav key={d} domain={d} />)}
          </div>
          <div className="grid grid-cols-6 gap-2">
            {row2.map((d) => <Fav key={d} domain={d} />)}
          </div>
          <p className="text-center text-[12px] text-slate-400 font-mono mt-4 tracking-wide">Over 3000 integrations</p>
        </div>

        <div className="mt-8 flex items-end justify-end">
          <div>
            <p className="text-7xl sm:text-8xl font-bold text-slate-200 leading-none tracking-tighter">3k</p>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 mt-1">Integrations via browser and native APIs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Shared chat components ─── */
const ChatHeader = () => (
  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100">
    <span className="text-xs font-medium text-slate-500">Thread</span>
    <div className="flex items-center gap-1">
      {['M3 16V14H10V16H3ZM3 12V10H14V12H3ZM3 8V6H14V8H3ZM16 20V16H12V14H16V10H18V14H22V16H18V20H16Z',
        'M12 20C11.45 20 10.9792 19.8042 10.5875 19.4125C10.1958 19.0208 10 18.55 10 18C10 17.45 10.1958 16.9792 10.5875 16.5875C10.9792 16.1958 11.45 16 12 16C12.55 16 13.0208 16.1958 13.4125 16.5875C13.8042 16.9792 14 17.45 14 18C14 18.55 13.8042 19.0208 13.4125 19.4125C13.0208 19.8042 12.55 20 12 20ZM12 14C11.45 14 10.9792 13.8042 10.5875 13.4125C10.1958 13.0208 10 12.55 10 12C10 11.45 10.1958 10.9792 10.5875 10.5875C10.9792 10.1958 11.45 10 12 10C12.55 10 13.0208 10.1958 13.4125 10.5875C13.8042 10.9792 14 11.45 14 12C14 12.55 13.8042 13.0208 13.4125 13.4125C13.0208 13.8042 12.55 14 12 14ZM12 8C11.45 8 10.9792 7.80417 10.5875 7.4125C10.1958 7.02083 10 6.55 10 6C10 5.45 10.1958 4.97917 10.5875 4.5875C10.9792 4.19583 11.45 4 12 4C12.55 4 13.0208 4.19583 13.4125 4.5875C13.8042 4.97917 14 5.45 14 6C14 6.55 13.8042 7.02083 13.4125 7.4125C13.0208 7.80417 12.55 8 12 8Z',
        'M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z',
      ].map((d, i) => (
        <button key={i} className="p-1 hover:bg-slate-50 rounded transition-colors">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="currentColor"><path d={d} /></svg>
        </button>
      ))}
    </div>
  </div>
);

const ChatUser = ({ name, time, children }: { name: string; time: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-2.5">
    <img src={`https://i.pravatar.cc/150?u=human-${name.toLowerCase()}`} alt={name} className="w-8 h-8 rounded-md object-cover flex-shrink-0" />
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="font-semibold text-[13px] text-slate-800">{name}</span>
        <span className="text-[11px] text-slate-400">{time}</span>
      </div>
      <div className="text-[13px] text-slate-600 mt-0.5 leading-relaxed">{children}</div>
    </div>
  </div>
);

const ChatBot = ({ time, children }: { time: string; children: React.ReactNode }) => (
  <div className="flex items-start gap-2.5">
    <div className="w-8 h-8 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0 text-base">🦀</div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-[13px] text-slate-800">Crab AI</span>
        <span className="text-[9px] px-1 py-px bg-slate-100 text-slate-500 rounded font-medium">APP</span>
        <span className="text-[11px] text-slate-400">{time}</span>
      </div>
      <div className="text-[13px] text-slate-600 mt-0.5 leading-relaxed">{children}</div>
    </div>
  </div>
);

const ChatReply = () => (
  <div className="flex items-center gap-2 py-1">
    <span className="text-[11px] text-blue-500 font-medium">1 reply</span>
    <div className="flex-1 h-px bg-slate-100" />
  </div>
);

/* ─── Visual 3: Action — Slack thread showing real actions ─── */
const ActionVisual = () => (
  <div className="h-full flex flex-col bg-white">
    <ChatHeader />
    <div className="p-4 space-y-4 flex-1">
      <ChatUser name="sarah" time="3 minutes ago">
        <span className="text-red-500 font-medium">@Crab AI</span> 3 users just reported checkout failures in the support channel. Can you look into it and fix it?
      </ChatUser>
      <ChatReply />
      <ChatBot time="2 minutes ago">
        <p>Investigated the issue. Here&apos;s what I found and did:</p>
        <p className="mt-2"><strong>Root cause:</strong> Stripe webhook timeout — the <code className="text-[12px] bg-slate-100 px-1 py-0.5 rounded">/api/webhooks/stripe</code> endpoint was timing out at 10s.</p>
        <p className="mt-2"><strong>Actions taken:</strong></p>
        <p>• Increased timeout to 30s on Vercel config</p>
        <p>• Added retry logic for failed webhook events</p>
        <p>• Created Linear issue <span className="text-blue-500">ENG-1847</span> for permanent fix</p>
        <p>• Notified #engineering on Slack</p>
        <p className="mt-2"><strong>Status:</strong> Webhook processing is back to normal. All 3 failed checkouts have been retried and completed successfully.</p>
      </ChatBot>
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <div className="flex -space-x-1">
          {['linear.app', 'vercel.com', 'slack.com', 'stripe.com'].map((d) => (
            <img key={d} src={`https://${d}/favicon.ico`} alt="" className="w-4 h-4 rounded-sm border border-white" />
          ))}
        </div>
        <span className="text-[10px] text-slate-400">Used 4 tools to resolve this</span>
      </div>
    </div>
  </div>
);

/* ─── Visual 4: Memory — Slack thread showing memory in action ─── */
const MemoryVisual = () => (
  <div className="h-full flex flex-col bg-white">
    <ChatHeader />
    <div className="p-4 space-y-4 flex-1">
      <ChatUser name="peter" time="9:15 AM">
        <span className="text-red-500 font-medium">@Crab AI</span> write a blog post about our new pricing page and deploy it
      </ChatUser>
      <ChatReply />
      <ChatBot time="9:16 AM">
        <p>On it. Using what I know from previous work:</p>
        <div className="mt-2 border border-slate-100 rounded-lg p-2.5 bg-slate-50 text-[12px] text-slate-500 space-y-1">
          <p>📎 <span className="text-slate-600">Tone:</span> casual, technical, under 1200 words</p>
          <p>📎 <span className="text-slate-600">Stack:</span> Notion draft → Vercel deploy</p>
          <p>📎 <span className="text-slate-600">Last sprint:</span> you deprioritized the onboarding rewrite, so I&apos;m keeping this pricing-focused</p>
          <p>📎 <span className="text-slate-600">Style:</span> you rejected bullet-heavy format last time — using narrative paragraphs</p>
        </div>
        <p className="mt-3"><strong>Done:</strong></p>
        <p>• Draft written in Notion workspace → <span className="text-blue-500">view draft</span></p>
        <p>• Blog published to <code className="text-[12px] bg-slate-100 px-1 py-0.5 rounded">/blog/new-pricing</code></p>
        <p>• Deployed to production on Vercel → <span className="text-blue-500">preview</span></p>
        <p>• Shared to #marketing on Slack for review</p>
      </ChatBot>
      <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
        <div className="flex -space-x-1">
          {['notion.so', 'vercel.com', 'slack.com'].map((d) => (
            <img key={d} src={`https://${d}/favicon.ico`} alt="" className="w-4 h-4 rounded-sm border border-white" />
          ))}
        </div>
        <span className="text-[10px] text-slate-400">Recalled 4 preferences from past conversations</span>
      </div>
    </div>
  </div>
);

/* ─── Visual 5: Weeks-long runs — Gantt timeline ─── */
const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];
const weekDates = [
  [2, 9, 16, 23],
  [1, 8, 15, 22],
  [1, 8, 15, 22],
  [1, 8, 15, 22],
  [1, 8, 15, 22],
];
const totalCols = 20;

const ganttTasks = [
  { label: 'Research & analysis', startCol: 0, span: 4, color: '#FEE2E2' },
  { label: 'Blog series (8 posts)', startCol: 2, span: 7, color: '#FECACA' },
  { label: 'Landing page v2', startCol: 5, span: 5, color: '#FCA5A5' },
  { label: 'Email sequences', startCol: 8, span: 6, color: '#FEE2E2' },
  { label: 'Social media calendar', startCol: 3, span: 10, color: '#FECDD3' },
  { label: 'SEO audit & fixes', startCol: 11, span: 4, color: '#FECACA' },
  { label: 'A/B test creatives', startCol: 13, span: 5, color: '#FCA5A5' },
  { label: 'Analytics dashboard', startCol: 16, span: 4, color: '#FEE2E2' },
];

const CollabVisual = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full flex flex-col p-5 overflow-x-auto">
      <div className="min-w-[600px] flex-1 flex flex-col">
        {/* Week headers */}
        <div className="grid grid-cols-5 mb-0.5">
          {weeks.map((w) => (
            <div key={w} className="text-center">
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{w}</span>
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="flex border-b border-slate-200 pb-1.5 mb-0">
          {weekDates.flat().map((d, i) => (
            <div key={`wd-${i}`} className="text-center" style={{ width: `${100 / totalCols}%` }}>
              <span className="text-[9px] text-slate-400 tabular-nums">{d}</span>
            </div>
          ))}
        </div>

        {/* Grid body */}
        <div className="relative flex-1 min-h-0">
          {/* Vertical grid lines */}
          <div className="absolute inset-0 flex" aria-hidden="true">
            {Array.from({ length: totalCols }).map((_, i) => (
              <div key={i} className="h-full border-r border-slate-100/70" style={{ width: `${100 / totalCols}%` }} />
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-px bg-slate-100/70" />

          {/* Task bars */}
          <div className="relative pt-2 space-y-1.5">
            {ganttTasks.map((task, i) => (
              <div key={task.label} className="relative h-6">
                <div
                  className="absolute h-full rounded-[4px] flex items-center px-2 transition-all duration-700 ease-out"
                  style={{
                    left: `${(task.startCol / totalCols) * 100}%`,
                    width: animate ? `${(task.span / totalCols) * 100}%` : '0%',
                    backgroundColor: task.color,
                    transitionDelay: `${300 + i * 80}ms`,
                  }}
                >
                  <span className="text-[9px] font-medium text-red-900/60 whitespace-nowrap truncate">{task.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Today marker */}
          <div className="absolute top-0 bottom-0 z-10" style={{ left: `${(14 / totalCols) * 100}%` }}>
            <div className="w-px h-full bg-red-300/50" />
            <div className="absolute -top-px -left-[2.5px] w-[6px] h-[6px] rounded-full bg-red-400" />
          </div>

          {/* Message bubbles */}
          <div className="absolute z-20" style={{ bottom: '80px', left: '1%', width: 'clamp(200px, 38%, 320px)' }}>
            <div className="border border-slate-200 rounded-lg p-2.5 bg-white/90 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[10px] flex-shrink-0">🦀</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[10px] text-slate-800">Crab AI</span>
                    <span className="text-[8px] px-1 bg-slate-100 text-slate-500 rounded">APP</span>
                    <span className="text-[9px] text-slate-400">12m ago</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Marketing confirmed the blog post, but design is behind on the landing page—I&apos;ve pinged Lisa.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute z-20" style={{ bottom: '80px', right: '1%', width: 'clamp(180px, 30%, 280px)' }}>
            <div className="border border-slate-200 rounded-lg p-2.5 bg-white/90 backdrop-blur-sm shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[10px] flex-shrink-0">🦀</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[10px] text-slate-800">Crab AI</span>
                    <span className="text-[8px] px-1 bg-slate-100 text-slate-500 rounded">APP</span>
                    <span className="text-[9px] text-slate-400">1m ago</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Launch assets 80% ready. A/B variant B winning by 12%.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar stack */}
          <div className="absolute z-20 flex flex-col items-center gap-1" style={{ bottom: '16px', right: '4%' }}>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-red-50 flex items-center justify-center text-[10px] shadow-sm">🦀</div>
              {['human-sandeep', 'human-lisa', 'human-marco'].map((id) => (
                <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <span className="text-[9px] text-slate-400">Crab is like one of us now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Visual 6: OpenClaw Runtime ─── */
const OpenClawVisual = () => (
  <div className="relative h-full flex flex-col justify-center p-6 sm:p-8 overflow-hidden">
    <FlowLine className="inset-0 opacity-40" />
    <div className="relative z-10 space-y-6">
      <div className="border border-dashed border-slate-300 rounded-xl overflow-hidden bg-white/60 backdrop-blur-sm">
        <div className="bg-slate-950 p-5 font-mono text-[12px] leading-relaxed">
          <p className="text-slate-500">$ openclaw deploy --org acme-corp</p>
          <p className="text-slate-600 mt-2">→ Provisioning private server...</p>
          <p className="text-slate-600">→ Mounting encrypted volume...</p>
          <p className="text-slate-600">→ Loading 4 AI employees...</p>
          <p className="text-emerald-400 mt-2">✓ Runtime ready</p>
          <p className="text-slate-500">  https://acme.openclaw.run</p>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <DashedLabel icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>} text="Data siloed per org" />
          <DashedLabel icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>} text="Private server" />
          <DashedLabel icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"/><path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"/><path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"/></svg>} text="Full API access" />
        </div>
        <div className="text-right">
          <p className="text-6xl sm:text-7xl font-bold text-slate-200 leading-none tracking-tighter">99.9%</p>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400 mt-1">Uptime SLA</p>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Card visuals ─── */
const cardVisuals = [
  <OrgVisual key="org" />,
  <IntegrationsVisual key="int" />,
  <ActionVisual key="act" />,
  <MemoryVisual key="mem" />,
  <CollabVisual key="col" />,
  <OpenClawVisual key="oc" />,
];

/* ─── Main ─── */
export default function OldWays() {
  const [cardTransforms, setCardTransforms] = useState<Array<{ scale: number; opacity: number; y: number }>>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    { tag: "AI ORGANIZATIONS", title: "AI organizations, not", highlight: "single-purpose agents.", description: "Crabs HQ lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate." },
    { tag: "SKILLS & INTEGRATIONS", title: "AI employees with real", highlight: "skills and system access.", description: "AI employees can be connected to skills like GitHub, Gmail, Apple Notes, databases, APIs, and internal tools through OpenClaw. They don't just think — they operate inside your actual systems." },
    { tag: "ACTION, NOT ANSWERS", title: "AI that takes", highlight: "action, not just questions.", description: "Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish." },
    { tag: "INFINITE MEMORY", title: "Persistent memory across", highlight: "tasks, projects, and time.", description: "AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time." },
    { tag: "WEEKS-LONG RUNS", title: "Runs for weeks without", highlight: "losing context.", description: "AI employees don't forget after a session ends. They maintain full context across weeks-long projects, coordinating deadlines, tracking progress, and keeping your team aligned from start to finish." },
    { tag: "OPENCLAW RUNTIME", title: "Powered by OpenClaw", highlight: "private server for each org.", description: "Crabs HQ deploys OpenClaw backend on a private server, keeping your company data siloed and safe. Also giving you full untampered access to OpenClaw with a beautiful UI." },
  ];

  useEffect(() => {
    const calculateTransforms = () => {
      const stickyTop = window.innerHeight * 0.15;
      const transforms: { scale: number; opacity: number; y: number }[] = [];
      let activeCardIndex = 0;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (card.getBoundingClientRect().top <= stickyTop + 10) activeCardIndex = index;
      });
      cardRefs.current.forEach((card, index) => {
        if (!card) { transforms.push({ scale: 1, opacity: 1, y: 0 }); return; }
        const cardsOnTop = Math.max(0, activeCardIndex - index);
        if (cardsOnTop > 0) {
          transforms.push({ scale: Math.max(0.7, 1 - 0.06 * cardsOnTop), opacity: Math.max(0, 1 - 0.25 * cardsOnTop), y: -20 * cardsOnTop });
        } else {
          transforms.push({ scale: 1, opacity: 1, y: 0 });
        }
      });
      setCardTransforms(transforms);
    };
    calculateTransforms();
    let rafId: number | undefined;
    const handleScroll = () => { if (rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(calculateTransforms); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateTransforms);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', calculateTransforms); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  return (
    <section className="bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="relative" style={{ perspective: '1000px' }}>
          {cards.map((card, index) => {
            const t = cardTransforms[index] || { scale: 1, opacity: 1, y: 0 };
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="lg:sticky mb-6 lg:mb-8"
                style={{ top: 'calc(15vh)', zIndex: cards.length + index, marginBottom: index === cards.length - 1 ? '0' : undefined }}
              >
                <div
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-[filter] duration-200"
                  style={{
                    transform: `scale(${t.scale}) translateY(${t.y}px)`,
                    opacity: t.opacity,
                    transformOrigin: 'center top',
                    filter: t.scale < 1 ? `blur(${(1 - t.scale) * 15}px)` : 'none',
                    boxShadow: t.scale < 1 ? `0 25px 50px -12px rgba(0,0,0,${0.06 + (1 - t.scale) * 0.1})` : '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.03)',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  <div className="grid md:flex items-stretch">
                    <div className={`${sectionXPadding} py-8 sm:py-10 lg:py-12 md:w-[38%] w-full flex flex-col justify-center`}>
                      <p className="text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-red-600">{card.tag}</p>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 mt-3 sm:mt-4 leading-snug">
                        {card.title}{' '}<span className="font-normal text-slate-400">{card.highlight}</span>
                      </h3>
                      <p className="text-sm text-slate-500 mt-4 leading-relaxed">{card.description}</p>
                    </div>
                    <div className="w-full md:w-[62%] bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 h-[520px] overflow-y-auto">
                      {cardVisuals[index]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}