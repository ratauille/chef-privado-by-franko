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
  '/private-chef-punta-mita': {
    title: 'Private Chef in Punta Mita | Chef 4 You by Franko',
    description:
      'Private chef in Punta Mita for villa dinners, intimate celebrations and bespoke tasting menus with fresh Pacific seafood, table service and full kitchen cleanup.',
  },
  '/private-chef-nuevo-nayarit': {
    title: 'Private Chef in Nuevo Nayarit | Chef 4 You by Franko',
    description:
      'Private chef in Nuevo Nayarit for family meals, group gatherings and vacation dinners at your residence, including ingredient sourcing, table service and cleanup.',
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
  '/privacy': {
    title: 'Aviso de Privacidad | Chef4You by Franko',
    description:
      'Aviso de privacidad y tratamiento de datos personales de Chef4You by Franko Salgado en Puerto Vallarta y Riviera Nayarit. Información sobre derechos ARCO y canales de atención.',
  },
  '/reservar': {
    title: 'Reserve a Private Chef Experience | Chef Franko',
    description:
      'Request a tailored private chef proposal for your date, guest count and villa location in Riviera Nayarit.',
  },
  '/es': {
    title: 'Chef privado en Puerto Vallarta y Punta Mita | Chef Franko',
    description:
      'Cenas privadas, menús degustación y servicio de chef en villas de Puerto Vallarta, Punta Mita y Nuevo Nayarit. Solicita una propuesta personalizada.',
  },
  '/es/chef-privado-punta-mita': {
    title: 'Chef privado en Punta Mita | Cenas en villa con Chef Franko',
    description:
      'Planea una cena privada en tu villa de Punta Mita con Chef Franko. Menús personalizados y coordinación del servicio según tu grupo y residencia.',
  },
  '/es/chef-privado-nuevo-nayarit': {
    title: 'Chef privado en Nuevo Nayarit y Nuevo Vallarta | Chef Franko',
    description:
      'Cenas con chef privado para villas, departamentos y estancias familiares en Nuevo Nayarit o Nuevo Vallarta. Consulta menús y disponibilidad con Chef Franko.',
  },
  '/es/menu': {
    title: 'Menús de chef privado | Chef4You by Franko',
    description:
      'Explora menús de chef privado y precios en pesos mexicanos para cenas en villa y celebraciones en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
  },
  '/es/galeria': {
    title: 'Galería gastronómica | Chef4You by Franko',
    description:
      'Explora platillos, técnica culinaria y experiencias de cenas privadas del Chef Franko Salgado en Puerto Vallarta y Riviera Nayarit.',
  },
  '/es/experiencias': {
    title: 'Experiencias de chef privado en Puerto Vallarta | Chef Franko',
    description:
      'Descubre cenas en villa, menúsdegustación y celebraciones con Chef Franko en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
  },
  '/es/chef-franko': {
    title: 'Chef Franko Salgado | Chef privado en Puerto Vallarta',
    description:
      'Conoce al Chef Franko Salgado y su propuesta de cocina personalizada, ingredientes de temporada y hospitalidad en Puerto Vallarta y Riviera Nayarit.',
  },
  '/es/privacy': {
    title: 'Aviso de Privacidad | Chef4You by Franko',
    description:
      'Información sobre datos personales, canales de contacto y solicitudes de privacidad de Chef4You by Franko Salgado. Aviso en revisión legal.',
  },
  '/es/reservar': {
    title: 'Reserva un chef privado en Puerto Vallarta | Chef Franko',
    description:
      'Comparte fecha, número de invitados, ubicación y preferencias para solicitar una propuesta de chef privado en Puerto Vallarta, Punta Mita o Nuevo Nayarit.',
  },
  '/admin': {
    title: 'Administración | Chef4You by Franko',
    description:
      'Panel administrativo de Chef4You by Franko.',
    noIndex: true,
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
