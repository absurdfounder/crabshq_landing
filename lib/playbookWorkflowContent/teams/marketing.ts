import { playbookContent, workflow } from '../helpers';

export const marketingPlaybookWorkflow = playbookContent(
  'Campaign playbooks',
  'your team runs.',
  'Content pipeline, SEO recon, and launch coordination — traced on the board with Notion, Sheets, and Slack.',
  [
    workflow(
      'content-pipeline',
      'Content pipeline',
      'Brief approved',
      [
        { label: 'Campaign brief', kind: 'trigger', iconDomain: 'notion.so' },
        { label: 'Draft pillar page', kind: 'agent', agent: 'Claude Code' },
        { label: 'SEO keyword pass', kind: 'agent', agent: 'Codex' },
        { label: 'Schedule social', kind: 'integration', iconDomain: 'linkedin.com' },
        { label: 'Publish gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Draft acceptance rate', value: '88% first pass' },
    ),
    workflow(
      'seo-recon',
      'SEO recon',
      'Cron weekly',
      [
        { label: 'Competitor crawl', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Gap analysis', kind: 'agent', agent: 'Codex' },
        { label: 'Brief proposals', kind: 'agent', agent: 'OpenCode' },
        { label: 'Log to Sheets', kind: 'integration', iconDomain: 'google.com' },
        { label: 'Review gate', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Keyword gaps found', value: '12 avg per patrol' },
    ),
    workflow(
      'launch-coord',
      'Launch coordination',
      'Launch date set',
      [
        { label: 'Launch ticket', kind: 'trigger', iconDomain: 'trooper' },
        { label: 'Cross-channel copy', kind: 'agent', agent: 'Claude Code' },
        { label: 'Asset checklist', kind: 'agent', agent: 'OpenCode' },
        { label: 'Notify #marketing', kind: 'integration', iconDomain: 'slack.com' },
        { label: 'Ship approval', kind: 'gate', iconDomain: 'trooper' },
      ],
      { label: 'Launch slip rate', value: 'Down 34% QoQ' },
    ),
  ],
);
