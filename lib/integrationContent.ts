import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import { getPluginPlaybook } from '@/lib/playbookWorkflowContent';
import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import {
  getPluginBySlug,
  allPluginPageSlugs,
  pageSlugToPluginSlug,
  pluginLogoUrl,
  pluginPagePath,
  type PluginCatalogItem,
  PRIORITY_INTEGRATION_SLUGS,
} from '@/lib/pluginCatalog';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/Trooperintegrations_socialshare.png';

export type IntegrationUseCase = {
  title: string;
  description: string;
};

export type IntegrationPageContent = {
  slug: string;
  catalog: PluginCatalogItem;
  logoUrl: string;
  missionLabel: string;
  title: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  useCases: IntegrationUseCase[];
  setupTitle: string;
  setupSteps: string[];
  relatedTeams: { slug: string; label: string }[];
  relatedIntegrations: { slug: string; label: string }[];
  demoId: DemoScenarioId;
  isPriority: boolean;
  playbookWorkflow: PlaybookWorkflowContent;
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

type RichOverride = Partial<
  Pick<
    IntegrationPageContent,
    | 'description'
    | 'overviewTitle'
    | 'overviewParagraphs'
    | 'benefits'
    | 'useCases'
    | 'setupSteps'
    | 'demoId'
    | 'relatedTeams'
    | 'relatedIntegrations'
  >
>;

const TEAM_LABELS: Record<string, string> = {
  sales: 'Sales',
  coding: 'Coding',
  engineering: 'Engineering',
  marketing: 'Marketing',
  operations: 'Operations',
  finance: 'Finance',
  research: 'Research',
  'business-development': 'Business Development',
  'customer-support': 'Customer Support',
  growth: 'Growth',
};

const DEMO_BY_CATEGORY: Record<string, DemoScenarioId> = {
  Coding: 'coding',
  Engineering: 'engineering',
  Productivity: 'operations',
  'Messaging & channels': 'slack',
  Research: 'research',
  Design: 'design',
  Integrations: 'launch',
};

const TEAM_BY_SLUG: Record<string, string[]> = {
  hubspot: ['sales', 'operations'],
  gmail: ['sales', 'operations', 'customer-support'],
  github: ['coding', 'engineering'],
  slack: ['operations', 'engineering', 'sales'],
  googlesheets: ['finance', 'operations', 'marketing'],
  linkedin: ['sales', 'research', 'business-development'],
  notion: ['operations', 'engineering', 'marketing'],
  linear: ['coding', 'engineering'],
  stripe: ['finance', 'operations'],
  figma: ['design', 'marketing'],
  jira: ['engineering', 'operations'],
  zendesk: ['customer-support'],
  shopify: ['operations', 'marketing'],
  airtable: ['operations', 'finance'],
  intercom: ['customer-support', 'sales'],
  salesforce: ['sales'],
  googlecalendar: ['operations', 'sales'],
  googledrive: ['operations', 'marketing'],
};

const RELATED_BY_SLUG: Record<string, string[]> = {
  hubspot: ['gmail', 'linkedin', 'slack', 'stripe'],
  gmail: ['hubspot', 'slack', 'notion', 'googlecalendar'],
  github: ['linear', 'slack', 'notion'],
  slack: ['github', 'gmail', 'linear', 'notion'],
  googlesheets: ['googledrive', 'notion', 'hubspot'],
  linkedin: ['hubspot', 'gmail', 'apollo'],
  notion: ['slack', 'github', 'linear'],
  linear: ['github', 'slack', 'notion'],
  stripe: ['hubspot', 'googlesheets', 'slack'],
};

const RICH_OVERRIDES: Record<string, RichOverride> = {
  hubspot: {
    description:
      'Deploy an AI agent that reads your HubSpot pipeline, logs calls, updates deal stages, and prepares customer briefs — traced on the Trooper board with human approval gates.',
    overviewTitle: 'CRM work that actually gets done',
    overviewParagraphs: [
      'Trooper agents connect to HubSpot through Composio OAuth and operate on real CRM records — deals, contacts, companies, tickets, and engagements.',
      'Pipeline health reviews flag stale deals and slipping close dates. Customer prep briefs pull context before QBRs and renewals. Data hygiene audits catch missing fields and duplicate records.',
      'Every CRM action runs as a traced ticket. Sensitive updates wait for your approval before agents write back to HubSpot.',
    ],
    benefits: [
      { title: 'Pipeline intelligence', description: 'Agents review open deals, forecast risk, and surface deals that need attention before the week ends.' },
      { title: 'Meeting prep briefs', description: 'Pull contact history, recent engagements, and open tickets into a one-page brief before every call.' },
      { title: 'CRM hygiene', description: 'Audit missing owners, stale records, and duplicate contacts — with fix proposals you approve.' },
    ],
    useCases: [
      { title: 'Weekly pipeline review', description: 'Agent scans open deals, flags stale stages, and posts a summary to Slack.' },
      { title: 'Pre-call customer brief', description: 'Pull HubSpot history for an account before a renewal or QBR meeting.' },
      { title: 'Post-call logging', description: 'Log calls, emails, and next-step tasks to the right deal record automatically.' },
    ],
    setupSteps: [
      'Deploy a Trooper unit and open Settings → Plugins',
      'Connect HubSpot via Composio OAuth — read and write scopes as needed',
      'Assign the HubSpot plugin to your sales or ops agent',
      'Delegate a pipeline review or customer prep task from chat or Slack',
    ],
    demoId: 'sales',
    relatedTeams: [{ slug: 'sales', label: 'Sales' }, { slug: 'operations', label: 'Operations' }],
    relatedIntegrations: [{ slug: 'gmail', label: 'Gmail' }, { slug: 'linkedin', label: 'LinkedIn' }, { slug: 'slack', label: 'Slack' }],
  },
  gmail: {
    description:
      'An AI agent that triages your Gmail inbox, drafts replies in your voice, extracts action items, and forwards updates to your team — with send approval before anything goes out.',
    overviewTitle: 'Email ops without the tab-switching',
    overviewParagraphs: [
      'Trooper agents read Gmail through a secure OAuth connection and operate on real threads — not pasted snippets in chat.',
      'Inbox triage buckets mail into urgent, needs-reply, waiting, and FYI. Thread summaries pull decisions and follow-ups. Reply drafts match your tone with explicit confirmation before send.',
      'Email work becomes traced tickets linked to CRM updates, Slack threads, and task board missions.',
    ],
    benefits: [
      { title: 'Inbox triage', description: 'Rank what needs attention now — urgent replies, waiting threads, and noise separated automatically.' },
      { title: 'Reply drafting', description: 'Agents draft responses grounded in thread context. You approve before anything sends.' },
      { title: 'Action extraction', description: 'Pull decisions, deadlines, and follow-ups from long threads into structured tasks.' },
    ],
    useCases: [
      { title: 'Morning inbox sweep', description: 'Triage overnight mail and surface the five threads that need replies today.' },
      { title: 'Follow-up sequences', description: 'Draft nurture emails and schedule follow-ups tied to CRM deal stages.' },
      { title: 'Executive briefing', description: 'Summarize key threads from investors, customers, and partners into a daily brief.' },
    ],
    setupSteps: [
      'Connect Gmail in Trooper Settings → Plugins via Google OAuth',
      'Assign the Gmail plugin to your ops or sales agent',
      'Set approval rules for send, archive, and label actions',
      'Delegate inbox triage or reply drafting from Slack or the Trooper board',
    ],
    demoId: 'email',
    relatedTeams: [{ slug: 'sales', label: 'Sales' }, { slug: 'operations', label: 'Operations' }],
    relatedIntegrations: [{ slug: 'hubspot', label: 'HubSpot' }, { slug: 'slack', label: 'Slack' }, { slug: 'notion', label: 'Notion' }],
  },
  github: {
    description:
      'AI agents that triage pull requests, debug failing CI, address review comments, and open draft PRs — with full diffs and terminal traces on the Trooper board.',
    overviewTitle: 'Agents that contribute like developers',
    overviewParagraphs: [
      'Trooper connects to GitHub through OAuth and operates on real repositories — issues, PRs, Actions checks, and branch workflows.',
      'Agents inspect unresolved review threads, debug failing checks with log context, and prepare code changes for review. Every commit and PR open is traced on the ticket Canvas.',
      'Run Claude Code, Codex, and OpenCode side-by-side on the same repo — one harness, shared org memory, human merge approval.',
    ],
    benefits: [
      { title: 'PR triage', description: 'Summarize open PRs, flag stale reviews, and surface failing checks that block merge.' },
      { title: 'CI debugging', description: 'Agents read Actions logs, identify root cause, and propose fixes with traced terminal output.' },
      { title: 'Review response', description: 'Address inline review comments with patch proposals and diff stats before you approve.' },
    ],
    useCases: [
      { title: 'Morning PR review', description: 'Agent summarizes overnight PRs, flags failing CI, and drafts review comments.' },
      { title: 'Hotfix pipeline', description: 'P0 incident triggers branch creation, fix commit, and draft PR with full trace.' },
      { title: 'Issue triage', description: 'Label, assign, and summarize new issues with reproduction context from logs.' },
    ],
    setupSteps: [
      'Connect GitHub in Settings → Plugins with repo and PR scopes',
      'Assign the GitHub plugin to your coding agent (Claude Code, Codex, etc.)',
      'Load AGENTS.md and CODEOWNERS into org memory for branch rules',
      'Delegate a PR review or CI fix from the board or Slack',
    ],
    demoId: 'coding',
    relatedTeams: [{ slug: 'coding', label: 'Coding' }, { slug: 'engineering', label: 'Engineering' }],
    relatedIntegrations: [{ slug: 'linear', label: 'Linear' }, { slug: 'slack', label: 'Slack' }, { slug: 'notion', label: 'Notion' }],
  },
  slack: {
    description:
      'AI agents that post pipeline updates, incident alerts, PR notifications, and status summaries to Slack channels — with full ticket traces behind every message.',
    overviewTitle: 'Ops output where your team already lives',
    overviewParagraphs: [
      'Trooper agents use the Slack plugin to read channels, post updates, and notify teams — grounded in real work from GitHub, HubSpot, Linear, and your task board.',
      'Every Slack post links back to a traced ticket with tool logs, diffs, and decision history. Chat stays fast; ops stays auditable.',
      'Route general ops to team channels and sensitive approvals to DMs. Same org memory whether you command from desktop or mobile.',
    ],
    benefits: [
      { title: 'Channel notifications', description: 'Post PR opens, deal updates, and incident alerts to the right channels automatically.' },
      { title: 'Thread preservation', description: 'Slack threads link to Trooper tickets — context never lost between apps.' },
      { title: 'Status summaries', description: 'Daily or weekly digests of pipeline, sprint, and ops activity posted on schedule.' },
    ],
    useCases: [
      { title: 'PR notification', description: 'Post to #eng-prs when a PR opens with summary, diff stats, and CI status.' },
      { title: 'Pipeline digest', description: 'Weekly HubSpot pipeline summary posted to #sales every Monday morning.' },
      { title: 'Incident alert', description: 'P0 triggers hotfix workflow and notifies #incidents with full trace link.' },
    ],
    setupSteps: [
      'Connect Slack in Settings → Plugins via OAuth or bot token',
      'Configure channel routing for notifications and approvals',
      'Assign Slack plugin to ops, sales, or engineering agents',
      'Set cron schedules for digests or trigger from ticket completion',
    ],
    demoId: 'slack',
    relatedTeams: [{ slug: 'operations', label: 'Operations' }, { slug: 'engineering', label: 'Engineering' }],
    relatedIntegrations: [{ slug: 'github', label: 'GitHub' }, { slug: 'hubspot', label: 'HubSpot' }, { slug: 'linear', label: 'Linear' }],
  },
  googlesheets: {
    description:
      'AI agents that read, analyze, and update Google Sheets — building reports, cleaning data tables, writing formulas, and syncing CRM exports into structured spreadsheets.',
    overviewTitle: 'Spreadsheet ops at agent speed',
    overviewParagraphs: [
      'Trooper agents connect to Google Sheets through the Google Workspace plugin and operate on real spreadsheets with range precision.',
      'Agents find spreadsheets, inspect tabs and ranges, plan formulas, create charts, and write cell updates with explicit confirmation before changes.',
      'Pair Sheets with HubSpot, Stripe, and Slack — agents pull data, update reports, and post summaries to your team.',
    ],
    benefits: [
      { title: 'Report building', description: 'Agents create and update dashboards from CRM, billing, and ops data on schedule.' },
      { title: 'Data cleaning', description: 'Restructure tables, dedupe rows, and repair formulas with traced before/after.' },
      { title: 'Range-precision edits', description: 'Cell-level updates with formula planning — not bulk paste that breaks references.' },
    ],
    useCases: [
      { title: 'Weekly revenue report', description: 'Pull Stripe data, update the revenue tab, and post summary to Slack.' },
      { title: 'Pipeline export', description: 'Sync HubSpot deals into a forecast sheet with stage breakdowns.' },
      { title: 'Ops checklist', description: 'Maintain a living runbook spreadsheet updated after every completed mission.' },
    ],
    setupSteps: [
      'Connect Google Workspace in Settings → Plugins via Google OAuth',
      'Grant Sheets read/write scopes for target spreadsheets',
      'Assign to finance or ops agent with approval rules for writes',
      'Delegate a report update or data clean task from the board',
    ],
    demoId: 'finance',
    relatedTeams: [{ slug: 'finance', label: 'Finance' }, { slug: 'operations', label: 'Operations' }],
    relatedIntegrations: [{ slug: 'hubspot', label: 'HubSpot' }, { slug: 'stripe', label: 'Stripe' }, { slug: 'slack', label: 'Slack' }],
  },
  linkedin: {
    description:
      'AI agents that research prospects on LinkedIn, build account briefs, map decision-makers, and prepare outreach context — traced for your sales team before every call.',
    overviewTitle: 'Sales research without the tab marathon',
    overviewParagraphs: [
      'Trooper agents use the LinkedIn plugin to pull professional profiles, company context, and network signals into structured research briefs.',
      'Research missions become traced tickets linked to HubSpot records and Gmail outreach drafts. Reps get context, not copy-paste chores.',
      'Combine LinkedIn research with Clay-style enrichment workflows — agents fan out research and synthesize into account briefs.',
    ],
    benefits: [
      { title: 'Account research', description: 'Build company briefs with leadership, recent news, and tech stack signals.' },
      { title: 'Prospect mapping', description: 'Identify decision-makers and map warm intro paths before outreach.' },
      { title: 'Outreach context', description: 'Feed research into personalized email drafts and CRM notes automatically.' },
    ],
    useCases: [
      { title: 'Pre-call research', description: 'Agent builds a one-page brief on a target account before a discovery call.' },
      { title: 'List enrichment', description: 'Research 50 accounts from a CSV and append structured fields to HubSpot.' },
      { title: 'Competitive intel', description: 'Track leadership changes and funding news for key accounts in your territory.' },
    ],
    setupSteps: [
      'Connect LinkedIn in Settings → Plugins via Composio OAuth',
      'Assign to sales or research agent with read scopes',
      'Link output to HubSpot and Gmail plugins for downstream workflows',
      'Delegate account research from the board or #sales Slack channel',
    ],
    demoId: 'sales',
    relatedTeams: [{ slug: 'sales', label: 'Sales' }, { slug: 'research', label: 'Research' }],
    relatedIntegrations: [{ slug: 'hubspot', label: 'HubSpot' }, { slug: 'gmail', label: 'Gmail' }, { slug: 'notion', label: 'Notion' }],
  },
  notion: {
    description:
      'AI agents that search Notion, update docs, publish meeting notes, and maintain knowledge bases — keeping your team wiki aligned with what agents actually shipped.',
    overviewTitle: 'Knowledge ops that write back',
    overviewParagraphs: [
      'Trooper agents connect to Notion through OAuth and operate on real pages, databases, and wikis — not static exports.',
      'Agents search knowledge bases for context, draft new pages from ticket deliverables, and update runbooks after incidents or releases.',
      'Pair Notion with GitHub and Slack — ship notes, post summaries, and keep docs in sync with code and ops.',
    ],
    benefits: [
      { title: 'Doc publishing', description: 'Turn ticket deliverables into Notion pages with structured headings and links.' },
      { title: 'KB search', description: 'Agents query your wiki for answers before escalating or drafting responses.' },
      { title: 'Runbook maintenance', description: 'Update ops runbooks after every incident or process change — automatically.' },
    ],
    useCases: [
      { title: 'Release notes', description: 'Agent drafts release notes from merged PRs and publishes to Notion.' },
      { title: 'Meeting notes', description: 'Post-call summary published to the account page in Notion and HubSpot.' },
      { title: 'Onboarding docs', description: 'Maintain living onboarding checklists updated as processes change.' },
    ],
    setupSteps: [
      'Connect Notion in Settings → Plugins via OAuth',
      'Share target workspaces and databases with the Trooper integration',
      'Assign to ops or engineering agent with write approval rules',
      'Delegate doc updates from completed tickets or Slack',
    ],
    demoId: 'operations',
    relatedTeams: [{ slug: 'operations', label: 'Operations' }, { slug: 'engineering', label: 'Engineering' }],
    relatedIntegrations: [{ slug: 'github', label: 'GitHub' }, { slug: 'slack', label: 'Slack' }, { slug: 'linear', label: 'Linear' }],
  },
  linear: {
    description:
      'AI agents that create Linear issues, update sprint status, triage bugs, and sync engineering work with GitHub PRs — traced on the Trooper board.',
    overviewTitle: 'Product ops wired to your sprint',
    overviewParagraphs: [
      'Trooper agents connect to Linear through OAuth and operate on real issues, cycles, and projects.',
      'Agents create issues from Slack requests, update status after PR merges, and triage bugs with reproduction context from logs.',
      'Linear stays in sync with GitHub — agents bridge issue tracking and code delivery on one traced board.',
    ],
    benefits: [
      { title: 'Issue creation', description: 'Turn Slack requests and customer reports into Linear issues with full context.' },
      { title: 'Sprint sync', description: 'Update issue status when PRs merge and CI passes — no manual board hygiene.' },
      { title: 'Bug triage', description: 'Agents reproduce, label, and assign bugs with log excerpts and priority signals.' },
    ],
    useCases: [
      { title: 'Slack → Linear', description: 'Bug report in #support becomes a Linear issue with customer context attached.' },
      { title: 'PR → issue close', description: 'Agent closes Linear issue when linked PR merges and CI is green.' },
      { title: 'Sprint planning prep', description: 'Summarize open issues, stale tickets, and blocked work before planning.' },
    ],
    setupSteps: [
      'Connect Linear in Settings → Plugins via OAuth',
      'Map teams and projects for agent write access',
      'Pair with GitHub plugin for PR ↔ issue linking',
      'Delegate issue triage or sprint prep from the board',
    ],
    demoId: 'engineering',
    relatedTeams: [{ slug: 'engineering', label: 'Engineering' }, { slug: 'coding', label: 'Coding' }],
    relatedIntegrations: [{ slug: 'github', label: 'GitHub' }, { slug: 'slack', label: 'Slack' }, { slug: 'notion', label: 'Notion' }],
  },
  stripe: {
    description:
      'AI agents that monitor Stripe subscriptions, flag churn risk, reconcile invoices, and update revenue reports — with finance-grade traces on every action.',
    overviewTitle: 'Revenue ops grounded in live billing data',
    overviewParagraphs: [
      'Trooper agents connect to Stripe through Composio OAuth and operate on real customers, subscriptions, invoices, and payment events.',
      'Agents flag failed payments, summarize MRR changes, and sync billing data into Google Sheets or HubSpot — traced and approval-gated.',
      'Finance teams get automated revenue reports without manual dashboard exports or copy-paste into spreadsheets.',
    ],
    benefits: [
      { title: 'Churn signals', description: 'Flag failed payments, downgrades, and cancellation requests before they slip through.' },
      { title: 'Revenue reporting', description: 'Sync Stripe data into Sheets or Notion dashboards on a cron schedule.' },
      { title: 'Invoice reconciliation', description: 'Match invoices to CRM deals and flag discrepancies for finance review.' },
    ],
    useCases: [
      { title: 'Weekly MRR digest', description: 'Agent summarizes new subscriptions, churn, and failed payments to Slack.' },
      { title: 'Failed payment follow-up', description: 'Draft customer outreach when a payment fails and log to HubSpot.' },
      { title: 'Revenue forecast update', description: 'Pull Stripe data into the forecast sheet after month-end close.' },
    ],
    setupSteps: [
      'Connect Stripe in Settings → Plugins via Composio OAuth',
      'Assign to finance or ops agent with read-first approval rules',
      'Link to Google Sheets and HubSpot for downstream reporting',
      'Delegate a revenue report or churn review from the board',
    ],
    demoId: 'finance',
    relatedTeams: [{ slug: 'finance', label: 'Finance' }, { slug: 'operations', label: 'Operations' }],
    relatedIntegrations: [{ slug: 'googlesheets', label: 'Google Sheets' }, { slug: 'hubspot', label: 'HubSpot' }, { slug: 'slack', label: 'Slack' }],
  },
};

function defaultBenefits(name: string, category: string): SubpageBenefit[] {
  return [
    {
      title: 'Autonomous execution',
      description: `Trooper agents call ${name} APIs directly — search, read, write, and report back on traced tickets.`,
    },
    {
      title: 'Approval gates',
      description: 'Sensitive writes wait for your authorization. Agents propose; you approve; the system executes.',
    },
    {
      title: 'Multi-agent workflows',
      description: `Combine ${name} with GitHub, Gmail, Slack, and 1,000+ plugins on one OpenClaw-powered board.`,
    },
  ];
}

function defaultUseCases(name: string): IntegrationUseCase[] {
  return [
    { title: `Search and summarize`, description: `Agent queries ${name} for context before drafting a response or next action.` },
    { title: `Create and update records`, description: `Write back to ${name} with traced changes and human approval on sensitive ops.` },
    { title: `Cross-tool workflows`, description: `Chain ${name} with email, CRM, or code tools in a single multi-step mission.` },
  ];
}

function defaultSetupSteps(name: string): string[] {
  return [
    'Deploy a Trooper unit at app.trooper.so',
    `Open Settings → Plugins and connect ${name} via OAuth or API key`,
    `Assign the ${name} plugin to the right agent on your roster`,
    'Delegate a task from Slack, chat, or the unified task board',
  ];
}

function buildIntegrationPage(catalog: PluginCatalogItem): IntegrationPageContent {
  const slug = catalog.slug;
  const rich = RICH_OVERRIDES[slug];
  const isPriority = (PRIORITY_INTEGRATION_SLUGS as readonly string[]).includes(slug);
  const teamSlugs = rich?.relatedTeams?.map((t) => t.slug) ?? TEAM_BY_SLUG[slug] ?? ['operations'];
  const relatedSlugs = rich?.relatedIntegrations?.map((i) => i.slug) ?? RELATED_BY_SLUG[slug] ?? [];

  const relatedTeams = (rich?.relatedTeams ?? teamSlugs.map((s) => ({
    slug: s,
    label: TEAM_LABELS[s] ?? s,
  }))).slice(0, 4);

  const relatedIntegrations = (rich?.relatedIntegrations ?? relatedSlugs
    .filter((s) => s !== slug && getPluginBySlug(s))
    .map((s) => ({ slug: s, label: getPluginBySlug(s)!.name }))).slice(0, 4);

  const desc = catalog.description || catalog.shortDescription || `Connect ${catalog.name} to your Trooper AI workforce.`;

  return {
    slug,
    catalog,
    logoUrl: pluginLogoUrl(catalog),
    missionLabel: 'Integration brief',
    title: `AI agent for ${catalog.name}`,
    description: rich?.description ?? `Deploy an AI agent that connects to ${catalog.name} and executes ${catalog.category.toLowerCase()} workflows on your Trooper board — traced, approval-gated, and ready in minutes.`,
    overviewTitle: rich?.overviewTitle ?? `Why teams connect ${catalog.name}`,
    overviewParagraphs: rich?.overviewParagraphs ?? [
      `Trooper agents connect to ${catalog.name} through secure OAuth or API credentials synced to your private OpenClaw server.`,
      desc,
      `Every action runs as a traced ticket on the unified board. Combine ${catalog.name} with GitHub, Gmail, Slack, and 1,000+ other plugins in multi-agent workflows.`,
    ],
    benefits: rich?.benefits ?? defaultBenefits(catalog.name, catalog.category),
    useCases: rich?.useCases ?? defaultUseCases(catalog.name),
    setupTitle: `Connect ${catalog.name}`,
    setupSteps: rich?.setupSteps ?? defaultSetupSteps(catalog.name),
    relatedTeams,
    relatedIntegrations,
    demoId: rich?.demoId ?? DEMO_BY_CATEGORY[catalog.category] ?? 'launch',
    isPriority,
    playbookWorkflow: getPluginPlaybook(catalog),
    meta: {
      title: `AI agent for ${catalog.name} | Trooper`,
      description: rich?.description ?? `Deploy an AI agent for ${catalog.name}. ${catalog.shortDescription || desc}`.slice(0, 160),
      canonical: `https://trooper.so${pluginPagePath(slug)}`,
    },
  };
}

const pageCache = new Map<string, IntegrationPageContent>();

export function getIntegrationPage(pluginSlug: string): IntegrationPageContent | undefined {
  const catalog = getPluginBySlug(pluginSlug);
  if (!catalog) return undefined;
  if (!pageCache.has(pluginSlug)) pageCache.set(pluginSlug, buildIntegrationPage(catalog));
  return pageCache.get(pluginSlug);
}

export function getIntegrationPageByPageSlug(pageSlug: string): IntegrationPageContent | undefined {
  const pluginSlug = pageSlugToPluginSlug(pageSlug);
  if (!pluginSlug) return undefined;
  return getIntegrationPage(pluginSlug);
}

export function allIntegrationPageSlugs(): string[] {
  return allPluginPageSlugs();
}

export const integrationHubMeta = {
  title: 'AI Agent Integrations | Trooper',
  description:
    'Connect HubSpot, Gmail, GitHub, Slack, Notion, Linear, Stripe, and 1,000+ tools to your Trooper AI workforce. Deploy agents that execute real work through OpenClaw plugins.',
  canonical: 'https://trooper.so/plugin',
};

export const integrationSocialImage = SOCIAL_IMAGE;

export function getPriorityIntegrations(): IntegrationPageContent[] {
  return PRIORITY_INTEGRATION_SLUGS.map((s) => getIntegrationPage(s)!).filter(Boolean);
}
