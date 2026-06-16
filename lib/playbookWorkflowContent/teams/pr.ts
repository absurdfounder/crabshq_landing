import { playbookContent, workflow } from '../helpers';

export const prPlaybookWorkflow = playbookContent(
  'Comms playbooks',
  'your team ships.',
  'Press drafts, journalist briefs, and launch comms — traced with Notion, Gmail, and Slack.',
  [
    workflow(
      'press-draft',
      'Press draft',
      'News hook detected',
      [
        { label: 'News alert', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Draft release', kind: 'agent', agent: 'Claude Code' },
        { label: 'Quote options', kind: 'agent', agent: 'OpenCode' },
        { label: 'Save to Notion', kind: 'integration', iconDomain: 'notion.so' },
        { label: 'Comms gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Draft turnaround', value: '4 hr → 45 min' },
    ),
    workflow(
      'journalist-brief',
      'Journalist brief',
      'Interview scheduled',
      [
        { label: 'Briefing call', kind: 'trigger', iconDomain: 'google.com' },
        { label: 'Talking points', kind: 'agent', agent: 'Claude Code' },
        { label: 'Fact check pass', kind: 'agent', agent: 'Codex' },
        { label: 'Email briefing', kind: 'integration', iconDomain: 'gmail.com' },
        { label: 'Spokesperson gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Factual errors caught', value: '100% pre-send' },
    ),
    workflow(
      'launch-comms',
      'Launch comms',
      'Launch approved',
      [
        { label: 'Launch go', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Channel copy', kind: 'agent', agent: 'OpenCode' },
        { label: 'Media list', kind: 'agent', agent: 'Codex' },
        { label: 'Schedule sends', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Publish gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Launch coverage', value: '+40% vs prior' },
    ),
  ],
);
