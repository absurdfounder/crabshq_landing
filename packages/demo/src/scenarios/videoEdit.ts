import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a } from '../assets/helpers';
import { demoAsset, MEDIA } from '../lib/assets';
import { i } from '../lib/demoIntegrations';
import type { DemoScenario } from './types';

/**
 * Video editing — open the NLE, cut the sequence, layer graphics + score,
 * render. No image/video generation cards, no storyboard detour.
 */

const CHATCUT = {
  final: 'https://cdn.chatcut.dev/playback/talking-head-final.mp4',
  poster: 'https://cdn.chatcut.dev/playground/posters/final-cut-frame.jpg',
  mgTop5: 'https://cdn.chatcut.dev/playback/mg/mg-taylor-top5.webm',
  mgCta: 'https://cdn.chatcut.dev/playback/mg/mg-youtube-cta.webm',
} as const;

const HOOK = CHATCUT.final;
const MONTAGE = CHATCUT.final;
const PROOF = CHATCUT.mgTop5;
const CTA = CHATCUT.mgCta;
const BED = demoAsset(MEDIA.video.forBiggerBlazes);

const HOOK_STILL = CHATCUT.poster;
const MONTAGE_STILL = CHATCUT.poster;
const PROOF_STILL = CHATCUT.poster;
const CTA_STILL = CHATCUT.poster;

const ARTIFACTS = {
  'video/launch-recap.md': a({
    name: 'video/launch-recap.md',
    ext: 'md',
    kind: 'markdown',
    content: `# Launch recap cut — v3

**Duration:** 24s · **Format:** 1080×1920 vertical · **Render:** complete

## Structure

| # | Scene | In | Length | Source |
|---|---|---|---|---|
| 1 | Hook | 0:00 | 6s | talking-head take |
| 2 | Product montage | 0:06 | 7s | screen capture |
| 3 | Social proof | 0:13 | 5s | motion graphic |
| 4 | CTA — wonderdesk.ai | 0:18 | 6s | end card |

## Edit notes

- 12 fillers removed · 4 highlights kept
- Motion graphics on scenes 2–4 · ambient bed under the full cut
- Scene 3 leans on the Product Hunt rank — re-render once that claim ages

> Ready to post.`,
  }),
};

export const videoEditScenario: DemoScenario = {
  id: 'video-edit',
  org: { name: 'Wonder', domain: 'wonderdesk.ai', icon: VIRALHOOKS_FAVICON },
  channels: [
    { id: 'general', name: 'general', preview: 'Ren: rendering the vertical cut…', time: '16:40', system: false },
    { id: 'content', name: 'content', preview: 'Vaibhav: need a launch recap video', time: '16:31', system: false },
    { id: 'social', name: 'social', preview: 'Aria: scheduled for 09:00 tomorrow', time: '1h', system: false },
  ],
  defaultChannel: 'general',
  defaultSidebarTab: 'channels',
  phase1Tasks: [
    { id: 1, title: 'Cut a 24s launch recap video', col: 'inbox', tags: ['video', 'social'], watchers: ['Vaibhav', 'Ren'], comments: 2, priority: 'urgent', assignee: 'Ren', age: '2 minutes', progress: 'planning', linkedGoal: 'Launch week' },
    { id: 2, title: 'Write the post copy', col: 'inbox', tags: ['copy'], watchers: ['Aria'], comments: 0, priority: 'medium', assignee: 'Aria', age: '4 minutes' },
    { id: 3, title: 'Pick the music bed', col: 'inbox', tags: ['audio'], watchers: ['Ren'], comments: 1, priority: 'low', assignee: 'Ren', age: '9 minutes' },
    { id: 4, title: 'Update the YouTube channel art', col: 'in_progress', tags: ['brand'], watchers: ['Ren'], comments: 0, priority: 'low', assignee: 'Ren', age: 'about 2 hours', progress: { done: 1, total: 3 } },
    { id: 5, title: 'Clip the founder interview', col: 'in_progress', tags: ['video'], watchers: ['Jordan'], comments: 2, priority: 'medium', assignee: 'Jordan', age: 'about 4 hours', progress: { done: 4, total: 7 }, artifactCount: 3 },
  ],
  phase2Tasks: [
    { id: 6, title: 'Schedule the vertical cut', col: 'in_progress', tags: ['social'], watchers: ['Aria'], comments: 0, priority: 'high', assignee: 'Aria', age: '1 minute', progress: 'planning' },
    { id: 7, title: 'Caption pass for accessibility', col: 'review', tags: ['a11y', 'video'], watchers: ['Ren', 'Jordan'], comments: 1, priority: 'medium', assignee: 'Ren', age: 'about 5 hours', progress: { done: 2, total: 2 } },
    { id: 8, title: 'Archive the raw screen captures', col: 'done', tags: ['ops'], watchers: ['Leo'], comments: 0, priority: 'low', assignee: 'Leo', age: '2 days', progress: { done: 3, total: 3 }, artifactCount: 6 },
  ],
  videoProject: {
    name: 'launch-recap-v3.mp4',
    fps: 30,
    durationSeconds: 24,
    tracks: [
      { id: 1, label: 'V1', kind: 'video' },
      { id: 2, label: 'TEXT', kind: 'text' },
      { id: 3, label: 'A1', kind: 'audio' },
    ],
    scenes: [
      { id: 'sc1', title: 'Hook', seconds: 6, src: HOOK, posterAt: 2.5, posterSrc: HOOK_STILL },
      { id: 'sc2', title: 'Product montage', seconds: 7, src: MONTAGE, posterAt: 4, posterSrc: MONTAGE_STILL },
      { id: 'sc3', title: 'Social proof', seconds: 5, src: PROOF, posterAt: 1.5, posterSrc: PROOF_STILL },
      { id: 'sc4', title: 'Call to action', seconds: 6, src: CTA, posterAt: 3, posterSrc: CTA_STILL },
    ],
    clips: [
      { id: 'c1', track: 1, label: 'hook.mp4', start: 0, length: 6, kind: 'video', src: HOOK, posterSrc: HOOK_STILL, sourceIn: 0.8 },
      { id: 'c2', track: 1, label: 'montage.mp4', start: 6, length: 7, kind: 'video', src: MONTAGE, posterSrc: MONTAGE_STILL, sourceIn: 8 },
      { id: 'c3', track: 1, label: 'proof.mp4', start: 13, length: 5, kind: 'video', src: PROOF, posterSrc: PROOF_STILL, sourceIn: 0.2 },
      { id: 'c4', track: 1, label: 'cta.mp4', start: 18, length: 6, kind: 'video', src: CTA, posterSrc: CTA_STILL, sourceIn: 0.3 },
      { id: 't1', track: 2, label: 'Self-updating docs', start: 0.5, length: 5, kind: 'text' },
      { id: 't2', track: 2, label: '#3 Product of the Day', start: 13.5, length: 4, kind: 'text' },
      { id: 't3', track: 2, label: 'wonderdesk.ai', start: 19, length: 4.5, kind: 'text' },
      { id: 'a1', track: 3, label: 'bed — ambient-loop.wav', start: 0, length: 24, kind: 'audio', src: BED },
    ],
  },
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Ren launch recap video?', delay: 150 },
    { type: 'typing', text: 'hey @Ren can you cut a short launch recap for socials? vertical, under 30s', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Ren can you cut a short launch recap for socials? vertical, under 30s', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Ren', role: 'Design & UX', text: "on it — pull fillers, find highlights, cut the sequence, then drop motion graphics and a bed. editor's on the right.", time: '16:32', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '🎬', count: 3, delay: 450 },
    { type: 'typing', text: 'perfect — keep it under 30s', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'perfect — keep it under 30s', delay: 300 },
    { type: 'nick_typing', delay: 650 },
    { type: 'response', sender: 'Ren', role: 'Design & UX', text: "yep — cutting now. you'll see the timeline update as I go.", time: '16:33', delay: 1000 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'content', type: 'channel' },
    { label: 'video', type: 'topic' },
    { label: 'wonder', type: 'site', domain: 'wonderdesk.ai' },
    { label: 'launch-week', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Remove fillers and find highlights', agent: 'Ren', status: 'pending' },
    { id: 's2', title: 'Cut the sequence on the timeline', agent: 'Ren', status: 'pending' },
    { id: 's3', title: 'Layer motion graphics + score', agent: 'Ren', status: 'pending' },
    { id: 's4', title: 'Render and hand off', agent: 'Leo', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'video/launch-recap.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'reasoning', agent: 'Ren', text: 'Strip fillers, keep the strong takes, build the sequence on the timeline, then layer graphics and the bed.', delay: 520 },
    { type: 'subtask', id: 's1', status: 'running', delay: 350 },
    // Straight into the editor — no generation card, no storyboard.
    { type: 'videoStage', stage: 'timeline', delay: 300 },
    { type: 'videoProgress', seconds: 2, delay: 700 },
    { type: 'videoProgress', seconds: 5, delay: 700 },
    { type: 'tool', log: { id: 't1', tool: 'video_edit', label: 'remove_fillers', detail: '12 fillers · 3 takes collapsed', agent: 'Ren', provider: 'Claude Code', durationMs: 2400, result: ['12 filler segments removed', '3 weak takes collapsed', 'highlights marked on V1'] }, delay: 400 },
    { type: 'toolDone', id: 't1', delay: 300 },
    { type: 'subtask', id: 's1', status: 'done', delay: 280 },
    { type: 'subtask', id: 's2', status: 'running', delay: 240 },
    { type: 'videoProgress', seconds: 8, delay: 800 },
    { type: 'videoProgress', seconds: 12, delay: 800 },
    { type: 'tool', log: { id: 't2', tool: 'video_edit', label: 'assemble_cut', detail: '7 cuts · 24s vertical', agent: 'Ren', provider: 'Claude Code', durationMs: 3100, result: ['7 cuts on V1', 'duration 24.0s', '1080×1920'] }, delay: 400 },
    { type: 'toolDone', id: 't2', delay: 300 },
    { type: 'modalMsg', sender: 'Ren', text: 'Cut is on the timeline — layering motion graphics next, then the ambient bed.', time: '16:38', delay: 450 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 240 },
    { type: 'videoProgress', seconds: 16, delay: 900 },
    { type: 'videoProgress', seconds: 20, delay: 900 },
    { type: 'tool', log: { id: 't3', tool: 'video_edit', label: 'layer_graphics', detail: 'MG + ambient bed', agent: 'Ren', provider: 'Claude Code', durationMs: 2800, result: ['5 motion-graphic clips on MG', 'ambient bed under full 24s', 'loudness headed for −14 LUFS'] }, delay: 400 },
    { type: 'toolDone', id: 't3', delay: 300 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 240 },
    { type: 'tool', log: i({ id: 't4', integration: 'github', label: 'render_export', detail: 'launch-recap-v3.mp4 · 1080×1920', agent: 'Leo', provider: 'Codex', durationMs: 62400, result: ['720 frames rendered', 'H.264, 8.4 MB', 'loudness normalised to −14 LUFS'], wrote: { name: 'video/launch-recap.md', ext: 'md' } }), delay: 480 },
    { type: 'toolDone', id: 't4', delay: 360 },
    { type: 'deliver', name: 'video/launch-recap.md', delay: 450 },
    { type: 'openArtifact', key: 'video/launch-recap.md', delay: 250 },
    { type: 'subtask', id: 's4', status: 'done', delay: 320 },
    { type: 'modalMsg', sender: 'Ren', text: 'Cut is rendered. Scene 3 leans on the Product Hunt rank — flagged in the notes.', time: '16:41', delay: 520 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Ren', role: 'Design & UX', text: 'Launch recap is rendered and in Human Review — 24s vertical on the timeline.', time: '16:41', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
