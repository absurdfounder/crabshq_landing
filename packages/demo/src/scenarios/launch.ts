import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a, assetPath } from '../assets/helpers';
import { i } from '../lib/demoIntegrations';
import type { DemoScenario } from './types';

const HERO_DIFF = `--- a/index.html
+++ b/index.html
@@ -8,8 +8,8 @@
-  <title>Wonderdesk | AI Help Center</title>
-  <meta name="description" content="Help docs for your product." />
+  <title>Wonderdesk | AI Help Center & Knowledge Base Software</title>
+  <meta name="description" content="Wonderdesk drafts and updates documentation when your product changes. Review, publish, done." />
   <meta property="og:title" content="Wonderdesk — Self-updating docs" />
-  <meta property="og:description" content="AI help center." />
+  <meta property="og:description" content="Launch-day SEO for Product Hunt — self-updating knowledge base." />`;

/** Real desktop capture of wonderdesk.ai — never a coded Google/SERP mock. */
const WONDERDESK_SHOT = assetPath('launch', 'wonderdesk-home.jpg');

const ARTIFACTS = {
  'research/wonderdesk-home.jpg': a({
    name: 'research/wonderdesk-home.jpg',
    ext: 'jpg',
    kind: 'image',
    src: WONDERDESK_SHOT,
    browserUrl: 'https://wonderdesk.ai',
    faviconDomain: 'wonderdesk.ai',
    caption: 'Live capture — wonderdesk.ai before meta updates',
  }),
  'index-preview.jpg': a({
    name: 'index-preview.jpg',
    ext: 'jpg',
    kind: 'image',
    src: WONDERDESK_SHOT,
    browserUrl: 'https://wonderdesk.ai',
    faviconDomain: 'wonderdesk.ai',
    caption: 'Homepage preview after meta + OG updates',
  }),
  'seo/launch-keywords.md': a({
    name: 'seo/launch-keywords.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Launch keyword map

Pulled from Product Hunt launch data for the top AI help-center / docs tools of
the last 18 months, cross-checked against **wonderdesk.ai**'s current rankings.

## Primary cluster

| Keyword | Volume | Difficulty | We rank |
|---|---|---|---|
| AI help center software | 6,400 | 28 | — |
| self-updating knowledge base | 2,100 | 19 | #12 |
| wonderdesk.ai | 1,300 | 4 | #1 |
| AI documentation tool | 4,800 | 31 | — |

## Secondary cluster

| Keyword | Volume | Difficulty | Intent |
|---|---|---|---|
| intercom alternative docs | 3,900 | 36 | comparison |
| automatic help article updates | 1,400 | 22 | discovery |
| product changelog generator | 2,200 | 27 | discovery |

## Where they go

1. \`AI help center software\` → homepage \`<title>\` and H1
2. \`self-updating knowledge base\` → hero + OG description
3. \`intercom alternative docs\` → comparison landing (not built yet)

> Difficulty is Ahrefs KD. Anything under 35 is winnable inside a quarter with
> the content we already have.`,
  }),
  'index.html.diff': a({ name: 'index.html.diff', ext: 'diff', kind: 'diff', content: HERO_DIFF }),
  'seo-launch-report.md': a({
    name: 'seo-launch-report.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Wonderdesk SEO Launch Report

**Status:** ready to deploy · **Owner:** Aria · **Reviewed by:** Ren, Leo

## Executive summary

wonderdesk.ai is launch-ready. Homepage meta, OG tags and the sitemap are updated
against a keyword map built from recent Product Hunt help-center launches.
A live homepage capture is attached so meta changes can be reviewed against the
real page — not a mock.

## What shipped

| Change | File | Status |
|---|---|---|
| \`<title>\` + meta description | \`index.html\` | shipped |
| OG title / description / image | \`index.html\` | shipped |
| Sitemap regenerated (42 URLs) | \`sitemap.xml\` | shipped |
| Comparison landing pages | — | **not started** |

- [x] Audit baseline and competitors
- [x] Research launch keywords
- [x] Capture wonderdesk.ai homepage
- [x] Update meta, OG, sitemap
- [x] Commit and deploy
- [ ] Comparison landing pages (next sprint)

## Before / after

\`\`\`html
<!-- before -->
<title>Wonderdesk | AI Help Center</title>
<meta name="description" content="Help docs for your product." />

<!-- after -->
<title>Wonderdesk | AI Help Center & Knowledge Base Software</title>
<meta name="description" content="Wonderdesk drafts and updates documentation
  when your product changes. Review, publish, done." />
\`\`\`

## Baseline to beat

| Metric | Before | Target (30d) |
|---|---|---|
| Indexed pages | 18 | 42 |
| Ranking keywords | 6 | 40 |
| Avg. position | 71 | < 30 |

## Review gate

Approve meta + copy before deploy. Hero keeps *"Self-updating knowledge base"*
over the keyword-exact *"AI help center software"* — flag if you disagree.`,
  }),
};

const CANVAS_KEYS = ['index-preview.jpg', 'seo/launch-keywords.md', 'research/wonderdesk-home.jpg'];

export const launchScenario: DemoScenario = {
  id: 'launch',
  org: { name: 'Wonder', domain: 'wonderdesk.ai', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Jordan: on it — matching tasks…', time: '14:54', system: false },
    { id: 'launch', name: 'product-launch', preview: 'Vaibhav: hey @Jordan we just launched…', time: '14:52', system: false },
    { id: 'ops', name: 'ops', preview: 'Leo: API integration review ready', time: '1h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'SEO Optimization for Wonder', col: 'inbox', tags: ['seo', 'visibility'], watchers: ['Vaibhav', 'Jordan'], comments: 2, priority: 'urgent', assignee: 'Aria', age: '2 minutes', linkedGoal: 'Launch day', progress: 'planning' },
    { id: 2, title: 'Create and Distribute Branded Swag', col: 'inbox', tags: ['branding', 'merchandise'], watchers: ['Aria', 'Jordan'], comments: 1, priority: 'low', assignee: 'Aria', age: '2 minutes', linkedProject: 'Wonder' },
    { id: 3, title: 'Write blog post on AI trends', col: 'inbox', tags: ['content', 'research'], watchers: ['Ren'], comments: 0, priority: 'medium', assignee: 'Ren', age: '3 minutes', linkedProject: 'Wonder' },
    { id: 4, title: 'Improve Website User Experience', col: 'in_progress', tags: ['ux', 'ui'], watchers: ['Ren', 'Leo'], comments: 0, priority: 'high', assignee: 'Ren', age: 'about 1 hour', progress: { done: 2, total: 5 }, linkedGoal: 'Launch day' },
    { id: 5, title: 'Update Website with New Game Releases', col: 'in_progress', tags: ['website', 'content'], watchers: ['Vaibhav'], comments: 0, priority: 'medium', assignee: 'Leo', age: '48 minutes', progress: { done: 1, total: 4 } },
    { id: 6, title: 'Expand Game Categories and Tags', col: 'in_progress', tags: ['game', 'categories'], watchers: ['Vaibhav', 'Jordan'], comments: 2, priority: 'low', assignee: 'Jordan', age: 'about 2 hours', progress: { done: 3, total: 6 }, artifactCount: 2 },
  ],
  phase2Tasks: [
    { id: 7, title: 'Develop Social Media Strategy', col: 'in_progress', tags: ['social', 'media'], watchers: ['Aria'], comments: 0, priority: 'high', assignee: 'Aria', age: '1 minute', progress: 'planning', linkedGoal: 'Launch day' },
    { id: 8, title: 'Design landing page mockup', col: 'review', tags: ['design', 'ui'], watchers: ['Ren', 'Jordan'], comments: 2, priority: 'medium', assignee: 'Ren', age: 'about 3 hours', progress: { done: 4, total: 4 }, artifactCount: 3 },
    { id: 9, title: 'API integration review', col: 'review', tags: ['dev', 'docs'], watchers: ['Leo'], comments: 2, priority: 'low', assignee: 'Leo', age: 'about 4 hours', progress: { done: 5, total: 5 }, artifactCount: 1 },
    { id: 10, title: 'Capture Website Screenshots', col: 'done', tags: ['website', 'visual'], watchers: ['Jordan', 'Aria'], comments: 10, priority: 'low', assignee: 'Jordan', age: '1 day', progress: { done: 6, total: 6 }, artifactCount: 8 },
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
    { label: 'wonder', type: 'site', domain: 'wonderdesk.ai' },
    { label: 'launch-day', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Audit Wonder SEO baseline & competitors', agent: 'Jordan', status: 'pending' },
    { id: 's2', title: 'Research Product Hunt launch keywords', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Browse wonderdesk.ai and capture meta gaps', agent: 'Aria', status: 'pending' },
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
    { type: 'reasoning', agent: 'Jordan', text: "Launch day means the SERP is the front door. Before touching anything I want to see what the top AI help-center launches actually rank for — guessing keywords on launch morning is how you end up optimising for terms nobody searches.", delay: 700 },
    { type: 'tool', log: i({ id: 't1', integration: 'producthunt', label: 'producthunt_search', detail: 'wonderdesk.ai competitor launch SEO', agent: 'Jordan', durationMs: 3400, result: ['40 launches scanned (18 months)', 'top shared terms: AI help center, knowledge base, docs automation', '31/40 lead with a benefit, not a category', 'median title length: 54 chars'] }), delay: 600 },
    { type: 'toolDone', id: 't1', delay: 450 },
    { type: 'subtask', id: 's1', status: 'done', delay: 350 },
    { type: 'subtask', id: 's2', status: 'running', delay: 300 },
    { type: 'modalMsg', sender: 'Aria', text: 'Pulling keyword clusters for launch day — help center + docs terms.', tags: [{ label: 'wonder', type: 'site', domain: 'wonderdesk.ai' }, { label: 'research', type: 'topic' }], delay: 450 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_update', detail: 'Launch keyword clusters — help center + docs', agent: 'Aria', durationMs: 2100, result: ['7 keywords written to "Launch keywords" tab', 'primary cluster: 4 terms, avg KD 25', 'secondary cluster: 3 terms, avg KD 28'], wrote: { name: 'seo/launch-keywords.md', ext: 'md' } }), delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'seo/launch-keywords.md', delay: 300 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'browser_navigate', label: 'browser_navigate', detail: 'https://wonderdesk.ai', agent: 'Aria', faviconDomain: 'wonderdesk.ai', provider: 'Codex', durationMs: 1800, result: ['captured wonderdesk.ai homepage (1440×1146)', 'title short · meta thin', 'og:image present', 'H1: Self-updating knowledge base'] }, delay: 550 },
    { type: 'toolDone', id: 't3', delay: 280 },
    { type: 'openArtifact', key: 'research/wonderdesk-home.jpg', delay: 320 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 280 },
    { type: 'modalMsg', sender: 'Ren', text: 'Updating homepage meta + OG copy for launch day.', tags: [{ label: 'wonder', type: 'site', domain: 'wonderdesk.ai' }, { label: 'visibility', type: 'topic' }], delay: 450 },
    { type: 'reasoning', agent: 'Ren', text: "Aria's map says benefit-led titles beat category-exact ones on this SERP. Keeping \"Self-updating knowledge base\" in the hero and putting the exact-match phrasing in the <title> + meta description. Flagging it in the report rather than deciding it silently.", delay: 620 },
    { type: 'tool', log: { id: 't4', tool: 'apply_patch', label: 'apply_patch', detail: 'index.html — title, description, og:tags', agent: 'Ren', faviconDomain: 'wonderdesk.ai', provider: 'Claude Code', durationMs: 900, result: ['index.html  +3 −3', 'title, meta description, og:description rewritten', 'lint: clean'], wrote: { name: 'index.html.diff', ext: 'diff' } }, delay: 550 },
    { type: 'toolDone', id: 't4', delay: 400 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 0 },
    { type: 'openArtifact', key: 'index.html.diff', delay: 300 },
    { type: 'tool', log: { id: 't5', tool: 'write_file', label: 'write_file', detail: 'index-preview.jpg', agent: 'Ren', provider: 'Claude Code', durationMs: 640, result: ['wrote index-preview.jpg capture', 'homepage preview attached for review'], wrote: { name: 'index-preview.jpg', ext: 'jpg' } }, delay: 500 },
    { type: 'toolDone', id: 't5', delay: 350 },
    { type: 'openArtifact', key: 'index-preview.jpg', delay: 300 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 280 },
    { type: 'tool', log: i({ id: 't6', integration: 'github', label: 'github_deploy', detail: 'feat(seo): optimize Wonder PH launch pages', agent: 'Leo', provider: 'Codex', durationMs: 41200, result: ['commit 8f2a1c9 pushed to main', 'CI: 12/12 checks passed', 'deployed to wonderdesk.ai in 38s', 'sitemap.xml regenerated — 42 URLs'] }), delay: 600 },
    { type: 'toolDone', id: 't6', delay: 380 },
    { type: 'subtask', id: 's5', status: 'done', delay: 300 },
    { type: 'subtask', id: 's6', status: 'running', delay: 280 },
    { type: 'deliver', name: 'seo-launch-report.md', delay: 500 },
    { type: 'openArtifact', key: 'seo-launch-report.md', delay: 200 },
    { type: 'subtask', id: 's6', status: 'done', delay: 350 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Launch report ready — approve meta + copy before we call it done.', time: '14:58', tags: [{ label: 'launch-day', type: 'goal' }, { label: 'product-launch', type: 'channel' }], delay: 500 },
    { type: 'closeTaskModal', delay: 900 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'SEO Optimization is in Human Review — report + live homepage preview are on the ticket.', time: '14:58', delay: 650 },
  ],
};

export const SPOTLIGHT_TASK_TAGS = launchScenario.spotlightTaskTags;
export const DEMO_ORG = launchScenario.org;
export const DEMO_ARTIFACTS = launchScenario.artifacts;
export const SPOTLIGHT_TASK_ID = launchScenario.spotlightTaskId;
export const INITIAL_SUBTASKS = launchScenario.initialSubtasks;
export const TASK_EXEC_SCRIPT = launchScenario.taskExecScript;
