import { playbookContent, workflow } from '../helpers';

export const skillsPluginsPlaybookWorkflow = playbookContent(
  'Skills + plugins',
  'wired as playbooks.',
  'Skill installs, plugin chains, and permission audits — traced on the Trooper board.',
  [
    workflow(
      'skill-install',
      'Skill install',
      'Skill requested',
      [
        { label: 'New skill', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Validate skill', kind: 'agent', agent: 'Codex' },
        { label: 'Install to agent', kind: 'agent', agent: 'Claude Code' },
        { label: 'Sync OpenClaw', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Admin gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Install failures', value: '< 1%' },
    ),
    workflow(
      'plugin-chain',
      'Plugin chain',
      'Multi-tool mission',
      [
        { label: 'Chain mission', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'OAuth check', kind: 'agent', agent: 'OpenCode' },
        { label: 'Execute chain', kind: 'agent', agent: 'Codex' },
        { label: 'Trace each step', kind: 'integration', iconDomain: 'trooper' },
        { label: 'Complete gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Chain success rate', value: '93% first run' },
    ),
    workflow(
      'permission-audit',
      'Permission audit',
      'Cron weekly',
      [
        { label: 'Weekly audit', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Scan plugin access', kind: 'agent', agent: 'Codex' },
        { label: 'Flag over-permission', kind: 'agent', agent: 'Claude Code' },
        { label: 'Report to admin', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Revoke gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Over-permission fixes', value: '12 avg per audit' },
    ),
  ],
);
