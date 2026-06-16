import { playbookContent, workflow } from '../helpers';

export const multiAgentCollaborationPlaybookWorkflow = playbookContent(
  'Multi-agent playbooks',
  'fan-out and merge.',
  'Fan-out research, merge synthesis, and verifier passes — traced on one ticket.',
  [
    workflow(
      'fan-out-research',
      'Fan-out research',
      'Broad question',
      [
        { label: 'Research brief', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Split subtasks', kind: 'agent', agent: 'Codex' },
        { label: 'Parallel agents', kind: 'agent', agent: 'Claude Code' },
        { label: 'Collect results', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Lead gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Research speedup', value: '3.2× vs serial' },
    ),
    workflow(
      'merge-synthesis',
      'Merge synthesis',
      'Subtasks done',
      [
        { label: 'All agents done', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Dedupe findings', kind: 'agent', agent: 'OpenCode' },
        { label: 'Synthesize report', kind: 'agent', agent: 'Claude Code' },
        { label: 'Attach deliverable', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Publish gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Duplicate work', value: 'Down 67%' },
    ),
    workflow(
      'verifier-pass',
      'Verifier pass',
      'Draft ready',
      [
        { label: 'Worker complete', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Verifier rubric', kind: 'agent', agent: 'Codex' },
        { label: 'Fix or approve', kind: 'agent', agent: 'Claude Code' },
        { label: 'Log verdict', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Ship gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Defect escape rate', value: 'Down 74%' },
    ),
  ],
);
