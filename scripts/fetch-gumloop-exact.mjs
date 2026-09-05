#!/usr/bin/env node
/**
 * Re-fetch Gumloop homepage SSR HTML + CSS (+ fonts) into the lab mirror.
 * Usage: node scripts/fetch-gumloop-exact.mjs
 *
 * Writes:
 *   public/lab/gumloop-exact/{index.html,css/*,media/*.woff2}
 *   lab-assets/gumloop/{MANIFEST.json,page.ssr.html,css/*,keyframes.css}
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public/lab/gumloop-exact');
const LAB = join(ROOT, 'lab-assets/gumloop');
const SOURCE = 'https://www.gumloop.com/';

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

async function fetchBuf(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

function abs(u) {
  if (u.startsWith('//')) return `https:${u}`;
  if (u.startsWith('/')) return `https://www.gumloop.com${u}`;
  return u;
}

function rewriteAttr(html, attr) {
  return html.replace(new RegExp(`\\b${attr}="([^"]+)"`, 'gi'), (full, u) => {
    if (attr.toLowerCase() === 'href' && /^(#|mailto:|tel:|javascript:)/i.test(u)) return full;
    if (/^(https?:|data:|blob:)/i.test(u)) return full;
    if (u.startsWith('//')) return `${attr}="https:${u}"`;
    if (u.startsWith('/')) return `${attr}="https://www.gumloop.com${u}"`;
    return `${attr}="https://www.gumloop.com/${u}"`;
  });
}

function rewriteSrcset(val) {
  return val
    .split(',')
    .map((chunk) => {
      const bits = chunk.trim().split(/\s+/);
      if (!bits[0]) return '';
      let u = bits[0];
      if (!/^(https?:|data:)/i.test(u)) {
        u = u.startsWith('/') ? `https://www.gumloop.com${u}` : `https://www.gumloop.com/${u}`;
      }
      return [u, ...bits.slice(1)].join(' ');
    })
    .filter(Boolean)
    .join(', ');
}

async function main() {
  await mkdir(join(PUB, 'css'), { recursive: true });
  await mkdir(join(PUB, 'media'), { recursive: true });
  await mkdir(join(LAB, 'css'), { recursive: true });

  const html = await fetchText(SOURCE);
  await writeFile(join(LAB, 'page.ssr.html'), html);

  const cssUrls = [...new Set([...html.matchAll(/href="([^"]+\.css[^"]*)"/g)].map((m) => abs(m[1])))];
  const jsUrls = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => abs(m[1])))];

  const cssLocal = [];
  for (const cssUrl of cssUrls) {
    const name = cssUrl.split('/').pop().split('?')[0];
    let text = await fetchText(cssUrl);
    const fontFiles = new Set();
    text = text.replace(/url\(([^)]+)\)/g, (full, inner) => {
      const raw = inner.trim().replace(/^["']|["']$/g, '');
      if (/^(data:|https?:|#)/i.test(raw)) return full;
      const absu = new URL(raw, cssUrl).href;
      if (/\.woff2?$/i.test(absu)) {
        const fname = absu.split('/').pop().split('?')[0];
        fontFiles.add([absu, fname]);
        return `url("/lab/gumloop-exact/media/${fname}")`;
      }
      if (raw.startsWith('/')) return `url("https://www.gumloop.com${raw}")`;
      return `url("${absu}")`;
    });
    for (const [absu, fname] of fontFiles) {
      await writeFile(join(PUB, 'media', fname), await fetchBuf(absu));
      console.log('font', fname);
    }
    await writeFile(join(PUB, 'css', name), text);
    await writeFile(join(LAB, 'css', name), text);
    cssLocal.push(name);
    console.log('css', name, text.length);
  }

  let body = html.match(/<body[^>]*>[\s\S]*<\/body>/i)?.[0] ?? '<body></body>';
  body = body.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  body = rewriteAttr(body, 'src');
  body = rewriteAttr(body, 'href');
  body = rewriteAttr(body, 'poster');
  body = body.replace(/\bsrcset="([^"]+)"/gi, (_, v) => `srcset="${rewriteSrcset(v)}"`);

  const cssLinks = cssLocal.map((n) => `  <link rel="stylesheet" href="/lab/gumloop-exact/css/${n}">`).join('\n');
  const mirror = `<!DOCTYPE html>
<html class="light" style="color-scheme: light;" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="Internal Trooper lab: static SSR capture of gumloop.com for design reference. Not affiliated with Gumloop.">
  <title>Gumloop exact mirror (lab) — Trooper</title>
${cssLinks}
  <style>html,body{margin:0}</style>
</head>
${body}
</html>
`;
  await writeFile(join(PUB, 'index.html'), mirror);

  const mainCss = await readFile(join(PUB, 'css', cssLocal.find((n) => n.startsWith('07')) || cssLocal[0]), 'utf8');
  const keyframes = [...mainCss.matchAll(/@keyframes\s+[A-Za-z0-9_-]+\s*\{(?:[^{}]|\{[^{}]*\})*\}/g)].map((m) => m[0]);
  await writeFile(
    join(LAB, 'keyframes.css'),
    `/* Exact @keyframes from Gumloop homepage CSS */\n\n${keyframes.join('\n\n')}\n`,
  );

  await writeFile(
    join(LAB, 'MANIFEST.json'),
    JSON.stringify(
      {
        source: SOURCE,
        fetched_at: new Date().toISOString(),
        css: cssUrls,
        css_local: cssLocal,
        js_count: jsUrls.length,
        js: jsUrls,
        note: 'Static SSR + CSS mirror for /lab/gumloop/exact. JS listed by URL only — live hydration needs gumloop.com.',
      },
      null,
      2,
    ),
  );

  console.log('mirror bytes', mirror.length, 'keyframes', keyframes.length, 'js urls', jsUrls.length);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
