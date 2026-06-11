import type { DemoArtifact, DemoFeedItem, DemoSubtask } from './demoTaskExecution';
import { DEMO_ARTIFACTS } from './demoTaskExecution';

/** Mid-execution SEO task — tools + artifact panel (Action / ticket demos) */
export const ACTION_TASK_SNAPSHOT = {
  taskTitle: 'SEO Optimization for Wonder',
  assignee: 'Jordan',
  statusCol: 'in_progress' as const,
  subtasks: [
    { id: 's1', title: 'Audit Wonder SEO baseline & competitors', agent: 'Jordan', status: 'done' as const },
    { id: 's2', title: 'Research Product Hunt launch keywords', agent: 'Aria', status: 'done' as const },
    { id: 's3', title: 'Browse wonder.gg and capture meta gaps', agent: 'Aria', status: 'done' as const },
    { id: 's4', title: 'Update meta tags, OG images, sitemap', agent: 'Ren', status: 'running' as const },
    { id: 's5', title: 'Commit & deploy SEO changes', agent: 'Leo', status: 'pending' as const },
    { id: 's6', title: 'Deliver launch SEO report to team', agent: 'Jordan', status: 'pending' as const },
  ] satisfies DemoSubtask[],
  feed: [
    { kind: 'message', id: 'm1', sender: 'Jordan', text: "Opening SEO Optimization — I'll coordinate Aria on research, Ren on page updates, Leo on deploy.", time: '14:55' },
    { kind: 'tool', id: 't1', tool: 'web_search', label: 'web_search', detail: 'wonder.gg competitor SEO product hunt launch', agent: 'Jordan', status: 'done' as const },
    { kind: 'message', id: 'm2', sender: 'Aria', text: 'Pulling keyword clusters for launch day — gaming + discovery terms.', time: '14:56' },
    { kind: 'tool', id: 't2', tool: 'web_search', label: 'web_search', detail: 'indie game launch keywords 2026', agent: 'Aria', status: 'done' as const },
    { kind: 'tool', id: 't3', tool: 'browser_navigate', label: 'browser_navigate', detail: 'https://wonder.gg', agent: 'Aria', status: 'done' as const },
    { kind: 'tool', id: 't4', tool: 'browser_snapshot', label: 'browser_snapshot', detail: 'Captured title, meta, OG tags', agent: 'Aria', status: 'done' as const },
    { kind: 'message', id: 'm3', sender: 'Ren', text: 'Updating homepage meta + generating sitemap entries for new game pages.', time: '14:57' },
    { kind: 'tool', id: 't5', tool: 'read_file', label: 'read_file', detail: '/workspace/wonder/index.html', agent: 'Ren', status: 'done' as const },
    { kind: 'tool', id: 't6', tool: 'apply_patch', label: 'apply_patch', detail: 'index.html — title, description, og:image', agent: 'Ren', status: 'running' as const },
  ] satisfies DemoFeedItem[],
  artifact: DEMO_ARTIFACTS['index.html'] as DemoArtifact,
  delivery: null as string | null,
};

/** Deploy ticket — full trace thread, empty artifact panel */
export const TICKET_TASK_SNAPSHOT = {
  taskTitle: 'Deploy updated pricing page',
  assignee: 'Leo',
  statusCol: 'in_progress' as const,
  subtasks: [
    { id: 'd1', title: 'Run test suite on staging', agent: 'Leo', status: 'done' as const },
    { id: 'd2', title: 'Deploy to staging environment', agent: 'Leo', status: 'done' as const },
    { id: 'd3', title: 'Smoke test checkout flow', agent: 'Ren', status: 'done' as const },
    { id: 'd4', title: 'Deploy to production', agent: 'Leo', status: 'running' as const },
    { id: 'd5', title: 'Post deploy summary to #engineering', agent: 'Jordan', status: 'pending' as const },
  ] satisfies DemoSubtask[],
  feed: [
    { kind: 'message', id: 'm1', sender: 'Leo', text: 'Starting deploy pipeline for pricing page v2 — tests first, then staging, then prod.', time: '09:14' },
    { kind: 'tool', id: 't1', tool: 'shell_exec', label: 'run_tests()', detail: 'pnpm test — 142 passed', agent: 'Leo', status: 'done' as const },
    { kind: 'tool', id: 't2', tool: 'shell_exec', label: 'deploy_to_staging()', detail: 'vercel deploy --env staging', agent: 'Leo', status: 'done' as const },
    { kind: 'tool', id: 't3', tool: 'browser_navigate', label: 'smoke_test()', detail: 'Checkout flow — 3 scenarios', agent: 'Ren', status: 'done' as const },
    { kind: 'message', id: 'm2', sender: 'Leo', text: 'Staging green. Rolling to production now — every step is traced below.', time: '09:18' },
    { kind: 'tool', id: 't4', tool: 'shell_exec', label: 'deploy_to_production()', detail: 'vercel deploy --prod', agent: 'Leo', status: 'running' as const },
  ] satisfies DemoFeedItem[],
  artifact: null as DemoArtifact | null,
  delivery: null as string | null,
};
