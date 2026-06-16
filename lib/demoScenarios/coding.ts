import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const DEFAULT_ORG = {
  name: 'Acme',
  domain: 'acme.dev',
  icon: VIRALHOOKS_FAVICON,
};

const STATUS_PAGE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Acme — Parser hotfix v2.4.1</title>
  <style>
    * { box-sizing: border-box; margin: 0; font-family: Inter, system-ui, sans-serif; }
    body { background: #faf9f6; color: #1c1917; padding: 24px; }
    .badge { display: inline-block; background: #f0f5e6; color: #325600; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.06em; }
    h1 { font-size: 22px; margin: 12px 0 8px; }
    p { font-size: 13px; color: #57534e; line-height: 1.5; max-width: 420px; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 20px; max-width: 480px; }
    .card { background: #fff; border: 1px solid #e7e5e4; border-radius: 10px; padding: 12px; }
    .card strong { display: block; font-size: 20px; color: #3f6b00; }
    .card span { font-size: 10px; color: #78716c; text-transform: uppercase; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <span class="badge">Deployed · staging</span>
  <h1>Invoice parser hotfix</h1>
  <p>Empty CSV rows no longer drop valid invoice lines. ETL dedupe and release assets shipped in parallel.</p>
  <div class="grid">
    <div class="card"><strong>24</strong><span>Tests passed</span></div>
    <div class="card"><strong>3</strong><span>Agents parallel</span></div>
    <div class="card"><strong>PR #418</strong><span>Awaiting merge</span></div>
  </div>
</body>
</html>`;

const OG_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3f6b00"/><stop offset="100%" stop-color="#1c1917"/></linearGradient></defs>
  <rect width="640" height="400" fill="url(#g)"/>
  <text x="40" y="80" fill="#f0f5e6" font-family="system-ui" font-size="14" font-weight="600" letter-spacing="0.2em">ACME · v2.4.1</text>
  <text x="40" y="140" fill="#fff" font-family="system-ui" font-size="36" font-weight="700">Parser hotfix shipped</text>
  <text x="40" y="180" fill="#d6d3d1" font-family="system-ui" font-size="16">Empty rows handled · ETL deduped</text>
  <rect x="40" y="220" width="180" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
  <rect x="40" y="220" width="140" height="8" rx="4" fill="#9db866"/>
</svg>`;

const ARTIFACTS = {
  'src/parser.ts.diff': {
    name: 'src/parser.ts.diff',
    ext: 'diff',
    kind: 'diff' as const,
    content: `--- a/src/parser.ts
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
 }`,
  },
  'preview/status.html': {
    name: 'preview/status.html',
    ext: 'html',
    kind: 'html' as const,
    content: STATUS_PAGE_HTML,
  },
  'assets/og-parser-fix.png': {
    name: 'assets/og-parser-fix.png',
    ext: 'png',
    kind: 'image' as const,
    caption: 'Generated OG image — Claude for copy, Codex for layout tokens',
    content: OG_IMAGE_SVG,
  },
  'video/release-demo.mp4': {
    name: 'video/release-demo.mp4',
    ext: 'mp4',
    kind: 'video' as const,
    caption: '32s screen recording — parser tests + staging deploy',
    content: `[00:00] Codex runs parser.test.ts — 24 passed
[00:08] Claude Code opens diff in harness
[00:18] Staging deploy · status page live
[00:28] PR #418 opened · checks green`,
  },
  'reports/hotfix-bundle.md': {
    name: 'reports/hotfix-bundle.md',
    ext: 'md',
    kind: 'markdown' as const,
    content: `# Hotfix bundle — parser v2.4.1

## Summary
Three agents ran in parallel on the Trooper harness: Codex on parser patch, Claude Code on status page, OpenCode on ETL dedupe.

## Deliverables
- Diff merged to \`fix/invoice-parser-null-rows\`
- OG image + 32s demo clip for release comms
- Staging status page verified

## Review gate
PR #418 awaiting your merge approval.`,
  },
};

export const codingScenario: DemoScenario = {
  id: 'coding',
  org: DEFAULT_ORG,
  channels: [
    { id: 'engineering', name: 'engineering', preview: 'Jordan: 3 agents on harness — diffs live', time: '09:18', system: false },
    { id: 'general', name: 'general', preview: 'Vaibhav: ship the hotfix today', time: '09:12', system: false },
  ],
  defaultChannel: 'engineering',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Fix invoice parser null rows', col: 'inbox', tags: ['bug', 'parser'], watchers: ['Vaibhav', 'Leo'], comments: 4 },
    { id: 2, title: 'Dedupe ETL pipeline rows', col: 'inbox', tags: ['etl', 'opencode'], watchers: ['Leo'], comments: 2 },
    { id: 3, title: 'Release assets — OG + demo clip', col: 'inbox', tags: ['creative', 'video'], watchers: ['Ren', 'Aria'], comments: 1 },
    { id: 4, title: 'Update staging status page', col: 'in_progress', tags: ['html', 'deploy'], watchers: ['Ren'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 5, title: 'Open PR #418 — parser hotfix', col: 'in_progress', tags: ['pr', 'review'], watchers: ['Leo', 'Jordan'], comments: 3 },
    { id: 6, title: 'Run full integration suite', col: 'in_progress', tags: ['ci', 'tests'], watchers: ['Leo'], comments: 0 },
    { id: 7, title: 'Merge after human approval', col: 'review', tags: ['merge', 'gate'], watchers: ['Vaibhav'], comments: 2 },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Jordan parser is dropping rows…', delay: 150 },
    { type: 'typing', text: '@Jordan invoice parser is dropping rows — spin up Codex, Claude Code, and OpenCode in parallel. I want diffs, staging page, and release assets traced.', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan invoice parser is dropping rows — spin up Codex, Claude Code, and OpenCode in parallel. I want diffs, staging page, and release assets traced.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Harness live — Codex on parser patch, Claude Code on status page, OpenCode on ETL. Creative unit on OG image + demo clip.', time: '09:13', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'typing', text: 'trace everything in the ticket — don\'t merge without my OK', delay: 600 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: "trace everything in the ticket — don't merge without my OK", delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Staging page is live, OG + video attached, PR #418 in Human Review. Full bundle on the ticket.', time: '09:18', delay: 1200 },
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
    { id: 's1', title: 'Reproduce null-row failure in parser.test.ts', agent: 'Leo', status: 'pending' },
    { id: 's2', title: 'Apply parser patch via Codex harness', agent: 'Leo', provider: 'Codex', status: 'pending' },
    { id: 's3', title: 'ETL dedupe rows via OpenCode', agent: 'Leo', provider: 'OpenCode', status: 'pending' },
    { id: 's4', title: 'Build staging status page — Claude Code', agent: 'Ren', provider: 'Claude Code', status: 'pending' },
    { id: 's5', title: 'Generate OG image for release', agent: 'Aria', status: 'pending' },
    { id: 's6', title: 'Record 32s demo clip', agent: 'Ren', status: 'pending' },
    { id: 's7', title: 'Run unit + integration tests', agent: 'Leo', provider: 'Codex', status: 'pending' },
    { id: 's8', title: 'Open PR #418 + attach bundle', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'reports/hotfix-bundle.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 650 },
    { type: 'openTaskModal', taskId: 1, delay: 480 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Parallel harness — Codex, Claude Code, OpenCode. Every artifact lands here.', tags: [{ label: 'engineering', type: 'channel' }], delay: 420 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'exec', label: 'exec', detail: 'npm test -- parser.test.ts (repro)', agent: 'Leo', provider: 'Codex' }, delay: 520 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'modalMsg', sender: 'Leo', text: 'Codex applying parser patch — filtering empty CSV rows.', tags: [{ label: 'parser', type: 'topic' }], delay: 400 },
    { type: 'tool', log: { id: 't2', tool: 'apply_patch', label: 'apply_patch', detail: 'src/parser.ts — filter empty rows', agent: 'Leo', provider: 'Codex' }, delay: 580 },
    { type: 'toolDone', id: 't2', delay: 420 },
    { type: 'openArtifact', key: 'src/parser.ts.diff', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 300 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'apply_patch', label: 'apply_patch', detail: 'etl/dedupe.ts — OpenCode harness', agent: 'Leo', provider: 'OpenCode' }, delay: 560 },
    { type: 'toolDone', id: 't3', delay: 400 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'modalMsg', sender: 'Ren', text: 'Claude Code building staging status page from hotfix metrics.', delay: 420 },
    { type: 'tool', log: { id: 't4', tool: 'write_file', label: 'write_file', detail: 'preview/status.html', agent: 'Ren', provider: 'Claude Code' }, delay: 540 },
    { type: 'toolDone', id: 't4', delay: 380 },
    { type: 'openArtifact', key: 'preview/status.html', delay: 350 },
    { type: 'subtask', id: 's4', status: 'done', delay: 300 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't5', tool: 'generate_image', label: 'generate_image', detail: 'assets/og-parser-fix.png — release OG', agent: 'Aria', provider: 'Codex' }, delay: 620 },
    { type: 'toolDone', id: 't5', delay: 450 },
    { type: 'openArtifact', key: 'assets/og-parser-fix.png', delay: 320 },
    { type: 'subtask', id: 's5', status: 'done', delay: 280 },
    { type: 'subtask', id: 's6', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't6', tool: 'record_screen', label: 'record_screen', detail: '32s — parser tests + staging deploy', agent: 'Ren' }, delay: 580 },
    { type: 'toolDone', id: 't6', delay: 420 },
    { type: 'openArtifact', key: 'video/release-demo.mp4', delay: 300 },
    { type: 'subtask', id: 's6', status: 'done', delay: 280 },
    { type: 'subtask', id: 's7', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't7', tool: 'exec', label: 'exec', detail: 'npm run test:integration', agent: 'Leo', provider: 'Codex' }, delay: 560 },
    { type: 'toolDone', id: 't7', delay: 400 },
    { type: 'subtask', id: 's7', status: 'done', delay: 280 },
    { type: 'subtask', id: 's8', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't8', tool: 'git_commit', label: 'git_commit', detail: 'fix(parser): skip empty invoice rows', agent: 'Leo', provider: 'Codex', faviconDomain: 'github.com' }, delay: 580 },
    { type: 'toolDone', id: 't8', delay: 400 },
    { type: 'deliver', name: 'reports/hotfix-bundle.md', delay: 480 },
    { type: 'openArtifact', key: 'reports/hotfix-bundle.md', delay: 250 },
    { type: 'subtask', id: 's8', status: 'done', delay: 300 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Full bundle delivered — diff, live page, OG, video, PR #418. Waiting on merge approval.', time: '09:22', delay: 480 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 420 },
    { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'Parser hotfix is in Human Review — staging page, creative assets, and PR attached.', time: '09:22', delay: 700 },
    { type: 'closeTaskModal', delay: 2800 },
  ],
};
