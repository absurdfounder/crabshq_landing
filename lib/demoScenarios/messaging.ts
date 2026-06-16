import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/dm-summary.md': a({
    name: 'tickets/dm-summary.md',
    ext: 'md',
    kind: 'markdown',
    content: `# DM summary

**Channel:** Direct message
**From:** Vaibhav
**Request:** Update Q2 roadmap slide deck by EOD — pull latest metrics
**Routed:** Ren (deck) + Aria (metrics)`,
  }),
  'tickets/dm-routed-1190.md': a({
    name: 'tickets/dm-routed-1190.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Ticket #1190 — DM routed

**Channel:** Direct message (OpenClaw)
**Request:** Update Q2 roadmap slide deck by EOD
**Status:** Metrics pulled · deck draft in Human Review`,
  }),
  'deck/q2-roadmap-notes.md': a({
    name: 'deck/q2-roadmap-notes.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Q2 roadmap deck — update notes

## Slides updated
- Slide 3: Agent velocity 3.2× (from metrics/q2-dashboard.csv)
- Slide 5: Canvas + human review gates added to roadmap
- Slide 8: Parser reliability milestone

**Deliverable:** q2-roadmap.slides.html + export pending approval`,
  }),
};

const CANVAS_KEYS = ['tickets/dm-summary.md', 'deck/q2-roadmap-notes.md'];

export const messagingScenario: DemoScenario = {
  id: 'messaging',
  org: { name: 'Trooper', domain: 'trooper.so', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'dm', name: 'Direct message', preview: 'You: update the Q2 roadmap deck by EOD', time: 'now', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: deck task on board', time: '3m', system: false },
  ],
  defaultChannel: 'dm',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Update Q2 roadmap deck', col: 'inbox', tags: ['deck', 'roadmap'], watchers: ['Vaibhav', 'Ren'], comments: 1 },
    { id: 2, title: 'Pull latest metrics for slides', col: 'in_progress', tags: ['data', 'slides'], watchers: ['Aria'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Deliver deck for review', col: 'review', tags: ['review', 'deck'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan update the Q2 roadmap deck by EOD — pull latest metrics', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan update the Q2 roadmap deck by EOD — pull latest metrics', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'DM received — ticket created, Ren on deck, Aria pulling metrics.', time: '13:10', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Draft ready in Human Review — same thread, full trace on the ticket.', time: '13:12', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'roadmap', type: 'topic' },
    { label: 'deck', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Route DM to task board', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Pull Q2 metrics', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Update slide deck', agent: 'Ren', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'tickets/dm-routed-1190.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Message → ticket — context preserved from channel.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'slack', label: 'slack_read', detail: 'DM routed to task #1190', agent: 'Jordan' }), delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'openArtifact', key: 'tickets/dm-summary.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_read', detail: 'metrics/q2-dashboard.csv', agent: 'Aria' }), delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'figma', label: 'figma_update', detail: 'deck/q2-roadmap-notes.md — slides 3, 5, 8', agent: 'Ren', provider: 'Claude Code' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'tickets/dm-routed-1190.md', delay: 450 },
    { type: 'openArtifact', key: 'tickets/dm-routed-1190.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
