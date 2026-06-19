/** Canonical local install — copy-paste as-is in terminal. */
export const TROOPER_CLI_COMMAND = 'npx -y trooper-cli';

/** @deprecated Use TROOPER_CLI_COMMAND */
export const TROOPER_ONBOARD_COMMAND = TROOPER_CLI_COMMAND;

export type SetupTargetId = 'trooper' | 'claude-code' | 'cursor' | 'openclaw' | 'codex';

export type SetupTarget = {
  id: SetupTargetId;
  label: string;
  /** Key for AgentIcon when available */
  agentKey?: string;
  command: string;
  prompt: string;
};

export const SETUP_TARGETS: SetupTarget[] = [
  {
    id: 'trooper',
    label: 'Trooper CLI',
    command: TROOPER_CLI_COMMAND,
    prompt:
      'Install Trooper on your machine, then open the app and connect your API keys:\n\nnpx -y trooper-cli',
  },
  {
    id: 'claude-code',
    label: 'Claude Code',
    agentKey: 'claude-code',
    command: TROOPER_CLI_COMMAND,
    prompt:
      'Set up Trooper locally, then point Claude Code at your Trooper workspace:\n\nnpx -y trooper-cli',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    agentKey: 'cursor',
    command: TROOPER_CLI_COMMAND,
    prompt:
      'Install Trooper on your laptop and connect Cursor to your Trooper agents:\n\nnpx -y trooper-cli',
  },
  {
    id: 'openclaw',
    label: 'OpenClaw',
    command: TROOPER_CLI_COMMAND,
    prompt:
      'Install Trooper with the OpenClaw runtime on your machine:\n\nnpx -y trooper-cli',
  },
  {
    id: 'codex',
    label: 'ChatGPT Codex',
    agentKey: 'codex',
    command: TROOPER_CLI_COMMAND,
    prompt:
      'Install Trooper locally, then run Codex against your Trooper workspace:\n\nnpx -y trooper-cli',
  },
];

export const DEFAULT_SETUP_TARGET_ID: SetupTargetId = 'trooper';

export function getSetupTarget(id: SetupTargetId) {
  return SETUP_TARGETS.find((target) => target.id === id) ?? SETUP_TARGETS[0];
}
