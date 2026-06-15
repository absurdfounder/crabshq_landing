import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'content/q2-campaign-brief.md': {
    name: 'content/q2-campaign-brief.md',
    ext: 'md',
    content: `# Q2 Campaign Brief

## Theme
AI-native ops for lean teams

## Channels
- LinkedIn carousel (3 posts)
- SEO pillar: "command layer for agents"
- Email nurture sequence (5 touches)`,
  },
  'seo/keyword-map.md': {
    name: 'seo/keyword-map.md',
    ext: 'md',
    content: `# Keyword map — Q2

## Primary
- ai agent ops platform
- multi-agent task board

## Content gaps
- competitor comparison pages
- launch-day SEO checklist`,
  },
};

export const marketingScenario: DemoScenario = {
  id: 'marketing',
  org: { name: 'Northstar', domain: 'northstar.io', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'marketing', name: 'marketing', preview: 'Aria: Q2 campaign tasks on the board', time: '11:02', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: SEO recon complete', time: '10:58', system: false },
  ],
  defaultChannel: 'marketing',
  phase1Tasks: [
    { id: 1, title: 'Q2 campaign content calendar', col: 'inbox', tags: ['campaign', 'content'], watchers: ['Vaibhav', 'Aria'], comments: 2 },
    { id: 2, title: 'SEO recon — competitor keywords', col: 'inbox', tags: ['seo', 'research'], watchers: ['Aria'], comments: 1 },
    { id: 3, title: 'LinkedIn carousel draft', col: 'inbox', tags: ['social', 'linkedin'], watchers: ['Ren'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Pillar page outline', col: 'in_progress', tags: ['seo', 'content'], watchers: ['Aria'], comments: 0 },
    { id: 5, title: 'Brand voice check on drafts', col: 'review', tags: ['brand', 'review'], watchers: ['Jordan'], comments: 2 },
    { id: 6, title: 'Schedule social posts', col: 'in_progress', tags: ['social', 'schedule'], watchers: ['Ren'], comments: 0 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan kick off Q2 campaign — need content, SEO, and social in parallel', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan kick off Q2 campaign — need content, SEO, and social in parallel', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Campaign unit mobilized — Aria on SEO recon, Ren on social drafts, content calendar loading now.', time: '11:01', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 800 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Board updated — pillar outline in progress, brand review queued for your sign-off.', time: '11:02', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '🚀', count: 2, delay: 400 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'marketing', type: 'channel' },
    { label: 'campaign', type: 'topic' },
    { label: 'q2-launch', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Audit competitor landing pages', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Build Q2 content calendar', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Draft LinkedIn carousel copy', agent: 'Ren', status: 'pending' },
    { id: 's4', title: 'Deliver campaign brief', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'content/q2-campaign-brief.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Q2 campaign — coordinating Aria on research and Ren on social.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'web_search', label: 'web_search', detail: 'ai agent ops competitor keywords 2026', agent: 'Aria', faviconDomain: 'google.com' }, delay: 550 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'write_file', label: 'write_file', detail: 'seo/keyword-map.md', agent: 'Aria' }, delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'openArtifact', key: 'seo/keyword-map.md', delay: 250 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'write_file', label: 'write_file', detail: 'LinkedIn carousel — 3 slides', agent: 'Ren' }, delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 280 },
    { type: 'deliver', name: 'content/q2-campaign-brief.md', delay: 450 },
    { type: 'openArtifact', key: 'content/q2-campaign-brief.md', delay: 200 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Campaign brief delivered — review pillar outline when ready.', time: '11:06', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 1800 },
  ],
};
