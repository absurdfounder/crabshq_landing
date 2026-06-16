import { playbookContent, workflow } from '../helpers';

export const customerSupportPlaybookWorkflow = playbookContent(
  'Support playbooks',
  'with human gates.',
  'Ticket triage, KB drafts, and escalations — traced with Zendesk, Intercom, and Slack.',
  [
    workflow(
      'ticket-triage',
      'Ticket triage',
      'New support ticket',
      [
        { label: 'Ticket opened', kind: 'trigger', iconDomain: 'zendesk.com' },
        { label: 'Classify intent', kind: 'agent', agent: 'Codex' },
        { label: 'KB lookup', kind: 'agent', agent: 'Claude Code' },
        { label: 'Assign queue', kind: 'integration', iconDomain: 'zendesk.com' },
        { label: 'Priority gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'First response time', value: '2 hr → 14 min' },
    ),
    workflow(
      'kb-draft',
      'KB draft',
      'Repeat question',
      [
        { label: 'Pattern detected', kind: 'trigger', iconDomain: 'intercom.com' },
        { label: 'Draft article', kind: 'agent', agent: 'Claude Code' },
        { label: 'Link tickets', kind: 'agent', agent: 'OpenCode' },
        { label: 'Publish to KB', kind: 'integration', iconDomain: 'notion.so' },
        { label: 'Editor gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Deflection rate', value: '+31% on new articles' },
    ),
    workflow(
      'escalation',
      'Escalation',
      'SLA breach risk',
      [
        { label: 'SLA warning', kind: 'trigger', iconDomain: 'zendesk.com' },
        { label: 'Summarize thread', kind: 'agent', agent: 'Codex' },
        { label: 'Draft escalation', kind: 'agent', agent: 'Claude Code' },
        { label: 'Alert #support', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Manager gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'SLA breaches', value: 'Down 48% QoQ' },
    ),
  ],
);
