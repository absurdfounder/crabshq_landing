import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const PATCH_DIFF = `--- a/deploy/api-gateway.yaml
+++ b/deploy/api-gateway.yaml
@@ -22,7 +22,7 @@ spec:
       containers:
       - name: gateway
-        image: platform/gateway:v2.1.0
+        image: platform/gateway:v2.1.1  ← CVE-2026-1842 patched
         env:
         - name: TLS_MIN_VERSION
-          value: "1.1"
+          value: "1.2"`;

const AUDIT_LOG = `$ security-audit --scope=production

[09:12] WARN  TLS 1.1 enabled on api-gateway (CVE-2026-1842)
[09:14] INFO  Leo: patch v2.1.1 available
[09:18] PASS  Rollout complete — TLS 1.2 enforced`;

const ARTIFACTS = {
  'security/audit-log.log': a({ name: 'security/audit-log.log', ext: 'log', kind: 'code', content: AUDIT_LOG }),
  'security/findings.md': a({
    name: 'security/findings.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Security audit — findings

## Critical
- CVE-2026-1842: TLS 1.1 on api-gateway (patched v2.1.1)

## Medium
- 2 dormant IAM keys > 90 days (flagged for rotation)

## Status
Patch deployed · IAM rotation ticket #901 open`,
  }),
  'security/gateway-patch.diff': a({
    name: 'security/gateway-patch.diff',
    ext: 'diff',
    kind: 'diff',
    content: PATCH_DIFF,
  }),
};

const CANVAS_KEYS = ['security/audit-log.log', 'security/findings.md', 'security/gateway-patch.diff'];

export const securityScenario: DemoScenario = {
  id: 'security',
  org: { name: 'SecOps', domain: 'secops.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'security', name: 'security', preview: 'Leo: CVE patch rolling out', time: '09:18', system: false },
    { id: 'incidents', name: 'incidents', preview: 'Audit complete — 1 critical', time: '09:15', system: false },
  ],
  defaultChannel: 'security',
  phase1Tasks: [
    { id: 1, title: 'Weekly security audit — production', col: 'in_progress', tags: ['audit', 'cve'], watchers: ['Vaibhav', 'Leo'], comments: 3 },
    { id: 2, title: 'Patch api-gateway CVE-2026-1842', col: 'in_progress', tags: ['patch', 'p1'], watchers: ['Leo'], comments: 2 },
  ],
  phase2Tasks: [
    { id: 3, title: 'IAM key rotation follow-up', col: 'review', tags: ['iam', 'rotation'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan run production security audit — patch anything critical today', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan run production security audit — patch anything critical today', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'SecOps live — Leo on audit, CVE patch rolling to v2.1.1.', time: '09:14', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Critical patch deployed — findings + diff on Canvas.', time: '09:18', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'security', type: 'channel' },
    { label: 'audit', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Run production security audit', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Deploy gateway patch', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Document findings', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'security/findings.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Security audit — Leo leading scan + patch.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'aws', label: 'aws_audit', detail: 'security-audit --scope=production', agent: 'Leo' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'security/audit-log.log', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'github', label: 'github_deploy', detail: 'gateway v2.1.1 — CVE patch', agent: 'Leo' }), delay: 540 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 200 },
    { type: 'openArtifact', key: 'security/gateway-patch.diff', delay: 300 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'openArtifact', key: 'security/findings.md', delay: 280 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'security/findings.md', delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Audit complete — IAM rotation queued for review.', time: '09:20', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
