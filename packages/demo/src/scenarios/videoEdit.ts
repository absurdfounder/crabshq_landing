import { VIRALHOOKS_FAVICON } from '../lib/favicon';
import { a } from '../assets/helpers';
import { demoAsset, MEDIA } from '../lib/assets';
import { i } from '../lib/demoIntegrations';
import type { DemoScenario } from './types';

/**
 * Video editing — the agent generates B-roll and a thumbnail, assembles a cut
 * on a real timeline, renders it, and posts. Exercises the storyboard, the NLE
 * and the generation card in one run.
 */

/** Real footage from the app's own media library — the NLE strips these. */
const HOOK = demoAsset(MEDIA.video.sintel);
const MONTAGE = demoAsset(MEDIA.video.bigBuckBunny);
const PROOF = demoAsset(MEDIA.video.elephantsDream);
const CTA = demoAsset(MEDIA.video.tearsOfSteel);
const BED = demoAsset(MEDIA.video.forBiggerBlazes);

/**
 * Stills to fall back to. The clips are H.264; browsers without that decoder
 * (Firefox on some Linux builds, stripped Chromium) would otherwise show a
 * timeline of black rectangles, which is worse than no timeline at all.
 */
const HOOK_STILL = demoAsset(MEDIA.image.abstract);
const MONTAGE_STILL = demoAsset(MEDIA.image.city);
const PROOF_STILL = demoAsset(MEDIA.image.mountains);
const CTA_STILL = demoAsset(MEDIA.image.cityThumb);

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
| 1 | Hook — "2,418 games. One feed." | 0:00 | 6s | title card |
| 2 | Product montage | 0:06 | 7s | screen capture |
| 3 | Social proof — #3 Product of the Day | 0:13 | 5s | title card |
| 4 | CTA — wonder.gg | 0:18 | 6s | title card |

## What was generated

- **B-roll** — golden-hour landscape plate behind scene 2, 4s, generated
  rather than licensed so there's no attribution to track.
- **Thumbnail** — 1280×720 still for the YouTube cut.

## Decisions worth reviewing

1. Scene 3 leans on the Product Hunt rank. That expires as a claim in a
   week or two, so this cut has a shelf life — worth re-rendering scene 3
   with the player count once the PH placement is stale.
2. The music bed is the licensed library track, not generated, because the
   generated options all drifted tempo across the 24s.

> Ready to post. Nothing here needs a human before it goes out except the
> claim in scene 3.`,
  }),
};

export const videoEditScenario: DemoScenario = {
  id: 'video-edit',
  org: { name: 'Wonder', domain: 'viralhooks.org', icon: VIRALHOOKS_FAVICON },
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
      { id: 'c1', track: 1, label: 'hook.mp4', start: 0, length: 6, kind: 'video', src: HOOK, posterSrc: HOOK_STILL, sourceIn: 1 },
      { id: 'c2', track: 1, label: 'montage.mp4', start: 6, length: 7, kind: 'video', src: MONTAGE, posterSrc: MONTAGE_STILL, sourceIn: 2 },
      { id: 'c3', track: 1, label: 'proof.mp4', start: 13, length: 5, kind: 'video', src: PROOF, posterSrc: PROOF_STILL, sourceIn: 0.5 },
      { id: 'c4', track: 1, label: 'cta.mp4', start: 18, length: 6, kind: 'video', src: CTA, posterSrc: CTA_STILL, sourceIn: 1.5 },
      { id: 't1', track: 2, label: '2,418 games', start: 0.5, length: 5, kind: 'text' },
      { id: 't2', track: 2, label: '#3 Product of the Day', start: 13.5, length: 4, kind: 'text' },
      { id: 't3', track: 2, label: 'wonder.gg', start: 19, length: 4.5, kind: 'text' },
      { id: 'a1', track: 3, label: 'bed — upbeat-loop.wav', start: 0, length: 24, kind: 'audio', src: BED },
    ],
  },
  generationJobs: [
    { id: 'g-broll', prompt: 'Golden-hour landscape plate, slow drift, warm grade, no people — 4 seconds, seamless loop', kind: 'video', seconds: 4, model: 'Veo 3', src: demoAsset(MEDIA.video.forBiggerEscapes), posterSrc: demoAsset(MEDIA.image.mountains) },
    { id: 'g-thumb', prompt: 'Thumbnail: a wide mountain range at golden hour, cinematic grade, no text', kind: 'image', model: 'Imagen 4', src: demoAsset(MEDIA.image.mountains) },
  ],
  chatScript: [
    { type: 'mention_tab', text: 'Vaibhav: @Ren launch recap video?', delay: 150 },
    { type: 'typing', text: 'hey @Ren can you cut a short launch recap for socials? vertical, under 30s', delay: 200 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'hey @Ren can you cut a short launch recap for socials? vertical, under 30s', delay: 300 },
    { type: 'nick_typing', delay: 700 },
    { type: 'response', sender: 'Ren', role: 'Design & UX', text: "on it. I'll storyboard four scenes, generate the B-roll we don't have footage for, then assemble it on the timeline.", time: '16:32', delay: 1300 },
    { type: 'addTasks', phase: 1, delay: 500 },
    { type: 'reaction', emoji: '🎬', count: 3, delay: 450 },
    { type: 'typing', text: 'nice. can you also make a thumbnail for the youtube version', delay: 700 },
    { type: 'send', sender: 'Vaibhav', role: 'Founder', text: 'nice. can you also make a thumbnail for the youtube version', delay: 300 },
    { type: 'nick_typing', delay: 650 },
    { type: 'response', sender: 'Ren', role: 'Design & UX', text: "yep — generating that alongside the B-roll so they share a grade.", time: '16:33', delay: 1000 },
    { type: 'addTasks', phase: 2, delay: 500 },
  ],
  spotlightTaskId: 1,
  spotlightAssignee: 'Ren',
  spotlightTaskTags: [
    { label: 'content', type: 'channel' },
    { label: 'video', type: 'topic' },
    { label: 'wonder', type: 'site', domain: 'wonder.gg' },
    { label: 'launch-week', type: 'goal' },
  ],
  initialSubtasks: [
    { id: 's1', title: 'Storyboard four scenes', agent: 'Ren', status: 'pending' },
    { id: 's2', title: 'Generate B-roll plate', agent: 'Ren', status: 'pending' },
    { id: 's3', title: 'Generate the YouTube thumbnail', agent: 'Ren', status: 'pending' },
    { id: 's4', title: 'Assemble the cut on the timeline', agent: 'Ren', status: 'pending' },
    { id: 's5', title: 'Render and hand off', agent: 'Leo', status: 'pending' },
  ],
  artifacts: ARTIFACTS,
  deliverArtifactKey: 'video/launch-recap.md',
  taskExecScript: [
    { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 600 },
    { type: 'openTaskModal', taskId: 1, delay: 450 },
    { type: 'reasoning', agent: 'Ren', text: "Under 30 seconds vertical means four beats at most: hook, what it is, proof, CTA. We have screen capture for the product montage but nothing for the opener, so that's the one shot worth generating rather than licensing.", delay: 620 },
    { type: 'subtask', id: 's1', status: 'running', delay: 400 },
    { type: 'videoStage', stage: 'storyboard', delay: 400 },
    { type: 'videoProgress', seconds: 2, delay: 600 },
    { type: 'videoProgress', seconds: 4, delay: 500 },
    { type: 'videoProgress', seconds: 6, delay: 500 },
    { type: 'videoProgress', seconds: 8, delay: 500 },
    { type: 'subtask', id: 's1', status: 'done', delay: 300 },
    { type: 'subtask', id: 's2', status: 'running', delay: 260 },
    { type: 'generate', jobId: 'g-broll', runMs: 4200, delay: 400 },
    { type: 'tool', log: { id: 't1', tool: 'generate_video', label: 'generate_video', detail: 'golden-hour plate · 4s · seamless', agent: 'Ren', provider: 'Claude Code', durationMs: 41800, result: ['rendered 120 frames at 30fps', 'loop seam error 0.004 — under threshold', 'graded to match scene 2 capture'] }, delay: 350 },
    { type: 'toolDone', id: 't1', delay: 320 },
    { type: 'subtask', id: 's2', status: 'done', delay: 280 },
    { type: 'subtask', id: 's3', status: 'running', delay: 260 },
    { type: 'generate', jobId: 'g-thumb', runMs: 2600, delay: 350 },
    { type: 'tool', log: { id: 't2', tool: 'generate_image', label: 'generate_image', detail: '1280×720 thumbnail', agent: 'Ren', provider: 'Claude Code', durationMs: 8400, result: ['1280×720 PNG written', 'text legible at 168px preview width'] }, delay: 320 },
    { type: 'toolDone', id: 't2', delay: 300 },
    { type: 'subtask', id: 's3', status: 'done', delay: 280 },
    { type: 'subtask', id: 's4', status: 'running', delay: 260 },
    { type: 'videoStage', stage: 'timeline', delay: 450 },
    { type: 'modalMsg', sender: 'Ren', text: 'Laying the four scenes on V1 with the title cards on TEXT and the licensed bed on A1.', time: '16:38', delay: 480 },
    { type: 'videoProgress', seconds: 6, delay: 620 },
    { type: 'videoProgress', seconds: 13, delay: 620 },
    { type: 'videoProgress', seconds: 18, delay: 620 },
    { type: 'videoProgress', seconds: 24, delay: 700 },
    { type: 'reasoning', agent: 'Ren', text: "I tried the generated music options and all three drift tempo across 24 seconds, which is audible against the cuts. Using the licensed library bed instead — worth noting in the handoff so nobody wonders why one asset isn't generated.", delay: 620 },
    { type: 'subtask', id: 's4', status: 'done', delay: 320 },
    { type: 'subtask', id: 's5', status: 'running', delay: 260 },
    { type: 'tool', log: i({ id: 't3', integration: 'github', label: 'render_export', detail: 'launch-recap-v3.mp4 · 1080×1920', agent: 'Leo', provider: 'Codex', durationMs: 62400, result: ['720 frames rendered', 'H.264, 8.4 MB', 'loudness normalised to −14 LUFS'], wrote: { name: 'video/launch-recap.md', ext: 'md' } }), delay: 480 },
    { type: 'toolDone', id: 't3', delay: 360 },
    { type: 'deliver', name: 'video/launch-recap.md', delay: 450 },
    { type: 'openArtifact', key: 'video/launch-recap.md', delay: 250 },
    { type: 'subtask', id: 's5', status: 'done', delay: 320 },
    { type: 'modalMsg', sender: 'Ren', text: 'Cut is rendered. Scene 3 leans on the Product Hunt rank, so this version has a shelf life — flagged in the notes.', time: '16:41', delay: 520 },
    { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
    { type: 'chatMsg', sender: 'Ren', role: 'Design & UX', text: 'Launch recap is rendered and in Human Review — 24s vertical, thumbnail attached.', time: '16:41', delay: 650 },
    { type: 'closeTaskModal', delay: 2200 },
  ],
};
