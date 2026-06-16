import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const RECON_DIFF = `--- a/reports/june-variance.csv
+++ b/reports/june-variance.csv
@@ -8,7 +8,7 @@
 CloudHost,4200.00,4200.00,0.00
-CDN Edge,890.00,920.00,-30.00
+CDN Edge,890.00,890.00,0.00  ← reconciled
 Monitoring,120.00,120.00,0.00
-Backup SaaS,0.00,340.00,-340.00  ← missing accrual
+Backup SaaS,340.00,340.00,0.00  ← accrual posted`;

const ARTIFACTS = {
  'finance/variance-summary.md': a({
    name: 'finance/variance-summary.md',
    ext: 'md',
    kind: 'markdown',
    content: `# June variance summary

| Category | Budget | Actual | Variance |
|----------|--------|--------|----------|
| Cloud | $12.4k | $12.1k | +$300 |
| SaaS | $8.2k | $8.5k | -$300 |
| **Net** | | | **-$120** |

Flag: Backup SaaS accrual was missing until reconciliation.`,
  }),
  'finance/reconciliation.diff': a({
    name: 'finance/reconciliation.diff',
    ext: 'diff',
    kind: 'diff',
    content: RECON_DIFF,
  }),
  'finance/close-report.md': a({
    name: 'finance/close-report.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Month-end close — June 2026

## Status
- QuickBooks sync complete
- Vendor recon diff applied
- Variance within 2% threshold

**Gate:** CFO approval before board pack send.`,
  }),
};

const CANVAS_KEYS = ['finance/variance-summary.md', 'finance/reconciliation.diff', 'finance/close-report.md'];

export const financeScenario: DemoScenario = {
  id: 'finance',
  org: { name: 'Finance', domain: 'finance.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'finance', name: 'finance', preview: 'Jordan: June close in progress', time: '16:00', system: false },
    { id: 'ops', name: 'ops', preview: 'Vendor recon complete', time: '15:45', system: false },
  ],
  defaultChannel: 'finance',
  phase1Tasks: [
    { id: 1, title: 'June month-end close', col: 'in_progress', tags: ['close', 'monthly'], watchers: ['Vaibhav', 'Jordan'], comments: 2 },
    { id: 2, title: 'Pull QuickBooks actuals', col: 'in_progress', tags: ['quickbooks', 'sync'], watchers: ['Aria'], comments: 0 },
    { id: 3, title: 'Variance reconciliation', col: 'inbox', tags: ['recon', 'variance'], watchers: ['Jordan'], comments: 1 },
  ],
  phase2Tasks: [
    { id: 4, title: 'CFO review — close pack', col: 'review', tags: ['approval', 'board'], watchers: ['Vaibhav'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan run June close — QuickBooks pull, variance recon, board pack', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan run June close — QuickBooks pull, variance recon, board pack', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Finance unit on close — QuickBooks synced, recon diff ready for review.', time: '15:58', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Close pack on Canvas — CFO approval before send.', time: '16:00', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'finance', type: 'channel' },
    { label: 'close', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Pull QuickBooks actuals', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Reconcile variance diff', agent: 'Jordan', status: 'pending' },
    { id: 's3', title: 'Compile close report', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'finance/close-report.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'June close — QuickBooks, recon, board pack.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'quickbooks', label: 'quickbooks_fetch', detail: 'June actuals → variance sheet', agent: 'Aria' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'finance/variance-summary.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_update', detail: 'june-variance.csv — recon applied', agent: 'Jordan' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 200 },
    { type: 'openArtifact', key: 'finance/reconciliation.diff', delay: 300 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'finance/close-report.md', delay: 450 },
    { type: 'openArtifact', key: 'finance/close-report.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Close pack ready — CFO approval required.', time: '16:04', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
