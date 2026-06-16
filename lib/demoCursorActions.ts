import type { ChatScriptStep } from '@/lib/demoScenarios/types';
import type { TaskExecStep } from '@/components/demoTaskExecution';
import { DEMO_CURSOR_SLIDE_MS } from '@/components/DemoClickCursor';

export type CursorGoFn = (selector: string, opts?: { click?: boolean }) => void;

export type CursorContext = {
  /** Resolved display name for openArtifact / active file */
  artifactName?: string;
  /** Canvas tile names after openCanvas */
  canvasArtifactNames?: string[];
};

const SEQUENCE_GAP = DEMO_CURSOR_SLIDE_MS + 100;

function escapeAttr(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function canvasTileSelector(name: string): string {
  return `[data-demo-target="canvas-tile"][data-artifact-name="${escapeAttr(name)}"]`;
}

function runSequence(go: CursorGoFn, steps: Array<{ selector: string; click?: boolean }>) {
  steps.forEach((step, i) => {
    setTimeout(() => go(step.selector, { click: step.click }), i * SEQUENCE_GAP);
  });
}

export function animateChatStepCursor(step: ChatScriptStep, go: CursorGoFn) {
  switch (step.type) {
    case 'typing':
      go('[data-demo-target="composer"]');
      break;
    case 'send':
      go('[data-demo-target="composer-send"]', { click: true });
      break;
    case 'nick_typing':
      go('[data-demo-target="chat-thread"]');
      break;
    case 'addTasks':
      go('[data-demo-target="kanban-inbox"]');
      break;
    case 'mention_tab':
      go('[data-demo-target="sidebar-channels-tab"]', { click: true });
      break;
    case 'response':
      go('[data-demo-target="chat-thread"]');
      break;
    default:
      break;
  }
}

export function animateExecStepCursor(step: TaskExecStep, go: CursorGoFn, ctx: CursorContext = {}) {
  switch (step.type) {
    case 'moveTask':
      go(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`);
      break;
    case 'openTaskModal':
      go(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`, { click: true });
      break;
    case 'tool':
    case 'toolDone':
      go('[data-demo-target="modal-tool-latest"]');
      break;
    case 'subtask':
      go(`[data-demo-subtask-id="${step.id}"]`);
      break;
    case 'modalMsg':
      go('[data-demo-target="modal-thread"]');
      break;
    case 'openArtifact':
      runSequence(go, [
        { selector: '[data-demo-target="modal-workspace-ide"]', click: true },
        { selector: '[data-demo-target="modal-artifact-panel"]' },
        { selector: '[data-demo-target="modal-artifact-comment-btn"]', click: true },
      ]);
      break;
    case 'setWorkspaceMode':
      if (step.mode === 'canvas') {
        runSequence(go, [
          { selector: '[data-demo-target="modal-workspace-canvas"]', click: true },
          ...(ctx.canvasArtifactNames?.[0]
            ? [{ selector: canvasTileSelector(ctx.canvasArtifactNames[0]) }]
            : [{ selector: '[data-demo-target="canvas-stage"]' }]),
        ]);
      } else {
        go('[data-demo-target="modal-workspace-ide"]', { click: true });
      }
      break;
    case 'openCanvas': {
      const tileName = ctx.canvasArtifactNames?.[0];
      runSequence(go, [
        { selector: '[data-demo-target="modal-workspace-canvas"]', click: true },
        ...(tileName
          ? [
              { selector: canvasTileSelector(tileName) },
              { selector: `[data-demo-target="canvas-comment-btn"][data-artifact-name="${escapeAttr(tileName)}"]`, click: true },
            ]
          : [{ selector: '[data-demo-target="canvas-stage"]' }]),
      ]);
      break;
    }
    case 'deliver':
      runSequence(go, [
        { selector: '[data-demo-target="modal-thread"]' },
        { selector: '[data-demo-target="modal-delivery"]', click: true },
      ]);
      break;
    case 'closeTaskModal':
      go('[data-demo-target="modal-close"]', { click: true });
      break;
    default:
      break;
  }
}

/** Steps that mutate the DOM — cursor should run after the step applies. */
export function execStepCursorAfterApply(step: TaskExecStep): boolean {
  return (
    step.type === 'deliver'
    || step.type === 'openArtifact'
    || step.type === 'openCanvas'
    || step.type === 'tool'
    || step.type === 'toolDone'
    || step.type === 'subtask'
    || (step.type === 'setWorkspaceMode' && step.mode === 'canvas')
  );
}

export function cursorContextForStep(
  step: TaskExecStep,
  artifacts: Record<string, { name: string }>,
): CursorContext {
  if (step.type === 'openArtifact') {
    const art = artifacts[step.key];
    return { artifactName: art?.name };
  }
  if (step.type === 'openCanvas') {
    return {
      canvasArtifactNames: step.keys
        .map((k) => artifacts[k]?.name)
        .filter((n): n is string => Boolean(n)),
    };
  }
  if (step.type === 'setWorkspaceMode' && step.mode === 'canvas') {
    return { canvasArtifactNames: [] };
  }
  return {};
}
