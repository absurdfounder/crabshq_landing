import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';

const SOCIAL_IMAGE = 'https://dazzling-cat.netlify.app/trooper_social.png';

export type TeamUseCase = {
  title: string;
  description: string;
};

export type TeamExtraSection = {
  eyebrow: string;
  eyebrowNumber: string;
  title: string;
  intro?: string;
  useCases: TeamUseCase[];
};

export type TeamPageContent = {
  slug: string;
  missionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  extraSection?: TeamExtraSection;
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
};

type BuildArgs = {
  slug: string;
  missionLabel?: string;
  title: string;
  titleAccent?: string;
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  extraSection?: TeamExtraSection;
  demoId: DemoScenarioId;
  featureSections?: MarketingFeatureSection[];
};

function buildTeamPage(args: BuildArgs): TeamPageContent {
  return {
    ...args,
    missionLabel: args.missionLabel ?? 'Unit brief',
    meta: {
      title: `${args.title} | Trooper`,
      description: args.description,
      canonical: `https://trooper.so/teams/${args.slug}`,
    },
  };
}

const teamPages: Record<string, TeamPageContent> = {
  coding: buildTeamPage({
    slug: 'coding',
    demoId: 'coding',
    featureSections: [
      {
        eyebrow: 'Harness',
        eyebrowNumber: '03',
        tag: 'MULTI-AGENT HARNESS',
        title: 'Your subscriptions.',
        titleHighlight: 'Our harness.',
        intro: 'Run Claude Code, Codex, and OpenCode side-by-side — each on its own task with live diffs, provider logos, and activity logs.',
        bullets: ['Parallel patch missions with traced tool calls', 'BYOA — Trooper routes work and enforces permissions'],
        visual: 'coding-harness',
      },
      {
        eyebrow: 'Board',
        eyebrowNumber: '04',
        tag: 'ARTIFACT PIPELINE',
        title: 'Diffs, pages, images,',
        titleHighlight: 'and video on one ticket.',
        intro: 'The artifact panel renders live HTML previews, generated images, screen recordings, and markdown reports — not plain text dumps.',
        visual: 'coding-board',
      },
    ],
    title: 'Trooper for Coding',
    titleAccent: 'your keys, our harness',
    description:
      'Delegate to Claude Code, Codex, Cursor, and your own agents from one Trooper harness. Your subscriptions, your repos, one unified task board with traced diffs and PR workflows.',
    overviewTitle: 'Multi-agent coding ops',
    overviewParagraphs: [
      'Trooper does not resell model access. You bring Claude, OpenAI, or any provider subscription — we bring the harness: routing, permissions, logs, and shared memory across every agent on your roster.',
      'Claude Code hardens a parser, Codex dedupes ETL rows, and your in-house agent drafts release notes — all in parallel, all on one board.',
      'Every edit, test run, commit, and PR open is traced in the ticket thread. Senior engineers approve merges; agents handle the grind.',
    ],
    benefits: [
      {
        title: 'Multi-agent harness',
        description: 'Run Claude Code, Codex, and custom agents side-by-side — each on its own task with live diffs and activity logs.',
      },
      {
        title: 'Unified task board',
        description: 'In progress, backlog, and done — one board for every coding agent. Pick the right soldier for the job, not the right browser tab.',
      },
      {
        title: 'BYOA subscriptions',
        description: 'Your API keys and IDE subscriptions stay yours. Trooper routes work, enforces permissions, and keeps shared org memory.',
      },
    ],
    extraSection: {
      eyebrow: 'Field ops',
      eyebrowNumber: '05',
      title: 'How Trooper runs your code unit',
      intro: 'From invoice parsers to release notes — agents execute full workflows, not single prompts.',
      useCases: [
        {
          title: 'Parallel patch missions',
          description: 'Three agents, three files, three test suites — all tracked with timestamps, tool calls, and pass/fail status.',
        },
        {
          title: 'PR workflow with review gates',
          description: 'Agents open PRs and post drafts for review. You authorize merges; nothing ships without command approval.',
        },
        {
          title: 'Shared codebase memory',
          description: 'Branch strategy, lint rules, and reviewer preferences persist across agents and sessions.',
        },
        {
          title: 'GitHub-native execution',
          description: 'Real commits, real branches, real CI — connected through OpenClaw skills and your private runtime.',
        },
      ],
    },
  }),

  marketing: buildTeamPage({
    slug: 'marketing',
    demoId: 'marketing',
    featureSections: [
      {
        eyebrow: 'Pipeline',
        eyebrowNumber: '03',
        tag: 'CAMPAIGN OPS',
        title: 'Landing pages, carousels,',
        titleHighlight: 'and video cuts traced.',
        intro: 'Agents ship HTML previews, generated social assets, and screen recordings — all attached to the same campaign ticket.',
        visual: 'campaign-pipeline',
      },
    ],
    title: 'Trooper for Marketing',
    titleAccent: 'campaigns on mission',
    description:
      'Deploy a marketing unit that drafts content, runs SEO recon, schedules social, and reports performance — 24/7, on-brand, under your command.',
    overviewTitle: 'Scale output without scaling headcount',
    overviewParagraphs: [
      'Your marketing unit shares brand memory — voice, ICP, offer positioning, and past campaign learnings stay loaded across every agent.',
      'Copy agents draft, SEO agents audit, social agents schedule, and analytics agents compile weekly intel briefs.',
      'You approve launches and spend. Agents handle the repetitive execution that burns creative teams out.',
    ],
    benefits: [
      {
        title: 'Brand-locked memory',
        description: 'Guidelines, tone, and competitor notes persist — every draft stays on-message.',
      },
      {
        title: 'Multi-channel campaigns',
        description: 'Blog, social, email, and landing pages coordinated as ticketed missions with clear ownership.',
      },
      {
        title: 'Intel that compounds',
        description: 'Weekly performance reports feed back into org memory for the next campaign cycle.',
      },
    ],
    extraSection: {
      eyebrow: 'Campaign ops',
      eyebrowNumber: '04',
      title: 'Marketing missions Trooper runs',
      useCases: [
        {
          title: 'Content pipeline',
          description: 'Research → outline → draft → edit → schedule — each step a traced subtask with agent handoffs.',
        },
        {
          title: 'SEO recon patrols',
          description: 'Agents crawl competitors, flag keyword gaps, and propose content briefs for your review.',
        },
        {
          title: 'Launch coordination',
          description: 'Cross-functional tickets tie copy, creative, and distribution into one mission timeline.',
        },
        {
          title: 'Performance debriefs',
          description: 'Automated weekly summaries with metrics, anomalies, and recommended next moves.',
        },
      ],
    },
  }),

  sales: buildTeamPage({
    slug: 'sales',
    demoId: 'sales',
    featureSections: [
      {
        eyebrow: 'Pipeline',
        eyebrowNumber: '03',
        title: 'Pipeline ops on autopilot',
        intro: 'Inbound leads become qualified opportunities with research, outreach drafts, and CRM updates — all ticket-traced.',
        visual: 'sales-pipeline',
      },
    ],
    title: 'Trooper for Sales',
    titleAccent: 'pipeline never stalls',
    description:
      'AI sales operators that research prospects, draft outreach, update CRM, and follow up on schedule — so reps close deals, not chase data entry.',
    overviewTitle: 'Pipeline ops on autopilot',
    overviewParagraphs: [
      'Sales agents research accounts, personalize outreach, and log every touch to your CRM — with full traceability for managers.',
      'Follow-up sequences run on cron while reps focus on calls and negotiations.',
      'Deal approvals, discount exceptions, and contract sends still require your explicit command.',
    ],
    benefits: [
      {
        title: 'Prospect recon',
        description: 'Agents gather firmographics, tech stack signals, and trigger events before your rep picks up the phone.',
      },
      {
        title: 'CRM hygiene',
        description: 'Notes, stage updates, and next-step tasks logged automatically after every interaction.',
      },
      {
        title: 'Follow-up discipline',
        description: 'No lead goes cold — scheduled nudges and recap emails run while your team sleeps.',
      },
    ],
    extraSection: {
      eyebrow: 'Revenue ops',
      eyebrowNumber: '04',
      title: 'Sales workflows on the board',
      useCases: [
        {
          title: 'Outbound prep',
          description: 'Account research, contact finding, and personalized first-touch drafts ready for rep review.',
        },
        {
          title: 'Meeting debriefs',
          description: 'Post-call summaries, CRM updates, and internal Slack briefs generated from notes or transcripts.',
        },
        {
          title: 'Pipeline patrol',
          description: 'Agents flag stale deals, missing next steps, and forecast risks before the weekly standup.',
        },
        {
          title: 'Proposal assembly',
          description: 'Pull pricing, case studies, and custom slides into draft proposals — you send when ready.',
        },
      ],
    },
  }),

  lawyers: buildTeamPage({
    slug: 'lawyers',
    demoId: 'legal',
    featureSections: [
      {
        eyebrow: 'Governance',
        eyebrowNumber: '03',
        title: 'Human review on every external action',
        intro: 'Agents prep redlines and summaries — counsel approves before anything leaves the firm.',
        visual: 'legal-review',
      },
    ],
    title: 'Trooper for Legal Teams',
    titleAccent: 'prep, not practice of law',
    description:
      'AI legal operators for contract review, compliance checks, and document prep — accelerating paralegal work while counsel stays in command on every external action.',
    overviewTitle: 'Legal prep at mission speed',
    overviewParagraphs: [
      'Trooper agents extract clauses, compare redlines, and assemble review packets — never sending externally without human sign-off.',
      'Playbooks and jurisdiction notes live in org memory so first-pass review stays consistent across matters.',
      'Every document touch is traced for audit questions and matter handoffs.',
    ],
    benefits: [
      {
        title: 'Contract recon',
        description: 'Agents flag non-standard clauses, missing definitions, and renewal traps against your playbook.',
      },
      {
        title: 'Version comparison',
        description: 'Side-by-side redline summaries with cited sections — counsel reviews deltas, not raw PDFs.',
      },
      {
        title: 'Human command on output',
        description: 'Nothing leaves the firm without attorney approval. Agents prep; partners decide.',
      },
    ],
    extraSection: {
      eyebrow: 'Matter ops',
      eyebrowNumber: '04',
      title: 'How legal teams deploy Trooper',
      useCases: [
        {
          title: 'NDA first pass',
          description: 'Standard terms checked against firm playbook; exceptions surfaced with line references.',
        },
        {
          title: 'Due diligence packets',
          description: 'Agents compile corporate docs, cap tables, and IP assignments into review-ready binders.',
        },
        {
          title: 'Compliance patrols',
          description: 'Scheduled checks against policy docs with anomaly reports for general counsel.',
        },
        {
          title: 'Matter handoff briefs',
          description: 'New associate onboarding summaries with key dates, parties, and open items.',
        },
      ],
    },
  }),

  engineering: buildTeamPage({
    slug: 'engineering',
    demoId: 'engineering',
    featureSections: [
      {
        eyebrow: 'Incidents',
        eyebrowNumber: '03',
        title: 'Incident response with full trace',
        intro: 'Triage, rollback, and postmortem — every step logged on the ticket thread.',
        visual: 'engineering-incident',
      },
    ],
    title: 'Trooper for Engineering',
    titleAccent: 'that ships',
    description: 'AI engineers for code, reviews, issues, and DevOps — scoped to your repos with checkout discipline and merge gates.',
    overviewTitle: 'Developers that never context-switch',
    overviewParagraphs: [
      'Agents open PRs, fix issues, update docs, and monitor CI from your GitHub — all ticket-traced.',
      'Atomic checkout prevents two agents from conflicting on the same task.',
      'Staff engineers stay in command on architecture, security, and merges.',
    ],
    benefits: [
      { title: 'Repo-scoped agents', description: 'Each agent knows branch strategy, test commands, and review standards for its assignment.' },
      { title: 'CI patrol', description: 'Failed builds triaged, flaky tests flagged, and fix PRs drafted for review.' },
      { title: 'Docs that stay current', description: 'Changelog and README updates tied to the PRs that changed behavior.' },
    ],
    extraSection: {
      eyebrow: 'Dev ops',
      eyebrowNumber: '04',
      title: 'Engineering missions',
      useCases: [
        { title: 'Issue triage', description: 'New GitHub issues classified, labeled, and assigned with repro steps investigated.' },
        { title: 'Dependency patrols', description: 'Outdated packages flagged with upgrade PRs and test results.' },
        { title: 'Incident response', description: 'Runbooks executed, status updates drafted, postmortem timelines started.' },
      ],
    },
  }),

  operations: buildTeamPage({
    slug: 'operations',
    demoId: 'operations',
    featureSections: [
      {
        eyebrow: 'Runbook',
        eyebrowNumber: '03',
        title: 'Weekly ops checklist on autopilot',
        intro: 'Reconciliation, access reviews, backups, and budget reports — routines that run while you command.',
        visual: 'ops-runbook',
      },
    ],
    title: 'Trooper for Operations',
    titleAccent: 'always on',
    description: 'Process automation, monitoring, and internal tooling — ops agents that run checklists and surface anomalies before they become incidents.',
    overviewTitle: 'Ops without busywork',
    overviewParagraphs: [
      'Agents run recurring checklists, sync spreadsheets, update tools, and flag drift from SOPs.',
      'Cron and event-driven routines keep background work moving across time zones.',
      'Ops leads set policies; agents enforce them with full audit trails.',
    ],
    benefits: [
      { title: 'SOP execution', description: 'Repeatable procedures run on schedule with step-by-step logging.' },
      { title: 'Cross-tool sync', description: 'Notion, Sheets, Slack, and internal APIs kept aligned automatically.' },
      { title: 'Anomaly surfacing', description: 'Threshold breaches and missing data flagged before the morning standup.' },
    ],
  }),
};

/** Slugs with rich teamContent — others fall back to subpageContent */
export const richTeamSlugs = new Set(Object.keys(teamPages));

export function getTeamPageContent(slug: string): TeamPageContent | undefined {
  return teamPages[slug];
}

export function allRichTeamSlugs(): string[] {
  return Object.keys(teamPages);
}

export const teamSocialImage = SOCIAL_IMAGE;
