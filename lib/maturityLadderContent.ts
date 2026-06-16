import type { MaturityLadderContent } from '@/lib/maturityLadder';

export const codingPrReviewLadder: MaturityLadderContent = {
  title: 'Example — PR review workflow',
  levels: [
    {
      id: 'L1',
      headline: 'Engineers paste diffs, one prompt at a time',
      steps: [
        { label: 'Review this PR diff', icon: 'user' },
        { label: 'Returns line-by-line feedback', icon: 'agent' },
        { label: 'Ask about test coverage', icon: 'user' },
        { label: 'Suggests missing edge cases', icon: 'agent' },
      ],
    },
    {
      id: 'L2',
      headline: 'Engineers run a review skill and handle output',
      steps: [
        { label: 'Run PR review skill', icon: 'user' },
        { label: 'Analyzes unified diff', icon: 'agent', grouped: true },
        { label: 'Checks CI logs & coverage', icon: 'agent', grouped: true },
        { label: 'Drafts inline comments', icon: 'agent', grouped: true },
        { label: 'Engineer approves & posts', icon: 'user' },
      ],
    },
    {
      id: 'L3',
      headline: 'New PRs are reviewed and commented automatically',
      steps: [
        { label: 'PR opened on GitHub', icon: 'integration' },
        { label: 'Runs multi-agent review harness', icon: 'agent', grouped: true },
        { label: 'Posts inline comments', icon: 'agent', grouped: true },
        { label: 'Flags merge blockers', icon: 'agent', grouped: true },
        { label: 'Escalate security-sensitive files', icon: 'escalate' },
      ],
    },
    {
      id: 'L4',
      headline: 'Your agents tune the merge gate on their own',
      steps: [
        { label: 'Improve merge quality & cycle time', icon: 'goal', accent: true },
        { label: 'Tunes review rubric from outcomes', icon: 'agent', grouped: true },
        { label: 'Tests comment style variants', icon: 'agent', grouped: true },
        { label: 'Refines auto-merge rules', icon: 'agent', grouped: true },
        { label: 'Median review time down 58% this quarter', icon: 'success' },
      ],
    },
  ],
};

export const salesLeadQualificationLadder: MaturityLadderContent = {
  title: 'Example — Lead qualification',
  levels: [
    {
      id: 'L1',
      headline: 'Reps research each lead, one prompt at a time',
      steps: [
        { label: 'Research this company', icon: 'user' },
        { label: 'Returns firmographics & signals', icon: 'agent' },
        { label: 'Draft a first-touch email', icon: 'user' },
        { label: 'Generates personalized outreach', icon: 'agent' },
      ],
    },
    {
      id: 'L2',
      headline: 'Reps use a qualification skill and handle output',
      steps: [
        { label: 'Qualify this lead', icon: 'user' },
        { label: 'Researches company & contacts', icon: 'agent', grouped: true },
        { label: 'Scores ICP fit', icon: 'agent', grouped: true },
        { label: 'Drafts outreach email', icon: 'agent', grouped: true },
        { label: 'Rep reviews & sends', icon: 'user' },
      ],
    },
    {
      id: 'L3',
      headline: 'New leads are qualified and contacted automatically',
      steps: [
        { label: 'Inbound lead from CRM', icon: 'integration' },
        { label: 'Researches account', icon: 'agent', grouped: true },
        { label: 'Scores & routes to rep', icon: 'agent', grouped: true },
        { label: 'Sends first-touch sequence', icon: 'agent', grouped: true },
        { label: 'Escalate to human if unsure', icon: 'escalate' },
      ],
    },
    {
      id: 'L4',
      headline: 'Your agents optimize outreach strategy on their own',
      steps: [
        { label: 'Improve outbound conversion', icon: 'goal', accent: true },
        { label: 'Designs messaging experiments', icon: 'agent', grouped: true },
        { label: 'Tests subject-line variants', icon: 'agent', grouped: true },
        { label: 'Refines ICP criteria', icon: 'agent', grouped: true },
        { label: 'Reply rate up 72% this quarter', icon: 'success' },
      ],
    },
  ],
};

export const githubIntegrationLadder: MaturityLadderContent = {
  title: 'Example — GitHub ops workflow',
  levels: [
    {
      id: 'L1',
      headline: 'Devs ask for help, one GitHub action at a time',
      steps: [
        { label: 'Open a branch for this fix', icon: 'user' },
        { label: 'Returns branch name suggestion', icon: 'agent' },
        { label: 'Commit and push the patch', icon: 'user' },
        { label: 'Runs git commands locally', icon: 'agent' },
      ],
    },
    {
      id: 'L2',
      headline: 'Devs trigger a GitHub skill and review output',
      steps: [
        { label: 'Ship this fix to GitHub', icon: 'user' },
        { label: 'Creates branch & commits', icon: 'agent', grouped: true },
        { label: 'Opens draft PR', icon: 'agent', grouped: true },
        { label: 'Waits for CI status', icon: 'agent', grouped: true },
        { label: 'Engineer marks ready to merge', icon: 'user' },
      ],
    },
    {
      id: 'L3',
      headline: 'Tickets become commits, PRs, and CI traces automatically',
      steps: [
        { label: 'Ticket moved to In Progress', icon: 'integration' },
        { label: 'Clones repo & applies patch', icon: 'agent', grouped: true },
        { label: 'Opens PR with diff on Canvas', icon: 'agent', grouped: true },
        { label: 'Attaches CI log to thread', icon: 'agent', grouped: true },
        { label: 'Human approves merge', icon: 'escalate' },
      ],
    },
    {
      id: 'L4',
      headline: 'Agents tune the GitHub pipeline autonomously',
      steps: [
        { label: 'Reduce failed merges & rollback rate', icon: 'goal', accent: true },
        { label: 'Analyzes CI failure patterns', icon: 'agent', grouped: true },
        { label: 'Proposes test & lint rule updates', icon: 'agent', grouped: true },
        { label: 'Refines merge gate thresholds', icon: 'agent', grouped: true },
        { label: 'Rollback incidents down 41% this quarter', icon: 'success' },
      ],
    },
  ],
};
