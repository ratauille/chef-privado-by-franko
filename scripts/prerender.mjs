import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname, resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const distDir = join(root, 'dist');
const serverDir = join(root, 'node_modules', `.chef4you-prerender-${process.pid}`);
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function replaceMeta(html, route, meta, canonicalUrl) {
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${meta.lang}"`);
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl(route)}" />`);
  const values = {
    description: meta.description, robots: meta.noIndex ? 'noindex, nofollow' : 'index, follow',
    'og:title': meta.title, 'og:description': meta.description, 'og:url': canonicalUrl(route),
    'og:locale': meta.lang === 'en' ? 'en_US' : 'es_MX',
    'og:locale:alternate': meta.lang === 'en' ? 'es_MX' : 'en_US',
    'twitter:title': meta.title, 'twitter:description': meta.description,
  };
  for (const [key, value] of Object.entries(values)) {
    const attribute = key.startsWith('og:') ? 'property' : 'name';
    const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/?>`, 'i');
    html = html.replace(pattern, `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  if (meta.alternates) {
    const alternatives = { ...meta.alternates, 'x-default': meta.alternates.en };
    const links = Object.entries(alternatives).map(([language, path]) => `<link rel="alternate" hreflang="${language}" href="${canonicalUrl(path)}" />`).join('\n    ');
    html = html.replace('</head>', `    ${links}\n  </head>`);
  }
  if (meta.route.startsWith('/private-chef-')) {
    const area = meta.route.endsWith('punta-mita') ? 'Punta Mita' : 'Nuevo Nayarit';
    const service = { '@context': 'https://schema.org', '@type': 'Service',
      name: meta.title.split(' | ')[0], url: canonicalUrl(route), description: meta.description,
      serviceType: meta.lang === 'en' ? 'Private chef service' : 'Servicio de chef privado',
      areaServed: { '@type': 'Place', name: area },
      provider: { '@type': 'ProfessionalService', '@id': 'https://chef4youbyfranko.com/#business', name: 'Chef4You by Franko Salgado' },
    };
    html = html.replace('</head>', `<script id="local-service-schema" type="application/ld+json">${JSON.stringify(service).replaceAll('<', '\\u003c')}</script>\n  </head>`);
  }
  return html;
}

async function main() {
  await rm(serverDir, { recursive: true, force: true });
  await build({
    root,
    configFile: false,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': join(root, 'src'),
      },
    },
    build: {
      ssr: join(root, 'src/entry-server.tsx'),
      outDir: serverDir,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  });

  const serverModule = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href);
  const { pageMetadata: routes, canonicalUrl } = serverModule;
  const template = await readFile(join(distDir, 'index.html'), 'utf8');

  for (const [route, meta] of Object.entries(routes)) {
    const rendered = meta.noIndex ? '' : await serverModule.render(route);
    const document = replaceMeta(template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`), route, meta, canonicalUrl);
    const outputPath = route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, document, 'utf8');
    console.log(`Prerendered ${route} -> ${relative(root, outputPath)}`);
  }

  const urls = Object.entries(routes).filter(([, meta]) => !meta.noIndex).map(([route]) => `  <url><loc>${canonicalUrl(route)}</loc></url>`);
  await writeFile(join(distDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  await rm(serverDir, { recursive: true, force: true });
}

main().catch(error => {
  console.error('[prerender] failed:', error);
  process.exitCode = 1;
});
