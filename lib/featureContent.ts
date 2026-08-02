import type { SubpageBenefit } from '@/lib/subpageContent';
import { getFeaturePage, FEATURE_DEMO_MAP, allFeatureSlugs } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@trooper/demo';
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
      eyebrow: 'Teams',
      eyebrowNumber: '03',
      ask: 'trooper, spin up a team for this launch',
      reply: 'on it — agents coordinating in parallel',
      window: 'Workforce — Launch',
      title: 'AI teams that work together,',
      titleHighlight: 'not lone chatbots.',
      intro:
        'Stand up specialists on one mission — press, product, and social move together with shared context and your approval gates.',
      visual: 'launch-ops',
    },
    {
      eyebrow: 'Memory',
      eyebrowNumber: '04',
      ask: 'trooper, remember our brand and past campaigns',
      reply: 'org context loaded',
      window: 'Workforce — Memory',
      title: 'Context that survives',
      titleHighlight: 'every handoff.',
      intro:
        'Brand voice, audience, and prior learnings load automatically so the next mission does not start from zero.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Channels',
      eyebrowNumber: '05',
      ask: 'trooper, keep this Slack thread on the ticket',
      reply: 'linked — context preserved',
      window: 'Workforce — Channels',
      title: 'Chat stays connected',
      titleHighlight: 'to the real work.',
      intro:
        'Slack handoffs keep the conversation and the ticket in sync — so work does not disappear into a channel scroll.',
      visual: 'slack-routing',
    },
    canvasFeatureSection('06'),
  ],
  'github-integration': [
    {
      eyebrow: 'Ship',
      eyebrowNumber: '03',
      ask: 'trooper, open the PR and run CI',
      reply: 'commits and tests on the ticket',
      window: 'GitHub — Ship',
      title: 'Real commits and PRs,',
      titleHighlight: 'not suggestions in chat.',
      intro:
        'Agents open pull requests, run tests, and attach what changed. You review and merge — they do the mechanical work.',
      visual: 'coding-harness',
    },
    {
      eyebrow: 'Review',
      eyebrowNumber: '04',
      ask: 'trooper, show diffs and CI together',
      reply: 'review pack ready',
      window: 'GitHub — Review',
      title: 'See the change set',
      titleHighlight: 'before you merge.',
      intro:
        'Diffs, test results, and PR write-ups sit together so merge decisions are about judgment, not tab hunting.',
      visual: 'coding-board',
    },
    {
      eyebrow: 'Incidents',
      eyebrowNumber: '05',
      ask: 'trooper, roll back the failed deploy',
      reply: 'triaging — logs on the thread',
      window: 'GitHub — Incident',
      title: 'Failed deploys with',
      titleHighlight: 'a clear recovery trail.',
      intro:
        'Triage and rollback steps stay logged on the mission so the team can see what ran and what still needs a human.',
      visual: 'engineering-incident',
    },
    {
      eyebrow: 'On demand',
      eyebrowNumber: '06',
      ask: 'trooper, open a browser and wake Studio-Mac for this PR',
      reply: 'browser live — desktop seat attached',
      window: 'GitHub — Runtimes',
      title: 'Browser and desktop,',
      titleHighlight: 'on the same PR.',
      intro:
        'Check Actions in a live browser or repro on an enrolled Mac — attached to the ticket, not lost in another tool.',
      visual: 'coding-runtime',
    },
  ],
  'task-execution': [
    {
      eyebrow: 'Execution',
      eyebrowNumber: '03',
      ask: 'trooper, run this ticket end to end',
      reply: 'subtasks moving — I will report back',
      window: 'Tasks — Execution',
      title: 'Work that finishes,',
      titleHighlight: 'not answers that stall.',
      intro:
        'Multi-step jobs run with visible progress and deliverables. You get outcomes on a ticket — not a paragraph of advice.',
      visual: 'sales-pipeline',
    },
    {
      eyebrow: 'Inbox',
      eyebrowNumber: '04',
      ask: 'trooper, turn this email into a mission',
      reply: 'parsed — draft held for approval',
      window: 'Tasks — Inbox',
      title: 'Email becomes structured work',
      titleHighlight: 'you can track.',
      intro:
        'Inbound requests become tickets with research and drafts. Sensitive sends wait for your approval.',
      visual: 'email-routing',
    },
    {
      eyebrow: 'Routines',
      eyebrowNumber: '05',
      ask: 'trooper, run the recurring checklist',
      reply: 'on schedule — logging each step',
      window: 'Tasks — Routines',
      title: 'Recurring work on a schedule,',
      titleHighlight: 'not a sticky note.',
      intro:
        'Checklists run in the background with step logging so routine ops do not depend on someone remembering.',
      visual: 'ops-runbook',
    },
    canvasFeatureSection('06'),
  ],
  'persistent-memory': [
    {
      eyebrow: 'Memory',
      eyebrowNumber: '03',
      ask: 'trooper, what did we decide last time?',
      reply: 'pulling prior decisions',
      window: 'Memory — Persistent',
      title: 'Memory that lasts',
      titleHighlight: 'across sessions.',
      intro:
        'Past decisions, docs, and channel context load on the next mission so agents do not re-learn your org every morning.',
      visual: 'messaging-routing',
    },
    {
      eyebrow: 'Slack',
      eyebrowNumber: '04',
      ask: 'trooper, attach this Slack history to the ticket',
      reply: 'decisions and handoffs linked',
      window: 'Memory — Slack',
      title: 'Channel history stays',
      titleHighlight: 'with the work.',
      intro:
        'Slack threads link to missions so handoffs and decisions are searchable later — not buried in scrollback.',
      visual: 'slack-routing',
    },
    {
      eyebrow: 'Email',
      eyebrowNumber: '05',
      ask: 'trooper, load prior email context for this follow-up',
      reply: 'thread history attached',
      window: 'Memory — Email',
      title: 'Inbox threads compound',
      titleHighlight: 'over time.',
      intro:
        'Earlier email context loads on follow-ups so outreach and replies build on what already happened.',
      visual: 'email-routing',
    },
    canvasFeatureSection('06'),
  ],
  'browser-control': [
    {
      eyebrow: 'Browser',
      eyebrowNumber: '03',
      ask: 'trooper, open the site and capture what you see',
      reply: 'browser session live',
      window: 'Browser — Control',
      title: 'A real browser,',
      titleHighlight: 'not a guess about the page.',
      intro:
        'Agents navigate, snapshot, and extract from live sites so research and checks use what is actually on screen.',
      visual: 'browser-serp',
    },
    {
      eyebrow: 'Research',
      eyebrowNumber: '04',
      ask: 'trooper, turn these pages into a comparison',
      reply: 'matrix and notes synthesizing',
      window: 'Browser — Research',
      title: 'Web notes become',
      titleHighlight: 'structured intel.',
      intro:
        'Multi-source captures turn into comparison tables and briefs your team can act on.',
      visual: 'research-intel',
    },
    {
      eyebrow: 'Archive',
      eyebrowNumber: '05',
      ask: 'trooper, save competitor landing and pricing pages',
      reply: 'captures cited for review',
      window: 'Browser — Archive',
      title: 'Competitive pages archived',
      titleHighlight: 'with citations.',
      intro:
        'Landing and pricing captures stay attached to the mission so GTM and product can revisit the evidence later.',
      visual: 'launch-ops',
    },
    {
      eyebrow: 'On demand',
      eyebrowNumber: '06',
      ask: 'trooper, keep the browser session on this ticket',
      reply: 'session live — snapshots attached',
      window: 'Browser — On demand',
      title: 'Browser on demand,',
      titleHighlight: 'traced to the mission.',
      intro:
        'Live sessions, SERP captures, and page snapshots stay on the ticket so research is evidence — not a lost tab.',
      visual: 'browser-serp',
    },
  ],
  'system-access': [
    {
      eyebrow: 'Runtime',
      eyebrowNumber: '03',
      ask: 'trooper, check the deploy on our VPS',
      reply: 'shell and logs on the ticket',
      window: 'System — Runtime',
      title: 'Shell and logs on your server,',
      titleHighlight: 'with a trail.',
      intro:
        'Incident work runs on infrastructure you control. Commands and log review stay visible on the ticket.',
      visual: 'engineering-incident',
    },
    {
      eyebrow: 'Health',
      eyebrowNumber: '04',
      ask: 'trooper, run the nightly health checks',
      reply: 'backups and disk checks logging',
      window: 'System — Health',
      title: 'Health checks on schedule,',
      titleHighlight: 'not when someone panics.',
      intro:
        'Backups, disk checks, and restarts run as routines with step logging before small issues become outages.',
      visual: 'ops-runbook',
    },
    {
      eyebrow: 'Audit',
      eyebrowNumber: '05',
      ask: 'trooper, patrol production logs',
      reply: 'findings queued by severity',
      window: 'System — Audit',
      title: 'Log patrols that surface',
      titleHighlight: 'what matters.',
      intro:
        'Production log review highlights anomalies by severity so you act on signals — not noise.',
      visual: 'security-audit',
    },
    canvasFeatureSection('06'),
  ],
  'email-automation': [
    {
      eyebrow: 'Inbox',
      eyebrowNumber: '03',
      ask: 'trooper, turn this RFP into a ticket',
      reply: 'parsed — research and draft queued',
      window: 'Email — Inbox',
      title: 'Inbox mail becomes',
      titleHighlight: 'trackable work.',
      intro:
        'RFPs and requests become tickets with research and drafts — so nothing important lives only in an unread pile.',
      visual: 'email-routing',
    },
    {
      eyebrow: 'Pipeline',
      eyebrowNumber: '04',
      ask: 'trooper, qualify this inbound for outreach',
      reply: 'CRM and draft ready for review',
      window: 'Email — Pipeline',
      title: 'Inbound mail feeds',
      titleHighlight: 'real pipeline work.',
      intro:
        'Qualified opportunities get research, outreach drafts, and CRM updates without losing the original thread.',
      visual: 'sales-pipeline',
    },
    {
      eyebrow: 'Approval',
      eyebrowNumber: '05',
      ask: 'trooper, hold the reply until I approve',
      reply: 'draft gated — nothing sent',
      window: 'Email — Approval',
      title: 'Sensitive sends wait',
      titleHighlight: 'for your command.',
      intro:
        'Reply and proposal drafts stay held until you approve. Speed on prep — control on what leaves the inbox.',
      visual: 'legal-review',
    },
    canvasFeatureSection('06'),
  ],
  'skills-plugins': [
    {
      eyebrow: 'Integrations',
      eyebrowNumber: '03',
      ask: 'trooper, use Figma, Sheets, and Gmail on this campaign',
      reply: 'skills connected — working across tools',
      window: 'Skills — Integrations',
      title: 'Your tools, called from',
      titleHighlight: 'one mission.',
      intro:
        'Agents use the integrations you connect — design, sheets, mail, and more — with every step visible on the ticket.',
      visual: 'marketing-harness',
    },
    {
      eyebrow: 'Design',
      eyebrowNumber: '04',
      ask: 'trooper, export the Figma frames',
      reply: 'assets packing for review',
      window: 'Skills — Design',
      title: 'Design tools wired in,',
      titleHighlight: 'not copy-pasted out.',
      intro:
        'Frame exports and brand checklists run through connected skills so creative work stays on the same mission.',
      visual: 'design-pipeline',
    },
    {
      eyebrow: 'Support',
      eyebrowNumber: '05',
      ask: 'trooper, triage tickets with our help desk tools',
      reply: 'lookup and draft ready',
      window: 'Skills — Support',
      title: 'Support tools on the ticket,',
      titleHighlight: 'with drafts held.',
      intro:
        'Help-desk triage and knowledge lookup happen in-flow. Replies stay draft until a human sends.',
      visual: 'support-queue',
    },
    marketingCanvasFeatureSection('06'),
  ],
  'multi-agent-collaboration': [
    {
      eyebrow: 'Parallel',
      eyebrowNumber: '03',
      ask: 'trooper, run Claude Code and Codex together',
      reply: 'both agents working in parallel',
      window: 'Agents — Parallel',
      title: 'Multiple agents,',
      titleHighlight: 'one shared board.',
      intro:
        'Specialists work side by side on the same mission with live progress — without you mediating every handoff in chat.',
      visual: 'coding-harness',
    },
    {
      eyebrow: 'Handoff',
      eyebrowNumber: '04',
      ask: 'trooper, put the diffs and PR where we can all see them',
      reply: 'review pack ready',
      window: 'Agents — Handoff',
      title: 'Handoffs without',
      titleHighlight: 'copy-paste chaos.',
      intro:
        'Diffs, logs, and write-ups stay visible together so the next person — human or agent — picks up cleanly.',
      visual: 'coding-canvas',
    },
    {
      eyebrow: 'Launch',
      eyebrowNumber: '05',
      ask: 'trooper, run press, social, and product in parallel',
      reply: 'subtasks coordinated',
      window: 'Agents — Launch',
      title: 'Launch work coordinated,',
      titleHighlight: 'not siloed.',
      intro:
        'Press, social, and product streams run as related subtasks with shared memory — one org, one timeline.',
      visual: 'launch-ops',
    },
    {
      eyebrow: 'On demand',
      eyebrowNumber: '06',
      ask: 'trooper, attach browser and desktop to this mission',
      reply: 'browser live — Studio-Mac seat attached',
      window: 'Agents — Runtimes',
      title: 'Browser and desktop,',
      titleHighlight: 'shared across agents.',
      intro:
        'Parallel agents share the same on-demand browser and enrolled machines — one mission floor, not three disconnected tools.',
      visual: 'coding-runtime',
    },
  ],
  'openclaw-powered': [
    {
      eyebrow: 'Runtime',
      eyebrowNumber: '03',
      ask: 'trooper, run this on our private server',
      reply: 'private runtime up — full trail',
      window: 'OpenClaw — Runtime',
      title: 'Your private runtime,',
      titleHighlight: 'not a shared black box.',
      intro:
        'Org work runs on dedicated infrastructure you control, with audit trails for every mission.',
      visual: 'launch-ops',
    },
    {
      eyebrow: 'Shell',
      eyebrowNumber: '04',
      ask: 'trooper, shell the VPS for this incident',
      reply: 'commands and rollback verifying',
      window: 'OpenClaw — Shell',
      title: 'Terminal access when',
      titleHighlight: 'incidents need it.',
      intro:
        'Shell work on your VPS stays on the ticket — including verification after rollback.',
      visual: 'engineering-incident',
    },
    {
      eyebrow: 'Cron',
      eyebrowNumber: '05',
      ask: 'trooper, keep org routines on schedule',
      reply: 'cron live — trails kept',
      window: 'OpenClaw — Cron',
      title: 'Background routines,',
      titleHighlight: 'always auditable.',
      intro:
        'Scheduled patrols and checklists run around the clock with logs you can review later.',
      visual: 'ops-runbook',
    },
    canvasFeatureSection('06'),
  ],
  'chat-interfaces': [
    {
      eyebrow: 'Slack',
      eyebrowNumber: '03',
      ask: 'trooper, turn this Slack thread into a ticket',
      reply: 'routed — context preserved',
      window: 'Chat — Slack',
      title: 'Slack messages become',
      titleHighlight: 'real missions.',
      intro:
        'Channel asks turn into tracked work with the conversation attached — chat stays fast, ops stays clear.',
      visual: 'slack-routing',
    },
    {
      eyebrow: 'WhatsApp',
      eyebrowNumber: '04',
      ask: 'trooper, take this WhatsApp and open a mission',
      reply: 'field ticket opened',
      window: 'Chat — WhatsApp',
      title: 'Mobile messages become',
      titleHighlight: 'the same workforce.',
      intro:
        'WhatsApp turns into structured tickets with the same traceability as desktop — command from your pocket.',
      visual: 'whatsapp-routing',
    },
    {
      eyebrow: 'Memory',
      eyebrowNumber: '05',
      ask: 'trooper, load context from prior channels',
      reply: 'prior handoffs on the ticket',
      window: 'Chat — Memory',
      title: 'Cross-channel context',
      titleHighlight: 'carries forward.',
      intro:
        'Prior channel decisions load on the next mission so follow-ups do not restart the story.',
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
    ask: 'trooper, run this ticket end to end',
    reply: 'on it — I will report back',
    window: 'Work — Execution',
    title: 'Work that finishes,',
    titleHighlight: 'not answers that stall.',
    intro:
      'Multi-step jobs run with visible progress and deliverables. You get outcomes — not a paragraph of advice.',
    visual: 'sales-pipeline',
  },
  {
    eyebrow: 'Inbox',
    eyebrowNumber: '04',
    ask: 'trooper, turn this email into a mission',
    reply: 'parsed — draft held for approval',
    window: 'Work — Inbox',
    title: 'Email becomes structured work',
    titleHighlight: 'you can track.',
    intro:
      'Inbound requests become tickets with research and drafts. Sensitive sends wait for your approval.',
    visual: 'email-routing',
  },
  {
    eyebrow: 'Channels',
    eyebrowNumber: '05',
    ask: 'trooper, link this Slack thread to the board',
    reply: 'handoff preserved',
    window: 'Work — Channels',
    title: 'Chat stays connected',
    titleHighlight: 'to the real work.',
    intro:
      'Channel threads link to missions so handoffs survive — work does not disappear into scrollback.',
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
