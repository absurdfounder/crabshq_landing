'use client';

import { Clapperboard, Pencil, Plus, Scissors, Volume2, Type as TypeIcon, Eye } from 'lucide-react';
import type { DemoVideoProject } from '@/components/demoTaskExecution';
import { DUR, EASE_OUT } from '@/lib/demoMotion';

/**
 * Video workspace, mirroring the app's `video/board/StoryboardBoard.jsx` and
 * `video/timeline/TimelineCanvasNle.jsx` — the dark stage, scene artboards,
 * then a real NLE with a ruler, stacked tracks, clips and a playhead.
 */

const STAGE = '#121212';
const BAR = '#161616';
const LINE = 'rgba(255,255,255,0.07)';
const ACCENT = '#37d178';
const RULER_H = 32;
const TRACK_H = 56;

const TRACK_ICON = { video: Eye, audio: Volume2, text: TypeIcon } as const;
const CLIP_TONE = {
  video: { bg: 'rgba(55,209,120,0.16)', border: 'rgba(55,209,120,0.5)', text: '#9ff5c4' },
  audio: { bg: 'rgba(129,140,248,0.16)', border: 'rgba(129,140,248,0.5)', text: '#c7cbfd' },
  text: { bg: 'rgba(251,191,36,0.16)', border: 'rgba(251,191,36,0.5)', text: '#fde68a' },
} as const;

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
                {ready
                  ? <div style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html: scene.svg }} />
                  : <div className="demo-shimmer" style={{ position: 'absolute', inset: 0, opacity: 0.16 }} />}
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
                <div style={{ fontSize: 10, color: '#71717a' }}>
                  {ready ? 'Ready' : 'Generating…'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Timeline({ project, playhead }: { project: DemoVideoProject; playhead: number }) {
  const pxPerSecond = 46;
  const width = project.durationSeconds * pxPerSecond;
  const ticks = Array.from({ length: project.durationSeconds + 1 }, (_, s) => s);

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', background: STAGE }}>
      {/* Program monitor — the frame under the playhead */}
      <div style={{ flexShrink: 0, height: 132, borderBottom: `1px solid ${LINE}`, background: '#0a0a0a', position: 'relative' }}>
        {(() => {
          const scene = project.scenes[Math.min(
            project.scenes.length - 1,
            Math.floor((playhead / Math.max(1, project.durationSeconds)) * project.scenes.length),
          )];
          return scene ? <div style={{ position: 'absolute', inset: 0 }} dangerouslySetInnerHTML={{ __html: scene.svg }} /> : null;
        })()}
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

      <div className="Trooper-scrollbar" style={{ flex: 1, minHeight: 0, overflow: 'auto', position: 'relative' }}>
        <div style={{ display: 'flex', minWidth: 'min-content' }}>
          {/* Track head rail — mute/hide controls, as in the app */}
          <div style={{ width: 84, flexShrink: 0, position: 'sticky', left: 0, zIndex: 2, background: BAR, borderRight: `1px solid ${LINE}` }}>
            <div style={{ height: RULER_H, borderBottom: `1px solid ${LINE}` }} />
            {project.tracks.map((track) => {
              const Icon = TRACK_ICON[track.kind];
              return (
                <div key={track.id} style={{
                  height: TRACK_H, display: 'flex', alignItems: 'center', gap: 6, padding: '0 9px',
                  borderBottom: `1px solid ${LINE}`,
                }}>
                  <Icon size={12} color="#a1a1aa" strokeWidth={2} />
                  <span style={{ fontSize: 10.5, fontWeight: 600, color: '#a1a1aa' }}>{track.label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ position: 'relative', width, flexShrink: 0 }}>
            {/* Ruler */}
            <div style={{ height: RULER_H, borderBottom: `1px solid ${LINE}`, position: 'relative', background: BAR }}>
              {ticks.map((s) => (
                <span key={s} style={{ position: 'absolute', left: s * pxPerSecond, top: 0, height: '100%', borderLeft: `1px solid ${LINE}` }}>
                  <span style={{ position: 'absolute', left: 4, top: 8, fontSize: 9, color: '#71717a', fontVariantNumeric: 'tabular-nums' }}>
                    {s}s
                  </span>
                </span>
              ))}
            </div>

            {/* Tracks + clips */}
            {project.tracks.map((track) => (
              <div key={track.id} style={{ height: TRACK_H, borderBottom: `1px solid ${LINE}`, position: 'relative', background: track.id % 2 ? 'rgba(255,255,255,0.012)' : 'transparent' }}>
                {ticks.map((s) => (
                  <span key={s} style={{ position: 'absolute', left: s * pxPerSecond, top: 0, height: '100%', borderLeft: `1px solid rgba(255,255,255,0.035)` }} />
                ))}
                {project.clips.filter(c => c.track === track.id).map((clip) => {
                  const tone = CLIP_TONE[clip.kind];
                  const landed = clip.start <= playhead + 0.01;
                  return (
                    <div
                      key={clip.id}
                      style={{
                        position: 'absolute', left: clip.start * pxPerSecond, top: 6,
                        width: clip.length * pxPerSecond - 3, height: TRACK_H - 12,
                        borderRadius: 5, border: `1px solid ${tone.border}`, background: tone.bg,
                        display: 'flex', alignItems: 'center', padding: '0 7px', overflow: 'hidden',
                        opacity: landed ? 1 : 0,
                        transform: landed ? 'none' : 'translateY(4px)',
                        transition: `opacity ${DUR.panel}ms ${EASE_OUT}, transform ${DUR.panel}ms ${EASE_OUT}`,
                      }}
                    >
                      <span style={{ fontSize: 10, fontWeight: 600, color: tone.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {clip.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Playhead */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, width: 0, zIndex: 3,
              transform: `translateX(${playhead * pxPerSecond}px)`,
              transition: `transform ${DUR.panel}ms linear`,
              pointerEvents: 'none',
            }}>
              <div style={{ position: 'absolute', top: 0, bottom: 0, width: 1.5, background: '#ef4444' }} />
              <div style={{ position: 'absolute', top: 0, left: -5, width: 12, height: 10, borderRadius: '2px 2px 4px 4px', background: '#ef4444' }} />
            </div>
          </div>
        </div>
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
