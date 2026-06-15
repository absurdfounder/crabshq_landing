import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/dm-routed-1190.md': {
    name: 'tickets/dm-routed-1190.md',
    ext: 'md',
    content: `# Ticket #1190 — DM routed

**Channel:** Direct message (OpenClaw)
**Request:** Update Q2 roadmap slide deck by EOD
**Status:** Assigned to Ren — draft in progress`,
  },
};

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
  deliverArtifactKey: 'tickets/dm-routed-1190.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Message → ticket — context preserved from channel.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'message_send', label: 'channel_read', detail: 'DM routed to task #1190', agent: 'Jordan' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'read_file', label: 'read_file', detail: 'metrics/q2-dashboard.csv', agent: 'Aria' }, delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'deliver', name: 'tickets/dm-routed-1190.md', delay: 450 },
    { type: 'openArtifact', key: 'tickets/dm-routed-1190.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
