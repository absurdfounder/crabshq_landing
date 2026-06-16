import { playbookContent, workflow } from '../helpers';

export const salesPlaybookWorkflow = playbookContent(
  'Pipeline playbooks',
  'that never stall.',
  'Lead qualification, outbound sequences, and post-call CRM updates — traced with HubSpot, Gmail, and Slack.',
  [
    workflow(
      'lead-qual',
      'Lead qualification',
      'Inbound CRM lead',
      [
        { label: 'New lead', kind: 'trigger', iconDomain: 'hubspot.com' },
        { label: 'Research account', kind: 'agent', agent: 'Codex' },
        { label: 'Score ICP fit', kind: 'agent', agent: 'Claude Code' },
        { label: 'Update CRM stage', kind: 'integration', iconDomain: 'hubspot.com' },
        { label: 'Rep review', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Qualification accuracy', value: '91% rep agreement' },
    ),
    workflow(
      'outbound-seq',
      'Outbound sequence',
      'Cron daily',
      [
        { label: 'Stale opportunities', kind: 'trigger', iconDomain: 'hubspot.com' },
        { label: 'Personalize email', kind: 'agent', agent: 'Claude Code' },
        { label: 'LinkedIn touch', kind: 'agent', agent: 'OpenCode' },
        { label: 'Send via Gmail', kind: 'integration', iconDomain: 'gmail.com' },
        { label: 'Send gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Reply rate lift', value: '+22% vs template' },
    ),
    workflow(
      'post-call-crm',
      'Post-call CRM',
      'Call ended',
      [
        { label: 'Meeting finished', kind: 'trigger', iconDomain: 'google.com' },
        { label: 'Summarize notes', kind: 'agent', agent: 'Codex' },
        { label: 'Draft follow-up', kind: 'agent', agent: 'Claude Code' },
        { label: 'Post to #sales', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'CRM sync gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'CRM update lag', value: '4 hr → 12 min' },
    ),
  ],
);
