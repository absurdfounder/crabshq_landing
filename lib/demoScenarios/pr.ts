import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'pr/press-release.md': a({
    name: 'pr/press-release.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Press release — Trooper Series A

**FOR IMMEDIATE RELEASE**

Trooper raises $18M Series A to bring traced multi-agent ops to every lean team.

"The command layer for AI employees is the missing piece," said CEO Vaibhav.

**Gate:** Comms lead approval before wire send.`,
  }),
  'pr/media-list.md': a({
    name: 'pr/media-list.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Media list — Series A

| Outlet | Contact | Tier |
|--------|---------|------|
| TechCrunch | editors@techcrunch.com | A |
| The Verge | tips@theverge.com | A |
| VentureBeat | news@vventurebeat.com | B |`,
  }),
  'pr/announcement-checklist.md': a({
    name: 'pr/announcement-checklist.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Announcement checklist

- [x] Press release drafted
- [x] Media list updated
- [ ] CEO quote approved
- [ ] Embargo lift Tue 8am PT`,
  }),
};

const CANVAS_KEYS = ['pr/press-release.md', 'pr/media-list.md', 'pr/announcement-checklist.md'];

export const prScenario: DemoScenario = {
  id: 'pr',
  org: { name: 'Comms', domain: 'comms.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'comms', name: 'comms', preview: 'Ren: press release draft ready', time: '14:30', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: Series A pack on board', time: '14:28', system: false },
  ],
  defaultChannel: 'comms',
  phase1Tasks: [
    { id: 1, title: 'Series A press release', col: 'in_progress', tags: ['press', 'series-a'], watchers: ['Vaibhav', 'Ren'], comments: 3 },
    { id: 2, title: 'Update media contact list', col: 'inbox', tags: ['media', 'outreach'], watchers: ['Aria'], comments: 1 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Embargo approval — comms lead', col: 'review', tags: ['approval', 'embargo'], watchers: ['Jordan'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan Series A announcement — press release, media list, checklist by EOD', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan Series A announcement — press release, media list, checklist by EOD', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Comms unit on it — Ren on release, Aria updating media list.', time: '14:28', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Announcement pack on Canvas — embargo approval required.', time: '14:30', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'comms', type: 'channel' },
    { label: 'press', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Draft press release', agent: 'Ren', status: 'pending' },
    { id: 's2', title: 'Update media list', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Compile announcement checklist', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'pr/announcement-checklist.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Series A comms — release, media list, checklist.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'notion', label: 'notion_write', detail: 'pr/press-release.md', agent: 'Ren' }), delay: 520 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'pr/press-release.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'airtable', label: 'airtable_update', detail: 'Media contacts — Series A tier', agent: 'Aria' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'pr/media-list.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'pr/announcement-checklist.md', delay: 450 },
    { type: 'openArtifact', key: 'pr/announcement-checklist.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Embargo pack ready — comms lead approval required.', time: '14:34', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
