import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a, assetPath } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const HERO_DIFF = `--- a/index.html
+++ b/index.html
@@ -8,8 +8,8 @@
-  <title>Wonder — Indie Games</title>
-  <meta name="description" content="Browse indie games." />
+  <title>Wonder — Discover Indie Games on Product Hunt</title>
+  <meta name="description" content="Wonder.gg curates indie game launches. Cozy adventures, roguelikes, and narrative hits." />
   <meta property="og:title" content="Wonder — Indie Game Discovery" />
-  <meta property="og:description" content="Find games." />
+  <meta property="og:description" content="Launch-day SEO optimized for Product Hunt." />`;

const ARTIFACTS = {
  'research/serp-snapshot.html': a({
    name: 'research/serp-snapshot.html',
    ext: 'html',
    kind: 'html',
    src: assetPath('launch', 'serp-snapshot.html'),
    browserUrl: 'https://wonder.gg',
    faviconDomain: 'wonder.gg',
    content: '',
  }),
  'index-preview.html': a({
    name: 'index-preview.html',
    ext: 'html',
    kind: 'html',
    src: assetPath('launch', 'index-preview.html'),
    browserUrl: 'https://wonder.gg',
    faviconDomain: 'wonder.gg',
    content: '',
  }),
  'seo/launch-keywords.md': a({
    name: 'seo/launch-keywords.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Launch keyword map

## Primary
- wonder.gg launch
- indie game discovery platform
- product hunt games 2026

## Secondary
- cozy games steam alternative
- narrative adventure indie
- wonder.gg seo`,
  }),
  'index.html.diff': a({ name: 'index.html.diff', ext: 'diff', kind: 'diff', content: HERO_DIFF }),
  'seo-launch-report.md': a({
    name: 'seo-launch-report.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Wonder SEO Launch Report

## Executive summary
Wonder.gg is ready for Product Hunt launch with updated meta, OG tags, and a keyword map aligned to gaming discovery terms.

## Keyword clusters
- **Launch day**: indie game launch, wonder.gg, product hunt games
- **Discovery**: cozy games, narrative adventure, steam alternative

## Changes shipped
- Homepage \`title\` + \`description\` optimized
- OG tags updated for social previews
- SERP baseline captured for launch day tracking

## Review gate
Approve meta + copy before deploy.`,
  }),
};

const CANVAS_KEYS = ['index-preview.html', 'seo/launch-keywords.md', 'research/serp-snapshot.html'];

export const launchScenario: DemoScenario = {
  id: 'launch',
  org: { name: 'Wonder', domain: 'viralhooks.org', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Jordan: on it — matching tasks…', time: '14:54', system: false },
    { id: 'launch', name: 'product-launch', preview: 'Vaibhav: hey @Jordan we just launched…', time: '14:52', system: false },
    { id: 'ops', name: 'ops', preview: 'Leo: API integration review ready', time: '1h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'SEO Optimization for Wonder', col: 'inbox', tags: ['seo', 'visibility'], watchers: ['Vaibhav', 'Jordan'], comments: 2 },
    { id: 2, title: 'Create and Distribute Branded Swag', col: 'inbox', tags: ['branding', 'merchandise'], watchers: ['Aria', 'Jordan'], comments: 1 },
    { id: 3, title: 'Write blog post on AI trends', col: 'inbox', tags: ['content', 'research'], watchers: ['Ren'], comments: 0 },
    { id: 4, title: 'Improve Website User Experience', col: 'in_progress', tags: ['ux', 'ui'], watchers: ['Ren', 'Leo'], comments: 0 },
    { id: 5, title: 'Update Website with New Game Releases', col: 'in_progress', tags: ['website', 'content'], watchers: ['Vaibhav'], comments: 0 },
    { id: 6, title: 'Expand Game Categories and Tags', col: 'in_progress', tags: ['game', 'categories'], watchers: ['Vaibhav', 'Jordan'], comments: 2 },
  ],
  phase2Tasks: [
    { id: 7, title: 'Develop Social Media Strategy', col: 'in_progress', tags: ['social', 'media'], watchers: ['Aria'], comments: 0 },
    { id: 8, title: 'Design landing page mockup', col: 'review', tags: ['design', 'ui'], watchers: ['Ren', 'Jordan'], comments: 2 },
    { id: 9, title: 'API integration review', col: 'review', tags: ['dev', 'docs'], watchers: ['Leo'], comments: 2 },
    { id: 10, title: 'Capture Website Screenshots', col: 'done', tags: ['website', 'visual'], watchers: ['Jordan', 'Aria'], comments: 10 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Jordan hey...', delay: 150 },
    { type: 'typing', text: 'hey @Jordan we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Jordan we just launched Wonder on Product Hunt today 🚀 can you get the team set up for launch day?', delay: 300 },
    { type: 'nick_typing', delay: 800 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'congrats on the launch! 🎉 let me pull together everything we need — checking our playbook, past launches, and support tickets now...', time: '14:52', delay: 1400 },
    { type: 'nick_typing', delay: 1200 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: "alright, I've created 6 tasks based on what worked for our last 3 launches. SEO, content, UX improvements, website updates — the works. They're on the board now!", time: '14:53', delay: 300 },
    { type: 'addTasks', phase: 1, delay: 600 },
    { type: 'reaction', emoji: '🔥', count: 2, delay: 500 },
    { type: 'typing', text: "this is amazing. can you assign them to whoever's best?", delay: 800 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: "this is amazing. can you assign them to whoever's best? don't need to check with me", delay: 300 },
    { type: 'nick_typing', delay: 800 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: "on it — matching tasks by each agent's skillset and past performance. Aria's on social, Ren's on UX & design, Leo's handling ops...", time: '14:54', delay: 1200 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: "done! all 10 tasks assigned and the team's already working. I'll flag anything that needs your attention. go enjoy launch day 🪖💪", time: '14:55', delay: 1400 },
    { type: 'reaction', emoji: '👍', count: 3, delay: 600 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'product-launch', type: 'channel' },
    { label: 'seo', type: 'topic' },
    { label: 'visibility', type: 'topic' },
    { label: 'wonder', type: 'site', domain: 'wonder.gg' },
    { label: 'launch-day', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Audit Wonder SEO baseline & competitors', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Research Product Hunt launch keywords', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Browse wonder.gg and capture meta gaps', agent: 'Aria', status: 'pending' },
    { id: 's4', title: 'Update meta tags, OG images, sitemap', agent: 'Ren', status: 'pending' },
    { id: 's5', title: 'Commit & deploy SEO changes', agent: 'Leo', status: 'pending' },
    { id: 's6', title: 'Deliver launch SEO report to team', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'seo-launch-report.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 700 },
    { type: 'openTaskModal', taskId: 1, delay: 500 },
    { type: 'modalMsg', sender: 'Jordan', text: "Opening SEO Optimization — Aria on research, Ren on page updates, Leo on deploy.", tags: [{ label: 'product-launch', type: 'channel' }, { label: 'seo', type: 'topic' }], delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 500 },
    { type: 'tool', log: i({ id: 't1', integration: 'producthunt', label: 'producthunt_search', detail: 'wonder.gg competitor launch SEO', agent: 'Jordan' }), delay: 600 },
    { type: 'toolDone', id: 't1', delay: 450 },
    { type: 'subtask', id: 's1', status: 'done', delay: 350 },
    { type: 'subtask', id: 's2', status: 'running', delay: 300 },
    { type: 'modalMsg', sender: 'Aria', text: 'Pulling keyword clusters for launch day — gaming + discovery terms.', tags: [{ label: 'wonder', type: 'site', domain: 'wonder.gg' }, { label: 'research', type: 'topic' }], delay: 450 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_update', detail: 'Launch keyword clusters — gaming + discovery', agent: 'Aria' }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'seo/launch-keywords.md', delay: 300 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'browser_navigate', label: 'browser_navigate', detail: 'https://wonder.gg', agent: 'Aria', faviconDomain: 'wonder.gg', provider: 'Codex' }, delay: 550 },
    { type: 'toolDone', id: 't3', delay: 280 },
    { type: 'openArtifact', key: 'research/serp-snapshot.html', delay: 320 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 280 },
    { type: 'modalMsg', sender: 'Ren', text: 'Updating homepage meta + hero copy for launch day.', tags: [{ label: 'wonder', type: 'site', domain: 'wonder.gg' }, { label: 'visibility', type: 'topic' }], delay: 450 },
    { type: 'tool', log: { id: 't4', tool: 'apply_patch', label: 'apply_patch', detail: 'index.html — title, description, og:tags', agent: 'Ren', faviconDomain: 'wonder.gg', provider: 'Claude Code' }, delay: 550 },
    { type: 'toolDone', id: 't4', delay: 400 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 0 },
    { type: 'openArtifact', key: 'index.html.diff', delay: 300 },
    { type: 'tool', log: { id: 't5', tool: 'write_file', label: 'write_file', detail: 'index-preview.html', agent: 'Ren', provider: 'Claude Code' }, delay: 500 },
    { type: 'toolDone', id: 't5', delay: 350 },
    { type: 'openArtifact', key: 'index-preview.html', delay: 300 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't6', integration: 'github', label: 'github_deploy', detail: 'feat(seo): optimize Wonder PH launch pages', agent: 'Leo', provider: 'Codex' }), delay: 600 },
    { type: 'toolDone', id: 't6', delay: 380 },
    { type: 'subtask', id: 's5', status: 'done', delay: 300 },
    { type: 'subtask', id: 's6', status: 'running', delay: 280 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'seo-launch-report.md', delay: 500 },
    { type: 'openArtifact', key: 'seo-launch-report.md', delay: 200 },
    { type: 'subtask', id: 's6', status: 'done', delay: 350 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Launch checklist on Canvas — approve meta + copy before deploy.', time: '14:58', tags: [{ label: 'launch-day', type: 'goal' }, { label: 'product-launch', type: 'channel' }], delay: 500 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'SEO Optimization is in Human Review — report + live changes on the ticket Canvas.', time: '14:58', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};

export const SPOTLIGHT_TASK_TAGS = launchScenario.spotlightTaskTags;
export const DEMO_ORG = launchScenario.org;
export const DEMO_ARTIFACTS = launchScenario.artifacts;
export const SPOTLIGHT_TASK_ID = launchScenario.spotlightTaskId;
export const INITIAL_SUBTASKS = launchScenario.initialSubtasks;
export const TASK_EXEC_SCRIPT = launchScenario.taskExecScript;
