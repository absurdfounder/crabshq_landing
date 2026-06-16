'use client';

import { TROOPER_DEMO as C } from './demoTheme';
import { lineHighlightStyle } from '@/lib/demoArtifactReview';

export function DemoReviewComposer({
  draftText,
  compact,
  visible = true,
}: {
  draftText: string;
  compact?: boolean;
  visible?: boolean;
}) {
  if (!visible) return null;

  return (
    <div
      data-demo-target="modal-artifact-review-composer"
      style={{
        marginTop: compact ? 6 : 10,
        marginLeft: compact ? 2 : 4,
        maxWidth: compact ? 200 : 300,
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        background: C.card,
        boxShadow: '0 8px 24px -8px rgba(28,25,23,0.22)',
        padding: compact ? '6px 8px' : '8px 10px',
        animation: 'demoThreadEnter 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <textarea
        readOnly
        value={draftText}
        placeholder="Add a comment…"
        rows={compact ? 2 : 3}
        style={{
          width: '100%',
          resize: 'none',
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          padding: compact ? '5px 6px' : '6px 8px',
          fontSize: compact ? 9 : 11,
          lineHeight: 1.45,
          color: C.text,
          background: '#FAFAF9',
          fontFamily: 'Inter, system-ui, sans-serif',
          marginBottom: compact ? 5 : 6,
          outline: 'none',
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          type="button"
          data-demo-target="modal-artifact-review-save"
          style={{
            padding: compact ? '3px 8px' : '4px 10px',
            borderRadius: 6,
            border: 'none',
            background: C.brand,
            color: '#fff',
            fontSize: compact ? 9 : 10,
            fontWeight: 600,
            cursor: 'default',
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

type SelectableLineProps = {
  line: string;
  index: number;
  selected: boolean;
  selectedLines: number[];
  lineColor?: string;
  compact?: boolean;
};

export function DemoSelectableLine({
  line,
  index,
  selected,
  selectedLines,
  lineColor,
  compact,
}: SelectableLineProps) {
  const first = selectedLines[0];
  const last = selectedLines[selectedLines.length - 1];
  let target: string | undefined;
  if (selected && index === first) target = 'artifact-review-line-start';
  else if (selected && index === last) target = 'artifact-review-line-end';
  else if (selected) target = `artifact-review-line-${index}`;

  return (
    <div
      data-demo-target={target}
      style={{
        color: lineColor,
        ...lineHighlightStyle(selected),
        transition: 'background 0.25s ease, border-color 0.25s ease',
        fontSize: compact ? 8 : undefined,
        lineHeight: compact ? 1.45 : undefined,
        whiteSpace: compact ? 'nowrap' : undefined,
        overflow: compact ? 'hidden' : undefined,
        textOverflow: compact ? 'ellipsis' : undefined,
      }}
    >
      {line || '\u00A0'}
    </div>
  );
}

/** Inline selection + composer for compact canvas tile previews */
export function DemoCanvasReviewLayer({
  content,
  selectedLines,
  showComposer,
  draftText,
}: {
  content: string;
  selectedLines: number[];
  showComposer?: boolean;
  draftText?: string;
}) {
  if (!selectedLines.length && !showComposer) return null;

  const lines = content.split('\n');
  const selectedSet = new Set(selectedLines);
  const lastSelected = selectedLines[selectedLines.length - 1] ?? -1;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '4px 6px 6px',
        background: selectedLines.length
          ? 'linear-gradient(to top, rgba(28,25,23,0.55) 0%, transparent 55%)'
          : undefined,
      }}
    >
      <div style={{ fontFamily: 'ui-monospace, Menlo, monospace' }}>
        {selectedLines.map((i) => (
          <DemoSelectableLine
            key={i}
            line={lines[i] ?? ''}
            index={i}
            selected
            selectedLines={selectedLines}
            lineColor="#ecfccb"
            compact
          />
        ))}
      </div>
      {showComposer && draftText && (
        <div style={{ marginTop: 4 }}>
          <DemoReviewComposer draftText={draftText} compact visible />
        </div>
      )}
      {!showComposer && lastSelected >= 0 && (
        <span aria-hidden style={{ height: 0, overflow: 'hidden' }} data-demo-target="artifact-review-line-end" />
      )}
    </div>
  );
}

/** @deprecated Use inline DemoSelectableLine + DemoReviewComposer instead */
export function DemoReviewOverlay(_props: {
  comment?: string | null;
  author?: string;
  showHighlight?: boolean;
  compact?: boolean;
}) {
  return null;
}
