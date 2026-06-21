'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { MermaidFlowDiagram } from '@/components/loops/MermaidFlowDiagram';

import type { LoopFlowStep, LoopRequirements } from '@/lib/loopMermaid';

type LoopDetailClientProps = {
  kickoffPrompt: string;
  mermaid: string;
  steps?: LoopFlowStep[];
  guardrails?: string[];
  requirements?: LoopRequirements;
};

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="shrink-0 rounded p-1.5 transition-colors hover:bg-slate-800"
      title={label || 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-400" />
      ) : (
        <Copy className="h-4 w-4 text-slate-400 hover:text-slate-200" />
      )}
    </button>
  );
}

export default function LoopDetailClient({
  kickoffPrompt,
  mermaid,
  steps = [],
  guardrails = [],
}: LoopDetailClientProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-slate-900 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
            Kickoff prompt
          </span>
          <CopyButton text={kickoffPrompt} label="Copy kickoff prompt" />
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap font-mono text-sm leading-6 text-green-400">
          {kickoffPrompt}
        </pre>
      </div>

      <p className="font-mono text-xs text-slate-500">
        Paste the kickoff prompt into Cursor, Claude Code, or Codex. Deeplinks do not install hook files.
      </p>

      {steps.length > 0 ? (
        <div className="border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
              Steps
            </span>
          </div>
          <div className="divide-y divide-slate-100">
            {steps.map((step, index) => (
              <div key={step.label} className="px-4 py-4">
                <p className="font-funneldisplay text-sm font-semibold text-slate-900">
                  {index + 1}. {step.label}
                </p>
                {step.description ? (
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.description}</p>
                ) : null}
                {step.tools?.length ? (
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-medium text-slate-600">Tools:</span>{' '}
                    {step.tools.join(', ')}
                  </p>
                ) : null}
                {step.command ? (
                  <div className="mt-3 flex items-start gap-2 rounded-sm border border-slate-200 bg-slate-50 px-3 py-2">
                    <Terminal className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <code className="font-mono text-xs text-slate-800">{step.command}</code>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500">
            Flow diagram
          </span>
        </div>
        <div className="overflow-x-auto p-4">
          <MermaidFlowDiagram source={mermaid} />
        </div>
      </div>

      {guardrails.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-funneldisplay text-lg font-semibold text-slate-900">Guardrails</h2>
          <p className="mt-1 text-sm text-slate-600">
            Rules the agent must follow so it cannot cheat the exit condition.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            {guardrails.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
