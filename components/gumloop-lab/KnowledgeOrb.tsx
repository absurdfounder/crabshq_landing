'use client';

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { DemoFavicon } from '@trooper/demo';

/**
 * Interactive company-knowledge orb — ported from Gumloop’s landing field
 * (drag / arrow keys / idle yaw, point cloud + great-circle arcs + app pins).
 */

const ROTATE_X_LIMITS = { min: -72, max: 72 } as const;
const SPRING = { stiffness: 180, damping: 26, mass: 0.7 } as const;

const APP_PINS = [
  { serverId: 'granola', domain: 'granola.so', latitude: -24, longitude: 130 },
  { serverId: 'gmail', domain: 'gmail.com', latitude: 28, longitude: 40 },
  { serverId: 'github', domain: 'github.com', latitude: 45, longitude: 160 },
  { serverId: 'salesforce', domain: 'salesforce.com', latitude: -45, longitude: 20 },
  { serverId: 'jira', domain: 'atlassian.com', latitude: -20, longitude: 60 },
  { serverId: 'hubspot', domain: 'hubspot.com', latitude: 8, longitude: 205 },
  { serverId: 'notion', domain: 'notion.so', latitude: -38, longitude: 250 },
  { serverId: 'gdrive', domain: 'drive.google.com', latitude: 30, longitude: 285 },
  { serverId: 'gsheets', domain: 'sheets.google.com', latitude: 55, longitude: 300 },
  { serverId: 'linear', domain: 'linear.app', latitude: -6, longitude: 330 },
] as const;

type Vec3 = { x: number; y: number; z: number };
type Rot = { cosX: number; sinX: number; cosY: number; sinY: number };

function latLon(lat: number, lon: number): Vec3 {
  return {
    x: Math.cos(lat) * Math.cos(lon),
    y: Math.sin(lat),
    z: Math.cos(lat) * Math.sin(lon),
  };
}

function fromSvg(x: number, y: number): Vec3 {
  let r = (x - 220) / 170;
  let a = (y - 220) / 170;
  const s = Math.hypot(r, a);
  if (s > 0.96) {
    r = (r / s) * 0.96;
    a = (a / s) * 0.96;
  }
  return { x: r, y: a, z: Math.sqrt(Math.max(0, 1 - r * r - a * a)) };
}

function rotate(p: Vec3, t: Rot): Vec3 {
  const r = p.x * t.cosY + p.z * t.sinY;
  const a = -p.x * t.sinY + p.z * t.cosY;
  return {
    x: r,
    y: p.y * t.cosX - a * t.sinX,
    z: p.y * t.sinX + a * t.cosX,
  };
}

function project(p: Vec3) {
  const depth = Math.max(0, p.z);
  return { x: 220 + 170 * p.x, y: 220 + 170 * p.y, depth };
}

function softClamp(v: number, lim: { min: number; max: number }) {
  if (v < lim.min) return lim.min - (lim.min - v) * 0.2;
  if (v > lim.max) return lim.max + (v - lim.max) * 0.2;
  return v;
}

function snapClamp(v: number, lim: { min: number; max: number }, step: number) {
  return Math.min(lim.max, Math.max(lim.min, Math.round(v / step) * step));
}

const POINTS = Array.from({ length: 576 }, (_, t) => {
  const r = t % 32;
  const a = Math.floor(t / 32);
  const s = -Math.PI / 2 + ((a + 0.5) / 18) * Math.PI;
  const n = (r / 32) * Math.PI * 2 + (a % 2) * (Math.PI / 32);
  const i = (Math.sin(2.4 * n + 1.35 * Math.sin(2.8 * s)) + 1) / 2;
  const l = Math.max(
    0,
    Math.cos(n - 0.75) * Math.cos(s + 0.2),
    Math.cos(n + 2.3) * Math.cos(s - 0.35),
  );
  return {
    ...latLon(s, n),
    intensity: 0.34 + 0.66 * i,
    accent: l > 0.78,
    marker: (a === 5 && r === 5) || (a === 9 && r === 22) || (a === 13 && r === 13),
    orangeMarker: a === 13 && r === 13,
  };
});

const CENTER = fromSvg(270, 226);
const PIN_POS = APP_PINS.map((e) =>
  latLon((e.latitude * Math.PI) / 180, (e.longitude * Math.PI) / 180),
);
const GRANOLA = PIN_POS[APP_PINS.findIndex((e) => e.serverId === 'granola')]!;

const ARCS: { from: Vec3; to: Vec3 }[] = [
  { from: fromSvg(58, 322), to: fromSvg(326, 65) },
  { from: fromSvg(88, 74), to: fromSvg(390, 220) },
  { from: fromSvg(390, 294), to: fromSvg(155, 55) },
  { from: fromSvg(220, 50), to: CENTER },
  { from: GRANOLA, to: CENTER },
];

function arcPaths(from: Vec3, to: Vec3, offset: number, rot: Rot) {
  let full = '';
  let front = '';
  let drawing = false;
  const cross = {
    x: from.y * to.z - from.z * to.y,
    y: from.z * to.x - from.x * to.z,
    z: from.x * to.y - from.y * to.x,
  };
  const len = Math.hypot(cross.x, cross.y, cross.z) || 1;
  const d = { x: cross.x / len, y: cross.y / len, z: cross.z / len };
  const c = {
    x: d.y * from.z - d.z * from.y,
    y: d.z * from.x - d.x * from.z,
    z: d.x * from.y - d.y * from.x,
  };
  const u = Math.sqrt(1 - offset * offset);
  for (let t = 0; t <= 96; t += 1) {
    const l = (t / 96) * Math.PI * 2;
    const p = rotate(
      {
        x: d.x * offset + u * (from.x * Math.cos(l) + c.x * Math.sin(l)),
        y: d.y * offset + u * (from.y * Math.cos(l) + c.y * Math.sin(l)),
        z: d.z * offset + u * (from.z * Math.cos(l) + c.z * Math.sin(l)),
      },
      rot,
    );
    const m = project(p);
    const pt = `${m.x.toFixed(2)},${m.y.toFixed(2)}`;
    full += `${t === 0 ? 'M' : 'L'}${pt}`;
    if (p.z > 0.01) {
      front += `${drawing ? 'L' : 'M'}${pt}`;
      drawing = true;
    } else {
      drawing = false;
    }
  }
  return { full, front };
}

type DragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startRotateX: number;
  startRotateY: number;
  rotateYConstraints: { min: number; max: number };
};

export default function KnowledgeOrb() {
  const reduce = !!useReducedMotion();
  const [grabbing, setGrabbing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.25 });
  const uid = useId().replace(/:/g, '');
  const clipId = `knowledge-field-${uid}`;

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateXSpring = useSpring(rotateXRaw, SPRING);
  const rotateYSpring = useSpring(rotateYRaw, SPRING);
  const rotateX = reduce ? rotateXRaw : rotateXSpring;
  const rotateY = reduce ? rotateYRaw : rotateYSpring;

  const pointRefs = useRef<(SVGRectElement | null)[]>([]);
  const arcFullRefs = useRef<(SVGPathElement | null)[]>([]);
  const arcFrontRefs = useRef<(SVGPathElement | null)[]>([]);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef(false);
  const focusRef = useRef(false);
  const dragRef = useRef<DragState | null>(null);
  const resumeAt = useRef(0);

  const paint = useCallback(() => {
    const rx = (rotateX.get() * Math.PI) / 180;
    const ry = (rotateY.get() * Math.PI) / 180;
    const rot: Rot = {
      cosX: Math.cos(rx),
      sinX: Math.sin(rx),
      cosY: Math.cos(ry),
      sinY: Math.sin(ry),
    };

    POINTS.forEach((pt, i) => {
      const el = pointRefs.current[i];
      if (!el) return;
      const s = rotate(pt, rot);
      const n = project(s);
      const size = (0.5 + 1.05 * n.depth) * (pt.marker ? 2.3 : 1);
      el.setAttribute('x', String(n.x - size / 2));
      el.setAttribute('y', String(n.y - size / 2));
      el.setAttribute('width', String(size));
      el.setAttribute('height', String(size));
      el.setAttribute('rx', String(0.2 * size));
      el.setAttribute(
        'opacity',
        String(s.z > 0 ? (0.035 + 0.38 * Math.pow(n.depth, 0.65)) * pt.intensity : 0),
      );
      el.setAttribute(
        'fill',
        pt.orangeMarker
          ? 'color-mix(in srgb, #fe9a00 72%, #a3a3a3)'
          : pt.accent
            ? 'color-mix(in srgb, #fb3c98 72%, #a3a3a3)'
            : 'color-mix(in srgb, #f9a8d4 72%, #a3a3a3)',
      );
    });

    ARCS.forEach((arc, i) => {
      const paths = arcPaths(arc.from, arc.to, 0, rot);
      arcFullRefs.current[i]?.setAttribute('d', paths.full);
      arcFrontRefs.current[i]?.setAttribute('d', paths.front);
    });

    const place = (node: HTMLElement | null, p: Vec3) => {
      if (!node) return;
      const s = rotate(p, rot);
      const n = project(s);
      node.style.left = `${(n.x / 440) * 100}%`;
      node.style.top = `${(n.y / 440) * 100}%`;
      node.style.transform = `translate(-50%, -50%) scale(${0.82 + 0.18 * n.depth})`;
      node.style.zIndex = String(Math.round(10 * n.depth) + 1);
      node.toggleAttribute('data-behind', s.z <= 0.12);
    };
    place(centerRef.current, CENTER);
    PIN_POS.forEach((p, i) => place(pinRefs.current[i], p));
  }, [rotateX, rotateY]);

  useMotionValueEvent(rotateX, 'change', paint);
  useMotionValueEvent(rotateY, 'change', paint);
  useEffect(() => {
    const id = requestAnimationFrame(() => paint());
    return () => cancelAnimationFrame(id);
  }, [paint]);

  // Seed one paint after layout so the sphere isn't blank before the first yaw tick.
  useEffect(() => {
    rotateYRaw.set(18);
  }, [rotateYRaw]);

  useEffect(() => {
    if (reduce || !inView) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      if (!dragRef.current && now >= resumeAt.current) {
        rotateYRaw.set(rotateYRaw.get() + (dt / 1000) * 4.5);
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, reduce, rotateYRaw]);

  const snapY = (target: number) =>
    360 * Math.round((rotateYRaw.get() - target) / 360) + target;

  const reset = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(snapY(0));
    resumeAt.current = performance.now() + 1800;
  };

  const endDrag = (e: ReactPointerEvent, cancel: boolean) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    rotateXRaw.set(
      cancel
        ? drag.startRotateX
        : snapClamp(rotateXRaw.get(), ROTATE_X_LIMITS, 12),
    );
    rotateYRaw.set(
      cancel
        ? drag.startRotateY
        : snapClamp(rotateYRaw.get(), drag.rotateYConstraints, 15),
    );
    resumeAt.current = performance.now() + 1800;
    setGrabbing(hoverRef.current || focusRef.current);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (
      e.key.startsWith('Arrow') ||
      e.key === 'Home' ||
      e.key === 'End' ||
      e.key === 'Escape'
    ) {
      e.preventDefault();
      resumeAt.current = performance.now() + 1800;
    }
    if (e.key === 'ArrowUp') {
      rotateXRaw.set(snapClamp(rotateXRaw.get() - 12, ROTATE_X_LIMITS, 12));
    }
    if (e.key === 'ArrowDown') {
      rotateXRaw.set(snapClamp(rotateXRaw.get() + 12, ROTATE_X_LIMITS, 12));
    }
    if (e.key === 'ArrowLeft') rotateYRaw.set(rotateYRaw.get() - 15);
    if (e.key === 'ArrowRight') rotateYRaw.set(rotateYRaw.get() + 15);
    if (e.key === 'Home' || e.key === 'Escape') reset();
    if (e.key === 'End') {
      rotateXRaw.set(0);
      rotateYRaw.set(snapY(180));
    }
  };

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-label="Interactive company knowledge orb. Drag to rotate, use arrow keys, or use Home and End for rotation presets."
      className="gl-knowledge-orb relative isolate flex size-full min-h-[20rem] touch-none items-center justify-center overflow-hidden outline-none select-none focus-visible:ring-2 focus-visible:ring-pink-500/45 focus-visible:ring-inset active:cursor-grabbing"
      onPointerDown={(e) => {
        if (dragRef.current || (e.pointerType === 'mouse' && e.button !== 0)) return;
        setGrabbing(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        resumeAt.current = Infinity;
        const y = rotateYRaw.get();
        dragRef.current = {
          pointerId: e.pointerId,
          startClientX: e.clientX,
          startClientY: e.clientY,
          startRotateX: rotateXRaw.get(),
          startRotateY: y,
          rotateYConstraints: { min: y - 180, max: y + 180 },
        };
      }}
      onPointerEnter={() => {
        hoverRef.current = true;
        if (!reduce) setGrabbing(true);
      }}
      onPointerLeave={() => {
        hoverRef.current = false;
        if (!dragRef.current) setGrabbing(false);
      }}
      onPointerMove={(e) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== e.pointerId) return;
        e.preventDefault();
        const dx = e.clientX - drag.startClientX;
        const dy = e.clientY - drag.startClientY;
        rotateXRaw.set(softClamp(drag.startRotateX - 0.3 * dy, ROTATE_X_LIMITS));
        rotateYRaw.set(
          softClamp(drag.startRotateY + 0.45 * dx, drag.rotateYConstraints),
        );
      }}
      onPointerUp={(e) => endDrag(e, false)}
      onPointerCancel={(e) => endDrag(e, true)}
      onLostPointerCapture={(e) => endDrag(e, true)}
      onDoubleClick={reset}
      onFocus={() => {
        focusRef.current = true;
        if (!reduce) setGrabbing(true);
      }}
      onBlur={() => {
        focusRef.current = false;
        if (!dragRef.current) setGrabbing(false);
      }}
      onKeyDown={onKeyDown}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(160%,108%)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{ border: '1px solid color-mix(in srgb, var(--color-line) 82%, #737373)' }}
      />

      <div
        className={`relative aspect-square max-h-[min(100%,440px)] w-[min(92%,440px)] shrink-0 transition-transform duration-500 ${
          grabbing ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute rounded-full"
          style={{
            left: '11.363636363636363%',
            top: '11.363636363636363%',
            width: '77.27272727272727%',
            height: '77.27272727272727%',
            background:
              'radial-gradient(circle at 31% 25%, color-mix(in srgb, #fff 96%, transparent) 0%, color-mix(in srgb, #fff 64%, transparent) 27%, color-mix(in srgb, #fff 32%, transparent) 58%, color-mix(in srgb, #fff 12%, transparent) 100%)',
            boxShadow:
              'inset 0 -12px 20px -18px rgba(0,0,0,0.08), 0 2px 8px -6px rgba(0,0,0,0.1), 0 14px 28px -24px rgba(0,0,0,0.12)',
          }}
        />

        <svg aria-hidden viewBox="0 0 440 440" fill="none" className="absolute inset-0 size-full">
          <defs>
            <clipPath id={clipId}>
              <circle cx="220" cy="220" r="170" />
            </clipPath>
            <radialGradient id={`${clipId}-edge`} gradientUnits="userSpaceOnUse" cx="220" cy="220" r="170">
              <stop offset="0%" stopColor="white" />
              <stop offset="72%" stopColor="white" />
              <stop offset="88%" stopColor="white" stopOpacity="0.78" />
              <stop offset="100%" stopColor="white" stopOpacity="0.42" />
            </radialGradient>
            <mask id={`${clipId}-mask`} maskUnits="userSpaceOnUse" x="50" y="50" width="340" height="340">
              <circle cx="220" cy="220" r="170" fill={`url(#${clipId}-edge)`} />
            </mask>
          </defs>
          <circle
            cx="220"
            cy="220"
            r="170"
            stroke="color-mix(in srgb, var(--color-line) 72%, #737373)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1.4 7"
            vectorEffect="non-scaling-stroke"
            opacity="0.72"
          />
          <g clipPath={`url(#${clipId})`} mask={`url(#${clipId}-mask)`}>
            {POINTS.map((_, i) => (
              <rect
                key={i}
                ref={(el) => {
                  pointRefs.current[i] = el;
                }}
              />
            ))}
            {ARCS.map((_, i) => (
              <g key={i}>
                <path
                  ref={(el) => {
                    arcFullRefs.current[i] = el;
                  }}
                  fill="none"
                  stroke="color-mix(in srgb, var(--color-line) 76%, #737373)"
                  strokeWidth="1.35"
                  opacity="0.28"
                />
                <path
                  ref={(el) => {
                    arcFrontRefs.current[i] = el;
                  }}
                  fill="none"
                  stroke={
                    i === 0
                      ? '#f9a8d4'
                      : i === 1
                        ? '#93c5fd'
                        : i === ARCS.length - 1
                          ? '#f472b6'
                          : 'color-mix(in srgb, var(--color-line) 72%, #737373)'
                  }
                  strokeWidth="1.35"
                  opacity={i === ARCS.length - 1 ? 0.7 : 0.55}
                  strokeDasharray="0.24 0.76"
                  pathLength={1}
                />
              </g>
            ))}
          </g>
        </svg>

        <div
          ref={centerRef}
          aria-hidden
          className="group absolute"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="relative size-11 transition-[opacity,transform] duration-200 group-data-[behind]:scale-50 group-data-[behind]:opacity-0">
            <span className="absolute -inset-5 rounded-full bg-pink-500/5 blur-2xl" />
            <div className="relative flex size-full items-center justify-center rounded-full bg-ink text-[11px] font-bold tracking-tight text-white">
              T
            </div>
          </div>
        </div>

        {APP_PINS.map((pin, i) => (
          <div
            key={pin.serverId}
            ref={(el) => {
              pinRefs.current[i] = el;
            }}
            aria-hidden
            className="group absolute"
          >
            <div className="flex size-7 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-[opacity,transform] duration-200 group-data-[behind]:scale-50 group-data-[behind]:opacity-0">
              <DemoFavicon domain={pin.domain} size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Keep motion import warm for future digit animation hooks */}
      <motion.span className="sr-only" aria-hidden>
        {grabbing ? 'grabbing' : 'idle'}
      </motion.span>
    </div>
  );
}
