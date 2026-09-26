import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          motion: ['motion/react'],
        },
      },
    },
  },
});
