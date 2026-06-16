import { playbookContent, workflow } from '../helpers';

export const lawyersPlaybookWorkflow = playbookContent(
  'Legal playbooks',
  'with audit trails.',
  'Contract review, redline summaries, and compliance checks — traced on the board with human approval gates.',
  [
    workflow(
      'contract-review',
      'Contract review',
      'Contract uploaded',
      [
        { label: 'NDA received', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Clause extraction', kind: 'agent', agent: 'Claude Code' },
        { label: 'Risk flag pass', kind: 'agent', agent: 'Codex' },
        { label: 'Store in Drive', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Counsel gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Review turnaround', value: '2 days → 4 hours' },
    ),
    workflow(
      'redline-summary',
      'Redline summary',
      'Counterparty redlines',
      [
        { label: 'Redlines in', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Diff key terms', kind: 'agent', agent: 'Codex' },
        { label: 'Draft response', kind: 'agent', agent: 'Claude Code' },
        { label: 'Email counsel', kind: 'integration', iconDomain: 'gmail.com' },
        { label: 'Send gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Terms flagged', value: '98% accuracy vs manual' },
    ),
    workflow(
      'compliance-check',
      'Compliance check',
      'Policy update',
      [
        { label: 'Reg change alert', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Map to contracts', kind: 'agent', agent: 'OpenCode' },
        { label: 'Gap report', kind: 'agent', agent: 'Codex' },
        { label: 'Notify legal', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Sign-off gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Coverage gaps caught', value: '3 avg per audit' },
    ),
  ],
);
