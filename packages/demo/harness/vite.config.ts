import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Dev harness for the demo. Exists so surfaces can be built while looking at
 * them — mounting the NLE on its own takes a keystroke instead of running the
 * whole landing site and waiting a minute for the reel to reach it.
 */
const ASSETS = fileURLToPath(new URL('../assets', import.meta.url));

/**
 * Serve `packages/demo/assets` at `/demo`, which is where the landing serves it
 * too. Asset URLs are baked into scenario modules at import time, so the two
 * hosts have to agree on the path rather than reconfiguring a base after load.
 */
function serveDemoAssets(): Plugin {
  return {
    name: 'serve-demo-assets',
    configureServer(server) {
      server.middlewares.use('/demo', sirvLike(ASSETS));
    },
  };
}

function sirvLike(root: string) {
  return (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const rel = decodeURIComponent((req.url || '/').split('?')[0]).replace(/^\/+/, '');
    const file = path.join(root, rel);
    if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) return next();
    const ext = path.extname(file).toLowerCase();
    const type = ext === '.mp4' ? 'video/mp4'
      : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg'
        : ext === '.png' ? 'image/png'
          : ext === '.html' ? 'text/html'
            : 'application/octet-stream';
    res.setHeader('Content-Type', type);
    res.setHeader('Accept-Ranges', 'bytes');
    fs.createReadStream(file).pipe(res);
  };
}

export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [react(), serveDemoAssets()],
  server: { port: 5173, host: true },
  resolve: {
    alias: {
      '@demo': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
  publicDir: false,
  build: { outDir: 'dist' },
});
