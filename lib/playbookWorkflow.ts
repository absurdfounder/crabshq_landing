import type { MarketingHeadlineLine } from '@/components/marketing/MarketingHeadline';

export type PlaybookNodeKind = 'trigger' | 'agent' | 'integration' | 'gate';

export type PlaybookWorkflowNode = {
  id: string;
  label: string;
  /** 0–100 position within the canvas */
  x: number;
  y: number;
  kind?: PlaybookNodeKind;
  /** Favicon domain, or "trooper" for logomark */
  iconDomain?: string;
  /** Agent provider label for avatar chip */
  agent?: string;
};

export type PlaybookWorkflowEdge = {
  from: string;
  to: string;
};

export type PlaybookWorkflowStatus = {
  label: string;
  value: string;
};

export type PlaybookWorkflow = {
  id: string;
  tabLabel: string;
  triggerBadge?: string;
  nodes: PlaybookWorkflowNode[];
  edges: PlaybookWorkflowEdge[];
  statusBar?: PlaybookWorkflowStatus;
};

export type PlaybookWorkflowContent = {
  headlineLines?: MarketingHeadlineLine[];
  subheading?: string;
  playbooks: PlaybookWorkflow[];
};
