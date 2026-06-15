import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'ops/weekly-checklist.md': {
    name: 'ops/weekly-checklist.md',
    ext: 'md',
    content: `# Weekly ops checklist — W24

- [x] Vendor invoice reconciliation
- [x] Access review — dormant accounts
- [ ] Q2 budget variance report
- [x] Backup verification — all regions`,
  },
};

export const operationsScenario: DemoScenario = {
  id: 'operations',
  org: { name: 'Ops', domain: 'ops.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'ops', name: 'ops', preview: 'Jordan: weekly checklist 3/4 done', time: '09:00', system: false },
    { id: 'routines', name: 'routines', preview: 'Monday standup routine ran', time: '08:30', system: false },
  ],
  defaultChannel: 'ops',
  phase1Tasks: [
    { id: 1, title: 'Weekly vendor reconciliation', col: 'in_progress', tags: ['finance', 'weekly'], watchers: ['Jordan'], comments: 1 },
    { id: 2, title: 'Access review — dormant accounts', col: 'done', tags: ['security', 'access'], watchers: ['Leo'], comments: 0 },
    { id: 3, title: 'Q2 budget variance report', col: 'inbox', tags: ['budget', 'report'], watchers: ['Aria'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Backup verification — all regions', col: 'done', tags: ['backup', 'infra'], watchers: ['Leo'], comments: 1 },
    { id: 5, title: 'Compile weekly ops summary', col: 'review', tags: ['summary', 'review'], watchers: ['Vaibhav'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan run the weekly ops checklist — flag anything blocked', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan run the weekly ops checklist — flag anything blocked', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Ops routine started — reconciliation in progress, access review complete, budget report queued.', time: '08:58', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Weekly summary ready — budget variance needs your sign-off.', time: '09:00', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'ops', type: 'channel' },
    { label: 'weekly', type: 'topic' },
    { label: 'checklist', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Reconcile vendor invoices', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Verify backup jobs all regions', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Compile weekly summary', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'ops/weekly-checklist.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Weekly ops — running checklist items in parallel.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'read_file', label: 'read_file', detail: 'invoices/vendor-june.csv', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'exec', label: 'exec', detail: 'verify-backups --all-regions', agent: 'Leo' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'deliver', name: 'ops/weekly-checklist.md', delay: 450 },
    { type: 'openArtifact', key: 'ops/weekly-checklist.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Checklist 3/4 complete — budget report awaiting approval.', time: '09:04', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
