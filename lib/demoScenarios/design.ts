import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a, DEMO_MEDIA } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const BRAND_DIFF = `--- a/brand/colors.css
+++ b/brand/colors.css
@@ -3,8 +3,8 @@
-  --brand-primary: #2563eb;
-  --brand-accent: #7c3aed;
+  --brand-primary: #3f6b00;
+  --brand-accent: #284800;
   --brand-surface: #faf9f6;
-  --brand-muted: #64748b;
+  --brand-muted: #57534e;
 }`;

const ARTIFACTS = {
  'design/brand-mockup.html': a({
    name: 'design/brand-mockup.html',
    ext: 'html',
    kind: 'html',
    browserUrl: 'https://northstar.io/brand-preview',
    faviconDomain: 'northstar.io',
    content: '<!-- Brand refresh hero mockup -->',
  }),
  'design/hero-carousel.png': a({
    name: 'design/hero-carousel.png',
    ext: 'png',
    kind: 'image',
    src: DEMO_MEDIA.linkedinCarousel,
    caption: 'Hero carousel — slide 1 of 3',
  }),
  'design/brand-guidelines.diff': a({
    name: 'design/brand-guidelines.diff',
    ext: 'diff',
    kind: 'diff',
    content: BRAND_DIFF,
  }),
  'design/brand-checklist.md': a({
    name: 'design/brand-checklist.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Brand refresh checklist

- [x] Figma frames exported
- [x] Hero carousel assets
- [x] Color token patch
- [ ] Stakeholder sign-off before deploy`,
  }),
};

const CANVAS_KEYS = ['design/brand-mockup.html', 'design/hero-carousel.png', 'design/brand-guidelines.diff', 'design/brand-checklist.md'];

export const designScenario: DemoScenario = {
  id: 'design',
  org: { name: 'Studio', domain: 'studio.design', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'design', name: 'design', preview: 'Ren: brand refresh on the board', time: '10:12', system: false },
    { id: 'general', name: 'general', preview: 'Jordan: Figma export complete', time: '10:08', system: false },
  ],
  defaultChannel: 'design',
  phase1Tasks: [
    { id: 1, title: 'Q2 brand refresh — hero + tokens', col: 'inbox', tags: ['brand', 'figma'], watchers: ['Vaibhav', 'Ren'], comments: 2 },
    { id: 2, title: 'Export carousel assets', col: 'in_progress', tags: ['creative', 'export'], watchers: ['Ren'], comments: 1 },
    { id: 3, title: 'Update brand guidelines diff', col: 'inbox', tags: ['tokens', 'css'], watchers: ['Ren'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Stakeholder review', col: 'review', tags: ['approval', 'brand'], watchers: ['Jordan'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan brand refresh — Figma frames, carousel, and token patch today', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan brand refresh — Figma frames, carousel, and token patch today', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Design unit on it — Ren exporting from Figma, token diff ready for review.', time: '10:10', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Brand pack on Canvas — approve before we ship assets.', time: '10:12', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'design', type: 'channel' },
    { label: 'brand', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Export Figma frames', agent: 'Ren', status: 'pending' },
    { id: 's2', title: 'Generate carousel PNG', agent: 'Ren', provider: 'Codex', status: 'pending' },
    { id: 's3', title: 'Patch brand token diff', agent: 'Ren', status: 'pending' },
    { id: 's4', title: 'Compile brand checklist', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'design/brand-checklist.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Brand refresh — Figma export, carousel, token patch.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'figma', label: 'figma_export', detail: 'Brand refresh frames → design/brand-mockup.html', agent: 'Ren' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'setWorkspaceMode', mode: 'ide', delay: 200 },
    { type: 'openArtifact', key: 'design/brand-mockup.html', delay: 320 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'figma', label: 'figma_export', detail: 'Hero carousel PNG', agent: 'Ren', provider: 'Codex' }), delay: 520 },
    { type: 'toolDone', id: 't2', delay: 380 },
    { type: 'openArtifact', key: 'design/hero-carousel.png', delay: 300 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'apply_patch', label: 'apply_patch', detail: 'brand/colors.css — token refresh', agent: 'Ren' }, delay: 520 },
    { type: 'toolDone', id: 't3', delay: 380 },
    { type: 'openArtifact', key: 'design/brand-guidelines.diff', delay: 300 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'design/brand-checklist.md', delay: 450 },
    { type: 'openArtifact', key: 'design/brand-checklist.md', delay: 220 },
    { type: 'subtask', id: 's4', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Brand pack ready — approve before deploy.', time: '10:16', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
