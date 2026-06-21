import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ASSETS_DIR = join(process.cwd(), 'public/og-fonts');

const FONT_FILES = {
  funnelDisplay400: 'FunnelDisplay-400.ttf',
  funnelDisplay700: 'FunnelDisplay-700.ttf',
  robotoMono400: 'RobotoMono-400.ttf',
  robotoMono700: 'RobotoMono-700.ttf',
  silkscreen400: 'Silkscreen-400.ttf',
} as const;

const fontCache = new Map<string, ArrayBuffer>();
let fontsPromise: Promise<
  Array<{
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: 'normal';
  }>
> | null = null;

async function loadFont(fileName: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(fileName);
  if (cached) return cached;

  const buffer = await readFile(join(ASSETS_DIR, fileName));
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  fontCache.set(fileName, data);
  return data;
}

export async function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(FONT_FILES.funnelDisplay400),
      loadFont(FONT_FILES.funnelDisplay700),
      loadFont(FONT_FILES.robotoMono400),
      loadFont(FONT_FILES.robotoMono700),
      loadFont(FONT_FILES.silkscreen400),
    ]).then(([display400, display700, mono400, mono700, silkscreen400]) => [
      { name: 'Funnel Display', data: display400, weight: 400 as const, style: 'normal' as const },
      { name: 'Funnel Display', data: display700, weight: 700 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono400, weight: 400 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono700, weight: 700 as const, style: 'normal' as const },
      { name: 'Silkscreen', data: silkscreen400, weight: 400 as const, style: 'normal' as const },
    ]);
  }

  return fontsPromise;
}
