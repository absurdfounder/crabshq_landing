'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Clapperboard, Pencil, Plus, Scissors } from 'lucide-react';
import type { DemoVideoProject } from '../components/demoTaskExecution';
import { DUR, EASE_OUT } from '../lib/demoMotion';
import { extractFilmstrip, extractImageStrip, extractWaveform } from '../lib/mediaStrip';

/**
 * Video workspace, mirroring the app's `video/board/StoryboardBoard.jsx` and
 * `video/timeline/TimelineCanvasNle.jsx`.
 *
 * The timeline draws to a single canvas — ruler, tracks, clips, playhead —
 * with real filmstrips tiled along video clips and real waveform peaks in the
 * audio clip, pulled from the same media the product ships. That's what makes
 * it read as an editor instead of as coloured rectangles.
 */

const STAGE = '#0e0e10';
const BAR = '#161616';
const LINE = 'rgba(255,255,255,0.07)';
const ACCENT = '#37d178';
const RULER_H = 32;
const TRACK_H = 56;
const HEAD_W = 84;
const PX_PER_SECOND = 46;

function Toolbar({ stage, project }: { stage: 'storyboard' | 'timeline'; project: DemoVideoProject }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, height: 44, flexShrink: 0,
      padding: '0 12px', borderBottom: `1px solid ${LINE}`, background: BAR,
    }}>
      <Clapperboard size={14} color={ACCENT} strokeWidth={2} />
      <span style={{ fontSize: 12, fontWeight: 600, color: '#f4f4f5' }}>
        {stage === 'storyboard' ? 'Storyboard' : project.name}
      </span>
      <span style={{ flex: 1, minWidth: 0, fontSize: 11, color: '#71717a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {stage === 'storyboard'
          ? 'Click a scene to select · double-click or Edit to open in NLE'
          : `${project.durationSeconds}s · ${project.fps}fps · ${project.clips.length} clips`}
      </span>
      <button type="button" style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 8px',
        borderRadius: 6, border: '1px solid rgba(255,255,255,0.1)', background: 'transparent',
        fontSize: 11, fontWeight: 600, color: '#e4e4e7', cursor: 'pointer',
      }}>
        <Plus size={13} strokeWidth={2} />
        Scene
      </button>
      <button type="button" style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, height: 26, padding: '0 10px',
        borderRadius: 6, border: 'none', background: '#fafafa',
        fontSize: 11, fontWeight: 600, color: '#0a0a0a', cursor: 'pointer',
      }}>
        <Pencil size={12} strokeWidth={2.2} />
        Edit in NLE
      </button>
    </div>
  );
}

/**
 * A real frame from the source file, seeked once the scene is revealed. Falls
 * back to the still if the browser has no decoder for the clip.
 */
function ScenePoster({ src, at, posterSrc, ready }: { src?: string; at?: number; posterSrc?: string; ready: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || !src) return;
    const seek = () => { try { el.currentTime = at ?? 0.5; } catch { /* ignore */ } };
    const onError = () => setFailed(true);
    if (el.readyState >= 2) seek();
    else el.addEventListener('loadeddata', seek, { once: true });
    el.addEventListener('error', onError, { once: true });
    return () => {
      el.removeEventListener('loadeddata', seek);
      el.removeEventListener('error', onError);
    };
  }, [at, ready, src]);

  if (!ready || (!src && !posterSrc)) {
    return <div className="demo-shimmer" style={{ position: 'absolute', inset: 0, opacity: 0.16 }} />;
  }

  const cover: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', background: '#0a0a0c',
  };

  if (failed || !src) return <img src={posterSrc} alt="" style={cover} />;
  return <video ref={ref} src={src} poster={posterSrc} muted playsInline preload="auto" style={cover} />;
}

function Storyboard({ project, revealed }: { project: DemoVideoProject; revealed: number }) {
  return (
    <div className="Trooper-scrollbar" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 14, background: STAGE }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {project.scenes.map((scene, i) => {
          const ready = i < revealed;
          return (
            <div
              key={scene.id}
              className={ready ? 'demo-enter' : undefined}
              style={{
                borderRadius: 10, overflow: 'hidden', background: '#0c0c0c',
                border: `1px solid ${ready ? 'rgba(255,255,255,0.12)' : LINE}`,
                opacity: ready ? 1 : 0.32,
                transition: `opacity ${DUR.panel}ms ${EASE_OUT}, border-color ${DUR.panel}ms ${EASE_OUT}`,
              }}
            >
              <div style={{ position: 'relative', height: 96, background: '#141414' }}>
                <ScenePoster src={scene.src} at={scene.posterAt} posterSrc={scene.posterSrc} ready={ready} />
                <span style={{
                  position: 'absolute', right: 6, bottom: 6, borderRadius: 4,
                  background: 'rgba(0,0,0,0.7)', padding: '1px 5px',
                  fontSize: 9.5, fontWeight: 600, color: '#e4e4e7', fontVariantNumeric: 'tabular-nums',
                }}>
                  {scene.seconds.toFixed(1)}s
                </span>
              </div>
              <div style={{ padding: '7px 9px 9px' }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: '#f4f4f5', marginBottom: 2 }}>
                  {i + 1}. {scene.title}
                </div>
                <div style={{ fontSize: 10, color: '#71717a' }}>{ready ? 'Ready' : 'Generating…'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CLIP_TONE = {
  video: { border: 'rgba(55,209,120,0.55)', text: '#c9f7dd', fill: 'rgba(18,38,28,0.6)' },
  audio: { border: 'rgba(129,140,248,0.55)', text: '#d3d6fd', fill: 'rgba(32,35,68,0.9)' },
  text: { border: 'rgba(251,191,36,0.55)', text: '#fde68a', fill: 'rgba(58,46,16,0.9)' },
} as const;

function Timeline({ project, playhead }: { project: DemoVideoProject; playhead: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const monitorRef = useRef<HTMLVideoElement>(null);
  const [strips, setStrips] = useState<Record<string, HTMLCanvasElement>>({});
  const [peaks, setPeaks] = useState<Record<string, Float32Array>>({});
  const [monitorFailed, setMonitorFailed] = useState(false);

  const contentW = HEAD_W + project.durationSeconds * PX_PER_SECOND;
  const height = RULER_H + project.tracks.length * TRACK_H;

  /**
   * Pull real frames and peaks. Filmstrip extraction reports progress so the
   * clip fills in as cells land rather than staying empty until it finishes.
   */
  useEffect(() => {
    let alive = true;
    const audioSrcs = Array.from(new Set(project.clips.filter(c => c.kind === 'audio' && c.src).map(c => c.src!)));

    project.clips.filter(c => c.kind === 'video' && c.src).forEach((clip) => {
      const src = clip.src!;
      extractFilmstrip(src, {
        onProgress: (canvas) => { if (alive) setStrips(p => ({ ...p, [src]: canvas })); },
      }).then(async (canvas) => {
        if (!alive) return;
        if (canvas) { setStrips(p => ({ ...p, [src]: canvas })); return; }
        // No decoder for this clip — tile its poster so the track still reads.
        if (clip.posterSrc) {
          const fallback = await extractImageStrip(clip.posterSrc);
          if (alive && fallback) setStrips(p => ({ ...p, [src]: fallback }));
        }
      });
    });
    audioSrcs.forEach((src) => {
      extractWaveform(src).then((p) => { if (alive) setPeaks(prev => ({ ...prev, [src]: p })); });
    });

    return () => { alive = false; };
  }, [project]);

  // One canvas for the whole timeline, as TimelineCanvasNle does.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.round(contentW * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    canvas.style.width = `${contentW}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.textBaseline = 'middle';

    ctx.fillStyle = STAGE;
    ctx.fillRect(0, 0, contentW, height);

    // Ruler
    ctx.fillStyle = BAR;
    ctx.fillRect(0, 0, contentW, RULER_H);
    ctx.font = '9px ui-monospace, Menlo, monospace';
    for (let s = 0; s <= project.durationSeconds; s += 1) {
      const x = HEAD_W + s * PX_PER_SECOND;
      ctx.strokeStyle = LINE;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, s % 5 === 0 ? 0 : RULER_H - 9);
      ctx.lineTo(x + 0.5, RULER_H);
      ctx.stroke();
      if (s % 2 === 0) {
        ctx.fillStyle = '#71717a';
        ctx.fillText(`${s}s`, x + 4, 11);
      }
    }

    // Lanes and clips
    project.tracks.forEach((track, ti) => {
      const top = RULER_H + ti * TRACK_H;
      if (ti % 2) {
        ctx.fillStyle = 'rgba(255,255,255,0.015)';
        ctx.fillRect(HEAD_W, top, contentW - HEAD_W, TRACK_H);
      }
      ctx.strokeStyle = LINE;
      ctx.beginPath();
      ctx.moveTo(0, top + TRACK_H + 0.5);
      ctx.lineTo(contentW, top + TRACK_H + 0.5);
      ctx.stroke();

      project.clips.filter(c => c.track === track.id).forEach((clip) => {
        const x = HEAD_W + clip.start * PX_PER_SECOND;
        const w = clip.length * PX_PER_SECOND - 3;
        const y = top + 6;
        const h = TRACK_H - 12;
        const tone = CLIP_TONE[clip.kind];

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 5);
        ctx.clip();
        ctx.fillStyle = tone.fill;
        ctx.fillRect(x, y, w, h);

        const strip = clip.src ? strips[clip.src] : null;
        if (clip.kind === 'video' && strip) {
          // The strip spans the whole source; scale it to the clip's width so
          // frames read left-to-right across the clip.
          const scale = h / strip.height;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(strip, 0, 0, strip.width, strip.height, x, y, Math.max(w, strip.width * scale * 0 + w), h);
        } else if (clip.kind === 'audio' && clip.src && peaks[clip.src]) {
          const p = peaks[clip.src];
          const mid = y + h / 2;
          ctx.strokeStyle = 'rgba(165,180,252,0.9)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let px = 0; px < w; px += 1) {
            const amp = (p[Math.floor((px / w) * p.length)] || 0) * (h / 2 - 3);
            ctx.moveTo(x + px + 0.5, mid - amp);
            ctx.lineTo(x + px + 0.5, mid + amp);
          }
          ctx.stroke();
        }
        ctx.restore();

        ctx.strokeStyle = tone.border;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, 5);
        ctx.stroke();

        // Label sits on a plate so it stays readable over footage.
        ctx.font = '600 10px Inter, system-ui, sans-serif';
        const plateW = Math.min(ctx.measureText(clip.label).width + 10, w - 8);
        if (plateW > 22) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(x + 4, y + 4, plateW, 15, 3);
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fill();
          ctx.clip();
          ctx.fillStyle = tone.text;
          ctx.fillText(clip.label, x + 9, y + 12);
          ctx.restore();
        }
      });
    });

    // Track heads last, so nothing bleeds under them.
    ctx.fillStyle = BAR;
    ctx.fillRect(0, 0, HEAD_W, height);
    ctx.strokeStyle = LINE;
    ctx.beginPath();
    ctx.moveTo(HEAD_W + 0.5, 0);
    ctx.lineTo(HEAD_W + 0.5, height);
    ctx.stroke();
    ctx.font = '600 10.5px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#a1a1aa';
    project.tracks.forEach((track, ti) => {
      ctx.fillText(track.label, 12, RULER_H + ti * TRACK_H + TRACK_H / 2);
    });

    // Playhead
    const px = HEAD_W + playhead * PX_PER_SECOND;
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(px - 0.75, 0, 1.5, height);
    ctx.beginPath();
    ctx.roundRect(px - 5, 0, 10, 10, 2);
    ctx.fill();
  }, [project, playhead, strips, peaks, contentW, height]);

  // Program monitor scrubs the real file, so the frame matches the timecode.
  const monitorClip = useMemo(
    () => project.clips.find(c => c.kind === 'video' && c.src && playhead >= c.start && playhead < c.start + c.length)
      ?? project.clips.find(c => c.kind === 'video' && c.src),
    [project, playhead],
  );

  useEffect(() => {
    const el = monitorRef.current;
    if (!el || !monitorClip) return;
    const target = (monitorClip.sourceIn ?? 0) + Math.max(0, playhead - monitorClip.start);
    const apply = () => { try { el.currentTime = target; } catch { /* ignore */ } };
    if (el.readyState >= 1) apply();
    else el.addEventListener('loadedmetadata', apply, { once: true });
  }, [monitorClip, playhead]);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: STAGE }}>
      <div style={{ flexShrink: 0, height: 150, borderBottom: `1px solid ${LINE}`, background: '#000', position: 'relative' }}>
        {monitorClip?.src && (
          <video
            ref={monitorRef}
            key={monitorClip.src}
            src={monitorClip.src}
            poster={monitorClip.posterSrc}
            muted
            playsInline
            preload="auto"
            onError={() => setMonitorFailed(true)}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'contain', opacity: monitorFailed ? 0 : 1,
            }}
          />
        )}
        {monitorFailed && monitorClip?.posterSrc && (
          <img
            src={monitorClip.posterSrc}
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
        <span style={{
          position: 'absolute', left: 8, bottom: 8, borderRadius: 5,
          background: 'rgba(0,0,0,0.72)', padding: '2px 7px',
          fontSize: 10, fontWeight: 600, color: '#e4e4e7',
          fontFamily: 'ui-monospace, Menlo, monospace', fontVariantNumeric: 'tabular-nums',
        }}>
          {String(Math.floor(playhead / 60)).padStart(2, '0')}:{String(Math.floor(playhead % 60)).padStart(2, '0')}:
          {String(Math.floor((playhead % 1) * project.fps)).padStart(2, '0')}
        </span>
      </div>

      <div className="Trooper-scrollbar" style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
        <canvas ref={canvasRef} style={{ display: 'block' }} />
      </div>

      <div style={{
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, height: 30,
        padding: '0 12px', borderTop: `1px solid ${LINE}`, background: BAR,
      }}>
        <Scissors size={12} color="#71717a" strokeWidth={2} />
        <span style={{ fontSize: 10, color: '#71717a' }}>Blade</span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: '#71717a', fontVariantNumeric: 'tabular-nums' }}>
          Snap on · {project.fps}fps
        </span>
      </div>
    </div>
  );
}

export function DemoVideoWorkspace({
  project,
  stage,
  playhead,
  scenesReady,
}: {
  project: DemoVideoProject;
  stage: 'storyboard' | 'timeline';
  playhead: number;
  scenesReady: number;
}) {
  return (
    <div data-demo-target="video-workspace" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: STAGE }}>
      <Toolbar stage={stage} project={project} />
      {stage === 'storyboard'
        ? <Storyboard project={project} revealed={scenesReady} />
        : <Timeline project={project} playhead={playhead} />}
    </div>
  );
}
