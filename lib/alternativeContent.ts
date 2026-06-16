import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

export type ComparisonRow = {
  feature: string;
  trooper: string;
  competitor: string;
};

export type AlternativePageContent = {
  slug: string;
  competitorName: string;
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  comparisonRows: ComparisonRow[];
  whenToChooseTrooper: string[];
  demoId: DemoScenarioId;
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

type BuildArgs = {
  slug: string;
  competitorName: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  comparisonRows: ComparisonRow[];
  whenToChooseTrooper: string[];
  demoId?: DemoScenarioId;
};

function build(args: BuildArgs): AlternativePageContent {
  return {
    ...args,
    missionLabel: 'Alternative brief',
    title: `Trooper — the ${args.competitorName} alternative`,
    demoId: args.demoId ?? 'launch',
    meta: {
      title: `${args.competitorName} Alternative | Trooper`,
      description: args.description.slice(0, 160),
      canonical: `https://trooper.so/alternatives/${args.slug}`,
    },
  };
}

const alternatives: Record<string, AlternativePageContent> = {
  lindy: build({
    slug: 'lindy',
    competitorName: 'Lindy',
    titleAccent: 'for teams that need real execution',
    description:
      'Lindy builds AI assistants for workflow automation. Trooper deploys AI employees with full system access, multi-agent teams, and 1,000+ integrations — executing end-to-end tasks on a traced board, not just chat replies.',
    overviewTitle: 'Assistants vs. an AI workforce',
    overviewParagraphs: [
      'Lindy focuses on no-code AI assistants that connect to apps and run predefined workflows. Trooper goes further — multiple AI employees with roles, persistent org memory, and OpenClaw runtime access to browsers, terminals, and code.',
      'Where Lindy chains app actions in a single assistant, Trooper splits complex work across specialized agents (coding, sales, ops) that collaborate on one unified task board.',
      'Every Trooper mission is a traced ticket with tool logs, diffs, and approval gates — built for teams that need auditability, not just automation triggers.',
    ],
    benefits: [
      { title: 'Multi-agent teams', description: 'Deploy coding, sales, and ops agents that share context — not one generalist bot.' },
      { title: 'Full system access', description: 'Browsers, terminals, GitHub, and file systems — agents execute, not just API-call.' },
      { title: 'OpenClaw runtime', description: '1,000+ plugins and 3,000+ skills on a proven agent framework with org-scoped memory.' },
    ],
    comparisonRows: [
      { feature: 'Execution model', trooper: 'Multi-agent workforce with traced tickets', competitor: 'Single-assistant workflow chains' },
      { feature: 'System access', trooper: 'Browser, terminal, GitHub, full OpenClaw', competitor: 'App integrations via connectors' },
      { feature: 'Code & dev work', trooper: 'Claude Code, Codex, PR workflows', competitor: 'Limited or no coding agent support' },
      { feature: 'Memory', trooper: 'Persistent org memory across all agents', competitor: 'Per-assistant context' },
      { feature: 'Approvals', trooper: 'Human command on sensitive actions', competitor: 'Workflow-level triggers' },
      { feature: 'Pricing', trooper: 'BYOA — your model subscriptions', competitor: 'Per-task or seat-based credits' },
    ],
    whenToChooseTrooper: [
      'You need agents that write code, open PRs, and debug CI — not just move data between apps.',
      'Your team wants multiple specialized agents sharing one org memory and task board.',
      'You require full audit trails with tool logs and approval gates on every mission.',
    ],
    demoId: 'launch',
  }),
  'relevance-ai': build({
    slug: 'relevance-ai',
    competitorName: 'Relevance AI',
    titleAccent: 'with production-grade agent ops',
    description:
      'Relevance AI offers a platform for building and deploying AI agents. Trooper gives you a ready-to-run AI workforce on OpenClaw — with coding harnesses, CRM plugins, and traced execution from day one.',
    overviewTitle: 'Build platform vs. deployed workforce',
    overviewParagraphs: [
      'Relevance AI is an agent builder platform — you design chains, tools, and workflows from scratch. Trooper ships with pre-configured agent templates, team structures, and 1,000+ integrations already wired.',
      'Trooper agents run on your private server with OpenClaw — browser control, shell access, and multi-model harnesses (Claude Code, Codex) out of the box.',
      'Skip months of agent architecture. Deploy sales, engineering, and ops units that execute real work on a unified board with human approval gates.',
    ],
    benefits: [
      { title: 'Ready-made teams', description: 'Sales, coding, marketing, and ops agent templates — deploy in minutes, not weeks.' },
      { title: 'OpenClaw depth', description: '3,000+ community skills plus browser, terminal, and node execution.' },
      { title: 'Private runtime', description: 'Your server, your credentials, your data — not a shared multi-tenant builder.' },
    ],
    comparisonRows: [
      { feature: 'Time to value', trooper: 'Deploy agent teams in minutes', competitor: 'Build and configure agent chains' },
      { feature: 'Coding agents', trooper: 'Native Claude Code / Codex harness', competitor: 'Custom tool configuration required' },
      { feature: 'Integrations', trooper: '1,000+ Composio + OpenClaw plugins', competitor: 'Custom connector setup' },
      { feature: 'Infrastructure', trooper: 'Managed private VPS per org', competitor: 'Platform-hosted or self-managed' },
      { feature: 'Traceability', trooper: 'Ticket-grade tool logs and diffs', competitor: 'Chain execution logs' },
      { feature: 'Skills ecosystem', trooper: '3,000+ OpenClaw community skills', competitor: 'Build-your-own tool library' },
    ],
    whenToChooseTrooper: [
      'You want a deployed AI workforce today, not a platform to build agents from scratch.',
      'Engineering needs real PR workflows, not custom API wrappers around GitHub.',
      'You value OpenClaw\'s skill ecosystem over building every tool integration yourself.',
    ],
    demoId: 'coding',
  }),
  gumloop: build({
    slug: 'gumloop',
    competitorName: 'Gumloop',
    titleAccent: 'beyond visual flow builders',
    description:
      'Gumloop offers visual AI workflow automation. Trooper deploys autonomous AI employees that reason through tasks, use real tools, and adapt — not just follow predefined node graphs.',
    overviewTitle: 'Flow charts vs. reasoning agents',
    overviewParagraphs: [
      'Gumloop connects apps through visual drag-and-drop flows with AI steps. Trooper agents reason through tasks dynamically — choosing tools, handling edge cases, and reporting back with full traces.',
      'When a workflow breaks on unexpected input, flow builders stall. Trooper agents adapt, escalate to humans, and continue on the next mission.',
      'Combine the reliability of traced tickets with the flexibility of LLM reasoning — plus coding agents that actually ship PRs.',
    ],
    benefits: [
      { title: 'Dynamic reasoning', description: 'Agents adapt to edge cases — not brittle if/else flow branches.' },
      { title: 'Coding + ops', description: 'Same workforce handles spreadsheets, emails, and pull requests.' },
      { title: 'Traced missions', description: 'Every step logged — replay, audit, and improve workflows over time.' },
    ],
    comparisonRows: [
      { feature: 'Workflow model', trooper: 'Reasoning agents with tool selection', competitor: 'Visual node-based flows' },
      { feature: 'Edge cases', trooper: 'Agent adapts and escalates to human', competitor: 'Flow breaks on unexpected input' },
      { feature: 'Code execution', trooper: 'Full terminal and GitHub access', competitor: 'Limited code node support' },
      { feature: 'Complexity ceiling', trooper: 'Multi-agent parallel execution', competitor: 'Linear or branching flows' },
      { feature: 'Maintenance', trooper: 'Agents learn org context over time', competitor: 'Manual flow updates per change' },
      { feature: 'Integrations', trooper: '1,000+ plugins via Composio + OpenClaw', competitor: 'Curated app connectors' },
    ],
    whenToChooseTrooper: [
      'Your workflows need judgment calls, not just deterministic app-to-app transfers.',
      'You want one workforce for sales, engineering, and ops — not separate flows per team.',
      'Coding and DevOps work must live on the same board as CRM and email automation.',
    ],
    demoId: 'operations',
  }),
  clay: build({
    slug: 'clay',
    competitorName: 'Clay',
    titleAccent: 'plus everything else your team does',
    description:
      'Clay excels at sales enrichment and prospecting workflows. Trooper covers enrichment plus the full sales cycle — outreach drafts, CRM updates, follow-ups, and engineering support on one AI workforce.',
    overviewTitle: 'Enrichment tool vs. full sales ops',
    overviewParagraphs: [
      'Clay is purpose-built for data enrichment — pulling firmographics, emails, and signals into spreadsheets. Trooper agents do enrichment and then act on it: draft outreach, update HubSpot, schedule follow-ups.',
      'Stop exporting Clay tables into separate tools. Agents research on LinkedIn, enrich in Sheets, draft in Gmail, and log to CRM — one traced mission.',
      'Beyond sales: the same Trooper unit handles engineering PRs, support triage, and ops runbooks.',
    ],
    benefits: [
      { title: 'Enrich → act', description: 'Research feeds directly into outreach drafts and CRM updates — no export step.' },
      { title: 'LinkedIn + HubSpot', description: 'Native plugins for the full prospect-to-pipeline workflow.' },
      { title: 'Beyond sales', description: 'Same workforce handles code reviews, support, and ops — not just lists.' },
    ],
    comparisonRows: [
      { feature: 'Core focus', trooper: 'Full AI workforce (sales + eng + ops)', competitor: 'Sales enrichment & prospecting' },
      { feature: 'After enrichment', trooper: 'Draft emails, update CRM, follow up', competitor: 'Export to other tools' },
      { feature: 'CRM integration', trooper: 'Native HubSpot agent with write access', competitor: 'Push data to CRM via sync' },
      { feature: 'Engineering', trooper: 'GitHub PRs, CI, code review agents', competitor: 'Not supported' },
      { feature: 'Execution', trooper: 'Autonomous multi-step missions', competitor: 'Table enrichment workflows' },
      { feature: 'Approvals', trooper: 'Human gates before send/write', competitor: 'Automated enrichment runs' },
    ],
    whenToChooseTrooper: [
      'You want enrichment to flow directly into outreach and CRM — not stop at a spreadsheet.',
      'Your team needs sales agents and coding agents on the same platform.',
      'You\'re building an AI workforce, not just a better prospecting table.',
    ],
    demoId: 'sales',
  }),
  hunter: build({
    slug: 'hunter',
    competitorName: 'Hunter',
    titleAccent: 'from email find to full outreach',
    description:
      'Hunter finds professional email addresses. Trooper agents find emails, research prospects, draft personalized outreach, and update your CRM — the complete lead-gen workflow in one mission.',
    overviewTitle: 'Email finder vs. outreach operator',
    overviewParagraphs: [
      'Hunter solves one step: finding verified email addresses for prospects. Trooper agents handle the full chain — LinkedIn research, email discovery, personalized drafting, CRM logging, and follow-up scheduling.',
      'Stop copying Hunter results into spreadsheets and separate sequencing tools. One agent mission covers research through first touch.',
      'Traced tickets show exactly which sources were used, what was drafted, and what was sent — with approval before every outbound email.',
    ],
    benefits: [
      { title: 'Full outreach chain', description: 'Research → find email → draft → CRM log → follow-up in one workflow.' },
      { title: 'Approval gates', description: 'Review every outbound email before the agent sends.' },
      { title: 'CRM sync', description: 'Contacts and activities logged to HubSpot automatically.' },
    ],
    comparisonRows: [
      { feature: 'Scope', trooper: 'Research, email, draft, CRM, follow-up', competitor: 'Email address discovery' },
      { feature: 'Personalization', trooper: 'LLM-drafted emails from research context', competitor: 'No drafting capability' },
      { feature: 'CRM', trooper: 'Native HubSpot read/write', competitor: 'Export contacts externally' },
      { feature: 'Follow-up', trooper: 'Scheduled sequences on cron', competitor: 'Not supported' },
      { feature: 'Traceability', trooper: 'Full mission thread with sources', competitor: 'Search credits and results' },
      { feature: 'Beyond email', trooper: 'Coding, ops, support on same board', competitor: 'Email finding only' },
    ],
    whenToChooseTrooper: [
      'You need the full outreach workflow, not just verified email addresses.',
      'Sales reps should approve drafts before anything sends.',
      'Lead gen is one part of a broader AI workforce you\'re building.',
    ],
    demoId: 'sales',
  }),
  apollo: build({
    slug: 'apollo',
    competitorName: 'Apollo',
    titleAccent: 'with autonomous execution',
    description:
      'Apollo combines a B2B database with sequencing and dialer tools. Trooper agents use your data sources, draft outreach, update CRM, and execute multi-step sales missions — with AI reasoning, not just sequences.',
    overviewTitle: 'Sales platform vs. AI sales operators',
    overviewParagraphs: [
      'Apollo provides a large contact database, email sequences, and calling tools in one sales platform. Trooper deploys AI sales operators that reason through each prospect — researching, personalizing, and adapting outreach based on real context.',
      'Bring your own data from Apollo, LinkedIn, or CSVs. Trooper agents enrich, draft, and act — with human approval on every send and CRM write.',
      'Beyond outbound: the same unit handles inbound triage, meeting prep, and post-call CRM updates.',
    ],
    benefits: [
      { title: 'Reasoning over sequences', description: 'Agents personalize each touch — not one-size-fits-all email templates.' },
      { title: 'BYO data', description: 'Use Apollo data, LinkedIn, or any source — agents adapt to what you have.' },
      { title: 'Inbound + outbound', description: 'Same sales agents handle prospecting and inbound lead response.' },
    ],
    comparisonRows: [
      { feature: 'Data model', trooper: 'BYO data + LinkedIn + CRM context', competitor: 'Built-in B2B database' },
      { feature: 'Outreach', trooper: 'AI-reasoned personalized drafts', competitor: 'Template-based sequences' },
      { feature: 'Calling', trooper: 'Meeting prep and post-call CRM logs', competitor: 'Built-in dialer' },
      { feature: 'CRM', trooper: 'Deep HubSpot agent with pipeline ops', competitor: 'Basic CRM sync' },
      { feature: 'Adaptability', trooper: 'Agent adjusts per prospect context', competitor: 'Fixed sequence steps' },
      { feature: 'Beyond sales', trooper: 'Engineering, ops, support agents too', competitor: 'Sales-focused platform' },
    ],
    whenToChooseTrooper: [
      'You want AI that reasons about each prospect, not blasts template sequences.',
      'Your CRM ops (pipeline reviews, meeting prep) matter as much as outbound.',
      'You\'re building an AI organization, not buying another sales engagement tool.',
    ],
    demoId: 'sales',
  }),
  'n8n-ai': build({
    slug: 'n8n-ai',
    competitorName: 'n8n AI',
    titleAccent: 'with agents that reason, not just route',
    description:
      'n8n adds AI nodes to its workflow automation platform. Trooper deploys reasoning AI employees with OpenClaw access — handling ambiguity, writing code, and executing multi-step missions beyond fixed node graphs.',
    overviewTitle: 'Workflow nodes vs. reasoning workforce',
    overviewParagraphs: [
      'n8n AI embeds LLM steps into self-hosted workflow automations — great for deterministic pipelines with an AI assist. Trooper agents reason through entire missions dynamically, selecting tools and adapting to context.',
      'When step 7 of your n8n workflow fails on unexpected data, you debug nodes. Trooper agents handle edge cases, escalate to humans, and continue.',
      'Plus native coding agents, browser control, and 3,000+ OpenClaw skills — beyond what workflow nodes typically cover.',
    ],
    benefits: [
      { title: 'Reasoning agents', description: 'Dynamic tool selection and adaptation — not fixed node sequences.' },
      { title: 'Self-hosted depth', description: 'Private server with full OpenClaw runtime, not just workflow triggers.' },
      { title: 'Coding native', description: 'Claude Code and Codex harness for real PR workflows.' },
    ],
    comparisonRows: [
      { feature: 'Architecture', trooper: 'Multi-agent reasoning workforce', competitor: 'Self-hosted workflow + AI nodes' },
      { feature: 'Flexibility', trooper: 'Agents adapt to unexpected inputs', competitor: 'Predefined node connections' },
      { feature: 'Coding', trooper: 'Native GitHub PR and CI agents', competitor: 'Code nodes with limited scope' },
      { feature: 'Setup', trooper: 'Deploy agent teams in minutes', competitor: 'Build and maintain workflow graphs' },
      { feature: 'Skills', trooper: '3,000+ OpenClaw community skills', competitor: 'Custom node development' },
      { feature: 'Approvals', trooper: 'Human command per mission', competitor: 'Workflow error handling' },
    ],
    whenToChooseTrooper: [
      'You need agents that handle ambiguity — not workflows that break on edge cases.',
      'Engineering wants the same platform as ops and sales automation.',
      'You\'d rather deploy agents than maintain growing workflow graphs.',
    ],
    demoId: 'engineering',
  }),
  'zapier-agents': build({
    slug: 'zapier-agents',
    competitorName: 'Zapier Agents',
    titleAccent: 'with real system access',
    description:
      'Zapier Agents automate tasks across 7,000+ app connections. Trooper goes deeper — AI employees with browser control, terminal access, coding harnesses, and reasoning that adapts beyond predefined zaps.',
    overviewTitle: 'App connectors vs. full execution',
    overviewParagraphs: [
      'Zapier Agents trigger actions across connected apps with AI-assisted setup. Trooper agents execute full missions — browsing websites, running scripts, opening PRs, and reasoning through multi-step problems.',
      'Zaps break when apps change APIs or data formats shift. Trooper agents adapt, use browser fallbacks, and escalate with full context.',
      '1,000+ Composio integrations plus OpenClaw browser, terminal, and coding tools — broader execution surface than app-to-app triggers.',
    ],
    benefits: [
      { title: 'Beyond API calls', description: 'Browser, terminal, and file system access when APIs aren\'t enough.' },
      { title: 'Coding agents', description: 'Ship PRs and debug CI — not possible with standard zaps.' },
      { title: 'Multi-agent teams', description: 'Specialized agents collaborate — not one agent per zap.' },
    ],
    comparisonRows: [
      { feature: 'Execution depth', trooper: 'Browser, terminal, code, 1,000+ APIs', competitor: 'App-to-app API triggers' },
      { feature: 'Coding', trooper: 'GitHub PRs, CI debugging, patches', competitor: 'No code execution' },
      { feature: 'Adaptability', trooper: 'LLM reasoning with tool selection', competitor: 'Predefined trigger-action pairs' },
      { feature: 'Complex workflows', trooper: 'Multi-agent parallel missions', competitor: 'Multi-step zaps' },
      { feature: 'Memory', trooper: 'Persistent org context', competitor: 'Per-zap context' },
      { feature: 'Approvals', trooper: 'Human command on sensitive ops', competitor: 'Automated zap runs' },
    ],
    whenToChooseTrooper: [
      'Your automations need browser control, code execution, or judgment calls.',
      'Engineering and ops work must live alongside app integrations.',
      'You want an AI workforce, not a better version of if-this-then-that.',
    ],
    demoId: 'launch',
  }),
  cursor: build({
    slug: 'cursor',
    competitorName: 'Cursor',
    titleAccent: 'for teams, not just solo devs',
    description:
      'Cursor is an AI-native IDE for individual developers. Trooper orchestrates multiple coding agents (Claude Code, Codex, OpenCode) across your team — with PR workflows, org memory, and non-engineering agents on one board.',
    overviewTitle: 'IDE assistant vs. team coding ops',
    overviewParagraphs: [
      'Cursor embeds AI into your editor for inline completions, chat, and agentic edits — powerful for solo development. Trooper coordinates multiple coding agents across repos and teammates with traced PRs, CI logs, and shared org memory.',
      'Your Cursor subscription stays yours. Trooper routes work to Claude Code, Codex, or any harness — plus sales, ops, and support agents on the same unit.',
      'Senior engineers approve merges. Agents handle parser patches, ETL dedupe, and regression tests in parallel.',
    ],
    benefits: [
      { title: 'Multi-agent harness', description: 'Claude Code, Codex, and custom agents side-by-side on one board.' },
      { title: 'Team coordination', description: 'Shared task board, org memory, and approval gates — not solo IDE sessions.' },
      { title: 'Beyond coding', description: 'Sales, ops, and support agents on the same Trooper unit.' },
    ],
    comparisonRows: [
      { feature: 'Scope', trooper: 'Full AI workforce (coding + sales + ops)', competitor: 'AI-native code editor' },
      { feature: 'Team model', trooper: 'Multi-agent board with shared memory', competitor: 'Individual developer IDE' },
      { feature: 'PR workflow', trooper: 'Traced PRs, CI, diff review on Canvas', competitor: 'Editor-based commits' },
      { feature: 'Agent variety', trooper: 'Claude Code + Codex + OpenCode + ops', competitor: 'Single IDE agent' },
      { feature: 'Non-code work', trooper: 'CRM, email, browser, support agents', competitor: 'Code-focused only' },
      { feature: 'Approvals', trooper: 'Human merge gates and permission scopes', competitor: 'Developer discretion' },
    ],
    whenToChooseTrooper: [
      'You need coding agents coordinated across a team, not just a better IDE.',
      'Engineering ops (PR review, CI triage) should be traced and auditable.',
      'Your org wants coding agents alongside sales and ops on one platform.',
    ],
    demoId: 'coding',
  }),
  devin: build({
    slug: 'devin',
    competitorName: 'Devin',
    titleAccent: 'with your subscriptions and repos',
    description:
      'Devin is an autonomous AI software engineer. Trooper runs multiple coding agents (Claude Code, Codex) on your repos with your subscriptions — plus sales, ops, and support agents on the same workforce.',
    overviewTitle: 'Solo AI engineer vs. multi-agent harness',
    overviewParagraphs: [
      'Devin aims to be an autonomous software engineer that plans, codes, and deploys independently. Trooper takes a team-first approach — multiple specialized agents with human approval gates, shared org memory, and BYOA model subscriptions.',
      'You bring your Claude, OpenAI, or Cursor subscriptions. Trooper provides the harness: routing, permissions, traced diffs, and PR workflows across agents.',
      'Coding is one lane. Sales pipeline ops, support triage, and marketing campaigns run on the same board.',
    ],
    benefits: [
      { title: 'BYOA models', description: 'Your API keys and subscriptions — not a bundled AI engineer seat.' },
      { title: 'Human command', description: 'Approve merges, sends, and writes. Agents propose; you authorize.' },
      { title: 'Full workforce', description: 'Coding plus CRM, email, and ops — not engineering-only.' },
    ],
    comparisonRows: [
      { feature: 'Model access', trooper: 'BYOA — Claude, OpenAI, any provider', competitor: 'Bundled AI engineer subscription' },
      { feature: 'Control', trooper: 'Human approval on merges and deploys', competitor: 'Autonomous execution model' },
      { feature: 'Agent model', trooper: 'Multi-agent specialized roles', competitor: 'Single AI engineer' },
      { feature: 'Traceability', trooper: 'Ticket-grade diffs and CI logs', competitor: 'Session-based work logs' },
      { feature: 'Beyond code', trooper: 'Sales, support, ops on same unit', competitor: 'Software engineering only' },
      { feature: 'Cost', trooper: 'Your model costs + Trooper hosting', competitor: 'Per-seat AI engineer pricing' },
    ],
    whenToChooseTrooper: [
      'You want control over which models run and when merges happen.',
      'Engineering is one part of an AI workforce you\'re building.',
      'Your team already has Claude Code or Codex subscriptions to leverage.',
    ],
    demoId: 'coding',
  }),
  'hubspot-ai-agent': build({
    slug: 'hubspot-ai-agent',
    competitorName: 'HubSpot AI Agent',
    titleAccent: 'with cross-tool execution',
    description:
      'HubSpot\'s built-in AI agents work within the CRM. Trooper\'s HubSpot agent connects CRM ops to Gmail, LinkedIn, Slack, and coding agents — executing full sales and ops missions, not just in-app suggestions.',
    overviewTitle: 'In-CRM AI vs. connected workforce',
    overviewParagraphs: [
      'HubSpot AI agents assist with content generation, deal insights, and workflow suggestions inside the CRM. Trooper agents operate on HubSpot data and then act across your stack — drafting emails, posting to Slack, updating Sheets, and opening tickets.',
      'Pipeline review in HubSpot becomes a Slack digest, email follow-up, and Notion brief — one traced mission across tools.',
      'Combine HubSpot with LinkedIn research, Gmail outreach, and engineering support on one AI workforce.',
    ],
    benefits: [
      { title: 'Cross-tool missions', description: 'CRM ops flow into email, Slack, Sheets, and code — not siloed in HubSpot.' },
      { title: 'LinkedIn + Gmail', description: 'Research prospects and draft outreach from the same agent mission.' },
      { title: 'Traced execution', description: 'Every CRM write logged on the Trooper board with approval gates.' },
    ],
    comparisonRows: [
      { feature: 'Scope', trooper: 'HubSpot + Gmail + Slack + GitHub + 1,000 more', competitor: 'Within HubSpot CRM' },
      { feature: 'Outreach', trooper: 'Research → draft → send with approval', competitor: 'In-app content suggestions' },
      { feature: 'Engineering', trooper: 'GitHub PRs and support triage too', competitor: 'CRM-only' },
      { feature: 'Execution', trooper: 'Autonomous multi-step missions', competitor: 'AI-assisted CRM actions' },
      { feature: 'Memory', trooper: 'Org-wide context across all tools', competitor: 'HubSpot contact/deal context' },
      { feature: 'Approvals', trooper: 'Human gates before CRM writes and sends', competitor: 'User-initiated AI actions' },
    ],
    whenToChooseTrooper: [
      'CRM work should trigger email, Slack, and research — not stay inside HubSpot.',
      'You want one AI workforce for sales, engineering, and ops.',
      'Full audit trails on CRM writes and outreach matter for your team.',
    ],
    demoId: 'sales',
  }),
};

export function getAlternativePage(slug: string): AlternativePageContent | undefined {
  return alternatives[slug];
}

export function allAlternativeSlugs(): string[] {
  return Object.keys(alternatives);
}

export const alternativeHubMeta = {
  title: 'Trooper Alternatives & Comparisons',
  description:
    'See how Trooper compares to Lindy, Clay, Apollo, Cursor, Devin, Zapier Agents, and other AI automation tools. The AI workforce for teams that need real execution.',
  canonical: 'https://trooper.so/alternatives',
};

export const alternativeSocialImage = SOCIAL_IMAGE;
