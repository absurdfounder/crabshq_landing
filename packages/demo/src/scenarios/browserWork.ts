import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a } from '../assets/helpers';
import { CLAIM_TABS } from '../workspaces/BrowserClaimPanes';
import { i } from '../lib/demoIntegrations';
import type { DemoScenario } from './types';

/**
 * Live browser work — the agent drives real product UIs (Gmail → Stripe →
 * QuickBooks → Notion), the same claim panes the marketing capability shows.
 */

const ARTIFACTS = {
  'finance/q3-ledger-close.md': a({
    name: 'finance/q3-ledger-close.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Q3 ledger close — pulled from live tools

No useful export APIs on the seats we actually use, so this was driven in a
real browser: inbox → Stripe → QuickBooks → Notion checklist.

## Sources touched

| Tool | What was read | Result |
|---|---|---|
| Gmail | “Q3 ledger” thread + QuickBooks / Stripe mail | Close pack located |
| Stripe | Succeeded payments · last 30 days | $18,420 payout confirmed |
| QuickBooks | Chart of Accounts · accrual | Balances exported |
| Notion | Finance wiki · close checklist | 2 items still open |

## Flags

1. Stripe payout of **$18,420** matches the QBO cash line within $12 — rounding
   on foreign cards, not a miss.
2. Notion still has two open close items (AP aging, deferred revenue note).
   Not blocking the pack, but worth a human before the board deck.

> Ready for Human Review. Numbers are the ones on screen, not an API estimate.`,
  }),
};

const [gmail, stripe, qbo, notion] = CLAIM_TABS;

export const browserWorkScenario: DemoScenario = {
  id: 'browser-work',
  org: { name: 'Wonder', domain: 'wonderdesk.ai', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Aria: pulling the ledger across tools…', time: '09:14', system: false },
    { id: 'finance', name: 'finance', preview: 'Vaibhav: need the Q3 close pack', time: '09:12', system: false },
    { id: 'ops', name: 'ops', preview: 'Leo: Stripe + QBO seats ready', time: '2h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Pull Q3 ledger from live tools', col: 'inbox', tags: ['finance', 'close'], watchers: ['Vaibhav', 'Aria'], comments: 1, priority: 'urgent', assignee: 'Aria', age: '1 minute', progress: 'planning', linkedGoal: 'Board pack' },
    { id: 2, title: 'Reconcile Stripe payouts', col: 'inbox', tags: ['finance'], watchers: ['Leo'], comments: 0, priority: 'medium', assignee: 'Leo', age: '22 minutes' },
    { id: 3, title: 'Refresh the press kit', col: 'inbox', tags: ['brand'], watchers: ['Ren'], comments: 0, priority: 'low', assignee: 'Ren', age: 'about 2 hours' },
    { id: 4, title: 'Answer launch-day support backlog', col: 'in_progress', tags: ['support'], watchers: ['Jordan'], comments: 3, priority: 'high', assignee: 'Jordan', age: 'about 1 hour', progress: { done: 12, total: 19 } },
    { id: 5, title: 'Tag PH commenters for follow-up', col: 'in_progress', tags: ['growth'], watchers: ['Aria'], comments: 0, priority: 'medium', assignee: 'Aria', age: '41 minutes', progress: { done: 2, total: 5 } },
  ],
  phase2Tasks: [
    { id: 6, title: 'Draft the close memo', col: 'in_progress', tags: ['finance'], watchers: ['Jordan'], comments: 1, priority: 'medium', assignee: 'Jordan', age: '3 minutes', progress: 'planning' },
    { id: 7, title: 'Cancel the paid Reddit test', col: 'review', tags: ['growth', 'spend'], watchers: ['Aria', 'Leo'], comments: 2, priority: 'high', assignee: 'Leo', age: 'about 3 hours', progress: { done: 3, total: 3 } },
    { id: 8, title: 'Send close pack to investors', col: 'done', tags: ['comms'], watchers: ['Vaibhav'], comments: 4, priority: 'low', assignee: 'Vaibhav', age: '1 day', progress: { done: 4, total: 4 }, artifactCount: 2 },
  ],
  browserSession: {
    domain: gmail.domain,
    source: 'Chrome extension',
    frames: [
      { id: 'f1', claimTab: 'gmail', action: gmail.action, url: gmail.url, time: '09:14:02' },
      { id: 'f2', claimTab: 'stripe', action: stripe.action, url: stripe.url, time: '09:14:18' },
      { id: 'f3', claimTab: 'qbo', action: qbo.action, url: qbo.url, time: '09:14:34' },
      { id: 'f4', claimTab: 'notion', action: notion.action, url: notion.url, time: '09:14:51' },
    ],
  },
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Aria Q3 ledger?', delay: 150 },
    { type: 'typing', text: 'hey @Aria can you pull the Q3 ledger close? the tools we use barely have APIs', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Aria can you pull the Q3 ledger close? the tools we use barely have APIs', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Aria', role: 'Growth & Marketing', text: "no API needed — I'll drive Gmail, Stripe, QuickBooks, and Notion the way you would. browser's on the right.", time: '09:14', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '👀', count: 2, delay: 450 },
    { type: 'typing', text: 'perfect. flag anything that does not reconcile', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'perfect. flag anything that does not reconcile', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Aria', role: 'Growth & Marketing', text: 'on it — matching Stripe payouts to QBO, then checking the Notion close list.', time: '09:15', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Aria',
  spotlightTaskTags: [
    { label: 'finance', type: 'channel' },
    { label: 'close', type: 'topic' },
    { label: 'wonder', type: 'site', domain: 'wonderdesk.ai' },
    { label: 'board-pack', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Find the ledger thread in Gmail', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Filter Stripe succeeded payments', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Export QuickBooks Chart of Accounts', agent: 'Aria', status: 'pending' },
    { id: 's4', title: 'Check Notion close checklist', agent: 'Aria', status: 'pending' },
    { id: 's5', title: 'Write up what reconciles', agent: 'Aria', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'finance/q3-ledger-close.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'reasoning', agent: 'Aria', text: "None of these seats expose a clean export for the close pack. Fastest honest path is driving the real UIs — Gmail for the thread, Stripe for payouts, QuickBooks for balances, Notion for what's still open.", delay: 600 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'browser_navigate', label: 'browser_open', detail: gmail.url, agent: 'Aria', provider: 'Codex', faviconDomain: gmail.domain, durationMs: 1200, result: ['Chrome extension attached to tab 3', 'inbox focused · unread: 2'] }, delay: 500 },
    { type: 'browserFrame', delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't2', tool: 'browser_navigate', label: 'browser_open', detail: stripe.url, agent: 'Aria', provider: 'Codex', faviconDomain: stripe.domain, durationMs: 980, result: ['opened Payments', 'filter: Succeeded · last 30 days'] }, delay: 450 },
    { type: 'browserFrame', delay: 800 },
    { type: 'toolDone', id: 't2', delay: 320 },
    { type: 'modalMsg', sender: 'Aria', text: 'Stripe shows a $18,420 payout on the way — matching against QuickBooks next.', time: '09:14', delay: 500 },
    { type: 'subtask', id: 's2', status: 'done', delay: 320 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'browser_navigate', label: 'browser_open', detail: qbo.url, agent: 'Aria', provider: 'Codex', faviconDomain: qbo.domain, durationMs: 1100, result: ['Chart of Accounts open', 'accrual basis · Wonder Studio'] }, delay: 450 },
    { type: 'browserFrame', delay: 700 },
    { type: 'toolDone', id: 't3', delay: 320 },
    { type: 'reasoning', agent: 'Aria', text: 'Cash line is within $12 of the Stripe payout after FX rounding — close enough that I will not raise a variance. Exporting the CoA CSV for the pack.', delay: 620 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't4', tool: 'browser_navigate', label: 'browser_open', detail: notion.url, agent: 'Aria', provider: 'Codex', faviconDomain: notion.domain, durationMs: 900, result: ['Finance wiki open', 'close checklist: 2 items remaining'] }, delay: 450 },
    { type: 'browserFrame', delay: 700 },
    { type: 'toolDone', id: 't4', delay: 330 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't5', integration: 'notion', label: 'notion_write', detail: 'finance/q3-ledger-close.md', agent: 'Aria', durationMs: 1400, result: ['close memo drafted', 'two open Notion items flagged'], wrote: { name: 'finance/q3-ledger-close.md', ext: 'md' } }), delay: 480 },
    { type: 'toolDone', id: 't5', delay: 340 },
    { type: 'deliver', name: 'finance/q3-ledger-close.md', delay: 450 },
    { type: 'openArtifact', key: 'finance/q3-ledger-close.md', delay: 250 },
    { type: 'subtask', id: 's5', status: 'done', delay: 320 },
    { type: 'modalMsg', sender: 'Aria', text: 'Close pack is up. Stripe ↔ QBO reconciles; Notion still has two open checklist items — flagged, not buried.', time: '09:16', delay: 520 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Aria', role: 'Growth & Marketing', text: 'Q3 ledger close is in Human Review — pulled live from Gmail, Stripe, QuickBooks, and Notion.', time: '09:16', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
