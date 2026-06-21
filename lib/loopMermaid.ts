export type LoopRequirementPlugin = {
  id: string;
  label?: string;
  required?: boolean;
  reason?: string;
};

export type LoopRequirementSkill = {
  id: string;
  label: string;
  required?: boolean;
  reason?: string;
};

export type LoopRequirementSystem = {
  name: string;
  role: 'read' | 'write' | 'notify';
  via?: 'plugin' | 'browser' | 'api' | 'mcp' | 'manual';
  notes?: string;
};

export type LoopRequirements = {
  plugins?: LoopRequirementPlugin[];
  skills?: LoopRequirementSkill[];
  systems?: LoopRequirementSystem[];
};

export type LoopFlowStep = {
  label: string;
  description?: string;
  command?: string;
  tools?: string[];
};

export type LoopFlow = {
  trigger?: string;
  steps?: LoopFlowStep[];
  checkLabel?: string;
  exitLabel?: string;
  loopBackLabel?: string;
};

export type LoopKickoffInput = {
  title?: string;
  goal?: string;
  maxIterations?: number;
  checkCommand?: string;
  exitCondition?: string;
  flow?: LoopFlow;
  kickoffPrompt?: string;
  requirements?: LoopRequirements;
  guardrails?: string[];
};

function escapeMermaidLabel(text = '') {
  return String(text)
    .replace(/"/g, '#quot;')
    .replace(/\[/g, '#91;')
    .replace(/\]/g, '#93;')
    .replace(/\{/g, '#123;')
    .replace(/\}/g, '#125;')
    .replace(/\|/g, '#124;')
    .replace(/\n/g, ' ');
}

function truncate(text = '', max = 72) {
  const value = String(text).trim();
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function stepNodeLabel(step: LoopFlowStep) {
  const label = step.label || 'Step';
  if (step.tools?.length) {
    return truncate(`${label} | ${step.tools.join(', ')}`, 80);
  }
  if (step.description) {
    return truncate(`${label} — ${step.description}`, 90);
  }
  return label;
}

export function buildLoopMermaid(
  flow: LoopFlow = {},
  options: { checkCommand?: string; requirements?: LoopRequirements } = {},
) {
  const steps = Array.isArray(flow.steps) ? flow.steps : [];
  const trigger = escapeMermaidLabel(flow.trigger || 'Manual start');
  const checkLabel = escapeMermaidLabel(
    options.checkCommand
      ? truncate(`${flow.checkLabel || 'Check'}: ${options.checkCommand}`, 90)
      : flow.checkLabel || 'Feedback gate',
  );
  const exitLabel = escapeMermaidLabel(flow.exitLabel || 'Done');
  const loopBackLabel = escapeMermaidLabel(flow.loopBackLabel || 'not done');

  const lines = ['flowchart TD'];
  lines.push(`  trigger["${trigger}"]`);
  steps.forEach((step, index) => {
    lines.push(`  step${index}["${escapeMermaidLabel(stepNodeLabel(step))}"]`);
  });
  lines.push(`  check{"${checkLabel}"}`);
  lines.push(`  exit["${exitLabel}"]`);

  const pluginIds = options.requirements?.plugins?.map((p) => p.label || p.id) || [];
  const systemNames = options.requirements?.systems?.map((s) => s.name) || [];
  const integrationNames = Array.from(new Set([...pluginIds, ...systemNames])).slice(0, 6);
  integrationNames.forEach((name, index) => {
    lines.push(`  int${index}(("${escapeMermaidLabel(name)}"))`);
  });

  if (steps.length > 0) {
    lines.push('  trigger --> step0');
    for (let i = 0; i < steps.length - 1; i += 1) {
      lines.push(`  step${i} --> step${i + 1}`);
    }
    lines.push(`  step${steps.length - 1} --> check`);
    lines.push(`  check -->|${loopBackLabel}| step0`);
    integrationNames.forEach((_, index) => {
      const target = Math.min(index, steps.length - 1);
      lines.push(`  int${index} -.-> step${target}`);
    });
  } else {
    lines.push('  trigger --> check');
    lines.push(`  check -->|${loopBackLabel}| trigger`);
  }

  lines.push('  check -->|done| exit');
  return lines.join('\n');
}

function formatRequirementsBlock(requirements?: LoopRequirements) {
  if (!requirements) return [];
  const lines: string[] = ['## Before you start'];

  if (requirements.plugins?.length) {
    lines.push('', 'Connect plugins:');
    requirements.plugins.forEach((plugin) => {
      const req = plugin.required === false ? 'optional' : 'required';
      const reason = plugin.reason ? ` — ${plugin.reason}` : '';
      lines.push(`- ${plugin.label || plugin.id} (${req})${reason}`);
    });
  }

  if (requirements.skills?.length) {
    lines.push('', 'Attach skills:');
    requirements.skills.forEach((skill) => {
      const req = skill.required === false ? 'optional' : 'required';
      const reason = skill.reason ? ` — ${skill.reason}` : '';
      lines.push(`- ${skill.label || skill.id} (${req})${reason}`);
    });
  }

  if (requirements.systems?.length) {
    lines.push('', 'External systems:');
    requirements.systems.forEach((system) => {
      const via = system.via ? ` via ${system.via}` : '';
      const notes = system.notes ? ` — ${system.notes}` : '';
      lines.push(`- ${system.name} (${system.role}${via})${notes}`);
    });
  }

  return lines.length > 1 ? lines : [];
}

function formatStepsBlock(flow?: LoopFlow) {
  const steps = flow?.steps || [];
  if (!steps.length) return [];
  const lines = ['## Steps'];
  steps.forEach((step, index) => {
    const tools = step.tools?.length ? ` [tools: ${step.tools.join(', ')}]` : '';
    const command = step.command ? `\n   Command: ${step.command}` : '';
    lines.push(
      `${index + 1}. ${step.label}: ${step.description || step.label}${tools}${command}`,
    );
  });
  return lines;
}

export function buildKickoffPrompt(loop: LoopKickoffInput) {
  const stored = loop.kickoffPrompt?.trim();
  const setup = formatRequirementsBlock(loop.requirements);

  if (stored) {
    if (setup.length && !stored.includes('## Before you start')) {
      const selfPaceIdx = stored.indexOf('Self-pace this loop');
      if (selfPaceIdx > -1) {
        return [
          stored.slice(0, selfPaceIdx).trimEnd(),
          '',
          ...setup,
          '',
          stored.slice(selfPaceIdx),
        ].join('\n');
      }
      return `${stored}\n\n${setup.join('\n')}`;
    }
    return stored;
  }

  const title = loop.title || 'Untitled Loop';
  const stepsBlock = formatStepsBlock(loop.flow);
  const firstStep = loop.flow?.steps?.[0];
  const fallbackStep = firstStep
    ? `Step 1: ${firstStep.description || firstStep.label}.`
    : 'Step 1: Execute the first loop pass.';

  return [
    `Start the "${title}" loop.`,
    '',
    `Goal: ${loop.goal || 'Define a clear goal'}`,
    `Max iterations: ${loop.maxIterations ?? 10}`,
    `Between iterations run: ${loop.checkCommand || 'echo "define check command"'}`,
    `Exit when: ${loop.exitCondition || 'exit condition is met'}`,
    ...setup,
    ...(stepsBlock.length ? ['', ...stepsBlock] : ['', fallbackStep]),
    '',
    'Self-pace this loop. After each iteration, run the check command, read the output, and only continue if the exit condition is not met. Stop when the exit condition passes or max iterations is reached. Give a short status update each pass.',
    ...(loop.guardrails?.length
      ? ['', 'Guardrails:', ...loop.guardrails.map((rule) => `- ${rule}`)]
      : []),
  ].join('\n');
}
