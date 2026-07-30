import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a } from '../assets/helpers';
import { BROWSER_FRAMES } from '../assets/svg';
import { i } from '../lib/demoIntegrations';
import type { DemoScenario } from './types';

/**
 * Live browser work — the agent signs into a tool that has no API worth using,
 * reads the numbers off the screen, and files a report. The right panel is the
 * screenshot stream the whole way through.
 */

const ARTIFACTS = {
  'reports/launch-week-signups.md': a({
    name: 'reports/launch-week-signups.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Launch week — signup sources

Pulled from Wonder Analytics by hand: the export API only covers aggregate
totals, so per-source conversion had to come off the dashboard.

## Where signups came from

| Source | Signups | Conv. | Notes |
|---|---|---|---|
| Product Hunt | 612 | **11.4%** | Launch-day spike, tapering by Thursday |
| Organic search | 318 | 5.1% | Mostly \`indie game discovery\` |
| Direct | 201 | 4.7% | Likely PH readers returning |
| Reddit | 84 | 3.2% | One r/indiegaming thread |
| Newsletter | 32 | **9.8%** | Small list, best-converting after PH |

**Total: 1,247 signups from 18,402 sessions (6.8%).**

## What this changes

1. Product Hunt converted at more than double organic — worth a second
   launch on a sibling product rather than more SEO spend this month.
2. The newsletter is the quiet winner. 32 signups is noise, but 9.8% on a
   list of 327 says the list is worth growing.
3. Reddit underperformed enough that I wouldn't chase it again unmoderated.

> Caveat: the dashboard attributes on last touch, so Product Hunt is
> almost certainly absorbing credit from organic. Treat the split as
> directional.`,
  }),
};

export const browserWorkScenario: DemoScenario = {
  id: 'browser-work',
  org: { name: 'Wonder', domain: 'viralhooks.org', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Aria: pulling the numbers now…', time: '09:14', system: false },
    { id: 'growth', name: 'growth', preview: 'Vaibhav: how did launch week go?', time: '09:12', system: false },
    { id: 'ops', name: 'ops', preview: 'Leo: analytics seat provisioned', time: '2h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Pull launch week signup numbers', col: 'inbox', tags: ['analytics', 'growth'], watchers: ['Vaibhav', 'Aria'], comments: 1, priority: 'urgent', assignee: 'Aria', age: '1 minute', progress: 'planning', linkedGoal: 'Launch week' },
    { id: 2, title: 'Reconcile Stripe payouts', col: 'inbox', tags: ['finance'], watchers: ['Leo'], comments: 0, priority: 'medium', assignee: 'Leo', age: '22 minutes' },
    { id: 3, title: 'Refresh the press kit', col: 'inbox', tags: ['brand'], watchers: ['Ren'], comments: 0, priority: 'low', assignee: 'Ren', age: 'about 2 hours' },
    { id: 4, title: 'Answer launch-day support backlog', col: 'in_progress', tags: ['support'], watchers: ['Jordan'], comments: 3, priority: 'high', assignee: 'Jordan', age: 'about 1 hour', progress: { done: 12, total: 19 } },
    { id: 5, title: 'Tag PH commenters for follow-up', col: 'in_progress', tags: ['growth'], watchers: ['Aria'], comments: 0, priority: 'medium', assignee: 'Aria', age: '41 minutes', progress: { done: 2, total: 5 } },
  ],
  phase2Tasks: [
    { id: 6, title: 'Draft the launch retro', col: 'in_progress', tags: ['retro'], watchers: ['Jordan'], comments: 1, priority: 'medium', assignee: 'Jordan', age: '3 minutes', progress: 'planning' },
    { id: 7, title: 'Cancel the paid Reddit test', col: 'review', tags: ['growth', 'spend'], watchers: ['Aria', 'Leo'], comments: 2, priority: 'high', assignee: 'Leo', age: 'about 3 hours', progress: { done: 3, total: 3 } },
    { id: 8, title: 'Send launch numbers to investors', col: 'done', tags: ['comms'], watchers: ['Vaibhav'], comments: 4, priority: 'low', assignee: 'Vaibhav', age: '1 day', progress: { done: 4, total: 4 }, artifactCount: 2 },
  ],
  browserSession: {
    domain: 'app.wonderanalytics.com',
    source: 'Chrome extension',
    frames: [
      { id: 'f1', svg: BROWSER_FRAMES.login, action: 'Signing in with the shared analytics seat', url: 'app.wonderanalytics.com/login', time: '09:14:02' },
      { id: 'f2', svg: BROWSER_FRAMES.dashboard, action: 'Overview loaded — reading top-line metrics', url: 'app.wonderanalytics.com/overview', time: '09:14:09' },
      { id: 'f3', svg: BROWSER_FRAMES.filter, action: 'Filtering to last 7 days, grouping by source', url: 'app.wonderanalytics.com/overview?range=7d', time: '09:14:21' },
      { id: 'f4', svg: BROWSER_FRAMES.export, action: 'Exporting the source breakdown as CSV', url: 'app.wonderanalytics.com/export', time: '09:14:38' },
    ],
  },
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Aria launch numbers?', delay: 150 },
    { type: 'typing', text: 'hey @Aria can you pull our launch week signup numbers? analytics has no useful API', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Aria can you pull our launch week signup numbers? analytics has no useful API', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Aria', role: 'Growth & Marketing', text: "no API needed — I'll just use the dashboard the way you would. signing in now, you'll see the browser on the right.", time: '09:14', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '👀', count: 2, delay: 450 },
    { type: 'typing', text: 'perfect. break it down by source if you can', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'perfect. break it down by source if you can', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Aria', role: 'Growth & Marketing', text: 'on it — grouping by source and exporting the raw rows so the numbers are checkable.', time: '09:15', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'growth', type: 'channel' },
    { label: 'analytics', type: 'topic' },
    { label: 'wonder', type: 'site', domain: 'wonder.gg' },
    { label: 'launch-week', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Sign in to Wonder Analytics', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Read top-line launch metrics', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Group signups by source', agent: 'Aria', status: 'pending' },
    { id: 's4', title: 'Export the raw rows', agent: 'Aria', status: 'pending' },
    { id: 's5', title: 'Write up what it means', agent: 'Aria', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'reports/launch-week-signups.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'reasoning', agent: 'Aria', text: "Wonder Analytics exposes totals over its API but not per-source conversion, which is the only number actually worth having. Rather than approximate it, I'll drive the dashboard in a real browser the way a person would — slower, but the figures will be the ones on screen.", delay: 600 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'browser_navigate', label: 'browser_open', detail: 'app.wonderanalytics.com', agent: 'Aria', provider: 'Codex', faviconDomain: 'wonderanalytics.com', durationMs: 1200, result: ['Chrome extension attached to tab 3', 'session restored from saved credential'] }, delay: 500 },
    { type: 'browserFrame', delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'browserFrame', delay: 800 },
    { type: 'modalMsg', sender: 'Aria', text: '18,402 sessions and 1,247 signups for the week — 6.8% overall.', time: '09:14', delay: 500 },
    { type: 'subtask', id: 's2', status: 'done', delay: 320 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't2', tool: 'browser_click', label: 'browser_click', detail: 'Date range → Last 7 days', agent: 'Aria', provider: 'Codex', durationMs: 640, result: ['clicked [data-range="7d"]', 'table re-rendered with 5 source rows'] }, delay: 450 },
    { type: 'browserFrame', delay: 700 },
    { type: 'toolDone', id: 't2', delay: 320 },
    { type: 'reasoning', agent: 'Aria', text: 'Product Hunt is converting at 11.4% against organic at 5.1%. Worth flagging that this dashboard attributes on last touch, so PH is probably absorbing some organic credit — I will not present the split as exact.', delay: 620 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'browserFrame', delay: 700 },
    { type: 'tool', log: { id: 't3', tool: 'browser_download', label: 'browser_download', detail: 'launch-week-signups.csv', agent: 'Aria', provider: 'Codex', durationMs: 2100, result: ['downloaded launch-week-signups.csv (4.2 KB)', '5 source rows, 7 columns', 'checksum verified against on-screen totals'] }, delay: 450 },
    { type: 'toolDone', id: 't3', delay: 330 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't4', integration: 'googlesheets', label: 'sheets_append', detail: 'Growth tracker → Launch week', agent: 'Aria', durationMs: 1400, result: ['5 rows appended', 'conversion column formatted as %'], wrote: { name: 'reports/launch-week-signups.md', ext: 'md' } }), delay: 480 },
    { type: 'toolDone', id: 't4', delay: 340 },
    { type: 'deliver', name: 'reports/launch-week-signups.md', delay: 450 },
    { type: 'openArtifact', key: 'reports/launch-week-signups.md', delay: 250 },
    { type: 'subtask', id: 's5', status: 'done', delay: 320 },
    { type: 'modalMsg', sender: 'Aria', text: 'Report is up. Flagging the last-touch caveat rather than burying it — the PH/organic split is directional, not exact.', time: '09:16', delay: 520 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Aria', role: 'Growth & Marketing', text: 'Launch week numbers are in Human Review — 1,247 signups, Product Hunt converting at 11.4%.', time: '09:16', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
