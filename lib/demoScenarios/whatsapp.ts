import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/whatsapp-support-881.md': a({
    name: 'tickets/whatsapp-support-881.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Ticket #881 — WhatsApp support

**From:** +1 (555) 0142 — existing customer
**Issue:** Billing portal login failing after password reset
**Assigned:** Leo (support) + Jordan (coordination)
**Fix:** Session cache cleared · login verified at 11:45`,
  }),
  'tickets/whatsapp-reply.md': a({
    name: 'tickets/whatsapp-reply.md',
    ext: 'md',
    kind: 'markdown',
    content: `# WhatsApp reply draft

Hi — we've reset your billing session on our side. Please try logging in again with your new password.

If it still fails, reply here and we'll escalate.

**Gate:** Approve before send on WhatsApp.`,
  }),
};

const CANVAS_KEYS = ['tickets/whatsapp-support-881.md', 'tickets/whatsapp-reply.md'];

export const whatsappScenario: DemoScenario = {
  id: 'whatsapp',
  org: { name: 'Trooper', domain: 'trooper.so', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'support', name: 'WhatsApp · Support', preview: 'Customer: login still broken after reset', time: 'now', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: ticket from WhatsApp', time: '1m', system: false },
  ],
  defaultChannel: 'support',
  defaultSidebarTab: 'channels',
  channelBrand: 'whatsapp',
  phase1Tasks: [
    { id: 1, title: 'WhatsApp — billing login issue', col: 'inbox', tags: ['whatsapp', 'support'], watchers: ['Leo', 'Jordan'], comments: 2 },
    { id: 2, title: 'Reset session + verify fix', col: 'in_progress', tags: ['billing', 'fix'], watchers: ['Leo'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Reply on WhatsApp with resolution', col: 'review', tags: ['whatsapp', 'reply'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'WhatsApp · Support', delay: 150 },
    { type: 'typing', text: 'Login still broken after password reset — need help ASAP', delay: 200 },
    { type: 'send', sender: 'Customer', role: 'WhatsApp', text: 'Login still broken after password reset — need help ASAP', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Received on WhatsApp — ticket #881 created, Leo investigating billing session.', time: '11:44', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Fix verified — draft reply ready for your approval before WhatsApp send.', time: '11:46', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'whatsapp', type: 'channel' },
    { label: 'support', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Parse WhatsApp message into ticket', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Diagnose billing session issue', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Draft WhatsApp reply', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'tickets/whatsapp-support-881.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'WhatsApp → ticket — customer context preserved.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'whatsapp', label: 'whatsapp_read', detail: 'Inbound support message routed', agent: 'Jordan' }), delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'stripe', label: 'stripe_lookup', detail: 'Reset billing session + verify login', agent: 'Leo' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'whatsapp', label: 'whatsapp_draft', detail: 'Reply draft — pending approval', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'deliver', name: 'tickets/whatsapp-support-881.md', delay: 450 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
