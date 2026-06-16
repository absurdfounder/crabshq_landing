import { playbookContent, workflow } from '../helpers';

export const browserControlPlaybookWorkflow = playbookContent(
  'Browser playbooks',
  'agents execute.',
  'Form fills, scrape-and-act flows, and authenticated sessions — traced on the live browser canvas.',
  [
    workflow(
      'form-fill',
      'Form fill',
      'Form mission',
      [
        { label: 'Form URL', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Navigate + read', kind: 'agent', agent: 'Claude Code' },
        { label: 'Fill fields', kind: 'agent', agent: 'Codex' },
        { label: 'Capture screenshot', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Submit gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Form error rate', value: 'Down 78%' },
    ),
    workflow(
      'scrape-act',
      'Scrape + act',
      'Research task',
      [
        { label: 'Target page', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Extract data', kind: 'agent', agent: 'Codex' },
        { label: 'Structured output', kind: 'agent', agent: 'OpenCode' },
        { label: 'Save artifact', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Quality gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Extraction accuracy', value: '96% verified' },
    ),
    workflow(
      'auth-flow',
      'Authenticated flow',
      'Login required',
      [
        { label: 'Auth needed', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Session login', kind: 'agent', agent: 'Claude Code' },
        { label: 'Execute steps', kind: 'agent', agent: 'Codex' },
        { label: 'Log trace', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Human gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Session failures', value: '< 2% retry rate' },
    ),
  ],
);
