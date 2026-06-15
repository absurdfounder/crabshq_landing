import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/slack-lead-4421.md': {
    name: 'tickets/slack-lead-4421.md',
    ext: 'md',
    content: `# Ticket #4421 — from Slack #sales

**Source:** Slack thread in #sales
**Request:** Schedule demo for Acme Corp — Sarah Chen, VP Ops
**Routed to:** Aria (research) + Jordan (scheduling)`,
  },
};

export const slackScenario: DemoScenario = {
  id: 'slack',
  org: { name: 'Trooper', domain: 'trooper.so', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'sales', name: 'sales', preview: 'Sarah: can we schedule a demo this week?', time: 'now', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: ticket #4421 created from Slack', time: '2m', system: false },
  ],
  defaultChannel: 'sales',
  defaultSidebarTab: 'channels',
  channelBrand: 'slack',
  phase1Tasks: [
    { id: 1, title: 'Schedule Acme demo — from Slack', col: 'inbox', tags: ['slack', 'inbound'], watchers: ['Jordan'], comments: 1 },
    { id: 2, title: 'Research Acme Corp account', col: 'inbox', tags: ['research', 'crm'], watchers: ['Aria'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Send calendar invite to Sarah', col: 'in_progress', tags: ['calendar', 'slack'], watchers: ['Jordan'], comments: 0 },
    { id: 4, title: 'Post confirmation in #sales', col: 'review', tags: ['slack', 'reply'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Sarah Chen in #sales', delay: 150 },
    { type: 'typing', text: 'Hey team — can we schedule a Trooper demo this week? VP Ops here at Acme.', delay: 200 },
    { type: 'send', sender: 'Sarah Chen', role: 'VP Ops · Acme', text: 'Hey team — can we schedule a Trooper demo this week? VP Ops here at Acme.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Got it from Slack — creating ticket #4421 and routing to research + scheduling.', time: '14:02', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Thursday 2pm hold sent — confirmation posting back to #sales after your approval.', time: '14:03', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '✅', count: 1, delay: 400 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'sales', type: 'channel' },
    { label: 'slack', type: 'topic' },
    { label: 'inbound', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Parse Slack thread into ticket', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Research Acme Corp', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Hold calendar slot + draft reply', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'tickets/slack-lead-4421.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Slack → ticket routing — full thread preserved.', tags: [{ label: 'sales', type: 'channel' }], delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'message_send', label: 'slack_read', detail: '#sales thread → ticket #4421', agent: 'Jordan', faviconDomain: 'slack.com' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'web_search', label: 'web_search', detail: 'Acme Corp VP Ops Sarah Chen', agent: 'Aria', faviconDomain: 'linkedin.com' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'deliver', name: 'tickets/slack-lead-4421.md', delay: 450 },
    { type: 'openArtifact', key: 'tickets/slack-lead-4421.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Ready to confirm in Slack — approve send.', time: '14:05', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
