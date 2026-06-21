import type { LoopEntry } from '@/lib/loopCatalog';
import type { LoopRequirements } from '@/lib/loopMermaid';

type CapabilityPlugin = {
  id: string;
  label: string;
  reason: string;
};

type CapabilitySkill = {
  id: string;
  label: string;
  reason: string;
};

const PLUGINS = {
  github: {
    id: 'github',
    label: 'GitHub',
    reason: 'Read branches, PRs, reviews, checks, workflow runs, and source diffs.',
  },
  browser: {
    id: 'anchor_browser',
    label: 'Browser / Web access',
    reason: 'Open pages, inspect live state, collect evidence, and verify changes.',
  },
  calendar: {
    id: 'google-calendar',
    label: 'Google Calendar',
    reason: 'Read upcoming meetings, attendees, and scheduling context.',
  },
  email: {
    id: 'gmail',
    label: 'Gmail',
    reason: 'Read incoming mail and prepare safe draft replies for approval.',
  },
  slack: {
    id: 'slack',
    label: 'Slack',
    reason: 'Post summaries, approvals, blockers, and handoff updates.',
  },
  tickets: {
    id: 'zendesk',
    label: 'Support tickets',
    reason: 'Read customer tickets, feedback, onboarding gaps, and support themes.',
  },
  projectTracker: {
    id: 'linear',
    label: 'Linear / Jira',
    reason: 'Read roadmap, task, bug, owner, and status context.',
  },
  crm: {
    id: 'hubspot',
    label: 'CRM',
    reason: 'Read accounts, deals, owners, stages, and onboarding state.',
  },
  analytics: {
    id: 'google-analytics',
    label: 'Google Analytics',
    reason: 'Read traffic, conversion, product, or campaign performance signals.',
  },
  metaAds: {
    id: 'metaads',
    label: 'Meta Ads',
    reason: 'Read Facebook/Instagram campaign, spend, variant, and creative performance.',
  },
  docs: {
    id: 'notion',
    label: 'Notion',
    reason: 'Read and update approved briefs, docs, calendars, and reports.',
  },
  stripe: {
    id: 'stripe',
    label: 'Stripe',
    reason: 'Verify checkout, billing, payment, and subscription state.',
  },
  figma: {
    id: 'figma',
    label: 'Figma',
    reason: 'Inspect designs, dimensions, assets, and handoff notes.',
  },
} satisfies Record<string, CapabilityPlugin>;

const SKILLS = {
  loopRunner: {
    id: 'loop-runner',
    label: 'Loop runner',
    reason: 'Self-pace iterations, run the check between passes, and stop only on the exit condition.',
  },
  codeChange: {
    id: 'code-change',
    label: 'Code change + local verification',
    reason: 'Edit code safely, run commands, and keep changes scoped.',
  },
  ciDebugging: {
    id: 'ci-debugging',
    label: 'CI debugging',
    reason: 'Read failing checks, logs, and the smallest actionable root cause.',
  },
  review: {
    id: 'review',
    label: 'PR review',
    reason: 'Inspect diffs for correctness, edge cases, tests, naming, and risk.',
  },
  testing: {
    id: 'testing',
    label: 'Test repair',
    reason: 'Run tests, triage failures, and avoid weakening the suite.',
  },
  browserQa: {
    id: 'browser-qa',
    label: 'Browser QA',
    reason: 'Exercise product flows, capture visual evidence, and verify fixes in-browser.',
  },
  research: {
    id: 'research-monitoring',
    label: 'Research monitoring',
    reason: 'Compare sources over time and separate verified changes from noise.',
  },
  approvals: {
    id: 'approval-workflows',
    label: 'Approval workflows',
    reason: 'Keep outbound actions in draft or approval states when risk is non-trivial.',
  },
  operationsBrief: {
    id: 'operations-briefing',
    label: 'Operations briefing',
    reason: 'Summarize sources into concise, owner-aware, non-invented updates.',
  },
  growthOps: {
    id: 'growth-ops',
    label: 'Growth operations',
    reason: 'Evaluate campaign performance, creative tests, CPA, and launch readiness.',
  },
  docsQa: {
    id: 'docs-qa',
    label: 'Documentation QA',
    reason: 'Check docs against current product behavior and keep claims accurate.',
  },
  customerOps: {
    id: 'customer-ops',
    label: 'Customer operations',
    reason: 'Identify at-risk accounts, missing setup steps, and safe next actions.',
  },
  salesOps: {
    id: 'sales-ops',
    label: 'Sales operations',
    reason: 'Audit stale deals, owners, stages, forecast risk, and next steps.',
  },
  contentOps: {
    id: 'content-ops',
    label: 'Content operations',
    reason: 'Turn signals into reviewable briefs while preserving source attribution.',
  },
  securityTriage: {
    id: 'security-triage',
    label: 'Security triage',
    reason: 'Assess alerts, prioritize patches, and avoid unsafe shortcuts.',
  },
  visualDesign: {
    id: 'visual-design-qa',
    label: 'Visual design QA',
    reason: 'Compare implementation against visual expectations and capture regressions.',
  },
} satisfies Record<string, CapabilitySkill>;

export type ResolvedLoopRequirements = LoopRequirements & {
  inferred?: boolean;
};

function requirementKey(loop: LoopEntry) {
  const stepText = (loop.flow?.steps || [])
    .flatMap((step) => [step.label, step.description, ...(step.tools || [])])
    .join(' ');
  return [
    loop.slug,
    loop.title,
    loop.description,
    loop.category,
    loop.checkCommand,
    stepText,
    ...(loop.tags || []),
  ]
    .join(' ')
    .toLowerCase();
}

function uniqueById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function normalizeExplicit(requirements: LoopRequirements): ResolvedLoopRequirements {
  const plugins = (requirements.plugins || []).map((plugin) => ({
    id: plugin.id,
    label: plugin.label || plugin.id,
    reason: plugin.reason || '',
    required: plugin.required !== false,
  }));
  const skills = (requirements.skills || []).map((skill) => ({
    id: skill.id,
    label: skill.label || skill.id,
    reason: skill.reason || '',
    required: skill.required !== false,
  }));
  return {
    plugins: uniqueById(plugins),
    skills: uniqueById([
      { ...SKILLS.loopRunner, required: true },
      ...skills.map((skill) => ({ ...skill, required: skill.required !== false })),
    ]),
    systems: requirements.systems || [],
    inferred: false,
  };
}

function inferRequirements(loop: LoopEntry): ResolvedLoopRequirements {
  const text = requirementKey(loop);
  const category = String(loop.category || '').toLowerCase();
  const codingCategory = ['ci', 'review', 'testing', 'quality', 'security'].includes(category);
  const plugins: CapabilityPlugin[] = [];
  const skills: CapabilitySkill[] = [SKILLS.loopRunner];
  const addPlugin = (...items: CapabilityPlugin[]) => plugins.push(...items.filter(Boolean));
  const addSkill = (...items: CapabilitySkill[]) => skills.push(...items.filter(Boolean));

  if (
    /\bgh\b|github|pull request|\bpr\b|\bci\b|branch|diff|lint|workflow/.test(text)
    || (codingCategory && /test|e2e|smoke|flaky/.test(text))
  ) {
    addPlugin(PLUGINS.github);
    addSkill(SKILLS.codeChange);
  }
  if (/\bci\b|checks|workflow|run list|failure/.test(text)) addSkill(SKILLS.ciDebugging);
  if ((codingCategory || category === 'review') && /review|diff|comments/.test(text)) {
    addSkill(SKILLS.review);
  }
  if (/approval|approve/.test(text)) addSkill(SKILLS.approvals);
  if (category === 'testing' || /npm test|test suite|lint|smoke|e2e|flaky/.test(text)) {
    addSkill(SKILLS.testing);
  }
  if (/browser|website|landing|signup|checkout|screenshot|visual|figma|docs|competitor|research|content/.test(text)) {
    addPlugin(PLUGINS.browser);
  }
  if (/website|landing|seo|analytics|conversion|content/.test(text)) {
    addPlugin(PLUGINS.analytics, PLUGINS.docs);
    addSkill(SKILLS.browserQa, SKILLS.contentOps);
  }
  if (/calendar|meeting|brief|morning/.test(text)) {
    addPlugin(PLUGINS.calendar, PLUGINS.slack, PLUGINS.docs);
    addSkill(SKILLS.operationsBrief);
  }
  if (/email|inbox|mail/.test(text)) {
    addPlugin(PLUGINS.email, PLUGINS.slack);
    addSkill(SKILLS.approvals, SKILLS.operationsBrief);
  }
  if (/ticket|support|feedback|roadmap|customer|onboarding/.test(text)) {
    addPlugin(PLUGINS.tickets, PLUGINS.crm, PLUGINS.projectTracker);
    addSkill(SKILLS.customerOps, SKILLS.approvals);
  }
  if (/pipeline|sales|deal|forecast|crm/.test(text)) {
    addPlugin(PLUGINS.crm, PLUGINS.slack);
    addSkill(SKILLS.salesOps);
  }
  if (/competitor|research|review mining|news|pricing/.test(text)) {
    addPlugin(PLUGINS.browser, PLUGINS.docs);
    addSkill(SKILLS.research);
  }
  if (/meta|facebook|instagram/.test(text)) {
    addPlugin(PLUGINS.metaAds, PLUGINS.analytics, PLUGINS.slack);
    addSkill(SKILLS.growthOps, SKILLS.approvals);
  }
  if (/apple search ads|asa|app store/.test(text)) {
    addPlugin(PLUGINS.analytics, PLUGINS.slack);
    addSkill(SKILLS.growthOps, SKILLS.approvals);
  }
  if (/stripe|checkout|billing|payments/.test(text)) {
    addPlugin(PLUGINS.stripe, PLUGINS.browser);
    addSkill(SKILLS.browserQa, SKILLS.approvals);
  }
  if (/figma|design|screenshot|visual|banner|creative/.test(text)) {
    addPlugin(PLUGINS.figma, PLUGINS.browser);
    addSkill(SKILLS.visualDesign, SKILLS.browserQa);
  }
  if (/docs|documentation|helpdocs|changelog|blog/.test(text)) {
    addPlugin(PLUGINS.docs, PLUGINS.browser);
    addSkill(SKILLS.docsQa, SKILLS.contentOps);
  }
  if (/security|secret|cve|audit/.test(text)) {
    addPlugin(PLUGINS.github);
    addSkill(SKILLS.securityTriage, SKILLS.codeChange);
  }

  return {
    plugins: uniqueById(plugins).map((plugin) => ({ ...plugin, required: true })),
    skills: uniqueById(skills).map((skill) => ({ ...skill, required: skill.id === 'loop-runner' })),
    systems: [],
    inferred: true,
  };
}

export function getLoopCapabilityRequirements(loop: LoopEntry): ResolvedLoopRequirements {
  if (loop.requirements?.plugins?.length || loop.requirements?.skills?.length) {
    return normalizeExplicit(loop.requirements);
  }
  return inferRequirements(loop);
}
