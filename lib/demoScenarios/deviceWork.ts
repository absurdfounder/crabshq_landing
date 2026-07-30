import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { DESKTOP_SCREEN } from '@/lib/demoScenarioAssets/svg';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

/**
 * Desk work on a real machine — the agent wakes an enrolled Mac, opens a
 * native app that has no API at all, does the job on it, and hands back a file.
 * Also drives the routine graph, since this task is triggered by a schedule.
 */

const ARTIFACTS = {
  'finance/q3-forecast.md': a({
    name: 'finance/q3-forecast.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Q3 forecast — rolled forward

Built on **Studio-Mac** because the model lives in a Numbers file with
linked sheets that no export preserves. The agent opened the real app.

## Regional roll-up

| Region | Q2 actual | Q3 forecast | Δ |
|---|---|---|---|
| North America | $412k | $486k | **+18%** |
| EMEA | $268k | $301k | +12% |
| APAC | $147k | $139k | **−5%** |
| LATAM | $64k | $88k | **+38%** |
| **Total** | **$891k** | **$1.014M** | **+14%** |

## Notes

1. APAC is the only region forecast down. Two enterprise renewals slipped
   out of the quarter — they're in the model as Q4, not lost.
2. LATAM's +38% is off a small base. It's real but it's $24k.
3. Crossing $1M for the first time depends entirely on the two NA
   renewals landing in-quarter. Worth a nudge from someone senior.

## How this was produced

\`\`\`
$ open -a Numbers ~/Finance/Q3-forecast.numbers
$ osascript -e 'tell application "Numbers" to recalculate'
$ export → PDF
\`\`\`

> The linked-sheet structure breaks on CSV export, which is why this runs
> on the machine rather than through an API.`,
  }),
};

export const deviceWorkScenario: DemoScenario = {
  id: 'device-work',
  org: { name: 'Wonder', domain: 'viralhooks.org', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Leo: Studio-Mac is awake…', time: '07:02', system: false },
    { id: 'finance', name: 'finance', preview: 'Routine: Q3 forecast refresh', time: '07:00', system: false },
    { id: 'ops', name: 'ops', preview: 'Leo: 3 devices online', time: '3h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Roll the Q3 forecast forward', col: 'inbox', tags: ['finance', 'device'], watchers: ['Vaibhav', 'Leo'], comments: 1, priority: 'urgent', assignee: 'Leo', age: '1 minute', progress: 'planning', linkedGoal: 'Board pack' },
    { id: 2, title: 'Reconcile the Stripe payout file', col: 'inbox', tags: ['finance'], watchers: ['Leo'], comments: 0, priority: 'medium', assignee: 'Leo', age: '18 minutes' },
    { id: 3, title: 'Refresh the cap table export', col: 'inbox', tags: ['legal'], watchers: ['Jordan'], comments: 0, priority: 'low', assignee: 'Jordan', age: 'about 1 hour' },
    { id: 4, title: 'Chase the two NA renewals', col: 'in_progress', tags: ['sales'], watchers: ['Aria'], comments: 4, priority: 'high', assignee: 'Aria', age: 'about 3 hours', progress: { done: 1, total: 2 } },
    { id: 5, title: 'Draft the board pack narrative', col: 'in_progress', tags: ['comms'], watchers: ['Jordan'], comments: 2, priority: 'medium', assignee: 'Jordan', age: 'about 5 hours', progress: { done: 3, total: 6 } },
  ],
  phase2Tasks: [
    { id: 6, title: 'Verify device backups ran', col: 'in_progress', tags: ['ops', 'device'], watchers: ['Leo'], comments: 0, priority: 'low', assignee: 'Leo', age: '2 minutes', progress: 'planning' },
    { id: 7, title: 'Sign off the forecast', col: 'review', tags: ['finance'], watchers: ['Vaibhav', 'Leo'], comments: 3, priority: 'high', assignee: 'Vaibhav', age: 'about 6 hours', progress: { done: 2, total: 2 } },
    { id: 8, title: 'Archive Q2 actuals', col: 'done', tags: ['finance'], watchers: ['Leo'], comments: 1, priority: 'low', assignee: 'Leo', age: '3 days', progress: { done: 5, total: 5 }, artifactCount: 4 },
  ],
  desktopSession: {
    deviceName: 'Studio-Mac',
    os: 'macOS 15.2',
    status: 'busy',
    screenSvg: DESKTOP_SCREEN,
    appName: 'Numbers — Q3-forecast.numbers',
    terminalLines: [],
    activities: [
      { label: 'Wake requested by routine' },
      { label: 'Screen recording permission granted' },
    ],
  },
  workflowGraph: {
    name: 'Monthly forecast refresh',
    nodes: [
      { id: 'n1', label: 'First business day, 07:00', kind: 'trigger', x: 16, y: 12 },
      { id: 'n2', label: 'Is Studio-Mac reachable?', kind: 'if', x: 16, y: 100 },
      { id: 'n3', label: 'Wake device & open Numbers', kind: 'then', x: 16, y: 188 },
      { id: 'n4', label: 'Recalculate and read regions', kind: 'ai', x: 196, y: 188 },
      { id: 'n5', label: 'Write forecast + flag risks', kind: 'ai', x: 196, y: 100 },
      { id: 'n6', label: 'Send to Human Review', kind: 'then', x: 196, y: 12 },
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
    { type: 'mention_tab', text: 'Routine: Monthly forecast refresh', delay: 150 },
    { type: 'typing', text: 'morning @Leo — is the Q3 forecast ready for the board pack?', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'morning @Leo — is the Q3 forecast ready for the board pack?', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Leo', role: 'Operations & Finance', text: "the routine already fired at 07:00. Studio-Mac is awake and Numbers is open — the model has linked sheets that don't survive export, so this one runs on the machine.", time: '07:02', delay: 1400 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '🖥️', count: 2, delay: 450 },
    { type: 'typing', text: 'perfect. flag anything that looks off', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'perfect. flag anything that looks off', delay: 300 },
    { type: 'nick_typing', delay: 650 },
    { type: 'response', sender: 'Leo', role: 'Operations & Finance', text: 'will do — reading the regions now.', time: '07:03', delay: 1000 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'finance', type: 'channel' },
    { label: 'forecast', type: 'topic' },
    { label: 'studio-mac', type: 'topic' },
    { label: 'board-pack', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Wake Studio-Mac', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Open the forecast in Numbers', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Recalculate and read the regions', agent: 'Leo', status: 'pending' },
    { id: 's4', title: 'Export the PDF', agent: 'Leo', status: 'pending' },
    { id: 's5', title: 'Write it up and flag risks', agent: 'Leo', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'finance/q3-forecast.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'nodeActive', nodeId: 'n1', delay: 420 },
    { type: 'nodeActive', nodeId: 'n2', delay: 480 },
    { type: 'reasoning', agent: 'Leo', text: "This model lives in Numbers with sheets linked across four files. Every export path I've tried flattens the links and silently zeroes the roll-up, so the only honest way to refresh it is to open the real app on the machine that has the files.", delay: 640 },
    { type: 'subtask', id: 's1', status: 'running', delay: 380 },
    { type: 'nodeActive', nodeId: 'n3', delay: 450 },
    { type: 'desktopStep', lines: ['$ trooper device wake studio-mac', 'sending wake-on-lan to a4:83:e7:2c:11:9f', 'device responded in 4.2s', 'seat acquired · screen 1 (2560×1440)'], activity: 'Woke Studio-Mac', delay: 620 },
    { type: 'tool', log: { id: 't1', tool: 'device_wake', label: 'device_wake', detail: 'Studio-Mac · macOS 15.2', agent: 'Leo', provider: 'Codex', durationMs: 4200, result: ['wake-on-lan acknowledged', 'agent seat attached to screen 1', 'screen recording permission already granted'] }, delay: 420 },
    { type: 'toolDone', id: 't1', delay: 320 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'desktopStep', lines: ['$ open -a Numbers ~/Finance/Q3-forecast.numbers', 'Numbers 14.2 launched', 'workbook opened · 4 linked sheets resolved'], activity: 'Opened Q3-forecast.numbers', delay: 620 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'desktopStep', lines: ["$ osascript -e 'tell application \"Numbers\" to recalculate'", 'recalculated 1,842 cells in 2.8s', 'reading regional roll-up…'], activity: 'Recalculated the model', delay: 700 },
    { type: 'nodeActive', nodeId: 'n4', delay: 450 },
    { type: 'modalMsg', sender: 'Leo', text: 'Total lands at $1.014M, up 14%. APAC is the only region down — two enterprise renewals slipped to Q4.', time: '07:05', delay: 520 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'desktopStep', lines: ['$ export → PDF', 'wrote Q3-forecast.pdf (312 KB)', 'uploaded to workspace files'], activity: 'Exported the PDF', delay: 640 },
    { type: 'tool', log: i({ id: 't2', integration: 'notion', label: 'notion_attach', detail: 'Q3-forecast.pdf → Board / 2026-Q3', agent: 'Leo', durationMs: 3100, result: ['uploaded 312 KB', 'linked on the Board pack page'] }), delay: 420 },
    { type: 'toolDone', id: 't2', delay: 320 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'nodeActive', nodeId: 'n5', delay: 480 },
    { type: 'reasoning', agent: 'Leo', text: "Crossing $1M depends entirely on the two North America renewals closing in-quarter. That's a single point of failure behind a headline number, so it goes in the notes rather than the summary — whoever reads this should know the forecast is conditional.", delay: 640 },
    { type: 'deliver', name: 'finance/q3-forecast.md', delay: 460 },
    { type: 'openArtifact', key: 'finance/q3-forecast.md', delay: 250 },
    { type: 'subtask', id: 's5', status: 'done', delay: 320 },
    { type: 'nodeActive', nodeId: 'n6', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Leo', role: 'Operations & Finance', text: 'Q3 forecast is in Human Review — $1.014M, +14%. Flagged that it hangs on two NA renewals.', time: '07:06', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
