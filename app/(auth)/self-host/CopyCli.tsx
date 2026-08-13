'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { TROOPER_CLI_COMMAND } from '@/lib/setupCommand';

export default function CopyCli() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(TROOPER_CLI_COMMAND);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-stone-900 shadow-[0_24px_56px_-28px_rgba(28,25,23,0.32)] ring-1 ring-black/5" data-mock-ui>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-stone-400">terminal · install</span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
        <code className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] text-stone-100 sm:text-[14px]">
          <span className="text-emerald-400">$</span> {TROOPER_CLI_COMMAND}
        </code>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-[13px] font-medium text-stone-100 ring-1 ring-white/10 transition-colors hover:bg-white/15"
        >
          {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
