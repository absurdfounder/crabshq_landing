import { featureNavItems, teamNavItems } from '@/components/ui/nav-data';
import type { DemoScenarioId } from '@/lib/demoScenarios';

export type SubpageBenefit = {
  title: string;
  description: string;
};

export type SubpageContent = {
  slug: string;
  kind: 'feature' | 'team';
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  demoId: DemoScenarioId;
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

type BuildArgs = {
  slug: string;
  kind: 'feature' | 'team';
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  demoId?: DemoScenarioId;
};

const TEAM_DEMO_MAP: Record<string, DemoScenarioId> = {
  marketing: 'marketing',
  sales: 'sales',
  engineering: 'engineering',
  operations: 'operations',
  legal: 'legal',
  lawyers: 'legal',
  coding: 'coding',
  design: 'design',
  'customer-support': 'support',
  finance: 'finance',
  'business-development': 'bd',
  research: 'research',
  security: 'security',
  pr: 'pr',
  growth: 'growth',
};

export const FEATURE_DEMO_MAP: Record<string, DemoScenarioId> = {
  'ai-workforce': 'launch',
  'github-integration': 'coding',
  'task-execution': 'sales',
  'persistent-memory': 'messaging',
  'browser-control': 'launch',
  'system-access': 'engineering',
  'email-automation': 'email',
  'skills-plugins': 'marketing',
  'multi-agent-collaboration': 'coding',
  'openclaw-powered': 'launch',
  'chat-interfaces': 'slack',
};

function buildPage(args: BuildArgs): SubpageContent {
  const base = args.kind === 'feature' ? 'features' : 'teams';
  const demoId =
    args.demoId ??
    (args.kind === 'team'
      ? TEAM_DEMO_MAP[args.slug] ?? 'launch'
      : FEATURE_DEMO_MAP[args.slug] ?? 'task-execution');
  return {
    ...args,
    demoId,
    meta: {
      title: `${args.title} | Trooper`,
      description: args.description,
      canonical: `https://trooper.so/${base}/${args.slug}`,
    },
  };
}

const genericFeatureBenefits = (topic: string): SubpageBenefit[] => [
  {
    title: 'Autonomous execution',
    description: `Trooper agents handle ${topic} end-to-end — creating tickets, taking action, and reporting back.`,
  },
  {
    title: 'Traced decisions',
    description: 'Every step is logged in the ticket thread so you can audit what happened and why.',
  },
  {
    title: 'OpenClaw skills',
    description: 'Connect GitHub, Gmail, browsers, and 3,000+ skills so agents use your real stack.',
  },
];

const genericTeamBenefits = (team: string): SubpageBenefit[] => [
  {
    title: `Dedicated ${team} agents`,
    description: `Deploy AI employees scoped to ${team} workflows with the right skills and permissions.`,
  },
  {
    title: '24/7 operations',
    description: 'Agents keep working across time zones — drafts and follow-ups never stall overnight.',
  },
  {
    title: 'Human command',
    description: 'You approve sensitive actions. Agents propose, you authorize, the system executes.',
  },
];

const featureContent: Record<string, SubpageContent> = {
  'ai-workforce': buildPage({
    slug: 'ai-workforce',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Multiple AI employees',
    titleAccent: 'working as a team',
    description:
      'Build AI workforce teams with Trooper. Deploy multiple AI employees that collaborate, share context, and execute tasks autonomously.',
    overviewTitle: 'Why AI organizations outperform single agents',
    overviewParagraphs: [
      'Traditional AI assistants handle one task at a time. Trooper lets you create AI organizations — multiple employees with roles, skills, and system access.',
      'Each employee can own GitHub, email, browsers, or internal tools while sharing organizational memory and coordinating automatically.',
      'Engineering gets code review agents, marketing gets content agents, support gets triage agents — all under one command structure.',
    ],
    benefits: [
      { title: 'Role-based employees', description: 'Assign DevOps, writer, or support roles with dedicated skills and permissions.' },
      { title: 'Shared org memory', description: 'Decisions and context flow across the whole unit, not one chat window.' },
      { title: 'Parallel execution', description: 'Complex work splits across agents and runs simultaneously.' },
    ],
  }),
  'github-integration': buildPage({
    slug: 'github-integration',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'GitHub integration',
    titleAccent: 'that ships real code',
    description: 'Autonomous commits, pull requests, code reviews, and issue triage powered by OpenClaw agents.',
    overviewTitle: 'Agents that contribute like developers',
    overviewParagraphs: [
      'Trooper agents make real commits, open PRs, review changes, and triage issues — not just suggest diffs in chat.',
      'They understand repo context, branch strategy, and your review standards through persistent memory.',
      'Connect once and agents keep shipping while you stay in command on merges and releases.',
    ],
    benefits: genericFeatureBenefits('GitHub workflows'),
  }),
  'task-execution': buildPage({
    slug: 'task-execution',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Task execution',
    titleAccent: 'from start to finish',
    description: 'AI employees complete multi-step work from ticket to done — not just answers in a chat thread.',
    overviewTitle: 'Action, not suggestions',
    overviewParagraphs: [
      'Tasks are ticket-based with threaded conversations, tool traces, and clear ownership.',
      'Agents checkout work atomically, execute across tools, and mark done when finished.',
      'You see every instruction, tool call, and decision — nothing happens in the dark.',
    ],
    benefits: genericFeatureBenefits('task workflows'),
  }),
  'persistent-memory': buildPage({
    slug: 'persistent-memory',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Persistent memory',
    titleAccent: 'that never resets',
    description: 'Agents remember preferences, project context, and past decisions across sessions and reboots.',
    overviewTitle: 'Memory that compounds',
    overviewParagraphs: [
      'Explain your conventions once — agents retain coding style, brand voice, and project history permanently.',
      'Memory flows from company goals down to individual tasks so agents always know the why.',
      'Sessions persist across weeks-long projects without losing thread.',
    ],
    benefits: genericFeatureBenefits('long-running context'),
  }),
  'browser-control': buildPage({
    slug: 'browser-control',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Browser control',
    titleAccent: 'on any site',
    description: 'Agents navigate the web, fill forms, extract data, and automate browser workflows autonomously.',
    overviewTitle: 'Real browser automation',
    overviewParagraphs: [
      'Agents drive real browser sessions — multi-tab, JavaScript-heavy apps, forms, and screenshots.',
      'Use for research, competitor monitoring, data extraction, and recurring web ops.',
      'Runs on the always-on virtual PC so jobs continue when you are offline.',
    ],
    benefits: genericFeatureBenefits('browser automation'),
  }),
  'system-access': buildPage({
    slug: 'system-access',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Full system access',
    titleAccent: 'on a private server',
    description: 'Shell commands, file management, scripts, and runtime control on each agent virtual PC.',
    overviewTitle: 'Your agents get a workstation',
    overviewParagraphs: [
      'Every org runs on a dedicated OpenClaw runtime with terminal, filesystem, and process access.',
      'Agents install dependencies, run builds, manage configs, and execute scripts within your policies.',
      'Self-host or use Trooper Cloud — your data stays isolated per organization.',
    ],
    benefits: genericFeatureBenefits('system operations'),
  }),
  'email-automation': buildPage({
    slug: 'email-automation',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Email & communication',
    titleAccent: 'across channels',
    description: 'Gmail, Slack, Discord, and messaging channels wired into your AI workforce.',
    overviewTitle: 'Agents that communicate',
    overviewParagraphs: [
      'Read, categorize, and reply to email with context from memory and active tasks.',
      'Coordinate in Slack or Discord alongside human teammates.',
      'Schedule campaigns, follow up on threads, and escalate when approval is required.',
    ],
    benefits: genericFeatureBenefits('email and messaging'),
  }),
  'skills-plugins': buildPage({
    slug: 'skills-plugins',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Skills & plugins',
    titleAccent: 'without retraining',
    description: 'Extend agents with 3,000+ OpenClaw skills or build custom integrations for internal tools.',
    overviewTitle: 'Runtime skill injection',
    overviewParagraphs: [
      'Skills add capabilities at runtime — GitHub, Notion, AWS, Shopify, databases, and more.',
      'Browse ClawHub for community skills or author private skills for your stack.',
      'Agents pick the right skill for each step of a workflow automatically.',
    ],
    benefits: genericFeatureBenefits('skill execution'),
  }),
  'multi-agent-collaboration': buildPage({
    slug: 'multi-agent-collaboration',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Multi-agent teams',
    titleAccent: 'in parallel',
    description: 'Specialized agents collaborate on complex projects with shared context and delegation.',
    overviewTitle: 'Orchestration built in',
    overviewParagraphs: [
      'Research, code, review, and docs agents work the same ticket pipeline with clear handoffs.',
      'Managers delegate subtasks, track progress on the board, and flag blockers to you.',
      'No manual copy-paste between chat tabs — one org, one memory, one goal tree.',
    ],
    benefits: genericFeatureBenefits('multi-agent coordination'),
  }),
  'openclaw-powered': buildPage({
    slug: 'openclaw-powered',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'OpenClaw runtime',
    titleAccent: 'you control',
    description: 'Trooper deploys OpenClaw on a private server per org — full runtime with a polished command UI.',
    overviewTitle: 'Private server per organization',
    overviewParagraphs: [
      'OpenClaw handles orchestration, memory, skills, and tool execution under the hood.',
      'Trooper adds org charts, ticketing, governance, and a UI your team actually uses.',
      'Data stays siloed per company with audit trails on every agent action.',
    ],
    benefits: genericFeatureBenefits('OpenClaw operations'),
  }),
  'chat-interfaces': buildPage({
    slug: 'chat-interfaces',
    kind: 'feature',
    missionLabel: 'Feature brief',
    title: 'Chat anywhere',
    titleAccent: 'where you already work',
    description: 'Talk to your workforce on WhatsApp, Telegram, Discord, Slack, Signal, and more. Per-channel setup guides at trooper.so/channels.',
    overviewTitle: 'Command from any channel',
    overviewParagraphs: [
      'Assign work from the channel you use daily — agents pick it up in Trooper automatically.',
      'Threaded tickets keep chat chaos out of your ops record.',
      'Same agents, same memory, whether you message from mobile or desktop.',
      'Browse setup guides for Slack, WhatsApp, Telegram, Discord, Signal, iMessage, and Email at /channels.',
    ],
    benefits: genericFeatureBenefits('multi-channel command'),
  }),
};

const legacyFeatureSlugs: Record<string, { title: string; description: string }> = {
  'ai-documentation-agent': { title: 'AI Documentation Agent', description: 'Generate and maintain technical documentation from code and conversations.' },
  'ai-help-center': { title: 'AI Help Center', description: 'Self-service help center powered by your knowledge base and AI agents.' },
  'automated-screenshots-for-docs': { title: 'Automated Screenshots', description: 'Capture UI screenshots automatically for docs and changelogs.' },
  'chrome-extension-for-documentation': { title: 'Chrome Extension', description: 'Document workflows directly from the browser with Trooper agents.' },
  'code-to-docs': { title: 'Code to Docs', description: 'Turn repositories and PRs into living documentation.' },
  'generative-ai-customer-service': { title: 'AI Customer Service', description: 'Autonomous support agents with escalation to humans.' },
  'internal-knowledge-base': { title: 'Internal Knowledge Base', description: 'Company wiki and internal docs agents can read and update.' },
  'multilingual-knowledge-base': { title: 'Multilingual Knowledge Base', description: 'Support customers and teams in multiple languages.' },
  'self-service-help-widget': { title: 'Self-Service Widget', description: 'Embeddable help widget backed by your AI workforce.' },
};

const teamContent: Record<string, SubpageContent> = {
  marketing: buildPage({
    slug: 'marketing', kind: 'team', missionLabel: 'Unit brief', title: 'AI Marketing Team', titleAccent: 'that never sleeps',
    description: 'Deploy an AI marketing unit for content, campaigns, SEO, and analytics.',
    overviewTitle: 'Scale marketing without scaling headcount',
    overviewParagraphs: [
      'AI employees draft content, schedule social, run SEO audits, and report on performance 24/7.',
      'Specialized agents handle copy, ads, email, and analytics while sharing brand memory.',
      'You approve launches; agents do the repetitive execution.',
    ],
    benefits: genericTeamBenefits('marketing'),
  }),
  sales: buildPage({
    slug: 'sales', kind: 'team', missionLabel: 'Unit brief', title: 'AI Sales Team', titleAccent: 'that closes loops',
    description: 'Lead research, outreach, CRM updates, and pipeline hygiene.',
    overviewTitle: 'Pipeline ops on autopilot',
    overviewParagraphs: [
      'Agents research prospects, draft outreach, log CRM notes, and follow up on schedule.',
      'Memory keeps tone and offer context consistent across the team.',
      'You command deal approvals and pricing exceptions.',
    ],
    benefits: genericTeamBenefits('sales'),
  }),
  engineering: buildPage({
    slug: 'engineering', kind: 'team', missionLabel: 'Unit brief', title: 'AI Engineering Team', titleAccent: 'that ships',
    description: 'Code, reviews, issues, and DevOps tasks on your repos.',
    overviewTitle: 'Developers that never context-switch',
    overviewParagraphs: [
      'Agents open PRs, fix issues, update docs, and monitor CI from your GitHub.',
      'Checkout prevents two agents from conflicting on the same task.',
      'Senior engineers stay in command on architecture and merges.',
    ],
    benefits: genericTeamBenefits('engineering'),
  }),
  design: buildPage({
    slug: 'design', kind: 'team', missionLabel: 'Unit brief', title: 'AI Design Team', titleAccent: 'on brand',
    description: 'Mockups, assets, brand checks, and creative iteration.',
    overviewTitle: 'Creative ops at scale',
    overviewParagraphs: [
      'Agents produce variations, resize assets, and document design decisions.',
      'Brand guidelines live in memory so output stays consistent.',
      'Design leads approve before anything goes live.',
    ],
    benefits: genericTeamBenefits('design'),
  }),
  'customer-support': buildPage({
    slug: 'customer-support', kind: 'team', missionLabel: 'Unit brief', title: 'AI Support Team', titleAccent: '24/7',
    description: 'Ticket triage, replies, and escalation with full tracing.',
    overviewTitle: 'Support without the queue',
    overviewParagraphs: [
      'Agents classify tickets, draft replies from your knowledge base, and escalate edge cases.',
      'Every customer thread ties back to a ticket with full audit trail.',
      'Humans handle sensitive cases; agents handle volume.',
    ],
    benefits: genericTeamBenefits('support'),
  }),
  operations: buildPage({
    slug: 'operations', kind: 'team', missionLabel: 'Unit brief', title: 'AI Operations Team', titleAccent: 'always on',
    description: 'Process automation, monitoring, and internal tooling.',
    overviewTitle: 'Ops without busywork',
    overviewParagraphs: [
      'Agents run checklists, update spreadsheets, sync tools, and surface anomalies.',
      'Cron and event-driven routines keep background work moving.',
      'Ops leads set policies; agents enforce them.',
    ],
    benefits: genericTeamBenefits('operations'),
  }),
  finance: buildPage({
    slug: 'finance', kind: 'team', missionLabel: 'Unit brief', title: 'AI Finance Team', titleAccent: 'with accuracy',
    description: 'Reporting, reconciliations, and forecast drafts.',
    overviewTitle: 'Numbers without manual drudgery',
    overviewParagraphs: [
      'Agents pull data, build reports, flag discrepancies, and draft summaries.',
      'Sensitive actions require your approval before execution.',
      'Audit trails satisfy compliance questions.',
    ],
    benefits: genericTeamBenefits('finance'),
  }),
  legal: buildPage({
    slug: 'legal', kind: 'team', missionLabel: 'Unit brief', title: 'AI Legal Team', titleAccent: 'with care',
    description: 'Contract review, compliance checks, and document prep.',
    overviewTitle: 'Legal prep, not legal advice',
    overviewParagraphs: [
      'Agents extract clauses, compare versions, and prep review packets.',
      'Nothing sends externally without human sign-off.',
      'Memory tracks playbooks and jurisdiction notes.',
    ],
    benefits: genericTeamBenefits('legal'),
  }),
  'business-development': buildPage({
    slug: 'business-development', kind: 'team', missionLabel: 'Unit brief', title: 'AI BD Team', titleAccent: 'that scouts',
    description: 'Partnership research, outreach, and pipeline tracking.',
    overviewTitle: 'BD research at scale',
    overviewParagraphs: [
      'Agents map markets, draft partnership briefs, and track conversations.',
      'CRM and email skills keep the pipeline current.',
      'Leaders approve terms and final outreach.',
    ],
    benefits: genericTeamBenefits('business development'),
  }),
  research: buildPage({
    slug: 'research', kind: 'team', missionLabel: 'Unit brief', title: 'AI Research Team', titleAccent: 'continuously',
    description: 'Market research, competitive intel, and synthesis.',
    overviewTitle: 'Intel that compounds',
    overviewParagraphs: [
      'Agents gather sources, summarize findings, and update living briefs.',
      'Research ties to project goals so output stays relevant.',
      'Analysts validate conclusions before distribution.',
    ],
    benefits: genericTeamBenefits('research'),
  }),
  security: buildPage({
    slug: 'security', kind: 'team', missionLabel: 'Unit brief', title: 'AI Security Team', titleAccent: 'around the clock',
    description: 'Audits, monitoring, and security checklist execution.',
    overviewTitle: 'Security ops assistance',
    overviewParagraphs: [
      'Agents run configured checks, summarize logs, and track remediation tickets.',
      'No autonomous changes to production without approval.',
      'Security leads define playbooks agents follow.',
    ],
    benefits: genericTeamBenefits('security'),
  }),
  pr: buildPage({
    slug: 'pr', kind: 'team', missionLabel: 'Unit brief', title: 'AI PR Team', titleAccent: 'on message',
    description: 'Press drafts, media lists, and announcement prep.',
    overviewTitle: 'Comms prep faster',
    overviewParagraphs: [
      'Agents draft releases, track coverage, and maintain media contact sheets.',
      'Brand voice stays in organizational memory.',
      'Comms leads approve all external messaging.',
    ],
    benefits: genericTeamBenefits('PR'),
  }),
  growth: buildPage({
    slug: 'growth', kind: 'team', missionLabel: 'Unit brief', title: 'AI Growth Team', titleAccent: 'with data',
    description: 'Experiments, funnel analysis, and retention plays.',
    overviewTitle: 'Growth loops automated',
    overviewParagraphs: [
      'Agents propose experiments, instrument metrics, and report weekly.',
      'Work connects to company goals for prioritization.',
      'Growth leads approve experiments and spend.',
    ],
    benefits: genericTeamBenefits('growth'),
  }),
};

for (const item of featureNavItems) {
  const slug = item.href.replace('/features/', '');
  if (slug.includes('/')) continue;
  if (!featureContent[slug]) {
    featureContent[slug] = buildPage({
      slug,
      kind: 'feature',
      missionLabel: 'Feature brief',
      title: item.title,
      titleAccent: 'with Trooper',
      description: item.description ?? `Learn how Trooper handles ${item.title.toLowerCase()}.`,
      overviewTitle: `How ${item.title} works`,
      overviewParagraphs: [
        item.description ?? '',
        'Trooper agents execute real work through tickets, tools, and traced decisions.',
        'Deploy on your private OpenClaw runtime and connect the skills your team already uses.',
      ].filter(Boolean),
      benefits: genericFeatureBenefits(item.title.toLowerCase()),
    });
  }
}

for (const item of teamNavItems) {
  const slug = item.href.replace('/teams/', '');
  if (!teamContent[slug]) {
    teamContent[slug] = buildPage({
      slug,
      kind: 'team',
      missionLabel: 'Unit brief',
      title: `AI ${item.title} Team`,
      titleAccent: 'with Trooper',
      description: item.description ?? `AI ${item.title} unit for your company.`,
      overviewTitle: `Why an AI ${item.title} unit`,
      overviewParagraphs: [
        item.description ?? '',
        'Specialized agents share memory and report through the same ticket system.',
        'You stay in command on approvals, budget, and external actions.',
      ].filter(Boolean),
      benefits: genericTeamBenefits(item.title.toLowerCase()),
    });
  }
}

for (const [slug, meta] of Object.entries(legacyFeatureSlugs)) {
  if (!featureContent[slug]) {
    featureContent[slug] = buildPage({
      slug,
      kind: 'feature',
      missionLabel: 'Feature brief',
      title: meta.title,
      titleAccent: 'with Trooper',
      description: meta.description,
      overviewTitle: `About ${meta.title}`,
      overviewParagraphs: [
        meta.description,
        'Trooper agents integrate this capability into your org structure and ticket workflow.',
        'Connect OpenClaw skills and deploy in minutes.',
      ],
      benefits: genericFeatureBenefits(meta.title.toLowerCase()),
    });
  }
}

export const featurePages = featureContent;
export const teamPages = teamContent;

export function getFeaturePage(slug: string): SubpageContent | undefined {
  return featurePages[slug];
}

export function getTeamPage(slug: string): SubpageContent | undefined {
  return teamPages[slug];
}

export function allFeatureSlugs(): string[] {
  return Object.keys(featurePages);
}

export function allTeamSlugs(): string[] {
  return Object.keys(teamPages);
}

export const subpageSocialImage = SOCIAL_IMAGE;
