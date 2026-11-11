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
    configurePreviewServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: unknown, next: () => void) => void) => void } }) {
      server.middlewares.use((req, _res, next) => {
        if (req.url) {
          const [rawPath, query] = req.url.split('?');
          const cleanPath = rawPath.replace(/\/+$/, '') || '/';
          if (cleanPath !== '/' && Object.prototype.hasOwnProperty.call(pageMetadata, cleanPath)) {
            req.url = `${cleanPath}/index.html${query ? `?${query}` : ''}`;
          }
        }
        next();
      });
    },
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
  server: {
    proxy: {
      '/api/lead': {
        target: 'http://127.0.0.1:5001/chef-privado/us-central1/apiLead',
        changeOrigin: true,
        rewrite: () => '',
      },
      '/api/assistant/chat': {
        target: 'http://127.0.0.1:5001/chef-privado/us-central1/apiAssistantChat',
        changeOrigin: true,
        rewrite: () => '',
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');
          if (
            normalized.includes('/node_modules/react/') ||
            normalized.includes('/node_modules/react-dom/') ||
            normalized.includes('/node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (normalized.includes('/node_modules/firebase/') || normalized.includes('/node_modules/@firebase/')) {
            return 'firebase';
          }
          if (
            normalized.includes('/node_modules/motion/') ||
            normalized.includes('/node_modules/framer-motion/') ||
            normalized.includes('/node_modules/motion-dom/') ||
            normalized.includes('/node_modules/motion-utils/')
          ) {
            return 'motion';
          }
        },
      },
    },
  },
});
