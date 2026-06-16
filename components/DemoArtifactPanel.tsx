'use client';

import { FileText, Download, Layers, Play, Image as ImageIcon, Film } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import type { DemoArtifact, DemoArtifactKind } from './demoTaskExecution';

function inferKind(artifact: DemoArtifact): DemoArtifactKind {
  if (artifact.kind) return artifact.kind;
  const ext = artifact.ext ?? artifact.name.split('.').pop() ?? '';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return 'image';
  if (['mp4', 'mov', 'webm'].includes(ext)) return 'video';
  if (ext === 'md') return 'markdown';
  if (ext === 'diff') return 'diff';
  return 'code';
}

function DiffPreview({ content }: { content: string }) {
  return (
    <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, lineHeight: 1.55 }}>
      {content.split('\n').map((line, i) => {
        const add = line.startsWith('+') && !line.startsWith('+++');
        const del = line.startsWith('-') && !line.startsWith('---');
        return (
          <div
            key={i}
            style={{
              padding: '1px 8px',
              background: add ? 'rgba(63,107,0,0.08)' : del ? 'rgba(220,38,38,0.06)' : 'transparent',
              color: add ? '#325600' : del ? '#991B1B' : C.textMuted,
              whiteSpace: 'pre-wrap',
            }}
          >
            {line || ' '}
          </div>
        );
      })}
    </div>
  );
}

function HtmlPreview({ content }: { content: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 280 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px',
        borderBottom: `1px solid ${C.border}`, background: '#F5F5F4', fontSize: 10, color: C.textSubtle,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840' }} />
        Live preview
      </div>
      <iframe
        title="Artifact preview"
        srcDoc={content}
        sandbox="allow-same-origin"
        style={{ flex: 1, width: '100%', border: 'none', background: '#fff', minHeight: 240 }}
      />
    </div>
  );
}

function ImagePreview({ artifact }: { artifact: DemoArtifact }) {
  const isSvg = artifact.content.trim().startsWith('<svg');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, height: '100%', background: 'linear-gradient(135deg, #F5F5F4 0%, #FAF9F6 100%)' }}>
      <div style={{
        width: '100%', maxWidth: 320, borderRadius: 12, overflow: 'hidden',
        border: `1px solid ${C.border}`, background: C.card, boxShadow: '0 12px 32px -12px rgba(28,25,23,0.15)',
      }}>
        {isSvg ? (
          <div dangerouslySetInnerHTML={{ __html: artifact.content }} style={{ width: '100%', aspectRatio: '16/10' }} />
        ) : (
          <div style={{
            aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg, #3f6b00 0%, #6d9220 50%, #1c1917 100%)',
          }}>
            <ImageIcon size={32} color="rgba(255,255,255,0.7)" strokeWidth={1.25} />
          </div>
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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: 16, background: '#1c1917' }}>
      <div style={{
        flex: 1, borderRadius: 10, overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(160deg, #292524 0%, #1c1917 60%, #3f6b00 120%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.12)',
          border: '2px solid rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
        </div>
        <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
          <div style={{ height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
            <div style={{ width: '42%', height: '100%', background: C.brand, borderRadius: 999 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>
            <span>0:14</span><span>0:32</span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Film size={14} color="#a8a29e" />
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#fafaf9' }}>{artifact.name}</div>
          {artifact.caption && <div style={{ fontSize: 10, color: '#a8a29e', marginTop: 2 }}>{artifact.caption}</div>}
        </div>
      </div>
      <pre style={{
        marginTop: 10, fontSize: 10, lineHeight: 1.5, color: '#d6d3d1', whiteSpace: 'pre-wrap',
        fontFamily: 'ui-monospace, Menlo, monospace', maxHeight: 80, overflow: 'auto',
      }}>
        {artifact.content}
      </pre>
    </div>
  );
}

function MarkdownPreview({ content }: { content: string }) {
  return (
    <div style={{ padding: 16, fontSize: 12, lineHeight: 1.65, color: C.text }}>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# ')) return <h1 key={i} style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{line.slice(2)}</h1>;
        if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: 13, fontWeight: 700, margin: '12px 0 6px', color: C.textMuted }}>{line.slice(3)}</h2>;
        if (line.startsWith('- ')) return <li key={i} style={{ marginLeft: 16, marginBottom: 4, color: C.textMuted }}>{line.slice(2)}</li>;
        if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
        return <p key={i} style={{ margin: '0 0 6px', color: C.textMuted }}>{line}</p>;
      })}
    </div>
  );
}

function ArtifactBody({ artifact }: { artifact: DemoArtifact }) {
  const kind = inferKind(artifact);
  switch (kind) {
    case 'html': return <HtmlPreview content={artifact.content} />;
    case 'image': return <ImagePreview artifact={artifact} />;
    case 'video': return <VideoPreview artifact={artifact} />;
    case 'diff': return <DiffPreview content={artifact.content} />;
    case 'markdown': return <MarkdownPreview content={artifact.content} />;
    default:
      return (
        <pre style={{
          margin: 0, fontSize: 11.5, lineHeight: 1.6, color: C.text,
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', whiteSpace: 'pre-wrap',
        }}>
          {artifact.content}
        </pre>
      );
  }
}

export function DemoArtifactPanel({ artifact }: { artifact: DemoArtifact | null }) {
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

  const kind = inferKind(artifact);
  const tabLabel = kind === 'html' ? 'Preview' : kind === 'image' ? 'Image' : kind === 'video' ? 'Video' : 'IDE';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: 0, background: C.card }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
        borderBottom: `1px solid ${C.border}`, background: '#FAFAF9', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${C.border}`, padding: 2, background: '#F5F5F4' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: 4, padding: '3px 9px', borderRadius: 6,
            fontSize: 11, fontWeight: 600, background: C.card, color: C.text,
          }}>
            <Layers size={12} strokeWidth={1.75} /> {tabLabel}
          </span>
        </div>
        <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: C.textMuted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {artifact.name}
        </span>
        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 6, border: `1px solid ${C.border}`, background: C.card, fontSize: 10, color: C.textMuted, cursor: 'pointer' }}>
          <Download size={11} strokeWidth={1.75} /> Download
        </button>
      </div>
      <div className="Trooper-scrollbar" style={{ flex: 1, overflow: 'auto', padding: kind === 'html' || kind === 'image' || kind === 'video' ? 0 : 14 }}>
        <ArtifactBody artifact={artifact} />
      </div>
    </div>
  );
}
