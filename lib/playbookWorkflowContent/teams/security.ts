import { playbookContent, workflow } from '../helpers';

export const securityPlaybookWorkflow = playbookContent(
  'Security playbooks',
  'with gates.',
  'Vuln triage, access reviews, and incident runbooks — traced with GitHub, Slack, and Linear.',
  [
    workflow(
      'vuln-triage',
      'Vuln triage',
      'Scanner alert',
      [
        { label: 'CVE detected', kind: 'trigger', iconDomain: 'github.com' },
        { label: 'Assess exposure', kind: 'agent', agent: 'Codex' },
        { label: 'Patch proposal', kind: 'agent', agent: 'Claude Code' },
        { label: 'Open ticket', kind: 'integration', iconDomain: 'linear.app' },
        { label: 'Sec lead gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Critical MTTR', value: '72 hr → 18 hr' },
    ),
    workflow(
      'access-review',
      'Access review',
      'Cron quarterly',
      [
        { label: 'Quarterly review', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Pull access list', kind: 'agent', agent: 'OpenCode' },
        { label: 'Flag anomalies', kind: 'agent', agent: 'Codex' },
        { label: 'Notify owners', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Revoke gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Stale access removed', value: '142 accounts Q1' },
    ),
    workflow(
      'incident-runbook',
      'Incident runbook',
      'Security incident',
      [
        { label: 'Incident declared', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Execute runbook', kind: 'agent', agent: 'Claude Code' },
        { label: 'Evidence log', kind: 'agent', agent: 'Codex' },
        { label: 'Alert #security', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Contain gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Containment time', value: '45 min avg' },
    ),
  ],
);
