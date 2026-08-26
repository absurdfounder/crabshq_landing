import { TROOPER_LOGOMARK } from '@/lib/trooperLogomark';
import { getFaviconUrl } from '@/lib/favicon';
import type { HarnessId } from '@/lib/benchmarks';

export type BrandId = 'trooper' | 'anthropic' | 'claude' | 'openai' | 'hermes' | 'deepseek' | 'kimi';

const BRAND_DOMAIN: Record<Exclude<BrandId, 'trooper' | 'deepseek'>, string> = {
  anthropic: 'anthropic.com',
  claude: 'claude.ai',
  openai: 'openai.com',
  hermes: 'nousresearch.com',
  kimi: 'moonshot.ai',
};

export const BRAND_FILL: Record<BrandId, string> = {
  trooper: '#FFFFFF',
  claude: '#E8590C',
  anthropic: '#FFFFFF',
  openai: '#FFFFFF',
  hermes: '#FFFFFF',
  deepseek: '#111111',
  kimi: '#FFFFFF',
};

export function brandForHarness(harness: HarnessId): BrandId {
  if (harness === 'Trooper') return 'trooper';
  if (harness === 'Codex') return 'openai';
  if (harness === 'Hermes') return 'hermes';
  return 'claude';
}

export function brandForModel(model: string): BrandId {
  const n = model.toLowerCase();
  if (n.includes('gpt') || n.includes('codex') || n.includes('chatgpt') || n.includes('luna')) return 'openai';
  if (n.includes('deepseek')) return 'deepseek';
  if (n.includes('kimi')) return 'kimi';
  if (n.includes('hermes')) return 'hermes';
  return 'anthropic';
}

function markSrc(brand: BrandId) {
  if (brand === 'trooper') return TROOPER_LOGOMARK.w128;
  if (brand === 'deepseek') return '/images/deepseek-mark.png';
  return getFaviconUrl(BRAND_DOMAIN[brand], 128);
}

export function BrandTile({
  brand,
  size = 'md',
  className,
}: {
  brand: BrandId;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const box = size === 'sm' ? 'size-[18px]' : 'size-6';
  const radius = className?.includes('rounded-full') ? 'rounded-full' : 'rounded-[4px]';
  return (
    <span
      className={`inline-flex ${box} ${radius} shrink-0 items-center justify-center overflow-hidden ${className ?? ''}`}
      style={{ backgroundColor: BRAND_FILL[brand] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={markSrc(brand)} alt="" className="size-full object-contain p-[2px]" />
    </span>
  );
}

export function PairMarks({ harness, model }: { harness: HarnessId; model: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1">
      <BrandTile brand={brandForHarness(harness)} />
      <BrandTile brand={brandForModel(model)} />
    </span>
  );
}

export function shortModel(model: string) {
  return model
    .replace(/^Claude /, '')
    .replace(/^ChatGPT /, '')
    .replace(/^DeepSeek V4 /, 'DS ')
    .replace(/^DeepSeek /, 'DS ')
    .replace(/^GPT-/, 'GPT ');
}
