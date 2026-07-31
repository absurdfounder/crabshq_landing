'use client';

import React, { useRef, useState } from 'react';

/**
 * A desktop object the visitor can pick up and move.
 *
 * Pointer-capture drag: position is a translate applied on top of the item's
 * authored left/top, so server and first client render agree (delta starts at
 * 0,0) and the scripted layout is the resting state. `touch-action: none` so
 * a finger drag moves the object instead of scrolling the page.
 *
 * The wrapper — not the child — owns pointer events, because the whole scene
 * layer is `pointer-events-none` (it must never block the hero copy or CTAs).
 */
export default function Draggable({
  x,
  y,
  className = '',
  rotate = 0,
  label,
  dataId,
  children,
}: {
  /** Resting position, in stage pixels. */
  x: number;
  y: number;
  className?: string;
  rotate?: number;
  /** Accessible name for the movable object; decor passes none and stays hidden. */
  label?: string;
  /** data-dh id so the choreography engine can resolve this object's live position. */
  dataId?: string;
  children: React.ReactNode;
}) {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const origin = useRef({ px: 0, py: 0, x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Ignore secondary buttons; leave right-click alone.
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.currentTarget.setPointerCapture(e.pointerId);
    origin.current = { px: e.clientX, py: e.clientY, x: delta.x, y: delta.y };
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    setDelta({
      x: origin.current.x + e.clientX - origin.current.px,
      y: origin.current.y + e.clientY - origin.current.py,
    });
  };

  const endDrag = () => setDragging(false);

  return (
    <div
      data-dh={dataId}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`absolute select-none ${dragging ? 'z-30 cursor-grabbing' : 'cursor-grab'} ${className}`}
      style={{
        left: x,
        top: y,
        touchAction: 'none',
        pointerEvents: 'auto',
        transform: `translate(${delta.x}px, ${delta.y}px) rotate(${rotate}deg)`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {children}
    </div>
  );
}
