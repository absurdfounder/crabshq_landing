import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const PARSER_DIFF = `--- a/src/parser.ts
+++ b/src/parser.ts
@@ -12,7 +12,9 @@ export function parseInvoice(raw: string) {
-  const rows = raw.split('\\n').map(line => line.trim());
+  const rows = raw.split('\\n')
+    .map(line => line.trim())
+    .filter(Boolean);
   return rows.map(parseRow).filter(Boolean);
 }
@@ -28,6 +30,8 @@ export function parseRow(line: string) {
+  if (!line.length) return null;
   const cols = line.split(',');
   if (cols.length < 3) return null;
   return { id: cols[0], amount: parseFloat(cols[2]) };
 }`;

const DEDUPE_DIFF = `--- a/etl/dedupe.ts
+++ b/etl/dedupe.ts
@@ -41,6 +41,9 @@ export function dedupeRows(rows: Row[]) {
   const seen = new Set<string>();
   return rows.filter(row => {
+    if (!row.id?.trim()) return false;
     const key = \`\${row.id}:\${row.batchId}\`;
     if (seen.has(key)) return false;
     seen.add(key);
     return true;
   });
 }`;

const TESTS_DIFF = `--- a/tests/parser.test.ts
+++ b/tests/parser.test.ts
@@ -18,6 +18,14 @@ describe('parseInvoice', () => {
     expect(result).toHaveLength(2);
   });
+
+  it('skips empty CSV rows without dropping valid lines', () => {
+    const raw = 'id,sku,amount\\n\\nINV-1,A,10\\n, ,\\nINV-2,B,20';
+    expect(parseInvoice(raw)).toEqual([
+      { id: 'INV-1', amount: 10 },
+      { id: 'INV-2', amount: 20 },
+    ]);
+  });
 });`;

const TEST_REPRO_LOG = `$ npm test -- parser.test.ts

> acme-billing@2.4.0 test
> vitest run parser.test.ts

 FAIL  tests/parser.test.ts
  ✗ skips empty CSV rows (expected 2 invoices, got 0)

  1 failed | 23 passed`;

const CI_LOG = `$ npm run test:integration

> acme-billing@2.4.0 test:integration
> vitest run --config vitest.integration.config.ts

 ✓ parser.integration.test.ts (8 tests) 2.1s
 ✓ etl/dedupe.integration.test.ts (5 tests) 1.4s

 Test Files  2 passed (2)
      Tests  13 passed (13)

 CI · green · ready for PR #418`;

const ARTIFACTS = {
  'logs/test-repro.log': a({ name: 'logs/test-repro.log', ext: 'log', kind: 'code', content: TEST_REPRO_LOG }),
  'src/parser.ts.diff': a({ name: 'src/parser.ts.diff', ext: 'diff', kind: 'diff', content: PARSER_DIFF }),
  'etl/dedupe.ts.diff': a({ name: 'etl/dedupe.ts.diff', ext: 'diff', kind: 'diff', content: DEDUPE_DIFF }),
  'tests/parser.test.ts.diff': a({ name: 'tests/parser.test.ts.diff', ext: 'diff', kind: 'diff', content: TESTS_DIFF }),
  'logs/ci-integration.log': a({ name: 'logs/ci-integration.log', ext: 'log', kind: 'code', content: CI_LOG }),
  'pull-requests/418-body.md': a({
    name: 'pull-requests/418-body.md',
    ext: 'md',
    kind: 'markdown',
    content: `# PR #418 — fix(parser): skip empty invoice rows

## Summary
Production CSVs include blank lines that caused the invoice parser to drop valid rows. This hotfix filters empty lines and adds regression coverage.

## Changes
- \`src/parser.ts\` — filter empty rows after trim
- \`etl/dedupe.ts\` — ignore rows with empty ids (OpenCode harness)
- \`tests/parser.test.ts\` — new empty-row regression case

## Verification
- \`npm test -- parser.test.ts\` — 24 passed
- \`npm run test:integration\` — 13 passed

## Review gate
Awaiting merge approval from @Vaibhav`,
  }),
  'reports/hotfix-bundle.md': a({
    name: 'reports/hotfix-bundle.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Hotfix bundle — parser v2.4.1

## Summary
Codex, Claude Code, and OpenCode ran in parallel on the Trooper harness — parser patch, ETL dedupe, and test coverage.

## Deliverables
- Unified diffs for parser + dedupe + tests
- Integration CI log (green)
- PR #418 body attached

## Review gate
Merge PR #418 after your approval.`,
  }),
};

const CANVAS_KEYS = [
  'src/parser.ts.diff',
  'etl/dedupe.ts.diff',
  'logs/ci-integration.log',
  'pull-requests/418-body.md',
];

export const codingScenario: DemoScenario = {
  id: 'coding',
  org: { name: 'Acme', domain: 'acme.dev', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'engineering', name: 'engineering', preview: 'Jordan: 3 harnesses on parser hotfix', time: '09:18', system: false },
    { id: 'general', name: 'general', preview: 'Vaibhav: ship the hotfix today', time: '09:12', system: false },
  ],
  defaultChannel: 'engineering',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Fix invoice parser null rows', col: 'inbox', tags: ['bug', 'parser'], watchers: ['Vaibhav', 'Leo'], comments: 4 },
    { id: 2, title: 'Dedupe ETL pipeline rows', col: 'inbox', tags: ['etl', 'opencode'], watchers: ['Leo'], comments: 2 },
    { id: 3, title: 'Add regression tests', col: 'inbox', tags: ['tests', 'claude'], watchers: ['Ren'], comments: 1 },
    { id: 4, title: 'Run integration CI', col: 'in_progress', tags: ['ci', 'codex'], watchers: ['Leo'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 5, title: 'Open PR #418 — parser hotfix', col: 'in_progress', tags: ['pr', 'review'], watchers: ['Leo', 'Jordan'], comments: 3 },
    { id: 6, title: 'Merge after human approval', col: 'review', tags: ['merge', 'gate'], watchers: ['Vaibhav'], comments: 2 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Jordan parser is dropping rows…', delay: 150 },
    { type: 'typing', text: '@Jordan invoice parser is dropping rows on empty CSV lines — spin up Codex, Claude Code, and OpenCode. I want diffs and a PR, traced.', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan invoice parser is dropping rows on empty CSV lines — spin up Codex, Claude Code, and OpenCode. I want diffs and a PR, traced.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Harness live — Codex on parser patch, OpenCode on ETL dedupe, Claude Code on regression tests. Everything lands on the ticket.', time: '09:13', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'typing', text: "don't merge without my OK", delay: 600 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: "trace everything in the ticket — don't merge without my OK", delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'CI green, PR #418 in Human Review — open Canvas on the ticket for the full bundle.', time: '09:18', delay: 1200 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '🚀', count: 2, delay: 400 },
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
    { id: 's1', title: 'Reproduce null-row failure in parser.test.ts', agent: 'Leo', provider: 'Codex', status: 'pending' },
    { id: 's2', title: 'Apply parser patch via Codex harness', agent: 'Leo', provider: 'Codex', status: 'pending' },
    { id: 's3', title: 'ETL dedupe rows via OpenCode', agent: 'Leo', provider: 'OpenCode', status: 'pending' },
    { id: 's4', title: 'Add regression tests — Claude Code', agent: 'Ren', provider: 'Claude Code', status: 'pending' },
    { id: 's5', title: 'Run integration CI suite', agent: 'Leo', provider: 'Codex', status: 'pending' },
    { id: 's6', title: 'Open PR #418 + attach bundle', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'reports/hotfix-bundle.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 650 },
    { type: 'openTaskModal', taskId: 1, delay: 480 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Parallel harness — Codex, Claude Code, OpenCode. Diffs and CI trace land here.', tags: [{ label: 'engineering', type: 'channel' }], delay: 420 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'exec', label: 'exec', detail: 'npm test -- parser.test.ts (repro)', agent: 'Leo', provider: 'Codex' }, delay: 520 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'logs/test-repro.log', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'modalMsg', sender: 'Leo', text: 'Codex applying parser patch — filtering empty CSV rows.', tags: [{ label: 'parser', type: 'topic' }], delay: 400 },
    { type: 'tool', log: { id: 't2', tool: 'apply_patch', label: 'apply_patch', detail: 'src/parser.ts — filter empty rows', agent: 'Leo', provider: 'Codex' }, delay: 580 },
    { type: 'toolDone', id: 't2', delay: 420 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 0 },
    { type: 'openArtifact', key: 'src/parser.ts.diff', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'apply_patch', label: 'apply_patch', detail: 'etl/dedupe.ts — OpenCode harness', agent: 'Leo', provider: 'OpenCode' }, delay: 560 },
    { type: 'toolDone', id: 't3', delay: 400 },
    { type: 'openArtifact', key: 'etl/dedupe.ts.diff', delay: 280 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'modalMsg', sender: 'Ren', text: 'Claude Code adding regression case for empty CSV rows.', delay: 420 },
    { type: 'tool', log: { id: 't4', tool: 'write_file', label: 'write_file', detail: 'tests/parser.test.ts — empty row cases', agent: 'Ren', provider: 'Claude Code' }, delay: 540 },
    { type: 'toolDone', id: 't4', delay: 380 },
    { type: 'openArtifact', key: 'tests/parser.test.ts.diff', delay: 300 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't5', tool: 'exec', label: 'exec', detail: 'npm run test:integration', agent: 'Leo', provider: 'Codex' }, delay: 560 },
    { type: 'toolDone', id: 't5', delay: 400 },
    { type: 'openArtifact', key: 'logs/ci-integration.log', delay: 280 },
    { type: 'subtask', id: 's5', status: 'done', delay: 280 },
    { type: 'subtask', id: 's6', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't6', integration: 'github', label: 'github_commit', detail: 'fix(parser): skip empty invoice rows', agent: 'Leo', provider: 'Codex' }), delay: 580 },
    { type: 'toolDone', id: 't6', delay: 400 },
    { type: 'tool', log: i({ id: 't7', integration: 'linear', label: 'linear_update', detail: 'ENG-418 → In Review · PR linked', agent: 'Claude Code', provider: 'Claude Code' }), delay: 520 },
    { type: 'toolDone', id: 't7', delay: 380 },
    { type: 'openArtifact', key: 'pull-requests/418-body.md', delay: 280 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'reports/hotfix-bundle.md', delay: 480 },
    { type: 'openArtifact', key: 'reports/hotfix-bundle.md', delay: 250 },
    { type: 'subtask', id: 's6', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'PR bundle on Canvas — diffs, CI log, and PR body. Waiting on merge approval.', time: '09:22', delay: 480 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 420 },
    { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'Parser hotfix is in Human Review — open the ticket Canvas for the full PR bundle.', time: '09:22', delay: 700 },
    { type: 'closeTaskModal', delay: 2800 },
  ],
};
