import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'ops/incident-report.md': {
    name: 'ops/incident-report.md',
    ext: 'md',
    content: `# Incident #442 — API latency spike

## Timeline
- 08:12 — Alert: p99 > 2s on /api/v2
- 08:14 — Leo identified connection pool exhaustion
- 08:18 — Rollback deployed to stable tag

## Root cause
Pool max connections unchanged after traffic 3x increase.`,
  },
};

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
    { id: 's1', title: 'Pull Datadog traces for /api/v2', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Execute rollback to v2.3.1', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Draft post-incident report', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'ops/incident-report.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Incident #442 — Leo leading triage and rollback.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'exec', label: 'exec', detail: 'kubectl logs api-v2 --since=15m', agent: 'Leo', faviconDomain: 'kubernetes.io' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'exec', label: 'exec', detail: 'deploy rollback v2.3.1', agent: 'Leo', faviconDomain: 'github.com' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'write_file', label: 'write_file', detail: 'ops/incident-report.md', agent: 'Jordan' }, delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'deliver', name: 'ops/incident-report.md', delay: 450 },
    { type: 'openArtifact', key: 'ops/incident-report.md', delay: 200 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Postmortem ready for review.', time: '08:20', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
