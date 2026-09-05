'use client';

import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * Classic iOS-style chat bubbles: dark cyan ask, saturated green reply,
 * white type, soft gloss. SVG path scales with the text box.
 */

const f = (n: number) => +n.toFixed(3);

/** Ask bubble: tail flowing out of the bottom-right corner. */
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

/** Reply bubble: tail flowing out of the bottom-left corner. */
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

/** Saturated iOS Message look — white type on dark cyan / green. */
const STYLES = {
  ask: {
    path: askPath,
    fill: [
      ['0', '#1aa5b8'],
      ['0.55', '#0e8a9c'],
      ['1', '#0a6f7e'],
    ],
    stroke: [
      ['0', '#2bb4c4'],
      ['1', '#085f6c'],
    ],
    text: 'text-white',
    shadow: 'drop-shadow-[0_4px_10px_rgba(10,111,126,0.32)]',
  },
  reply: {
    path: replyPath,
    fill: [
      ['0', '#2fce6a'],
      ['0.55', '#22b85c'],
      ['1', '#16a34a'],
    ],
    stroke: [
      ['0', '#3dce6e'],
      ['1', '#16a34a'],
    ],
    text: 'text-white',
    shadow: 'drop-shadow-[0_4px_10px_rgba(34,197,94,0.28)]',
  },
} as const;

const TYPE_MS = 26;

export default function ChatBubble({
  kind,
  className = '',
  children,
  typing = false,
  active = true,
  onTyped,
}: {
  kind: keyof typeof STYLES;
  className?: string;
  children: string;
  /** Type characters in one by one when `active` becomes true. */
  typing?: boolean;
  /** Gate for the typewriter — false keeps the bubble hidden/empty. */
  active?: boolean;
  onTyped?: () => void;
}) {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const onTypedRef = useRef(onTyped);
  onTypedRef.current = onTyped;
  const [dim, setDim] = useState({ w: 320, h: 46 });
  const [shown, setShown] = useState(() => (typing ? '' : children));
  const doneRef = useRef(false);

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

  const s = STYLES[kind];
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
        className={`absolute left-0 top-0 ${s.shadow}`}
        style={{ width: dim.w, height: dim.h + 10 }}
        viewBox={`0 0 ${dim.w} ${dim.h + 10}`}
        aria-hidden
      >
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            {s.fill.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
          <linearGradient id={strokeId} x1="0" y1="0" x2="0" y2="1">
            {s.stroke.map(([o, c]) => (
              <stop key={o} offset={o} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
        <path
          d={s.path(dim.w, dim.h)}
          fill={`url(#${fillId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
      {/* Rim gloss only. A tall white wash used to sit on the type. */}
      <span
        className="pointer-events-none absolute inset-x-5 top-[3px] h-[6px] rounded-full bg-white/20 blur-[2px]"
        aria-hidden
      />
      <span
        className={`relative z-[1] block text-[15px] font-semibold leading-snug tracking-[-0.01em] sm:text-[16px] ${s.text}`}
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

/**
 * Ask types, then reply. Only runs while `focused` — other capability rows
 * stay idle so background sections don't keep typing while you read another.
 */
export function BubbleExchange({
  ask,
  reply,
  focused = true,
  className = '',
}: {
  ask: string;
  reply: string;
  /** When false, typing is paused/reset. Driven by the parent scroll focus. */
  focused?: boolean;
  className?: string;
}) {
  const [askOn, setAskOn] = useState(false);
  const [replyOn, setReplyOn] = useState(false);
  const [cycle, setCycle] = useState(0);
  const replyDelayRef = useRef<number | null>(null);

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
      >
        {ask}
      </ChatBubble>
      {replyOn && focused ? (
        <ChatBubble key={`reply-${cycle}`} kind="reply" typing active>
          {reply}
        </ChatBubble>
      ) : null}
    </div>
  );
}
