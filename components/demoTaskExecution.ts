import type { DemoColumnId } from './demoTheme';

export type DemoSubtaskStatus = 'pending' | 'running' | 'done';

export type DemoSubtask = {
  id: string;
  title: string;
  agent: string;
  status: DemoSubtaskStatus;
  /** Harness provider — Claude Code, Codex, OpenCode, etc. */
  provider?: string;
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
  /** When set, tool row shows provider logo (Codex, Claude Code, OpenCode). */
  provider?: string;
  /** Composio integration slug — shows integration logo in tool timeline. */
  integration?: string;
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

export type DemoArtifactKind = 'code' | 'diff' | 'markdown' | 'html' | 'image' | 'video';

export type DemoArtifact = {
  name: string;
  content: string;
  ext?: string;
  kind?: DemoArtifactKind;
  /** Checked-in asset under public/ — preferred over inline placeholders */
  src?: string;
  /** Live page URL shown in browser chrome address bar (HTML / browser snapshots) */
  browserUrl?: string;
  /** Favicon domain override for browser chrome */
  faviconDomain?: string;
  /** Video poster frame when src is not a playable file */
  posterSrc?: string;
  /** For image/video artifacts — alt or caption */
  caption?: string;
};

export type DemoWorkspaceMode = 'ide' | 'canvas';

/** Scripted execution steps after kanban fill — drives modal + board updates */
export type TaskExecStep =
  | { type: 'moveTask'; taskId: number; col: DemoColumnId; delay: number }
  | { type: 'openTaskModal'; taskId: number; delay: number }
  | { type: 'subtask'; id: string; status: DemoSubtaskStatus; delay: number }
  | { type: 'tool'; log: Omit<DemoToolLog, 'status'>; delay: number }
  | { type: 'toolDone'; id: string; delay: number }
  | { type: 'modalMsg'; sender: string; text: string; time?: string; tags?: DemoTag[]; delay: number }
  | { type: 'openArtifact'; key: string; delay: number }
  | { type: 'artifactReviewSelect'; key?: string; delay: number }
  | { type: 'artifactReviewCompose'; key?: string; text?: string; delay: number }
  | { type: 'artifactReviewSave'; sender: string; key?: string; text?: string; delay: number }
  | { type: 'setWorkspaceMode'; mode: DemoWorkspaceMode; delay: number }
  | { type: 'openCanvas'; keys: string[]; delay: number }
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
