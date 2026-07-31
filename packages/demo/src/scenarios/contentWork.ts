import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a, assetPath } from '../assets/helpers';
import { CAT_BREEDS_ARTICLE } from '../assets/contentCatBreedsArticle';
import type { DemoScenario } from './types';

/**
 * Editorial workflow — agents follow a content playbook (brief → research →
 * draft → illustrate → human gate) and ship a real illustrated article.
 */

const ARTIFACTS = {
  'content/cat-breeds-article.md': a({
    name: 'content/cat-breeds-article.md',
    ext: 'md',
    kind: 'markdown',
    content: CAT_BREEDS_ARTICLE,
  }),
  'content/persian.jpg': a({
    name: 'content/persian.jpg',
    ext: 'jpg',
    kind: 'image',
    src: assetPath('content', 'persian.jpg'),
    caption: 'Persian — Monet study',
  }),
  'content/siamese.jpg': a({
    name: 'content/siamese.jpg',
    ext: 'jpg',
    kind: 'image',
    src: assetPath('content', 'siamese.jpg'),
    caption: 'Siamese — Monet study',
  }),
  'content/maine-coon.jpg': a({
    name: 'content/maine-coon.jpg',
    ext: 'jpg',
    kind: 'image',
    src: assetPath('content', 'maine-coon.jpg'),
    caption: 'Maine Coon — Monet study',
  }),
  'content/brief.md': a({
    name: 'content/brief.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Brief — Six cats in Monet’s light

## Angle
Impressionist breed portraits — not show-ring specimens. Light, texture, atmosphere.

## Deliverables
- Long-form article with six illustrated sections
- Persian, Siamese, Maine Coon, Bengal, Scottish Fold, Sphynx
- Human review before publish

## Voice
Literary, precise, no SEO stuffing.`,
  }),
};

const CANVAS_KEYS = [
  'content/brief.md',
  'content/persian.jpg',
  'content/siamese.jpg',
  'content/maine-coon.jpg',
  'content/cat-breeds-article.md',
];

export const contentWorkScenario: DemoScenario = {
  id: 'content-work',
  org: { name: 'Wonder', domain: 'wonderdesk.ai', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Ren: Monet cats article on Canvas…', time: '11:18', system: false },
    { id: 'content', name: 'content', preview: 'Vaibhav: six breeds, Impressionist eye', time: '11:14', system: false },
    { id: 'ops', name: 'ops', preview: 'Jordan: editorial playbook ready', time: '2h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Write Monet cats breed article', col: 'inbox', tags: ['content', 'editorial'], watchers: ['Vaibhav', 'Ren'], comments: 2, priority: 'urgent', assignee: 'Ren', age: '2 minutes', progress: 'planning', linkedGoal: 'Blog pack' },
    { id: 2, title: 'Illustrate six breed studies', col: 'inbox', tags: ['creative', 'image'], watchers: ['Ren'], comments: 0, priority: 'high', assignee: 'Ren', age: '4 minutes' },
    { id: 3, title: 'Fact-check breed notes', col: 'inbox', tags: ['research'], watchers: ['Aria'], comments: 1, priority: 'medium', assignee: 'Aria', age: '12 minutes' },
    { id: 4, title: 'Schedule social cutdowns', col: 'in_progress', tags: ['social'], watchers: ['Aria'], comments: 0, priority: 'low', assignee: 'Aria', age: 'about 1 hour', progress: { done: 0, total: 3 } },
    { id: 5, title: 'Refresh brand voice sheet', col: 'in_progress', tags: ['brand'], watchers: ['Jordan'], comments: 1, priority: 'medium', assignee: 'Jordan', age: 'about 3 hours', progress: { done: 2, total: 4 } },
  ],
  phase2Tasks: [
    { id: 6, title: 'Human review — publish gate', col: 'review', tags: ['review'], watchers: ['Vaibhav', 'Jordan'], comments: 3, priority: 'high', assignee: 'Vaibhav', age: '1 minute' },
    { id: 7, title: 'Ship to help center / blog', col: 'in_progress', tags: ['publish'], watchers: ['Leo'], comments: 0, priority: 'medium', assignee: 'Leo', age: '8 minutes', progress: 'planning' },
    { id: 8, title: 'Archive prior breed draft', col: 'done', tags: ['content'], watchers: ['Ren'], comments: 1, priority: 'low', assignee: 'Ren', age: '2 days', progress: { done: 4, total: 4 }, artifactCount: 3 },
  ],
  workflowGraph: {
    name: 'Editorial playbook',
    nodes: [
      { id: 'n1', label: 'Brief approved', kind: 'trigger', x: 16, y: 8 },
      { id: 'n2', label: 'Needs illustrations?', kind: 'if', x: 16, y: 92 },
      { id: 'n3', label: 'Research six breeds', kind: 'then', x: 16, y: 176 },
      { id: 'n4', label: 'Draft the article', kind: 'ai', x: 188, y: 176 },
      { id: 'n5', label: 'Generate Monet studies', kind: 'ai', x: 188, y: 92 },
      { id: 'n6', label: 'Human review gate', kind: 'then', x: 188, y: 8 },
    ],
    edges: [
      { from: 'n1', to: 'n2' },
      { from: 'n2', to: 'n3', label: 'yes' },
      { from: 'n3', to: 'n4' },
      { from: 'n4', to: 'n5' },
      { from: 'n5', to: 'n6' },
    ],
  },
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Ren Monet cats piece?', delay: 150 },
    { type: 'typing', text: 'hey @Ren — write the six-breed Monet article. follow the editorial playbook, illustrations included.', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Ren — write the six-breed Monet article. follow the editorial playbook, illustrations included.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Ren', role: 'Product', text: "on it — running the editorial playbook. brief → research → draft → illustrations → your review.", time: '11:15', delay: 1400 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '🎨', count: 2, delay: 450 },
    { type: 'typing', text: 'persian first — that coat is the whole point', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'persian first — that coat is the whole point', delay: 300 },
    { type: 'nick_typing', delay: 650 },
    { type: 'response', sender: 'Ren', role: 'Product', text: 'agreed — drafting now. Canvas will get the article + studies.', time: '11:17', delay: 1000 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'content', type: 'channel' },
    { label: 'editorial', type: 'topic' },
    { label: 'blog-pack', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Confirm editorial brief', agent: 'Ren', status: 'pending' },
    { id: 's2', title: 'Research six breeds', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Draft the Monet article', agent: 'Ren', provider: 'Claude Code', status: 'pending' },
    { id: 's4', title: 'Generate breed illustrations', agent: 'Ren', provider: 'Codex', status: 'pending' },
    { id: 's5', title: 'Assemble Canvas pack', agent: 'Ren', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'content/cat-breeds-article.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'nodeActive', nodeId: 'n1', delay: 420 },
    { type: 'subtask', id: 's1', status: 'running', delay: 320 },
    { type: 'openArtifact', key: 'content/brief.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'nodeActive', nodeId: 'n2', delay: 420 },
    { type: 'nodeActive', nodeId: 'n3', delay: 450 },
    { type: 'subtask', id: 's2', status: 'running', delay: 300 },
    { type: 'reasoning', agent: 'Aria', text: 'Six breeds, six distinct light problems — coat refraction for Persian, twilight architecture for Siamese, landscape mass for Maine Coon. Keeping show-ring anatomy soft so the piece stays about atmosphere.', delay: 640 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'nodeActive', nodeId: 'n4', delay: 450 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't1', tool: 'write_file', label: 'write_file', detail: 'content/cat-breeds-article.md', agent: 'Ren', provider: 'Claude Code', durationMs: 1800, result: ['drafted 6 breed sections', 'closing essay attached'], wrote: { name: 'cat-breeds-article.md', ext: 'md' } }, delay: 520 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'content/cat-breeds-article.md', delay: 320 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'nodeActive', nodeId: 'n5', delay: 450 },
    { type: 'subtask', id: 's4', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'generate_image', label: 'generate_image', detail: 'Persian · Monet study', agent: 'Ren', provider: 'Codex', durationMs: 2200, result: ['persian.jpg · 1200×896'], wrote: { name: 'persian.jpg', ext: 'jpg' } }, delay: 520 },
    { type: 'toolDone', id: 't2', delay: 360 },
    { type: 'openArtifact', key: 'content/persian.jpg', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'generate_image', label: 'generate_image', detail: 'Siamese + Maine Coon studies', agent: 'Ren', provider: 'Codex', durationMs: 2400, result: ['siamese.jpg', 'maine-coon.jpg'] }, delay: 480 },
    { type: 'toolDone', id: 't3', delay: 360 },
    { type: 'openArtifact', key: 'content/siamese.jpg', delay: 260 },
    { type: 'subtask', id: 's4', status: 'done', delay: 280 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'deliver', name: 'content/cat-breeds-article.md', delay: 420 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 350 },
    { type: 'subtask', id: 's5', status: 'done', delay: 300 },
    { type: 'nodeActive', nodeId: 'n6', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Ren', role: 'Product', text: 'Monet cats article is in Human Review — six breeds, illustrations on Canvas. Persian first, as requested.', time: '11:22', delay: 650 },
    { type: 'closeTaskModal', delay: 2400 },
  ],
};
