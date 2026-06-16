import { playbookContent, workflow } from '../helpers';

export const systemAccessPlaybookWorkflow = playbookContent(
  'System playbooks',
  'with guardrails.',
  'Shell tasks, file patches, and environment checks — traced with permission gates.',
  [
    workflow(
      'shell-task',
      'Shell task',
      'Command approved',
      [
        { label: 'Shell request', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Validate command', kind: 'agent', agent: 'Codex' },
        { label: 'Execute on VPS', kind: 'agent', agent: 'Claude Code' },
        { label: 'Stream output', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Allowlist gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Blocked commands', value: '100% caught pre-run' },
    ),
    workflow(
      'file-patch',
      'File patch',
      'Patch mission',
      [
        { label: 'File change', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Diff preview', kind: 'agent', agent: 'Claude Code' },
        { label: 'Apply patch', kind: 'agent', agent: 'Codex' },
        { label: 'Attach to ticket', kind: 'integration', iconDomain: 'github.com' },
        { label: 'Merge gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Bad patches', value: '0.3% revert rate' },
    ),
    workflow(
      'env-check',
      'Env check',
      'Cron hourly',
      [
        { label: 'Health cron', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Run diagnostics', kind: 'agent', agent: 'OpenCode' },
        { label: 'Compare baseline', kind: 'agent', agent: 'Codex' },
        { label: 'Alert #ops', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Incident gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Detection lead time', value: '12 min avg' },
    ),
  ],
);
