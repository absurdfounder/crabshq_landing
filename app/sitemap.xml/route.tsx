// app/sitemap.xml/route.ts
import { type NextRequest } from 'next/server';
import { _loadFromJson, _loadFromJsonComparison, _loadSkills } from "../utils/helper";
import type { Skill } from "../utils/helper";
import { allChannelPageSlugs } from '@/lib/channelContent';
import { allTeamSlugs } from '@/lib/subpageContent';
import { allRichTeamSlugs } from '@/lib/teamContent';
import { allIntegrationPageSlugs } from '@/lib/integrationContent';
import { allAlternativeSlugs } from '@/lib/alternativeContent';
import { allUseCaseSlugs } from '@/lib/useCaseContent';
import { allIndustrySlugs } from '@/lib/industryContent';
import { getAllLoopSlugs } from '@/lib/loopCatalog';
import { buildSkillRouteIndex, getSkillPagePath } from '@/lib/skillRoutes';

const URL = "https://trooper.so";

interface IntegrationOrTemplate {
  id: string;
  type: 'integration' | 'compare-against';
}

async function loadIntegrations(): Promise<IntegrationOrTemplate[]> {
  try {
    const [integrationsFile, comparison] = await Promise.all([
      _loadFromJson(false).then((items: any[]): IntegrationOrTemplate[] =>
        items.map(item => ({ ...item, type: 'integration' }))),
      _loadFromJsonComparison().then((items: any[]): IntegrationOrTemplate[] =>
        items.map(item => ({ ...item, type: 'compare-against' }))),
    ]);

    return [...integrationsFile, ...comparison];
  } catch (error) {
    console.error("Failed to load integrations", error);
    return [];
  }
}

async function loadSkillPaths(): Promise<string[]> {
  try {
    const skills = await _loadSkills();
    const index = buildSkillRouteIndex(skills);
    return skills.map((skill: Skill) => getSkillPagePath(skill, index));
  } catch (error) {
    console.error("Failed to load skills for sitemap", error);
    return [];
  }
}

// All static pages with their priorities and change frequencies
const staticPages = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/integration', priority: '0.9', changefreq: 'daily' },
  { path: '/loops', priority: '0.9', changefreq: 'weekly' },
  { path: '/plugin', priority: '0.9', changefreq: 'daily' },
  { path: '/alternatives', priority: '0.8', changefreq: 'weekly' },
  { path: '/use-cases', priority: '0.8', changefreq: 'weekly' },
  { path: '/industries', priority: '0.8', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
  { path: '/affiliate', priority: '0.6', changefreq: 'monthly' },
  { path: '/agency', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact-us', priority: '0.5', changefreq: 'monthly' },
  { path: '/showcase', priority: '0.7', changefreq: 'weekly' },
  // Feature pages
  { path: '/features/ai-workforce', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/github-integration', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/task-execution', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/persistent-memory', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/browser-control', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/system-access', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/email-automation', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/skills-plugins', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/multi-agent-collaboration', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/openclaw-powered', priority: '0.8', changefreq: 'weekly' },
  { path: '/features/chat-interfaces', priority: '0.8', changefreq: 'weekly' },
  { path: '/channels', priority: '0.8', changefreq: 'weekly' },
  { path: '/download', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/ai-documentation-agent', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/ai-help-center', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/automated-screenshots-for-docs', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/chrome-extension-for-documentation', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/code-to-docs', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/generative-ai-customer-service', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/internal-knowledge-base', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/multilingual-knowledge-base', priority: '0.7', changefreq: 'weekly' },
  { path: '/features/self-service-help-widget', priority: '0.7', changefreq: 'weekly' },
  // Template/guide pages
  { path: '/create-a-blog-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-changelog-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-chrome-extension', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-directory-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-documentation-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-company-wiki-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-helpdesk-servicedesk-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-knowledge-base-notion', priority: '0.6', changefreq: 'monthly' },
  { path: '/create-a-marketplace-notion', priority: '0.6', changefreq: 'monthly' },
  // Legal
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

function generateSiteMap(
  integrationsOrTemplates: IntegrationOrTemplate[],
  skillPaths: string[] = [],
): string {
  const now = new Date().toISOString();

  const teamSlugs = Array.from(new Set([...allTeamSlugs(), ...allRichTeamSlugs()]));
  const channelSlugs = allChannelPageSlugs();
  const integrationSlugs = allIntegrationPageSlugs();
  const alternativeSlugs = allAlternativeSlugs();
  const useCaseSlugs = allUseCaseSlugs();
  const industrySlugs = allIndustrySlugs();

  const staticEntries = staticPages.map(page => `
  <url>
    <loc>${URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  const teamEntries = teamSlugs.map(slug => `
  <url>
    <loc>${URL}/teams/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const channelEntries = channelSlugs.map(slug => `
  <url>
    <loc>${URL}/channels/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const dynamicEntries = integrationsOrTemplates.map(item => `
  <url>
    <loc>${URL}/${encodeURIComponent(item.type)}/${encodeURIComponent(item.id)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const pluginIntegrationEntries = integrationSlugs.map(slug => `
  <url>
    <loc>${URL}/plugin/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const alternativeEntries = alternativeSlugs.map(slug => `
  <url>
    <loc>${URL}/alternatives/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const useCaseEntries = useCaseSlugs.map(slug => `
  <url>
    <loc>${URL}/use-cases/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const industryEntries = industrySlugs.map(slug => `
  <url>
    <loc>${URL}/industries/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const loopEntries = getAllLoopSlugs().map(slug => `
  <url>
    <loc>${URL}/loops/${encodeURIComponent(slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const skillEntries = skillPaths.map(path => `
  <url>
    <loc>${URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${staticEntries}${teamEntries}${channelEntries}${dynamicEntries}${pluginIntegrationEntries}${alternativeEntries}${useCaseEntries}${industryEntries}${loopEntries}${skillEntries}
</urlset>`;
}

export async function GET(request: NextRequest) {
  try {
    const [integrations, skillPaths] = await Promise.all([
      loadIntegrations(),
      loadSkillPaths(),
    ]);
    const sitemap = generateSiteMap(integrations, skillPaths);

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
