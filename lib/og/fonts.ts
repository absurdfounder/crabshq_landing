import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const OG_FONTS_DIR = join(process.cwd(), 'public/og-fonts');

// Satori (@vercel/og) cannot parse variable TTFs (fvar table). Use static cuts only.
const FONT_FILES = {
  display400: 'FunnelDisplay-400.ttf',
  display700: 'FunnelDisplay-700.ttf',
  inter400: 'Inter-400.ttf',
  inter700: 'Inter-700.ttf',
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

  const buffer = await readFile(join(OG_FONTS_DIR, fileName));
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  fontCache.set(fileName, data);
  return data;
}

export async function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(FONT_FILES.display400),
      loadFont(FONT_FILES.display700),
      loadFont(FONT_FILES.inter400),
      loadFont(FONT_FILES.inter700),
      loadFont(FONT_FILES.robotoMono400),
      loadFont(FONT_FILES.robotoMono700),
      loadFont(FONT_FILES.silkscreen400),
    ]).then(([display400, display700, inter400, inter700, mono400, mono700, silkscreen400]) => [
      // Registered as Erode so OG render styles stay aligned with the site display face.
      { name: 'Erode', data: display400, weight: 400 as const, style: 'normal' as const },
      { name: 'Erode', data: display700, weight: 700 as const, style: 'normal' as const },
      { name: 'Inter', data: inter400, weight: 400 as const, style: 'normal' as const },
      { name: 'Inter', data: inter700, weight: 700 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono400, weight: 400 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono700, weight: 700 as const, style: 'normal' as const },
      { name: 'Silkscreen', data: silkscreen400, weight: 400 as const, style: 'normal' as const },
    ]);
  }

  return fontsPromise;
}
