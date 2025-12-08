import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: rootDir,
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      'envy-ui': path.resolve(rootDir, '..', '..', 'lib', 'index.js'),
      'detect-browser': path.resolve(rootDir, 'shims', 'detect-browser.ts')
    }
  },
  optimizeDeps: {
    include: ['envy-ui']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    commonjsOptions: {
      include: [
        /node_modules/,
        path.resolve(rootDir, '..', '..', 'lib', '**')
      ]
    }
  }
});
