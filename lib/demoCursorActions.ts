import type { ChatScriptStep } from '@/lib/demoScenarios/types';
import type { TaskExecStep } from '@/components/demoTaskExecution';
import { DEMO_CURSOR_SLIDE_MS } from '@/components/DemoClickCursor';
import type { CursorGoOptions } from '@/components/DemoClickCursor';

export type CursorGoFn = (selector: string, opts?: CursorGoOptions) => void;

export type CursorContext = {
  /** Resolved display name for openArtifact / active file */
  artifactName?: string;
  /** Canvas tile names after openCanvas */
  canvasArtifactNames?: string[];
  /** Named artifact for canvas-anchored review steps */
  reviewArtifactName?: string;
};

const SEQUENCE_GAP = DEMO_CURSOR_SLIDE_MS + 100;

function escapeAttr(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function canvasTileSelector(name: string): string {
  return `[data-demo-target="canvas-tile"][data-artifact-name="${escapeAttr(name)}"]`;
}

function runSequence(go: CursorGoFn, steps: Array<{ selector: string; click?: boolean; dragFrom?: string }>) {
  steps.forEach((step, i) => {
    setTimeout(() => go(step.selector, { click: step.click, dragFrom: step.dragFrom }), i * SEQUENCE_GAP);
  });
}

const ARTIFACT_REVIEW_SEQUENCE = [
  { selector: '[data-demo-target="modal-artifact-content"]' },
  {
    selector: '[data-demo-target="artifact-review-line-end"]',
    dragFrom: '[data-demo-target="artifact-review-line-start"]',
  },
  { selector: '[data-demo-target="modal-artifact-review-composer"]' },
  { selector: '[data-demo-target="modal-artifact-review-save"]', click: true },
  { selector: '[data-demo-target="modal-thread"]' },
] as const;

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
      go('[data-demo-target="modal-artifact-panel"]');
      break;
    case 'artifactReviewSelect':
      if (ctx.reviewArtifactName) {
        const name = escapeAttr(ctx.reviewArtifactName);
        runSequence(go, [
          { selector: `[data-demo-target="canvas-tile"][data-artifact-name="${name}"]` },
          {
            selector: `[data-demo-target="canvas-tile-review-end"][data-artifact-name="${name}"]`,
            dragFrom: `[data-demo-target="canvas-tile-review-start"][data-artifact-name="${name}"]`,
          },
        ]);
      } else {
        runSequence(go, [
          { selector: ARTIFACT_REVIEW_SEQUENCE[0].selector },
          {
            selector: ARTIFACT_REVIEW_SEQUENCE[1].selector,
            dragFrom: ARTIFACT_REVIEW_SEQUENCE[1].dragFrom,
          },
        ]);
      }
      break;
    case 'artifactReviewCompose':
      go('[data-demo-target="modal-artifact-review-composer"]');
      break;
    case 'artifactReviewSave':
      runSequence(go, [
        { selector: '[data-demo-target="modal-artifact-review-save"]', click: true },
        { selector: '[data-demo-target="modal-thread"]' },
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
              {
                selector: `[data-demo-target="canvas-tile-review-end"][data-artifact-name="${escapeAttr(tileName)}"]`,
                dragFrom: `[data-demo-target="canvas-tile-review-start"][data-artifact-name="${escapeAttr(tileName)}"]`,
              },
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
    || step.type === 'artifactReviewSelect'
    || step.type === 'artifactReviewCompose'
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
  if (step.type === 'artifactReviewSelect' || step.type === 'artifactReviewCompose' || step.type === 'artifactReviewSave') {
    if (step.key) {
      const art = artifacts[step.key];
      return { reviewArtifactName: art?.name };
    }
  }
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
