import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const OG_FONTS_DIR = join(process.cwd(), 'public/og-fonts');
const SHARED_FONTS_DIR = join(process.cwd(), 'public/fonts');

const FONT_FILES = {
  erode: 'Erode-Variable.ttf',
  inter: 'Inter-VariableFont_opsz,wght.ttf',
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

async function loadFont(dir: string, fileName: string): Promise<ArrayBuffer> {
  const cacheKey = `${dir}/${fileName}`;
  const cached = fontCache.get(cacheKey);
  if (cached) return cached;

  const buffer = await readFile(join(dir, fileName));
  const data = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
  fontCache.set(cacheKey, data);
  return data;
}

export async function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(OG_FONTS_DIR, FONT_FILES.erode),
      loadFont(SHARED_FONTS_DIR, FONT_FILES.inter),
      loadFont(OG_FONTS_DIR, FONT_FILES.robotoMono400),
      loadFont(OG_FONTS_DIR, FONT_FILES.robotoMono700),
      loadFont(OG_FONTS_DIR, FONT_FILES.silkscreen400),
    ]).then(([erode, inter, mono400, mono700, silkscreen400]) => [
      { name: 'Erode', data: erode, weight: 400 as const, style: 'normal' as const },
      { name: 'Erode', data: erode, weight: 700 as const, style: 'normal' as const },
      { name: 'Inter', data: inter, weight: 400 as const, style: 'normal' as const },
      { name: 'Inter', data: inter, weight: 700 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono400, weight: 400 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono700, weight: 700 as const, style: 'normal' as const },
      { name: 'Silkscreen', data: silkscreen400, weight: 400 as const, style: 'normal' as const },
    ]);
  }

  return fontsPromise;
}
