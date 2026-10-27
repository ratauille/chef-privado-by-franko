import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, dirname, resolve, relative } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const distDir = join(root, 'dist');
const serverDir = join(root, 'node_modules', `.chef4you-prerender-${process.pid}`);
const routes = {
  '/': {
    title: 'Private Chef Puerto Vallarta & Punta Mita | Chef Franko',
    description:
      'Luxury private chef experiences, personalized tasting menus and villa dining in Puerto Vallarta, Punta Mita and Riviera Nayarit. Book Chef Franko.',
  },
  '/menu': {
    title: 'Menús y precios | Chef4You by Franko',
    description:
      'Explora diez menús de chef privado para grupos de 2 a 20 personas, con precios por persona en MXN. Servicio en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
  },
  '/galeria': {
    title: 'Private Chef Gallery | Chef 4 You by Franko',
    description:
      'Explore signature dishes, culinary technique and private villa dining captured by Chef Franko Salgado.',
  },
  '/experiencias': {
    title: 'Private Chef Experiences | Chef Franko',
    description:
      'Discover bespoke villa dinners, tasting menus, celebrations and chef-led experiences in Puerto Vallarta and Punta Mita.',
  },
  '/chef-franko': {
    title: 'Chef Franko Salgado | Private Chef',
    description:
      'Meet Chef Franko Salgado and discover refined private dining shaped around your guests, setting and celebration.',
  },
  '/reservar': {
    title: 'Reserve a Private Chef Experience | Chef Franko',
    description:
      'Request a tailored private chef proposal for your date, guest count and villa location in Riviera Nayarit.',
  },
};

function replaceMeta(html, route, meta) {
  const canonical = `https://chef4youbyfranko.com${route === '/' ? '/' : `${route}/`}`;
  const replacements = [
    [/<title>[^<]*<\/title>/i, `<title>${meta.title.replaceAll('&', '&amp;')}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`],
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${meta.title.replaceAll('&', '&amp;')}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonical}" />`],
  ];

  if (meta.noIndex) {
    replacements.push([
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
      '<meta name="robots" content="noindex, nofollow" />',
    ]);
  }

  return replacements.reduce((result, [pattern, value]) => result.replace(pattern, value), html);
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
  const template = await readFile(join(distDir, 'index.html'), 'utf8');

  for (const [route, meta] of Object.entries(routes)) {
    const rendered = await serverModule.render(route);
    const document = replaceMeta(template.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`), route, meta);
    const outputPath = route === '/' ? join(distDir, 'index.html') : join(distDir, route.slice(1), 'index.html');
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, document, 'utf8');
    console.log(`Prerendered ${route} -> ${relative(root, outputPath)}`);
  }

  await rm(serverDir, { recursive: true, force: true });
}

main().catch(error => {
  console.error('[prerender] failed:', error);
  process.exitCode = 1;
});
