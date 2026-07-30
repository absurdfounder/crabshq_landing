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
  /** Wall time, revealed on hover like the app's tool rows. */
  durationMs?: number;
  /** Output lines shown when the row is expanded. */
  result?: string[];
  /** File this call produced — renders the app's artifact block in the thread. */
  wrote?: { name: string; ext?: string };
};

export type DemoModalMessage = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

export type DemoFeedItem =
  | { kind: 'message'; id: string; sender: string; text: string; time: string; tags?: DemoTag[] }
  | { kind: 'reasoning'; id: string; agent: string; text: string }
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

/**
 * Workspaces the ticket can show. `ide` and `canvas` mirror the app's file and
 * board views; the rest mirror the surfaces the app opens when an agent is
 * driving a browser, cutting video, or working on an enrolled machine.
 */
export type DemoWorkspaceMode = 'ide' | 'canvas' | 'browser' | 'video' | 'desktop' | 'nodes';

/** One captured frame in a live browser session. */
export type DemoBrowserFrameSpec = {
  id: string;
  /** Inline SVG markup — never a network fetch. */
  svg: string;
  /** What the agent was doing when the frame was taken. */
  action: string;
  url: string;
  time: string;
};

export type DemoBrowserSession = {
  domain: string;
  /** "Chrome extension" / "Live browser" — the app's source label. */
  source: string;
  frames: DemoBrowserFrameSpec[];
};

export type DemoVideoScene = {
  id: string;
  title: string;
  seconds: number;
  /** Real media this scene is cut from — poster frames come from the file. */
  src?: string;
  /** Seconds into `src` to use as the poster frame. */
  posterAt?: number;
  /** Still fallback when `src` can't be decoded. */
  posterSrc?: string;
};

export type DemoVideoClip = {
  id: string;
  track: number;
  label: string;
  /** Position and length in seconds along the timeline. */
  start: number;
  length: number;
  kind: 'video' | 'audio' | 'text';
  /** Media backing this clip; video clips strip it, audio clips waveform it. */
  src?: string;
  /** Still used when the browser can't decode `src` — keeps the clip legible. */
  posterSrc?: string;
  /** Offset into the source media where this clip starts. */
  sourceIn?: number;
};

export type DemoVideoProject = {
  name: string;
  fps: number;
  durationSeconds: number;
  tracks: { id: number; label: string; kind: 'video' | 'audio' | 'text' }[];
  scenes: DemoVideoScene[];
  clips: DemoVideoClip[];
};

export type DemoGenerationJob = {
  id: string;
  prompt: string;
  kind: 'image' | 'video';
  seconds?: number;
  model: string;
  /** The produced asset — a real image or video file. */
  src: string;
  /** Poster shown for video results before playback. */
  posterSrc?: string;
};

export type DemoDesktopSession = {
  deviceName: string;
  os: string;
  status: 'online' | 'busy' | 'idle';
  /** The GUI the agent is looking at, inline SVG. */
  screenSvg: string;
  appName: string;
  terminalLines: string[];
  activities: { label: string; detail?: string }[];
};

export type DemoWorkflowNode = {
  id: string;
  label: string;
  kind: 'trigger' | 'if' | 'then' | 'ai';
  x: number;
  y: number;
};

export type DemoWorkflowGraph = {
  name: string;
  nodes: DemoWorkflowNode[];
  edges: { from: string; to: string; label?: string }[];
};

/** Scripted execution steps after kanban fill — drives modal + board updates */
export type TaskExecStep =
  | { type: 'moveTask'; taskId: number; col: DemoColumnId; delay: number }
  | { type: 'openTaskModal'; taskId: number; delay: number }
  | { type: 'subtask'; id: string; status: DemoSubtaskStatus; delay: number }
  | { type: 'reasoning'; agent: string; text: string; delay: number }
  /** Push the next captured frame into the live browser workspace. */
  | { type: 'browserFrame'; delay: number }
  /** Move the NLE playhead / reveal clips up to this second. */
  | { type: 'videoProgress'; seconds: number; delay: number }
  | { type: 'videoStage'; stage: 'storyboard' | 'timeline'; delay: number }
  /** Start a generation job; it resolves after `runMs`. */
  | { type: 'generate'; jobId: string; runMs: number; delay: number }
  | { type: 'desktopStep'; lines: string[]; activity?: string; delay: number }
  | { type: 'nodeActive'; nodeId: string; delay: number }
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
