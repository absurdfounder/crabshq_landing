import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'sales/acme-research.md': a({
    name: 'sales/acme-research.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Account research — Acme Corp

## Signals
- Series B ($42M) — 8 months ago
- 3 open SDR roles on LinkedIn
- Running separate agent tools per team (fragmented ops)

## Stakeholders
- **Sarah Chen** — VP Ops (inbound lead)
- **James Wu** — CTO (technical evaluator)

## Talking points
- Consolidate Codex + Claude Code under one traced board
- Human review gates before customer-facing sends`,
  }),
  'sales/acme-outreach.md': a({
    name: 'sales/acme-outreach.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Outreach — Acme Corp

Hi Sarah,

Noticed your team scaling ops headcount while running multiple agent tools in parallel.

**Personalized hook:** Recent Series B, 3 open SDR roles, fragmented harnesses
**Proof:** Teams like yours ship 3.2× faster with traced tickets + review gates
**CTA:** 15-min command layer demo — Thursday 2pm hold available

— Ren · on behalf of Vaibhav`,
  }),
  'sales/crm-note.md': a({
    name: 'sales/crm-note.md',
    ext: 'md',
    kind: 'markdown',
    content: `# CRM update — Acme Corp

| Field | Value |
|-------|-------|
| Stage | Qualified |
| Owner | Jordan |
| Next step | Discovery call Thu 2pm |
| Source | Inbound · LinkedIn |

Activity logged: research complete, outreach draft pending approval.`,
  }),
};

const CANVAS_KEYS = ['sales/acme-research.md', 'sales/acme-outreach.md', 'sales/crm-note.md'];

export const salesScenario: DemoScenario = {
  id: 'sales',
  org: { name: 'Pipeline', domain: 'pipeline.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'sales', name: 'sales', preview: 'Jordan: Acme lead routed to board', time: '15:22', system: false },
    { id: 'inbound', name: 'inbound-leads', preview: 'New demo request — Acme Corp', time: '15:20', system: false },
  ],
  defaultChannel: 'sales',
  phase1Tasks: [
    { id: 1, title: 'Research Acme Corp — Series B', col: 'inbox', tags: ['research', 'account'], watchers: ['Vaibhav', 'Aria'], comments: 1 },
    { id: 2, title: 'Draft personalized outreach', col: 'inbox', tags: ['outreach', 'email'], watchers: ['Ren'], comments: 0 },
    { id: 3, title: 'Update CRM stage — qualified', col: 'inbox', tags: ['crm', 'pipeline'], watchers: ['Jordan'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Schedule discovery call', col: 'in_progress', tags: ['calendar', 'meeting'], watchers: ['Jordan'], comments: 0 },
    { id: 5, title: 'Send outreach for approval', col: 'review', tags: ['approval', 'email'], watchers: ['Vaibhav'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan hot inbound from Acme — research, outreach, and CRM update today', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan hot inbound from Acme — research, outreach, and CRM update today', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Sales unit on it — Aria researching account, Ren drafting outreach, CRM stage updating.', time: '15:21', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Outreach draft ready for your approval — discovery slot held for Thursday.', time: '15:22', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '💰', count: 2, delay: 400 },
  ],
  spotlightTaskId: 2,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'sales', type: 'channel' },
    { label: 'outreach', type: 'topic' },
    { label: 'acme-corp', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Pull Acme funding + hiring signals', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Draft personalized email', agent: 'Ren', status: 'pending' },
    { id: 's3', title: 'Update CRM to Qualified', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'sales/acme-outreach.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 2, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 2, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Acme outreach — Aria on research, Ren on draft.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'linkedin', label: 'linkedin_search', detail: 'Acme Corp Series B · SDR hiring signals', agent: 'Aria' }), delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'openArtifact', key: 'sales/acme-research.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'gmail', label: 'gmail_draft', detail: 'sales/acme-outreach.md — personalized', agent: 'Ren' }), delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'openArtifact', key: 'sales/acme-outreach.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'hubspot', label: 'hubspot_update', detail: 'Acme Corp → Qualified · owner Jordan', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'sales/acme-outreach.md', delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Outreach ready — approve before send.', time: '15:25', delay: 450 },
    { type: 'moveTask', taskId: 2, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
