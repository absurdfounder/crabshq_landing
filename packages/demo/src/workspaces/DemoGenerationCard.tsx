'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Image as ImageIcon, Film } from 'lucide-react';
import { TROOPER_DEMO as C } from '../components/demoTheme';
import type { DemoGenerationJob } from '../components/demoTaskExecution';
import { DUR, EASE_OUT } from '../lib/demoMotion';

/**
 * Image / video generation, mirroring `video/AiGenerateDialog.jsx`: the prompt,
 * an image-or-video toggle, the duration, and a running elapsed counter that
 * warns video "can take up to a minute" — then the frame resolves into place.
 */
export function DemoGenerationCard({
  job,
  startedAt,
  runMs,
  done,
}: {
  job: DemoGenerationJob;
  /** performance.now() when the job kicked off; null before it starts. */
  startedAt: number | null;
  runMs: number;
  done: boolean;
}) {
  const [elapsed, setElapsed] = useState(0);
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    if (startedAt === null || done) {
      if (done) setBarProgress(1);
      return;
    }
    const tick = () => {
      const ms = performance.now() - startedAt;
      setElapsed(Math.floor(ms / 1000));
      setBarProgress(Math.min(1, ms / Math.max(1, runMs)));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [startedAt, done, runMs]);

  const running = startedAt !== null && !done;

  const preview = job.posterSrc || job.src;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, background: C.card }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', flexShrink: 0,
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9',
      }}>
        <Sparkles size={13} color={C.brand} strokeWidth={2} />
        <span style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
          {job.kind === 'video' ? 'Generate video' : 'Generate image'}
        </span>
        <span style={{ marginLeft: 'auto', fontSize: 10, color: C.textSubtle }}>{job.model}</span>
      </div>

      <div style={{ padding: '12px 14px', flexShrink: 0, borderBottom: `1px solid ${C.borderWarm}` }}>
        <div style={{
          borderRadius: 9, border: `1px solid ${C.border}`, background: C.bg,
          padding: '8px 10px', fontSize: 12, lineHeight: 1.55, color: C.text,
        }}>
          {job.prompt}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 9 }}>
          {(['image', 'video'] as const).map((k) => {
            const on = job.kind === k;
            const Icon = k === 'image' ? ImageIcon : Film;
            return (
              <span key={k} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 9px',
                borderRadius: 7, fontSize: 10.5, fontWeight: 600,
                border: `1px solid ${on ? C.brand : C.border}`,
                background: on ? C.brandTint : C.card,
                color: on ? C.brandHover : C.textSubtle,
              }}>
                <Icon size={11} strokeWidth={2} />
                {k === 'image' ? 'Image' : 'Video'}
              </span>
            );
          })}
          {job.kind === 'video' && job.seconds && (
            <span style={{ fontSize: 10.5, color: C.textSubtle }}>{job.seconds}s</span>
          )}
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, position: 'relative', background: '#0a0a0c', overflow: 'hidden' }}>
        {/* Poster / progressive preview sits under the progress plate so generation
            never reads as an empty black void + abstract spinner. */}
        {!done && preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt=""
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'saturate(0.85) brightness(0.55)',
              transform: `scale(${1.02 + barProgress * 0.03})`,
              transition: `transform ${DUR.panel}ms ${EASE_OUT}`,
            }}
          />
        )}
        {!done && (
          <div
            className="demo-shimmer"
            style={{
              position: 'absolute', inset: 0,
              opacity: preview ? 0.22 : 0.35,
              pointerEvents: 'none',
            }}
          />
        )}

        {done && (
          <div className="demo-enter" style={{ position: 'absolute', inset: 0 }}>
            {job.kind === 'video' ? (
              <video
                src={job.src}
                poster={job.posterSrc}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={job.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        )}

        {(running || (!done && !preview)) && (
          <div style={{
            position: 'absolute', left: 12, right: 12, bottom: 12,
            borderRadius: 9, background: 'rgba(28,25,23,0.84)', backdropFilter: 'blur(4px)',
            padding: '8px 11px', color: '#fafaf9',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
              <span className="demo-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#fbbf24' }} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>
                {job.kind === 'video' ? 'Generating video…' : 'Generating image…'}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 10, color: 'rgba(250,250,249,0.65)', fontVariantNumeric: 'tabular-nums' }}>
                {elapsed}s{job.kind === 'video' ? ' · up to ~1 min' : ''}
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.16)', overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 999, background: '#fbbf24',
                width: `${Math.round(barProgress * 100)}%`,
                transition: `width ${DUR.panel}ms ${EASE_OUT}`,
              }} />
            </div>
          </div>
        )}

        {done && (
          <div style={{
            position: 'absolute', left: 12, bottom: 12,
            borderRadius: 7, background: 'rgba(28,25,23,0.78)',
            padding: '4px 8px', fontSize: 10.5, fontWeight: 600, color: '#e7e5e4',
          }}>
            Ready
          </div>
        )}
      </div>
    </div>
  );
}
