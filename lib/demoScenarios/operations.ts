import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const RECON_DIFF = `--- a/invoices/vendor-june.csv
+++ b/invoices/vendor-june.csv
@@ -12,7 +12,7 @@
 INV-1042,CloudHost,4200.00,2026-06-01
-INV-1042,CloudHost,4200.00,2026-06-01
+INV-1042-DUP,CloudHost,4200.00,2026-06-01  ← duplicate removed
 INV-1043,CDN Edge,890.00,2026-06-03
@@ -28,6 +28,7 @@
 INV-1051,Monitoring,120.00,2026-06-14
+INV-1052,Backup SaaS,340.00,2026-06-15  ← new line matched`;

const BACKUP_LOG = `$ verify-backups --all-regions

Region us-east-1  ✓ snapshot 2026-06-15T06:00Z verified
Region eu-west-1  ✓ snapshot 2026-06-15T06:00Z verified
Region ap-south-1 ✓ snapshot 2026-06-15T06:00Z verified

All 3 regions PASS · retention policy OK`;

const ARTIFACTS = {
  'ops/weekly-checklist.md': a({
    name: 'ops/weekly-checklist.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Weekly ops checklist — W24

- [x] Vendor invoice reconciliation
- [x] Access review — dormant accounts
- [ ] Q2 budget variance report
- [x] Backup verification — all regions`,
  }),
  'ops/vendor-reconciliation.diff': a({ name: 'ops/vendor-reconciliation.diff', ext: 'diff', kind: 'diff', content: RECON_DIFF }),
  'ops/backup-verify.log': a({ name: 'ops/backup-verify.log', ext: 'log', kind: 'code', content: BACKUP_LOG }),
};

const CANVAS_KEYS = ['ops/weekly-checklist.md', 'ops/vendor-reconciliation.diff', 'ops/backup-verify.log'];

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
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'ops/weekly-checklist.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Weekly ops — running checklist items in parallel.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'quickbooks', label: 'quickbooks_fetch', detail: 'invoices/vendor-june.csv', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_update', detail: 'vendor-june.csv — dedupe + match', agent: 'Jordan' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'ops/vendor-reconciliation.diff', delay: 280 },
    { type: 'artifactReviewSelect', delay: 480 },
    { type: 'artifactReviewCompose', delay: 620 },
    { type: 'artifactReviewSave', sender: 'Vaibhav', delay: 420 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'aws', label: 'aws_verify', detail: 'verify-backups --all-regions', agent: 'Leo' }), delay: 550 },
    { type: 'toolDone', id: 't3', delay: 400 },
    { type: 'openArtifact', key: 'ops/backup-verify.log', delay: 280 },
    { type: 'artifactReviewSelect', delay: 520 },
    { type: 'artifactReviewCompose', delay: 680 },
    { type: 'artifactReviewSave', sender: 'Vaibhav', delay: 480 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'ops/weekly-checklist.md', delay: 450 },
    { type: 'openArtifact', key: 'ops/weekly-checklist.md', delay: 200 },
    { type: 'artifactReviewSelect', delay: 520 },
    { type: 'artifactReviewCompose', delay: 680 },
    { type: 'artifactReviewSave', sender: 'Vaibhav', delay: 480 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Checklist 3/4 complete — budget report awaiting approval.', time: '09:04', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
