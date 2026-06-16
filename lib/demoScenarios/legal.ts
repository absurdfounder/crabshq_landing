import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const REDLINE_DIFF = `--- a/msa-vendor-x.md
+++ b/msa-vendor-x.md
@@ -14,7 +14,7 @@
-7.1 Liability cap shall not exceed one (1) times annual fees.
+7.1 Liability cap shall not exceed two (2) times annual fees paid in the preceding twelve months.
@@ -22,6 +22,10 @@
 8.2 Vendor may use subprocessors listed in Schedule B.
+8.3 Customer receives 30-day notice before new subprocessors are engaged.
@@ -31,7 +35,7 @@
-9.1 Either party may terminate for convenience with 15 days notice.
+9.1 Termination for material breach requires 30-day cure period.`;

const ARTIFACTS = {
  'legal/msa-summary.md': a({
    name: 'legal/msa-summary.md',
    ext: 'md',
    kind: 'markdown',
    content: `# MSA summary — Vendor X

## Key terms extracted
- **Term:** 36 months auto-renew
- **Liability cap:** 1× annual fees (below playbook standard)
- **Data processing:** Missing subprocessors schedule
- **Termination:** 15-day convenience clause (non-standard)

## Risk score: Medium-high
Recommend counter before signature.`,
  }),
  'legal/msa-redline.diff': a({ name: 'legal/msa-redline.diff', ext: 'diff', kind: 'diff', content: REDLINE_DIFF }),
  'legal/risk-table.md': a({
    name: 'legal/risk-table.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Playbook comparison — Vendor X MSA

| Clause | Vendor draft | Playbook standard | Action |
|--------|--------------|-------------------|--------|
| Liability cap | 1× fees | 2× fees | Counter |
| Subprocessors | Not listed | Schedule B required | Add schedule |
| Termination | 15-day convenience | 30-day cure | Counter |
| DPA | Attached | Required | Accept |

**Gate:** Human counsel approval required before counter send.`,
  }),
};

const CANVAS_KEYS = ['legal/msa-summary.md', 'legal/msa-redline.diff', 'legal/risk-table.md'];

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
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'legal/risk-table.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'MSA review — all changes traced, nothing sends without approval.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'notion', label: 'notion_read', detail: 'vendor-x-msa.pdf — key terms', agent: 'Aria' }), delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'openArtifact', key: 'legal/msa-summary.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't2', integration: 'airtable', label: 'airtable_lookup', detail: 'Playbook standard vs Vendor X MSA', agent: 'Jordan' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'legal/risk-table.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'apply_patch', label: 'apply_patch', detail: 'legal/msa-redline.diff', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openArtifact', key: 'legal/msa-redline.diff', delay: 280 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'legal/risk-table.md', delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Redline ready — counsel approval required before counter.', time: '16:44', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
