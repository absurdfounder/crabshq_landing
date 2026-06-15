import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'sales/acme-outreach.md': {
    name: 'sales/acme-outreach.md',
    ext: 'md',
    content: `# Outreach — Acme Corp

Hi Sarah,

Noticed your team scaling ops headcount while running multiple agent tools...

**Personalized hook:** Recent Series B, 3 open SDR roles
**CTA:** 15-min command layer demo`,
  },
};

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
    { id: 5, title: 'Competitive battlecard refresh', col: 'in_progress', tags: ['enablement', 'compete'], watchers: ['Aria'], comments: 1 },
    { id: 6, title: 'Send outreach for approval', col: 'review', tags: ['approval', 'email'], watchers: ['Vaibhav'], comments: 2 },
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
  deliverArtifactKey: 'sales/acme-outreach.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 2, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 2, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Acme outreach — Aria on research, Ren on draft.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'web_search', label: 'web_search', detail: 'Acme Corp Series B funding SDR hiring', agent: 'Aria', faviconDomain: 'linkedin.com' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'write_file', label: 'write_file', detail: 'sales/acme-outreach.md', agent: 'Ren' }, delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'deliver', name: 'sales/acme-outreach.md', delay: 450 },
    { type: 'openArtifact', key: 'sales/acme-outreach.md', delay: 200 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'message_send', label: 'message_send', detail: 'CRM stage → Qualified', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Outreach ready — approve before send.', time: '15:25', delay: 450 },
    { type: 'moveTask', taskId: 2, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
