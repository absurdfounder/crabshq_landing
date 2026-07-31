'use client';

import type { ReactNode } from 'react';
import { Globe, MousePointer2 } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';
import { addressBarFromUrl } from '../lib/demoDiffPreview';

export function DemoBrowserTitleBar({
  addressText,
  faviconDomain,
  compact,
  claimed,
  showTakeControl,
}: {
  addressText: string;
  faviconDomain?: string;
  compact?: boolean;
  claimed?: boolean;
  showTakeControl?: boolean;
}) {
  const h = compact ? 28 : 34;
  const fontSize = compact ? 9 : 11;
  const padX = compact ? 6 : 10;

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: compact ? 6 : 8,
      height: h, padding: `0 ${padX}px`, flexShrink: 0,
      borderBottom: `1px solid ${C.border}`,
      background: '#fff',
    }}>
      {claimed ? (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
          borderRadius: 999, background: '#f0f5e6', color: '#325600',
          border: '1px solid #c4d9a0', padding: '2px 8px',
          fontSize: compact ? 9 : 10, fontWeight: 700,
        }}>
          Claimed
        </span>
      ) : null}
      <div style={{
        display: 'flex', alignItems: 'center', gap: compact ? 4 : 6,
        flex: 1, minWidth: 0, height: compact ? 20 : 24,
        borderRadius: 999, background: '#F5F5F4', padding: '0 10px',
      }}>
        {faviconDomain ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(faviconDomain)}&sz=32`}
            alt=""
            width={compact ? 11 : 13}
            height={compact ? 11 : 13}
            style={{ flexShrink: 0, borderRadius: 2 }}
          />
        ) : (
          <Globe size={compact ? 11 : 13} color="#78716C" strokeWidth={1.75} style={{ flexShrink: 0 }} />
        )}
        <span style={{
          flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize, fontWeight: 500, color: '#57534E',
        }}>
          {addressText}
        </span>
      </div>
      {showTakeControl ? (
        <button
          type="button"
          className="demo-hoverable"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0,
            height: compact ? 22 : 26, padding: '0 8px', borderRadius: 7,
            border: `1px solid ${C.border}`, background: C.card,
            fontSize: compact ? 9.5 : 10.5, fontWeight: 600, color: C.textMuted, cursor: 'pointer',
          }}
        >
          <MousePointer2 size={compact ? 10 : 11} strokeWidth={2} />
          Take control
        </button>
      ) : null}
    </div>
  );
}

export type DemoBrowserTab = {
  id: string;
  title: string;
  faviconDomain?: string;
  active?: boolean;
};

function TabStrip({
  tabs,
  compact,
}: {
  tabs: DemoBrowserTab[];
  compact?: boolean;
}) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', gap: 2,
      padding: compact ? '4px 6px 0' : '6px 8px 0',
      background: '#DEE1E6', borderBottom: '1px solid #c5c8ce', flexShrink: 0,
      overflow: 'hidden',
    }}>
      {tabs.map((tab) => {
        const active = Boolean(tab.active);
        return (
          <div
            key={tab.id}
            data-demo-target="browser-tab"
            data-claim-tab={tab.id}
            data-active={active ? 'true' : undefined}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              maxWidth: compact ? 110 : 140, minWidth: 0, flex: '0 1 auto',
              marginBottom: -1, borderRadius: '8px 8px 0 0',
              background: active ? '#fff' : '#D3D6DB',
              padding: compact ? '5px 8px' : '6px 10px',
              boxShadow: active ? '0 -1px 0 #fff' : 'none',
              fontSize: compact ? 10 : 11,
              fontWeight: active ? 600 : 500,
              color: active ? '#1c1917' : '#57534e',
            }}
          >
            {tab.faviconDomain ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(tab.faviconDomain)}&sz=32`}
                alt=""
                width={12}
                height={12}
                style={{ borderRadius: 2, flexShrink: 0 }}
              />
            ) : (
              <Globe size={12} color="#78716C" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            )}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tab.title}</span>
            {active ? (
              <span style={{ width: 6, height: 6, borderRadius: 999, background: '#3f6b00', flexShrink: 0 }} title="Claimed" />
            ) : null}
          </div>
        );
      })}
      <div style={{
        flex: 1, height: compact ? 22 : 26, marginBottom: -1, minWidth: 24,
        borderRadius: '8px 8px 0 0', background: '#D3D6DB',
      }} />
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
  showTabStrip = false,
  tabs,
  claimed = true,
  children,
}: {
  src?: string;
  srcDoc?: string;
  addressUrl?: string;
  faviconDomain?: string;
  compact?: boolean;
  title?: string;
  showTabStrip?: boolean;
  /** Multi-tab strip (claimed browser). Falls back to a single tab from `title`. */
  tabs?: DemoBrowserTab[];
  claimed?: boolean;
  /** When set, renders instead of the iframe (e.g. SVG capture stream). */
  children?: ReactNode;
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

  const tabLabel = (() => {
    if (title && !title.includes('/')) return title.replace(/\.(html?|htm)$/i, '');
    try {
      return domain || 'Tab';
    } catch {
      return 'Tab';
    }
  })();

  const resolvedTabs: DemoBrowserTab[] = tabs && tabs.length > 0
    ? tabs
    : [{ id: 'active', title: tabLabel, faviconDomain: domain, active: true }];

  // Prefer srcDoc — never load relative /demo-assets into an iframe on localhost.
  const useDoc = Boolean(srcDoc && srcDoc.trim().length > 0);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      minHeight: compact ? 0 : 280, background: '#fff',
    }}>
      {showTabStrip ? (
        <TabStrip tabs={resolvedTabs} compact={compact} />
      ) : null}
      <DemoBrowserTitleBar
        addressText={addressText}
        faviconDomain={domain}
        compact={compact}
        claimed={claimed}
        showTakeControl={showTabStrip}
      />
      <div style={{
        flex: 1, minHeight: compact ? 0 : 240, position: 'relative',
        background: '#fafaf9', overflow: 'hidden',
      }}>
        {children ? (
          children
        ) : useDoc ? (
          <iframe
            title={title}
            srcDoc={srcDoc}
            sandbox="allow-same-origin allow-scripts"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        ) : src ? (
          <iframe
            title={title}
            src={src}
            sandbox="allow-same-origin allow-scripts"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: '#fff' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: C.textSubtle, fontSize: 12,
          }}>
            Nothing to preview
          </div>
        )}
      </div>
    </div>
  );
}
