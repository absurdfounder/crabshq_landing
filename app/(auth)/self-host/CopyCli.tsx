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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <code className="min-w-0 flex-1 overflow-x-auto rounded-xl bg-stone-900 px-4 py-3 font-mono text-[13px] text-stone-100 sm:text-[14px]">
        {TROOPER_CLI_COMMAND}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 text-[13px] font-medium text-neutral-800 ring-1 ring-black/5 transition-colors hover:bg-neutral-50"
      >
        {copied ? <Check className="size-4 text-fern-700" /> : <Copy className="size-4" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
