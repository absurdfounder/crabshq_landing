import { getFaviconUrl } from './favicon';

export type SkillIconInput = {
  id: string;
  name: string;
  description?: string;
  link?: string;
};

/** App keywords → domain. Match skill name/id only — never descriptions. Longer keys first. */
const APP_DOMAIN_MAP = [
  ['git workflows', 'github.com'],
  ['google drive', 'drive.google.com'],
  ['google calendar', 'google.com'],
  ['google docs', 'google.com'],
  ['google sheets', 'google.com'],
  ['google search', 'google.com'],
  ['google places', 'google.com'],
  ['apple notes', 'apple.com'],
  ['apple reminders', 'apple.com'],
  ['spotify player', 'spotify.com'],
  ['youtube watcher', 'youtube.com'],
  ['tavily web search', 'tavily.com'],
  ['brave search', 'brave.com'],
  ['docker essentials', 'docker.com'],
  ['openai whisper', 'openai.com'],
  ['openai image', 'openai.com'],
  ['openai codex', 'openai.com'],
  ['copilot money', 'copilot.money'],
  ['1password', '1password.com'],
  ['airtable', 'airtable.com'],
  ['anthropic', 'anthropic.com'],
  ['aws', 'aws.amazon.com'],
  ['apple', 'apple.com'],
  ['asana', 'asana.com'],
  ['atlassian', 'atlassian.com'],
  ['bear', 'bear.app'],
  ['brave', 'brave.com'],
  ['clawhub', 'clawhub.ai'],
  ['claude', 'anthropic.com'],
  ['codex', 'openai.com'],
  ['confluence', 'atlassian.com'],
  ['cursor', 'cursor.com'],
  ['discord', 'discord.com'],
  ['docker', 'docker.com'],
  ['dropbox', 'dropbox.com'],
  ['elevenlabs', 'elevenlabs.io'],
  ['excalidraw', 'excalidraw.com'],
  ['figma', 'figma.com'],
  ['gmail', 'gmail.com'],
  ['gemini', 'ai.google.dev'],
  ['github', 'github.com'],
  ['google', 'google.com'],
  ['heygen', 'heygen.com'],
  ['hubspot', 'hubspot.com'],
  ['intercom', 'intercom.com'],
  ['jira', 'atlassian.com'],
  ['linear', 'linear.app'],
  ['mongodb', 'mongodb.com'],
  ['netlify', 'netlify.com'],
  ['notion', 'notion.so'],
  ['n8n', 'n8n.io'],
  ['obsidian', 'obsidian.md'],
  ['openai', 'openai.com'],
  ['openclaw', 'openclaw.ai'],
  ['perplexity', 'perplexity.ai'],
  ['postgres', 'postgresql.org'],
  ['postgresql', 'postgresql.org'],
  ['reddit', 'reddit.com'],
  ['redis', 'redis.io'],
  ['salesforce', 'salesforce.com'],
  ['sendgrid', 'sendgrid.com'],
  ['shopify', 'shopify.com'],
  ['slack', 'slack.com'],
  ['spotify', 'spotify.com'],
  ['stripe', 'stripe.com'],
  ['supabase', 'supabase.com'],
  ['tavily', 'tavily.com'],
  ['telegram', 'telegram.org'],
  ['trello', 'trello.com'],
  ['twilio', 'twilio.com'],
  ['twitter', 'x.com'],
  ['vercel', 'vercel.com'],
  ['whatsapp', 'whatsapp.com'],
  ['youtube', 'youtube.com'],
  ['zendesk', 'zendesk.com'],
  ['zapier', 'zapier.com'],
] as const satisfies ReadonlyArray<readonly [string, string]>;

function normalizeSkillText(skill: SkillIconInput): string {
  return `${skill.name} ${skill.id}`.toLowerCase().replace(/[-_]+/g, ' ');
}

/** Whole-token match — avoids "calm" in descriptions or "ring" inside "engineering". */
export function matchesAppKeyword(text: string, keyword: string): boolean {
  const tokens = text.split(/[\s/_-]+/).filter(Boolean);
  const parts = keyword.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return tokens.includes(parts[0]);
  for (let i = 0; i <= tokens.length - parts.length; i += 1) {
    if (parts.every((part, index) => tokens[i + index] === part)) return true;
  }
  return false;
}

export function resolveSkillAppDomain(skill: SkillIconInput): string | null {
  const text = normalizeSkillText(skill);
  const sorted = [...APP_DOMAIN_MAP].sort((a, b) => b[0].length - a[0].length);
  for (const [keyword, domain] of sorted) {
    if (matchesAppKeyword(text, keyword)) return domain;
  }
  return null;
}

export function githubAuthorFromLink(link = ''): string | null {
  const match = String(link).match(/\/skills\/([^/]+)\/[^/]+\/SKILL\.md/i);
  return match?.[1]?.trim() || null;
}

/** Domain for favicon lookup — name/id matches only, then GitHub author, then ClawHub. */
export function resolveSkillIconDomain(skill: SkillIconInput): string {
  return resolveSkillAppDomain(skill) || 'clawhub.ai';
}

/** Public website link when the skill clearly names a product; null otherwise. */
export function resolveSkillWebsite(skill: SkillIconInput): string | null {
  return resolveSkillAppDomain(skill);
}

export function getSkillIconUrl(skill: SkillIconInput, size = 64): string {
  const appDomain = resolveSkillAppDomain(skill);
  if (appDomain) return getFaviconUrl(appDomain, size);

  const author = githubAuthorFromLink(skill.link);
  if (author) return `https://github.com/${author}.png?size=${size}`;

  return getFaviconUrl('clawhub.ai', size);
}
