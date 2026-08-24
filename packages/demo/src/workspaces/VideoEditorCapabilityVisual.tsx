'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

/** Same media the ChatCut editor demo ships — reused for Trooper’s capability mock. */
const MEDIA = {
  poster: 'https://cdn.chatcut.dev/playground/posters/final-cut-frame.jpg',
  final: 'https://cdn.chatcut.dev/playback/talking-head-final.mp4',
  mgTop5: 'https://cdn.chatcut.dev/playback/mg/mg-taylor-top5.webm',
  mgCta: 'https://cdn.chatcut.dev/playback/mg/mg-youtube-cta.webm',
  filmstrip: 'https://cdn.chatcut.dev/playback/talking-head-filmstrip.jpg',
  // Same-origin data URI — CSS masks on a cross-origin PNG throw a CORS error
  // in Chromium (cdn.chatcut.dev does not send Access-Control-Allow-Origin).
  waveform:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 32" preserveAspectRatio="none">' +
        Array.from({ length: 48 }, (_, i) => {
          const h = 8 + ((i * 19 + 7) % 20)
          const y = (32 - h) / 2
          return `<rect x="${i * 5}" y="${y}" width="3.2" height="${h}" rx="0.6" fill="white"/>`
        }).join('') +
        '</svg>',
    ),
} as const;

/** Matches the transport readout (≈19.9s). */
const TIMELINE_SECONDS = 19.9;

const STEPS = [
  { at: 1, label: 'Removed 12 fillers · 3 takes' },
  { at: 2, label: 'Found 4 highlights' },
  { at: 3, label: 'Cut sequence · 7 cuts' },
  { at: 4, label: 'Final cut ready' },
  { at: 5, label: 'Motion graphics · 5 clips' },
  { at: 6, label: 'Scored · ambient bed' },
] as const;

/** 0 idle → 1 fillers → 2 highlights → 3 cuts → 4 video → 5 graphics → 6 score */
const DELAYS = [500, 1100, 1700, 2400, 3200, 4000] as const;

type Clip = {
  /** 0–1 along the timeline */
  start: number;
  /** 0–1 width along the timeline */
  span: number;
  label?: string;
  kind: 'video' | 'mg' | 'audio';
  revealAt: number;
};

const V1_CLIPS: Clip[] = [
  { start: 0, span: 0.12, label: 'Open', kind: 'video', revealAt: 0 },
  { start: 0.12, span: 0.12, label: 'Take A', kind: 'video', revealAt: 0 },
  { start: 0.24, span: 0.27, label: 'Take B', kind: 'video', revealAt: 1 },
  { start: 0.51, span: 0.09, label: 'Take C', kind: 'video', revealAt: 2 },
  { start: 0.6, span: 0.07, label: 'Take D', kind: 'video', revealAt: 3 },
  { start: 0.67, span: 0.07, label: 'Take E', kind: 'video', revealAt: 3 },
  { start: 0.74, span: 0.26, label: 'CTA', kind: 'video', revealAt: 3 },
];

const MG_CLIPS: Clip[] = [
  { start: 0.12, span: 0.11, label: 'Card', kind: 'mg', revealAt: 5 },
  { start: 0.29, span: 0.16, label: 'Overlay', kind: 'mg', revealAt: 5 },
  { start: 0.52, span: 0.14, label: 'Atmos', kind: 'mg', revealAt: 5 },
  { start: 0.78, span: 0.21, label: 'Top 5', kind: 'mg', revealAt: 5 },
];

function formatTc(seconds: number) {
  const s = Math.max(0, Math.min(TIMELINE_SECONDS, seconds));
  const whole = Math.floor(s);
  const frames = Math.floor((s - whole) * 30);
  const mm = String(Math.floor(whole / 60)).padStart(2, '0');
  const ss = String(whole % 60).padStart(2, '0');
  const ff = String(frames).padStart(2, '0');
  return `00:${mm}:${ss}:${ff}`;
}

function useSimPhase(focused: boolean, delays: readonly number[], controlledPhase?: number) {
  const finalPhase = delays.length;
  const [phase, setPhase] = useState(finalPhase);

  useEffect(() => {
    if (controlledPhase != null) return;
    if (!focused) {
      setPhase(finalPhase);
      return;
    }
    setPhase(0);
    const timers = delays.map((ms, i) => window.setTimeout(() => setPhase(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [focused, delays, finalPhase, controlledPhase]);

  return controlledPhase != null ? controlledPhase : phase;
}

/**
 * Filmstrip windowed to this clip’s place on the timeline — same trick as
 * ChatCut: a full-timeline strip, clipped by each clip’s overflow box.
 */
function VideoFilmstrip({ start, span }: { start: number; span: number }) {
  const safeSpan = Math.max(span, 0.04);
  return (
    <span
      aria-hidden
      className="absolute inset-y-0 opacity-70"
      style={{
        left: `${(-start / safeSpan) * 100}%`,
        width: `${(1 / safeSpan) * 100}%`,
        backgroundImage: `url(${MEDIA.filmstrip})`,
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'repeat-x',
      }}
    />
  );
}

function TimelineClip({ clip, phase }: { clip: Clip; phase: number }) {
  const shown = phase >= clip.revealAt;
  const isMg = clip.kind === 'mg';
  const isAudio = clip.kind === 'audio';

  return (
    <div
      className={`absolute inset-y-0.5 overflow-hidden rounded-[3px] transition-opacity duration-500 ${
        shown ? 'opacity-100' : 'opacity-20'
      } ${
        isMg
          ? 'bg-[#35506f] ring-1 ring-[#7eb8ff]/35'
          : isAudio
            ? 'bg-[#243c30] ring-1 ring-[#37d178]/30'
            : 'bg-[#1a3326] ring-1 ring-[#37d178]/35'
      }`}
      style={{ left: `${clip.start * 100}%`, width: `${clip.span * 100}%` }}
    >
      {clip.kind === 'video' ? <VideoFilmstrip start={clip.start} span={clip.span} /> : null}
      {isAudio ? (
        <span
          aria-hidden
          className="absolute inset-x-1 inset-y-1.5 bg-[#37d178]/75"
          style={{
            WebkitMaskImage: `url(${MEDIA.waveform})`,
            maskImage: `url(${MEDIA.waveform})`,
            WebkitMaskSize: 'cover',
            maskSize: 'cover',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
          }}
        />
      ) : null}
      {clip.label ? (
        <span className="relative z-[1] block truncate px-1.5 pt-0.5 text-[8px] font-semibold leading-none text-white/85">
          {clip.label}
        </span>
      ) : null}
    </div>
  );
}

function TrackRow({
  label,
  tone,
  height,
  children,
}: {
  label: string;
  tone: string;
  height: string;
  children: ReactNode;
}) {
  return (
    <div className={`flex items-stretch gap-2 ${height}`}>
      <span
        className={`flex w-6 shrink-0 items-center text-[8px] font-bold uppercase tracking-wide ${tone}`}
      >
        {label}
      </span>
      <div className="relative min-w-0 flex-1">{children}</div>
    </div>
  );
}

/**
 * ChatCut-style editor mock shared by the marketing capability row and the
 * live demo’s video workspace. Pass `phase` to drive it from a scripted reel;
 * omit it to auto-advance when `focused`.
 */
export default function VideoEditorCapabilityVisual({
  focused,
  phase: controlledPhase,
  fill = false,
}: {
  focused: boolean;
  /** 0–6 edit beats. When set, replaces the internal timer. */
  phase?: number;
  /** Fill the parent instead of the capability card’s fixed height. */
  fill?: boolean;
}) {
  const phase = useSimPhase(focused, DELAYS, controlledPhase);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mgRef = useRef<HTMLVideoElement>(null);
  const mgCtaRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const effective = reduceMotion && controlledPhase == null ? DELAYS.length : phase;
  const playing = focused && !reduceMotion && effective >= 4;
  const showMg = effective >= 5;

  // Drive playhead + clock from the real video clock once playback starts.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!playing) {
      // Park near the start while the edit stages run; don't fake scrubbing.
      v.pause();
      try {
        v.currentTime = 0;
      } catch {
        /* ignore */
      }
      setProgress(0);
      return;
    }

    v.muted = true;
    const kick = () => {
      void v.play().catch(() => {});
    };
    if (v.readyState >= 2) kick();
    else v.addEventListener('loadeddata', kick, { once: true });

    let raf = 0;
    const tick = () => {
      const dur =
        v.duration && Number.isFinite(v.duration) && v.duration > 0
          ? v.duration
          : TIMELINE_SECONDS;
      setProgress(Math.min(1, Math.max(0, v.currentTime / dur)));

      // Keep overlays on the same beat as the master.
      const mg = mgRef.current;
      const cta = mgCtaRef.current;
      if (mg && showMg && Math.abs(mg.currentTime - v.currentTime) > 0.12) {
        try {
          mg.currentTime = v.currentTime % (mg.duration || TIMELINE_SECONDS);
        } catch {
          /* ignore */
        }
      }
      if (cta && showMg && Math.abs(cta.currentTime - v.currentTime) > 0.12) {
        try {
          cta.currentTime = v.currentTime % (cta.duration || TIMELINE_SECONDS);
        } catch {
          /* ignore */
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener('loadeddata', kick);
    };
  }, [playing, showMg]);

  useEffect(() => {
    const mg = mgRef.current;
    const cta = mgCtaRef.current;
    if (!playing || !showMg) {
      mg?.pause();
      cta?.pause();
      return;
    }
    if (mg) {
      mg.muted = true;
      void mg.play().catch(() => {});
    }
    if (cta) {
      cta.muted = true;
      void cta.play().catch(() => {});
    }
  }, [playing, showMg]);

  const playheadPct = progress * 100;
  const currentSeconds = progress * TIMELINE_SECONDS;

  return (
    <div
      className={
        fill
          ? 'flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#0e0e10] text-white'
          : 'flex h-[24rem] w-full flex-col overflow-hidden bg-[#0e0e10] text-white sm:h-[28rem]'
      }
    >
      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[11.5rem_1fr]">
        <aside className="hidden min-h-0 flex-col border-r border-white/[0.07] bg-[#121214] md:flex">
          <div className="border-b border-white/[0.07] px-3 py-2.5">
            <p className="rounded-md bg-white/[0.06] px-2.5 py-2 text-[10px] leading-snug text-white/75">
              Remove fillers, pull highlights, add motion graphics & music.
            </p>
          </div>
          <ol className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STEPS.map((step) => {
              const on = effective >= step.at;
              return (
                <li
                  key={step.label}
                  className={`flex items-start gap-1.5 text-[10px] leading-snug transition-opacity duration-300 ${
                    on ? 'text-white/70' : 'text-white/25'
                  }`}
                >
                  <span
                    className={`mt-1 size-[5px] shrink-0 rounded-full ${
                      on ? 'bg-[#3d9a50]' : 'bg-white/15'
                    }`}
                  />
                  <span>{step.label}</span>
                </li>
              );
            })}
          </ol>
          <div className="border-t border-white/[0.07] px-3 py-2 text-[10px] font-medium text-white/55">
            {effective >= 6 ? 'Done · 17s · 4 cuts · 5 graphics' : 'Editing…'}
          </div>
        </aside>

        <div className="flex min-h-0 flex-col">
          <div className="relative flex min-h-0 flex-1 flex-col bg-[#0a0a0c]">
            <div className="flex min-h-0 flex-1 items-center justify-center p-3 sm:p-4">
              <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-md bg-black shadow-[0_10px_28px_-14px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
                <video
                  ref={videoRef}
                  aria-label="Final cut preview"
                  className="absolute inset-0 size-full object-cover"
                  playsInline
                  muted
                  loop
                  poster={MEDIA.poster}
                  preload="auto"
                  src={MEDIA.final}
                />
                {showMg ? (
                  <video
                    ref={mgRef}
                    className="pointer-events-none absolute inset-0 size-full object-contain"
                    playsInline
                    muted
                    loop
                    preload="auto"
                    src={MEDIA.mgTop5}
                  />
                ) : null}
                {showMg ? (
                  <video
                    ref={mgCtaRef}
                    className="pointer-events-none absolute bottom-[7%] right-[5%] h-[26%] w-[28%] object-contain"
                    playsInline
                    muted
                    loop
                    preload="auto"
                    src={MEDIA.mgCta}
                  />
                ) : null}
                <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                  {playing ? (
                    <Pause className="size-2.5 fill-white text-white" aria-hidden />
                  ) : (
                    <Play className="size-2.5 fill-white text-white" aria-hidden />
                  )}
                  <span className="text-[9px] font-medium text-white/90">
                    {playing ? 'Playing' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex h-7 shrink-0 items-center justify-center gap-2 border-t border-white/[0.07] bg-[#141416] font-mono text-[10px] tabular-nums text-white/40">
              <span>{formatTc(currentSeconds)}</span>
              <span className="text-white/20">/</span>
              <span>{formatTc(TIMELINE_SECONDS)}</span>
            </div>
          </div>

          <div className="shrink-0 border-t border-white/[0.07] bg-[#101012] px-2.5 pb-2.5 pt-2">
            <div className="mb-1.5 flex justify-between pl-8 font-mono text-[8px] text-white/25">
              <span>00:00</span>
              <span>00:05</span>
              <span>00:10</span>
              <span>00:15</span>
            </div>
            <div className="relative">
              <div className="space-y-1">
                <TrackRow label="MG" tone="text-[#7eb8ff]/65" height="h-6">
                  {MG_CLIPS.map((c) => (
                    <TimelineClip key={c.label} clip={c} phase={effective} />
                  ))}
                </TrackRow>
                <TrackRow label="V1" tone="text-[#37d178]/75" height="h-8">
                  {V1_CLIPS.map((c) => (
                    <TimelineClip key={`${c.label}-${c.start}`} clip={c} phase={effective} />
                  ))}
                </TrackRow>
                <TrackRow label="A1" tone="text-[#37d178]/50" height="h-6">
                  <TimelineClip
                    clip={{
                      start: 0,
                      span: effective >= 6 ? 1 : 0.74,
                      kind: 'audio',
                      label: effective >= 6 ? 'Score + VO' : 'Voice-over',
                      revealAt: 0,
                    }}
                    phase={effective}
                  />
                </TrackRow>
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-8 right-0 z-10">
                <div
                  className="absolute inset-y-0 w-px bg-amber-400/90"
                  style={{ left: `${playheadPct}%` }}
                >
                  <span className="absolute -left-[5px] -top-0.5 size-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-amber-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-1.5 overflow-x-auto border-t border-white/[0.07] bg-[#121214] px-2.5 py-1.5 md:hidden [scrollbar-width:none]">
            {STEPS.filter((s) => effective >= s.at)
              .slice(-2)
              .map((s) => (
                <span
                  key={s.label}
                  className="shrink-0 rounded-full bg-[#3d9a50]/15 px-2 py-0.5 text-[9px] font-medium text-[#8fd49a]"
                >
                  {s.label}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
