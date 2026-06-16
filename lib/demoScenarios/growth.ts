import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'growth/funnel-metrics.md': a({
    name: 'growth/funnel-metrics.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Funnel metrics — signup experiment

| Step | Control | Variant B |
|------|---------|-----------|
| Landing → Signup | 4.2% | 5.8% (+38%) |
| Signup → Activate | 62% | 64% |
| Activate → Paid | 8.1% | 9.4% |

**Winner:** Variant B — hero CTA + social proof block`,
  }),
  'growth/experiment-doc.md': a({
    name: 'growth/experiment-doc.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Experiment — landing CTA + social proof

## Hypothesis
Adding customer logos above fold increases signup rate without hurting activation.

## Result
+38% signup lift (p < 0.05) · recommend rollout to 100%`,
  }),
  'growth/rollout-checklist.md': a({
    name: 'growth/rollout-checklist.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Rollout checklist — Variant B

- [x] Experiment concluded — statistically significant
- [x] Engineering deploy PR ready
- [ ] Growth lead approval
- [ ] Monitor activation for 7 days post-rollout`,
  }),
};

const CANVAS_KEYS = ['growth/funnel-metrics.md', 'growth/experiment-doc.md', 'growth/rollout-checklist.md'];

export const growthScenario: DemoScenario = {
  id: 'growth',
  org: { name: 'Growth', domain: 'growth.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'growth', name: 'growth', preview: 'Aria: experiment won — +38% signup', time: '16:45', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: rollout checklist ready', time: '16:43', system: false },
  ],
  defaultChannel: 'growth',
  phase1Tasks: [
    { id: 1, title: 'Landing CTA experiment — analyze', col: 'in_progress', tags: ['experiment', 'ab-test'], watchers: ['Vaibhav', 'Aria'], comments: 2 },
    { id: 2, title: 'Pull funnel metrics', col: 'done', tags: ['metrics', 'funnel'], watchers: ['Aria'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Rollout Variant B — approval', col: 'review', tags: ['rollout', 'approval'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan landing experiment wrapped — pull metrics, doc results, rollout checklist', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan landing experiment wrapped — pull metrics, doc results, rollout checklist', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Growth unit on it — Aria on metrics, Variant B won at +38% signup.', time: '16:43', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Rollout pack on Canvas — approve before 100% deploy.', time: '16:45', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'growth', type: 'channel' },
    { label: 'experiment', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Pull funnel metrics from analytics', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Write experiment summary', agent: 'Ren', status: 'pending' },
    { id: 's3', title: 'Compile rollout checklist', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'growth/rollout-checklist.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Growth experiment — metrics, doc, rollout.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'googlesheets', label: 'sheets_read', detail: 'Funnel metrics — Variant A vs B', agent: 'Aria' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'growth/funnel-metrics.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'notion', label: 'notion_write', detail: 'growth/experiment-doc.md', agent: 'Ren' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'growth/experiment-doc.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'growth/rollout-checklist.md', delay: 450 },
    { type: 'openArtifact', key: 'growth/rollout-checklist.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Rollout ready — approve before 100% deploy.', time: '16:48', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
