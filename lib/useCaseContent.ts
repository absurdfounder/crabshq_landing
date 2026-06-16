import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export type UseCasePageContent = {
  slug: string;
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  howItWorks: string[];
  relatedTeams: RelatedLink[];
  relatedIntegrations: RelatedLink[];
  demoId: DemoScenarioId;
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

type BuildArgs = {
  slug: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  howItWorks: string[];
  relatedTeams: RelatedLink[];
  relatedIntegrations: RelatedLink[];
  demoId?: DemoScenarioId;
};

function build(args: BuildArgs): UseCasePageContent {
  return {
    ...args,
    missionLabel: 'Use case brief',
    demoId: args.demoId ?? 'launch',
    meta: {
      title: `${args.title} | Trooper`,
      description: args.description.slice(0, 160),
      canonical: `https://trooper.so/use-cases/${args.slug}`,
    },
  };
}

const useCases: Record<string, UseCasePageContent> = {
  'lead-generation': build({
    slug: 'lead-generation',
    title: 'AI agent for lead generation',
    titleAccent: 'prospects to pipeline, traced',
    description:
      'Trooper agents research prospects on LinkedIn, enrich accounts, find emails, draft personalized outreach, and log everything to HubSpot — one autonomous mission from list to first touch.',
    overviewTitle: 'Lead gen that executes, not just researches',
    overviewParagraphs: [
      'Traditional lead gen stacks require exporting between Clay, Hunter, Apollo, and your CRM. Trooper agents run the full chain: LinkedIn research, account briefs, email discovery, outreach drafts, and CRM updates on one traced board.',
      'Every prospect touch is a ticket with sources, drafts, and approval gates. Reps review before send; managers audit the full thread.',
      'Scale outbound without adding headcount — agents work 24/7 across time zones while humans close deals.',
    ],
    benefits: [
      { title: 'Research → outreach', description: 'LinkedIn briefs feed directly into Gmail drafts and HubSpot records.' },
      { title: 'Approval before send', description: 'Review every outbound email. Agents propose; you authorize.' },
      { title: '24/7 prospecting', description: 'Agents enrich lists and draft sequences overnight — reps start with warm drafts.' },
    ],
    howItWorks: [
      'Upload a target list or describe your ICP in chat or Slack',
      'Agent researches accounts on LinkedIn and builds structured briefs',
      'Emails found, outreach drafted, and contacts created in HubSpot',
      'You approve sends; agent schedules follow-ups on cron',
    ],
    relatedTeams: [
      { href: '/teams/sales', label: 'Sales team', description: 'Pipeline ops and outreach agents' },
      { href: '/teams/business-development', label: 'Business Development', description: 'Partnership research' },
      { href: '/teams/growth', label: 'Growth', description: 'Acquisition experiments' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_linkedin', label: 'LinkedIn', description: 'Prospect research' },
      { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot', description: 'CRM logging' },
      { href: '/plugin/ai_agent_for_gmail', label: 'Gmail', description: 'Outreach drafts' },
    ],
    demoId: 'sales',
  }),
  'sales-research': build({
    slug: 'sales-research',
    title: 'AI agent for sales research',
    titleAccent: 'account intel before every call',
    description:
      'Deploy agents that build account briefs, map decision-makers, track company news, and prepare talking points — grounded in LinkedIn, CRM, and web research before every sales conversation.',
    overviewTitle: 'Research ops that reps actually use',
    overviewParagraphs: [
      'Reps spend hours in tabs before discovery calls. Trooper agents compile account briefs from LinkedIn, HubSpot history, recent news, and competitive signals — delivered as a one-page brief linked to the deal record.',
      'Research missions are traced tickets. Managers see sources, reasoning, and output — not black-box summaries.',
      'Fan out research across 50 accounts in parallel. Agents synthesize into structured CRM fields and Notion pages.',
    ],
    benefits: [
      { title: 'Pre-call briefs', description: 'One-page account summary with leadership, news, and CRM history.' },
      { title: 'Parallel research', description: '50 accounts researched simultaneously — not one-at-a-time tab marathons.' },
      { title: 'CRM-grounded', description: 'Briefs pull HubSpot deal stage, past engagements, and open tickets.' },
    ],
    howItWorks: [
      'Rep requests research on an account via Slack or the board',
      'Agent queries LinkedIn, HubSpot, and web sources in parallel',
      'Structured brief published to Notion and attached to the CRM record',
      'Talking points ready before the calendar event',
    ],
    relatedTeams: [
      { href: '/teams/sales', label: 'Sales' },
      { href: '/teams/research', label: 'Research' },
      { href: '/teams/business-development', label: 'Business Development' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_linkedin', label: 'LinkedIn' },
      { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot' },
      { href: '/plugin/ai_agent_for_notion', label: 'Notion' },
    ],
    demoId: 'sales',
  }),
  'crm-updates': build({
    slug: 'crm-updates',
    title: 'AI agent that updates CRM',
    titleAccent: 'HubSpot hygiene on autopilot',
    description:
      'Trooper agents log calls, update deal stages, create tasks, fix data hygiene issues, and sync meeting notes to HubSpot — with human approval before every write.',
    overviewTitle: 'CRM ops without the data-entry tax',
    overviewParagraphs: [
      'Reps hate CRM data entry. Trooper agents listen to meeting outcomes, email threads, and Slack updates — then propose CRM writes you approve in one click.',
      'Pipeline health reviews run on cron: stale deals flagged, slipping close dates surfaced, missing fields audited.',
      'Every CRM action is a traced ticket. Compliance and sales ops can audit exactly what changed and why.',
    ],
    benefits: [
      { title: 'Post-call logging', description: 'Meeting notes become CRM activities, tasks, and deal stage updates.' },
      { title: 'Pipeline hygiene', description: 'Weekly audits for stale deals, missing owners, and duplicate contacts.' },
      { title: 'Approval gates', description: 'Agents propose CRM writes; you approve before anything changes.' },
    ],
    howItWorks: [
      'Connect HubSpot via OAuth in Trooper Settings → Plugins',
      'Agent monitors Slack, email, and calendar for CRM-relevant events',
      'Proposed updates appear on the board for approval',
      'Approved writes sync to HubSpot with full audit trail',
    ],
    relatedTeams: [
      { href: '/teams/sales', label: 'Sales' },
      { href: '/teams/operations', label: 'Operations' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot' },
      { href: '/plugin/ai_agent_for_gmail', label: 'Gmail' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'sales',
  }),
  'find-emails': build({
    slug: 'find-emails',
    title: 'AI agent that finds emails',
    titleAccent: 'and drafts the first touch',
    description:
      'Agents research prospects, find verified email addresses, draft personalized outreach, and log contacts to CRM — the complete find-and-reach workflow, not just a lookup tool.',
    overviewTitle: 'Beyond email lookup',
    overviewParagraphs: [
      'Email finders give you an address. Trooper agents find the email, research the prospect for personalization context, draft the first touch, and create the CRM record — ready for your approval before send.',
      'Combine LinkedIn research with email discovery in one mission. No exporting between Hunter, Clay, and your sequencing tool.',
      'Traced tickets show which sources were used and what was drafted — full transparency for compliance-conscious teams.',
    ],
    benefits: [
      { title: 'Find + personalize', description: 'Email discovery paired with LinkedIn context for relevant first touches.' },
      { title: 'CRM creation', description: 'New contacts logged to HubSpot with enrichment fields automatically.' },
      { title: 'Approval workflow', description: 'Review drafts before send — agents never blast without authorization.' },
    ],
    howItWorks: [
      'Provide a prospect name, company, or target list',
      'Agent researches on LinkedIn and discovers email addresses',
      'Personalized outreach drafted based on research context',
      'You approve; agent sends and logs to CRM',
    ],
    relatedTeams: [
      { href: '/teams/sales', label: 'Sales' },
      { href: '/teams/growth', label: 'Growth' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_linkedin', label: 'LinkedIn' },
      { href: '/plugin/ai_agent_for_gmail', label: 'Gmail' },
      { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot' },
    ],
    demoId: 'sales',
  }),
  'writes-code': build({
    slug: 'writes-code',
    title: 'AI agent that writes code',
    titleAccent: 'real PRs, not snippets',
    description:
      'Deploy coding agents (Claude Code, Codex, OpenCode) that open PRs, fix CI, address review comments, and ship features — with traced diffs, test output, and human merge approval.',
    overviewTitle: 'Coding agents that ship',
    overviewParagraphs: [
      'Chat-based code assistants suggest snippets. Trooper coding agents operate on real repos — branching, committing, opening PRs, and debugging CI with full terminal traces on the ticket Canvas.',
      'Run multiple harnesses in parallel: Claude Code hardens a parser, Codex dedupes ETL rows, your custom agent drafts release notes — one board, shared org memory.',
      'BYOA: your Claude, OpenAI, or Cursor subscriptions. Trooper routes work, enforces permissions, and keeps AGENTS.md loaded on every mission.',
    ],
    benefits: [
      { title: 'Real PRs', description: 'Agents open draft PRs with diffs, test output, and CI status — not code blocks in chat.' },
      { title: 'Multi-agent harness', description: 'Claude Code, Codex, and custom agents side-by-side on one ticket board.' },
      { title: 'Human merge gates', description: 'Senior engineers approve merges. Agents handle the grind.' },
    ],
    howItWorks: [
      'Connect GitHub and assign coding agents on your Trooper roster',
      'Delegate a task: fix CI, address review comments, or implement a feature',
      'Agent branches, commits, runs tests, and opens a draft PR',
      'You review diffs on Canvas and approve merge',
    ],
    relatedTeams: [
      { href: '/teams/coding', label: 'Coding' },
      { href: '/teams/engineering', label: 'Engineering' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_github', label: 'GitHub' },
      { href: '/plugin/ai_agent_for_linear', label: 'Linear' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'coding',
  }),
  'uses-browser': build({
    slug: 'uses-browser',
    title: 'AI agent that uses a browser',
    titleAccent: 'navigate, fill forms, extract data',
    description:
      'Trooper agents control a real browser — navigating websites, filling forms, extracting data, and completing web workflows that APIs alone cannot handle.',
    overviewTitle: 'Web automation with agent judgment',
    overviewParagraphs: [
      'Many workflows require browser interaction — legacy portals, dynamic forms, and sites without APIs. Trooper agents use OpenClaw browser control to navigate, interact, and extract data with full screenshot traces.',
      'Agents reason about page state, handle CAPTCHAs by escalating to humans, and adapt when layouts change — unlike brittle scrapers.',
      'Browser actions join multi-step missions: research a site, extract data, update a spreadsheet, and post results to Slack.',
    ],
    benefits: [
      { title: 'Real browser control', description: 'Navigate, click, fill forms, and extract data — not just API calls.' },
      { title: 'Visual traces', description: 'Screenshots and action logs on every browser step for audit and debug.' },
      { title: 'Agent reasoning', description: 'Adapt to layout changes and unexpected states — escalate when stuck.' },
    ],
    howItWorks: [
      'Describe the web task: extract pricing, fill a form, or research a site',
      'Agent opens a browser session on your private Trooper server',
      'Actions traced with screenshots on the ticket thread',
      'Extracted data flows to Sheets, CRM, or Slack as needed',
    ],
    relatedTeams: [
      { href: '/teams/operations', label: 'Operations' },
      { href: '/teams/research', label: 'Research' },
      { href: '/teams/marketing', label: 'Marketing' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_googlesheets', label: 'Google Sheets' },
      { href: '/plugin/ai_agent_for_notion', label: 'Notion' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'launch',
  }),
  'customer-support': build({
    slug: 'customer-support',
    title: 'AI agent for customer support',
    titleAccent: 'triage, draft, resolve — 24/7',
    description:
      'Deploy support agents that triage tickets, search knowledge bases, draft responses, and escalate complex issues — with human approval before customer-facing replies.',
    overviewTitle: 'Support ops that scale without burnout',
    overviewParagraphs: [
      'Support teams drown in repetitive tickets. Trooper agents triage incoming requests, search Notion and help-center docs for answers, and draft responses grounded in your actual knowledge base.',
      'Complex issues escalate to humans with full context — conversation history, attempted resolutions, and customer account data from CRM.',
      'Agents work 24/7 across time zones. Humans handle judgment calls and relationship-sensitive replies.',
    ],
    benefits: [
      { title: 'Ticket triage', description: 'Classify urgency, route to the right agent, and draft initial responses.' },
      { title: 'KB-grounded replies', description: 'Search Notion and help docs before drafting — not hallucinated answers.' },
      { title: 'Smart escalation', description: 'Complex issues routed to humans with full context and attempted resolutions.' },
    ],
    howItWorks: [
      'Connect support channels (email, Slack, Zendesk) to Trooper',
      'Agent triages incoming requests and searches knowledge base',
      'Draft response presented for human approval',
      'Approved replies sent; ticket updated with full trace',
    ],
    relatedTeams: [
      { href: '/teams/customer-support', label: 'Customer Support' },
      { href: '/teams/operations', label: 'Operations' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_notion', label: 'Notion' },
      { href: '/plugin/ai_agent_for_gmail', label: 'Gmail' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'support',
  }),
  operations: build({
    slug: 'operations',
    title: 'AI agent for operations',
    titleAccent: 'runbooks, reports, and process automation',
    description:
      'Trooper ops agents execute runbooks, generate reports, sync data between tools, and keep processes running on schedule — traced, approval-gated, and running 24/7.',
    overviewTitle: 'Ops that runs while you command',
    overviewParagraphs: [
      'Operations teams juggle spreadsheets, email threads, Slack channels, and manual checklists. Trooper agents execute runbooks on cron — daily reports, data syncs, onboarding checklists, and incident response.',
      'Every ops mission is a traced ticket. When something fails, you see exactly which step broke and why.',
      'Combine Sheets, Notion, Slack, and Gmail in multi-step ops workflows — one agent, one board.',
    ],
    benefits: [
      { title: 'Scheduled runbooks', description: 'Cron-driven checklists with step-by-step logging — daily, weekly, or on-trigger.' },
      { title: 'Cross-tool sync', description: 'Move data between Sheets, CRM, and Notion without manual exports.' },
      { title: 'Incident response', description: 'P0 triggers hotfix workflows with Slack alerts and full terminal traces.' },
    ],
    howItWorks: [
      'Define an ops runbook or describe a recurring process',
      'Agent executes steps across connected tools with traced logging',
      'Failures escalate to Slack with context for human takeover',
      'Completed missions update runbooks in Notion automatically',
    ],
    relatedTeams: [
      { href: '/teams/operations', label: 'Operations' },
      { href: '/teams/finance', label: 'Finance' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_googlesheets', label: 'Google Sheets' },
      { href: '/plugin/ai_agent_for_notion', label: 'Notion' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'operations',
  }),
  startups: build({
    slug: 'startups',
    title: 'AI workforce for startups',
    titleAccent: '10-person output, 3-person team',
    description:
      'Deploy an AI workforce that handles sales outreach, code reviews, customer support, and ops runbooks — giving startup teams the output of a much larger org from day one.',
    overviewTitle: 'Scale without scaling headcount',
    overviewParagraphs: [
      'Startups need sales, engineering, support, and ops — but can\'t hire for all four at once. Trooper deploys AI employees for each function on one unit, sharing org memory and a unified task board.',
      'Founders command from Slack. Agents execute sales research, PR reviews, support triage, and weekly reports — 24/7 across time zones.',
      'BYOA pricing: bring your Claude or OpenAI subscriptions. Trooper provides the harness, hosting, and coordination.',
    ],
    benefits: [
      { title: 'Multi-function unit', description: 'Sales, coding, support, and ops agents on one Trooper deployment.' },
      { title: 'Founder command', description: 'Delegate from Slack or mobile — agents execute while you focus on product.' },
      { title: 'Startup-friendly pricing', description: 'Your model costs + Trooper hosting — not per-seat enterprise pricing.' },
    ],
    howItWorks: [
      'Deploy a Trooper unit and configure your first agents (sales + coding)',
      'Connect GitHub, HubSpot, Gmail, and Slack plugins',
      'Delegate tasks from chat: research prospects, review PRs, triage support',
      'Scale agent roster as the team grows — same unit, more soldiers',
    ],
    relatedTeams: [
      { href: '/teams/sales', label: 'Sales' },
      { href: '/teams/coding', label: 'Coding' },
      { href: '/teams/growth', label: 'Growth' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_github', label: 'GitHub' },
      { href: '/plugin/ai_agent_for_hubspot', label: 'HubSpot' },
      { href: '/plugin/ai_agent_for_slack', label: 'Slack' },
    ],
    demoId: 'launch',
  }),
  'small-business': build({
    slug: 'small-business',
    title: 'AI employees for small business',
    titleAccent: 'affordable ops without hiring',
    description:
      'Give your small business AI employees for email, scheduling, customer follow-ups, invoicing, and social media — working 24/7 so you can focus on customers and growth.',
    overviewTitle: 'Enterprise capability, small business budget',
    overviewParagraphs: [
      'Small businesses wear every hat — sales, support, bookkeeping, marketing. Trooper agents handle the repetitive work: inbox triage, appointment reminders, invoice follow-ups, and weekly reports.',
      'No IT team required. Connect Gmail, Google Calendar, and Stripe in minutes. Command agents from your phone via WhatsApp or Slack.',
      'Human approval on every customer email and payment action. Agents propose; you stay in control.',
    ],
    benefits: [
      { title: 'Email & scheduling', description: 'Inbox triage, appointment reminders, and follow-up drafts on autopilot.' },
      { title: 'Customer follow-ups', description: 'Invoice reminders, review requests, and nurture sequences with approval gates.' },
      { title: 'No IT required', description: 'Connect tools via OAuth in minutes. Command from phone via WhatsApp or Slack.' },
    ],
    howItWorks: [
      'Sign up and deploy your Trooper unit in under 10 minutes',
      'Connect Gmail, Google Calendar, and Stripe via OAuth',
      'Tell your agent what to handle: inbox, follow-ups, or reports',
      'Approve actions from your phone — agents work while you serve customers',
    ],
    relatedTeams: [
      { href: '/teams/operations', label: 'Operations' },
      { href: '/teams/customer-support', label: 'Customer Support' },
      { href: '/teams/marketing', label: 'Marketing' },
    ],
    relatedIntegrations: [
      { href: '/plugin/ai_agent_for_gmail', label: 'Gmail' },
      { href: '/plugin/ai_agent_for_stripe', label: 'Stripe' },
      { href: '/plugin/ai_agent_for_googlesheets', label: 'Google Sheets' },
    ],
    demoId: 'email',
  }),
};

export function getUseCasePage(slug: string): UseCasePageContent | undefined {
  return useCases[slug];
}

export function allUseCaseSlugs(): string[] {
  return Object.keys(useCases);
}

export const useCaseHubMeta = {
  title: 'AI Agent Use Cases | Trooper',
  description:
    'See how Trooper AI agents handle lead generation, sales research, CRM updates, code writing, browser automation, customer support, and operations for startups and small businesses.',
  canonical: 'https://trooper.so/use-cases',
};

export const useCaseSocialImage = SOCIAL_IMAGE;
