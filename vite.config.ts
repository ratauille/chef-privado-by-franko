import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'path';
import { pageMetadata, siteUrl } from './src/lib/pageMetadata';

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}

function replaceMeta(html: string, attribute: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/>`);
  return html.replace(pattern, () => `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`);
}

function staticRouteMetadata() {
  return {
    name: 'static-route-metadata',
    apply: 'build' as const,
    closeBundle() {
      const outputDirectory = path.resolve(__dirname, 'dist');
      const template = readFileSync(path.join(outputDirectory, 'index.html'), 'utf8');

      for (const [route, metadata] of Object.entries(pageMetadata)) {
        const canonicalUrl = `${siteUrl}${route === '/' ? '/' : route}`;
        let html = template.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(metadata.title)}</title>`);
        html = html.replace(/<html lang="[^"]*"/, () => `<html lang="${escapeHtml(metadata.lang ?? 'es-MX')}"`);
        html = replaceMeta(html, 'name', 'description', metadata.description);
        html = replaceMeta(html, 'name', 'robots', metadata.noIndex ? 'noindex, nofollow' : 'index, follow');
        html = replaceMeta(html, 'property', 'og:title', metadata.title);
        html = replaceMeta(html, 'property', 'og:description', metadata.description);
        html = replaceMeta(html, 'property', 'og:url', canonicalUrl);
        html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
        html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
        html = html.replace(
          /<link rel="canonical" href="[^"]*" \/>/,
          () => `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
        );

        const routeDirectory = path.join(outputDirectory, route === '/' ? '' : route.slice(1));
        mkdirSync(routeDirectory, { recursive: true });
        writeFileSync(path.join(routeDirectory, 'index.html'), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticRouteMetadata()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          clerk: ['@clerk/react'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          motion: ['motion/react'],
        },
      },
    },
  },
});
