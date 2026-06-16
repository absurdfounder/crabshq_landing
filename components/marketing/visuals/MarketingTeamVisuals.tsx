'use client';

import type { ReactNode } from 'react';
import {
  Check, Loader2, FileText, Megaphone, Palette, BookOpen, Play,
} from 'lucide-react';
import { DemoFavicon } from '@/components/DemoFavicon';
import { DemoBrowserFrame } from '@/components/DemoBrowserChrome';
import { assetPath, DEMO_MEDIA } from '@/lib/demoScenarioAssets/helpers';
import { VignetteChrome, ProviderChip } from './shared';
import { CanvasDesktopVisual } from './CanvasDesktopVisual';

function ToolRow({
  label, detail, done, running, icon,
}: {
  label: string;
  detail: string;
  done?: boolean;
  running?: boolean;
  icon?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 py-1 text-[10px]">
      {done ? (
        <Check size={11} className="text-trooper shrink-0" />
      ) : running ? (
        <Loader2 size={11} className="animate-spin text-amber-600 shrink-0" />
      ) : (
        <span className="h-2 w-2 rounded-full border border-stone-300 shrink-0" />
      )}
      {icon}
      <span className="font-mono font-semibold text-stone-800">{label}</span>
      <span className="truncate text-stone-400">{detail}</span>
    </div>
  );
}

function MiniBrowserTile({ url, src, faviconDomain }: { url: string; src?: string; faviconDomain?: string }) {
  return (
    <DemoBrowserFrame
      src={src}
      addressUrl={url}
      faviconDomain={faviconDomain}
      compact
      title={url}
    />
  );
}

function BriefTile() {
  const lines = [
    { t: 'heading', text: 'Q2 Campaign Brief' },
    { t: 'muted', text: 'Theme · AI-native ops for lean teams' },
    { t: 'body', text: 'Deliverables shipped' },
    { t: 'bullet', text: '· Pillar landing page (live preview)' },
    { t: 'bullet', text: '· LinkedIn carousel — 3 slides' },
    { t: 'bullet', text: '· 30s social video cut + transcript' },
    { t: 'bullet', text: '· Email nurture sequence (3-part)' },
    { t: 'status', text: 'Awaiting brand review' },
  ];
  return (
    <div className="min-h-full overflow-y-auto bg-white p-2.5 text-[8px] leading-relaxed">
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.t === 'heading' ? 'mb-1 text-[9px] font-semibold text-stone-800'
              : line.t === 'muted' ? 'mb-1.5 text-stone-400'
                : line.t === 'bullet' ? 'text-stone-600'
                  : line.t === 'status' ? 'mt-2 font-medium text-[#3f6b00]'
                    : 'text-stone-600'
          }
        >
          {line.text}
        </div>
      ))}
    </div>
  );
}

function CarouselTile() {
  return (
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-stone-100 to-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DEMO_MEDIA.linkedinCarousel}
        alt="LinkedIn carousel slide 1"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/75 to-transparent px-2 pb-1.5 pt-4">
        <p className="text-[7px] font-semibold text-white">Slide 1 of 3</p>
        <p className="text-[6px] text-stone-300">LinkedIn carousel</p>
      </div>
    </div>
  );
}

function EmailSequenceTile() {
  const sections = [
    { t: 'h1', text: 'Email nurture — Q2 campaign' },
    { t: 'h2', text: 'Email 1 — Launch' },
    { t: 'p', text: 'Subject: Your agents deserve one command layer' },
    { t: 'h2', text: 'Email 2 — Proof' },
    { t: 'p', text: 'Case study: traced tickets, human review gates' },
    { t: 'h2', text: 'Email 3 — CTA' },
    { t: 'gate', text: 'Held for Jordan sign-off before schedule' },
  ];
  return (
    <div className="h-full overflow-hidden bg-white p-2 text-[7px] leading-snug">
      {sections.map((s, i) => (
        <div
          key={i}
          className={
            s.t === 'h1' ? 'mb-1 font-semibold text-stone-900 text-[8px]'
              : s.t === 'h2' ? 'mt-1 mb-0.5 font-semibold text-stone-700'
                : s.t === 'gate' ? 'mt-2 rounded border border-amber-200 bg-amber-50 px-1.5 py-1 font-medium text-amber-800'
                  : 'text-stone-600'
          }
        >
          {s.text}
        </div>
      ))}
    </div>
  );
}

function VideoTile() {
  return (
    <div className="relative h-full overflow-hidden bg-stone-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={DEMO_MEDIA.socialVideoPoster}
        alt="Social video poster"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-stone-950/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-sm">
          <Play size={11} className="ml-0.5 text-white" fill="white" />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-stone-950/60 px-2 py-1">
        <span className="font-mono text-[6px] text-stone-300">00:00 / 00:30</span>
        <span className="text-[6px] font-medium text-stone-400">social-cut.mp4</span>
      </div>
    </div>
  );
}

const CAMPAIGN_LANES = [
  {
    provider: 'Claude Code',
    agent: 'Ren',
    task: 'landing/campaign.html',
    channel: 'Pillar page',
    tools: [
      { label: 'write_file', detail: 'hero + CTA blocks', done: true },
      { label: 'browser_navigate', detail: 'northstar.io/q2 preview', done: true },
      { label: 'write_file', detail: 'meta + OG tags', running: true },
    ],
  },
  {
    provider: 'Codex',
    agent: 'Ren',
    task: 'creative/linkedin-carousel.png',
    channel: 'Carousel',
    tools: [
      { label: 'image_gen', detail: 'slide 1 — parser story hook', done: true },
      { label: 'image_gen', detail: 'slides 2–3 — proof + CTA', running: true },
    ],
  },
  {
    provider: 'Trooper',
    agent: 'Aria',
    task: 'seo/keyword-map.md',
    channel: 'SEO recon',
    tools: [
      { label: 'figma_export', detail: 'competitor landing audit', done: true },
      { label: 'sheets_update', detail: 'Q2 keyword map tab', done: true },
      { label: 'write_file', detail: 'content gap brief', running: true },
    ],
  },
];

const LAUNCH_CHANNELS = [
  { name: 'Blog', agent: 'Ren', status: 'done' as const, artifact: 'Pillar draft live' },
  { name: 'LinkedIn', agent: 'Ren', status: 'running' as const, artifact: 'Carousel queued' },
  { name: 'Email', agent: 'Aria', status: 'running' as const, artifact: 'Nurture 3-part' },
  { name: 'Social video', agent: 'Ren', status: 'pending' as const, artifact: '30s cut rendering' },
];

const campaignSrc = assetPath('marketing', 'campaign.html');

const BOARD_WINDOWS = [
  {
    id: 'brief',
    title: 'content/q2-campaign-brief.md',
    x: 14,
    y: 10,
    w: 186,
    h: 132,
    body: <BriefTile />,
  },
  {
    id: 'preview',
    title: 'landing/campaign.html',
    x: 156,
    y: 22,
    w: 220,
    h: 138,
    body: <MiniBrowserTile url="northstar.io/q2" src={campaignSrc} faviconDomain="northstar.io" />,
  },
  {
    id: 'carousel',
    title: 'creative/linkedin-carousel.png',
    x: 44,
    y: 124,
    w: 172,
    h: 118,
    body: <CarouselTile />,
  },
  {
    id: 'email',
    title: 'copy/email-sequence.md',
    x: 198,
    y: 118,
    w: 208,
    h: 122,
    accent: true,
    body: <EmailSequenceTile />,
  },
];

const CANVAS_WINDOWS = [
  {
    id: 'brief',
    title: 'content/q2-campaign-brief.md',
    x: 22,
    y: 16,
    w: 182,
    h: 148,
    body: <BriefTile />,
  },
  {
    id: 'preview',
    title: 'landing/campaign.html',
    x: 148,
    y: 28,
    w: 224,
    h: 142,
    body: <MiniBrowserTile url="northstar.io/q2" src={campaignSrc} faviconDomain="northstar.io" />,
  },
  {
    id: 'carousel',
    title: 'creative/linkedin-carousel.png',
    x: 52,
    y: 132,
    w: 178,
    h: 124,
    body: <CarouselTile />,
  },
  {
    id: 'video',
    title: 'video/social-cut.mp4',
    x: 196,
    y: 108,
    w: 192,
    h: 128,
    accent: true,
    body: <VideoTile />,
  },
];

/* ─── [03] Multi-agent campaign harness — parallel creative lanes ─── */
export function MarketingHarnessVisual() {
  return (
    <VignetteChrome label="trooper · ticket #1 · campaign unit">
      <div className="border-b border-stone-100 bg-white px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400">MKT · Q2 launch</span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-800">
                In progress
              </span>
            </div>
            <h4 className="font-semibold text-[13px] text-stone-900 leading-snug truncate">
              Q2 pillar campaign — landing + creative + SEO
            </h4>
          </div>
          <div className="flex -space-x-1.5 shrink-0">
            {['Ren', 'Aria', 'Jordan'].map((name) => (
              <img
                key={name}
                src={`https://i.pravatar.cc/150?u=agent-${name.toLowerCase()}`}
                alt=""
                className="h-6 w-6 rounded-full object-cover ring-2 ring-white"
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[8px] font-mono text-stone-600">
            <DemoFavicon domain="northstar.io" size={10} rounded="sm" />
            northstar.io/q2
          </span>
          <span className="font-mono text-[8px] text-stone-400">3 agents · 7 subtasks</span>
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-stone-100 bg-white min-h-[220px]">
        {CAMPAIGN_LANES.map((lane, idx) => (
          <div key={lane.channel} className={`flex flex-col ${idx === 0 ? 'bg-trooper-50/20' : ''}`}>
            <div className="flex items-center gap-1.5 border-b border-stone-100 px-2 py-2 bg-stone-50/80">
              <ProviderChip provider={lane.provider} size={14} />
              <div className="min-w-0 flex-1">
                <div className="text-[9px] font-bold text-stone-800 truncate">{lane.channel}</div>
                <div className="text-[8px] text-stone-400 truncate">{lane.agent} · {lane.task}</div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <div className="rounded-lg border border-stone-100 bg-[#FAF9F6] p-1.5 space-y-0.5">
                {lane.tools.map((t) => (
                  <ToolRow
                    key={`${t.label}-${t.detail}`}
                    label={t.label}
                    detail={t.detail}
                    done={t.done}
                    running={t.running}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] text-stone-500">Subtasks 5/7</span>
          <span className="hidden sm:inline font-mono text-[9px] text-stone-400">·</span>
          <span className="hidden sm:inline font-mono text-[9px] text-stone-500">
            <Megaphone size={9} className="inline mr-0.5" />
            Campaign pack compiling
          </span>
        </div>
        <span className="inline-flex items-center gap-1 font-mono text-[9px] text-trooper-700">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-trooper opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-trooper" />
          </span>
          Live trace
        </span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [04] Cross-channel launch board — mission timeline ─── */
export function MarketingLaunchVisual() {
  return (
    <VignetteChrome label="trooper · Q2 launch board">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">
            Cross-channel · one mission
          </span>
          <span className="rounded border border-pink-200 bg-pink-50 px-1.5 py-0.5 text-[8px] font-semibold text-pink-800">
            4 channels
          </span>
        </div>
        <p className="mt-1 text-[10px] text-stone-500 leading-relaxed">
          Blog, social, email, and video coordinated as subtasks — approval before publish.
        </p>
      </div>
      <div className="p-3 bg-white min-h-[200px]">
        <div className="space-y-2">
          {LAUNCH_CHANNELS.map((ch) => (
            <div key={ch.name} className="flex items-center gap-3 rounded-lg border border-stone-100 px-3 py-2.5">
              <div className={`h-2 w-2 rounded-full shrink-0 ${
                ch.status === 'done' ? 'bg-trooper'
                  : ch.status === 'running' ? 'bg-amber-500 animate-pulse'
                    : 'bg-stone-300'
              }`}
              />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-stone-800">{ch.name}</div>
                <div className="text-[9px] text-stone-400 truncate">{ch.artifact}</div>
              </div>
              <span className="text-[9px] text-stone-400 shrink-0">{ch.agent}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1.5">
          <div className="rounded border border-stone-200 overflow-hidden h-12">
            <MiniBrowserTile url="northstar.io/q2" src={campaignSrc} faviconDomain="northstar.io" />
          </div>
          <div className="rounded border border-stone-200 overflow-hidden h-12">
            <CarouselTile />
          </div>
          <div className="rounded border border-stone-200 overflow-hidden h-12 bg-stone-50 p-1.5 text-[7px] text-stone-600 leading-tight">
            copy/email-sequence.md
          </div>
          <div className="rounded border border-stone-200 overflow-hidden h-12 bg-stone-900 flex items-center justify-center">
            <Play size={10} className="text-white" fill="white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2">
        <span className="font-mono text-[9px] text-stone-400">Jordan · Chief of Staff · gates publish</span>
        <span className="font-mono text-[9px] text-amber-700">Review before schedule</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [05] Brand memory — voice, ICP, and campaign learnings ─── */
export function MarketingMemoryVisual() {
  const memoryFiles = [
    {
      path: 'brand-voice.md',
      icon: <Megaphone size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'tone', v: 'Direct, ops-native — no fluff' },
        { k: 'avoid', v: '“AI magic”, hype adjectives' },
        { k: 'cta', v: 'Book demo · See the board' },
      ],
    },
    {
      path: 'icp.md',
      icon: <BookOpen size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'persona', v: 'Eng lead · 5–20 person team' },
        { k: 'pain', v: 'Tab-switching between agents' },
        { k: 'proof', v: 'Traced tickets + review gates' },
      ],
    },
    {
      path: 'competitor-notes.md',
      icon: <FileText size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'gap', v: 'Multi-agent canvas — we win' },
        { k: 'pricing', v: 'BYOA vs bundled seats' },
        { k: 'last_audit', v: 'Q2 SEO recon · Aria' },
      ],
    },
    {
      path: 'style-guide.yml',
      icon: <Palette size={11} className="text-stone-400 shrink-0" />,
      lines: [
        { k: 'primary', v: '#3f6b00 · trooper green' },
        { k: 'headlines', v: 'Funnel Display · tight tracking' },
        { k: 'social', v: 'Carousel 1080×1080 · 3 slides' },
      ],
    },
  ];

  return (
    <VignetteChrome label="trooper · brand memory">
      <div className="border-b border-stone-100 bg-[#FAF9F6] px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">
            Loaded on every marketing mission
          </span>
          <span className="rounded border border-trooper-200 bg-trooper-50 px-1.5 py-0.5 text-[8px] font-semibold text-trooper-800">
            Persisted
          </span>
        </div>
        <p className="mt-1 text-[10px] text-stone-500 leading-relaxed">
          Voice, ICP, competitor intel, and style rules — no re-briefing each campaign.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-px bg-stone-100 min-h-[240px]">
        {memoryFiles.map((file) => (
          <div key={file.path} className="bg-white p-2.5 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2 border-b border-stone-50 pb-1.5">
              {file.icon}
              <span className="font-mono text-[9px] font-semibold text-stone-700 truncate">{file.path}</span>
            </div>
            <div className="space-y-1 flex-1">
              {file.lines.map((line) => (
                <div key={line.k} className="flex gap-1.5 text-[8px] leading-snug">
                  <span className="font-mono text-stone-400 shrink-0 w-[56px] truncate">{line.k}</span>
                  <span className="text-stone-700 truncate">{line.v}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-stone-100 bg-white px-3 py-2">
        <span className="font-mono text-[9px] text-stone-400">4 files · synced across Ren, Aria, Jordan</span>
        <span className="font-mono text-[9px] text-trooper-700">Memory hit · 0ms re-brief</span>
      </div>
    </VignetteChrome>
  );
}

/* ─── [04-alt] Ticket Canvas — campaign artifacts stacked (static) ─── */
export function MarketingBoardVisual() {
  return <CanvasDesktopVisual windows={BOARD_WINDOWS} />;
}

/* ─── [06] Animated Canvas — full campaign pack for brand review ─── */
export function MarketingCanvasVisual() {
  return <CanvasDesktopVisual animated windows={CANVAS_WINDOWS} />;
}
