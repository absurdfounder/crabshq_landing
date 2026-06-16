import { playbookContent, workflow } from '../helpers';

export const persistentMemoryPlaybookWorkflow = playbookContent(
  'Memory playbooks',
  'that compound.',
  'Context load, memory updates, and cross-agent recall — traced on every mission.',
  [
    workflow(
      'context-load',
      'Context load',
      'Mission started',
      [
        { label: 'Ticket opened', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Load org memory', kind: 'agent', agent: 'Codex' },
        { label: 'Inject context', kind: 'agent', agent: 'Claude Code' },
        { label: 'Attach to thread', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Scope gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Context hit rate', value: '94% relevant docs' },
    ),
    workflow(
      'memory-update',
      'Memory update',
      'Decision made',
      [
        { label: 'Outcome logged', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Extract learnings', kind: 'agent', agent: 'OpenCode' },
        { label: 'Write memory file', kind: 'agent', agent: 'Claude Code' },
        { label: 'Sync to unit', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Editor gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Memory freshness', value: '< 24 hr lag' },
    ),
    workflow(
      'cross-agent-recall',
      'Cross-agent recall',
      'Handoff event',
      [
        { label: 'Agent switch', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Recall prior work', kind: 'agent', agent: 'Codex' },
        { label: 'Merge thread context', kind: 'agent', agent: 'Claude Code' },
        { label: 'Continue mission', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Continuity gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Context loss incidents', value: 'Near zero' },
    ),
  ],
);
