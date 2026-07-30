import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

/**
 * Dev harness for the demo. Exists so surfaces can be built while looking at
 * them — mounting the NLE on its own takes a keystroke instead of running the
 * whole landing site and waiting a minute for the reel to reach it.
 */
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react()],
  server: { port: 5173, host: true },
  resolve: {
    alias: {
      '@demo': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  publicDir: fileURLToPath(new URL('./public', import.meta.url)),
  build: { outDir: 'dist' },
});
