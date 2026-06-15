import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/email-rfp-772.md': {
    name: 'tickets/email-rfp-772.md',
    ext: 'md',
    content: `# Ticket #772 — Email RFP

**From:** procurement@enterprise.co
**Subject:** RFP — AI ops platform evaluation
**Due:** Friday EOD
**Assigned:** Aria (research) + Jordan (response draft)`,
  },
};

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
  deliverArtifactKey: 'tickets/email-rfp-772.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Email → ticket — attachments and thread preserved.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'read_file', label: 'email_parse', detail: 'procurement@enterprise.co — RFP body', agent: 'Jordan', faviconDomain: 'gmail.com' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'web_search', label: 'web_search', detail: 'enterprise AI ops RFP evaluation criteria', agent: 'Aria', faviconDomain: 'google.com' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'deliver', name: 'tickets/email-rfp-772.md', delay: 450 },
    { type: 'openArtifact', key: 'tickets/email-rfp-772.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
