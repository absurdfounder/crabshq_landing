import { playbookContent, workflow } from '../helpers';

export const designPlaybookWorkflow = playbookContent(
  'Design playbooks',
  'from brief to ship.',
  'Brief-to-mock flows, feedback loops, and asset handoffs — traced with Figma, Slack, and Notion.',
  [
    workflow(
      'brief-to-mock',
      'Brief to mock',
      'Design brief ready',
      [
        { label: 'Brief in Notion', kind: 'trigger', iconDomain: 'notion.so' },
        { label: 'Wireframe draft', kind: 'agent', agent: 'Claude Code' },
        { label: 'Component pass', kind: 'agent', agent: 'Codex' },
        { label: 'Push to Figma', kind: 'integration', iconDomain: 'figma.com' },
        { label: 'Design lead gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Brief-to-mock time', value: '3 days → 8 hours' },
    ),
    workflow(
      'feedback-loop',
      'Feedback loop',
      'Comment thread',
      [
        { label: 'Figma comments', kind: 'trigger', iconDomain: 'figma.com' },
        { label: 'Triage feedback', kind: 'agent', agent: 'Codex' },
        { label: 'Apply revisions', kind: 'agent', agent: 'Claude Code' },
        { label: 'Notify #design', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Approve gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Revision cycles', value: '4.2 → 1.8 avg' },
    ),
    workflow(
      'asset-handoff',
      'Asset handoff',
      'Design approved',
      [
        { label: 'Final mock', kind: 'trigger', iconDomain: 'figma.com' },
        { label: 'Export assets', kind: 'agent', agent: 'OpenCode' },
        { label: 'Spec doc', kind: 'agent', agent: 'Claude Code' },
        { label: 'File to Drive', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Eng handoff gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Handoff defects', value: 'Down 55%' },
    ),
  ],
);
