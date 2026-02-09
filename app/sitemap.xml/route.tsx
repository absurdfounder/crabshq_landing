// app/sitemap.xml/route.ts
import { type NextRequest } from 'next/server';
import { _loadFromJson, _loadFromJsonComparison } from "../utils/helper";

const URL = "https://crabshq.com";

interface IntegrationOrTemplate {
  id: string;
  type: 'integration' | 'showcase' | 'compare-against';
}

async function loadIntegrations(): Promise<IntegrationOrTemplate[]> {
  try {
    const [integrationsFile, templatesFile, comparison] = await Promise.all([
      _loadFromJson(false).then((items: any[]): IntegrationOrTemplate[] =>
        items.map(item => ({ ...item, type: 'integration' }))),
      _loadFromJson().then((items: any[]): IntegrationOrTemplate[] =>
        items.map(item => ({ ...item, type: 'showcase' }))),
      _loadFromJsonComparison().then((items: any[]): IntegrationOrTemplate[] =>
        items.map(item => ({ ...item, type: 'compare-against' })))
    ]);

    return [...integrationsFile, ...templatesFile, ...comparison];
  } catch (error) {
    console.error("Failed to load integrations", error);
    return [];
  }
}

function generateSiteMap(integrationsOrTemplates: IntegrationOrTemplate[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${URL}/integration</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${URL}/pricing</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${URL}/affiliate</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${URL}/showcase</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  ${integrationsOrTemplates
      .map(item => `
  <url>
    <loc>${URL}/${encodeURIComponent(item.type)}/${encodeURIComponent(item.id)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
      ).join('')}
</urlset>`;
}

export async function GET(request: NextRequest) {
  try {
    const integrations = await loadIntegrations();
    const sitemap = generateSiteMap(integrations);

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
