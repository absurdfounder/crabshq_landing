import type { DemoColumnId } from './demoTheme';

export type DemoSubtaskStatus = 'pending' | 'running' | 'done';

export type DemoSubtask = {
  id: string;
  title: string;
  agent: string;
  status: DemoSubtaskStatus;
};

export type DemoTag = {
  label: string;
  type: 'channel' | 'goal' | 'site' | 'topic';
  domain?: string;
};

export type DemoToolLog = {
  id: string;
  tool: string;
  label: string;
  detail?: string;
  agent: string;
  status: 'running' | 'done';
  faviconDomain?: string;
};

export type DemoModalMessage = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

export type DemoFeedItem =
  | { kind: 'message'; id: string; sender: string; text: string; time: string; tags?: DemoTag[] }
  | ({ kind: 'tool' } & DemoToolLog);

export type DemoArtifact = {
  name: string;
  content: string;
  ext?: string;
};

/** Scripted execution steps after kanban fill — drives modal + board updates */
export type TaskExecStep =
  | { type: 'moveTask'; taskId: number; col: DemoColumnId; delay: number }
  | { type: 'openTaskModal'; taskId: number; delay: number }
  | { type: 'subtask'; id: string; status: DemoSubtaskStatus; delay: number }
  | { type: 'tool'; log: Omit<DemoToolLog, 'status'>; delay: number }
  | { type: 'toolDone'; id: string; delay: number }
  | { type: 'modalMsg'; sender: string; text: string; time?: string; tags?: DemoTag[]; delay: number }
  | { type: 'openArtifact'; key: string; delay: number }
  | { type: 'deliver'; name: string; delay: number }
  | { type: 'closeTaskModal'; delay: number }
  | { type: 'chatMsg'; sender: string; role: string; text: string; time: string; delay: number };

export function getToolIconName(tool: string): string {
  const t = tool.toLowerCase();
  if (t.includes('browser')) return 'globe';
  if (t.includes('search')) return 'search';
  if (t.includes('read') || t.includes('write') || t.includes('patch') || t.includes('file')) return 'file';
  if (t.includes('git')) return 'git';
  if (t.includes('message')) return 'message';
  if (t.includes('exec') || t.includes('shell')) return 'terminal';
  return 'wrench';
}
