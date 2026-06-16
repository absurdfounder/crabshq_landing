const FONT_URLS = {
  funnelDisplay400:
    'https://fonts.gstatic.com/s/funneldisplay/v3/B50bF7FGv37QNVWgE0ga--4PbZSRJXrOHcLHLoAYmmPXWA.ttf',
  funnelDisplay700:
    'https://fonts.gstatic.com/s/funneldisplay/v3/B50bF7FGv37QNVWgE0ga--4PbZSRJXrOHcLHLoAYfWTXWA.ttf',
  robotoMono400:
    'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_3vqPQw.ttf',
  robotoMono700:
    'https://fonts.gstatic.com/s/robotomono/v31/L0xuDF4xlVMF-BfR8bXMIhJHg45mwgGEFl0_Of2PQw.ttf',
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

async function loadFont(url: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load OG font: ${url}`);
  }

  const data = await response.arrayBuffer();
  fontCache.set(url, data);
  return data;
}

export async function loadOgFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      loadFont(FONT_URLS.funnelDisplay400),
      loadFont(FONT_URLS.funnelDisplay700),
      loadFont(FONT_URLS.robotoMono400),
      loadFont(FONT_URLS.robotoMono700),
    ]).then(([display400, display700, mono400, mono700]) => [
      { name: 'Funnel Display', data: display400, weight: 400 as const, style: 'normal' as const },
      { name: 'Funnel Display', data: display700, weight: 700 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono400, weight: 400 as const, style: 'normal' as const },
      { name: 'Roboto Mono', data: mono700, weight: 700 as const, style: 'normal' as const },
    ]);
  }

  return fontsPromise;
}
