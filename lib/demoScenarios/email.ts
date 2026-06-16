import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'email/parsed-rfp.md': a({
    name: 'email/parsed-rfp.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Parsed email — Enterprise RFP

**From:** procurement@enterprise.co
**Subject:** RFP — AI ops platform evaluation
**Due:** Friday EOD

## Requirements extracted
- Multi-agent orchestration with audit trail
- Human approval gates on outbound actions
- SSO + SOC2 documentation
- 99.9% uptime SLA`,
  }),
  'email/rfp-research.md': a({
    name: 'email/rfp-research.md',
    ext: 'md',
    kind: 'markdown',
    content: `# RFP research — evaluator criteria

## Scoring weights (inferred)
- Security & compliance: 30%
- Agent orchestration: 25%
- Integration (Slack, email, Git): 20%
- Pricing model: 15%
- Support SLA: 10%

## Trooper strengths to highlight
- Traced tickets + Canvas artifacts
- Human review gates (Smart Approve)
- OpenClaw node execution layer`,
  }),
  'email/rfp-response-draft.md': a({
    name: 'email/rfp-response-draft.md',
    ext: 'md',
    kind: 'markdown',
    content: `# RFP response draft

Dear Enterprise procurement team,

Thank you for including Trooper in your AI ops platform evaluation.

**Executive summary:** Trooper provides a unified command layer for Codex, Claude Code, Cursor, and custom agents — with traced diffs, Canvas artifacts, and human review gates.

Attached: security overview, architecture diagram, pricing sheet.

**Gate:** Approve before send to procurement@enterprise.co`,
  }),
};

const CANVAS_KEYS = ['email/parsed-rfp.md', 'email/rfp-research.md', 'email/rfp-response-draft.md'];

export const emailScenario: DemoScenario = {
  id: 'email',
  org: { name: 'Trooper', domain: 'trooper.so', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'inbox', name: 'email-inbox', preview: 'RFP: AI ops platform evaluation', time: 'now', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: RFP ticket created', time: '5m', system: false },
  ],
  defaultChannel: 'inbox',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Respond to Enterprise RFP email', col: 'inbox', tags: ['email', 'rfp'], watchers: ['Vaibhav', 'Jordan'], comments: 2 },
    { id: 2, title: 'Research evaluator requirements', col: 'in_progress', tags: ['research', 'rfp'], watchers: ['Aria'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Draft RFP response email', col: 'review', tags: ['email', 'approval'], watchers: ['Vaibhav'], comments: 1 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Email: RFP — AI ops platform', delay: 150 },
    { type: 'typing', text: '@Jordan enterprise RFP landed in email — need research + draft response by Friday', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan enterprise RFP landed in email — need research + draft response by Friday', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Email parsed into ticket #772 — Aria on requirements, response draft queued.', time: '10:20', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Draft response ready — held for approval before send.', time: '10:22', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'email', type: 'channel' },
    { label: 'rfp', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Parse email into structured ticket', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Research RFP requirements', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Draft response email', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'email/rfp-response-draft.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Email → ticket — attachments and thread preserved.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'gmail', label: 'gmail_read', detail: 'procurement@enterprise.co — RFP body', agent: 'Jordan' }), delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'openArtifact', key: 'email/parsed-rfp.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'notion', label: 'notion_search', detail: 'Enterprise RFP evaluation criteria', agent: 'Aria' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'email/rfp-research.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'gmail', label: 'gmail_draft', detail: 'email/rfp-response-draft.md — pending approval', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'email/rfp-response-draft.md', delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
