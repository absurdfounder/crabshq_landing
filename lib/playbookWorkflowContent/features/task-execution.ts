import { playbookContent, workflow } from '../helpers';

export const taskExecutionPlaybookWorkflow = playbookContent(
  'Execution playbooks',
  'ticket to done.',
  'Ticket checkout, multi-tool missions, and done gates — traced with tool calls on the board.',
  [
    workflow(
      'ticket-checkout',
      'Ticket checkout',
      'Task queued',
      [
        { label: 'Task created', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Agent checkout', kind: 'agent', agent: 'Claude Code' },
        { label: 'Plan subtasks', kind: 'agent', agent: 'Codex' },
        { label: 'Start execution', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Owner ack gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Stale tickets', value: 'Down 64%' },
    ),
    workflow(
      'multi-tool-mission',
      'Multi-tool mission',
      'In Progress',
      [
        { label: 'Mission active', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Tool chain run', kind: 'agent', agent: 'Codex' },
        { label: 'Attach artifacts', kind: 'agent', agent: 'OpenCode' },
        { label: 'Update ticket', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Review gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Tool trace coverage', value: '100% logged' },
    ),
    workflow(
      'done-gate',
      'Done gate',
      'Work complete',
      [
        { label: 'Agent marks done', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Verify deliverables', kind: 'agent', agent: 'Claude Code' },
        { label: 'Run success checks', kind: 'agent', agent: 'Codex' },
        { label: 'Notify requester', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Close gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Reopen rate', value: '8% → 3%' },
    ),
  ],
);
