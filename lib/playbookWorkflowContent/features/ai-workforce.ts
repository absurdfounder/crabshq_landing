import { playbookContent, workflow } from '../helpers';

export const aiWorkforcePlaybookWorkflow = playbookContent(
  'Workforce playbooks',
  'your org runs.',
  'Roster deploy, cross-role handoffs, and unit standups — traced on the Trooper board.',
  [
    workflow(
      'roster-deploy',
      'Roster deploy',
      'Unit created',
      [
        { label: 'New unit', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Assign roles', kind: 'agent', agent: 'Claude Code' },
        { label: 'Load org memory', kind: 'agent', agent: 'Codex' },
        { label: 'Enable plugins', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Commander gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Deploy time', value: '2 days → 2 hours' },
    ),
    workflow(
      'cross-role-handoff',
      'Cross-role handoff',
      'Subtask complete',
      [
        { label: 'Agent done', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Package context', kind: 'agent', agent: 'OpenCode' },
        { label: 'Route next role', kind: 'agent', agent: 'Codex' },
        { label: 'Notify assignee', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Accept gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Handoff errors', value: 'Down 71%' },
    ),
    workflow(
      'unit-standup',
      'Unit standup',
      'Cron daily',
      [
        { label: 'Morning standup', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Summarize board', kind: 'agent', agent: 'Codex' },
        { label: 'Flag blockers', kind: 'agent', agent: 'Claude Code' },
        { label: 'Post digest', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Lead review gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Blocker resolution', value: 'Same-day 89%' },
    ),
  ],
);
