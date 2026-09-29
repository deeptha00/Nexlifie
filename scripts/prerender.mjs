// Runs after both the client build (`vite build`) and the SSR build
// (`vite build --ssr src/entry-server.jsx --outDir dist-ssr`). Renders every
// known route with react-dom/server and writes real, fully-formed static
// HTML per route into dist/, so GitHub Pages serves crawlable content and
// correct <title>/meta/OG/JSON-LD to bots that never run JavaScript.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(rootDir, 'dist');

const { render, serviceSlugs } = await import(
  resolve(rootDir, 'dist-ssr/entry-server.js')
);

const staticRoutes = ['/', '/development', '/media', '/about', '/testimonials', '/clients', '/contact', '/ceo-profile', '/cto-profile'];
const routes = [...staticRoutes, ...serviceSlugs.map((slug) => `/services/${slug}`)];

const rawTemplate = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
// Strip the dev-only canonical/OG/Twitter fallback block; real per-route tags are injected below.
const template = rawTemplate.replace(/\s*<!-- SEO_DEFAULTS_START[\s\S]*?SEO_DEFAULTS_END -->/, '');

const escapeHtml = (str = '') =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const buildHeadTags = (head) => {
  const tags = [];
  if (head.canonical) tags.push(`<link rel="canonical" href="${escapeHtml(head.canonical)}" />`);
  tags.push(`<meta property="og:site_name" content="Nexlifie" />`);
  tags.push(`<meta property="og:type" content="${escapeHtml(head.ogType || 'website')}" />`);
  if (head.title) tags.push(`<meta property="og:title" content="${escapeHtml(head.title)}" />`);
  if (head.description) tags.push(`<meta property="og:description" content="${escapeHtml(head.description)}" />`);
  if (head.canonical) tags.push(`<meta property="og:url" content="${escapeHtml(head.canonical)}" />`);
  if (head.ogImage) tags.push(`<meta property="og:image" content="${escapeHtml(head.ogImage)}" />`);
  tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (head.title) tags.push(`<meta name="twitter:title" content="${escapeHtml(head.title)}" />`);
  if (head.description) tags.push(`<meta name="twitter:description" content="${escapeHtml(head.description)}" />`);
  if (head.ogImage) tags.push(`<meta name="twitter:image" content="${escapeHtml(head.ogImage)}" />`);
  (head.structuredData || []).forEach((item) => {
    tags.push(`<script type="application/ld+json">${JSON.stringify(item)}</script>`);
  });
  return tags.join('\n    ');
};

for (const url of routes) {
  const { html, head } = render(url);

  let page = template
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(head.title)}</title>`)
    .replace(
      /<meta name="description" content=".*?" \/>/,
      `<meta name="description" content="${escapeHtml(head.description)}" />`
    )
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace('</head>', `    ${buildHeadTags(head)}\n  </head>`);

  const outPath = url === '/' ? resolve(distDir, 'index.html') : resolve(distDir, `.${url}/index.html`);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
  console.log(`prerendered ${url} -> ${outPath.replace(rootDir + '/', '')}`);
}

rmSync(resolve(rootDir, 'dist-ssr'), { recursive: true, force: true });
