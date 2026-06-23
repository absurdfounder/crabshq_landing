'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Copy } from 'lucide-react';
import { DemoFavicon } from '@/components/DemoFavicon';
import {
  DEFAULT_SETUP_TARGET_ID,
  SETUP_TARGETS,
  type SetupTarget,
  type SetupTargetId,
} from '@/lib/setupCommand';

function SetupTargetIcon({ target, size = 16 }: { target: SetupTarget; size?: number }) {
  return (
    <DemoFavicon
      domain={target.iconDomain}
      src={target.iconSrc}
      size={size}
      alt=""
      rounded="sm"
      className="shrink-0"
    />
  );
}

async function copyText(text: string) {
  await navigator.clipboard.writeText(text);
}

export default function HeroSetupCommand() {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<SetupTargetId>(DEFAULT_SETUP_TARGET_ID);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedRowId, setCopiedRowId] = useState<SetupTargetId | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = SETUP_TARGETS.find((target) => target.id === selectedId) ?? SETUP_TARGETS[0];

  useEffect(() => {
    if (open) return;

    const interval = window.setInterval(() => {
      setSelectedId((current) => {
        const index = SETUP_TARGETS.findIndex((target) => target.id === current);
        const next = SETUP_TARGETS[(index + 1) % SETUP_TARGETS.length];
        return next.id;
      });
    }, 2800);

    return () => window.clearInterval(interval);
  }, [open]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleCopyCommand = async () => {
    try {
      await copyText(selected.command);
      setCopiedCommand(true);
      window.setTimeout(() => setCopiedCommand(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleCopyPrompt = async () => {
    try {
      await copyText(selected.prompt);
      setCopiedPrompt(true);
      window.setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  const handleCopyRow = async (target: SetupTarget) => {
    try {
      await copyText(target.command);
      setCopiedRowId(target.id);
      window.setTimeout(() => setCopiedRowId(null), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div ref={rootRef} className="relative mt-4 max-w-xl">
      <div className="flex flex-col gap-2 rounded-sm border border-dashed border-slate-300 bg-white px-3 py-2.5 sm:flex-row sm:items-center">
        <code className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto font-mono text-[11px] leading-none sm:text-[12px]">
          <span className="select-none text-cyan-600">$</span>
          <span className="whitespace-nowrap text-slate-900">{selected.command}</span>
        </code>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-800 transition hover:border-slate-300 hover:bg-white sm:gap-2 sm:px-2.5 sm:text-xs"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={`Install target: ${selected.label}`}
        >
          <SetupTargetIcon target={selected} size={14} />
          <span className="max-w-[7rem] truncate sm:max-w-none">{selected.label}</span>
          <ChevronDown
            className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>

        <button
          type="button"
          onClick={handleCopyCommand}
          className="shrink-0 rounded-sm p-1 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600"
          title="Copy command"
          aria-label="Copy command"
        >
          {copiedCommand ? (
            <Check className="h-3.5 w-3.5 text-trooper" strokeWidth={2} />
          ) : (
            <Copy className="h-3.5 w-3.5" strokeWidth={2} />
          )}
        </button>
        </div>
      </div>

      {open ? (
        <div
          className="absolute right-0 top-full z-30 mt-2 w-full min-w-[17rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 shadow-xl backdrop-blur-md sm:w-[20rem]"
          role="listbox"
          aria-label="Install target"
        >
          <ul className="divide-y divide-slate-100">
            {SETUP_TARGETS.map((target) => {
              const isSelected = target.id === selectedId;
              return (
                <li key={target.id}>
                  <div className="flex items-center gap-2 px-3 py-2.5">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedId(target.id);
                        setOpen(false);
                      }}
                      className={`flex min-w-0 flex-1 items-center gap-3 rounded-lg px-2 py-1.5 text-left transition ${
                        isSelected ? 'bg-trooper-50' : 'hover:bg-slate-50'
                      }`}
                    >
                      <SetupTargetIcon target={target} size={18} />
                      <span className="text-sm font-medium text-slate-900">{target.label}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyRow(target)}
                      className="shrink-0 rounded-md p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
                      title={`Copy command for ${target.label}`}
                      aria-label={`Copy command for ${target.label}`}
                    >
                      {copiedRowId === target.id ? (
                        <Check className="h-4 w-4 text-trooper" strokeWidth={2} />
                      ) : (
                        <Copy className="h-4 w-4" strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex w-full items-center justify-between gap-3 border-t border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
              {copiedPrompt ? (
                <Check className="h-4 w-4 text-trooper" strokeWidth={2} />
              ) : (
                <Copy className="h-4 w-4 text-slate-400" strokeWidth={2} />
              )}
              Copy prompt
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
              {selected.id === 'trooper' ? 'Generic' : selected.label}
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
