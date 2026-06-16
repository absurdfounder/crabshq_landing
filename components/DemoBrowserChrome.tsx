'use client';

import { Globe } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import { addressBarFromUrl } from '@/lib/demoDiffPreview';

export function DemoBrowserTitleBar({
  addressText,
  faviconDomain,
  compact,
}: {
  addressText: string;
  faviconDomain?: string;
  compact?: boolean;
}) {
  const h = compact ? 26 : 32;
  const fontSize = compact ? 8 : 10;
  const padX = compact ? 6 : 10;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: compact ? 4 : 8,
      height: h, padding: `0 ${padX}px`, flexShrink: 0,
      borderBottom: `1px solid ${C.border}`,
      background: 'linear-gradient(180deg, #ececec 0%, #dedede 100%)',
    }}>
      <svg width={compact ? 32 : 42} height={compact ? 8 : 10} viewBox="0 0 42 10" aria-hidden style={{ flexShrink: 0 }}>
        <circle cx="5" cy="5" r="4" fill="#ff5f57" />
        <circle cx="21" cy="5" r="4" fill="#febc2e" />
        <circle cx="37" cy="5" r="4" fill="#28c840" />
      </svg>
      <div style={{
        display: 'flex', alignItems: 'center', gap: compact ? 3 : 5,
        flex: 1, minWidth: 0, height: compact ? 18 : 22,
        borderRadius: 6, border: '1px solid rgba(0,0,0,0.12)',
        background: '#fff', padding: '0 8px',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
      }}>
        {faviconDomain ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(faviconDomain)}&sz=32`}
            alt=""
            width={compact ? 10 : 12}
            height={compact ? 10 : 12}
            style={{ flexShrink: 0, borderRadius: 2 }}
          />
        ) : (
          <Globe size={compact ? 10 : 12} color="#78716C" strokeWidth={1.75} style={{ flexShrink: 0 }} />
        )}
        <span style={{
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          textAlign: 'center', fontSize, fontWeight: 500, color: '#57534E',
        }}>
          {addressText}
        </span>
      </div>
    </div>
  );
}

export function DemoBrowserFrame({
  src,
  srcDoc,
  addressUrl,
  faviconDomain,
  compact,
  title = 'Browser preview',
}: {
  src?: string;
  srcDoc?: string;
  addressUrl?: string;
  faviconDomain?: string;
  compact?: boolean;
  title?: string;
}) {
  const addressText = addressBarFromUrl(addressUrl || src || '');
  const domain = faviconDomain || (() => {
    try {
      const u = addressUrl || src || '';
      if (!u) return undefined;
      return new URL(u.startsWith('http') ? u : `https://${u}`).hostname.replace(/^www\./, '');
    } catch {
      return undefined;
    }
  })();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: compact ? 0 : 280, background: '#fff' }}>
      <DemoBrowserTitleBar addressText={addressText} faviconDomain={domain} compact={compact} />
      <div style={{
        flex: 1, minHeight: compact ? 0 : 240, position: 'relative',
        background: '#fafaf9', overflow: 'hidden',
      }}>
        {src ? (
          <iframe
            title={title}
            src={src}
            sandbox="allow-same-origin allow-scripts"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        ) : (
          <iframe
            title={title}
            srcDoc={srcDoc}
            sandbox="allow-same-origin allow-scripts"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        )}
      </div>
    </div>
  );
}
