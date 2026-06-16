import { playbookContent, workflow } from '../helpers';

export const growthPlaybookWorkflow = playbookContent(
  'Growth playbooks',
  'that iterate.',
  'Experiment analysis, funnel reports, and rollout gates — traced with Sheets, Amplitude, and Slack.',
  [
    workflow(
      'experiment-analysis',
      'Experiment analysis',
      'Test concluded',
      [
        { label: 'A/B ended', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Stat significance', kind: 'agent', agent: 'Codex' },
        { label: 'Write-up draft', kind: 'agent', agent: 'Claude Code' },
        { label: 'Log to Sheets', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Ship gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Decision latency', value: '3 days → 6 hours' },
    ),
    workflow(
      'funnel-report',
      'Funnel report',
      'Cron weekly',
      [
        { label: 'Weekly cut', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Pull metrics', kind: 'agent', agent: 'OpenCode' },
        { label: 'Funnel breakdown', kind: 'agent', agent: 'Codex' },
        { label: 'Post #growth', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Leadership gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Report prep', value: '4 hr → 30 min' },
    ),
    workflow(
      'rollout-gate',
      'Rollout gate',
      'Feature ready',
      [
        { label: 'Rollout ticket', kind: 'trigger', iconDomain: 'linear.app' },
        { label: 'Checklist audit', kind: 'agent', agent: 'Claude Code' },
        { label: 'Risk summary', kind: 'agent', agent: 'Codex' },
        { label: 'Notify stakeholders', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Rollout gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Rollback incidents', value: 'Down 52%' },
    ),
  ],
);
