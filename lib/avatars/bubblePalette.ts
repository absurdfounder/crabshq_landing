/** Mix hex toward black/white. Amount 0 = hex, 1 = target. Lowercase output. */
export function mixHex(hex: string, target: string, amount: number): string {
  const a = parse(hex);
  const b = parse(target);
  const t = Math.min(1, Math.max(0, amount));
  return toHex(
    Math.round(a.r + (b.r - a.r) * t),
    Math.round(a.g + (b.g - a.g) * t),
    Math.round(a.b + (b.b - a.b) * t),
  );
}

function parse(hex: string) {
  const h = hex.replace('#', '').toLowerCase();
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('')}`;
}

export type BubbleStops = {
  fill: [string, string][];
  stroke: [string, string][];
};

/**
 * Ask + reply bubbles tinted from a cast accent.
 * Dark enough for white type; same hue family as the character.
 */
export function bubblePaletteFromAccent(accent: string): { ask: BubbleStops; reply: BubbleStops } {
  const askDeep = mixHex(accent, '#0a0a0a', 0.78);
  const askMid = mixHex(accent, '#0a0a0a', 0.68);
  const askTop = mixHex(accent, '#0a0a0a', 0.58);
  const askStroke = mixHex(accent, '#0a0a0a', 0.48);

  const replyDeep = mixHex(accent, '#0a0a0a', 0.42);
  const replyMid = mixHex(accent, '#0a0a0a', 0.32);
  const replyTop = mixHex(accent, '#0a0a0a', 0.22);
  const replyStroke = mixHex(accent, '#ffffff', 0.18);

  return {
    ask: {
      fill: [
        ['0', askTop],
        ['0.55', askMid],
        ['1', askDeep],
      ],
      stroke: [
        ['0', askStroke],
        ['1', askDeep],
      ],
    },
    reply: {
      fill: [
        ['0', replyTop],
        ['0.55', replyMid],
        ['1', replyDeep],
      ],
      stroke: [
        ['0', replyStroke],
        ['1', replyMid],
      ],
    },
  };
}
