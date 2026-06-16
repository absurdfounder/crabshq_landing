import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const ARTIFACTS = {
  'bd/partner-research.md': a({
    name: 'bd/partner-research.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Partner research — CloudScale

## Fit
- 12k mid-market customers on AWS marketplace
- Complementary: infra automation, we bring agent ops layer

## Stakeholders
- **Maya Patel** — VP Partnerships
- **Tom Reed** — CTO`,
  }),
  'bd/partnership-brief.md': a({
    name: 'bd/partnership-brief.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Partnership brief — CloudScale co-sell

## Proposal
Joint GTM: Trooper agent ops + CloudScale deployment automation

## Mutual value
- CloudScale: upsell AI workforce to existing base
- Trooper: distribution via AWS marketplace listing`,
  }),
  'bd/intro-email.md': a({
    name: 'bd/intro-email.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Intro email — Maya Patel

Hi Maya,

Following up on the AWS marketplace overlap — we'd love to explore a co-sell motion.

**Hook:** Shared mid-market ICP, complementary automation stacks
**CTA:** 20-min partnership intro next week

**Gate:** Approve before send.`,
  }),
};

const CANVAS_KEYS = ['bd/partner-research.md', 'bd/partnership-brief.md', 'bd/intro-email.md'];

export const bdScenario: DemoScenario = {
  id: 'bd',
  org: { name: 'Partners', domain: 'partners.co', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'bd', name: 'partnerships', preview: 'Jordan: CloudScale brief ready', time: '11:20', system: false },
    { id: 'general', name: 'general', preview: 'Aria: partner research done', time: '11:18', system: false },
  ],
  defaultChannel: 'bd',
  phase1Tasks: [
    { id: 1, title: 'CloudScale partnership outreach', col: 'inbox', tags: ['partner', 'research'], watchers: ['Vaibhav', 'Aria'], comments: 1 },
    { id: 2, title: 'Draft partnership brief', col: 'in_progress', tags: ['brief', 'gtm'], watchers: ['Ren'], comments: 0 },
  ],
  phase2Tasks: [
    { id: 3, title: 'Send intro for approval', col: 'review', tags: ['email', 'approval'], watchers: ['Jordan'], comments: 2 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan CloudScale partnership — research, brief, and intro email today', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan CloudScale partnership — research, brief, and intro email today', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'BD unit on it — Aria researching, Ren on brief, intro held for approval.', time: '11:18', delay: 1200 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Partnership pack on Canvas — approve intro before send.', time: '11:20', delay: 1100 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Jordan',
  spotlightTaskTags: [
    { label: 'bd', type: 'channel' },
    { label: 'partnership', type: 'topic' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Research CloudScale partnership fit', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Draft partnership brief', agent: 'Ren', status: 'pending' },
    { id: 's3', title: 'Write intro email', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'bd/intro-email.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'CloudScale BD — research, brief, intro.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'tool', log: i({ id: 't1', integration: 'linkedin', label: 'linkedin_search', detail: 'CloudScale VP Partnerships Maya Patel', agent: 'Aria' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 380 },
    { type: 'openArtifact', key: 'bd/partner-research.md', delay: 280 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'notion', label: 'notion_write', detail: 'bd/partnership-brief.md', agent: 'Ren' }), delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'openArtifact', key: 'bd/partnership-brief.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't3', integration: 'gmail', label: 'gmail_draft', detail: 'Intro — Maya Patel · CloudScale', agent: 'Jordan' }), delay: 500 },
    { type: 'toolDone', id: 't3', delay: 350 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'bd/intro-email.md', delay: 450 },
    { type: 'openArtifact', key: 'bd/intro-email.md', delay: 220 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Intro ready — approve before send.', time: '11:24', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2000 },
  ],
};
