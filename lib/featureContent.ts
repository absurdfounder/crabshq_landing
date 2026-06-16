import type { SubpageBenefit } from '@/lib/subpageContent';
import { getFeaturePage, FEATURE_DEMO_MAP, allFeatureSlugs } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import { canvasFeatureSection, marketingCanvasFeatureSection } from '@/lib/marketingFeatures';
import { getFeaturePlaybook } from '@/lib/playbookWorkflowContent';
import { bumpFeatureSectionNumbers, getSubpageSectionOffset } from '@/lib/subpageSections';

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
  playbookWorkflow?: PlaybookWorkflowContent;
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
    {
      eyebrow: 'Memory',
      eyebrowNumber: '04',
      title: 'Org context across every agent',
      intro: 'Brand voice, ICP, and prior campaign learnings load automatically — no re-briefing each mission.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Channels',
      eyebrowNumber: '05',
      title: 'Slack threads stay linked',
      intro: 'Channel handoffs preserve context and tool traces when work moves from chat to the board.',
      visual: 'slack-routing',
    },
    canvasFeatureSection('06'),
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
    {
      eyebrow: 'Diffs',
      eyebrowNumber: '04',
      title: 'Unified diffs and green CI',
      intro: 'Parser patches, test output, and PR bodies visible together on the ticket Canvas.',
      visual: 'coding-board',
    },
    {
      eyebrow: 'Incidents',
      eyebrowNumber: '05',
      title: 'Rollback with full terminal trace',
      intro: 'Failed deploys triaged with log review and verification steps logged on the mission thread.',
      visual: 'engineering-incident',
    },
    canvasFeatureSection('06'),
  ],
  'task-execution': [
    {
      eyebrow: 'Pipeline',
      eyebrowNumber: '03',
      title: 'Tickets from inbox to done',
      intro: 'Full thread with tool traces, subtasks, and deliverables — sales outreach shown end-to-end.',
      visual: 'sales-pipeline',
    },
    {
      eyebrow: 'Inbox',
      eyebrowNumber: '04',
      title: 'Email becomes a structured ticket',
      intro: 'Inbound requests parsed into missions with research, drafts, and approval gates before send.',
      visual: 'email-routing',
    },
    {
      eyebrow: 'Runbook',
      eyebrowNumber: '05',
      title: 'Recurring tasks on schedule',
      intro: 'Cron-driven checklists with step-by-step logging — ops routines that run while you command.',
      visual: 'ops-runbook',
    },
    canvasFeatureSection('06'),
  ],
  'persistent-memory': [
    {
      eyebrow: 'Memory',
      eyebrowNumber: '03',
      title: 'Context that survives sessions',
      intro: 'Deck updates, channel threads, and prior decisions load automatically on the next mission.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Slack',
      eyebrowNumber: '04',
      title: 'Channel history on the ticket',
      intro: 'Slack threads linked to missions preserve decisions and handoffs across agent sessions.',
      visual: 'slack-routing',
    },
    {
      eyebrow: 'Email',
      eyebrowNumber: '05',
      title: 'Inbox threads compound over time',
      intro: 'Prior email context and RFP history load on follow-up missions — no starting from zero.',
      visual: 'email-routing',
    },
    canvasFeatureSection('06'),
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
    {
      eyebrow: 'Research',
      eyebrowNumber: '04',
      title: 'Structured intel from the web',
      intro: 'Multi-source notes merged into comparison matrices and exec briefs on traced tickets.',
      visual: 'research-intel',
    },
    {
      eyebrow: 'Launch',
      eyebrowNumber: '05',
      title: 'Competitive page captures',
      intro: 'Landing and pricing pages archived with citations for GTM and product review.',
      visual: 'launch-ops',
    },
    canvasFeatureSection('06'),
  ],
  'system-access': [
    {
      eyebrow: 'Runtime',
      eyebrowNumber: '03',
      title: 'Shell, logs, and kubectl on your VPS',
      intro: 'Incident response with terminal traces, log review, and rollback verification.',
      visual: 'engineering-incident',
    },
    {
      eyebrow: 'Runbook',
      eyebrowNumber: '04',
      title: 'Scheduled health checks',
      intro: 'Recurring VPS routines with step logging — backups, disk checks, and service restarts on cron.',
      visual: 'ops-runbook',
    },
    {
      eyebrow: 'Audit',
      eyebrowNumber: '05',
      title: 'Log review on your runtime',
      intro: 'Production log patrols surface anomalies with severity tiers before they become incidents.',
      visual: 'security-audit',
    },
    canvasFeatureSection('06'),
  ],
  'email-automation': [
    {
      eyebrow: 'Inbox',
      eyebrowNumber: '03',
      title: 'RFP to structured ticket',
      intro: 'Email parsed into tickets with research, drafts, and approval gates before send.',
      visual: 'email-routing',
    },
    {
      eyebrow: 'Pipeline',
      eyebrowNumber: '04',
      title: 'Outbound prep from inbound mail',
      intro: 'RFPs become qualified opportunities with research, outreach drafts, and CRM updates traced.',
      visual: 'sales-pipeline',
    },
    {
      eyebrow: 'Governance',
      eyebrowNumber: '05',
      title: 'Human review before send',
      intro: 'Reply and proposal drafts held for approval — sensitive comms never ship without command.',
      visual: 'legal-review',
    },
    canvasFeatureSection('06'),
  ],
  'skills-plugins': [
    {
      eyebrow: 'Integrations',
      eyebrowNumber: '03',
      tag: 'COMPOSIO SKILLS',
      title: 'Figma, Sheets, and Gmail',
      titleHighlight: 'traced on campaign missions.',
      intro: 'Marketing agents call Composio skills — figma_export, sheets_update, and gmail_draft show logos on every tool row.',
      bullets: [
        '3,000+ skills available at runtime',
        'Integration logos on every traced step',
        'Campaign pack compiles to Canvas for review',
      ],
      visual: 'marketing-harness',
    },
    {
      eyebrow: 'Design',
      eyebrowNumber: '04',
      title: 'Figma frames via Composio',
      intro: 'Frame exports, asset bundles, and brand checklists wired through traced skill calls.',
      visual: 'design-pipeline',
    },
    {
      eyebrow: 'Support',
      eyebrowNumber: '05',
      title: 'Zendesk and KB skills',
      intro: 'Ticket triage, article lookup, and reply drafts with tool logos on every step.',
      visual: 'support-queue',
    },
    marketingCanvasFeatureSection('06'),
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
    {
      eyebrow: 'Coordination',
      eyebrowNumber: '05',
      tag: 'MULTI-AGENT',
      title: 'Launch missions in parallel',
      intro: 'Press, social, and product assets run as coordinated subtasks — one org, shared memory.',
      visual: 'launch-ops',
    },
    canvasFeatureSection('06'),
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
    {
      eyebrow: 'Shell',
      eyebrowNumber: '04',
      title: 'Terminal access on your VPS',
      intro: 'Incident response with kubectl, log tail, and rollback verification on the private runtime.',
      visual: 'engineering-incident',
    },
    {
      eyebrow: 'Cron',
      eyebrowNumber: '05',
      title: 'Org routines on schedule',
      intro: 'Background checklists and patrol missions run 24/7 with full audit trails.',
      visual: 'ops-runbook',
    },
    canvasFeatureSection('06'),
  ],
  'chat-interfaces': [
    {
      eyebrow: 'Routing',
      eyebrowNumber: '03',
      title: 'Slack thread to traced ticket',
      intro: 'Channel messages become tickets with preserved context and tool traces.',
      visual: 'slack-routing',
    },
    {
      eyebrow: 'WhatsApp',
      eyebrowNumber: '04',
      title: 'Mobile messages to missions',
      intro: 'WhatsApp threads parsed into structured tickets with the same traceability as Slack.',
      visual: 'whatsapp-routing',
    },
    {
      eyebrow: 'Memory',
      eyebrowNumber: '05',
      title: 'Cross-channel context persists',
      intro: 'Prior channel decisions and handoffs load on the next mission — chat history compounds.',
      visual: 'messaging-routing',
    },
    canvasFeatureSection('06'),
  ],
};

type FeaturePageExtras = Record<string, never>;

const FEATURE_EXTRAS: Partial<Record<string, FeaturePageExtras>> = {};

const DEFAULT_FEATURE_SECTIONS: MarketingFeatureSection[] = [
  {
    eyebrow: 'Execution',
    eyebrowNumber: '03',
    title: 'Tickets from inbox to done',
    intro: 'Multi-step work with tool traces, subtasks, and deliverables — not chat-only answers.',
    visual: 'sales-pipeline',
  },
  {
    eyebrow: 'Inbox',
    eyebrowNumber: '04',
    title: 'Email to structured mission',
    intro: 'Inbound requests parsed into tickets with research and approval gates.',
    visual: 'email-routing',
  },
  {
    eyebrow: 'Channels',
    eyebrowNumber: '05',
    title: 'Slack context on the board',
    intro: 'Channel threads linked to missions preserve handoffs across sessions.',
    visual: 'slack-routing',
  },
  canvasFeatureSection('06'),
];

function buildRichFeature(slug: string): FeaturePageContent | undefined {
  const base = getFeaturePage(slug);
  if (!base) return undefined;

  const extras = FEATURE_EXTRAS[slug] ?? {};
  const playbookWorkflow = getFeaturePlaybook(slug);
  const sectionOffset = getSubpageSectionOffset({ playbookWorkflow });
  const baseSections = FEATURE_SECTIONS[slug] ?? DEFAULT_FEATURE_SECTIONS;

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
    playbookWorkflow,
    featureSections: bumpFeatureSectionNumbers(baseSections, sectionOffset),
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
