/**
 * Geometry helpers for the hero demo.
 *
 * The demo renders on a fixed-size canvas that `DemoScaleFrame` shrinks with a
 * CSS `transform: scale(...)`. `getBoundingClientRect()` reports post-transform
 * screen pixels, but anything positioned inside the canvas (the ghost cursor,
 * the drag overlay) is laid out in unscaled canvas pixels. Mixing the two makes
 * overlays land short of their targets by the scale factor, so every measurement
 * has to go through here.
 */

export type CanvasPoint = { x: number; y: number };
export type CanvasRect = { x: number; y: number; width: number; height: number };

/** Ratio between painted size and layout size — 1 when the frame isn't scaled. */
export function canvasScale(root: HTMLElement): number {
  const painted = root.getBoundingClientRect().width;
  const layout = root.offsetWidth;
  if (!painted || !layout) return 1;
  return painted / layout;
}

/** An element's box in unscaled canvas coordinates. */
export function rectInCanvas(root: HTMLElement, el: Element): CanvasRect {
  const scale = canvasScale(root) || 1;
  const rootRect = root.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return {
    x: (rect.left - rootRect.left) / scale,
    y: (rect.top - rootRect.top) / scale,
    width: rect.width / scale,
    height: rect.height / scale,
  };
}

/** A viewport point (e.g. from a PointerEvent) in unscaled canvas coordinates. */
export function pointInCanvas(root: HTMLElement, clientX: number, clientY: number): CanvasPoint {
  const scale = canvasScale(root) || 1;
  const rootRect = root.getBoundingClientRect();
  return {
    x: (clientX - rootRect.left) / scale,
    y: (clientY - rootRect.top) / scale,
  };
}

export function distance(a: CanvasPoint, b: CanvasPoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
