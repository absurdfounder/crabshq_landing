import { playbookContent, workflow } from '../helpers';

export const researchPlaybookWorkflow = playbookContent(
  'Research playbooks',
  'on autopilot.',
  'Source sweeps, memo synthesis, and monitor alerts — traced with Notion, Sheets, and Slack.',
  [
    workflow(
      'source-sweep',
      'Source sweep',
      'Research brief',
      [
        { label: 'Brief assigned', kind: 'trigger', iconDomain: 'notion.so' },
        { label: 'Multi-source crawl', kind: 'agent', agent: 'Codex' },
        { label: 'Extract citations', kind: 'agent', agent: 'Claude Code' },
        { label: 'Log sources', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Analyst gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Sources per brief', value: '24 avg in 45 min' },
    ),
    workflow(
      'memo-synthesis',
      'Memo synthesis',
      'Sources collected',
      [
        { label: 'Raw notes ready', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Structure outline', kind: 'agent', agent: 'OpenCode' },
        { label: 'Draft memo', kind: 'agent', agent: 'Claude Code' },
        { label: 'Save to Notion', kind: 'integration', iconDomain: 'notion.so' },
        { label: 'Partner gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Memo acceptance', value: '85% minor edits only' },
    ),
    workflow(
      'monitor-alert',
      'Monitor alert',
      'Cron daily',
      [
        { label: 'Watchlist scan', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Detect signal', kind: 'agent', agent: 'Codex' },
        { label: 'Draft alert', kind: 'agent', agent: 'Claude Code' },
        { label: 'Post #research', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Publish gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Signal latency', value: '< 2 hr from event' },
    ),
  ],
);
