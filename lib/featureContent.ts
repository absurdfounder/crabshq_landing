import type { SubpageBenefit } from '@/lib/subpageContent';
import { getFeaturePage, FEATURE_DEMO_MAP, allFeatureSlugs } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import { canvasFeatureSection } from '@/lib/marketingFeatures';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

export type FeaturePageContent = {
  slug: string;
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  demoId: DemoScenarioId;
  featureSections: MarketingFeatureSection[];
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

const FEATURE_SECTIONS: Record<string, MarketingFeatureSection[]> = {
  'ai-workforce': [
    {
      eyebrow: 'Orchestration',
      eyebrowNumber: '03',
      tag: 'MULTI-AGENT',
      title: 'Launch coordination across',
      titleHighlight: 'parallel agents.',
      intro: 'Product Hunt, press wire, and social cuts run as traced missions — one org, shared memory, human command.',
      visual: 'launch-ops',
    },
    canvasFeatureSection('04'),
  ],
  'github-integration': [
    {
      eyebrow: 'Harness',
      eyebrowNumber: '03',
      tag: 'GITHUB OPS',
      title: 'Real commits, PRs, and',
      titleHighlight: 'CI traces.',
      intro: 'Agents open PRs, run tests, and attach diffs — not suggestions in chat.',
      visual: 'coding-harness',
    },
    canvasFeatureSection('04'),
  ],
  'task-execution': [
    {
      eyebrow: 'Pipeline',
      eyebrowNumber: '03',
      title: 'Tickets from inbox to done',
      intro: 'Full thread with tool traces, subtasks, and deliverables — sales outreach shown end-to-end.',
      visual: 'sales-pipeline',
    },
    canvasFeatureSection('04'),
  ],
  'persistent-memory': [
    {
      eyebrow: 'Memory',
      eyebrowNumber: '03',
      title: 'Context that survives sessions',
      intro: 'Deck updates, channel threads, and prior decisions load automatically on the next mission.',
      visual: 'messaging-routing',
    },
    canvasFeatureSection('04'),
  ],
  'browser-control': [
    {
      eyebrow: 'Browser',
      eyebrowNumber: '03',
      tag: 'WEB AUTOMATION',
      title: 'Navigate, snapshot, and',
      titleHighlight: 'extract on any site.',
      intro: 'Real browser sessions with SERP captures and structured research output on traced tickets.',
      visual: 'browser-serp',
    },
    canvasFeatureSection('04'),
  ],
  'system-access': [
    {
      eyebrow: 'Runtime',
      eyebrowNumber: '03',
      title: 'Shell, logs, and kubectl on your VPS',
      intro: 'Incident response with terminal traces, log review, and rollback verification.',
      visual: 'engineering-incident',
    },
    canvasFeatureSection('04'),
  ],
  'email-automation': [
    {
      eyebrow: 'Inbox',
      eyebrowNumber: '03',
      title: 'RFP to structured ticket',
      intro: 'Email parsed into tickets with research, drafts, and approval gates before send.',
      visual: 'email-routing',
    },
    canvasFeatureSection('04'),
  ],
  'skills-plugins': [
    {
      eyebrow: 'Integrations',
      eyebrowNumber: '03',
      tag: 'COMPOSIO SKILLS',
      title: '3,000+ skills at runtime',
      intro: 'Notion, Figma, HubSpot, and more — tool rows show Composio logos on every traced step.',
      visual: 'campaign-pipeline',
    },
    canvasFeatureSection('04'),
  ],
  'multi-agent-collaboration': [
    {
      eyebrow: 'Harness',
      eyebrowNumber: '03',
      title: 'Parallel agents, one board',
      intro: 'Claude Code, Codex, and OpenCode side-by-side with live diffs and provider logos.',
      visual: 'coding-harness',
    },
    {
      eyebrow: 'Board',
      eyebrowNumber: '04',
      tag: 'CANVAS + CI',
      title: 'Diffs and PR bundles',
      titleHighlight: 'on Canvas.',
      intro: 'Parser diff, CI log, and PR body visible together — handoffs without copy-paste.',
      visual: 'coding-board',
    },
  ],
  'openclaw-powered': [
    {
      eyebrow: 'Runtime',
      eyebrowNumber: '03',
      tag: 'OPENCLAW',
      title: 'Private server per org',
      intro: 'Org-scale launch ops on a dedicated OpenClaw runtime with full audit trails.',
      visual: 'launch-ops',
    },
    canvasFeatureSection('04'),
  ],
  'chat-interfaces': [
    {
      eyebrow: 'Routing',
      eyebrowNumber: '03',
      title: 'Slack thread to traced ticket',
      intro: 'Channel messages become tickets with preserved context and tool traces.',
      visual: 'slack-routing',
    },
    canvasFeatureSection('04'),
  ],
};

const DEFAULT_FEATURE_SECTIONS: MarketingFeatureSection[] = [
  {
    eyebrow: 'Execution',
    eyebrowNumber: '03',
    title: 'Tickets from inbox to done',
    intro: 'Multi-step work with tool traces, subtasks, and deliverables — not chat-only answers.',
    visual: 'sales-pipeline',
  },
  canvasFeatureSection('04'),
];

function buildRichFeature(slug: string): FeaturePageContent | undefined {
  const base = getFeaturePage(slug);
  if (!base) return undefined;

  return {
    slug: base.slug,
    missionLabel: base.missionLabel,
    title: base.title,
    titleAccent: base.titleAccent,
    description: base.description,
    overviewTitle: base.overviewTitle,
    overviewParagraphs: base.overviewParagraphs,
    benefits: base.benefits,
    demoId: FEATURE_DEMO_MAP[slug] ?? base.demoId,
    featureSections: FEATURE_SECTIONS[slug] ?? DEFAULT_FEATURE_SECTIONS,
    meta: base.meta,
  };
}

const richFeatureSlugs = allFeatureSlugs();

const featurePages: Record<string, FeaturePageContent> = Object.fromEntries(
  richFeatureSlugs
    .map((slug) => {
      const page = buildRichFeature(slug);
      return page ? [slug, page] as const : null;
    })
    .filter((entry): entry is [string, FeaturePageContent] => entry !== null),
);

export const richFeaturePageSlugs = new Set(Object.keys(featurePages));

export function getFeaturePageContent(slug: string): FeaturePageContent | undefined {
  return featurePages[slug];
}

export function allRichFeatureSlugs(): string[] {
  return Object.keys(featurePages);
}

export const featureSocialImage = SOCIAL_IMAGE;
