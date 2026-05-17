'use client';

import { useEffect, useRef, useState } from "react";
import { Terminal, Globe } from "lucide-react";

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

/* ─── Trooper pixel character (replaces 🦀 in avatars) ─── */
const TrooperChar = ({ className = "" }: { className?: string }) => (
  <img
    src="/images/trooper-character.png"
    alt="Trooper"
    className={`w-full h-full object-contain [image-rendering:pixelated] ${className}`}
  />
);

/* ─── Favicon helper ─── */
const Fav = ({ domain, size = 28 }: { domain: string; size?: number }) => (
  <div className="border border-dashed border-slate-300 rounded-sm p-2.5 flex items-center justify-center bg-white">
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

/* ─── Small inline favicon chip for provider labels and badges ─── */
const PROVIDER_DOMAINS: Record<string, string> = {
  Claude: 'claude.ai',
  CLAUDE: 'claude.ai',
  Cursor: 'cursor.com',
  CURSOR: 'cursor.com',
  Codex: 'openai.com',
  CODEX: 'openai.com',
  OpenClaw: 'openclaw.ai',
  OPENCLAW: 'openclaw.ai',
};

/* ─── Inline OpenClaw favicon with Trooper-character fallback ─── */
const OpenClawFavicon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <img
    src="https://openclaw.ai/favicon.ico"
    alt="OpenClaw"
    style={{ width: size, height: size }}
    className={`inline-block rounded-sm flex-shrink-0 ${className}`}
    loading="lazy"
    onError={(e) => {
      const t = e.target as HTMLImageElement;
      t.src = '/images/trooper-character.png';
      t.style.imageRendering = 'pixelated';
      t.classList.remove('rounded-sm');
    }}
  />
);

const FaviconChip = ({ provider, size = 14 }: { provider: string; size?: number }) => {
  if (provider === 'OpenClaw' || provider === 'OPENCLAW') {
    return <OpenClawFavicon size={size} />;
  }
  if (provider === 'BASH') {
    return <Terminal size={size} strokeWidth={1.75} className="inline-block text-slate-500 flex-shrink-0" />;
  }
  if (provider === 'HTTP') {
    return <Globe size={size} strokeWidth={1.75} className="inline-block text-slate-500 flex-shrink-0" />;
  }
  const domain = PROVIDER_DOMAINS[provider];
  if (!domain) return null;
  return (
    <img
      src={`https://${domain}/favicon.ico`}
      alt={provider}
      style={{ width: size, height: size }}
      className="inline-block rounded-sm flex-shrink-0"
      loading="lazy"
      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
    />
  );
};

/* ─── Dashed label tag ─── */
const DashedLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="inline-flex items-center gap-2 border border-dashed border-slate-300 rounded-sm px-3 py-1.5 bg-white">
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

/* ─── Visual 1: AI Org — Org chart with Trooper ─── */
const OrgVisual = () => (
  <div className="flex flex-col items-center justify-center h-full p-5">
    {/* CEO / Founder */}
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-emerald-50 flex items-center justify-center -mb-4 relative z-10 p-1.5">
        <TrooperChar />
      </div>
      <div className="bg-white rounded-sm border border-slate-200 px-6 py-4 text-center min-w-[180px]">
        <p className="font-semibold text-[14px] text-slate-900 mt-1">Trooper Prime</p>
        <p className="text-[12px] text-slate-400">CEO, Founder</p>
      </div>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] bg-slate-900 text-white rounded-sm px-2.5 py-1">
        +44 reports
      </span>
    </div>

    {/* Connector lines */}
    <div className="relative w-full max-w-[420px] h-6">
      <div className="absolute left-1/2 top-0 w-px h-2 bg-slate-300 -translate-x-1/2" />
      <div className="absolute top-2 left-[25%] right-[25%] h-px bg-slate-300" />
      <div className="absolute top-2 left-[25%] w-px h-4 bg-slate-300" />
      <div className="absolute top-2 right-[25%] w-px h-4 bg-slate-300" />
    </div>

    {/* Managers row */}
    <div className="flex gap-6 sm:gap-10">
      {[
        { name: 'Research Trooper', role: 'Head of Research', count: 24 },
        { name: 'Dev Trooper', role: 'Head of Engineering', count: 18 },
      ].map((mgr, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-slate-100 flex items-center justify-center -mb-3 relative z-10 p-1">
            <TrooperChar />
          </div>
          <div className="bg-white rounded-sm border border-slate-200 px-5 py-3 text-center min-w-[150px]">
            <p className="font-semibold text-[13px] text-slate-900 mt-0.5">{mgr.name}</p>
            <p className="text-[11px] text-slate-400">{mgr.role}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-2 bg-white border border-slate-200 rounded-sm px-2.5 py-1">
            <span className="text-[11px] font-semibold text-slate-700">{mgr.count}</span>
            <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          </div>
        </div>
      ))}
    </div>

    <p className="mt-5 text-center text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">2 leaders · 44 reports</p>
  </div>
);

/* ─── Visual 2: Integrations — favicon grid + live row ─── */
const IntegrationsVisual = () => {
  const row1 = ['salesforce.com', 'google.com', 'linear.app', 'trello.com', 'slack.com', 'figma.com'];
  const row2 = ['notion.so', 'atlassian.com', 'dropbox.com', 'asana.com', 'gmail.com', 'github.com'];

  return (
    <div className="flex flex-col justify-center h-full p-5 sm:p-6">
      <div className="border border-dashed border-slate-300 rounded-sm p-4 bg-white/60">
        <div className="grid grid-cols-6 gap-2 mb-2">
          {row1.map((d) => <Fav key={d} domain={d} />)}
        </div>
        <div className="grid grid-cols-6 gap-2">
          {row2.map((d) => <Fav key={d} domain={d} />)}
        </div>
        <p className="text-center text-[12px] text-slate-400 font-mono mt-4 tracking-wide">Over 3000 integrations</p>
      </div>

      <div className="mt-4 flex items-center gap-2.5 flex-wrap">
        <span className="font-mono text-xl font-bold text-slate-400 leading-none tabular-nums">3k</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-emerald-50 border border-emerald-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-700">Live</span>
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
          Integrations via browser and native APIs
        </span>
      </div>
    </div>
  );
};

/* ─── Visual 3: Action — single resolved-incident card ─── */
const ActionVisual = () => (
  <div className="flex flex-col h-full p-5 sm:p-6">
    <div className="flex items-center gap-3 mb-3">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Incident Resolved
      </span>
      <span className="font-mono text-[11px] text-slate-400">2 min ago</span>
    </div>

    <h4 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug mb-5">
      Stripe webhook timeout &mdash; resolved
    </h4>

    <div className="flex-1 grid grid-cols-2 border border-slate-200 rounded-sm bg-white overflow-hidden">
      <div className="p-4 border-r border-slate-200">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Root cause</p>
        <p className="text-[13px] text-slate-700 leading-relaxed">
          <code className="font-mono text-[11px] bg-slate-100 px-1 py-0.5 rounded-sm">/api/webhooks/stripe</code> timed out at 10s during a marketing burst.
        </p>
        <p className="text-[13px] text-slate-500 leading-relaxed mt-2">
          3 failed checkouts. Webhook retries exhausted.
        </p>
      </div>
      <div className="p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Fix applied</p>
        <ul className="space-y-1.5 text-[13px] text-slate-700 leading-relaxed">
          <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">•</span><span>Increased timeout <span className="font-mono text-[11px] text-slate-500">10s → 30s</span></span></li>
          <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">•</span><span>Added retry queue for failed events</span></li>
          <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">•</span><span>Filed <span className="font-mono text-[12px] text-blue-600">ENG-1847</span></span></li>
          <li className="flex gap-2"><span className="text-emerald-500 flex-shrink-0">•</span><span>Posted to <span className="text-blue-600">#engineering</span></span></li>
        </ul>
      </div>
    </div>

    <div className="mt-4 flex items-center gap-3">
      <div className="flex -space-x-1.5">
        {['linear.app', 'vercel.com', 'slack.com', 'stripe.com'].map((d) => (
          <div key={d} className="w-6 h-6 rounded-sm border border-slate-200 bg-white flex items-center justify-center">
            <img src={`https://${d}/favicon.ico`} alt="" className="w-3.5 h-3.5" />
          </div>
        ))}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Used 4 tools to resolve</span>
    </div>
  </div>
);

/* ─── Visual 4: Memory — focused "what I recalled" card ─── */
const MemoryVisual = () => {
  const chips = [
    { label: 'Tone', value: 'casual, technical, under 1200 words' },
    { label: 'Stack', value: 'Notion draft → Vercel deploy' },
    { label: 'Style', value: 'narrative paragraphs, not bullet lists' },
    { label: 'Last sprint', value: 'deprioritized onboarding rewrite' },
  ];

  return (
    <div className="flex flex-col h-full p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-1 rounded-sm bg-slate-100 text-slate-600 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-sm bg-slate-400" />
          Recalled from memory
        </span>
        <span className="font-mono text-[11px] text-slate-400">9:16 AM</span>
      </div>

      <h4 className="font-semibold text-base sm:text-lg text-slate-900 leading-snug mb-5">
        Drafted the blog post your way.
      </h4>

      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {chips.map((c) => (
          <div key={c.label} className="border border-slate-200 rounded-sm bg-white p-3.5 flex flex-col">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-1.5">{c.label}</span>
            <span className="text-[13px] text-slate-700 leading-relaxed">{c.value}</span>
          </div>
        ))}
      </div>

      <p className="text-[13px] text-slate-600 italic leading-relaxed mt-5">
        Used these 4 preferences to draft and ship the post in 3 minutes.
      </p>

      <div className="mt-3 pt-3 border-t border-slate-100">
        <span className="font-mono text-[11px] text-slate-400">Across 47 past conversations</span>
      </div>
    </div>
  );
};

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
  { label: 'Research & analysis', startCol: 0, span: 4, color: '#d1fae5' },
  { label: 'Blog series (8 posts)', startCol: 2, span: 7, color: '#a7f3d0' },
  { label: 'Landing page v2', startCol: 5, span: 5, color: '#6ee7b7' },
  { label: 'Email sequences', startCol: 8, span: 6, color: '#d1fae5' },
  { label: 'Social media calendar', startCol: 3, span: 10, color: '#a7f3d0' },
  { label: 'SEO audit & fixes', startCol: 11, span: 4, color: '#a7f3d0' },
  { label: 'A/B test creatives', startCol: 13, span: 5, color: '#6ee7b7' },
  { label: 'Analytics dashboard', startCol: 16, span: 4, color: '#d1fae5' },
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
    <div ref={ref} className="min-h-[460px] h-full flex flex-col p-5 overflow-x-auto">
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
                  <span className="text-[9px] font-medium text-emerald-900/70 whitespace-nowrap truncate">{task.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Today marker */}
          <div className="absolute top-0 bottom-0 z-10" style={{ left: `${(14 / totalCols) * 100}%` }}>
            <div className="w-px h-full bg-emerald-400/60" />
            <div className="absolute -top-px -left-[2.5px] w-[6px] h-[6px] rounded-full bg-emerald-500" />
          </div>

          {/* Message bubbles */}
          <div className="absolute z-20" style={{ bottom: '80px', left: '1%', width: 'clamp(200px, 38%, 320px)' }}>
            <div className="border border-slate-200 rounded-sm p-2.5 bg-white/90 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 p-0.5 overflow-hidden">
                  <TrooperChar />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[10px] text-slate-800">Trooper AI</span>
                    <span className="text-[8px] px-1 bg-slate-100 text-slate-500 rounded">APP</span>
                    <span className="text-[9px] text-slate-400">12m ago</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">Marketing confirmed the blog post, but design is behind on the landing page—I&apos;ve pinged Lisa.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute z-20" style={{ bottom: '80px', right: '1%', width: 'clamp(180px, 30%, 280px)' }}>
            <div className="border border-slate-200 rounded-sm p-2.5 bg-white/90 backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 p-0.5 overflow-hidden">
                  <TrooperChar />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[10px] text-slate-800">Trooper AI</span>
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
              <div className="w-7 h-7 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center overflow-hidden p-1">
                <TrooperChar />
              </div>
              {['human-sandeep', 'human-lisa', 'human-marco'].map((id) => (
                <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} alt="" className="w-7 h-7 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="text-[9px] text-slate-400">Trooper is like one of us now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Visual 6: OpenClaw Runtime ─── */
const OpenClawVisual = () => (
  <div className="relative flex flex-col h-full justify-between p-6 sm:p-8 overflow-hidden">
    <FlowLine className="inset-0 opacity-40" />
    <div className="relative z-10 space-y-6">
      <div className="border border-dashed border-slate-300 rounded-sm overflow-hidden bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-1.5">
            <OpenClawFavicon size={11} />
            openclaw — bash
          </span>
        </div>
        <div className="bg-slate-950 py-4 font-mono text-[12px] leading-[1.7]">
          {[
            { ln: 1, content: <><span className="text-emerald-500 select-none">$</span> <span className="text-slate-200">openclaw deploy </span><span className="text-amber-400">--org</span><span className="text-slate-200"> acme-corp</span></> },
            { ln: 2 },
            { ln: 3, content: <span className="text-slate-400">→ Provisioning private server...</span> },
            { ln: 4, content: <span className="text-slate-400">→ Mounting encrypted volume...</span> },
            { ln: 5, content: <span className="text-slate-400">→ Loading 4 AI employees...</span> },
            { ln: 6 },
            { ln: 7, content: <span className="text-emerald-400 font-semibold">✓ Runtime ready</span>, highlight: true },
            { ln: 8, content: <span className="text-slate-500">  https://acme.openclaw.run</span> },
          ].map((row) => (
            <div
              key={row.ln}
              className={`flex items-baseline ${row.highlight ? 'bg-emerald-500/10 border-l-2 border-emerald-500' : 'border-l-2 border-transparent'}`}
            >
              <span className="text-slate-700 select-none tabular-nums w-10 text-right pr-3 flex-shrink-0">
                {row.ln}
              </span>
              <span className="min-h-[1.4em]">{row.content || '\u00A0'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="space-y-3">
          <DashedLabel icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>} text="Data siloed per org" />
          <div className="flex items-center gap-2">
            <DashedLabel icon={<svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>} text="Private server" />
            <span className="inline-flex items-center px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm">Recommended</span>
          </div>
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

/* ─── Visual 7: Ticket System — single polished ticket with live trace ─── */
const TicketVisual = () => {
  const steps = [
    { fn: 'run_tests()', status: 'passed', running: false },
    { fn: 'deploy_to_staging()', status: 'passed', running: false },
    { fn: 'smoke_test()', status: 'passed', running: false },
    { fn: 'deploy_to_production()', status: 'running', running: true },
  ];

  return (
    <div className="flex flex-col h-full p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="font-mono text-[12px] text-slate-400 tabular-nums flex-shrink-0">#1042</span>
          <span className="font-semibold text-sm sm:text-base text-slate-900 truncate">Deploy updated pricing page</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200">In Progress</span>
          <img src="https://i.pravatar.cc/150?u=cto-agent" alt="" className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200" />
        </div>
      </div>

      {/* Metadata row */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 border border-slate-200">CTO</span>
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {['watcher-1', 'watcher-2'].map((id) => (
              <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} alt="" className="w-4 h-4 rounded-full object-cover ring-1 ring-white" />
            ))}
          </div>
          <span className="text-[11px] text-slate-400">+ 2 more watchers</span>
        </div>
        <span className="font-mono text-[11px] text-slate-400 ml-auto">Updated 1m ago</span>
      </div>

      {/* Focal point: vertical trace timeline */}
      <div className="border border-slate-200 rounded-sm bg-white flex-1 flex flex-col">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Live trace</span>
          <span className="font-mono text-[10px] text-slate-400 tabular-nums">{steps.length} steps</span>
        </div>
        <div className="relative px-4 py-3 flex-1">
          {/* Connecting line behind dots */}
          <div className="absolute left-[24px] top-5 bottom-5 w-px bg-slate-200" aria-hidden="true" />
          {steps.map((t, idx) => (
            <div key={t.fn} className={`relative flex items-center justify-between py-2.5 ${idx < steps.length - 1 ? 'border-b border-slate-100' : ''}`}>
              <div className="flex items-center gap-3 relative z-10">
                {t.running ? (
                  <span className="relative flex items-center justify-center w-2.5 h-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 ring-[3px] ring-white" />
                  </span>
                ) : (
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-[3px] ring-white" />
                )}
                <span className="font-mono text-[12px] text-slate-700">{t.fn}</span>
              </div>
              <span className={`font-mono text-[10px] uppercase tracking-[0.16em] ${t.running ? 'text-amber-600' : 'text-emerald-600'}`}>{t.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit log strip */}
      <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-200">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">Audit log</span>
        <a className="font-mono text-[11px] text-emerald-600 hover:underline cursor-pointer">View 47 events →</a>
      </div>
    </div>
  );
};

/* ─── Visual 8: Goal Alignment — vertical thread of cards on a slate line ─── */
const GoalVisual = () => {
  const levels = [
    { label: 'Mission', value: 'Build the #1 AI workforce platform' },
    { label: 'Project', value: 'Ship team collaboration features' },
    { label: 'Agent goal', value: 'Implement real-time sync engine' },
    { label: 'Task', value: 'Write WebSocket handler for document updates' },
  ];

  return (
    <div className="flex flex-col justify-center h-full p-6 sm:p-8">
      <div className="relative pl-6">
        {/* 2px vertical thread line */}
        <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-slate-300" aria-hidden="true" />
        <div className="space-y-3">
          {levels.map((lv) => {
            const isTask = lv.label === 'Task';
            return (
              <div key={lv.label} className="relative">
                {/* Hairline elbow into the card */}
                <div className="absolute -left-6 top-5 w-6 h-px bg-slate-300" aria-hidden="true" />
                <div
                  className={`relative rounded-sm border p-3.5 ${
                    isTask ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                        isTask ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      {lv.label}
                    </span>
                    {isTask && (
                      <span className="font-mono text-[9px] uppercase tracking-[0.18em] px-1.5 py-0.5 rounded-sm bg-emerald-600 text-white">
                        Work happens here
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[13px] sm:text-sm mt-1 font-medium ${
                      isTask ? 'text-emerald-900' : 'text-slate-900'
                    }`}
                  >
                    {lv.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Visual 9: Bring Your Own Agent — org chart with mixed providers ─── */
const BYOAVisual = () => {
  const managers = [
    { name: 'CMO', provider: 'OpenClaw', active: true },
    { name: 'CTO', provider: 'Cursor', active: false },
    { name: 'COO', provider: 'Claude', active: false },
  ];
  const engineers = [
    { name: 'CodexCoder', role: 'Engineer', provider: 'Codex' },
    { name: 'ClaudeCoder', role: 'Engineer', provider: 'Claude' },
  ];

  return (
    <div className="flex flex-col p-6 sm:p-8 h-full">
      <div className="flex flex-col items-center pt-6 sm:pt-8">
        {/* CEO */}
        <div className="bg-white rounded-sm border border-slate-200 px-5 py-3.5 text-center">
          <p className="font-semibold text-[13px] text-slate-900">CEO</p>
          <div className="flex items-center justify-center gap-1.5 mt-1">
            <FaviconChip provider="Claude" size={12} />
            <span className="text-[11px] text-slate-400">Claude</span>
          </div>
        </div>

        {/* Connector CEO → Managers */}
        <div className="relative w-full max-w-[400px] h-8">
          <div className="absolute left-1/2 top-0 w-px h-3 bg-slate-300 -translate-x-1/2" />
          <div className="absolute top-3 left-[16%] right-[16%] h-px bg-slate-300" />
          <div className="absolute top-3 left-[16%] w-px h-5 bg-slate-300" />
          <div className="absolute top-3 left-1/2 w-px h-5 bg-slate-300 -translate-x-1/2" />
          <div className="absolute top-3 right-[16%] w-px h-5 bg-slate-300" />
        </div>

        {/* Managers */}
        <div className="flex gap-3 sm:gap-5">
          {managers.map((m, i) => (
            <div
              key={i}
              className={`relative rounded-sm border px-5 py-3.5 text-center ${
                m.active ? 'border-slate-200 bg-white border-t-2 border-t-emerald-500' : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <p className="font-semibold text-[12px] text-slate-900">{m.name}</p>
                {m.active && (
                  <span className="inline-flex items-center px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-sm">Recommended</span>
                )}
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <FaviconChip provider={m.provider} size={12} />
                <span className="text-[10px] text-slate-400">{m.provider}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTO sub-tree connector (extra breathing room before engineers) */}
        <div className="relative w-full max-w-[200px] h-10">
          <div className="absolute left-1/2 top-0 w-px h-4 bg-slate-300 -translate-x-1/2" />
          <div className="absolute top-4 left-[25%] right-[25%] h-px bg-slate-300" />
          <div className="absolute top-4 left-[25%] w-px h-6 bg-slate-300" />
          <div className="absolute top-4 right-[25%] w-px h-6 bg-slate-300" />
        </div>

        {/* Engineers */}
        <div className="flex gap-3">
          {engineers.map((e, i) => (
            <div key={i} className="rounded-sm border border-slate-200 bg-white px-5 py-3.5 text-center">
              <div className="flex items-center justify-center mb-1">
                <FaviconChip provider={e.provider} size={14} />
              </div>
              <p className="font-semibold text-[11px] text-slate-900">{e.name}</p>
              <p className="text-[10px] text-slate-400">{e.role}</p>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <FaviconChip provider={e.provider} size={12} />
                <span className="text-[10px] text-slate-400">{e.provider}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Runtime agents — anchored to bottom of card */}
      <div className="mt-auto pt-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 mb-2">Runtime agents</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {['OPENCLAW', 'CLAUDE', 'CODEX', 'CURSOR', 'BASH', 'HTTP'].map((a) => (
            <div key={a} className="border border-slate-200 px-3 py-2 rounded-sm bg-white flex items-center justify-center gap-1.5">
              <FaviconChip provider={a} size={12} />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-slate-700">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Pixel-art bleed wrapper that frames each visual as a clean white card on a pixel scene ─── */
const PixelFramedVisual = ({ children }: { children: React.ReactNode }) => (
  <div
    className="p-8 sm:p-12 lg:p-14 relative h-full flex flex-col"
    style={{
      backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.55), rgba(248, 250, 252, 0.55)), url('/images/feature-bg-pixel.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      imageRendering: 'pixelated',
    }}
  >
    <div className="border border-slate-200 bg-white overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.04)] flex-1 flex flex-col">
      {children}
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
  <TicketVisual key="ticket" />,
  <GoalVisual key="goal" />,
  <BYOAVisual key="byoa" />,
];

/* ─── Main ─── */
export default function OldWays() {
  const [cardTransforms, setCardTransforms] = useState<Array<{ scale: number; opacity: number; y: number }>>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cards = [
    { tag: "AI ORGANIZATIONS", title: "AI organizations, not", highlight: "single-purpose agents.", description: "Trooper lets you create AI organizations made up of multiple AI employees. Each organization works together on tasks, shares context, and coordinates execution — similar to how real teams operate." },
    { tag: "SKILLS & INTEGRATIONS", title: "AI employees with real", highlight: "skills and system access.", description: "AI employees can be connected to skills like GitHub, Gmail, Apple Notes, databases, APIs, and internal tools through OpenClaw. They don't just think — they operate inside your actual systems." },
    { tag: "ACTION, NOT ANSWERS", title: "AI that takes", highlight: "action, not just questions.", description: "Instead of replying with suggestions, AI employees create issues, update files, send emails, take screenshots, post updates, and complete real tasks from start to finish." },
    { tag: "INFINITE MEMORY", title: "Persistent memory across", highlight: "tasks, projects, and time.", description: "AI employees remember past work, decisions, preferences, and project context. Every task builds on previous knowledge, so work gets faster and more accurate over time." },
    { tag: "WEEKS-LONG RUNS", title: "Runs for weeks without", highlight: "losing context.", description: "AI employees don't forget after a session ends. They maintain full context across weeks-long projects, coordinating deadlines, tracking progress, and keeping your team aligned from start to finish." },
    { tag: "OPENCLAW RUNTIME", title: "Powered by OpenClaw", highlight: "private server for each org.", description: "Trooper deploys OpenClaw backend on a private server, keeping your company data siloed and safe. Also giving you full untampered access to OpenClaw with a beautiful UI." },
    { tag: "TICKET SYSTEM", title: "Every conversation traced.", highlight: "Every decision explained.", description: "You communicate with agents through tickets. Every instruction, every response, every tool call and decision is recorded with full tracing. Nothing happens in the dark." },
    { tag: "GOAL ALIGNMENT", title: "Keep your agents aligned", highlight: "on the goal.", description: "Every piece of work is given context that traces back to the company mission. Your agents will know what to do and why. Goals cascade from company → project → agent → task." },
    { tag: "BRING YOUR OWN AGENT", title: "Bring your own bot.", highlight: "", description: "Your OpenClaw, Claude, Cursor, and Codex — organized under one org structure, pointed at one goal. If it can receive a heartbeat, it's hired." },
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
                  className="relative bg-white border border-slate-200 overflow-hidden transition-[filter] duration-200 min-h-[520px] flex flex-col"
                  style={{
                    transform: `scale(${t.scale}) translateY(${t.y}px)`,
                    opacity: t.opacity,
                    transformOrigin: 'center top',
                    filter: t.scale < 1 ? `blur(${(1 - t.scale) * 15}px)` : 'none',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  {index === 8 && (
                    <span className="absolute top-4 right-4 z-20 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-sm">
                      FLAGSHIP
                    </span>
                  )}
                  <div className="grid md:flex items-stretch flex-1">
                    <div className={`${sectionXPadding} pt-8 sm:pt-10 pb-8 sm:pb-10 lg:pb-12 md:w-[38%] w-full flex flex-col`}>
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                        <span className="text-slate-400">[{String(index + 1).padStart(2, '0')}]</span>&nbsp;{card.tag}
                      </p>
                      <h3 className="font-funneldisplay text-xl sm:text-2xl lg:text-3xl tracking-tight text-slate-900 mt-3 sm:mt-4 leading-snug">
                        {card.title}{' '}<span className="font-normal text-slate-400">{card.highlight}</span>
                      </h3>
                      <p className="text-sm text-slate-500 mt-4 leading-relaxed">{card.description}</p>
                      <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                        Learn more →
                      </p>
                    </div>
                    <div className="w-full md:w-[62%] border-t md:border-t-0 md:border-l border-slate-200 flex flex-col">
                      <PixelFramedVisual>
                        {cardVisuals[index]}
                      </PixelFramedVisual>
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