'use client';

import { useEffect, useRef, useState } from "react";
import { Terminal, Globe, FileText, Check, Loader2, Sparkles, Braces, Database, Box, MessageSquare, ArrowRight } from "lucide-react";
import { getFaviconUrl } from "@/lib/favicon";
import { TROOPER_DEMO as T } from './demoTheme';
import FeaturePeekStage from './ui/FeaturePeekStage';
import SmartRoutingSection from './SmartRoutingSection';
import DataSourcesSection from './DataSourcesSection';

function FeatureKicker({ index, label }: { index: string; label: string }) {
  return (
    <p className="kicker text-sm sm:text-base">
      <span className="text-ink-faint/80">[{index}]</span>{' '}
      <span className="normal-case">{label}</span>
    </p>
  );
}

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

const DashedLabel = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <div className="inline-flex items-center gap-2 rounded-sm border border-dashed border-slate-300 bg-white px-3 py-1.5">
    <span className="text-slate-400">{icon}</span>
    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">{text}</span>
  </div>
);

const FlowLine = ({ className = '' }: { className?: string }) => (
  <svg className={`absolute text-slate-200 ${className}`} width="100%" height="100%" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none" aria-hidden>
    <path d="M200 0 C180 100, 280 150, 200 250 C120 350, 300 400, 200 500" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M350 0 C330 120, 100 180, 180 300 C260 420, 50 460, 150 500" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
  </svg>
);

/* ─── Shared clean mockup primitives (design-system cards) ─── */
const MockCard = ({
  title,
  meta,
  children,
}: {
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="w-full overflow-hidden rounded-2xl border border-black/[0.06] bg-white/90 shadow-[0_28px_64px_-28px_rgba(28,25,23,0.35)] ring-1 ring-black/[0.04] backdrop-blur-xl">
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
      <span className="truncate text-[13px] font-semibold tracking-tight text-slate-900 sm:text-sm">{title}</span>
      {meta ? <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-500">{meta}</span> : null}
    </div>
    {children}
  </div>
);

const MockFoot = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-4 py-2.5 sm:px-5">{children}</div>
);

/* ─── Visual 1: AI Org — org chart with Trooper ─── */
const ORG_MANAGERS = [
  { name: 'Research Trooper', role: 'Head of Research', count: 24 },
  { name: 'Dev Trooper', role: 'Head of Engineering', count: 18 },
] as const;

function OrgNode({
  name,
  role,
  count,
  compact = false,
}: {
  name: string;
  role: string;
  count?: number;
  compact?: boolean;
}) {
  return (
    <div className="flex w-[148px] flex-col items-center">
      <div
        className={`relative z-10 -mb-2.5 flex items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-sm ${
          compact ? 'h-10 w-10 p-1' : 'h-11 w-11 p-1'
        }`}
      >
        <TrooperChar />
      </div>
      <div className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-center shadow-sm">
        <p className={`font-semibold leading-tight text-slate-900 ${compact ? 'text-[11px]' : 'text-[12px]'}`}>
          {name}
        </p>
        <p className="mt-0.5 text-[10px] leading-snug text-slate-400">{role}</p>
      </div>
      {count != null ? (
        <div className="mt-1.5 flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 shadow-sm">
          <span className="text-[10px] font-semibold tabular-nums text-slate-700">{count}</span>
          <svg className="h-2.5 w-2.5 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}

const OrgVisual = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 py-4">
    <OrgNode name="Trooper Prime" role="CEO, Founder" />
    <span className="mt-1.5 rounded bg-slate-900 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white">
      +44 reports
    </span>

    <svg className="my-1 h-5 w-[248px] shrink-0" viewBox="0 0 248 20" aria-hidden>
      <path d="M124 0 V7 M62 7 H186 M62 7 V20 M186 7 V20" stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
    </svg>

    <div className="flex items-start justify-center gap-10">
      {ORG_MANAGERS.map((mgr) => (
        <OrgNode key={mgr.name} name={mgr.name} role={mgr.role} count={mgr.count} compact />
      ))}
    </div>

    <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">2 leaders · 44 reports</p>
  </div>
);

/* ─── Visual 2: Integrations — favicon grid ─── */
const IntegrationsVisual = () => {
  const domains = [
    'salesforce.com', 'google.com', 'linear.app', 'trello.com', 'slack.com', 'figma.com',
    'notion.so', 'atlassian.com', 'dropbox.com', 'asana.com', 'gmail.com', 'github.com',
  ];
  return (
    <MockCard title="Connected apps" meta="3k integrations">
      <div className="px-4 py-3.5 sm:px-5">
        <div className="grid grid-cols-6 gap-2">
          {domains.map((d) => (
            <Fav key={d} domain={d} size={20} />
          ))}
        </div>
      </div>
      <MockFoot>
        <span className="font-mono text-[10px] text-slate-500">Browser &amp; native APIs</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trooper-olive opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-trooper" />
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-trooper-700">Live</span>
        </span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 3: Action — live tool-run log ─── */
const ActionVisual = () => {
  const rows = [
    { t: '14:55', a: 'browser.open', d: 'wonder.so', running: false },
    { t: '14:56', a: 'read_file', d: 'index.html', running: false },
    { t: '14:57', a: 'apply_patch', d: 'meta · og:image', running: false },
    { t: '14:58', a: 'deploy', d: 'vercel · prod', running: true },
  ];
  return (
    <MockCard title="Task · SEO optimization" meta="#product-launch">
      <ul className="px-2 py-2 sm:px-3">
        {rows.map((r) => (
          <li
            key={r.t}
            className={`grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[11px] ${r.running ? 'bg-trooper-50/70' : ''}`}
          >
            <span className="tabular-nums text-slate-400">{r.t}</span>
            <span className="truncate text-slate-700">
              {r.a} <span className="text-slate-400">{r.d}</span>
            </span>
            {r.running ? (
              <Loader2 className="size-3.5 animate-spin text-[#3f6b00]" strokeWidth={2.5} />
            ) : (
              <Check className="size-3.5 text-trooper" strokeWidth={2.5} />
            )}
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] text-slate-500">3 / 6 subtasks</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-trooper-700">
          <FileText className="size-3" strokeWidth={2} />
          index.html
        </span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 4: Memory — system pipeline + knowledge graph ─── */
const MemoryStep = ({
  num,
  label,
  title,
  icon,
  tone,
}: {
  num: string;
  label: string;
  title: string;
  icon: React.ReactNode;
  tone: 'blue' | 'green' | 'violet';
}) => {
  const tones = {
    blue: 'border-blue-100 bg-blue-50/70',
    green: 'border-trooper-100 bg-trooper-50/70',
    violet: 'border-violet-100 bg-violet-50/70',
  } as const;
  const iconTones = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-trooper-100 text-trooper-700',
    violet: 'bg-violet-100 text-violet-600',
  } as const;
  return (
    <div className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-2 ${tones[tone]}`}>
      <span className={`inline-flex size-7 shrink-0 items-center justify-center rounded-md ${iconTones[tone]}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-slate-400">
          {num} / {label}
        </p>
        <p className="truncate text-[12px] font-semibold text-slate-800">{title}</p>
      </div>
    </div>
  );
};

const MemoryGraph = () => (
  <div className="relative h-[112px] w-full">
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 112" fill="none" aria-hidden>
      <g stroke="#cbd5e1" strokeWidth="1">
        <line x1="92" y1="56" x2="40" y2="34" />
        <line x1="92" y1="56" x2="36" y2="78" />
        <line x1="92" y1="56" x2="150" y2="30" />
        <line x1="92" y1="56" x2="158" y2="74" />
        <line x1="150" y1="30" x2="158" y2="74" />
      </g>
    </svg>
    {/* center entity */}
    <span className="absolute left-[40%] top-[42%] h-5 w-9 rounded bg-blue-200 ring-1 ring-blue-300" />
    {/* satellites */}
    <span className="absolute left-[10%] top-[24%] h-4 w-8 rounded bg-trooper-200 ring-1 ring-trooper-300" />
    <span className="absolute left-[9%] top-[64%] h-4 w-8 rounded bg-trooper-200 ring-1 ring-trooper-300" />
    <span className="absolute left-[70%] top-[20%] h-4 w-8 rounded bg-blue-200 ring-1 ring-blue-300" />
    <span className="absolute left-[74%] top-[60%] h-4 w-8 rounded bg-violet-200 ring-1 ring-violet-300" />
  </div>
);

const MemoryVisual = () => (
  <div className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_24px_48px_-16px_rgba(28,25,23,0.18),0_8px_16px_-8px_rgba(28,25,23,0.08)]">
    {/* Conversation metadata */}
    <div className="border-b border-slate-100 px-3.5 py-3 sm:px-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-slate-100 text-slate-500">
          <Braces className="size-3.5" strokeWidth={2} />
        </span>
        <span className="text-[12px] font-semibold text-slate-800">Conversation metadata</span>
      </div>
      <div className="mt-2 font-mono text-[10px] leading-relaxed text-slate-500">
        <span className="text-slate-400">containerTag:</span> <span className="text-blue-600">organizationID</span>{' · '}
        <span className="text-slate-400">userId:</span> <span className="text-violet-600">&quot;xyz&quot;</span>
      </div>
    </div>

    {/* Pipeline + graph */}
    <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 px-3.5 py-3 sm:grid-cols-[1.5fr_1fr] sm:px-4">
      {/* Memory system */}
      <div className="flex flex-col gap-2 rounded-lg border border-slate-200/70 bg-slate-50/40 p-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400">Memory system</span>
          <span className="inline-flex items-center gap-1 rounded-sm bg-white px-1.5 py-0.5 font-mono text-[8px] text-slate-400 ring-1 ring-slate-200">
            <MessageSquare className="size-2.5" strokeWidth={2} />
            prompt
          </span>
        </div>
        <MemoryStep num="01" label="Static context" title="Context prepared" tone="blue" icon={<Box className="size-3.5" strokeWidth={2} />} />
        <MemoryStep num="02" label="Dynamic context" title="Memories from graph" tone="green" icon={<Database className="size-3.5" strokeWidth={2} />} />
        <MemoryStep num="03" label="Final prompt" title="Prompt construction" tone="violet" icon={<Sparkles className="size-3.5" strokeWidth={2} />} />
      </div>

      {/* Memory graph */}
      <div className="flex flex-col rounded-lg border border-slate-200/70 bg-white p-2.5">
        <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-400">Memory graph</span>
        <MemoryGraph />
        <div className="mt-1 flex flex-wrap gap-x-2.5 gap-y-1 border-t border-slate-100 pt-1.5">
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-blue-200 ring-1 ring-blue-300" />Entities
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-trooper-200 ring-1 ring-trooper-300" />Memories
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500">
            <span className="size-2 rounded-sm bg-violet-200 ring-1 ring-violet-300" />Contexts
          </span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="flex items-center justify-between gap-2 border-t border-slate-100 bg-trooper-50/50 px-3.5 py-2 sm:px-4">
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
        <ArrowRight className="size-3 text-trooper-600" strokeWidth={2} />
        Relevant memories injected every turn
      </span>
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-trooper-700">
        <Check className="size-3 text-trooper-600" strokeWidth={2.5} />
        Persists
      </span>
    </div>
  </div>
);

/* ─── Visual 5: Weeks-long runs — Gantt timeline ─── */
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
    <MockCard title="Q4 roadmap" meta="5 weeks · on track">
      <div ref={ref} className="space-y-2.5 px-4 py-4 sm:px-5">
        {ganttTasks.slice(0, 6).map((task, i) => (
          <div key={task.label} className="grid grid-cols-[112px_1fr] items-center gap-3">
            <span className="truncate font-mono text-[10px] text-slate-500">{task.label}</span>
            <div className="relative h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="absolute inset-y-0 rounded-full transition-all duration-700 ease-out"
                style={{
                  left: `${(task.startCol / totalCols) * 100}%`,
                  width: animate ? `${(task.span / totalCols) * 100}%` : '0%',
                  backgroundColor: task.color,
                  transitionDelay: `${200 + i * 80}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <MockFoot>
        <span className="inline-flex -space-x-1.5">
          <span className="inline-flex size-5 items-center justify-center overflow-hidden rounded-full border border-white bg-white p-0.5 ring-1 ring-slate-200">
            <TrooperChar />
          </span>
          {['human-sandeep', 'human-lisa'].map((id) => (
            <img key={id} src={`https://i.pravatar.cc/150?u=${id}`} alt="" className="size-5 rounded-full border border-white object-cover" />
          ))}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-trooper-700">
          <span className="size-1.5 rounded-full bg-trooper" />
          Context retained across weeks
        </span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 6: OpenClaw Runtime ─── */
const OpenClawVisual = () => (
  <div className="relative flex w-full flex-col justify-between overflow-hidden p-1 sm:p-2">
    <FlowLine className="inset-0 opacity-40" />
    <div className="relative z-10 space-y-5 sm:space-y-6">
      <div className="overflow-hidden rounded-sm border border-dashed border-slate-300 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-trooper/70" />
            <span className="size-2.5 rounded-full bg-amber-500/70" />
            <span className="size-2.5 rounded-full bg-trooper/70" />
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
            <OpenClawFavicon size={11} />
            openclaw — bash
          </span>
        </div>
        <div className="bg-slate-950 py-3 font-mono text-[11px] leading-[1.7] sm:py-4 sm:text-[12px]">
          {[
            { ln: 1, content: <><span className="text-trooper select-none">$</span> <span className="text-slate-200">openclaw deploy </span><span className="text-amber-400">--org</span><span className="text-slate-200"> acme-corp</span></> },
            { ln: 2 },
            { ln: 3, content: <span className="text-slate-400">→ Provisioning private server…</span> },
            { ln: 4, content: <span className="text-slate-400">→ Mounting encrypted volume…</span> },
            { ln: 5, content: <span className="text-slate-400">→ Loading 4 AI employees…</span> },
            { ln: 6 },
            { ln: 7, content: <span className="font-semibold text-trooper-olive">✓ Runtime ready</span>, highlight: true },
            { ln: 8, content: <span className="text-slate-500">  https://acme.openclaw.run</span> },
          ].map((row) => (
            <div
              key={row.ln}
              className={`flex items-baseline ${row.highlight ? 'border-l-2 border-trooper bg-trooper/10' : 'border-l-2 border-transparent'}`}
            >
              <span className="w-10 shrink-0 select-none pr-3 text-right tabular-nums text-slate-700">
                {row.ln}
              </span>
              <span className="min-h-[1.4em]">{row.content || '\u00A0'}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2.5 sm:space-y-3">
          <DashedLabel
            icon={
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            }
            text="Data siloed per org"
          />
          <div className="flex flex-wrap items-center gap-2">
            <DashedLabel
              icon={
                <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              }
              text="Private server"
            />
            <span className="inline-flex items-center rounded-sm border border-trooper-100 bg-trooper-50 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-trooper-700">
              Recommended
            </span>
          </div>
          <DashedLabel
            icon={
              <svg className="size-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            }
            text="Full API access"
          />
        </div>
        <div className="text-left sm:text-right">
          <p className="font-display text-4xl font-bold leading-none tracking-tighter text-slate-200 sm:text-6xl lg:text-7xl">
            99.9%
          </p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">Uptime SLA</p>
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
    <MockCard title="Ticket #1042 · Deploy pricing page" meta={`${steps.length} steps`}>
      <ul className="px-2 py-2 sm:px-3">
        {steps.map((t) => (
          <li
            key={t.fn}
            className={`grid grid-cols-[16px_1fr_auto] items-center gap-3 rounded-xl px-3 py-2.5 font-mono text-[11px] ${t.running ? 'bg-amber-50/70' : ''}`}
          >
            {t.running ? (
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
              </span>
            ) : (
              <span className="inline-flex size-2 rounded-full bg-trooper" />
            )}
            <span className="truncate text-slate-700">{t.fn}</span>
            <span className={`text-[8px] uppercase tracking-[0.2em] ${t.running ? 'text-amber-600' : 'text-trooper-600'}`}>{t.status}</span>
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">Audit log</span>
        <span className="font-mono text-[10px] text-trooper-700">47 events · fully traced</span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 8: Goal Alignment — cascade from mission → task ─── */
const GoalVisual = () => {
  const levels = [
    { n: '01', k: 'Mission · Trooper Inc.', v: 'Build the #1 AI workforce platform' },
    { n: '02', k: 'Project · Q4 2026', v: 'Ship team collaboration features' },
    { n: '03', k: 'Agent goal · CTO', v: 'Implement real-time sync engine' },
    { n: '04', k: 'Task · work happens here', v: 'Write WebSocket handler for doc updates', active: true },
  ];
  return (
    <MockCard title="Goal alignment" meta="mission → task">
      <ul className="px-3 py-3 sm:px-4">
        {levels.map((l, i) => (
          <li key={l.n} className="relative pl-6">
            {i < levels.length - 1 && (
              <span className="absolute left-[9px] top-7 h-[calc(100%-18px)] w-px bg-slate-200" aria-hidden />
            )}
            <span
              className={`absolute left-1.5 top-2.5 size-3 rounded-full ring-2 ring-white ${l.active ? 'bg-trooper' : 'bg-slate-300'}`}
            />
            <div
              className={`mb-2 rounded-lg border px-3 py-2 ${l.active ? 'border-trooper bg-trooper-50' : 'border-slate-200 bg-white'}`}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate-400">
                <span className={l.active ? 'text-trooper' : 'text-slate-400'}>[{l.n}]</span> {l.k}
              </p>
              <p className={`mt-0.5 text-[12px] font-medium leading-snug ${l.active ? 'text-trooper-700' : 'text-slate-800'}`}>
                {l.v}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] text-slate-500">company → project → agent → task</span>
        <span className="font-mono text-[10px] text-trooper-700">Aligned</span>
      </MockFoot>
    </MockCard>
  );
};

/* ─── Visual 9: Bring Your Own Agent — clean roster ─── */
const BYOAVisual = () => {
  const team = [
    { role: 'CEO', provider: 'Trooper', isYou: true },
    { role: 'CMO', provider: 'OpenClaw', recommended: true },
    { role: 'CTO', provider: 'Cursor' },
    { role: 'COO', provider: 'Claude' },
    { role: 'Eng', provider: 'Codex' },
    { role: 'Eng', provider: 'Gemini' },
  ];
  return (
    <MockCard title="Your roster" meta="6 agents · 5 providers">
      <ul className="divide-y divide-slate-100">
        {team.map((m, i) => (
          <li key={`${m.role}-${i}`} className="grid grid-cols-[26px_1fr_auto] items-center gap-3 px-4 py-2.5 sm:px-5">
            <span className="inline-flex size-6 items-center justify-center rounded-md border border-slate-200 bg-white">
              {m.isYou ? (
                <span className="size-3.5 overflow-hidden p-0.5">
                  <TrooperChar />
                </span>
              ) : (
                <FaviconChip provider={m.provider} size={13} />
              )}
            </span>
            <div className="flex min-w-0 items-center gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-800">{m.role}</span>
              <span className="truncate font-mono text-[11px] text-slate-600">{m.isYou ? 'You' : m.provider}</span>
            </div>
            {m.recommended ? (
              <span className="rounded-full bg-trooper-600 px-2 py-0.5 text-[8px] uppercase tracking-[0.16em] text-white">Recommended</span>
            ) : (
              <span className="inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.14em] text-slate-500">
                <span className="size-1.5 rounded-full bg-trooper" aria-hidden />
                Active
              </span>
            )}
          </li>
        ))}
      </ul>
      <MockFoot>
        <span className="font-mono text-[10px] text-slate-500">20+ providers supported</span>
        <span className="font-mono text-[10px] text-trooper-700">Heartbeat = hired</span>
      </MockFoot>
    </MockCard>
  );
};


const PixelFramedVisual = ({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) => (
  <FeaturePeekStage framed={false} wide={wide}>{children}</FeaturePeekStage>
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
          transforms.push({ scale: Math.max(0.94, 1 - 0.02 * cardsOnTop), opacity: Math.max(0.55, 1 - 0.1 * cardsOnTop), y: -6 * cardsOnTop });
        } else {
          transforms.push({ scale: 1, opacity: 1, y: 0 });
        }
      });
      setCardTransforms((prev) => {
        if (
          prev.length === transforms.length &&
          prev.every(
            (p, i) =>
              p.scale === transforms[i].scale &&
              p.opacity === transforms[i].opacity &&
              p.y === transforms[i].y,
          )
        ) {
          return prev;
        }
        return transforms;
      });
    };
    calculateTransforms();
    let rafId: number | undefined;
    const handleScroll = () => { if (rafId) cancelAnimationFrame(rafId); rafId = requestAnimationFrame(calculateTransforms); };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateTransforms);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', calculateTransforms); if (rafId) cancelAnimationFrame(rafId); };
  }, []);

  const renderCapabilityCard = (card: (typeof cards)[number], index: number, displayNum: string) => {
    const t = cardTransforms[index] || { scale: 1, opacity: 1, y: 0 };
    const cardIndex = displayNum;

    return (
      <div
        key={index}
        ref={(el) => {
          cardRefs.current[index] = el;
        }}
        className="lg:sticky lg:top-[14vh] pb-16"
        style={{
          zIndex: cards.length + index,
        }}
      >
        <article
          className="relative overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 will-change-transform"
          style={{
            transform: `scale(${t.scale}) translateY(${t.y}px)`,
            opacity: t.opacity,
            transformOrigin: 'center top',
            transition:
              'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {index === 8 && (
            <span className="absolute top-3 right-3 z-20 rounded-sm bg-fern-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fern-800 ring-1 ring-fern-200 sm:top-4 sm:right-4">
              Flagship
            </span>
          )}

          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div
              className={`${sectionXPadding} flex flex-col justify-center py-8 sm:py-10 md:py-12 lg:py-14`}
            >
              <FeatureKicker index={cardIndex} label={card.tag} />
              <h3 className="mt-4 font-display text-xl font-medium leading-snug tracking-tight text-balance text-ink sm:mt-5 sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
                {card.title}{' '}
                {card.highlight ? (
                  <span className="text-ink-muted">{card.highlight}</span>
                ) : null}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted sm:mt-4 sm:text-[15px] sm:leading-7">
                {card.description}
              </p>
            </div>

            <div className="relative min-h-[320px] border-t border-[var(--color-line)] sm:min-h-[380px] lg:min-h-[500px] lg:border-t-0 lg:rounded-r-xl">
              <PixelFramedVisual wide={index === 5}>
                {cardVisuals[index]}
              </PixelFramedVisual>
            </div>
          </div>
        </article>
      </div>
    );
  };

  return (
    <div className="relative pb-6 sm:pb-10 md:pb-14">
      <div className="relative space-y-4 sm:space-y-5 md:space-y-6" style={{ perspective: '1000px' }}>
        {renderCapabilityCard(cards[0], 0, '01')}
        {renderCapabilityCard(cards[1], 1, '02')}
        {renderCapabilityCard(cards[2], 2, '03')}
        {renderCapabilityCard(cards[3], 3, '04')}
        <DataSourcesSection kicker="05" />
        {renderCapabilityCard(cards[4], 4, '06')}
        {renderCapabilityCard(cards[5], 5, '07')}
        {renderCapabilityCard(cards[6], 6, '08')}
        {renderCapabilityCard(cards[7], 7, '09')}
        <SmartRoutingSection kicker="10" />
        {renderCapabilityCard(cards[8], 8, '11')}
      </div>
    </div>
  );
}
