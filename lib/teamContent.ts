import type { SubpageBenefit } from '@/lib/subpageContent';
import type { DemoScenarioId } from '@trooper/demo';
import type { MarketingFeatureSection } from '@/lib/marketingFeatures';
import type { MarketingHeadlineLine } from '@/components/marketing/MarketingHeadline';
import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';
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
        ask: 'trooper, run Claude Code and Codex on this ticket',
        reply: 'on it — both agents working in parallel',
        window: 'Coding — Multi-agent',
        title: 'Your coding agents,',
        titleHighlight: 'one shared harness.',
        intro:
          'Bring Claude Code, Codex, and OpenCode onto the same ticket as real CLI sessions. They work in parallel with live tool traces — you keep the keys and the merge decision.',
        visual: 'coding-harness',
      },
      {
        eyebrow: 'Memory',
        eyebrowNumber: '04',
        ask: 'trooper, remember our branch rules and reviewers',
        reply: 'loaded — same standards on every agent',
        window: 'Coding — Memory',
        title: 'Repo rules that',
        titleHighlight: 'stick across agents.',
        intro:
          'Branch strategy, lint rules, and who reviews what load automatically. Every coding agent starts with the same standards — no re-explaining the codebase each time.',
        visual: 'coding-memory',
      },
      {
        eyebrow: 'Review',
        eyebrowNumber: '05',
        ask: 'trooper, show me the diffs and CI before I merge',
        reply: 'opening review — everything in one place',
        window: 'Coding — Review',
        title: 'Diffs, tests, and the PR',
        titleHighlight: 'together before merge.',
        intro:
          'See what changed, whether tests passed, and the PR write-up side by side. Approve merges from one view instead of hopping between GitHub tabs.',
        visual: 'coding-board',
      },
      {
        eyebrow: 'On demand',
        eyebrowNumber: '06',
        ask: 'trooper, open a browser and wake Studio-Mac for this ticket',
        reply: 'browser session live — desktop seat attached',
        window: 'Coding — Runtimes',
        title: 'Browser and desktop,',
        titleHighlight: 'on demand.',
        intro:
          'Agents do not stop at chat. Spin up a live browser to check CI and PRs, or wake an enrolled Mac when the work needs a real machine — same ticket, same harness.',
        visual: 'coding-runtime',
      },
    ],
    title: 'Trooper for Coding',
    titleAccent: 'Use Codex & Claude Code together.',
    description:
      'Delegate to Claude Code, Codex, Cursor, and your own agents from one Trooper harness. Your subscriptions, your repos, one unified task board with traced diffs and PR workflows.',
    overviewTitle: 'Multi-agent coding ops',
    overviewParagraphs: [
      'Trooper does not resell model access. You bring Claude, OpenAI, or any provider subscription — we bring the harness: routing, permissions, logs, and shared memory across every agent on your roster.',
      'Claude Code and Codex open as real CLI sessions on one ticket. When the job needs a live page or a real machine, browser on demand and desktop on demand attach to the same mission.',
      'Every edit, test run, commit, and PR open is traced in the ticket thread. Senior engineers approve merges; agents handle the grind.',
    ],
    benefits: [
      {
        title: 'Multi-agent harness',
        description: 'Run Claude Code, Codex, and custom agents as full CLI sessions on one ticket — live tool traces, not vague status dots.',
      },
      {
        title: 'Browser & desktop on demand',
        description: 'Spin up a live browser for PRs and CI, or wake an enrolled Mac when the work needs a real machine — same ticket.',
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
        eyebrow: 'Campaigns',
        eyebrowNumber: '03',
        ask: 'trooper, ship this campaign end to end',
        reply: 'on it — landing, creative, and SEO together',
        window: 'Marketing — Campaign',
        title: 'Campaign work in parallel,',
        titleHighlight: 'not one task at a time.',
        intro:
          'Landing pages, creative, and SEO research run together on one mission. Agents split the work; you approve before anything publishes.',
        visual: 'marketing-harness',
      },
      {
        eyebrow: 'Memory',
        eyebrowNumber: '04',
        ask: 'trooper, stay on brand for this draft',
        reply: 'loading voice, audience, and style rules',
        window: 'Marketing — Brand memory',
        title: 'Brand memory that',
        titleHighlight: 'follows every campaign.',
        intro:
          'Voice, audience, competitor notes, and style rules load automatically. Every draft starts on-message — no fresh brief for each campaign.',
        visual: 'marketing-memory',
      },
      {
        eyebrow: 'Approve',
        eyebrowNumber: '05',
        ask: 'trooper, hold publish until I approve',
        reply: 'channels ready — waiting on you',
        window: 'Marketing — Approve',
        title: 'Nothing publishes',
        titleHighlight: 'until you say so.',
        intro:
          'Blog, social, email, and video wait at the gate. You approve once — then Trooper schedules what is ready.',
        visual: 'marketing-board',
      },
      {
        eyebrow: 'Review',
        eyebrowNumber: '06',
        ask: 'trooper, show me the full pack for brand review',
        reply: 'landing, brief, carousel, and email — ready',
        window: 'Marketing — Pack review',
        title: 'See the whole pack',
        titleHighlight: 'before you approve.',
        intro:
          'Landing preview, brief, carousel, and nurture copy sit together. Review like a product — not a scavenger hunt across tools.',
        visual: 'marketing-canvas',
      },
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
        ask: 'trooper, qualify this lead and update CRM',
        reply: 'on it — research and outreach draft ready',
        window: 'Sales — Pipeline',
        title: 'Pipeline work that',
        titleHighlight: 'moves without you chasing it.',
        intro:
          'New leads get researched, scored, and logged. Outreach drafts land for review while CRM stays current — so reps sell instead of filing notes.',
        visual: 'sales-pipeline',
      },
      {
        eyebrow: 'Follow-up',
        eyebrowNumber: '04',
        ask: 'trooper, keep this deal warm while I take calls',
        reply: 'nudges and recaps on schedule',
        window: 'Sales — Follow-up',
        title: 'Follow-ups that',
        titleHighlight: 'never go cold.',
        intro:
          'Scheduled nudges and recap emails run in the background. Deals stay warm while your team focuses on live conversations.',
        visual: 'email-routing',
      },
      {
        eyebrow: 'Debrief',
        eyebrowNumber: '05',
        ask: 'trooper, debrief that call to Slack and CRM',
        reply: 'summary and next steps posted',
        window: 'Sales — Debrief',
        title: 'After every call,',
        titleHighlight: 'notes write themselves.',
        intro:
          'Meeting takeaways become CRM updates and team briefs automatically. Managers see what happened without chasing a write-up.',
        visual: 'slack-routing',
      },
            {
        eyebrow: 'Approve',
        eyebrowNumber: '06',
        ask: 'trooper, hold the outreach until I approve',
        reply: 'drafts queued — waiting on you',
        window: 'Sales — Approve',
        title: 'Sensitive sends wait',
        titleHighlight: 'for your say-so.',
        intro:
          'Outreach and proposals stay held until a human approves. Speed on prep — control on what leaves the inbox.',
        visual: 'sales-pipeline',
      },
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
        eyebrow: 'Review',
        eyebrowNumber: '03',
        ask: 'trooper, prep this contract — hold for counsel',
        reply: 'redline ready — waiting on approval',
        window: 'Legal — Review',
        title: 'Agents prep.',
        titleHighlight: 'Counsel decides.',
        intro:
          'First-pass redlines and summaries land for attorney review. Nothing leaves the firm until counsel signs off.',
        visual: 'legal-review',
      },
      {
        eyebrow: 'Compliance',
        eyebrowNumber: '04',
        ask: 'trooper, run the weekly policy check',
        reply: 'following the compliance playbook',
        window: 'Legal — Compliance',
        title: 'Policy checks on a schedule,',
        titleHighlight: 'not when someone remembers.',
        intro:
          'Recurring compliance routines run against your playbooks. Exceptions surface for general counsel instead of hiding in spreadsheets.',
        visual: 'ops-runbook',
      },
      {
        eyebrow: 'Comms',
        eyebrowNumber: '05',
        ask: 'trooper, draft the client update — hold for attorney',
        reply: 'queued with matter context',
        window: 'Legal — Outbound',
        title: 'Client-facing drafts',
        titleHighlight: 'stay gated.',
        intro:
          'Emails and contract sends wait for attorney approval with full matter context attached — so speed never skips judgment.',
        visual: 'email-routing',
      },
      {
        eyebrow: 'Matter pack',
        eyebrowNumber: '06',
        ask: 'trooper, show the matter pack for review',
        reply: 'redlines and notes ready',
        window: 'Legal — Matter pack',
        title: 'Review the matter pack',
        titleHighlight: 'before anything leaves.',
        intro:
          'Summaries, redlines, and drafts sit together for counsel review — prep stays fast, judgment stays human.',
        visual: 'legal-review',
      },
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
        ask: 'trooper, triage the failed deploy',
        reply: 'on it — logs and rollback steps',
        window: 'Engineering — Incident',
        title: 'Incidents with a full trail,',
        titleHighlight: 'not a Slack scramble.',
        intro:
          'Triage, rollback, and follow-up steps stay on one ticket. Everyone sees what ran — and what still needs a human.',
        visual: 'engineering-incident',
      },
      {
        eyebrow: 'Shipping',
        eyebrowNumber: '04',
        ask: 'trooper, open the fix PR and run CI',
        reply: 'branch up — tests attached',
        window: 'Engineering — Ship',
        title: 'PRs and CI on mission,',
        titleHighlight: 'staff still merge.',
        intro:
          'Agents open pull requests, attach test results, and keep the thread current. Staff engineers stay in command on architecture and merges.',
        visual: 'coding-harness',
      },
      {
        eyebrow: 'Review',
        eyebrowNumber: '05',
        ask: 'trooper, show diffs and CI together',
        reply: 'review pack ready',
        window: 'Engineering — Review',
        title: 'See the change set',
        titleHighlight: 'before you approve.',
        intro:
          'Patches, dependency upgrades, and docs appear together so review is about judgment — not reconstructing what changed.',
        visual: 'coding-board',
      },
            {
        eyebrow: 'On demand',
        eyebrowNumber: '06',
        ask: 'trooper, open a browser and wake Studio-Mac for this fix',
        reply: 'browser live — desktop seat attached',
        window: 'Engineering — Runtimes',
        title: 'Browser and desktop,',
        titleHighlight: 'on the same mission.',
        intro:
          'When CI and local repro need a live page or a real machine, attach browser on demand and desktop on demand to the ticket — same trail as the patch.',
        visual: 'coding-runtime',
      },
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
        eyebrow: 'Routines',
        eyebrowNumber: '03',
        ask: 'trooper, run the weekly ops checklist',
        reply: 'following the playbook — logging each step',
        window: 'Ops — Routines',
        title: 'Ops checklists that',
        titleHighlight: 'run without reminders.',
        intro:
          'Access reviews, backups, and budget routines execute on schedule. You command exceptions — not the busywork.',
        visual: 'ops-runbook',
      },
      {
        eyebrow: 'Alerts',
        eyebrowNumber: '04',
        ask: 'trooper, flag problems to the ops channel',
        reply: 'alert posted with what failed',
        window: 'Ops — Alerts',
        title: 'Problems surface in Slack,',
        titleHighlight: 'with context attached.',
        intro:
          'Threshold breaches and missing data hit the right channel with enough detail to act — not a vague “something broke.”',
        visual: 'slack-routing',
      },
      {
        eyebrow: 'Reports',
        eyebrowNumber: '05',
        ask: 'trooper, compile the weekly ops report for approval',
        reply: 'packet ready — held for sign-off',
        window: 'Ops — Reports',
        title: 'Reports compiled for you,',
        titleHighlight: 'sent when you say so.',
        intro:
          'Summaries and review packets assemble automatically, then wait for ops lead approval before they go out.',
        visual: 'email-routing',
      },
            {
        eyebrow: 'Closeout',
        eyebrowNumber: '06',
        ask: 'trooper, show what finished this week',
        reply: 'checklist and reports ready',
        window: 'Ops — Closeout',
        title: 'Weekly closeout',
        titleHighlight: 'you can actually scan.',
        intro:
          'Completed routines and held reports land in one place so ops leads review outcomes — not a pile of tabs.',
        visual: 'ops-runbook',
      },
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
        eyebrow: 'Assets',
        eyebrowNumber: '03',
        ask: 'trooper, export the Figma frames for review',
        reply: 'on it — assets packing up',
        window: 'Design — Assets',
        title: 'Exports and brand checks',
        titleHighlight: 'without the handoff chaos.',
        intro:
          'Pull frames, export sizes, and run brand checklists on one mission. Design leads approve — agents handle the grind.',
        visual: 'design-pipeline',
      },
      {
        eyebrow: 'Launch',
        eyebrowNumber: '04',
        ask: 'trooper, attach launch creatives to this campaign',
        reply: 'carousel and landing preview ready',
        window: 'Design — Launch',
        title: 'Launch creative stays',
        titleHighlight: 'on the same ticket.',
        intro:
          'Social cuts, landing previews, and export packs stay tied to the campaign — so marketing and design review one set of work.',
        visual: 'campaign-pipeline',
      },
      {
        eyebrow: 'Recon',
        eyebrowNumber: '05',
        ask: 'trooper, capture competitor brand references',
        reply: 'pages and screenshots cited',
        window: 'Design — Recon',
        title: 'Competitive references,',
        titleHighlight: 'gathered for you.',
        intro:
          'Agents capture reference pages and search results so refresh briefs start with real examples — not a blank moodboard.',
        visual: 'browser-serp',
      },
            {
        eyebrow: 'Handoff',
        eyebrowNumber: '06',
        ask: 'trooper, package the assets for handoff',
        reply: 'exports and checklist ready',
        window: 'Design — Handoff',
        title: 'Handoff packs',
        titleHighlight: 'ready for review.',
        intro:
          'Exports, previews, and brand checks sit together so design and marketing review one set of work.',
        visual: 'design-pipeline',
      },
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
        ask: 'trooper, triage the support queue',
        reply: 'sorting tickets — drafts ready for review',
        window: 'Support — Queue',
        title: 'Triage and draft replies,',
        titleHighlight: 'humans still send.',
        intro:
          'Tickets get classified, matched to help articles, and answered in draft form. Sensitive or high-impact replies wait for a person.',
        visual: 'support-queue',
      },
      {
        eyebrow: 'Escalation',
        eyebrowNumber: '04',
        ask: 'trooper, escalate this one to a human',
        reply: 'flagged to the team with full context',
        window: 'Support — Escalation',
        title: 'Edge cases reach people',
        titleHighlight: 'with context intact.',
        intro:
          'Hard tickets route to the right channel with the full thread attached — so humans aren’t starting from a blank page.',
        visual: 'slack-routing',
      },
      {
        eyebrow: 'Inbox',
        eyebrowNumber: '05',
        ask: 'trooper, turn this support email into a ticket',
        reply: 'parsed — lookup and draft held',
        window: 'Support — Inbox',
        title: 'Email becomes a ticket,',
        titleHighlight: 'not a lost thread.',
        intro:
          'Inbound support mail becomes structured work with knowledge-base lookup and a draft reply waiting for review.',
        visual: 'email-routing',
      },
      {
        eyebrow: 'Quality',
        eyebrowNumber: '06',
        ask: 'trooper, show drafts waiting on approval',
        reply: 'queue of held replies ready',
        window: 'Support — Quality',
        title: 'Drafts wait',
        titleHighlight: 'until a human sends.',
        intro:
          'High-impact replies stay in review with full ticket context — volume stays automated, tone stays human.',
        visual: 'support-queue',
      },
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
        ask: 'trooper, run month-end close',
        reply: 'on it — reconciliations queued',
        window: 'Finance — Close',
        title: 'Month-end close',
        titleHighlight: 'without the spreadsheet scramble.',
        intro:
          'Ledger pulls, variance checks, and reconciliation steps run through a close checklist so FP&A reviews outcomes — not copy-paste chores.',
        visual: 'finance-close',
      },
      {
        eyebrow: 'Recon',
        eyebrowNumber: '04',
        ask: 'trooper, show vendor vs ledger differences',
        reply: 'exceptions highlighted for review',
        window: 'Finance — Recon',
        title: 'See the mismatches',
        titleHighlight: 'before you sign off.',
        intro:
          'Vendor statements and ledger rows line up with exceptions called out. Review the diffs — not raw export dumps.',
        visual: 'finance-close',
      },
      {
        eyebrow: 'Approval',
        eyebrowNumber: '05',
        ask: 'trooper, hold journals until the controller approves',
        reply: 'queued — nothing posts yet',
        window: 'Finance — Approval',
        title: 'Nothing posts',
        titleHighlight: 'until you say so.',
        intro:
          'Journal entries and board reports wait for controller review. Speed on prep — control on what leaves the books.',
        visual: 'finance-close',
      },
            {
        eyebrow: 'Sign-off',
        eyebrowNumber: '06',
        ask: 'trooper, show the close pack for controller review',
        reply: 'reconciliations and reports ready',
        window: 'Finance — Sign-off',
        title: 'Close pack',
        titleHighlight: 'ready for sign-off.',
        intro:
          'Reconciliations, variance notes, and reports sit together so controllers approve the close — not raw exports.',
        visual: 'finance-close',
      },
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
        eyebrow: 'Partners',
        eyebrowNumber: '03',
        ask: 'trooper, research these partners and draft intros',
        reply: 'briefs and emails ready for review',
        window: 'BD — Partners',
        title: 'Partner research and intros,',
        titleHighlight: 'ready when you are.',
        intro:
          'Agents research targets, write briefs, and draft intro emails. You approve before anything sends.',
        visual: 'bd-pipeline',
      },
      {
        eyebrow: 'CRM',
        eyebrowNumber: '04',
        ask: 'trooper, keep partnership stages current',
        reply: 'pipeline updated — stale deals flagged',
        window: 'BD — CRM',
        title: 'Pipeline stays honest',
        titleHighlight: 'without manual updates.',
        intro:
          'Stages and notes update as research progresses. Stale opportunities get flagged before the weekly review.',
        visual: 'sales-pipeline',
      },
      {
        eyebrow: 'Outreach',
        eyebrowNumber: '05',
        ask: 'trooper, hold partner intros until I approve',
        reply: 'queued with the full brief',
        window: 'BD — Outreach',
        title: 'Outreach waits',
        titleHighlight: 'for your say-so.',
        intro:
          'Personalized partner emails sit with the brief attached until you send — so BD stays fast without going rogue.',
        visual: 'email-routing',
      },
      {
        eyebrow: 'Brief pack',
        eyebrowNumber: '06',
        ask: 'trooper, show partner briefs ready to send',
        reply: 'research and intros queued',
        window: 'BD — Brief pack',
        title: 'Partner packs',
        titleHighlight: 'ready when you are.',
        intro:
          'Research briefs and intro drafts wait together so you send with context — not a half-finished thread.',
        visual: 'bd-pipeline',
      },
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
        ask: 'trooper, pull competitive intel into a brief',
        reply: 'on it — sources and matrix coming',
        window: 'Research — Intel',
        title: 'Competitive intel that',
        titleHighlight: 'ends in a usable brief.',
        intro:
          'Agents gather sources, build comparison tables, and write summaries your GTM team can actually use.',
        visual: 'research-intel',
      },
      {
        eyebrow: 'Web',
        eyebrowNumber: '04',
        ask: 'trooper, capture competitor pages and search results',
        reply: 'browser session live',
        window: 'Research — Web',
        title: 'Web research with',
        titleHighlight: 'sources attached.',
        intro:
          'Real browser sessions capture pages and search results so every claim in the brief has somewhere to click.',
        visual: 'browser-serp',
      },
      {
        eyebrow: 'Brief',
        eyebrowNumber: '05',
        ask: 'trooper, write an exec brief for leadership',
        reply: 'draft held for strategy lead',
        window: 'Research — Brief',
        title: 'Leadership-ready synthesis,',
        titleHighlight: 'not a link dump.',
        intro:
          'Multi-source notes become a clear recommendation brief. Strategy leads approve before it circulates.',
        visual: 'research-intel',
      },
      {
        eyebrow: 'Brief pack',
        eyebrowNumber: '06',
        ask: 'trooper, show the intel brief for leadership',
        reply: 'sources and recommendations ready',
        window: 'Research — Brief pack',
        title: 'Intel ready',
        titleHighlight: 'for leadership review.',
        intro:
          'Sources, matrix, and recommendations sit in one pack so strategy leads approve before it circulates.',
        visual: 'research-intel',
      },
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
        ask: 'trooper, run the security audit',
        reply: 'scanning — findings queued by severity',
        window: 'Security — Audit',
        title: 'Audits that produce',
        titleHighlight: 'actionable findings.',
        intro:
          'Log review and vulnerability checks land as clear findings with severity — not a wall of raw alerts.',
        visual: 'security-audit',
      },
      {
        eyebrow: 'Response',
        eyebrowNumber: '04',
        ask: 'trooper, triage this security incident',
        reply: 'logs and rollback on the ticket',
        window: 'Security — Response',
        title: 'Incident response with',
        titleHighlight: 'a trail you can trust.',
        intro:
          'Triage and rollback steps stay logged. Critical actions still need a human before they run.',
        visual: 'engineering-incident',
      },
      {
        eyebrow: 'Follow-up',
        eyebrowNumber: '05',
        ask: 'trooper, run the remediation checklist',
        reply: 'following hardening steps',
        window: 'Security — Follow-up',
        title: 'Remediation on a schedule,',
        titleHighlight: 'not a hope.',
        intro:
          'Access rotation, config hardening, and verification run as checklists so fixes don’t evaporate after the incident channel goes quiet.',
        visual: 'ops-runbook',
      },
            {
        eyebrow: 'Findings',
        eyebrowNumber: '06',
        ask: 'trooper, show the audit findings for review',
        reply: 'severity-ranked findings ready',
        window: 'Security — Findings',
        title: 'Findings you can act on,',
        titleHighlight: 'not alert noise.',
        intro:
          'Audit results and remediation steps land in one review pack so critical actions get human eyes first.',
        visual: 'security-audit',
      },
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
        ask: 'trooper, draft the launch press release',
        reply: 'on it — held for comms review',
        window: 'PR — Comms',
        title: 'Press drafts and media lists',
        titleHighlight: 'ready for your edit.',
        intro:
          'Releases, contact lists, and announcement checklists assemble on one mission. Comms leads approve before anything wires.',
        visual: 'pr-comms',
      },
      {
        eyebrow: 'Assets',
        eyebrowNumber: '04',
        ask: 'trooper, attach the press kit to the launch',
        reply: 'creative and landing on one ticket',
        window: 'PR — Assets',
        title: 'Press kit and creative',
        titleHighlight: 'on the same timeline.',
        intro:
          'Assets, social cuts, and landing previews stay with the announcement — so PR and marketing aren’t working from different folders.',
        visual: 'campaign-pipeline',
      },
      {
        eyebrow: 'Timing',
        eyebrowNumber: '05',
        ask: 'trooper, coordinate embargo and wire timing',
        reply: 'gates set through launch day',
        window: 'PR — Timing',
        title: 'Embargo and wire timing',
        titleHighlight: 'under control.',
        intro:
          'Media tiers, timing gates, and approvals stay visible through launch day so nothing ships early by accident.',
        visual: 'launch-ops',
      },
            {
        eyebrow: 'Launch pack',
        eyebrowNumber: '06',
        ask: 'trooper, show the launch pack for comms review',
        reply: 'release, list, and assets ready',
        window: 'PR — Launch pack',
        title: 'Launch pack',
        titleHighlight: 'ready for comms review.',
        intro:
          'Release draft, media list, and assets sit together so nothing wires before the comms lead signs off.',
        visual: 'pr-comms',
      },
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
        ask: 'trooper, set up the next growth experiment',
        reply: 'hypothesis and tracking ready',
        window: 'Growth — Experiments',
        title: 'Experiments with clear docs,',
        titleHighlight: 'not spreadsheet chaos.',
        intro:
          'Funnel metrics, experiment write-ups, and rollout checklists live on one mission so the team knows what ran and what won.',
        visual: 'growth-experiments',
      },
      {
        eyebrow: 'Research',
        eyebrowNumber: '04',
        ask: 'trooper, capture competitor landing pages',
        reply: 'pages and search results on the ticket',
        window: 'Growth — Research',
        title: 'Landing research that',
        titleHighlight: 'feeds better tests.',
        intro:
          'Agents capture competitor pages and search results so A/B ideas start from real examples — not guesses.',
        visual: 'browser-serp',
      },
      {
        eyebrow: 'Rollout',
        eyebrowNumber: '05',
        ask: 'trooper, prep the winning variant for full rollout',
        reply: 'checklist ready — awaiting growth lead',
        window: 'Growth — Rollout',
        title: 'Winners ship with a checklist,',
        titleHighlight: 'not a hope and pray.',
        intro:
          'Winning variants get a deployment checklist and monitoring tasks. Growth leads approve before 100% rollout.',
        visual: 'campaign-pipeline',
      },
            {
        eyebrow: 'Rollout pack',
        eyebrowNumber: '06',
        ask: 'trooper, show the experiment pack for rollout',
        reply: 'results and checklist ready',
        window: 'Growth — Rollout pack',
        title: 'Experiment pack',
        titleHighlight: 'ready for rollout.',
        intro:
          'Results, docs, and deployment checklist sit together so growth leads approve 100% rollout with eyes open.',
        visual: 'growth-experiments',
      },
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
