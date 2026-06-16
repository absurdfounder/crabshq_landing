import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import { a, assetPath, DEMO_MEDIA } from '@/lib/demoScenarioAssets/helpers';
import { i } from '@/lib/demoIntegrations';
import type { DemoScenario } from './types';

const VIDEO_TRANSCRIPT = `[00:00] Hook — "Stop tab-switching between agents"
[00:05] Screen: Trooper board with kanban columns
[00:11] Pillar page hero scroll
[00:22] CTA — Book a demo
[00:30] End card — northstar.io/q2`;

const ARTIFACTS = {
  'landing/campaign.html': a({
    name: 'landing/campaign.html',
    ext: 'html',
    kind: 'html',
    src: assetPath('marketing', 'campaign.html'),
    browserUrl: 'https://northstar.io/q2',
    faviconDomain: 'northstar.io',
    content: '',
  }),
  'creative/linkedin-carousel.png': a({
    name: 'creative/linkedin-carousel.png',
    ext: 'png',
    kind: 'image',
    src: DEMO_MEDIA.linkedinCarousel,
    caption: 'LinkedIn carousel — slide 1 of 3 · designed in Trooper',
  }),
  'copy/email-sequence.md': a({
    name: 'copy/email-sequence.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Email nurture — Q2 campaign

## Email 1 — Launch
**Subject:** Your agents deserve one command layer
**Preview:** Stop tab-switching between Codex, Claude Code, and Cursor.

## Email 2 — Proof
**Subject:** How lean teams ship 3.2× faster
Case study: traced tickets, human review gates, zero context loss.

## Email 3 — CTA
**Subject:** Book a 15-min demo
Calendar link + pillar page recap.`,
  }),
  'video/social-cut.mp4': a({
    name: 'video/social-cut.mp4',
    ext: 'mp4',
    kind: 'video',
    src: DEMO_MEDIA.socialVideo,
    posterSrc: DEMO_MEDIA.socialVideoPoster,
    caption: '30s social cut — pillar page hero + board B-roll',
    content: VIDEO_TRANSCRIPT,
  }),
  'content/q2-campaign-brief.md': a({
    name: 'content/q2-campaign-brief.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Q2 Campaign Brief

## Theme
AI-native ops for lean teams — parser reliability story

## Deliverables shipped
- Pillar landing page (live preview)
- LinkedIn carousel — 3 slides
- 30s social video cut + transcript
- Email nurture sequence

## Status
Awaiting brand review before schedule.`,
  }),
  'seo/keyword-map.md': a({
    name: 'seo/keyword-map.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Keyword map — Q2

## Primary
- ai agent ops platform
- multi-agent task board
- command layer for agents

## Content gaps
- competitor comparison pages
- launch-day SEO checklist`,
  }),
};

const CANVAS_KEYS = [
  'landing/campaign.html',
  'creative/linkedin-carousel.png',
  'copy/email-sequence.md',
  'content/q2-campaign-brief.md',
];

export const marketingScenario: DemoScenario = {
  id: 'marketing',
  org: { name: 'Northstar', domain: 'northstar.io', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'marketing', name: 'marketing', preview: 'Jordan: landing + carousel + video on ticket', time: '11:08', system: false },
    { id: 'general', name: 'general', preview: 'Aria: SEO recon complete', time: '10:58', system: false },
  ],
  defaultChannel: 'marketing',
  phase1Tasks: [
    { id: 1, title: 'Q2 pillar landing page', col: 'inbox', tags: ['landing', 'html'], watchers: ['Vaibhav', 'Ren'], comments: 3 },
    { id: 2, title: 'SEO recon — competitor keywords', col: 'in_progress', tags: ['seo', 'research'], watchers: ['Aria'], comments: 1 },
    { id: 3, title: 'LinkedIn carousel + social video', col: 'inbox', tags: ['creative', 'video'], watchers: ['Ren', 'Aria'], comments: 2 },
  ],
  phase2Tasks: [
    { id: 4, title: 'Brand voice review', col: 'review', tags: ['brand', 'review'], watchers: ['Jordan'], comments: 2 },
    { id: 5, title: 'Schedule social posts', col: 'in_progress', tags: ['social', 'schedule'], watchers: ['Ren'], comments: 0 },
    { id: 6, title: 'Email nurture sequence', col: 'inbox', tags: ['email', 'nurture'], watchers: ['Aria'], comments: 0 },
  ],
  chatScript: [
    { type: 'typing', text: '@Jordan Q2 campaign for parser reliability — landing, carousel, 30s cut, and nurture emails.', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan Q2 campaign for parser reliability — landing, carousel, 30s cut, and nurture emails.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Campaign unit live — Ren on landing + creative, Aria on SEO. Image and video attach to the ticket.', time: '11:02', delay: 1250 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 800 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Campaign pack on Canvas — approve copy before we schedule posts.', time: '11:08', delay: 1150 },
    { type: 'addTasks', phase: 2, delay: 500 },
    { type: 'reaction', emoji: '🚀', count: 2, delay: 400 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'marketing', type: 'channel' },
    { label: 'campaign', type: 'topic' },
    { label: 'q2-launch', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Audit competitor landing pages', agent: 'Aria', status: 'pending' },
    { id: 's2', title: 'Build Q2 keyword map', agent: 'Aria', status: 'pending' },
    { id: 's3', title: 'Draft pillar landing page', agent: 'Ren', provider: 'Claude Code', status: 'pending' },
    { id: 's4', title: 'Generate LinkedIn carousel slide', agent: 'Ren', provider: 'Codex', status: 'pending' },
    { id: 's5', title: 'Record 30s social video cut', agent: 'Ren', provider: 'Claude Code', status: 'pending' },
    { id: 's6', title: 'Write email nurture sequence', agent: 'Aria', status: 'pending' },
    { id: 's7', title: 'Compile campaign brief', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  canvasArtifacts: CANVAS_KEYS,
  deliverArtifactKey: 'content/q2-campaign-brief.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Q2 campaign — landing, creative, email, and video in one traced mission.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 380 },
    { type: 'tool', log: i({ id: 't1', integration: 'figma', label: 'figma_export', detail: 'Competitor landing audit frames', agent: 'Aria' }), delay: 540 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't2', integration: 'googlesheets', label: 'sheets_update', detail: 'seo/keyword-map → Q2 tab', agent: 'Aria' }), delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'openArtifact', key: 'seo/keyword-map.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'write_file', label: 'write_file', detail: 'landing/campaign.html', agent: 'Ren', provider: 'Claude Code' }, delay: 540 },
    { type: 'toolDone', id: 't3', delay: 380 },
    { type: 'openArtifact', key: 'landing/campaign.html', delay: 350 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't4', integration: 'linkedin', label: 'linkedin_post', detail: 'creative/linkedin-carousel.png — slide 1', agent: 'Ren', provider: 'Codex' }), delay: 580 },
    { type: 'toolDone', id: 't4', delay: 420 },
    { type: 'openArtifact', key: 'creative/linkedin-carousel.png', delay: 320 },
    { type: 'subtask', id: 's4', status: 'done', delay: 280 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't5', tool: 'record_screen', label: 'record_screen', detail: '30s — pillar hero + board B-roll', agent: 'Ren', provider: 'Claude Code' }, delay: 560 },
    { type: 'toolDone', id: 't5', delay: 400 },
    { type: 'openArtifact', key: 'video/social-cut.mp4', delay: 300 },
    { type: 'subtask', id: 's5', status: 'done', delay: 280 },
    { type: 'subtask', id: 's6', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't6', integration: 'gmail', label: 'gmail_draft', detail: 'copy/email-sequence.md — nurture 3-part', agent: 'Aria' }), delay: 500 },
    { type: 'toolDone', id: 't6', delay: 350 },
    { type: 'openArtifact', key: 'copy/email-sequence.md', delay: 280 },
    { type: 'subtask', id: 's6', status: 'done', delay: 280 },
    { type: 'subtask', id: 's7', status: 'running', delay: 260 },
    { type: 'openCanvas', keys: CANVAS_KEYS, delay: 450 },
    { type: 'deliver', name: 'content/q2-campaign-brief.md', delay: 450 },
    { type: 'openArtifact', key: 'content/q2-campaign-brief.md', delay: 220 },
    { type: 'subtask', id: 's7', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Campaign pack on Canvas — approve before we schedule.', time: '11:12', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2400 },
  ],
};
