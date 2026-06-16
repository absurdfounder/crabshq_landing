import type { ChatScriptStep } from '@/lib/demoScenarios/types';
import type { TaskExecStep } from '@/components/demoTaskExecution';

export type CursorGoFn = (selector: string, opts?: { click?: boolean }) => void;

export function animateChatStepCursor(step: ChatScriptStep, go: CursorGoFn) {
  switch (step.type) {
    case 'typing':
      go('[data-demo-target="composer"]');
      break;
    case 'send':
      go('[data-demo-target="composer-send"]', { click: true });
      break;
    case 'nick_typing':
      go('[data-demo-target="nav-tasks"]', { click: true });
      break;
    case 'addTasks':
      go('[data-demo-target="kanban-in_progress"]', { click: true });
      break;
    case 'mention_tab':
      go('[data-demo-target="sidebar-channels-tab"]', { click: true });
      break;
    case 'response':
      go('[data-demo-target="composer"]');
      break;
    default:
      break;
  }
}

export function animateExecStepCursor(step: TaskExecStep, go: CursorGoFn) {
  switch (step.type) {
    case 'moveTask':
      go(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`);
      break;
    case 'openTaskModal':
      go(`[data-demo-target="task-card"][data-task-id="${step.taskId}"]`, { click: true });
      break;
    case 'openArtifact':
      go('[data-demo-target="modal-workspace"]');
      break;
    case 'setWorkspaceMode':
      go(
        step.mode === 'canvas'
          ? '[data-demo-target="modal-workspace-canvas"]'
          : '[data-demo-target="modal-workspace-ide"]',
        { click: true },
      );
      break;
    case 'openCanvas':
      go('[data-demo-target="modal-workspace-canvas"]', { click: true });
      break;
    case 'deliver':
      go('[data-demo-target="modal-delivery"]', { click: true });
      break;
    case 'closeTaskModal':
      go('[data-demo-target="modal-close"]', { click: true });
      break;
    case 'tool':
    case 'toolDone':
    case 'subtask':
    case 'modalMsg':
      go('[data-demo-target="modal-thread"]');
      break;
    default:
      break;
  }
}

/** Steps that mutate the DOM — cursor should run after the step applies. */
export function execStepCursorAfterApply(step: TaskExecStep): boolean {
  return step.type === 'deliver';
}
