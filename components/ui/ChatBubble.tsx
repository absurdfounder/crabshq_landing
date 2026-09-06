'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

import TrooperAvatar from '@/components/ui/TrooperAvatar';
import { bubblePaletteFromAccent, type BubbleStops } from '@/lib/avatars/bubblePalette';
import type { Trooper } from '@/lib/troopers';

/**
 * Chat bubbles: SVG path scales with the text box.
 * When an agent is present, both bubbles tint to that cast accent
 * (darker stops so white type stays readable) — not generic black/green.
 */

const f = (n: number) => +n.toFixed(3);

function askPath(w: number, h: number) {
  const r = Math.min(23, h / 2);
  return (
    `M${f(r)},0H${f(w - r)}A${f(r)},${f(r)} 0 0 1 ${f(w)},${f(r)}V${f(h - r)}` +
    `C${f(w)},${f(h - 13)} ${f(w - 3.6)},${f(h - 8.5)} ${f(w - 8.423)},${f(h - 6.288)}` +
    `C${f(w - 10.529)},${f(h - 4.423)} ${f(w - 12.072)},${f(h - 1.738)} ${f(w - 10.864)},${f(h + 0.803)}` +
    `C${f(w - 10.405)},${f(h + 1.741)} ${f(w - 9.237)},${f(h + 3.473)} ${f(w - 8.215)},${f(h + 4.808)}` +
    `C${f(w - 7.193)},${f(h + 6.142)} ${f(w - 7.527)},${f(h + 8.623)} ${f(w - 10.154)},${f(h + 8.415)}` +
    `C${f(w - 11.03)},${f(h + 8.352)} ${f(w - 14.534)},${f(h + 6.809)} ${f(w - 18.622)},${f(h + 4.557)}` +
    `C${f(w - 23.596)},${f(h + 1.818)} ${f(w - 29.072)},${f(h - 0.024)} ${f(w - 34.75)},${f(h - 0.005)}` +
    `H${f(r)}A${f(r)},${f(r)} 0 0 1 0,${f(h - r)}V${f(r)}A${f(r)},${f(r)} 0 0 1 ${f(r)},0Z`
  );
}

function replyPath(w: number, h: number) {
  const r = Math.min(19, h / 2);
  return (
    `M${f(r)},0H${f(w - r)}A${f(r)},${f(r)} 0 0 1 ${f(w)},${f(r)}V${f(h - r)}` +
    `A${f(r)},${f(r)} 0 0 1 ${f(w - r)},${f(h)}H32.204` +
    `C26.698,${f(h)} 21.445,${f(h + 1.902)} 16.622,${f(h + 4.558)}` +
    `C12.535,${f(h + 6.81)} 9.032,${f(h + 8.353)} 8.155,${f(h + 8.416)}` +
    `C5.528,${f(h + 8.625)} 5.193,${f(h + 6.142)} 6.215,${f(h + 4.808)}` +
    `C7.237,${f(h + 3.473)} 8.405,${f(h + 1.742)} 8.864,${f(h + 0.804)}` +
    `C9.761,${f(h - 1.083)} 8.731,${f(h - 3.11)} 7.119,${f(h - 4.436)}` +
    `C2.772,${f(h - 8.013)} 0,${f(h - 13.432)} 0,${f(r)}` +
    `A${f(r)},${f(r)} 0 0 1 ${f(r)},0Z`
  );
}

const DEFAULT_ASK: BubbleStops = {
  fill: [
    ['0', '#3f3f46'],
    ['0.55', '#27272a'],
    ['1', '#18181b'],
  ],
  stroke: [
    ['0', '#52525b'],
    ['1', '#18181b'],
  ],
};

const DEFAULT_REPLY: BubbleStops = {
  fill: [
    ['0', '#22c55e'],
    ['0.55', '#16a34a'],
    ['1', '#15803d'],
  ],
  stroke: [
    ['0', '#4ade80'],
    ['1', '#16a34a'],
  ],
};

const TYPE_MS = 26;

export default function ChatBubble({
  kind,
  className = '',
  children,
  typing = false,
  active = true,
  onTyped,
  palette,
}: {
  kind: 'ask' | 'reply';
  className?: string;
  children: string;
  typing?: boolean;
  active?: boolean;
  onTyped?: () => void;
  /** Optional cast-tinted stops; falls back to slate / green. */
  palette?: BubbleStops;
}) {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const onTypedRef = useRef(onTyped);
  onTypedRef.current = onTyped;
  const [dim, setDim] = useState({ w: 320, h: 46 });
  const [shown, setShown] = useState(() => (typing ? '' : children));
  const doneRef = useRef(false);

  const stops = palette ?? (kind === 'ask' ? DEFAULT_ASK : DEFAULT_REPLY);
  const pathFn = kind === 'ask' ? askPath : replyPath;
  const shadow =
    kind === 'ask'
      ? 'drop-shadow-[0_4px_10px_rgba(24,24,27,0.28)]'
      : 'drop-shadow-[0_4px_10px_rgba(0,0,0,0.22)]';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setDim({ w: Math.max(60, el.offsetWidth), h: Math.max(30, el.offsetHeight) });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [shown]);

  useEffect(() => {
    doneRef.current = false;

    if (!typing) {
      setShown(children);
      return;
    }

    if (!active) {
      setShown('');
      return;
    }

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setShown(children);
      if (!doneRef.current) {
        doneRef.current = true;
        onTypedRef.current?.();
      }
      return;
    }

    setShown('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(children.slice(0, i));
      if (i >= children.length) {
        window.clearInterval(id);
        if (!doneRef.current) {
          doneRef.current = true;
          onTypedRef.current?.();
        }
      }
    }, TYPE_MS);

    return () => window.clearInterval(id);
  }, [typing, active, children]);

  if (typing && !active && !shown) return null;

  const fillId = `bub-f-${uid}`;
  const strokeId = `bub-s-${uid}`;
  const label = shown || (typing && active ? '\u00a0' : children);

  return (
    <div
      ref={ref}
      className={`relative w-max max-w-full ${
        kind === 'ask' ? 'px-5 py-3 sm:px-6 sm:py-3.5' : 'px-4 py-2.5 sm:px-5 sm:py-3'
      } ${className}`}
    >
      <svg
        className={`absolute left-0 top-0 ${shadow}`}
        style={{ width: dim.w, height: dim.h + 10 }}
        viewBox={`0 0 ${dim.w} ${dim.h + 10}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            {stops.fill.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="0" y2="1">
            {stops.stroke.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <path
          d={pathFn(dim.w, dim.h)}
          fill={`url(#${fillId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="pointer-events-none absolute inset-x-5 top-[3px] h-[6px] rounded-full bg-white/20 blur-[2px]"
        aria-hidden
      />
      <span
        className="relative z-[1] block text-[15px] font-semibold leading-snug tracking-[-0.01em] text-white sm:text-[16px]"
        style={{ textShadow: '0 1px 1px rgba(0,0,0,0.28)' }}
      >
        {label}
        {typing && active && shown.length < children.length ? (
          <span className="ml-0.5 inline-block w-[0.55ch] animate-pulse text-white/90">|</span>
        ) : null}
      </span>
    </div>
  );
}

export function BubbleExchange({
  ask,
  reply,
  focused = true,
  className = '',
  agent = null,
}: {
  ask: string;
  reply: string;
  focused?: boolean;
  className?: string;
  agent?: Trooper | null;
}) {
  const [askOn, setAskOn] = useState(false);
  const [replyOn, setReplyOn] = useState(false);
  const [cycle, setCycle] = useState(0);
  const replyDelayRef = useRef<number | null>(null);

  const palette = useMemo(
    () => (agent ? bubblePaletteFromAccent(agent.accent) : null),
    [agent],
  );

  useEffect(() => {
    const clearReplyDelay = () => {
      if (replyDelayRef.current != null) {
        window.clearTimeout(replyDelayRef.current);
        replyDelayRef.current = null;
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAskOn(true);
      setReplyOn(true);
      return clearReplyDelay;
    }

    if (focused) {
      setAskOn(true);
    } else {
      clearReplyDelay();
      setAskOn(false);
      setReplyOn(false);
      setCycle((c) => c + 1);
    }

    return clearReplyDelay;
  }, [focused]);

  const handleAskTyped = () => {
    if (!focused) return;
    if (replyDelayRef.current != null) window.clearTimeout(replyDelayRef.current);
    replyDelayRef.current = window.setTimeout(() => setReplyOn(true), 280);
  };

  return (
    <div className={`flex flex-col items-start gap-4 ${className}`}>
      <ChatBubble
        key={`ask-${cycle}`}
        kind="ask"
        typing
        active={askOn && focused}
        onTyped={handleAskTyped}
        palette={palette?.ask}
      >
        {ask}
      </ChatBubble>
      {replyOn && focused ? (
        <div className="flex items-end gap-2.5">
          {agent ? (
            <span className="mb-0.5 shrink-0 drop-shadow-[0_6px_14px_rgba(0,0,0,0.12)]">
              <TrooperAvatar trooper={agent} size={44} live animation="happy" />
            </span>
          ) : null}
          <ChatBubble key={`reply-${cycle}`} kind="reply" typing active palette={palette?.reply}>
            {reply}
          </ChatBubble>
        </div>
      ) : null}
    </div>
  );
}
