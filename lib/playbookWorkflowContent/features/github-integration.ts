import type { PlaybookWorkflowContent } from '@/lib/playbookWorkflow';

export const githubIntegrationPlaybookWorkflow: PlaybookWorkflowContent = {
  headlineLines: [
    {
      parts: [
        { text: 'GitHub playbooks', tone: 'default' },
        { text: 'on autopilot.', tone: 'brand' },
      ],
    },
  ],
  subheading:
    'Commits, PRs, CI traces, and merge gates — wired as reusable playbooks your agents execute end-to-end.',
  playbooks: [
    {
      id: 'pr-ship',
      tabLabel: 'PR ship loop',
      triggerBadge: 'Ticket → In Progress',
      nodes: [
        { id: 't1', label: 'Mission started', x: 12, y: 30, kind: 'trigger', iconDomain: 'trooper' },
        { id: 'a1', label: 'Clone + patch', x: 34, y: 22, kind: 'agent', agent: 'Claude Code' },
        { id: 'i1', label: 'Open PR', x: 56, y: 36, kind: 'integration', iconDomain: 'github.com' },
        { id: 'a2', label: 'Attach CI log', x: 56, y: 64, kind: 'agent', agent: 'Codex' },
        { id: 'g1', label: 'Human merge', x: 84, y: 48, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'i1' },
        { from: 'i1', to: 'a2' },
        { from: 'a2', to: 'g1' },
        { from: 'i1', to: 'g1' },
      ],
      statusBar: { label: 'CI pass rate', value: '94% first run' },
    },
    {
      id: 'ci-remediation',
      tabLabel: 'CI remediation',
      triggerBadge: 'GitHub check failed',
      nodes: [
        { id: 't1', label: 'CI red', x: 14, y: 32, kind: 'trigger', iconDomain: 'github.com' },
        { id: 'a1', label: 'Parse failure log', x: 36, y: 24, kind: 'agent', agent: 'Codex' },
        { id: 'a2', label: 'Propose fix', x: 58, y: 40, kind: 'agent', agent: 'Claude Code' },
        { id: 'i1', label: 'Push commit', x: 58, y: 68, kind: 'integration', iconDomain: 'github.com' },
        { id: 'g1', label: 'Re-run CI', x: 84, y: 50, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'a2' },
        { from: 'a2', to: 'i1' },
        { from: 'i1', to: 'g1' },
        { from: 'a2', to: 'g1' },
      ],
      statusBar: { label: 'Auto-fix success', value: '71% without human edit' },
    },
    {
      id: 'rollback',
      tabLabel: 'Rollback',
      triggerBadge: 'Deploy alert',
      nodes: [
        { id: 't1', label: 'Failed deploy', x: 12, y: 34, kind: 'trigger', iconDomain: 'github.com' },
        { id: 'a1', label: 'Identify bad commit', x: 34, y: 22, kind: 'agent', agent: 'Codex' },
        { id: 'a2', label: 'Revert PR', x: 56, y: 38, kind: 'agent', agent: 'Claude Code' },
        { id: 'i1', label: 'Notify #incidents', x: 56, y: 66, kind: 'integration', iconDomain: 'slack.com' },
        { id: 'g1', label: 'Verify recovery', x: 82, y: 50, kind: 'gate', iconDomain: 'trooper' },
      ],
      edges: [
        { from: 't1', to: 'a1' },
        { from: 'a1', to: 'a2' },
        { from: 'a2', to: 'i1' },
        { from: 'a2', to: 'g1' },
        { from: 'i1', to: 'g1' },
      ],
      statusBar: { label: 'Mean time to recover', value: '12 min avg' },
    },
  ],
};
