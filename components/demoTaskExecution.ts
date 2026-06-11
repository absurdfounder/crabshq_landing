import type { DemoColumnId } from './demoTheme';

export type DemoSubtaskStatus = 'pending' | 'running' | 'done';

export type DemoSubtask = {
  id: string;
  title: string;
  agent: string;
  status: DemoSubtaskStatus;
};

export type DemoTag = {
  label: string;
  type: 'channel' | 'goal' | 'site' | 'topic';
  domain?: string;
};

export type DemoToolLog = {
  id: string;
  tool: string;
  label: string;
  detail?: string;
  agent: string;
  status: 'running' | 'done';
  /** Explicit favicon domain when detail text alone is ambiguous */
  faviconDomain?: string;
};

export type DemoModalMessage = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

export type DemoFeedItem =
  | { kind: 'message'; id: string; sender: string; text: string; time: string; tags?: DemoTag[] }
  | ({ kind: 'tool' } & DemoToolLog);

export const SPOTLIGHT_TASK_TAGS: DemoTag[] = [
  { label: 'product-launch', type: 'channel' },
  { label: 'seo', type: 'topic' },
  { label: 'visibility', type: 'topic' },
  { label: 'wonder', type: 'site', domain: 'wonder.gg' },
  { label: 'launch-day', type: 'goal' },
];

export const DEMO_ORG = { name: 'Wonder', domain: 'wonder.gg' } as const;

export type DemoArtifact = {
  name: string;
  content: string;
  ext?: string;
};

export const DEMO_ARTIFACTS: Record<string, DemoArtifact> = {
  'index.html': {
    name: 'index.html',
    ext: 'html',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Wonder — Discover Indie Games on Product Hunt</title>
  <meta name="description" content="Wonder.gg curates indie game launches. Find your next favorite cozy adventure, roguelike, or narrative hit." />
  <meta property="og:title" content="Wonder — Indie Game Discovery" />
  <meta property="og:image" content="https://wonder.gg/og/launch-2026.png" />
  <meta property="og:description" content="Launch-day SEO optimized for Product Hunt." />
</head>
<body>...</body>
</html>`,
  },
  'seo/launch-keywords.md': {
    name: 'seo/launch-keywords.md',
    ext: 'md',
    content: `# Launch keyword map

## Primary
- wonder.gg launch
- indie game discovery platform
- product hunt games 2026

## Secondary
- cozy games steam alternative
- narrative adventure indie
- wonder.gg seo`,
  },
  'seo-launch-report.md': {
    name: 'seo-launch-report.md',
    ext: 'md',
    content: `# Wonder SEO Launch Report

## Executive summary
Wonder.gg is ready for Product Hunt launch with updated meta, OG tags, and a keyword map aligned to gaming discovery terms.

## Keyword clusters
- **Launch day**: indie game launch, wonder.gg, product hunt games
- **Discovery**: cozy games, narrative adventure, steam alternative

## Changes shipped
- Homepage \`title\` + \`description\` optimized
- OG image updated for social previews
- \`sitemap.xml\` entries for new game pages

## Competitor baseline
Compared against 4 launch peers — Wonder now ranks on-page parity for title length and schema coverage.`,
  },
};

export const SPOTLIGHT_TASK_ID = 1;

export const INITIAL_SUBTASKS: DemoSubtask[] = [
  { id: 's1', title: 'Audit Wonder SEO baseline & competitors', agent: 'Jordan', status: 'pending' },
  { id: 's2', title: 'Research Product Hunt launch keywords', agent: 'Aria', status: 'pending' },
  { id: 's3', title: 'Browse wonder.gg and capture meta gaps', agent: 'Aria', status: 'pending' },
  { id: 's4', title: 'Update meta tags, OG images, sitemap', agent: 'Ren', status: 'pending' },
  { id: 's5', title: 'Commit & deploy SEO changes', agent: 'Leo', status: 'pending' },
  { id: 's6', title: 'Deliver launch SEO report to team', agent: 'Jordan', status: 'pending' },
];

/** Scripted execution steps after kanban fill — drives modal + board updates */
export type TaskExecStep =
  | { type: 'moveTask'; taskId: number; col: DemoColumnId; delay: number }
  | { type: 'openTaskModal'; taskId: number; delay: number }
  | { type: 'subtask'; id: string; status: DemoSubtaskStatus; delay: number }
  | { type: 'tool'; log: Omit<DemoToolLog, 'status'>; delay: number }
  | { type: 'toolDone'; id: string; delay: number }
  | { type: 'modalMsg'; sender: string; text: string; time?: string; tags?: DemoTag[]; delay: number }
  | { type: 'openArtifact'; key: keyof typeof DEMO_ARTIFACTS; delay: number }
  | { type: 'deliver'; name: string; delay: number }
  | { type: 'closeTaskModal'; delay: number }
  | { type: 'chatMsg'; sender: string; role: string; text: string; time: string; delay: number };

export const TASK_EXEC_SCRIPT: TaskExecStep[] = [
  { type: 'moveTask', taskId: 1, col: 'in_progress', delay: 700 },
  { type: 'openTaskModal', taskId: 1, delay: 500 },
  { type: 'modalMsg', sender: 'Jordan', text: 'Opening SEO Optimization — I\'ll coordinate Aria on research, Ren on page updates, Leo on deploy.', tags: [{ label: 'product-launch', type: 'channel' }, { label: 'seo', type: 'topic' }], delay: 400 },
  { type: 'subtask', id: 's1', status: 'running', delay: 500 },
  { type: 'tool', log: { id: 't1', tool: 'web_search', label: 'web_search', detail: 'wonder.gg competitor SEO product hunt launch', agent: 'Jordan', faviconDomain: 'wonder.gg' }, delay: 600 },
  { type: 'toolDone', id: 't1', delay: 450 },
  { type: 'subtask', id: 's1', status: 'done', delay: 350 },
  { type: 'subtask', id: 's2', status: 'running', delay: 300 },
  { type: 'modalMsg', sender: 'Aria', text: 'Pulling keyword clusters for launch day — gaming + discovery terms.', tags: [{ label: 'wonder', type: 'site', domain: 'wonder.gg' }, { label: 'research', type: 'topic' }], delay: 450 },
  { type: 'tool', log: { id: 't2', tool: 'web_search', label: 'web_search', detail: 'indie game launch keywords 2026', agent: 'Aria', faviconDomain: 'google.com' }, delay: 550 },
  { type: 'toolDone', id: 't2', delay: 400 },
  { type: 'subtask', id: 's2', status: 'done', delay: 300 },
  { type: 'subtask', id: 's3', status: 'running', delay: 280 },
  { type: 'tool', log: { id: 't3', tool: 'browser_navigate', label: 'browser_navigate', detail: 'https://wonder.gg', agent: 'Aria', faviconDomain: 'wonder.gg' }, delay: 550 },
  { type: 'tool', log: { id: 't4', tool: 'browser_snapshot', label: 'browser_snapshot', detail: 'Captured title, meta, OG tags', agent: 'Aria', faviconDomain: 'wonder.gg' }, delay: 500 },
  { type: 'toolDone', id: 't3', delay: 280 },
  { type: 'toolDone', id: 't4', delay: 280 },
  { type: 'subtask', id: 's3', status: 'done', delay: 300 },
  { type: 'subtask', id: 's4', status: 'running', delay: 280 },
  { type: 'modalMsg', sender: 'Ren', text: 'Updating homepage meta + generating sitemap entries for new game pages.', tags: [{ label: 'wonder', type: 'site', domain: 'wonder.gg' }, { label: 'visibility', type: 'topic' }], delay: 450 },
  { type: 'tool', log: { id: 't5', tool: 'read_file', label: 'read_file', detail: '/workspace/wonder/index.html', agent: 'Ren', faviconDomain: 'wonder.gg' }, delay: 500 },
  { type: 'toolDone', id: 't5', delay: 350 },
  { type: 'tool', log: { id: 't6', tool: 'apply_patch', label: 'apply_patch', detail: 'index.html — title, description, og:image', agent: 'Ren', faviconDomain: 'wonder.gg' }, delay: 550 },
  { type: 'toolDone', id: 't6', delay: 400 },
  { type: 'openArtifact', key: 'index.html', delay: 300 },
  { type: 'tool', log: { id: 't7', tool: 'write_file', label: 'write_file', detail: 'seo/launch-keywords.md', agent: 'Ren' }, delay: 500 },
  { type: 'toolDone', id: 't7', delay: 350 },
  { type: 'openArtifact', key: 'seo/launch-keywords.md', delay: 300 },
  { type: 'subtask', id: 's4', status: 'done', delay: 300 },
  { type: 'subtask', id: 's5', status: 'running', delay: 280 },
  { type: 'tool', log: { id: 't8', tool: 'git_commit', label: 'git_commit', detail: 'feat(seo): optimize Wonder PH launch pages', agent: 'Leo', faviconDomain: 'github.com' }, delay: 600 },
  { type: 'toolDone', id: 't8', delay: 380 },
  { type: 'subtask', id: 's5', status: 'done', delay: 300 },
  { type: 'subtask', id: 's6', status: 'running', delay: 280 },
  { type: 'deliver', name: 'seo-launch-report.md', delay: 500 },
  { type: 'openArtifact', key: 'seo-launch-report.md', delay: 200 },
  { type: 'tool', log: { id: 't9', tool: 'message_send', label: 'message_send', detail: 'Posted SEO summary to #general', agent: 'Jordan' }, delay: 500 },
  { type: 'toolDone', id: 't9', delay: 320 },
  { type: 'subtask', id: 's6', status: 'done', delay: 350 },
  { type: 'modalMsg', sender: 'Jordan', text: 'Delivered — full audit, keyword map, and live meta updates are ready for review.', time: '14:58', tags: [{ label: 'launch-day', type: 'goal' }, { label: 'product-launch', type: 'channel' }], delay: 500 },
  { type: 'moveTask', taskId: 1, col: 'review', delay: 450 },
  { type: 'chatMsg', sender: 'Jordan', role: 'Chief of Staff', text: 'SEO Optimization is in Human Review — report + live changes are attached on the task.', time: '14:58', delay: 650 },
  { type: 'closeTaskModal', delay: 2200 },
];

export function getToolIconName(tool: string): string {
  const t = tool.toLowerCase();
  if (t.includes('browser')) return 'globe';
  if (t.includes('search')) return 'search';
  if (t.includes('read') || t.includes('write') || t.includes('patch') || t.includes('file')) return 'file';
  if (t.includes('git')) return 'git';
  if (t.includes('message')) return 'message';
  if (t.includes('exec') || t.includes('shell')) return 'terminal';
  return 'wrench';
}
