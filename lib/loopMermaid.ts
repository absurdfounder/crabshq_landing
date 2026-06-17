export type LoopFlowStep = {
  label: string;
  description?: string;
  command?: string;
};

export type LoopFlow = {
  trigger?: string;
  steps?: LoopFlowStep[];
  checkLabel?: string;
  exitLabel?: string;
  loopBackLabel?: string;
};

function escapeMermaidLabel(text = '') {
  return String(text)
    .replace(/"/g, '#quot;')
    .replace(/\[/g, '#91;')
    .replace(/\]/g, '#93;')
    .replace(/\{/g, '#123;')
    .replace(/\}/g, '#125;')
    .replace(/\|/g, '#124;');
}

export function buildLoopMermaid(flow: LoopFlow = {}) {
  const steps = Array.isArray(flow.steps) ? flow.steps : [];
  const trigger = escapeMermaidLabel(flow.trigger || 'Manual start');
  const checkLabel = escapeMermaidLabel(flow.checkLabel || 'Feedback gate');
  const exitLabel = escapeMermaidLabel(flow.exitLabel || 'Done');
  const loopBackLabel = escapeMermaidLabel(flow.loopBackLabel || 'not done');

  const lines = ['flowchart TD'];
  lines.push(`  trigger["${trigger}"]`);
  steps.forEach((step, index) => {
    lines.push(`  step${index}["${escapeMermaidLabel(step.label || `Step ${index + 1}`)}"]`);
  });
  lines.push(`  check{"${checkLabel}"}`);
  lines.push(`  exit["${exitLabel}"]`);

  if (steps.length > 0) {
    lines.push('  trigger --> step0');
    for (let i = 0; i < steps.length - 1; i += 1) {
      lines.push(`  step${i} --> step${i + 1}`);
    }
    lines.push(`  step${steps.length - 1} --> check`);
    lines.push(`  check -->|${loopBackLabel}| step0`);
  } else {
    lines.push('  trigger --> check');
    lines.push(`  check -->|${loopBackLabel}| trigger`);
  }

  lines.push('  check -->|done| exit');
  return lines.join('\n');
}

export function buildKickoffPrompt(loop: {
  title?: string;
  goal?: string;
  maxIterations?: number;
  checkCommand?: string;
  exitCondition?: string;
  flow?: LoopFlow;
  kickoffPrompt?: string;
}) {
  if (loop.kickoffPrompt?.trim()) return loop.kickoffPrompt.trim();

  const title = loop.title || 'Untitled Loop';
  const firstStep = loop.flow?.steps?.[0];
  const stepLine = firstStep
    ? `Step 1: ${firstStep.description || firstStep.label}.`
    : 'Step 1: Execute the first loop pass.';

  return [
    `Start the "${title}" loop.`,
    '',
    `Goal: ${loop.goal || 'Define a clear goal'}`,
    `Max iterations: ${loop.maxIterations ?? 10}`,
    `Between iterations run: ${loop.checkCommand || 'echo "define check command"'}`,
    `Exit when: ${loop.exitCondition || 'exit condition is met'}`,
    '',
    stepLine,
    '',
    'Self-pace this loop. After each iteration, run the check command, read the output, and only continue if the exit condition is not met. Stop when the exit condition passes or max iterations is reached. Give a short status update each pass.',
  ].join('\n');
}
