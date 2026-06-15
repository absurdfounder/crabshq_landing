import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'tickets/whatsapp-support-881.md': {
    name: 'tickets/whatsapp-support-881.md',
    ext: 'md',
    content: `# Ticket #881 — WhatsApp support

**From:** +1 (555) 0142 — existing customer
**Issue:** Billing portal login failing after password reset
**Assigned:** Leo (support) + Jordan (coordination)`,
  },
};

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
  deliverArtifactKey: 'tickets/whatsapp-support-881.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'WhatsApp → ticket — customer context preserved.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'message_send', label: 'whatsapp_read', detail: 'Inbound support message routed', agent: 'Jordan', faviconDomain: 'whatsapp.com' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'exec', label: 'exec', detail: 'reset billing session + verify login', agent: 'Leo' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'deliver', name: 'tickets/whatsapp-support-881.md', delay: 450 },
    { type: 'openArtifact', key: 'tickets/whatsapp-support-881.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
