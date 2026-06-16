import { playbookContent, workflow } from '../helpers';

export const operationsPlaybookWorkflow = playbookContent(
  'Ops playbooks',
  'your unit runs.',
  'Vendor intake, process audits, and cross-team routing — traced with Notion, Slack, and Sheets.',
  [
    workflow(
      'vendor-intake',
      'Vendor intake',
      'Vendor request',
      [
        { label: 'New vendor form', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Security questionnaire', kind: 'agent', agent: 'Claude Code' },
        { label: 'Compare pricing', kind: 'agent', agent: 'Codex' },
        { label: 'Log to Notion', kind: 'integration', iconDomain: 'notion.so' },
        { label: 'Procurement gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Intake cycle time', value: '5 days → 1.5 days' },
    ),
    workflow(
      'process-audit',
      'Process audit',
      'Cron monthly',
      [
        { label: 'Monthly audit', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Map workflows', kind: 'agent', agent: 'OpenCode' },
        { label: 'Find bottlenecks', kind: 'agent', agent: 'Codex' },
        { label: 'Update playbook', kind: 'integration', iconDomain: 'notion.so' },
        { label: 'Ops lead gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Bottlenecks resolved', value: '7 avg per audit' },
    ),
    workflow(
      'cross-team-route',
      'Cross-team routing',
      'Inbound request',
      [
        { label: 'Ops inbox', kind: 'trigger', iconDomain: 'gmail.com' },
        { label: 'Classify request', kind: 'agent', agent: 'Codex' },
        { label: 'Create ticket', kind: 'agent', agent: 'Claude Code' },
        { label: 'Route to #team', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Owner gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Misroutes', value: 'Down 62%' },
    ),
  ],
);
