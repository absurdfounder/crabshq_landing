/**
 * Filmstrip and waveform extraction, ported from the app's
 * `src/components/video/runtime/mediaCache.js`.
 *
 * This is the thing that makes a timeline read as a timeline: real frames
 * tiled along each video clip and real peaks drawn into each audio clip. The
 * app does it in the browser — point a `<video>` at the file, seek, draw to a
 * canvas — so no build step or ffmpeg is involved, and the demo can use the
 * exact same media the product ships.
 */

const CELL_HEIGHT = 64;

const stripCache = new Map<string, HTMLCanvasElement>();
const peakCache = new Map<string, Float32Array>();
const durationCache = new Map<string, number>();

/** Cell density, from `filmstripCellPlan`. Denser when zoomed in. */
export function filmstripCellPlan(durationSec: number, targetCells?: number) {
  const dur = Math.max(1, Number(durationSec) || 10);
  const maxCells = 160;
  let cellCount = Math.max(24, Math.min(maxCells, Math.round(dur * 1.5)));
  if (targetCells != null) {
    cellCount = Math.max(8, Math.min(maxCells, Math.round(targetCells)));
  }
  return { cellCount, durationSec: dur };
}

function seekVideo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve, reject) => {
    const done = () => { cleanup(); resolve(); };
    const fail = () => { cleanup(); reject(new Error('seek failed')); };
    const cleanup = () => {
      video.removeEventListener('seeked', done);
      video.removeEventListener('error', fail);
      clearTimeout(timer);
    };
    const timer = setTimeout(fail, 4000);
    video.addEventListener('seeked', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    try {
      video.currentTime = Math.max(0, Math.min(time, (video.duration || 1) - 0.02));
    } catch {
      fail();
    }
  });
}

function loadVideo(url: string): Promise<HTMLVideoElement> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    const done = () => { cleanup(); resolve(video); };
    const fail = () => { cleanup(); reject(new Error('load failed')); };
    const cleanup = () => {
      video.removeEventListener('loadeddata', done);
      video.removeEventListener('error', fail);
      clearTimeout(timer);
    };
    const timer = setTimeout(fail, 12000);
    video.addEventListener('loadeddata', done, { once: true });
    video.addEventListener('error', fail, { once: true });
    video.src = url;
    video.load();
  });
}

export function getCachedStrip(url: string): HTMLCanvasElement | null {
  return stripCache.get(url) ?? null;
}

export function getCachedDuration(url: string): number | null {
  return durationCache.get(url) ?? null;
}

/**
 * Tile `cellCount` frames of `url` into one wide canvas. Calls `onProgress`
 * as cells land so the timeline paints early instead of staying blank.
 */
export async function extractFilmstrip(
  url: string,
  { targetCells, onProgress }: { targetCells?: number; onProgress?: (canvas: HTMLCanvasElement) => void } = {},
): Promise<HTMLCanvasElement | null> {
  const cached = stripCache.get(url);
  if (cached) { onProgress?.(cached); return cached; }

  let video: HTMLVideoElement;
  try {
    video = await loadVideo(url);
  } catch {
    return null;
  }

  const duration = Math.max(0.1, Number(video.duration) || 1);
  durationCache.set(url, duration);
  const vw = Math.max(1, video.videoWidth || 16);
  const vh = Math.max(1, video.videoHeight || 9);
  const { cellCount } = filmstripCellPlan(duration, targetCells);
  const cellW = Math.max(24, Math.round(CELL_HEIGHT * (vw / vh)));

  const canvas = document.createElement('canvas');
  canvas.width = cellW * cellCount;
  canvas.height = CELL_HEIGHT;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return null;
  ctx.fillStyle = '#0a0a0c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const progressEvery = Math.max(2, Math.floor(cellCount / 8));

  for (let i = 0; i < cellCount; i += 1) {
    const t = ((i + 0.5) / cellCount) * duration;
    try {
      await seekVideo(video, t);
      ctx.drawImage(video, i * cellW, 0, cellW, CELL_HEIGHT);
    } catch {
      // A failed seek leaves a neutral cell rather than a hole.
      ctx.fillStyle = i % 2 === 0 ? '#1a1f2a' : '#141820';
      ctx.fillRect(i * cellW, 0, cellW, CELL_HEIGHT);
    }
    if (i % progressEvery === 0 || i === cellCount - 1) {
      onProgress?.(canvas);
      // Let the main thread breathe — a dense strip must not block the UI.
      await new Promise<void>((r) => setTimeout(r, 0));
    }
  }

  try {
    video.removeAttribute('src');
    video.load();
  } catch { /* ignore */ }

  stripCache.set(url, canvas);
  return canvas;
}

/**
 * Tile a still across the clip instead of frames.
 *
 * The app falls back to this when video extraction returns nothing
 * (`mediaCache.js:527`), and it matters more than it looks: browsers without
 * H.264 — Firefox on some Linux builds, stripped Chromium — can't decode the
 * clips at all, and a timeline of black rectangles is worse than no timeline.
 */
export async function extractImageStrip(url: string, cellCount = 24): Promise<HTMLCanvasElement | null> {
  const key = `img:${url}`;
  const cached = stripCache.get(key);
  if (cached) return cached;

  const img = await new Promise<HTMLImageElement | null>((resolve) => {
    const el = new Image();
    el.crossOrigin = 'anonymous';
    el.onload = () => resolve(el);
    el.onerror = () => resolve(null);
    el.src = url;
  });
  if (!img) return null;

  const vw = Math.max(1, img.naturalWidth);
  const vh = Math.max(1, img.naturalHeight);
  const cellW = Math.max(24, Math.round(CELL_HEIGHT * (vw / vh)));
  const canvas = document.createElement('canvas');
  canvas.width = cellW * cellCount;
  canvas.height = CELL_HEIGHT;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return null;
  ctx.imageSmoothingQuality = 'high';
  for (let i = 0; i < cellCount; i += 1) {
    ctx.drawImage(img, i * cellW, 0, cellW, CELL_HEIGHT);
  }
  stripCache.set(key, canvas);
  return canvas;
}

/** Does this browser have a decoder for the clips we ship? */
export function canDecodeH264(): boolean {
  if (typeof document === 'undefined') return false;
  const v = document.createElement('video');
  return Boolean(v.canPlayType('video/mp4; codecs="avc1.42E01E"'));
}

/**
 * Deterministic stand-in peaks, from the app's `syntheticPeaks`. Used when the
 * audio can't be decoded — an empty audio track reads as a bug, a plausible
 * waveform reads as audio.
 */
function syntheticPeaks(seed: string, n = 800): Float32Array {
  const peaks = new Float32Array(n);
  let s = 0;
  for (let i = 0; i < seed.length; i += 1) s = (s * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < n; i += 1) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const a = (s & 0xffff) / 0xffff;
    const env = 0.35 + 0.65 * Math.sin((i / n) * Math.PI);
    peaks[i] = Math.max(0.05, a * env);
  }
  return peaks;
}

/** Peak + RMS blend, normalised — the app's `analyzeWaveform`. */
export async function extractWaveform(url: string, samples = 800): Promise<Float32Array> {
  const cached = peakCache.get(url);
  if (cached) return cached;

  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return syntheticPeaks(url, samples);
    const ctx = new AC();
    try {
      const decoded = await ctx.decodeAudioData(buf.slice(0));
      const channel = decoded.getChannelData(0);
      const peaks = new Float32Array(samples);
      const block = Math.max(1, Math.floor(channel.length / samples));
      for (let i = 0; i < samples; i += 1) {
        let peak = 0;
        let sumSq = 0;
        const start = i * block;
        const end = Math.min(channel.length, start + block);
        const n = Math.max(1, end - start);
        for (let j = start; j < end; j += 1) {
          const v = Math.abs(channel[j]);
          if (v > peak) peak = v;
          sumSq += channel[j] * channel[j];
        }
        const rms = Math.sqrt(sumSq / n);
        peaks[i] = Math.max(peak * 0.65 + rms * 0.35, peak * 0.5);
      }
      let max = 0.0001;
      for (let i = 0; i < samples; i += 1) if (peaks[i] > max) max = peaks[i];
      for (let i = 0; i < samples; i += 1) peaks[i] /= max;
      peakCache.set(url, peaks);
      return peaks;
    } finally {
      try { await ctx.close(); } catch { /* ignore */ }
    }
  } catch {
    // No decoder for this container — draw plausible peaks rather than nothing.
    const fallback = syntheticPeaks(url, samples);
    peakCache.set(url, fallback);
    return fallback;
  }
}
