import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const DEFAULT_ORG = {
  name: 'Acme',
  domain: 'acme.dev',
  icon: VIRALHOOKS_FAVICON,
};

const ARTIFACTS = {
  'src/parser.ts': {
    name: 'src/parser.ts',
    ext: 'ts',
    content: `@@ -12,7 +12,9 @@ export function parseInvoice(raw: string) {
-  const rows = raw.split('\\n').map(line => line.trim());
+  const rows = raw.split('\\n')
+    .map(line => line.trim())
+    .filter(Boolean);
   return rows.map(parseRow).filter(Boolean);
 }`,
  },
  'fix/parser-patch.diff': {
    name: 'fix/parser-patch.diff',
    ext: 'diff',
    content: `--- a/src/parser.ts
+++ b/src/parser.ts
@@ Parser now handles empty lines and malformed CSV rows
+ Tests: 24 passed, 0 failed
+ Branch: fix/invoice-parser-null-rows`,
  },
};

export const codingScenario: DemoScenario = {
  id: 'coding',
  org: DEFAULT_ORG,
  channels: [
    { id: 'engineering', name: 'engineering', preview: 'Jordan: Codex + Claude Code on parser fix…', time: '09:14', system: false },
    { id: 'general', name: 'general', preview: 'Vaibhav: ship the hotfix today', time: '09:12', system: false },
  ],
  defaultChannel: 'engineering',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Fix invoice parser null rows', col: 'inbox', tags: ['bug', 'parser'], watchers: ['Vaibhav', 'Leo'], comments: 3 },
    { id: 2, title: 'Dedupe ETL pipeline rows', col: 'inbox', tags: ['etl', 'data'], watchers: ['Leo'], comments: 1 },
    { id: 3, title: 'Draft v2.4 release notes', col: 'inbox', tags: ['release', 'docs'], watchers: ['Ren'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Open PR — parser hotfix', col: 'in_progress', tags: ['pr', 'review'], watchers: ['Leo', 'Jordan'], comments: 2 },
    { id: 5, title: 'Run integration test suite', col: 'in_progress', tags: ['ci', 'tests'], watchers: ['Leo'], comments: 0 },
    { id: 6, title: 'Merge after human approval', col: 'review', tags: ['merge', 'gate'], watchers: ['Vaibhav'], comments: 1 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Jordan parser is dropping rows…', delay: 150 },
    { type: 'typing', text: '@Jordan invoice parser is dropping rows on empty CSV lines — need Claude Code + Codex on this today', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan invoice parser is dropping rows on empty CSV lines — need Claude Code + Codex on this today', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'On it — spinning up parallel coding tasks on the harness. Parser fix, ETL dedupe, and release notes queued.', time: '09:13', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'typing', text: 'assign Codex to the parser — I want diffs traced in the ticket', delay: 600 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'assign Codex to the parser — I want diffs traced in the ticket', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Done — Leo on parser patch, parallel ETL run, PR opened for your review gate.', time: '09:14', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '✅', count: 2, delay: 400 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Leo',
  spotlightTaskTags: [
    { label: 'engineering', type: 'channel' },
    { label: 'parser', type: 'topic' },
    { label: 'codex', type: 'topic' },
    { label: 'acme', type: 'site', domain: 'github.com' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Reproduce null-row failure in parser.test.ts', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Apply patch via Claude Code harness', agent: 'Leo', status: 'pending' },
    { id: 's3', title: 'Run unit + integration tests', agent: 'Leo', status: 'pending' },
    { id: 's4', title: 'Open PR and attach diff to ticket', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'fix/parser-patch.diff',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Parser hotfix — Leo on Codex harness, all diffs traced here.', tags: [{ label: 'engineering', type: 'channel' }], delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'read_file', label: 'read_file', detail: 'src/parser.ts', agent: 'Leo', faviconDomain: 'github.com' }, delay: 500 },
    { type: 'toolDone', id: 't1', delay: 350 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't2', tool: 'apply_patch', label: 'apply_patch', detail: 'filter empty CSV rows before parseRow', agent: 'Leo', faviconDomain: 'github.com' }, delay: 550 },
    { type: 'toolDone', id: 't2', delay: 400 },
    { type: 'openArtifact', key: 'src/parser.ts', delay: 250 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't3', tool: 'exec', label: 'exec', detail: 'npm test -- parser.test.ts', agent: 'Leo', faviconDomain: 'github.com' }, delay: 550 },
    { type: 'toolDone', id: 't3', delay: 400 },
    { type: 'subtask', id: 's3', status: 'done', delay: 300 },
    { type: 'subtask', id: 's4', status: 'running', delay: 280 },
    { type: 'tool', log: { id: 't4', tool: 'git_commit', label: 'git_commit', detail: 'fix(parser): skip empty invoice rows', agent: 'Leo', faviconDomain: 'github.com' }, delay: 550 },
    { type: 'toolDone', id: 't4', delay: 380 },
    { type: 'deliver', name: 'fix/parser-patch.diff', delay: 450 },
    { type: 'openArtifact', key: 'fix/parser-patch.diff', delay: 200 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'PR ready — 24 tests passing. Waiting on your merge approval.', time: '09:18', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'Parser fix is in Human Review — diff + test log attached on the ticket.', time: '09:18', delay: 600 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
