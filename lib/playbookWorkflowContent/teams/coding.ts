import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';

export const codingPlaybookWorkflow: PlaybookWorkflowContent = {
  headlineLines: [
    {
      parts: [
        { text: 'Build agents that run', tone: 'default' },
        { text: 'your playbooks.', tone: 'brand' },
      ],
    },
  ],
  subheading:
    'Reusable coding runbooks — PR review, hotfix, and release train — traced on the board with GitHub, Slack, and harness agents.',
  playbooks: [
    {
      id: 'pr-review',
      tabLabel: 'PR review',
      triggerBadge: 'GitHub webhook',
      nodes: [
        { id: 't1', label: 'PR opened', x: 12, y: 28, kind: 'trigger', iconDomain: 'github.com' },
        { id: 'a1', label: 'Review harness', x: 38, y: 22, kind: 'agent', agent: 'Codex' },
        { id: 'a2', label: 'Inline comments', x: 62, y: 38, kind: 'agent', agent: 'Claude Code' },
        { id: 'i1', label: 'Notify #eng-prs', x: 38, y: 58, kind: 'integration', iconDomain: 'slack.com' },
        { id: 'g1', label: 'Merge gate', x: 82, y: 52, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'a2' },
        { from: 'a1', to: 'i1' },
        { from: 'a2', to: 'g1' },
        { from: 'i1', to: 'g1' },
      ],
      statusBar: { label: 'A/B test: comment style', value: '+18% approval rate' },
    },
    {
      id: 'hotfix',
      tabLabel: 'Hotfix',
      triggerBadge: 'Linear ticket',
      nodes: [
        { id: 't1', label: 'P0 incident', x: 14, y: 32, kind: 'trigger', iconDomain: 'linear.app' },
        { id: 'a1', label: 'Branch + patch', x: 36, y: 24, kind: 'agent', agent: 'Claude Code' },
        { id: 'a2', label: 'Run test suite', x: 58, y: 40, kind: 'agent', agent: 'Codex' },
        { id: 'i1', label: 'Open hotfix PR', x: 58, y: 68, kind: 'integration', iconDomain: 'github.com' },
        { id: 'g1', label: 'Deploy verify', x: 84, y: 48, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'a2' },
        { from: 'a2', to: 'i1' },
        { from: 'a2', to: 'g1' },
        { from: 'i1', to: 'g1' },
      ],
      statusBar: { label: 'Median hotfix time', value: '47 min → 19 min' },
    },
    {
      id: 'release-train',
      tabLabel: 'Release train',
      triggerBadge: 'Cron schedule',
      nodes: [
        { id: 't1', label: 'Weekly cut', x: 12, y: 34, kind: 'trigger', iconDomain: 'trooper' },
        { id: 'a1', label: 'Changelog draft', x: 34, y: 22, kind: 'agent', agent: 'OpenCode' },
        { id: 'a2', label: 'Tag + release', x: 56, y: 38, kind: 'agent', agent: 'Codex' },
        { id: 'i1', label: 'Post to #releases', x: 56, y: 66, kind: 'integration', iconDomain: 'slack.com' },
        { id: 'g1', label: 'Ship approval', x: 82, y: 50, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'a2' },
        { from: 'a2', to: 'i1' },
        { from: 'a2', to: 'g1' },
        { from: 'i1', to: 'g1' },
      ],
      statusBar: { label: 'Release notes quality', value: '92% accepted first pass' },
    },
  ],
};
