import type { DemoColumnId } from '@/components/demoTheme';
import type {
  DemoArtifact,
  DemoSubtask,
  DemoTag,
  TaskExecStep,
} from '@/components/demoTaskExecution';

export type DemoChannel = {
  id: string;
  name: string;
  preview: string;
  time: string;
  system?: boolean;
};

export type DemoKanbanTask = {
  id: number;
  title: string;
  col: DemoColumnId;
  tags: string[];
  watchers: string[];
  comments: number;
};

export type ChatScriptStep =
  | { type: 'mention_tab'; text?: string; delay: number }
  | { type: 'typing'; text?: string; delay: number }
  | { type: 'send'; sender?: string; role?: string; text?: string; delay: number }
  | { type: 'nick_typing'; delay: number }
  | { type: 'response'; sender?: string; role?: string; text?: string; time?: string; delay: number }
  | { type: 'reaction'; emoji?: string; count?: number; delay: number }
  | { type: 'addTasks'; phase: 1 | 2; delay: number };

export type DemoOrg = {
  name: string;
  domain: string;
  icon: string;
};

export type ChannelBrand = 'trooper' | 'slack' | 'whatsapp';

export type DemoScenarioId =
  | 'launch'
  | 'coding'
  | 'marketing'
  | 'sales'
  | 'legal'
  | 'engineering'
  | 'operations'
  | 'slack'
  | 'whatsapp'
  | 'messaging'
  | 'email'
  | 'design'
  | 'support'
  | 'finance'
  | 'bd'
  | 'research'
  | 'security'
  | 'pr'
  | 'growth';

export type DemoScenario = {
  id: DemoScenarioId;
  org: DemoOrg;
  channels: DemoChannel[];
  phase1Tasks: DemoKanbanTask[];
  phase2Tasks: DemoKanbanTask[];
  chatScript: ChatScriptStep[];
  taskExecScript: TaskExecStep[];
  initialSubtasks: DemoSubtask[];
  spotlightTaskId: number;
  spotlightTaskTags: DemoTag[];
  spotlightAssignee: string;
  artifacts: Record<string, DemoArtifact>;
  /** Artifact keys shown together in modal Canvas beat */
  canvasArtifacts?: string[];
  deliverArtifactKey?: string;
  defaultChannel?: string;
  defaultSidebarTab?: 'channels' | 'menu';
  channelBrand?: ChannelBrand;
};
