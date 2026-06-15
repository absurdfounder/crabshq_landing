import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'legal/msa-redline.md': {
    name: 'legal/msa-redline.md',
    ext: 'md',
    content: `# MSA Redline — Vendor X

## Changes flagged
- **Liability cap:** Vendor proposed 1x → recommend 2x annual fees
- **Data processing:** Add subprocessors schedule
- **Termination:** 30-day cure period for material breach

## Status
Awaiting human counsel approval before counter.`,
  },
};

export const legalScenario: DemoScenario = {
  id: 'legal',
  org: { name: 'Counsel', domain: 'counsel.legal', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'legal', name: 'legal', preview: 'Jordan: MSA review queued', time: '16:40', system: false },
    { id: 'contracts', name: 'contracts', preview: 'Vendor X MSA uploaded', time: '16:38', system: false },
  ],
  defaultChannel: 'legal',
  phase1Tasks: [
    { id: 1, title: 'Review Vendor X MSA', col: 'inbox', tags: ['msa', 'review'], watchers: ['Vaibhav', 'Jordan'], comments: 2 },
    { id: 2, title: 'Summarize liability clauses', col: 'inbox', tags: ['summary', 'risk'], watchers: ['Aria'], comments: 1 },
    { id: 3, title: 'Compare to standard playbook', col: 'inbox', tags: ['playbook', 'compare'], watchers: ['Jordan'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Draft redline for counter', col: 'review', tags: ['redline', 'approval'], watchers: ['Vaibhav'], comments: 3 },
    { id: 5, title: 'Route to human counsel', col: 'review', tags: ['human-review', 'legal'], watchers: ['Vaibhav'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan Vendor X MSA landed — need summary, redline, and human review gate', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan Vendor X MSA landed — need summary, redline, and human review gate', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Legal unit engaged — parsing contract, flagging liability gaps against your playbook.', time: '16:39', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Redline drafted — held in Human Review until counsel approves counter.', time: '16:40', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'legal', type: 'channel' },
    { label: 'msa', type: 'topic' },
    { label: 'human-review', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Extract key terms from MSA PDF', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Compare against standard playbook', agent: 'Jordan', status: 'pending' },
    { id: 's3', title: 'Draft redline document', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'legal/msa-redline.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'MSA review — all changes traced, nothing sends without approval.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'read_file', label: 'read_file', detail: 'vendor-x-msa.pdf', agent: 'Aria' }, delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'web_search', label: 'web_search', detail: 'standard SaaS MSA liability cap benchmarks', agent: 'Jordan', faviconDomain: 'google.com' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'write_file', label: 'write_file', detail: 'legal/msa-redline.md', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'deliver', name: 'legal/msa-redline.md', delay: 450 },
    { type: 'openArtifact', key: 'legal/msa-redline.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Redline ready — counsel approval required before counter.', time: '16:44', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
