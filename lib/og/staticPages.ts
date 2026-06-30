import type { OgHeroContent } from '@/lib/og/types';
import { CODING_AGENT_BADGES } from '@/lib/og/agentIcons';
import { resolveOgPageUrl } from '@/lib/og/pageUrls';

function hub(
  slug: string,
  eyebrowLabel: string,
  headlinePrimary: string,
  headlineAccent: string | undefined,
  description: string,
  options: { badges?: boolean } = {},
): OgHeroContent {
  return {
    kind: 'hub',
    eyebrowIndex: '01',
    eyebrowLabel,
    headlinePrimary,
    headlineAccent,
    description,
    singleLineHeadline: true,
    badgeIcons: options.badges ? CODING_AGENT_BADGES : undefined,
    pageUrl: resolveOgPageUrl('hub', slug),
  };
}

function page(
  slug: string,
  eyebrowLabel: string,
  headlinePrimary: string,
  headlineAccent: string | undefined,
  description: string,
): OgHeroContent {
  return {
    kind: 'page',
    eyebrowIndex: '01',
    eyebrowLabel,
    headlinePrimary,
    headlineAccent,
    description,
    singleLineHeadline: true,
    pageUrl: resolveOgPageUrl('page', slug),
  };
}

/** Catalog / index pages — slug matches ogImageMeta third arg when kind is `hub`. */
export const HUB_OG_PAGES: Record<string, OgHeroContent> = {
  loops: hub(
    'loops',
    'Loops catalog',
    'Agent Loops',
    undefined,
    'Reusable loops with kickoff prompts, guardrails, and flow diagrams for Cursor, Claude Code, and Codex.',
    { badges: true },
  ),
  plugins: hub(
    'plugins',
    'Plugin hub',
    'Connect',
    '1,000+ plugins',
    'HubSpot, GitHub, Slack, Notion, Stripe, and Composio integrations for your AI workforce.',
  ),
  integration: hub(
    'integration',
    'Skills catalog',
    'OpenClaw',
    'skills library',
    'Extend your AI workforce with 3,000+ OpenClaw skills for GitHub, Gmail, Slack, AWS, and more.',
  ),
  channels: hub(
    'channels',
    'Channels',
    'Talk to agents',
    'where you work',
    'Connect Trooper to Slack, WhatsApp, Telegram, Discord, and more.',
  ),
  'use-cases': hub(
    'use-cases',
    'Solutions',
    'AI agent',
    'use cases',
    'Lead generation, sales research, CRM updates, code, browser automation, and support.',
  ),
  industries: hub(
    'industries',
    'Industries',
    'AI front office',
    'by industry',
    'Call handling, booking, and follow-up for HVAC, plumbing, pest control, and field service businesses.',
  ),
  alternatives: hub(
    'alternatives',
    'Comparisons',
    'Trooper',
    'alternatives',
    'Compare Trooper to other AI workforce and automation platforms.',
  ),
  showcase: hub(
    'showcase',
    'Showcase',
    'Site',
    'templates',
    'Browse Trooper-powered site templates and publishing workflows.',
  ),
};

/** Static marketing / legal pages — slug matches ogImageMeta third arg when kind is `page`. */
export const STATIC_OG_PAGES: Record<string, OgHeroContent> = {
  pricing: page(
    'pricing',
    'Pricing',
    'Run Trooper',
    'your way',
    'Local install, Solo Cloud, hosted cloud, and enterprise self-host plans.',
  ),
  download: page(
    'download',
    'Download',
    'Install',
    'Trooper locally',
    'Get the desktop app and run agents on your machine with full control.',
  ),
  affiliate: page(
    'affiliate',
    'Affiliate',
    'Earn with',
    'Trooper',
    'Partner program for creators and teams promoting the AI workforce platform.',
  ),
  terms: page(
    'terms',
    'Legal',
    'Terms of',
    'service',
    'Terms governing use of Trooper and related services.',
  ),
  privacy: page(
    'privacy',
    'Legal',
    'Privacy',
    'policy',
    'How Trooper collects, uses, and protects your data.',
  ),
  agency: page(
    'agency',
    'Agencies',
    'Deploy AI',
    'for clients',
    'White-label AI workforce deployments for agencies and consultancies.',
  ),
  'contact-us': page(
    'contact-us',
    'Contact',
    'Talk to',
    'the team',
    'Sales, support, and partnership inquiries for Trooper.',
  ),
  'wonder-token': page(
    'wonder-token',
    'Wonder',
    'Token',
    'utility',
    'Wonder token utilities and ecosystem pages on Trooper.',
  ),
  'watch-the-burn-wonder': page(
    'watch-the-burn-wonder',
    'Wonder',
    'Watch the',
    'burn',
    'Wonder burn tracker and ecosystem updates.',
  ),
  'migrating-to-wonder-sites': page(
    'migrating-to-wonder-sites',
    'Migration',
    'Move to',
    'Wonder sites',
    'Migrate helpdesks, docs, and sites to Trooper-powered publishing.',
  ),
  'create-a-blog-notion': page(
    'create-a-blog-notion',
    'Notion CMS',
    'Blog from',
    'Notion',
    'Publish a professional blog powered by Notion as your CMS.',
  ),
  'create-a-changelog-notion': page(
    'create-a-changelog-notion',
    'Notion CMS',
    'Changelog',
    'from Notion',
    'Ship product updates with a Notion-backed changelog site.',
  ),
  'create-a-company-wiki-notion': page(
    'create-a-company-wiki-notion',
    'Notion CMS',
    'Company wiki',
    'from Notion',
    'Internal wiki and knowledge base publishing from Notion.',
  ),
  'create-a-directory-notion': page(
    'create-a-directory-notion',
    'Notion CMS',
    'Directory',
    'from Notion',
    'Launch a searchable directory site backed by Notion.',
  ),
  'create-a-documentation-notion': page(
    'create-a-documentation-notion',
    'Notion CMS',
    'Docs site',
    'from Notion',
    'Developer and product documentation powered by Notion.',
  ),
  'create-a-helpdesk-servicedesk-notion': page(
    'create-a-helpdesk-servicedesk-notion',
    'Notion CMS',
    'Helpdesk',
    'from Notion',
    'Customer helpdesk and service desk sites from Notion content.',
  ),
  'create-a-knowledge-base-notion': page(
    'create-a-knowledge-base-notion',
    'Notion CMS',
    'Knowledge base',
    'from Notion',
    'Self-serve support knowledge base publishing from Notion.',
  ),
  'create-a-marketplace-notion': page(
    'create-a-marketplace-notion',
    'Notion CMS',
    'Marketplace',
    'from Notion',
    'Two-sided marketplace sites with Notion as the content layer.',
  ),
  'create-a-chrome-extension': page(
    'create-a-chrome-extension',
    'Build',
    'Chrome',
    'extension',
    'Create and ship browser extensions with Trooper workflows.',
  ),
};

export const LOOPS_HUB_OG = HUB_OG_PAGES.loops;
