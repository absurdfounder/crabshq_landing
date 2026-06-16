import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'research/source-notes.md': a({
    name: 'research/source-notes.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Source notes — agent ops competitors

## Sources scraped
- Competitor A: $89/seat, no multi-agent board
- Competitor B: chat-only, no traced tickets
- Competitor C: enterprise-only, 6-week onboarding

## Gaps
- None show Canvas + human review gates together`,
  }),
  'research/competitor-table.md': a({
    name: 'research/competitor-table.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Competitive matrix — Q2

| Vendor | Multi-agent | Traced tickets | Canvas | Price |
|--------|-------------|----------------|--------|-------|
| Competitor A | Partial | No | No | $89/seat |
| Competitor B | No | No | No | $49/seat |
| **Trooper** | Yes | Yes | Yes | BYOA |`,
  }),
  'research/intel-brief.md': a({
    name: 'research/intel-brief.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Intel brief — agent ops landscape

## Executive summary
Mid-market buyers want traced multi-agent ops, not another chat tab. Trooper's Canvas + review gates are differentiated.

## Recommendation
Lead with board + harness story in outbound and pricing page.`,
  }),
};

const CANVAS_KEYS = ['research/source-notes.md', 'research/competitor-table.md', 'research/intel-brief.md'];

export const researchScenario: DemoScenario = {
  id: 'research',
  org: { name: 'Intel', domain: 'intel.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'research', name: 'research', preview: 'Aria: competitor matrix ready', time: '13:40', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: intel brief on board', time: '13:38', system: false },
  ],
  defaultChannel: 'research',
  phase1Tasks: [
    { id: 1, title: 'Q2 competitive intel — agent ops', col: 'in_progress', tags: ['research', 'competitive'], watchers: ['Vaibhav', 'Aria'], comments: 2 },
    { id: 2, title: 'Synthesize intel brief', col: 'inbox', tags: ['brief', 'strategy'], watchers: ['Jordan'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Share brief with GTM', col: 'review', tags: ['distribution', 'gtm'], watchers: ['Jordan'], comments: 1 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan need Q2 competitive intel on agent ops — sources, matrix, exec brief', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan need Q2 competitive intel on agent ops — sources, matrix, exec brief', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Research unit live — Aria gathering sources, matrix + brief compiling.', time: '13:38', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Intel brief on Canvas — review before GTM share.', time: '13:40', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'research', type: 'channel' },
    { label: 'competitive', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Gather competitor sources', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Build comparison matrix', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Write exec intel brief', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'research/intel-brief.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Competitive intel — sources, matrix, brief.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'notion', label: 'notion_search', detail: 'Agent ops competitor pricing pages', agent: 'Aria' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'research/source-notes.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'airtable', label: 'airtable_update', detail: 'Competitive matrix — Q2 tab', agent: 'Aria' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'research/competitor-table.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't3', integration: 'notion', label: 'notion_write', detail: 'research/intel-brief.md', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'research/intel-brief.md', delay: 450 },
    { type: 'openArtifact', key: 'research/intel-brief.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Brief ready — approve before GTM share.', time: '13:44', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
