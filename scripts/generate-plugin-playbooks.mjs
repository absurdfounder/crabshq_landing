#!/usr/bin/env node
/**
 * Generate PlaybookWorkflowContent JSON chunks for all plugins in plugins_catalog.json.
 * Merges hand-crafted overrides from lib/playbookWorkflowContent/plugins/overrides.json at load time.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.join(ROOT, 'public/plugins_catalog.json');
const CHUNKS_DIR = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/chunks');
const OVERRIDES_PATH = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/overrides.json');
const MANIFEST_PATH = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/manifest.ts');

const AGENTS = ['Codex', 'Claude Code', 'OpenCode'];
const CHUNK_MIN = 100;
const CHUNK_MAX = 150;

function slugHash(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick(arr, hash, salt = 0) {
  return arr[(hash + salt) % arr.length];
}

function iconDomain(plugin) {
  if (plugin.domain) return plugin.domain;
  const slug = plugin.slug || '';
  if (slug.includes('google')) return 'google.com';
  if (slug.includes('linkedin')) return 'linkedin.com';
  return 'trooper';
}

function standardEdges() {
  return [
    { from: 't1', to: 'a1' },
    { from: 'a1', to: 'a2' },
    { from: 'a1', to: 'i1' },
    { from: 'a2', to: 'g1' },
    { from: 'i1', to: 'g1' },
  ];
}

function makeWorkflow({ id, tabLabel, triggerBadge, nodes, statusBar, icon, agent1, agent2 }) {
  const [tLabel, a1Label, a2Label, iLabel, gLabel] = nodes;
  return {
    id,
    tabLabel,
    triggerBadge,
    nodes: [
      { id: 't1', label: tLabel, x: 12, y: 28, kind: 'trigger', iconDomain: icon },
      { id: 'a1', label: a1Label, x: 38, y: 22, kind: 'agent', agent: agent1 },
      { id: 'a2', label: a2Label, x: 62, y: 38, kind: 'agent', agent: agent2 },
      { id: 'i1', label: iLabel, x: 38, y: 58, kind: 'integration', iconDomain: icon },
      { id: 'g1', label: gLabel, x: 82, y: 52, kind: 'gate', iconDomain: 'trooper' },
    ],
    edges: standardEdges(),
    statusBar,
  };
}

function headlineFor(plugin, hash) {
  const name = plugin.name;
  const variants = [
    [
      { text: `${name} workflows`, tone: 'default' },
      { text: 'your team runs.', tone: 'brand' },
    ],
    [
      { text: 'Automate', tone: 'default' },
      { text: `${name} playbooks.`, tone: 'brand' },
    ],
    [
      { text: `${name} on`, tone: 'default' },
      { text: 'autopilot.', tone: 'brand' },
    ],
    [
      { text: 'Ship faster with', tone: 'default' },
      { text: `${name}.`, tone: 'brand' },
    ],
  ];
  return [{ parts: pick(variants, hash, 11) }];
}

function subheadingFor(plugin, category, hash) {
  const name = plugin.name;
  const desc = (plugin.description || plugin.shortDescription || '').replace(/\s+/g, ' ').trim();
  const snippet = desc.length > 90 ? `${desc.slice(0, 87)}…` : desc;
  const categoryLine = {
    Coding: `PR review, CI fixes, and release trains — traced on the board with ${name} and harness agents.`,
    Engineering: `Deploy gates, incident runbooks, and infra checks — orchestrated through ${name} with Trooper agents.`,
    Design: `Brief intake, mock iteration, and dev handoff — ${name} wired into reusable design playbooks.`,
    'Messaging & channels': `Route inbound threads, draft replies, and escalate — ${name} playbooks with human gates.`,
    Research: `Source sweeps, synthesis memos, and monitors — ${name} keeps research loops on rails.`,
    Productivity: `Sync calendars, automate reports, and close loops — ${name} workflows agents can replay.`,
    Integrations: `Event triggers, bi-directional sync, and notify paths — ${name} connected to Trooper playbooks.`,
    Lifestyle: `Personal routines, reminders, and check-ins — ${name} as a calm automation layer.`,
    OpenClaw: `Node-aware missions, tool calls, and handoffs — ${name} playbooks on connected devices.`,
    APIs: `Webhook intake, schema validation, and fan-out — ${name} API playbooks with guardrails.`,
  };
  const base = categoryLine[category] || categoryLine.Integrations;
  if (hash % 5 === 0 && snippet) return `${base} ${snippet}`;
  return base;
}

const CATEGORY_WORKFLOWS = {
  Coding: [
    {
      id: 'pr-review',
      tabLabel: 'PR review',
      triggerBadge: 'GitHub webhook',
      nodes: (n) => [`${n} PR opened`, 'Review harness', 'Inline comments', `Notify #${n}-prs`, 'Merge gate'],
      status: (n) => ({ label: 'Review turnaround', value: '6h → 45m avg' }),
    },
    {
      id: 'issue-triage',
      tabLabel: 'Issue triage',
      triggerBadge: 'New issue',
      nodes: (n) => ['Issue filed', 'Classify + label', 'Draft fix plan', `Link ${n} repo`, 'Owner gate'],
      status: () => ({ label: 'Triage accuracy', value: '88% correct lane' }),
    },
    {
      id: 'ci-loop',
      tabLabel: 'CI loop',
      triggerBadge: 'Check failed',
      nodes: (n) => ['CI red', 'Parse logs', 'Patch + push', `Re-run ${n} CI`, 'Green gate'],
      status: () => ({ label: 'Auto-fix rate', value: '71% no human edit' }),
    },
  ],
  Engineering: [
    {
      id: 'deploy',
      tabLabel: 'Deploy',
      triggerBadge: 'Merge to main',
      nodes: (n) => ['Deploy queued', 'Preflight checks', 'Rollout canary', `${n} smoke test`, 'Promote gate'],
      status: () => ({ label: 'Failed deploys', value: '↓ 34% month' }),
    },
    {
      id: 'incident',
      tabLabel: 'Incident',
      triggerBadge: 'Pager alert',
      nodes: (n) => ['Sev-1 page', 'Timeline draft', 'Mitigation steps', `${n} status page`, 'Resolve gate'],
      status: () => ({ label: 'MTTR', value: '42 min median' }),
    },
    {
      id: 'infra-drift',
      tabLabel: 'Infra drift',
      triggerBadge: 'Daily scan',
      nodes: (n) => ['Drift detected', 'Diff summary', 'Proposed TF patch', `${n} apply plan`, 'Approve gate'],
      status: () => ({ label: 'Drift cleared', value: '93% same day' }),
    },
  ],
  Design: [
    {
      id: 'brief',
      tabLabel: 'Brief intake',
      triggerBadge: 'Brief submitted',
      nodes: (n) => ['New brief', 'Extract reqs', 'Moodboard pass', `${n} Figma link`, 'Kickoff gate'],
      status: () => ({ label: 'Brief completeness', value: '91% ready day 1' }),
    },
    {
      id: 'mock',
      tabLabel: 'Mock loop',
      triggerBadge: 'Comment thread',
      nodes: (n) => ['Feedback in', 'Revise frames', 'Accessibility pass', `${n} preview`, 'Sign-off gate'],
      status: () => ({ label: 'Revision rounds', value: '3.2 → 1.4 avg' }),
    },
    {
      id: 'handoff',
      tabLabel: 'Dev handoff',
      triggerBadge: 'Ready for eng',
      nodes: (n) => ['Handoff pack', 'Token export', 'Redlines', `${n} ticket`, 'Build gate'],
      status: () => ({ label: 'Eng questions', value: '↓ 52% vs last sprint' }),
    },
  ],
  'Messaging & channels': [
    {
      id: 'route',
      tabLabel: 'Route inbound',
      triggerBadge: 'New message',
      nodes: (n) => ['Inbound ping', 'Intent classify', 'Queue owner', `${n} channel`, 'Reply gate'],
      status: () => ({ label: 'First response', value: '< 3 min SLA' }),
    },
    {
      id: 'reply',
      tabLabel: 'Draft reply',
      triggerBadge: '@mention',
      nodes: (n) => ['Mention caught', 'Context pull', 'Draft response', `${n} send`, 'Human gate'],
      status: () => ({ label: 'Accept rate', value: '76% sent as-is' }),
    },
    {
      id: 'escalate',
      tabLabel: 'Escalate',
      triggerBadge: 'SLA breach',
      nodes: (n) => ['SLA timer', 'Summarize thread', 'Page on-call', `${n} incident`, 'Close gate'],
      status: () => ({ label: 'Escalations', value: '↓ 28% false positives' }),
    },
  ],
  Research: [
    {
      id: 'sweep',
      tabLabel: 'Source sweep',
      triggerBadge: 'Weekly cron',
      nodes: (n) => ['Sweep start', 'Fetch sources', 'Dedupe hits', `${n} digest`, 'Publish gate'],
      status: () => ({ label: 'Sources scanned', value: '240/wk avg' }),
    },
    {
      id: 'synthesize',
      tabLabel: 'Synthesize',
      triggerBadge: 'Notes uploaded',
      nodes: (n) => ['Raw notes', 'Cluster themes', 'Exec summary', `${n} memo`, 'Review gate'],
      status: () => ({ label: 'Time to memo', value: '2d → 4h' }),
    },
    {
      id: 'monitor',
      tabLabel: 'Monitor',
      triggerBadge: 'Alert keyword',
      nodes: (n) => ['Keyword hit', 'Verify source', 'Impact score', `${n} alert`, 'Action gate'],
      status: () => ({ label: 'Noise filtered', value: '81% dropped' }),
    },
  ],
  Productivity: [
    {
      id: 'sync',
      tabLabel: 'Sync',
      triggerBadge: 'Calendar tick',
      nodes: (n) => ['Sync window', 'Pull updates', 'Resolve conflicts', `${n} mirror`, 'Confirm gate'],
      status: () => ({ label: 'Conflict rate', value: '↓ 19% after agents' }),
    },
    {
      id: 'automate',
      tabLabel: 'Automate',
      triggerBadge: 'Rule matched',
      nodes: (n) => ['Trigger fired', 'Plan steps', 'Execute actions', `${n} log`, 'Audit gate'],
      status: () => ({ label: 'Manual steps saved', value: '12/wk avg' }),
    },
    {
      id: 'report',
      tabLabel: 'Report',
      triggerBadge: 'Friday 4pm',
      nodes: (n) => ['Report due', 'Aggregate KPIs', 'Draft narrative', `${n} share`, 'Send gate'],
      status: () => ({ label: 'Stakeholder opens', value: '94% within 24h' }),
    },
  ],
  Lifestyle: [
    {
      id: 'routine',
      tabLabel: 'Daily routine',
      triggerBadge: 'Morning cron',
      nodes: (n) => ['Day start', 'Plan checklist', 'Gentle nudges', `${n} journal`, 'Done gate'],
      status: () => ({ label: 'Streak', value: '18 days avg' }),
    },
    {
      id: 'remind',
      tabLabel: 'Reminders',
      triggerBadge: 'Due soon',
      nodes: (n) => ['Reminder due', 'Context snippet', 'Snooze logic', `${n} notify`, 'Ack gate'],
      status: () => ({ label: 'Missed items', value: '↓ 40%' }),
    },
    {
      id: 'checkin',
      tabLabel: 'Check-in',
      triggerBadge: 'Weekly ping',
      nodes: (n) => ['Check-in', 'Mood + goals', 'Suggest tweak', `${n} recap`, 'Reflect gate'],
      status: () => ({ label: 'Completion', value: '86% weekly' }),
    },
  ],
  OpenClaw: [
    {
      id: 'node-mission',
      tabLabel: 'Node mission',
      triggerBadge: 'Device online',
      nodes: (n) => ['Node ready', 'Plan mission', 'Run tools', `${n} node`, 'Handoff gate'],
      status: () => ({ label: 'Success rate', value: '92% first pass' }),
    },
    {
      id: 'tool-chain',
      tabLabel: 'Tool chain',
      triggerBadge: 'User request',
      nodes: (n) => ['Request in', 'Pick tools', 'Execute chain', `${n} output`, 'Verify gate'],
      status: () => ({ label: 'Retries', value: '0.3 avg' }),
    },
    {
      id: 'sync-state',
      tabLabel: 'Sync state',
      triggerBadge: 'Heartbeat',
      nodes: (n) => ['Heartbeat', 'Diff state', 'Push updates', `${n} sync`, 'Stable gate'],
      status: () => ({ label: 'Lag', value: '< 2s p95' }),
    },
  ],
  APIs: [
    {
      id: 'webhook',
      tabLabel: 'Webhook',
      triggerBadge: 'POST /hook',
      nodes: (n) => ['Webhook hit', 'Validate schema', 'Route handler', `${n} API`, 'Ack gate'],
      status: () => ({ label: 'Invalid payloads', value: '0.4% rejected' }),
    },
    {
      id: 'fanout',
      tabLabel: 'Fan-out',
      triggerBadge: 'Event bus',
      nodes: (n) => ['Bus event', 'Transform', 'Multi-dest send', `${n} subscribers`, 'DLQ gate'],
      status: () => ({ label: 'Delivery', value: '99.7% success' }),
    },
    {
      id: 'rate-limit',
      tabLabel: 'Rate guard',
      triggerBadge: 'Spike detected',
      nodes: (n) => ['Spike seen', 'Throttle plan', 'Shape traffic', `${n} limits`, 'Clear gate'],
      status: () => ({ label: 'Downtime avoided', value: '3 incidents/qtr' }),
    },
  ],
};

const INTEGRATION_VARIANTS = [
  {
    suffix: 'event',
    workflows: [
      {
        id: 'event-ingest',
        tabLabel: 'Event ingest',
        triggerBadge: 'Webhook event',
        nodes: (n) => ['Event received', 'Normalize payload', 'Enrich context', `${n} record`, 'Process gate'],
        status: () => ({ label: 'Duplicate events', value: '< 0.2%' }),
      },
      {
        id: 'event-route',
        tabLabel: 'Event route',
        triggerBadge: 'Stream tick',
        nodes: (n) => ['Stream batch', 'Route rules', 'Fan to workers', `${n} queue`, 'Drain gate'],
        status: () => ({ label: 'Routing latency', value: '120ms p95' }),
      },
      {
        id: 'event-audit',
        tabLabel: 'Event audit',
        triggerBadge: 'Daily rollup',
        nodes: (n) => ['Day close', 'Aggregate events', 'Anomaly scan', `${n} report`, 'Sign gate'],
        status: () => ({ label: 'Anomalies caught', value: '17/wk avg' }),
      },
    ],
  },
  {
    suffix: 'sync',
    workflows: [
      {
        id: 'sync-pull',
        tabLabel: 'Sync pull',
        triggerBadge: 'Hourly sync',
        nodes: (n) => ['Pull start', 'Fetch delta', 'Merge records', `${n} mirror`, 'Commit gate'],
        status: () => ({ label: 'Records synced', value: '18k/hr avg' }),
      },
      {
        id: 'sync-push',
        tabLabel: 'Sync push',
        triggerBadge: 'Local change',
        nodes: (n) => ['Change detected', 'Validate', 'Push upstream', `${n} confirm`, 'Retry gate'],
        status: () => ({ label: 'Conflict resolves', value: '96% automatic' }),
      },
      {
        id: 'sync-reconcile',
        tabLabel: 'Reconcile',
        triggerBadge: 'Nightly job',
        nodes: (n) => ['Reconcile job', 'Diff systems', 'Fix drift', `${n} ledger`, 'Balance gate'],
        status: () => ({ label: 'Drift rows', value: '↓ 61% MoM' }),
      },
    ],
  },
  {
    suffix: 'notify',
    workflows: [
      {
        id: 'notify-alert',
        tabLabel: 'Alert',
        triggerBadge: 'Threshold crossed',
        nodes: (n) => ['Threshold hit', 'Draft alert', 'Route channel', `${n} ping`, 'Ack gate'],
        status: () => ({ label: 'False alerts', value: '↓ 22%' }),
      },
      {
        id: 'notify-digest',
        tabLabel: 'Digest',
        triggerBadge: 'Daily 9am',
        nodes: (n) => ['Digest window', 'Summarize activity', 'Personalize', `${n} email`, 'Send gate'],
        status: () => ({ label: 'Open rate', value: '48% avg' }),
      },
      {
        id: 'notify-escalation',
        tabLabel: 'Escalation',
        triggerBadge: 'No response',
        nodes: (n) => ['Silent thread', 'Escalation plan', 'Page owner', `${n} trail`, 'Close gate'],
        status: () => ({ label: 'SLA met', value: '97.2%' }),
      },
    ],
  },
  {
    suffix: 'provision',
    workflows: [
      {
        id: 'provision-user',
        tabLabel: 'Provision',
        triggerBadge: 'New signup',
        nodes: (n) => ['Signup event', 'Create account', 'Grant scopes', `${n} workspace`, 'Welcome gate'],
        status: () => ({ label: 'Time to active', value: '4 min median' }),
      },
      {
        id: 'provision-seat',
        tabLabel: 'Seat sync',
        triggerBadge: 'HR update',
        nodes: (n) => ['HR change', 'Map roles', 'Adjust seats', `${n} billing`, 'Approve gate'],
        status: () => ({ label: 'Seat mismatches', value: '< 1%' }),
      },
      {
        id: 'provision-offboard',
        tabLabel: 'Offboard',
        triggerBadge: 'Access revoked',
        nodes: (n) => ['Offboard start', 'Revoke tokens', 'Archive data', `${n} export`, 'Confirm gate'],
        status: () => ({ label: 'Completion', value: '100% in 24h' }),
      },
    ],
  },
  {
    suffix: 'ticket',
    workflows: [
      {
        id: 'ticket-intake',
        tabLabel: 'Ticket intake',
        triggerBadge: 'Form submit',
        nodes: (n) => ['Ticket in', 'Triage priority', 'Assign queue', `${n} case`, 'Respond gate'],
        status: () => ({ label: 'First reply', value: '< 15 min' }),
      },
      {
        id: 'ticket-update',
        tabLabel: 'Status sync',
        triggerBadge: 'Status change',
        nodes: (n) => ['Status moved', 'Notify stakeholders', 'Update CRM', `${n} timeline`, 'Close gate'],
        status: () => ({ label: 'Stale tickets', value: '↓ 33%' }),
      },
      {
        id: 'ticket-csat',
        tabLabel: 'CSAT',
        triggerBadge: 'Ticket closed',
        nodes: (n) => ['Closed ticket', 'Send survey', 'Analyze sentiment', `${n} insights`, 'Loop gate'],
        status: () => ({ label: 'CSAT score', value: '4.6 / 5' }),
      },
    ],
  },
  {
    suffix: 'pipeline',
    workflows: [
      {
        id: 'pipeline-stage',
        tabLabel: 'Stage move',
        triggerBadge: 'Deal updated',
        nodes: (n) => ['Stage change', 'Validate fields', 'Notify AE', `${n} pipeline`, 'Forecast gate'],
        status: () => ({ label: 'Forecast accuracy', value: '+11 pts' }),
      },
      {
        id: 'pipeline-enrich',
        tabLabel: 'Enrich',
        triggerBadge: 'New lead',
        nodes: (n) => ['Lead captured', 'Enrich firmographics', 'Score lead', `${n} CRM`, 'Qualify gate'],
        status: () => ({ label: 'Qualified rate', value: '34% → 41%' }),
      },
      {
        id: 'pipeline-handoff',
        tabLabel: 'Handoff',
        triggerBadge: 'SQL reached',
        nodes: (n) => ['SQL flag', 'Brief AE', 'Schedule demo', `${n} calendar`, 'Accept gate'],
        status: () => ({ label: 'Demo show rate', value: '78%' }),
      },
    ],
  },
];

function workflowsForPlugin(plugin) {
  const hash = slugHash(plugin.slug);
  const category = plugin.category || 'Integrations';
  const name = plugin.name;
  const icon = iconDomain(plugin);

  let templates;
  if (category === 'Integrations' || !CATEGORY_WORKFLOWS[category]) {
    const variant = pick(INTEGRATION_VARIANTS, hash, 3);
    templates = variant.workflows.map((w) => ({
      ...w,
      id: `${w.id}-${variant.suffix}`,
    }));
  } else {
    templates = CATEGORY_WORKFLOWS[category];
  }

  const agent1 = pick(AGENTS, hash, 1);
  const agent2 = pick(AGENTS, hash, 7);
  if (agent2 === agent1) {
    // ensure variety
  }

  return templates.map((tpl, idx) =>
    makeWorkflow({
      id: tpl.id,
      tabLabel: tpl.tabLabel,
      triggerBadge: tpl.triggerBadge,
      nodes: tpl.nodes(name),
      statusBar: tpl.status(name),
      icon,
      agent1: pick(AGENTS, hash, idx + 1),
      agent2: pick(AGENTS, hash, idx + 5),
    }),
  );
}

function generateContent(plugin) {
  const hash = slugHash(plugin.slug);
  return {
    headlineLines: headlineFor(plugin, hash),
    subheading: subheadingFor(plugin, plugin.category, hash),
    playbooks: workflowsForPlugin(plugin),
  };
}

function loadCatalog() {
  const raw = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  return raw.plugins || raw;
}

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_PATH)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
}

function mergedContent(plugin, generated) {
  const overrides = loadOverrides();
  return overrides[plugin.slug] || generated;
}

function chunkFileName(index, firstSlug, lastSlug) {
  const pad = String(index + 1).padStart(2, '0');
  const a = firstSlug.replace(/[^a-z0-9]+/gi, '-').slice(0, 12);
  const b = lastSlug.replace(/[^a-z0-9]+/gi, '-').slice(0, 12);
  return `plugins-chunk-${pad}-${a}-to-${b}.json`;
}

function writeManifest(chunkFiles) {
  const lines = [
    "import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';",
    "",
    "import { PLUGIN_PLAYBOOK_SLUG_INDEX } from './slugIndex';",
    "",
    "export const PLUGIN_PLAYBOOK_CHUNK_FILES = [",
    ...chunkFiles.map((f) => `  '${f}',`),
    "] as const;",
    "",
    "export type PluginPlaybookChunkFile = (typeof PLUGIN_PLAYBOOK_CHUNK_FILES)[number];",
    "",
    "const chunkCache = new Map<PluginPlaybookChunkFile, Record<string, PlaybookWorkflowContent>>();",
    "",
    "const slugToChunk = new Map<string, PluginPlaybookChunkFile>(",
    "  PLUGIN_PLAYBOOK_SLUG_INDEX.map(({ slug, chunk }) => [slug, chunk as PluginPlaybookChunkFile]),",
    ");",
    "",
    "export async function loadPluginPlaybookChunk(",
    "  file: PluginPlaybookChunkFile,",
    "): Promise<Record<string, PlaybookWorkflowContent>> {",
    "  const cached = chunkCache.get(file);",
    "  if (cached) return cached;",
    "  const mod = await import(`./chunks/${file}`);",
    "  const data = (mod.default ?? mod) as Record<string, PlaybookWorkflowContent>;",
    "  chunkCache.set(file, data);",
    "  return data;",
    "}",
    "",
    "let overridesPromise: Promise<Record<string, PlaybookWorkflowContent>> | null = null;",
    "",
    "async function loadOverrides(): Promise<Record<string, PlaybookWorkflowContent>> {",
    "  if (!overridesPromise) {",
    "    overridesPromise = import('./overrides.json').then((m) => (m.default ?? m) as Record<string, PlaybookWorkflowContent>);",
    "  }",
    "  return overridesPromise;",
    "}",
    "",
    "export async function loadPluginPlaybookWorkflow(",
    "  slug: string,",
    "): Promise<PlaybookWorkflowContent | null> {",
    "  const overrides = await loadOverrides();",
    "  if (overrides[slug]) return overrides[slug];",
    "  const chunkFile = slugToChunk.get(slug);",
    "  if (!chunkFile) return null;",
    "  const chunk = await loadPluginPlaybookChunk(chunkFile);",
    "  return chunk[slug] ?? null;",
    "}",
    "",
  ];
  fs.writeFileSync(MANIFEST_PATH, lines.join('\n'));
}

function writeSlugIndex(slugToChunk) {
  const indexPath = path.join(ROOT, 'lib/playbookWorkflowContent/plugins/slugIndex.ts');
  const entries = [...slugToChunk.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const body = entries
    .map(([slug, chunk]) => `  { slug: ${JSON.stringify(slug)}, chunk: ${JSON.stringify(chunk)} },`)
    .join('\n');
  const content = `export const PLUGIN_PLAYBOOK_SLUG_INDEX: ReadonlyArray<{
  slug: string;
  chunk: string;
}> = [
${body}
];
`;
  fs.writeFileSync(indexPath, content);
}

function main() {
  const plugins = loadCatalog().slice().sort((a, b) => a.slug.localeCompare(b.slug));
  fs.mkdirSync(CHUNKS_DIR, { recursive: true });

  const existing = fs.readdirSync(CHUNKS_DIR).filter((f) => f.endsWith('.json'));
  for (const f of existing) fs.unlinkSync(path.join(CHUNKS_DIR, f));

  const overrides = loadOverrides();
  const chunkFiles = [];
  const slugToChunk = new Map();

  let i = 0;
  let chunkIndex = 0;
  while (i < plugins.length) {
    const targetSize = CHUNK_MIN + (slugHash(String(chunkIndex)) % (CHUNK_MAX - CHUNK_MIN + 1));
    const slice = plugins.slice(i, i + targetSize);
    const chunk = {};
    for (const plugin of slice) {
      const generated = generateContent(plugin);
      chunk[plugin.slug] = generated;
      if (overrides[plugin.slug]) {
        // keep generated in chunk; runtime merge prefers overrides
      }
    }
    const fileName = chunkFileName(chunkIndex, slice[0].slug, slice[slice.length - 1].slug);
    fs.writeFileSync(path.join(CHUNKS_DIR, fileName), `${JSON.stringify(chunk, null, 2)}\n`);
    chunkFiles.push(fileName);
    for (const plugin of slice) slugToChunk.set(plugin.slug, fileName);
    i += slice.length;
    chunkIndex += 1;
  }

  writeSlugIndex(slugToChunk);
  writeManifest(chunkFiles);

  console.log(`Generated ${chunkFiles.length} chunk files for ${plugins.length} plugins.`);
  console.log(`Overrides loaded: ${Object.keys(overrides).length} slugs`);
  for (const f of chunkFiles) console.log(`  ${f}`);
}

main();
