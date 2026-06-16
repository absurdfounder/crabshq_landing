import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const LOG_EXCERPT = `$ kubectl logs deploy/api-v2 --since=15m | grep -i pool

2026-06-15T08:12:04Z ERROR pool exhausted — max=32 active=32 waiting=847
2026-06-15T08:12:06Z WARN  p99 latency 2.4s on /api/v2/invoices
2026-06-15T08:13:11Z INFO  Leo: root cause — pool max unchanged after 3× traffic
2026-06-15T08:14:02Z INFO  rollback initiated → v2.3.1`;

const ROLLBACK_DIFF = `--- a/deploy/api-v2.yaml
+++ b/deploy/api-v2.yaml
@@ -18,7 +18,7 @@ spec:
       containers:
       - name: api
-        image: platform/api:v2.4.0
+        image: platform/api:v2.3.1
         env:
-        - name: DB_POOL_MAX
-          value: "32"
+        - name: DB_POOL_MAX
+          value: "64"`;

const ARTIFACTS = {
  'ops/incident-timeline.md': a({
    name: 'ops/incident-timeline.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Incident #442 — timeline

| Time | Event |
|------|-------|
| 08:12 | Alert: p99 > 2s on /api/v2 |
| 08:13 | Leo identifies connection pool exhaustion |
| 08:14 | Rollback to v2.3.1 initiated |
| 08:18 | Rollback complete — latency normal |
| 08:20 | Postmortem draft started |`,
  }),
  'ops/log-excerpt.log': a({ name: 'ops/log-excerpt.log', ext: 'log', kind: 'code', content: LOG_EXCERPT }),
  'ops/rollback.diff': a({ name: 'ops/rollback.diff', ext: 'diff', kind: 'diff', content: ROLLBACK_DIFF }),
  'ops/incident-report.md': a({
    name: 'ops/incident-report.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Incident #442 — API latency spike

## Root cause
Connection pool \`max=32\` unchanged after traffic increased 3× post-launch.

## Resolution
- Rollback to v2.3.1 (stable)
- Pool max raised to 64 in follow-up PR

## Follow-ups
- [ ] Load test pool sizing before next deploy
- [ ] Add pool exhaustion alert

**Review gate:** Postmortem approval required.`,
  }),
};

const CANVAS_KEYS = ['ops/incident-timeline.md', 'ops/log-excerpt.log', 'ops/rollback.diff', 'ops/incident-report.md'];

export const engineeringScenario: DemoScenario = {
  id: 'engineering',
  org: { name: 'Platform', domain: 'platform.dev', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'incidents', name: 'incidents', preview: 'Leo: p99 spike — triaging now', time: '08:14', system: false },
    { id: 'deploys', name: 'deploys', preview: 'Rollback to v2.3.1 complete', time: '08:18', system: false },
  ],
  defaultChannel: 'incidents',
  phase1Tasks: [
    { id: 1, title: 'Triage API latency spike', col: 'inbox', tags: ['incident', 'p0'], watchers: ['Vaibhav', 'Leo'], comments: 4 },
    { id: 2, title: 'Identify root cause — connection pool', col: 'in_progress', tags: ['debug', 'infra'], watchers: ['Leo'], comments: 2 },
    { id: 3, title: 'Prepare rollback plan', col: 'inbox', tags: ['rollback', 'deploy'], watchers: ['Leo', 'Jordan'], comments: 1 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Execute rollback to v2.3.1', col: 'done', tags: ['deploy', 'rollback'], watchers: ['Leo'], comments: 3 },
    { id: 5, title: 'Post-incident report', col: 'review', tags: ['postmortem', 'review'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan p99 spike on API — need triage, rollback, and postmortem', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan p99 spike on API — need triage, rollback, and postmortem', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Incident unit live — Leo on triage, rollback plan loading, postmortem queued.', time: '08:13', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Rollback complete — incident report in Human Review.', time: '08:18', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '🛡️', count: 2, delay: 400 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'incidents', type: 'channel' },
    { label: 'p0', type: 'topic' },
    { label: 'postmortem', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Pull logs for /api/v2', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Execute rollback to v2.3.1', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Draft post-incident report', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'ops/incident-report.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Incident #442 — Leo leading triage and rollback.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'aws', label: 'aws_status', detail: 'status.platform.dev/api-v2 metrics', agent: 'Leo' }), delay: 520 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'tool', log: i({ id: 't2', integration: 'aws', label: 'aws_logs', detail: 'kubectl logs api-v2 —since=15m', agent: 'Leo' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'ops/log-excerpt.log', delay: 280 },
    { type: 'openArtifact', key: 'ops/incident-timeline.md', delay: 260 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't3', integration: 'github', label: 'github_deploy', detail: 'deploy/api-v2.yaml — rollback v2.3.1', agent: 'Leo' }), delay: 550 },
    { type: 'toolDone', id: 't3', delay: 400 },
    { type: 'openArtifact', key: 'ops/rollback.diff', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't4', tool: 'write_file', label: 'write_file', detail: 'ops/incident-report.md', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't4', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'ops/incident-report.md', delay: 450 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Postmortem ready for review.', time: '08:20', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
