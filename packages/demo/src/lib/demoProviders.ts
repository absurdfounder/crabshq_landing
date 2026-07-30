/** Coding agent / model provider → favicon domain (mirrors OldWays PROVIDER_DOMAINS). */
export const PROVIDER_DOMAINS: Record<string, string> = {
  'Claude Code': 'claude.ai',
  Claude: 'claude.ai',
  CLAUDE: 'claude.ai',
  Cursor: 'cursor.com',
  CURSOR: 'cursor.com',
  Codex: 'openai.com',
  CODEX: 'openai.com',
  OpenCode: 'opencode.ai',
  OPENCODE: 'opencode.ai',
  OpenAI: 'openai.com',
  OPENAI: 'openai.com',
  OpenClaw: 'openclaw.ai',
  Gemini: 'gemini.google.com',
  Aider: 'aider.chat',
  Cline: 'cline.bot',
  Trooper: 'trooper.so',
};

export function getProviderDomain(provider?: string): string | null {
  if (!provider) return null;
  return PROVIDER_DOMAINS[provider] ?? PROVIDER_DOMAINS[provider.trim()] ?? null;
}
