import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'support/ticket-8821.md': a({
    name: 'support/ticket-8821.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Ticket #8821 — billing sync failure

**Customer:** Acme Corp · Enterprise
**Priority:** P1
**Symptom:** Invoice totals mismatch after CSV import
**Assigned:** Leo (support) + Aria (research)`,
  }),
  'support/kb-article.md': a({
    name: 'support/kb-article.md',
    ext: 'md',
    kind: 'markdown',
    content: `# KB — Invoice CSV import troubleshooting

## Common causes
1. Duplicate row keys in vendor CSV
2. Timezone offset on date columns
3. Missing currency code on line items

## Resolution steps
- Re-run dedupe on import batch
- Validate column mapping against schema v2.4`,
  }),
  'support/reply-draft.md': a({
    name: 'support/reply-draft.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Reply draft — Acme Corp

Hi — we identified duplicate vendor rows in your June import batch.

We've queued a re-sync and will confirm totals within 30 minutes.

**Gate:** Approve before Zendesk send.`,
  }),
};

const CANVAS_KEYS = ['support/ticket-8821.md', 'support/kb-article.md', 'support/reply-draft.md'];

export const supportScenario: DemoScenario = {
  id: 'support',
  org: { name: 'Support', domain: 'support.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'support', name: 'support', preview: 'P1: billing sync mismatch — Acme', time: 'now', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: ticket #8821 routed', time: '2m', system: false },
  ],
  defaultChannel: 'support',
  phase1Tasks: [
    { id: 1, title: 'P1 — Acme billing sync failure', col: 'inbox', tags: ['p1', 'billing'], watchers: ['Leo', 'Jordan'], comments: 3 },
    { id: 2, title: 'Pull KB + prior incidents', col: 'in_progress', tags: ['kb', 'research'], watchers: ['Aria'], comments: 1 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Draft customer reply', col: 'review', tags: ['reply', 'approval'], watchers: ['Jordan'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan P1 from Acme — billing sync mismatch, need KB lookup and reply draft', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan P1 from Acme — billing sync mismatch, need KB lookup and reply draft', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Support unit live — Aria on KB, Leo on triage, reply held for approval.', time: '09:44', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Reply draft ready — approve before Zendesk send.', time: '09:46', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'support', type: 'channel' },
    { label: 'p1', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Triage ticket #8821', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Search KB for CSV import issues', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Draft customer reply', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'support/reply-draft.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'P1 support — KB lookup + traced reply draft.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'zendesk', label: 'zendesk_read', detail: 'Ticket #8821 — billing sync', agent: 'Leo' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'support/ticket-8821.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'notion', label: 'notion_search', detail: 'KB — CSV import troubleshooting', agent: 'Aria' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'support/kb-article.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't3', integration: 'zendesk', label: 'zendesk_draft', detail: 'Reply — re-sync queued', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'support/reply-draft.md', delay: 450 },
    { type: 'openArtifact', key: 'support/reply-draft.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Reply ready — approve before send.', time: '09:48', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
