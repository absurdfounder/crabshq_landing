'use client';

import { useEffect, useRef, useState } from "react";
import { Terminal, Globe, FileText, FileEdit, Search, Check, Loader2, GitCommit, Wrench } from "lucide-react";
import { getFaviconUrl } from "@/lib/favicon";
import { TROOPER_DEMO as T } from './demoTheme';
import { PixelMissionTag } from './PixelAtmosphere';

const sectionXPadding = "px-4 sm:px-6 lg:px-8";

/** Gantt + accent palette — warm forest/olive from logo, not Tailwind emerald */
const GANTT = {
  light: '#f0f5e6',
  mid: '#ddebc8',
  strong: '#c4d9a0',
  active: '#9db866',
  forest: T.brand,
  olive: T.olive,
} as const;

/* ─── Trooper pixel character (replaces 🦀 in avatars) ─── */
const TrooperChar = ({ className = "" }: { className?: string }) => (
  <img
    src="/images/trooper-logomark.png"
    alt="Trooper"
    className={`w-full h-full object-contain bg-transparent pixel-render pixel-flicker-slow ${className}`}
  />
);

/* ─── Favicon helper ─── */
const FaviconImg = ({
  domain,
  size,
  alt,
  className = '',
  fallbackSrc,
}: {
  domain: string;
  size: number;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
}) => {
  const [failed, setFailed] = useState(false);
  const label = (alt || domain.split('.')[0] || '?').slice(0, 2).toUpperCase();

  if (failed && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || domain}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  if (failed) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-sm bg-stone-100 text-stone-500 font-bold flex-shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: Math.max(8, size * 0.38) }}
        aria-hidden
      >
        {label}
      </span>
    );
  }

  return (
    <img
      src={getFaviconUrl(domain, Math.max(32, size * 2))}
      alt={alt || domain}
      width={size}
      height={size}
      className={`rounded-sm flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

const Fav = ({ domain, size = 28 }: { domain: string; size?: number }) => (
  <div className="border border-dashed border-slate-300 rounded-sm p-1.5 sm:p-2.5 flex items-center justify-center bg-white min-h-[34px] min-w-[34px] sm:min-h-[44px] sm:min-w-[44px]">
    <FaviconImg domain={domain} size={size} alt={domain.split('.')[0]} />
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
  OpenAI: 'openai.com',
  OPENAI: 'openai.com',
  OpenCode: 'opencode.ai',
  OPENCODE: 'opencode.ai',
  Gemini: 'gemini.google.com',
  GEMINI: 'gemini.google.com',
  Llama: 'llama.com',
  LLAMA: 'llama.com',
  Mistral: 'mistral.ai',
  MISTRAL: 'mistral.ai',
  DeepSeek: 'deepseek.com',
  DEEPSEEK: 'deepseek.com',
  Aider: 'aider.chat',
  AIDER: 'aider.chat',
  Cline: 'cline.bot',
  CLINE: 'cline.bot',
  Continue: 'continue.dev',
  CONTINUE: 'continue.dev',
  Codeium: 'codeium.com',
  CODEIUM: 'codeium.com',
  Windsurf: 'windsurf.com',
  WINDSURF: 'windsurf.com',
  v0: 'v0.dev',
  V0: 'v0.dev',
  Bolt: 'bolt.new',
  BOLT: 'bolt.new',
  Replit: 'replit.com',
  REPLIT: 'replit.com',
  Perplexity: 'perplexity.ai',
  PERPLEXITY: 'perplexity.ai',
  Grok: 'x.ai',
  GROK: 'x.ai',
  Trooper: 'trooper.so',
  TROOPER: 'trooper.so',
};

/* ─── Inline OpenClaw favicon with Trooper-character fallback ─── */
const OpenClawFavicon = ({ size = 14, className = "" }: { size?: number; className?: string }) => (
  <FaviconImg
    domain="openclaw.ai"
    size={size}
    alt="OpenClaw"
    className={`inline-block ${className}`}
    fallbackSrc="/images/trooper-logomark.png"
  />
);

const FaviconChip = ({ provider, size = 14 }: { provider: string; size?: number }) => {
  if (provider === 'OpenClaw' || provider === 'OPENCLAW') {
    return <OpenClawFavicon size={size} />;
  }
  if (provider === 'Trooper' || provider === 'TROOPER') {
    return (
      <img
        src="/images/trooper-logomark.png"
        alt="Trooper"
        width={size}
        height={size}
        className="inline-block flex-shrink-0"
        style={{ width: size, height: size, objectFit: 'contain', imageRendering: 'pixelated' }}
      />
    );
  }
  if (provider === 'BASH') {
    return <Terminal size={size} strokeWidth={1.75} className="inline-block text-slate-500 flex-shrink-0" />;
  }
  if (provider === 'HTTP') {
    return <Globe size={size} strokeWidth={1.75} className="inline-block text-slate-500 flex-shrink-0" />;
  }
  const domain = PROVIDER_DOMAINS[provider];
  if (!domain) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-sm bg-stone-100 text-stone-500 font-bold flex-shrink-0"
        style={{ width: size, height: size, fontSize: Math.max(7, size * 0.38) }}
      >
        {provider.slice(0, 2).toUpperCase()}
      </span>
    );
  }
  return (
    <FaviconImg
      domain={domain}
      size={size}
      alt={provider}
      className="inline-block"
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
  <div className="flex flex-col items-center justify-center h-full p-3 sm:p-5">
    {/* CEO / Founder */}
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-full border-2 border-white overflow-hidden bg-transparent flex items-center justify-center -mb-4 relative z-10 p-1.5">
        <TrooperChar />
      </div>
      <div className="bg-white rounded-sm border border-slate-200 px-4 sm:px-6 py-3 sm:py-4 text-center min-w-0 w-full max-w-[220px] sm:max-w-none sm:min-w-[180px]">
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
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 w-full max-w-[420px]">
      {[
        { name: 'Research Trooper', role: 'Head of Research', count: 24 },
        { name: 'Dev Trooper', role: 'Head of Engineering', count: 18 },
      ].map((mgr, i) => (
        <div key={i} className="flex flex-col items-center w-full sm:w-auto">
          <div className="w-11 h-11 rounded-full border-2 border-white overflow-hidden bg-transparent flex items-center justify-center -mb-3 relative z-10 p-1">
            <TrooperChar />
          </div>
          <div className="bg-white rounded-sm border border-slate-200 px-4 sm:px-5 py-3 text-center min-w-0 w-full max-w-[220px] sm:max-w-none sm:min-w-[150px]">
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
    <div className="flex flex-col justify-center h-full p-3 sm:p-5 md:p-6">
      <div className="border border-dashed border-slate-300 rounded-sm p-2.5 sm:p-4 bg-white/60">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
          {row1.map((d) => <Fav key={d} domain={d} size={22} />)}
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 sm:gap-2">
          {row2.map((d) => <Fav key={d} domain={d} size={22} />)}
        </div>
        <p className="text-center text-[11px] sm:text-[12px] text-slate-400 font-mono mt-3 sm:mt-4 tracking-wide">Over 3000 integrations</p>
      </div>

      <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-2.5 flex-wrap">
        <span className="font-mono text-lg sm:text-xl font-bold text-slate-400 leading-none tabular-nums">3k</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-trooper-50 border border-trooper-100">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-trooper-olive opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-trooper" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-trooper-700">Live</span>
        </span>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-slate-500 leading-snug">
          Integrations via browser and native APIs
        </span>
      </div>
    </div>
  );
};

/* ─── Cropped app vignette chrome (not a full dashboard) ─── */
const VignetteChrome = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex flex-col h-full justify-center p-3 sm:p-5 md:p-6">
    <div className="rounded-xl border border-stone-200 bg-white shadow-[0_8px_24px_-8px_rgba(28,25,23,0.12)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-3.5 py-2 border-b border-stone-100 bg-[#FDFCFB]">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone-400">{label}</span>
      </div>
      {children}
    </div>
  </div>
);

const toolIconFor = (label: string) => {
  const t = label.toLowerCase();
  if (t.includes('search')) return Search;
  if (t.includes('patch') || t.includes('write')) return FileEdit;
  if (t.includes('read') || t.includes('file')) return FileText;
  if (t.includes('git')) return GitCommit;
  if (t.includes('exec') || t.includes('run') || t.includes('deploy')) return Terminal;
  return Wrench;
};

const ToolRow = ({ label, detail, done }: { label: string; detail: string; done?: boolean }) => {
  const Icon = toolIconFor(label);
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="w-5 h-5 rounded-md border border-stone-200 bg-white flex items-center justify-center flex-shrink-0">
        <Icon size={11} strokeWidth={1.75} className="text-stone-500" />
      </div>
      <span className="text-[11px] font-semibold text-stone-800">{label}</span>
      <span className="text-[10px] font-mono text-stone-400 truncate flex-1">{detail}</span>
      {done
        ? <Check size={13} strokeWidth={2.5} className="text-trooper flex-shrink-0" />
        : <Loader2 size={13} strokeWidth={2.5} className="text-[#3f6b00] animate-spin flex-shrink-0" />}
    </div>
  );
};

/* ─── Visual 3: Action — cropped task thread with live tool runs ─── */
const ActionVisual = () => (
  <VignetteChrome label="trooper · task">
    <div className="px-4 pt-3.5 pb-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[9px] font-bold uppercase tracking-wide text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">In progress</span>
        <span className="text-[10px] text-stone-400">#product-launch</span>
      </div>
      <h4 className="text-[15px] font-semibold text-stone-900 leading-snug mb-3">SEO Optimization for Wonder</h4>

      <div className="flex gap-2.5">
        <img src="https://i.pravatar.cc/150?u=agent-ren" alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[13px] font-semibold text-stone-900">Ren</span>
            <span className="text-[10px] text-stone-400">14:57</span>
          </div>
          <p className="text-[12px] text-stone-600 leading-relaxed mb-2">
            Updating homepage meta, OG tags, and sitemap for launch day.
          </p>
          <div className="pl-0.5 space-y-0.5 border-l border-stone-100 ml-1">
            <ToolRow label="read_file" detail="/workspace/wonder/index.html" done />
            <ToolRow label="apply_patch" detail="title, description, og:image" />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-stone-100 bg-stone-50/80 px-3 py-2">
        <FileText size={14} strokeWidth={1.75} className="text-stone-400 flex-shrink-0" />
        <span className="text-[11px] font-medium text-stone-700 truncate">index.html</span>
        <span className="text-[10px] text-[#3f6b00] font-medium ml-auto flex-shrink-0">Artifact</span>
      </div>
    </div>
    <div className="px-4 py-2 border-t border-stone-100 bg-[#FAF9F6] flex items-center justify-between">
      <span className="text-[11px] font-medium text-stone-500">3/6 subtasks</span>
      <span className="text-[10px] text-stone-400">Update meta tags…</span>
    </div>
  </VignetteChrome>
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
    <div className="flex flex-col h-full p-3 sm:p-5 md:p-6 min-h-0">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
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
  { label: 'Research & analysis', startCol: 0, span: 4, color: GANTT.light },
  { label: 'Blog series (8 posts)', startCol: 2, span: 7, color: GANTT.mid },
  { label: 'Landing page v2', startCol: 5, span: 5, color: GANTT.strong },
  { label: 'Email sequences', startCol: 8, span: 6, color: GANTT.light },
  { label: 'Social media calendar', startCol: 3, span: 10, color: GANTT.mid },
  { label: 'SEO audit & fixes', startCol: 11, span: 4, color: GANTT.mid },
  { label: 'A/B test creatives', startCol: 13, span: 5, color: GANTT.active },
  { label: 'Analytics dashboard', startCol: 16, span: 4, color: GANTT.light },
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
    <div ref={ref} className="min-h-[300px] sm:min-h-[460px] h-full flex flex-col p-3 sm:p-5 overflow-hidden">
      <div className="w-full flex-1 flex flex-col min-w-0">
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
                  <span className="text-[9px] font-medium text-trooper-700/80 whitespace-nowrap truncate">{task.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Today marker */}
          <div className="absolute top-0 bottom-0 z-10" style={{ left: `${(14 / totalCols) * 100}%` }}>
            <div className="w-px h-full bg-trooper-olive/60" />
            <div className="absolute -top-px -left-[2.5px] w-[6px] h-[6px] rounded-full bg-trooper" />
          </div>

          {/* Message bubbles */}
          <div className="absolute z-20 left-0 right-0 sm:left-auto sm:right-auto" style={{ bottom: '72px', width: '100%', maxWidth: '100%' }}>
            <div className="mx-1 sm:mx-0 sm:absolute border border-slate-200 rounded-sm p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm" style={{ width: 'clamp(180px, 92%, 320px)' }}>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-transparent border border-trooper-100 flex items-center justify-center flex-shrink-0 p-0.5 overflow-hidden">
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

          {/* Avatar stack */}
          <div className="absolute z-20 flex flex-col items-center gap-1 right-1 sm:right-[4%]" style={{ bottom: '12px' }}>
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-transparent flex items-center justify-center overflow-hidden p-1">
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
  <div className="relative flex flex-col h-full justify-between p-4 sm:p-6 md:p-8 overflow-hidden min-h-0">
    <FlowLine className="inset-0 opacity-40" />
    <div className="relative z-10 space-y-6">
      <div className="border border-dashed border-slate-300 rounded-sm overflow-hidden bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-trooper/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-trooper/70" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500 flex items-center gap-1.5">
            <OpenClawFavicon size={11} />
            openclaw — bash
          </span>
        </div>
        <div className="bg-slate-950 py-4 font-mono text-[12px] leading-[1.7]">
          {[
            { ln: 1, content: <><span className="text-trooper select-none">$</span> <span className="text-slate-200">openclaw deploy </span><span className="text-amber-400">--org</span><span className="text-slate-200"> acme-corp</span></> },
            { ln: 2 },
            { ln: 3, content: <span className="text-slate-400">→ Provisioning private server...</span> },
            { ln: 4, content: <span className="text-slate-400">→ Mounting encrypted volume...</span> },
            { ln: 5, content: <span className="text-slate-400">→ Loading 4 AI employees...</span> },
            { ln: 6 },
            { ln: 7, content: <span className="text-trooper-olive font-semibold">✓ Runtime ready</span>, highlight: true },
            { ln: 8, content: <span className="text-slate-500">  https://acme.openclaw.run</span> },
          ].map((row) => (
            <div
              key={row.ln}
              className={`flex items-baseline ${row.highlight ? 'bg-trooper/10 border-l-2 border-trooper' : 'border-l-2 border-transparent'}`}
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
            <span className="inline-flex items-center px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-trooper-700 bg-trooper-50 border border-trooper-100 rounded-sm">Recommended</span>
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
    <VignetteChrome label="trooper · ticket #1042">
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="font-semibold text-[14px] text-stone-900 leading-snug">Deploy updated pricing page</h4>
          <img src="https://i.pravatar.cc/150?u=agent-leo" alt="" className="w-6 h-6 rounded-full object-cover ring-1 ring-stone-200 flex-shrink-0" />
        </div>

        <div className="rounded-lg border border-stone-100 bg-[#FAF9F6] overflow-hidden">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-stone-100">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-400">Live trace</span>
            <span className="font-mono text-[9px] text-stone-400 tabular-nums">{steps.length} steps</span>
          </div>
          <div className="relative px-3 py-2">
            <div className="absolute left-[15px] top-3 bottom-3 w-px bg-stone-200" aria-hidden="true" />
            {steps.map((t, idx) => (
              <div key={t.fn} className={`relative flex items-center justify-between py-2 ${idx < steps.length - 1 ? 'border-b border-stone-100' : ''}`}>
                <div className="flex items-center gap-2.5 relative z-10">
                  {t.running ? (
                    <span className="relative flex items-center justify-center w-2 h-2">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 ring-2 ring-white" />
                    </span>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-trooper ring-2 ring-white" />
                  )}
                  <span className="font-mono text-[11px] text-stone-700">{t.fn}</span>
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-[0.14em] ${t.running ? 'text-amber-600' : 'text-trooper'}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-stone-100 bg-[#FAF9F6] flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-stone-400">Audit log</span>
        <span className="font-mono text-[10px] text-[#3f6b00]">47 events →</span>
      </div>
    </VignetteChrome>
  );
};

/* ─── Visual 8: Goal Alignment — nested container model.
       Each goal level visually CONTAINS the next, so the task literally lives
       inside the agent goal, project, and mission. ─── */
const GoalVisual = () => (
  <div className="flex flex-col h-full p-4 sm:p-6 md:p-8 justify-center bg-white min-h-0">
    {/* L1 · Mission */}
    <div className="relative border border-slate-200 bg-white pt-8 sm:pt-9 px-5 sm:px-6 pb-5 sm:pb-6">
      <div className="absolute -top-3 left-4 sm:left-5 bg-white px-2 py-0.5 flex items-center gap-1.5">
        <div className="w-3 h-3 overflow-hidden p-0.5 bg-transparent">
          <TrooperChar />
        </div>
        <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-slate-500">
          <span className="text-slate-400">[01]</span> Mission · Trooper Inc.
        </span>
      </div>
      <p className="text-[13px] text-slate-900 font-medium leading-relaxed mb-4 sm:mb-5">
        Build the #1 AI workforce platform.
      </p>

      {/* L2 · Project */}
      <div className="relative border border-slate-200 bg-slate-50 pt-8 sm:pt-9 px-5 sm:px-6 pb-5 sm:pb-6">
        <div className="absolute -top-3 left-4 sm:left-5 bg-slate-50 px-2 py-0.5 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-slate-400" aria-hidden="true" />
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <span className="text-slate-400">[02]</span> Project · Q4 2026
          </span>
        </div>
        <p className="text-[13px] text-slate-900 font-medium leading-relaxed mb-4 sm:mb-5">
          Ship team collaboration features.
        </p>

        {/* L3 · Agent goal */}
        <div className="relative border border-slate-200 bg-white pt-8 sm:pt-9 px-5 sm:px-6 pb-5 sm:pb-6">
          <div className="absolute -top-3 left-4 sm:left-5 bg-white px-2 py-0.5 flex items-center gap-1.5">
            <FaviconChip provider="Cursor" size={11} />
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-slate-500">
              <span className="text-slate-400">[03]</span> Agent goal · CTO
            </span>
          </div>
          <p className="text-[13px] text-slate-900 font-medium leading-relaxed mb-4 sm:mb-5">
            Implement real-time sync engine.
          </p>

          {/* L4 · Task — brand spotlight */}
          <div className="relative border border-trooper bg-trooper-50 pt-8 sm:pt-9 px-5 sm:px-6 pb-5 sm:pb-6 shadow-[0_0_0_3px_rgba(63,107,0,0.08)]">
            <div className="absolute -top-3 left-4 sm:left-5 bg-trooper-50 px-2 py-0.5 flex items-center gap-1.5">
              <FaviconChip provider="Claude" size={11} />
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-trooper-700">
                <span className="text-trooper">[04]</span> Task · Work happens here
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="relative flex h-2 w-2 mt-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-trooper-olive opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-trooper" />
              </span>
              <p className="text-[13px] text-trooper-700 font-semibold leading-relaxed">
                Write WebSocket handler for document updates.
              </p>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-trooper-700/80">
                ClaudeCoder · 2m elapsed
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-trooper-700">
                <span className="tabular-nums">+127</span>
                <span className="text-trooper">·</span>
                <span className="tabular-nums">−34</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p className="mt-6 sm:mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 text-center">
      Goals contain projects · projects contain goals · goals contain tasks
    </p>
  </div>
);

/* ─── Visual 9: Bring Your Own Agent — clean roster + favicon-rich provider grid ─── */
const BYOAVisual = () => {
  const yourTeam = [
    { role: 'CEO', provider: 'Trooper', isYou: true },
    { role: 'CMO', provider: 'OpenClaw', recommended: true },
    { role: 'CTO', provider: 'Cursor' },
    { role: 'COO', provider: 'Claude' },
    { role: 'Eng', provider: 'Codex' },
    { role: 'Eng', provider: 'Claude' },
  ];

  // Grouped roughly: hosted LLMs, coding agents/CLIs, IDE assistants.
  const providers = [
    'Claude',
    'OpenAI',
    'Cursor',
    'OpenCode',
    'Gemini',
    'Codex',
    'OpenClaw',
    'DeepSeek',
    'Mistral',
    'Llama',
    'Grok',
    'Perplexity',
    'Aider',
    'Cline',
    'Continue',
    'Codeium',
    'Windsurf',
    'v0',
    'Bolt',
    'Replit',
  ];

  return (
    <div className="flex flex-col h-full p-3 sm:p-5 md:p-6 bg-white min-h-0">
      {/* Window chrome */}
      <div className="flex items-center justify-between border border-slate-200 border-b-0 px-3 py-2 bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 overflow-hidden p-0.5 bg-transparent border border-trooper-100">
            <TrooperChar />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
            trooper · agents
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-trooper-olive opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-trooper" />
          </span>
          6 agents · 5 providers
        </span>
      </div>

      {/* Your team — compact roster row */}
      <div className="border border-slate-200 bg-white">
        <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Your team
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 tabular-nums">
            6 hired
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 divide-x divide-slate-100">
          {yourTeam.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={`relative flex flex-col items-center justify-center gap-1 py-2.5 sm:py-3 px-0.5 sm:px-1 ${
                m.recommended ? 'bg-trooper-50/60' : ''
              }`}
            >
              {m.recommended && (
                <span className="absolute top-1 right-1 font-mono text-[9px] text-trooper">
                  ★
                </span>
              )}
              <div className="w-6 h-6 border border-slate-200 bg-white flex items-center justify-center">
                {m.isYou ? (
                  <div className="w-4 h-4 overflow-hidden p-0.5">
                    <TrooperChar />
                  </div>
                ) : (
                  <FaviconChip provider={m.provider} size={14} />
                )}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-700">
                {m.role}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400 truncate w-full text-center px-1">
                {m.isYou ? 'You' : m.provider}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Available providers — big favicon grid */}
      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Plug in any agent
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400 tabular-nums">
            {providers.length}+ supported
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 sm:gap-1.5 flex-1">
          {providers.map((p) => (
            <div
              key={p}
              className="border border-slate-200 bg-white flex items-center gap-1.5 px-2 py-2 min-w-0"
              title={p}
            >
              <FaviconChip provider={p} size={12} />
              <span className="font-mono text-[10px] uppercase tracking-[0.10em] text-slate-700 truncate">
                {p}
              </span>
            </div>
          ))}
          {/* + Add yours */}
          <div className="border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center gap-1.5 px-2 py-2 text-slate-500 hover:text-slate-700 transition-colors">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em]">+ Yours</span>
          </div>
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 text-center">
          If it can receive a heartbeat · it&apos;s hired
        </p>
      </div>
    </div>
  );
};

/* ─── Pixel-art framed wrapper.
       Uses the shared pixel-art scene as a subtle backdrop, softened with a
       translucent white wash so the inner card remains the focal point. ─── */
const PixelFramedVisual = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-full flex flex-col p-2 sm:p-4 lg:p-6 bg-slate-50/70 sm:bg-slate-100/80">
    <div className="relative flex-1 flex flex-col border border-slate-200 bg-white overflow-hidden shadow-sm min-h-0">
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
      const isMobile = window.innerWidth < 1024;
      const stickyTop = window.innerHeight * 0.15;
      const transforms: { scale: number; opacity: number; y: number }[] = [];

      if (isMobile) {
        setCardTransforms(cards.map(() => ({ scale: 1, opacity: 1, y: 0 })));
        return;
      }

      let activeCardIndex = 0;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        if (card.getBoundingClientRect().top <= stickyTop + 10) activeCardIndex = index;
      });
      cardRefs.current.forEach((card, index) => {
        if (!card) { transforms.push({ scale: 1, opacity: 1, y: 0 }); return; }
        const cardsOnTop = Math.max(0, activeCardIndex - index);
        if (cardsOnTop > 0) {
          transforms.push({ scale: Math.max(0.88, 1 - 0.03 * cardsOnTop), opacity: Math.max(0.35, 1 - 0.15 * cardsOnTop), y: -12 * cardsOnTop });
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
      <div className="max-w-7xl mx-auto px-0 sm:px-0 py-10 sm:py-16 md:py-24">
        <div className="mb-8 sm:mb-12 md:mb-14 max-w-2xl">
          <h2 className="font-funneldisplay text-2xl sm:text-3xl md:text-4xl tracking-tight text-slate-900 leading-snug">
            Everything your AI workforce can do.
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            Org charts, system access, traced tickets, and memory that outlasts the mission.
          </p>
        </div>
        <div className="relative" style={{ perspective: '1000px' }}>
          {cards.map((card, index) => {
            const t = cardTransforms[index] || { scale: 1, opacity: 1, y: 0 };
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="lg:sticky lg:top-[15vh] mb-4 sm:mb-6 lg:mb-8"
                style={{ zIndex: cards.length + index, marginBottom: index === cards.length - 1 ? '0' : undefined }}
              >
                <div
                  className="relative bg-white border border-slate-200 overflow-hidden transition-[filter] duration-200 min-h-0 lg:min-h-[520px] flex flex-col"
                  style={{
                    transform: `scale(${t.scale}) translateY(${t.y}px)`,
                    opacity: t.opacity,
                    transformOrigin: 'center top',
                    filter: t.scale < 1 ? `blur(${(1 - t.scale) * 6}px)` : 'none',
                    transition: 'transform 0.15s ease-out, opacity 0.15s ease-out',
                  }}
                >
                  {index === 8 && (
                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 font-mono text-[10px] uppercase tracking-[0.18em] text-trooper-700 bg-trooper-50 border border-trooper-100 px-2 py-0.5 rounded-sm">
                      Flagship
                    </span>
                  )}
                  <div className="grid md:flex items-stretch flex-1 min-h-0">
                    <div className={`${sectionXPadding} box-border pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8 md:pb-10 lg:pb-12 md:w-[38%] w-full flex flex-col`}>
                      <PixelMissionTag
                        index={String(index + 1).padStart(2, '0')}
                        label={card.tag}
                      />
                      <h3 className="font-funneldisplay text-lg sm:text-2xl lg:text-3xl tracking-tight text-slate-900 mt-3 sm:mt-4 leading-snug">
                        {card.title}{' '}<span className="font-normal text-slate-400">{card.highlight}</span>
                      </h3>
                      <p className="text-sm text-slate-500 mt-3 sm:mt-4 leading-relaxed">{card.description}</p>
                    </div>
                    <div className="box-border w-full md:w-[62%] border-t md:border-t-0 md:border-l border-slate-200 flex flex-col min-h-0">
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
