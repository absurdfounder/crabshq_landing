'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FileText, Download, Layers, Play, Film, Eye, Code, Globe, GitCompare, FileCode, ChevronDown, ChevronRight, MessageSquarePlus } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact, DemoArtifactKind } from './demoTaskExecution';
import { DemoReviewComposer, DemoSelectableLine } from './DemoReviewOverlay';
import type { ArtifactReviewState } from '@/lib/demoArtifactReview';
import {
  parseDemoDiff,
  displayDiffPath,
  diffFileBasename,
  diffFileFolder,
  type DiffFile,
} from '@/lib/demoDiffPreview';
import { DemoBrowserFrame } from './DemoBrowserChrome';

type ArtifactTab = 'browser' | 'preview' | 'diff' | 'code' | 'ide';

function inferKind(artifact: DemoArtifact): DemoArtifactKind {
  if (artifact.kind) return artifact.kind;
  const ext = artifact.ext ?? artifact.name.split('.').pop() ?? '';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'webm'].includes(ext)) return 'video';
  if (ext === 'md') return 'markdown';
  if (ext === 'diff') return 'diff';
  if (ext === 'log') return 'code';
  return 'code';
}

function defaultTab(artifact: DemoArtifact, kind: DemoArtifactKind): ArtifactTab {
  if (kind === 'diff') return 'diff';
  if (kind === 'html' && artifact.browserUrl) return 'browser';
  if (kind === 'html') return 'preview';
  return 'ide';
}

function availableTabs(artifact: DemoArtifact, kind: DemoArtifactKind): ArtifactTab[] {
  if (kind === 'diff') return ['diff', 'code'];
  if (kind === 'html') {
    if (artifact.browserUrl) return ['browser', 'preview', 'code'];
    return ['preview', 'code'];
  }
  return ['ide'];
}

function tabLabel(tab: ArtifactTab): string {
  switch (tab) {
    case 'browser': return 'Browser';
    case 'preview': return 'Preview';
    case 'diff': return 'Diff';
    case 'code': return 'Code';
    default: return 'IDE';
  }
}

function tabIcon(tab: ArtifactTab) {
  switch (tab) {
    case 'browser': return Globe;
    case 'preview': return Eye;
    case 'diff': return GitCompare;
    case 'code': return Code;
    default: return Layers;
  }
}

function DiffStatsBadges({ additions, deletions, compact }: { additions: number; deletions: number; compact?: boolean }) {
  const fs = compact ? 9 : 10;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
      {additions > 0 && (
        <span style={{
          borderRadius: 4, background: '#ecfdf5', color: '#047857',
          padding: compact ? '1px 4px' : '2px 6px', fontSize: fs, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
        }}>
          +{additions}
        </span>
      )}
      {deletions > 0 && (
        <span style={{
          borderRadius: 4, background: '#fef2f2', color: '#dc2626',
          padding: compact ? '1px 4px' : '2px 6px', fontSize: fs, fontWeight: 600, fontVariantNumeric: 'tabular-nums',
        }}>
          −{deletions}
        </span>
      )}
    </span>
  );
}

function DiffFileHeader({ file, expanded, onToggle, compact }: {
  file: DiffFile;
  expanded: boolean;
  onToggle: () => void;
  compact?: boolean;
}) {
  const path = displayDiffPath(file);
  const basename = diffFileBasename(path);
  const folder = diffFileFolder(path);

  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: compact ? 6 : 10,
        width: '100%', padding: compact ? '6px 8px' : '8px 12px', border: 'none', cursor: 'pointer',
        background: 'transparent', textAlign: 'left',
      }}
    >
      <span style={{ marginTop: 3, color: '#a8a29e', flexShrink: 0 }}>
        {expanded ? <ChevronDown size={compact ? 10 : 12} /> : <ChevronRight size={compact ? 10 : 12} />}
      </span>
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: compact ? 24 : 32, height: compact ? 24 : 32, borderRadius: 8,
        background: '#fafaf9', border: `1px solid ${C.border}`, flexShrink: 0,
      }}>
        <FileCode size={compact ? 12 : 14} color="#a8a29e" strokeWidth={1.75} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: compact ? 9 : 11, fontWeight: 600, color: C.text, lineHeight: 1.35,
          wordBreak: 'break-all',
        }}>
          {basename}
        </div>
        {folder && !compact && (
          <div style={{ fontSize: 10, color: C.textSubtle, marginTop: 2, wordBreak: 'break-all' }}>{folder}</div>
        )}
      </span>
      <DiffStatsBadges additions={file.additions} deletions={file.deletions} compact={compact} />
    </button>
  );
}

function DiffFileBody({ file, compact }: { file: DiffFile; compact?: boolean }) {
  const fs = compact ? 8.5 : 11;
  const lh = compact ? 1.45 : 1.55;

  return (
    <div style={{ overflowX: 'auto', borderTop: `1px solid ${C.border}`, background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: fs, lineHeight: lh }}>
        <colgroup>
          <col style={{ width: compact ? 28 : 40 }} />
          <col style={{ width: compact ? 28 : 40 }} />
          <col style={{ width: compact ? 14 : 20 }} />
          <col />
        </colgroup>
        <tbody>
          {file.hunks.flatMap((hunk, hi) =>
            hunk.lines.map((line, li) => {
              if (line.type === 'header') {
                return (
                  <tr key={`${hi}-${li}`}>
                    <td colSpan={4} style={{ padding: compact ? '2px 6px' : '4px 12px', background: '#fafaf9', color: C.textSubtle, fontSize: compact ? 8 : 10 }}>
                      {line.content}
                    </td>
                  </tr>
                );
              }
              const rowBg = line.type === 'addition' ? 'rgba(16,185,129,0.08)' : line.type === 'deletion' ? 'rgba(239,68,68,0.06)' : 'transparent';
              const markerColor = line.type === 'addition' ? '#047857' : line.type === 'deletion' ? '#dc2626' : 'transparent';
              const marker = line.type === 'addition' ? '+' : line.type === 'deletion' ? '−' : ' ';
              return (
                <tr key={`${hi}-${li}`} style={{ background: rowBg }}>
                  <td style={{ padding: compact ? '0 4px' : '0 8px', textAlign: 'right', color: C.textSubtle, fontSize: compact ? 7.5 : 10, borderRight: `1px solid ${C.border}`, userSelect: 'none' }}>
                    {line.type !== 'addition' ? line.oldLine : ''}
                  </td>
                  <td style={{ padding: compact ? '0 4px' : '0 8px', textAlign: 'right', color: C.textSubtle, fontSize: compact ? 7.5 : 10, borderRight: `1px solid ${C.border}`, userSelect: 'none' }}>
                    {line.type !== 'deletion' ? line.newLine : ''}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 600, color: markerColor, userSelect: 'none' }}>{marker}</td>
                  <td style={{ padding: compact ? '0 4px 0 2px' : '1px 12px 1px 4px', color: C.text, whiteSpace: compact ? 'pre-wrap' : 'pre', wordBreak: compact ? 'break-word' : undefined, overflow: compact ? 'visible' : 'hidden', textOverflow: compact ? undefined : 'ellipsis' }}>
                    {line.content || ' '}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

function DiffFileSection({ file, defaultExpanded, compact }: { file: DiffFile; defaultExpanded?: boolean; compact?: boolean }) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? !compact);
  return (
    <div style={{
      overflow: 'hidden', borderRadius: compact ? 6 : 10, background: '#fff',
      border: `1px solid ${C.border}`, boxShadow: compact ? 'none' : '0 1px 2px rgba(0,0,0,0.02)',
    }}>
      <DiffFileHeader file={file} expanded={expanded} onToggle={() => setExpanded(v => !v)} compact={compact} />
      {expanded && <DiffFileBody file={file} compact={compact} />}
    </div>
  );
}

function UnifiedDiffPreview({ content, compact }: { content: string; compact?: boolean }) {
  const files = useMemo(() => parseDemoDiff(content), [content]);
  if (!files.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6, padding: compact ? 4 : 10 }}>
      {files.map((file, i) => (
        <DiffFileSection key={`${displayDiffPath(file)}-${i}`} file={file} defaultExpanded={i === 0} compact={compact} />
      ))}
    </div>
  );
}

function HtmlPreview({ artifact, mode, compact }: { artifact: DemoArtifact; mode: 'browser' | 'preview'; compact?: boolean }) {
  const src = artifact.src;
  const browserUrl = artifact.browserUrl;

  if (mode === 'browser' && (browserUrl || src)) {
    return (
      <DemoBrowserFrame
        src={src || undefined}
        addressUrl={browserUrl}
        faviconDomain={artifact.faviconDomain}
        compact={compact}
        title={artifact.name}
      />
    );
  }

  return (
    <DemoBrowserFrame
      srcDoc={artifact.content || undefined}
      src={!artifact.content && src ? src : undefined}
      addressUrl={browserUrl || artifact.name}
      faviconDomain={artifact.faviconDomain}
      compact={compact}
      title={artifact.name}
    />
  );
}

function ImagePreview({ artifact }: { artifact: DemoArtifact }) {
  const src = artifact.src;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, height: '100%', background: 'linear-gradient(135deg, #F5F5F4 0%, #FAF9F6 100%)' }}>
      <div style={{
        width: '100%', maxWidth: 360, borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${C.border}`, background: C.card, boxShadow: '0 12px 32px -12px rgba(28,25,23,0.15)',
      }}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={artifact.caption ?? artifact.name}
            style={{ width: '100%', display: 'block', aspectRatio: '16/10', objectFit: 'cover' }}
          />
        ) : (
          <pre style={{ margin: 0, padding: 12, fontSize: 10, color: C.textSubtle }}>{artifact.content.slice(0, 200)}</pre>
        )}
        <div style={{ padding: '10px 12px', borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{artifact.name}</div>
          {artifact.caption && (
            <div style={{ fontSize: 10, color: C.textSubtle, marginTop: 4, lineHeight: 1.45 }}>{artifact.caption}</div>
          )}
        </div>
      </div>
    </div>
  );
}

function VideoPreview({ artifact }: { artifact: DemoArtifact }) {
  const poster = artifact.posterSrc;
  const videoSrc = artifact.src && ['mp4', 'mov', 'webm'].includes(artifact.ext ?? '') ? artifact.src : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, background: '#1c1917' }}>
      <div style={{
        flex: 1, borderRadius: 10, overflow: 'hidden', position: 'relative',
        background: '#292524', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200,
      }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            poster={poster}
            controls
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        ) : (
          <>
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={poster}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
            )}
            <div style={{
              position: 'relative', zIndex: 1,
              width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
            </div>
            <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, zIndex: 1 }}>
              <div style={{ height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
                <div style={{ width: '42%', height: '100%', background: C.brand, borderRadius: 999 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: 'rgba(255,255,255,0.65)' }}>
                <span>0:14</span><span>0:30</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Film size={14} color="#a8a29e" />
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#fafaf9' }}>{artifact.name}</div>
          {artifact.caption && <div style={{ fontSize: 10, color: '#a8a29e', marginTop: 2 }}>{artifact.caption}</div>}
        </div>
      </div>
      {artifact.content && (
        <pre style={{
          marginTop: 10, fontSize: 10, lineHeight: 1.5, color: '#d6d3d1', whiteSpace: 'pre-wrap',
          fontFamily: 'ui-monospace, Menlo, monospace', maxHeight: 80, overflow: 'auto',
        }}>
          {artifact.content}
        </pre>
      )}
    </div>
  );
}

function TerminalPreview({
  content,
  review,
}: {
  content: string;
  review?: ArtifactReviewState | null;
}) {
  const lines = content.split('\n');
  const selectedLines = review && review.phase !== 'idle' ? review.selectedLines : [];
  const selectedSet = new Set(selectedLines);
  const showComposer = review?.phase === 'composing';

  return (
    <div
      data-demo-target="modal-artifact-content"
      style={{
        background: '#1c1917',
        minHeight: 240,
        padding: '12px 14px',
        fontFamily: 'ui-monospace, Menlo, monospace',
        fontSize: 11,
        lineHeight: 1.55,
        position: 'relative',
      }}
    >
      {lines.map((line, i) => (
        <DemoSelectableLine
          key={i}
          line={line}
          index={i}
          selected={selectedSet.has(i)}
          selectedLines={selectedLines}
          lineColor={
            line.includes('PASS') || line.includes('passed') || line.includes('✓')
              ? '#86efac'
              : line.startsWith('$')
                ? '#fafaf9'
                : '#a8a29e'
          }
        />
      ))}
      {showComposer && review?.draftText && (
        <DemoReviewComposer draftText={review.draftText} />
      )}
    </div>
  );
}

function CodePreview({
  content,
  review,
}: {
  content: string;
  review?: ArtifactReviewState | null;
}) {
  const lines = content.split('\n');
  const selectedLines = review && review.phase !== 'idle' ? review.selectedLines : [];
  const selectedSet = new Set(selectedLines);
  const showComposer = review?.phase === 'composing';

  return (
    <div data-demo-target="modal-artifact-content" style={{ position: 'relative' }}>
      <pre
        style={{
          margin: 0,
          fontSize: 11.5,
          lineHeight: 1.6,
          color: C.text,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          whiteSpace: 'pre-wrap',
        }}
      >
        {lines.map((line, i) => (
          <DemoSelectableLine
            key={i}
            line={line}
            index={i}
            selected={selectedSet.has(i)}
            selectedLines={selectedLines}
            lineColor={C.text}
          />
        ))}
      </pre>
      {showComposer && review?.draftText && (
        <DemoReviewComposer draftText={review.draftText} />
      )}
    </div>
  );
}

function MarkdownPreview({
  content,
  review,
}: {
  content: string;
  review?: ArtifactReviewState | null;
}) {
  const lines = content.split('\n');
  const selectedLines = review && review.phase !== 'idle' ? review.selectedLines : [];
  const selectedSet = new Set(selectedLines);
  const showComposer = review?.phase === 'composing';

  return (
    <div data-demo-target="modal-artifact-content" style={{ padding: 16, fontSize: 12, lineHeight: 1.65, color: C.text, position: 'relative' }}>
      {lines.map((line, i) => {
        const selected = selectedSet.has(i);
        const wrap = (node: ReactNode) => (
          <div key={i} style={selected ? { margin: '0 -8px', padding: '0 8px' } : undefined}>
            {selected ? (
              <DemoSelectableLine
                line={typeof node === 'string' ? node : line}
                index={i}
                selected
                selectedLines={selectedLines}
                lineColor={C.textMuted}
              />
            ) : node}
          </div>
        );

        if (line.startsWith('# ')) return wrap(<h1 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{line.slice(2)}</h1>);
        if (line.startsWith('## ')) return wrap(<h2 style={{ fontSize: 13, fontWeight: 700, margin: '12px 0 6px', color: C.textMuted }}>{line.slice(3)}</h2>);
        if (line.startsWith('- ')) {
          if (selected) {
            return (
              <DemoSelectableLine
                key={i}
                line={line}
                index={i}
                selected
                selectedLines={selectedLines}
                lineColor={C.textMuted}
              />
            );
          }
          return <li key={i} style={{ marginLeft: 16, marginBottom: 4, color: C.textMuted }}>{line.slice(2)}</li>;
        }
        if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
        if (selected) {
          return (
            <DemoSelectableLine
              key={i}
              line={line}
              index={i}
              selected
              selectedLines={selectedLines}
              lineColor={C.textMuted}
            />
          );
        }
        return <p key={i} style={{ margin: '0 0 6px', color: C.textMuted }}>{line}</p>;
      })}
      {showComposer && review?.draftText && (
        <DemoReviewComposer draftText={review.draftText} />
      )}
    </div>
  );
}

function ArtifactBody({
  artifact,
  tab,
  compact,
  review,
}: {
  artifact: DemoArtifact;
  tab: ArtifactTab;
  compact?: boolean;
  review?: ArtifactReviewState | null;
}) {
  const kind = inferKind(artifact);

  if (kind === 'diff') {
    if (tab === 'code' || (review && review.phase !== 'idle')) {
      return <CodePreview content={artifact.content} review={review} />;
    }
    return <UnifiedDiffPreview content={artifact.content} compact={compact} />;
  }

  if (kind === 'html') {
    if (tab === 'code') return <CodePreview content={artifact.content} review={review} />;
    if (tab === 'browser' || tab === 'preview') {
      return <HtmlPreview artifact={artifact} mode={tab === 'browser' ? 'browser' : 'preview'} compact={compact} />;
    }
  }

  switch (kind) {
    case 'image': return <ImagePreview artifact={artifact} />;
    case 'video': return <VideoPreview artifact={artifact} />;
    case 'markdown': return <MarkdownPreview content={artifact.content} review={review} />;
    default:
      if (artifact.ext === 'log' || artifact.name.endsWith('.log')) {
        return <TerminalPreview content={artifact.content} review={review} />;
      }
      return <CodePreview content={artifact.content} review={review} />;
  }
}

/** Compact tile preview for canvas — legible at small scale without scaling the full panel */
export function DemoArtifactTilePreview({ artifact, canvasTile }: { artifact: DemoArtifact; canvasTile?: boolean }) {
  const kind = inferKind(artifact);
  if (kind === 'diff') {
    return <UnifiedDiffPreview content={artifact.content} compact />;
  }
  if (kind === 'html') {
    return <HtmlPreview artifact={artifact} mode={artifact.browserUrl ? 'browser' : 'preview'} compact />;
  }
  if (kind === 'markdown') {
    return (
      <div style={{ padding: canvasTile ? 10 : 8, fontSize: canvasTile ? 10 : 9, lineHeight: 1.55, color: C.textMuted }}>
        {artifact.content.split('\n').slice(0, canvasTile ? 10 : 6).map((line, i) => (
          <div key={i} style={{ marginBottom: 2, wordBreak: 'break-word' }}>{line.replace(/^#+\s*/, '') || '\u00A0'}</div>
        ))}
      </div>
    );
  }
  if (artifact.ext === 'log' || artifact.name.endsWith('.log')) {
    return (
      <div style={{ background: '#1c1917', minHeight: '100%', padding: canvasTile ? '8px 10px' : '6px 8px', fontFamily: 'ui-monospace, Menlo, monospace', fontSize: canvasTile ? 9 : 8, lineHeight: 1.5 }}>
        {artifact.content.split('\n').slice(0, canvasTile ? 12 : 8).map((line, i) => (
          <div key={i} style={{ color: line.includes('✓') || line.includes('passed') ? '#86efac' : '#a8a29e', wordBreak: 'break-word' }}>{line}</div>
        ))}
      </div>
    );
  }
  return (
    <pre style={{ margin: 0, padding: canvasTile ? 10 : 8, fontSize: canvasTile ? 9 : 8, lineHeight: 1.5, color: C.textMuted, fontFamily: 'ui-monospace, Menlo, monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
      {canvasTile ? artifact.content.slice(0, 480) : artifact.content.slice(0, 200)}
    </pre>
  );
}

export function DemoArtifactPanel({
  artifact,
  compact,
  review,
  hasSavedReview,
}: {
  artifact: DemoArtifact | null;
  compact?: boolean;
  review?: ArtifactReviewState | null;
  hasSavedReview?: boolean;
}) {
  const kind = artifact ? inferKind(artifact) : 'code';
  const tabs = artifact ? availableTabs(artifact, kind) : [];
  const resolvedDefault = artifact ? defaultTab(artifact, kind) : 'ide';
  const [activeTab, setActiveTab] = useState<ArtifactTab>(resolvedDefault);

  useEffect(() => {
    if (artifact) setActiveTab(defaultTab(artifact, inferKind(artifact)));
  }, [artifact?.name]);

  const effectiveTab = tabs.includes(activeTab) ? activeTab : resolvedDefault;

  if (!artifact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', background: C.card }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F5F5F4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <FileText size={20} strokeWidth={1.75} color={C.textSubtle} />
        </div>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.text, margin: 0 }}>No files yet</p>
        <p style={{ fontSize: 11, color: C.textSubtle, marginTop: 6, maxWidth: 220, lineHeight: 1.5 }}>
          Diffs, live pages, images, and video cuts appear here as agents work.
        </p>
      </div>
    );
  }

  if (compact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: C.card }}>
        <DemoArtifactTilePreview artifact={artifact} />
      </div>
    );
  }

  const noPad = kind === 'html' || kind === 'image' || kind === 'video' || kind === 'diff' || artifact.ext === 'log';

  return (
    <div
      data-demo-target="modal-artifact-panel"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: C.card, position: 'relative' }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        {tabs.length > 1 ? (
          <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
            {tabs.map((tab) => {
              const Icon = tabIcon(tab);
              const active = effectiveTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  data-demo-target={active ? 'modal-artifact-tab-active' : undefined}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6,
                    fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: active ? C.card : 'transparent',
                    color: active ? C.text : C.textSubtle,
                    boxShadow: active ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  <Icon size={12} strokeWidth={1.75} /> {tabLabel(tab)}
                </button>
              );
            })}
          </div>
        ) : (
          <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
            <span style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6,
              fontSize: 11, fontWeight: 600, background: C.card, color: C.text,
            }}>
              <Layers size={12} strokeWidth={1.75} /> {tabLabel(effectiveTab)}
            </span>
          </div>
        )}
        <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {artifact.name}
        </span>
        <button
          type="button"
          data-demo-target="modal-artifact-comment-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6,
            border: `1px solid ${hasSavedReview || review?.phase === 'composing' || review?.phase === 'saved' ? C.brand : C.border}`,
            background: hasSavedReview || review?.phase === 'composing' || review?.phase === 'saved' ? '#f0f5e6' : C.card,
            fontSize: 10, color: hasSavedReview || review?.phase === 'composing' || review?.phase === 'saved' ? '#284800' : C.textMuted, cursor: 'pointer',
          }}
        >
          <MessageSquarePlus size={11} strokeWidth={1.75} /> Comment
        </button>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, fontSize: 10, color: C.textMuted, cursor: 'pointer' }}>
          <Download size={11} strokeWidth={1.75} /> Download
        </button>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflow: 'auto', padding: noPad ? 0 : 14, position: 'relative' }}>
        <ArtifactBody artifact={artifact} tab={effectiveTab} review={review} />
      </div>
    </div>
  );
}
