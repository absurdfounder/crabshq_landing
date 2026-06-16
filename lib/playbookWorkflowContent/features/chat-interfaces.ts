import { playbookContent, workflow } from '../helpers';

export const chatInterfacesPlaybookWorkflow = playbookContent(
  'Chat playbooks',
  'route to missions.',
  'Slack routing, DM missions, and channel digests — traced on the Trooper board.',
  [
    workflow(
      'slack-route',
      'Slack routing',
      'Channel mention',
      [
        { label: '@trooper mention', kind: 'trigger', iconDomain: 'slack.com' },
        { label: 'Parse request', kind: 'agent', agent: 'Codex' },
        { label: 'Create ticket', kind: 'agent', agent: 'Claude Code' },
        { label: 'Reply in thread', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Assign gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Routing accuracy', value: '92% correct queue' },
    ),
    workflow(
      'dm-mission',
      'DM mission',
      'Direct message',
      [
        { label: 'DM received', kind: 'trigger', iconDomain: 'slack.com' },
        { label: 'Scope mission', kind: 'agent', agent: 'Claude Code' },
        { label: 'Execute work', kind: 'agent', agent: 'OpenCode' },
        { label: 'Progress updates', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Done gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'DM → done rate', value: '78% without escalation' },
    ),
    workflow(
      'channel-digest',
      'Channel digest',
      'Cron daily',
      [
        { label: 'End of day', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Summarize threads', kind: 'agent', agent: 'Codex' },
        { label: 'Extract actions', kind: 'agent', agent: 'Claude Code' },
        { label: 'Post digest', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Lead gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Missed actions', value: 'Down 81%' },
    ),
  ],
);
