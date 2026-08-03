import { playbookContent, workflow } from '../helpers';

export const inboxPlaybookWorkflow = playbookContent(
  'Inbox playbooks',
  'every channel, one CRM.',
  'Unified triage, scheduled sends, and follow-up gates across email and messaging.',
  [
    workflow(
      'unified-triage',
      'Unified triage',
      'Message received',
      [
        { label: 'Any channel inbound', kind: 'trigger', iconDomain: 'gmail.com' },
        { label: 'Tag & remember contact', kind: 'agent', agent: 'Codex' },
        { label: 'Route to owner', kind: 'agent', agent: 'Claude Code' },
        { label: 'Update CRM thread', kind: 'integration', iconDomain: 'linkedin.com' },
        { label: 'Human gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Missed follow-ups', value: 'Down 71%' },
    ),
    workflow(
      'digest-send',
      'Digest send',
      'Schedule due',
      [
        { label: 'Changelog / blog ready', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Draft newsletter', kind: 'agent', agent: 'Claude Code' },
        { label: 'Personalize audience', kind: 'agent', agent: 'Codex' },
        { label: 'Queue send', kind: 'integration', iconDomain: 'gmail.com' },
        { label: 'Approve before send', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Time to publish', value: '2 days → 12 min' },
    ),
    workflow(
      'follow-up-drip',
      'Follow-up drip',
      'Lead went quiet',
      [
        { label: 'No reply 3 days', kind: 'trigger', iconDomain: 'whatsapp.com' },
        { label: 'Pick channel', kind: 'agent', agent: 'OpenCode' },
        { label: 'Draft nudge', kind: 'agent', agent: 'Claude Code' },
        { label: 'Send via channel', kind: 'integration', iconDomain: 'x.com' },
        { label: 'Log outcome', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Reply rate', value: '+34%' },
    ),
  ],
);
