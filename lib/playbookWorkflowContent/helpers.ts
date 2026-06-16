import type {
  PlaybookWorkflowContent,
  PlaybookWorkflow,
  PlaybookWorkflowNode,
} from '@/lib/playbookWorkflow';

type AgentName = 'Codex' | 'Claude Code' | 'OpenCode';

const AGENTS: AgentName[] = ['Codex', 'Claude Code', 'OpenCode'];

export function workflow(
  id: string,
  tabLabel: string,
  triggerBadge: string,
  steps: [
    { label: string; kind: 'trigger' | 'agent' | 'integration' | 'gate'; iconDomain?: string; agent?: AgentName },
    { label: string; kind: 'trigger' | 'agent' | 'integration' | 'gate'; iconDomain?: string; agent?: AgentName },
    { label: string; kind: 'trigger' | 'agent' | 'integration' | 'gate'; iconDomain?: string; agent?: AgentName },
    { label: string; kind: 'trigger' | 'agent' | 'integration' | 'gate'; iconDomain?: string; agent?: AgentName },
    { label: string; kind: 'trigger' | 'agent' | 'integration' | 'gate'; iconDomain?: string; agent?: AgentName },
  ],
  statusBar: { label: string; value: string },
): PlaybookWorkflow {
  const positions = [
    { x: 12, y: 28 },
    { x: 34, y: 22 },
    { x: 56, y: 38 },
    { x: 56, y: 66 },
    { x: 82, y: 50 },
  ];
  const nodes: PlaybookWorkflowNode[] = steps.map((step, i) => ({
    id: ['t1', 'a1', 'a2', 'i1', 'g1'][i],
    label: step.label,
    x: positions[i].x,
    y: positions[i].y,
    kind: step.kind,
    ...(step.iconDomain ? { iconDomain: step.iconDomain } : {}),
    ...(step.agent ? { agent: step.agent } : {}),
  }));
  return {
    id,
    tabLabel,
    triggerBadge,
    nodes,
    edges: [
      { from: 't1', to: 'a1' },
      { from: 'a1', to: 'a2' },
      { from: 'a1', to: 'i1' },
      { from: 'a2', to: 'g1' },
      { from: 'i1', to: 'g1' },
    ],
    statusBar,
  };
}

export function playbookContent(
  headlineDefault: string,
  headlineBrand: string,
  subheading: string,
  playbooks: PlaybookWorkflow[],
): PlaybookWorkflowContent {
  return {
    headlineLines: [{ parts: [{ text: headlineDefault, tone: 'default' }, { text: headlineBrand, tone: 'brand' }] }],
    subheading,
    playbooks,
  };
}

export { AGENTS };
