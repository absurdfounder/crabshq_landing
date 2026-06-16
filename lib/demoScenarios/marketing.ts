import { VIRALHOOKS_FAVICON } from '@/lib/favicon';
import type { DemoScenario } from './types';

const LANDING_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Northstar — Command layer for AI agents</title>
  <style>
    body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #0c0a09; color: #fafaf9; }
    .hero { padding: 32px 28px; background: linear-gradient(135deg, #3f6b00 0%, #1c1917 55%); }
    .eyebrow { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.7; }
    h1 { font-size: 26px; margin: 10px 0; max-width: 320px; line-height: 1.2; }
    p { font-size: 13px; opacity: 0.85; max-width: 340px; line-height: 1.55; }
    .cta { display: inline-block; margin-top: 16px; background: #fafaf9; color: #1c1917; font-size: 12px; font-weight: 700; padding: 10px 16px; border-radius: 8px; }
    .stats { display: flex; gap: 16px; padding: 20px 28px; background: #1c1917; }
    .stat strong { display: block; font-size: 18px; color: #9db866; }
    .stat span { font-size: 10px; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.08em; }
  </style>
</head>
<body>
  <div class="hero">
    <div class="eyebrow">Q2 campaign · pillar page</div>
    <h1>Your agents. One command layer.</h1>
    <p>Multi-agent ops for lean teams — traced tickets, shared memory, human review gates.</p>
    <span class="cta">Book a demo</span>
  </div>
  <div class="stats">
    <div class="stat"><strong>3.2×</strong><span>Output velocity</span></div>
    <div class="stat"><strong>11</strong><span>Agents live</span></div>
    <div class="stat"><strong>0</strong><span>Context lost</span></div>
  </div>
</body>
</html>`;

const CAROUSEL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
  <rect width="640" height="400" fill="#faf9f6"/>
  <rect x="24" y="24" width="592" height="352" rx="16" fill="#fff" stroke="#e7e5e4"/>
  <text x="48" y="72" fill="#3f6b00" font-family="system-ui" font-size="12" font-weight="700" letter-spacing="0.15em">SLIDE 1 / 3</text>
  <text x="48" y="120" fill="#1c1917" font-family="system-ui" font-size="28" font-weight="700">Stop tab-switching</text>
  <text x="48" y="152" fill="#57534e" font-family="system-ui" font-size="15">One board for every agent on your roster.</text>
  <rect x="48" y="200" width="544" height="120" rx="12" fill="#f0f5e6"/>
  <text x="64" y="240" fill="#325600" font-family="system-ui" font-size="13" font-weight="600">Codex · Claude Code · Cursor — same harness</text>
</svg>`;

const ARTIFACTS = {
  'landing/q2-pillar.html': {
    name: 'landing/q2-pillar.html',
    ext: 'html',
    kind: 'html' as const,
    content: LANDING_HTML,
  },
  'creative/linkedin-carousel.png': {
    name: 'creative/linkedin-carousel.png',
    ext: 'png',
    kind: 'image' as const,
    caption: 'LinkedIn carousel — slide 1 of 3',
    content: CAROUSEL_SVG,
  },
  'video/social-cut.mp4': {
    name: 'video/social-cut.mp4',
    ext: 'mp4',
    kind: 'video' as const,
    caption: '15s social cut — pillar page hero',
    content: `[00:00] Hook — "Stop tab-switching between agents"
[00:05] Screen: Trooper board with 3 columns
[00:11] CTA — Book a demo
[00:15] End card — northstar.io/q2`,
  },
  'seo/keyword-map.md': {
    name: 'seo/keyword-map.md',
    ext: 'md',
    kind: 'markdown' as const,
    content: `# Keyword map — Q2

## Primary
- ai agent ops platform
- multi-agent task board
- command layer for agents

## Content gaps
- competitor comparison pages
- launch-day SEO checklist`,
  },
  'content/q2-campaign-brief.md': {
    name: 'content/q2-campaign-brief.md',
    ext: 'md',
    kind: 'markdown' as const,
    content: `# Q2 Campaign Brief

## Theme
AI-native ops for lean teams

## Deliverables shipped
- Pillar landing page (live preview attached)
- LinkedIn carousel — 3 slides
- 15s social video cut
- SEO keyword map + content calendar

## Status
Awaiting brand review before schedule.`,
  },
};

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
    { type: 'typing', text: '@Jordan Q2 campaign — pillar page, SEO recon, carousel, and a 15s video cut. Trace it all.', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: '@Jordan Q2 campaign — pillar page, SEO recon, carousel, and a 15s video cut. Trace it all.', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Campaign unit live — Ren on landing + creative, Aria on SEO. Image and video assets attaching to the ticket.', time: '11:02', delay: 1250 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'nick_typing', delay: 800 },
    { type: 'response', sender: 'Jordan', role: 'Chief of Staff', text: 'Landing preview live, carousel + video attached. Brand review queued.', time: '11:08', delay: 1150 },
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
    { id: 's4', title: 'Design LinkedIn carousel slides', agent: 'Ren', status: 'pending' },
    { id: 's5', title: 'Cut 15s social video', agent: 'Aria', status: 'pending' },
    { id: 's6', title: 'Compile campaign brief', agent: 'Jordan', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'content/q2-campaign-brief.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Q2 campaign — landing, creative, and SEO in one traced mission.', delay: 400 },
    { type: 'subtask', id: 's1', status: 'running', delay: 380 },
    { type: 'tool', log: { id: 't1', tool: 'web_search', label: 'web_search', detail: 'ai agent ops competitor landing pages', agent: 'Aria', faviconDomain: 'google.com' }, delay: 540 },
    { type: 'toolDone', id: 't1', delay: 400 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't2', tool: 'write_file', label: 'write_file', detail: 'seo/keyword-map.md', agent: 'Aria' }, delay: 500 },
    { type: 'toolDone', id: 't2', delay: 350 },
    { type: 'openArtifact', key: 'seo/keyword-map.md', delay: 280 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't3', tool: 'write_file', label: 'write_file', detail: 'landing/q2-pillar.html', agent: 'Ren', provider: 'Claude Code' }, delay: 540 },
    { type: 'toolDone', id: 't3', delay: 380 },
    { type: 'openArtifact', key: 'landing/q2-pillar.html', delay: 350 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't4', tool: 'generate_image', label: 'generate_image', detail: 'creative/linkedin-carousel.png', agent: 'Ren', provider: 'Codex' }, delay: 580 },
    { type: 'toolDone', id: 't4', delay: 420 },
    { type: 'openArtifact', key: 'creative/linkedin-carousel.png', delay: 320 },
    { type: 'subtask', id: 's4', status: 'done', delay: 280 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: { id: 't5', tool: 'record_screen', label: 'record_screen', detail: '15s social cut — pillar hero', agent: 'Aria' }, delay: 560 },
    { type: 'toolDone', id: 't5', delay: 400 },
    { type: 'openArtifact', key: 'video/social-cut.mp4', delay: 300 },
    { type: 'subtask', id: 's5', status: 'done', delay: 280 },
    { type: 'subtask', id: 's6', status: 'running', delay: 260 },
    { type: 'deliver', name: 'content/q2-campaign-brief.md', delay: 450 },
    { type: 'openArtifact', key: 'content/q2-campaign-brief.md', delay: 220 },
    { type: 'subtask', id: 's6', status: 'done', delay: 280 },
    { type: 'modalMsg', sender: 'Jordan', text: 'Full campaign bundle ready — approve before we schedule.', time: '11:12', delay: 450 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 400 },
    { type: 'closeTaskModal', delay: 2400 },
  ],
};
