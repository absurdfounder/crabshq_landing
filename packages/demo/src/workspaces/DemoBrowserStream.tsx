'use client';

import { useEffect, useRef } from 'react';
import { DemoBrowserFrame } from '../components/DemoBrowserChrome';
import type { DemoBrowserSession } from '../components/demoTaskExecution';
import { BrowserClaimPage, CLAIM_TABS, type ClaimTabId } from './BrowserClaimPanes';

/**
 * Live browser workspace: claim panes (Gmail / Stripe / QBO / Notion) fill a
 * Chrome shell with every opened tab visible — cursor + scroll land on the
 * active hotspot each frame.
 */
export function DemoBrowserStream({
  session,
  frameCount,
}: {
  session: DemoBrowserSession;
  frameCount: number;
}) {
  const pageRef = useRef<HTMLDivElement>(null);
  const shown = session.frames.slice(0, Math.max(1, frameCount));
  const current = shown[shown.length - 1];
  const addressUrl = current?.url
    ? (current.url.startsWith('http') ? current.url : `https://${current.url}`)
    : `https://${session.domain}`;
  const faviconDomain = current?.claimTab
    ? CLAIM_TABS.find((t) => t.id === current.claimTab)?.domain
    : session.domain;
  const tabTitle = current?.claimTab
    ? CLAIM_TABS.find((t) => t.id === current.claimTab)?.title
    : session.domain;

  // All session tabs stay open (like a real Chrome window); active follows the
  // current frame. Tabs that haven't been reached yet still show so the strip
  // doesn't grow one-by-one like a filmstrip.
  const chromeTabs = session.frames.map((frame) => {
    const meta = frame.claimTab ? CLAIM_TABS.find((t) => t.id === frame.claimTab) : null;
    return {
      id: frame.claimTab || frame.id,
      title: meta?.title || frame.claimTab || 'Tab',
      faviconDomain: meta?.domain,
      active: frame.id === current?.id,
    };
  });

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;
    const hotspot = root.querySelector<HTMLElement>('[data-demo-target="browser-hotspot"]');
    if (!hotspot) return;

    let scroller: HTMLElement | null = hotspot.parentElement;
    while (scroller && scroller !== root) {
      const style = getComputedStyle(scroller);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') break;
      scroller = scroller.parentElement;
    }
    if (scroller && scroller !== root) {
      // Drop the list mid-scroll first so the smooth settle reads as motion.
      const max = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
      scroller.scrollTop = Math.min(max, Math.max(48, hotspot.offsetTop - 12));
    }

    const id = window.requestAnimationFrame(() => {
      hotspot.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [current?.id]);

  return (
    <div data-demo-target="browser-stream" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div style={{ flex: 1, minHeight: 0 }}>
        <DemoBrowserFrame
          addressUrl={addressUrl}
          faviconDomain={faviconDomain || session.domain}
          title={tabTitle || session.domain}
          showTabStrip
          tabs={chromeTabs}
          claimed
        >
          <div ref={pageRef} style={{ position: 'absolute', inset: 0, background: '#F5F5F4', overflow: 'hidden' }}>
            {current?.claimTab ? (
              <div key={current.id} className="demo-enter" style={{ position: 'absolute', inset: 0 }}>
                <BrowserClaimPage tabId={current.claimTab as ClaimTabId} />
              </div>
            ) : current?.svg ? (
              <div
                key={current.id}
                className="demo-enter"
                style={{ position: 'absolute', inset: 0 }}
                dangerouslySetInnerHTML={{ __html: current.svg }}
              />
            ) : null}
            <div style={{
              position: 'absolute', left: 10, bottom: 10, right: 10,
              display: 'flex', alignItems: 'center', gap: 7,
              borderRadius: 8, background: 'rgba(28,25,23,0.82)', backdropFilter: 'blur(4px)',
              padding: '6px 10px', color: '#fafaf9', zIndex: 2,
            }}>
              <span className="demo-live-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#a3e635', flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 500, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {current?.action || 'Waiting for browser activity'}
              </span>
              <span style={{ marginLeft: 'auto', flexShrink: 0, fontSize: 10, color: 'rgba(250,250,249,0.6)', fontVariantNumeric: 'tabular-nums' }}>
                {current?.time}
              </span>
            </div>
          </div>
        </DemoBrowserFrame>
      </div>
    </div>
  );
}
