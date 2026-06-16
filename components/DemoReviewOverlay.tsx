'use client';

import { MessageSquare } from 'lucide-react';
import { TROOPER_DEMO as C } from './demoTheme';

/** Highlight band + review comment bubble for IDE / Canvas artifacts */
export function DemoReviewOverlay({
  comment,
  author = 'Vaibhav',
  showHighlight = true,
  compact,
}: {
  comment?: string | null;
  author?: string;
  showHighlight?: boolean;
  compact?: boolean;
}) {
  if (!comment && !showHighlight) return null;

  return (
    <>
      {showHighlight && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: compact ? '14% 6% 38% 6%' : '16% 8% 40% 8%',
            border: '2px solid rgba(63,107,0,0.55)',
            borderRadius: compact ? 4 : 8,
            background: 'rgba(63,107,0,0.07)',
            pointerEvents: 'none',
            zIndex: 4,
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5)',
          }}
        />
      )}
      {comment && (
        <div
          style={{
            position: 'absolute',
            top: compact ? '8%' : '10%',
            right: compact ? 6 : 10,
            maxWidth: compact ? '78%' : '68%',
            zIndex: 6,
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: C.card,
            boxShadow: '0 8px 24px -8px rgba(28,25,23,0.22)',
            padding: compact ? '6px 8px' : '8px 10px',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
            <MessageSquare size={compact ? 10 : 12} strokeWidth={2} color={C.brand} />
            <span style={{ fontSize: compact ? 9 : 10, fontWeight: 600, color: C.textMuted }}>{author}</span>
          </div>
          <p style={{ margin: 0, fontSize: compact ? 9 : 11, lineHeight: 1.45, color: C.text }}>{comment}</p>
        </div>
      )}
    </>
  );
}
