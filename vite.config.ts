import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from 'fs';

export default defineConfig({
    plugins: [
        {
            name: 'spa-html-fallback',
            configureServer(server) {
                server.middlewares.use(async (req, res, next) => {
                    const url = req.url || '/';
                    if (
                        url === '/' ||
                        url === '/index.html' ||
                        (!url.startsWith('/@') &&
                         !url.startsWith('/node_modules') &&
                         !url.startsWith('/resources') &&
                         !url.startsWith('/api') &&
                         !url.includes('.'))
                    ) {
                        try {
                            const template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
                            const html = await server.transformIndexHtml(url, template);
                            res.setHeader('Content-Type', 'text/html; charset=utf-8');
                            res.end(html);
                            return;
                        } catch (err) {
                            return next(err);
                        }
                    }
                    next();
                });
            },
        },
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js/src'),
        },
    },
});
