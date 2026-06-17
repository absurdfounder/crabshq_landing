'use client';

import { useEffect, useId, useState } from 'react';

let mermaidInitialized = false;

async function ensureMermaid() {
  const mermaid = (await import('mermaid')).default;
  if (!mermaidInitialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'strict',
      flowchart: { htmlLabels: true, curve: 'basis' },
      fontFamily: 'ui-monospace, monospace',
    });
    mermaidInitialized = true;
  }
  return mermaid;
}

type MermaidFlowDiagramProps = {
  source: string;
  className?: string;
  onRender?: (svg: string) => void;
};

export function MermaidFlowDiagram({ source, className = '', onRender }: MermaidFlowDiagramProps) {
  const reactId = useId().replace(/:/g, '');
  const [error, setError] = useState('');
  const [svg, setSvg] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!source?.trim()) {
        setSvg('');
        setError('');
        return;
      }

      try {
        const mermaid = await ensureMermaid();
        const { svg: rendered } = await mermaid.render(`loop-flow-${reactId}`, source);
        if (cancelled) return;
        setSvg(rendered);
        setError('');
        onRender?.(rendered);
      } catch (err) {
        if (cancelled) return;
        setSvg('');
        setError(err instanceof Error ? err.message : 'Could not render diagram');
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [source, reactId, onRender]);

  if (error) {
    return (
      <div className={`rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-slate-600 ${className}`}>
        <p className="font-medium text-slate-900">Flow diagram preview unavailable</p>
        <pre className="mt-3 max-h-48 overflow-auto rounded-lg bg-white p-3 font-mono text-xs whitespace-pre-wrap">{source}</pre>
      </div>
    );
  }

  return (
    <div
      className={`min-h-48 w-full min-w-0 font-mono [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full ${className}`}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      aria-busy={!svg && !!source}
    />
  );
}
