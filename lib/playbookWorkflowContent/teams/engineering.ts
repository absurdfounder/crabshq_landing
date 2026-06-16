import { playbookContent, workflow } from '../helpers';

export const engineeringPlaybookWorkflow = playbookContent(
  'Engineering playbooks',
  'on the board.',
  'Incident triage, infra changes, and on-call handoffs — traced with PagerDuty, GitHub, and Slack.',
  [
    workflow(
      'incident-triage',
      'Incident triage',
      'PagerDuty alert',
      [
        { label: 'P1 alert', kind: 'trigger', iconDomain: 'pagerduty.com' },
        { label: 'Parse logs', kind: 'agent', agent: 'Codex' },
        { label: 'Draft runbook', kind: 'agent', agent: 'Claude Code' },
        { label: 'Open incident', kind: 'integration', iconDomain: 'github.com' },
        { label: 'Commander gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Time to triage', value: '18 min → 6 min' },
    ),
    workflow(
      'infra-change',
      'Infra change',
      'Change request',
      [
        { label: 'Terraform PR', kind: 'trigger', iconDomain: 'github.com' },
        { label: 'Plan review', kind: 'agent', agent: 'Codex' },
        { label: 'Risk assessment', kind: 'agent', agent: 'Claude Code' },
        { label: 'Notify #infra', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Apply gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Rollback rate', value: 'Down 41% YoY' },
    ),
    workflow(
      'oncall-handoff',
      'On-call handoff',
      'Shift change',
      [
        { label: 'Shift ending', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Summarize open', kind: 'agent', agent: 'OpenCode' },
        { label: 'Link runbooks', kind: 'agent', agent: 'Codex' },
        { label: 'Post handoff', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Ack gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Missed handoffs', value: 'Zero in 90 days' },
    ),
  ],
);
