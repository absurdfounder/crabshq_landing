export type DesktopPoint = { x: number; y: number };
export type DesktopSize = { w: number; h: number };
export type DesktopRect = DesktopPoint & DesktopSize;

export const CANVAS_TITLE_BAR_H = 30;
export const CANVAS_STATUS_BAR_H = 18;

export function clampWindowRect(
  rect: DesktopRect,
  stageW: number,
  stageH: number,
  minVisible = 72,
): DesktopRect {
  const maxX = Math.max(0, stageW - minVisible);
  const maxY = Math.max(0, stageH - CANVAS_STATUS_BAR_H - 40);
  const maxW = stageW - rect.x - 4;
  const maxH = stageH - CANVAS_STATUS_BAR_H - rect.y - 4;
  return {
    x: Math.max(0, Math.min(maxX, rect.x)),
    y: Math.max(0, Math.min(maxY, rect.y)),
    w: Math.max(minVisible, Math.min(rect.w, maxW)),
    h: Math.max(56, Math.min(rect.h, maxH)),
  };
}

/** Four-quadrant desktop grid — no overlapping windows. */
export function desktopQuadLayout(
  ids: string[],
  stageW: number,
  stageH: number,
): Record<string, DesktopRect> {
  const margin = 14;
  const gap = 12;
  const cols = 2;
  const rows = Math.max(1, Math.ceil(ids.length / cols));
  const availW = stageW - margin * 2;
  const availH = stageH - CANVAS_STATUS_BAR_H - margin * 2;
  const cellW = (availW - gap * (cols - 1)) / cols;
  const cellH = (availH - gap * (rows - 1)) / rows;

  const out: Record<string, DesktopRect> = {};
  ids.forEach((id, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    out[id] = {
      x: Math.round(margin + col * (cellW + gap)),
      y: Math.round(margin + row * (cellH + gap)),
      w: Math.floor(cellW),
      h: Math.floor(cellH),
    };
  });
  return out;
}

export function scatterLayout(
  ids: string[],
  sizes: Record<string, DesktopSize>,
  stageW: number,
  stageH: number,
): Record<string, DesktopPoint> {
  const margin = 10;
  const offsets = [
    { x: 0, y: 0 },
    { x: 0.46, y: 0.06 },
    { x: 0.08, y: 0.44 },
    { x: 0.42, y: 0.38 },
    { x: 0.24, y: 0.2 },
  ];

  const out: Record<string, DesktopPoint> = {};
  ids.forEach((id, i) => {
    const size = sizes[id] ?? { w: 180, h: 120 };
    const slot = offsets[i % offsets.length];
    const x = margin + slot.x * Math.max(0, stageW - size.w - margin * 2);
    const y = margin + slot.y * Math.max(0, stageH - CANVAS_STATUS_BAR_H - size.h - margin * 2);
    out[id] = { x: Math.round(x), y: Math.round(y) };
  });
  return out;
}

/** Two-column tidy grid that respects each window's size. */
export function tidyGridLayout(
  ids: string[],
  sizes: Record<string, DesktopSize>,
  stageW: number,
  stageH: number,
): Record<string, DesktopPoint> {
  const margin = 8;
  const gap = 10;
  const availH = stageH - CANVAS_STATUS_BAR_H - margin;
  const colW = (stageW - margin * 2 - gap) / 2;
  const leftIds = ids.filter((_, i) => i % 2 === 0);
  const rightIds = ids.filter((_, i) => i % 2 === 1);

  const placeColumn = (columnIds: string[], colIndex: number) => {
    let y = margin;
    const out: Record<string, DesktopPoint> = {};
    for (const id of columnIds) {
      const size = sizes[id] ?? { w: 180, h: 120 };
      const x = margin + colIndex * (colW + gap);
      out[id] = clampWindowRect(
        { x, y, w: size.w, h: size.h },
        stageW,
        stageH,
      );
      y += size.h + gap;
    }
    return out;
  };

  return {
    ...placeColumn(leftIds, 0),
    ...placeColumn(rightIds, 1),
  };
}

/** Spread windows with a slight horizontal stagger on the bottom row. */
export function wideRowLayout(
  ids: string[],
  sizes: Record<string, DesktopSize>,
  stageW: number,
  stageH: number,
): Record<string, DesktopPoint> {
  const base = tidyGridLayout(ids, sizes, stageW, stageH);
  if (ids.length < 3) return base;

  const bottomIds = ids.slice(-2);
  const margin = 8;
  const gap = 12;
  let x = margin;
  const y = stageH - CANVAS_STATUS_BAR_H - margin - Math.max(
    ...bottomIds.map((id) => sizes[id]?.h ?? 120),
  );

  const out = { ...base };
  bottomIds.forEach((id) => {
    const size = sizes[id] ?? { w: 180, h: 120 };
    out[id] = clampWindowRect({ x, y, w: size.w, h: size.h }, stageW, stageH);
    x += size.w + gap;
  });
  return out;
}

export function lerpSize(a: DesktopSize, b: DesktopSize, t: number): DesktopSize {
  return {
    w: Math.round(a.w + (b.w - a.w) * t),
    h: Math.round(a.h + (b.h - a.h) * t),
  };
}

export function lerpLayouts(
  from: Record<string, DesktopPoint>,
  to: Record<string, DesktopPoint>,
  ids: string[],
  t: number,
  lerpFn: (a: number, b: number, t: number) => number,
): Record<string, DesktopPoint> {
  const out = { ...from };
  for (const id of ids) {
    if (!from[id] || !to[id]) continue;
    out[id] = {
      x: lerpFn(from[id].x, to[id].x, t),
      y: lerpFn(from[id].y, to[id].y, t),
    };
  }
  return out;
}

export function lerpSizeMap(
  from: Record<string, DesktopSize>,
  to: Record<string, DesktopSize>,
  ids: string[],
  t: number,
  lerpFn: (a: number, b: number, t: number) => number,
): Record<string, DesktopSize> {
  const out = { ...from };
  for (const id of ids) {
    if (!from[id] || !to[id]) continue;
    out[id] = {
      w: lerpFn(from[id].w, to[id].w, t),
      h: lerpFn(from[id].h, to[id].h, t),
    };
  }
  return out;
}
