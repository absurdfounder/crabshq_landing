import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/slack-thread.md': a({
    name: 'tickets/slack-thread.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Slack thread export — #sales

**Sarah Chen** (VP Ops · Acme): Hey team — can we schedule a Trooper demo this week?

**Jordan** (bot): Got it — creating ticket #4421 with full thread context.

**Captured:** channel, participants, timestamps, attachments (0)`,
  }),
  'tickets/slack-lead-4421.md': a({
    name: 'tickets/slack-lead-4421.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Ticket #4421 — from Slack #sales

**Source:** Slack thread in #sales
**Request:** Schedule demo for Acme Corp — Sarah Chen, VP Ops
**Routed to:** Aria (research) + Jordan (scheduling)
**Status:** Calendar hold Thu 2pm · reply draft pending approval`,
  }),
  'tickets/slack-reply-draft.md': a({
    name: 'tickets/slack-reply-draft.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Reply draft — #sales

Hi Sarah — Thursday 2pm PT works on our end. Calendar invite on the way.

We'll cover multi-agent harness, traced tickets, and human review gates.

**Gate:** Approve before Jordan posts back to Slack.`,
  }),
  'calendar/demo-hold.md': a({
    name: 'calendar/demo-hold.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Calendar hold

**Event:** Trooper demo — Acme Corp
**When:** Thursday 2:00–2:30 PM PT
**Attendees:** Sarah Chen, Vaibhav
**Hold expires:** 24h pending confirmation`,
  }),
};

const CANVAS_KEYS = ['tickets/slack-thread.md', 'tickets/slack-lead-4421.md', 'tickets/slack-reply-draft.md'];

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
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'tickets/slack-lead-4421.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Slack → ticket routing — full thread preserved.', tags: [{ label: 'sales', type: 'channel' }], delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'slack', label: 'slack_read', detail: '#sales thread → ticket #4421', agent: 'Jordan' }), delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'openArtifact', key: 'tickets/slack-thread.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'linkedin', label: 'linkedin_search', detail: 'Acme Corp · Sarah Chen VP Ops', agent: 'Aria' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'googlecalendar', label: 'calendar_create', detail: 'Thu 2:00 PM PT · Acme demo hold', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'tool', log: i({ id: 't4', integration: 'slack', label: 'slack_draft', detail: 'Reply to #sales — pending approval', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't4', delay: 350 },
    { type: 'deliver', name: 'tickets/slack-lead-4421.md', delay: 450 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'openArtifact', key: 'tickets/slack-lead-4421.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Ready to confirm in Slack — approve send.', time: '14:05', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
