import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@/lib/demoScenarios';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import type { MarketingHeadlineLine } from '@/components/marketing/MarketingHeadline';
import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
import { canvasFeatureSection, codingCanvasFeatureSection, marketingCanvasFeatureSection } from '@/lib/marketingFeatures';
import { getTeamPlaybook } from '@/lib/playbookWorkflowContent';
import { bumpFeatureSectionNumbers, getSubpageSectionOffset } from '@/lib/subpageSections';

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
  heroHeadline?: MarketingHeadlineLine[];
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  extraSection?: TeamExtraSection;
  demoId: DemoScenarioId;
  playbookWorkflow?: PlaybookWorkflowContent;
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
  heroHeadline?: MarketingHeadlineLine[];
  description: string;
  overviewTitle: string;
  overviewParagraphs: string[];
  benefits: SubpageBenefit[];
  extraSection?: TeamExtraSection;
  demoId: DemoScenarioId;
  playbookWorkflow?: PlaybookWorkflowContent;
  featureSections?: MarketingFeatureSection[];
};

function buildTeamPage(args: BuildArgs): TeamPageContent {
  const playbookWorkflow = args.playbookWorkflow ?? getTeamPlaybook(args.slug);
  const sectionOffset = getSubpageSectionOffset({ playbookWorkflow });
  const featureSections = args.featureSections
    ? bumpFeatureSectionNumbers(args.featureSections, sectionOffset)
    : undefined;
  const extraSection =
    args.extraSection && sectionOffset > 0
      ? {
          ...args.extraSection,
          eyebrowNumber: String(parseInt(args.extraSection.eyebrowNumber, 10) + sectionOffset).padStart(2, '0'),
        }
      : args.extraSection;

  return {
    ...args,
    playbookWorkflow,
    featureSections,
    extraSection,
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
        intro: 'Run Claude Code, Codex, and OpenCode side-by-side on one ticket — parser patch, ETL dedupe, and regression tests with live tool traces and diff stats.',
        bullets: [
          'Three harness lanes with provider logos and branch names',
          'exec, apply_patch, and write_file traced per agent',
          'BYOA — your keys, Trooper routes work and enforces permissions',
        ],
        visual: 'coding-harness',
      },
      {
        eyebrow: 'Board',
        eyebrowNumber: '04',
        tag: 'CANVAS + CI',
        title: 'Diffs, CI logs, and',
        titleHighlight: 'PR bundles on Canvas.',
        intro: 'Open the ticket Canvas for parser.ts, etl/dedupe.ts, integration CI output, and PR #418 body — the same artifacts from the live demo, stacked for review.',
        bullets: [
          'Unified diffs with line numbers and +/− counts',
          'Full integration log — 13 tests passed, CI green',
          'PR body with summary, changes, and merge gate',
        ],
        visual: 'coding-board',
      },
      {
        eyebrow: 'Memory',
        eyebrowNumber: '05',
        tag: 'ORG CONTEXT',
        title: 'Branch rules and reviewer prefs',
        titleHighlight: 'persist across agents.',
        intro: 'AGENTS.md, eslint rules, CODEOWNERS, and merge gates load on every coding mission — Codex, Claude Code, and OpenCode share the same org memory.',
        bullets: [
          'Default branch, test commands, and reviewer routing',
          'Lint and import-order conventions enforced in src/',
          'CI required + human approval before merge',
        ],
        visual: 'coding-memory',
      },
      codingCanvasFeatureSection('06'),
    ],
    title: 'Trooper for Coding',
    titleAccent: 'Use Codex & Claude Code together.',
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
      eyebrowNumber: '09',
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
        eyebrow: 'Harness',
        eyebrowNumber: '03',
        tag: 'CAMPAIGN OPS',
        title: 'Landing, carousel, and',
        titleHighlight: 'SEO recon in parallel.',
        intro: 'Ren ships the pillar page and carousel on Claude Code and Codex while Aria runs competitor SEO — live tool traces on one Q2 ticket.',
        bullets: [
          'Three agent lanes with provider logos and artifact paths',
          'write_file, image_gen, and sheets_update traced per agent',
          'Jordan gates publish — nothing schedules without approval',
        ],
        visual: 'marketing-harness',
      },
      {
        eyebrow: 'Board',
        eyebrowNumber: '04',
        tag: 'CANVAS + CREATIVE',
        title: 'Brief, landing, carousel, and',
        titleHighlight: 'nurture copy on Canvas.',
        intro: 'Open the campaign Canvas for q2-campaign-brief.md, northstar.io/q2 preview, LinkedIn carousel, and email-sequence.md — the same pack from the live demo.',
        bullets: [
          'HTML preview, PNG creative, and markdown copy side by side',
          'Email nurture sequence held for brand sign-off',
          'Cross-channel subtasks tied to one mission timeline',
        ],
        visual: 'marketing-board',
      },
      {
        eyebrow: 'Memory',
        eyebrowNumber: '05',
        tag: 'BRAND CONTEXT',
        title: 'Voice, ICP, and competitor intel',
        titleHighlight: 'persist across campaigns.',
        intro: 'brand-voice.md, icp.md, competitor-notes.md, and style-guide.yml load on every marketing mission — Ren, Aria, and Jordan share the same org memory.',
        bullets: [
          'Tone rules, CTA patterns, and words to avoid',
          'ICP personas and proof points for every draft',
          'Prior SEO recon and competitor gaps compound',
        ],
        visual: 'marketing-memory',
      },
      marketingCanvasFeatureSection('06'),
    ],
    title: 'Trooper for Marketing',
    titleAccent: 'Scale campaigns on mission.',
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
      eyebrowNumber: '07',
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
      {
        eyebrow: 'Follow-up',
        eyebrowNumber: '04',
        title: 'Sequences that never go cold',
        intro: 'Scheduled nudges, recap emails, and next-step tasks run on cron while reps focus on calls and negotiations.',
        visual: 'email-routing',
      },
      {
        eyebrow: 'Debrief',
        eyebrowNumber: '05',
        title: 'Post-call summaries to Slack',
        intro: 'Meeting notes become CRM updates and internal briefs — traced on the ticket thread for manager review.',
        visual: 'slack-routing',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Sales',
    titleAccent: 'Pipeline that never stalls.',
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
      eyebrowNumber: '08',
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
      {
        eyebrow: 'Compliance',
        eyebrowNumber: '04',
        title: 'Policy patrols on schedule',
        intro: 'Recurring compliance checks against playbooks with anomaly reports surfaced for general counsel.',
        visual: 'ops-runbook',
      },
      {
        eyebrow: 'Comms',
        eyebrowNumber: '05',
        title: 'External drafts held for counsel',
        intro: 'Client-facing emails and contract sends queued with full matter context — nothing ships without attorney sign-off.',
        visual: 'email-routing',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Legal Teams',
    titleAccent: 'Prep work, not practice of law.',
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
      eyebrowNumber: '07',
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
      {
        eyebrow: 'Harness',
        eyebrowNumber: '04',
        tag: 'GITHUB OPS',
        title: 'PRs, patches, and CI',
        titleHighlight: 'on traced missions.',
        intro: 'Agents open PRs, fix issues, and attach test results — staff engineers approve merges.',
        visual: 'coding-harness',
      },
      {
        eyebrow: 'Diffs',
        eyebrowNumber: '05',
        title: 'Unified diffs and green CI',
        intro: 'Parser patches, dependency upgrades, and doc updates visible together on the ticket Canvas.',
        visual: 'coding-board',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Engineering',
    titleAccent: 'Ship faster with traced missions.',
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
      eyebrowNumber: '07',
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
      {
        eyebrow: 'Alerts',
        eyebrowNumber: '04',
        title: 'Cross-tool sync to Slack',
        intro: 'Threshold breaches, missing data, and SOP drift flagged to the right channel with full tool traces.',
        visual: 'slack-routing',
      },
      {
        eyebrow: 'Reports',
        eyebrowNumber: '05',
        title: 'Scheduled report delivery',
        intro: 'Budget summaries and access review packets compiled and held for ops lead approval before distribute.',
        visual: 'email-routing',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Operations',
    titleAccent: 'Ops routines that run 24/7.',
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

  design: buildTeamPage({
    slug: 'design',
    demoId: 'design',
    featureSections: [
      {
        eyebrow: 'Pipeline',
        eyebrowNumber: '03',
        tag: 'BRAND OPS',
        title: 'Figma frames, exports, and',
        titleHighlight: 'brand checklists traced.',
        intro: 'Agents pull frames, export assets, and compile brand guidelines — all on one ticket with review gates.',
        visual: 'design-pipeline',
      },
      {
        eyebrow: 'Campaign',
        eyebrowNumber: '04',
        title: 'Creative assets for launch',
        intro: 'Social carousels, landing previews, and export bundles attached to the same campaign ticket.',
        visual: 'campaign-pipeline',
      },
      {
        eyebrow: 'Recon',
        eyebrowNumber: '05',
        title: 'Competitor brand patrols',
        intro: 'Agents capture reference pages and SERP snapshots to inform refresh briefs — sources cited on the ticket.',
        visual: 'browser-serp',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Design',
    titleAccent: 'Creative that stays on brand.',
    description: 'Creative design and brand assets at scale — mockups, exports, and brand checks with full traceability.',
    overviewTitle: 'Creative ops without the handoffs',
    overviewParagraphs: [
      'Design agents pull Figma frames, export assets, and run brand checklist reviews on every deliverable.',
      'Brand tokens, typography, and color rules live in org memory so variations stay consistent.',
      'Design leads approve before anything ships — agents handle iteration and export drudgery.',
    ],
    benefits: [
      { title: 'Figma-native workflows', description: 'Frame exports, asset bundles, and spec notes attached to traced tickets.' },
      { title: 'Brand guardrails', description: 'Token diffs and checklist gates catch off-brand output before review.' },
      { title: 'Canvas review', description: 'Mockups, PNG carousels, and guideline diffs visible side by side.' },
    ],
    extraSection: {
      eyebrow: 'Design ops',
      eyebrowNumber: '07',
      title: 'Design missions Trooper runs',
      useCases: [
        { title: 'Brand refresh tickets', description: 'Frame audit → asset export → token diff → checklist sign-off in one mission.' },
        { title: 'Asset resizing', description: 'Agents batch-export social, web, and print sizes from source frames.' },
        { title: 'Creative QA', description: 'Automated brand checklist runs before human design lead review.' },
        { title: 'Handoff packs', description: 'HTML previews, PNG carousels, and spec docs bundled on Canvas.' },
      ],
    },
  }),

  'customer-support': buildTeamPage({
    slug: 'customer-support',
    demoId: 'support',
    featureSections: [
      {
        eyebrow: 'Queue',
        eyebrowNumber: '03',
        tag: 'SUPPORT OPS',
        title: 'Tickets triaged, KB matched,',
        titleHighlight: 'replies held for approval.',
        intro: 'P1 tickets get classified, knowledge-base articles matched, and reply drafts traced — nothing sends without sign-off.',
        visual: 'support-queue',
      },
      {
        eyebrow: 'Escalation',
        eyebrowNumber: '04',
        title: 'Edge cases routed to humans',
        intro: 'Sensitive tickets flagged to internal Slack channels with full thread and tool trace attached.',
        visual: 'slack-routing',
      },
      {
        eyebrow: 'Inbox',
        eyebrowNumber: '05',
        title: 'Customer email to traced ticket',
        intro: 'Inbound support emails parsed into tickets with KB lookup and draft replies held for agent review.',
        visual: 'email-routing',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Customer Support',
    titleAccent: 'Support that never sleeps.',
    description: '24/7 support and customer success — triage, KB lookup, and reply drafts with human approval gates.',
    overviewTitle: 'Support without the queue backlog',
    overviewParagraphs: [
      'Agents classify tickets, search your knowledge base, and draft replies with full context from the customer thread.',
      'Every interaction ties to a traced ticket — escalation paths and audit trails built in.',
      'Humans handle sensitive cases; agents handle volume and first-response speed.',
    ],
    benefits: [
      { title: 'Zendesk-style triage', description: 'Priority, tags, and routing applied automatically from ticket content.' },
      { title: 'KB-aware replies', description: 'Agents match articles and cite fixes before drafting responses.' },
      { title: 'Approval gates', description: 'Reply drafts held for human review on sensitive or high-impact tickets.' },
    ],
    extraSection: {
      eyebrow: 'Support ops',
      eyebrowNumber: '07',
      title: 'Support missions Trooper runs',
      useCases: [
        { title: 'P1 triage', description: 'Classify severity, assign owner, and start KB lookup in seconds.' },
        { title: 'Reply drafting', description: 'Context-aware drafts from thread history and knowledge base articles.' },
        { title: 'Escalation routing', description: 'Edge cases flagged to humans with full thread and tool trace attached.' },
        { title: 'CSAT follow-ups', description: 'Post-resolution surveys and follow-up tasks scheduled automatically.' },
      ],
    },
  }),

  finance: buildTeamPage({
    slug: 'finance',
    demoId: 'finance',
    featureSections: [
      {
        eyebrow: 'Close',
        eyebrowNumber: '03',
        tag: 'FINANCE OPS',
        title: 'Month-end close on autopilot',
        intro: 'QuickBooks pulls, variance reports, and reconciliation diffs — traced through close checklist.',
        visual: 'finance-close',
      },
      {
        eyebrow: 'Recon',
        eyebrowNumber: '04',
        tag: 'RECONCILIATION',
        title: 'Side-by-side diffs',
        titleHighlight: 'before sign-off.',
        intro: 'Vendor statements and ledger rows matched with highlighted exceptions — FP&A reviews deltas, not raw exports.',
        visual: 'coding-board',
      },
      {
        eyebrow: 'Governance',
        eyebrowNumber: '05',
        title: 'Approval gates before post',
        intro: 'Journal entries and board reports held for controller review — nothing posts or distributes without command.',
        visual: 'legal-review',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Finance',
    titleAccent: 'Close books with accuracy.',
    description: 'Financial planning and analysis — month-end close, reconciliations, and variance reports with approval gates.',
    overviewTitle: 'Numbers without manual drudgery',
    overviewParagraphs: [
      'Finance agents pull ledger data, build variance reports, and flag reconciliation discrepancies.',
      'Sensitive actions require your approval before journals post or reports distribute.',
      'Full audit trails satisfy compliance and month-end review questions.',
    ],
    benefits: [
      { title: 'Close checklists', description: 'Recurring month-end routines run on schedule with step logging.' },
      { title: 'Reconciliation diffs', description: 'Discrepancies surfaced with side-by-side diffs before sign-off.' },
      { title: 'QuickBooks integration', description: 'Ledger pulls and report exports wired through Composio skills.' },
    ],
    extraSection: {
      eyebrow: 'Finance ops',
      eyebrowNumber: '07',
      title: 'Finance missions Trooper runs',
      useCases: [
        { title: 'Month-end close', description: 'Pull → reconcile → variance report → approval in one traced mission.' },
        { title: 'Budget variance', description: 'Automated variance reports with anomaly flags for FP&A review.' },
        { title: 'AP reconciliation', description: 'Vendor statement matching with diff highlights for exceptions.' },
        { title: 'Board prep', description: 'Summary decks and metric snapshots compiled from live data pulls.' },
      ],
    },
  }),

  'business-development': buildTeamPage({
    slug: 'business-development',
    demoId: 'bd',
    featureSections: [
      {
        eyebrow: 'Pipeline',
        eyebrowNumber: '03',
        tag: 'PARTNERSHIP OPS',
        title: 'Partner research, briefs, and',
        titleHighlight: 'intro emails traced.',
        intro: 'BD agents research partners, write briefs, and draft mutual intro emails — held for approval before send.',
        visual: 'bd-pipeline',
      },
      {
        eyebrow: 'CRM',
        eyebrowNumber: '04',
        title: 'Pipeline stages stay current',
        intro: 'HubSpot and Airtable updates logged with every research step — stale opportunities flagged automatically.',
        visual: 'sales-pipeline',
      },
      {
        eyebrow: 'Outreach',
        eyebrowNumber: '05',
        title: 'Intro emails held for approval',
        intro: 'Personalized partner outreach queued with full brief context — you send when ready.',
        visual: 'email-routing',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Business Development',
    titleAccent: 'Scout partners on autopilot.',
    description: 'Partnership and growth opportunities — research, outreach briefs, and CRM notes with human command.',
    overviewTitle: 'Partnerships without the research grind',
    overviewParagraphs: [
      'BD agents research target partners, compile briefs, and draft intro emails with personalized hooks.',
      'CRM notes and pipeline stages update automatically as missions progress.',
      'You approve outreach before anything sends externally.',
    ],
    benefits: [
      { title: 'Partner research', description: 'Multi-source intel compiled into structured briefs on traced tickets.' },
      { title: 'Outreach drafts', description: 'Personalized intro emails held for approval with full context attached.' },
      { title: 'CRM sync', description: 'HubSpot and Airtable updates logged with every agent action.' },
    ],
    extraSection: {
      eyebrow: 'BD ops',
      eyebrowNumber: '07',
      title: 'BD missions Trooper runs',
      useCases: [
        { title: 'Partner scouting', description: 'Research → fit score → brief → outreach draft in one pipeline.' },
        { title: 'Mutual intros', description: 'Warm intro emails drafted with context from both sides.' },
        { title: 'Pipeline hygiene', description: 'Stale opportunities flagged and follow-up tasks created automatically.' },
        { title: 'Event lead capture', description: 'Conference contacts researched and routed into CRM with notes.' },
      ],
    },
  }),

  research: buildTeamPage({
    slug: 'research',
    demoId: 'research',
    featureSections: [
      {
        eyebrow: 'Intel',
        eyebrowNumber: '03',
        tag: 'COMPETITIVE OPS',
        title: 'Multi-source research, matrix,',
        titleHighlight: 'and exec briefs traced.',
        intro: 'Agents gather sources, build comparison matrices, and synthesize intel briefs for GTM review.',
        visual: 'research-intel',
      },
      {
        eyebrow: 'Web',
        eyebrowNumber: '04',
        title: 'Browser recon with cited sources',
        intro: 'Agents navigate competitor sites, capture SERP snapshots, and attach structured notes to the ticket.',
        visual: 'browser-serp',
      },
      {
        eyebrow: 'Brief',
        eyebrowNumber: '05',
        title: 'Exec-ready synthesis',
        intro: 'Multi-source intel merged into leadership briefs with clear recommendations — held for strategy lead approval.',
        visual: 'launch-ops',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Research',
    titleAccent: 'Intel that compounds.',
    description: 'Market research and data analysis — competitive intel, synthesis briefs, and structured deliverables.',
    overviewTitle: 'Research without the tab sprawl',
    overviewParagraphs: [
      'Research agents scrape sources, build comparison matrices, and write executive briefs on traced tickets.',
      'Intel compounds in org memory — past briefs inform the next competitive cycle.',
      'Strategy leads approve before briefs distribute to GTM or product.',
    ],
    benefits: [
      { title: 'Multi-source synthesis', description: 'Notion, Airtable, and web research merged into structured briefs.' },
      { title: 'Competitive matrices', description: 'Feature and pricing comparisons updated on schedule.' },
      { title: 'Exec-ready output', description: 'Briefs formatted for leadership review with clear recommendations.' },
    ],
    extraSection: {
      eyebrow: 'Research ops',
      eyebrowNumber: '07',
      title: 'Research missions Trooper runs',
      useCases: [
        { title: 'Competitive intel', description: 'Source notes → matrix → exec brief in one traced mission.' },
        { title: 'Market sizing', description: 'Data pulls and TAM/SAM estimates with cited sources.' },
        { title: 'Win/loss analysis', description: 'Deal postmortems synthesized into actionable patterns.' },
        { title: 'Trend monitoring', description: 'Scheduled patrols flag competitor moves and market shifts.' },
      ],
    },
  }),

  security: buildTeamPage({
    slug: 'security',
    demoId: 'security',
    featureSections: [
      {
        eyebrow: 'Audit',
        eyebrowNumber: '03',
        tag: 'SECOPS',
        title: 'Log review, vuln scans, and',
        titleHighlight: 'patch diffs traced.',
        intro: 'Security agents run audits, surface findings, and deploy patches — with remediation tickets and human review.',
        visual: 'security-audit',
      },
      {
        eyebrow: 'Response',
        eyebrowNumber: '04',
        title: 'Incident traces on the ticket',
        intro: 'Triage, rollback, and verification steps logged with terminal output — critical actions need human approval.',
        visual: 'engineering-incident',
      },
      {
        eyebrow: 'Remediation',
        eyebrowNumber: '05',
        title: 'Follow-up checklists on schedule',
        intro: 'IAM rotation, config hardening, and CVE verification run as traced runbook missions.',
        visual: 'ops-runbook',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Security',
    titleAccent: 'SecOps, audit-ready.',
    description: 'Security audits and threat detection — log review, vulnerability scans, and remediation with full traceability.',
    overviewTitle: 'SecOps without the alert fatigue',
    overviewParagraphs: [
      'Security agents run production audits, review logs, and deploy critical patches with traced diffs.',
      'Findings compile into structured reports with severity tiers and remediation steps.',
      'Critical actions require human approval; routine patrols run on schedule.',
    ],
    benefits: [
      { title: 'Automated audits', description: 'Scheduled production scans with findings attached to tickets.' },
      { title: 'Patch deployment', description: 'CVE fixes deployed with unified diffs and rollout verification.' },
      { title: 'Remediation tracking', description: 'Follow-up tickets for IAM rotation and config hardening.' },
    ],
    extraSection: {
      eyebrow: 'SecOps',
      eyebrowNumber: '07',
      title: 'Security missions Trooper runs',
      useCases: [
        { title: 'Weekly audit runs', description: 'Log review → findings report → patch diff on one mission.' },
        { title: 'CVE response', description: 'Critical patches deployed with verification and postmortem notes.' },
        { title: 'IAM reviews', description: 'Dormant keys and over-privileged roles flagged for rotation.' },
        { title: 'Compliance prep', description: 'Audit evidence packs compiled from traced agent actions.' },
      ],
    },
  }),

  pr: buildTeamPage({
    slug: 'pr',
    demoId: 'pr',
    featureSections: [
      {
        eyebrow: 'Comms',
        eyebrowNumber: '03',
        tag: 'PR OPS',
        title: 'Press releases, media lists, and',
        titleHighlight: 'embargo checklists traced.',
        intro: 'PR agents draft releases, update media contacts, and compile announcement checklists — held for comms lead approval.',
        visual: 'pr-comms',
      },
      {
        eyebrow: 'Assets',
        eyebrowNumber: '04',
        title: 'Launch creative on one ticket',
        intro: 'Press kit assets, social cuts, and landing previews coordinated with marketing on the same mission timeline.',
        visual: 'campaign-pipeline',
      },
      {
        eyebrow: 'Wire',
        eyebrowNumber: '05',
        title: 'Embargo and wire coordination',
        intro: 'Tiered media lists, timing gates, and approval checkpoints traced through launch day.',
        visual: 'launch-ops',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for PR',
    titleAccent: 'Launches without the scramble.',
    description: 'Public relations and media management — press releases, media lists, and announcement coordination.',
    overviewTitle: 'Comms without the last-minute scramble',
    overviewParagraphs: [
      'PR agents draft press releases, maintain media contact lists, and compile embargo checklists on traced tickets.',
      'Embargo and approval gates ensure nothing wires before comms lead sign-off.',
      'Launch coordination ties PR assets to the same mission timeline as product and marketing.',
    ],
    benefits: [
      { title: 'Release drafting', description: 'Press releases with CEO quotes held for approval before wire send.' },
      { title: 'Media list management', description: 'Tiered contact lists updated and synced to outreach tools.' },
      { title: 'Embargo coordination', description: 'Checklists track approval gates through launch day.' },
    ],
    extraSection: {
      eyebrow: 'PR ops',
      eyebrowNumber: '07',
      title: 'PR missions Trooper runs',
      useCases: [
        { title: 'Funding announcements', description: 'Release → media list → embargo checklist in one mission.' },
        { title: 'Product launches', description: 'Press kit assembly with quotes, assets, and timing coordination.' },
        { title: 'Crisis comms prep', description: 'Holding statements drafted and held for executive review.' },
        { title: 'Media monitoring', description: 'Coverage tracking with follow-up pitch tasks for gaps.' },
      ],
    },
  }),

  growth: buildTeamPage({
    slug: 'growth',
    demoId: 'growth',
    featureSections: [
      {
        eyebrow: 'Experiments',
        eyebrowNumber: '03',
        tag: 'GROWTH OPS',
        title: 'Funnel metrics, experiment docs,',
        titleHighlight: 'and rollout checklists traced.',
        intro: 'Growth agents pull funnel metrics, document experiment results, and compile rollout checklists for approval.',
        visual: 'growth-experiments',
      },
      {
        eyebrow: 'SERP',
        eyebrowNumber: '04',
        title: 'Landing page recon',
        intro: 'Agents capture competitor SERP snapshots and page variants to inform A/B hypotheses — sources on the ticket.',
        visual: 'browser-serp',
      },
      {
        eyebrow: 'Rollout',
        eyebrowNumber: '05',
        title: 'Winning variants to production',
        intro: 'Experiment winners get deployment checklists with post-rollout monitoring tasks — growth lead approves 100% rollout.',
        visual: 'campaign-pipeline',
      },
      canvasFeatureSection('06'),
    ],
    title: 'Trooper for Growth',
    titleAccent: 'Experiments that ship.',
    description: 'User acquisition and retention — experiment cycles, funnel analysis, and rollout coordination.',
    overviewTitle: 'Growth without the spreadsheet chaos',
    overviewParagraphs: [
      'Growth agents pull analytics, document A/B results, and compile rollout checklists on traced tickets.',
      'Winning variants get deployment checklists with post-rollout monitoring tasks.',
      'Growth leads approve before 100% rollout or budget shifts.',
    ],
    benefits: [
      { title: 'Experiment tracking', description: 'Hypothesis, metrics, and statistical significance documented per mission.' },
      { title: 'Funnel analysis', description: 'Sheets pulls and conversion breakdowns attached to tickets.' },
      { title: 'Rollout gates', description: 'Checklists ensure engineering deploy and monitoring before full rollout.' },
    ],
    extraSection: {
      eyebrow: 'Growth ops',
      eyebrowNumber: '07',
      title: 'Growth missions Trooper runs',
      useCases: [
        { title: 'Landing experiments', description: 'Metrics pull → experiment doc → rollout checklist in one cycle.' },
        { title: 'Activation loops', description: 'Onboarding funnel analysis with recommended next tests.' },
        { title: 'Retention campaigns', description: 'Cohort analysis and re-engagement task creation.' },
        { title: 'Channel attribution', description: 'Multi-touch reports synthesized for budget allocation review.' },
      ],
    },
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
