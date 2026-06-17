#!/usr/bin/env node
/**
 * Recompute skills_data.json website fields from skill name/id only.
 * Run: node scripts/regenerate-skill-websites.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, '../public/skills_data.json');

const APP_DOMAIN_MAP = [
  ['git workflows', 'github.com'],
  ['google drive', 'drive.google.com'],
  ['google calendar', 'google.com'],
  ['google docs', 'google.com'],
  ['google sheets', 'google.com'],
  ['google search', 'google.com'],
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
].sort((a, b) => b[0].length - a[0].length);

function normalizeSkillText(skill) {
  return `${skill.name} ${skill.id}`.toLowerCase().replace(/[-_]+/g, ' ');
}

function matchesAppKeyword(text, keyword) {
  const tokens = text.split(/[\s/_-]+/).filter(Boolean);
  const parts = keyword.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return tokens.includes(parts[0]);
  for (let i = 0; i <= tokens.length - parts.length; i += 1) {
    if (parts.every((part, index) => tokens[i + index] === part)) return true;
  }
  return false;
}

function resolveSkillAppDomain(skill) {
  const text = normalizeSkillText(skill);
  for (const [keyword, domain] of APP_DOMAIN_MAP) {
    if (matchesAppKeyword(text, keyword)) return domain;
  }
  return null;
}

function githubAuthorFromLink(link = '') {
  const match = String(link).match(/\/skills\/([^/]+)\/[^/]+\/SKILL\.md/i);
  return match?.[1]?.trim() || null;
}

function resolveWebsite(skill) {
  const appDomain = resolveSkillAppDomain(skill);
  if (appDomain) return appDomain;
  const author = githubAuthorFromLink(skill.link);
  if (author) return `github.com/${author}`;
  return 'clawhub.ai';
}

const raw = fs.readFileSync(DATA_PATH, 'utf8');
const data = JSON.parse(raw);
let changed = 0;

for (const skill of data.skill_library) {
  const next = resolveWebsite(skill);
  if (skill.website !== next) {
    skill.website = next;
    changed += 1;
  }
}

fs.writeFileSync(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Updated ${changed} / ${data.skill_library.length} skill website fields.`);
