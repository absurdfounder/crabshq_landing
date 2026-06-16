import { playbookContent, workflow } from '../helpers';

export const financePlaybookWorkflow = playbookContent(
  'Finance playbooks',
  'with controls.',
  'Close checklists, invoice chases, and variance reports — traced with Stripe, Sheets, and Slack.',
  [
    workflow(
      'close-checklist',
      'Close checklist',
      'Month-end cron',
      [
        { label: 'Close window', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Reconcile accounts', kind: 'agent', agent: 'Codex' },
        { label: 'Flag anomalies', kind: 'agent', agent: 'Claude Code' },
        { label: 'Update Sheets', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Controller gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Close duration', value: '5 days → 2 days' },
    ),
    workflow(
      'invoice-chase',
      'Invoice chase',
      'Overdue invoice',
      [
        { label: 'AR overdue', kind: 'trigger', iconDomain: 'stripe.com' },
        { label: 'Draft reminder', kind: 'agent', agent: 'Claude Code' },
        { label: 'Payment plan', kind: 'agent', agent: 'OpenCode' },
        { label: 'Send via Gmail', kind: 'integration', iconDomain: 'gmail.com' },
        { label: 'Send gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Collection rate', value: '+19% in 30 days' },
    ),
    workflow(
      'variance-report',
      'Variance report',
      'Budget vs actual',
      [
        { label: 'Weekly actuals', kind: 'trigger', iconDomain: 'google.com' },
        { label: 'Compute variance', kind: 'agent', agent: 'Codex' },
        { label: 'Narrative summary', kind: 'agent', agent: 'Claude Code' },
        { label: 'Post to #finance', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'CFO review gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Report prep time', value: '6 hr → 45 min' },
    ),
  ],
);
