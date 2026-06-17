'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

type LoopDetailClientProps = {
  kickoffPrompt: string;
  mermaid: string;
};

export default function LoopDetailClient({ kickoffPrompt, mermaid }: LoopDetailClientProps) {
  const [copiedKickoff, setCopiedKickoff] = useState(false);
  const [copiedMermaid, setCopiedMermaid] = useState(false);

  const copyKickoff = async () => {
    try {
      await navigator.clipboard.writeText(kickoffPrompt);
      setCopiedKickoff(true);
      setTimeout(() => setCopiedKickoff(false), 2000);
    } catch {
      // ignore
    }
  };

  const copyMermaid = async () => {
    try {
      await navigator.clipboard.writeText(mermaid);
      setCopiedMermaid(true);
      setTimeout(() => setCopiedMermaid(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyKickoff}
          className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          {copiedKickoff ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          Use loop
        </button>
        <button
          type="button"
          onClick={copyMermaid}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          {copiedMermaid ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          Copy Mermaid
        </button>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-900 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Kickoff prompt</span>
          <button
            type="button"
            onClick={copyKickoff}
            className="rounded p-1 hover:bg-slate-800"
            title="Copy kickoff"
          >
            {copiedKickoff ? (
              <Check className="h-3.5 w-3.5 text-green-400" />
            ) : (
              <Copy className="h-3.5 w-3.5 text-slate-400" />
            )}
          </button>
        </div>
        <pre className="max-h-64 overflow-auto font-mono text-xs leading-6 whitespace-pre-wrap text-green-400">
          {kickoffPrompt}
        </pre>
      </div>
    </div>
  );
}
