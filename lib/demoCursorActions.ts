import type { ChatScriptStep } from '@/lib/demoScenarios/types';
import type { TaskExecStep } from '@/components/demoTaskExecution';
import type { CursorGoOptions } from '@/components/DemoClickCursor';
import { CURSOR_REACTION_MS } from '@/lib/demoMotion';

export type CursorGoFn = (selector: string, opts?: CursorGoOptions) => Promise<void>;

export type CursorContext = {
  /** Resolved display name for openArtifact / active file */
  artifactName?: string;
  /** Canvas tile names after openCanvas */
  canvasArtifactNames?: string[];
  /** Named artifact for canvas-anchored review steps */
  reviewArtifactName?: string;
};

function escapeAttr(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function canvasTileSelector(name: string): string {
  return `[data-demo-target="canvas-tile"][data-artifact-name="${escapeAttr(name)}"]`;
}

/** Runs cursor moves back to back, each starting only once the last has landed. */
async function runSequence(
  go: CursorGoFn,
  steps: Array<{ selector: string; click?: boolean; dragFrom?: string; silent?: boolean }>,
) {
  for (const step of steps) {
    await go(step.selector, { click: step.click, dragFrom: step.dragFrom, silent: step.silent });
  }
}

const ARTIFACT_REVIEW_SELECT = [
  { selector: '[data-demo-target="modal-artifact-content"]' },
  {
    selector: '[data-demo-target="artifact-review-line-end"]',
    dragFrom: '[data-demo-target="artifact-review-line-start"]',
  },
] as const;

export function animateChatStepCursor(step: ChatScriptStep, go: CursorGoFn): Promise<void> {
  switch (step.type) {
    case 'send':
      return go('[data-demo-target="composer-send"]', { click: true });
    case 'nick_typing':
    case 'response':
      return go('[data-demo-target="chat-thread"]');
    case 'addTasks':
      return go('[data-demo-target="kanban-inbox"]');
    case 'mention_tab':
      return go('[data-demo-target="sidebar-channels-tab"]', { click: true });
    default:
      // `typing` deliberately has no cursor move — the pointer rests while the
      // composer is being typed into.
      return Promise.resolve();
  }
}

export function animateExecStepCursor(step: TaskExecStep, go: CursorGoFn, ctx: CursorContext = {}): Promise<void> {
  const silent = execStepCursorAfterApply(step);
  switch (step.type) {
    case 'moveTask':
      // Handled by the drag choreography, which drives the cursor itself.
      return Promise.resolve();
    case 'openTaskModal':
      return go(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`, { click: true });
    case 'tool':
    case 'toolDone':
      return go('[data-demo-target="modal-tool-latest"]', { silent });
    case 'subtask':
      return go(`[data-demo-subtask-id="${step.id}"]`, { silent });
    case 'modalMsg':
    case 'reasoning':
      return go('[data-demo-target="modal-thread"]');
    case 'browserFrame':
      return go('[data-demo-target="browser-stream"]', { silent });
    case 'videoStage':
    case 'videoProgress':
      return go('[data-demo-target="video-workspace"]', { silent });
    case 'desktopStep':
      return go('[data-demo-target="desktop-workspace"]', { silent });
    case 'nodeActive':
      return go('[data-demo-target="node-graph"]', { silent });
    case 'generate':
      return Promise.resolve();
    case 'openArtifact':
      return go('[data-demo-target="modal-artifact-panel"]', { silent });
    case 'artifactReviewSelect': {
      if (ctx.reviewArtifactName) {
        const name = escapeAttr(ctx.reviewArtifactName);
        return runSequence(go, [
          { selector: `[data-demo-target="canvas-tile"][data-artifact-name="${name}"]` },
          {
            selector: `[data-demo-target="canvas-tile-review-end"][data-artifact-name="${name}"]`,
            dragFrom: `[data-demo-target="canvas-tile-review-start"][data-artifact-name="${name}"]`,
          },
        ]);
      }
      return runSequence(go, [
        { selector: ARTIFACT_REVIEW_SELECT[0].selector },
        { selector: ARTIFACT_REVIEW_SELECT[1].selector, dragFrom: ARTIFACT_REVIEW_SELECT[1].dragFrom },
      ]);
    }
    case 'artifactReviewCompose':
      return go('[data-demo-target="modal-artifact-review-composer"]', { silent });
    case 'artifactReviewSave':
      return runSequence(go, [
        { selector: '[data-demo-target="modal-artifact-review-save"]', click: true },
        { selector: '[data-demo-target="modal-thread"]' },
      ]);
    case 'setWorkspaceMode':
      if (step.mode === 'canvas') {
        return runSequence(go, [
          { selector: '[data-demo-target="modal-workspace-canvas"]', click: true, silent },
          ...(ctx.canvasArtifactNames?.[0]
            ? [{ selector: canvasTileSelector(ctx.canvasArtifactNames[0]) }]
            : [{ selector: '[data-demo-target="canvas-stage"]' }]),
        ]);
      }
      return go('[data-demo-target="modal-workspace-ide"]', { click: true });
    case 'openCanvas': {
      const tileName = ctx.canvasArtifactNames?.[0];
      return runSequence(go, [
        { selector: '[data-demo-target="modal-workspace-canvas"]', click: true, silent },
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
    }
    case 'deliver':
      return runSequence(go, [
        { selector: '[data-demo-target="modal-thread"]' },
        { selector: '[data-demo-target="modal-delivery"]', click: true, silent },
      ]);
    case 'closeTaskModal':
      return go('[data-demo-target="modal-close"]', { click: true });
    default:
      return Promise.resolve();
  }
}

/**
 * Steps whose cursor target only exists once the state change has landed — the
 * artifact panel, canvas tiles and thread rows are all created by the step
 * itself. These run mutation-first and suppress the click ripple, since no
 * click actually took place.
 */
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
    // Capability workspaces are mounted by the step itself, so the cursor has
    // nothing to point at until after it applies.
    || step.type === 'browserFrame'
    || step.type === 'videoStage'
    || step.type === 'videoProgress'
    || step.type === 'desktopStep'
    || step.type === 'nodeActive'
    || (step.type === 'setWorkspaceMode' && step.mode === 'canvas')
  );
}

/** Pause between a click landing and the change it causes. */
export const REACTION_MS = CURSOR_REACTION_MS;

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
